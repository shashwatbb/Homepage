import "./main.js";
import { initPdpCompare } from "./pdp-compare.js";

const PDP_AREA_RANGE_SQFT = { min: 1125, max: 5250 };

function formatAreaRangeEnIn(minVal, maxVal) {
  const fmt = n => Math.round(n).toLocaleString("en-IN");
  return `${fmt(minVal)} – ${fmt(maxVal)}`;
}

const PDP_AREA_UNITS = [
  {
    key: "sqft",
    label: "sq.ft",
    format: () => formatAreaRangeEnIn(PDP_AREA_RANGE_SQFT.min, PDP_AREA_RANGE_SQFT.max),
  },
  {
    key: "sqm",
    label: "sq.m",
    format: () => {
      const toSqm = s => s * 0.09290304;
      const r = n => Math.round(n * 10) / 10;
      return `${r(toSqm(PDP_AREA_RANGE_SQFT.min))} – ${r(toSqm(PDP_AREA_RANGE_SQFT.max))}`;
    },
  },
  {
    key: "sqyd",
    label: "sq.yd",
    format: () =>
      formatAreaRangeEnIn(PDP_AREA_RANGE_SQFT.min / 9, PDP_AREA_RANGE_SQFT.max / 9),
  },
];

function initPdpAreaUnit() {
  const valueEl = document.getElementById("pdp-area-range");
  const toggle = document.getElementById("pdp-unit-toggle");
  if (!valueEl || !toggle) return;

  let i = 0;

  const apply = () => {
    const u = PDP_AREA_UNITS[i];
    valueEl.textContent = u.format();
    toggle.textContent = u.label;
    toggle.setAttribute("aria-label", `Area unit: ${u.label}. Click to switch unit.`);
  };

  apply();

  toggle.addEventListener("click", () => {
    i = (i + 1) % PDP_AREA_UNITS.length;
    apply();
  });
}

function initPdpShortlistToast() {
  const root = document.getElementById("pdp-shortlist-toast");
  const dismissBtn = document.getElementById("pdp-shortlist-toast-dismiss");
  if (!root || !dismissBtn) return { show: () => {} };

  const TRANS_MS = 220;
  let autoTimer;

  const hide = () => {
    window.clearTimeout(autoTimer);
    root.classList.remove("is-visible");
    root.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      root.setAttribute("hidden", "");
    }, TRANS_MS);
  };

  const show = () => {
    window.clearTimeout(autoTimer);
    root.removeAttribute("hidden");
    root.removeAttribute("aria-hidden");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.add("is-visible");
      });
    });
    autoTimer = window.setTimeout(hide, 2000);
  };

  dismissBtn.addEventListener("click", hide);

  return { show };
}

function initPdpFaq() {
  const root = document.querySelector(".pdp-faq");
  if (!root) return;

  root.querySelectorAll(".pdp-faq__trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".pdp-faq__item");
      if (!item) return;

      const wasOpen = item.classList.contains("is-open");

      root.querySelectorAll(".pdp-faq__item").forEach(i => {
        i.classList.remove("is-open");
        const t = i.querySelector(".pdp-faq__trigger");
        t?.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initPdpHeroActions() {
  const saveBtn = document.getElementById("pdp-save-btn");
  const sidebarSaveBtn = document.getElementById("sidebar-save-btn");
  if (!saveBtn && !sidebarSaveBtn) return;

  const shortlistToast = initPdpShortlistToast();

  const toggleSaveState = (isSaved) => {
    if (saveBtn) {
      saveBtn.setAttribute("aria-pressed", String(isSaved));
      saveBtn.classList.toggle("is-saved", isSaved);
      saveBtn.setAttribute("aria-label", isSaved ? "Remove from saved listings" : "Save this listing");
    }
    if (sidebarSaveBtn) {
      sidebarSaveBtn.setAttribute("aria-pressed", String(isSaved));
    }
  };

  saveBtn?.addEventListener("click", () => {
    const isSavedNow = saveBtn.getAttribute("aria-pressed") !== "true";
    toggleSaveState(isSavedNow);
    if (isSavedNow) shortlistToast?.show();
  });

  sidebarSaveBtn?.addEventListener("click", () => {
    const isSavedNow = sidebarSaveBtn.getAttribute("aria-pressed") !== "true";
    toggleSaveState(isSavedNow);
    if (isSavedNow) shortlistToast?.show();
  });
}

function initPdpShareSheet() {
  const sheet = document.getElementById("pdp-share-sheet");
  const shareBtn = document.getElementById("pdp-share-btn");
  if (!sheet || !shareBtn) return;

  const scrim = document.getElementById("pdp-share-sheet-scrim");
  const closeBtn = document.getElementById("pdp-share-sheet-close");
  const CLOSE_MS = 480;

  let escHandler;
  let closeTimer;

  const syncPreview = () => {
    const foldTitle = document.querySelector(".pdp-topfold__title");
    const foldLoc = document.querySelector(".pdp-topfold__location");
    const foldBy = document.querySelector(".pdp-topfold__byline");
    const foldThumb = document.querySelector(".pdp-topfold-gallery__grid .pdp-topfold-gallery__img");
    const tEl = document.getElementById("pdp-share-sheet-prop-title");
    const lEl = document.getElementById("pdp-share-sheet-prop-loc");
    const dEl = document.getElementById("pdp-share-sheet-prop-dev");
    const thEl = document.getElementById("pdp-share-sheet-thumb");
    if (tEl && foldTitle) tEl.textContent = foldTitle.textContent.trim();
    if (lEl && foldLoc) lEl.textContent = foldLoc.textContent.trim();
    if (dEl && foldBy) {
      dEl.textContent = foldBy.textContent.trim();
      dEl.setAttribute("href", "#");
    }
    const src = foldThumb?.getAttribute("src");
    if (thEl && src) thEl.setAttribute("src", src);
  };

  const getShareContext = () => {
    const url = window.location.href;
    const title =
      document.querySelector(".pdp-topfold__title")?.textContent?.trim() ||
      document.title ||
      "Property";
    return { url, title, text: `${title} — ${url}` };
  };

  const closeSheet = () => {
    if (!sheet.classList.contains("is-visible")) return;
    sheet.classList.remove("is-visible");
    document.documentElement.style.overflow = "";
    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      escHandler = undefined;
    }
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      sheet.setAttribute("hidden", "");
    }, CLOSE_MS);
  };

  const openSheet = () => {
    if (sheet.classList.contains("is-visible")) return;
    syncPreview();
    sheet.removeAttribute("hidden");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        sheet.classList.add("is-visible");
        document.documentElement.style.overflow = "hidden";
        closeBtn?.focus();
      });
    });
    escHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSheet();
      }
    };
    document.addEventListener("keydown", escHandler);
  };

  shareBtn.addEventListener("click", () => {
    openSheet();
  });

  scrim?.addEventListener("click", closeSheet);
  closeBtn?.addEventListener("click", closeSheet);

  sheet.querySelectorAll("[data-share-action]").forEach(actionBtn => {
    actionBtn.addEventListener("click", () => {
      const action = actionBtn.getAttribute("data-share-action");
      const { url, title, text } = getShareContext();
      const encUrl = encodeURIComponent(url);
      const encTitle = encodeURIComponent(title);
      const encText = encodeURIComponent(text);

      const run = async () => {
        switch (action) {
          case "copy":
            try {
              if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
              }
            } catch {
              /* clipboard blocked */
            }
            break;
          case "email":
            window.location.href = `mailto:?subject=${encTitle}&body=${encText}`;
            break;
          case "whatsapp":
            window.open(`https://api.whatsapp.com/send?text=${encText}`, "_blank", "noopener,noreferrer");
            break;
          case "messenger":
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encUrl}`, "_blank", "noopener,noreferrer");
            break;
          case "twitter":
            window.open(
              `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`,
              "_blank",
              "noopener,noreferrer",
            );
            break;
          case "facebook":
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encUrl}`, "_blank", "noopener,noreferrer");
            break;
          default:
            break;
        }
      };
      void run();
      closeSheet();
    });
  });
}

function initPdpViewAllPhotos() {
  const btn = document.getElementById("pdp-view-all-photos-btn");
  const gallery = document.querySelector(".pdp-topfold__gallery");
  if (!btn || !gallery) return;

  btn.addEventListener("click", () => {
    gallery.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function initPdpFloorplans() {
  const tabs = document.querySelectorAll(".pdp-floorplans__tab");
  const cards = document.querySelectorAll(".pdp-floorplan-card");
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("pdp-floorplans__tab--active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("pdp-floorplans__tab--active");
      tab.setAttribute("aria-selected", "true");

      const filter = tab.dataset.tab;

      cards.forEach(card => {
        if (filter === "all" || card.dataset.config === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });

      // Sync Investment Insights values
      const currentLabel = document.getElementById("pdp-insights-current-label");
      const currentVal = document.getElementById("pdp-insights-current-val");
      const projectedVal = document.getElementById("pdp-insights-projected-val");
      const gainVal = document.getElementById("pdp-insights-gain-val");
      
      if (filter === "4bhk") {
        if (currentLabel) currentLabel.textContent = "Current value (4 BHK)";
        if (currentVal) currentVal.textContent = "₹2.10 Cr";
        if (projectedVal) projectedVal.textContent = "₹2.48 Cr";
        if (gainVal) gainVal.textContent = "₹38 Lakhs";
      } else {
        if (currentLabel) currentLabel.textContent = "Current value (3 BHK)";
        if (currentVal) currentVal.textContent = "₹1.40 Cr";
        if (projectedVal) projectedVal.textContent = "₹1.65 Cr";
        if (gainVal) gainVal.textContent = "₹25 Lakhs";
      }
    });
  });
}

function initPdpLeadForm() {
  const form = document.getElementById("pdp-lead-form");
  if (!form) return;

  const inputs = form.querySelectorAll(".pdp-lead-form__input");
  const submitBtn = document.getElementById("lead-submit-btn");
  const successMsg = document.getElementById("lead-success-msg");

  const validateInput = (input) => {
    const group = input.closest(".pdp-lead-form__group");
    let isValid = true;

    if (input.required && !input.value.trim()) {
      isValid = false;
    } else if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(input.value.trim());
    } else if (input.type === "tel") {
      const phoneRegex = /^[0-9]{10}$/;
      isValid = phoneRegex.test(input.value.trim().replace(/\D/g, ""));
    }

    if (isValid) {
      group.classList.remove("is-invalid");
    } else {
      group.classList.add("is-invalid");
    }

    return isValid;
  };

  inputs.forEach(input => {
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") {
        validateInput(input);
      }
    });

    input.addEventListener("input", () => {
      const group = input.closest(".pdp-lead-form__group");
      if (group.classList.contains("is-invalid")) {
        group.classList.remove("is-invalid");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const isValid = validateInput(input);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) {
        // Trigger gentle shake animation
        firstInvalidInput.classList.remove("pdp-shake");
        void firstInvalidInput.offsetWidth; // Force reflow
        firstInvalidInput.classList.add("pdp-shake");
        firstInvalidInput.focus();

        // Clean up shake class after animation completes
        firstInvalidInput.addEventListener("animationend", () => {
          firstInvalidInput.classList.remove("pdp-shake");
        }, { once: true });
      }
      return;
    }

    submitBtn.disabled = true;
    const spinner = submitBtn.querySelector(".pdp-lead-form__submit-spinner");
    const text = submitBtn.querySelector(".pdp-lead-form__submit-text");
    if (spinner) spinner.removeAttribute("hidden");
    if (text) text.style.opacity = "0.2";

    setTimeout(() => {
      const wrapper = form.closest(".pdp-lead-card__form-wrapper");
      if (wrapper) {
        wrapper.style.display = "none";
        wrapper.setAttribute("aria-hidden", "true");
      } else {
        form.style.display = "none";
        form.setAttribute("aria-hidden", "true");
      }
      successMsg.style.display = "block";
      successMsg.removeAttribute("hidden");
      successMsg.setAttribute("aria-hidden", "false");
    }, 1200);
  });
}

function initPdpAboutToggle() {
  const toggleBtn = document.getElementById("pdp-about-toggle");
  const moreText = document.getElementById("pdp-about-more");
  if (!toggleBtn || !moreText) return;

  const btnText = toggleBtn.querySelector(".pdp-about__toggle-text");

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      moreText.hidden = true;
      toggleBtn.setAttribute("aria-expanded", "false");
      if (btnText) btnText.textContent = "Show more";
    } else {
      moreText.removeAttribute("hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (btnText) btnText.textContent = "Show less";
    }
  });
}

function initPdpReviewsScroller() {
  const track = document.getElementById("pdp-reviews-track");
  const nextBtn = document.getElementById("pdp-reviews-scroll-next");
  const prevBtn = document.getElementById("pdp-reviews-scroll-prev");
  if (!track || !nextBtn || !prevBtn) return;

  const getScrollAmount = () => {
    const card = track.querySelector(".pdp-reviews-card");
    if (!card) return 300;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
    return Math.round(card.getBoundingClientRect().width + gap);
  };

  const updateNav = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const noOverflow = maxScroll <= 2;
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= maxScroll - 2;

    prevBtn.classList.toggle("is-hidden", noOverflow || atStart);
    nextBtn.classList.toggle("is-hidden", noOverflow || atEnd);
  };

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("resize", updateNav);
  updateNav();
}

function initPdpReviewsScroll() {
  document.querySelectorAll("#pdp-rating-badge, #pdp-rating-badge-fold").forEach(badge => {
    badge.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("pdp-reviews-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initPdpEmiModal() {
  const card = document.getElementById("pdp-paymentplan-card");
  const modal = document.getElementById("pdp-emi-modal");
  const closeBtn = document.getElementById("pdp-emi-modal-close");
  if (!card || !modal || !closeBtn) return;

  // Open modal
  card.addEventListener("click", () => {
    modal.removeAttribute("hidden");
    setTimeout(() => {
      modal.classList.add("is-visible");
    }, 10);
    document.documentElement.style.overflow = "hidden";
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove("is-visible");
    document.documentElement.style.overflow = "";
    setTimeout(() => {
      modal.setAttribute("hidden", "");
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Calculator inputs
  const tab3bhk = document.getElementById("emi-tab-3bhk");
  const tab4bhk = document.getElementById("emi-tab-4bhk");
  const downPaymentSlider = document.getElementById("emi-slider-downpayment");
  const tenureSlider = document.getElementById("emi-slider-tenure");
  const interestSlider = document.getElementById("emi-slider-interest");

  // Output readouts
  const downPaymentValueEl = document.getElementById("emi-val-downpayment");
  const tenureValueEl = document.getElementById("emi-val-tenure");
  const interestValueEl = document.getElementById("emi-val-interest");
  const monthlyEmiEl = document.getElementById("emi-calc-monthly");
  const summaryEl = document.getElementById("emi-calc-summary");

  let propertyPrice = 14000000; // default 3 BHK: 1.4 Cr

  // Calculate EMI
  const calculateEMI = () => {
    const downPaymentPercent = parseFloat(downPaymentSlider.value);
    const tenureYears = parseInt(tenureSlider.value);
    const interestRateAnnual = parseFloat(interestSlider.value);

    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPaymentAmount;

    // Monthly interest rate
    const r = (interestRateAnnual / 12) / 100;
    // Number of monthly installments
    const n = tenureYears * 12;

    let monthlyEMI = 0;
    if (r > 0) {
      monthlyEMI = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    } else {
      monthlyEMI = loanAmount / n;
    }

    // Format output values
    const formatCroreLakh = (amount) => {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      } else {
        return `₹${(amount / 100000).toFixed(1)} Lakh`;
      }
    };

    const formatEmi = (emi) => {
      if (emi >= 100000) {
        return `₹${(emi / 100000).toFixed(2)} L/mo`;
      } else {
        return `₹${(emi / 1000).toFixed(1)} K/mo`;
      }
    };

    // Update displays
    if (downPaymentValueEl) {
      downPaymentValueEl.innerHTML = `${formatCroreLakh(downPaymentAmount)} (${downPaymentPercent}%)`;
    }
    if (tenureValueEl) {
      tenureValueEl.textContent = `${tenureYears} Years`;
    }
    if (interestValueEl) {
      interestValueEl.textContent = `${interestRateAnnual}%`;
    }
    if (monthlyEmiEl) {
      monthlyEmiEl.textContent = formatEmi(monthlyEMI);
    }
    if (summaryEl) {
      summaryEl.innerHTML = `Principal Loan Amount: <strong>${formatCroreLakh(loanAmount)}</strong>`;
    }
  };

  // Switch tabs
  const setTab = (activeTab, inactiveTab, price) => {
    activeTab.classList.add("pdp-floorplans__tab--active");
    activeTab.setAttribute("aria-selected", "true");
    inactiveTab.classList.remove("pdp-floorplans__tab--active");
    inactiveTab.setAttribute("aria-selected", "false");
    propertyPrice = price;
    calculateEMI();
  };

  tab3bhk?.addEventListener("click", () => setTab(tab3bhk, tab4bhk, 14000000));
  tab4bhk?.addEventListener("click", () => setTab(tab4bhk, tab3bhk, 21000000));

  // Bind slider input events
  downPaymentSlider?.addEventListener("input", calculateEMI);
  tenureSlider?.addEventListener("input", calculateEMI);
  interestSlider?.addEventListener("input", calculateEMI);

  // Initial calculation
  calculateEMI();
}

function initPdpPage() {
  initPdpHeroActions();
  initPdpFaq();
  initPdpShareSheet();
  initPdpViewAllPhotos();
  initPdpAreaUnit();
  initPdpFloorplans();
  initPdpLeadForm();
  initPdpAboutToggle();
  initPdpReviewsScroll();
  initPdpReviewsScroller();
  initPdpEmiModal();
  initPdpCompare();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPdpPage, { once: true });
} else {
  initPdpPage();
}
