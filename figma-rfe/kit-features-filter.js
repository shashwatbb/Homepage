// Demand Component Kit: add the "Features" filter category, following the existing Filters / Android pattern.
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-features-filter.js
// 1. SRP / Android / Buy / Right column: new variant Property 4=Features (shell cloned from BHK).
// 2. SRP / Filters/ Left drawer (Buy): "Features" rail item after Amenities.

const RIGHT_COLUMN = "2772:13237";
const BHK_VARIANT = "2772:12590";
const LEFT_DRAWER_BUY = "2771:12490";
const FILTER_CHIPS = "2307:13002";

const GROUPS = [
  ["Light and air", [["Natural light", "Sun", ["soft_butter/200", "yellow/600"]], ["Good ventilation", "Wind", ["blue/100", "blue/500"]]]],
  ["Views", [["Sea view", "Waves", ["blue/200", "blue/700"]], ["Garden view", "Tree", ["green/200", "green/600"]]]],
  ["Kitchen", [["Modular kitchen", "CookingPot", ["red/200", "red/500"]]]],
  ["Interiors", [["Spacious rooms", "ArrowsOut", ["pink/200", "pink/600"]]]],
  ["Outdoor spaces", [["Balcony", "BuildingApartment", ["pistachio_sand/200", "pistachio_sand/500"]], ["Terrace", "SunHorizon", ["soft_butter/200", "green/600"]]]],
];
const out = [];

// ---------- 1. Right column variant ----------
const set = await figma.getNodeByIdAsync(RIGHT_COLUMN);
let v = set.children.find((c) => c.name.endsWith("Property 4=Features"));
if (v) { out.push("Features variant exists, rebuilding content: " + v.id); }
else {
  v = (await figma.getNodeByIdAsync(BHK_VARIANT)).clone();
  set.appendChild(v);
  v.name = "Property 1=Android, Property 2=Buy, Property 3=Right coulmn, Property 4=Features";
  const last = set.children.filter((c) => c !== v).reduce((a, b) => (a.y + a.height > b.y + b.height ? a : b));
  v.x = last.x; v.y = last.y + last.height + 40;
}
const headingInst = v.children.find((n) => n.name === "Heading");
const ht = headingInst.findOne((n) => n.type === "TEXT");
await Promise.all(ht.getRangeAllFontNames(0, ht.characters.length).map((f) => figma.loadFontAsync(f)));
ht.characters = "FEATURES";

let content = v.children.find((n) => n.type === "FRAME");
content.name = "Options";
for (const c of [...content.children]) c.remove();
content.layoutSizingVertical = "HUG";
await gap(content, "m");

const chipSet = await figma.getNodeByIdAsync(FILTER_CHIPS);
const chipOff = chipSet.children.find((c) => c.name === "Property 1=Icon: Filter off");
for (const [group, items] of GROUPS) {
  const g = frame(group, "VERTICAL", content);
  fillW(g); await gap(g, "xs");
  await text("Group Label", group, "Mobile/Body/small_medium", "text/secondary", g);
  const wrap = frame("Chips", "HORIZONTAL", g);
  fillW(wrap); wrap.layoutWrap = "WRAP";
  await gap(wrap, "xs"); await wrapGap(wrap, "xs");
  for (const [label, iconName, duo] of items) {
    const chip = chipOff.createInstance();
    wrap.appendChild(chip);
    chip.name = label;
    const t = chip.findOne((n) => n.type === "TEXT");
    await Promise.all(t.getRangeAllFontNames(0, t.characters.length).map((f) => figma.loadFontAsync(f)));
    t.characters = label;
    const slot = chip.findOne((n) => n.type === "INSTANCE" && n.name === "SlidersHorizontal");
    slot.swapComponent(await iconComponent(iconName, "duo16"));
    slot.name = iconName;
    const l = await paint(duo[0]), d = await paint(duo[1]);
    for (const vec of slot.findAll((n) => n.type === "VECTOR")) {
      if (vec.fills.length) { vec.fills = [l]; vec.opacity = 1; }
      if (vec.strokes.length) vec.strokes = [d];
    }
  }
}
v.layoutSizingVertical = "HUG";
out.push("Right column Features variant: " + v.id + " " + Math.round(v.width) + "x" + Math.round(v.height));

// keep the set frame wrapping all variants
const maxB = Math.max(...set.children.map((c) => c.y + c.height));
if (maxB + 40 > set.height) set.resizeWithoutConstraints(set.width, maxB + 40);

// ---------- 2. Left drawer rail item ----------
const rail = await figma.getNodeByIdAsync(LEFT_DRAWER_BUY);
const label = (n) => (n.findOne((x) => x.type === "TEXT") || {}).characters;
if (!rail.children.some((n) => label(n) === "Features")) {
  const amenities = rail.children.find((n) => label(n) === "Amenities");
  const item = amenities.clone();
  rail.insertChild(rail.children.indexOf(amenities) + 1, item);
  const textKey = Object.keys(item.componentProperties).find((k) => k.startsWith("Text#"));
  item.setProperties({ [textKey]: "Features" });
  out.push("Left drawer: Features item added after Amenities");
} else out.push("Left drawer: Features item already there");

return out.join("\n");
