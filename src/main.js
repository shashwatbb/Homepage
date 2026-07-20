import "./styles/base.css";
import { initExperiments } from "./experiments.js";
import buyAssetUrl from "./assets/buy.png?url";
import projectsAssetUrl from "./assets/projects.png?url";

/** Strip the FOUC-suppression class once styles are in and first frame paints. */
requestAnimationFrame(() => {
  requestAnimationFrame(() => document.documentElement.classList.remove("no-fouc"));
});

/** Matches CSS `@media (prefers-reduced-motion: reduce)`. */
function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const mainTablist = document.querySelector(".main-search .service-tabs");
const overlayTablist = document.querySelector(".search-overlay .service-tabs");
const allTablists = [mainTablist, overlayTablist].filter(Boolean);
const mainSearchRoot = document.querySelector("main.main-search");

function syncMainSearchDataActiveService() {
  const active = mainTablist?.querySelector(".service-tabs__tab--active")?.dataset.service;
  if (active && mainSearchRoot) {
    mainSearchRoot.setAttribute("data-active-service", active);
  }
}

const HERO_PROMO_CARDS_OUT_MS = 400;
const HERO_PROMO_CARDS_IN_MS = 520;
const HERO_PROMO_GRAD_CROSSFADE_MS = 360;

/** Same gradients as `base.css` hero-default service strips (used on crossfade layers). */
const HERO_DEFAULT_GRADIENTS = {
  buy: "linear-gradient(112deg, hsl(258 38% 88%) 0%, hsl(258 22% 94%) 46%, hsl(258 42% 84%) 100%)",
  projects:
    "linear-gradient(112deg, hsl(232 26% 89%) 0%, hsl(232 18% 95%) 46%, hsl(232 28% 85%) 100%)",
  rent: "linear-gradient(112deg, hsl(208 24% 89%) 0%, hsl(208 16% 95%) 46%, hsl(208 26% 85%) 100%)",
  commercial: "linear-gradient(112deg, hsl(40 18% 90%) 0%, hsl(40 12% 95%) 46%, hsl(40 20% 86%) 100%)",
  pg: "linear-gradient(112deg, hsl(342 22% 90%) 0%, hsl(342 14% 95%) 46%, hsl(342 26% 85%) 100%)",
  plots: "linear-gradient(112deg, hsl(100 20% 89%) 0%, hsl(100 13% 95%) 46%, hsl(100 22% 85%) 100%)",
};

/** Hero default strip — center copy (Lora in CSS); keys match `data-service` / `data-active-service`. */
const HERO_SERVICE_TAGLINES = {
  buy: "Buy Better Homes",
  projects: "New Homes, New Beginnings",
  rent: "Move In, Hassle-Free",
  commercial: "Spaces That Work",
  pg: "Comfort, Simplified",
  plots: "Land for Your Dreams",
};

/** Marker tint — soft wash ~32–38% opacity; muted (keep in sync with `base.css` --hero-tagline-highlight) */
const HERO_TAGLINE_HIGHLIGHTS = {
  buy: "hsla(258, 28%, 82%, 0.34)",
  projects: "hsla(232, 26%, 82%, 0.33)",
  rent: "hsla(208, 28%, 82%, 0.34)",
  commercial: "hsla(42, 32%, 84%, 0.32)",
  pg: "hsla(342, 24%, 84%, 0.33)",
  plots: "hsla(100, 26%, 81%, 0.34)",
};

const heroTaglineLineA = document.querySelector(".main-search__hero-tagline__line--a");
const heroTaglineLineB = document.querySelector(".main-search__hero-tagline__line--b");
let heroTaglineActiveIsA = true;
const HERO_TAGLINE_TRANSITION_MS = 380;

function heroTaglineInner(el) {
  return el?.querySelector(".main-search__hero-tagline__inner") ?? el;
}

function heroTaglineLineText(el) {
  return heroTaglineInner(el)?.textContent ?? "";
}

function setHeroTaglineLineText(el, text) {
  const inner = heroTaglineInner(el);
  if (inner) inner.textContent = text;
}

/** Sets `--hero-tagline-sync` on `main` and the tagline container so the marker always picks up the wash (same moment as gradient). */
function syncHeroTaglineHighlightToMain() {
  if (!mainSearchRoot) return;
  const svc = mainSearchRoot.getAttribute("data-active-service") ?? "buy";
  const key = svc && HERO_TAGLINE_HIGHLIGHTS[svc] ? svc : "buy";
  const val = HERO_TAGLINE_HIGHLIGHTS[key] ?? HERO_TAGLINE_HIGHLIGHTS.buy;
  mainSearchRoot.style.setProperty("--hero-tagline-sync", val);
  mainSearchRoot.querySelector(".main-search__hero-tagline")?.style.setProperty("--hero-tagline-sync", val);
}

function heroTaglineTextForService(service) {
  const s = service && HERO_SERVICE_TAGLINES[service] ? service : "buy";
  return HERO_SERVICE_TAGLINES[s];
}

function applyHeroTaglineFromCurrentService(options = { animate: true }) {
  if (!mainSearchRoot?.classList.contains("main-search--hero-default")) return;
  const svc = mainSearchRoot.getAttribute("data-active-service") ?? "buy";
  const text = heroTaglineTextForService(svc);
  updateHeroTaglineTo(text, options.animate !== false);
}

function updateHeroTaglineTo(nextText, animate) {
  if (!heroTaglineLineA || !heroTaglineLineB) return;

  if (!animate || prefersReducedMotion()) {
    setHeroTaglineLineText(heroTaglineLineA, nextText);
    setHeroTaglineLineText(heroTaglineLineB, "");
    heroTaglineLineA.classList.remove("is-passive", "is-leaving");
    heroTaglineLineA.classList.add("is-active");
    heroTaglineLineB.classList.remove("is-active", "is-leaving");
    heroTaglineLineB.classList.add("is-passive");
    heroTaglineActiveIsA = true;
    heroTaglineLineB.setAttribute("aria-hidden", "true");
    heroTaglineLineA.removeAttribute("aria-hidden");
    return;
  }

  const outgoing = heroTaglineActiveIsA ? heroTaglineLineA : heroTaglineLineB;
  const incoming = heroTaglineActiveIsA ? heroTaglineLineB : heroTaglineLineA;

  if (heroTaglineLineText(outgoing) === nextText && heroTaglineLineText(incoming) === "") return;

  setHeroTaglineLineText(incoming, nextText);
  incoming.classList.remove("is-active", "is-leaving");
  incoming.classList.add("is-passive");
  void incoming.offsetWidth;

  requestAnimationFrame(() => {
    outgoing.classList.remove("is-active");
    outgoing.classList.add("is-leaving");
    incoming.classList.remove("is-passive");
    incoming.classList.add("is-active");
    outgoing.setAttribute("aria-hidden", "true");
    incoming.removeAttribute("aria-hidden");
  });

  window.setTimeout(() => {
    outgoing.classList.remove("is-leaving");
    outgoing.classList.add("is-passive");
    setHeroTaglineLineText(outgoing, "");
    heroTaglineActiveIsA = !heroTaglineActiveIsA;
  }, HERO_TAGLINE_TRANSITION_MS);
}

let promoGradFrontLayer = 0;
let heroGradLayersInited = false;

function getHeroPromoDeco() {
  return mainSearchRoot?.querySelector(".main-search__promo-deco");
}

function getHeroPromoGradStack() {
  return mainSearchRoot?.querySelector(".main-search__promo-grad-stack");
}

function heroDefaultGradientFor(service) {
  const key = service && HERO_DEFAULT_GRADIENTS[service] ? service : "buy";
  return HERO_DEFAULT_GRADIENTS[key];
}

function ensureHeroPromoGradientLayersInitialized() {
  const stack = getHeroPromoGradStack();
  if (!stack || heroGradLayersInited) return;
  const grad = heroDefaultGradientFor(mainSearchRoot?.getAttribute("data-active-service"));
  for (const el of stack.querySelectorAll(".main-search__promo-grad")) {
    el.style.backgroundImage = grad;
  }
  heroGradLayersInited = true;
}

function resetHeroPromoGradientStack() {
  const stack = getHeroPromoGradStack();
  stack?.classList.remove("main-search__promo-grad-stack--b-front");
  for (const el of stack?.querySelectorAll(".main-search__promo-grad") ?? []) {
    el.style.backgroundImage = "";
  }
  promoGradFrontLayer = 0;
  heroGradLayersInited = false;
}

/** Crossfade inactive layer to current `data-active-service` gradient (call while cards are tucked). */
function crossfadeHeroPromoGradientToCurrentService() {
  const stack = getHeroPromoGradStack();
  if (!stack || !mainSearchRoot?.classList.contains("main-search--hero-default")) return;
  syncHeroTaglineHighlightToMain();
  const grad = heroDefaultGradientFor(mainSearchRoot.getAttribute("data-active-service"));
  const nextFront = promoGradFrontLayer === 0 ? 1 : 0;
  const el = stack.querySelector(`[data-grad-layer="${nextFront}"]`);
  if (el) {
    el.style.backgroundImage = grad;
    void el.offsetHeight;
  }
  promoGradFrontLayer = nextFront;
  stack.classList.toggle("main-search__promo-grad-stack--b-front", nextFront === 1);
}

function setHeroPromoGradientInstantCurrentService() {
  syncHeroTaglineHighlightToMain();
  const stack = getHeroPromoGradStack();
  if (!stack) return;
  const grad = heroDefaultGradientFor(mainSearchRoot?.getAttribute("data-active-service"));
  for (const el of stack.querySelectorAll(".main-search__promo-grad")) {
    el.style.backgroundImage = grad;
  }
  stack.classList.remove("main-search__promo-grad-stack--b-front");
  promoGradFrontLayer = 0;
}

function randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function isHeroDefaultNarrowViewport() {
  return typeof window.matchMedia === "function" && window.matchMedia("(max-width: 47.99rem)").matches;
}

/** Balanced pair of tilts: mirrored around a small shared bias (still varies each change). */
function applyRandomHeroCardTilts() {
  const deco = getHeroPromoDeco();
  if (!deco) return;
  const narrow = isHeroDefaultNarrowViewport();
  const bias = randBetween(-2.25, 2.25);
  const spread = narrow ? randBetween(5.25, 7.25) : randBetween(9.25, 12.25);
  const asym = narrow ? randBetween(-0.65, 0.65) : randBetween(-1.1, 1.1);
  const leftRot = (bias - spread).toFixed(2);
  const rightRot = (bias + spread + asym).toFixed(2);

  deco.style.setProperty("--hero-card-l-rot", `${leftRot}deg`);
  deco.style.setProperty("--hero-card-r-rot", `${rightRot}deg`);

  const n = (a, b) => `${randBetween(a, b).toFixed(2)}`;
  if (narrow) {
    deco.style.setProperty("--hero-card-l-tx", `${n(0.03, 0.08)}rem`);
    deco.style.setProperty("--hero-card-l-ty", `${n(0.04, 0.09)}rem`);
    deco.style.setProperty("--hero-card-r-tx", `${n(-0.08, -0.03)}rem`);
    deco.style.setProperty("--hero-card-r-ty", `${n(-0.04, 0.07)}rem`);
    deco.style.setProperty("--hero-card-l-o1", `${n(37, 42)}%`);
    deco.style.setProperty("--hero-card-l-o2", `${n(62, 68)}%`);
    deco.style.setProperty("--hero-card-r-o1", `${n(61, 66)}%`);
    deco.style.setProperty("--hero-card-r-o2", `${n(41, 46)}%`);
  } else {
    deco.style.setProperty("--hero-card-l-tx", `${n(0.06, 0.16)}rem`);
    deco.style.setProperty("--hero-card-l-ty", `${n(0.08, 0.18)}rem`);
    deco.style.setProperty("--hero-card-r-tx", `${n(-0.16, -0.06)}rem`);
    deco.style.setProperty("--hero-card-r-ty", `${n(-0.06, 0.12)}rem`);
    deco.style.setProperty("--hero-card-l-o1", `${n(36, 41)}%`);
    deco.style.setProperty("--hero-card-l-o2", `${n(64, 70)}%`);
    deco.style.setProperty("--hero-card-r-o1", `${n(60, 66)}%`);
    deco.style.setProperty("--hero-card-r-o2", `${n(40, 47)}%`);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Serializes hero card motion so rapid service changes never get dropped (was: anim lock skip). */
let heroPromoCardAnimQueue = Promise.resolve();

function enqueueHeroPromoCardAnim(fn) {
  heroPromoCardAnimQueue = heroPromoCardAnimQueue.then(fn).catch(() => {});
}

/** First time opening default hero: cards start tucked, then ease into frame. */
async function runHeroPromoCardsEnterFromEdges() {
  const deco = getHeroPromoDeco();
  if (!deco) return;
  ensureHeroPromoGradientLayersInitialized();
  if (prefersReducedMotion()) {
    applyRandomHeroCardTilts();
    setHeroPromoGradientInstantCurrentService();
    deco.classList.remove("main-search__promo-deco--cards-out");
    return;
  }
  deco.classList.remove("main-search__promo-deco--cards-out");
  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
  deco.classList.add("main-search__promo-deco--cards-out");
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
  applyRandomHeroCardTilts();
  deco.classList.remove("main-search__promo-deco--cards-out");
  await sleep(Math.max(HERO_PROMO_CARDS_IN_MS, HERO_PROMO_GRAD_CROSSFADE_MS));
}

/** In default hero: tuck cards, crossfade gradient + random tilts, then cards slide in. */
async function runHeroPromoCardsServiceChangeTransition() {
  const deco = getHeroPromoDeco();
  if (!deco || !mainSearchRoot?.classList.contains("main-search--hero-default")) return;
  ensureHeroPromoGradientLayersInitialized();
  if (prefersReducedMotion()) {
    applyRandomHeroCardTilts();
    setHeroPromoGradientInstantCurrentService();
    deco.classList.remove("main-search__promo-deco--cards-out");
    return;
  }
  deco.classList.remove("main-search__promo-deco--cards-out");
  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
  void deco.offsetHeight;
  deco.classList.add("main-search__promo-deco--cards-out");
  await sleep(HERO_PROMO_CARDS_OUT_MS);
  applyRandomHeroCardTilts();
  crossfadeHeroPromoGradientToCurrentService();
  deco.classList.remove("main-search__promo-deco--cards-out");
  await sleep(Math.max(HERO_PROMO_CARDS_IN_MS, HERO_PROMO_GRAD_CROSSFADE_MS));
}

function getGlide(tablist) {
  return tablist?.querySelector(".service-tabs__glide");
}

/** Layout-space offsets so ancestor transforms (e.g. overlay hero morph `scale`) don’t skew the pill. */
function getActiveTabOffsetsInTablist(tablist, active) {
  const tablistEl = active.closest(".service-tabs__tablist");
  const root = tablistEl ?? active.closest(".service-tabs__track") ?? tablist;
  let left = 0;
  let top = 0;
  let el = active;
  while (el && el !== root) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent;
  }
  return { left, top, width: active.offsetWidth, height: active.offsetHeight };
}

function updateGlideFor(tablist, options = { animate: true }) {
  const glide = getGlide(tablist);
  if (!tablist || !glide) return;
  const active = tablist.querySelector(".service-tabs__tab--active");
  if (!active) return;

  if (!options.animate) {
    glide.classList.add("service-tabs__glide--static");
  }

  const { left, top, width, height } = getActiveTabOffsetsInTablist(tablist, active);
  const isUnderline =
    !!tablist.closest(".main-search__center--overlap") ||
    !!tablist.closest(".search-overlay");

  const UNDERLINE_H = 2;
  glide.style.width = `${width}px`;
  glide.style.height = isUnderline ? `${UNDERLINE_H}px` : `${height}px`;
  glide.style.transform = isUnderline
    ? `translate(${left}px, ${top + height - UNDERLINE_H}px)`
    : `translate(${left}px, ${top}px)`;
  glide.style.opacity = "1";

  if (!options.animate) {
    requestAnimationFrame(() => {
      glide.classList.remove("service-tabs__glide--static");
    });
  }
}

const SERVICE_ICON_MAP = {
  buy: buyAssetUrl,
  projects: projectsAssetUrl,
  rent: "/Rent.png",
  commercial: "/Commercial.png",
  pg: "/PG.png",
  plots: "/Plot.png",
};

function wireHeroPromoCardRasterIcons() {
  document.querySelectorAll("img.main-search__promo-card-img--buy").forEach((img) => {
    img.src = buyAssetUrl;
  });
  document.querySelectorAll("img.main-search__promo-card-img--projects").forEach((img) => {
    img.src = projectsAssetUrl;
  });
}

/* Inject service icon directly inside each tab button so CSS flex centres it */
function buildServiceIcons() {
  document.querySelectorAll(".service-tabs__tab[data-service]").forEach((tab) => {
    // Store plain text label for the bold-width reservation ::after trick
    if (!tab.dataset.label) {
      tab.dataset.label = tab.textContent.trim();
    }

    if (tab.querySelector(".service-tabs__service-icon")) return; // already injected
    const src = SERVICE_ICON_MAP[tab.dataset.service];
    if (!src) return;
    const img = document.createElement("img");
    img.className = "service-tabs__service-icon";
    img.src = src;
    img.alt = "";
    img.decoding = "async";
    tab.prepend(img);
  });
}

function setActiveService(service) {
  const next = service ? String(service) : "";
  const prevService =
    mainTablist?.querySelector(".service-tabs__tab--active")?.dataset.service ??
    mainSearchRoot?.getAttribute("data-active-service") ??
    "";
  const inHeroDefault = mainSearchRoot?.classList.contains("main-search--hero-default");

  allTablists.forEach((tablist) => {
    tablist.querySelectorAll(".service-tabs__tab[data-service]").forEach((t) => {
      const on = t.dataset.service === next;
      t.classList.toggle("service-tabs__tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    updateGlideFor(tablist, { animate: true });
  });
  syncMainSearchDataActiveService();

  if (inHeroDefault && next && prevService !== next) {
    applyHeroTaglineFromCurrentService({ animate: true });
  }

  if (inHeroDefault && next && prevService && prevService !== next) {
    enqueueHeroPromoCardAnim(() => runHeroPromoCardsServiceChangeTransition());
  }
}

function syncOverlayTabsFromMain() {
  if (!mainTablist || !overlayTablist) return;
  const active = mainTablist.querySelector(".service-tabs__tab--active")?.dataset.service;
  if (!active) return;
  overlayTablist.querySelectorAll(".service-tabs__tab[data-service]").forEach((t) => {
    const on = t.dataset.service === active;
    t.classList.toggle("service-tabs__tab--active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  updateGlideFor(overlayTablist, { animate: false });
}

function navigateToPdp() {
  const base = import.meta.env?.BASE_URL ?? "/";
  window.location.assign(new URL("pdp.html", window.location.origin + base).href);
}

/** Dedicated route for building mobile Buy (full page, not overlay). */
function navigateToBuyPage() {
  const base = import.meta.env?.BASE_URL ?? "/";
  const url = new URL("buy.html", window.location.origin + base);
  url.hash = "buy-shortcut";
  window.location.assign(url.href);
}

function navigateToSrp(query) {
  const base = import.meta.env?.BASE_URL ?? "/";
  const url = new URL("srp.html", window.location.origin + base);
  const q = (query ?? "").trim();
  if (q) url.searchParams.set("q", q);
  window.location.assign(url.href);
}

function initBuyPageShortcutFromHome() {
  window.addEventListener(
    "keydown",
    e => {
      const keyI = e.key === "i" || e.key === "I";
      if (!e.altKey || e.shiftKey || !keyI) return;

      const ae = document.activeElement;
      const tag = ae?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || ae?.isContentEditable) {
        return;
      }

      const macChord = e.metaKey && !e.ctrlKey;
      const winChord = e.ctrlKey && !e.metaKey;
      if (!macChord && !winChord) return;

      e.preventDefault();
      e.stopPropagation();
      navigateToBuyPage();
    },
    true
  );
}

initBuyPageShortcutFromHome();

allTablists.forEach((tablist) => {
  tablist.querySelectorAll(".service-tabs__tab[data-service]").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.service === "buy") {
        navigateToBuyPage();
        return;
      }
      if (tab.dataset.service === "projects") {
        navigateToPdp();
        return;
      }
      setActiveService(tab.dataset.service);
    });
  });
});

wireHeroPromoCardRasterIcons();
buildServiceIcons();

requestAnimationFrame(() => {
  allTablists.forEach((tl) => updateGlideFor(tl, { animate: false }));
  syncMainSearchDataActiveService();
});

window.addEventListener("resize", () => {
  allTablists.forEach((tl) => updateGlideFor(tl, { animate: false }));
});

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    allTablists.forEach((tl) => updateGlideFor(tl, { animate: false }));
    syncMainSearchDataActiveService();
  });
}

/* ---- Homepage rotating placeholder ---- */

const SEARCH_ROTATE_PHRASES = [
  "Search for 3BHK in Gurugram",
  "Search for sea-facing homes in Mumbai",
  "Search for villas under 5 Cr in Goa",
  "Search for rent-ready 2BHK in Indiranagar",
  "Search for office space in BKC",
  "Search for plots near Noida Expressway",
  "Search for PG near IIT Delhi",
  "Search for lake-view apartments in Bangalore",
  "Search for new launches in Pune",
  "Search for ready-to-move in Whitefield",
];

const primaryInputWrap = document.querySelector(".main-search .search-capsule__input-wrap");
const rotElA = document.querySelector(".main-search .search-capsule__rotating-text--a");
const rotElB = document.querySelector(".main-search .search-capsule__rotating-text--b");
const stickyRotA = document.querySelector(".site-header__sticky-search .search-capsule__rotating-text--a");
const stickyRotB = document.querySelector(".site-header__sticky-search .search-capsule__rotating-text--b");
const stickyInputWrap = document.querySelector(".site-header__sticky-search .search-capsule__input-wrap");
const stickyCapsuleInner = document.querySelector(".site-header__sticky-search .search-capsule__inner");

let rotPhraseIndex = Math.floor(Math.random() * SEARCH_ROTATE_PHRASES.length);
/** When true, `rotElA` holds the visible line */
let rotActiveIsA = true;
let rotateIntervalId = null;
const ROTATE_MS = 4200;
const ROTATE_TRANSITION_MS = 480;

function mirrorHeroRotatorToSticky() {
  if (!stickyRotA || !stickyRotB || !rotElA || !rotElB) return;
  stickyRotA.textContent = rotElA.textContent;
  stickyRotB.textContent = rotElB.textContent;
  stickyRotA.className = rotElA.className;
  stickyRotB.className = rotElB.className;
}

function pickNextPhraseIndex() {
  if (SEARCH_ROTATE_PHRASES.length < 2) return 0;
  let n = Math.floor(Math.random() * SEARCH_ROTATE_PHRASES.length);
  let guard = 0;
  while (n === rotPhraseIndex && guard++ < 12) {
    n = Math.floor(Math.random() * SEARCH_ROTATE_PHRASES.length);
  }
  return n;
}

function stopRotatingPlaceholder() {
  if (rotateIntervalId != null) {
    window.clearInterval(rotateIntervalId);
    rotateIntervalId = null;
  }
}

function startRotatingPlaceholder() {
  stopRotatingPlaceholder();
  rotateIntervalId = window.setInterval(tickRotatingPlaceholder, ROTATE_MS);
}

function applyRotatorInitialState() {
  if (!rotElA || !rotElB) return;
  rotElA.textContent = SEARCH_ROTATE_PHRASES[rotPhraseIndex];
  rotElB.textContent = "";
  rotElA.classList.remove("is-passive", "is-leaving");
  rotElA.classList.add("is-active");
  rotElB.classList.remove("is-active", "is-leaving");
  rotElB.classList.add("is-passive");
  rotActiveIsA = true;
  mirrorHeroRotatorToSticky();
}

function tickRotatingPlaceholder() {
  if (!rotElA || !rotElB || !primaryInputWrap) return;
  const overlayOpen = document.getElementById("search-overlay")?.classList.contains("is-visible");
  if (overlayOpen || document.getElementById("search-input-primary")?.value?.trim()) return;

  if (prefersReducedMotion()) {
    rotPhraseIndex = pickNextPhraseIndex();
    rotElA.textContent = SEARCH_ROTATE_PHRASES[rotPhraseIndex];
    rotElB.textContent = "";
    rotElA.classList.add("is-active");
    rotElB.classList.add("is-passive");
    mirrorHeroRotatorToSticky();
    return;
  }

  const outgoing = rotActiveIsA ? rotElA : rotElB;
  const incoming = rotActiveIsA ? rotElB : rotElA;
  const nextIdx = pickNextPhraseIndex();

  incoming.textContent = SEARCH_ROTATE_PHRASES[nextIdx];
  incoming.classList.remove("is-active", "is-leaving");
  incoming.classList.add("is-passive");

  void incoming.offsetWidth;

  requestAnimationFrame(() => {
    outgoing.classList.remove("is-active");
    outgoing.classList.add("is-leaving");
    incoming.classList.remove("is-passive");
    incoming.classList.add("is-active");
    mirrorHeroRotatorToSticky();
  });

  window.setTimeout(() => {
    outgoing.classList.remove("is-leaving");
    outgoing.classList.add("is-passive");
    outgoing.textContent = "";
    rotPhraseIndex = nextIdx;
    rotActiveIsA = !rotActiveIsA;
    mirrorHeroRotatorToSticky();
  }, ROTATE_TRANSITION_MS);
}

function initRotatingPlaceholder() {
  if (!rotElA || !rotElB) return;
  applyRotatorInitialState();
  startRotatingPlaceholder();
}

/* ---- Full-screen search overlay ---- */

const overlay = document.getElementById("search-overlay");
const primaryInput = document.getElementById("search-input-primary");
const stickyTriggerInput = document.getElementById("search-input-sticky");
const overlayInput = document.getElementById("search-input-overlay");
const closeTriggers = document.querySelectorAll("[data-close-search]");
const overlayMorphHero = document.querySelector(".main-search__hero-block--morph-target");

/** Must match `.search-overlay` opacity transition (~0.62s) before `visibility`; buffer for hidden/inert. */
const OVERLAY_TRANSITION_MS = 700;

const MORPH_MS = 640;
const MORPH_EASE = "cubic-bezier(0.33, 1.18, 0.32, 1)";

/** Skip one focus event from programmatic refocus after close (avoids immediate reopen). */
let skipOpenOnNextPrimaryFocus = false;

/** Avoid stacking two open sequences from focus+click before `is-visible` is set. */
let openingSearchOverlay = false;

const mainSearchCapsuleInner = document.querySelector(".main-search .search-capsule__inner");

/** Half of homepage panel height → main bottom padding; search column uses top:100% + translateY(-50%) on ad bottom. */
const homepageSearchPanelEl = document.querySelector(".main-search__center--overlap > .main-search__panel");

/** Matches `base.css` mobile hero stack — panel no longer overlaps ad; skip half-panel fold inset. */
const MOBILE_HERO_STACK_MQ = "(max-width: 47.99rem)";

function syncHomepageSearchPanelHalfPx() {
  if (!homepageSearchPanelEl) return;
  if (homepageSearchPanelEl.classList.contains("is-expanded")) return;
  const stackedHero =
    typeof window.matchMedia === "function" && window.matchMedia(MOBILE_HERO_STACK_MQ).matches;
  const halfPx = stackedHero ? 0 : homepageSearchPanelEl.offsetHeight / 2;
  document.documentElement.style.setProperty("--main-search-panel-measured-half-px", `${halfPx}px`);
}

function initHomepageSearchLayoutSync() {
  if (!homepageSearchPanelEl) return;
  syncHomepageSearchPanelHalfPx();
  requestAnimationFrame(() => {
    requestAnimationFrame(syncHomepageSearchPanelHalfPx);
  });
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => syncHomepageSearchPanelHalfPx());
    ro.observe(homepageSearchPanelEl);
  }
  window.addEventListener("resize", syncHomepageSearchPanelHalfPx);
  if (typeof window.matchMedia === "function") {
    const mq = window.matchMedia(MOBILE_HERO_STACK_MQ);
    const onMq = () => syncHomepageSearchPanelHalfPx();
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onMq);
    else if (typeof mq.addListener === "function") mq.addListener(onMq);
  }
  if (document.fonts?.ready) {
    document.fonts.ready.then(syncHomepageSearchPanelHalfPx);
  }
  window.addEventListener("load", syncHomepageSearchPanelHalfPx, { once: true });
}

initHomepageSearchLayoutSync();

/** Toggle hero between ad (promo) and muted default strip. */
function initHeroPromoToggle() {
  const promoTrigger = document.getElementById("main-search-hero-promo-trigger");
  const promoAside = mainSearchRoot?.querySelector(".main-search__promo");
  if (!mainSearchRoot || !promoTrigger) return;

  promoTrigger.addEventListener("click", () => {
    const nowDefault = mainSearchRoot.classList.toggle("main-search--hero-default");
    if (nowDefault) {
      promoTrigger.setAttribute("aria-label", "Show advertisement again");
      promoAside?.setAttribute("aria-label", "Hero");
      syncHeroTaglineHighlightToMain();
      applyHeroTaglineFromCurrentService({ animate: false });
      enqueueHeroPromoCardAnim(() => runHeroPromoCardsEnterFromEdges());
    } else {
      promoTrigger.setAttribute("aria-label", "Continue past advertisement");
      promoAside?.setAttribute("aria-label", "Advertisement");
      getHeroPromoDeco()?.classList.remove("main-search__promo-deco--cards-out");
      resetHeroPromoGradientStack();
      mainSearchRoot.style.removeProperty("--hero-tagline-sync");
      mainSearchRoot.querySelector(".main-search__hero-tagline")?.style.removeProperty("--hero-tagline-sync");
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => syncHomepageSearchPanelHalfPx());
    });
  });
}

initHeroPromoToggle();

function getHeroMorphMetrics() {
  const primaryHero = document.querySelector("main.main-search .main-search__hero-block");
  if (!primaryHero || !overlayMorphHero) return null;

  const from = primaryHero.getBoundingClientRect();
  const to = overlayMorphHero.getBoundingClientRect();
  if (to.width < 2 || to.height < 2) return null;

  const sx = from.width / to.width;
  const sy = from.height / to.height;
  const cxFrom = from.left + from.width / 2;
  const cyFrom = from.top + from.height / 2;
  const cxTo = to.left + to.width / 2;
  const cyTo = to.top + to.height / 2;
  const dx = cxFrom - cxTo;
  const dy = cyFrom - cyTo;

  return { primaryHero, overlayHero: overlayMorphHero, dx, dy, sx, sy };
}

function runSearchHeroMorph() {
  if (prefersReducedMotion()) return;

  const m = getHeroMorphMetrics();
  if (!m) return;

  const { overlayHero, dx, dy, sx, sy } = m;

  overlayHero.style.willChange = "transform";
  overlayHero.style.transition = "none";
  overlayHero.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlayHero.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}`;
      overlayHero.style.transform = "";
    });
  });

  let cleaned = false;

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    overlayHero.style.willChange = "";
    overlayHero.style.transition = "";
    overlayHero.style.transform = "";
    overlayHero.removeEventListener("transitionend", onEnd);
    if (overlayTablist) updateGlideFor(overlayTablist, { animate: false });
  };

  function onEnd(e) {
    if (e.target !== overlayHero || e.propertyName !== "transform") return;
    cleanup();
  }

  overlayHero.addEventListener("transitionend", onEnd);
  window.setTimeout(cleanup, MORPH_MS + 140);
}

function clearOverlayHeroTransform() {
  if (!overlayMorphHero) return;
  overlayMorphHero.style.willChange = "";
  overlayMorphHero.style.transition = "";
  overlayMorphHero.style.transform = "";
}

function finalizeSearchOverlayClose() {
  overlay?.classList.remove("is-visible");
  overlay?.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";

  if (!primaryInput?.value.trim()) {
    primaryInputWrap?.classList.remove("search-capsule__input-wrap--hide-rotator");
    stickyInputWrap?.classList.remove("search-capsule__input-wrap--hide-rotator");
    startRotatingPlaceholder();
  }

  window.setTimeout(() => {
    overlay?.setAttribute("inert", "");
    overlay?.setAttribute("hidden", "");
    clearOverlayHeroTransform();
  }, OVERLAY_TRANSITION_MS);

  skipOpenOnNextPrimaryFocus = true;
  primaryInput?.focus({ preventScroll: true });
  window.setTimeout(() => {
    skipOpenOnNextPrimaryFocus = false;
  }, 0);
}

function openSearchOverlay(opts = {}) {
  const skipMorph = opts.skipMorph === true;
  if (!overlay || !overlayInput || !primaryInput) return;
  if (overlay.classList.contains("is-visible") || openingSearchOverlay) return;

  openingSearchOverlay = true;
  overlayInput.value = primaryInput.value;
  syncOverlayTabsFromMain();
  overlay.removeAttribute("hidden");
  overlay.removeAttribute("inert");
  overlay.setAttribute("aria-hidden", "false");
  primaryInput.setAttribute("aria-expanded", "true");
  stickyTriggerInput?.setAttribute("aria-expanded", "true");
  primaryInputWrap?.classList.add("search-capsule__input-wrap--hide-rotator");
  stickyInputWrap?.classList.add("search-capsule__input-wrap--hide-rotator");
  stopRotatingPlaceholder();

  /* Double rAF: closed state must paint first so opacity/transform transitions run. */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
      document.documentElement.style.overflow = "hidden";
      openingSearchOverlay = false;

      requestAnimationFrame(() => {
        if (!skipMorph) runSearchHeroMorph();
        requestAnimationFrame(() => {
          updateGlideFor(overlayTablist, { animate: false });
          overlayInput.focus({ preventScroll: true });
        });
      });
    });
  });
}

function closeSearchOverlay() {
  if (!overlay || !overlayInput || !primaryInput) return;
  if (!overlay.classList.contains("is-visible")) return;

  primaryInput.value = overlayInput.value;
  primaryInput.setAttribute("aria-expanded", "false");
  stickyTriggerInput?.setAttribute("aria-expanded", "false");
  finalizeSearchOverlayClose();
}

const mainSearchCapsule = document.querySelector(".main-search .search-capsule");
const suggestionsList = document.getElementById("search-suggestions-list");

const FAKE_RESULTS = [
  "2 BHK Apartment in Andheri West",
  "3 BHK Villa in Bandra",
  "1 RK Studio in Powai",
  "4 BHK Penthouse in South Mumbai",
  "New Projects in Malad",
  "Ready to Move Flats in Goregaon",
  "Luxury Homes in Worli",
  "Affordable Housing in Thane",
  "Plots in Navi Mumbai",
  "Commercial Spaces in BKC"
];

function openSuggestions() {
  if (mainSearchCapsule && !mainSearchCapsule.classList.contains("is-expanded")) {
    mainSearchCapsule.classList.add("is-expanded");
    primaryInput?.setAttribute("aria-expanded", "true");
    primaryInputWrap?.classList.add("search-capsule__input-wrap--hide-rotator");
    stopRotatingPlaceholder();
    
    const panel = document.querySelector(".main-search__panel");
    const wrapper = document.querySelector(".main-search__center--overlap");
    if (panel && wrapper) {
      wrapper.style.setProperty('--panel-min-height', `${panel.offsetHeight}px`);
      panel.classList.add("is-expanded");
      
      setTimeout(() => {
        panel.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
    
    const homeBelow = document.querySelector(".main-search__home-below");
    if (homeBelow) homeBelow.classList.add("is-hidden-by-search");
  }
}

function closeSuggestions() {
  if (mainSearchCapsule && mainSearchCapsule.classList.contains("is-expanded")) {
    mainSearchCapsule.classList.remove("is-expanded");
    primaryInput?.setAttribute("aria-expanded", "false");
    
    const panel = document.querySelector(".main-search__panel");
    const homeBelow = document.querySelector(".main-search__home-below");
    
    if (homeBelow) homeBelow.classList.remove("is-hidden-by-search");
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    
    setTimeout(() => {
      if (panel) panel.classList.remove("is-expanded");
    }, 400);
  }
  if (!primaryInput?.value.trim()) {
    primaryInputWrap?.classList.remove("search-capsule__input-wrap--hide-rotator");
    startRotatingPlaceholder();
  }
}

function populateSuggestions(query) {
  if (!suggestionsList) return;
  suggestionsList.innerHTML = "";
  if (!query.trim()) {
    closeSuggestions();
    return;
  }
  
  let matches = FAKE_RESULTS.filter(r => r.toLowerCase().includes(query.toLowerCase()));
  if (matches.length < 7) {
    const others = FAKE_RESULTS.filter(r => !matches.includes(r));
    matches = matches.concat(others).slice(0, 7);
  } else {
    matches = matches.slice(0, 7);
  }
  
  matches.forEach(m => {
    const li = document.createElement("li");
    li.className = "search-suggestion-item";
    li.innerHTML = `
      <span class="search-capsule__icon" aria-hidden="true" style="color: var(--color-overlay-text-secondary); width: 1rem; height: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
      </span>
      <span>${m}</span>
    `;
    li.addEventListener("click", () => {
      navigateToSrp(m);
    });
    suggestionsList.appendChild(li);
  });
  
  openSuggestions();
}

document.addEventListener("mousedown", (e) => {
  if (mainSearchCapsule && !mainSearchCapsule.contains(e.target)) {
    closeSuggestions();
  }
});

if (overlay && primaryInput && overlayInput) {
  /** Open only from explicit search-bar interaction (not focus/hover quirks on the wider panel). */
  mainSearchCapsuleInner?.addEventListener("click", () => {
    if (skipOpenOnNextPrimaryFocus) return;
    primaryInputWrap?.classList.add("search-capsule__input-wrap--hide-rotator");
    stopRotatingPlaceholder();
    primaryInput?.focus();
    if (primaryInput?.value.trim()) populateSuggestions(primaryInput.value);
  });

  stickyCapsuleInner?.addEventListener("click", () => {
    if (skipOpenOnNextPrimaryFocus) return;
    if (overlay.classList.contains("is-visible")) return;
    openSearchOverlay({ skipMorph: true });
  });

  primaryInput.addEventListener("keydown", (e) => {
    if (skipOpenOnNextPrimaryFocus) return;
    if (e.key === "Enter" || e.key === " ") {
      if (e.key === " ") return; // allow spacebar for typing
      e.preventDefault();
      const value = primaryInput?.value.trim();
      if (value) navigateToSrp(value);
    }
  });

  primaryInput.addEventListener("input", (e) => {
    populateSuggestions(e.target.value);
  });



  stickyTriggerInput?.addEventListener("keydown", (e) => {
    if (skipOpenOnNextPrimaryFocus) return;
    if (overlay.classList.contains("is-visible")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSearchOverlay({ skipMorph: true });
    }
  });

  closeTriggers.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeSearchOverlay();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-visible")) {
      e.preventDefault();
      closeSearchOverlay();
    }
  });
}

initRotatingPlaceholder();
syncHomepageSearchPanelHalfPx();

/** Cities for header location search (popular first; extended list for typeahead). */
const LOCATION_SEARCH_INDEX = [
  "Mumbai",
  "Delhi",
  "New Delhi",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Visakhapatnam",
  "Bhopal",
  "Indore",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Coimbatore",
  "Kochi",
  "Noida",
  "Gurugram",
  "Gurgaon",
  "Thane",
  "Faridabad",
  "Rajkot",
  "Meerut",
  "Varanasi",
  "Srinagar",
  "Amritsar",
  "Chandigarh",
  "Mysuru",
  "Mysore",
  "Nashik",
  "Dehradun",
  "Jodhpur",
  "Raipur",
  "Prayagraj",
  "Allahabad",
  "Agra",
  "Guwahati",
  "Vijayawada",
  "Madurai",
  "Udaipur",
  "Kozhikode",
  "Thrissur",
];

function filterLocationSearchMatches(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts = [];
  const includes = [];
  for (const city of LOCATION_SEARCH_INDEX) {
    const lower = city.toLowerCase();
    if (lower.startsWith(q)) starts.push(city);
    else if (lower.includes(q)) includes.push(city);
  }
  const seen = new Set();
  const out = [];
  for (const c of [...starts, ...includes]) {
    if (seen.has(c)) continue;
    seen.add(c);
    out.push(c);
    if (out.length >= 12) break;
  }
  return out;
}

function initHeaderLocationPicker() {
  const wrap = document.querySelector(".site-header__location-wrap");
  const trigger = document.getElementById("site-header-location-trigger");
  const panel = document.getElementById("site-header-location-panel");
  const backdrop = document.getElementById("site-header-location-backdrop");
  const closeBtn = document.getElementById("site-header-location-close");
  const cityLabel = document.getElementById("site-header-location-city-label");
  const searchInput = document.getElementById("site-header-location-search");
  const resultsEl = document.getElementById("site-header-location-results");
  const allCitiesEl = document.getElementById("site-header-location-all-cities");
  const gpsBtn = document.getElementById("site-header-location-gps");
  const gpsStatus = document.getElementById("site-header-location-gps-status");

  if (!wrap || !trigger || !panel || !cityLabel) return;

  // Populate all-cities list (exclude the top-cities already shown as chips)
  const TOP_CITIES = new Set(["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Ahmedabad"]);
  if (allCitiesEl) {
    const extraCities = LOCATION_SEARCH_INDEX.filter((c) => !TOP_CITIES.has(c));
    extraCities.forEach((city) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "site-header__location-all-city-btn";
      btn.textContent = city;
      btn.dataset.locationCity = city;
      li.appendChild(btn);
      allCitiesEl.appendChild(li);
    });
  }

  let open = false;

  function setCity(name) {
    const city = String(name).trim();
    if (!city) return;
    cityLabel.textContent = city;
    trigger.setAttribute("aria-label", `Searching in ${city}. Change city`);
    window.dispatchEvent(
      new CustomEvent("housing:location-change", {
        detail: { city },
        bubbles: true,
      }),
    );
  }

  const appRoot = document.getElementById("app");

  function openPanel() {
    if (open) return;
    open = true;
    document.body.style.overflow = "hidden";
    wrap.classList.add("site-header__location-wrap--open");
    appRoot?.classList.add("app-shell--location-open");
    panel.removeAttribute("inert");
    panel.setAttribute("aria-hidden", "false");
    backdrop?.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    document.querySelector(".site-header__nav-item--mega")?.classList.remove("is-open");
    document.getElementById("site-header-mega-buyers-trigger")?.setAttribute("aria-expanded", "false");
    requestAnimationFrame(() => searchInput?.focus({ preventScroll: true }));
  }

  function closePanel() {
    if (!open) return;
    open = false;
    document.body.style.overflow = "";
    wrap.classList.remove("site-header__location-wrap--open");
    appRoot?.classList.remove("app-shell--location-open");
    panel.setAttribute("inert", "");
    panel.setAttribute("aria-hidden", "true");
    backdrop?.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    if (searchInput) searchInput.value = "";
    if (resultsEl) {
      resultsEl.hidden = true;
      resultsEl.innerHTML = "";
    }
    if (gpsStatus) gpsStatus.textContent = "";
    trigger.focus({ preventScroll: true });
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (open) closePanel(); else openPanel();
  });

  closeBtn?.addEventListener("click", closePanel);
  backdrop?.addEventListener("click", closePanel);

  // City chip clicks (top cities)
  wrap.querySelectorAll("[data-location-city]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("data-location-city");
      if (city) { setCity(city); closePanel(); }
    });
  });

  // All-cities list delegation
  allCitiesEl?.addEventListener("click", (e) => {
    const btn = e.target.closest(".site-header__location-all-city-btn");
    if (!btn) return;
    const city = btn.dataset.locationCity;
    if (city) { setCity(city); closePanel(); }
  });

  if (searchInput && resultsEl) {
    searchInput.addEventListener("input", () => {
      const matches = filterLocationSearchMatches(searchInput.value);
      if (matches.length === 0) {
        resultsEl.hidden = true;
        resultsEl.innerHTML = "";
        return;
      }
      resultsEl.hidden = false;
      resultsEl.innerHTML = "";
      for (const c of matches) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "site-header__location-result";
        button.dataset.locationCity = c;
        button.textContent = c;
        li.appendChild(button);
        resultsEl.appendChild(li);
      }
    });
  }

  if (resultsEl) {
    resultsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".site-header__location-result");
      if (!btn) return;
      const city = btn.dataset.locationCity;
      if (city) {
        setCity(city);
        closePanel();
      }
    });
  }

  document.addEventListener("mousedown", (e) => {
    if (!open) return;
    if (!panel.contains(e.target) && !trigger.contains(e.target)) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !open) return;
    const searchOverlayEl = document.getElementById("search-overlay");
    if (searchOverlayEl?.classList.contains("is-visible")) return;
    e.preventDefault();
    closePanel();
  });

  if (gpsBtn && gpsStatus) {
    gpsBtn.addEventListener("click", () => {
      gpsStatus.textContent = "Getting location…";
      if (!navigator.geolocation) {
        gpsStatus.textContent = "Location isn’t available in this browser.";
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const url = new URL("https://nominatim.openstreetmap.org/reverse");
            url.searchParams.set("format", "jsonv2");
            url.searchParams.set("lat", String(latitude));
            url.searchParams.set("lon", String(longitude));
            const res = await fetch(url.toString(), {
              headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error("reverse failed");
            const data = await res.json();
            const addr = data.address ?? {};
            const place =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.municipality ||
              addr.city_district ||
              addr.county ||
              addr.state_district ||
              addr.state ||
              addr.region;
            if (place) {
              setCity(place);
              gpsStatus.textContent = "";
              closePanel();
            } else {
              gpsStatus.textContent = "Couldn’t detect a city name for this area.";
            }
          } catch {
            gpsStatus.textContent = "Couldn’t resolve your location. Try choosing a city.";
          }
        },
        (err) => {
          if (err.code === 1) {
            gpsStatus.textContent = "Location permission denied.";
          } else {
            gpsStatus.textContent = "Couldn’t read your location.";
          }
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
      );
    });
  }
}

/** Buyers mega: hover open / delayed close so pointer can move into the panel */
function initBuyersMegaHover() {
  const item = document.querySelector(".site-header__nav-item--mega");
  const trigger = document.getElementById("site-header-mega-buyers-trigger");
  if (!item || !trigger) return;

  let closeTimer = null;
  const closeDelayMs = 160;

  item.addEventListener("mouseenter", () => {
    window.clearTimeout(closeTimer);
    closeTimer = null;
    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  });

  item.addEventListener("mouseleave", () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      closeTimer = null;
    }, closeDelayMs);
  });
}

function initMobileNavDrawer() {
  const root = document.getElementById("site-header-drawer");
  const panel = document.getElementById("site-header-drawer-panel");
  const menuBtn = document.getElementById("site-header-menu-btn");
  if (!root || !panel || !menuBtn) return;

  const closeTriggers = root.querySelectorAll("[data-site-header-drawer-close]");
  let bodyOverflowPrev = "";

  function openDrawer() {
    root.classList.add("site-header__drawer--open");
    // Inline styles as a forced failsafe -- highest specificity short of
    // !important, so this cannot be silently defeated by any other rule.
    root.style.setProperty("display", "block", "important");
    root.style.setProperty("opacity", "1", "important");
    root.style.setProperty("pointer-events", "auto", "important");
    panel.style.setProperty("transform", "translateX(0)", "important");
    root.removeAttribute("inert");
    root.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    bodyOverflowPrev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => panel.focus(), 50);
  }

  function closeDrawer() {
    root.classList.remove("site-header__drawer--open");
    root.style.removeProperty("display");
    root.style.removeProperty("opacity");
    root.style.removeProperty("pointer-events");
    panel.style.removeProperty("transform");
    root.setAttribute("aria-hidden", "true");
    root.setAttribute("inert", "");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = bodyOverflowPrev || "";
    panel.querySelectorAll("details.site-header__drawer-details").forEach((det) => det.removeAttribute("open"));
    menuBtn.focus();
  }

  menuBtn.addEventListener("click", () => {
    if (root.classList.contains("site-header__drawer--open")) closeDrawer();
    else openDrawer();
  });

  closeTriggers.forEach((el) => el.addEventListener("click", () => closeDrawer()));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("site-header__drawer--open")) closeDrawer();
  });

  panel.querySelectorAll("details.site-header__drawer-details").forEach((det) => {
    det.addEventListener("toggle", () => {
      if (!det.open) return;
      panel.querySelectorAll("details.site-header__drawer-details").forEach((other) => {
        if (other !== det) other.removeAttribute("open");
      });
    });
  });
}

function initSpotlightAd() {
  const ad = document.querySelector(".spotlight-ad--split");
  if (!ad) return;

  const dots = Array.from(ad.querySelectorAll(".spotlight-ad__dot[data-spotlight-idx]"));
  if (!dots.length) return;

  const tabs = Array.from(ad.querySelectorAll(".spotlight-ad__tab[data-spotlight-idx]"));
  const images = Array.from(ad.querySelectorAll(".spotlight-ad__image"));
  const slides = Array.from(ad.querySelectorAll(".spotlight-ad__details-slide"));
  const track = ad.querySelector(".spotlight-ad__dots-track");
  const pill = ad.querySelector(".spotlight-ad__dots-pill");

  const AUTO_INTERVAL_MS = 7000;
  let current = 0;
  let timer = null;

  function syncSpotlightPill() {
    if (!track || !pill || !dots[current]) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = dots[current].getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2 - trackRect.left;
    const halfW = pill.offsetWidth / 2;
    pill.style.transform = `translateX(${cx - halfW}px) translateY(-50%)`;
  }

  function switchTo(idx) {
    const next = ((idx % dots.length) + dots.length) % dots.length;
    if (next === current) return;
    current = next;

    dots.forEach((d, i) => {
      const on = i === current;
      d.classList.toggle("spotlight-ad__dot--active", on);
      d.setAttribute("aria-pressed", on ? "true" : "false");
      d.tabIndex = on ? 0 : -1;
    });

    tabs.forEach((t, i) => {
      const on = i === current;
      t.classList.toggle("spotlight-ad__tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });

    images.forEach((img, i) => img.classList.toggle("spotlight-ad__image--active", i === current));

    slides.forEach((slide, i) => {
      const on = i === current;
      slide.classList.toggle("spotlight-ad__details-slide--active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
      if (on) {
        slide.removeAttribute("data-slide-pos");
      } else {
        slide.setAttribute("data-slide-pos", i > current ? "after" : "before");
      }
    });

    requestAnimationFrame(() => requestAnimationFrame(syncSpotlightPill));
  }

  function scheduleNext() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      switchTo(current + 1);
      scheduleNext();
    }, AUTO_INTERVAL_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      switchTo(i);
      scheduleNext();
    });
  });

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      switchTo(i);
      scheduleNext();
    });
  });

  const dotsRow = ad.querySelector(".spotlight-ad__dots");
  dotsRow?.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = current;
    if (e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = dots.length - 1;
    switchTo(next);
    scheduleNext();
    dots[current]?.focus();
  });

  const tablist = ad.querySelector(".spotlight-ad__tabs");
  tablist?.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = current;
    if (e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = dots.length - 1;
    switchTo(next);
    scheduleNext();
    tabs[current]?.focus();
  });

  window.addEventListener("resize", () => requestAnimationFrame(syncSpotlightPill), { passive: true });

  scheduleNext();
  requestAnimationFrame(() => requestAnimationFrame(syncSpotlightPill));
  document.fonts?.ready?.then(() => requestAnimationFrame(syncSpotlightPill));
}

function initSiteFooter() {
  const root = document.getElementById("site-footer");
  if (!root) return;

  const tabs = [...root.querySelectorAll(".site-footer__tablist [role=\"tab\"]")];
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls") ?? ""))
    .filter(Boolean);
  if (!tabs.length || panels.length !== tabs.length) return;

  function select(index) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle("site-footer__tab--active", on);
      const panel = panels[i];
      if (!panel) return;
      if (on) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));

    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      let next = i;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = i === last ? 0 : i + 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = i === 0 ? last : i - 1;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = last;
      } else {
        return;
      }
      select(next);
      tabs[next]?.focus();
    });
  });
}

function initStickyHeaderCompact() {
  const header = document.querySelector(".site-header");
  const stickyRoot = document.querySelector(".site-header__sticky-search");
  const nav = document.querySelector(".site-header__nav");
  const megaItem = document.querySelector(".site-header__nav-item--mega");
  const megaTrigger = document.getElementById("site-header-mega-buyers-trigger");
  /** Hero search capsule — compact bar only after this leaves the viewport */
  const firstFoldSearch = document.querySelector("main.main-search .search-capsule");
  const pdpPage = document.getElementById("pdp-page");

  /** PDP uses the same chrome as homepage scroll-compact bar, always visible. */
  if (pdpPage) {
    if (!header || !stickyRoot) return;
    header.classList.add("site-header--compact");
    stickyRoot.removeAttribute("inert");
    stickyRoot.setAttribute("aria-hidden", "false");
    if (stickyRotA && stickyRotB) {
      const text = SEARCH_ROTATE_PHRASES[rotPhraseIndex] ?? SEARCH_ROTATE_PHRASES[0];
      stickyRotA.textContent = text;
      stickyRotB.textContent = "";
      stickyRotA.classList.remove("is-passive", "is-leaving");
      stickyRotA.classList.add("is-active");
      stickyRotB.classList.remove("is-active", "is-leaving");
      stickyRotB.classList.add("is-passive");
    }
    return;
  }

  if (!header || !stickyRoot) return;

  const FALLBACK_SCROLL_THRESHOLD = 56;
  let ticking = false;
  const mqWideNav = "(min-width: 64rem)";

  function shouldShowCompactSticky() {
    if (!firstFoldSearch) {
      return window.scrollY >= FALLBACK_SCROLL_THRESHOLD;
    }
    const rect = firstFoldSearch.getBoundingClientRect();
    return rect.bottom <= 0;
  }

  function triggerNavRevealFromTop() {
    if (!nav || prefersReducedMotion()) return;
    if (typeof window.matchMedia === "function" && !window.matchMedia(mqWideNav).matches) return;

    nav.classList.remove("site-header__nav--reveal-from-top");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nav.classList.add("site-header__nav--reveal-from-top");
      });
    });

    nav.addEventListener(
      "animationend",
      (e) => {
        if (e.animationName !== "site-header-nav-reveal-from-top") return;
        nav.classList.remove("site-header__nav--reveal-from-top");
      },
      { once: true },
    );
  }

  function applyCompact(compact) {
    const wasCompact = header.classList.contains("site-header--compact");
    header.classList.toggle("site-header--compact", compact);
    if (compact) {
      stickyRoot.removeAttribute("inert");
      stickyRoot.setAttribute("aria-hidden", "false");
      megaItem?.classList.remove("is-open");
      megaTrigger?.setAttribute("aria-expanded", "false");
      nav?.classList.remove("site-header__nav--reveal-from-top");
      stickyInputWrap?.classList.remove("search-capsule__input-wrap--hide-rotator");
      mirrorHeroRotatorToSticky();
    } else {
      stickyRoot.setAttribute("inert", "");
      stickyRoot.setAttribute("aria-hidden", "true");
      if (wasCompact) triggerNavRevealFromTop();
    }
  }

  function onScrollOrResize() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyCompact(shouldShowCompactSticky());
      });
    }
  }

  stickyRoot.setAttribute("inert", "");
  stickyRoot.setAttribute("aria-hidden", "true");
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  requestAnimationFrame(() => applyCompact(shouldShowCompactSticky()));
  document.fonts?.ready?.then(() => applyCompact(shouldShowCompactSticky()));
}

initStickyHeaderCompact();
initHeaderLocationPicker();
initExperiments();
initBuyersMegaHover();
initMobileNavDrawer();
initSpotlightAd();
initSiteFooter();
