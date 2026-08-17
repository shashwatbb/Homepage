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
import {
  syncExperimentsToDocument,
  isExperimentEnabled,
  SRP_MWEB_BUY_EXPERIMENT_ID,
} from "./experiments.js";
import { initSrpBudgetBhkGuidance } from "./srp-budget-bhk-guidance.js";
import { initSrpBhkBudgetBottomSheet } from "./srp-bhk-budget-bottom-sheet.js";
import "./main.js";
import arrowLeftUrl from "./assets/icons/arrow-left.svg";
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


const SRP_NAV_ICON_ATTRS =
  'class="srp-bottom-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"';

/** Phosphor regular — Figma Bottom navigation (4497:28960) */
const SRP_NAV_ICONS = {
  project: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"/></svg>`,
  suggestions: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M212.24,30A28,28,0,0,0,161,36.77L148,85.09,135.05,36.77A28,28,0,1,0,81,51.26l9.38,35-8.73-1.68A28,28,0,0,0,56.8,132.38,27.86,27.86,0,0,0,48,152.87V160a80,80,0,0,0,80,80h.61c43.78-.33,79.39-36.62,79.39-80.9v-3.34a55.88,55.88,0,0,0-11.77-34.27L215,51.26A27.8,27.8,0,0,0,212.24,30ZM97.61,38a12,12,0,0,1,22,2.9l14.77,55.15a28,28,0,0,0-14,4.77,2.26,2.26,0,0,0-.16-.26A27.65,27.65,0,0,0,108,90.35L96.42,47.12A11.94,11.94,0,0,1,97.61,38Zm-33.36,71.6a12,12,0,0,1,14.25-9.34l20.71,4a12,12,0,0,1,9.36,14.16,12,12,0,0,1-14.25,9.34l-20.75-4a12,12,0,0,1-9.32-14.15Zm0,40.72a12,12,0,0,1,14-9.37l10.11,2a12,12,0,0,1,9.36,14.15,12,12,0,0,1-14.2,9.35l-10-2a12,12,0,0,1-9.34-14.16ZM192,159.1c0,35.53-28.49,64.64-63.5,64.9a64.08,64.08,0,0,1-61.56-44.78,30.74,30.74,0,0,0,3.48.95h0l10,2a28.33,28.33,0,0,0,5.61.57,28,28,0,0,0,24.16-42.14c.79-.43,1.57-.89,2.32-1.4l.16.26a27.82,27.82,0,0,0,17.78,12l6.32,1.26a36,36,0,0,0,9.53,32.49A8,8,0,0,0,157.71,174a20,20,0,0,1-3.31-23.51,8,8,0,0,0-5.46-11.66l-15.34-3.07a12,12,0,0,1-9.35-14.15h0a12,12,0,0,1,14.18-9.35l21.41,4.28A40.1,40.1,0,0,1,192,155.76Zm7.59-112-16.62,62a55.55,55.55,0,0,0-20-8.28l-2.5-.5L176.4,40.91a12,12,0,1,1,23.18,6.21Z"/></svg>`,
  saved: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"/></svg>`,
  profile: `<svg ${SRP_NAV_ICON_ATTRS}><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg>`,
};

function renderSrpBottomNav() {
  const mobileContent = document.getElementById("srp-mobile-content");
  if (!mobileContent || document.getElementById("srp-bottom-nav")) return;

  /* Figma Bottom navigation — Project / Suggestions / Saved / Profile (no Home) */
  const items = [
    { id: "project", label: "Project", href: "#", icon: SRP_NAV_ICONS.project },
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
      class="srp-bottom-nav__item"
      href="${item.href}"
      data-srp-nav="${item.id}"
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
            <a href="/" class="srp-search-back" aria-label="Back to homepage">
              <img class="srp-search-back__icon" src="${arrowLeftUrl}" alt="" width="24" height="24" decoding="async" />
            </a>
            <div class="srp-search-field">
              <span class="srp-search-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="none">
                  <circle cx="112" cy="112" r="80" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                  <line x1="168.57" y1="168.57" x2="224" y2="224" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                </svg>
              </span>
              <input
                type="search"
                class="srp-search-input"
                placeholder="What are you looking for?"
                autocomplete="off"
                enterkeyhint="search"
              />
              <span class="srp-search-divider" aria-hidden="true"></span>
              <button type="button" class="srp-search-magic" aria-label="AI search">
                <img src="${aiLogoUrl}" alt="" width="20" height="20" decoding="async" />
              </button>
            </div>
          </div>
        </div>

        <div class="srp-search-filters">
          <div class="srp-search-filters__scroller">
          <button type="button" class="srp-filter-sort" aria-label="Sort">
            <svg class="srp-filter-sort__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="112 176 80 208 48 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              <line x1="80" y1="48" x2="80" y2="208" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              <polyline points="144 80 176 48 208 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              <line x1="176" y1="208" x2="176" y2="48" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <div class="srp-filter-chip">
            <button type="button" class="srp-filter-active">
              <svg class="srp-filter-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" aria-hidden="true">
                <path fill="currentColor" d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"/>
              </svg>
              <span>Filters (3)</span>
            </button>
            <span class="srp-filter-chip-separator" aria-hidden="true"></span>
            <button type="button" class="srp-filter-clear">Clear</button>
          </div>

          <button type="button" class="srp-filter-dropdown">
            <span>Budget</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>BHK</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Property type</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Construction status</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Area</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Furnishing</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Posted by</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Bathrooms</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Amenities</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>

          <button type="button" class="srp-filter-dropdown">
            <span>Age of property</span>
            <svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
              <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>
          </div>
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

  /** Scroll distance (px) over which first-fold gradient eases into surface-default. */
  const STICK_FADE_RANGE_PX = 80;
  let isStuck = false;

  const update = () => {
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const atPageTop = window.scrollY <= 0;

    let stickProgress = 0;
    if (!atPageTop && sentinelTop < 0) {
      const t = Math.min(1, -sentinelTop / STICK_FADE_RANGE_PX);
      /* smoothstep — gentler ease in/out than linear */
      stickProgress = t * t * (3 - 2 * t);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stickProgress = stickProgress >= 0.5 ? 1 : 0;
    }

    chrome.style.setProperty("--srp-chrome-stick", stickProgress.toFixed(4));

    const nextStuck = stickProgress >= 0.995;
    if (nextStuck !== isStuck) {
      isStuck = nextStuck;
      chrome.classList.toggle("srp-search-chrome--stuck", isStuck);
    }
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
  syncExperimentsToDocument();

  /* Blank m-web until "Buy SRP (m-web)" experiment is on (logo double-tap panel). */
  if (!isExperimentEnabled(SRP_MWEB_BUY_EXPERIMENT_ID)) {
    document.getElementById("srp-skeleton")?.remove();
    const results = document.getElementById("srp-results");
    if (results) results.innerHTML = "";
    return;
  }

  const skeleton = document.getElementById("srp-skeleton");
  const started = performance.now();

  renderSrpBottomNav();
  initSrpBottomNavScroll();
  renderSrpSearch();
  renderSrpResults();
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
  "SRP images/Screenshot 2026-07-02 at 1.03.22 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.03.40 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.03.59 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.04.18 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.04.32 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.04.43 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.07.33 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.08.33 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.08.58 PM.webp",
  "SRP images/Screenshot 2026-07-02 at 1.09.27 PM.webp",
];

function srpImageSrc(index) {
  return encodeURI("/" + SRP_IMAGE_FILES[index % SRP_IMAGE_FILES.length]);
}

const SRP_HEART_OUTLINE_ICON = `<svg class="srp-card-shortlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path class="srp-card-shortlist-icon__shape" d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z"/></svg>`;

const SRP_RERA_CHECK_ICON = `<svg class="srp-card-badge-check" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>`;

const SRP_PHONE_DIALER_ICON = `<svg class="srp-card-cta-dialer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z"/></svg>`;

/** Image seller strip is retired — seller photo + name live in CTA owner meta. */
const SRP_CARD_SHOW_SELLER = false;

/**
 * Figma SRP cards component set (4436:6443) — 4 design templates:
 * Single/Resale, Single/Project, Multiple/Project, Multiple/Resale
 */
const SRP_LISTING_TEMPLATES = [
  {
    variant: "single-resale",
    seller: { name: "Sunder Homes", photo: "/Agent.png" },
    badges: [
      {
        parts: [{ label: "RERA", verified: true }],
      },
      { parts: [{ label: "Zero brokerage" }] },
    ],
    imageCount: 24,
    title: "3 BHK flat",
    address: "DLF City Pink Town, Phase 3, Gurgaon",
    meta: ["Ready to move", "₹14k sq.ft.", "3 BHK"],
    price: "₹2.7 Cr",
    configs: null,
    phoneCtas: false,
  },
  {
    variant: "single-project",
    seller: { name: "Lodha Group", photo: "/lodha-logo.jpg", isBrand: true },
    badges: [{ parts: [{ label: "RERA", verified: true }] }],
    imageCount: 24,
    title: "Lodha Venezia Wing C",
    address: "Parel, Mumbai",
    meta: ["Ready to move", "₹14k sq.ft.", "3 BHK"],
    price: "₹2.7 Cr",
    configs: null,
    phoneCtas: false,
  },
  {
    variant: "multiple-project",
    seller: { name: "Lodha Group", photo: "/lodha-logo.jpg", isBrand: true },
    badges: [{ parts: [{ label: "RERA", verified: true }] }],
    imageCount: 24,
    title: "Lodha Venezia Wing C",
    address: "Parel, Mumbai",
    meta: ["Ready to move", "₹14k sq.ft."],
    price: null,
    configs: [
      { label: "1 BHK", price: "₹2.7 – 5.7 Cr" },
      { label: "2 BHK", price: "₹2.7 – 5.7 Cr" },
      { label: "3 BHK", price: "₹2.7 – 5.7 Cr" },
    ],
    phoneCtas: false,
  },
  {
    variant: "multiple-resale",
    seller: { name: "Sunder Homes", photo: "/Agent.png" },
    badges: [
      {
        parts: [{ label: "RERA", verified: true }],
      },
      { parts: [{ label: "Zero brokerage" }] },
    ],
    imageCount: 24,
    title: "3 BHK flat",
    address: "DLF City Pink Town, Phase 3, Gurgaon",
    meta: ["Ready to move", "₹14k sq.ft."],
    price: null,
    configs: [
      { label: "1 BHK", price: "₹2.7 Cr" },
      { label: "2 BHK", price: "₹5.7 Cr" },
      { label: "3 BHK", price: "₹5.7 Cr" },
    ],
    phoneCtas: true,
  },
];

/**
 * Longer SRP feed: 4 design templates + 12 more copies (16 total).
 */
const SRP_FEED_PLAN = [
  { template: 0 },
  { template: 1 },
  { template: 2 },
  { template: 3 },
  { template: 1 },
  { template: 3 },
  { template: 0 },
  { template: 2 },
  { template: 0 },
  { template: 1 },
  { template: 3 },
  { template: 2 },
  { template: 1 },
  { template: 0 },
  { template: 3 },
  { template: 2 },
];

const SRP_LISTING_VARIANTS = SRP_FEED_PLAN.map((plan, i) => {
  const base = SRP_LISTING_TEMPLATES[plan.template];
  return {
    ...base,
    id: String(i),
    showSeller: false,
    seller: base.seller ? { ...base.seller } : null,
    badges: base.badges.map((b) => ({
      ...b,
      parts: b.parts.map((p) => ({ ...p })),
    })),
    meta: base.meta ? [...base.meta] : null,
    configs: base.configs
      ? base.configs.map((c) => ({ ...c }))
      : null,
  };
});

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

  if (!location) location = "New Gurgaon";

  return {
    query,
    location,
    count: Number.isFinite(parsedCount) ? parsedCount : 44,
  };
}

function srpResultsMetaHtml() {
  const { location, count } = getSrpSearchContext();
  const noun = count === 1 ? "project" : "projects";
  return `<div class="srp-results-meta-bar">
    <p class="srp-results-meta">
      <span class="srp-results-meta__count">${count} ${noun}</span>
      <span class="srp-results-meta__location">in ${srpEscapeHtml(location)}</span>
      <span class="srp-results-meta__separator" aria-hidden="true"></span>
    </p>
  </div>`;
}

function srpCardShouldShowSeller(_listing) {
  /* Image seller chips removed — always off */
  return false;
}

function srpCardSellerHtml(_listing) {
  return "";
}

function srpCardBadgeHtml(badge) {
  const parts = badge.parts || [{ label: badge.label, verified: badge.verified }];
  const showCheck = parts.some((p) => p.verified);
  const inner = parts
    .map((part, i) => {
      const sep =
        i > 0
          ? `<span class="srp-card-badge__sep" aria-hidden="true"></span>`
          : "";
      return `${sep}<span class="srp-card-badge__label">${srpEscapeHtml(part.label)}</span>`;
    })
    .join("");
  return `<span class="srp-card-badge">${showCheck ? SRP_RERA_CHECK_ICON : ""}${inner}</span>`;
}

function srpCardMetaHtml(meta) {
  if (!meta?.length) return "";
  return `<p class="srp-card-meta">${meta
    .map((item, i) => {
      const sep =
        i > 0 ? `<span class="srp-card-meta__sep" aria-hidden="true"></span>` : "";
      return `${sep}<span class="srp-card-meta__item">${srpEscapeHtml(item)}</span>`;
    })
    .join("")}</p>`;
}

function srpCardConfigsHtml(configs) {
  if (!configs?.length) return "";
  return `<div class="srp-card-configs" role="list">
    ${configs
      .map(
        (cfg, i) => `
      ${i > 0 ? `<span class="srp-card-configs__sep" aria-hidden="true"></span>` : ""}
      <div class="srp-card-configs__col" role="listitem">
        <span class="srp-card-configs__label">${srpEscapeHtml(cfg.label)}</span>
        <span class="srp-card-configs__price">${srpEscapeHtml(cfg.price)}</span>
      </div>`
      )
      .join("")}
  </div>`;
}

/** Owner meta for CTA row — seller photo + name, then Dealer | posted. */
const SRP_CARD_OWNER_META = {
  role: "Dealer",
  posted: "3w ago",
};

function srpCardOwnerMetaHtml(listing) {
  const name = listing?.seller?.name || "Seller";
  const photo = listing?.seller?.photo;
  const isBrand = Boolean(listing?.seller?.isBrand);
  const photoHtml = photo
    ? `<img class="srp-card-owner-meta__photo${isBrand ? " srp-card-owner-meta__photo--brand" : ""}" src="${srpEscapeHtml(photo)}" alt="" width="32" height="32" decoding="async" />`
    : "";
  return `<div class="srp-card-owner-meta${isBrand ? "" : " srp-card-owner-meta--agent"}">
    ${photoHtml}
    <div class="srp-card-owner-meta__text">
      <span class="srp-card-owner-meta__name">${srpEscapeHtml(name)}</span>
      <p class="srp-card-owner-meta__sub">
        <span class="srp-card-owner-meta__role">${srpEscapeHtml(SRP_CARD_OWNER_META.role)}</span>
        <span class="srp-card-owner-meta__sep" aria-hidden="true"></span>
        <span class="srp-card-owner-meta__posted">${srpEscapeHtml(SRP_CARD_OWNER_META.posted)}</span>
      </p>
    </div>
  </div>`;
}

function srpCardCtaRowHtml(listing) {
  const wa = `<button class="srp-card-cta-btn srp-card-cta-btn--whatsapp" type="button" data-srp-contact-cta aria-label="WhatsApp">${srpWhatsappIconHtml(`srp-wa-${listing.id}`)}</button>`;
  const owner = srpCardOwnerMetaHtml(listing);

  if (listing.phoneCtas) {
    /* Owner meta (left) → WhatsApp → Dialer secondary → View phone primary (right) */
    return `<div class="srp-card-cta-row srp-card-cta-row--phone">
        ${owner}
        <div class="srp-card-cta-actions">
          ${wa}
          <button class="srp-card-cta-btn srp-card-cta-btn--dialer" type="button" data-srp-contact-cta aria-label="Call">${SRP_PHONE_DIALER_ICON}</button>
          <button class="srp-card-cta-btn srp-card-cta-btn--brand srp-card-cta-btn--view-phone" type="button" data-srp-contact-cta>View phone</button>
        </div>
      </div>`;
  }

  return `<div class="srp-card-cta-row">
        ${owner}
        <div class="srp-card-cta-actions">
          ${wa}
          <button class="srp-card-cta-btn srp-card-cta-btn--brand srp-card-cta-btn--contact-primary" type="button" data-srp-contact-cta>Contact</button>
        </div>
      </div>`;
}

function srpCardHtml(listing, imgIndexStart, cardIndex = 0) {
  const imageCount = listing.imageCount || 24;
  const showSeller = srpCardShouldShowSeller(listing);
  /* Horizontal carousels ignore native lazy-load — only hydrate nearby slides. */
  const imagesInner = `<div class="srp-card-images-track">${Array.from(
    { length: imageCount },
    (_, i) => {
      const src = srpImageSrc(imgIndexStart + i);
      if (i === 0) {
        const eager = cardIndex < 2;
        return `<img src="${src}" alt="" width="800" height="500" decoding="async"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} />`;
      }
      return `<img data-src="${src}" alt="" width="800" height="500" decoding="async" />`;
    }
  ).join("")}</div>`;

  const badgesHtml = (listing.badges || []).map(srpCardBadgeHtml).join("");
  const priceHtml = listing.price
    ? `<p class="srp-card-price">${srpEscapeHtml(listing.price)}</p>`
    : "";

  return `
    <article class="srp-card srp-card--imagine srp-card--${listing.variant}${showSeller ? " srp-card--seller" : ""}" data-listing-id="${srpEscapeHtml(listing.id)}" data-variant="${srpEscapeHtml(listing.variant)}" data-show-seller="${showSeller ? "true" : "false"}" role="link" tabindex="0" aria-label="View ${srpEscapeHtml(listing.title)}">
      <div class="srp-card-media${showSeller ? " srp-card-media--seller" : ""}">
        ${srpCardSellerHtml(listing)}
        <div class="srp-card-images srp-card-images--carousel">
          <div class="srp-card-images-stage">
            ${imagesInner}
            <div class="srp-card-image-chrome">
              <div class="srp-card-image-chrome__top">
                <div class="srp-card-badges srp-card-badges--overlay">${badgesHtml}</div>
                <button class="srp-card-shortlist-btn" type="button" aria-label="Shortlist">${SRP_HEART_OUTLINE_ICON}</button>
              </div>
              <div class="srp-card-image-dots" aria-hidden="true">
                <span class="srp-card-image-dot" data-slot="0"></span>
                <span class="srp-card-image-dot" data-slot="1"></span>
                <span class="srp-card-image-dot" data-slot="2"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="srp-card-body">
        <div class="srp-card-info">
          <h2 class="srp-card-title">${srpEscapeHtml(listing.title)}</h2>
          <p class="srp-card-address">${srpEscapeHtml(listing.address)}</p>
          ${srpCardMetaHtml(listing.meta)}
        </div>
        ${priceHtml}
        ${srpCardConfigsHtml(listing.configs)}
      </div>
      ${srpCardCtaRowHtml(listing)}
    </article>
  `;
}

function renderSrpResults() {
  const resultsContainer = document.getElementById("srp-results");
  if (!resultsContainer) return;

  const cardsHtml = SRP_LISTING_VARIANTS.map((listing, i) =>
    srpCardHtml(listing, i * 8, i)
  ).join("");

  resultsContainer.innerHTML = `<div id="srp-options-root">
    <section class="srp-option-section srp-option-section--imagine" id="srp-option-section-1" data-option-label="Buy">
      ${srpResultsMetaHtml()}
      <div class="srp-card-list">${cardsHtml}</div>
    </section>
  </div>`;

  initSrpCardImageCarousels();
  initSrpOptionIndicator();
  initSrpCardNavigation();
}

function initSrpCardNavigation() {
  const resultsRoot = document.getElementById("srp-results");
  if (!resultsRoot) return;

  const navigateFromCard = (card) => {
    const id = card.dataset.listingId;
    if (id == null) return;
    try {
      sessionStorage.setItem("pdp-m-from-srp", "1");
    } catch (_) {}
    window.location.href = `/pdp-mobile.html?id=${encodeURIComponent(id)}`;
  };

  resultsRoot.addEventListener("click", (e) => {
    if (e.target.closest("button, a, [data-srp-contact-cta]")) return;
    const card = e.target.closest(".srp-card");
    if (!card) return;
    navigateFromCard(card);
  });

  resultsRoot.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".srp-card");
    if (!card || e.target.closest("button, a, [data-srp-contact-cta]")) return;
    e.preventDefault();
    navigateFromCard(card);
  });
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
    .querySelectorAll(".srp-option-section--imagine .srp-card-images--carousel")
    .forEach((carousel) => {
      const track = carousel.querySelector(".srp-card-images-track");
      const dotsContainer = carousel.querySelector(".srp-card-image-dots");
      const prevBtn = carousel.querySelector(".srp-card-carousel-nav--prev");
      const nextBtn = carousel.querySelector(".srp-card-carousel-nav--next");
      const images = track ? Array.from(track.querySelectorAll("img")) : [];
      if (!track || !dotsContainer || !images.length) return;

      const totalImages = images.length;
      let activeImageIndex = 0;
      let dotWindowStart = null;
      const visibleRatios = new Map();

      const hydrateAround = (centerIndex) => {
        const start = Math.max(0, centerIndex - 1);
        const end = Math.min(totalImages - 1, centerIndex + 1);
        for (let i = start; i <= end; i++) {
          const img = images[i];
          const pending = img?.getAttribute("data-src");
          if (!pending) continue;
          img.setAttribute("src", pending);
          img.removeAttribute("data-src");
        }
      };

      const getSlideWidth = () => images[0].getBoundingClientRect().width;

      const scrollToIndex = (index) => {
        const slideWidth = getSlideWidth();
        if (!slideWidth) return;
        hydrateAround(index);
        track.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      };

      const updateNavState = () => {
        if (prevBtn) prevBtn.disabled = activeImageIndex <= 0;
        if (nextBtn) nextBtn.disabled = activeImageIndex >= totalImages - 1;
      };

      const setActiveDot = (imageIndex) => {
        activeImageIndex = Math.max(0, Math.min(totalImages - 1, imageIndex));
        hydrateAround(activeImageIndex);
        dotWindowStart = updateCarouselDots(dotsContainer, activeImageIndex, totalImages, dotWindowStart);
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
      hydrateAround(0);
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
