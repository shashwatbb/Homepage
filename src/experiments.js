import "./components/ExperimentsConfig.css";

/**
 * EXPERIMENTS RULE (strict)
 * ─────────────────────────
 * UI changes may ONLY ship behind an experiment flag.
 * - Toggle ON  → experiment class on <html> + any gated UI renders
 * - Toggle OFF → zero visual / behavioral diff from production
 *
 * Gate in CSS:  html.experiment-{id} .your-feature { … }
 * Gate in JS:   if (!isExperimentEnabled("{id}")) return;
 * Never render experimental markup unless the experiment is enabled.
 * Only one experiment may be ON at a time; enabling one turns all others OFF.
 */

const STORAGE_KEY = "housing:experiments";

const EXPERIMENT_CATEGORIES = [
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
];

export const SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID = "srp_budget_bhk_guidance_strip";
export const SRP_BHK_BUDGET_CARD_EXPERIMENT_ID = "srp_bhk_budget_card";

const EXPERIMENT_DEFINITIONS = [
  {
    id: SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID,
    name: "Budget and BHK filter on SRP",
    platform: "mobile",
    apply(enabled) {
      document.documentElement.classList.toggle("experiment-srp-budget-bhk-guidance-strip", enabled);
      window.dispatchEvent(
        new CustomEvent("housing:experiment-apply", {
          detail: { id: SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID, enabled },
          bubbles: true,
        })
      );
    },
  },
  {
    id: SRP_BHK_BUDGET_CARD_EXPERIMENT_ID,
    name: "Bottom sheet Budget and BHK",
    platform: "mobile",
    apply(enabled) {
      document.documentElement.classList.toggle("experiment-srp-bhk-budget-card", enabled);
      window.dispatchEvent(
        new CustomEvent("housing:experiment-apply", {
          detail: { id: SRP_BHK_BUDGET_CARD_EXPERIMENT_ID, enabled },
          bubbles: true,
        })
      );
    },
  },
];

function writeExperimentState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeExclusiveExperimentState(state) {
  const enabledIds = EXPERIMENT_DEFINITIONS.filter((experiment) => state[experiment.id]).map(
    (experiment) => experiment.id
  );
  if (enabledIds.length <= 1) return state;

  const keepId = enabledIds[0];
  const normalized = {};
  EXPERIMENT_DEFINITIONS.forEach((experiment) => {
    normalized[experiment.id] = experiment.id === keepId;
  });
  writeExperimentState(normalized);
  return normalized;
}

function readExperimentState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    let state = parsed && typeof parsed === "object" ? { ...parsed } : {};
    if (state["budget-bhk-filter-srp"] && !state[SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID]) {
      state[SRP_BUDGET_BHK_GUIDANCE_EXPERIMENT_ID] = state["budget-bhk-filter-srp"];
      delete state["budget-bhk-filter-srp"];
      writeExperimentState(state);
    }
    return normalizeExclusiveExperimentState(state);
  } catch {
    return {};
  }
}

export function isExperimentEnabled(id, state = readExperimentState()) {
  return Boolean(state[id]);
}

function applyAllExperiments(state = readExperimentState()) {
  EXPERIMENT_DEFINITIONS.forEach((experiment) => {
    experiment.apply(isExperimentEnabled(experiment.id, state));
  });
}

export function syncExperimentsToDocument() {
  applyAllExperiments();
}

function experimentRowHtml(experiment) {
  return `<li class="experiments-config__row">
      <span class="experiments-config__label">${experiment.name}</span>
      <button
        type="button"
        class="experiments-switch"
        role="switch"
        aria-checked="false"
        aria-label="Toggle ${experiment.name}"
        data-experiment-id="${experiment.id}"
      ></button>
    </li>`;
}

function experimentsSectionsHtml() {
  return EXPERIMENT_CATEGORIES.map((category) => {
    const items = EXPERIMENT_DEFINITIONS.filter((experiment) => experiment.platform === category.id);
    const listHtml = items.length
      ? `<ul class="experiments-config__list">${items.map(experimentRowHtml).join("")}</ul>`
      : `<p class="experiments-config__empty">No ${category.label.toLowerCase()} experiments yet.</p>`;

    return `<section class="experiments-config__section" aria-labelledby="experiments-section-${category.id}">
        <h3 id="experiments-section-${category.id}" class="experiments-config__section-label">${category.label}</h3>
        ${listHtml}
      </section>`;
  }).join("");
}

function experimentsConfigHtml() {
  const sectionsHtml = experimentsSectionsHtml();

  return `<div id="experiments-config-backdrop" class="experiments-config-backdrop" aria-hidden="true"></div>
    <section
      id="experiments-config"
      class="experiments-config"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experiments-config-title"
      aria-hidden="true"
      hidden
    >
      <header class="experiments-config__head">
        <h2 id="experiments-config-title" class="experiments-config__title">Experiments</h2>
        <button type="button" class="experiments-config__close" id="experiments-config-close" aria-label="Close experiments">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
          </svg>
        </button>
      </header>
      <div class="experiments-config__body">
        <p class="experiments-config__intro">Turn experiments on or off to preview changes by platform.</p>
        <div class="experiments-config__sections">${sectionsHtml}</div>
      </div>
    </section>
    <div id="experiments-toast" class="experiments-toast" role="status" aria-live="polite" hidden>
      <div class="experiments-toast__inner">
        <span class="experiments-toast__text" id="experiments-toast-text"></span>
      </div>
    </div>`;
}

function initExperimentsToast() {
  const root = document.getElementById("experiments-toast");
  const textEl = document.getElementById("experiments-toast-text");
  if (!root || !textEl) return { show: () => {} };

  let hideTimer;

  const hide = () => {
    root.classList.remove("is-visible");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      root.setAttribute("hidden", "");
    }, 280);
  };

  const show = (message) => {
    textEl.textContent = message;
    root.removeAttribute("hidden");
    window.clearTimeout(hideTimer);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => root.classList.add("is-visible"));
    });
    hideTimer = window.setTimeout(hide, 2200);
  };

  return { show };
}

function initExperimentsPanel(toast) {
  const panel = document.getElementById("experiments-config");
  const backdrop = document.getElementById("experiments-config-backdrop");
  const closeBtn = document.getElementById("experiments-config-close");
  if (!panel || !backdrop) return { open: () => {}, close: () => {} };

  let open = false;
  let escHandler;

  const syncSwitchUi = () => {
    const state = readExperimentState();
    panel.querySelectorAll("[data-experiment-id]").forEach((btn) => {
      const id = btn.getAttribute("data-experiment-id");
      const enabled = isExperimentEnabled(id, state);
      btn.setAttribute("aria-checked", enabled ? "true" : "false");
    });
  };

  const setExperimentEnabled = (id, enabled) => {
    const experiment = EXPERIMENT_DEFINITIONS.find((item) => item.id === id);
    if (!experiment) return;

    const previousState = readExperimentState();
    const activeId = enabled ? id : null;
    const nextState = {};

    EXPERIMENT_DEFINITIONS.forEach((item) => {
      const nextEnabled = activeId === item.id;
      const wasEnabled = isExperimentEnabled(item.id, previousState);
      nextState[item.id] = nextEnabled;

      if (nextEnabled !== wasEnabled) {
        item.apply(nextEnabled);
        window.dispatchEvent(
          new CustomEvent("housing:experiment-change", {
            detail: { id: item.id, enabled: nextEnabled, name: item.name, platform: item.platform },
            bubbles: true,
          })
        );
      }
    });

    writeExperimentState(nextState);
    syncSwitchUi();

    if (enabled) {
      toast.show(`${experiment.name} is turned on`);
    }
  };

  const closePanel = () => {
    if (!open) return;
    open = false;
    panel.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      escHandler = undefined;
    }
    window.setTimeout(() => {
      panel.setAttribute("hidden", "");
    }, 340);
  };

  const openPanel = () => {
    if (open) return;
    open = true;
    syncSwitchUi();
    panel.removeAttribute("hidden");
    panel.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        panel.classList.add("is-open");
        backdrop.classList.add("is-visible");
      });
    });
    escHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", escHandler);
  };

  closeBtn?.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  panel.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-experiment-id]");
    if (!toggle) return;
    const id = toggle.getAttribute("data-experiment-id");
    const nextEnabled = toggle.getAttribute("aria-checked") !== "true";
    setExperimentEnabled(id, nextEnabled);
  });

  syncSwitchUi();

  return { open: openPanel, close: closePanel };
}

function initExperimentsBrandGesture(openPanel) {
  const brand = document.querySelector(".site-header__brand");
  if (!brand) return;

  let lastTapAt = 0;
  let openLock = false;

  const safeOpen = () => {
    if (openLock) return;
    openLock = true;
    openPanel();
    window.setTimeout(() => {
      openLock = false;
    }, 500);
  };

  const onActivateAttempt = (event) => {
    const now = Date.now();
    const isDouble = now - lastTapAt < 450;

    if (isDouble) {
      event.preventDefault();
      event.stopPropagation();
      lastTapAt = 0;
      safeOpen();
      return;
    }

    lastTapAt = now;
  };

  // Desktop / inspect mode — native double-click.
  brand.addEventListener("dblclick", (event) => {
    event.preventDefault();
    event.stopPropagation();
    lastTapAt = 0;
    safeOpen();
  });

  // Block homepage reload so the second click/tap can register.
  brand.addEventListener("click", (event) => {
    event.preventDefault();
    onActivateAttempt(event);
  });
}

export function initExperiments() {
  const app = document.getElementById("app");
  if (app?.dataset.page !== "home") return;

  app.insertAdjacentHTML("beforeend", experimentsConfigHtml());

  applyAllExperiments();
  const toast = initExperimentsToast();
  const panel = initExperimentsPanel(toast);
  initExperimentsBrandGesture(panel.open);
}
