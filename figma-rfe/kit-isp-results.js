// Demand Component Kit: Seen in photos pills result states as SRP m-web page variants.
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/isp-blocks.js figma-rfe/kit-isp-results.js
// Rerunnable: an existing variant keeps its id and only its content is rebuilt.
//   SRP (m-web page) + Property 2=Buy: Feature pills (no results)   2 features, nothing matches
//   SRP (m-web page) + Property 2=Buy: Feature pills (few results)  2 matches, then other homes
// New variants go right of the existing row (same grid as the other page variants).

const LOCAL = { srpHeader: "2533:3148", srpPage: "5355:24263" };
const LOCALITY = "Andheri West";

const srpPageNode = figma.root.children.find((p) => p.name.trim() === "SRP");
await srpPageNode.loadAsync();
const setByKey = (key) => srpPageNode.findAllWithCriteria({ types: ["COMPONENT_SET"] }).find((s) => s.key === key);
const propertyCards = setByKey(KIT.propertyCard);
const bottomNavSet = setByKey(KIT.bottomNav);
const headerSet = await figma.getNodeByIdAsync(LOCAL.srpHeader);
const pageSet = await figma.getNodeByIdAsync(LOCAL.srpPage);
const buttons = await figma.importComponentSetByKeyAsync(BUTTON_SET);
if (!propertyCards || !bottomNavSet) throw new Error("kit cards/nav set not found on SRP page");

function upsertVariant(set, name) {
  let v = set.children.find((c) => c.name === name);
  if (v) { for (const c of [...v.children]) c.remove(); return v; }
  v = figma.createComponent();
  v.name = name;
  const others = [...set.children];
  set.appendChild(v);
  v.x = Math.max(...others.map((c) => c.x + c.width)) + 40;
  v.y = Math.min(...others.map((c) => c.y));
  return v;
}
function fitSet(set) {
  const r = Math.max(...set.children.map((c) => c.x + c.width)), b = Math.max(...set.children.map((c) => c.y + c.height));
  set.resizeWithoutConstraints(r + 20, b + 20); // hug variants (grid margin 20)
}
async function shell(name, headerName) {
  const p = upsertVariant(pageSet, name);
  p.layoutMode = "VERTICAL"; p.primaryAxisSizingMode = "AUTO"; p.counterAxisSizingMode = "FIXED";
  p.resize(360, Math.max(p.height, 10)); p.clipsContent = true;
  await fill(p, "surface/subtle");
  const head = variant(headerSet, "Property 1=Base, Property 2=Top, Property 3=" + headerName).createInstance();
  p.appendChild(head); fillW(head);
  return p;
}
async function nav(p) {
  const n = variant(bottomNavSet, "Property 1=Buy resale").createInstance();
  p.appendChild(n); fillW(n); n.name = "Bottom navigation";
  await pinBottom(p, n, "5xl");
}
const out = [];

// 1. No results: Balcony + Natural light selected, nothing matches. Fixed 800 viewport, block centred in the feed.
{
  const p = await shell("Property 2=Buy: Feature pills (no results)", "Buy: Feature pills (2 selected)");
  p.primaryAxisSizingMode = "FIXED"; p.resize(360, 800);
  const empty = frame("Empty State", "VERTICAL", p);
  fillW(empty); fillH(empty);
  empty.primaryAxisAlignItems = "CENTER"; empty.counterAxisAlignItems = "CENTER";
  await pad(empty, "none", "2xl", "4xl", "2xl"); // bottom pad lifts the block slightly above true centre (optical)
  await gap(empty, "m");
  const badge = frame("Icon Badge", "HORIZONTAL", empty);
  badge.primaryAxisAlignItems = "CENTER"; badge.counterAxisAlignItems = "CENTER";
  fixedSize(badge, 64, 64); await rad(badge, "l"); await fill(badge, "surface/white"); // rounded square, not a circle await stroke(badge, "border/subtle");
  const ic = await icon("Binoculars", 24, "icon/grey_1", badge);
  ic.resize(32, 32); // no 32 icon size in Bricks: Regular 24 scaled
  const copy = frame("Copy", "VERTICAL", empty);
  fillW(copy); copy.counterAxisAlignItems = "CENTER"; await gap(copy, "xs");
  const h = await text("Heading", "No homes with these features", "Mobile/Heading/h5_semibold", "text/primary", copy);
  h.textAlignHorizontal = "CENTER"; h.maxLines = 1; h.textTruncation = "ENDING";
  const s = await text("Subheading", "Try removing a feature or changing the locality", "Mobile/Body/small_regular", "text/secondary", copy);
  s.textAlignHorizontal = "CENTER"; fillW(s); s.textAutoResize = "HEIGHT";
  await button(buttons, "Clear features", "Secondary", "M", empty);
  await nav(p);
  out.push("no results: " + p.id + " " + Math.round(p.width) + "x" + Math.round(p.height));
}

// 2. Few results: only 2 homes have Balcony, then the feed continues with other homes in the locality.
{
  const p = await shell("Property 2=Buy: Feature pills (few results)", "Buy: Feature pills (1 selected)");
  await countLine(p, "2 homes", " with a balcony");
  await card(p, "SEO cards", "owner-balcony");
  await card(p, "Project card", "ultra-balcony");
  const line = frame("Other Homes Line", "HORIZONTAL", p);
  fillW(line);
  await pad(line, "m", "m", "none", "m");
  await stroke(line, "border/subtle", "t");
  line.strokesIncludedInLayout = false;
  const t = await text("Label", "Keep exploring other properties", "Mobile/Body/small_regular", "text/secondary", line);
  fillW(t); t.maxLines = 1; t.textTruncation = "ENDING";
  await card(p, "SEO cards");
  await nav(p);
  out.push("few results: " + p.id + " " + Math.round(p.width) + "x" + Math.round(p.height));
}
fitSet(pageSet);

// Section / page hygiene: grow the parent section to hold the set, push items below the set down
// so the original 362 gap stays, grow the section by the same amount, then report overlaps.
const sec = pageSet.parent;
const need = pageSet.x + pageSet.width + 80;
if (sec.type === "SECTION" && sec.width < need) sec.resizeWithoutConstraints(need, sec.height);
const GAP_BELOW = 362;
const below = sec.children.filter((n) => n !== pageSet && n.y > pageSet.y + 100);
if (below.length) {
  const delta = pageSet.y + pageSet.height + GAP_BELOW - Math.min(...below.map((n) => n.y));
  if (delta > 0) {
    for (const n of below) n.y += delta;
    sec.resizeWithoutConstraints(sec.width, sec.height + delta);
    out.push("shifted " + below.length + " items below by " + Math.round(delta));
  }
}
const box = (n) => [n.absoluteBoundingBox.x, n.absoluteBoundingBox.y, n.absoluteBoundingBox.x + n.absoluteBoundingBox.width, n.absoluteBoundingBox.y + n.absoluteBoundingBox.height];
const hit = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
const sb = box(pageSet);
const overlaps = sec.children.filter((n) => n !== pageSet && hit(sb, box(n))).map((n) => "set x " + n.name);
const ss = box(sec);
const inside = (a, b) => a[0] >= b[0] && a[1] >= b[1] && a[2] <= b[2] && a[3] <= b[3]; // page-wide container sections
overlaps.push(...srpPageNode.children.filter((n) => n !== sec && hit(ss, box(n)) && !inside(ss, box(n))).map((n) => "section x " + n.name));
const vs = pageSet.children.map(box);
vs.forEach((a, i) => vs.forEach((b, j) => { if (i < j && hit(a, b)) overlaps.push("variants " + pageSet.children[i].name + " x " + pageSet.children[j].name); }));
out.push("set " + Math.round(pageSet.width) + "x" + Math.round(pageSet.height) + " section " + Math.round(sec.width) + "x" + Math.round(sec.height));
out.push("overlaps: " + (overlaps.length ? overlaps.join("; ") : "none"));
for (const id of out.filter((l) => /results/.test(l)).map((l) => l.split(" ")[2])) {
  const a = await audit(await figma.getNodeByIdAsync(id));
  out.push(id + " audit: frames " + a.frames + " texts " + a.texts + " issues " + JSON.stringify(a.issues));
}
dropProbe();
return out.join("\n");
