// Demand Component Kit: bottom navigation cases for the SRP RFE.
//   Bottom navigation      + Property 1=Buy resale  (Explore, Projects, Top localities, Shorts, Saved + badge)
//   Rent bottom navigation + Property 1=Rent SRP    (Suggestion, Premium, Saved + badge, Profile)
// Same item structure as the existing kit navs (pad 8/8/4/8, 24 icon, 12px label), Bricks icons + text styles.
// Premium = SketchLogo (gem). Suggestion = Lightbulb (added to Bricks Iconography 2026-10-21, figma-rfe/icon-lightbulb.js).
// Then: SRP page Buy: Feature pills variants use Buy resale nav; new page variant Rent: Feature pills uses Rent SRP nav.
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-navs.js

const BUY_NAV_SET = "2117:6306", RENT_NAV_SET = "3477:9443", PAGE_SET = "5355:24263";
const BUY_PAGE_VARIANTS = ["6916:51912", "6916:52850", "6916:53713"];
const ICON24 = {
  SketchLogo: "988901b9bfd0ece528e1fc58cd41a18616313c7f", Lightbulb: "0942cac9cdbbc2f12b0fe8816783e453f4c7e55a", User: "8da9f6f34cd83c36bb62fd9b732225d053708e7b",
  BuildingOffice: "1df0a42c0d47c9a86a94906555a797e032aa1db2", MapPin: "94a99fbaa699f4835c4a5951b2840d37e25d7782",
  MagnifyingGlass: "a8415b57fd1265c951d3fa86a4143ceb8a5f2af4", PlayCircle: "de13e5f9f3ab943253b374d7d8fe7e851a053f64",
  Heart: "3ed36e93f09ac994f4b1638d8c32907deeba3e91",
};
const out = [];
const hit = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);

const rentSet = await figma.getNodeByIdAsync(RENT_NAV_SET);
const bulbSource = rentSet.children[0].findOne((n) => n.name === "Icons" && n.findOne((g) => g.name === "Suggestions"));

async function navItem(parent, label, iconName, badge) {
  const item = frame(label, "VERTICAL", parent);
  fillW(item); item.counterAxisAlignItems = "CENTER";
  await pad(item, "xs", "xs", "2xs", "xs");
  const holder = frame("Icon", "HORIZONTAL", item); // 24 box; badge pinned to its corner
  fixedSize(holder, 24, 24); holder.clipsContent = false;
  if (iconName === "Suggestion") {
    const bulb = bulbSource.clone(); holder.appendChild(bulb); bulb.name = "Lightbulb (kit)";
  } else {
    const ic = (await figma.importComponentByKeyAsync(ICON24[iconName])).createInstance();
    ic.name = iconName; holder.appendChild(ic); await tintIcon(ic, "icon/grey_4");
  }
  if (badge) {
    const b = frame("Badge", "HORIZONTAL", holder);
    b.layoutPositioning = "ABSOLUTE";
    b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER";
    await pad(b, "none", "2xs"); await rad(b, "full"); await fill(b, "highlight");
    b.minWidth = 16;
    await text("Count", badge, "Mobile/Label/default_medium", "text/inverse", b);
    b.x = 14; b.y = -6;
  }
  const lw = frame("Text", "HORIZONTAL", item);
  await pad(lw, "2xs");
  await text("Label", label, "Mobile/Label/default_regular", "text/secondary", lw);
  return item;
}

async function navVariant(set, name, items) {
  let v = set.children.find((c) => c.name === name);
  if (v) for (const c of [...v.children]) c.remove();
  else {
    v = figma.createComponent(); v.name = name;
    const others = [...set.children];
    set.appendChild(v);
    v.x = Math.min(...others.map((c) => c.x));
    v.y = Math.max(...others.map((c) => c.y + c.height)) + 40;
  }
  v.layoutMode = "HORIZONTAL"; v.primaryAxisSizingMode = "FIXED"; v.counterAxisSizingMode = "AUTO";
  v.resize(360, 60); v.clipsContent = false;
  await pad(v, "none", "m"); await gap(v, "s"); await fill(v, "surface/white");
  for (const [label, icon, badge] of items) await navItem(v, label, icon, badge);
  const r = Math.max(...set.children.map((c) => c.x + c.width)), b = Math.max(...set.children.map((c) => c.y + c.height));
  set.resizeWithoutConstraints(Math.max(set.width, r + 20), Math.max(set.height, b + 20));
  return v;
}

const buyNav = await navVariant(await figma.getNodeByIdAsync(BUY_NAV_SET), "Property 1=Buy resale", [
  ["Explore", "MagnifyingGlass"], ["Projects", "BuildingOffice"], ["Top localities", "MapPin"], ["Shorts", "PlayCircle"], ["Saved", "Heart", "188"],
]);
const rentNav = await navVariant(rentSet, "Property 1=Rent SRP", [
  ["Suggestion", "Lightbulb"], ["Premium", "SketchLogo"], ["Saved", "Heart", "5"], ["Profile", "User"],
]);
out.push("Buy resale nav " + buyNav.id + " " + Math.round(buyNav.width) + "x" + Math.round(buyNav.height));
out.push("Rent SRP nav " + rentNav.id + " " + Math.round(rentNav.width) + "x" + Math.round(rentNav.height));

// Page variants: Buy uses Buy resale nav.
const isNav = (n) => n.type === "INSTANCE" && /Bottom navigation|bottom navigation/.test(n.name);
for (const id of BUY_PAGE_VARIANTS) {
  const p = await figma.getNodeByIdAsync(id);
  const nav = p.children.find(isNav);
  if (nav) { nav.swapComponent(buyNav); nav.name = "Bottom navigation"; }
}
// Rent case: copy of the default Buy variant with the Rent SRP nav.
const pageSet = await figma.getNodeByIdAsync(PAGE_SET);
let rentPage = pageSet.children.find((c) => c.name === "Property 2=Rent: Feature pills");
if (rentPage) rentPage.remove();
rentPage = (await figma.getNodeByIdAsync(BUY_PAGE_VARIANTS[0])).clone();
pageSet.appendChild(rentPage);
rentPage.name = "Property 2=Rent: Feature pills";
const others = pageSet.children.filter((c) => c !== rentPage);
const row = others.filter((c) => /Feature pills/.test(c.name));
rentPage.x = Math.max(...row.map((c) => c.x + c.width)) + 40;
rentPage.y = Math.min(...row.map((c) => c.y));
const rnav = rentPage.children.find(isNav);
rnav.swapComponent(rentNav); rnav.name = "Rent bottom navigation";
const r = Math.max(...pageSet.children.map((c) => c.x + c.width)), b = Math.max(...pageSet.children.map((c) => c.y + c.height));
pageSet.resizeWithoutConstraints(Math.max(pageSet.width, r + 20), Math.max(pageSet.height, b + 20));
out.push("Rent page variant " + rentPage.id);

// Overlap checks for the three sets that grew.
for (const s of [buyNav.parent, rentNav.parent, pageSet]) {
  const inner = s.children.filter((a) => s.children.some((c) => c !== a && hit(a, c))).length;
  const sib = s.parent.children.filter((c) => c !== s && c.visible && hit(s.absoluteBoundingBox, c.absoluteBoundingBox)).map((c) => c.name);
  out.push(`${s.name}: inner overlaps ${inner}, neighbours hit [${sib.join(", ")}]`);
}
dropProbe();
return out.join("\n");
