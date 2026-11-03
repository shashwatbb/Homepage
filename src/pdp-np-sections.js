// Desktop NP PDP: sections from the final Figma (PDP [Demand] > Desktop: NP PDP, node 3602:23538) that the page
// didn't have yet, inserted in Figma order around the existing sections, plus the sticky summary card.
// Mock data only. Every contact CTA opens the desktop CRF (crf-dweb.js).
import "./styles/pdp-np-sections.css";
import "./styles/pdp-np-fold.css";
import { PDP_NP_ICONS as I } from "./data/pdpNpDesktopIcons.js";
import { openCrf } from "./crf-dweb.js";

const B = import.meta.env.BASE_URL;
const img = (p) => `${B}${p.replace(/^\//, "")}`;
const sep = `<span class="pnp-sep" aria-hidden="true"></span>`;
const head = (title, link) => `<div class="pnp-head"><h2 class="pnp-title">${title}</h2>${link ? `<a href="#" class="pnp-link" data-action="pnp-noop">${link}</a>` : ""}</div>`;
const collapse = `<button type="button" class="pnp-collapse" data-action="pnp-collapse" aria-expanded="true" aria-label="Collapse section">${I.caretUp}</button>`;
const arrow = `<button type="button" class="pnp-arrow" data-action="pnp-next" aria-label="Next">${I.caretRight}</button>`;
const card = (id, inner, extra = "") => `<section class="pnp-card ${extra}" id="${id}">${inner}</section>`;

const PHOTOS = ["Buy card 1.jpg", "Buy card 2.jpg", "pdp-np/project-card.jpg", "pdp-gallery/2.png", "pdp-gallery/3.png"];
const listing = ({ i = 0, chips = true, rows, name = true }) => `
  <article class="pnp-listing">
    <div class="pnp-listing__media"><img src="${img(PHOTOS[i % PHOTOS.length])}" alt="" loading="lazy"><button type="button" class="pnp-heart" data-action="pnp-like" aria-pressed="false" aria-label="Save">${I.heart}</button></div>
    <div class="pnp-listing__body">
      ${chips ? `<div class="pnp-chips"><span class="pnp-chip pnp-chip--green">RERA</span><span class="pnp-chip">Possession by Dec, 2026</span></div>` : ""}
      ${name ? `<div><p class="pnp-listing__name">Shapoorji Joyville</p><p class="pnp-listing__loc">Mundhwa Road, East Pune</p></div>` : ""}
      <dl class="pnp-rows">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </div>
    <div class="pnp-listing__cta"><button type="button" class="pnp-btn pnp-btn--secondary" data-action="pnp-contact">Contact seller</button></div>
  </article>`;
const carousel = (items) => `<div class="pnp-carousel"><div class="pnp-track">${items}</div>${arrow}</div>`;
const projectRows = [["Configuration", "2, 3, 4 BHK"], ["Built up area", "1250 - 1400 sq.ft."], ["Price range", "₹90 L - ₹1.42 Cr"]];

// Rebuilt 1:1 versions of the page's older sections (originals stay hidden in the DOM for their scripts)
const R = {
  about: () => card("pnp-about", `<h2 class="pnp-title">About this property</h2>
    <ul class="pnp-about">${[["park", "Private landscaped garden with water body"], ["trophy", "Fitness center with pool"], ["pinArea", "Just 6 km from Whitefield Metro"], ["chartUp", "Future growth"], ["pool", "Lifestyle recreation"], ["shieldStar", "Safety"], ["pinArea", "Social infrastructure"], ["cpu", "Smart living"], ["blueprint", "Innovative cantilevered terrace"], ["shootingStar", "Utilities configuration"]].map(([k, t]) => `<li>${I[k]}<span>${t}</span></li>`).join("")}</ul>
    <div class="pnp-readmore"><p class="pnp-h6 pnp-clamp">The Palm Drive, a perfect combination of apartments and villas, is a creation by Emaar at a strategic location, Sector 66 in Gurgaon. Offering breathtaking views of the Aravalli hills, the project brings together landscaped greens, a clubhouse and smart homes</p><button type="button" class="pnp-link" data-action="pnp-readmore">Read more</button></div>`),

  floorplans: () => card("pnp-floor", `<h2 class="pnp-title pnp-pad">Floor plan and pricing</h2>
    <div class="pnp-tabs pnp-tabs--flush" role="tablist">${["2BHK", "3 BHK", "4 BHK"].map((t, i) => `<button type="button" role="tab" class="${i ? "" : "is-on"}" data-action="pnp-tab">${t}</button>`).join("")}</div>
    <div class="pnp-carousel pnp-pad-l">${`<div class="pnp-track">${["floor-plan-3bhk.png", "floor-plan-4bhk.png", "floor-plan-3bhk.png"].map((f) => `
      <article class="pnp-plan"><div class="pnp-plan__img"><img src="${img(f)}" alt="" loading="lazy"><span class="pnp-plan__ctl pnp-plan__ctl--2d">2D</span><span class="pnp-plan__ctl pnp-plan__ctl--zoom">${I.plus}<i></i>${I.minus}</span><span class="pnp-plan__ctl pnp-plan__ctl--rot">${I.arrowsClockwise}</span></div>
        <div class="pnp-plan__body"><div><p class="pnp-label">Property type</p><p class="pnp-h6m">Apartment</p></div><div><p class="pnp-label">Floor</p><p class="pnp-h6m">First floor${I.caretDown}</p></div><div><p class="pnp-label">Super built-up area</p><p class="pnp-h6m">1500-1700 sq.ft.</p></div><div><p class="pnp-label">Price</p><p class="pnp-h6m">₹2.25 Cr - 2.55 Cr</p></div>
        <button type="button" class="pnp-btn pnp-btn--secondary pnp-btn--l" data-action="pnp-contact">Contact</button></div></article>`).join("")}</div>`}${arrow}</div>`, "pnp-card--flush"),

  payment: () => card("pnp-payment", `<h2 class="pnp-title pnp-pad">Payment plan</h2>
    <div class="pnp-pad pnp-stack24">
      <button type="button" class="pnp-emi-card" data-action="pnp-emi"><span class="pnp-emi-card__art"><img src="${img("pdp-np/payment-plan.png")}" alt="" width="96" height="88"></span><span class="pnp-emi-card__txt"><span class="pnp-h6">EMI starts for 3BHK at <b>₹1.5L/month</b></span><span class="pnp-meta pnp-meta--16"><span>Duration: 30 years</span>${sep}<span>Interest: 7.5%</span></span></span>${I.caretRight}</button>
      <div class="pnp-stack16"><p class="pnp-offers">Offers</p><ul class="pnp-lines">${["Payment Plan - 40:30:30", "40% within 30 days from the date of booking", "30% upon completion of the terrace slab", "30% upon receipt of OC"].map((t) => `<li>${t}</li>`).join("")}</ul></div>
    </div>`, "pnp-card--flush"),

  insights: () => card("pnp-insights", `${head("Investment insights", "View detailed insights")}
    <div class="pnp-ins">
      <ul class="pnp-ins__list">
        <li><span>Appreciation since ‘23</span><b class="pnp-up">${I.arrowUp}15.3%</b></li>
        <li><span><i class="pnp-sw pnp-sw--3"></i>Current value of a 3BHK</span><b>₹2.12 Cr</b></li>
        <li class="pnp-dash"><span><i class="pnp-sw pnp-sw--6"></i>Projected value</span><b>₹3.32 Cr</b></li>
        <li><span>3Y returns</span><b class="pnp-up">${I.arrowUp}18.3%</b></li>
      </ul>
      <img class="pnp-ins__chart" src="${img("pdp-np/insights-chart.svg")}" alt="Price trend chart" width="360" height="248">
    </div>
    <div class="pnp-ins__foot"><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--l pnp-btn--auto" data-action="pnp-contact">Contact seller to invest</button></div>`),

  compare: () => {
    const cols = [0, 1, 2];
    const row = (k, v) => `<tr><th>${k}</th>${cols.map(() => `<td>${v}</td>`).join("")}</tr>`;
    return card("pnp-compare", `<h2 class="pnp-title">Compare with other projects</h2>
      <div class="pnp-cmp-chips"><button type="button" class="pnp-cmp-chip is-on">Emaar MGF The Palm Drive${I.xCircleFill}</button><button type="button" class="pnp-cmp-chip is-on">Luxurion 75 Residences${I.xCircleFill}</button><button type="button" class="pnp-cmp-chip">Lodha World Towers${I.plusCircle}</button><button type="button" class="pnp-cmp-chip">Add others${I.plusCircle}</button></div>
      <div class="pnp-cmp"><table><tbody>
        <tr class="pnp-cmp__top"><th>Project</th>${cols.map((i) => `<td><img src="${img(PHOTOS[0])}" alt="" loading="lazy"><span>Emaar MGF<br>The Palm Drive</span></td>`).join("")}</tr>
        ${row("Address", "KR Pet, Sector 39,<br>Pune")}${row("Possession", "By May, 2028")}${row("BHK", "3 BHK")}${row("Carpet size", "1900 sq.ft.")}${row("Price", "₹2.85 Cr")}
        <tr><th></th>${cols.map(() => `<td><button type="button" class="pnp-btn pnp-btn--secondary pnp-btn--l" data-action="pnp-contact">Contact</button></td>`).join("")}</tr>
      </tbody></table></div>`);
  },

  reviews: () => card("pnp-reviews", `<h2 class="pnp-title">Ratings and reviews</h2>
    <div class="pnp-pills"><button type="button" class="pnp-pill" data-action="pnp-pill">Locality</button><button type="button" class="pnp-pill is-on" data-action="pnp-pill">Projects</button></div>
    <div class="pnp-rev">
      <div class="pnp-rev__score"><p class="pnp-rev__big">${I.star}4.3</p><p class="pnp-body">Based on 653 ratings</p></div>
      <div class="pnp-rev__cats">${[["path", "Connectivity", "4.8"], ["mapPin", "Neighbourhood", "4.7"], ["shield", "Safety", "4.7"], ["smiley", "Livability", "4.0"]].map(([k, t, v]) => `<div>${I[k]}<p class="pnp-body">${t}</p><p class="pnp-h6m">${v}</p></div>`).join("")}</div>
      <div class="pnp-head"><p class="pnp-h6m">127 reviews</p><a href="#" class="pnp-link" data-action="pnp-noop">View all reviews</a></div>
      <div class="pnp-carousel pnp-carousel--rev"><div class="pnp-track">${[0, 1, 2].map(() => `<article class="pnp-review"><div class="pnp-review__top"><img src="${img("pdp-np/seller.png")}" alt="" width="44" height="44"><div><p class="pnp-h6">Maheep Singh</p><p class="pnp-meta"><span>Owner</span>${sep}<span>1 year ago</span></p></div><span class="pnp-review__rate">${I.star}4.2</span></div><p class="pnp-strong">Average locality</p><p class="pnp-body">Carpet area of 2 BHK flat starts from 782 sqft, 3 BHK flat starts from 1025 sqft, 4 BHK flat starts from 1292 sqft.</p></article>`).join("")}</div>${arrow}</div>
    </div>`),

  faq: () => card("pnp-faq", `<h2 class="pnp-title">Frequently asked questions</h2>
    <ul class="pnp-faq">${[0, 1, 2].map((i) => `<li class="${i ? "" : "is-open"}"><button type="button" data-action="pnp-faq"><span>What is the pin code of Dotom Blumen?</span>${I.caretDown}</button><p class="pnp-body">Hospitals such as Dr L H Hiranandani Hospital, Zynova Shalby Hospital, Godrej Memorial Hospital are located close to Dotom Blumen, giving residents easy access to good healthcare.</p></li>`).join("")}</ul>
    <button type="button" class="pnp-viewmore" data-action="pnp-noop">View more${I.caretDown}</button>`),
};

const S = {
  phases: () => card("pnp-phases", `${head("Project phases")}
    <ul class="pnp-phases">${[0, 1].map(() => `<li><button type="button" data-action="pnp-noop"><span class="pnp-chip">Ready to move</span><span class="pnp-strong">Drishti City Block F</span>${I.caretRight}</button></li>`).join("")}</ul>`),

  overview: () => card("pnp-overview", `${head("Project overview")}
    <div class="pnp-tiles">${[["Units", "457"], ["Last updated: Jun 2, 2026", "12 acres"], ["Size", "775 - 1614 sq.ft."], ["Launch date", "Aug, 2019"], ["Avg. price", "10.41 K/sq.ft"], ["Possession status", "Under construction"]].map(([k, v]) => `<div class="pnp-tile"><p class="pnp-muted">${k}</p><p class="pnp-value">${v}</p></div>`).join("")}</div>
    <div class="pnp-ids"><span class="pnp-id">RERA ID: <a href="#" data-action="pnp-noop">7865/GHTF/SLP/2026-BP</a> <u>+ 3 more</u><button type="button" data-action="pnp-copy" aria-label="Copy RERA ID">${I.copy}</button></span><span class="pnp-id">Permit ID: 7865/GHTF/SLP/2026-BP<button type="button" data-action="pnp-copy" aria-label="Copy permit ID">${I.copy}</button></span></div>
    <div class="pnp-foot"><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--sm" data-action="pnp-contact">Ask for details</button></div>`),

  registry: () => card("pnp-registry", `${head("Government registry records", "View all registrations")}
    <div class="pnp-table-wrap"><table class="pnp-table"><thead><tr><th>Date</th><th>Agreement price</th><th>Area</th><th>Rate / sq.ft.</th><th>Flat and floor</th></tr></thead><tbody>
      <tr><td>19 May, ‘26</td><td><a href="#" class="pnp-under" data-action="pnp-contact">View price</a></td><td>211 sq.ft.</td><td><a href="#" class="pnp-under" data-action="pnp-contact">View rate</a></td><td>14th floor</td></tr>
      ${[0, 1, 2].map(() => `<tr><td>19 May, ‘26</td><td>₹86.3 L</td><td>1911 sq.ft.</td><td>₹17,279 / sq.ft</td><td>14th floor</td></tr>`).join("")}
    </tbody></table></div><p class="pnp-source">Data source: Maharashtra government</p>`),

  resale: () => card("pnp-resale", `${head("Explore properties for resale")}${carousel([0, 1, 2, 3].map((i) => listing({ i, rows: projectRows })).join(""))}`),
  nearby: () => card("pnp-nearby", `${head("Preferred projects nearby")}${carousel([1, 2, 0, 3].map((i) => listing({ i, rows: projectRows })).join(""))}`),

  brochure: () => card("pnp-brochure", `${head("Project brochure")}
    <div class="pnp-brochure"><p class="pnp-brochure__brand">EMARR MGF</p>
      <div class="pnp-carousel pnp-carousel--brochure"><div class="pnp-track">${["pdp-np/brochure-1.jpg", "pdp-np/brochure-2.jpg", "pdp-gallery/1.png", "pdp-np/brochure-1.jpg"].map((p) => `<div class="pnp-page"><img src="${img(p)}" alt="" loading="lazy"></div>`).join("")}</div>${arrow}</div>
      <div class="pnp-brochure__ctas"><button type="button" class="pnp-btn pnp-btn--secondary pnp-btn--auto" data-action="pnp-noop">View brochure</button><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--auto" data-action="pnp-contact">Download brochure</button></div>
    </div>`),

  better: () => card("pnp-better", `${head("Better priced projects", "View all")}${carousel([0, 1, 2, 3].map((i) => listing({ i, rows: projectRows })).join(""))}`),

  amenities: () => {
    const a = [["gazebo", "Gazebo"], ["sprinkler", "Fire sprinklers"], ["pingPong", "Table tennis"], ["medical", "Medical store"], ["drop", "Water softener plant"]];
    const col = (list) => `<ul class="pnp-amen">${list.map(([k, t]) => `<li>${I[k]}<span>${t}</span></li>`).join("")}</ul>`;
    return card("pnp-amenities", `${head("Amenities")}<div class="pnp-amen-cols">${col(a)}${col(a.slice(0, 4)).replace("</ul>", `<li><a href="#" class="pnp-link" data-action="pnp-noop">View all</a></li></ul>`)}</div>`);
  },

  buyRent: () => card("pnp-buyrent", `${head("Properties available to buy/rent", "View all")}
    <div class="pnp-tabs" role="tablist"><button type="button" role="tab" class="is-on" data-action="pnp-tab">Buy</button><button type="button" role="tab" data-action="pnp-tab">Rent</button></div>
    <div class="pnp-pills"><button type="button" class="pnp-pill" data-action="pnp-pill">2 BHK</button><button type="button" class="pnp-pill is-on" data-action="pnp-pill">3 BHK</button></div>
    ${carousel([0, 0, 0, 0].map((i) => listing({ i, chips: false, name: false, rows: [["Configuration", "3 BHK"], ["Built up area", "1400 sq.ft."], ["Price", "₹1.42 Cr"]] })).join(""))}`),

  developers: () => card("pnp-developers", `<div class="pnp-head"><h2 class="pnp-title">About the developers</h2>${collapse}</div>
    <div class="pnp-collapsible">
      <div class="pnp-dev">
        <div class="pnp-dev__top"><img src="${img("pdp-np/seller.png")}" alt="" width="40" height="40"><div><p class="pnp-strong">Ambit Realtors</p><p class="pnp-meta"><span>Established in 1998</span>${sep}<span>11 projects</span></p></div></div>
        <div class="pnp-dev__desc"><p class="pnp-body pnp-clamp">The Palm Drive, a perfect combination of apartments and villas, is a creation by Emaar at a strategic location, Sector 66 in Gurgaon. Offering breathtaking views and premium amenities, it sets a new benchmark for luxury living</p><button type="button" class="pnp-link" data-action="pnp-readmore">Read more</button></div>
        <div class="pnp-dev__foot"><p class="pnp-price">₹1.4 Cr - ₹2.6 Cr</p><button type="button" class="pnp-btn pnp-btn--secondary pnp-btn--auto" data-action="pnp-contact">Contact this seller</button></div>
      </div>
      <div class="pnp-tabs pnp-tabs--3" role="tablist">${["Ready to move", "Within 3 years", "Beyond 3 years"].map((t, i) => `<button type="button" role="tab" class="${i ? "" : "is-on"}" data-action="pnp-tab">${t}</button>`).join("")}</div>
      ${carousel([0, 0, 0, 0].map(() => listing({ i: 0, chips: false, rows: [["Configuration", "2, 3, 4 BHK"], ["Price range", "₹90 L - ₹1.42 Cr"]] })).join(""))}
    </div>`),

  sellers: () => card("pnp-sellers", `${head("Sellers for this project")}
    <ul class="pnp-sellers">${[0, 1].map(() => `<li><img src="${img("pdp-np/seller.png")}" alt="" width="48" height="48"><div><p class="pnp-strong">Deepak Arora</p><p class="pnp-muted">₹1.4 Cr - ₹2.6 Cr</p></div><button type="button" class="pnp-btn pnp-btn--secondary pnp-btn--auto" data-action="pnp-contact">Contact seller</button></li>`).join("")}</ul>`),

  neighbourhood: () => {
    const cats = [["education", "Education", true], ["health", "Healthcare"], ["commute", "Commute"], ["food", "Food & restaurants"], ["shopping", "Shopping"]];
    return card("pnp-hood", `${head("Explore neighbourhood")}
      <div class="pnp-map"><img src="${img("pdp-np/map.jpg")}" alt="Map around the project" loading="lazy">
        <div class="pnp-map__panel">${cats.map(([k, t, open]) => `<div class="pnp-acc ${open ? "is-open" : ""}"><button type="button" class="pnp-acc__head" data-action="pnp-acc">${I[k]}<span>${t}</span>${I.caretDown}</button>${open ? `<ul class="pnp-acc__list">${[["Billabong High International School", true], ["Millat High School"], ["Millat High School"]].map(([n, on]) => `<li class="${on ? "is-on" : ""}"><p>${n}</p><p class="pnp-muted">1.3 km</p></li>`).join("")}</ul>` : ""}</div>`).join("")}</div>
      </div>
      <div class="pnp-guide">${head("Locality guide", "Know more")}
        <div class="pnp-guide__grid"><img src="${img("pdp-gallery/1.png")}" alt="" loading="lazy">${["pdp-gallery/3.png", "pdp-gallery/3.png", "pdp-gallery/4.png", "pdp-gallery/4.png"].map((p) => `<img src="${img(p)}" alt="" loading="lazy">`).join("")}<button type="button" class="pnp-viewall" data-action="pnp-noop">${I.dots}View all</button></div>
        <div><p class="pnp-body pnp-clamp">Andheri West is a prominent and vibrant neighbourhood in Mumbai. It has stunning sea-side landscapes and natural beauty, and is more affluent than its eastern counterpart. The bulk of the population lives in high rise apartments with modern amenities</p><button type="button" class="pnp-link" data-action="pnp-readmore">Read more</button></div>
        <h3 class="pnp-subtitle">Locality highlights</h3>
        <ul class="pnp-highlights"><li>${I.train}Local train network available from Andheri station</li><li>${I.airplane}International Airport is located less than 8 kms away and is easily accessible by road</li><li>${I.trendUp}Andheri West is a residential cum commercial area that will continue to grow</li></ul>
      </div>`);
  },

  tools: () => card("pnp-tools", `${head("Helpful tools")}
    <div class="pnp-tools">${[["green", "emi", "EMI calculator", "EMI at ₹1.12 L"], ["purple", "rupee", "Affordability calculator", "Assess your budget"], ["yellow", "eligible", "Eligibility calculator", "Assess your budget"]].map(([c, k, t, s]) => `<button type="button" class="pnp-tool pnp-tool--${c}" data-action="pnp-noop"><span class="pnp-tool__icon">${I[k]}</span><span><span class="pnp-strong">${t}</span><span class="pnp-body">${s}</span></span></button>`).join("")}</div>`),

  qna: () => card("pnp-qna", `<div class="pnp-head"><h2 class="pnp-title">Questions and answers</h2>${collapse}</div>
    <div class="pnp-collapsible"><ul class="pnp-qna">${[["What is the total carpet area of units in the project?", "Carpet area of 2 BHK flat starts from 782 sqft, 3 BHK flat starts from 1025 sqft, 4 BHK flat starts from 1292 sqft."], ["How much has the price appreciation has the project seen over the years since it's launch?", "Project price has appreciated by 3.95% in last 1 year"], ["How much has the price appreciation has the project seen over the years since it's launch?", "Project price has appreciated by 3.95% in last 1 year"]].map(([q, a]) => `<li><p class="pnp-q">${q}</p><p class="pnp-body">${a}</p><p class="pnp-muted">8 months ago</p></li>`).join("")}</ul>
    <div class="pnp-qna__foot"><p class="pnp-fine">Disclaimer: While Housing.com takes all steps to ensure accuracy of the information provided in this section, please check the same with the developers. Housing.com does not take responsibility for any discrepancies in the information provided.</p><button type="button" class="pnp-btn pnp-btn--primary pnp-btn--auto" data-action="pnp-contact">Got questions?</button></div></div>`),

  news: () => card("pnp-news", `${head("News")}${carousel(["pdp-gallery/5.png", "pdp-gallery/2.png", "pdp-gallery/4.png", "pdp-gallery/1.png"].map((p) => `<article class="pnp-news"><img src="${img(p)}" alt="" loading="lazy"><p class="pnp-news__title">How are emerging micro markets shaping Mumbai's next set of luxury</p><p class="pnp-body pnp-clamp2">The Palm Drive, a perfect combination of apartments and villas, is a creation by EMAAR at a strategic location</p><div class="pnp-news__foot"><span>Ram Raheja</span><span>Apr 2026</span></div></article>`).join(""))}`),

  quick: () => card("pnp-quick", `${head("Quick links")}<p class="pnp-quick">${["Adani Linkbay Residences Phase II Wing B - Brochure", "Adani Linkbay Residences Map", "Adani Linkbay Residences Map", "Adani Linkbay Residences Map"].map((t) => `<a href="#" data-action="pnp-noop">${t}</a>`).join(sep)}</p>`),

  crumbs: () => `<nav class="pnp-crumbs" id="pnp-crumbs" aria-label="Breadcrumb"><ol>${["Home", "Mumbai", "Vikhroli West"].map((t) => `<li><a href="#" data-action="pnp-noop">${t}</a>${I.caretRight}</li>`).join("")}<li aria-current="page">Dotom Blumen</li></ol><p class="pnp-fine">Disclaimer: While Housing.com takes all steps to ensure accuracy of the information provided in this section, please check the same with the developers. Housing.com does not take responsibility for any discrepancies in the information provided....</p></nav>`,
};

const sideCard = () => `
  <div class="pnp-side" id="pnp-side">
    <div class="pnp-side__card">
      <div class="pnp-side__top"><div class="pnp-chips"><span class="pnp-chip">RERA</span><span class="pnp-chip">${I.star}4.2 (27)</span></div><div class="pnp-side__icons"><button type="button" data-action="pnp-share" aria-label="Share">${I.share}</button>${sep}<button type="button" data-action="pnp-like" aria-pressed="false" aria-label="Save">${I.heart}</button></div></div>
      <div class="pnp-side__row"><img src="${img("pdp-gallery/1.png")}" alt="" width="52" height="52"><div><p class="pnp-side__name">Emaar MGF The Palm Drive</p><p class="pnp-meta"><span>1, 2 BHK apartments</span>${sep}<span>1125 - 5250 sq.ft</span></p></div></div>
      <div class="pnp-side__row pnp-side__row--rule"><img src="${img("pdp-np/seller.png")}" alt="" width="52" height="52"><div><p class="pnp-side__by">By Rohit Mehra <span class="pnp-chip">+4 others</span></p><p class="pnp-muted pnp-muted--md">Developer</p></div></div>
      <div class="pnp-side__price"><p class="pnp-muted pnp-muted--md">Price</p><p class="pnp-side__amount">₹1.4 Cr - ₹2.5 Cr <span class="pnp-emi">EMI at ₹1.12 L</span></p></div>
      <button type="button" class="pnp-btn pnp-btn--primary pnp-btn--lg" data-action="pnp-contact">${I.phone}Contact seller</button>
    </div>
    <button type="button" class="pnp-report" data-action="pnp-noop">${I.flag}<span>Report this listing</span></button>
  </div>`;

function mount() {
  document.querySelectorAll("[data-icon]").forEach((el) => { if (I[el.dataset.icon]) el.innerHTML = I[el.dataset.icon]; });
  const main = document.querySelector(".pdp-body-main");
  if (!main) return;
  const $ = (id) => document.getElementById(id);
  const after = (ref, html) => ref && ref.insertAdjacentHTML("afterend", html);
  // Older sections: insert the Figma rebuild in place and hide the original (kept for its existing scripts)
  for (const [id, key] of [["pdp-about-section", "about"], ["pdp-floorplans-section", "floorplans"], ["pdp-paymentplan-section", "payment"], ["pdp-insights-section", "insights"], ["pdp-compare-section", "compare"], ["pdp-reviews-section", "reviews"], ["pdp-faq-section", "faq"]]) {
    const old = $(id); if (!old) continue;
    old.insertAdjacentHTML("beforebegin", R[key]());
    old.hidden = true; old.classList.add("pnp-legacy");
  }
  // Figma order: About, Floor plan | Phases, Overview | Payment, Insights, Compare | Registry .. Amenities | Reviews |
  // Buy/rent .. Q&A | FAQ | News, Quick links, Breadcrumb
  after($("pdp-floorplans-section"), S.phases() + S.overview());
  after($("pdp-compare-section"), S.registry() + S.resale() + S.nearby() + S.brochure() + S.better() + S.amenities());
  const reviews = $("pdp-reviews-section");
  after(reviews, S.buyRent() + S.developers() + S.sellers() + S.neighbourhood() + S.tools() + S.qna());
  const faq = $("pnp-faq");
  if (faq) $("pnp-qna").after(faq);
  after(faq || $("pnp-qna"), S.news() + S.quick() + S.crumbs());

  const sticky = document.querySelector(".pdp-sidebar__sticky");
  const old = sticky?.querySelector(".pdp-lead-card");
  if (old) old.hidden = true; // kept for initPdpLeadForm bindings; Figma card replaces it
  sticky?.insertAdjacentHTML("afterbegin", sideCard());

  document.addEventListener("click", onClick);
}

function onClick(e) {
  const a = e.target.closest("[data-action^=pnp-]");
  if (!a) return;
  const act = a.dataset.action;
  if (a.tagName === "A") e.preventDefault();
  if (act === "pnp-contact") return openCrf();
  if (act === "pnp-share") return document.getElementById("pdp-share-btn")?.click();
  if (act === "pnp-like") { const on = a.getAttribute("aria-pressed") !== "true"; a.setAttribute("aria-pressed", on); return; }
  if (act === "pnp-next") { const t = a.parentElement.querySelector(".pnp-track"); const step = (t.firstElementChild?.getBoundingClientRect().width || 280) + 24; return t.scrollBy({ left: step, behavior: "smooth" }); }
  if (act === "pnp-tab" || act === "pnp-pill") { a.parentElement.querySelectorAll(".is-on").forEach((x) => x.classList.remove("is-on")); a.classList.add("is-on"); return; }
  if (act === "pnp-collapse") { const sec = a.closest(".pnp-card"); const open = a.getAttribute("aria-expanded") !== "true"; a.setAttribute("aria-expanded", open); sec.classList.toggle("is-collapsed", !open); return; }
  if (act === "pnp-readmore") { const p = a.previousElementSibling; const open = p.classList.toggle("is-open"); a.textContent = open ? "Read less" : "Read more"; return; }
  if (act === "pnp-acc") { a.parentElement.classList.toggle("is-open"); return; }
  if (act === "pnp-emi") return document.getElementById("pdp-paymentplan-card")?.click(); // EMI pop-up (existing)
  if (act === "pnp-faq") { a.parentElement.classList.toggle("is-open"); return; }
  if (act === "pnp-copy") { navigator.clipboard?.writeText(a.parentElement.textContent.trim()).catch(() => {}); return; }
}

export function initPdpNpSections() { mount(); }
