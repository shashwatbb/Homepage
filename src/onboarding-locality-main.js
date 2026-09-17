// Onboarding locality discovery flow — mobile only.
// Splash -> Service select -> [Login: Phone -> OTP -> Add details | Blocked]
// -> Locality -> Done. Screens ported 1:1 from the dev-provided React Native
// prototype (housing-onboarding-prototype.zip): copy, tokens, assets, and
// state machine come from that package, not from our own approximation.
// Locality/Done continue our own build — that package stops right after
// signup ("the next flow starts here").
import "./styles/base.css";
import "./components/OnboardingLocality.css";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import {
  STRINGS,
  SERVICE_OPTIONS,
  POPULAR_CITIES,
  CITY_INDEX,
  OTP_RESEND_COUNTDOWN_SECONDS,
  OTP_LENGTH,
  DEFAULT_COUNTRY_CODE,
  TERMS_AND_CONDITIONS_URL,
  SUPPORT_HOUSING_URL,
  SUPPORT_EMAIL,
  EMAIL_SUGGESTION_DOMAINS,
  isValidPhone,
  isValidName,
  isValidEmail,
  DEMO_RETURNING_USER_PHONE,
  DEMO_GOOGLE_ACCOUNT,
  sendOtp,
  isWhatsAppSubscribed,
  verifyOtp,
  fetchUserDetails,
  saveUserDetails,
  signInWithWhatsApp,
} from "./data/onboardingLocality.mock.js";
import { ICON as BRICKS_ICON } from "./data/onboardingLocalityIcons.js";
import { BRICKS_ICONS } from "./data/bricksIcons.js";
import { ONBOARDING_LOCALITY_DISCOVERY_FLOW_EXPERIMENT_ID } from "./experiments.js";
import "./components/OnboardingLocalityDiscovery.css";
import "leaflet/dist/leaflet.css";
import {
  BHK_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  BUDGET_STEPS_BUY,
  BUDGET_STEPS_RENT,
  BUDGET_STEPS_DEFAULT_INDEX,
  COMMUTE_OPTIONS,
  INTENT_OPTIONS,
  LIFESTYLE_TAGS,
  cityCenter,
  searchLandmarks,
  landmarkCoords,
  getRecommendedLocalities,
} from "./data/onboardingLocalityDiscovery.mock.js";

document.documentElement.classList.remove("no-fouc");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
  );
}

const ASSET = "/onboarding-assets";
const ICONS = {
  housingLogo: `${ASSET}/icons/housing-logo.svg`,
  onboardingBuy: `${ASSET}/icons/onboarding-buy.svg`,
  onboardingRent: `${ASSET}/icons/onboarding-rent.svg`,
  onboardingSeller: `${ASSET}/icons/onboarding-seller.svg`,
  whatsappLogoFilled: `${ASSET}/icons/whatsapp-logo-filled.svg`,
  whatsappLogo: `${ASSET}/icons/whatsapp.svg`,
  googleG: `${ASSET}/icons/google-g.svg`,
  editIcon: `${ASSET}/icons/edit-icon.svg`,
  callBlackIcon: `${ASSET}/icons/call-black-icon.svg`,
  closeCross: `${ASSET}/icons/close-cross.svg`,
  greenCheckCircle: `${ASSET}/icons/green-check-circle.svg`,
  tickWhite: `${ASSET}/icons/tick-white.webp`,
};
const LOGIN_BACKGROUND = `${ASSET}/images/login-background.webp`;
const LOTTIE = {
  splashAnim: `${ASSET}/lottie/splash_anim_optimized.lottie`,
  splashLoader: `${ASSET}/lottie/splash_loader_optimized.lottie`,
};

/** Bricks Iconography glyphs — still used for Locality/Done (not covered by the RN package). */
const ICON = BRICKS_ICON;

const SERVICE_ICON_SRC = {
  "onboarding-buy": ICONS.onboardingBuy,
  "onboarding-rent": ICONS.onboardingRent,
  "onboarding-seller": ICONS.onboardingSeller,
};

const CITY_TILE_ACCENTS = ["purple", "yellow", "purple", "yellow", "purple", "yellow"];

const state = {
  step: "splash",
  service: null,
  // Login flow state (mirrors loginFlowStore.ts)
  phone: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phoneError: false,
  phoneShaking: false,
  whatsAppOptIn: true,
  shouldShowWhatsAppOptIn: false,
  isSendingOtp: false,
  otpError: null,
  isVerifyingOtp: false,
  isOtpVerified: false,
  name: "",
  email: "",
  isSubmittingDetails: false,
  loginSkipped: false,
  city: null,
  // Locality Discovery flow state (feature-flagged).
  discoveryMode: null, // "know_locality" | "discover"
  budgetIndex: BUDGET_STEPS_DEFAULT_INDEX,
  buyStatus: "ready", // "ready" | "under_construction"
  bhk: null,
  propertyType: null,
  landmarks: [], // { id, name, category, coords }, max 2
  commuteTolerance: null,
  intent: null, // "live_in" | "investment" | null (skippable)
  lifestyleTags: [],
  recommendedLocalities: [],
  mapListMode: "map", // "map" | "list"
};

let otpValue = "";
let otpFocused = false;
let otpShaking = false;
let countdown = OTP_RESEND_COUNTDOWN_SECONDS;
let countdownInterval = null;
let addDetailsShowErrors = false;
let citySearchQuery = "";
let activeLetter = "A";
let toast = null; // { message, icon }
let toastTimer = null;

let timers = [];
function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
}
function after(ms, fn) {
  const id = window.setTimeout(fn, ms);
  timers.push(id);
  return id;
}

/** Steps that get their own history entry, so hardware/browser back steps
 * back through the flow instead of leaving straight to the real homepage.
 * "service" (and "splash") are the flow's root — back from there falls
 * through to the page that linked here. */
const DISCOVERY_STEPS = [
  "locality-check",
  "discovery-budget",
  "discovery-bhk",
  "discovery-landmarks",
  "discovery-commute",
  "discovery-intent",
  "discovery-lifestyle",
  "discovery-map",
];

const HISTORY_TRAPPED_STEPS = new Set([
  "login",
  "otp",
  "details",
  "blocked",
  "locality",
  "done",
  ...DISCOVERY_STEPS,
]);

// Set while handleHardwareBack() is unwinding a real back-press, so goTo()
// knows not to push a fresh history entry for that transition — otherwise
// every back press immediately re-pushed the depth it had just popped,
// and repeatedly pressing back could never actually drain the stack down
// to the real homepage.
let isNavigatingBack = false;

function goTo(step) {
  state.step = step;
  if (!isNavigatingBack && HISTORY_TRAPPED_STEPS.has(step)) {
    history.pushState({ olStep: step }, "", location.href);
  }
  render();
}

function handleHardwareBack() {
  isNavigatingBack = true;
  switch (state.step) {
    case "otp":
      editNumber();
      break;
    case "details":
      skipDetails();
      break;
    case "blocked":
    case "login":
    case "locality":
      goTo("service");
      break;
    case "done":
      goTo("locality");
      break;
    case "locality-check":
      goTo("locality");
      break;
    case "discovery-budget":
      goTo("locality-check");
      break;
    case "discovery-bhk":
      goTo("discovery-budget");
      break;
    case "discovery-landmarks":
      goTo("discovery-bhk");
      break;
    case "discovery-commute":
      goTo("discovery-landmarks");
      break;
    case "discovery-intent":
      goTo(state.landmarks.length > 0 ? "discovery-commute" : "discovery-landmarks");
      break;
    case "discovery-lifestyle":
      goTo(previousDiscoveryStep("discovery-lifestyle"));
      break;
    case "discovery-map":
      goTo("discovery-lifestyle");
      break;
    default:
      // "service" / "splash": the flow's root — let the browser continue
      // back to whatever page linked here instead of trapping it.
      break;
  }
  isNavigatingBack = false;
}

function showToast(message, icon) {
  window.clearTimeout(toastTimer);
  toast = { message, icon };
  render();
  toastTimer = window.setTimeout(() => {
    toast = null;
    render();
  }, 3000);
}

// ---------------------------------------------------------------------------
// Shared chrome
// ---------------------------------------------------------------------------

function brandTile() {
  return `<span class="ol-brand-tile"><img src="${ICONS.housingLogo}" width="48" height="48" alt="Housing" /></span>`;
}

function toastHtml() {
  if (!toast) return "";
  return `<div class="ol-toast-layer">
    <div class="ol-toast">
      ${toast.icon ? `<span class="ol-toast__icon">${toast.icon}</span>` : ""}
      <span class="ol-toast__message">${escapeHtml(toast.message)}</span>
      <span class="ol-toast__divider"></span>
      <button type="button" class="ol-toast__close" data-action="dismiss-toast" aria-label="Dismiss">
        <img src="${ICONS.closeCross}" width="16" height="16" alt="" />
      </button>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Splash (SplashScreen.tsx)
// ---------------------------------------------------------------------------

let splashIntroFinished = false;
let splashQuote = "";
let splashLottieInstance = null;

function pickRandomQuote() {
  const quotes = STRINGS["onboarding.splashQuotes"];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function splashScreen() {
  return `<div class="ol-screen ol-splash">
    <canvas class="ol-splash__lottie" id="ol-splash-canvas"></canvas>
    ${
      splashIntroFinished
        ? `<div class="ol-splash__quote-wrap"><p class="ol-splash__quote">${escapeHtml(splashQuote)}</p></div>`
        : ""
    }
  </div>`;
}

function mountSplashLottie() {
  const canvas = document.getElementById("ol-splash-canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  if (splashLottieInstance) {
    splashLottieInstance.destroy();
    splashLottieInstance = null;
  }

  if (!splashIntroFinished) {
    splashLottieInstance = new DotLottie({
      canvas,
      src: LOTTIE.splashAnim,
      autoplay: true,
      loop: false,
    });
    splashLottieInstance.addEventListener("complete", () => {
      if (state.step !== "splash") return;
      splashIntroFinished = true;
      splashQuote = pickRandomQuote();
      render();
      after(1500, () => {
        if (state.step === "splash") goTo("service");
      });
    });
  } else {
    splashLottieInstance = new DotLottie({
      canvas,
      src: LOTTIE.splashLoader,
      autoplay: true,
      loop: true,
    });
  }
}

// ---------------------------------------------------------------------------
// Service selection (AppLandingScreen.tsx) — full page, not a sheet.
// ---------------------------------------------------------------------------

function serviceScreen() {
  return `<div class="ol-screen ol-service">
    <p class="ol-service__header">${STRINGS["onboarding.welcome"]}</p>
    <div class="ol-service__pill"></div>
    <h1 class="ol-service__title">${STRINGS["onboarding.title"]}</h1>
    <p class="ol-service__subtitle">${STRINGS["onboarding.subtitle"]}</p>

    <div class="ol-service__list">
      ${SERVICE_OPTIONS.map(
        (opt) => `<button
          type="button"
          class="ol-service-row"
          style="animation-delay:${opt.delayMs}ms"
          data-action="pick-service"
          data-service="${opt.id}"
        >
          <span class="ol-service-row__icon"><img src="${SERVICE_ICON_SRC[opt.icon]}" width="32" height="32" alt="" /></span>
          <span class="ol-service-row__body">
            <span class="ol-service-row__title-line">
              <span class="ol-service-row__title">${opt.title}</span>
              ${opt.offerTag ? `<span class="ol-badge">${opt.offerTag}</span>` : ""}
            </span>
            <span class="ol-service-row__sub">${opt.subtitle}</span>
          </span>
        </button>`
      ).join("")}
    </div>
  </div>`;
}

function onServicePress(serviceId) {
  state.service = serviceId;
  if (serviceId === "sell" || state.loginSkipped) {
    goTo("locality");
    return;
  }
  openLoginFlow();
}

// ---------------------------------------------------------------------------
// Login flow: Phone entry (PhoneEntryScreen.tsx)
// ---------------------------------------------------------------------------

function openLoginFlow() {
  goTo("login");
  if (isValidPhone(state.phone)) refreshWhatsAppOptIn(state.phone);
}

function phoneClearButtonHtml() {
  return state.phone.length > 0
    ? `<button type="button" class="ol-phone-field__clear" data-action="clear-phone" aria-label="Clear">&times;</button>`
    : "";
}

function whatsAppOptInRowHtml() {
  if (!state.shouldShowWhatsAppOptIn) return "";
  return `<label class="ol-checkbox-row">
          <input type="checkbox" id="ol-whatsapp-updates" ${state.whatsAppOptIn ? "checked" : ""} />
          <span class="ol-checkbox-row__box" aria-hidden="true">${ICON.check}</span>
          <span class="ol-checkbox-row__label">${STRINGS["login.phoneEntry.whatsappUpdatesPrefix"]} ${STRINGS["common.whatsapp"]}</span>
          <span class="ol-whatsapp-mark"><img src="${ICONS.whatsappLogoFilled}" width="16" height="16" alt="" /></span>
        </label>`;
}

function loginScreen() {
  const digitsValid = isValidPhone(state.phone);
  return `<div class="ol-screen ol-login">
    <div class="ol-login__tap-catcher">
      <div class="ol-login__background-wrap">
        <img class="ol-login__background" src="${LOGIN_BACKGROUND}" alt="" />
        <button type="button" class="ol-text-btn ol-login__skip" data-action="skip-login">${STRINGS["common.skip"]}</button>
      </div>

      ${brandTile()}

      <h1 class="ol-title ol-title--center ol-login__title">${STRINGS["login.phoneEntry.title"]}</h1>
      <div class="ol-login__subtitle-row">
        ${STRINGS["login.phoneEntry.subtitle"]
          .map(
            (item, i) =>
              `${i > 0 ? '<span class="ol-login__subtitle-dot"></span>' : ""}<span class="ol-login__subtitle-item">${item}</span>`
          )
          .join("")}
      </div>

      <div class="ol-login__form">
        <label class="ol-phone-field ${state.phoneError ? "is-error" : ""} ${state.phoneShaking ? "is-shaking" : ""}" id="ol-phone-field">
          <span class="ol-phone-field__prefix">+${state.countryCode}</span>
          <span class="ol-phone-field__divider" aria-hidden="true"></span>
          <input
            type="tel"
            inputmode="numeric"
            maxlength="10"
            class="ol-phone-field__input"
            placeholder="${STRINGS["login.phoneEntry.phonePlaceholder"]}"
            id="ol-phone-input"
            value="${escapeHtml(state.phone)}"
            autocomplete="off"
          />
          <span id="ol-phone-clear-wrap">${phoneClearButtonHtml()}</span>
        </label>

        <div id="ol-whatsapp-optin-wrap">${whatsAppOptInRowHtml()}</div>

        <div class="ol-login__cta-block">
          <button type="button" class="ol-btn ol-btn--primary" data-action="submit-phone" ${
            digitsValid ? "" : "disabled"
          }>
            ${state.isSendingOtp ? loadingDotsHtml() : STRINGS["common.continue"]}
          </button>

          <div class="ol-divider"><span class="ol-divider__line"></span><span>${STRINGS["common.or"]}</span><span class="ol-divider__line"></span></div>

          <button type="button" class="ol-btn ol-btn--outline" data-action="start-whatsapp-login">
            <img src="${ICONS.whatsappLogoFilled}" width="24" height="24" alt="" />
            ${STRINGS["login.phoneEntry.continueWithWhatsapp"]}
          </button>
        </div>
      </div>

      <div class="ol-login__footer">
        <p class="ol-fineprint">${STRINGS["login.phoneEntry.termsPrefix"]}
          <a class="ol-fineprint__link" href="${TERMS_AND_CONDITIONS_URL}" target="_blank" rel="noopener">${STRINGS["login.phoneEntry.termsLink"]}</a>
        </p>
      </div>
    </div>
  </div>`;
}

function loadingDotsHtml() {
  return `<span class="ol-btn-dots"><span></span><span></span><span></span></span>`;
}

async function refreshWhatsAppOptIn(phone) {
  const subscribed = await isWhatsAppSubscribed(phone);
  if (state.phone !== phone) return;
  state.shouldShowWhatsAppOptIn = !subscribed;
  state.whatsAppOptIn = !subscribed;
  if (state.step !== "login") return;
  // Patch in place — a full render() here would land mid-keystroke (this
  // resolves ~800ms after the phone becomes valid) and steal focus.
  const wrap = document.getElementById("ol-whatsapp-optin-wrap");
  if (wrap) wrap.innerHTML = whatsAppOptInRowHtml();
}

function setPhone(raw) {
  state.phone = raw.replace(/\D/g, "").slice(0, 10);
  state.phoneError = false;
  if (isValidPhone(state.phone)) {
    refreshWhatsAppOptIn(state.phone);
  } else {
    state.shouldShowWhatsAppOptIn = false;
  }
}

async function submitPhone() {
  if (state.isSendingOtp || state.isVerifyingOtp) return;
  if (!isValidPhone(state.phone)) {
    state.phoneError = true;
    state.phoneShaking = false;
    render();
    requestAnimationFrame(() => {
      state.phoneShaking = true;
      const field = document.getElementById("ol-phone-field");
      if (field) field.classList.add("is-shaking");
    });
    return;
  }
  state.isSendingOtp = true;
  render();
  await sendOtp(state.phone);
  state.isSendingOtp = false;
  state.otpError = null;
  state.isOtpVerified = false;
  otpValue = "";
  goTo("otp");
  startOtpCountdown();
  scheduleDemoOtpAutofill();
}

function skipLogin() {
  state.loginSkipped = true;
  onServicePress(state.service);
}

async function startWhatsAppLogin() {
  await signInWithWhatsApp();
  await completeLogin("");
}

// ---------------------------------------------------------------------------
// Login flow: OTP (OtpScreen.tsx / OtpInput.tsx)
// ---------------------------------------------------------------------------

function startOtpCountdown() {
  window.clearInterval(countdownInterval);
  countdown = OTP_RESEND_COUNTDOWN_SECONDS;
  countdownInterval = window.setInterval(() => {
    countdown -= 1;
    if (countdown <= 0) {
      countdown = 0;
      window.clearInterval(countdownInterval);
      // Countdown hitting 0 swaps the whole block for the resend UI — that's
      // the one tick that needs a real re-render.
      if (state.step === "otp") render();
      return;
    }
    // Every other tick: patch just the countdown text in place. A full
    // render() here was replaying the OTP-box pop-in animation and stealing
    // focus from the hidden input every second — the "flashing" bug.
    if (state.step !== "otp") return;
    const el = document.querySelector(".ol-otp__countdown");
    if (el) el.textContent = STRINGS["login.otp.resendCountdown"].replace("{seconds}", String(countdown));
  }, 1000);
}

/** Demo-only: there's no real SMS to receive, so auto-fill a placeholder OTP
 * shortly after the screen opens (unless the user has already started
 * typing) instead of leaving them stuck on an OTP they have no way to know. */
const DEMO_OTP_PLACEHOLDER = "1234";

function scheduleDemoOtpAutofill() {
  after(1200, () => {
    if (state.step !== "otp" || otpValue.length > 0) return;
    let i = 0;
    const typeNext = () => {
      if (state.step !== "otp" || otpValue.length > i) return;
      otpValue = DEMO_OTP_PLACEHOLDER.slice(0, i + 1);
      i += 1;
      render();
      if (i < OTP_LENGTH) after(120, typeNext);
      else submitOtp(otpValue);
    };
    typeNext();
  });
}

function otpScreen() {
  const boxes = Array.from({ length: OTP_LENGTH }, (_, i) => otpValue[i]);
  const showFetching = countdown > 0 && otpValue.length < OTP_LENGTH && !state.otpError;
  const ctaVerified = state.isOtpVerified;
  const ctaReady = otpValue.length === OTP_LENGTH || ctaVerified;

  return `<div class="ol-screen ol-otp">
    ${brandTile()}
    <h1 class="ol-title ol-otp__title">${STRINGS["login.otp.title"]}</h1>
    <div class="ol-otp__sent-row">
      <span>${STRINGS["login.otp.sentTo"]} <span class="ol-otp__phone">+${state.countryCode} ${escapeHtml(state.phone)}</span></span>
      <button type="button" class="ol-icon-btn ol-icon-btn--inline" data-action="edit-number" aria-label="Edit phone number">
        <img src="${ICONS.editIcon}" width="13" height="12" alt="" />
      </button>
    </div>

    <div class="ol-otp-block">
      <div
        class="ol-otp-row ${state.otpError ? "is-error" : otpFocused || otpValue.length > 0 ? "is-active" : ""} ${otpShaking ? "is-shaking" : ""}"
        id="ol-otp-row"
        data-action="focus-otp"
      >
        ${boxes
          .map((digit, i) =>
            digit !== undefined
              ? `<span class="ol-otp-box"><span class="ol-otp-box__digit" key="${i}">${digit}</span></span>`
              : `<span class="ol-otp-box"><span class="ol-otp-box__dash"></span></span>`
          )
          .join("")}
      </div>
      <input
        type="text"
        inputmode="numeric"
        id="ol-otp-hidden-input"
        class="ol-visually-hidden-input"
        value="${otpValue}"
        autocomplete="one-time-code"
        style="position:absolute;opacity:0;pointer-events:none;left:-9999px;"
      />
      ${state.otpError ? `<p class="ol-otp__error">${escapeHtml(state.otpError)}</p>` : ""}
      <p class="ol-otp__demo-hint">Demo prototype — OTP ${DEMO_OTP_PLACEHOLDER} autofills, or type it yourself</p>
    </div>

    ${
      showFetching
        ? `<div class="ol-otp__fetching">${ICON.spinner} <span>${STRINGS["login.otp.fetchingOtp"]}</span></div>`
        : ""
    }

    ${
      countdown > 0
        ? `<p class="ol-otp__countdown">${STRINGS["login.otp.resendCountdown"].replace("{seconds}", String(countdown))}</p>`
        : `<div class="ol-otp__resend-block">
        <button type="button" class="ol-otp__resend-link" data-action="resend-otp">${STRINGS["login.otp.resend"]}</button>
        <div class="ol-otp__resend-option">
          <span class="ol-otp__resend-option-tile"><img src="${ICONS.whatsappLogo}" width="16" height="16" alt="" /></span>
          <span class="ol-otp__resend-option-text">${STRINGS["login.otp.resendPrefix"]}<button type="button" class="ol-otp__resend-option-channel" data-action="resend-otp">${STRINGS["common.whatsapp"]}</button></span>
        </div>
        <div class="ol-otp__resend-divider"></div>
        <div class="ol-otp__resend-option">
          <span class="ol-otp__resend-option-tile"><img src="${ICONS.callBlackIcon}" width="16" height="16" alt="" /></span>
          <span class="ol-otp__resend-option-text">${STRINGS["login.otp.resendPrefix"]}<button type="button" class="ol-otp__resend-option-channel" data-action="resend-otp">${STRINGS["login.otp.resendCall"]}</button></span>
        </div>
      </div>`
    }

    <div class="ol-otp__cta">
      <button type="button" class="ol-btn ol-btn--primary ol-btn--otp ${ctaVerified ? "is-verified" : ""}" data-action="verify-otp" ${
        ctaReady ? "" : "disabled"
      }>
        ${
          state.isVerifyingOtp
            ? loadingDotsHtml()
            : ctaVerified
              ? `${STRINGS["login.otp.verified"]} <img src="${ICONS.tickWhite}" width="16" height="16" alt="" />`
              : STRINGS["login.otp.verify"]
        }
      </button>
    </div>
  </div>`;
}

function onOtpChange(value) {
  otpValue = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
  render();
  focusOtpHiddenInput();
  if (otpValue.length === OTP_LENGTH) submitOtp(otpValue);
}

function focusOtpHiddenInput() {
  const input = document.getElementById("ol-otp-hidden-input");
  if (input) {
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
  }
}

async function submitOtp(otp) {
  if (state.isVerifyingOtp || state.isOtpVerified) return;
  state.isVerifyingOtp = true;
  state.otpError = null;
  render();
  const status = await verifyOtp(otp);
  state.isVerifyingOtp = false;
  if (status === "blocked") {
    goTo("blocked");
    return;
  }
  if (status === "wrong") {
    state.otpError = STRINGS["login.flow.otpNotMatched"];
    otpShaking = false;
    render();
    requestAnimationFrame(() => {
      otpShaking = true;
      const row = document.getElementById("ol-otp-row");
      if (row) row.classList.add("is-shaking");
    });
    return;
  }
  state.isOtpVerified = true;
  render();
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  await completeLogin(state.phone);
}

function editNumber() {
  state.otpError = null;
  state.isOtpVerified = false;
  window.clearInterval(countdownInterval);
  goTo("login");
}

async function resendOtp() {
  otpValue = "";
  state.otpError = null;
  render();
  await sendOtp(state.phone);
  startOtpCountdown();
  scheduleDemoOtpAutofill();
}

// ---------------------------------------------------------------------------
// Login flow: Add details (AddDetailsScreen.tsx / EmailSuggestions.tsx)
// ---------------------------------------------------------------------------

function emailSuggestionsHtml() {
  if (!state.email.includes("@")) return "";
  const localPart = state.email.slice(0, state.email.lastIndexOf("@"));
  return EMAIL_SUGGESTION_DOMAINS.map(
    (domain) =>
      `<button type="button" class="ol-email-suggestions__chip" data-action="pick-email-domain" data-local="${escapeHtml(
        localPart
      )}" data-domain="${domain}">${domain}</button>`
  ).join("");
}

function detailsScreen() {
  const nameInvalid = addDetailsShowErrors && !isValidName(state.name);
  const emailInvalid = addDetailsShowErrors && !isValidEmail(state.email);
  return `<div class="ol-screen ol-details">
    <div class="ol-details__header-row">
      ${brandTile()}
      <button type="button" class="ol-text-btn" data-action="skip-details">${STRINGS["common.skip"]}</button>
    </div>

    <h1 class="ol-title ol-details__title">${STRINGS["login.addDetails.title"]}</h1>
    <p class="ol-login__sub ol-details__subtitle">${STRINGS["login.addDetails.subtitle"]}</p>

    <div class="ol-details__form">
      <div>
        <input
          type="text"
          class="ol-text-field__input ${nameInvalid ? "is-error" : ""}"
          placeholder="${STRINGS["login.addDetails.namePlaceholder"]}"
          id="ol-name-input"
          value="${escapeHtml(state.name)}"
          autocomplete="off"
        />
        ${nameInvalid ? `<p class="ol-text-field__error">${STRINGS["login.addDetails.nameError"]}</p>` : ""}
      </div>

      <div>
        <input
          type="email"
          class="ol-text-field__input ${emailInvalid ? "is-error" : ""}"
          placeholder="${STRINGS["login.addDetails.emailPlaceholder"]}"
          id="ol-email-input"
          value="${escapeHtml(state.email)}"
          autocomplete="off"
        />
        <div class="ol-email-suggestions" id="ol-email-suggestions">${emailSuggestionsHtml()}</div>
        ${emailInvalid ? `<p class="ol-text-field__error">${STRINGS["login.addDetails.emailError"]}</p>` : ""}
      </div>

      <div class="ol-details__submit">
        <button type="button" class="ol-btn ol-btn--primary" data-action="submit-details">
          ${state.isSubmittingDetails ? loadingDotsHtml() : STRINGS["common.continue"]}
        </button>
      </div>

      <div class="ol-divider ol-details__or-row"><span class="ol-divider__line"></span><span>${STRINGS["common.or"]}</span><span class="ol-divider__line"></span></div>

      <p class="ol-details__google-label">${STRINGS["login.addDetails.googleCaption"]}</p>

      <button type="button" class="ol-btn ol-btn--outline ol-btn--pill" data-action="google-fill-and-submit">
        <span class="ol-btn__pill-icon"><img src="${ICONS.googleG}" width="20" height="20" alt="" /></span>
        ${STRINGS["login.addDetails.googlePill"]}
      </button>
    </div>
  </div>`;
}

async function submitDetails() {
  addDetailsShowErrors = true;
  if (state.isSubmittingDetails || !isValidName(state.name) || !isValidEmail(state.email)) {
    render();
    return;
  }
  state.isSubmittingDetails = true;
  render();
  await saveUserDetails({ name: state.name, email: state.email });
  state.isSubmittingDetails = false;
  showToast(STRINGS["login.flow.loggedIn"], ICON.checkCircle);
  goTo("locality");
}

function skipDetails() {
  onServicePress(state.service);
}

async function googleFillAndSubmit() {
  state.name = DEMO_GOOGLE_ACCOUNT.name;
  state.email = DEMO_GOOGLE_ACCOUNT.email;
  await submitDetails();
}

// ---------------------------------------------------------------------------
// Login flow: completion + blocked account (BlockedAccountScreen.tsx)
// ---------------------------------------------------------------------------

async function completeLogin(phone) {
  const user = await fetchUserDetails(phone);
  showToast(STRINGS["login.flow.loggedIn"], ICON.checkCircle);
  if (user.name && user.email) {
    onServicePress(state.service);
    return;
  }
  state.name = user.name;
  state.email = user.email;
  addDetailsShowErrors = false;
  goTo("details");
}

function blockedScreen() {
  return `<div class="ol-screen ol-blocked">
    <h1 class="ol-title">${STRINGS["login.blockedAccount.title"]}</h1>
    <p class="ol-blocked__text">${STRINGS["login.blockedAccount.supportText"]}
      <span class="ol-blocked__link" data-action="open-support-ticket">${STRINGS["login.blockedAccount.createTicket"]}</span>
    </p>
    <p class="ol-blocked__text">${STRINGS["login.blockedAccount.orEmail"]}
      <span class="ol-blocked__link" data-action="open-support-email">${SUPPORT_EMAIL}</span>
    </p>
  </div>`;
}

// ---------------------------------------------------------------------------
// Locality + Done — our own continuation past the dev package's scope.
// ---------------------------------------------------------------------------

function cityTileHtml(city, i) {
  const accent = CITY_TILE_ACCENTS[i % CITY_TILE_ACCENTS.length];
  return `<button type="button" class="ol-city-tile" data-action="pick-city" data-city="${city}">
    <span class="ol-city-tile__icon ol-city-tile__icon--${accent}">${ICON.buildings}</span>
    <span class="ol-city-tile__label">${city}</span>
  </button>`;
}

function cityResultsHtml() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lettersWithCities = new Set(CITY_INDEX.map((c) => c[0].toUpperCase()));
  const query = citySearchQuery.trim().toLowerCase();
  const filtered = query ? CITY_INDEX.filter((c) => c.toLowerCase().includes(query)) : null;
  const byLetter = filtered || CITY_INDEX.filter((c) => c[0].toUpperCase() === activeLetter);

  return `${
    !filtered
      ? `<p class="ol-section-label">Popular Cities</p>
    <div class="ol-city-grid">
      ${POPULAR_CITIES.map(cityTileHtml).join("")}
    </div>`
      : ""
  }

    <p class="ol-section-label">${filtered ? `${filtered.length} matching cities` : "Search in 330+ other cities"}</p>
    <div class="ol-city-browser">
      ${
        !filtered
          ? `<div class="ol-letter-strip" role="tablist">
        ${letters
          .map(
            (l) =>
              `<button type="button" role="tab" class="ol-letter ${l === activeLetter ? "is-active" : ""} ${
                lettersWithCities.has(l) ? "" : "is-disabled"
              }" data-action="pick-letter" data-letter="${l}" ${lettersWithCities.has(l) ? "" : "disabled"}>${l}</button>`
          )
          .join("")}
      </div>`
          : ""
      }
      <ul class="ol-city-list">
        ${byLetter
          .map(
            (c) =>
              `<li><button type="button" class="ol-city-list__item" data-action="pick-city" data-city="${c}">${c}</button></li>`
          )
          .join("") || `<li class="ol-city-list__empty">No cities found</li>`}
      </ul>
    </div>`;
}

function localityScreen() {
  const verb = state.service === "rent" ? "Rent" : state.service === "sell" ? "list" : "Buy";

  return `<div class="ol-screen ol-locality">
    <div class="ol-topbar">
      <div class="ol-topbar__lead">
        <button type="button" class="ol-icon-btn" data-action="back-to-service" aria-label="Back">${ICON.arrowLeft}</button>
      </div>
    </div>
    <h1 class="ol-title" style="font-size:var(--ds-font-size-3xl);font-weight:var(--ds-font-weight-bold);line-height:var(--ds-line-height-3xl);">Where do you want to ${verb}?</h1>
    <p class="ol-login__sub">Choose a city which can be changed later</p>

    <label class="ol-search-field">
      <input
        type="text"
        class="ol-search-field__input"
        placeholder="Type city here..."
        id="ol-city-search"
        value="${escapeHtml(citySearchQuery)}"
        autocomplete="off"
      />
      <span class="ol-search-field__mic">${ICON.mic}</span>
    </label>

    <button type="button" class="ol-locate-row" data-action="use-current-location">
      <span class="ol-locate-row__icon">${ICON.locate}</span>
      <span class="ol-locate-row__label">Use my current location</span>
      <span class="ol-locate-row__chevron">${ICON.chevronRight}</span>
    </button>

    <div id="ol-city-results">${cityResultsHtml()}</div>
  </div>`;
}

/** This flow defaults ON (unlike other experiments) so it's visible without
 * the homepage double-tap toggle gesture; explicit OFF in the panel still wins. */
function localityDiscoveryFlowEnabled() {
  try {
    const raw = localStorage.getItem("housing:experiments");
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed[ONBOARDING_LOCALITY_DISCOVERY_FLOW_EXPERIMENT_ID] !== false;
  } catch {
    return true;
  }
}

function afterCityPicked() {
  if (localityDiscoveryFlowEnabled()) {
    goTo("locality-check");
    return;
  }
  goTo("done"); // explicitly toggled off: existing flow, untouched
}

// ---------------------------------------------------------------------------
// Locality Discovery flow (feature-flagged: onboarding_locality_discovery_flow)
// ---------------------------------------------------------------------------

/** Onboarding-flow icons — all pulled from the Bricks Iconography Figma
 * library (see src/data/bricksIcons.js) except `close`, a plain X glyph with
 * no matching component in that set. */
const OD_ICON = {
  office: BRICKS_ICONS.buildingOffice,
  school: BRICKS_ICONS.graduationCap,
  family: BRICKS_ICONS.usersThree,
  pin: BRICKS_ICONS.mapPin,
  compass: BRICKS_ICONS.compass,
  close: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  check: BRICKS_ICONS.check,
  chevronRight: BRICKS_ICONS.caretRight,
  home: BRICKS_ICONS.houseSimple,
  trendingUp: BRICKS_ICONS.trendUp,
  readyKey: BRICKS_ICONS.doorOpen,
  crane: BRICKS_ICONS.crane,
  plus: BRICKS_ICONS.plus,
  minus: BRICKS_ICONS.minus,
  search: BRICKS_ICONS.magnifyingGlass,
  filters: BRICKS_ICONS.slidersHorizontal,
  hospital: BRICKS_ICONS.hospital,
  metro: BRICKS_ICONS.subway,
  mall: BRICKS_ICONS.storefront,
};

const LANDMARK_CATEGORY_ICON = {
  office: OD_ICON.office,
  hospital: OD_ICON.hospital,
  school: OD_ICON.school,
  metro: OD_ICON.metro,
  mall: OD_ICON.mall,
};

const INTENT_ICON = { live_in: OD_ICON.home, investment: OD_ICON.trendingUp };

/** 1-3 filled bars = increasing commute tolerance; "flexible" gets none filled (unbounded). */
const COMMUTE_BAR_LEVEL = { 15: 1, 30: 2, 45: 3, flexible: 0 };

function commuteBarsHtml(optionId) {
  const level = COMMUTE_BAR_LEVEL[optionId] ?? 0;
  return `<span class="od-commute-bars is-filled-${level}"><span></span><span></span><span></span></span>`;
}

/** Shared row used by locality-check, commute, and intent — icon, label, and a
 * trailing chevron (pure navigation) or check (multi-option select). */
function odChoiceCardHtml({ action, value, icon, label, selected, trailing }) {
  return `<button type="button" class="od-choice-card ${selected ? "is-selected" : ""}" data-action="${action}" ${
    value !== undefined ? `data-value="${value}"` : ""
  }>
    <span class="od-choice-card__icon">${icon}</span>
    <span class="od-choice-card__label">${label}</span>
    ${
      trailing === "chevron"
        ? `<span class="od-choice-card__trailing">${OD_ICON.chevronRight}</span>`
        : selected
          ? `<span class="od-choice-card__check">${OD_ICON.check}</span>`
          : ""
    }
  </button>`;
}

/** Which discovery step a given step should advance to on Continue/Skip. */
function nextDiscoveryStep(current) {
  switch (current) {
    case "discovery-budget":
      return "discovery-bhk";
    case "discovery-bhk":
      return "discovery-landmarks";
    case "discovery-landmarks":
      if (state.landmarks.length > 0) return "discovery-commute";
      return state.service === "buy" ? "discovery-intent" : "discovery-lifestyle";
    case "discovery-commute":
      return state.service === "buy" ? "discovery-intent" : "discovery-lifestyle";
    case "discovery-intent":
      return "discovery-lifestyle";
    case "discovery-lifestyle":
      return "discovery-map";
    default:
      return "discovery-map";
  }
}

function previousDiscoveryStep(current) {
  if (current === "discovery-lifestyle") {
    if (state.service === "buy") return "discovery-intent";
    return state.landmarks.length > 0 ? "discovery-commute" : "discovery-landmarks";
  }
  return "discovery-landmarks";
}

function odTopBar(backAction) {
  return `<div class="ol-topbar">
    <div class="ol-topbar__lead">
      <button type="button" class="ol-icon-btn" data-action="${backAction}" aria-label="Back">${ICON.arrowLeft}</button>
    </div>
  </div>`;
}

/** The steps this session will actually traverse, computed fresh from what's
 * already known — so the progress bar never counts a screen that will be
 * skipped (Commute needs 0 landmarks decided yet, Intent needs service). */
function activeDiscoverySteps() {
  if (state.discoveryMode === "know_locality") {
    return ["locality-check", "discovery-budget", "discovery-bhk"];
  }
  const steps = ["locality-check", "discovery-budget", "discovery-bhk", "discovery-landmarks"];
  if (state.landmarks.length > 0) steps.push("discovery-commute");
  if (state.service === "buy") steps.push("discovery-intent");
  steps.push("discovery-lifestyle", "discovery-map");
  return steps;
}

function odProgressHtml(stepId) {
  const steps = activeDiscoverySteps();
  const idx = steps.indexOf(stepId);
  return `<div class="od-progress">${steps.map((_, i) => `<span class="od-progress__dot ${i <= idx ? "is-done" : ""}"></span>`).join("")}</div>`;
}

function odSkipRow(action) {
  return `<div class="od-skip-row"><button type="button" class="ol-text-btn" data-action="${action}">${STRINGS["common.skip"]}</button></div>`;
}

// -- Step 0: locality check --------------------------------------------------

function localityCheckScreen() {
  return `<div class="ol-screen od-screen--thumb-zone">
    ${odTopBar("locality-check-back")}
    <h1 class="od-heading od-heading--lg">Know your locality yet?</h1>
    <div class="od-screen--thumb-zone__spacer"></div>
    <div class="od-choice-list">
      ${odChoiceCardHtml({ action: "locality-check-yes", icon: OD_ICON.pin, label: "Yes, I know it", trailing: "chevron" })}
      ${odChoiceCardHtml({ action: "locality-check-not-sure", icon: OD_ICON.compass, label: "Not sure, help me find one", trailing: "chevron" })}
    </div>
  </div>`;
}

// -- Step 1: budget -----------------------------------------------------------

function currentBudgetSteps() {
  return state.service === "rent" ? BUDGET_STEPS_RENT : BUDGET_STEPS_BUY;
}

function budgetValue() {
  return currentBudgetSteps()[state.budgetIndex].value;
}

/** Shared plus/minus stepper markup — used for both Budget and BHK. */
function odStepperHtml({ id, value, label, minusAction, plusAction, minusDisabled, plusDisabled }) {
  return `<div class="od-stepper">
    <button type="button" class="od-stepper__btn" data-action="${minusAction}" aria-label="Decrease" ${minusDisabled ? "disabled" : ""}>${OD_ICON.minus}</button>
    <div class="od-stepper__display" id="${id}" aria-live="polite" aria-atomic="true">
      <span class="od-stepper__value">${escapeHtml(label ?? String(value))}</span>
    </div>
    <button type="button" class="od-stepper__btn" data-action="${plusAction}" aria-label="Increase" ${plusDisabled ? "disabled" : ""}>${OD_ICON.plus}</button>
  </div>`;
}

function discoveryBudgetScreen() {
  const isRent = state.service === "rent";
  const steps = currentBudgetSteps();
  return `<div class="ol-screen">
    ${odTopBar("discovery-budget-back")}
    ${odProgressHtml("discovery-budget")}
    <h1 class="od-heading">${isRent ? "What's your monthly rent budget?" : "What's your budget?"}</h1>
    <p class="od-subtitle">${isRent ? "Your max monthly rent" : "Your max budget"}</p>
    ${odStepperHtml({
      id: "od-budget-stepper",
      label: steps[state.budgetIndex].label,
      minusAction: "budget-step-minus",
      plusAction: "budget-step-plus",
      minusDisabled: state.budgetIndex === 0,
      plusDisabled: state.budgetIndex === steps.length - 1,
    })}
    ${
      !isRent
        ? `<div class="od-toggle-row">
      <button type="button" class="od-toggle-btn ${state.buyStatus === "ready" ? "is-active" : ""}" data-action="pick-buy-status" data-value="ready">${OD_ICON.readyKey} Ready to move</button>
      <button type="button" class="od-toggle-btn ${state.buyStatus === "under_construction" ? "is-active" : ""}" data-action="pick-buy-status" data-value="under_construction">${OD_ICON.crane} Under construction</button>
    </div>`
        : ""
    }
    <div class="ol-details__submit" style="margin-top:var(--ds-space-2xl);">
      <button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-budget">${STRINGS["common.continue"]}</button>
    </div>
  </div>`;
}

// -- Step 2: BHK + property type ----------------------------------------------

function bhkIndex() {
  return state.bhk ? BHK_OPTIONS.indexOf(state.bhk) : -1;
}

function discoveryBhkScreen() {
  const idx = bhkIndex();
  return `<div class="ol-screen">
    ${odTopBar("discovery-bhk-back")}
    ${odProgressHtml("discovery-bhk")}
    <h1 class="od-heading">Which configuration?</h1>
    <p class="ol-section-label">BHK</p>
    ${odStepperHtml({
      id: "od-bhk-stepper",
      label: idx === -1 ? "Select BHK" : BHK_OPTIONS[idx],
      minusAction: "bhk-step-minus",
      plusAction: "bhk-step-plus",
      minusDisabled: idx <= 0,
      plusDisabled: idx === BHK_OPTIONS.length - 1,
    })}
    <p class="ol-section-label" style="margin-top:var(--ds-space-l);">Property type</p>
    <div class="od-chip-grid">
      ${PROPERTY_TYPE_OPTIONS.map(
        (opt) =>
          `<button type="button" class="od-chip ${state.propertyType === opt ? "is-active" : ""}" data-action="pick-property-type" data-value="${opt}">${
            state.propertyType === opt ? `<span class="od-chip__check">${OD_ICON.check}</span>` : ""
          }${opt}</button>`
      ).join("")}
    </div>
    <div class="ol-details__submit" style="margin-top:var(--ds-space-2xl);">
      <button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-bhk" ${state.bhk ? "" : "disabled"}>${STRINGS["common.continue"]}</button>
    </div>
  </div>`;
}

// -- Step 3: landmark search ---------------------------------------------------

let odLandmarkQuery = "";

function landmarkResultsHtml() {
  if (state.landmarks.length >= 2) return "";
  const results = searchLandmarks(state.city, odLandmarkQuery);
  if (!odLandmarkQuery.trim() || !results.length) return "";
  return `<ul class="od-landmark-results">${results
    .map(
      (l) =>
        `<li><button type="button" class="od-landmark-result" data-action="pick-landmark" data-landmark-id="${l.id}">
          <span class="od-landmark-result__icon">${LANDMARK_CATEGORY_ICON[l.category] || OD_ICON.pin}</span>
          <span class="od-landmark-result__name">${escapeHtml(l.name)}</span>
        </button></li>`
    )
    .join("")}</ul>`;
}

function landmarkChipsHtml() {
  if (!state.landmarks.length) return "";
  return `<div class="od-anchor-chips">${state.landmarks
    .map(
      (l) =>
        `<span class="od-anchor-chip">${escapeHtml(l.name)}<button type="button" class="od-anchor-chip__remove" data-action="remove-landmark" data-landmark-id="${l.id}" aria-label="Remove">${OD_ICON.close}</button></span>`
    )
    .join("")}</div>`;
}

function landmarkPreviewMapHtml() {
  if (!state.landmarks.length) return "";
  return `<div class="od-map-container od-map-container--preview is-loading" id="od-landmark-map"></div>`;
}

function renderLandmarkPicker() {
  const results = document.getElementById("od-landmark-results-wrap");
  if (results) results.innerHTML = landmarkResultsHtml();
  const chips = document.getElementById("od-landmark-chips-wrap");
  if (chips) chips.innerHTML = landmarkChipsHtml();
  const input = document.getElementById("od-landmark-input");
  if (input) input.disabled = state.landmarks.length >= 2;
  const mapWrap = document.getElementById("od-landmark-map-wrap");
  if (mapWrap) {
    mapWrap.innerHTML = landmarkPreviewMapHtml();
    if (state.landmarks.length) mountLandmarkPreviewMap();
  }
}

function discoveryLandmarksScreen() {
  const capped = state.landmarks.length >= 2;
  return `<div class="ol-screen">
    ${odTopBar("discovery-landmarks-back")}
    ${odProgressHtml("discovery-landmarks")}
    <h1 class="od-heading">Anything you'd like to stay close to?</h1>
    <p class="od-subtitle">Search up to 2 places &mdash; office, hospital, school, metro...</p>
    <label class="ol-search-field">
      <input
        type="text"
        class="ol-search-field__input"
        id="od-landmark-input"
        placeholder="Search a landmark, hospital, school, metro, office..."
        value="${escapeHtml(odLandmarkQuery)}"
        autocomplete="off"
        ${capped ? "disabled" : ""}
      />
      <span class="od-search-field__icon">${OD_ICON.search}</span>
    </label>
    ${capped ? `<p class="od-landmark-cap-note">2 of 2 added &mdash; remove one to search again.</p>` : ""}
    <div id="od-landmark-results-wrap">${landmarkResultsHtml()}</div>
    <div id="od-landmark-chips-wrap">${landmarkChipsHtml()}</div>
    <div id="od-landmark-map-wrap">${landmarkPreviewMapHtml()}</div>
    <button type="button" class="od-no-landmark-btn" data-action="no-landmark-preference">${OD_ICON.compass} I don't have a specific place in mind</button>
    <div class="ol-details__submit" style="margin-top:var(--ds-space-2xl);">
      <button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-landmarks">${STRINGS["common.continue"]}</button>
    </div>
  </div>`;
}

// -- Step 4: commute tolerance (only if anchors picked) ------------------------

function discoveryCommuteScreen() {
  return `<div class="ol-screen">
    ${odTopBar("discovery-commute-back")}
    ${odProgressHtml("discovery-commute")}
    <h1 class="od-heading">How far are you willing to commute?</h1>
    <p class="od-subtitle">Applied against your farthest pick</p>
    <div class="od-choice-list">
      ${COMMUTE_OPTIONS.map((opt) =>
        odChoiceCardHtml({
          action: "pick-commute",
          value: opt.id,
          icon: commuteBarsHtml(opt.id),
          label: opt.label,
          selected: state.commuteTolerance === opt.id,
        })
      ).join("")}
    </div>
  </div>`;
}

// -- Step 5: intent (buy only, optional) ---------------------------------------

function discoveryIntentScreen() {
  return `<div class="ol-screen">
    ${odTopBar("discovery-intent-back")}
    ${odProgressHtml("discovery-intent")}
    ${odSkipRow("discovery-skip-intent")}
    <h1 class="od-heading">Is this to live in, or an investment?</h1>
    <div class="od-choice-list">
      ${INTENT_OPTIONS.map((opt) =>
        odChoiceCardHtml({
          action: "pick-intent",
          value: opt.id,
          icon: INTENT_ICON[opt.id],
          label: opt.label,
          selected: state.intent === opt.id,
        })
      ).join("")}
    </div>
  </div>`;
}

// -- Step 6: lifestyle tags (optional, multi-select) ---------------------------

function discoveryLifestyleScreen() {
  return `<div class="ol-screen">
    ${odTopBar("discovery-lifestyle-back")}
    ${odProgressHtml("discovery-lifestyle")}
    ${odSkipRow("discovery-skip-lifestyle")}
    <h1 class="od-heading">What matters most where you live?</h1>
    <p class="od-subtitle">Optional &mdash; pick any that apply</p>
    <div class="od-chip-grid">
      ${LIFESTYLE_TAGS.map((tag) => {
        const active = state.lifestyleTags.includes(tag.id);
        return `<button type="button" class="od-chip ${active ? "is-active" : ""}" data-action="toggle-lifestyle-tag" data-value="${tag.id}">${
          active ? `<span class="od-chip__check">${OD_ICON.check}</span>` : ""
        }${tag.label}</button>`;
      }).join("")}
    </div>
    <div class="ol-details__submit" style="margin-top:var(--ds-space-2xl);">
      <button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-lifestyle">See recommended localities</button>
    </div>
  </div>`;
}

// -- Final: map + list recommendation screen -----------------------------------

/** Minimal, roads/terrain-only basemap — no baked-in POI icons, transit
 * lines, or place labels (unlike standard OSM raster tiles), so only our own
 * pins/labels carry information. Free, no API key; requires attribution. */
// CARTO's no-labels basemap now requires a registered API key for outside
// domains (returns a watermarked "API key required" tile), so this stays on
// standard OpenStreetMap raster tiles — free, keyless, always available —
// and gets muted toward roads/terrain via the `.od-map-container` CSS filter
// below instead of a different tile provider.
const MINIMAL_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MINIMAL_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

let odLeafletMap = null;
let odLandmarkLeafletMap = null;

const ADJUST_FILTER_TARGETS = [
  { step: "discovery-budget", label: "Budget" },
  { step: "discovery-bhk", label: "BHK" },
  { step: "discovery-landmarks", label: "Landmarks" },
  { step: "discovery-lifestyle", label: "Lifestyle" },
];

function adjustFiltersHtml() {
  return `<div class="od-adjust-filters">
    <span class="od-adjust-filters__label">${OD_ICON.filters} Adjust filters</span>
    <div class="od-adjust-filters__chips">
      ${ADJUST_FILTER_TARGETS.map(
        (t) => `<button type="button" class="od-adjust-filters__chip" data-action="adjust-filter" data-step="${t.step}">${t.label}</button>`
      ).join("")}
    </div>
  </div>`;
}

function localityCardHtml(loc, rank) {
  const isPrimary = rank !== null;
  const bandModifier = loc.price_band_match === "above_budget" ? "od-locality-card__band--warn" : "od-locality-card__band--good";
  const bandLabel = loc.price_band_match === "within_budget" ? "Within budget" : loc.price_band_match === "below_budget" ? "Below budget" : "Above budget";
  const signals = [...loc.matched_signals, ...loc.appreciation_signals];
  return `<div class="od-locality-card ${isPrimary ? "" : "od-locality-card--secondary"}">
    <span class="od-locality-card__rank">${isPrimary ? rank : ""}</span>
    <div class="od-locality-card__body">
      <div class="od-locality-card__head">
        <h3 class="od-locality-card__name">${escapeHtml(loc.name)}</h3>
        <span class="od-locality-card__band ${bandModifier}">${bandLabel}</span>
      </div>
      <div class="od-locality-card__signals">${signals.map((s) => `<span class="od-signal-badge">${escapeHtml(s)}</span>`).join("")}</div>
      <button type="button" class="od-locality-card__cta" data-action="explore-locality" data-locality-id="${loc.id}" data-locality-name="${escapeHtml(loc.name)}">Explore this locality</button>
    </div>
  </div>`;
}

function discoveryMapScreen() {
  const ranked = state.recommendedLocalities;
  const primary = ranked.slice(0, 5);
  const secondary = ranked.slice(5);

  return `<div class="ol-screen">
    ${odTopBar("discovery-map-back")}
    <h1 class="od-heading">Recommended localities</h1>
    ${adjustFiltersHtml()}
    <div class="od-map-toggle">
      <button type="button" class="od-map-toggle__btn ${state.mapListMode === "map" ? "is-active" : ""}" data-action="set-map-mode" data-value="map">Map</button>
      <button type="button" class="od-map-toggle__btn ${state.mapListMode === "list" ? "is-active" : ""}" data-action="set-map-mode" data-value="list">List</button>
    </div>
    ${
      state.mapListMode === "map"
        ? `<div class="od-map-container is-loading" id="od-map"></div>
           <div class="od-locality-list">${primary.map((l, i) => localityCardHtml(l, i + 1)).join("")}</div>`
        : `<div class="od-locality-list">
             ${primary.map((l, i) => localityCardHtml(l, i + 1)).join("")}
             ${secondary.length ? `<p class="od-locality-list__label">More options</p>` : ""}
             ${secondary.map((l) => localityCardHtml(l, null)).join("")}
           </div>`
    }
    ${ranked.length === 0 ? `<p class="od-empty-note">No matching localities yet &mdash; try widening your budget.</p>` : ""}
  </div>`;
}

function mountDiscoveryMap() {
  const container = document.getElementById("od-map");
  if (!container) return;
  import("leaflet").then(({ default: L }) => {
    if (document.getElementById("od-map") !== container) return; // navigated away before this resolved
    if (odLeafletMap) {
      odLeafletMap.remove();
      odLeafletMap = null;
    }
    const center = cityCenter(state.city);
    odLeafletMap = L.map(container, { attributionControl: true, zoomControl: false }).setView(center, 12);
    const tiles = L.tileLayer(MINIMAL_TILE_URL, { maxZoom: 18, attribution: MINIMAL_TILE_ATTRIBUTION }).addTo(odLeafletMap);
    tiles.once("load", () => container.classList.remove("is-loading"));

    state.landmarks.forEach((l) => {
      if (!l.coords) return;
      L.marker(l.coords, {
        icon: L.divIcon({ className: "", html: `<div class="od-map-pin-badge od-map-pin-badge--anchor"><span>${l.name[0]}</span></div>`, iconSize: [28, 28] }),
      })
        .addTo(odLeafletMap)
        .bindTooltip(l.name);
    });

    const primary = state.recommendedLocalities.slice(0, 5);
    const secondary = state.recommendedLocalities.slice(5);
    primary.forEach((loc, i) => {
      L.marker(loc.coordinates, {
        icon: L.divIcon({ className: "", html: `<div class="od-map-pin-badge"><span>${i + 1}</span></div>`, iconSize: [28, 28] }),
      })
        .addTo(odLeafletMap)
        .bindPopup(`<strong>${escapeHtml(loc.name)}</strong><br/>${loc.matched_signals.join(", ")}`);
    });
    secondary.forEach((loc) => {
      L.marker(loc.coordinates, {
        icon: L.divIcon({ className: "", html: `<div class="od-map-pin-badge od-map-pin-badge--secondary"></div>`, iconSize: [16, 16] }),
      })
        .addTo(odLeafletMap)
        .bindTooltip(loc.name);
    });
  });
}

function mountLandmarkPreviewMap() {
  const container = document.getElementById("od-landmark-map");
  if (!container) return;
  import("leaflet").then(({ default: L }) => {
    if (document.getElementById("od-landmark-map") !== container) return;
    if (odLandmarkLeafletMap) {
      odLandmarkLeafletMap.remove();
      odLandmarkLeafletMap = null;
    }
    const center = cityCenter(state.city);
    odLandmarkLeafletMap = L.map(container, { attributionControl: true, zoomControl: false }).setView(center, 12);
    const tiles = L.tileLayer(MINIMAL_TILE_URL, { maxZoom: 18, attribution: MINIMAL_TILE_ATTRIBUTION }).addTo(odLandmarkLeafletMap);
    tiles.once("load", () => container.classList.remove("is-loading"));

    const points = [];
    state.landmarks.forEach((l) => {
      if (!l.coords) return;
      points.push(l.coords);
      L.marker(l.coords, {
        icon: L.divIcon({ className: "", html: `<div class="od-map-pin-badge od-map-pin-badge--anchor"><span>${l.name[0]}</span></div>`, iconSize: [28, 28] }),
      })
        .addTo(odLandmarkLeafletMap)
        .bindTooltip(l.name);
    });
    if (points.length > 1) odLandmarkLeafletMap.fitBounds(points, { padding: [32, 32] });
  });
}

/** Budget/BHK/property-type query params shared by both handoffs to SRP —
 * the full match (with locality name) and the "I know my locality" quick
 * exit that skips the discovery flow entirely. */
function budgetQueryParams() {
  const params = new URLSearchParams();
  params.set("budgetMax", String(budgetValue()));
  if (state.bhk) params.set("bhk", state.bhk);
  if (state.propertyType) params.set("propertyType", state.propertyType);
  return params;
}

function handoffToSearchPreFiltered() {
  const params = budgetQueryParams();
  window.location.assign(`/srp.html?${params.toString()}`);
}

function beginLocalityMatch() {
  state.budgetMax = budgetValue();
  state.budgetMin = state.budgetMax * 0.6;
  const { ranked } = getRecommendedLocalities(state);
  state.recommendedLocalities = ranked;
  state.mapListMode = "map";
  goTo("discovery-map");
}

function exploreLocality(localityId, localityName) {
  const params = budgetQueryParams();
  if (localityName) params.set("q", `${state.bhk || ""} ${state.propertyType || ""} in ${localityName}`.trim());
  window.location.assign(`/srp.html?${params.toString()}`);
}

function doneScreen() {
  return `<div class="ol-screen ol-done">
    <div class="ol-screen__body">
    <span class="ol-done__badge">${ICON.checkCircle}</span>
    <h1 class="ol-title ol-title--center" style="font-size:var(--ds-font-size-3xl);font-weight:var(--ds-font-weight-bold);">You're all set</h1>
    <p class="ol-login__sub ol-login__sub--center">Here's what we collected in this prototype run</p>
    <dl class="ol-summary">
      <div><dt>Service</dt><dd>${state.service ? state.service[0].toUpperCase() + state.service.slice(1) : "&mdash;"}</dd></div>
      <div><dt>Phone</dt><dd>${state.phone ? `+${state.countryCode} ${escapeHtml(state.phone)}` : "&mdash;"}</dd></div>
      <div><dt>Name</dt><dd>${state.name ? escapeHtml(state.name) : "&mdash;"}</dd></div>
      <div><dt>Email</dt><dd>${state.email ? escapeHtml(state.email) : "&mdash;"}</dd></div>
      <div><dt>City</dt><dd>${state.city ? escapeHtml(state.city) : "&mdash;"}</dd></div>
    </dl>
    <button type="button" class="ol-btn ol-btn--outline" data-action="restart">Restart flow</button>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Render + event wiring
// ---------------------------------------------------------------------------

const SCREEN_BUILDERS = {
  splash: splashScreen,
  service: serviceScreen,
  login: loginScreen,
  otp: otpScreen,
  details: detailsScreen,
  blocked: blockedScreen,
  locality: localityScreen,
  done: doneScreen,
  "locality-check": localityCheckScreen,
  "discovery-budget": discoveryBudgetScreen,
  "discovery-bhk": discoveryBhkScreen,
  "discovery-landmarks": discoveryLandmarksScreen,
  "discovery-commute": discoveryCommuteScreen,
  "discovery-intent": discoveryIntentScreen,
  "discovery-lifestyle": discoveryLifestyleScreen,
  "discovery-map": discoveryMapScreen,
};

function wireEvents(root) {
  root.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn || btn.disabled) return;
    const action = btn.getAttribute("data-action");

    switch (action) {
      case "pick-service":
        onServicePress(btn.getAttribute("data-service"));
        break;
      case "skip-login":
        skipLogin();
        break;
      case "clear-phone":
        setPhone("");
        render();
        break;
      case "submit-phone":
        submitPhone();
        break;
      case "start-whatsapp-login":
        startWhatsAppLogin();
        break;
      case "edit-number":
        editNumber();
        break;
      case "focus-otp":
        focusOtpHiddenInput();
        break;
      case "resend-otp":
        resendOtp();
        break;
      case "verify-otp":
        if (otpValue.length === OTP_LENGTH) submitOtp(otpValue);
        break;
      case "submit-details":
        submitDetails();
        break;
      case "google-fill-and-submit":
        googleFillAndSubmit();
        break;
      case "skip-details":
        skipDetails();
        break;
      case "pick-email-domain":
        state.email = `${btn.getAttribute("data-local")}@${btn.getAttribute("data-domain")}`;
        render();
        break;
      case "open-support-ticket":
        window.open(SUPPORT_HOUSING_URL, "_blank", "noopener");
        break;
      case "open-support-email":
        window.location.href = `mailto:${SUPPORT_EMAIL}`;
        break;
      case "back-to-service":
        goTo("service");
        break;
      case "use-current-location":
        state.city = "Mumbai";
        afterCityPicked();
        break;
      case "pick-city":
        state.city = btn.getAttribute("data-city");
        afterCityPicked();
        break;
      case "pick-letter":
        activeLetter = btn.getAttribute("data-letter");
        render();
        break;
      case "locality-check-back":
        goTo("locality");
        break;
      case "locality-check-yes":
        state.discoveryMode = "know_locality";
        goTo("discovery-budget");
        break;
      case "locality-check-not-sure":
        state.discoveryMode = "discover";
        goTo("discovery-budget");
        break;
      case "discovery-budget-back":
        goTo("locality-check");
        break;
      case "pick-buy-status":
        state.buyStatus = btn.getAttribute("data-value");
        render();
        break;
      case "budget-step-minus":
        state.budgetIndex = Math.max(0, state.budgetIndex - 1);
        render();
        break;
      case "budget-step-plus":
        state.budgetIndex = Math.min(currentBudgetSteps().length - 1, state.budgetIndex + 1);
        render();
        break;
      case "discovery-bhk-back":
        goTo("discovery-budget");
        break;
      case "bhk-step-minus": {
        const idx = bhkIndex();
        if (idx > 0) state.bhk = BHK_OPTIONS[idx - 1];
        render();
        break;
      }
      case "bhk-step-plus": {
        const idx = bhkIndex();
        state.bhk = idx === -1 ? BHK_OPTIONS[2] : BHK_OPTIONS[Math.min(BHK_OPTIONS.length - 1, idx + 1)];
        render();
        break;
      }
      case "pick-property-type":
        state.propertyType = btn.getAttribute("data-value");
        render();
        break;
      case "discovery-landmarks-back":
        goTo("discovery-bhk");
        break;
      case "pick-landmark": {
        const landmarkId = btn.getAttribute("data-landmark-id");
        const results = searchLandmarks(state.city, odLandmarkQuery);
        const found = results.find((l) => l.id === landmarkId);
        if (!found || state.landmarks.length >= 2) break;
        state.landmarks.push({ id: found.id, name: found.name, category: found.category, coords: landmarkCoords(state.city, found) });
        odLandmarkQuery = "";
        renderLandmarkPicker();
        break;
      }
      case "remove-landmark":
        state.landmarks = state.landmarks.filter((l) => l.id !== btn.getAttribute("data-landmark-id"));
        renderLandmarkPicker();
        break;
      case "no-landmark-preference":
        state.landmarks = [];
        odLandmarkQuery = "";
        goTo(nextDiscoveryStep("discovery-landmarks"));
        break;
      case "discovery-commute-back":
        goTo("discovery-landmarks");
        break;
      case "pick-commute":
        state.commuteTolerance = btn.getAttribute("data-value");
        goTo(nextDiscoveryStep("discovery-commute"));
        break;
      case "discovery-intent-back":
        goTo(state.landmarks.length > 0 ? "discovery-commute" : "discovery-landmarks");
        break;
      case "discovery-skip-intent":
        state.intent = null;
        goTo(nextDiscoveryStep("discovery-intent"));
        break;
      case "pick-intent":
        state.intent = btn.getAttribute("data-value");
        goTo(nextDiscoveryStep("discovery-intent"));
        break;
      case "discovery-lifestyle-back":
        goTo(previousDiscoveryStep("discovery-lifestyle"));
        break;
      case "discovery-skip-lifestyle":
        beginLocalityMatch();
        break;
      case "toggle-lifestyle-tag": {
        const tagId = btn.getAttribute("data-value");
        state.lifestyleTags = state.lifestyleTags.includes(tagId)
          ? state.lifestyleTags.filter((t) => t !== tagId)
          : [...state.lifestyleTags, tagId];
        render();
        break;
      }
      case "discovery-continue": {
        const from = btn.getAttribute("data-from");
        if (from === "discovery-bhk" && state.discoveryMode === "know_locality") {
          handoffToSearchPreFiltered();
          break;
        }
        if (from === "discovery-lifestyle") {
          beginLocalityMatch();
          break;
        }
        goTo(nextDiscoveryStep(from));
        break;
      }
      case "discovery-map-back":
        goTo("discovery-lifestyle");
        break;
      case "set-map-mode":
        state.mapListMode = btn.getAttribute("data-value");
        render();
        break;
      case "explore-locality":
        exploreLocality(btn.getAttribute("data-locality-id"), btn.getAttribute("data-locality-name"));
        break;
      case "adjust-filter":
        goTo(btn.getAttribute("data-step"));
        break;
      case "dismiss-toast":
        window.clearTimeout(toastTimer);
        toast = null;
        render();
        break;
      case "restart":
        clearTimers();
        window.clearInterval(countdownInterval);
        window.clearTimeout(toastTimer);
        Object.assign(state, {
          step: "splash",
          service: null,
          phone: "",
          countryCode: DEFAULT_COUNTRY_CODE,
          phoneError: false,
          phoneShaking: false,
          whatsAppOptIn: true,
          shouldShowWhatsAppOptIn: false,
          isSendingOtp: false,
          otpError: null,
          isVerifyingOtp: false,
          isOtpVerified: false,
          name: "",
          email: "",
          isSubmittingDetails: false,
          loginSkipped: false,
          city: null,
          discoveryMode: null,
          budgetIndex: BUDGET_STEPS_DEFAULT_INDEX,
          buyStatus: "ready",
          bhk: null,
          propertyType: null,
          landmarks: [],
          commuteTolerance: null,
          intent: null,
          lifestyleTags: [],
          recommendedLocalities: [],
          mapListMode: "map",
        });
        otpValue = "";
        otpFocused = false;
        otpShaking = false;
        addDetailsShowErrors = false;
        citySearchQuery = "";
        activeLetter = "A";
        toast = null;
        splashIntroFinished = false;
        splashQuote = "";
        odLandmarkQuery = "";
        if (odLeafletMap) {
          odLeafletMap.remove();
          odLeafletMap = null;
        }
        if (odLandmarkLeafletMap) {
          odLandmarkLeafletMap.remove();
          odLandmarkLeafletMap = null;
        }
        render();
        break;
      default:
        break;
    }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "ol-phone-input") {
      setPhone(event.target.value);
      const btn = root.querySelector('[data-action="submit-phone"].ol-btn--primary');
      if (btn) btn.disabled = !isValidPhone(state.phone);
      const clearWrap = root.querySelector("#ol-phone-clear-wrap");
      if (clearWrap) clearWrap.innerHTML = phoneClearButtonHtml();
    } else if (event.target.id === "ol-otp-hidden-input") {
      onOtpChange(event.target.value);
    } else if (event.target.id === "ol-name-input") {
      state.name = event.target.value;
    } else if (event.target.id === "ol-email-input") {
      // Patch just the suggestion chips in place — a full render() here was
      // rebuilding the whole screen (and stealing focus) on every keystroke,
      // which read as the page "refreshing" while typing.
      state.email = event.target.value;
      const suggestions = root.querySelector("#ol-email-suggestions");
      if (suggestions) suggestions.innerHTML = emailSuggestionsHtml();
    } else if (event.target.id === "ol-city-search") {
      // Same fix: patch only the results region, leave the search input alone.
      citySearchQuery = event.target.value;
      const results = root.querySelector("#ol-city-results");
      if (results) results.innerHTML = cityResultsHtml();
    } else if (event.target.id === "od-landmark-input") {
      // Patch just the results dropdown in place — a full render() here
      // would steal focus from the input on every keystroke.
      odLandmarkQuery = event.target.value;
      const results = root.querySelector("#od-landmark-results-wrap");
      if (results) results.innerHTML = landmarkResultsHtml();
    }
  });

  root.addEventListener(
    "focus",
    (event) => {
      if (event.target.id === "ol-phone-input") {
        const field = document.getElementById("ol-phone-field");
        if (field) field.classList.add("is-focused");
      } else if (event.target.id === "ol-otp-hidden-input") {
        otpFocused = true;
      }
    },
    true
  );
  root.addEventListener(
    "blur",
    (event) => {
      if (event.target.id === "ol-phone-input") {
        const field = document.getElementById("ol-phone-field");
        if (field) field.classList.remove("is-focused");
      } else if (event.target.id === "ol-otp-hidden-input") {
        otpFocused = false;
      }
    },
    true
  );

  root.addEventListener("change", (event) => {
    if (event.target.id === "ol-whatsapp-updates") {
      state.whatsAppOptIn = event.target.checked;
    }
  });

  root.addEventListener("keydown", (event) => {
    if (event.target.id === "ol-phone-input" && event.key === "Enter" && isValidPhone(state.phone)) {
      submitPhone();
    }
  });
}

function render() {
  const root = document.getElementById("onboarding-locality");
  if (!root) return;
  root.innerHTML = SCREEN_BUILDERS[state.step]() + toastHtml();
  if (state.step === "splash") mountSplashLottie();
  if (state.step === "otp") focusOtpHiddenInput();
  if (state.step === "discovery-landmarks" && state.landmarks.length) mountLandmarkPreviewMap();
  if (state.step === "discovery-map" && state.mapListMode === "map") mountDiscoveryMap();
}

function init() {
  const root = document.getElementById("onboarding-locality");
  if (!root) return;
  wireEvents(root);
  window.addEventListener("popstate", handleHardwareBack);
  render();
}

init();
