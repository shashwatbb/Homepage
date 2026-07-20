import "./components/SrpBudgetBhkGuidance.css";
import {
  SRP_BUDGET_BHK_GUIDANCE_MOCK,
  getBudgetBucket,
  getBhkOption,
  getBudgetResultCount,
  getBhkResultCount,
} from "./data/srpBudgetBhkGuidance.mock.js";
import {
  isExperimentEnabled,
  SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID,
} from "./experiments.js";

const SRP_FILTER_CHEVRON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

const SRP_FILTER_CLEAR_ICON = `<svg class="srp-filter-clear__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`;

const SRP_EXPERIMENT_SWAP_MS = 220;

let guidanceStripAnimGen = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function playEnterAnimation(el, className) {
  if (!el || prefersReducedMotion()) return;
  el.classList.add(className);
  el.addEventListener("animationend", () => el.classList.remove(className), { once: true });
}

function replaceWithEnter(parent, node, enterClass) {
  parent.replaceChildren(node);
  playEnterAnimation(node, enterClass);
}

function resetGuidanceStripVisualState(strip) {
  strip.classList.remove("srp-guidance-strip--exit");
  strip.hidden = false;
}

function showGuidanceStrip(strip, nextScroll) {
  const animGen = ++guidanceStripAnimGen;
  resetGuidanceStripVisualState(strip);

  const currentScroll = strip.querySelector(".srp-guidance-strip__scroll");
  if (!currentScroll || prefersReducedMotion()) {
    replaceWithEnter(strip, nextScroll, "srp-guidance-strip__scroll--enter");
    return;
  }

  currentScroll.classList.add("srp-guidance-strip__scroll--exit");
  const finalize = () => {
    if (animGen !== guidanceStripAnimGen) return;
    resetGuidanceStripVisualState(strip);
    replaceWithEnter(strip, nextScroll, "srp-guidance-strip__scroll--enter");
  };

  currentScroll.addEventListener("animationend", finalize, { once: true });
  window.setTimeout(finalize, SRP_EXPERIMENT_SWAP_MS);
}

function hideGuidanceStrip(strip) {
  if (strip.hidden && !strip.firstElementChild) return;

  const animGen = ++guidanceStripAnimGen;

  if (prefersReducedMotion()) {
    strip.hidden = true;
    strip.innerHTML = "";
    strip.classList.remove("srp-guidance-strip--exit");
    return;
  }

  strip.classList.add("srp-guidance-strip--exit");
  const finalize = () => {
    if (animGen !== guidanceStripAnimGen) return;
    strip.hidden = true;
    strip.innerHTML = "";
    strip.classList.remove("srp-guidance-strip--exit");
  };

  strip.addEventListener("animationend", finalize, { once: true });
  window.setTimeout(finalize, SRP_EXPERIMENT_SWAP_MS);
}

function findFilterButton(filtersEl, label) {
  return [...filtersEl.querySelectorAll(".srp-filter-dropdown")].find(
    (button) => button.querySelector("span")?.textContent?.trim() === label
  );
}

function createEmptyFilterButton(label, filterKey, { hint = false } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "srp-filter-dropdown srp-filter-dropdown--empty-experiment";
  if (hint) button.classList.add("srp-filter-dropdown--guidance-hint");
  button.dataset.srpExperimentFilter = filterKey;
  button.innerHTML = `<span>${label}</span>${SRP_FILTER_CHEVRON}`;
  return button;
}

function createAppliedFilterChip(label) {
  const chip = document.createElement("div");
  chip.className = "srp-filter-chip srp-filter-chip--experiment srp-experiment-chip--applied";
  chip.innerHTML = `<span class="srp-filter-applied-label">${label}</span>`;
  return chip;
}

function setupFiltersChip(filtersEl) {
  const chip = filtersEl.querySelector(".srp-filter-active")?.closest(".srp-filter-chip");
  if (!chip) return null;

  const restore = {
    chip,
    originalChip: chip.cloneNode(true),
  };

  chip.querySelector(".srp-filter-chip-separator")?.remove();
  chip.querySelector(".srp-filter-clear:not(.srp-filter-clear--icon)")?.remove();

  return restore;
}

function getExperimentFilterCount(state) {
  return (state.budgetId ? 1 : 0) + (state.bhkId ? 1 : 0);
}

function renderFiltersChip(restore, state) {
  const chip = restore?.chip;
  if (!chip) return;

  const count = getExperimentFilterCount(state);
  const labelSpan = chip.querySelector(".srp-filter-active span");
  let iconBtn = chip.querySelector(".srp-filter-clear--icon");

  if (count === 0) {
    chip.classList.remove("srp-filter-chip--experiment-active");
    chip.classList.add("srp-filter-chip--experiment-inactive");
    if (labelSpan) labelSpan.textContent = "Filters";
    iconBtn?.remove();
    return;
  }

  chip.classList.remove("srp-filter-chip--experiment-inactive");
  chip.classList.add("srp-filter-chip--experiment-active");
  if (labelSpan) labelSpan.textContent = `Filters (${count})`;

  if (!iconBtn) {
    iconBtn = document.createElement("button");
    iconBtn.type = "button";
    iconBtn.className = "srp-filter-clear srp-filter-clear--icon";
    iconBtn.dataset.srpExperimentClearAll = "";
    iconBtn.setAttribute("aria-label", "Clear all filters");
    iconBtn.innerHTML = SRP_FILTER_CLEAR_ICON;
    chip.appendChild(iconBtn);
    playEnterAnimation(iconBtn, "srp-experiment-clear--enter");
  }
}

function restoreFiltersChip(restore) {
  if (!restore?.chip || !restore?.originalChip) return;
  restore.chip.replaceWith(restore.originalChip.cloneNode(true));
}

export function initSrpBudgetBhkGuidance(getSearchContext) {
  let mounted = false;
  let chrome = null;
  let filtersEl = null;
  let guidanceStrip = null;
  let budgetSlot = null;
  let bhkSlot = null;
  let legacyBhkBtn = null;
  let originalBudgetBtn = null;
  let filtersChipRestore = null;

  const state = {
    budgetId: null,
    bhkId: null,
  };

  function getLocationLabel() {
    return getSearchContext()?.location ?? "Sector 44";
  }

  function updateResultsMeta() {
    const metaEl = document.querySelector(".srp-results-meta");
    if (!metaEl) return;

    const location = getLocationLabel();
    let count = SRP_BUDGET_BHK_GUIDANCE_MOCK.defaultResultCount;

    if (state.budgetId && state.bhkId) {
      count = getBhkResultCount(state.budgetId, state.bhkId);
    } else if (state.budgetId) {
      count = getBudgetResultCount(state.budgetId);
    }

    const noun = count === 1 ? "property" : "properties";
    const label = `Showing ${count} ${noun} in ${location}`;
    const textEl = metaEl.querySelector(".srp-results-meta__text");
    if (textEl) {
      if (!prefersReducedMotion()) {
        textEl.classList.add("srp-results-meta__text--pulse");
        textEl.addEventListener(
          "animationend",
          () => textEl.classList.remove("srp-results-meta__text--pulse"),
          { once: true }
        );
      }
      textEl.textContent = label;
    } else {
      metaEl.textContent = label;
    }
  }

  function buildGuidanceScroll() {
    const scroll = document.createElement("div");
    scroll.className = "srp-guidance-strip__scroll";

    if (!state.budgetId) {
      SRP_BUDGET_BHK_GUIDANCE_MOCK.budgetBuckets.forEach((bucket, index) => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "srp-guidance-pill";
        pill.style.setProperty("--srp-pill-index", String(index));
        pill.dataset.srpGuidanceBudget = bucket.id;
        pill.innerHTML = `${bucket.label} <span class="srp-guidance-pill__count">${bucket.count}</span>`;
        scroll.appendChild(pill);
      });
    } else {
      const options = SRP_BUDGET_BHK_GUIDANCE_MOCK.bhkByBudget[state.budgetId] ?? [];
      options.forEach((option, index) => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "srp-guidance-pill";
        pill.style.setProperty("--srp-pill-index", String(index));
        pill.dataset.srpGuidanceBhk = option.id;
        pill.innerHTML = `${option.label} <span class="srp-guidance-pill__count">${option.count}</span>`;
        scroll.appendChild(pill);
      });
    }

    return scroll;
  }

  function renderGuidanceStrip() {
    if (!guidanceStrip) return;

    if (state.bhkId) {
      hideGuidanceStrip(guidanceStrip);
      return;
    }

    showGuidanceStrip(guidanceStrip, buildGuidanceScroll());
  }

  function renderBudgetChip() {
    if (!budgetSlot) return;
    const bucket = state.budgetId ? getBudgetBucket(state.budgetId) : null;
    const hint = !state.budgetId && !state.bhkId;
    const node = bucket
      ? createAppliedFilterChip(bucket.label)
      : createEmptyFilterButton("Budget", "budget", { hint });
    replaceWithEnter(
      budgetSlot,
      node,
      bucket ? "srp-experiment-chip--enter" : "srp-experiment-dropdown--enter"
    );
  }

  function renderBhkChip() {
    if (!bhkSlot) return;
    const option = state.budgetId && state.bhkId ? getBhkOption(state.budgetId, state.bhkId) : null;
    const hint = Boolean(state.budgetId && !state.bhkId);
    const node = option
      ? createAppliedFilterChip(option.label)
      : createEmptyFilterButton("BHK", "bhk", { hint });
    replaceWithEnter(
      bhkSlot,
      node,
      option ? "srp-experiment-chip--enter" : "srp-experiment-dropdown--enter"
    );
  }

  function renderAll() {
    renderBudgetChip();
    renderBhkChip();
    renderFiltersChip(filtersChipRestore, state);
    renderGuidanceStrip();
    updateResultsMeta();
  }

  function setBudget(budgetId) {
    state.budgetId = budgetId;
    state.bhkId = null;
    renderAll();
  }

  function setBhk(bhkId) {
    if (!state.budgetId) return;
    state.bhkId = bhkId;
    renderAll();
  }

  function clearAllFilters() {
    state.budgetId = null;
    state.bhkId = null;
    renderAll();
  }

  function onChromeClick(event) {
    const budgetPill = event.target.closest("[data-srp-guidance-budget]");
    if (budgetPill) {
      setBudget(budgetPill.dataset.srpGuidanceBudget);
      return;
    }

    const bhkPill = event.target.closest("[data-srp-guidance-bhk]");
    if (bhkPill) {
      setBhk(bhkPill.dataset.srpGuidanceBhk);
      return;
    }

    const clearBtn = event.target.closest("[data-srp-experiment-clear-all]");
    if (clearBtn) {
      event.stopPropagation();
      clearAllFilters();
      return;
    }

    const emptyFilter = event.target.closest("[data-srp-experiment-filter]");
    if (emptyFilter) {
      // Prototype: same as today — dropdown not wired; strip is the guided path.
      return;
    }
  }

  function mount() {
    if (mounted || !isExperimentEnabled(SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID)) return;

    chrome = document.querySelector(".srp-search-chrome");
    filtersEl = chrome?.querySelector(".srp-search-filters");
    if (!chrome || !filtersEl) return;

    const budgetBtn = findFilterButton(filtersEl, "Budget");
    legacyBhkBtn = findFilterButton(filtersEl, "BHK type");
    if (!budgetBtn) return;

    legacyBhkBtn?.classList.add("srp-filter-dropdown--legacy-bhk");

    originalBudgetBtn = budgetBtn.cloneNode(true);
    budgetSlot = document.createElement("div");
    budgetSlot.className = "srp-experiment-filter-slot";
    budgetSlot.dataset.srpExperimentSlot = "budget";
    budgetBtn.replaceWith(budgetSlot);

    bhkSlot = document.createElement("div");
    bhkSlot.className = "srp-experiment-filter-slot";
    bhkSlot.dataset.srpExperimentSlot = "bhk";
    budgetSlot.insertAdjacentElement("afterend", bhkSlot);

    guidanceStrip = document.createElement("div");
    guidanceStrip.className = "srp-guidance-strip";
    guidanceStrip.hidden = true;
    chrome.insertAdjacentElement("afterend", guidanceStrip);

    document.querySelector(".srp-results-meta-confirm")?.remove();

    filtersChipRestore = setupFiltersChip(filtersEl);

    chrome.addEventListener("click", onChromeClick);
    guidanceStrip.addEventListener("click", onChromeClick);
    mounted = true;
    renderAll();
  }

  function unmount() {
    if (!mounted) return;

    chrome?.removeEventListener("click", onChromeClick);
    guidanceStrip?.removeEventListener("click", onChromeClick);

    restoreFiltersChip(filtersChipRestore);
    filtersChipRestore = null;

    if (budgetSlot && originalBudgetBtn) {
      budgetSlot.replaceWith(originalBudgetBtn.cloneNode(true));
    } else {
      budgetSlot?.remove();
    }

    bhkSlot?.remove();
    guidanceStrip?.remove();

    legacyBhkBtn?.classList.remove("srp-filter-dropdown--legacy-bhk");

    chrome = null;
    filtersEl = null;
    guidanceStrip = null;
    budgetSlot = null;
    bhkSlot = null;
    legacyBhkBtn = null;
    originalBudgetBtn = null;
    state.budgetId = null;
    state.bhkId = null;
    mounted = false;
    guidanceStripAnimGen += 1;

    const metaEl = document.querySelector(".srp-results-meta");
    if (metaEl) {
      const { location, count } = getSearchContext();
      const noun = count === 1 ? "property" : "properties";
      const label = `Showing ${count} ${noun} in ${location}`;
      const textEl = metaEl.querySelector(".srp-results-meta__text");
      if (textEl) {
        textEl.textContent = label;
      } else {
        metaEl.textContent = label;
      }
    }
  }

  function sync() {
    if (isExperimentEnabled(SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID)) {
      mount();
    } else {
      unmount();
    }
  }

  window.addEventListener("housing:experiment-change", sync);
  window.addEventListener("housing:experiment-apply", sync);

  sync();
}
