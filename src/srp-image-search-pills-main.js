/**
 * Buy/SRP Image based search pills — m-web prototype page.
 * Header (search bar + chips) ported from the app's NP SERP; listing cards and
 * bottom bar from the app's Buy SERP; filter screen in ./srp-isp-filters.js.
 * Front end only — fake data, CTAs raise a toast.
 */
import "./styles/base.css";
import "./components/SrpSearch.css";
import "./components/SrpImageSearchPills.css";
import arrowLeftUrl from "./assets/icons/arrow-left.svg";
import aiLogoUrl from "./assets/icons/ai-logo.png";
import { ISP_ICONS as I } from "./data/srpIspIcons.js";
import { FEATURE_ICONS as FI } from "./data/srpFeatureIcons.js";
import { FEATURES, SEARCH_PLACEHOLDERS, featureById, featureCover } from "./data/srpFeaturePills.js";
import {
  PINNED_CHIPS,
  appliedCount,
  clearApplied,
  getApplied,
  onAppliedChange,
  openFilterScreen,
  FEATURE_PILLS_ON,
  getFeatureValues,
  toggleFeature,
} from "./srp-isp-filters.js";

const ASSET = "/srp-isp";
const CITY = "Mumbai";
const params = new URLSearchParams(window.location.search);
const LOCALITY = (params.get("q") || "").trim() || "Andheri West";

const SORT_OPTIONS = [
  { id: "relevance", label: "Relevance" },
  { id: "date_added", label: "Newest first" },
  { id: "price_asc", label: "Price (low to high)" },
  { id: "price_desc", label: "Price (high to low)" },
];
const SORT_PER_SQFT = [
  { id: "per_sqft_rate_asc", label: "Price/sqft (low to high)" },
  { id: "per_sqft_rate_desc", label: "Price/sqft (high to low)" },
];

const pics = (seed, n) => Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/900/675`);

/* Same 8 fake listings, same order, as the app prototype's fakeListings.ts. */
const LISTINGS = [
  {
    id: "ultra-project", project: true, topBar: { bg: "#444444", fg: "#ffffff", name: "Skyline Developers", more: 3, champion: true },
    images: pics("ultra", 6), verified: true, view3d: true,
    possession: "Dec 2027", rate: "₹27.5k", name: "Skyline Crest", rera: true, address: "Andheri West, Mumbai",
    plans: [["2 BHK Apartment", "₹2.4 Cr"], ["3 BHK Apartment", "₹3.4 Cr"], ["4 BHK Apartment", "₹5.1 Cr"]],
    priceVal: 2.4e7, rateVal: 27500, updated: "today", whatsapp: true,
  },
  {
    id: "owner-resale", overlay: { name: "Rahul Mehta", owner: true },
    images: pics("owner", 4), ready: true, rate: "₹21.4k",
    bhk: "2 BHK Apartment", price: "₹2.1 Cr", name: "Sunrise Heights", address: "Powai, Mumbai",
    priceVal: 2.1e7, rateVal: 21400, updated: "yesterday", whatsapp: true,
  },
  {
    id: "expert-pro", topBar: { bg: "#444444", fg: "#ffffff", name: "Urban Nest Realty", more: 2 },
    images: pics("expert", 8), verified: true, ready: true, rate: "₹18.9k",
    bhk: "3 BHK Apartment", price: "₹2.8 Cr", name: "Lake View Residency", address: "Goregaon East, Mumbai",
    priceVal: 2.8e7, rateVal: 18900, updated: "today", whatsapp: true,
  },
  {
    id: "video-project", project: true, topBar: { bg: "#444444", fg: "#ffffff", name: "Greenfield Homes", more: 1 },
    images: pics("video", 3), verified: true, view3d: true,
    possession: "Jun 2028", rate: "₹14.2k", name: "Green Meadows Phase 2", rera: true, address: "Malad West, Mumbai",
    plans: [["1 BHK Apartment", "₹92.0 L"], ["2 BHK Apartment", "₹1.6 Cr"]],
    priceVal: 9.2e6, rateVal: 14200, updated: "today", whatsapp: true,
  },
  {
    id: "prime-agent", overlay: { name: "Priya Sharma", avatar: "https://picsum.photos/seed/agent-prime/96/96" },
    images: pics("prime", 5), ready: true, rate: "₹16.2k",
    bhk: "3 BHK Apartment", price: "₹2.1 Cr", name: "Orchid Enclave", address: "Chembur, Mumbai",
    priceVal: 2.1e7, rateVal: 16200, updated: "3d ago", whatsapp: true,
  },
  {
    id: "no-photos", overlay: { name: "Housing Seller" },
    images: [], ready: true, rate: "₹11.8k",
    bhk: "1 BHK Apartment", price: "₹88.0 L", name: "Shanti Niketan", address: "Borivali West, Mumbai",
    priceVal: 8.8e6, rateVal: 11800, updated: "1w ago", whatsapp: true,
  },
  {
    id: "developer-sold", project: true,
    topBar: { bg: "#444444", fg: "#ffffff", name: "Horizon Realty", avatar: "https://picsum.photos/seed/agent-select/96/96" },
    images: pics("developer", 7), verified: true, view3d: true,
    possession: "Mar 2029", rate: "₹32.1k", name: "Horizon One", rera: true, address: "Bandra Kurla Complex, Mumbai",
    plans: [["3 BHK Apartment", "₹4.9 Cr"], ["4 BHK Apartment", "₹6.5 Cr"], ["5 BHK Apartment", "₹9.2 Cr"]],
    priceVal: 4.9e7, rateVal: 32100, updated: "today", whatsapp: false,
  },
  {
    id: "multi-seller", topBar: { bg: "#e0e0e0", fg: "#444444", name: "Coastal Properties", more: 5, champion: true },
    images: pics("multi", 5), verified: true, ready: true, rate: "₹19.6k",
    bhk: "2 BHK Apartment", price: "₹2.25 Cr", name: "Palm Grove", address: "Juhu, Mumbai",
    priceVal: 2.25e7, rateVal: 19600, updated: "today", whatsapp: true,
  },
];

const MAX_PAGES = 3;
const state = { sort: "relevance", hotspots: false, newInCity: false, pages: 1, saved: new Set() };

const root = document.getElementById("isp-root");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* ---------- toast ---------- */
let toastTimer;
export function toast(message) {
  const el = document.getElementById("isp-toast");
  el.textContent = message;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("is-visible");
    setTimeout(() => (el.hidden = true), 200);
  }, 2400);
}

/* ---------- header ---------- */
function sortOptions() {
  const applied = getApplied();
  return applied["2"] || applied["3"] ? [...SORT_OPTIONS, ...SORT_PER_SQFT] : SORT_OPTIONS;
}

/* Search + filter chips reuse the Buy m-web SRP (Imagine) design verbatim —
   markup classes and SrpSearch.css are shared with srp.html. */
const PH_SORT = `<svg class="srp-filter-sort__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><polyline points="112 176 80 208 48 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="80" y1="48" x2="80" y2="208" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="144 80 176 48 208 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="176" y1="208" x2="176" y2="48" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;
const PH_FILTER = `<svg class="srp-filter-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"/></svg>`;
const PH_CHEVRON = `<svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;
const PH_X = `<svg class="srp-filter-dropdown__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;

function filterChipRowHtml() {
  const applied = getApplied();
  const count = appliedCount();
  const sortSel = state.sort !== "relevance";
  const filtersChip = count
    ? `<div class="srp-filter-chip">
        <button type="button" class="srp-filter-active" data-action="open-filters">${PH_FILTER}<span>Filters (${count})</span></button>
        <span class="srp-filter-chip-separator" aria-hidden="true"></span>
        <button type="button" class="srp-filter-clear" data-action="clear-filters">Clear</button>
      </div>`
    : `<button type="button" class="srp-filter-dropdown" data-action="open-filters">${PH_FILTER}<span>Filters</span></button>`;
  const pinned = PINNED_CHIPS.map(({ title, categoryId }) => {
    const a = applied[categoryId];
    return `<button type="button" class="srp-filter-dropdown${a ? " isp-applied" : ""}" data-action="open-filters" data-category="${categoryId}"><span>${esc(a ? a.displayLabel : title)}</span>${PH_CHEVRON}</button>`;
  }).join("");
  return `<button type="button" class="srp-filter-sort${sortSel ? " isp-applied" : ""}" aria-label="Sort" data-action="open-sort">${PH_SORT}</button>
    ${filtersChip}${pinned}`;
}

function discoveryChipsHtml() {
  const { hotspots, newInCity } = state;
  return `<button type="button" class="srp-filter-dropdown isp-dchip${hotspots ? " isp-applied" : ""}" data-action="toggle-hotspots">
      <span class="isp-dchip__icon">${I.cityHotspots}</span><span>City hotspots</span>${hotspots ? PH_X : ""}
    </button>
    ${hotspots ? `<button type="button" class="srp-filter-dropdown isp-applied" data-action="all-areas"><span>All areas</span>${PH_CHEVRON}</button>` : ""}
    <button type="button" class="srp-filter-dropdown isp-dchip${newInCity ? " isp-applied" : ""}" data-action="toggle-new-in-city">
      <span class="isp-dchip__icon">${I.newInCity}</span><span>New in ${CITY}</span>${newInCity ? PH_X : ""}
    </button>`;
}

/* srp_image_feature_pills — "Seen in photos" row replaces the hotspot row. */
let justToggled = null;
const PILL_TRANSITION_MS = 180;
function featurePillsHtml() {
  const applied = getFeatureValues();
  const front = [...applied].reverse().map(featureById);
  const rest = FEATURES.filter((f) => !applied.includes(f.id));
  // Same chip as the top row (.srp-filter-dropdown) — inactive and .isp-applied states.
  const pill = (f, on) => `<button type="button" class="srp-filter-dropdown isp-fpill${on ? " isp-applied" : ""}${f.id === justToggled ? " is-entering" : ""}" data-action="toggle-feature" data-feature="${f.id}" aria-pressed="${on}">
      ${FI[f.icon]}<span>${f.label}</span>${on ? PH_X : `<span class="isp-fpill__count">${f.count}</span>`}
    </button>`;
  return `${front.map((f) => pill(f, true)).join("")}${rest.map((f) => pill(f, false)).join("")}
    <button type="button" class="srp-filter-dropdown isp-fpill" data-action="all-features">${FI.category}<span>All features</span>${PH_CHEVRON}</button>`;
}

function renderHeader() {
  const chips = document.getElementById("isp-chips");
  const scrollX = chips.scrollLeft;
  chips.innerHTML = filterChipRowHtml();
  chips.scrollLeft = scrollX;
  const disc = document.getElementById("isp-disc");
  if (FEATURE_PILLS_ON) {
    const x = disc.scrollLeft;
    disc.innerHTML = featurePillsHtml();
    disc.scrollLeft = getFeatureValues().length ? 0 : x;
  } else {
    disc.innerHTML = discoveryChipsHtml();
  }
}

function searchChromeHtml() {
  return `<div class="srp-search-container">
      <div class="srp-search-row">
        <button type="button" class="srp-search-back" aria-label="Back" data-action="back">
          <img class="srp-search-back__icon" src="${arrowLeftUrl}" alt="" width="24" height="24" decoding="async" />
        </button>
        <form class="srp-search-field" id="isp-search-form" role="search">
          <span class="srp-search-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="none"><circle cx="112" cy="112" r="80" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="168.57" y1="168.57" x2="224" y2="224" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </span>
          <input type="search" class="srp-search-input" name="q" value="${FEATURE_PILLS_ON ? "" : esc(LOCALITY)}" placeholder="${FEATURE_PILLS_ON ? SEARCH_PLACEHOLDERS[0] : "What are you looking for?"}" autocomplete="off" enterkeyhint="search" />
          <span class="srp-search-divider" aria-hidden="true"></span>
          <button type="button" class="srp-search-magic" aria-label="AI search" data-action="ai-search">
            <img src="${aiLogoUrl}" alt="" width="20" height="20" decoding="async" />
          </button>
        </form>
      </div>
    </div>
    <div class="srp-search-filters isp-filters-band"><div class="srp-search-filters__scroller" id="isp-chips"></div></div>
    <div class="srp-search-filters isp-disc-band"><div class="srp-search-filters__scroller" id="isp-disc"></div></div>`;
}

/* Same scroll-linked first-fold → stuck fade as srp-main.js initSrpStickySearchState. */
function initStickySearchState(chrome) {
  const sentinel = document.createElement("div");
  sentinel.className = "srp-search-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  chrome.parentNode.insertBefore(sentinel, chrome);
  const STICK_FADE_RANGE_PX = 80;

  const update = () => {
    const sentinelTop = sentinel.getBoundingClientRect().top;
    let progress = 0;
    if (window.scrollY > 0 && sentinelTop < 0) {
      const t = Math.min(1, -sentinelTop / STICK_FADE_RANGE_PX);
      progress = t * t * (3 - 2 * t);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) progress = progress >= 0.5 ? 1 : 0;
    chrome.style.setProperty("--srp-chrome-stick", progress.toFixed(4));
    chrome.classList.toggle("srp-search-chrome--stuck", progress >= 0.995);
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- cards ---------- */
function topBarHtml(t) {
  const avatar = t.avatar ? `<img src="${t.avatar}" alt="" />` : I.sellerAvatar;
  return `<div class="isp-topbar" style="background:${t.bg};color:${t.fg}">
      <div class="isp-topbar__left">
        <span class="isp-topbar__avatar">${avatar}</span>
        <span class="isp-topbar__name">${esc(t.name)}</span>
        ${t.more ? `<span class="isp-topbar__more">+ ${t.more} sellers</span>` : ""}
      </div>
      ${t.champion ? `<div class="isp-topbar__right"><img src="${ASSET}/card-locality-champion.webp" alt="" width="12" height="12" /><span>Locality champion</span></div>` : ""}
    </div>`;
}

function galleryHtml(l, coverFeature) {
  const flush = Boolean(l.topBar);
  const tags = [
    l.verified ? `<span class="isp-tag isp-tag--verified" data-action="verified"><img src="${ASSET}/card-verified-tick.webp" alt="" width="12" height="12" />Verified<img src="${ASSET}/card-info-verified.webp" alt="" width="12" height="12" /></span>` : "",
    l.view3d ? `<span class="isp-tag isp-tag--3d" data-action="view-3d"><img src="${ASSET}/card-3d-view.webp" alt="" width="10" height="11" />3D view ›</span>` : "",
  ].join("");

  let overlay = "";
  if (!flush && l.overlay) {
    const o = l.overlay;
    overlay = `<div class="isp-overlay${o.avatar ? " isp-overlay--tight" : ""}">
        ${o.avatar ? `<img class="isp-overlay__avatar" src="${o.avatar}" alt="" />` : ""}
        <div class="isp-overlay__text"><span class="isp-overlay__name">${esc(o.name)}</span>${o.owner ? `<span class="isp-overlay__sub">Owner</span>` : ""}</div>
      </div>`;
  }

  if (!l.images.length) {
    return `<div class="isp-gallery${flush ? " is-flush" : ""}">
        <div class="isp-nophoto">
          <img class="isp-nophoto__art" src="${ASSET}/no-photos-serp.svg" alt="" />
          <span class="isp-nophoto__scrim"></span>
          <button type="button" class="isp-nophoto__cta" data-action="request-images">Request images${I.caretRight}</button>
        </div>
        ${overlay}
      </div>`;
  }

  const cells = l.images
    .map((src, i) => (i === 0 && coverFeature
      ? `<div class="isp-cell"><img src="${featureCover(l.id, coverFeature.id)}" alt="" /></div>`
      : `<div class="isp-cell"><img src="${src}" alt="" loading="lazy" /></div>`))
    .join("");
  return `<div class="isp-gallery${flush ? " is-flush" : ""}">
      <div class="isp-strip" data-count="${l.images.length}">${cells}
        <button type="button" class="isp-cell isp-cell--more" data-action="request-images">Request more images${I.caretRight}</button>
      </div>
      ${overlay}
      <div class="isp-gallery__bottom">
        <div class="isp-tags">${tags}</div>
        <span class="isp-index">1/${l.images.length}</span>
      </div>
    </div>`;
}

function cardHtml(l, key, coverFeature) {
  const possession = l.ready
    ? `<b>Ready to Move</b>`
    : `Possession by&nbsp;<b>${l.possession}</b>`;
  const rate = l.project ? `Avg. price/ sq.ft.&nbsp;<b>${l.rate}</b>` : `Price/ sq.ft.&nbsp;<b>${l.rate}</b>`;
  const saved = state.saved.has(key);
  const info = l.project
    ? `<div class="isp-info__name-row"><span class="isp-info__name">${esc(l.name)}</span>${l.rera ? `<span class="isp-rera">${I.rera}RERA</span>` : ""}</div>
       <p class="isp-info__address">${esc(l.address)}</p>
       <div class="isp-plans">${l.plans.map(([label, price]) => `<div class="isp-plan"><span>${label}</span><b>${price}</b></div>`).join('<i class="isp-plans__div"></i>')}</div>`
    : `<p class="isp-info__bhk">${l.bhk}</p>
       <p class="isp-info__price">${l.price}</p>
       <p class="isp-info__project">${esc(l.name)}</p>
       <p class="isp-info__address">${esc(l.address)}</p>`;

  return `<article class="isp-card" data-action="open-card" data-key="${key}">
      ${l.topBar ? topBarHtml(l.topBar) : ""}
      ${galleryHtml(l, coverFeature)}
      <div class="isp-poss">
        <div class="isp-poss__bar">${possession}<img src="${ASSET}/card-dot-divider.webp" alt="" width="16" height="16" />${rate}</div>
        <button type="button" class="isp-heart" aria-label="Shortlist" data-action="shortlist" data-key="${key}">${saved ? `<img src="${ASSET}/card-shortlist-filled.webp" alt="" width="16" height="16" />` : I.heart}</button>
      </div>
      <div class="isp-info${l.project ? " isp-info--project" : ""}">${info}</div>
      <hr class="isp-card__divider" />
      <div class="isp-cta">
        <div class="isp-cta__updated"><span>Updated</span><span>${l.updated}</span></div>
        <div class="isp-cta__btns">
          <button type="button" class="isp-btn isp-btn--secondary" data-action="view-number">View number</button>
          ${l.whatsapp ? `<button type="button" class="isp-btn isp-btn--secondary isp-btn--icon" aria-label="WhatsApp" data-action="whatsapp"><img src="${ASSET}/card-whatsapp.webp" alt="" width="16" height="16" /></button>` : ""}
          <button type="button" class="isp-btn isp-btn--primary isp-btn--icon" aria-label="Call" data-action="call">${I.phone}</button>
        </div>
      </div>
    </article>`;
}

function sortedListings() {
  const list = [...LISTINGS];
  switch (state.sort) {
    case "date_added": return list.reverse();
    case "price_asc": return list.sort((a, b) => a.priceVal - b.priceVal);
    case "price_desc": return list.sort((a, b) => b.priceVal - a.priceVal);
    case "per_sqft_rate_asc": return list.sort((a, b) => a.rateVal - b.rateVal);
    case "per_sqft_rate_desc": return list.sort((a, b) => b.rateVal - a.rateVal);
    default: return list;
  }
}

function resultCount() {
  return Math.max(18, 1240 - 180 * appliedCount());
}

function renderFeed() {
  const feed = document.getElementById("isp-feed");
  const list = sortedListings();
  const features = FEATURE_PILLS_ON ? getFeatureValues() : [];
  const leadFeature = features.length ? featureById(features[features.length - 1]) : null;
  const cards = [];
  for (let p = 0; p < state.pages; p += 1) {
    list.forEach((l, i) => cards.push(cardHtml(l, `${l.id}-p${p}`, p === 0 && i < 2 ? leadFeature : null)));
  }
  const location = state.newInCity ? CITY : LOCALITY;
  const countLine = leadFeature
    ? `<p><b>${leadFeature.header}</b>${features.length > 1 ? ` + ${features.length - 1} more` : ""}</p>`
    : `<p><b>${resultCount()} properties</b> in ${esc(location)}</p>`;
  const rows = cards.map((c) => `<div class="isp-row">${c}</div>`);
  if (leadFeature && rows.length > 3) rows.splice(3, 0, `<p class="isp-feature-divider">Homes with some of your features</p>`);
  feed.innerHTML = `
    ${featureHintHtml()}
    <div class="isp-count">${countLine}</div>
    ${rows.join("")}
    ${state.pages < MAX_PAGES ? `<div class="isp-loader" id="isp-loader"><span></span><span></span><span></span></div>` : ""}`;
  bindGalleryIndex(feed);
  observeLoader();
}

const HINT_KEY = "housing:isp-feature-hint-dismissed";
function featureHintHtml() {
  if (!FEATURE_PILLS_ON) return "";
  try {
    if (localStorage.getItem(HINT_KEY)) return "";
  } catch {}
  return `<div class="isp-feature-hint" role="note">${FI.camera}<p>Filters based on what we see in listing photos</p><button type="button" class="isp-feature-hint__ok" data-action="dismiss-hint">Got it</button></div>`;
}

function initPlaceholderRotation() {
  const input = document.querySelector(".srp-search-input");
  let i = 0;
  setInterval(() => {
    if (document.activeElement === input || input.value) return;
    i = (i + 1) % SEARCH_PLACEHOLDERS.length;
    input.classList.add("is-rotating");
    setTimeout(() => {
      input.placeholder = SEARCH_PLACEHOLDERS[i];
      input.classList.remove("is-rotating");
    }, 200);
  }, 3500);
}

function bindGalleryIndex(scope) {
  scope.querySelectorAll(".isp-strip").forEach((strip) => {
    const indexEl = strip.parentElement.querySelector(".isp-index");
    const n = Number(strip.dataset.count);
    strip.addEventListener("scroll", () => {
      const i = Math.min(n - 1, Math.round(strip.scrollLeft / 200));
      indexEl.textContent = `${i + 1}/${n}`;
    }, { passive: true });
  });
}

let loaderObserver;
function observeLoader() {
  loaderObserver?.disconnect();
  const loader = document.getElementById("isp-loader");
  if (!loader) return;
  loaderObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    loaderObserver.disconnect();
    setTimeout(() => {
      const y = window.scrollY;
      state.pages = Math.min(state.pages + 1, MAX_PAGES);
      renderFeed();
      window.scrollTo(0, y);
    }, 700);
  }, { rootMargin: "200px" });
  loaderObserver.observe(loader);
}

/* ---------- sort sheet ---------- */
function openSortSheet() {
  const sheet = document.getElementById("isp-sort");
  sheet.querySelector(".isp-sheet__list").innerHTML = sortOptions()
    .map((o) => `<li><button type="button" class="isp-sort-row" role="radio" aria-checked="${o.id === state.sort}" data-action="pick-sort" data-sort="${o.id}"><span>${o.label}</span><span class="isp-radio"></span></button></li>`)
    .join("");
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("is-open"));
}

function closeSortSheet() {
  const sheet = document.getElementById("isp-sort");
  sheet.classList.remove("is-open");
  setTimeout(() => (sheet.hidden = true), 320);
}

/* ---------- bottom bar ---------- */
function bottomBarHtml() {
  const items = [
    ["Explore", I.navSearch], ["Projects", I.navProjects], ["Top localities", I.navLocalities],
    ["Shorts", I.navShorts], ["Saved", I.heart.replace('width="20" height="20"', 'width="24" height="24"')],
  ];
  return items
    .map(([label, icon]) => `<button type="button" class="isp-nav__cell" data-action="nav" data-label="${label}">${icon}<span>${label}</span></button>`)
    .join("");
}

function initBottomBarScroll() {
  const bar = document.getElementById("isp-nav");
  let lastY = window.scrollY;
  let dir = 0;
  let anchorY = lastY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const d = y > lastY ? 1 : -1;
    if (d !== dir && Math.abs(y - anchorY) >= 6) {
      dir = d;
      anchorY = y;
    } else if (d === dir) {
      anchorY = y;
    }
    lastY = y;
    bar.classList.toggle("is-hidden", y >= 24 && dir === 1);
  }, { passive: true });
}

/* ---------- actions ---------- */
const NOTICES = {
  "ai-search": "AI search is not part of this prototype",
  "all-areas": "Hotspot picker is not part of this prototype",
  "open-card": "Property page is not in this prototype",
  "view-number": "Contact form is not in this prototype",
  whatsapp: "Contact form is not in this prototype",
  call: "Contact form is not in this prototype",
  "request-images": "Image request sent",
  verified: "Verified by Housing",
  "view-3d": "3D tour opens a webview in the app",
};

root.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  switch (action) {
    case "back":
      if (history.length > 1) history.back();
      else window.location.assign("/");
      return;
    case "clear-filters":
      event.stopPropagation();
      clearApplied();
      return;
    case "open-filters":
      openFilterScreen(el.dataset.category);
      return;
    case "open-sort":
      openSortSheet();
      return;
    case "close-sort":
      closeSortSheet();
      return;
    case "pick-sort":
      state.sort = el.dataset.sort;
      closeSortSheet();
      renderHeader();
      renderFeed();
      window.scrollTo(0, 0);
      return;
    case "toggle-hotspots":
      state.hotspots = !state.hotspots;
      if (state.hotspots) state.newInCity = false;
      renderHeader();
      renderFeed();
      return;
    case "toggle-feature": {
      // Play the default ↔ active transition in place, then commit (re-render reorders the row).
      if (el.dataset.pending) return;
      el.dataset.pending = "1";
      el.classList.toggle("isp-applied");
      navigator.vibrate?.(8);
      setTimeout(() => {
        justToggled = el.dataset.feature;
        toggleFeature(el.dataset.feature);
        justToggled = null;
      }, PILL_TRANSITION_MS);
      return;
    }
    case "all-features":
      openFilterScreen("hf");
      return;
    case "dismiss-hint":
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch {}
      el.closest(".isp-feature-hint").remove();
      return;
    case "toggle-new-in-city":
      state.newInCity = !state.newInCity;
      if (state.newInCity) state.hotspots = false;
      renderHeader();
      renderFeed();
      return;
    case "shortlist": {
      event.stopPropagation();
      const key = el.dataset.key;
      if (state.saved.has(key)) state.saved.delete(key);
      else state.saved.add(key);
      el.innerHTML = state.saved.has(key) ? `<img src="${ASSET}/card-shortlist-filled.webp" alt="" width="16" height="16" />` : I.heart;
      return;
    }
    case "nav":
      toast(`${el.dataset.label} is not part of this prototype`);
      return;
    default:
      if (NOTICES[action]) {
        event.stopPropagation();
        toast(NOTICES[action]);
      }
  }
});

/* ---------- mount ---------- */
root.innerHTML = `
  <header class="srp-search-chrome isp-chrome" id="isp-header">${searchChromeHtml()}</header>
  <section class="isp-feed" id="isp-feed"></section>
  <nav class="isp-nav" id="isp-nav">${bottomBarHtml()}</nav>
  <div class="isp-sheet" id="isp-sort" hidden>
    <div class="isp-sheet__backdrop" data-action="close-sort"></div>
    <div class="isp-sheet__panel" role="dialog" aria-label="Sort by">
      <div class="isp-sheet__head"><h3>Sort by</h3><button type="button" class="isp-sheet__close" aria-label="Close" data-action="close-sort">${I.closeCross}</button></div>
      <ul class="isp-sheet__list"></ul>
    </div>
  </div>
  <div class="isp-toast" id="isp-toast" role="status" aria-live="polite" hidden></div>`;

renderHeader();
renderFeed();
initBottomBarScroll();
initStickySearchState(document.getElementById("isp-header"));
if (FEATURE_PILLS_ON) initPlaceholderRotation();
document.getElementById("isp-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const q = event.currentTarget.q.value.trim() || (FEATURE_PILLS_ON ? event.currentTarget.q.placeholder : "");
  if (!q) return;
  const url = new URL(window.location.href);
  url.searchParams.set("q", q);
  window.location.assign(url.href);
});
onAppliedChange(() => {
  state.pages = 1;
  renderHeader();
  renderFeed();
});
