import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { initPdpCompare } from "./pdp-compare.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Minimal PDP compare markup (matches pdp.html structure). */
function compareSectionHtml() {
  return `
    <section class="pdp-compare" id="pdp-compare-section">
      <div class="pdp-compare__pills-host" id="pdp-compare-pills-host"></div>
      <div class="pdp-compare__matrix-outer" id="pdp-compare-matrix-outer">
        <div class="pdp-compare__matrix-host" id="pdp-compare-matrix-host"></div>
        <div class="pdp-compare__loading" id="pdp-compare-loading" hidden>
          <p class="pdp-compare__loading-text">Updating comparison…</p>
        </div>
      </div>
    </section>`;
}

/**
 * Styles required for the loading overlay contract (mirrors base.css).
 * Without [hidden] + !important, `display:flex` keeps the skeleton visible.
 */
function injectCompareLoadingCss() {
  const style = document.createElement("style");
  style.textContent = `
    .pdp-compare__matrix-outer { position: relative; min-height: 8rem; padding: 1rem; }
    .pdp-compare__matrix-host { position: relative; z-index: 0; }
    .pdp-compare__loading {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.88);
    }
    .pdp-compare__loading[hidden] {
      display: none !important;
    }
    .pdp-compare__matrix-outer.is-loading .pdp-compare__matrix-host {
      opacity: 0.35;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

describe("PDP compare loading overlay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("base.css keeps [hidden] stronger than display:flex on the loading layer", () => {
    const basePath = join(__dirname, "styles", "base.css");
    const css = readFileSync(basePath, "utf8");
    expect(css).toMatch(/\.pdp-compare__loading\[hidden\]/);
    expect(css).toMatch(/display:\s*none\s*!important/);
  });

  it("loading is not displayed when hidden after init", () => {
    document.body.innerHTML = compareSectionHtml();
    injectCompareLoadingCss();
    initPdpCompare();
    const loading = document.getElementById("pdp-compare-loading");
    expect(loading?.hidden).toBe(true);
    expect(getComputedStyle(/** @type {HTMLElement} */ (loading)).display).toBe("none");
  });

  it("shows overlay during matrix refresh then hides again", () => {
    vi.useFakeTimers();
    document.body.innerHTML = compareSectionHtml();
    injectCompareLoadingCss();
    initPdpCompare();

    const loading = document.getElementById("pdp-compare-loading");
    const removeLodha = document.querySelector('[data-compare-remove="lodha"]');
    expect(removeLodha).toBeTruthy();

    removeLodha.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(loading?.hidden).toBe(false);
    expect(getComputedStyle(/** @type {HTMLElement} */ (loading)).display).not.toBe("none");

    vi.advanceTimersByTime(500);

    expect(loading?.hidden).toBe(true);
    expect(getComputedStyle(/** @type {HTMLElement} */ (loading)).display).toBe("none");
    expect(document.getElementById("pdp-compare-matrix-outer")?.classList.contains("is-loading")).toBe(
      false,
    );
  });

  it("renders comparison table on init", () => {
    document.body.innerHTML = compareSectionHtml();
    injectCompareLoadingCss();
    initPdpCompare();
    const matrix = document.getElementById("pdp-compare-matrix-host");
    expect(matrix?.querySelector("table.pdp-compare-matrix")).toBeTruthy();
    expect(matrix?.textContent).toContain("Raheja Vivarea");
    expect(matrix?.textContent).toContain("Lodha World Towers");
  });
});
