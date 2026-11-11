// Desktop web CRF revamp prototype. Open/close motion = Airbnb modal (src/styles/modal-motion.css), shared with Share + EMI.
// (Figma: CRF [Demand] > ↳ CRF: Desktop, kit "Dweb / CRF revamp / *").
// Phone -> Your details (Buy) -> OTP -> Connecting -> Post CRF, in one 480 modal. Mock data only.
// Prototype shortcuts: OTP "0000" is incorrect, any other 4 digits verify. 2nd open = logged in (skips to
// Connecting), 3rd open = enquiry limit reached.
import "./styles/crf-dweb.css";
import { CRF_DWEB_ICONS as I } from "./data/crfDwebIcons.js";

const IMG = (n) => `${import.meta.env.BASE_URL}crf-dweb/${n}`;
const COUNTRIES = [
  ["India", "+91"], ["United Arab Emirates", "+971"], ["United States", "+1"], ["United Kingdom", "+44"],
  ["Singapore", "+65"], ["Saudi Arabia", "+966"], ["Canada", "+1"], ["Germany", "+49"],
];
const SELLERS = [
  { name: "Rohit Mehra", role: "Agent", phone: "+91 9711663204", photo: "seller.png" },
  { name: "Sneha Kapoor", role: "Agent", phone: "+91 9711663205", photo: "seller2.png" },
  { name: "Amit Verma", role: "Builder", phone: "+91 9711663206", initials: "AV" },
  { name: "Rahul Jain", role: "Agent", phone: "+91 9711663207", initials: "RJ" },
];
// Post CRF Smart deals for you (m-web section, kit Deal card)
const DEALS = [
  { price: "₹1.62 - 1.94 Cr", bhk: "2, 3 BHK", loc: "Sector 92, Gurgaon", size: "1,240 sq.ft.", rate: "₹13.1K/sq.ft.", dev: "DLF Developers", photo: "buy1.png", av: "seller.png" },
  { price: "₹2.10 - 2.48 Cr", bhk: "3 BHK", loc: "Sector 65, Gurgaon", size: "1,610 sq.ft.", rate: "₹13.4K/sq.ft.", dev: "M3M India", photo: "buy2.png", av: "seller2.png" },
  { price: "₹98 L - 1.21 Cr", bhk: "2 BHK", loc: "Sohna Road, Gurgaon", size: "1,080 sq.ft.", rate: "₹9.1K/sq.ft.", dev: "Godrej Properties", photo: "property.png", av: "seller.png" },
];
const HOMES = [
  { price: "₹1.79 Cr", bhk: "2 BHK", type: "Apartment", loc: "Sector 91, Gurgaon", photo: "buy1.png" },
  { price: "₹1.79 Cr", bhk: "2 BHK", type: "Apartment", loc: "Sector 91, Gurgaon", photo: "buy2.png" },
];

const st = { opens: 0 };
let root, card, body, lastFocus, timer;

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fullPhone = () => `${st.cc} ${st.phone}`;
const sep = `<span class="crfd-sep" aria-hidden="true"></span>`;
const head = (title, back) => `
  <header class="crfd-head">
    ${back ? `<button type="button" class="crfd-icon-btn" data-action="crfd-back" aria-label="Back">${I.arrowLeft}</button>` : ""}
    <h2 class="crfd-head__title" id="crfd-title">${title}</h2>
    <button type="button" class="crfd-icon-btn" data-action="crfd-close" aria-label="Close">${I.x}</button>
  </header>`;
const closeOnly = `<button type="button" class="crfd-icon-btn crfd-close-float" data-action="crfd-close" aria-label="Close">${I.x}</button>`;
const hero = `<div class="crfd-hero" aria-hidden="true"><img src="${IMG("heroFull.png")}" alt="" width="430" height="181"></div>`;
const editNum = () => `<button type="button" class="crfd-edit" data-action="crfd-edit-phone"><span>${esc(fullPhone())}</span>${I.pencil}</button>`;
const avatar = (s) => s.photo
  ? `<img class="crfd-avatar" src="${IMG(s.photo)}" alt="" width="40" height="40">`
  : `<span class="crfd-avatar crfd-avatar--initials" aria-hidden="true">${s.initials}</span>`;

const VIEWS = {
  phone() {
    const open = st.ccOpen;
    return `${closeOnly}<div class="crfd-body">
      <div class="crfd-stack-12 crfd-center">${hero}<h2 class="crfd-title-center" id="crfd-title">Connect with sellers instantly!</h2></div>
      <div class="crfd-stack-16"><div class="crfd-field-wrap">
        <div class="crfd-field crfd-field--phone ${st.err ? "is-error" : ""}">
          <button type="button" class="crfd-cc" data-action="crfd-cc" aria-haspopup="listbox" aria-expanded="${!!open}">${st.cc}${I.caretDown}</button>
          ${sep}
          <input class="crfd-input" id="crfd-phone" inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="Phone number" value="${esc(st.phone)}" aria-label="Phone number">
        </div>
        ${open ? `<div class="crfd-dd" role="listbox">${COUNTRIES.map(([n, c]) => `<button type="button" role="option" class="crfd-dd__row ${c === st.cc && n === st.ccName ? "is-selected" : ""}" data-action="crfd-cc-pick" data-cc="${c}" data-name="${n}"><span>${n}</span><span class="crfd-muted">${c}</span></button>`).join("")}</div>` : ""}
        ${st.err ? `<p class="crfd-error">${st.err}</p>` : ""}
      </div>
      <button type="button" class="crfd-btn crfd-btn--primary" data-action="crfd-continue">Continue</button>
      <div class="crfd-or"><span>OR</span></div>
      <button type="button" class="crfd-btn crfd-btn--wa" data-action="crfd-wa">${I.whatsapp}WhatsApp me the details</button></div>
      <p class="crfd-legal">By continuing, you agree to our <a href="#" data-action="crfd-noop">terms and conditions</a></p>
    </div>`;
  },
  details() {
    const g = st.google;
    return `${head("Your details", true)}<div class="crfd-body">
      <div class="crfd-prop">
        <img src="${IMG("property.png")}" alt="" width="40" height="40">
        <div><p class="crfd-strong">Evolvus Phase 1, Sikanderpur</p><p class="crfd-meta"><span>₹2.5 Cr. - 4.53 Cr.</span>${sep}<span>Apartment, Villa</span></p></div>
      </div>
      <div class="crfd-stack-16">
      <div class="crfd-stack-8">
        <h3 class="crfd-h3">Tell us your details</h3>
        <p class="crfd-reach"><img src="${IMG("avatarStack.png")}" alt="" width="54" height="22">Reach sellers like Abhishek +3 others</p>
      </div>
        <div class="crfd-field-wrap"><div class="crfd-field"><input class="crfd-input" id="crfd-name" placeholder="Name" autocomplete="name" value="${esc(st.name)}" aria-label="Name"></div></div>
        <div class="crfd-field-wrap"><div class="crfd-field ${st.err ? "is-error" : ""}"><input class="crfd-input" id="crfd-email" type="email" placeholder="Email" autocomplete="email" value="${esc(st.email)}" aria-label="Email"></div>${st.err ? `<p class="crfd-error">${st.err}</p>` : ""}</div>
        <label class="crfd-check"><input type="checkbox" checked><span class="crfd-check__box">${I.check}</span><span>I agree to be contacted by Housing &amp; other agents via WhatsApp, SMS, phone, email etc.</span></label>
        <button type="button" class="crfd-btn crfd-btn--primary" data-action="crfd-get-otp">Get OTP</button>
        <div class="crfd-edit-row">${editNum()}</div>
      ${g ? "" : `<div class="crfd-or"><span>OR</span></div>
      <div class="crfd-stack-12"><p class="crfd-muted">Use Google to fill details instead</p>
        <button type="button" class="crfd-btn crfd-btn--google" data-action="crfd-google"><img src="${IMG("google.svg")}" alt="" width="16" height="16">Continue with Google</button></div>`}
      </div>
    </div>`;
  },
  otp() {
    const s = st.otpState; // "", "incorrect", "verifying"
    const digits = [0, 1, 2, 3].map((i) => st.otp[i]
      ? `<span class="crfd-otp__d is-in">${st.otp[i]}</span>`
      : `<span class="crfd-otp__d is-empty">-</span>`).join("");
    const resend = st.left > 0
      ? `<p class="crfd-muted">Resend OTP in 00:${String(st.left).padStart(2, "0")}</p>`
      : `<button type="button" class="crfd-link crfd-resend" data-action="crfd-resend">Resend OTP</button>`;
    const callRow = `<div class="crfd-stack-8"><button type="button" class="crfd-call" data-action="crfd-call-wa"><span class="crfd-call__tile">${I.whatsapp}</span><span>Send OTP on <u>WhatsApp</u></span></button>
      <button type="button" class="crfd-call" data-action="crfd-call"><span class="crfd-call__tile">${I.phone}</span><span>Send OTP on <u>call</u></span></button></div>`;
    return `${head("Verify your phone", true)}<div class="crfd-body">
      <div class="crfd-stack-4">
        <h3 class="crfd-h3 crfd-h3--lg">Enter OTP to verify details</h3>
        <p class="crfd-otp-sent"><span class="crfd-muted">OTP sent to</span>${editNum()}</p>
      </div>
      <div class="crfd-stack-12">
        <label class="crfd-otp ${s === "incorrect" ? "is-error" : ""} ${s === "verifying" ? "is-verifying" : ""}">
          <input id="crfd-otp" inputmode="numeric" autocomplete="one-time-code" maxlength="4" value="${esc(st.otp)}" aria-label="Enter 4 digit OTP" ${s === "verifying" ? "disabled" : ""}>
          <span class="crfd-otp__row" aria-hidden="true">${digits}</span>
        </label>
        ${s === "incorrect" ? `<p class="crfd-error">You’ve entered an incorrect OTP</p>` : ""}
        ${s === "verifying" ? "" : resend}
      </div>
      ${s !== "verifying" && st.left <= 0 ? callRow : ""}
      ${s === "verifying" ? "" : `<button type="button" class="crfd-btn crfd-btn--primary" data-action="crfd-verify" ${st.otp.length === 4 ? "" : "disabled"}>Verify OTP</button>`}
    </div>`;
  },
  connecting() {
    return `${closeOnly}<div class="crfd-body">
      <div class="crfd-stack-12 crfd-center">${hero}<h2 class="crfd-title-center" id="crfd-title">Getting you in touch with sellers...</h2></div>
      <div class="crfd-connect">${SELLERS.slice(0, 2).map((s) => `<div class="crfd-seller">${avatar(s)}<div><p class="crfd-strong">${s.name}</p><p class="crfd-muted">+91 97116XXXXX</p></div></div>`).join(`<hr class="crfd-rule">`)}</div>
    </div>`;
  },
  post() {
    const limit = st.limit;
    const sellerRow = (s) => `<div class="crfd-seller">${avatar(s)}<div><p class="crfd-meta"><span class="crfd-strong">${s.name}</span>${sep}<span>${s.role}</span></p><p class="crfd-sec">${s.phone}</p></div><a class="crfd-wa-btn" href="https://web.whatsapp.com/send?phone=${s.phone.replace(/\D/g, "")}" target="_blank" rel="noopener" aria-label="WhatsApp ${s.name}">${I.whatsapp}</a></div>`;
    return `${head("Sellers details", false)}<div class="crfd-body crfd-body--scroll crfd-body--post" data-crfd-scroll>
      <div class="crfd-outcome">
        <div class="crfd-outcome__ok">
          <span class="crfd-badge">${I.sealCheckFill}</span>
          <div><p class="crfd-ok-title">${limit ? "Sellers notified" : "4 sellers notified"}</p><p class="crfd-ok-copy">They may reach out soon on call or WhatsApp</p></div>
        </div>
        <div class="crfd-outcome__prop">
          <img src="${IMG("property.png")}" alt="" width="40" height="40">
          <div><p class="crfd-strong">Evolvus Phase 1, Sikanderpur, MG Road</p><p class="crfd-meta"><span>3BHK Apartment</span>${sep}<span>₹2.5 Cr.</span></p></div>
        </div>
        ${limit ? `<div class="crfd-inset-rule"></div>
        <div class="crfd-outcome__limit"><span class="crfd-alert">${I.info}</span><p>You've reached your enquiry limit. For concerns contact <a href="mailto:support@housing.com">support@housing.com</a></p></div>` : ""}
      </div>
      ${limit ? "" : `<section class="crfd-stack-12">
        <h3 class="crfd-label">Sellers</h3>
        <div class="crfd-sellers">
          <div class="crfd-sellers__list">${SELLERS.slice(0, 2).map(sellerRow).join(`<hr class="crfd-rule">`)}
            <div class="crfd-more-rows ${st.expanded ? "is-open" : ""}"><div>${SELLERS.slice(2).map((r) => `<hr class="crfd-rule">${sellerRow(r)}`).join("")}</div></div></div>
          <button type="button" class="crfd-more" data-action="crfd-more" aria-expanded="${!!st.expanded}">${st.expanded ? "View less sellers" : "View 2 more sellers"}<span class="${st.expanded ? "is-up" : ""}">${I.caretDown}</span></button>
        </div>
      </section>`}
      <hr class="crfd-divider">
      <section class="crfd-stack-16">
        <div class="crfd-title-row"><h3 class="crfd-h3">Buyers also explored</h3><a href="#" class="crfd-link" data-action="crfd-noop">See all</a></div>
        <div class="crfd-cards">${HOMES.map((h, i) => `
          <article class="crfd-card">
            <img class="crfd-card__photo" src="${IMG(h.photo)}" alt="" width="184" height="120">
            <div class="crfd-card__details">
              <p class="crfd-card__price"><span class="crfd-band" aria-hidden="true"></span><span>${h.price}</span></p>
              <p class="crfd-meta crfd-meta--sec"><span>${h.bhk}</span>${sep}<span>${h.type}</span></p>
              <p class="crfd-muted">${h.loc}</p>
            </div>
            <button type="button" class="crfd-btn crfd-btn--secondary" data-action="crfd-card-contact" data-i="${i}" ${st.contacted?.has(i) ? "disabled" : ""}>${st.contacted?.has(i) ? `${I.check}Enquiry sent` : "Contact"}</button>
          </article>`).join("")}</div>
      </section>
      <div class="crfd-safety"><img src="${IMG("shield.png")}" alt="" width="20" height="20"><p>Never pay before a visit or signed agreement</p></div>
      <section class="crfd-stack-16">
        <div class="crfd-title-row"><h3 class="crfd-h3">Smart deals for you</h3><a href="#" class="crfd-link" data-action="crfd-noop">See all</a></div>
        <div class="crfd-stack-12">${DEALS.map((d) => `
          <article class="crfd-deal">
            <div class="crfd-deal__top"><img class="crfd-deal__photo" src="${IMG(d.photo)}" alt="" width="96" height="96">
              <div class="crfd-stack-4"><p class="crfd-h3">${d.price}</p><p class="crfd-meta crfd-meta--sec"><span>${d.bhk}</span>${sep}<span>Apartment</span></p><p class="crfd-sec">${d.loc}</p><p class="crfd-meta crfd-meta--sec"><span>${d.size}</span>${sep}<span>${d.rate}</span></p></div></div>
            <hr class="crfd-rule">
            <div class="crfd-deal__seller"><img class="crfd-deal__av" src="${IMG(d.av)}" alt="" width="36" height="36"><div><p class="crfd-strong">${d.dev}</p><p class="crfd-muted">Developer</p></div>
              <a class="crfd-wa-btn" href="https://web.whatsapp.com/" target="_blank" rel="noopener" aria-label="WhatsApp ${d.dev}">${I.whatsapp}</a>
              <button type="button" class="crfd-btn crfd-btn--secondary crfd-deal__cta" data-action="crfd-noop">Contact</button></div>
          </article>`).join("")}</div>
      </section>
      <section class="crfd-expect"><h3 class="crfd-h3">What to expect?</h3><hr class="crfd-rule">
        ${["A seller or agent may contact you on call or WhatsApp", "You can also reach out to the sellers using the details above"].map((t) => `<p class="crfd-expect__row">${I.checkCircle}<span>${t}</span></p>`).join(`<hr class="crfd-rule">`)}
      </section>
    </div>
    <div class="crfd-fade" aria-hidden="true"></div>`;
  },
};

function render(view, { fade = true } = {}) {
  st.view = view;
  const paint = () => {
    body.innerHTML = VIEWS[view]();
    card.dataset.view = view;
    const f = body.querySelector("input:not([type=checkbox]):not([disabled])");
    if (f && view !== "post") { f.focus(); f.setSelectionRange?.(f.value.length, f.value.length); }
    else card.focus({ preventScroll: true });
  };
  if (!fade) return paint();
  body.classList.add("is-swapping");
  setTimeout(() => { paint(); body.classList.remove("is-swapping"); }, 120);
}

function startTimer() {
  clearInterval(timer);
  st.left = 15;
  timer = setInterval(() => {
    st.left -= 1;
    const el = body.querySelector(".crfd-otp ~ .crfd-muted, .crfd-otp ~ .crfd-resend");
    if (st.view !== "otp") return clearInterval(timer);
    if (st.left <= 0) clearInterval(timer);
    if (st.otpState === "verifying") return;
    if (st.left > 0) { if (el) el.textContent = `Resend OTP in 00:${String(st.left).padStart(2, "0")}`; }
    else render("otp", { fade: false });
  }, 1000);
}

function verify() {
  st.otpState = "verifying";
  render("otp", { fade: false });
  setTimeout(() => {
    if (st.otp === "0000") { st.otpState = "incorrect"; st.otp = ""; render("otp", { fade: false }); return; }
    connect();
  }, 900);
}

function connect() {
  clearInterval(timer);
  render("connecting");
  setTimeout(() => { render("post"); window.dispatchEvent(new CustomEvent("crfd:post")); }, 2200);
}

function updateOtpDigits() {
  const row = body.querySelector(".crfd-otp__row");
  if (!row) return;
  [...row.children].forEach((d, i) => {
    const ch = st.otp[i];
    if (ch && d.textContent !== ch) { d.textContent = ch; d.className = "crfd-otp__d is-in"; }
    if (!ch) { d.textContent = "-"; d.className = "crfd-otp__d is-empty"; }
  });
  const btn = body.querySelector("[data-action=crfd-verify]");
  if (btn) btn.disabled = st.otp.length !== 4;
  if (st.otp.length === 4) verify();
}

function onClick(e) {
  const a = e.target.closest("[data-action]");
  if (e.target === root && st.view === "post") return close();
  if (!a) { if (st.ccOpen && !e.target.closest(".crfd-dd")) { st.ccOpen = false; render("phone", { fade: false }); } return; }
  const act = a.dataset.action;
  if (act === "crfd-noop") return e.preventDefault();
  if (act === "crfd-close") return close();
  if (act === "crfd-back") { st.err = ""; clearInterval(timer); return render(st.view === "otp" ? "details" : "phone"); }
  if (act === "crfd-edit-phone") { st.err = ""; return render("phone"); }
  if (act === "crfd-cc") { st.ccOpen = !st.ccOpen; return render("phone", { fade: false }); }
  if (act === "crfd-cc-pick") { st.cc = a.dataset.cc; st.ccName = a.dataset.name; st.ccOpen = false; return render("phone", { fade: false }); }
  if (act === "crfd-continue" || act === "crfd-wa") {
    st.phone = body.querySelector("#crfd-phone").value.replace(/\D/g, "");
    if (st.phone.length !== 10) { st.err = "Enter a valid phone number"; return render("phone", { fade: false }); }
    st.err = ""; return render("details");
  }
  if (act === "crfd-google") { st.google = true; st.name = "Rohit Mehra"; st.email = "rohit.mehra@gmail.com"; st.err = ""; return render("details", { fade: false }); }
  if (act === "crfd-get-otp") {
    st.name = body.querySelector("#crfd-name").value.trim();
    st.email = body.querySelector("#crfd-email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(st.email)) { st.err = "Enter a valid email ID"; return render("details", { fade: false }); }
    st.err = ""; st.otp = ""; st.otpState = ""; render("otp"); return startTimer();
  }
  if (act === "crfd-resend" || act === "crfd-call" || act === "crfd-call-wa") { st.otp = ""; st.otpState = ""; render("otp", { fade: false }); return startTimer(); }
  if (act === "crfd-verify") return verify();
  if (act === "crfd-more") {
    st.expanded = !st.expanded;
    body.querySelector(".crfd-more-rows").classList.toggle("is-open", st.expanded);
    a.setAttribute("aria-expanded", st.expanded);
    a.firstChild.textContent = st.expanded ? "View less sellers" : "View 2 more sellers";
    a.querySelector("span").classList.toggle("is-up", st.expanded);
    return;
  }
  if (act === "crfd-card-contact") { (st.contacted ||= new Set()).add(+a.dataset.i); const sc = body.querySelector("[data-crfd-scroll]").scrollTop; render("post", { fade: false }); body.querySelector("[data-crfd-scroll]").scrollTop = sc; }
}

function onInput(e) {
  if (e.target.id === "crfd-phone") { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); st.phone = e.target.value; }
  if (e.target.id === "crfd-otp") {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    st.otp = e.target.value;
    if (st.otpState === "incorrect") { st.otpState = ""; body.querySelector(".crfd-otp").classList.remove("is-error"); body.querySelector(".crfd-otp ~ .crfd-error")?.remove(); }
    updateOtpDigits();
  }
}

function onKey(e) {
  if (e.key === "Escape") { if (st.ccOpen) { st.ccOpen = false; return render("phone", { fade: false }); } return close(); }
  if (e.key === "Enter" && e.target.matches?.(".crfd-input")) body.querySelector(".crfd-btn--primary")?.click();
  if (e.key === "Tab") {
    const f = [...card.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href]")];
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  }
}

function build() {
  root = document.createElement("div");
  root.className = "crfd-overlay";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-labelledby", "crfd-title");
  root.hidden = true;
  root.innerHTML = `<div class="crfd-modal" tabindex="-1"><div class="crfd-view"></div></div>`;
  card = root.firstElementChild;
  body = card.firstElementChild;
  root.addEventListener("click", onClick);
  root.addEventListener("input", onInput);
  root.addEventListener("keydown", onKey);
  document.body.appendChild(root);
}

export function openCrf() {
  if (!root) build();
  st.opens += 1;
  Object.assign(st, { phone: st.phone ?? "", name: st.name ?? "", email: st.email ?? "", cc: st.cc || "+91", ccName: st.ccName || "India", ccOpen: false, err: "", otp: "", otpState: "", expanded: false, contacted: new Set(), service: "buy", limit: st.opens >= 3 });
  lastFocus = document.activeElement;
  document.documentElement.classList.add("crfd-lock");
  root.hidden = false;
  root.classList.remove("mm-closing");
  root.classList.add("is-visible"); // Airbnb modal motion, src/styles/modal-motion.css
  if (st.opens >= 2 && st.verified) return connect();
  render("phone", { fade: false });
}

function close() {
  clearInterval(timer);
  window.dispatchEvent(new CustomEvent("crfd:closed", { detail: { fromPost: st.view === "post" } }));
  if (st.view === "post") st.verified = true;
  root.classList.remove("is-visible");
  root.classList.add("mm-closing");
  // Unlock scroll + restore focus only after the close motion ends: doing it now re-lays out the whole PDP mid-animation
  setTimeout(() => {
    if (root.classList.contains("is-visible")) return;
    root.classList.remove("mm-closing");
    root.hidden = true; body.innerHTML = "";
    document.documentElement.classList.remove("crfd-lock");
    lastFocus?.focus?.({ preventScroll: true });
  }, 250);
}

export function initCrfDweb() {
  document.getElementById("pdp-contact-btn")?.addEventListener("click", openCrf);
}
