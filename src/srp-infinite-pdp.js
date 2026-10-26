import "./components/SrpInfinitePdp.css";
import { isExperimentEnabled, SRP_INFINITE_PDP_EXPERIMENT_ID } from "./experiments.js";
import { getPdpMobileListing } from "./data/pdpMobile.mock.js";
import { ISP_ICONS } from "./data/srpIspIcons.js";
import {
  renderPdpMobileBody,
  initFloorPlanTabs,
  ICON_SHARE,
  pdpWhatsappIconHtml,
} from "./pdp-mobile-main.js";

/* ------------------------------------------------------------------ *
 * SRP Infinite PDP (experiment: srp_infinite_pdp, mobile only).
 * Tapping an SRP card opens a recents-style deck of PDP cards over the
 * SRP instead of navigating away:
 * - swipe left/right → neighbouring property
 * - scroll a card down → it grows into a full-screen PDP, tracking the
 *   scroll; scrolling back to the top shrinks it into the deck again
 * - pull down at the top → dismiss
 * - reach the end of a PDP → a "Next" toast fills, then the next PDP
 *   slides up from the bottom, pushing the current one off the top
 * ------------------------------------------------------------------ */

const MOBILE_MQ = "(max-width: 47.99rem)";
/** Scroll distance over which a deck card grows to full screen. */
const EXPAND_RANGE = 180;
const SWIPE_RATIO = 0.22;
const PULL_COMMIT = 96;
const PUSH_COMMIT = 110;
const AUTO_NEXT_MS = 1600;
const ANIM_MS = 420;
const STACK_MS = 560;

const HERO_IMAGES = 6;
const HERO_TAGS = ["Living room", "Bedroom", "Kitchen", "Balcony", "Exterior", "Amenities"];

let srpListings = [];
let srpImageSrc = () => "";
let root;
let stage;
let cards = [];
let active = 0;
let immersive = false;
let progress = 0;
// After the next PDP slides in in full screen it stays expanded at scrollTop 0,
// until the user scrolls past EXPAND_RANGE (then scroll drives it again).
let pinned = false;
let busy = false;
let autoTimer;
let nextObserver;
let historyPushed = false;

function esc(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, reducedMotion() ? 0 : ms));
}

/** SRP listing + mock PDP detail (4 mocks, cycled), SRP card wins on identity. */
function pdpFor(index) {
  const srp = srpListings[index];
  const base = getPdpMobileListing(String(index % 4));
  const price =
    srp.price ||
    (srp.configs?.length ? `${srp.configs[0].price.split(/[–-]/)[0].trim()} onwards` : base.price);
  return {
    ...base,
    name: srp.title,
    address: srp.address,
    price,
    seller: {
      ...base.seller,
      name: srp.seller?.name || base.seller.name,
      photo: srp.seller?.photo || base.seller.photo,
    },
  };
}

function heroHtml(index) {
  const srp = srpListings[index];
  const imgStart = index * 8;
  const slides = Array.from({ length: HERO_IMAGES }, (_, i) => {
    const src = srpImageSrc(imgStart + i);
    return i === 0
      ? `<img class="ipdp-hero__img" src="${src}" alt="" decoding="async" />`
      : `<img class="ipdp-hero__img" data-src="${src}" alt="" decoding="async" />`;
  }).join("");

  return `<div class="ipdp-hero">
    <div class="ipdp-hero__track">${slides}</div>
    <div class="ipdp-hero__tools">
      <button type="button" class="ipdp-icon-btn" aria-label="Shortlist">${ISP_ICONS.heart}</button>
      <button type="button" class="ipdp-icon-btn" aria-label="Share">${ICON_SHARE}</button>
    </div>
    <div class="ipdp-hero__pills" aria-hidden="true">
      <span class="ipdp-pill" data-ipdp-count>1/${srp.imageCount || 24}</span>
      <span class="ipdp-pill" data-ipdp-tag>${HERO_TAGS[0]}</span>
    </div>
  </div>`;
}

function nextTeaserHtml(index) {
  const nextIndex = index + 1;
  if (nextIndex >= srpListings.length) {
    return `<section class="ipdp-next ipdp-next--end" aria-label="End of results">
      <p class="ipdp-next__eyebrow">You're all caught up</p>
      <p class="ipdp-next__caption">That's all ${srpListings.length} properties for this search</p>
      <button type="button" class="ipdp-next__back" data-action="ipdp-close">Back to results</button>
    </section>`;
  }
  const next = srpListings[nextIndex];
  return `<section class="ipdp-next" aria-label="Next property">
    <span class="ipdp-next__chev" aria-hidden="true">${ISP_ICONS.chevronDown}</span>
    <p class="ipdp-next__caption">Keep scrolling for the next property</p>
  </section>`;
}

/** Slim toast above the contact bar while the next PDP is queued up. */
function nextToastHtml(index) {
  const next = srpListings[index + 1];
  if (!next) return "";
  return `<button type="button" class="ipdp-toast" data-action="ipdp-next" tabindex="-1">
    <span class="ipdp-toast__fill" aria-hidden="true"></span>
    <span class="ipdp-toast__label">Next</span>
    <span class="ipdp-toast__title">${esc(next.title)}</span>
    <span class="ipdp-toast__chev" aria-hidden="true">${ISP_ICONS.chevronDown}</span>
  </button>`;
}

function cardShellHtml(index) {
  const srp = srpListings[index];
  return `<article class="ipdp-card" data-index="${index}" aria-label="${esc(srp.title)}">
    <header class="ipdp-card__bar" aria-label="Property navigation">
      <button type="button" class="ipdp-icon-btn ipdp-icon-btn--plain" data-action="ipdp-minimize" aria-label="Minimise">${ISP_ICONS.chevronDown}</button>
      <p class="ipdp-card__bar-title">${esc(srp.title)}</p>
      <button type="button" class="ipdp-icon-btn ipdp-icon-btn--plain" aria-label="Shortlist">${ISP_ICONS.heart}</button>
      <button type="button" class="ipdp-icon-btn ipdp-icon-btn--plain" aria-label="Share">${ICON_SHARE}</button>
    </header>
    <div class="ipdp-card__scroller">
      ${heroHtml(index)}
      <div class="ipdp-card__body" data-ipdp-body></div>
      ${nextTeaserHtml(index)}
    </div>
    ${nextToastHtml(index)}
    <div class="ipdp-card__cta" role="group" aria-label="Contact seller">
      <button type="button" class="ipdp-cta ipdp-cta--wa" data-action="ipdp-contact" aria-label="WhatsApp">${pdpWhatsappIconHtml(`ipdp-wa-${index}`)}</button>
      <button type="button" class="ipdp-cta ipdp-cta--secondary" data-action="ipdp-contact">View phone</button>
      <button type="button" class="ipdp-cta ipdp-cta--primary" data-action="ipdp-contact">Contact</button>
    </div>
  </article>`;
}

function hydrate(index) {
  const card = cards[index];
  if (!card || card.dataset.hydrated) return;
  card.dataset.hydrated = "1";
  const body = card.querySelector("[data-ipdp-body]");
  body.innerHTML = renderPdpMobileBody(pdpFor(index), (index % 4) * 3);
  initFloorPlanTabs(body);
  initHeroGallery(card);
}

function initHeroGallery(card) {
  const track = card.querySelector(".ipdp-hero__track");
  const count = card.querySelector("[data-ipdp-count]");
  const tag = card.querySelector("[data-ipdp-tag]");
  const total = srpListings[Number(card.dataset.index)].imageCount || 24;
  const imgs = Array.from(track.querySelectorAll("img"));
  const load = (i) => {
    const img = imgs[i];
    if (img?.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  };
  load(1);
  track.addEventListener(
    "scroll",
    () => {
      const i = Math.round(track.scrollLeft / (track.clientWidth || 1));
      load(i + 1);
      count.textContent = `${i + 1}/${total}`;
      tag.textContent = HERO_TAGS[i % HERO_TAGS.length];
    },
    { passive: true }
  );
}

function scrollerOf(card) {
  return card?.querySelector(".ipdp-card__scroller");
}

function layout() {
  cards.forEach((card, i) => {
    const offset = i - active;
    card.style.setProperty("--o", offset);
    card.classList.toggle("is-active", offset === 0);
    card.classList.toggle("is-far", Math.abs(offset) > 1);
    card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
  });
  for (let i = active - 1; i <= active + 1; i++) hydrate(i);
  watchNextTeaser();
}

function inDeck() {
  return progress < 0.04;
}

/** 0 = deck card, 1 = full-screen PDP. Drives card geometry via --p. */
function setProgress(value) {
  progress = Math.max(0, Math.min(1, value));
  root.style.setProperty("--p", progress.toFixed(4));
  const on = progress >= 0.98;
  if (immersive === on) return;
  immersive = on;
  root.classList.toggle("is-immersive", on);
  if (!on) cancelAutoNext();
}

function syncProgressFromScroll() {
  const scroller = scrollerOf(cards[active]);
  if (!scroller) return;
  if (pinned && scroller.scrollTop > EXPAND_RANGE) pinned = false;
  setProgress(pinned ? 1 : scroller.scrollTop / EXPAND_RANGE);
}

/** Minimise: glide back into the deck card. */
async function minimise() {
  const scroller = scrollerOf(cards[active]);
  pinned = false;
  root.classList.add("is-settle");
  if (scroller) scroller.scrollTop = 0;
  setProgress(0);
  await wait(ANIM_MS);
  root.classList.remove("is-settle");
}

function goTo(index) {
  const clamped = Math.max(0, Math.min(srpListings.length - 1, index));
  if (clamped === active) {
    layout();
    return;
  }
  cancelAutoNext();
  const prevScroller = scrollerOf(cards[active]);
  active = clamped;
  pinned = false;
  layout();
  syncProgressFromScroll();
  if (prevScroller) setTimeout(() => (prevScroller.scrollTop = 0), ANIM_MS);
}

/* ---------- End of PDP → next PDP slides up, current one leaves the top ---------- */

function cancelAutoNext() {
  clearTimeout(autoTimer);
  autoTimer = undefined;
  cards[active]?.classList.remove("is-nudge", "is-counting");
}

function startAutoNext() {
  if (autoTimer || busy || active >= srpListings.length - 1) return;
  cards[active].classList.add("is-nudge", "is-counting");
  autoTimer = setTimeout(() => {
    autoTimer = undefined;
    stackNext();
  }, AUTO_NEXT_MS);
}

function watchNextTeaser() {
  nextObserver?.disconnect();
  const card = cards[active];
  const teaser = card?.querySelector(".ipdp-next:not(.ipdp-next--end)");
  if (!teaser) return;
  nextObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && immersive) startAutoNext();
      else cancelAutoNext();
    },
    { root: scrollerOf(card), threshold: 0.9 }
  );
  nextObserver.observe(teaser);
}

async function stackNext() {
  const nextIndex = active + 1;
  if (busy || nextIndex >= srpListings.length) return;
  busy = true;
  cancelAutoNext();
  nextObserver?.disconnect();

  const current = cards[active];
  const next = cards[nextIndex];
  hydrate(nextIndex);
  scrollerOf(next).scrollTop = 0;
  root.classList.add("is-stacking", "is-snap");
  next.classList.add("is-stack-over");
  void next.offsetWidth;
  root.classList.remove("is-snap");
  current.classList.add("is-stack-under");
  next.classList.add("is-stack-in");

  await wait(STACK_MS);

  root.classList.add("is-snap");
  current.classList.remove("is-stack-under");
  next.classList.remove("is-stack-over", "is-stack-in");
  root.classList.remove("is-stacking");
  active = nextIndex;
  pinned = true;
  setProgress(1);
  layout();
  scrollerOf(current).scrollTop = 0;
  void root.offsetWidth;
  root.classList.remove("is-snap");
  busy = false;
}

/* ---------- Gestures ---------- */

function atBottom(scroller) {
  return scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
}

function rubber(distance) {
  return distance * 0.35;
}

function initGestures() {
  let g = null;

  stage.addEventListener(
    "touchstart",
    (e) => {
      if (busy || e.touches.length > 1) return;
      const t = e.touches[0];
      const card = cards[active];
      g = {
        x0: t.clientX,
        y0: t.clientY,
        t0: performance.now(),
        lock: null,
        dx: 0,
        dy: 0,
        card,
        scroller: scrollerOf(card),
        pushFrom: null,
        // Native horizontal scrollers (similar properties, immersive gallery) keep their swipe.
        skipX: Boolean(
          e.target.closest(".pdp-m-carousel, .pdp-m-tabs, [class*='__track']") &&
            (!inDeck() || !e.target.closest(".ipdp-hero"))
        ),
      };
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchmove",
    (e) => {
      if (!g || busy) return;
      const t = e.touches[0];
      g.dx = t.clientX - g.x0;
      g.dy = t.clientY - g.y0;

      if (!g.lock) {
        if (Math.max(Math.abs(g.dx), Math.abs(g.dy)) < 8) return;
        if (inDeck() && !g.skipX && Math.abs(g.dx) > Math.abs(g.dy) * 1.2) g.lock = "x";
        else if (g.dy > 0 && g.scroller.scrollTop <= 0 && Math.abs(g.dy) > Math.abs(g.dx)) g.lock = "pull";
        else g.lock = "native";
        if (g.lock !== "native") root.classList.add("is-dragging");
      }

      if (g.lock === "x") {
        e.preventDefault();
        const atEdge = (g.dx > 0 && active === 0) || (g.dx < 0 && active === srpListings.length - 1);
        root.style.setProperty("--ipdp-drag", `${atEdge ? rubber(g.dx) : g.dx}px`);
        return;
      }

      if (g.lock === "pull") {
        e.preventDefault();
        const pull = Math.max(0, g.dy);
        g.card.style.setProperty("--ipdp-pull", `${pull * 0.55}px`);
        g.card.style.setProperty("--ipdp-pull-scale", `${1 - Math.min(pull, 300) / 3000}`);
        root.style.setProperty("--ipdp-scrim-fade", `${Math.min(pull / 400, 0.6)}`);
        return;
      }

      // Native vertical scroll; past the bottom, a further pull-up pushes to the next PDP.
      if (immersive && g.dy < 0 && atBottom(g.scroller) && active < srpListings.length - 1) {
        if (g.pushFrom == null) g.pushFrom = t.clientY;
        const push = Math.max(0, g.pushFrom - t.clientY);
        if (push > 0) {
          e.preventDefault();
          root.classList.add("is-dragging");
          const progress = Math.min(1, push / PUSH_COMMIT);
          g.push = progress;
          g.card.style.setProperty("--ipdp-push", progress);
          g.card.classList.add("is-nudge", "is-pushing");
        }
      }
    },
    { passive: false }
  );

  const end = () => {
    if (!g) return;
    const { lock, dx, dy, t0, card } = g;
    const width = card.getBoundingClientRect().width || 1;
    const velocity = Math.abs(dx) / Math.max(1, performance.now() - t0);
    root.classList.remove("is-dragging");
    root.style.removeProperty("--ipdp-drag");
    root.style.removeProperty("--ipdp-scrim-fade");
    card.style.removeProperty("--ipdp-pull");
    card.style.removeProperty("--ipdp-pull-scale");

    if (lock === "x") {
      if (Math.abs(dx) > width * SWIPE_RATIO || velocity > 0.45) goTo(active + (dx < 0 ? 1 : -1));
      else layout();
    } else if (lock === "pull" && dy > PULL_COMMIT) {
      if (pinned) minimise();
      else requestClose();
    }

    if (card.classList.contains("is-pushing")) {
      card.classList.remove("is-pushing");
      card.style.removeProperty("--ipdp-push");
      if (g.push >= 1) stackNext();
      else if (!card.classList.contains("is-counting")) card.classList.remove("is-nudge");
    }
    g = null;
  };

  stage.addEventListener("touchend", end);
  stage.addEventListener("touchcancel", end);
}

/* ---------- Open / close ---------- */

function buildRoot() {
  root = document.createElement("div");
  root.className = "ipdp";
  root.id = "srp-ipdp";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Property quick view");
  root.innerHTML = `<div class="ipdp__scrim" data-action="ipdp-close"></div>
    <div class="ipdp__stage">${srpListings.map((_, i) => cardShellHtml(i)).join("")}</div>`;
  document.body.appendChild(root);
  stage = root.querySelector(".ipdp__stage");
  cards = Array.from(stage.querySelectorAll(".ipdp-card"));

  cards.forEach((card) => {
    scrollerOf(card).addEventListener(
      "scroll",
      (e) => {
        if (busy || !card.classList.contains("is-active")) return;
        syncProgressFromScroll();
      },
      { passive: true }
    );
  });

  root.addEventListener("click", (e) => {
    const action = e.target.closest("[data-action]")?.dataset.action;
    if (action === "ipdp-close") return requestClose();
    if (action === "ipdp-minimize") return minimise();
    if (action === "ipdp-next") return stackNext();
    if (action === "ipdp-contact") {
      window.dispatchEvent(new CustomEvent("srp:open-contact"));
      return;
    }
    // Tapping a peeking neighbour brings it to the front.
    const card = e.target.closest(".ipdp-card");
    if (card && !card.classList.contains("is-active") && inDeck()) {
      e.preventDefault();
      goTo(Number(card.dataset.index));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (root.hidden || document.querySelector(".srp-contact-sheet.is-visible")) return;
    if (e.key === "Escape") requestClose();
    if (inDeck() && e.key === "ArrowRight") goTo(active + 1);
    if (inDeck() && e.key === "ArrowLeft") goTo(active - 1);
  });

  window.addEventListener("popstate", () => {
    if (!historyPushed) return;
    historyPushed = false;
    close();
  });

  initGestures();
}

function srpCardEl(index) {
  return document.querySelector(`.srp-card[data-listing-id="${index}"]`);
}

/** Shared-element style transform from the active PDP card to an SRP card rect. */
function transformToRect(card, rect) {
  const own = card.getBoundingClientRect();
  // SRP card off screen → plain rise/sink instead of a shared-element morph.
  if (!rect || !own.width || rect.bottom < 0 || rect.top > window.innerHeight) {
    return "translate3d(0, 2.5rem, 0) scale(0.96)";
  }
  const scale = rect.width / own.width;
  return `translate3d(${rect.left - own.left}px, ${rect.top - own.top}px, 0) scale(${scale})`;
}

export async function openInfinitePdp(index) {
  if (busy || !root) return;
  busy = true;
  active = Math.max(0, Math.min(srpListings.length - 1, index));
  pinned = false;
  setProgress(0);
  root.classList.remove("is-closing");
  root.hidden = false;
  document.documentElement.classList.add("ipdp-lock");
  root.classList.add("is-snap");
  layout();
  cards.forEach((c) => (scrollerOf(c).scrollTop = 0));

  const card = cards[active];
  card.style.transformOrigin = "top left";
  card.style.transform = transformToRect(card, srpCardEl(active)?.getBoundingClientRect());
  void root.offsetWidth;
  root.classList.remove("is-snap");
  void root.offsetWidth;
  root.classList.add("is-open");
  card.style.transform = "";

  if (!historyPushed) {
    // Back closes the overlay; manual restoration keeps the SRP where close() puts it.
    history.scrollRestoration = "manual";
    history.pushState({ ipdp: true }, "");
    historyPushed = true;
  }

  await wait(ANIM_MS);
  card.style.transformOrigin = "";
  busy = false;
}

function requestClose() {
  if (historyPushed) history.back();
  else close();
}

async function close() {
  if (!root || root.hidden || root.classList.contains("is-closing")) return;
  busy = true;
  cancelAutoNext();
  nextObserver?.disconnect();

  // Land the SRP on the property the user ended on (unlock first so it can scroll).
  document.documentElement.classList.remove("ipdp-lock");
  const srpCard = srpCardEl(active);
  if (srpCard) {
    const top = srpCard.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.18;
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  }

  const card = cards[active];
  root.classList.add("is-closing");
  root.classList.remove("is-open");
  card.style.transformOrigin = "top left";
  card.style.transform = transformToRect(card, srpCard?.getBoundingClientRect());

  await wait(ANIM_MS);
  root.hidden = true;
  root.classList.add("is-snap");
  root.classList.remove("is-closing");
  pinned = false;
  scrollerOf(card).scrollTop = 0;
  setProgress(0);
  card.style.transform = "";
  card.style.transformOrigin = "";
  void root.offsetWidth;
  root.classList.remove("is-snap");
  history.scrollRestoration = "auto";
  busy = false;
}

export function isInfinitePdpActive() {
  return isExperimentEnabled(SRP_INFINITE_PDP_EXPERIMENT_ID) && window.matchMedia(MOBILE_MQ).matches;
}

export function initSrpInfinitePdp({ listings, imageSrc }) {
  if (!isExperimentEnabled(SRP_INFINITE_PDP_EXPERIMENT_ID)) return;
  srpListings = listings;
  srpImageSrc = imageSrc;
  buildRoot();
}
