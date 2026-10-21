// RFE: Buy SRP "Seen in photos" feature pills (srp_image_feature_pills), m-Web.
// Run: node figma-rfe/run.mjs "Search Results Page" figma-rfe/lib.js figma-rfe/build-isp.js
// Every screen is a whole-page Demand Component Kit instance, no detached or local UI:
//   SRP (m-web page) Property 2=Buy: Feature pills | (1 selected) | (2 selected)
//   SRP / Filters    Property 3=Filters: Features
// The variants themselves are built in the kit by kit-isp-components.js.

const PAGE_NAME = "Image search pills";
const SECTION_NAME = "RFE: m-Web · Seen in photos pills";
const SCREEN_H = 800; // m-Web / Android / iOS viewport
const FULL_LENGTH = false; // true only when asked for full-length views

const pageKit = await figma.importComponentSetByKeyAsync(PAGE_KIT_SET);
const srpPages = await figma.importComponentSetByKeyAsync(KIT.srpPage);
const filtersScreens = await figma.importComponentSetByKeyAsync(KIT.filtersScreen);

const prefix = figma.root.children[1].name.match(/^\s*↳\s*/)[0];
let page = figma.root.children.find((p) => p.name.trim() === "↳ " + PAGE_NAME);
if (!page) {
  page = figma.createPage();
  page.name = prefix + PAGE_NAME;
  const sep = figma.root.children.findIndex((p, i) => i > 0 && p.name.trim() === "--");
  figma.root.insertChild(sep, page);
}
// Canvas BG matches sibling pages (#f2f2f2): copy from the Buy page.
page.backgrounds = JSON.parse(JSON.stringify(figma.root.children[1].backgrounds));
await figma.setCurrentPageAsync(page);
for (const old of page.children.filter((n) => n.name === SECTION_NAME)) old.remove(); // previous run of this script

const section = figma.createSection();
section.name = SECTION_NAME;
section.fills = [await paint("surface/white")];
section.cornerRadius = 100; // RFE sections are always rounded, same as existing RFE sections (e.g. "RFE: Android")
page.appendChild(section);

async function kit(type, x, y, w) {
  const inst = variant(pageKit, "Type=" + type).createInstance();
  section.appendChild(inst);
  if (w) inst.resize(w, inst.height);
  inst.x = x; inst.y = y;
  return inst;
}
const header = await kit("Ready", 101, 100);
await setInstanceText(header, "#Label", "Sprint");
await setInstanceText(header, "Live for 20% users", "Behind flag srp_image_feature_pills");
const info = await kit("Info strip", 101, 361);
await setInstanceText(info, "Information strip", "Android/iOS/mweb");

// ---------- screens + flow pills ----------
const SCREENS = [
  ["SRP: Default with tip", srpPages, "Property 2=Buy: Feature pills"],
  ["SRP: One feature selected", srpPages, "Property 2=Buy: Feature pills (1 selected)"],
  ["SRP: Two features selected", srpPages, "Property 2=Buy: Feature pills (2 selected)"],
  ["SRP Rent: Default with tip", srpPages, "Property 2=Rent: Feature pills"],
  ["Filters: Features", filtersScreens, "Property 1=Android, Property 2=Buy, Property 3=Filters: Features"],
];
let x = 101, maxBottom = 0;
for (const [label, set, variantName] of SCREENS) {
  const pill = await kit("Flow small", x, 585, 360);
  await setInstanceText(pill, "Flow/states", label);
  const s = variant(set, variantName).createInstance();
  section.appendChild(s);
  s.name = label;
  // RFE rule: show mobile screens at the 800 viewport (nav/bottom bar is pinned in the kit variants).
  if (!FULL_LENGTH) s.resize(360, SCREEN_H);
  s.x = x; s.y = 702;
  maxBottom = Math.max(maxBottom, s.y + s.height);
  x += 360 + 150;
}
// Section hugs its content: same 100 margin below as the Page kit header has above.
section.resizeWithoutConstraints(Math.max(3280, x - 150 + 101), maxBottom + 100);
section.x = 0; section.y = 0;
figma.currentPage.selection = [section];
figma.viewport.scrollAndZoomIntoView([section]);

const screens = section.children.filter((n) => SCREENS.some(([l]) => l === n.name));
const sources = await Promise.all(screens.map(async (n) => n.name + " <- " + (await n.getMainComponentAsync()).parent.name + " / " + (await n.getMainComponentAsync()).name));
dropProbe();
return JSON.stringify({ page: page.name, section: section.id, size: [section.width, section.height], screens: sources });
