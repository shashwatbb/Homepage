/**
 * Entry for buy.html — dedicated route for building mobile Buy.
 * Top fold UI is mobile-only (see buy-mobile-topfold.css); Projects PDP is untouched.
 */
import "./styles/base.css";
import "./styles/buy-mobile-shell.css";
import "./styles/buy-mobile-topfold.css";

requestAnimationFrame(() => {
  requestAnimationFrame(() => document.documentElement.classList.remove("no-fouc"));
});

const MQ_MOBILE = "(max-width: 47.99rem)";

function initBuyMobileTopfoldChrome() {
  const back = document.getElementById("buy-m-back-btn");
  const shortlist = document.getElementById("buy-m-shortlist-btn");
  const share = document.getElementById("buy-m-share-btn");
  const phone = document.getElementById("buy-m-phone-btn");

  back?.addEventListener("click", () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign("/");
  });

  shortlist?.addEventListener("click", () => {
    const on = shortlist.getAttribute("aria-pressed") === "true";
    shortlist.setAttribute("aria-pressed", on ? "false" : "true");
    shortlist.classList.toggle("is-saved", !on);
  });

  share?.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
  });

  phone?.addEventListener("click", () => {
    /* Call CTA — wire to listing number when Buy PDP has data */
  });
}

initBuyMobileTopfoldChrome();

/** ⌘⌥I / Ctrl+⌥I — scroll to shortcut block (same chord as homepage → this page). */
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
    document.getElementById("buy-shortcut")?.scrollIntoView({ behavior: "smooth", block: "center" });
  },
  true
);

if (window.location.hash === "#buy-shortcut") {
  requestAnimationFrame(() => {
    document.getElementById("buy-shortcut")?.scrollIntoView({ block: "center" });
  });
}
