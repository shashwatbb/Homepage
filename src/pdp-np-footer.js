// Desktop NP PDP footer, 1:1 with Figma PDP [Demand] 3602:23538 > Footer (1280x1445): SEO link band,
// "Part of REA Group" strip, city links + brand band. Mock links only.
import "./styles/pdp-np-footer.css";

const B = import.meta.env.BASE_URL;
const a = (t) => `<a href="#" data-action="pnp-noop">${t}</a>`;
const CITIES = ["Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Delhi", "Gurgaon", "Noida", "Kolkata", "Ahmedabad", "Thane", "Navi Mumbai", "Faridabad", "Ghaziabad"];
const SEO = [
  ["Trending searches", ["Explore Satyam Paradise", "Explore ABA Orange County", "View Floor Plans of ABA Coco County", "View County 107 Price Details", "Browse Apartments in Orange County", "Explore Sarthak Homes", "Find ACC Homes in Noida", "View ACE Starlit Floor Plans", "Explore Ajnara India Homes 121", "Ivory County Floor Plan Overview", "Explore Ivory County Gold", "Explore Ivory County in Sector 115", "Get Details on Cleo County Amenities", "Explore ABA Cleo County Phase 2", "Explore JP Homes in Noida", "Explore ABA Olive County", "Check ACE City Nearby Amenities", "Explore ABA Cherry County", "Explore County in Sector 121"]],
  ["Popular localities", ["Flats in Sector 107", "Flats in Sector 137", "Flats in Sector 76", "Flats in Sector 49", "Flats in Sector 50", "Flats in Sector 121", "Flats in Sector 70", "Flats in Garhi Chaukhandi", "Flats in Yusufpur Chak Saberi", "Flats in Basai", "Flats in Sector 68", "Flats in Bahlolpur", "Flats in Sector 67", "Flats in Chaukhandi", "Flats in Desai Village", "Flats in Block B", "Flats in Block A", "Flats in E Block", "Flats in Block D", "Flats in G Block"]],
  ["New projects in Sector 121", ["ATS Picturesque Reprieves", "Godrej Crown Residences At Godrej Golf Links", "Sona Residency", "Godrej Riverine", "M3M Jacob And Co", "Godrej Woods", "Eureka Park By Tata Value Homes", "Malik Hindustan Apartment", "Realcon Silver Oak Tower III", "Prestige Bougainvillea Gardens"]],
  ["Resale projects in Sector 121", ["RG Residency", "Nimbus The Golden Palms", "The Antriksh Golf View", "ATS Pristine", "Amrapali Sapphire", "Elixir Harmony Apartments", "Assotech Yarrow Apartments", "Investors Aashiyana", "Sarthak Homes", "Himalaya Homes"]],
  ["Popular searches", ["Sector 121 Overview", "Property Rates in Sector 121, Noida", "Flats in Sector 121", "Apartments in Sector 121", "House for sale in Sector 121", "Builder Floor in Sector 121", "Plots for sale in Sector 121", "1 BHK for sale in Sector 121", "2 BHK for sale in Sector 121", "3 BHK for sale in Sector 121", "4 BHK for sale in Sector 121", "Builders in Sector 121"]],
];
const col = (title, links) => `<div class="npft__col"><p class="npft__cap">${title}</p><div>${links.map(a).join("")}</div></div>`;

const html = () => `
<footer class="npft" aria-label="Site footer">
  <div class="npft__seo">${SEO.map(([t, l]) => `<div class="npft__row"><p class="npft__cap">${t}</p><div class="npft__grid">${l.map(a).join("")}</div></div>`).join("")}</div>
  <div class="npft__rea"><span>Part of</span><img src="${B}pdp-footer/rea.png" alt="REA Group" width="200" height="52"></div>
  <div class="npft__bottom">
    <div class="npft__cities">${["Flats in", "Flats for Rent in", "New Projects in", "Commercial Property in"].map((p) => `<div>${CITIES.map((c) => a(`${p} ${c}`)).join("")}</div>`).join("")}</div>
    <div class="npft__brand">
      <div class="npft__brandcol"><img src="${B}pdp-footer/housing.png" alt="Housing.com" width="184" height="24"><div class="npft__awards"><img src="${B}pdp-footer/gptw1.png" alt="" width="200" height="84"><img src="${B}pdp-footer/gptw2.png" alt="" width="83" height="72"></div><p class="npft__cap npft__cap--sm">Follow</p><img class="npft__social" src="${B}pdp-footer/social.png" alt="Facebook, Instagram, X, LinkedIn, YouTube" width="250" height="60"></div>
      ${col("Company", ["Careers", "About Us", "For Partners", "Terms", "Annual Return", "Privacy Policy", "Contact Us", "Unsubscribe", "Merger Hearing", "Advertisement"])}
      ${col("Partne sites", ["realestate.com.au", "realtor.com", "99.co", "collinsdictionary.com"])}
      ${col("Explore", ["News", "Home Loans", "Sitemap", "International"])}
      <div class="npft__app"><p class="npft__cap">Experience Housing app on mobile</p><div class="npft__stores"><img src="${B}pdp-footer/ios.png" alt="Download on the App Store" width="98" height="30"><img src="${B}pdp-footer/android.png" alt="Get it on Google Play" width="98" height="30"></div><div class="npft__qr"><img src="${B}pdp-footer/qr.png" alt="QR code to download the app" width="84" height="84"><p>Open camera &amp; scan the QR code to Download the App</p></div></div>
    </div>
  </div>
</footer>`;

export function initPdpNpFooter() {
  const main = document.getElementById("pdp-page");
  if (!main || document.querySelector(".npft")) return;
  main.insertAdjacentHTML("afterend", html());
}
