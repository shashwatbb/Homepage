// Desktop NP PDP header, 1:1 with Figma PDP [Demand] 3602:23538 > Headers (Property 1=SRP Header), and the
// "PDP: Scroll" variant: once the first fold scrolls under it, the same 64 bar shows section tabs (active = pill).
import "./styles/pdp-np-header.css";
import { PDP_NP_ICONS as I } from "./data/pdpNpDesktopIcons.js";

const B = import.meta.env.BASE_URL;
const TABS = [["About", "pnp-about"], ["Floor plan and pricing", "pnp-floor"], ["Project plan", "pnp-overview"], ["Payment plan", "pnp-payment"], ["Investment insights", "pnp-insights"], ["Government registry records", "pnp-registry"], ["Amenities", "pnp-amenities"], ["Ratings and reviews", "pnp-reviews"], ["About the developer", "pnp-developers"], ["Explore neighbourhood", "pnp-hood"], ["FAQs", "pnp-faq"]];

const html = () => `
<header class="nph" id="nph">
  <div class="nph__main">
    <div class="nph__left">
      <a href="${B}" class="nph__logo" aria-label="Housing.com home"><img src="${B}pdp-np/housing-logo.svg" alt="Housing.com" width="149" height="20"></a>
      <button type="button" class="nph__loc"><span class="nph__pin">${I.pinDuo}</span><span>Mumbai</span>${I.caretDown}</button>
    </div>
    <div class="nph__search" role="search">
      <button type="button" class="nph__svc">Buy${I.caretDown}</button><span class="nph__line" aria-hidden="true"></span>
      <input type="search" placeholder="What are you looking for?" aria-label="Search">
      <button type="button" class="nph__go" aria-label="Search">${I.search}</button>
    </div>
    <div class="nph__right">
      <button type="button" class="nph__login">Login</button>
      <button type="button" class="nph__post">Post property<span>FREE</span></button>
      <button type="button" class="nph__menu" aria-label="Menu">${I.list}</button>
    </div>
  </div>
  <nav class="nph__tabs" aria-label="Sections">${TABS.map(([t, id], i) => `<a href="#${id}" class="${i ? "" : "is-on"}" data-target="${id}">${t}</a>`).join("")}</nav>
</header>`;

export function initPdpNpHeader() {
  const old = document.querySelector("header.site-header");
  if (!old || document.getElementById("nph")) return;
  old.insertAdjacentHTML("beforebegin", html());
  old.classList.add("nph-hidden");
  const bar = document.getElementById("nph");
  const fold = document.querySelector(".npf");
  const tabs = [...bar.querySelectorAll(".nph__tabs a")];
  const targets = () => tabs.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
  const update = () => {
    const scrolled = fold ? fold.getBoundingClientRect().bottom < 64 : window.scrollY > 600;
    bar.classList.toggle("is-nav", scrolled);
    if (!scrolled) return;
    let current = tabs[0];
    for (const el of targets()) if (el.getBoundingClientRect().top <= 64 + 24 + 8) current = tabs.find((a) => a.dataset.target === el.id) || current;
    if (!current.classList.contains("is-on")) {
      tabs.forEach((a) => a.classList.toggle("is-on", a === current));
      current.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };
  // direct, time-throttled (rAF can be paused in background tabs; the swap must never lag)
  let last = 0, pending;
  const onScroll = () => { const now = performance.now(); clearTimeout(pending); if (now - last > 50) { last = now; update(); } else pending = setTimeout(update, 60); };
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true, capture: true });
  bar.querySelector(".nph__tabs").addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (!a) return;
    e.preventDefault();
    const el = document.getElementById(a.dataset.target); if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64 - 24;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => { if (Math.abs(window.scrollY - top) > 4) window.scrollTo(0, top); update(); }, 900); // fallback if smooth scroll is paused
  });
  update();
}
