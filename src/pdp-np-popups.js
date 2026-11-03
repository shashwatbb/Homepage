// Desktop NP PDP pop-ups + cases from Figma PDP [Demand] (Desktop: NP PDP section 3602:23537):
// About (Read more), Payment plan, Price insights, Amenities, Share, Ask a question (+ submitted), Compare (full
// screen), shortlisted / contacted toasts, RERA tooltip, Contacted state. Motion = Airbnb modal (modal-motion.css).
import "./styles/pdp-np-popups.css";
import "./styles/modal-motion.css";
import { PDP_NP_ICONS as I } from "./data/pdpNpDesktopIcons.js";
import { openCrf } from "./crf-dweb.js";

const B = import.meta.env.BASE_URL;
const img = (p) => `${B}${p}`;
const sep = `<span class="pnp-sep" aria-hidden="true"></span>`;
let root, box, lastFocus, closeTimer;

function shell() {
  root = document.createElement("div");
  root.className = "npp";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.innerHTML = `<div class="npp__box" tabindex="-1"></div>`;
  box = root.firstElementChild;
  root.addEventListener("click", (e) => {
    if (e.target === root) return close();
    const a = e.target.closest("[data-npp]"); if (!a) return;
    const act = a.dataset.npp;
    if (act === "close") return close();
    if (act === "contact") { close(); return setTimeout(openCrf, 260); }
    if (act === "tab" || act === "pill" || act === "chip") { if (act !== "chip") a.parentElement.querySelectorAll(".is-on").forEach((x) => x.classList.remove("is-on")); a.classList.toggle("is-on", act !== "chip" || !a.classList.contains("is-on")); return; }
    if (act === "ask") return render("asked");
    if (act === "add") { const t = a.querySelector("span").textContent; const chips = box.querySelector(".npp__cchips"); [...chips.children].forEach((c) => { if (c.textContent.trim() === t) c.remove(); }); chips.insertAdjacentHTML("afterbegin", `<button type="button" class="npp__cchip is-on">${t}${I.xCircleFill}</button>`); box.querySelector(".npp__drop").hidden = true; return; }
    if (act === "copy") { navigator.clipboard?.writeText(location.href).catch(() => {}); a.querySelector("span").textContent = "Link copied"; return; }
  });
  root.addEventListener("focusin", (e) => { if (e.target.matches("[data-npp-search]")) box.querySelector(".npp__drop").hidden = false; });
  root.addEventListener("focusout", (e) => { if (e.target.matches("[data-npp-search]")) setTimeout(() => { const d = box.querySelector(".npp__drop"); if (d && !box.contains(document.activeElement)) d.hidden = true; }, 150); });
  root.addEventListener("click", (e) => { if (e.target.matches("[data-npp-search]")) box.querySelector(".npp__drop").hidden = false; });
  root.addEventListener("input", (e) => { if (e.target.matches("[data-npp-search]")) box.querySelector(".npp__drop").hidden = false; });
  root.addEventListener("input", (e) => { if (e.target.matches("textarea")) { const n = e.target.value.length; box.querySelector(".npp__count").textContent = `${n}/250`; box.querySelector("[data-npp=ask]").disabled = !n; } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("is-visible")) close(); });
  document.body.appendChild(root);
}

const head = (title, back) => `<header class="npp__head">${back ? `<button type="button" class="npp__x" data-npp="close" aria-label="Back">${I.arrowLeft || I.caretRight}</button>` : ""}<h2>${title}</h2><button type="button" class="npp__x" data-npp="close" aria-label="Close">${I.x || "×"}</button></header>`;
const foot = (label) => `<footer class="npp__foot"><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--auto pnp-btn--l" data-npp="contact">${label}</button></footer>`;

const AMEN = [["gazebo", "Gazebo"], ["sprinkler", "Fire sprinklers"], ["pingPong", "Table tennis"], ["medical", "Medical store"], ["drop", "Water softener plant"], ["medical", "Medical store"], ["gazebo", "Gazebo"], ["sprinkler", "Fire sprinklers"]];

const V = {
  about: () => ({ w: 740, h: 700, html: `${head("About this property")}<div class="npp__body npp__prose">
    <p>Welcome to our exceptional 3-bedroom, 3-bathroom apartment in prestigious Nine Elms. Stylish, spacious, and finished to a high standard, this elegant home sleeps up to 6 guests and features a beautiful private outdoor terrace. Perfect for families, business travellers, or groups, it offers a premium London stay in a modern riverside neighbourhood, with excellent transport links, a peaceful residential setting, and easy access to Battersea, Westminster, and top attractions.</p>
    <p>The space<br>Sleeping Arrangements - Sleeps up to 6 guests:</p>
    <p>Bedroom 1: 1 King bed, sleeps 2<br>Bedroom 2: 1 King bed, sleeps 2<br>Bedroom 3: 1 King bed, sleeps 2</p>
    <p>Bathroom 1: Full bathroom with shower, toilet and sink.<br>Bathroom 2: Full bathroom with shower, toilet and sink.<br>Bathroom 3: Full bathroom with shower/bath, toilet and sink.</p>
    <p>All bedrooms include premium bedding and storage space for a restful and comfortable stay.</p>
    <p>We provide fresh towels, a hairdryer, and a starter supply of toiletries such as shampoo, shower gel, and toilet paper to make your arrival comfortable.</p>
    <p>In the living area, enjoy a large Smart TV, fast WIFI, and a spacious open-plan layout ideal for relaxing, dining, or working. The apartment also benefits from a beautiful private outdoor terrace, creating a bright and stylish space to enjoy during your stay.</p>
    <p>The apartment includes a fully equipped kitchen with everything you need for a comfortable stay, from cookware to a dishwasher and coffee machine.</p></div><div class="npp__fade"></div>` }),

  payment: () => ({ w: 600, h: 720, html: `${head("Payment plan")}
    <div class="pnp-tabs npp__tabs" role="tablist">${["2 BHK", "3 BHK", "4 BHK"].map((t, i) => `<button type="button" class="${i ? "" : "is-on"}" data-npp="tab">${t}</button>`).join("")}</div>
    <div class="npp__body npp__stack">
      <div class="pnp-pills"><button type="button" class="pnp-pill" data-npp="pill">1270 sq.ft.</button><button type="button" class="pnp-pill is-on" data-npp="pill">1438 sq.ft.</button></div>
      <div class="npp__card"><div class="npp__trio">${[["Loan amount", "₹80  L"], ["Interest", "7.5%"], ["Duration", "30 yrs"]].map(([k, v]) => `<div><p class="pnp-muted--md">${k}</p><p class="npp__v">${v}</p></div>`).join("")}</div><div class="npp__row npp__row--rule"><span>Property price</span><b>₹1 Cr</b></div></div>
      <div class="npp__card"><div class="npp__row"><b>Booking amount</b><b>₹10 L</b></div><p class="pnp-muted--md">To be paid by buyer, not bank</p></div>
      <div class="npp__card"><div class="npp__row npp__row--head"><span>Payment stages</span><span class="pnp-muted--md">EMI</span></div>
        ${[["First EMI", "₹ 17,480/mo", "Disbursed amount: ₹25 L"], ["Within 60 days", "₹34,961/mo", "Disbursed amount: ₹50 L"], ["On completion", "₹52,441/mo", "Disbursed amount: ₹75 L"]].map(([k, v, s], i) => `<div class="npp__stage ${i ? "is-dim" : ""}"><div class="npp__row"><span>${k}</span><b>${v}</b></div><p class="pnp-muted--md">${s}</p></div>`).join("")}
      </div>
    </div><div class="npp__fade npp__fade--foot"></div>${foot("Contact seller")}` }),

  insights: () => ({ w: 600, h: 720, html: `${head("Price insights")}
    <div class="pnp-tabs npp__tabs" role="tablist"><button type="button" class="is-on" data-npp="tab">Project rates</button><button type="button" data-npp="tab">Locality rates</button></div>
    <div class="npp__body npp__stack">
      <div class="npp__card npp__card--rows">${[["Launch price", "5,250/ sq.ft. (In ‘22)"], ["Current price", "15,300/ sq.ft. (In ‘25)"], ["3Y appreciation", `<span class="pnp-up">${I.arrowUp}18.3%</span>`], ["1Y growth", `<span class="pnp-up">${I.arrowUp}28.3%</span>`]].map(([k, v]) => `<div class="npp__row"><span>${k}</span><b>${v}</b></div>`).join("")}</div>
      <p class="npp__sub">Price trend in Andheri West</p>
      <div class="pnp-pills"><button type="button" class="pnp-pill" data-npp="pill">Last 1 year</button><button type="button" class="pnp-pill is-on" data-npp="pill">Last 3 years</button></div>
      <img class="npp__chart" src="${img("pdp-np/insights-chart.svg")}" alt="Price trend chart" width="552" height="380">
    </div><div class="npp__fade npp__fade--foot"></div>${foot("Invest now")}` }),

  amenities: () => ({ w: 740, h: 648, html: `${head("Amenities")}<div class="npp__body"><ul class="npp__amen">${[...AMEN, ...AMEN].map(([k, t]) => `<li>${I[k]}<span>${t}</span></li>`).join("")}</ul></div><div class="npp__fade"></div>` }),

  share: () => ({ w: 600, h: 394, html: `${head("Share this property")}<div class="npp__body npp__stack">
    <div class="npp__prop"><img src="${img("pdp-gallery/1.png")}" alt="" width="52" height="52"><div><p class="npp__name">Emaar MGF The Palm Drive</p><p class="pnp-meta"><span>Sector 66, Gurgaon</span>${sep}<u>By EMAAR INDIA</u></p></div></div>
    <div class="npp__share">${[["copy", "Copy link"], ["envelope", "Email"], ["whatsapp", "WhatsApp"], ["messenger", "Messenger"], ["xlogo", "X (Twitter)"], ["facebook", "Facebook"]].map(([k, t]) => `<button type="button" data-npp="${k === "copy" ? "copy" : "close"}">${I[k] || I.share}<span>${t}</span></button>`).join("")}</div></div>` }),

  ask: () => ({ w: 600, h: 582, html: `${head("Ask a question")}<div class="npp__body npp__stack">
    <p class="npp__sub">What is it about?</p>
    <div class="npp__chips">${["Price", "Location", "Legal approvals", "Amenities", "Home loans", "Possession", "Configuration"].map((t) => `<button type="button" class="pnp-pill" data-npp="chip">${t}</button>`).join("")}</div>
    <p class="npp__sub">What’s your question?</p>
    <div><textarea maxlength="250" placeholder="Type your question here..." aria-label="Your question"></textarea><p class="npp__count">0/250</p></div>
    <div class="npp__end"><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--auto pnp-btn--l" data-npp="ask" disabled>Ask question</button></div></div>` }),

  compare: () => {
    const cols = [0, 1, 2, 3];
    const row = (k, v) => `<tr><th>${k}</th>${cols.map(() => `<td>${v}</td>`).join("")}</tr>`;
    return { full: true, html: `${head("Compare properties", true)}<div class="npp__body npp__cmp">
      <div class="npp__search"><label>${I.search}<input type="search" placeholder="Search to add properties" aria-label="Search to add properties" data-npp-search></label>
        <ul class="npp__drop" hidden>${["Lodha World Towers", "Lodha Park", "Oberoi Sky City", "Godrej Platinum"].map((t) => `<li><button type="button" data-npp="add"><span>${t}</span>${I.plusCircle}</button></li>`).join("")}</ul></div>
      <div class="npp__cchips"><button type="button" class="npp__cchip is-on">Emaar MGF The Palm Drive${I.xCircleFill}</button><button type="button" class="npp__cchip is-on">Luxurion 75 Residences${I.xCircleFill}</button><button type="button" class="npp__cchip">Lodha World Towers${I.plusCircle}</button></div>
      <div class="npp__ctable"><table><tbody>
        <tr class="npp__ctop"><th>Project</th>${cols.map(() => `<td><img src="${img("Buy card 1.jpg")}" alt="" loading="lazy"><span>Emaar MGF The Palm Drive</span></td>`).join("")}</tr>
        ${row("Address", "KR Pet, Sector 39,<br>Pune")}${row("Possession", "By May, 2028")}${row("BHK", "3 BHK")}${row("Carpet size", "1900 sq.ft.")}${row("Price", "₹2.85 Cr")}
      </tbody></table></div></div>` };
  },

  asked: () => ({ w: 600, h: 570, html: `${head("Ask a question")}<div class="npp__body npp__done"><span class="npp__tick">${I.check}</span><p>Your question has been submitted!</p></div>` }),
};

function render(name) {
  const v = V[name]();
  root.classList.toggle("npp--full", !!v.full);
  box.style.width = v.full ? "" : v.w + "px";
  box.style.height = v.full ? "" : `min(${v.h}px, calc(100vh - 80px))`;
  box.innerHTML = v.html;
  box.dataset.view = name;
}

export function openPopup(name) {
  if (!root) shell();
  clearTimeout(closeTimer);
  lastFocus = document.activeElement;
  render(name);
  root.hidden = false;
  root.classList.remove("mm-closing");
  root.classList.add("is-visible");
  document.documentElement.classList.add("crfd-lock");
  box.focus({ preventScroll: true });
}

function close() {
  root.classList.remove("is-visible");
  root.classList.add("mm-closing");
  closeTimer = setTimeout(() => { root.classList.remove("mm-closing"); root.hidden = true; document.documentElement.classList.remove("crfd-lock"); lastFocus?.focus?.({ preventScroll: true }); }, 250);
}

/* Toasts (Figma Toast 328x44, bottom-left 40/40) */
let toastEl, toastTimer;
export function toast(kind) {
  if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "npt"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
  const t = kind === "liked" ? [I.heartFill || I.heart, "You’ve shortlisted this property"] : [I.thumbsUp || I.check, "Seller will get in touch, shortly!"];
  toastEl.className = "npt npt--" + kind;
  toastEl.innerHTML = `${t[0]}<span>${t[1]}</span><button type="button" aria-label="Dismiss">${I.x || "×"}</button>`;
  toastEl.querySelector("button").onclick = () => toastEl.classList.remove("is-on");
  requestAnimationFrame(() => toastEl.classList.add("is-on"));
  void toastEl.offsetHeight; toastEl.classList.add("is-on");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 3500);
}

/* RERA tooltip (Figma Tooltip 219x211) */
function reraTip(anchor) {
  let tip = document.querySelector(".npr");
  if (tip) { tip.remove(); return; }
  tip = document.createElement("div");
  tip.className = "npr";
  tip.innerHTML = `<button type="button" aria-label="Close">${I.x || "×"}</button><img src="${img("pdp-footer/qr.png")}" alt="RERA QR code" width="60" height="60"><p class="npr__t">Scan code to check RERA status</p><p>Phase: Rustomjee</p><p>Status: Registered</p><a href="https://maharerait.gov.in/" target="_blank" rel="noopener">https://maharerait.gov.in/</a>`;
  document.body.appendChild(tip);
  const r = anchor.getBoundingClientRect();
  tip.style.left = `${Math.round(r.left + r.width / 2 - 110 + window.scrollX)}px`;
  tip.style.top = `${Math.round(r.bottom + 10 + window.scrollY)}px`;
  tip.querySelector("button").onclick = () => tip.remove();
  setTimeout(() => document.addEventListener("click", function off(e) { if (!tip.contains(e.target)) { tip.remove(); document.removeEventListener("click", off); } }), 0);
}

export function initPdpNpPopups() {
  document.addEventListener("click", (e) => {
    const t = e.target;
    const hit = (sel) => t.closest(sel);
    if (hit("#pnp-about [data-action=pnp-readmore]")) { e.stopImmediatePropagation(); return openPopup("about"); }
    if (hit("[data-action=pnp-emi]")) { e.stopImmediatePropagation(); return openPopup("payment"); }
    if (hit("#pnp-insights .pnp-head .pnp-link")) { e.preventDefault(); e.stopImmediatePropagation(); return openPopup("insights"); }
    if (hit("#pnp-amenities .pnp-link")) { e.preventDefault(); e.stopImmediatePropagation(); return openPopup("amenities"); }
    if (hit("#pnp-compare .pnp-cmp-chip")) { e.stopImmediatePropagation(); return openPopup("compare"); }
    if (hit("#pnp-qna [data-action=pnp-contact]")) { e.stopImmediatePropagation(); return openPopup("ask"); }
    if (hit("#pdp-share-btn, [data-action=pnp-share]")) { e.preventDefault(); e.stopImmediatePropagation(); return openPopup("share"); }
    if (hit(".npf__badge:nth-child(2)")) { e.stopImmediatePropagation(); return reraTip(hit(".npf__badge:nth-child(2)")); }
    const like = hit("#pdp-save-btn, [data-action=pnp-like]");
    if (like) { setTimeout(() => { const on = like.getAttribute("aria-pressed") === "true"; if (on) toast("liked"); }, 0); }
  }, true);
  // Contacted state: once the CRF reaches Post CRF, the sticky card + fold CTA show "Contacted" and a toast follows close
  window.addEventListener("crfd:post", () => {
    for (const b of document.querySelectorAll(".pnp-side .pnp-btn--lg, #pdp-contact-btn")) { b.classList.add("is-contacted"); b.innerHTML = `${I.check}<span>Contacted</span>`; }
  });
  window.addEventListener("crfd:closed", (e) => { if (e.detail?.fromPost) toast("contacted"); });
}
