import "./components/SrpBhkBudgetBottomSheet.css";
import {
  bhkValueToMockId,
  formatMaxBudgetLabel,
  getBhkLabelFromValue,
  getSheetResultCount,
  SRP_BHK_STEPPER_DEFAULT,
  SRP_BHK_STEPPER_MAX,
  SRP_BHK_STEPPER_MIN,
  SRP_BUDGET_SHEET_DEFAULT_INDEX,
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

const SRP_BHK_PERSON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>`;

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

function hapticWheelTick() {
  if (prefersReducedMotion()) return;
  try {
    if ("vibrate" in navigator) navigator.vibrate(1);
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

function createBudgetDialPicker(
  container,
  options,
  { initialIndex = 0, floorIndex = 0, hardFloor = false, onChange } = {}
) {
  container.innerHTML = `
    <div class="srp-ios-picker__selection-pill" aria-hidden="true"></div>
    <button type="button" class="srp-budget-stepper__pill-btn srp-budget-stepper__pill-btn--minus" id="srp-budget-stepper-minus" aria-label="Decrease budget">${SRP_BHK_STEPPER_MINUS_ICON}</button>
    <button type="button" class="srp-budget-stepper__pill-btn srp-budget-stepper__pill-btn--plus" id="srp-budget-stepper-plus" aria-label="Increase budget">${SRP_BHK_STEPPER_PLUS_ICON}</button>
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
  let itemHeight = 44;
  let selectedIndex = Math.max(floorIndex, Math.min(options.length - 1, initialIndex));
  let minIndex = floorIndex;
  let scrollTimer;
  let rafId;
  let scrollAnimId;
  let lastHapticIndex = selectedIndex;
  let isSnapping = false;
  let isDragging = false;
  let isUserScrolling = false;
  let settleMonitorId = 0;
  let lastScrollTop = 0;
  let lastScrollSampleAt = 0;

  if (hardFloor) {
    container.classList.add("srp-ios-picker--hard-floor");
  }

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

  const getMinScrollTop = () => {
    if (!hardFloor || minIndex <= 0) return 0;
    measureItemHeight();
    const floorItem = items[minIndex];
    if (!floorItem) return 0;
    return floorItem.offsetTop - (viewport.clientHeight - itemHeight) / 2;
  };

  const getMaxScrollTop = () => {
    measureItemHeight();
    const lastItem = items[options.length - 1];
    if (!lastItem) return Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    return lastItem.offsetTop - (viewport.clientHeight - itemHeight) / 2;
  };

  const clampScrollTop = (top) =>
    Math.min(getMaxScrollTop(), Math.max(getMinScrollTop(), top));

  const enforceScrollFloor = () => {
    if (!hardFloor || minIndex <= 0) return false;
    const floorScrollTop = getMinScrollTop();
    if (viewport.scrollTop < floorScrollTop - 0.5) {
      viewport.scrollTop = floorScrollTop;
      return true;
    }
    return false;
  };

  const paintWheel = () => {
    measureItemHeight();
    const viewportRect = viewport.getBoundingClientRect();
    const centerY = viewportRect.top + viewportRect.height / 2;

    let closestIndex = selectedIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const isBelowFloor = index < minIndex;

      if (hardFloor && isBelowFloor) {
        item.style.transform = "scale(0.82) rotateX(0deg)";
        item.style.opacity = "0";
        item.classList.add("is-below-floor");
        item.classList.remove("is-selected");
        item.setAttribute("aria-selected", "false");
        return;
      }

      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = itemCenter - centerY;
      const absDistance = Math.abs(distance);

      const norm = Math.min(absDistance / itemHeight, 2.5);
      const focus = Math.max(0, 1 - norm * 0.45);
      const scale = 0.88 + focus * 0.14;
      const opacity = 0.5 + focus * 0.5;
      const fontWeight = focus > 0.72 ? 700 : focus > 0.38 ? 500 : 400;

      item.style.transition = "none";
      item.style.transform = `scale(${scale.toFixed(3)}) translateZ(0)`;
      item.style.fontWeight = String(fontWeight);
      item.style.opacity = String(Math.max(0.48, opacity));
      item.style.color =
        focus > 0.55
          ? "var(--ds-color-warm-neutral-900)"
          : "color-mix(in srgb, var(--ds-color-warm-neutral-700) 72%, transparent)";
      item.classList.toggle("is-below-floor", isBelowFloor);

      if (absDistance < closestDistance) {
        closestDistance = absDistance;
        closestIndex = index;
      }
    });

    closestIndex = Math.max(minIndex, closestIndex);

    items.forEach((item, index) => {
      if (hardFloor && index < minIndex) return;
      const isSelected = index === closestIndex;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    if (closestIndex !== selectedIndex) {
      selectedIndex = closestIndex;
      if (lastHapticIndex !== selectedIndex) {
        lastHapticIndex = selectedIndex;
        if (isUserScrolling || isDragging || !isSnapping) {
          hapticWheelTick();
        }
      }
      if (!isSnapping) {
        onChange?.(selectedIndex, options[selectedIndex]);
      }
    }
  };

  const schedulePaint = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      paintWheel();
    });
  };

  const getScrollTopForIndex = (index) => {
    measureItemHeight();
    const target = items[index];
    if (!target) return 0;
    const centered = target.offsetTop - (viewport.clientHeight - itemHeight) / 2;
    return clampScrollTop(centered);
  };

  const cancelScrollAnimation = () => {
    if (scrollAnimId) {
      window.cancelAnimationFrame(scrollAnimId);
      scrollAnimId = 0;
    }
  };

  const cancelSettleMonitor = () => {
    if (settleMonitorId) {
      window.cancelAnimationFrame(settleMonitorId);
      settleMonitorId = 0;
    }
  };

  const easeOutQuart = (t) => 1 - (1 - t) ** 4;

  const animateScrollTo = (targetTop, onDone, { duration: durationOverride } = {}) => {
    cancelScrollAnimation();
    window.clearTimeout(scrollTimer);
    cancelSettleMonitor();
    const startTop = viewport.scrollTop;
    const delta = targetTop - startTop;

    if (Math.abs(delta) < 0.5 || prefersReducedMotion()) {
      viewport.scrollTop = targetTop;
      paintWheel();
      onDone?.();
      return;
    }

    const duration =
      durationOverride ?? Math.min(480, Math.max(320, Math.abs(delta) * 0.85));
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      viewport.scrollTop = startTop + delta * easeOutQuart(progress);
      paintWheel();

      if (progress < 1) {
        scrollAnimId = window.requestAnimationFrame(tick);
        return;
      }

      scrollAnimId = 0;
      viewport.scrollTop = targetTop;
      paintWheel();
      onDone?.();
    };

    scrollAnimId = window.requestAnimationFrame(tick);
  };

  const scrollToIndex = (index, { smooth = false, emit = true, step = false } = {}) => {
    const clamped = Math.max(minIndex, Math.min(options.length - 1, index));
    isSnapping = true;

    const targetTop = getScrollTopForIndex(clamped);
    const finish = () => {
      selectedIndex = clamped;
      enforceScrollFloor();
      paintWheel();
      isSnapping = false;
      if (emit) onChange?.(selectedIndex, options[selectedIndex]);
    };

    if (smooth) {
      animateScrollTo(targetTop, finish, { duration: step ? 420 : undefined });
      return;
    }

    cancelScrollAnimation();
    window.clearTimeout(scrollTimer);
    selectedIndex = clamped;
    viewport.scrollTop = targetTop;
    finish();
  };

  const settleScroll = ({ emit = false } = {}) => {
    if (scrollAnimId) return;

    isDragging = false;
    isUserScrolling = false;
    enforceScrollFloor();
    paintWheel();

    const index = Math.max(minIndex, selectedIndex);
    const targetTop = getScrollTopForIndex(index);

    if (Math.abs(viewport.scrollTop - targetTop) <= 1) {
      selectedIndex = index;
      viewport.scrollTop = targetTop;
      paintWheel();
      return;
    }

    scrollToIndex(index, { smooth: true, emit });
  };

  const scheduleSettle = (delay = 160) => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => settleScroll({ emit: false }), delay);
  };

  const beginUserScroll = () => {
    isDragging = true;
    isUserScrolling = true;
    cancelScrollAnimation();
    cancelSettleMonitor();
    window.clearTimeout(scrollTimer);
    schedulePaint();
  };

  const monitorScrollMomentum = () => {
    cancelSettleMonitor();
    lastScrollTop = viewport.scrollTop;
    lastScrollSampleAt = performance.now();

    const sample = () => {
      if (scrollAnimId) {
        settleMonitorId = window.requestAnimationFrame(sample);
        return;
      }

      schedulePaint();

      const now = performance.now();
      const currentTop = viewport.scrollTop;
      const elapsed = Math.max(16, now - lastScrollSampleAt);
      const velocity = Math.abs(currentTop - lastScrollTop) / elapsed;

      lastScrollTop = currentTop;
      lastScrollSampleAt = now;

      if (velocity > 0.08) {
        settleMonitorId = window.requestAnimationFrame(sample);
        return;
      }

      settleMonitorId = 0;
      settleScroll({ emit: false });
    };

    settleMonitorId = window.requestAnimationFrame(sample);
  };

  const onScroll = () => {
    if (scrollAnimId) {
      schedulePaint();
      return;
    }

    if (isSnapping) return;

    if (enforceScrollFloor()) {
      hapticSoft();
    }
    schedulePaint();

    if (isUserScrolling || isDragging) {
      scheduleSettle(isDragging ? 180 : 140);
    }
  };

  viewport.addEventListener(
    "touchstart",
    () => {
      beginUserScroll();
    },
    { passive: true }
  );
  viewport.addEventListener("touchend", () => monitorScrollMomentum(), { passive: true });
  viewport.addEventListener("touchcancel", () => monitorScrollMomentum(), { passive: true });
  viewport.addEventListener("mousedown", () => {
    beginUserScroll();
  });
  viewport.addEventListener("mouseup", () => monitorScrollMomentum());
  viewport.addEventListener("wheel", () => {
    beginUserScroll();
    monitorScrollMomentum();
  }, { passive: true });
  viewport.addEventListener("scroll", onScroll, { passive: true });

  scrollToIndex(selectedIndex, { smooth: false, emit: false });

  return {
    getIndex: () => selectedIndex,
    getValue: () => options[selectedIndex],
    setIndex: (index, smooth = true) => scrollToIndex(index, { smooth, emit: true, step: smooth }),
    setFloorIndex(index) {
      minIndex = Math.max(0, Math.min(options.length - 1, index));
      items.forEach((item, itemIndex) => {
        item.classList.toggle("is-below-floor", itemIndex < minIndex);
      });
      enforceScrollFloor();
      if (selectedIndex < minIndex) {
        scrollToIndex(minIndex, { smooth: true, emit: true });
        hapticSoft();
      } else {
        paintWheel();
      }
    },
    refresh: () => {
      enforceScrollFloor();
      paintWheel();
    },
    destroy() {
      viewport.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      cancelScrollAnimation();
      cancelSettleMonitor();
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
  let bhkPeopleEl = null;
  let bhkMinusBtn = null;
  let bhkPlusBtn = null;
  let budgetMinusBtn = null;
  let budgetPlusBtn = null;
  let budgetPicker = null;
  let openLock = false;
  let completed = false;
  let currentStep = "budget";
  let escHandler = null;
  let closeTimer = null;

  let budgetSlot = null;
  let bhkSlot = null;
  let originalBudgetBtn = null;
  let legacyBhkBtn = null;

  const state = {
    bhkValue: SRP_BHK_STEPPER_DEFAULT,
    bhkId: null,
    maxValue: SRP_BUDGET_SHEET_STEPS[SRP_BUDGET_SHEET_DEFAULT_INDEX].value,
  };

  const STEP_COPY = {
    budget: { title: "What's your max budget?", cta: "Continue" },
    bhk: { title: "How many bedrooms?", cta: "Done" },
  };

  function getLocationLabel() {
    return getSearchContext()?.location ?? "Sector 44";
  }

  function updateResultsMeta() {
    const metaEl = document.querySelector(".srp-results-meta");
    if (!metaEl) return;

    const location = getLocationLabel();
    const count = completed
      ? getSheetResultCount(state.bhkId, SRP_BUDGET_SHEET_STEPS[0].value, state.maxValue)
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
      budgetSlot.replaceChildren(createAppliedFilterChip(formatMaxBudgetLabel(state.maxValue)));
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

  function renderBhkPeople(direction = 0) {
    if (!bhkPeopleEl) return;

    const count = state.bhkValue;
    bhkPeopleEl.dataset.count = String(count);

    while (bhkPeopleEl.children.length > count) {
      bhkPeopleEl.lastElementChild?.remove();
    }

    while (bhkPeopleEl.children.length < count) {
      const index = bhkPeopleEl.children.length;
      const person = document.createElement("span");
      person.className =
        index === 0
          ? "srp-bhk-stepper__person srp-bhk-stepper__person--full"
          : "srp-bhk-stepper__person srp-bhk-stepper__person--peek";
      person.innerHTML = SRP_BHK_PERSON_ICON;
      if (direction > 0 && index === count - 1) {
        person.classList.add("srp-bhk-stepper__person--enter");
      }
      bhkPeopleEl.appendChild(person);
    }

    [...bhkPeopleEl.children].forEach((person, index) => {
      person.style.setProperty("--person-index", String(index));
    });
  }

  function renderBhkStepper(direction = 0) {
    if (!bhkValueEl || !bhkMinusBtn || !bhkPlusBtn) return;

    bhkValueEl.textContent = String(state.bhkValue);
    bhkMinusBtn.disabled = state.bhkValue <= SRP_BHK_STEPPER_MIN;
    bhkPlusBtn.disabled = state.bhkValue >= SRP_BHK_STEPPER_MAX;
    renderBhkPeople(direction);
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

  function syncBudgetStateFromPicker() {
    const maxIndex = budgetPicker?.getIndex() ?? SRP_BUDGET_SHEET_DEFAULT_INDEX;
    state.maxValue = SRP_BUDGET_SHEET_STEPS[maxIndex].value;
  }

  function onMaxBudgetChange(maxIndex) {
    state.maxValue = SRP_BUDGET_SHEET_STEPS[maxIndex].value;
    updateBudgetStepperButtons();
  }

  function updateBudgetStepperButtons() {
    if (!budgetMinusBtn || !budgetPlusBtn) return;
    const index = budgetPicker?.getIndex() ?? SRP_BUDGET_SHEET_DEFAULT_INDEX;
    budgetMinusBtn.disabled = index <= 0;
    budgetPlusBtn.disabled = index >= SRP_BUDGET_SHEET_STEPS.length - 1;
  }

  function setBudgetIndex(nextIndex) {
    const clamped = Math.max(0, Math.min(SRP_BUDGET_SHEET_STEPS.length - 1, nextIndex));
    if (clamped === budgetPicker?.getIndex()) return;
    hapticWheelTick();
    budgetPicker?.setIndex(clamped, true);
    updateBudgetStepperButtons();
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

    if (step === "budget") {
      window.setTimeout(() => {
        budgetPicker?.refresh();
        updateBudgetStepperButtons();
      }, 80);
    }
  }

  function setSheetOpenClass(open) {
    document.documentElement.classList.toggle("srp-budget-sheet-open", open);
    if (open) {
      document.documentElement.classList.remove("srp-budget-sheet-closing");
    }
  }

  function openSheet() {
    if (!sheetEl || sheetEl.classList.contains("is-visible") || completed) return;

    showStep("budget");
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

    closeSheet();
    showStep("budget");
    resetBhkStepper();
  }

  function closeSheet() {
    if (!sheetEl?.classList.contains("is-visible")) return;

    sheetEl.classList.add("is-closing");
    sheetEl.classList.remove("is-visible");
    document.documentElement.classList.remove("srp-budget-sheet-open");
    document.documentElement.classList.add("srp-budget-sheet-closing");

    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      escHandler = null;
    }

    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("srp-budget-sheet-closing");
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

    if (currentStep === "budget") {
      syncBudgetStateFromPicker();
      hapticConfirm();
      showStep("bhk");
      return;
    }

    state.bhkId = bhkValueToMockId(state.bhkValue);
    syncBudgetStateFromPicker();
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
            <h2 id="srp-bhk-budget-sheet-title" class="srp-bhk-budget-sheet__title">What's your max budget?</h2>
          </header>
          <div class="srp-bhk-budget-sheet__body">
            <div class="srp-bhk-budget-sheet__step" data-step="budget">
              <div class="srp-budget-stepper" role="group" aria-label="Max budget">
                <div class="srp-budget-stepper__picker">
                  <div class="srp-ios-picker srp-ios-picker--dial srp-ios-picker--single srp-ios-picker--odometer" id="srp-budget-sheet-max-picker"></div>
                </div>
              </div>
            </div>
            <div class="srp-bhk-budget-sheet__step" data-step="bhk" hidden>
              <div class="srp-bhk-stepper" role="group" aria-label="Number of BHK">
                <button type="button" class="srp-bhk-stepper__btn" id="srp-bhk-stepper-minus" aria-label="Decrease BHK">${SRP_BHK_STEPPER_MINUS_ICON}</button>
                <div class="srp-bhk-stepper__display" aria-live="polite" aria-atomic="true">
                  <div class="srp-bhk-stepper__people" id="srp-bhk-stepper-people" aria-hidden="true"></div>
                  <span class="srp-bhk-stepper__value" id="srp-bhk-stepper-value">${SRP_BHK_STEPPER_DEFAULT}</span>
                  <span class="srp-bhk-stepper__suffix">BHK</span>
                </div>
                <button type="button" class="srp-bhk-stepper__btn" id="srp-bhk-stepper-plus" aria-label="Increase BHK">${SRP_BHK_STEPPER_PLUS_ICON}</button>
              </div>
            </div>
          </div>
          <footer class="srp-bhk-budget-sheet__footer">
            <button type="button" class="srp-card-cta-btn srp-card-cta-btn--brand srp-bhk-budget-sheet__cta" id="srp-budget-sheet-cta">Continue</button>
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
    bhkPeopleEl = document.getElementById("srp-bhk-stepper-people");
    bhkMinusBtn = document.getElementById("srp-bhk-stepper-minus");
    bhkPlusBtn = document.getElementById("srp-bhk-stepper-plus");

    budgetPicker = createBudgetDialPicker(
      document.getElementById("srp-budget-sheet-max-picker"),
      SRP_BUDGET_SHEET_STEPS,
      {
        initialIndex: SRP_BUDGET_SHEET_DEFAULT_INDEX,
        onChange: onMaxBudgetChange,
      }
    );

    budgetMinusBtn = document.getElementById("srp-budget-stepper-minus");
    budgetPlusBtn = document.getElementById("srp-budget-stepper-plus");

    updateBudgetStepperButtons();

    ctaBtn.addEventListener("click", onCtaClick);
    budgetMinusBtn?.addEventListener("click", () => setBudgetIndex((budgetPicker?.getIndex() ?? 0) - 1));
    budgetPlusBtn?.addEventListener("click", () => setBudgetIndex((budgetPicker?.getIndex() ?? 0) + 1));
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
    budgetPicker?.destroy();
    budgetPicker = null;

    sheetEl?.remove();
    sheetEl = null;
    bhkStepEl = null;
    budgetStepEl = null;
    ctaBtn = null;
    titleEl = null;
    bhkValueEl = null;
    bhkPeopleEl = null;
    bhkMinusBtn = null;
    bhkPlusBtn = null;
    budgetMinusBtn = null;
    budgetPlusBtn = null;
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
    currentStep = "budget";
    state.bhkValue = SRP_BHK_STEPPER_DEFAULT;
    state.bhkId = null;
    state.maxValue = SRP_BUDGET_SHEET_STEPS[SRP_BUDGET_SHEET_DEFAULT_INDEX].value;
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
    currentStep = "budget";

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
