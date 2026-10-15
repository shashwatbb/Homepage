/**
 * Filter screen for the Buy/SRP Image based search pills page — ported from the
 * app's Buy FilterScreen (rail + content pane + apply bar, vertical range
 * slider). Draft is edited on screen; Apply commits it to the applied store.
 */
import { ISP_ICONS as I } from "./data/srpIspIcons.js";
import { isExperimentEnabled, SRP_IMAGE_FEATURE_PILLS_EXPERIMENT_ID } from "./experiments.js";
import { FEATURES, FEATURE_CATEGORY_ID, FEATURE_GROUPS } from "./data/srpFeaturePills.js";
import { FEATURE_ICONS as FI } from "./data/srpFeatureIcons.js";

// `?feature_pills=1` turns the flag on (and remembers it) for quick demo links.
if (new URLSearchParams(window.location.search).get("feature_pills") === "1") {
  try {
    const KEY = "housing:experiments";
    const state = JSON.parse(localStorage.getItem(KEY) || "{}");
    state[SRP_IMAGE_FEATURE_PILLS_EXPERIMENT_ID] = true;
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}
export const FEATURE_PILLS_ON = isExperimentEnabled(SRP_IMAGE_FEATURE_PILLS_EXPERIMENT_ID);

const BUDGET_STEPS = [
  ...Array.from({ length: 20 }, (_, i) => i * 5e5),
  ...Array.from({ length: 40 }, (_, i) => 1e7 + i * 1e6),
  ...Array.from({ length: 20 }, (_, i) => 5e7 + i * 2.5e6),
  ...Array.from({ length: 21 }, (_, i) => 1e8 + i * 5e6),
];
const AREA_STEPS = Array.from({ length: 101 }, (_, i) => i * 50);

const trim = (n) => String(Number(n.toFixed(2)));
function fmtCurrency(v) {
  if (v >= 1e7) return `${trim(v / 1e7)} Cr`;
  if (v >= 1e5) return `${trim(v / 1e5)} L`;
  if (v >= 1e3) return `${trim(v / 1e3)} K`;
  return String(v);
}
const fmtArea = (v) => new Intl.NumberFormat("en-IN").format(v);

const opts = (labels) => labels.map((label, i) => ({ value: String(i + 1), label }));

const CATEGORIES = [
  {
    id: "1", label: "Budget", type: "range", subtitle: "Price range", min: 0, max: 2e8, steps: BUDGET_STEPS,
    breakpoints: [0, 1e7, 3e7, 5e7, 1e8, 2e8], prefix: "₹", suffix: "", fmt: fmtCurrency,
    suggestions: [["Under ₹1 Cr", 0, 1e7], ["₹1 Cr - ₹2 Cr", 1e7, 2e7], ["₹2 Cr - ₹3.5 Cr", 2e7, 3.5e7], ["Above ₹3.5 Cr", 3.5e7, 2e8]],
  },
  { id: "2", label: "BHK", type: "multi", options: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((label, i) => ({ value: String(i), label })) },
  { id: "3", label: "Type", type: "multi", options: opts(["Apartment", "Independent House", "Builder Floor", "Villa", "Penthouse"]) },
  { id: "4", label: "Status", type: "multi", options: opts(["Ready to move", "Under construction", "New launch"]) },
  { id: "5", label: "Listed by", type: "multi", options: opts(["Owner", "Builder", "Dealer"]) },
  {
    id: "7", label: "Area", type: "range", subtitle: "Carpet area", min: 0, max: 5000, steps: AREA_STEPS,
    breakpoints: [0, 1000, 2000, 3000, 5000], prefix: "", suffix: "sq.ft.", fmt: fmtArea,
    suggestions: [["Under 800 sq.ft.", 0, 800], ["800 sq.ft. - 1,200 sq.ft.", 800, 1200], ["Above 1,200 sq.ft.", 1200, 5000]],
  },
  { id: "9", label: "Age", type: "single", options: opts(["Less than 3 years", "3 to 5 years", "5 to 10 years", "More than 10 years"]) },
  {
    id: "6", label: "Amenities", type: "multi", initialVisible: 6, expandLabel: "Show all amenities", collapseLabel: "Show less",
    options: opts(["Lift", "Power backup", "Swimming pool", "Gymnasium", "Car parking", "Security", "Club house", "Garden", "Kids play area", "Rain water harvesting"]),
  },
  { id: "21", label: "Developer", type: "multi", options: opts(["Skyline Developers", "Greenfield Homes", "Urban Nest Builders", "Horizon Realty"]) },
  { id: "11", label: "Photos", type: "switch", options: [{ value: "1", label: "Properties with photos" }] },
  { id: "12", label: "RERA", type: "switch", options: [{ value: "1", label: "RERA compliant properties" }] },
  { id: "14", label: "Verified", type: "switch", options: [{ value: "1", label: "Verified properties only" }] },
];
if (FEATURE_PILLS_ON) {
  // "Features" — same features as the Seen in photos pills, grouped.
  const at = CATEGORIES.findIndex((c) => c.id === "6") + 1;
  CATEGORIES.splice(at, 0, {
    id: FEATURE_CATEGORY_ID, label: "Features", type: "features",
    options: FEATURES.map((f) => ({ value: f.id, label: f.label, icon: f.icon, group: f.group })),
  });
}
const byId = (id) => CATEGORIES.find((c) => c.id === id);

export const PINNED_CHIPS = [
  { title: "Budget", categoryId: "1" },
  { title: "BHK", categoryId: "2" },
  { title: "Property type", categoryId: "3" },
  { title: "Status", categoryId: "4" },
  { title: "Listed by", categoryId: "5" },
  { title: "Amenities", categoryId: "6" },
];

/* ---------- applied store ---------- */
// applied[categoryId] = { values: string[] } | { min, max }, plus displayLabel.
let applied = {};
const listeners = new Set();
export const getApplied = () => applied;
export const appliedCount = () => Object.keys(applied).length;
export const onAppliedChange = (fn) => listeners.add(fn);
const emit = () => listeners.forEach((fn) => fn());
export function clearApplied() {
  applied = {};
  emit();
}

/** Applied feature ids, oldest first (the newest one leads the pill row). */
export const getFeatureValues = () => applied[FEATURE_CATEGORY_ID]?.values ?? [];

/** Pill tap — applies/removes a feature immediately (no Apply step). */
export function toggleFeature(id) {
  const values = getFeatureValues();
  const next = values.includes(id) ? values.filter((v) => v !== id) : [...values, id];
  if (next.length) applied[FEATURE_CATEGORY_ID] = { values: next, displayLabel: displayLabel(byId(FEATURE_CATEGORY_ID), { values: next }) };
  else delete applied[FEATURE_CATEGORY_ID];
  emit();
}

/* ---------- range helpers ---------- */
function valueToPos(c, v) {
  const bp = c.breakpoints;
  const n = bp.length;
  let i = 0;
  for (let k = 0; k < n; k += 1) if (bp[k] <= v) i = k;
  if (i === n - 1) return 1;
  return (i + Math.min(1, Math.max(0, (v - bp[i]) / (bp[i + 1] - bp[i])))) / (n - 1);
}
function posToValue(c, p) {
  const bp = c.breakpoints;
  const n = bp.length;
  const seg = Math.min(Math.floor(p * (n - 1)), n - 2);
  const t = p * (n - 1) - seg;
  return bp[seg] + t * (bp[seg + 1] - bp[seg]);
}
const snap = (c, v) => c.steps.reduce((best, s) => (Math.abs(s - v) < Math.abs(best - v) ? s : best), c.steps[0]);
const stepIdx = (c, v) => c.steps.indexOf(v);

function pillText(c, v, isMax) {
  return `${v === 0 ? "" : c.prefix}${c.fmt(v)}${isMax && v === c.max ? "+" : ""}${v === 0 || !c.suffix ? "" : ` ${c.suffix}`}`;
}
function rangeHeadline(c, min, max) {
  const minDef = min === c.min;
  const maxDef = max === c.max;
  const unit = (v, plus) => `${c.prefix}${c.fmt(v)}${plus ? "+" : ""}${c.suffix ? ` ${c.suffix}` : ""}`;
  if (minDef && !maxDef) return `Under ${unit(max)}`;
  if (!minDef && maxDef) return `Above ${unit(min)}`;
  return `${min === 0 ? "0" : unit(min)} - ${unit(max, maxDef)}`;
}

/* ---------- labels ---------- */
function displayLabel(c, sel) {
  if (c.type === "range") return rangeHeadline(c, sel.min, sel.max);
  const labels = sel.values.map((v) => c.options.find((o) => o.value === v).label);
  return labels.length > 1 ? `${labels[labels.length - 1]} (${labels.length})` : labels[0];
}
const badgeCount = (c, sel) => (!sel ? 0 : c.type === "multi" || c.type === "features" ? sel.values.length : 1);
function roundedCount(n) {
  if (n < 10) return String(n);
  if (n < 100) return `${Math.min(Math.floor(n / 10) * 10, 50)}+`;
  if (n < 10000) return `${Math.floor(n / 100) * 100}+`;
  return `${Math.floor(n / 1000) * 1000}+`;
}

/* ---------- screen ---------- */
let draft = {};
let current = "1";
let expanded = false;
let suggestionSource = null;
let screen;

function ensureScreen() {
  if (screen) return screen;
  screen = document.createElement("div");
  screen.className = "isp-f";
  screen.hidden = true;
  screen.innerHTML = `
    <div class="isp-f__top">
      <div class="isp-f__top-left">
        <button type="button" class="isp-f__back" aria-label="Back" data-f="back">${I.arrowLeft}</button>
        <h2 class="isp-f__title">Filter</h2>
      </div>
      <button type="button" class="isp-f__clear" data-f="clear">Clear all</button>
    </div>
    <div class="isp-f__body">
      <div class="isp-f__rail"><div class="isp-f__rail-list"></div><span class="isp-f__indicator"></span></div>
      <div class="isp-f__content"></div>
    </div>
    <div class="isp-f__bottom"><button type="button" class="isp-f__apply" data-f="apply"></button></div>`;
  document.getElementById("isp-root").appendChild(screen);
  screen.addEventListener("click", onClick);
  screen.querySelector(".isp-f__rail").addEventListener("scroll", positionIndicator, { passive: true });
  return screen;
}

function renderRail() {
  const list = screen.querySelector(".isp-f__rail-list");
  list.innerHTML = CATEGORIES.map((c) => {
    const n = badgeCount(c, draft[c.id]);
    return `<button type="button" class="isp-f__rail-item${c.id === current ? " is-sel" : ""}" data-f="category" data-id="${c.id}">
        <span>${c.label}</span>${n ? `<b>${n}</b>` : ""}
      </button>`;
  }).join("");
  positionIndicator();
}

function positionIndicator() {
  const rail = screen.querySelector(".isp-f__rail");
  const idx = CATEGORIES.findIndex((c) => c.id === current);
  screen.querySelector(".isp-f__indicator").style.transform = `translateY(${idx * 48 - rail.scrollTop}px)`;
}

function checkRow(c, o, checked, kind) {
  return `<button type="button" class="isp-f__opt" data-f="option" data-value="${o.value}">
      <span>${o.label}</span><span class="isp-f__${kind}${checked ? " is-checked" : ""}">${kind === "check" && checked ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.4 6.2L5.1 9.9L11 2.9" stroke="#4A16D9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}</span>
    </button>`;
}

function renderContent() {
  const c = byId(current);
  const sel = draft[c.id];
  const pane = screen.querySelector(".isp-f__content");
  let body = "";

  if (c.type === "range") {
    body = `<p class="isp-f__subtitle">${c.subtitle}</p>
      <p class="isp-f__headline"></p>
      <div class="isp-f__slider">
        <div class="isp-f__marks">${c.breakpoints.map((_, i) => {
          const top = (380 - 6) * (1 - i / (c.breakpoints.length - 1));
          if (i === 0) return `<span class="isp-f__mark-label" style="top:${top - 8}px">Min</span>`;
          if (i === c.breakpoints.length - 1) return `<span class="isp-f__mark-label" style="top:${top - 4}px">Max</span>`;
          return `<span class="isp-f__mark" style="top:${top}px"></span>`;
        }).join("")}</div>
        <div class="isp-f__track"><span class="isp-f__track-active"></span><span class="isp-f__thumb" data-thumb="max"></span><span class="isp-f__thumb" data-thumb="min"></span></div>
        <div class="isp-f__pills"><span class="isp-f__pill" data-pill="max"></span><span class="isp-f__pill" data-pill="min"></span></div>
      </div>
      <div class="isp-f__suggest">
        <p class="isp-f__suggest-title">Popular selections</p>
        <div class="isp-f__suggest-chips">${c.suggestions.map(([label, min, max], i) => {
          const on = suggestionSource === c.id && sel && sel.min === min && sel.max === max;
          return `<button type="button" class="isp-f__schip${on ? " is-sel" : ""}" data-f="suggest" data-i="${i}">${label}</button>`;
        }).join("")}</div>
      </div>`;
  } else if (c.type === "features") {
    const values = sel?.values ?? [];
    // Same chips as the SRP feature pill row, wrapped per group.
    body = FEATURE_GROUPS.map((group) => {
      const chips = c.options.filter((o) => o.group === group).map((o) => {
        const on = values.includes(o.value);
        return `<button type="button" class="srp-filter-dropdown isp-fpill${on ? " isp-applied" : ""}" data-f="option" data-value="${o.value}" aria-pressed="${on}">${FI[o.icon]}<span>${o.label}</span></button>`;
      }).join("");
      return `<section class="isp-f__fgroup"><p class="isp-f__group">${group}</p><div class="isp-f__fchips">${chips}</div></section>`;
    }).join("");
  } else {
    const values = sel?.values ?? [];
    let options = c.options;
    const collapsible = c.initialVisible && options.length > c.initialVisible;
    if (collapsible && !expanded) options = options.slice(0, c.initialVisible);
    body = options.map((o) => checkRow(c, o, values.includes(o.value), c.type === "single" ? "radio" : "check")).join("");
    if (collapsible) body += `<button type="button" class="isp-f__more" data-f="more">${expanded ? c.collapseLabel : c.expandLabel}</button>`;
  }

  pane.innerHTML = `<p class="isp-f__cat-title">${c.label.toUpperCase()}</p>${body}`;
  if (c.type === "range") bindSlider(c);
}

function renderBottom() {
  const n = Object.keys(draft).length;
  const count = Math.max(18, 1240 - 180 * n);
  screen.querySelector(".isp-f__apply").textContent = count === 1 ? "Show 1 result" : `Show ${roundedCount(count)} results`;
  screen.querySelector(".isp-f__clear").disabled = n === 0;
}

function renderAll() {
  renderRail();
  renderContent();
  renderBottom();
}

/* ---------- slider ---------- */
function bindSlider(c) {
  const slider = screen.querySelector(".isp-f__slider");
  const H = 374;
  let min = draft[c.id]?.min ?? c.min;
  let max = draft[c.id]?.max ?? c.max;

  const paint = () => {
    const pMin = valueToPos(c, min);
    const pMax = valueToPos(c, max);
    const yMin = 3 + H * (1 - pMin);
    const yMax = 3 + H * (1 - pMax);
    slider.querySelector('[data-thumb="min"]').style.top = `${yMin}px`;
    slider.querySelector('[data-thumb="max"]').style.top = `${yMax}px`;
    const active = slider.querySelector(".isp-f__track-active");
    active.style.top = `${yMax}px`;
    active.style.height = `${yMin - yMax}px`;
    const pMinEl = slider.querySelector('[data-pill="min"]');
    const pMaxEl = slider.querySelector('[data-pill="max"]');
    pMinEl.textContent = pillText(c, min, false);
    pMaxEl.textContent = pillText(c, max, true);
    pMinEl.style.top = `${380 * (1 - pMin) - 16}px`;
    pMaxEl.style.top = `${380 * (1 - pMax) - 16}px`;
    screen.querySelector(".isp-f__headline").textContent = rangeHeadline(c, min, max);
  };
  paint();

  let thumb = null;
  const startMin = () => min;
  const startMax = () => max;
  let before = null;

  const posFromEvent = (e) => {
    const rect = slider.getBoundingClientRect();
    return Math.min(1, Math.max(0, 1 - (e.clientY - rect.top - 3) / H));
  };

  const move = (e) => {
    const v = snap(c, posToValue(c, posFromEvent(e)));
    if (thumb === "max") {
      const floor = c.steps[stepIdx(c, min) + 10] ?? c.max;
      max = Math.min(c.max, Math.max(v, floor));
    } else {
      const ceil = c.steps[stepIdx(c, max) - 10] ?? c.min;
      min = Math.max(c.min, Math.min(v, ceil));
    }
    paint();
  };

  slider.addEventListener("pointerdown", (e) => {
    const p = posFromEvent(e);
    const dMax = Math.abs(p - valueToPos(c, max));
    const dMin = Math.abs(p - valueToPos(c, min));
    thumb = dMax <= dMin ? "max" : "min";
    before = [startMin(), startMax()];
    slider.setPointerCapture(e.pointerId);
    screen.querySelector(".isp-f__content").style.overflowY = "hidden";
    move(e);
  });
  slider.addEventListener("pointermove", (e) => {
    if (thumb) move(e);
  });
  const end = () => {
    if (!thumb) return;
    thumb = null;
    screen.querySelector(".isp-f__content").style.overflowY = "";
    if (before[0] !== min || before[1] !== max) {
      suggestionSource = null;
      setRange(c, min, max);
    }
  };
  slider.addEventListener("pointerup", end);
  slider.addEventListener("pointercancel", end);
}

function setRange(c, min, max) {
  if (min === c.min && max === c.max) delete draft[c.id];
  else draft[c.id] = { min, max };
  renderRail();
  renderBottom();
  screen.querySelectorAll(".isp-f__schip").forEach((chip) => {
    const [, sMin, sMax] = c.suggestions[Number(chip.dataset.i)];
    chip.classList.toggle("is-sel", suggestionSource === c.id && min === sMin && max === sMax);
  });
}

/* ---------- events ---------- */
function onClick(event) {
  const el = event.target.closest("[data-f]");
  if (!el) return;
  const c = byId(current);
  switch (el.dataset.f) {
    case "back":
      closeFilterScreen();
      return;
    case "clear":
      draft = {};
      suggestionSource = null;
      renderAll();
      return;
    case "apply":
      applied = {};
      Object.entries(draft).forEach(([id, sel]) => {
        applied[id] = { ...sel, displayLabel: displayLabel(byId(id), sel) };
      });
      closeFilterScreen();
      emit();
      return;
    case "category":
      current = el.dataset.id;
      expanded = false;
      renderRail();
      renderContent();
      screen.querySelector(".isp-f__content").scrollTop = 0;
      return;
    case "more":
      expanded = !expanded;
      renderContent();
      return;
    case "suggest": {
      const [, min, max] = c.suggestions[Number(el.dataset.i)];
      const sel = draft[c.id];
      const same = suggestionSource === c.id && sel && sel.min === min && sel.max === max;
      suggestionSource = same ? null : c.id;
      if (same) delete draft[c.id];
      else draft[c.id] = { min, max };
      renderAll();
      return;
    }
    case "option": {
      const v = el.dataset.value;
      const values = draft[c.id]?.values ?? [];
      let next;
      if (c.type === "multi" || c.type === "features") next = values.includes(v) ? values.filter((x) => x !== v) : [...values, v];
      else next = values.includes(v) ? [] : [v];
      if (next.length) draft[c.id] = { values: next };
      else delete draft[c.id];
      renderRail();
      renderContent();
      renderBottom();
      return;
    }
    default:
  }
}

export function openFilterScreen(categoryId) {
  ensureScreen();
  draft = Object.fromEntries(Object.entries(applied).map(([id, { displayLabel: _, ...sel }]) => [id, sel]));
  current = categoryId && byId(categoryId) ? categoryId : "1";
  expanded = false;
  suggestionSource = null;
  renderAll();
  screen.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    screen.classList.add("is-open");
    const idx = CATEGORIES.findIndex((cat) => cat.id === current);
    const rail = screen.querySelector(".isp-f__rail");
    rail.scrollTop = Math.max(0, (idx - 1) * 48);
    positionIndicator();
  });
}

function closeFilterScreen() {
  screen.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => (screen.hidden = true), 280);
}
