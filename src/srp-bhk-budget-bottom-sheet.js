import "./components/SrpBhkBudgetBottomSheet.css";
import {
  bhkValueToMockId,
  formatBudgetRangeLabel,
  getBhkLabelFromValue,
  getSheetResultCount,
  SRP_BHK_STEPPER_DEFAULT,
  SRP_BHK_STEPPER_MAX,
  SRP_BHK_STEPPER_MIN,
  SRP_BUDGET_SHEET_STEPS,
} from "./data/srpBhkBudgetBottomSheet.mock.js";
import { SRP_BUDGET_BHK_GUIDANCE_MOCK } from "./data/srpBudgetBhkGuidance.mock.js";
import {
  isExperimentEnabled,
  SRP_BHK_BUDGET_CARD_EXPERIMENT_ID,
} from "./experiments.js";

const SRP_RELOAD_SKELETON_MS = 720;
const SRP_SHEET_LANDING_DELAY_MS = 2500;
const SRP_SHEET_CLOSE_MS = 520;

const SRP_FILTER_CHEVRON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

const SRP_SHEET_CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>`;

const SRP_BHK_STEPPER_MINUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true"><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>`;

const SRP_BHK_STEPPER_PLUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true"><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>`;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hapticMicro() {
  if (prefersReducedMotion()) return;
  try {
    if ("vibrate" in navigator) navigator.vibrate(4);
  } catch {
    /* progressive enhancement */
  }
}

function hapticSoft() {
  if (prefersReducedMotion()) return;
  try {
    if ("vibrate" in navigator) navigator.vibrate(8);
  } catch {
    /* progressive enhancement */
  }
}

function hapticConfirm() {
  if (prefersReducedMotion()) return;
  try {
    if ("vibrate" in navigator) navigator.vibrate([8, 36, 10]);
  } catch {
    /* progressive enhancement */
  }
}

function findFilterButton(filtersEl, label) {
  return [...filtersEl.querySelectorAll(".srp-filter-dropdown")].find(
    (button) => button.querySelector("span")?.textContent?.trim() === label
  );
}

function createAppliedFilterChip(label) {
  const chip = document.createElement("div");
  chip.className = "srp-filter-chip srp-filter-chip--experiment srp-experiment-chip--applied";
  chip.innerHTML = `<span class="srp-filter-applied-label">${label}</span>`;
  return chip;
}

function createEmptyFilterButton(label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "srp-filter-dropdown srp-filter-dropdown--empty-experiment";
  button.innerHTML = `<span>${label}</span>${SRP_FILTER_CHEVRON}`;
  return button;
}

function waitForInitialPageSkeleton() {
  return new Promise((resolve) => {
    const skeleton = document.getElementById("srp-skeleton");
    if (!skeleton || skeleton.classList.contains("srp-skeleton--hide")) {
      window.setTimeout(resolve, SRP_SHEET_LANDING_DELAY_MS);
      return;
    }

    const done = () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      window.setTimeout(resolve, SRP_SHEET_LANDING_DELAY_MS);
    };

    const observer = new MutationObserver(() => {
      if (skeleton.classList.contains("srp-skeleton--hide") || !document.body.contains(skeleton)) {
        done();
      }
    });

    observer.observe(skeleton, { attributes: true, attributeFilter: ["class"] });
    const fallback = window.setTimeout(done, 4000);
  });
}

function createBudgetDialPicker(container, options, { initialIndex = 0, floorIndex = 0, onChange } = {}) {
  container.innerHTML = `
    <div class="srp-ios-picker__rail" aria-hidden="true">
      <span class="srp-ios-picker__rail-line srp-ios-picker__rail-line--top"></span>
      <span class="srp-ios-picker__rail-line srp-ios-picker__rail-line--bottom"></span>
    </div>
    <div class="srp-ios-picker__viewport" tabindex="0" role="listbox">
      <ul class="srp-ios-picker__list"></ul>
    </div>
  `;

  const viewport = container.querySelector(".srp-ios-picker__viewport");
  const list = container.querySelector(".srp-ios-picker__list");
  const items = [];
  let itemHeight = 48;
  let selectedIndex = Math.max(floorIndex, Math.min(options.length - 1, initialIndex));
  let minIndex = floorIndex;
  let scrollTimer;
  let rafId;
  let lastHapticIndex = selectedIndex;
  let isDragging = false;
  let isSnapping = false;

  options.forEach((option, index) => {
    const li = document.createElement("li");
    li.className = "srp-ios-picker__item";
    li.role = "option";
    li.dataset.index = String(index);
    li.textContent = option.label;
    list.appendChild(li);
    items.push(li);
  });

  const measureItemHeight = () => {
    if (items[0]) {
      itemHeight = items[0].getBoundingClientRect().height || 48;
    }
  };

  const paintWheel = ({ allowBelowFloor = isDragging } = {}) => {
    measureItemHeight();
    const viewportRect = viewport.getBoundingClientRect();
    const centerY = viewportRect.top + viewportRect.height / 2;

    let closestIndex = selectedIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = itemCenter - centerY;
      const absDistance = Math.abs(distance);
      const normalized = Math.min(absDistance / itemHeight, 3.4);
      const isBelowFloor = index < minIndex;

      const scale = Math.max(0.68, 1.16 - normalized * 0.12);
      const opacity = isBelowFloor && !allowBelowFloor ? 0.14 : Math.max(0.18, 1 - normalized * 0.24);
      const rotateX = Math.max(-22, Math.min(22, (distance / itemHeight) * -16));

      item.style.transform = `scale(${scale}) rotateX(${rotateX}deg)`;
      item.style.opacity = String(opacity);
      item.classList.toggle("is-below-floor", isBelowFloor);

      if (absDistance < closestDistance) {
        closestDistance = absDistance;
        closestIndex = index;
      }
    });

    if (!allowBelowFloor && closestIndex < minIndex) {
      closestIndex = minIndex;
    }

    items.forEach((item, index) => {
      const isSelected = index === closestIndex;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    if (closestIndex !== selectedIndex) {
      selectedIndex = closestIndex;
      if (lastHapticIndex !== selectedIndex) {
        lastHapticIndex = selectedIndex;
        hapticMicro();
      }
      if (!isSnapping) {
        onChange?.(selectedIndex, options[selectedIndex]);
      }
    }
  };

  const schedulePaint = (opts) => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      paintWheel(opts);
    });
  };

  const scrollToIndex = (index, { smooth = false, emit = true } = {}) => {
    const clamped = Math.max(minIndex, Math.min(options.length - 1, index));
    isSnapping = true;
    selectedIndex = clamped;
    lastHapticIndex = clamped;

    const target = items[clamped];
    if (target) {
      target.scrollIntoView({ block: "center", behavior: smooth ? "smooth" : "auto" });
    }

    window.setTimeout(
      () => {
        paintWheel({ allowBelowFloor: false });
        isSnapping = false;
        if (emit) onChange?.(selectedIndex, options[selectedIndex]);
      },
      smooth ? 220 : 0
    );
  };

  const settleScroll = () => {
    paintWheel({ allowBelowFloor: false });
    if (selectedIndex < minIndex) {
      scrollToIndex(minIndex, { smooth: true, emit: true });
      return;
    }
    scrollToIndex(selectedIndex, { smooth: true, emit: false });
  };

  const onScroll = () => {
    schedulePaint({ allowBelowFloor: isDragging });
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(settleScroll, 120);
  };

  viewport.addEventListener(
    "touchstart",
    () => {
      isDragging = true;
      schedulePaint({ allowBelowFloor: true });
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    () => {
      isDragging = false;
      window.setTimeout(settleScroll, 80);
    },
    { passive: true }
  );
  viewport.addEventListener("mousedown", () => {
    isDragging = true;
    schedulePaint({ allowBelowFloor: true });
  });
  viewport.addEventListener("mouseup", () => {
    isDragging = false;
    window.setTimeout(settleScroll, 80);
  });
  viewport.addEventListener("scroll", onScroll, { passive: true });

  scrollToIndex(selectedIndex, { smooth: false, emit: false });

  return {
    getIndex: () => selectedIndex,
    getValue: () => options[selectedIndex],
    setIndex: (index, smooth = true) => scrollToIndex(index, { smooth, emit: true }),
    setFloorIndex(index) {
      minIndex = Math.max(0, Math.min(options.length - 1, index));
      items.forEach((item, itemIndex) => {
        item.classList.toggle("is-below-floor", itemIndex < minIndex);
      });
      if (selectedIndex < minIndex) {
        scrollToIndex(minIndex, { smooth: true, emit: true });
      } else {
        paintWheel({ allowBelowFloor: false });
      }
    },
    refresh: () => paintWheel({ allowBelowFloor: false }),
    destroy() {
      viewport.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
    },
  };
}

function buildReloadSkeletonHtml() {
  const card = `
    <div class="srp-skeleton__card">
      <div class="srp-skeleton__image srp-skeleton__shine"></div>
      <div class="srp-skeleton__line srp-skeleton__line--sm srp-skeleton__shine"></div>
      <div class="srp-skeleton__line srp-skeleton__line--md srp-skeleton__shine"></div>
      <div class="srp-skeleton__line srp-skeleton__line--lg srp-skeleton__shine"></div>
      <div class="srp-skeleton__line srp-skeleton__line--xl srp-skeleton__shine"></div>
      <div class="srp-skeleton__cta srp-skeleton__shine"></div>
    </div>`;

  return `<div class="srp-bhk-budget-sheet__reload" aria-busy="true" aria-label="Loading properties">
    <div class="srp-skeleton__cards">${card}${card}${card}</div>
  </div>`;
}

export function initSrpBhkBudgetBottomSheet(getSearchContext) {
  let mounted = false;
  let sheetEl = null;
  let bhkStepEl = null;
  let budgetStepEl = null;
  let ctaBtn = null;
  let titleEl = null;
  let bhkValueEl = null;
  let bhkMinusBtn = null;
  let bhkPlusBtn = null;
  let minPicker = null;
  let maxPicker = null;
  let openLock = false;
  let completed = false;
  let currentStep = "bhk";
  let escHandler = null;
  let closeTimer = null;

  let budgetSlot = null;
  let bhkSlot = null;
  let originalBudgetBtn = null;
  let legacyBhkBtn = null;

  const state = {
    bhkValue: SRP_BHK_STEPPER_DEFAULT,
    bhkId: null,
    minValue: SRP_BUDGET_SHEET_STEPS[2].value,
    maxValue: SRP_BUDGET_SHEET_STEPS[6].value,
  };

  const STEP_COPY = {
    bhk: { title: "How many bedrooms?", cta: "Continue" },
    budget: { title: "Set your budget", cta: "Done" },
  };

  function getLocationLabel() {
    return getSearchContext()?.location ?? "Sector 44";
  }

  function updateResultsMeta() {
    const metaEl = document.querySelector(".srp-results-meta");
    if (!metaEl) return;

    const location = getLocationLabel();
    const count = completed
      ? getSheetResultCount(state.bhkId, state.minValue, state.maxValue)
      : SRP_BUDGET_BHK_GUIDANCE_MOCK.defaultResultCount;
    const noun = count === 1 ? "property" : "properties";
    const label = `Showing ${count} ${noun} in ${location}`;
    const textEl = metaEl.querySelector(".srp-results-meta__text");

    if (textEl) {
      textEl.textContent = label;
    } else {
      metaEl.textContent = label;
    }
  }

  function renderFilterChips() {
    if (!budgetSlot || !bhkSlot) return;

    if (completed && state.bhkId) {
      bhkSlot.replaceChildren(createAppliedFilterChip(getBhkLabelFromValue(state.bhkValue)));
      budgetSlot.replaceChildren(
        createAppliedFilterChip(formatBudgetRangeLabel(state.minValue, state.maxValue))
      );
      return;
    }

    bhkSlot.replaceChildren(createEmptyFilterButton("BHK"));
    budgetSlot.replaceChildren(createEmptyFilterButton("Budget"));
  }

  function animateBhkValue(direction) {
    if (!bhkValueEl || prefersReducedMotion()) return;
    bhkValueEl.classList.remove(
      "srp-bhk-stepper__value--rise",
      "srp-bhk-stepper__value--fall",
      "srp-bhk-stepper__value--settle"
    );
    void bhkValueEl.offsetWidth;
    if (direction > 0) bhkValueEl.classList.add("srp-bhk-stepper__value--rise");
    else if (direction < 0) bhkValueEl.classList.add("srp-bhk-stepper__value--fall");
    else bhkValueEl.classList.add("srp-bhk-stepper__value--settle");
  }

  function renderBhkStepper(direction = 0) {
    if (!bhkValueEl || !bhkMinusBtn || !bhkPlusBtn) return;

    bhkValueEl.textContent = String(state.bhkValue);
    bhkMinusBtn.disabled = state.bhkValue <= SRP_BHK_STEPPER_MIN;
    bhkPlusBtn.disabled = state.bhkValue >= SRP_BHK_STEPPER_MAX;
    animateBhkValue(direction);
  }

  function setBhkValue(nextValue) {
    const clamped = Math.max(SRP_BHK_STEPPER_MIN, Math.min(SRP_BHK_STEPPER_MAX, nextValue));
    if (clamped === state.bhkValue) return;
    const direction = clamped > state.bhkValue ? 1 : -1;
    state.bhkValue = clamped;
    hapticSoft();
    renderBhkStepper(direction);
  }

  function resetBhkStepper() {
    state.bhkValue = SRP_BHK_STEPPER_DEFAULT;
    renderBhkStepper(0);
  }

  function syncBudgetStateFromPickers() {
    const minIndex = minPicker?.getIndex() ?? 2;
    const maxIndex = maxPicker?.getIndex() ?? 6;
    state.minValue = SRP_BUDGET_SHEET_STEPS[minIndex].value;
    state.maxValue = SRP_BUDGET_SHEET_STEPS[maxIndex].value;
  }

  function onMinBudgetChange(minIndex) {
    state.minValue = SRP_BUDGET_SHEET_STEPS[minIndex].value;
    maxPicker?.setFloorIndex(minIndex);
    syncBudgetStateFromPickers();
  }

  function onMaxBudgetChange(maxIndex) {
    state.maxValue = SRP_BUDGET_SHEET_STEPS[maxIndex].value;
    syncBudgetStateFromPickers();
  }

  function updateHeader(step) {
    const copy = STEP_COPY[step];
    currentStep = step;
    if (titleEl) titleEl.textContent = copy.title;
    if (ctaBtn) ctaBtn.textContent = copy.cta;
  }

  function showStep(step) {
    const isBhk = step === "bhk";
    bhkStepEl.hidden = !isBhk;
    budgetStepEl.hidden = isBhk;
    updateHeader(step);

    if (!prefersReducedMotion()) {
      (isBhk ? bhkStepEl : budgetStepEl).classList.add("srp-bhk-budget-sheet__step--enter");
      window.setTimeout(() => {
        bhkStepEl.classList.remove("srp-bhk-budget-sheet__step--enter");
        budgetStepEl.classList.remove("srp-bhk-budget-sheet__step--enter");
      }, 360);
    }

    if (!isBhk) {
      window.setTimeout(() => {
        const minIndex = minPicker?.getIndex() ?? 2;
        maxPicker?.setFloorIndex(minIndex);
        minPicker?.refresh();
        maxPicker?.refresh();
      }, 80);
    }
  }

  function setSheetOpenClass(open) {
    document.documentElement.classList.toggle("srp-budget-sheet-open", open);
    document.documentElement.classList.toggle("srp-budget-sheet-closing", false);
  }

  function openSheet() {
    if (!sheetEl || sheetEl.classList.contains("is-visible") || completed) return;

    showStep("bhk");
    sheetEl.removeAttribute("hidden");
    resetBhkStepper();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setSheetOpenClass(true);
        sheetEl.classList.add("is-visible");

        window.requestAnimationFrame(() => {
          document.documentElement.style.overflow = "hidden";
        });

        escHandler = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dismissSheet();
          }
        };
        document.addEventListener("keydown", escHandler);
      });
    });
  }

  function dismissSheet() {
    if (!sheetEl?.classList.contains("is-visible") || completed) return;

    hapticSoft();
    closeSheet();
    showStep("bhk");
    resetBhkStepper();
  }

  function closeSheet() {
    if (!sheetEl?.classList.contains("is-visible")) return;

    sheetEl.classList.add("is-closing");
    sheetEl.classList.remove("is-visible");
    document.documentElement.classList.add("srp-budget-sheet-closing");

    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      escHandler = null;
    }

    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("srp-budget-sheet-closing");
      setSheetOpenClass(false);
      document.documentElement.style.overflow = "";
      sheetEl.classList.remove("is-closing");
      sheetEl.setAttribute("hidden", "");
    }, SRP_SHEET_CLOSE_MS);
  }

  async function applySelectionAndReload() {
    completed = true;
    hapticConfirm();
    closeSheet();
    renderFilterChips();
    updateResultsMeta();

    const resultsRoot = document.getElementById("srp-results");
    if (!resultsRoot) return;

    resultsRoot.classList.add("srp-results--reload-pending");
    resultsRoot.insertAdjacentHTML("beforeend", buildReloadSkeletonHtml());

    await new Promise((resolve) => window.setTimeout(resolve, SRP_RELOAD_SKELETON_MS));

    resultsRoot.querySelector(".srp-bhk-budget-sheet__reload")?.remove();
    resultsRoot.classList.remove("srp-results--reload-pending");
    resultsRoot.classList.add("srp-results--reload-reveal");
    window.setTimeout(() => resultsRoot.classList.remove("srp-results--reload-reveal"), 400);
  }

  function onCtaClick(event) {
    event.preventDefault();

    if (currentStep === "bhk") {
      state.bhkId = bhkValueToMockId(state.bhkValue);
      hapticConfirm();
      showStep("budget");
      syncBudgetStateFromPickers();
      return;
    }

    syncBudgetStateFromPickers();
    applySelectionAndReload();
  }

  function mountSheetDom() {
    if (document.getElementById("srp-bhk-budget-sheet")) return;

    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="srp-bhk-budget-sheet" class="srp-bhk-budget-sheet" hidden role="dialog" aria-modal="true" aria-labelledby="srp-bhk-budget-sheet-title">
        <button type="button" class="srp-bhk-budget-sheet__scrim" id="srp-budget-sheet-scrim" aria-label="Close"></button>
        <div class="srp-bhk-budget-sheet__panel">
          <div class="srp-bhk-budget-sheet__handle" aria-hidden="true"></div>
          <header class="srp-bhk-budget-sheet__header">
            <button type="button" class="srp-bhk-budget-sheet__close" id="srp-budget-sheet-close" aria-label="Close">${SRP_SHEET_CLOSE_ICON}</button>
            <h2 id="srp-bhk-budget-sheet-title" class="srp-bhk-budget-sheet__title">How many bedrooms?</h2>
          </header>
          <div class="srp-bhk-budget-sheet__body">
            <div class="srp-bhk-budget-sheet__step" data-step="bhk">
              <div class="srp-bhk-stepper" role="group" aria-label="Number of BHK">
                <button type="button" class="srp-bhk-stepper__btn" id="srp-bhk-stepper-minus" aria-label="Decrease BHK">${SRP_BHK_STEPPER_MINUS_ICON}</button>
                <div class="srp-bhk-stepper__display" aria-live="polite" aria-atomic="true">
                  <span class="srp-bhk-stepper__value" id="srp-bhk-stepper-value">${SRP_BHK_STEPPER_DEFAULT}</span>
                  <span class="srp-bhk-stepper__suffix">BHK</span>
                </div>
                <button type="button" class="srp-bhk-stepper__btn" id="srp-bhk-stepper-plus" aria-label="Increase BHK">${SRP_BHK_STEPPER_PLUS_ICON}</button>
              </div>
            </div>
            <div class="srp-bhk-budget-sheet__step" data-step="budget" hidden>
              <div class="srp-bhk-budget-sheet__budget-row">
                <div class="srp-bhk-budget-sheet__picker-col">
                  <span class="srp-bhk-budget-sheet__picker-label">Min</span>
                  <div class="srp-ios-picker srp-ios-picker--dial" id="srp-budget-sheet-min-picker"></div>
                </div>
                <div class="srp-bhk-budget-sheet__picker-col">
                  <span class="srp-bhk-budget-sheet__picker-label">Max</span>
                  <div class="srp-ios-picker srp-ios-picker--dial" id="srp-budget-sheet-max-picker"></div>
                </div>
              </div>
            </div>
          </div>
          <footer class="srp-bhk-budget-sheet__footer">
            <button type="button" class="srp-bhk-budget-sheet__cta" id="srp-budget-sheet-cta">Continue</button>
          </footer>
        </div>
      </div>`
    );

    sheetEl = document.getElementById("srp-bhk-budget-sheet");
    bhkStepEl = sheetEl.querySelector('[data-step="bhk"]');
    budgetStepEl = sheetEl.querySelector('[data-step="budget"]');
    ctaBtn = document.getElementById("srp-budget-sheet-cta");
    titleEl = document.getElementById("srp-bhk-budget-sheet-title");
    bhkValueEl = document.getElementById("srp-bhk-stepper-value");
    bhkMinusBtn = document.getElementById("srp-bhk-stepper-minus");
    bhkPlusBtn = document.getElementById("srp-bhk-stepper-plus");

    minPicker = createBudgetDialPicker(
      document.getElementById("srp-budget-sheet-min-picker"),
      SRP_BUDGET_SHEET_STEPS,
      {
        initialIndex: 2,
        onChange: onMinBudgetChange,
      }
    );

    maxPicker = createBudgetDialPicker(
      document.getElementById("srp-budget-sheet-max-picker"),
      SRP_BUDGET_SHEET_STEPS,
      {
        initialIndex: 6,
        floorIndex: 2,
        onChange: onMaxBudgetChange,
      }
    );

    ctaBtn.addEventListener("click", onCtaClick);
    bhkMinusBtn?.addEventListener("click", () => setBhkValue(state.bhkValue - 1));
    bhkPlusBtn?.addEventListener("click", () => setBhkValue(state.bhkValue + 1));
    document.getElementById("srp-budget-sheet-scrim")?.addEventListener("click", dismissSheet);
    document.getElementById("srp-budget-sheet-close")?.addEventListener("click", dismissSheet);
  }

  function mountFilterSlots() {
    const chrome = document.querySelector(".srp-search-chrome");
    const filtersEl = chrome?.querySelector(".srp-search-filters");
    const budgetBtn = filtersEl ? findFilterButton(filtersEl, "Budget") : null;
    if (!budgetBtn) return;

    legacyBhkBtn = findFilterButton(filtersEl, "BHK type");
    legacyBhkBtn?.classList.add("srp-filter-dropdown--legacy-bhk");

    originalBudgetBtn = budgetBtn.cloneNode(true);

    bhkSlot = document.createElement("div");
    bhkSlot.className = "srp-experiment-filter-slot";
    bhkSlot.dataset.srpExperimentSlot = "bhk";

    budgetSlot = document.createElement("div");
    budgetSlot.className = "srp-experiment-filter-slot";
    budgetSlot.dataset.srpExperimentSlot = "budget";

    budgetBtn.replaceWith(bhkSlot);
    bhkSlot.insertAdjacentElement("afterend", budgetSlot);
    renderFilterChips();
  }

  function unmountFilterSlots() {
    if (budgetSlot && originalBudgetBtn) {
      budgetSlot.replaceWith(originalBudgetBtn.cloneNode(true));
    } else {
      budgetSlot?.remove();
    }
    bhkSlot?.remove();
    legacyBhkBtn?.classList.remove("srp-filter-dropdown--legacy-bhk");

    budgetSlot = null;
    bhkSlot = null;
    originalBudgetBtn = null;
    legacyBhkBtn = null;
  }

  function destroySheetDom() {
    window.clearTimeout(closeTimer);
    minPicker?.destroy();
    maxPicker?.destroy();
    minPicker = null;
    maxPicker = null;

    sheetEl?.remove();
    sheetEl = null;
    bhkStepEl = null;
    budgetStepEl = null;
    ctaBtn = null;
    titleEl = null;
    bhkValueEl = null;
    bhkMinusBtn = null;
    bhkPlusBtn = null;
    document.documentElement.classList.remove("srp-budget-sheet-closing");
    setSheetOpenClass(false);
    document.documentElement.style.overflow = "";
  }

  async function maybeOpenOnLanding() {
    if (completed || openLock || !sheetEl) return;
    openLock = true;
    await waitForInitialPageSkeleton();
    if (mounted && !completed) {
      openSheet();
    }
    openLock = false;
  }

  function mount() {
    if (mounted || !isExperimentEnabled(SRP_BHK_BUDGET_CARD_EXPERIMENT_ID)) return;

    mountSheetDom();
    mountFilterSlots();
    mounted = true;
    completed = false;
    currentStep = "bhk";
    state.bhkValue = SRP_BHK_STEPPER_DEFAULT;
    state.bhkId = null;
    state.minValue = SRP_BUDGET_SHEET_STEPS[2].value;
    state.maxValue = SRP_BUDGET_SHEET_STEPS[6].value;
    renderBhkStepper(0);

    maybeOpenOnLanding();
  }

  function unmount() {
    if (!mounted) return;

    closeSheet();
    destroySheetDom();
    unmountFilterSlots();
    document.getElementById("srp-results")?.classList.remove(
      "srp-results--reload-pending",
      "srp-results--reload-reveal"
    );
    document.querySelector(".srp-bhk-budget-sheet__reload")?.remove();

    mounted = false;
    completed = false;
    openLock = false;
    currentStep = "bhk";

    updateResultsMeta();
  }

  function sync() {
    if (isExperimentEnabled(SRP_BHK_BUDGET_CARD_EXPERIMENT_ID)) {
      mount();
    } else {
      unmount();
    }
  }

  window.addEventListener("housing:experiment-change", sync);
  window.addEventListener("housing:experiment-apply", sync);

  sync();
}
