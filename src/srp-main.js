// SRP (Search Results Page) entry.
// Mobile-first sticky search + results using Bricks DS.
// Desktop/web shows the shared site header + a "mobile-only" notice instead.
import "./styles/base.css";
import "./components/SrpSkeleton.css";
import "./components/SrpBottomNav.css";
import "./components/SrpSearch.css";
import "./components/SrpDesktopNotice.css";
import "./components/SrpOptions.css";
import "./components/SrpContactSheet.css";
import { syncExperimentsToDocument } from "./experiments.js";
import { initSrpBudgetBhkGuidance } from "./srp-budget-bhk-guidance.js";
import { initSrpBhkBudgetBottomSheet } from "./srp-bhk-budget-bottom-sheet.js";
import "./main.js";
import magnifyingGlassUrl from "./assets/icons/magnifying-glass.svg";
import sortUrl from "./assets/icons/sort-ascending.svg";
import aiLogoUrl from "./assets/icons/ai-logo.png";

const SRP_HEART_ICON = `<svg class="srp-card-shortlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path class="srp-card-shortlist-icon__shape" d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z"/></svg>`;

const SRP_VERIFIED_ICON = `<svg class="srp-badge-verified-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.24-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>`;

const SRP_CAROUSEL_CARET_LEFT = `<svg class="srp-card-carousel-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><polyline points="160 208 80 128 160 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="28"/></svg>`;

const SRP_CAROUSEL_CARET_RIGHT = `<svg class="srp-card-carousel-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="28"/></svg>`;

const SRP_MAP_PIN_ICON = `<svg class="srp-card-address__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" fill="currentColor"/></svg>`;

function srpWhatsappIconHtml(gradientId) {
  return `<svg class="srp-card-cta-whatsapp-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.1335 3.79311C14.4956 2.15412 12.3178 1.251 9.99739 1.25C5.21591 1.25 1.32474 5.13992 1.32283 9.92119C1.32227 11.4495 1.72161 12.9414 2.48064 14.2565L1.25 18.75L5.84848 17.5442C7.11545 18.2352 8.54198 18.5993 9.99366 18.5999H9.99734H9.99739C14.7781 18.5999 18.6698 14.7093 18.6719 9.92822C18.6727 7.61099 17.7711 5.43222 16.1335 3.79311ZM9.99739 17.1353H9.99457C8.70062 17.1346 7.43172 16.7872 6.32493 16.1304L6.06154 15.9743L3.3327 16.6898L4.06126 14.0301L3.88965 13.7575C3.16787 12.6098 2.78684 11.2836 2.78738 9.92174C2.78897 5.94771 6.02315 2.71465 10.0001 2.71465C11.926 2.71545 13.7361 3.46613 15.0974 4.82841C16.4586 6.19068 17.2078 8.00163 17.2072 9.9276C17.2055 13.9018 13.9712 17.1353 9.99739 17.1353Z" fill="#E0E0E0"/><path d="M1.64819 18.2514L2.82262 13.9632C2.09807 12.7081 1.71705 11.2843 1.71751 9.82604C1.71941 5.26327 5.43286 1.55115 9.99553 1.55115C12.21 1.55215 14.2884 2.41396 15.8511 3.97813C17.4142 5.54228 18.2744 7.62138 18.2735 9.83251C18.2716 14.3954 14.558 18.1078 9.99585 18.1078C9.99608 18.1078 9.99553 18.1078 9.99585 18.1078H9.99217C8.6068 18.1074 7.24555 17.7596 6.03654 17.1007L1.64819 18.2514Z" fill="url(#${gradientId})"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85392 6.23985C7.69344 5.88304 7.52447 5.8759 7.37178 5.86966C7.2469 5.8643 7.10393 5.86463 6.96119 5.86463C6.81833 5.86463 6.58619 5.91831 6.38988 6.13271C6.19346 6.34711 5.63989 6.8654 5.63989 7.91951C5.63989 8.97374 6.40774 9.99237 6.51477 10.1354C6.62191 10.2783 7.997 12.5106 10.1748 13.3694C11.9847 14.0832 12.353 13.9412 12.7458 13.9055C13.1387 13.8698 14.0134 13.3873 14.192 12.887C14.3706 12.3867 14.3706 11.958 14.317 11.8683C14.2634 11.779 14.1206 11.7255 13.9063 11.6183C13.692 11.5112 12.6387 10.9928 12.4423 10.9214C12.2458 10.8499 12.103 10.8142 11.9601 11.0287C11.8173 11.243 11.4069 11.7255 11.2819 11.8683C11.1569 12.0115 11.0319 12.0294 10.8176 11.9222C10.6033 11.8148 9.91327 11.5888 9.09465 10.8588C8.45771 10.291 8.02769 9.58966 7.90269 9.37517C7.77769 9.16088 7.88929 9.04481 7.99678 8.938C8.09297 8.84202 8.21106 8.68789 8.3182 8.56278C8.42511 8.43767 8.46083 8.34838 8.53225 8.20553C8.60368 8.06244 8.56797 7.93734 8.5144 7.8302C8.46083 7.72306 8.04443 6.6635 7.85392 6.23985Z" fill="white"/><path d="M16.0627 3.76557C14.4437 2.14539 12.2908 1.25266 9.99708 1.25165C5.27048 1.25165 1.42398 5.09691 1.42208 9.82329C1.42153 11.3341 1.81628 12.8089 2.5666 14.1089L1.3501 18.5508L5.8958 17.3588C7.14824 18.0418 8.55837 18.4018 9.9934 18.4023H9.99704H9.99708C14.7229 18.4023 18.57 14.5564 18.572 9.83021C18.5728 7.53962 17.6816 5.38587 16.0627 3.76557ZM9.99708 16.9546H9.9943C8.71519 16.9539 7.46085 16.6105 6.36677 15.9613L6.10639 15.8069L3.40888 16.5142L4.12908 13.8851L3.95943 13.6156C3.24594 12.4811 2.86928 11.17 2.86983 9.82386C2.87139 5.89546 6.06845 2.69951 9.99977 2.69951C11.9035 2.7003 13.6928 3.44236 15.0385 4.789C16.3842 6.13564 17.1247 7.92579 17.1241 9.82968C17.1224 13.7582 13.9253 16.9546 9.99708 16.9546Z" fill="white"/><defs><linearGradient id="${gradientId}" x1="9.96087" y1="18.2514" x2="9.96087" y2="1.55118" gradientUnits="userSpaceOnUse"><stop stop-color="#20B038"/><stop offset="1" stop-color="#60D66A"/></linearGradient></defs></svg>`;
}

function srpBadgePillHtml(label) {
  if (label === "Verified") {
    return `<span class="srp-badge srp-badge--pill">${SRP_VERIFIED_ICON}<span>${label}</span></span>`;
  }
  return `<span class="srp-badge srp-badge--pill">${label}</span>`;
}

const SRP_BACK_ICON = `<svg class="srp-search-back__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;

const SRP_NAV_ICON_ATTRS =
  'class="srp-bottom-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" aria-hidden="true"';

const SRP_NAV_ICONS = {
  home: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M104,216V152h48v64h64V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120v96Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  projects: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M136,216V32a8,8,0,0,0-12.44-6.65l-80,53.33A8,8,0,0,0,40,85.35V216" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M136,88h72a8,8,0,0,1,8,8V216" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="16" y1="216" x2="240" y2="216" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="104" y1="112" x2="104" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="72" y1="112" x2="72" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="72" y1="168" x2="72" y2="184" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="104" y1="168" x2="104" y2="184" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  suggestions: `<svg ${SRP_NAV_ICON_ATTRS}><line x1="88" y1="232" x2="168" y2="232" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="200" x2="128" y2="144" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 112 128 144 160 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  saved: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  profile: `<svg class="srp-bottom-nav__icon srp-bottom-nav__icon--filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg>`,
};

function renderSrpBottomNav() {
  const mobileContent = document.getElementById("srp-mobile-content");
  if (!mobileContent || document.getElementById("srp-bottom-nav")) return;

  const items = [
    { id: "home", label: "Home", href: "/", icon: SRP_NAV_ICONS.home },
    { id: "projects", label: "Projects", href: "#", icon: SRP_NAV_ICONS.projects },
    { id: "suggestions", label: "Suggestions", href: "#", icon: SRP_NAV_ICONS.suggestions },
    { id: "saved", label: "Saved", href: "#", icon: SRP_NAV_ICONS.saved },
    { id: "profile", label: "Profile", href: "#", icon: SRP_NAV_ICONS.profile },
  ];

  const nav = document.createElement("nav");
  nav.id = "srp-bottom-nav";
  nav.className = "srp-bottom-nav";
  nav.setAttribute("aria-label", "Main navigation");
  nav.innerHTML = items
    .map(
      (item) => `
    <a
      class="srp-bottom-nav__item${item.active ? " srp-bottom-nav__item--active" : ""}"
      href="${item.href}"
      data-srp-nav="${item.id}"
      ${item.active ? 'aria-current="page"' : ""}
    >
      <span class="srp-bottom-nav__icon-wrap">${item.icon}</span>
      <span class="srp-bottom-nav__label">${item.label}</span>
    </a>
  `
    )
    .join("");

  mobileContent.appendChild(nav);
}

function initSrpBottomNavScroll() {
  const nav = document.getElementById("srp-bottom-nav");
  const mobileContent = document.getElementById("srp-mobile-content");
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 8;

  const update = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;

    if (currentY <= 0) {
      nav.classList.remove("srp-bottom-nav--hidden");
      mobileContent?.classList.remove("srp-mobile-content--nav-hidden");
    } else if (delta > scrollThreshold) {
      nav.classList.add("srp-bottom-nav--hidden");
      mobileContent?.classList.add("srp-mobile-content--nav-hidden");
    } else if (delta < -scrollThreshold) {
      nav.classList.remove("srp-bottom-nav--hidden");
      mobileContent?.classList.remove("srp-mobile-content--nav-hidden");
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
}

function renderSrpSearch() {
  const mobileContent = document.getElementById("srp-mobile-content");
  const resultsEl = document.getElementById("srp-results");
  if (!mobileContent || !resultsEl) return;

  const chrome = document.createElement("div");
  chrome.className = "srp-search-chrome";
  chrome.innerHTML = `
        <div class="srp-search-container">
          <div class="srp-search-row">
            <a href="/" class="srp-search-back" aria-label="Back to homepage">${SRP_BACK_ICON}</a>
            <div class="srp-search-field">
              <img src="${magnifyingGlassUrl}" alt="" class="srp-search-icon" />
              <input
                type="search"
                class="srp-search-input"
                placeholder="What are you looking for?"
                autocomplete="off"
              />
              <button class="srp-search-magic" aria-label="AI Magic">
                <img src="${aiLogoUrl}" alt="AI" />
              </button>
            </div>
          </div>
        </div>

        <div class="srp-search-filters">
          <button class="srp-filter-sort" aria-label="Sort">
            <img src="${sortUrl}" alt="" />
          </button>

          <div class="srp-filter-chip">
            <button class="srp-filter-active">
              <svg class="srp-filter-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="104" cy="80" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                <circle cx="168" cy="176" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                <line x1="128" y1="80" x2="216" y2="80" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                <line x1="40" y1="80" x2="80" y2="80" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                <line x1="192" y1="176" x2="216" y2="176" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                <line x1="40" y1="176" x2="144" y2="176" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              </svg>
              <span>Filters (3)</span>
            </button>
            <div class="srp-filter-chip-separator"></div>
            <button class="srp-filter-clear">Clear</button>
          </div>

          <button class="srp-filter-dropdown">
            <span>Budget</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button class="srp-filter-dropdown">
            <span>Property Type</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button class="srp-filter-dropdown">
            <span>BHK type</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button class="srp-filter-dropdown">
            <span>Furnished</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button class="srp-filter-dropdown">
            <span>Possession</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button class="srp-filter-dropdown">
            <span>New/Resale</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
  `;

  mobileContent.insertBefore(chrome, resultsEl);
  initSrpStickySearchState(chrome);
}

function initSrpStickySearchState(chrome) {
  const sentinel = document.createElement("div");
  sentinel.className = "srp-search-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  chrome.parentNode?.insertBefore(sentinel, chrome);

  let isStuck = false;

  const update = () => {
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const atPageTop = window.scrollY <= 0;

    if (atPageTop || sentinelTop >= 0) {
      isStuck = false;
    } else if (sentinelTop < -1) {
      isStuck = true;
    }

    chrome.classList.toggle("srp-search-chrome--stuck", isStuck);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
}

const SRP_SKELETON_MIN_MS = 480;

function hideSrpSkeleton(skeleton) {
  if (!skeleton) return;
  skeleton.classList.add("srp-skeleton--hide");
  skeleton.removeAttribute("aria-busy");
  const remove = () => skeleton.remove();
  skeleton.addEventListener("transitionend", remove, { once: true });
  setTimeout(remove, 320);
}

async function initSrpPage() {
  const skeleton = document.getElementById("srp-skeleton");
  const started = performance.now();

  renderSrpBottomNav();
  initSrpBottomNavScroll();
  renderSrpSearch();
  renderSrpResults();
  syncExperimentsToDocument();
  initSrpBudgetBhkGuidance(getSrpSearchContext);
  initSrpBhkBudgetBottomSheet(getSrpSearchContext);
  renderSrpContactSheet();
  initSrpContactSheet();

  const remaining = Math.max(0, SRP_SKELETON_MIN_MS - (performance.now() - started));
  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }

  hideSrpSkeleton(skeleton);
}

document.addEventListener("DOMContentLoaded", () => {
  initSrpPage();
});

/* ------------------------------------------------------------------ *
 * SRP results — sticky "Option N" label (internal review only, tracks
 * which of the 3 stacked option sections is in view) + placeholder cards
 * matching today's live card structure. Cards/content are rough
 * placeholders; only the page shell, spacing, and scroll behavior are
 * being validated at this step.
 * ------------------------------------------------------------------ */

const SRP_IMAGE_FILES = [
  "SRP images/Screenshot 2026-07-02 at 1.03.22 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.03.40 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.03.59 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.04.18 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.04.32 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.04.43 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.07.33 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.08.33 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.08.58 PM.png",
  "SRP images/Screenshot 2026-07-02 at 1.09.27 PM.png",
];

function srpImageSrc(index) {
  return encodeURI("/" + SRP_IMAGE_FILES[index % SRP_IMAGE_FILES.length]);
}

const SRP_CLOCK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SRP_CHAT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SRP_PHONE_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const SRP_SAMPLE_LISTINGS = [
  { badge1: "Verified", badge2: "RERA", posted: "1 day ago", status: "Ready to move", pricePerSqft: "₹714.24K/sq.ft.", price: "₹2.85 Cr", name: "Shapoorji Pallonji Joyville", config: "3 BHK Apartment", address: "Electronic City Phase 1, near Infosys Campus, Bangalore" },
  { badge1: "Verified", badge2: "Zero brokerage", posted: "2 days ago", status: "Under Construction", pricePerSqft: "₹11.5K/sq.ft.", price: "₹1.42 Cr", name: "Sikka Karnam Greens", config: "2 BHK Apartment", address: "Sector 79, Southern Peripheral Road, Gurgaon" },
  { badge1: "RERA", badge2: "Verified", posted: "5 hours ago", status: "Ready to move", pricePerSqft: "₹16.2K/sq.ft.", price: "₹3.10 Cr", name: "Sunil Apartment Homes", config: "3 BHK Apartment", address: "Dwarka Expressway, Sector 113, New Gurgaon" },
  { badge1: "Verified", badge2: "RERA", posted: "1 week ago", status: "New Launch", pricePerSqft: "₹13.8K/sq.ft.", price: "₹95.4 L", name: "Palam Vihar Residency", config: "1 BHK Apartment", address: "Palam Vihar Extension, near Rezang La Chowk, Gurgaon" },
];

function srpEscapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSrpSearchContext() {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  const locationParam = (params.get("location") || "").trim();
  const countRaw = params.get("count");
  const parsedCount = countRaw ? Number.parseInt(countRaw, 10) : 44;

  let location = locationParam;
  if (!location && query) {
    const inMatch = query.match(/\bin\s+(.+)$/i);
    if (inMatch) {
      location = inMatch[1].trim();
    } else {
      const sectorMatch = query.match(/sector\s*\d+/i);
      if (sectorMatch) {
        location = sectorMatch[0].replace(/\bsector\b/i, "Sector");
      }
    }
  }

  if (!location) location = "Sector 44";

  return {
    query,
    location,
    count: Number.isFinite(parsedCount) ? parsedCount : 44,
  };
}

function srpResultsMetaHtml() {
  const { location, count } = getSrpSearchContext();
  const noun = count === 1 ? "property" : "properties";
  const label = `Showing ${count} ${noun} in ${srpEscapeHtml(location)}`;
  return `<div class="srp-results-meta-bar"><p class="srp-results-meta"><span class="srp-results-meta__text">${label}</span><span class="srp-results-meta__separator" aria-hidden="true"></span></p></div>`;
}

function srpListingBhkLabel(config) {
  const match = config?.match(/^\d+\s+BHK/i);
  return match ? match[0].toUpperCase().replace(/bhk/i, "BHK") : config;
}

function srpCardSellerRowHtml(listing) {
  return `<div class="srp-card-seller">
    <div class="srp-card-seller__text">
      <p class="srp-card-seller__name">Sunder Homes</p>
      <p class="srp-card-seller__updated">Updated ${listing.posted}</p>
    </div>
    <img class="srp-card-seller__photo" src="/Agent.png" alt="" />
  </div>`;
}

function srpCardProjectHtml(listing) {
  return `<div class="srp-card-project">
    <p class="srp-card-name">${listing.name}</p>
    <p class="srp-card-address">${SRP_MAP_PIN_ICON}<span>${listing.address}</span></p>
  </div>`;
}

function srpCardMetaPillsHtml(listing) {
  return `<div class="srp-card-image-meta">
    <span class="srp-card-meta-item"><span>${srpListingBhkLabel(listing.config)}</span></span>
    <span class="srp-card-meta-divider" aria-hidden="true"></span>
    <span class="srp-card-meta-item"><span>${listing.pricePerSqft}</span></span>
  </div>`;
}

function srpCardPriceRowHtml(listing) {
  return `<p class="srp-card-price">${listing.price}</p>`;
}

function srpCardHtml(listing, imgIndexStart, { carousel = false, imageCount = 24, contactOnly = false } = {}) {
  const imagesClass = carousel ? "srp-card-images srp-card-images--carousel" : "srp-card-images";
  const imagesInner = carousel
    ? `<div class="srp-card-images-track">${Array.from(
        { length: imageCount },
        (_, i) => `<img src="${srpImageSrc(imgIndexStart + i)}" alt="" />`
      ).join("")}</div>`
    : `<img src="${srpImageSrc(imgIndexStart)}" alt="" />
        <img src="${srpImageSrc(imgIndexStart + 1)}" alt="" />`;

  const ctaHtml = contactOnly
    ? `<div class="srp-card-cta-row srp-card-cta-row--contact-only">
        <button class="srp-card-cta-btn srp-card-cta-btn--whatsapp" type="button" data-srp-contact-cta aria-label="WhatsApp">${srpWhatsappIconHtml(`srp-wa-${imgIndexStart}`)}</button>
        <button class="srp-card-cta-btn srp-card-cta-btn--brand srp-card-cta-btn--contact-primary" type="button" data-srp-contact-cta>Contact</button>
      </div>`
    : `<div class="srp-card-cta-row">
        <button class="srp-card-cta-btn" type="button">${SRP_CHAT_ICON}<span>Chat</span></button>
        <button class="srp-card-cta-btn srp-card-cta-btn--brand" type="button" data-srp-contact-cta>${SRP_PHONE_ICON}<span>Contact</span></button>
        <button class="srp-card-cta-btn" type="button" aria-label="Save"><span>${SRP_HEART_ICON}</span></button>
      </div>`;

  const imageBlock = contactOnly
    ? `<div class="${imagesClass}">
        <div class="srp-card-images-stage">
          ${imagesInner}
            <div class="srp-card-image-chrome">
            <div class="srp-card-badges srp-card-badges--overlay">
              ${srpBadgePillHtml(listing.badge1)}
              ${srpBadgePillHtml(listing.status)}
            </div>
            <button class="srp-card-carousel-nav srp-card-carousel-nav--prev" type="button" aria-label="Previous image">${SRP_CAROUSEL_CARET_LEFT}</button>
            <button class="srp-card-carousel-nav srp-card-carousel-nav--next" type="button" aria-label="Next image">${SRP_CAROUSEL_CARET_RIGHT}</button>
            <button class="srp-card-shortlist-btn" type="button" aria-label="Shortlist">${SRP_HEART_ICON}</button>
            <div class="srp-card-image-dots" aria-hidden="true">
              <span class="srp-card-image-dot" data-slot="0"></span>
              <span class="srp-card-image-dot" data-slot="1"></span>
              <span class="srp-card-image-dot" data-slot="2"></span>
            </div>
            <span class="srp-card-image-count">1 / ${imageCount}</span>
          </div>
        </div>
      </div>`
    : `<div class="${imagesClass}">
        ${imagesInner}
        <span class="srp-card-image-count">1/12</span>
      </div>`;

  const stripBlock = contactOnly
    ? ""
    : `<div class="srp-card-strip">
        <div class="srp-card-badges">
          <span class="srp-badge">${listing.badge1}</span>
          <span class="srp-badge">${listing.badge2}</span>
        </div>
        <div class="srp-card-strip-meta">${SRP_CLOCK_ICON}<span>${listing.posted}</span></div>
      </div>`;

  const metaRowHtml = contactOnly
    ? ""
    : `<div class="srp-card-status-row">
        <span>${listing.status}</span>
        <span class="srp-card-status-dot"></span>
        <span>Avg. Price/sq.ft. ${listing.pricePerSqft}</span>
      </div>`;

  const detailsHtml = contactOnly
    ? `${srpCardPriceRowHtml(listing)}
      ${srpCardMetaPillsHtml(listing)}
      ${srpCardProjectHtml(listing)}`
    : `${metaRowHtml}
      <p class="srp-card-price">${listing.price}</p>
      <p class="srp-card-name">${listing.name}</p>
      <p class="srp-card-config">${listing.config}</p>
      <p class="srp-card-address">${listing.address}</p>`;

  const sellerRowHtml = contactOnly ? srpCardSellerRowHtml(listing) : "";

  return `
    <div class="srp-card${contactOnly ? " srp-card--option1" : ""}">
      ${stripBlock}
      ${sellerRowHtml}
      ${imageBlock}
      ${detailsHtml}
      ${contactOnly ? "" : `<hr class="srp-card-divider" />`}
      ${ctaHtml}
    </div>
  `;
}

function renderSrpResults() {
  const resultsContainer = document.getElementById("srp-results");
  if (!resultsContainer) return;

  let sectionsHtml = "";
  for (let opt = 1; opt <= 3; opt++) {
    let cardsHtml = "";
    for (let i = 0; i < 4; i++) {
      const listing = SRP_SAMPLE_LISTINGS[i % SRP_SAMPLE_LISTINGS.length];
      const imgStride = opt === 1 ? 24 : 2;
      cardsHtml += srpCardHtml(listing, (opt * 4 + i) * imgStride, {
        carousel: opt === 1,
        imageCount: 24,
        contactOnly: opt === 1,
      });
    }
    sectionsHtml += `
      <section class="srp-option-section${opt === 1 ? " srp-option-section--image-carousel" : ""}" id="srp-option-section-${opt}" data-option-label="Option ${opt}">
        ${opt === 1 ? srpResultsMetaHtml() : ""}
        <div class="srp-card-list">${cardsHtml}</div>
      </section>
    `;
  }

  resultsContainer.innerHTML = `<div id="srp-options-root">${sectionsHtml}</div>`;

  initSrpCardImageCarousels();
  initSrpOptionIndicator();
}

const SRP_CAROUSEL_DOT_WINDOW = 3;

function getCarouselDotWindow(activeIndex, total) {
  const windowSize = Math.min(SRP_CAROUSEL_DOT_WINDOW, total);
  if (windowSize === 0) return [];

  // Cycle active dot left → center → right, then slide the window forward.
  const positionInWindow = activeIndex % windowSize;
  const start = Math.max(0, Math.min(activeIndex - positionInWindow, total - windowSize));
  return Array.from({ length: windowSize }, (_, slot) => start + slot);
}

function updateCarouselDots(dotsContainer, activeIndex, total, prevWindowStart = null) {
  const slots = Array.from(dotsContainer.querySelectorAll("[data-slot]"));
  const indices = getCarouselDotWindow(activeIndex, total);
  const windowStart = indices[0] ?? 0;
  const windowEnd = indices[indices.length - 1];
  const slideIn = prevWindowStart !== null && windowStart > prevWindowStart;

  slots.forEach((slot, slotIndex) => {
    const imageIndex = indices[slotIndex];
    const isVisible = imageIndex !== undefined;

    slot.hidden = !isVisible;
    slot.classList.remove(
      "srp-card-image-dot--active",
      "srp-card-image-dot--preview",
      "srp-card-image-dot--enter"
    );

    if (!isVisible) return;

    if (imageIndex === activeIndex) {
      slot.classList.add("srp-card-image-dot--active");
    } else if (imageIndex === windowEnd && imageIndex > activeIndex) {
      slot.classList.add("srp-card-image-dot--preview");
    }

    if (slideIn && slotIndex === slots.length - 1 && isVisible) {
      slot.classList.add("srp-card-image-dot--enter");
    }
  });

  return windowStart;
}

function initSrpCardImageCarousels() {
  document
    .querySelectorAll(".srp-option-section--image-carousel .srp-card-images--carousel")
    .forEach((carousel) => {
      const track = carousel.querySelector(".srp-card-images-track");
      const dotsContainer = carousel.querySelector(".srp-card-image-dots");
      const prevBtn = carousel.querySelector(".srp-card-carousel-nav--prev");
      const nextBtn = carousel.querySelector(".srp-card-carousel-nav--next");
      const countEl = carousel.querySelector(".srp-card-image-count");
      const images = track ? Array.from(track.querySelectorAll("img")) : [];
      if (!track || !dotsContainer || !images.length) return;

      const totalImages = images.length;
      let activeImageIndex = 0;
      let dotWindowStart = null;
      const visibleRatios = new Map();

      const getSlideWidth = () => images[0].getBoundingClientRect().width;

      const scrollToIndex = (index) => {
        const slideWidth = getSlideWidth();
        if (!slideWidth) return;
        track.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      };

      const updateNavState = () => {
        if (prevBtn) prevBtn.disabled = activeImageIndex <= 0;
        if (nextBtn) nextBtn.disabled = activeImageIndex >= totalImages - 1;
      };

      const setActiveDot = (imageIndex) => {
        activeImageIndex = Math.max(0, Math.min(totalImages - 1, imageIndex));
        dotWindowStart = updateCarouselDots(dotsContainer, activeImageIndex, totalImages, dotWindowStart);
        if (countEl) countEl.textContent = `${activeImageIndex + 1} / ${totalImages}`;
        updateNavState();
      };

      const syncFromScroll = () => {
        const slideWidth = images[0].getBoundingClientRect().width;
        if (!slideWidth) return;
        setActiveDot(Math.min(totalImages - 1, Math.round(track.scrollLeft / slideWidth)));
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = images.indexOf(entry.target);
            if (index === -1) return;
            visibleRatios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          let bestIndex = activeImageIndex;
          let bestRatio = 0;
          for (let i = 0; i < totalImages; i++) {
            const ratio = visibleRatios.get(i) || 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestIndex = i;
            }
          }
          if (bestRatio > 0) setActiveDot(bestIndex);
        },
        { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      images.forEach((image) => observer.observe(image));
      prevBtn?.addEventListener("click", () => scrollToIndex(activeImageIndex - 1));
      nextBtn?.addEventListener("click", () => scrollToIndex(activeImageIndex + 1));
      track.addEventListener("scroll", syncFromScroll, { passive: true });
      window.addEventListener("resize", syncFromScroll, { passive: true });
      dotWindowStart = updateCarouselDots(dotsContainer, 0, totalImages);
      updateNavState();
    });
}

// Sticky search bar input shows which option cluster is in view (Option 1–3).
function initSrpOptionIndicator() {
  const searchInput = document.querySelector(".srp-search-input");
  const stickyHeader = document.querySelector(".srp-search-chrome");
  if (!searchInput) return;

  const getVisibleSections = () =>
    Array.from(document.querySelectorAll(".srp-option-section")).filter(
      (section) => section.offsetHeight > 0
    );

  const getAnchorY = () => (stickyHeader?.getBoundingClientRect().bottom ?? 0) + 1;

  const updateLabel = () => {
    const sections = getVisibleSections();
    if (!sections.length) return;

    const anchorY = getAnchorY();
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= anchorY) {
        active = section;
      } else {
        break;
      }
    }
    const label = active.getAttribute("data-option-label");
    if (label) searchInput.value = label;
  };

  updateLabel();

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateLabel();
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", updateLabel, { passive: true });
}

/* ------------------------------------------------------------------ *
 * SRP contact bottom sheet — confirm seller connect + timer dismiss CTA.
 * Opens on any Contact / WhatsApp CTA tap; slides up from bottom.
 * ------------------------------------------------------------------ */

const SRP_CONTACT_TIMER_MS = 10000;
const SRP_CONTACT_CANCELLED_MS = 2400;

const SRP_CONTACT_SELLERS = [
  { name: "Rohit Mehra", phone: "+91 97116XXXXX", photo: "/Agent.png" },
  { name: "Priya Sharma", phone: "+91 98765XXXXX", photo: "/Agent.png" },
  { name: "Amit Verma", phone: "+91 99887XXXXX", photo: "/Agent.png" },
];

function srpContactSellerCardHtml(seller, layer) {
  const isFront = layer === 1;
  const bodyHtml = isFront
    ? `<img class="srp-contact-sheet__card-photo" src="${seller.photo}" alt="" />
    <div class="srp-contact-sheet__card-text">
      <p class="srp-contact-sheet__card-name">${srpEscapeHtml(seller.name)}</p>
      <p class="srp-contact-sheet__card-phone">${srpEscapeHtml(seller.phone)}</p>
    </div>`
    : "";

  return `<div class="srp-contact-sheet__card srp-contact-sheet__card--layer-${layer}"${isFront ? "" : ' aria-hidden="true"'}>${bodyHtml}</div>`;
}

function renderSrpContactSheet() {
  const mobileContent = document.getElementById("srp-mobile-content");
  if (!mobileContent || document.getElementById("srp-contact-sheet")) return;

  const cardsHtml = [
    { layer: 3, seller: SRP_CONTACT_SELLERS[2] },
    { layer: 2, seller: SRP_CONTACT_SELLERS[1] },
    { layer: 1, seller: SRP_CONTACT_SELLERS[0] },
  ]
    .map(({ layer, seller }) => srpContactSellerCardHtml(seller, layer))
    .join("");

  mobileContent.insertAdjacentHTML(
    "beforeend",
    `<div id="srp-contact-sheet" class="srp-contact-sheet" hidden role="dialog" aria-modal="true" aria-labelledby="srp-contact-sheet-title">
      <button type="button" class="srp-contact-sheet__scrim" id="srp-contact-sheet-scrim" aria-label="Close"></button>
      <div class="srp-contact-sheet__panel">
        <div class="srp-contact-sheet__confirm" id="srp-contact-confirm">
          <div class="srp-contact-sheet__intro">
            <img class="srp-contact-sheet__logo" src="/logo.svg" width="48" height="48" alt="" decoding="async" />
            <h2 id="srp-contact-sheet-title" class="srp-contact-sheet__title">Are you sure you want to connect with this seller?</h2>
          </div>
          <div class="srp-contact-sheet__footer">
            <div class="srp-contact-sheet__card-stack">
              <div class="srp-contact-sheet__card-surface">${cardsHtml}</div>
            </div>
            <button type="button" class="srp-contact-sheet__timer-cta" id="srp-contact-not-interested">
              <span class="srp-contact-sheet__timer-cta-fill" id="srp-contact-timer-fill" aria-hidden="true"></span>
              <span class="srp-contact-sheet__timer-cta-label">Not interested</span>
            </button>
          </div>
        </div>
        <div class="srp-contact-sheet__cancelled" id="srp-contact-cancelled" hidden>
          <p id="srp-contact-cancelled-title" class="srp-contact-sheet__cancelled-title">You've cancelled contacting this property</p>
          <p class="srp-contact-sheet__cancelled-subtitle">You can reach out again anytime from the listing</p>
        </div>
      </div>
    </div>`
  );
}

function initSrpContactSheet() {
  const sheet = document.getElementById("srp-contact-sheet");
  const resultsRoot = document.getElementById("srp-results");
  if (!sheet || !resultsRoot) return;

  const scrim = document.getElementById("srp-contact-sheet-scrim");
  const notInterestedBtn = document.getElementById("srp-contact-not-interested");
  const timerFill = document.getElementById("srp-contact-timer-fill");
  const confirmView = document.getElementById("srp-contact-confirm");
  const cancelledView = document.getElementById("srp-contact-cancelled");
  const CLOSE_MS = 480;
  let escHandler;
  let closeTimer;
  let dismissTimer;
  let cancelledTimer;

  const resetSheetContent = () => {
    sheet.classList.remove("srp-contact-sheet--cancelled");
    confirmView?.removeAttribute("hidden");
    cancelledView?.setAttribute("hidden", "");
    sheet.setAttribute("aria-labelledby", "srp-contact-sheet-title");
  };

  const resetTimerCta = () => {
    window.clearTimeout(dismissTimer);
    window.clearTimeout(cancelledTimer);
    if (!timerFill) return;
    timerFill.classList.remove("is-running");
    void timerFill.offsetWidth;
  };

  const startTimerCta = () => {
    resetTimerCta();
    timerFill?.classList.add("is-running");
    dismissTimer = window.setTimeout(() => {
      showCancelled();
    }, SRP_CONTACT_TIMER_MS);
  };

  const showCancelled = () => {
    if (sheet.classList.contains("srp-contact-sheet--cancelled")) return;
    resetTimerCta();
    sheet.classList.add("srp-contact-sheet--cancelled");
    confirmView?.setAttribute("hidden", "");
    cancelledView?.removeAttribute("hidden");
    sheet.setAttribute("aria-labelledby", "srp-contact-cancelled-title");
    cancelledTimer = window.setTimeout(() => {
      closeSheet();
    }, SRP_CONTACT_CANCELLED_MS);
  };

  const closeSheet = () => {
    if (!sheet.classList.contains("is-visible")) return;
    resetTimerCta();
    sheet.classList.remove("is-visible");
    document.documentElement.style.overflow = "";
    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      escHandler = undefined;
    }
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      sheet.setAttribute("hidden", "");
      resetSheetContent();
    }, CLOSE_MS);
  };

  const openSheet = () => {
    if (sheet.classList.contains("is-visible")) return;
    resetSheetContent();
    sheet.removeAttribute("hidden");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        sheet.classList.add("is-visible");
        document.documentElement.style.overflow = "hidden";
        startTimerCta();
      });
    });
    escHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSheet();
      }
    };
    document.addEventListener("keydown", escHandler);
  };

  resultsRoot.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-srp-contact-cta]");
    if (!btn) return;
    e.preventDefault();
    openSheet();
  });

  scrim?.addEventListener("click", closeSheet);
  notInterestedBtn?.addEventListener("click", showCancelled);
}
