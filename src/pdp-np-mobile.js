import "./styles/pdp-np-mobile.css";
import { PDP_NP_ICONS as I } from "./data/pdpNpIcons.js";
import { ISP_ICONS } from "./data/srpIspIcons.js";
import { pdpMobileImageSrc } from "./data/pdpMobile.mock.js";

/* ------------------------------------------------------------------ *
 * NP PDP (mweb) — Figma "PDP [Demand]" › Desktop: NP PDP (5868:41984).
 * Behind experiment pdp_paid_leads. States from the same section:
 * full screen, sticky header, bottom navigation, gallery no image
 * (?photos=0), developer/seller no image (?sellerPhoto=0).
 * ------------------------------------------------------------------ */

const A = "/pdp-np/";

const DATA = {
  name: "JMS The Nation",
  price: "₹2.23 Cr - ₹3.76 Cr",
  area: "1400 - 1700 sq. ft",
  badges: [
    { label: "New launch", tone: "green" },
    { label: "RERA", icon: "sealCheck" },
    { label: "Zero brokerage" },
    { label: "Possession by May ‘27" },
  ],
  locality: "Sector 95, New Gurgaon",
  city: "Gurgaon",
  seller: { name: "Vikas Sharma", role: "Seller", photo: `${A}agent.png` },
  photoCount: 24,
  overview: [
    [["Units", "457"], ["Project area", "12 acres"]],
    [["Size", "775 - 1614 /sq.ft."], ["Launch date", "Aug, 2019"]],
    [["Avg. price", "10.41 K /sq.ft."], ["Possession date", "May ‘29"]],
    [["Configurations", "10.41 K/sq.ft."]],
  ],
  rera: "7865/GHTF/SLP/2026-BP",
  permit: "7865/GHTF/SLP/2026-BP",
  plans: ["2BHK", "3 BHK", "4 BHK"],
  about: [
    ["trainSimple", "Connected to South Delhi via metro"],
    ["tree", "75% green space with water bodies"],
    ["microphoneStage", "Amphitheatre & library onsite"],
  ],
  description:
    "The Palm Drive, a perfect combination of apartments and villas, is a creation by Emaar at a strategic location, Sector 66 in Gurgaon. Offering breathtaking views, landscaped greens and premium amenities, it is built for families who want space and calm close to the city.",
  invest: [
    ["Appreciation since ‘23", "15.3%", true],
    ["Current value", "₹2.12 Cr"],
    ["Projected value in 1 year", "₹3.32 Cr"],
    ["1Y returns", "18.3%", true],
  ],
  compare: { name: "Sobha Auram", address: "Sector 1, Noida Extension, Uttar Pradesh", price: "₹90 L - 1.42 Cr" },
  better: { name: "Shapoorji Joyville", address: "Mundhwa Road, East Pune", price: "₹90 L - 1.42 Cr" },
  places: {
    Education: ["Billabong High International School", "Millat High School", "Millat High School"],
    Healthcare: ["Fortis Memorial Research Institute", "Medanta The Medicity", "Artemis Hospital"],
    Commute: ["Sector 54 Chowk Metro", "Gurgaon Railway Station", "IGI Airport T3"],
  },
  sellers: [
    { name: "Deepak Arora", range: "₹1.4 Cr - ₹2.6 Cr", photo: `${A}seller.png` },
    { name: "Deepak Arora", range: "₹1.4 Cr - ₹2.6 Cr", photo: `${A}seller.png` },
  ],
  developer: { name: "Ambit Realtors", since: "Established in 1998", projects: "11 projects", range: "₹1.4 Cr - ₹2.6 Cr" },
  faq: [
    [
      "What is the pin code of Dotom Blumen?",
      "Hospitals such as Dr L H Hiranandani Hospital, Zynova Shalby Hospital, Godrej Memorial Hospital are located close to Dotom Blumen, giving residents easy access to good healthcare.",
    ],
    ["What is the pin code of Dotom Blumen?", "The pin code of Dotom Blumen is 400083."],
    ["What is the pin code of Dotom Blumen?", "The pin code of Dotom Blumen is 400083."],
    ["Is Dotom Blumen RERA registered?", "Yes, the project is registered under RERA ID 7865/GHTF/SLP/2026-BP."],
    ["What is the possession date?", "Possession is expected by May 2029."],
  ],
  links: [
    "Adani Linkbay Residences Phase II Wing B - Brochure",
    "Adani Linkbay",
    "Adani Linkbay Residences Map",
    "Adani Linkbay Residences Map",
  ],
  crumbs: ["Home", "Mumbai", "Vikhroli West", "Dotom Blumen"],
};

/** Paid NP project the free PDP options push towards. */
const PAID = {
  name: "Godrej Aria",
  price: "₹1.98 Cr - ₹3.20 Cr",
  priceFrom: "₹1.98 Cr",
  area: "1250 - 1900 sq. ft",
  locality: "Sector 79, New Gurgaon",
  short: "Sector 79",
  distance: "2.1 km away",
  possession: "Dec ‘27",
  img: pdpMobileImageSrc(3),
};

const PAID_URL = "/pdp-mobile.html?paid=1";

/** The paid PDP reuses the template with the paid project's data. */
const PAID_DATA = {
  ...DATA,
  name: PAID.name,
  price: PAID.price,
  area: PAID.area,
  locality: PAID.locality,
  badges: [
    { label: "Verified by developer", tone: "brand", icon: "sealCheck" },
    { label: "RERA", icon: "sealCheck" },
    { label: "Zero brokerage" },
    { label: `Possession by ${PAID.possession}` },
  ],
  seller: { name: "Godrej Properties", role: "Developer", photo: `${A}agent.png` },
  heroImg: PAID.img,
};

let D = DATA;

const FOOTER_LINKS = [
  "Real Estate in Gurgaon",
  "Real Estate in Dwarka Expressway",
  "Real Estate in Golf Course Extension Ro:",
  "Real Estate in New Gurgaon",
  "Real Estate in Sohna Road",
  "Real Estate in Sector 49",
  "Real Estate in South City Il",
  "Real Estate in Uppal Southend",
];

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const btn = (label, kind = "primary", extra = "") =>
  `<button type="button" class="pnp-btn pnp-btn--${kind}${extra ? ` ${extra}` : ""}">${esc(label)}</button>`;

const toolsHtml = () => `<div class="pnp-tools">
    <button type="button" class="pnp-ico" aria-label="Share">${I.shareNetwork}</button>
    <button type="button" class="pnp-ico" aria-label="Shortlist">${I.heart}</button>
    <button type="button" class="pnp-ico" aria-label="Call">${I.phone}</button>
  </div>`;

const avatarHtml = (person, showPhoto, cls) =>
  showPhoto
    ? `<img class="${cls}" src="${person.photo}" alt="" width="40" height="40" />`
    : `<span class="${cls} ${cls}--initials" aria-hidden="true">${esc(initials(person.name))}</span>`;

function heroHtml(showPhotos) {
  const slides = showPhotos
    ? [D.heroImg || `${A}hero.jpg`, ...[0, 1, 2, 4, 5].map((i) => pdpMobileImageSrc(i))]
        .map((src, i) => `<img class="pnp-hero__img" src="${src}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} />`)
        .join("")
    : "";
  return `<section class="pnp-hero${showPhotos ? "" : " pnp-hero--empty"}" aria-label="Project photos">
    ${
      showPhotos
        ? `<div class="pnp-hero__track" data-pnp-gallery>${slides}</div>`
        : `<div class="pnp-hero__empty">${I.imagesSquare}<p>No photos available!</p></div>`
    }
    <div class="pnp-hero__bar">
      <button type="button" class="pnp-ico pnp-ico--back" data-action="pnp-back" aria-label="Back">${I.arrowLeft}</button>
      ${toolsHtml()}
    </div>
    ${
      showPhotos
        ? `<div class="pnp-hero__meta">
      <span class="pnp-hero__dots" aria-hidden="true"><i class="is-on"></i><i></i><i></i></span>
      <span class="pnp-hero__count" data-pnp-count>1 / ${D.photoCount}</span>
    </div>`
        : ""
    }
  </section>`;
}

function summaryHtml(showSellerPhoto) {
  const badges = D.badges
    .map(
      (b) =>
        `<span class="pnp-badge${b.tone ? ` pnp-badge--${b.tone}` : ""}">${b.icon ? I[b.icon] : ""}${esc(b.label)}</span>`
    )
    .join("");
  return `<section class="pnp-sec pnp-summary">
    <div class="pnp-badges">${badges}</div>
    <div class="pnp-summary__title">
      <h1 class="pnp-h1">${esc(D.name)}</h1>
      <p class="pnp-summary__price"><strong>${esc(D.price)}</strong><span class="pnp-vsep" aria-hidden="true"></span><span>${esc(D.area)}</span></p>
    </div>
    <div class="pnp-summary__rows">
      <button type="button" class="pnp-loc">
        <span class="pnp-loc__map" aria-hidden="true">${I.mapPin}</span>
        <span class="pnp-loc__text"><strong>${esc(D.locality)}</strong><small>${esc(D.city)}</small></span>
        <span class="pnp-loc__chev" aria-hidden="true">${I.caretRight}</span>
      </button>
      <hr class="pnp-rule" />
      <div class="pnp-agent">
        ${avatarHtml(D.seller, showSellerPhoto, "pnp-agent__photo")}
        <span class="pnp-agent__text"><strong>${esc(D.seller.name)}</strong><small>${esc(D.seller.role)}</small></span>
        ${btn("Contact", "primary", "pnp-btn--sm pnp-btn--contact")}
      </div>
    </div>
  </section>`;
}

function overviewHtml() {
  const rows = D.overview
    .map(
      (row) =>
        `<div class="pnp-ov__row">${row
          .map(([k, v]) => `<div class="pnp-ov__cell"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`)
          .join("")}</div>`
    )
    .join(`<hr class="pnp-rule" />`);
  return `<section class="pnp-sec pnp-ov">
    <h2 class="pnp-h2">Project overview</h2>
    <div class="pnp-ov__grid">${rows}</div>
    <div class="pnp-ov__ids">
      <div class="pnp-idpill"><span>RERA ID:</span><button type="button" class="pnp-link pnp-link--s">${esc(D.rera)}</button><button type="button" class="pnp-idpill__copy" data-copy="${esc(D.rera)}" aria-label="Copy RERA ID">${I.copySimple}</button></div>
      <div class="pnp-idpill"><span><b>Permit ID:</b> ${esc(D.permit)}</span><button type="button" class="pnp-idpill__copy" data-copy="${esc(D.permit)}" aria-label="Copy permit ID">${I.copySimple}</button></div>
    </div>
    ${btn("Ask for details", "outline")}
  </section>`;
}

function tabsHtml(items, group, cls = "") {
  return `<div class="pnp-tabs ${cls}" role="tablist" data-pnp-tabs="${group}">${items
    .map(
      (t, i) =>
        `<button type="button" role="tab" class="pnp-tab${i === 0 ? " is-active" : ""}" aria-selected="${i === 0}" data-tab="${i}">${esc(t)}</button>`
    )
    .join("")}</div>`;
}

function plansHtml() {
  const card = () => `<article class="pnp-plan">
      <div class="pnp-plan__kv"><span>Super built-up area</span><strong>1500-1700 /sq.yd.</strong></div>
      <hr class="pnp-rule" />
      <div class="pnp-plan__kv"><span>Price</span><strong>₹2.25 Cr</strong></div>
      ${btn("Contact", "outline")}
    </article>`;
  return `<section class="pnp-sec pnp-plans">
    <h2 class="pnp-h2 pnp-pad">Plot plan and pricing</h2>
    ${tabsHtml(D.plans, "plans")}
    <div class="pnp-rail pnp-rail--plans">${card()}${card()}${card()}${card()}</div>
  </section>`;
}

function aboutHtml() {
  return `<section class="pnp-sec pnp-about">
    <h2 class="pnp-h2">About this property</h2>
    <ul class="pnp-about__list">${D.about
      .map(([icon, text]) => `<li>${I[icon]}<span>${esc(text)}</span></li>`)
      .join("")}</ul>
    <div class="pnp-more">
      <p class="pnp-more__text pnp-clamp-2" data-pnp-clamp>${esc(D.description)}</p>
      <button type="button" class="pnp-link" data-action="pnp-more">Read more</button>
    </div>
  </section>`;
}

function paymentHtml() {
  return `<section class="pnp-sec pnp-pay">
    <h2 class="pnp-h2">Payment plan</h2>
    <button type="button" class="pnp-emi">
      <span class="pnp-emi__art"><img src="${A}emi.png" alt="" width="36" height="34" /></span>
      <span class="pnp-emi__text">
        <strong>EMI for 3BHK at <em>₹1.5L/month</em></strong>
        <small>Duration: 30 years<span class="pnp-vsep" aria-hidden="true"></span>Interest: 7.5%</small>
      </span>
      <span class="pnp-emi__chev" aria-hidden="true">${I.caretRight}</span>
    </button>
    ${btn("Contact seller")}
  </section>`;
}

function investHtml() {
  const rows = D.invest
    .map(
      ([k, v, up], i) =>
        `${i ? `<hr class="pnp-rule${i === 3 ? " pnp-rule--dash" : ""}" />` : ""}<div class="pnp-kvrow"><span>${esc(k)}</span>${
          up ? `<strong class="pnp-up">${I.arrowUp}${esc(v)}</strong>` : `<strong>${esc(v)}</strong>`
        }</div>`
    )
    .join("");
  return `<section class="pnp-sec pnp-invest">
    <div class="pnp-head"><h2 class="pnp-h2">Investment insights</h2><button type="button" class="pnp-link pnp-link--s">View details</button></div>
    <div class="pnp-invest__rows">${rows}</div>
    ${btn("Contact seller to invest")}
  </section>`;
}

function brochureHtml() {
  const imgs = [`${A}brochure-1.jpg`, `${A}brochure-2.jpg`, `${A}brochure-1.jpg`]
    .map((src) => `<img class="pnp-brochure__img" src="${src}" alt="" loading="lazy" />`)
    .join("");
  return `<section class="pnp-sec pnp-brochure">
    <h2 class="pnp-h2 pnp-brochure__title">${esc(D.name)}</h2>
    <div class="pnp-rail pnp-rail--brochure">${imgs}</div>
    <div class="pnp-brochure__ctas">${btn("View brochure", "outline")}${btn("Download")}</div>
  </section>`;
}

function compareHtml() {
  const c = D.compare;
  const card = () => `<article class="pnp-card pnp-card--compare">
      <img class="pnp-card__img" src="${A}plot-card.jpg" alt="" loading="lazy" />
      <div class="pnp-card__body">
        <span class="pnp-chip">Possession by Dec, 2026</span>
        <div class="pnp-card__name"><strong>${esc(c.name)}</strong><small>${esc(c.address)}</small></div>
        <div class="pnp-card__fields">
          <label class="pnp-select"><select aria-label="Configuration"><option>3BHK</option><option>2BHK</option><option>4BHK</option></select>${I.caretDown}</label>
          <label class="pnp-select"><select aria-label="Size"><option>1500-1700 sq.yd.</option><option>1700-1900 sq.yd.</option></select>${I.caretDown}</label>
        </div>
        <strong class="pnp-card__price">${esc(c.price)}</strong>
      </div>
      <div class="pnp-card__cta">${btn("Contact", "outline")}</div>
    </article>`;
  return `<section class="pnp-sec pnp-rail-sec">
    <h2 class="pnp-h2 pnp-pad">Compare similar plots</h2>
    <div class="pnp-rail pnp-rail--compare">${card()}${card()}${card()}</div>
  </section>`;
}

function neighbourhoodHtml() {
  const cats = Object.keys(D.places);
  const icon = { Education: I.backpack, Healthcare: I.firstAid, Commute: I.trainSimple };
  return `<section class="pnp-sec pnp-hood">
    <h2 class="pnp-h2">Explore neighbourhood</h2>
    <div class="pnp-hood__map"><img src="${A}map.jpg" alt="Map of the neighbourhood" loading="lazy" /></div>
    <div class="pnp-hood__chips" role="tablist" data-pnp-places>${cats
      .map(
        (c, i) =>
          `<button type="button" role="tab" class="pnp-pchip${i === 0 ? " is-active" : ""}" aria-selected="${i === 0}" data-cat="${c}">${icon[c]}${c}</button>`
      )
      .join("")}</div>
    <ul class="pnp-hood__list" data-pnp-place-list>${placeItems(cats[0])}</ul>
    ${btn("Request location")}
  </section>`;
}

function placeItems(cat) {
  return D.places[cat]
    .map((p) => `<li><strong>${esc(p)}</strong><small>1.3 km</small></li>`)
    .join("");
}

function projectCardHtml(withHeart = true) {
  const b = D.better;
  return `<article class="pnp-card pnp-card--project">
      <div class="pnp-card__media">
        <img class="pnp-card__img" src="${A}project-card.jpg" alt="" loading="lazy" />
        ${withHeart ? `<button type="button" class="pnp-ico pnp-card__heart" aria-label="Shortlist">${I.heart}</button>` : ""}
      </div>
      <div class="pnp-card__body">
        <span class="pnp-chip">Possession by Dec, 2026</span>
        <div class="pnp-card__name"><strong>${esc(b.name)}</strong><small>${esc(b.address)}</small></div>
        <hr class="pnp-rule" />
        <div class="pnp-card__range"><small>Price range</small><strong>${esc(b.price)}</strong></div>
      </div>
      <div class="pnp-card__cta">${btn("View phone", "outline")}</div>
    </article>`;
}

function betterHtml() {
  return `<section class="pnp-sec pnp-rail-sec">
    <h2 class="pnp-h2 pnp-pad">Better priced properties</h2>
    <div class="pnp-rail pnp-rail--project">${projectCardHtml()}${projectCardHtml(false)}${projectCardHtml(false)}</div>
  </section>`;
}

function sellersHtml(showSellerPhoto) {
  return `<section class="pnp-sec pnp-sellers">
    <h2 class="pnp-h2">Sellers for this project</h2>
    <div class="pnp-sellers__list">${D.sellers
      .map(
        (s, i) => `${i ? `<hr class="pnp-rule" />` : ""}<div class="pnp-person">
        ${avatarHtml(s, showSellerPhoto, "pnp-person__photo")}
        <span class="pnp-person__text"><strong>${esc(s.name)}</strong><small>${esc(s.range)}</small></span>
        ${btn("Contact", "outline", "pnp-btn--sm")}
      </div>`
      )
      .join("")}</div>
  </section>`;
}

function developerHtml() {
  const d = D.developer;
  return `<section class="pnp-sec pnp-dev">
    <div class="pnp-dev__top">
      <h2 class="pnp-h2">About the developers</h2>
      <div class="pnp-person">
        <span class="pnp-person__photo pnp-person__photo--initials" aria-hidden="true">${esc(initials(d.name))}</span>
        <span class="pnp-person__text"><strong class="pnp-semibold">${esc(d.name)}</strong><small>${esc(d.since)}<span class="pnp-vsep" aria-hidden="true"></span>${esc(d.projects)}</small></span>
      </div>
      <hr class="pnp-rule" />
      <div class="pnp-more">
        <p class="pnp-more__text pnp-more__text--muted pnp-clamp-3" data-pnp-clamp>${esc(D.description)}</p>
        <button type="button" class="pnp-link" data-action="pnp-more">Read more</button>
      </div>
      <hr class="pnp-rule" />
      <div class="pnp-dev__price"><strong>${esc(d.range)}</strong>${btn("Contact", "outline", "pnp-btn--sm")}</div>
    </div>
    ${tabsHtml(["Ongoing", "Upcoming"], "dev", "pnp-tabs--dev")}
    <div class="pnp-rail pnp-rail--project">${projectCardHtml()}${projectCardHtml(false)}${projectCardHtml(false)}</div>
  </section>`;
}

function faqHtml() {
  const item = ([q, a], i) => `<div class="pnp-faq__item${i === 0 ? " is-open" : ""}${i > 2 ? " is-extra" : ""}">
      <button type="button" class="pnp-faq__q" aria-expanded="${i === 0}" data-action="pnp-faq"><span>${esc(q)}</span>${I.caretDown}</button>
      <p class="pnp-faq__a pnp-clamp-2">${esc(a)}</p>
    </div>`;
  return `<section class="pnp-sec pnp-faq">
    <h2 class="pnp-h2">FAQ</h2>
    <div class="pnp-faq__list">${D.faq.map(item).join("")}</div>
    <button type="button" class="pnp-faq__more" data-action="pnp-faq-more"><span>View more</span>${I.caretDown}</button>
  </section>`;
}

function linksHtml() {
  return `<section class="pnp-sec pnp-links">
    <h2 class="pnp-h2">Quick links</h2>
    <p class="pnp-links__list">${D.links.map((l) => `<a href="#">${esc(l)}</a>`).join("")}</p>
  </section>`;
}

function crumbsHtml() {
  return `<nav class="pnp-sec pnp-crumbs" aria-label="Breadcrumb">${D.crumbs
    .map((c, i) => (i === D.crumbs.length - 1 ? `<span aria-current="page">${esc(c)}</span>` : `<a href="#">${esc(c)}</a>${I.caretRight}`))
    .join("")}</nav>`;
}

function disclaimerHtml() {
  return `<section class="pnp-sec pnp-disc">
    <h2 class="pnp-h2">Disclaimer</h2>
    <div class="pnp-more">
      <p class="pnp-disc__text pnp-clamp-3" data-pnp-clamp>Housing.com is a not a marketing partner for this real estate project ("Project") and is not acting on behalf of the developer of this Project. The Project has been displayed for information purposes only. Pictures shown include artist’s impressions provided by the developer. Please exercise due caution and independently validate all information before deciding to purchase.</p>
      <button type="button" class="pnp-link pnp-link--xs" data-action="pnp-more">Read more</button>
    </div>
  </section>`;
}

function footerHtml() {
  return `<footer class="pnp-foot">
    <div class="pnp-foot__tabs"><span class="is-active">REAL ESTATE</span><span>RENTALS</span><span>PROJECTS</span><span>POPULAR SEARCHES</span></div>
    <p class="pnp-foot__h">Find properties for sale</p>
    <ul class="pnp-foot__links">${FOOTER_LINKS.map((l) => `<li><a href="#">${esc(l)}</a></li>`).join("")}<li><button type="button" class="pnp-foot__all">Show all links ${I.caretDown}</button></li></ul>
    <div class="pnp-foot__rea"><span>Part of</span><img src="${A}rea.png" alt="REA Group" width="194" height="48" loading="lazy" /></div>
    <div class="pnp-foot__grp"><p class="pnp-foot__label">COMPANY</p><p>Carrers  |  About Us  |  For Partners  |  Terms  |  Annual  |  Returns  |  Privacy Policy  |  Contact Us  |  Unsubscribe  |  Merger  |  Hearing  |  Advertisement</p></div>
    <div class="pnp-foot__grp"><p class="pnp-foot__label">PARTNER SITES</p><p>Proptiger  |  Makaan  |  realestate.com.au  |  realtor.com  |  99.co</p></div>
    <div class="pnp-foot__grp"><p class="pnp-foot__label">EXPLORE</p><p>News  |  Home Loans  |  Sitemap  |  International</p></div>
    <div class="pnp-foot__grp"><p class="pnp-foot__label">FOLLOW</p></div>
    <div class="pnp-foot__legal"><p>Support@housing.com</p><p>©2012-24 Locon Solutions Pvt. Ltd</p></div>
  </footer>`;
}

function stickyHeaderHtml() {
  return `<header class="pnp-sticky" data-pnp-sticky aria-hidden="true">
    <button type="button" class="pnp-sticky__back" data-action="pnp-back" aria-label="Back">${I.arrowLeft}</button>
    <span class="pnp-sticky__title"><small>${esc(D.name)}</small><strong>${esc(D.price)}</strong></span>
    ${toolsHtml()}
  </header>`;
}

function bottomNavHtml() {
  return `<div class="pnp-bnav" data-pnp-bnav role="group" aria-label="Contact seller">
    <button type="button" class="pnp-bnav__wa" aria-label="WhatsApp">${I.whatsapp}</button>
    ${btn("View phone", "outline")}
    ${btn("Contact seller")}
  </div>`;
}

/* ------------------------------------------------------------------ *
 * Free → paid push options (experiment pdp_paid_leads, SRP cards 1–3).
 * The free project's own Contact stays on every option (enquiry guardrail).
 * ------------------------------------------------------------------ */

const verifiedTag = () => `<span class="pnp-vtag">${I.sealCheck}Verified by developer</span>`;

/** Compact paid project row used across options. */
function paidRowHtml(cta = "View") {
  return `<a class="pnp-paid" href="${PAID_URL}" data-pnp-paid>
    <img class="pnp-paid__img" src="${PAID.img}" alt="" loading="lazy" />
    <span class="pnp-paid__body">
      ${verifiedTag()}
      <strong>${esc(PAID.name)}</strong>
      <small>${esc(PAID.short)}<span class="pnp-vsep" aria-hidden="true"></span>${esc(PAID.distance)}</small>
      <span class="pnp-paid__price">${esc(PAID.price)}</span>
    </span>
    <span class="pnp-paid__cta">${esc(cta)}${I.caretRight}</span>
  </a>`;
}

/** Render with a given dataset (free or paid) — renderers read the module-level D. */
function withData(data, fn) {
  const prev = D;
  D = data;
  try {
    return fn();
  } finally {
    D = prev;
  }
}

/* Option 1 — Recommended first: two cards. Card 1 is the free project the buyer
   landed on (basic details; full details open as their own screen). Card 2 is the
   recommended paid project with more detail; its chevron expands the full PDP inline. */
const FREE_URL = "/pdp-mobile.html?id=0&from=rec";

function landedCardHtml() {
  return `<a class="pnp-lcard" href="${FREE_URL}" aria-label="View full details of ${esc(DATA.name)}">
    <img class="pnp-lcard__img" src="${A}hero.jpg" alt="" />
    <span class="pnp-lcard__text">
      <strong>${esc(DATA.name)}</strong>
      <span>${esc(DATA.price)}</span>
      <small>${esc(DATA.locality)}</small>
    </span>
    <span class="pnp-lcard__chev" aria-hidden="true">${I.caretRight}</span>
  </a>`;
}

function recCardHtml(showSellerPhoto) {
  const why = [
    ["Price from", PAID.priceFrom, "₹25 L lower"],
    ["Possession", PAID.possession, "17 months sooner"],
    ["Distance", PAID.distance.replace(" away", ""), "from your pick"],
  ];
  return `<article class="pnp-rcard" data-pnp-bridge aria-label="Recommended project">
    <div class="pnp-rcard__summary">
      <div class="pnp-rcard__media">
        <img src="${PAID.img}" alt="" />
      </div>
      <div class="pnp-rcard__body">
        <div class="pnp-rcard__titlerow">
          <div class="pnp-summary__title">
            <h2 class="pnp-h1">${esc(PAID.name)}</h2>
            <p class="pnp-summary__price"><strong>${esc(PAID.price)}</strong><span class="pnp-vsep" aria-hidden="true"></span><span>${esc(PAID.area)}</span></p>
            <p class="pnp-recsum__loc">${I.mapPin}${esc(PAID.locality)}</p>
          </div>
        </div>
        <div class="pnp-recsum__why">
          <p class="pnp-recsum__label">Why we recommend it</p>
          <div class="pnp-recsum__tiles">${why
            .map(([k, v, note]) => `<div><small>${esc(k)}</small><strong>${esc(v)}</strong><em>${esc(note)}</em></div>`)
            .join("")}</div>
        </div>
        <div class="pnp-recsum__offer">
          <span class="pnp-recsum__offer-tag">Offer</span>
          <p><strong>Pay 10% now,</strong> rest on possession. Free club membership for early bookings.</p>
        </div>
        <ul class="pnp-recsum__perks">
          <li>${I.sealCheck}Prices, floor plans and payment plan verified by the developer</li>
          <li>${I.phone}Developer calls back in under 30 minutes</li>
          <li>${I.tree}4.5 acres of central greens, 60+ amenities</li>
        </ul>
      </div>
    </div>
    <div class="pnp-rcard__cta">
      <button type="button" class="pnp-btn pnp-btn--outline" data-action="pnp-rec" aria-expanded="false" data-pnp-rec-label>See full details</button>
      <button type="button" class="pnp-btn pnp-btn--primary pnp-btn--contact">Contact developer</button>
    </div>
    <div class="pnp-rcard__more" data-pnp-rec-more hidden>
      ${withData(PAID_DATA, () =>
        [
          overviewHtml(),
          plansHtml(),
          aboutHtml(),
          paymentHtml(),
          investHtml(),
          brochureHtml(),
          neighbourhoodHtml(),
          sellersHtml(showSellerPhoto),
          developerHtml(),
          faqHtml(),
        ].join("")
      )}
    </div>
  </article>`;
}

function landedHtml(showSellerPhoto) {
  return `<header class="pnp-topbar">
      <button type="button" class="pnp-ico pnp-ico--back" data-action="pnp-back" aria-label="Back">${I.arrowLeft}</button>
    </header>
    <main class="pnp-duo">
      <p class="pnp-duo__label">Continue viewing</p>
      ${landedCardHtml()}
      <p class="pnp-duo__label pnp-duo__label--brand">Pick this better option</p>
      ${recCardHtml(showSellerPhoto)}
      <div class="pnp-duo__tail">${linksHtml()}${crumbsHtml()}${disclaimerHtml()}${footerHtml()}</div>
    </main>`;
}

/* Option 2 — Bottom sheet takeover: entry sheet, paid bottom bar, auto-move at the end. */
function takeoverSheetHtml() {
  return `<div class="pnp-sheet" data-pnp-sheet hidden>
    <button type="button" class="pnp-sheet__scrim" data-action="pnp-sheet-close" aria-label="Close"></button>
    <div class="pnp-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="pnp-sheet-title">
      <span class="pnp-sheet__grab" aria-hidden="true"></span>
      <p class="pnp-sheet__eyebrow">Before you decide</p>
      <h2 class="pnp-h2" id="pnp-sheet-title">A verified new launch matches your search</h2>
      <a class="pnp-sheet__card" href="${PAID_URL}" data-pnp-paid>
        <img src="${PAID.img}" alt="" />
        <span class="pnp-sheet__info">
          ${verifiedTag()}
          <strong>${esc(PAID.name)}</strong>
          <small>${esc(PAID.short)}<span class="pnp-vsep" aria-hidden="true"></span>${esc(PAID.distance)}</small>
          <span class="pnp-sheet__facts"><b>${esc(PAID.priceFrom)}</b> onwards<span class="pnp-vsep" aria-hidden="true"></span>Possession ${esc(PAID.possession)}</span>
        </span>
      </a>
      <a class="pnp-btn pnp-btn--primary" href="${PAID_URL}" data-pnp-paid>View ${esc(PAID.name)}</a>
      <button type="button" class="pnp-sheet__stay" data-action="pnp-sheet-close">Continue with ${esc(DATA.name)}</button>
    </div>
  </div>`;
}

function paidBarHtml() {
  return `<div class="pnp-pbar" data-pnp-pbar role="group" aria-label="Verified project nearby">
    <a class="pnp-pbar__main" href="${PAID_URL}" data-pnp-paid>
      <img src="${PAID.img}" alt="" />
      <span class="pnp-pbar__text"><strong>${esc(PAID.name)}</strong><small>${I.sealCheck}Verified<span class="pnp-vsep" aria-hidden="true"></span>${esc(PAID.priceFrom)} onwards</small></span>
      <span class="pnp-btn pnp-btn--primary pnp-btn--sm">View</span>
    </a>
    <a class="pnp-pbar__next" href="${PAID_URL}" data-pnp-paid tabindex="-1">
      <span class="pnp-pbar__fill" aria-hidden="true"></span>
      <span class="pnp-pbar__label">Moving to ${esc(PAID.name)}</span>
    </a>
  </div>`;
}


/** Full PDP for the active dataset D (hero + every section + footer). */
function fullPdpHtml(showPhotos, showSellerPhoto) {
  return `${heroHtml(showPhotos)}
    <main class="pnp-tray">${[
      summaryHtml(showSellerPhoto),
      overviewHtml(),
      plansHtml(),
      aboutHtml(),
      paymentHtml(),
      investHtml(),
      brochureHtml(),
      compareHtml(),
      neighbourhoodHtml(),
      betterHtml(),
      sellersHtml(showSellerPhoto),
      developerHtml(),
      faqHtml(),
      linksHtml(),
      crumbsHtml(),
      disclaimerHtml(),
      footerHtml(),
    ].join("")}</main>`;
}

/* Option 3 — Picture-in-picture: the page is the paid PDP; the free project the
   buyer tapped floats as a small card that flips to its basics. */
function pipHtml() {
  return `<div class="pnp-pip" data-pnp-pip role="button" tabindex="0" aria-expanded="false" aria-label="Your pick, ${esc(DATA.name)}">
    <div class="pnp-pip__inner">
      <div class="pnp-pip__face pnp-pip__front">
        <img src="${A}hero.jpg" alt="" />
        <span class="pnp-pip__text"><small>Your pick</small><strong>${esc(DATA.name)}</strong><span>${esc(DATA.price)}</span></span>
      </div>
      <div class="pnp-pip__face pnp-pip__back">
        <dl>
          <div><dt>Price</dt><dd>${esc(DATA.price)}</dd></div>
          <div><dt>Possession</dt><dd>May ‘29</dd></div>
          <div><dt>Locality</dt><dd>${esc(DATA.locality)}</dd></div>
        </dl>
        <a class="pnp-pip__open" href="${FREE_URL}">Open anyway</a>
      </div>
    </div>
  </div>`;
}

function initPip(root) {
  const pip = root.querySelector("[data-pnp-pip]");
  // Arrive from the top of the screen, as if the page the buyer tapped shrank into the corner.
  requestAnimationFrame(() => pip.classList.add("is-in"));
  setTimeout(() => pip.classList.add("is-in"), 50);
  const flip = (e) => {
    if (e.target.closest(".pnp-pip__open")) return;
    const open = pip.classList.toggle("is-flipped");
    pip.setAttribute("aria-expanded", String(open));
  };
  pip.addEventListener("click", flip);
}

/* Option 4 — Pop-up: the free PDP loads under an overlay and a "Recommended for you"
   card sits on top straight away. Closing it leaves the buyer on the free PDP. */
function popupHtml() {
  const why = [
    ["Price from", PAID.priceFrom, "₹25 L lower"],
    ["Possession", PAID.possession, "17 months sooner"],
    ["Distance", PAID.distance.replace(" away", ""), "from your pick"],
  ];
  return `<div class="pnp-pop" data-pnp-pop hidden>
    <button type="button" class="pnp-pop__scrim" data-action="pnp-pop-close" aria-label="Close"></button>
    <div class="pnp-pop__card" role="dialog" aria-modal="true" aria-labelledby="pnp-pop-title">
      <div class="pnp-pop__media">
        <img src="${PAID.img}" alt="" />
        <button type="button" class="pnp-ico pnp-pop__close" data-action="pnp-pop-close" aria-label="Close">${ISP_ICONS.closeCross}</button>
      </div>
      <div class="pnp-pop__body">
        <p class="pnp-pop__eyebrow">Recommended for you</p>
        <div class="pnp-summary__title">
          <h2 class="pnp-h1" id="pnp-pop-title">${esc(PAID.name)}</h2>
          <p class="pnp-summary__price"><strong>${esc(PAID.price)}</strong><span class="pnp-vsep" aria-hidden="true"></span><span>${esc(PAID.area)}</span></p>
          <p class="pnp-recsum__loc">${I.mapPin}${esc(PAID.locality)}</p>
        </div>
        <div class="pnp-recsum__tiles">${why
          .map(([k, v, note]) => `<div><small>${esc(k)}</small><strong>${esc(v)}</strong><em>${esc(note)}</em></div>`)
          .join("")}</div>
        <div class="pnp-recsum__offer">
          <span class="pnp-recsum__offer-tag">Offer</span>
          <p><strong>Pay 10% now,</strong> rest on possession.</p>
        </div>
        <ul class="pnp-recsum__perks">
          <li>${I.sealCheck}Prices and floor plans verified by the developer</li>
          <li>${I.phone}Developer calls back in under 30 minutes</li>
        </ul>
        <div class="pnp-pop__ctas">
          <a class="pnp-btn pnp-btn--outline" href="${PAID_URL}" data-pnp-paid>View details</a>
          <button type="button" class="pnp-btn pnp-btn--primary">Contact developer</button>
        </div>
        <button type="button" class="pnp-pop__stay" data-action="pnp-pop-close">Continue with ${esc(DATA.name)}</button>
      </div>
    </div>
  </div>`;
}

function initPopup(root) {
  const pop = root.querySelector("[data-pnp-pop]");
  let lockedY = 0;
  const open = () => {
    lockedY = window.scrollY;
    Object.assign(document.body.style, { position: "fixed", top: `-${lockedY}px`, left: "0", right: "0" });
    pop.hidden = false;
    void pop.offsetWidth;
    pop.classList.add("is-open");
  };
  const close = () => {
    pop.classList.remove("is-open");
    setTimeout(() => {
      pop.hidden = true;
      ["position", "top", "left", "right"].forEach((k) => document.body.style.removeProperty(k));
      window.scrollTo(0, lockedY);
    }, 280);
  };
  setTimeout(open, 350);
  root.addEventListener("click", (e) => {
    if (e.target.closest('[data-action="pnp-pop-close"]')) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !pop.hidden) close();
  });
}

export function renderPdpNpPage(root) {
  const params = new URLSearchParams(window.location.search);
  const showPhotos = params.get("photos") !== "0";
  const showSellerPhoto = params.get("sellerPhoto") !== "0";
  const isPaid = params.get("paid") === "1";
  const opt = isPaid ? 0 : Number(params.get("opt")) || 0;
  D = isPaid ? PAID_DATA : DATA;

  if (opt === 3) D = PAID_DATA;
  const page =
    opt === 1
      ? landedHtml(showSellerPhoto)
      : fullPdpHtml(showPhotos, showSellerPhoto);

  document.documentElement.classList.add("pnp-on");
  document.title = `${D.name} — Housing`;
  root.innerHTML = `<div class="pnp${opt ? ` pnp--opt${opt}` : ""}${isPaid ? " pnp--paid" : ""}" data-pnp-opt="${opt}">
    ${stickyHeaderHtml()}
    ${page}
    ${opt === 2 ? paidBarHtml() : bottomNavHtml()}
    ${opt === 2 ? takeoverSheetHtml() : ""}
    ${opt === 3 ? pipHtml() : ""}
    ${opt === 4 ? popupHtml() : ""}
  </div>`;
  root.removeAttribute("aria-busy");
  document.documentElement.classList.remove("no-fouc");

  initGallery(root);
  initChrome(root);
  initInteractions(root);
  if (opt === 2) initTakeover(root);
  if (opt === 3) initPip(root);
  if (opt === 4) initPopup(root);
}

const AUTO_MOVE_MS = 3000;

function initTakeover(root) {
  const sheet = root.querySelector("[data-pnp-sheet]");
  const panel = sheet.querySelector(".pnp-sheet__panel");
  // Freeze the page behind the sheet (position: fixed also stops iOS Safari scrolling it).
  let lockedY = 0;
  const lockScroll = () => {
    lockedY = window.scrollY;
    Object.assign(document.body.style, { position: "fixed", top: `-${lockedY}px`, left: "0", right: "0" });
  };
  const unlockScroll = () => {
    ["position", "top", "left", "right"].forEach((p) => document.body.style.removeProperty(p));
    window.scrollTo(0, lockedY);
  };
  const open = () => {
    lockScroll();
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
  };
  const close = () => {
    if (sheet.hidden) return;
    panel.style.removeProperty("transform");
    sheet.classList.remove("is-open");
    sheet.classList.add("is-closing");
    setTimeout(() => {
      sheet.hidden = true;
      sheet.classList.remove("is-closing");
      unlockScroll();
    }, 360);
  };
  // Let the buyer see the page they picked before suggesting the alternative.
  setTimeout(open, 1600);
  root.addEventListener("click", (e) => {
    if (e.target.closest('[data-action="pnp-sheet-close"]')) close();
  });

  // Swipe down on the sheet to dismiss.
  let startY = null;
  panel.addEventListener("touchstart", (e) => (startY = e.touches[0].clientY), { passive: true });
  panel.addEventListener(
    "touchmove",
    (e) => {
      if (startY == null) return;
      const dy = Math.max(0, e.touches[0].clientY - startY);
      panel.style.transition = "none";
      panel.style.transform = `translateY(${dy}px)`;
    },
    { passive: true }
  );
  panel.addEventListener("touchend", (e) => {
    if (startY == null) return;
    const dy = e.changedTouches[0].clientY - startY;
    startY = null;
    panel.style.removeProperty("transition");
    if (dy > 80) close();
    else panel.style.removeProperty("transform");
  });

  // End of the free PDP: the paid bar becomes "Moving to …" and fills, then opens the paid PDP.
  const bar = root.querySelector("[data-pnp-pbar]");
  const foot = root.querySelector(".pnp-foot");
  let timer;
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (timer) return;
        bar.classList.add("is-moving");
        timer = setTimeout(() => (window.location.href = PAID_URL), AUTO_MOVE_MS);
      } else {
        clearTimeout(timer);
        timer = undefined;
        bar.classList.remove("is-moving");
      }
    },
    { threshold: 0.35 }
  ).observe(foot);
}

function initGallery(root) {
  const track = root.querySelector("[data-pnp-gallery]");
  if (!track) return;
  const count = root.querySelector("[data-pnp-count]");
  const dots = Array.from(root.querySelectorAll(".pnp-hero__dots i"));
  track.addEventListener(
    "scroll",
    () => {
      const i = Math.round(track.scrollLeft / (track.clientWidth || 1));
      if (count) count.textContent = `${i + 1} / ${D.photoCount}`;
      dots.forEach((d, j) => d.classList.toggle("is-on", j === Math.min(i, dots.length - 1)));
    },
    { passive: true }
  );
}

/** Sticky header once the hero scrolls away; bottom nav once the summary Contact leaves view. */
function initChrome(root) {
  const sticky = root.querySelector("[data-pnp-sticky]");
  const bnav = root.querySelector("[data-pnp-bnav], [data-pnp-pbar]");
  const hero = root.querySelector(".pnp-hero, .pnp-topbar");
  const bridge = root.querySelector("[data-pnp-bridge]");
  const titleName = sticky.querySelector(".pnp-sticky__title small");
  const titlePrice = sticky.querySelector(".pnp-sticky__title strong");
  const contacts = Array.from(root.querySelectorAll(".pnp-btn--contact"));
  const update = () => {
    const heroGone = hero.getBoundingClientRect().bottom <= sticky.offsetHeight;
    sticky.classList.toggle("is-visible", heroGone);
    sticky.setAttribute("aria-hidden", heroGone ? "false" : "true");
    if (bridge) {
      const inPaid = bridge.getBoundingClientRect().top < sticky.offsetHeight;
      titleName.textContent = inPaid ? PAID.name : DATA.name;
      titlePrice.textContent = inPaid ? PAID.price : DATA.price;
    }
    // First visible Contact (option 1 keeps the free project's summary hidden until expanded).
    const contact = contacts.find((el) => el.offsetParent) || contacts[0];
    const contactGone = contact.getBoundingClientRect().bottom < 0;
    bnav.classList.toggle("is-visible", contactGone);
    root.querySelector(".pnp").classList.toggle("has-bnav", contactGone);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

function initInteractions(root) {
  root.addEventListener("click", (e) => {
    const t = e.target;
    const tab = t.closest(".pnp-tab");
    if (tab) {
      tab.parentElement.querySelectorAll(".pnp-tab").forEach((b) => {
        const on = b === tab;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      return;
    }
    const chip = t.closest(".pnp-pchip");
    if (chip) {
      chip.parentElement.querySelectorAll(".pnp-pchip").forEach((b) => {
        const on = b === chip;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      root.querySelector("[data-pnp-place-list]").innerHTML = placeItems(chip.dataset.cat);
      return;
    }
    const copy = t.closest("[data-copy]");
    if (copy) {
      navigator.clipboard?.writeText(copy.dataset.copy).catch(() => {});
      copy.classList.add("is-copied");
      setTimeout(() => copy.classList.remove("is-copied"), 1200);
      return;
    }
    const action = t.closest("[data-action]")?.dataset.action;
    if (action === "pnp-back") {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "/srp.html";
    } else if (action === "pnp-more") {
      const wrap = t.closest(".pnp-more");
      const open = wrap.classList.toggle("is-open");
      t.closest("[data-action]").textContent = open ? "Read less" : "Read more";
    } else if (action === "pnp-rec") {
      const card = t.closest(".pnp-rcard");
      const more = card.querySelector("[data-pnp-rec-more]");
      more.hidden = !more.hidden;
      const open = !more.hidden;
      card.classList.toggle("is-open", open);
      const toggle = card.querySelector("[data-action='pnp-rec']");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Hide details" : "See full details";
    } else if (action === "pnp-faq") {
      const item = t.closest(".pnp-faq__item");
      const open = item.classList.toggle("is-open");
      item.querySelector(".pnp-faq__q").setAttribute("aria-expanded", String(open));
    } else if (action === "pnp-faq-more") {
      const sec = t.closest(".pnp-faq");
      const open = sec.classList.toggle("is-expanded");
      t.closest("[data-action]").querySelector("span").textContent = open ? "View less" : "View more";
    }
  });
}
