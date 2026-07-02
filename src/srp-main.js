// SRP (Search Results Page) entry.
// Mobile-first sticky search + results using Bricks DS.
import "./styles/base.css";
import "./components/SrpSearch.css";
import magnifyingGlassUrl from "./assets/icons/magnifying-glass.svg";
import sortUrl from "./assets/icons/sort-ascending.svg";
import slidersUrl from "./assets/icons/sliders-horizontal.svg";
import aiLogoUrl from "./assets/icons/ai-logo.png";

document.addEventListener("DOMContentLoaded", () => {
  // Render sticky search component
  const searchRoot = document.getElementById("claude-root");
  if (searchRoot) {
    searchRoot.innerHTML = `
      <div class="srp-search-container">
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
                <img src="${slidersUrl}" alt="" class="srp-filter-icon" />
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
      </div>
    `;
  }

  // Keep results section blank for now
  const resultsContainer = document.getElementById("srp-results");
  if (resultsContainer) {
    resultsContainer.innerHTML = "";
  }
});
