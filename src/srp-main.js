// SRP (Search Results Page) entry.
// Mobile-first sticky search + results using Bricks DS.
// Desktop/web shows the shared site header + a "mobile-only" notice instead.
import "./styles/base.css";
import "./components/SrpSearch.css";
import "./components/SrpDesktopNotice.css";
import "./components/SrpOptions.css";
import "./main.js";
import magnifyingGlassUrl from "./assets/icons/magnifying-glass.svg";
import sortUrl from "./assets/icons/sort-ascending.svg";
import aiLogoUrl from "./assets/icons/ai-logo.png";

function renderSrpSearch() {
  const mobileContent = document.getElementById("srp-mobile-content");
  const resultsEl = document.getElementById("srp-results");
  if (!mobileContent || !resultsEl) return;

  const container = document.createElement("div");
  container.className = "srp-search-container";
  container.innerHTML = `
        <div class="srp-search-wrapper">
          <!-- Search input with AI icon -->
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

          <!-- Filter buttons -->
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
        </div>
  `;

  mobileContent.insertBefore(container, resultsEl);
}

document.addEventListener("DOMContentLoaded", () => {
  renderSrpSearch();
  renderSrpResults();
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

const SRP_HEART_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SRP_CLOCK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SRP_CHAT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SRP_PHONE_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const SRP_SAMPLE_LISTINGS = [
  { badge1: "Verified", badge2: "RERA", posted: "1 day ago", status: "Ready to Move", pricePerSqft: "₹14k", price: "₹2.85 Cr", name: "Ariisto Bellanza Phase 1", config: "3 BHK Apartment", address: "Sector 73, near Dwarka Expressway, New Gurgaon" },
  { badge1: "Verified", badge2: "Zero brokerage", posted: "2 days ago", status: "Under Construction", pricePerSqft: "₹11.5k", price: "₹1.42 Cr", name: "Sikka Karnam Greens", config: "2 BHK Apartment", address: "Sector 79, Gurgaon" },
  { badge1: "RERA", badge2: "Verified", posted: "5 hours ago", status: "Ready to Move", pricePerSqft: "₹16.2k", price: "₹3.10 Cr", name: "Sunil Apartment Homes", config: "3 BHK Apartment", address: "Dwarka, New Gurgaon" },
  { badge1: "Verified", badge2: "RERA", posted: "1 week ago", status: "New Launch", pricePerSqft: "₹13.8k", price: "₹95.4 L", name: "Palam Vihar Residency", config: "1 BHK Apartment", address: "Palam Vihar, Gurgaon" },
];

function srpCardHtml(listing, imgIndexStart) {
  return `
    <div class="srp-card">
      <div class="srp-card-strip">
        <div class="srp-card-badges">
          <span class="srp-badge">${listing.badge1}</span>
          <span class="srp-badge">${listing.badge2}</span>
        </div>
        <div class="srp-card-strip-meta">${SRP_CLOCK_ICON}<span>${listing.posted}</span></div>
      </div>
      <div class="srp-card-images">
        <img src="${srpImageSrc(imgIndexStart)}" alt="" />
        <img src="${srpImageSrc(imgIndexStart + 1)}" alt="" />
        <span class="srp-card-image-count">1/12</span>
      </div>
      <div class="srp-card-status-row">
        <span>${listing.status}</span>
        <span class="srp-card-status-dot"></span>
        <span>Avg. Price/sq.ft. ${listing.pricePerSqft}</span>
      </div>
      <p class="srp-card-price">${listing.price}</p>
      <p class="srp-card-name">${listing.name}</p>
      <p class="srp-card-config">${listing.config}</p>
      <p class="srp-card-address">${listing.address}</p>
      <hr class="srp-card-divider" />
      <div class="srp-card-cta-row">
        <button class="srp-card-cta-btn" type="button">${SRP_CHAT_ICON}<span>Chat</span></button>
        <button class="srp-card-cta-btn srp-card-cta-btn--brand" type="button">${SRP_PHONE_ICON}<span>Contact</span></button>
        <button class="srp-card-cta-btn" type="button" aria-label="Save"><span>${SRP_HEART_ICON}</span></button>
      </div>
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
      cardsHtml += srpCardHtml(listing, (opt * 4 + i) * 2);
    }
    sectionsHtml += `
      <section class="srp-option-section" id="srp-option-section-${opt}" data-option-label="Option ${opt}">
        <div class="srp-card-list">${cardsHtml}</div>
      </section>
    `;
  }

  resultsContainer.innerHTML = `<div id="srp-options-root">${sectionsHtml}</div>`;

  initSrpOptionIndicator();
}

// Sticky search bar input shows which option cluster is in view (Option 1–3).
function initSrpOptionIndicator() {
  const searchInput = document.querySelector(".srp-search-input");
  const stickyHeader = document.querySelector(".srp-search-container");
  const sections = Array.from(document.querySelectorAll(".srp-option-section"));
  if (!searchInput || !sections.length) return;

  const getAnchorY = () => (stickyHeader?.getBoundingClientRect().bottom ?? 0) + 1;

  const updateLabel = () => {
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
