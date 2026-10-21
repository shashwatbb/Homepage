// Demand Component Kit: Seen in photos pills as real variants of the existing kit components.
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/isp-blocks.js figma-rfe/kit-isp-components.js
// Rerunnable: an existing variant keeps its id and only its content is rebuilt.
//   Search bar           + Property 1=Search + AI: Feature pills
//   SRP (header)         + Property 3=Buy: Feature pills | (1 selected) | (2 selected)
//   SRP (m-web page)     + Property 2=Buy: Feature pills | (1 selected) | (2 selected)
//   SRP / Filters        + Property 3=Filters: Features (Features open, Balcony selected)

const LOCAL = {
  searchBar: "2031:936", searchAI: "2031:935", aiLogo: "2117:6499",
  srpHeader: "2533:3148", srpPage: "5355:24263",
  filterChips: "2307:13002", filtersScreen: "2837:5404", filtersBuy: "2799:6978",
};
const STATES = [
  ["", [], true],
  [" (1 selected)", ["balcony"], false],
  [" (2 selected)", ["balcony", "natural_light"], false],
];

const srpPageNode = figma.root.children.find((p) => p.name.trim() === "SRP");
await srpPageNode.loadAsync();
const setByKey = (key) => srpPageNode.findAllWithCriteria({ types: ["COMPONENT_SET"] }).find((s) => s.key === key);
const filterChips = await figma.getNodeByIdAsync(LOCAL.filterChips);
const aiLogoSource = await figma.getNodeByIdAsync(LOCAL.aiLogo);
const propertyCards = setByKey(KIT.propertyCard);
const bottomNavSet = setByKey(KIT.bottomNav);
const searchBarSet = await figma.getNodeByIdAsync(LOCAL.searchBar);
const headerSet = await figma.getNodeByIdAsync(LOCAL.srpHeader);
const pageSet = await figma.getNodeByIdAsync(LOCAL.srpPage);
const filtersSet = await figma.getNodeByIdAsync(LOCAL.filtersScreen);
if (!propertyCards || !bottomNavSet) throw new Error("kit cards/nav set not found on SRP page");

// New or existing variant in a set, emptied. New ones go below the existing rows on the set's left
// column so the set grows down, not into neighbours; check page overlaps afterwards (rule).
function upsertVariant(set, name) {
  let v = set.children.find((c) => c.name === name);
  if (v) { for (const c of [...v.children]) c.remove(); return v; }
  v = figma.createComponent();
  v.name = name;
  const others = [...set.children];
  set.appendChild(v);
  v.x = Math.min(...others.map((c) => c.x));
  v.y = Math.max(...others.map((c) => c.y + c.height)) + 40;
  return v;
}
function fitSet(set) {
  const r = Math.max(...set.children.map((c) => c.x + c.width)), b = Math.max(...set.children.map((c) => c.y + c.height));
  set.resizeWithoutConstraints(Math.max(set.width, r + 20), Math.max(set.height, b + 20));
}
function vertical(v, w) {
  v.layoutMode = "VERTICAL"; v.primaryAxisSizingMode = "AUTO"; v.counterAxisSizingMode = "FIXED";
  v.resize(w, Math.max(v.height, 10)); v.clipsContent = true;
}
const out = [];

// 1. Search bar variant
const sb = upsertVariant(searchBarSet, "Property 1=Search + AI: Feature pills");
await searchRow(sb);
fitSet(searchBarSet);
out.push("Search bar: " + sb.id + " " + Math.round(sb.width) + "x" + Math.round(sb.height));

// 2. SRP header variants
const headers = {};
for (const [suffix, features] of STATES) {
  const h = upsertVariant(headerSet, `Property 1=Base, Property 2=Top, Property 3=Buy: Feature pills${suffix}`);
  vertical(h, 360);
  await fill(h, "surface/white");
  const bar = sb.createInstance();
  h.appendChild(bar); fillW(bar);
  await filterBands(h, features);
  headers[suffix] = h;
  out.push("SRP header" + suffix + ": " + h.id + " " + Math.round(h.width) + "x" + Math.round(h.height));
}
fitSet(headerSet);

// 3. SRP m-web page variants
for (const [suffix, features, withTip] of STATES) {
  const p = upsertVariant(pageSet, `Property 2=Buy: Feature pills${suffix}`);
  vertical(p, 360);
  await fill(p, "surface/subtle"); // prototype feed bg (--isp-subtle #faf9f5) behind the cards
  const head = headers[suffix].createInstance();
  p.appendChild(head); fillW(head);
  const lead = features.length ? byId(features[features.length - 1]) : null;
  if (lead) await countLine(p, lead.header, features.length > 1 ? ` + ${features.length - 1} more` : "");
  else await countLine(p, "1,240 properties", " in Andheri West");
  await card(p, "SEO cards", lead && `owner-${lead.id}`);
  await card(p, "Project card", lead && `ultra-${lead.id}`);
  const navVariant = bottomNavSet.children.find((c) => c.name === "Property 1=Buy resale") || variant(bottomNavSet, "Property 1=Default");
  const nav = navVariant.createInstance(); // Buy resale nav (kit-navs.js creates it)
  p.appendChild(nav); fillW(nav); nav.name = "Bottom navigation";
  await pinBottom(p, nav, "5xl");
  if (withTip) await featureGuide(p, "Most searched features");
  out.push("SRP page" + suffix + ": " + p.id + " " + Math.round(p.width) + "x" + Math.round(p.height));
}
fitSet(pageSet);

// 4. SRP / Filters variant: Features open, Balcony selected
let fv = filtersSet.children.find((c) => c.name === "Property 1=Android, Property 2=Buy, Property 3=Filters: Features");
if (!fv) {
  fv = (await figma.getNodeByIdAsync(LOCAL.filtersBuy)).clone();
  filtersSet.appendChild(fv);
  fv.name = "Property 1=Android, Property 2=Buy, Property 3=Filters: Features";
  const others = filtersSet.children.filter((c) => c !== fv);
  fv.x = Math.max(...others.map((c) => c.x + c.width)) + 40;
  fv.y = Math.min(...others.map((c) => c.y));
}
const right = fv.findOne((n) => n.type === "INSTANCE" && n.name === "SRP / Android / Buy / Right column");
right.setProperties({ "Property 4": "Features" });
const rail = fv.findOne((n) => n.type === "INSTANCE" && n.name === "SRP / Filters/ Left drawer");
for (const [item, label] of rail.children.map((i) => [i, (i.findOne((n) => n.type === "TEXT") || {}).characters])) {
  if (label === "Budget") item.setProperties({ "Property 1": "Default" });
  if (label === "Features") {
    item.setProperties({ "Property 1": "Active" });
    const count = item.findAll((n) => n.type === "TEXT")[1];
    if (count) { await figma.loadFontAsync(count.fontName); count.characters = "1"; }
  }
}
const balcony = right.findOne((n) => n.type === "INSTANCE" && n.name === "Balcony");
balcony.setProperties({ "Property 1": "Icon: Filter on" });
const close = balcony.findOne((n) => n.name === "Filter: Clicks");
if (close) close.visible = false;
const cta = fv.findOne((n) => n.type === "INSTANCE" && n.name === "buttons");
const k = cta && Object.keys(cta.componentProperties).find((x) => x.startsWith("Label#"));
if (k) cta.setProperties({ [k]: "Show 1,060 results" });
fitSet(filtersSet);
out.push("SRP / Filters: Features: " + fv.id + " " + Math.round(fv.width) + "x" + Math.round(fv.height));

dropProbe();
return out.join("\n");
