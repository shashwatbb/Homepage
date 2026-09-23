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
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
import { createBudgetDialPicker } from "./srp-bhk-budget-bottom-sheet.js";
import "./components/OnboardingLocalityDiscovery.css";
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
  commuteMinutesToKm,
  formatLocalityBudget,
  LANDMARKS_BY_CITY,
  LOCALITY_POOL,
  RECENT_LOCALITY_SEARCHES,
  TOP_DEVELOPERS,
  LOCALITY_HOTSPOTS,
  TRENDING_PROJECTS,
  formatPricePerSqft,
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
  bhk: BHK_OPTIONS[2], // defaults to "2 BHK", not unset
  propertyType: null,
  landmarks: [], // { id, name, category, coords }, max 2
  commuteTolerance: null,
  intent: null, // "live_in" | "investment" | null (skippable)
  lifestyleTags: [],
  recommendedLocalities: [],
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

/** Best-effort haptic tick — no-op on desktop/unsupported browsers. */
function haptic(pattern = 10) {
  navigator.vibrate?.(pattern);
}

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
 * "login" (and "splash") are the flow's root — back from there falls
 * through to the page that linked here. */
const DISCOVERY_STEPS = [
  "locality-check",
  "locality-search",
  "discovery-budget",
  "discovery-bhk",
  "discovery-landmarks",
  "discovery-commute",
  "discovery-lifestyle",
  "discovery-map",
];

const HISTORY_TRAPPED_STEPS = new Set([
  "service",
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
      goTo("login");
      break;
    case "service":
      goTo("login");
      break;
    case "locality":
      goTo("service");
      break;
    case "done":
      goTo("locality");
      break;
    case "locality-check":
      goTo("locality");
      break;
    case "locality-search":
      goTo("locality-check");
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
    case "discovery-lifestyle":
      goTo(previousDiscoveryStep("discovery-lifestyle"));
      break;
    case "discovery-map":
      goTo("discovery-lifestyle");
      break;
    default:
      // "login" / "splash": the flow's root — let the browser continue
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
    <div class="ol-toast" role="status" aria-live="polite">
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
  let rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    // Right after innerHTML swap, the canvas hasn't been laid out yet — a
    // 0x0 rect makes DotLottie fail to load ("source width is zero").
    // One rAF is enough for the browser to run layout before we read it.
    requestAnimationFrame(() => mountSplashLottie());
    return;
  }
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
        if (state.step === "splash") goTo("login");
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

/** Login now happens before this — service selection just records the
 * choice and heads straight to locality. */
function onServicePress(serviceId) {
  state.service = serviceId;
  goTo("locality");
}

// ---------------------------------------------------------------------------
// Login flow: Phone entry (PhoneEntryScreen.tsx)
// ---------------------------------------------------------------------------

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
  goTo("service");
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
      <p class="ol-otp__demo-hint">Demo prototype: OTP ${DEMO_OTP_PLACEHOLDER} autofills, or type it yourself</p>
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
  goTo("service");
}

function skipDetails() {
  goTo("service");
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
    goTo("service");
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

/** Cities with their own illustration; everything else gets the generic one. */
const CITY_ICON_SLUGS = new Set([
  "mumbai", "bengaluru", "pune", "chennai", "kolkata", "hyderabad", "noida", "gurgaon",
]);

function cityIconSrc(city) {
  const slug = city.toLowerCase() === "new delhi" ? "delhi" : city.toLowerCase().replace(/\s+/g, "-");
  return `/onboarding-assets/icons/city-${CITY_ICON_SLUGS.has(slug) || slug === "delhi" ? slug : "default"}.svg`;
}

function cityChipHtml(city) {
  return `<button type="button" class="ol-city-chip" data-action="pick-city" data-city="${escapeHtml(city)}">
    <img class="ol-city-chip__icon" src="${cityIconSrc(city)}" alt="" aria-hidden="true" />
    <span class="ol-city-chip__label">${escapeHtml(city)}</span>
  </button>`;
}

/** Chips run in two rows inside one horizontal scroller — first half on top. */
function popularCityListHtml() {
  const half = Math.ceil(POPULAR_CITIES.length / 2);
  const rows = [POPULAR_CITIES.slice(0, half), POPULAR_CITIES.slice(half)];
  return `<p class="ol-popular-label">Popular Cities</p>
    <div class="ol-city-scroller">
      <div class="ol-city-scroller__inner">
        ${rows.map((row) => `<div class="ol-city-scroller__row">${row.map(cityChipHtml).join("")}</div>`).join("")}
      </div>
    </div>`;
}

function tier2CityListHtml() {
  const initials = [...new Set(CITY_INDEX.map((c) => c[0].toUpperCase()))].sort();
  const cities = CITY_INDEX.filter((c) => c[0].toUpperCase() === activeLetter).sort();
  return `<div class="ol-tier2">
    <p class="ol-tier2__label">Search in 330+ other cities</p>
    <div class="ol-tier2__card">
      <div class="ol-initial-strip" role="tablist">
        ${initials
          .map(
            (l) =>
              `<button type="button" role="tab" class="ol-initial ${l === activeLetter ? "is-active" : ""}" data-action="pick-letter" data-letter="${l}">${l}</button>`
          )
          .join("")}
      </div>
      <div class="ol-tier2__grid">
        ${cities
          .map(
            (c) =>
              `<button type="button" class="ol-tier2__city" data-action="pick-city" data-city="${escapeHtml(c)}">${escapeHtml(c)}</button>`
          )
          .join("")}
        ${cities.length % 2 ? `<span class="ol-tier2__city ol-tier2__city--spacer" aria-hidden="true"></span>` : ""}
      </div>
    </div>
  </div>`;
}

/** Matched substring is re-weighted, not recolored — matches the prototype. */
function highlightMatch(text, query) {
  const at = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || at === -1) return escapeHtml(text);
  return `${escapeHtml(text.slice(0, at))}<span class="ol-suggest__match">${escapeHtml(
    text.slice(at, at + query.length)
  )}</span>${escapeHtml(text.slice(at + query.length))}`;
}

function citySuggestionsHtml(query) {
  const matches = [...POPULAR_CITIES, ...CITY_INDEX]
    .filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  if (!matches.length) {
    return `<div class="ol-no-results">
      <p class="ol-no-results__title">We could not find <span class="ol-no-results__query">${escapeHtml(query)}</span></p>
      <p class="ol-no-results__hint">Try checking the spelling and search</p>
    </div>`;
  }

  return `<ul class="ol-suggest-list">
    ${matches
      .map(
        (c) => `<li class="ol-suggest">
        <button type="button" class="ol-suggest__btn" data-action="pick-city" data-city="${escapeHtml(c)}">
          <img class="ol-suggest__icon" src="/onboarding-assets/icons/suggest-locality.svg" alt="" aria-hidden="true" />
          <span class="ol-suggest__text">
            <span class="ol-suggest__name">${highlightMatch(c, query)}</span>
            <span class="ol-suggest__type">CITY</span>
          </span>
        </button>
      </li>`
      )
      .join("")}
  </ul>`;
}

function cityResultsHtml() {
  const query = citySearchQuery.trim();
  if (query) return citySuggestionsHtml(query);
  return `<button type="button" class="ol-locate-row" data-action="use-current-location">
      <img class="ol-locate-row__icon" src="/onboarding-assets/icons/locate.webp" alt="" aria-hidden="true" />
      <span class="ol-locate-row__label">Use my current location</span>
    </button>
    <div class="ol-city-scroll">
      ${popularCityListHtml()}
      ${tier2CityListHtml()}
    </div>`;
}

function localityScreen() {
  const verb = state.service === "rent" ? "Rent" : state.service === "sell" ? "list" : "Buy";

  return `<div class="ol-screen ol-locality">
    <div class="ol-locality__header">
      <div class="ol-locality__title-row">
        <button type="button" class="ol-locality__back" data-action="back-to-service" aria-label="Back">${ICON.arrowLeft}</button>
        <h1 class="ol-locality__title">Where do you want to ${verb}?</h1>
      </div>
      <p class="ol-locality__subtitle">Choose a city which can be changed later</p>
    </div>

    <div class="ol-city-search">
      <input
        type="text"
        class="ol-city-search__input"
        placeholder="Type city here…"
        id="ol-city-search"
        value="${escapeHtml(citySearchQuery)}"
        autocomplete="off"
        autocorrect="off"
        enterkeyhint="search"
      />
      <button type="button" class="ol-city-search__clear" data-action="clear-city-search" aria-label="Clear">&times;</button>
      <button type="button" class="ol-city-search__mic" data-action="city-voice-search" aria-label="Voice search">
        <img src="/onboarding-assets/icons/voice_search.webp" alt="" aria-hidden="true" />
      </button>
    </div>

    <div id="ol-city-results" class="ol-city-results">${cityResultsHtml()}</div>
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
  clock: BRICKS_ICONS.clockCounterClockwise,
  caretUp: BRICKS_ICONS.caretUp,
  navigationArrow: BRICKS_ICONS.navigationArrow,
};

const LANDMARK_CATEGORY_ICON = {
  office: OD_ICON.office,
  hospital: OD_ICON.hospital,
  school: OD_ICON.school,
  metro: OD_ICON.metro,
  mall: OD_ICON.mall,
  current: OD_ICON.navigationArrow,
};

const INTENT_ICON = { live_in: OD_ICON.home, investment: OD_ICON.trendingUp };

/** 1-3 filled bars = increasing commute tolerance; "flexible" gets none filled (unbounded). */
const COMMUTE_BAR_LEVEL = { 15: 1, 30: 2, 45: 3, flexible: 0 };

function commuteBarsHtml(optionId) {
  const level = COMMUTE_BAR_LEVEL[optionId] ?? 0;
  return `<span class="od-commute-bars is-filled-${level}"><span></span><span></span><span></span></span>`;
}

/** Shared row used by locality-check, commute, and intent — icon, label, and a
 * trailing chevron (pure navigation). Selected state is a border + tint only
 * — never a check/tick glyph (that caused part of the tap-flash/CLS). */
function odChoiceCardHtml({ action, value, icon, label, selected, trailing }) {
  return `<button type="button" class="od-choice-card ${selected ? "is-selected" : ""}" data-action="${action}" ${
    value !== undefined ? `data-value="${value}"` : ""
  } ${
    selected !== undefined ? `aria-pressed="${selected}"` : ""
  }>
    <span class="od-choice-card__icon">${icon}</span>
    <span class="od-choice-card__label">${label}</span>
    ${
      trailing === "chevron"
        ? `<span class="od-choice-card__trailing">${OD_ICON.chevronRight}</span>`
        : trailing
          ? `<span class="od-choice-card__trailing od-choice-card__trailing--text">${escapeHtml(trailing)}</span>`
          : ""
    }
  </button>`;
}

/** Secondary CTA used for every "skip this step" affordance — always a full
 * width secondary button positioned directly above the primary CTA, never a
 * plain text link. */
function odSecondaryCta(action, label) {
  return `<button type="button" class="ol-btn ol-btn--outline" data-action="${action}">${label}</button>`;
}

/** Bottom-aligned CTA stack — primary always last so a secondary/skip button
 * (when present) renders directly above it. Fixed to the page bottom on every
 * discovery screen so CTA position never drifts between screens. */
function odPageCta(primaryHtml, secondaryHtml) {
  return `<div class="od-page-cta">${secondaryHtml || ""}${primaryHtml}</div>`;
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
      return "discovery-lifestyle";
    case "discovery-commute":
      return "discovery-lifestyle";
    case "discovery-lifestyle":
      return "discovery-map";
    default:
      return "discovery-map";
  }
}

function previousDiscoveryStep(current) {
  if (current === "discovery-lifestyle") {
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
  steps.push("discovery-lifestyle", "discovery-map");
  return steps;
}

/** Last-rendered progress % — each screen transition is a full innerHTML
 * replace, so the fill bar is a brand-new element every time with no
 * "before" state of its own to transition from. Render it starting at the
 * *previous* screen's value, then animateProgressFill() nudges it to the
 * real value on the next frame so the existing CSS transition actually has
 * something to animate, instead of jumping straight to its final width. */
let lastProgressPct = 0;

function odProgressHtml(stepId) {
  const steps = activeDiscoverySteps();
  const idx = steps.indexOf(stepId);
  const pct = Math.round(((idx + 1) / steps.length) * 100);
  return `<div class="od-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" data-target-pct="${pct}">
    <span class="od-progress__fill" style="transform:scaleX(${lastProgressPct / 100})"></span>
  </div>`;
}

function animateProgressFill(root) {
  const bar = root.querySelector(".od-progress");
  if (!bar) return;
  const pct = Number(bar.getAttribute("data-target-pct"));
  const fill = bar.querySelector(".od-progress__fill");
  requestAnimationFrame(() => {
    if (fill) fill.style.transform = `scaleX(${pct / 100})`;
  });
  lastProgressPct = pct;
}

// -- Step 0: locality check --------------------------------------------------

function localityCheckScreen() {
  return `<div class="ol-screen od-screen--split od-flow">
    <h1 class="od-heading od-heading--lg od-screen--split__question">Do you know the area you want to move to?</h1>
    <div class="od-screen--split__pin-wrap">
      <img class="od-screen--split__pin" src="${ASSET}/images/locality-check-pin.png" width="240" height="240" alt="" />
    </div>
    <div class="od-choice-list">
      ${odChoiceCardHtml({ action: "locality-check-yes", icon: OD_ICON.pin, label: "Yes, I know it", trailing: "chevron" })}
      ${odChoiceCardHtml({ action: "locality-check-not-sure", icon: OD_ICON.compass, label: "Not sure, help me find one", trailing: "chevron" })}
    </div>
  </div>`;
}

// -- Step 0b: locality/area search (Figma "Imagine / Search / m-web", 6538:9768) ---
// Destination of "Yes, I know it" — pick a locality/landmark or type one in,
// then hand off to SRP pre-filtered exactly like the old direct jump did.

let odLocalitySearchQuery = "";

function odServiceLabel() {
  return state.service === "rent" ? "Rent" : "Buy";
}

function odIsBuy() {
  return state.service !== "rent";
}

/** Section shell — title over a horizontally scrolling rail. Sections with
 * nothing to show render nothing at all, exactly as the prototype does. */
function odSection(label, items, cardFn, railClass = "") {
  if (!items.length) return "";
  return `<section class="od-ls-section">
    <p class="od-ls-section__title">${escapeHtml(label)}</p>
    <div class="od-ls-rail ${railClass}">${items.map(cardFn).join("")}</div>
  </section>`;
}

function odRecentSearchCardHtml(item) {
  return `<button type="button" class="od-ls-recent" data-action="locality-search-pick" data-locality-name="${escapeHtml(item.name)}">
    <span class="od-ls-recent__icon">${OD_ICON.clock}</span>
    <span class="od-ls-recent__body">
      <span class="od-ls-recent__meta">
        <span class="od-ls-recent__locality">${escapeHtml(item.name)}</span>
      </span>
      <span class="od-ls-recent__query">${escapeHtml(item.note)}</span>
    </span>
  </button>`;
}

/** Fixed hotspot detail lines, in rank order — the prototype hard-codes these
 * against the first three popular localities rather than deriving them. */
const OD_HOTSPOT_DETAILS = [
  { subtitle: "Rapid growth", yoy: "18.4% YoY", down: false },
  { subtitle: "Upcoming metro line", yoy: "11.2% YoY", down: false },
  { subtitle: "New launches", yoy: "2.3% YoY", down: true },
];

function odHotspotCardHtml(loc, i) {
  const detail = OD_HOTSPOT_DETAILS[i] || OD_HOTSPOT_DETAILS[0];
  return `<button type="button" class="od-ls-hotspot" data-action="locality-search-pick" data-locality-name="${escapeHtml(loc.name)}">
    <span class="od-ls-hotspot__name">${escapeHtml(loc.name)}</span>
    <span class="od-ls-hotspot__subtitle">${escapeHtml(detail.subtitle)}</span>
    <span class="od-ls-yoy ${detail.down ? "od-ls-yoy--down" : ""}">
      <span class="od-ls-yoy__icon">${OD_ICON.trendingUp}</span>
      ${escapeHtml(detail.yoy)}
    </span>
  </button>`;
}

function odPopularLocalityCardHtml(loc) {
  return `<button type="button" class="od-ls-locality" data-action="locality-search-pick" data-locality-name="${escapeHtml(loc.name)}">
    <span class="od-ls-locality__name">${escapeHtml(loc.name)}</span>
    <span class="od-ls-locality__price">${escapeHtml(odIsBuy() ? formatLocalityBudget(loc.price_index * 3.4, "buy") : formatLocalityBudget(loc.price_index * 100, "rent"))}</span>
  </button>`;
}

function odExploreMoreLocalityCardHtml() {
  return `<button type="button" class="od-ls-locality" data-action="locality-search-explore-nearby">
    <span class="od-ls-locality__head">
      <span class="od-ls-locality__name">Not sure</span>
      <span class="od-ls-locality__caret">${OD_ICON.chevronRight}</span>
    </span>
    <span class="od-ls-locality__price">Explore more</span>
  </button>`;
}

function odLandmarkChipHtml(landmark) {
  return `<button type="button" class="od-ls-landmark" data-action="locality-search-pick" data-locality-name="${escapeHtml(landmark.name)}">
    <span class="od-ls-landmark__icon">${LANDMARK_CATEGORY_ICON[landmark.category] || OD_ICON.pin}</span>
    <span class="od-ls-landmark__label">${escapeHtml(landmark.name)}</span>
  </button>`;
}

/** Landmarks run as a two-row grid inside one horizontal scroller. */
function odLandmarkSectionHtml(landmarks) {
  if (!landmarks.length) return "";
  const half = Math.ceil(landmarks.length / 2);
  const rows = [landmarks.slice(0, half), landmarks.slice(half)];
  return `<section class="od-ls-section">
    <p class="od-ls-section__title">Popular landmarks</p>
    <div class="od-ls-rail">
      <div class="od-ls-landmark-rows">
        ${rows
          .map((row) => `<div class="od-ls-landmark-row">${row.map(odLandmarkChipHtml).join("")}</div>`)
          .join("")}
      </div>
    </div>
  </section>`;
}

function odTrendingProjectCardHtml(item) {
  return `<button type="button" class="od-ls-project" data-action="locality-search-pick" data-locality-name="${escapeHtml(item.locality)}">
    <span class="od-ls-project__head">
      <span class="od-ls-project__name">${escapeHtml(item.name)}</span>
      <span class="od-ls-project__address">${escapeHtml(item.locality)}, ${escapeHtml(state.city || "Gurgaon")}</span>
    </span>
    <span class="od-ls-project__divider"></span>
    <span class="od-ls-project__info">${escapeHtml(formatPricePerSqft(item.pricePerSqft))}</span>
  </button>`;
}

function odDeveloperCardHtml(dev) {
  return `<button type="button" class="od-ls-dev" data-action="locality-search-explore-nearby">
    <span class="od-ls-dev__logo">${ICON.buildings}</span>
    <span class="od-ls-dev__body">
      <span class="od-ls-dev__name">${escapeHtml(dev.name)}</span>
      <span class="od-ls-dev__count">${dev.projects} projects</span>
    </span>
  </button>`;
}

/** The empty-query state: every discovery rail, in the prototype's order.
 * Hotspots, trending projects and developers are Buy-only. */
function odDiscoveryPanelHtml() {
  const isBuy = odIsBuy();
  const popular = LOCALITY_POOL.slice(0, 6);
  const landmarks = LANDMARKS_BY_CITY[state.city] || LANDMARKS_BY_CITY.Mumbai;

  return `${odSection("Recent searches", RECENT_LOCALITY_SEARCHES, odRecentSearchCardHtml)}
    ${isBuy ? odSection("Hotspots", popular.slice(0, 3), odHotspotCardHtml) : ""}
    ${
      popular.length
        ? `<section class="od-ls-section">
      <p class="od-ls-section__title">Popular localities</p>
      <div class="od-ls-rail">${popular.map(odPopularLocalityCardHtml).join("")}${odExploreMoreLocalityCardHtml()}</div>
    </section>`
        : ""
    }
    ${odLandmarkSectionHtml(landmarks)}
    ${isBuy ? odSection("Trending projects", TRENDING_PROJECTS, odTrendingProjectCardHtml) : ""}
    ${isBuy ? odSection("Top developers", TOP_DEVELOPERS, odDeveloperCardHtml) : ""}
    <div class="od-ls-nearby-wrap">
      <button type="button" class="od-ls-nearby" data-action="locality-search-explore-nearby">
        <span class="od-ls-nearby__lead">
          <span class="od-ls-nearby__icon">${OD_ICON.navigationArrow}</span>
          <span class="od-ls-nearby__label">Explore nearby properties</span>
        </span>
        <span class="od-ls-nearby__caret">${OD_ICON.chevronRight}</span>
      </button>
    </div>`;
}

/** Matched tokens render regular, everything else semibold — the prototype
 * emphasises the part you did NOT type, which reads as the match standing out
 * against bolder context. */
function odSuggestionName(name, query) {
  const q = query.trim().toLowerCase();
  if (!q) return `<span class="od-ls-suggest__strong">${escapeHtml(name)}</span>`;
  const at = name.toLowerCase().indexOf(q);
  if (at === -1) return `<span class="od-ls-suggest__strong">${escapeHtml(name)}</span>`;
  return `<span class="od-ls-suggest__strong">${escapeHtml(name.slice(0, at))}</span>${escapeHtml(
    name.slice(at, at + q.length)
  )}<span class="od-ls-suggest__strong">${escapeHtml(name.slice(at + q.length))}</span>`;
}

function odSuggestionRowHtml(item, query) {
  return `<li class="od-ls-suggest">
    <button type="button" class="od-ls-suggest__btn" data-action="locality-search-pick" data-locality-name="${escapeHtml(item.name)}">
      <span class="od-ls-suggest__tile">${item.icon}</span>
      <span class="od-ls-suggest__body">
        <span class="od-ls-suggest__name">${odSuggestionName(item.name, query)}</span>
        <span class="od-ls-suggest__caption">${escapeHtml(item.caption)}</span>
      </span>
    </button>
  </li>`;
}

function odSearchResultsHtml(query) {
  const q = query.trim().toLowerCase();
  const localities = LOCALITY_POOL.filter((l) => l.name.toLowerCase().includes(q)).map((l) => ({
    name: `${l.name}, ${state.city || "Gurgaon"}`,
    caption: "Locality",
    icon: OD_ICON.pin,
  }));
  const projects = TRENDING_PROJECTS.filter((p) => p.name.toLowerCase().includes(q)).map((p) => ({
    name: p.name,
    caption: "Project",
    icon: ICON.buildings,
  }));
  const landmarks = (LANDMARKS_BY_CITY[state.city] || LANDMARKS_BY_CITY.Mumbai)
    .filter((l) => l.name.toLowerCase().includes(q))
    .map((l) => ({ name: `${l.name}, ${state.city || "Gurgaon"}`, caption: "Landmark", icon: OD_ICON.pin }));
  const results = [...localities, ...projects, ...landmarks].slice(0, 10);

  const queryRow = `<button type="button" class="od-ls-queryrow" data-action="locality-search-submit">
    <span class="od-ls-queryrow__icon">${ICON.arrowLeft}</span>
    <span class="od-ls-queryrow__text">Search for &ldquo;${escapeHtml(query.trim())}&rdquo;</span>
  </button>`;

  if (!results.length) {
    return `${queryRow}
      <div class="od-ls-empty">
        <div class="od-ls-empty__row">
          <span class="od-ls-alert">!</span>
          <p class="od-ls-empty__text">No matches yet, try a different search.</p>
        </div>
        <button type="button" class="od-ls-empty__cta" data-action="locality-search-explore-nearby">Explore all of ${escapeHtml(state.city || "Gurgaon")}</button>
      </div>`;
  }

  return `${queryRow}
    <ul class="od-ls-suggest-list">${results.map((r) => odSuggestionRowHtml(r, query)).join("")}</ul>`;
}

function odLocalitySearchSectionsHtml(query) {
  return query.trim() ? odSearchResultsHtml(query) : odDiscoveryPanelHtml();
}

function localitySearchScreen() {
  return `<div class="ol-screen od-ls-screen">
    <div class="od-ls-header">
      <div class="od-ls-topbar">
        <button type="button" class="od-ls-topbar__back" data-action="locality-search-back">
          <span class="od-ls-topbar__arrow">${ICON.arrowLeft}</span>
          <span class="od-ls-topbar__service">${odServiceLabel()}</span>
        </button>
        <button type="button" class="od-ls-topbar__city" data-action="locality-search-change-city">
          <span class="od-ls-topbar__pin">${OD_ICON.pin}</span>
          <span class="od-ls-topbar__cityname">${escapeHtml(state.city || "Gurgaon")}</span>
          <span class="od-ls-topbar__caret">${OD_ICON.chevronRight}</span>
        </button>
      </div>
      <div class="od-ls-input">
        <span class="od-ls-input__search">${OD_ICON.search}</span>
        <input
          type="text"
          class="od-ls-input__field"
          id="od-locality-search-input"
          placeholder="Search by locality, landmark or project"
          value="${escapeHtml(odLocalitySearchQuery)}"
          autocomplete="off"
          enterkeyhint="search"
        />
        <span class="od-ls-input__divider"></span>
        <button type="button" class="od-ls-input__clear" data-action="locality-search-clear" aria-label="Clear">${OD_ICON.close}</button>
      </div>
    </div>
    <div id="od-locality-search-sections" class="od-ls-body">${odLocalitySearchSectionsHtml(odLocalitySearchQuery)}</div>
  </div>`;
}

// -- Step 1: budget -----------------------------------------------------------

function currentBudgetSteps() {
  return state.service === "rent" ? BUDGET_STEPS_RENT : BUDGET_STEPS_BUY;
}

function budgetValue() {
  return currentBudgetSteps()[state.budgetIndex].value;
}

/** Shared plus/minus stepper markup — used for both Budget and BHK. Compact
 * variant sits inline in the top bar, vertically level with the back arrow
 * (extracted from the SRP BHK/budget bottom sheet's plus/minus pattern, but
 * native to this full-page screen rather than mounted in a sheet). `wrapId`
 * lets a tap patch just this node in place instead of a full render(). */
function odStepperHtml({ wrapId, value, label, minusAction, plusAction, minusDisabled, plusDisabled, compact }) {
  return `<div class="od-stepper ${compact ? "od-stepper--compact" : ""}" ${wrapId ? `id="${wrapId}"` : ""}>
    <button type="button" class="od-stepper__btn" data-action="${minusAction}" aria-label="Decrease" ${minusDisabled ? "disabled" : ""}>${OD_ICON.minus}</button>
    <div class="od-stepper__display" aria-live="polite" aria-atomic="true">
      <span class="od-stepper__value">${escapeHtml(label ?? String(value))}</span>
    </div>
    <button type="button" class="od-stepper__btn" data-action="${plusAction}" aria-label="Increase" ${plusDisabled ? "disabled" : ""}>${OD_ICON.plus}</button>
  </div>`;
}

/** Scroll-dial budget picker, reusing the SRP bottom sheet's wheel (markup +
 * CSS + physics) rather than a second implementation — the sheet's classes
 * come along with `createBudgetDialPicker`'s own CSS import. */
function budgetDialHtml() {
  const steps = currentBudgetSteps();
  return `<div class="od-step-centre">
    <div class="srp-budget-stepper" role="group" aria-label="Max budget">
      <button type="button" class="srp-budget-stepper__btn" data-action="budget-step-minus" aria-label="Decrease budget" ${state.budgetIndex === 0 ? "disabled" : ""}>${OD_ICON.minus}</button>
      <div class="srp-budget-stepper__picker">
        <div class="srp-ios-picker srp-ios-picker--dial srp-ios-picker--single srp-ios-picker--odometer" id="od-budget-picker"></div>
      </div>
      <button type="button" class="srp-budget-stepper__btn" data-action="budget-step-plus" aria-label="Increase budget" ${state.budgetIndex === steps.length - 1 ? "disabled" : ""}>${OD_ICON.plus}</button>
    </div>
  </div>`;
}

let odBudgetPicker = null;

function syncBudgetStepperButtons() {
  const last = currentBudgetSteps().length - 1;
  const minus = document.querySelector('[data-action="budget-step-minus"]');
  const plus = document.querySelector('[data-action="budget-step-plus"]');
  if (minus) minus.disabled = state.budgetIndex === 0;
  if (plus) plus.disabled = state.budgetIndex === last;
}

function mountBudgetDial() {
  const el = document.getElementById("od-budget-picker");
  if (!el) return;
  odBudgetPicker = createBudgetDialPicker(el, currentBudgetSteps(), {
    initialIndex: state.budgetIndex,
    onChange: (index) => {
      state.budgetIndex = index;
      syncBudgetStepperButtons();
    },
  });
}

function discoveryBudgetScreen() {
  const isRent = state.service === "rent";
  return `<div class="ol-screen ol-screen--has-cta od-flow od-step-screen">
    ${odTopBar("discovery-budget-back")}
    ${odProgressHtml("discovery-budget")}
    <h1 class="od-heading">${isRent ? "What's your monthly rent budget?" : "What's your max budget?"}</h1>
    ${budgetDialHtml()}
    ${odPageCta(`<button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-budget">${STRINGS["common.continue"]}</button>`)}
  </div>`;
}

// -- Step 2: BHK + property type ----------------------------------------------

function bhkIndex() {
  const idx = BHK_OPTIONS.indexOf(state.bhk);
  return idx === -1 ? 2 : idx;
}

/** Big centred BHK stepper, reusing the SRP bottom sheet's display (value +
 * suffix + rise/fall count animation) exactly as the budget dial does.
 * `direction` picks which way the number animates on a step. */
function bhkStepperHtml(direction = "settle") {
  const idx = bhkIndex();
  const [value, suffix] = BHK_OPTIONS[idx].split(" ");
  return `<div class="srp-bhk-stepper" id="od-bhk-stepper" role="group" aria-label="BHK type">
    <button type="button" class="srp-bhk-stepper__btn" data-action="bhk-step-minus" aria-label="Decrease BHK" ${idx <= 0 ? "disabled" : ""}>${OD_ICON.minus}</button>
    <div class="srp-bhk-stepper__display" aria-live="polite" aria-atomic="true">
      <span class="srp-bhk-stepper__value srp-bhk-stepper__value--${direction}">${value}</span>
      <span class="srp-bhk-stepper__suffix">${suffix}</span>
    </div>
    <button type="button" class="srp-bhk-stepper__btn" data-action="bhk-step-plus" aria-label="Increase BHK" ${idx === BHK_OPTIONS.length - 1 ? "disabled" : ""}>${OD_ICON.plus}</button>
  </div>`;
}

function discoveryBhkScreen() {
  return `<div class="ol-screen ol-screen--has-cta od-flow od-step-screen">
    ${odTopBar("discovery-bhk-back")}
    ${odProgressHtml("discovery-bhk")}
    <h1 class="od-heading">Which configuration?</h1>
    <div class="od-step-centre">${bhkStepperHtml()}</div>
    <p class="ol-section-label">Property type</p>
    <div class="od-chip-grid" id="od-property-type-grid">
      ${PROPERTY_TYPE_OPTIONS.map(
        (opt) =>
          `<button type="button" class="od-chip ${state.propertyType === opt ? "is-active" : ""}" data-action="pick-property-type" data-value="${opt}" aria-pressed="${state.propertyType === opt}">${opt}</button>`
      ).join("")}
    </div>
    ${odPageCta(`<button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-bhk" ${state.propertyType ? "" : "disabled"}>${STRINGS["common.continue"]}</button>`)}
  </div>`;
}

// -- Step 3: landmark search ---------------------------------------------------

let odLandmarkQuery = "";

/** Single row of landmark pills: a handful of obviously-known places
 * (metro stations, big offices/malls) plus any landmark the user picked
 * via search that isn't already in that set — so a picked landmark is
 * never rendered as a second, separate row below this one. Picking one
 * toggles it selected *in place* (fills in with the selected color) rather
 * than moving it anywhere. Hidden while actively typing a search query,
 * where the results dropdown takes over instead. */
function landmarkPillsHtml() {
  if (odLandmarkQuery.trim()) return "";
  const pool = LANDMARKS_BY_CITY[state.city] || LANDMARKS_BY_CITY.Gurgaon;
  const popular = pool.slice(0, 4);
  const extraSelected = state.landmarks.filter((l) => !popular.some((p) => p.id === l.id));
  const items = [...popular, ...extraSelected];
  if (!items.length) return "";
  const selectedIds = new Set(state.landmarks.map((l) => l.id));
  return `<div class="od-landmark-suggestions">
    <p class="od-landmark-suggestions__label">Popular nearby</p>
    <div class="od-landmark-suggestions__chips">
      ${items
        .map((l) => {
          const selected = selectedIds.has(l.id);
          return `<button type="button" class="od-landmark-suggestion ${selected ? "is-selected" : ""}" data-action="toggle-landmark" data-landmark-id="${l.id}" aria-pressed="${selected}">
              <span class="od-landmark-suggestion__icon">${LANDMARK_CATEGORY_ICON[l.category] || OD_ICON.pin}</span>
              ${escapeHtml(l.name)}
            </button>`;
        })
        .join("")}
    </div>
  </div>`;
}

/** The 2-item cap is on named landmarks a user actually searched/picked —
 * "current location" is a separate, at-most-one addition and shouldn't eat
 * into that budget. */
function namedLandmarkCount() {
  return state.landmarks.filter((l) => l.id !== "current-location").length;
}

function landmarkResultsHtml() {
  if (namedLandmarkCount() >= 2) return "";
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

/** Shown from the moment the screen mounts (not just once a landmark is
 * picked) — same "coming into focus" device as the budget/BHK screens, so
 * this step doesn't read as an empty page while the search field is idle. */
function landmarkPreviewMapHtml() {
  return mapIllustrationHtml(
    state.landmarks.map((l, i) => ({ label: String(i + 1), coords: l.coords })),
    { id: "od-landmark-map" }
  );
}

function mountLandmarkMap() {
  mountDiscoveryMap("od-landmark-map", {
    center: cityCenter(state.city),
    pins: state.landmarks.map((l, i) =>
      l.id === "current-location"
        ? { variant: "current", icon: "", coords: l.coords, title: l.name }
        : { label: String(i + 1), coords: l.coords }
    ),
  });
}

/** Cosmetic only — a fake, cycling placeholder ("Search landmark", "Search
 * hospital", …) since a native <input placeholder> can't animate just part
 * of itself. The real accessible hint lives in the input's aria-label; this
 * overlay is aria-hidden and disappears the moment there's a real value. */
const LANDMARK_GHOST_WORDS = ["landmark", "hospital", "school", "metro", "office"];
let landmarkGhostInterval = null;
let landmarkGhostIndex = 0;

function mountLandmarkGhost() {
  const ghost = document.getElementById("od-landmark-ghost");
  const word = document.getElementById("od-landmark-ghost-word");
  if (!ghost || !word) return;
  landmarkGhostIndex = 0;
  word.textContent = LANDMARK_GHOST_WORDS[0];
  ghost.style.display = odLandmarkQuery ? "none" : "";
  landmarkGhostInterval = window.setInterval(() => {
    word.classList.add("is-swapping");
    window.setTimeout(() => {
      landmarkGhostIndex = (landmarkGhostIndex + 1) % LANDMARK_GHOST_WORDS.length;
      word.textContent = LANDMARK_GHOST_WORDS[landmarkGhostIndex];
      word.classList.remove("is-swapping");
    }, 180);
  }, 1800);
}

function stopLandmarkGhost() {
  if (landmarkGhostInterval) {
    window.clearInterval(landmarkGhostInterval);
    landmarkGhostInterval = null;
  }
}

function renderLandmarkPicker() {
  const results = document.getElementById("od-landmark-results-wrap");
  if (results) results.innerHTML = landmarkResultsHtml();
  const suggestions = document.getElementById("od-landmark-suggestions-wrap");
  if (suggestions) suggestions.innerHTML = landmarkPillsHtml();
  const detect = document.getElementById("od-landmark-detect-wrap");
  if (detect) detect.innerHTML = detectLocationButtonHtml();
  const ghost = document.getElementById("od-landmark-ghost");
  if (ghost) ghost.style.display = odLandmarkQuery ? "none" : "";
  const input = document.getElementById("od-landmark-input");
  if (input) input.disabled = namedLandmarkCount() >= 2;
  const mapWrap = document.getElementById("od-landmark-map-wrap");
  if (mapWrap) {
    mapWrap.innerHTML = landmarkPreviewMapHtml();
    mountLandmarkMap();
  }
  const secondaryCta = document.getElementById("od-landmark-secondary-cta-wrap");
  if (secondaryCta) secondaryCta.innerHTML = landmarkSecondaryCtaHtml();
  const primaryCta = document.getElementById("od-landmark-primary-cta-wrap");
  if (primaryCta) primaryCta.innerHTML = landmarkPrimaryCtaHtml();
}

/** Hidden once at least one landmark is picked — "no specific place in
 * mind" contradicts the state once the user has already named one. */
function landmarkSecondaryCtaHtml() {
  if (state.landmarks.length > 0) return "";
  return odSecondaryCta("no-landmark-preference", "Not sure");
}

/** Continue only appears once there's something to continue *with* — with
 * zero landmarks picked, "Continue" and the secondary "no specific place"
 * button led to the exact same next step, which was pure decision noise
 * (two buttons, one outcome). One clear action per state instead. */
function landmarkPrimaryCtaHtml() {
  if (state.landmarks.length === 0) return "";
  return `<button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-landmarks">${STRINGS["common.continue"]}</button>`;
}

/** Hidden once the 2 named-landmark cap is hit, or once current location is
 * already added — nothing left this control can add either way. */
function detectLocationButtonHtml() {
  if (namedLandmarkCount() >= 2 || state.landmarks.some((l) => l.id === "current-location")) return "";
  return `<button type="button" class="od-detect-location" data-action="detect-location">
    <span class="od-detect-location__icon">${OD_ICON.navigationArrow}</span>
    <span class="od-detect-location__label">Detect current location</span>
  </button>`;
}

function discoveryLandmarksScreen() {
  const capped = namedLandmarkCount() >= 2;
  return `<div class="ol-screen ol-screen--has-cta od-flow">
    ${odTopBar("discovery-landmarks-back")}
    ${odProgressHtml("discovery-landmarks")}
    <h1 class="od-heading">Anything you'd like to stay close to?</h1>
    <div class="od-search-field">
      <input
        type="text"
        class="od-search-field__input"
        id="od-landmark-input"
        placeholder=""
        aria-label="Search a landmark, hospital, school, metro, office"
        value="${escapeHtml(odLandmarkQuery)}"
        autocomplete="off"
        ${capped ? "disabled" : ""}
      />
      <span class="od-search-field__ghost" id="od-landmark-ghost" aria-hidden="true">Search <span class="od-search-field__ghost-word" id="od-landmark-ghost-word">${LANDMARK_GHOST_WORDS[0]}</span></span>
      <span class="od-search-field__icon">${OD_ICON.search}</span>
      <div id="od-landmark-results-wrap" class="od-landmark-results-wrap">${landmarkResultsHtml()}</div>
    </div>
    <div id="od-landmark-detect-wrap">${detectLocationButtonHtml()}</div>
    <div id="od-landmark-suggestions-wrap">${landmarkPillsHtml()}</div>
    ${capped ? `<p class="od-landmark-cap-note">2 of 2 added, remove one to search again.</p>` : ""}
    <div id="od-landmark-map-wrap">${landmarkPreviewMapHtml()}</div>
    ${odPageCta(
      `<div id="od-landmark-primary-cta-wrap">${landmarkPrimaryCtaHtml()}</div>`,
      `<div id="od-landmark-secondary-cta-wrap">${landmarkSecondaryCtaHtml()}</div>`
    )}
  </div>`;
}

// -- Step 4: commute tolerance (only if anchors picked) ------------------------

function discoveryCommuteScreen() {
  return `<div class="ol-screen ol-screen--has-cta od-flow">
    ${odTopBar("discovery-commute-back")}
    ${odProgressHtml("discovery-commute")}
    <h1 class="od-heading">How far are you willing to commute?</h1>
    <div class="od-choice-list" id="od-commute-list">
      ${COMMUTE_OPTIONS.map((opt) =>
        odChoiceCardHtml({
          action: "pick-commute",
          value: opt.id,
          icon: commuteBarsHtml(opt.id),
          label: opt.label,
          selected: state.commuteTolerance === opt.id,
          trailing: opt.distanceLabel,
        })
      ).join("")}
    </div>
    ${odPageCta(`<button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-commute" ${state.commuteTolerance ? "" : "disabled"}>${STRINGS["common.continue"]}</button>`)}
  </div>`;
}

// -- Step 5: intent (buy only, optional) + lifestyle tags (optional, multi-select) --
// Merged onto one screen — both are optional single-question steps with no
// dependency on each other, so splitting them cost an extra tap for nothing.

function discoveryLifestyleScreen() {
  const isBuy = state.service === "buy";
  return `<div class="ol-screen ol-screen--has-cta od-flow">
    ${odTopBar("discovery-lifestyle-back")}
    ${odProgressHtml("discovery-lifestyle")}
    <h1 class="od-heading">A couple more things (optional)</h1>
    ${
      isBuy
        ? `<p class="ol-section-label">Is this to live in, or an investment?</p>
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
    </div>`
        : ""
    }
    <p class="ol-section-label">What matters most where you live?</p>
    <div class="od-chip-grid">
      ${LIFESTYLE_TAGS.map((tag) => {
        const active = state.lifestyleTags.includes(tag.id);
        return `<button type="button" class="od-chip ${active ? "is-active" : ""}" data-action="toggle-lifestyle-tag" data-value="${tag.id}" aria-pressed="${active}">${tag.label}</button>`;
      }).join("")}
    </div>
    ${odPageCta(
      `<button type="button" class="ol-btn ol-btn--primary" data-action="discovery-continue" data-from="discovery-lifestyle">See recommended localities</button>`,
      odSecondaryCta("discovery-skip-lifestyle", STRINGS["common.skip"])
    )}
  </div>`;
}

// -- Final: recommendations screen (list-first, live map) --------------------

/** Real Leaflet map on CARTO's free, keyless "Positron" light tiles — swaps
 * the old static SVG illustration for an actual live map centered on the
 * user's real city coordinates (see cityCenter/CITY_CENTERS), with numbered
 * pin markers at each result's real (mock-jittered, not geocoded) lat/lng.
 * One live instance per container id; re-mounting destroys the previous one
 * so patchNode-driven re-renders (landmark add/remove) don't leak instances. */
const activeDiscoveryMaps = {};

function destroyDiscoveryMap(id) {
  activeDiscoveryMaps[id]?.remove();
  delete activeDiscoveryMaps[id];
}

function mountDiscoveryMap(id, { center, pins, circles }) {
  const el = document.getElementById(id);
  if (!el) return;
  destroyDiscoveryMap(id);

  const map = L.map(el, {
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: false,
  }).setView(center, 13);

  // Every "sharper" alternative tried here has failed in real browser use
  // despite passing a plain curl check — CARTO's basemap gateway domain
  // needs a key, Wikimedia's tile server 403s non-Wikimedia origins, and
  // CARTO's CDN domain (basemaps.cartocdn.com) also started demanding a key
  // once real map traffic (repeated tile requests with a Referer header)
  // hit it, even though a single referrer-less curl request passed clean.
  // Stop chasing free retina tile CDNs — plain openstreetmap.org has been
  // the one genuinely reliable, key-free, no-referrer-check source this
  // whole project. Standard 1x/256px tiles (not sharp on retina, but
  // actually loads) beat a sharper source that silently stops working.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    subdomains: "abc",
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const bounds = [];

  // Recommendations screen only: a soft, mild circumference ring around each
  // anchor landmark/metro station, sized to the user's chosen commute tolerance travel distance.
  // Drawn and included in bounds fitting so the full reachable area is cleanly framed.
  (circles || []).forEach((c) => {
    if (!c.coords || !c.radiusMeters) return;
    const circle = L.circle(c.coords, {
      radius: c.radiusMeters,
      color: "var(--ds-color-purple-600, #7c3aed)",
      weight: 1.5,
      dashArray: "5, 5",
      opacity: 0.75,
      fillColor: "var(--ds-color-purple-500, #8b5cf6)",
      fillOpacity: 0.08,
    }).addTo(map);

    if (c.label) {
      circle.bindTooltip(c.label, {
        permanent: false,
        direction: "top",
        className: "od-map-circle-tooltip",
      });
    }

    const circleBounds = circle.getBounds();
    bounds.push(circleBounds.getSouthWest());
    bounds.push(circleBounds.getNorthEast());
  });

  pins.forEach((p) => {
    if (!p.coords) return;
    const isAnchor = p.variant === "anchor";
    // "You are here" — a plain pulsing dot, no icon/number glyph inside it.
    const isCurrent = p.variant === "current";
    const icon = L.divIcon({
      className: "od-leaflet-div-icon",
      html: isCurrent
        ? `<div class="od-map-pin-container"><span class="od-map-pin-badge od-map-pin-badge--current"></span></div>`
        : `<div class="od-map-pin-container ${isAnchor ? "od-map-pin-container--anchor" : ""}">
        <span class="od-map-pin-badge ${p.variant ? `od-map-pin-badge--${p.variant}` : ""}">
          ${p.icon || p.label}
        </span>
        ${p.title && isAnchor ? `<span class="od-map-pin-label">${escapeHtml(p.title)}</span>` : ""}
      </div>`,
      iconSize: isAnchor ? [120, 48] : [22, 22],
      iconAnchor: isAnchor ? [60, 24] : [11, 11],
    });

    const marker = L.marker(p.coords, { icon }).addTo(map);
    if (p.tooltip) {
      marker.bindTooltip(p.tooltip, {
        direction: "top",
        offset: [0, -14],
        className: "od-map-pin-tooltip",
      });
    }
    bounds.push(p.coords);
  });

  // A single pin (e.g. just "Current location", picked with nothing else
  // selected yet) never hit this — the map stayed at its initial setView on
  // the mock city center, so a real GPS fix miles from that fake center
  // was added correctly but sat off-screen, invisible without panning.
  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
  } else if (bounds.length === 1) {
    map.setView(bounds[0], 15);
  }

  activeDiscoveryMaps[id] = map;
  // A map mounted while its container was display:none or off-flow (a
  // fresh screen's fade-in, or the shared results/landmarks container)
  // renders at the wrong size until Leaflet re-measures it.
  requestAnimationFrame(() => map.invalidateSize());
}

function mapIllustrationHtml(pins, { id } = {}) {
  const mapId = id || `od-map-${Math.random().toString(36).slice(2, 9)}`;
  return `<div class="od-map-illustration" id="${mapId}"></div>`;
}

/** Recommendations screen only: scrolling the locality list shrinks the map
 * zone to a sliver (see .od-map-full--drawer-open) so the drawer reads as
 * "opened" — mirrors the scroll-to-expand feel of a map+list app. Re-wired
 * fresh on every render() since the drawer body is a brand-new element each
 * time (full innerHTML replace), so there's no listener to leak. */
// Must match the flex-basis transition duration on .od-map-full__map-zone —
// how long the rAF loop below keeps Leaflet's canvas in sync with it.
const DRAWER_MAP_TRANSITION_MS = 380;

function wireResultsDrawerScroll() {
  const body = document.getElementById("od-drawer-body");
  const container = document.getElementById("od-map-full");
  const handle = document.getElementById("od-drawer-handle-row");
  if (!body || !container) return;
  let open = false;
  let transitioning = false;
  let rafId = null;

  // The visible "jerk" wasn't the flex-basis transition itself — it was
  // Leaflet's canvas staying the old size for the whole animation and then
  // popping to the right size in one frame once invalidateSize() finally
  // fired. Calling it every frame for the transition's duration keeps the
  // map's own resize in step with the CSS animation instead of lagging
  // behind it, so it reads as one smooth motion.
  const syncMapSize = (deadline) => {
    activeDiscoveryMaps["od-results-map"]?.invalidateSize({ animate: false, pan: false });
    if (performance.now() < deadline) {
      rafId = requestAnimationFrame(() => syncMapSize(deadline));
    } else {
      rafId = null;
    }
  };

  // Two separate gestures, not one blended motion: the first scroll/swipe
  // only opens the drawer (list stays locked, can't scroll underneath the
  // panel animation); a second, later gesture is what actually scrolls the
  // list. Enforced by keeping the body non-scrollable (overflow hidden)
  // until the open/close transition has fully settled.
  const setOpen = (next) => {
    if (open === next || transitioning) return;
    open = next;
    transitioning = true;
    container.classList.toggle("od-map-full--drawer-open", open);
    body.style.overflowY = "hidden";
    if (rafId) cancelAnimationFrame(rafId);
    syncMapSize(performance.now() + DRAWER_MAP_TRANSITION_MS);
    window.setTimeout(() => {
      transitioning = false;
      if (open) {
        body.style.overflowY = "auto";
      } else {
        body.scrollTop = 0;
      }
    }, DRAWER_MAP_TRANSITION_MS);
  };

  body.style.overflowY = "hidden";

  // Keyboard/switch-access path — the gesture listeners below only fire on
  // touch/wheel, so a keyboard-only user had no way to reach the drawer at
  // all. The handle row is a real button: Enter/Space and click both open it.
  if (handle) {
    handle.addEventListener("click", () => setOpen(!open));
  }

  let touchStartY = null;
  let openedThisTouch = false;

  body.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      openedThisTouch = false;
    },
    { passive: true }
  );

  body.addEventListener(
    "touchmove",
    (e) => {
      if (touchStartY === null || transitioning) {
        e.preventDefault();
        return;
      }
      const draggedUp = touchStartY - e.touches[0].clientY; // >0 = finger moving up
      if (!open) {
        if (draggedUp > 10) {
          e.preventDefault();
          openedThisTouch = true;
          setOpen(true);
        }
        return;
      }
      if (openedThisTouch) {
        // Same continuous touch that just opened the drawer — don't also
        // let it scroll the list; wait for the next, separate gesture.
        e.preventDefault();
        return;
      }
      if (body.scrollTop <= 0 && draggedUp < -10) {
        // This is the one branch that was missing preventDefault — left
        // unhandled, the same downward drag that closes the drawer also
        // reads to the browser as a page-level pull past the top, which
        // is exactly what triggers Chrome's native pull-to-refresh.
        e.preventDefault();
        setOpen(false);
      }
    },
    { passive: false }
  );

  body.addEventListener(
    "touchend",
    () => {
      touchStartY = null;
      openedThisTouch = false;
    },
    { passive: true }
  );

  // Desktop convenience — same gating for wheel/trackpad scrolling.
  body.addEventListener(
    "wheel",
    (e) => {
      if (transitioning) {
        e.preventDefault();
        return;
      }
      if (!open && e.deltaY > 0) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (open && body.scrollTop <= 0 && e.deltaY < 0) {
        setOpen(false);
      }
    },
    { passive: false }
  );
}

/** Budget line derives from the same price-band signal the mock ranking
 * already computes (`estimated_price` — see getRecommendedLocalities) — no
 * new scoring, just a display range around that number. */
function localityBudgetLine(loc) {
  const unit = state.service === "rent" ? "rent" : "buy";
  const low = formatLocalityBudget(loc.estimated_price * 0.9, unit);
  const high = formatLocalityBudget(loc.estimated_price * 1.15, unit);
  return `${low} - ${high}`;
}

function localityBadgeLabel(loc, rank) {
  if (rank === 1) return "Recommended";
  if (rank !== null) return "Also matches";
  if (loc.price_band_match === "within_budget") return "In budget";
  if (loc.price_band_match === "below_budget") return "Great value";
  return "Above budget";
}

function localityCardHtml(loc, rank) {
  const isPrimary = rank !== null;
  // Only the #1 "Recommended" card gets the primary (filled purple) CTA —
  // every other card, including ranks 2-5 "Also matches", was using the
  // same primary button, which flattened the one actual recommendation
  // to look identical to five other options.
  const isTopPick = rank === 1;
  const distanceLine = loc.distance_from_landmarks && loc.distance_from_landmarks.length
    ? loc.distance_from_landmarks.map((d) => `${d.minutes} min (~${d.km} km) from ${d.landmark_name}`).join(" • ")
    : loc.matched_signals[0] || "Good match for your search";
  // "More options" cards only — the #1-5 primary picks already carry the
  // rank badge and don't need a thumbnail to be scannable; a flat, fixed
  // Unsplash CDN URL (not the old source.unsplash.com random-redirect
  // endpoint, which is deprecated and flaky) keeps this reliable.
  const thumb = isPrimary
    ? ""
    : `<img class="od-locality-card__thumb" src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=160&h=160&fit=crop&q=60&auto=format" width="56" height="56" loading="lazy" alt="" onerror="this.remove()" />`;
  return `<div class="od-locality-card ${isPrimary ? "" : "od-locality-card--secondary"}">
    ${isPrimary ? `<span class="od-locality-card__rank">${rank}</span>` : thumb}
    <div class="od-locality-card__body">
      <div class="od-locality-card__head">
        <h2 class="od-locality-card__name">${escapeHtml(loc.name)}</h2>
        <span class="od-signal-badge od-signal-badge--rank ${isTopPick ? "od-signal-badge--recommended" : ""}">${localityBadgeLabel(loc, rank)}</span>
      </div>
      <p class="od-locality-card__budget">${escapeHtml(localityBudgetLine(loc))}</p>
      <p class="od-locality-card__distance">${escapeHtml(distanceLine)}</p>
      <button type="button" class="od-locality-card__cta ${isTopPick ? "" : "od-locality-card__cta--secondary"}" data-action="explore-locality" data-locality-id="${loc.id}" data-locality-name="${escapeHtml(loc.name)}">Explore locality</button>
    </div>
  </div>`;
}

/** The travel-radius circle only means something when the user actually
 * picked a commute tolerance — "flexible" has no upper bound, and no
 * selection at all has no distance to show. Previously this silently fell
 * back to a generic 30-min circle in both cases, which drew a radius the
 * user never chose. Returns null when there's nothing real to draw. */
function selectedCommuteRadiusKm() {
  const commuteOpt = COMMUTE_OPTIONS.find((c) => c.id === state.commuteTolerance);
  if (!commuteOpt || !Number.isFinite(commuteOpt.maxMinutes)) return null;
  return commuteMinutesToKm(commuteOpt.maxMinutes);
}

function discoveryMapScreen() {
  const ranked = state.recommendedLocalities;
  const primary = ranked.slice(0, 5);
  const secondary = ranked.slice(5);
  const hasAnchors = state.landmarks.length > 0;
  const radiusKm = selectedCommuteRadiusKm();
  // One clean line instead of the old separate "stay closer to" panel +
  // map legend block — same info (which anchors, what radius), said once.
  // No invented distance when the user didn't pick a commute tolerance.
  const anchorNote = hasAnchors
    ? radiusKm !== null
      ? `Within ~${Math.round(radiusKm * 10) / 10} km of ${state.landmarks.map((l) => escapeHtml(l.name)).join(" & ")}`
      : `Near ${state.landmarks.map((l) => escapeHtml(l.name)).join(" & ")}`
    : "";

  // Plain flex column, top-to-bottom, both zones always in normal flow — no
  // position:absolute drawer, no transform/dvh peek-collapse animation. That
  // mechanic (see git history) kept silently failing in ways that made the
  // whole drawer invisible and ate map interaction with it. This can't do
  // that: the drawer's list is always laid out and always paintable.
  return `<div class="ol-screen od-flow od-map-full" id="od-map-full">
    <div class="od-map-full__map-zone">
      <div class="od-map-full__canvas" id="od-results-map"></div>
      <div class="od-map-full__topbar">
        <button type="button" class="ol-icon-btn od-map-full__back" data-action="discovery-map-back" aria-label="Back">${ICON.arrowLeft}</button>
        ${anchorNote ? `<span class="od-map-full__note">${anchorNote}</span>` : ""}
      </div>
    </div>
    <div class="od-drawer">
      <button type="button" class="od-drawer__handle-row" id="od-drawer-handle-row" aria-label="Toggle recommended localities list">
        <span class="od-drawer__handle"></span>
        <span class="od-drawer__header">
          <span class="od-drawer__title">Recommended localities</span>
        </span>
      </button>
      <div class="od-drawer__body" id="od-drawer-body">
        <div class="od-locality-list">
          ${primary.map((l, i) => localityCardHtml(l, i + 1)).join("")}
          ${secondary.length ? `<p class="od-locality-list__label">More options</p>` : ""}
          ${secondary.map((l) => localityCardHtml(l, null)).join("")}
        </div>
        ${ranked.length === 0 ? `<p class="od-empty-note">No matching localities yet, try widening your budget.</p>` : ""}
      </div>
    </div>
  </div>`;
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
    <h1 class="od-heading od-heading--lg ol-title--center">You're all set</h1>
    <p class="ol-login__sub ol-login__sub--center">Here's what we collected in this prototype run</p>
    <dl class="ol-summary">
      <div><dt>Service</dt><dd>${state.service ? state.service[0].toUpperCase() + state.service.slice(1) : "Not set"}</dd></div>
      <div><dt>Phone</dt><dd>${state.phone ? `+${state.countryCode} ${escapeHtml(state.phone)}` : "Not set"}</dd></div>
      <div><dt>Name</dt><dd>${state.name ? escapeHtml(state.name) : "Not set"}</dd></div>
      <div><dt>Email</dt><dd>${state.email ? escapeHtml(state.email) : "Not set"}</dd></div>
      <div><dt>City</dt><dd>${state.city ? escapeHtml(state.city) : "Not set"}</dd></div>
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
  "locality-search": localitySearchScreen,
  "discovery-budget": discoveryBudgetScreen,
  "discovery-bhk": discoveryBhkScreen,
  "discovery-landmarks": discoveryLandmarksScreen,
  "discovery-commute": discoveryCommuteScreen,
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
        state.city = "Gurgaon";
        afterCityPicked();
        break;
      case "pick-city":
        state.city = btn.getAttribute("data-city");
        afterCityPicked();
        break;
      case "pick-letter":
        activeLetter = btn.getAttribute("data-letter");
        patchNode("ol-city-results", `<div id="ol-city-results" class="ol-city-results">${cityResultsHtml()}</div>`);
        break;
      case "clear-city-search":
      case "city-voice-search": {
        citySearchQuery = action === "city-voice-search" ? "Pune" : "";
        const input = root.querySelector("#ol-city-search");
        if (input) input.value = citySearchQuery;
        patchNode("ol-city-results", `<div id="ol-city-results" class="ol-city-results">${cityResultsHtml()}</div>`);
        break;
      }
      case "locality-check-back":
        goTo("locality");
        break;
      case "locality-check-yes":
        // "I know it" must never touch budget/BHK/landmarks — it goes to the
        // locality/area search screen, which then hands off to SRP itself
        // once a locality is picked (or "explore nearby" is tapped).
        state.discoveryMode = "know_locality";
        odLocalitySearchQuery = "";
        goTo("locality-search");
        break;
      case "locality-search-back":
        goTo("locality-check");
        break;
      case "locality-search-pick": {
        const name = btn.getAttribute("data-locality-name");
        exploreLocality(null, name);
        break;
      }
      case "locality-search-explore-nearby":
        handoffToSearchPreFiltered();
        break;
      case "locality-search-change-city":
        goTo("locality");
        break;
      case "locality-search-submit": {
        const typed = odLocalitySearchQuery.trim();
        if (typed) exploreLocality(null, typed);
        break;
      }
      case "locality-search-clear": {
        odLocalitySearchQuery = "";
        const field = root.querySelector("#od-locality-search-input");
        if (field) field.value = "";
        patchNode(
          "od-locality-search-sections",
          `<div id="od-locality-search-sections" class="od-ls-body">${odLocalitySearchSectionsHtml("")}</div>`
        );
        break;
      }
      case "locality-check-not-sure":
        state.discoveryMode = "discover";
        goTo("discovery-budget");
        break;
      case "discovery-budget-back":
        goTo("locality-check");
        break;
      case "budget-step-minus":
        haptic(8);
        odBudgetPicker?.setIndex(Math.max(0, state.budgetIndex - 1));
        break;
      case "budget-step-plus":
        haptic(8);
        odBudgetPicker?.setIndex(Math.min(currentBudgetSteps().length - 1, state.budgetIndex + 1));
        break;
      case "discovery-bhk-back":
        goTo("discovery-budget");
        break;
      case "bhk-step-minus": {
        const idx = bhkIndex();
        if (idx > 0) state.bhk = BHK_OPTIONS[idx - 1];
        haptic(8);
        patchNode("od-bhk-stepper", bhkStepperHtml("fall"));
        break;
      }
      case "bhk-step-plus": {
        const idx = bhkIndex();
        state.bhk = BHK_OPTIONS[Math.min(BHK_OPTIONS.length - 1, idx + 1)];
        haptic(8);
        patchNode("od-bhk-stepper", bhkStepperHtml("rise"));
        break;
      }
      case "pick-property-type":
        // Patch the chip classes in place — a full render() here was the
        // source of the full-page flash/CLS on a plain chip tap.
        state.propertyType = btn.getAttribute("data-value");
        root.querySelectorAll('[data-action="pick-property-type"]').forEach((el) => {
          const isActive = el.getAttribute("data-value") === state.propertyType;
          el.classList.toggle("is-active", isActive);
          el.setAttribute("aria-pressed", String(isActive));
        });
        root.querySelector('[data-action="discovery-continue"][data-from="discovery-bhk"]')?.removeAttribute("disabled");
        haptic(10);
        break;
      case "discovery-landmarks-back":
        goTo("discovery-bhk");
        break;
      case "pick-landmark": {
        // From the typed-search results dropdown only — always adds (the
        // dropdown itself already excludes anything at the 2-landmark cap).
        const landmarkId = btn.getAttribute("data-landmark-id");
        const pool = LANDMARKS_BY_CITY[state.city] || LANDMARKS_BY_CITY.Gurgaon;
        const found = pool.find((l) => l.id === landmarkId);
        const alreadyAdded = state.landmarks.some((l) => l.id === landmarkId);
        if (!found || alreadyAdded || namedLandmarkCount() >= 2) break;
        state.landmarks.push({ id: found.id, name: found.name, category: found.category, coords: landmarkCoords(state.city, found) });
        odLandmarkQuery = "";
        haptic(10);
        renderLandmarkPicker();
        break;
      }
      case "toggle-landmark": {
        // From the "Popular nearby" row — the same pill selects/deselects
        // in place instead of moving into a separate row once picked.
        const landmarkId = btn.getAttribute("data-landmark-id");
        const existingIdx = state.landmarks.findIndex((l) => l.id === landmarkId);
        if (existingIdx !== -1) {
          state.landmarks.splice(existingIdx, 1);
        } else {
          if (namedLandmarkCount() >= 2) break;
          const pool = LANDMARKS_BY_CITY[state.city] || LANDMARKS_BY_CITY.Gurgaon;
          const found = pool.find((l) => l.id === landmarkId);
          if (!found) break;
          state.landmarks.push({ id: found.id, name: found.name, category: found.category, coords: landmarkCoords(state.city, found) });
        }
        haptic(10);
        renderLandmarkPicker();
        break;
      }
      case "detect-location": {
        if (!navigator.geolocation) {
          showToast("Location isn't available on this device");
          break;
        }
        if (namedLandmarkCount() >= 2 || state.landmarks.some((l) => l.id === "current-location")) break;
        btn.disabled = true;
        // Swap only the label, keep the icon in place — replacing the whole
        // button content (was btn.textContent = "Detecting…") dropped the
        // icon and reflowed the button's own box, which is what nudged
        // everything below it down for a moment.
        const label = btn.querySelector(".od-detect-location__label");
        if (label) label.textContent = "Detecting…";

        // Belt-and-suspenders against getting stuck: getCurrentPosition's own
        // `timeout` option isn't reliably honored by every browser when the
        // permission prompt is silently blocked (no prompt shown, neither
        // callback ever fires) — a plain JS timeout guarantees the button
        // always recovers. `settled` stops whichever fires second (real
        // callback vs. this timeout) from double-handling the result.
        let settled = false;
        const resetButton = () => {
          btn.disabled = false;
          if (label) label.textContent = "Detect current location";
        };
        const giveUp = window.setTimeout(() => {
          if (settled) return;
          settled = true;
          resetButton();
          showToast("Couldn't get your location — check permissions");
        }, 12000);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(giveUp);
            if (namedLandmarkCount() >= 2 || state.landmarks.some((l) => l.id === "current-location")) {
              renderLandmarkPicker();
              return;
            }
            state.landmarks.push({
              id: "current-location",
              name: "Current location",
              category: "current",
              coords: [position.coords.latitude, position.coords.longitude],
            });
            haptic(10);
            renderLandmarkPicker();
          },
          () => {
            if (settled) return;
            settled = true;
            window.clearTimeout(giveUp);
            resetButton();
            showToast("Couldn't get your location — check permissions");
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
        break;
      }
      case "no-landmark-preference":
        state.landmarks = [];
        odLandmarkQuery = "";
        haptic(10);
        goTo(nextDiscoveryStep("discovery-landmarks"));
        break;
      case "discovery-commute-back":
        goTo("discovery-landmarks");
        break;
      case "pick-commute":
        state.commuteTolerance = btn.getAttribute("data-value");
        root.querySelectorAll('[data-action="pick-commute"]').forEach((el) => {
          const isSelected = el.getAttribute("data-value") === state.commuteTolerance;
          el.classList.toggle("is-selected", isSelected);
          el.setAttribute("aria-pressed", String(isSelected));
        });
        root.querySelector('[data-action="discovery-continue"][data-from="discovery-commute"]')?.removeAttribute("disabled");
        haptic(10);
        break;
      case "pick-intent":
        state.intent = btn.getAttribute("data-value");
        root.querySelectorAll('[data-action="pick-intent"]').forEach((el) => {
          const isSelected = el.getAttribute("data-value") === state.intent;
          el.classList.toggle("is-selected", isSelected);
          el.setAttribute("aria-pressed", String(isSelected));
        });
        haptic(10);
        break;
      case "discovery-lifestyle-back":
        goTo(previousDiscoveryStep("discovery-lifestyle"));
        break;
      case "discovery-skip-lifestyle":
        beginLocalityMatch();
        break;
      case "toggle-lifestyle-tag": {
        // Same in-place patch as property type — no re-render on a chip tap.
        const tagId = btn.getAttribute("data-value");
        state.lifestyleTags = state.lifestyleTags.includes(tagId)
          ? state.lifestyleTags.filter((t) => t !== tagId)
          : [...state.lifestyleTags, tagId];
        btn.classList.toggle("is-active", state.lifestyleTags.includes(tagId));
        btn.setAttribute("aria-pressed", String(state.lifestyleTags.includes(tagId)));
        haptic(8);
        break;
      }
      case "discovery-continue": {
        const from = btn.getAttribute("data-from");
        // The CTA is disabled until its required selection is made (see
        // discoveryBhkScreen/discoveryCommuteScreen), so a disabled button
        // never dispatches click — this is just a defensive backstop, no
        // toast/shake needed anymore.
        if (from === "discovery-bhk" && !state.propertyType) break;
        if (from === "discovery-commute" && !state.commuteTolerance) break;
        if (from === "discovery-lifestyle") {
          haptic(10);
          beginLocalityMatch();
          break;
        }
        haptic(10);
        goTo(nextDiscoveryStep(from));
        break;
      }
      case "discovery-map-back":
        goTo("discovery-lifestyle");
        break;
      case "explore-locality":
        exploreLocality(btn.getAttribute("data-locality-id"), btn.getAttribute("data-locality-name"));
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
          bhk: BHK_OPTIONS[2],
          propertyType: null,
          landmarks: [],
          commuteTolerance: null,
          intent: null,
          lifestyleTags: [],
          recommendedLocalities: [],
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
        odLocalitySearchQuery = "";
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
      const suggestions = root.querySelector("#od-landmark-suggestions-wrap");
      if (suggestions) suggestions.innerHTML = landmarkPillsHtml();
      const ghost = root.querySelector("#od-landmark-ghost");
      if (ghost) ghost.style.display = odLandmarkQuery ? "none" : "";
    } else if (event.target.id === "od-locality-search-input") {
      // Same pattern: patch the sections below in place, leave the input
      // (and focus) alone. Plain client-side substring filter, no backend.
      odLocalitySearchQuery = event.target.value;
      const sections = root.querySelector("#od-locality-search-sections");
      if (sections) sections.innerHTML = odLocalitySearchSectionsHtml(odLocalitySearchQuery);
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
    if (event.target.id === "od-locality-search-input" && event.key === "Enter") {
      const typed = odLocalitySearchQuery.trim();
      if (typed) exploreLocality(null, typed);
    }
  });
}

/** Replaces one element's outerHTML in place (by id) instead of a full
 * render() — used for the budget/BHK stepper so a +/- tap only repaints that
 * small node, not the whole screen (avoids the full-page flash/CLS a full
 * render() on every tap was causing). */
function patchNode(id, html) {
  const el = document.getElementById(id);
  if (!el) {
    render();
    return;
  }
  el.outerHTML = html;
}

/** Steps in the "discover" sub-flow — the one entered via "Not sure, help
 * me find one" — that need focus moved on render. Every step here is a
 * full innerHTML replace with no native page navigation, so nothing moves
 * focus on its own; without this a keyboard/screen-reader user's focus
 * silently resets to <body> on every single one of the flow's 7 steps.
 * (Deliberately narrower than the DISCOVERY_STEPS history list above —
 * this one excludes locality-check/locality-search, which aren't part of
 * the "Not sure" branch.) */
const FOCUS_MANAGED_STEPS = new Set([
  "discovery-budget",
  "discovery-bhk",
  "discovery-landmarks",
  "discovery-commute",
  "discovery-lifestyle",
  "discovery-map",
]);

/** Moves focus to the new screen's heading after a full re-render, so
 * keyboard/AT users land somewhere meaningful instead of losing their
 * place. The heading is given tabindex="-1" so it's programmatically
 * focusable without joining the natural tab order. */
function focusDiscoveryHeading(root) {
  const heading = root.querySelector(".od-heading");
  if (!heading) return;
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: false });
}

function render() {
  const root = document.getElementById("onboarding-locality");
  if (!root) return;
  odBudgetPicker?.destroy();
  odBudgetPicker = null;
  // Full re-render replaces the DOM out from under any live map instance —
  // destroy whatever was mounted on the outgoing screen before it's gone,
  // so Leaflet doesn't hold references to detached nodes.
  Object.keys(activeDiscoveryMaps).forEach(destroyDiscoveryMap);
  stopLandmarkGhost();
  root.innerHTML = SCREEN_BUILDERS[state.step]() + toastHtml();
  if (state.step === "discovery-budget") mountBudgetDial();
  if (state.step === "discovery-landmarks") {
    mountLandmarkMap();
    mountLandmarkGhost();
  }
  if (state.step === "discovery-map") {
    const commuteOpt = COMMUTE_OPTIONS.find((c) => c.id === state.commuteTolerance);
    const radiusKm = selectedCommuteRadiusKm();
    const radiusMeters = radiusKm !== null ? Math.max(radiusKm * 1000, 2500) : null;

    mountDiscoveryMap("od-results-map", {
      center: cityCenter(state.city),
      pins: [
        ...state.recommendedLocalities.slice(0, 5).map((l, i) => ({
          label: String(i + 1),
          coords: l.coordinates,
          title: l.name,
          tooltip: `<b>${escapeHtml(l.name)}</b><br><span style="color:#6b7280">${escapeHtml(localityBudgetLine(l))}</span>`,
        })),
        ...state.landmarks.map((l) => {
          const isCurrentLocation = l.id === "current-location";
          const categoryIcon = LANDMARK_CATEGORY_ICON[l.category] || OD_ICON.pin;
          return {
            icon: isCurrentLocation ? "" : categoryIcon,
            variant: isCurrentLocation ? "current" : "anchor",
            coords: l.coords,
            title: l.name,
            tooltip:
              radiusKm !== null
                ? `<b>${escapeHtml(l.name)}</b><br><span style="color:#6d28d9">Travel radius: ~${Math.round(radiusKm * 10) / 10} km (${commuteOpt?.label})</span>`
                : `<b>${escapeHtml(l.name)}</b>`,
          };
        }),
      ],
      // No circle at all when there's no real commute tolerance selected
      // (unset, or "flexible") — a generic default radius here would be a
      // distance the user never actually chose.
      circles:
        radiusMeters !== null
          ? state.landmarks.map((l) => ({
              coords: l.coords,
              radiusMeters,
              label: `${l.name} · ~${Math.round(radiusKm * 10) / 10} km travel radius`,
            }))
          : [],
    });
    wireResultsDrawerScroll();
  }
  if (state.step === "splash") mountSplashLottie();
  if (state.step === "otp") focusOtpHiddenInput();
  if (FOCUS_MANAGED_STEPS.has(state.step)) focusDiscoveryHeading(root);
  animateProgressFill(root);
}

function init() {
  const root = document.getElementById("onboarding-locality");
  if (!root) return;
  wireEvents(root);
  window.addEventListener("popstate", handleHardwareBack);
  render();
}

init();
