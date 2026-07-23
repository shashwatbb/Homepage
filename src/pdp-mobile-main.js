// Mobile-only PDP — rendered from mock data; no internal flows (sheets/modals).
import "./styles/base.css";
import "./styles/pdp-mobile.css";
import { getPdpMobileListing, pdpMobileImageSrc } from "./data/pdpMobile.mock.js";

const ICON_BACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;

const ICON_SHARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z" fill="currentColor"/></svg>`;

const ICON_HEART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" fill="currentColor"/></svg>`;

const ICON_STAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M234,111.65l-45.42,39.35,13.58,58.29a8,8,0,0,1-11.93,8.69L128,191.36,61.78,218a8,8,0,0,1-11.93-8.69l13.58-58.29L18,111.65a8,8,0,0,1,4.48-14.12l59.19-5.05L115.93,39a8,8,0,0,1,14.14,0l34.26,53.48,59.19,5.05a8,8,0,0,1,4.48,14.12Z" fill="currentColor"/></svg>`;

const ICON_MAP_PIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" fill="currentColor"/></svg>`;

const ICON_PHONE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,1-10.73-10.73,16,16,0,0,0,1.35-15.18l.07-.14L97.54,33.64a8,8,0,0,0-10.94-2.59A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,48.91-54.6A8,8,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,42.86L125.93,89.52l-1,1.83a32,32,0,0,0,42.45,42.45l1.83-1L213.14,173.12A40.18,40.18,0,0,1,176,208Z" fill="currentColor"/></svg>`;

function pdpWhatsappIconHtml(gradientId) {
  return `<svg class="pdp-m-bar__wa-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.1335 3.79311C14.4956 2.15412 12.3178 1.251 9.99739 1.25C5.21591 1.25 1.32474 5.13992 1.32283 9.92119C1.32227 11.4495 1.72161 12.9414 2.48064 14.2565L1.25 18.75L5.84848 17.5442C7.11545 18.2352 8.54198 18.5993 9.99366 18.5999H9.99734H9.99739C14.7781 18.5999 18.6698 14.7093 18.6719 9.92822C18.6727 7.61099 17.7711 5.43222 16.1335 3.79311ZM9.99739 17.1353H9.99457C8.70062 17.1346 7.43172 16.7872 6.32493 16.1304L6.06154 15.9743L3.3327 16.6898L4.06126 14.0301L3.88965 13.7575C3.16787 12.6098 2.78684 11.2836 2.78738 9.92174C2.78897 5.94771 6.02315 2.71465 10.0001 2.71465C11.926 2.71545 13.7361 3.46613 15.0974 4.82841C16.4586 6.19068 17.2078 8.00163 17.2072 9.9276C17.2055 13.9018 13.9712 17.1353 9.99739 17.1353Z" fill="#E0E0E0"/><path d="M1.64819 18.2514L2.82262 13.9632C2.09807 12.7081 1.71705 11.2843 1.71751 9.82604C1.71941 5.26327 5.43286 1.55115 9.99553 1.55115C12.21 1.55215 14.2884 2.41396 15.8511 3.97813C17.4142 5.54228 18.2744 7.62138 18.2735 9.83251C18.2716 14.3954 14.558 18.1078 9.99585 18.1078C9.99608 18.1078 9.99553 18.1078 9.99585 18.1078H9.99217C8.6068 18.1074 7.24555 17.7596 6.03654 17.1007L1.64819 18.2514Z" fill="url(#${gradientId})"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85392 6.23985C7.69344 5.88304 7.52447 5.8759 7.37178 5.86966C7.2469 5.8643 7.10393 5.86463 6.96119 5.86463C6.81833 5.86463 6.58619 5.91831 6.38988 6.13271C6.19346 6.34711 5.63989 6.8654 5.63989 7.91951C5.63989 8.97374 6.40774 9.99237 6.51477 10.1354C6.62191 10.2783 7.997 12.5106 10.1748 13.3694C11.9847 14.0832 12.353 13.9412 12.7458 13.9055C13.1387 13.8698 14.0134 13.3873 14.192 12.887C14.3706 12.3867 14.3706 11.958 14.317 11.8683C14.2634 11.779 14.1206 11.7255 13.9063 11.6183C13.692 11.5112 12.6387 10.9928 12.4423 10.9214C12.2458 10.8499 12.103 10.8142 11.9601 11.0287C11.8173 11.243 11.4069 11.7255 11.2819 11.8683C11.1569 12.0115 11.0319 12.0294 10.8176 11.9222C10.6033 11.8148 9.91327 11.5888 9.09465 10.8588C8.45771 10.291 8.02769 9.58966 7.90269 9.37517C7.77769 9.16088 7.88929 9.04481 7.99678 8.938C8.09297 8.84202 8.21106 8.68789 8.3182 8.56278C8.42511 8.43767 8.46083 8.34838 8.53225 8.20553C8.60368 8.06244 8.56797 7.93734 8.5144 7.8302C8.46083 7.72306 8.04443 6.6635 7.85392 6.23985Z" fill="white"/><path d="M16.0627 3.76557C14.4437 2.14539 12.2908 1.25266 9.99708 1.25165C5.27048 1.25165 1.42398 5.09691 1.42208 9.82329C1.42153 11.3341 1.81628 12.8089 2.5666 14.1089L1.3501 18.5508L5.8958 17.3588C7.14824 18.0418 8.55837 18.4018 9.9934 18.4023H9.99704H9.99708C14.7229 18.4023 18.57 14.5564 18.572 9.83021C18.5728 7.53962 17.6816 5.38587 16.0627 3.76557ZM9.99708 16.9546H9.9943C8.71519 16.9539 7.46085 16.6105 6.36677 15.9613L6.10639 15.8069L3.40888 16.5142L4.12908 13.8851L3.95943 13.6156C3.24594 12.4811 2.86928 11.17 2.86983 9.82386C2.87139 5.89546 6.06845 2.69951 9.99977 2.69951C11.9035 2.7003 13.6928 3.44236 15.0385 4.789C16.3842 6.13564 17.1247 7.92579 17.1241 9.82968C17.1224 13.7582 13.9253 16.9546 9.99708 16.9546Z" fill="white"/><defs><linearGradient id="${gradientId}" x1="9.96087" y1="18.2514" x2="9.96087" y2="1.55118" gradientUnits="userSpaceOnUse"><stop stop-color="#20B038"/><stop offset="1" stop-color="#60D66A"/></linearGradient></defs></svg>`;
}

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headerToolsHtml() {
  return `<div class="pdp-m-header__tools" role="toolbar" aria-label="Listing actions">
    <button type="button" class="pdp-m-header__ico" aria-label="Share">${ICON_SHARE}</button>
    <button type="button" class="pdp-m-header__ico" aria-label="Shortlist">${ICON_HEART}</button>
  </div>`;
}

function renderHero(listing, imgStart) {
  const thumbs = [0, 1, 2]
    .map((i) => `<img class="pdp-m-hero__thumb-img" src="${pdpMobileImageSrc(imgStart + i + 1)}" alt="" loading="lazy" />`)
    .join("");

  return `<section class="pdp-m-hero" id="pdp-m-hero" aria-label="Property photos">
    <div class="pdp-m-hero__gallery">
      <img class="pdp-m-hero__main" src="${pdpMobileImageSrc(imgStart)}" alt="" decoding="async" fetchpriority="high" />
      <div class="pdp-m-hero__scrim" aria-hidden="true"></div>
      <header class="pdp-m-header pdp-m-header--overlay" aria-label="Gallery navigation">
        <button type="button" class="pdp-m-header__ico pdp-m-header__ico--back" id="pdp-m-back-btn" aria-label="Back">${ICON_BACK}</button>
        ${headerToolsHtml()}
      </header>
      <div class="pdp-m-hero__tags">
        <span class="pdp-m-hero__pill pdp-m-hero__pill--count">1 / ${listing.imageCount}</span>
        <div class="pdp-m-hero__trail">
          <span class="pdp-m-hero__pill">${esc(listing.heroTag)}</span>
          ${listing.badges
            .map(
              (b) =>
                `<span class="pdp-m-hero__pill pdp-m-hero__pill--badge">${esc(b)}</span>`
            )
            .join("")}
        </div>
      </div>
      <div class="pdp-m-hero__thumbs" aria-hidden="true">${thumbs}</div>
    </div>
  </section>`;
}

function renderSummary(listing) {
  return `<section class="pdp-m-summary" aria-label="Listing summary">
    <div class="pdp-m-summary__head">
      <div class="pdp-m-summary__titles">
        <div class="pdp-m-summary__name-row">
          <h1 class="pdp-m-summary__name">${esc(listing.name)}</h1>
          <div class="pdp-m-summary__rating" aria-label="Rating ${listing.rating} out of 5, ${listing.reviewCount} reviews">
            ${ICON_STAR}
            <span class="pdp-m-summary__rating-val">${listing.rating}</span>
            <span class="pdp-m-summary__rating-count">(${listing.reviewCount})</span>
          </div>
        </div>
        <p class="pdp-m-summary__address">${ICON_MAP_PIN}<span>${esc(listing.address)}</span></p>
        <button type="button" class="pdp-m-summary__map-link">View Map</button>
      </div>
    </div>
    <div class="pdp-m-specs">
      <div class="pdp-m-specs__tile"><p class="pdp-m-specs__label">Configuration</p><p class="pdp-m-specs__value">${esc(listing.config)}</p></div>
      <div class="pdp-m-specs__tile"><p class="pdp-m-specs__label">Status</p><p class="pdp-m-specs__value">${esc(listing.status)}</p></div>
      <div class="pdp-m-specs__tile"><p class="pdp-m-specs__label">Sizes</p><p class="pdp-m-specs__value">${esc(listing.sizes)}</p></div>
      <div class="pdp-m-specs__tile"><p class="pdp-m-specs__label">Avg. price</p><p class="pdp-m-specs__value">${esc(listing.avgPrice)}</p></div>
    </div>
    <div class="pdp-m-price-block">
      <p class="pdp-m-price-block__label">Price</p>
      <div class="pdp-m-price-block__row">
        <span class="pdp-m-price-block__main">${esc(listing.price)}</span>
        <span class="pdp-m-price-block__emi">${esc(listing.emi)}</span>
      </div>
    </div>
  </section>`;
}

function renderSeller(listing) {
  return `<section class="pdp-m-section pdp-m-seller" aria-label="Seller details">
    <h2 class="pdp-m-section__title">Seller Details</h2>
    <div class="pdp-m-seller__card">
      <img class="pdp-m-seller__photo" src="${listing.seller.photo}" alt="" />
      <div class="pdp-m-seller__info">
        <p class="pdp-m-seller__name">${esc(listing.seller.name)}</p>
        <p class="pdp-m-seller__role">${esc(listing.seller.role)}</p>
      </div>
      <button type="button" class="pdp-m-seller__phone">${ICON_PHONE}<span>View phone</span></button>
    </div>
  </section>`;
}

function renderOwnershipBanner() {
  return `<section class="pdp-m-banner" aria-label="Ownership check">
    <p class="pdp-m-banner__text">Think this property is yours?</p>
    <button type="button" class="pdp-m-banner__cta">Claim this listing</button>
  </section>`;
}

function renderFloorPlans(listing, imgStart) {
  const tabs = listing.floorPlans
    .map(
      (fp, i) =>
        `<button type="button" class="pdp-m-tabs__btn${i === 0 ? " pdp-m-tabs__btn--active" : ""}" data-tab="${i}">${esc(fp.bhk)}</button>`
    )
    .join("");

  const cards = listing.floorPlans
    .map(
      (fp, i) => `
    <article class="pdp-m-floor-card${i === 0 ? " pdp-m-floor-card--active" : ""}" data-panel="${i}">
      <img class="pdp-m-floor-card__img" src="${pdpMobileImageSrc(imgStart + i + 3)}" alt="" loading="lazy" />
      <div class="pdp-m-floor-card__body">
        <p class="pdp-m-floor-card__area">${esc(fp.area)}</p>
        <p class="pdp-m-floor-card__price">${esc(fp.price)}</p>
        <span class="pdp-m-floor-card__emi">${esc(fp.emi)}</span>
      </div>
    </article>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-floorplans" aria-labelledby="pdp-m-floorplans-title">
    <div class="pdp-m-section__head">
      <h2 id="pdp-m-floorplans-title" class="pdp-m-section__title">Floor Plan &amp; Pricing</h2>
      <span class="pdp-m-section__hint">*1 sq.m = 10.76 sq.ft.</span>
    </div>
    <div class="pdp-m-tabs" role="tablist">${tabs}</div>
    <div class="pdp-m-floor-cards">${cards}</div>
    <button type="button" class="pdp-m-section-cta">Ask for more details</button>
  </section>`;
}

function renderResaleBanner() {
  return `<section class="pdp-m-resale" aria-label="Resale options">
    <p class="pdp-m-resale__text">View resale property options in this project</p>
    <button type="button" class="pdp-m-resale__cta">See options</button>
  </section>`;
}

function renderPaymentPlan(listing) {
  const steps = listing.paymentPlan
    .map(
      (step, i) => `
    <div class="pdp-m-payment__step">
      <div class="pdp-m-payment__dot${i === 0 ? " pdp-m-payment__dot--active" : ""}" aria-hidden="true"></div>
      <div class="pdp-m-payment__content">
        <p class="pdp-m-payment__label">${esc(step.label)}</p>
        <p class="pdp-m-payment__value">${esc(step.value)}</p>
      </div>
    </div>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-payment" aria-labelledby="pdp-m-payment-title">
    <h2 id="pdp-m-payment-title" class="pdp-m-section__title">Payment plan</h2>
    <div class="pdp-m-payment__timeline">${steps}</div>
    <p class="pdp-m-payment__note">Pay 10% now and rest on possession</p>
  </section>`;
}

function renderOverview(listing, imgStart) {
  const tiles = [
    { label: "Launch", value: listing.overview.launch },
    { label: "Possession", value: listing.overview.possession },
    { label: "Total units", value: listing.overview.totalUnits },
    { label: "Towers", value: listing.overview.towers },
  ]
    .map(
      (t) => `
    <div class="pdp-m-overview__tile">
      <p class="pdp-m-overview__label">${esc(t.label)}</p>
      <p class="pdp-m-overview__value">${esc(t.value)}</p>
    </div>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-overview" aria-labelledby="pdp-m-overview-title">
    <h2 id="pdp-m-overview-title" class="pdp-m-section__title">Project overview</h2>
    <div class="pdp-m-overview__grid">${tiles}</div>
    <div class="pdp-m-overview__plan">
      <img src="${pdpMobileImageSrc(imgStart + 6)}" alt="" loading="lazy" />
      <span class="pdp-m-overview__plan-tag">Master plan</span>
    </div>
    <p class="pdp-m-overview__about">${esc(listing.developerBio.slice(0, 180))}…</p>
  </section>`;
}

function renderPropertyCarousel(title, seeAll, items, imgStart, className) {
  const cards = items
    .map(
      (item, i) => `
    <article class="pdp-m-prop-card">
      <div class="pdp-m-prop-card__img-wrap">
        <img src="${pdpMobileImageSrc(imgStart + i)}" alt="" loading="lazy" />
        <span class="pdp-m-prop-card__badge">${esc(item.tag)}</span>
      </div>
      <p class="pdp-m-prop-card__price">${esc(item.price)}</p>
      <p class="pdp-m-prop-card__name">${esc(item.name)}</p>
      <p class="pdp-m-prop-card__config">${esc(item.config)}</p>
      <button type="button" class="pdp-m-prop-card__contact">Contact</button>
    </article>`
    )
    .join("");

  return `<section class="pdp-m-section ${className}" aria-labelledby="${className}-title">
    <div class="pdp-m-section__head">
      <h2 id="${className}-title" class="pdp-m-section__title">${esc(title)}</h2>
      <button type="button" class="pdp-m-section__link">${esc(seeAll)}</button>
    </div>
    <div class="pdp-m-carousel">${cards}</div>
  </section>`;
}

function renderInvestment(listing) {
  return `<section class="pdp-m-section pdp-m-investment" aria-labelledby="pdp-m-investment-title">
    <h2 id="pdp-m-investment-title" class="pdp-m-section__title">Investment insights</h2>
    <div class="pdp-m-investment__stats">
      <div class="pdp-m-investment__stat">
        <span class="pdp-m-investment__stat-val">${esc(listing.investment.appreciation)}</span>
        <span class="pdp-m-investment__stat-label">1Y appreciation</span>
      </div>
      <div class="pdp-m-investment__stat">
        <span class="pdp-m-investment__stat-val">${esc(listing.investment.roi)}</span>
        <span class="pdp-m-investment__stat-label">Rental yield</span>
      </div>
    </div>
    <div class="pdp-m-investment__card">
      <p class="pdp-m-investment__insight">${esc(listing.investment.insight)}</p>
      <p class="pdp-m-investment__locality">${esc(listing.investment.locality)}</p>
      <div class="pdp-m-investment__chart" aria-hidden="true">
        <div class="pdp-m-investment__chart-bar" style="--h: 42%"></div>
        <div class="pdp-m-investment__chart-bar" style="--h: 58%"></div>
        <div class="pdp-m-investment__chart-bar" style="--h: 65%"></div>
        <div class="pdp-m-investment__chart-bar" style="--h: 72%"></div>
        <div class="pdp-m-investment__chart-bar" style="--h: 80%"></div>
        <div class="pdp-m-investment__chart-bar pdp-m-investment__chart-bar--active" style="--h: 88%"></div>
      </div>
    </div>
    <button type="button" class="pdp-m-section-cta">Contact Seller and Invest Now</button>
  </section>`;
}

function renderLeadForm(listing) {
  return `<section class="pdp-m-section pdp-m-lead" aria-labelledby="pdp-m-lead-title">
    <h2 id="pdp-m-lead-title" class="pdp-m-section__title">Check availability &amp; more information</h2>
    <form class="pdp-m-lead__form" action="#" onsubmit="return false">
      <label class="pdp-m-field">
        <span class="pdp-m-field__label">Name</span>
        <input class="pdp-m-field__input" type="text" placeholder="Enter your name" autocomplete="name" />
      </label>
      <label class="pdp-m-field">
        <span class="pdp-m-field__label">Phone</span>
        <input class="pdp-m-field__input" type="tel" placeholder="+91" autocomplete="tel" />
      </label>
      <label class="pdp-m-field">
        <span class="pdp-m-field__label">Email</span>
        <input class="pdp-m-field__input" type="email" placeholder="Enter email" autocomplete="email" />
      </label>
      <label class="pdp-m-lead__check">
        <input type="checkbox" checked />
        <span>I&rsquo;m interested in Home Loans</span>
      </label>
      <button type="button" class="pdp-m-lead__submit">Contact ${esc(listing.seller.name.split(" ")[0])}</button>
    </form>
  </section>`;
}

function renderBrochure(imgStart) {
  return `<section class="pdp-m-section pdp-m-brochure" aria-labelledby="pdp-m-brochure-title">
    <h2 id="pdp-m-brochure-title" class="pdp-m-section__title">Project brochure</h2>
    <div class="pdp-m-brochure__card">
      <img src="${pdpMobileImageSrc(imgStart + 7)}" alt="" loading="lazy" />
      <span class="pdp-m-brochure__count">1/23</span>
      <button type="button" class="pdp-m-brochure__dl">Download brochure</button>
    </div>
  </section>`;
}

function renderNeighbourhood() {
  return `<section class="pdp-m-section pdp-m-neighbourhood" aria-labelledby="pdp-m-neighbourhood-title">
    <div class="pdp-m-section__head pdp-m-section__head--stack">
      <h2 id="pdp-m-neighbourhood-title" class="pdp-m-section__title">Explore your neighbourhood</h2>
      <p class="pdp-m-section__subtitle">Explore Map and Reviews</p>
    </div>
    <div class="pdp-m-neighbourhood__map" aria-hidden="true">
      <div class="pdp-m-neighbourhood__map-grid"></div>
      <span class="pdp-m-neighbourhood__pin">${ICON_MAP_PIN}</span>
    </div>
  </section>`;
}

function renderCompare(listing, imgStart) {
  const rows = [
    { label: "Price", values: [listing.price, listing.similar[0].price, listing.similar[1].price] },
    { label: "Configuration", values: [listing.config, "2,3 BHK", "3 BHK"] },
    { label: "Status", values: [listing.status, "New Launch", "Ready to move"] },
  ];

  const tableRows = rows
    .map(
      (row) => `
    <div class="pdp-m-compare__row">
      <span class="pdp-m-compare__label">${esc(row.label)}</span>
      ${row.values.map((v) => `<span class="pdp-m-compare__cell">${esc(v)}</span>`).join("")}
    </div>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-compare" aria-labelledby="pdp-m-compare-title">
    <h2 id="pdp-m-compare-title" class="pdp-m-section__title">Compare with Similar Properties</h2>
    <div class="pdp-m-compare__heads">
      <div class="pdp-m-compare__head pdp-m-compare__head--current">
        <img src="${pdpMobileImageSrc(imgStart)}" alt="" />
        <p>${esc(listing.name)}</p>
      </div>
      ${listing.similar
        .slice(0, 2)
        .map(
          (s, i) => `
      <div class="pdp-m-compare__head">
        <img src="${pdpMobileImageSrc(imgStart + i + 1)}" alt="" />
        <p>${esc(s.name)}</p>
      </div>`
        )
        .join("")}
    </div>
    <div class="pdp-m-compare__table">${tableRows}</div>
  </section>`;
}

function renderAmenities(listing) {
  const icons = listing.amenities
    .map(
      (a) => `
    <div class="pdp-m-amenity">
      <span class="pdp-m-amenity__icon" aria-hidden="true"></span>
      <span class="pdp-m-amenity__label">${esc(a)}</span>
    </div>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-amenities" aria-labelledby="pdp-m-amenities-title">
    <div class="pdp-m-section__head">
      <h2 id="pdp-m-amenities-title" class="pdp-m-section__title">Amenities</h2>
      <button type="button" class="pdp-m-section__link">View all</button>
    </div>
    <div class="pdp-m-amenities__grid">${icons}</div>
  </section>`;
}

function renderDeveloper(listing, imgStart) {
  const projects = listing.developerProjects
    .map(
      (p, i) => `
    <article class="pdp-m-dev-project">
      <img src="${pdpMobileImageSrc(imgStart + i)}" alt="" loading="lazy" />
      <p>${esc(p)}</p>
    </article>`
    )
    .join("");

  return `<section class="pdp-m-section pdp-m-developer" aria-labelledby="pdp-m-developer-title">
    <h2 id="pdp-m-developer-title" class="pdp-m-section__title">Know about ${esc(listing.developer)}</h2>
    <div class="pdp-m-developer__card">
      <div class="pdp-m-developer__logo" aria-hidden="true">${listing.developer.charAt(0)}</div>
      <div>
        <p class="pdp-m-developer__name">${esc(listing.developer)}</p>
        <p class="pdp-m-developer__bio">${esc(listing.developerBio)}</p>
      </div>
    </div>
    <h3 class="pdp-m-developer__sub">Projects by ${esc(listing.developer.split(" ")[0])}</h3>
    <div class="pdp-m-carousel pdp-m-carousel--dev">${projects}</div>
  </section>`;
}

function renderDisclaimer(listing) {
  return `<section class="pdp-m-disclaimer" aria-label="Disclaimer">
    <p class="pdp-m-disclaimer__title">Disclaimer</p>
    <p class="pdp-m-disclaimer__text">Housing.com is not a marketing partner for this real estate project and is not acting on behalf of the developer. The information displayed here is collected from publicly available sources. Pictures shown include artist&rsquo;s impressions provided by the developer. Please exercise due caution and independently validate all information before deciding to purchase.</p>
    <p class="pdp-m-disclaimer__seller">${esc(listing.seller.name)}</p>
  </section>`;
}

function renderStickyHeader(listing) {
  return `<header class="pdp-m-header pdp-m-header--sticky" id="pdp-m-sticky-header" aria-label="Property navigation">
    <button type="button" class="pdp-m-header__ico pdp-m-header__ico--back" id="pdp-m-sticky-back" aria-label="Back">${ICON_BACK}</button>
    <p class="pdp-m-header__title">${esc(listing.name)}</p>
    ${headerToolsHtml()}
  </header>`;
}

function renderBottomBar() {
  return `<div class="pdp-m-bottom-bar" id="pdp-m-bottom-bar" role="group" aria-label="Contact seller">
    <button type="button" class="pdp-m-bottom-bar__wa" aria-label="WhatsApp">${pdpWhatsappIconHtml("pdp-m-wa-grad")}</button>
    <button type="button" class="pdp-m-bottom-bar__contact">Contact</button>
  </div>`;
}

function renderPage(listing, imgStart) {
  return `${renderStickyHeader(listing)}
    <main class="pdp-m-main" id="pdp-m-main">
      ${renderHero(listing, imgStart)}
      ${renderSummary(listing)}
      ${renderSeller(listing)}
      ${renderOwnershipBanner()}
      ${renderFloorPlans(listing, imgStart)}
      ${renderResaleBanner()}
      ${renderPaymentPlan(listing)}
      ${renderOverview(listing, imgStart)}
      ${renderPropertyCarousel("Better Priced Properties", "See all", listing.similar, imgStart + 2, "pdp-m-better-priced")}
      ${renderInvestment(listing)}
      ${renderPropertyCarousel("Similar properties", "See all", listing.similar, imgStart + 4, "pdp-m-similar")}
      ${renderLeadForm(listing)}
      ${renderBrochure(imgStart)}
      ${renderNeighbourhood()}
      ${renderCompare(listing, imgStart)}
      ${renderAmenities(listing)}
      ${renderDeveloper(listing, imgStart + 5)}
      ${renderDisclaimer(listing)}
    </main>
    ${renderBottomBar()}`;
}

const PDP_M_SLIDE_MS = 340;

function pdpMobilePrefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pdpMobileIsMobileViewport() {
  return window.matchMedia("(max-width: 47.99rem)").matches;
}

function pdpMobileRunExitTransition(onDone) {
  const html = document.documentElement;
  const page = document.querySelector(".pdp-m-page");

  if (!pdpMobileIsMobileViewport() || pdpMobilePrefersReducedMotion() || !page) {
    onDone();
    return;
  }

  html.classList.add("pdp-m-exit-active");
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    page.removeEventListener("animationend", finish);
    window.clearTimeout(fallback);
    onDone();
  };

  const fallback = window.setTimeout(finish, PDP_M_SLIDE_MS + 80);
  page.addEventListener("animationend", finish, { once: true });
}

function initEnterTransition() {
  const html = document.documentElement;
  if (!html.classList.contains("pdp-m-enter-pending")) return;

  try {
    sessionStorage.removeItem("pdp-m-from-srp");
  } catch (_) {}

  html.classList.remove("no-fouc");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      html.classList.add("pdp-m-enter-active");
      const page = document.querySelector(".pdp-m-page");
      const cleanup = () => {
        html.classList.remove("pdp-m-enter-pending", "pdp-m-enter-active");
      };
      page?.addEventListener("animationend", cleanup, { once: true });
      window.setTimeout(cleanup, 520);
    });
  });
}

function initBackButtons() {
  const goBack = () => {
    pdpMobileRunExitTransition(() => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/srp.html";
      }
    });
  };
  document.getElementById("pdp-m-back-btn")?.addEventListener("click", goBack);
  document.getElementById("pdp-m-sticky-back")?.addEventListener("click", goBack);
}

function initStickyHeader() {
  const sticky = document.getElementById("pdp-m-sticky-header");
  const hero = document.getElementById("pdp-m-hero");
  if (!sticky || !hero) return;

  const threshold = () => hero.offsetHeight - sticky.offsetHeight;

  const update = () => {
    sticky.classList.toggle("pdp-m-header--visible", window.scrollY >= threshold());
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

function initFloorPlanTabs() {
  const section = document.querySelector(".pdp-m-floorplans");
  if (!section) return;

  const tabs = section.querySelectorAll(".pdp-m-tabs__btn");
  const panels = section.querySelectorAll(".pdp-m-floor-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle("pdp-m-tabs__btn--active", t === tab));
      panels.forEach((p) => p.classList.toggle("pdp-m-floor-card--active", p.dataset.panel === idx));
    });
  });
}

function initPage() {
  const root = document.getElementById("pdp-m-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") ?? "0";
  const listing = getPdpMobileListing(id);
  const imgStart = Number.parseInt(id, 10) * 3 || 0;

  document.title = `${listing.name} — Housing`;
  root.innerHTML = renderPage(listing, imgStart);
  root.removeAttribute("aria-busy");

  document.documentElement.classList.remove("no-fouc");

  initEnterTransition();
  initBackButtons();
  initStickyHeader();
  initFloorPlanTabs();
}

document.addEventListener("DOMContentLoaded", initPage);
