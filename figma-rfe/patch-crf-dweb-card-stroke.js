// In place, CRF desktop kit (2026-11-03):
// 1. Price band only on Property cards: remove it from the success card Meta row.
// 2. Property card = NP PDP stroke card: surface/white, 1px border/default inside, radius m, padding s, outer width
//    kept 208 (2-up in 432 with gap 16); photo 184x120 radius s; photo to details s, detail lines 2xs.
// 3. Rent multi-connect checkbox re-pinned to the photo's top right (inset xs).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-card-stroke.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const post = await figma.getNodeByIdAsync("7293:25390");
let removed = 0;
for (const b of post.findAll((n) => n.name === "Price band" && n.parent.name === "Meta")) { b.remove(); removed++; }

const set = await figma.getNodeByIdAsync("7293:23027");
const sp = async (k) => V("spacing", k);
for (const c of set.children) {
  c.fills = [await paint("surface/white")]; c.strokes = [await paint("border/default")];
  c.strokeWeight = 1; c.strokeAlign = "INSIDE";
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) c.setBoundVariable(k, await V("radius", "m"));
  for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]) c.setBoundVariable(k, await sp("s"));
  c.setBoundVariable("itemSpacing", await sp("s"));
  c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "FIXED"; c.resize(208, c.height);
  const photo = c.findOne((n) => n.name === "Photo");
  photo.resize(184, 120);
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) photo.setBoundVariable(k, await V("radius", "s"));
  const det = c.findOne((n) => n.name === "Details");
  det.layoutSizingHorizontal = "FILL"; det.setBoundVariable("itemSpacing", await sp("2xs"));
}

set.resize(set.width, Math.max(...set.children.map((c) => c.y + c.height)) + 40);
let boxes = 0;
for (const s of post.findAll((n) => n.name === "Selectable card")) {
  const cb = s.children.find((n) => n.name === "Checkbox");
  if (!cb) continue;
  cb.x = 12 + 184 - 8 - cb.width; cb.y = 12 + 8; boxes++;
}
dropProbe();
return JSON.stringify({ removed, cards: set.children.map((c) => [c.name, c.width, c.height]), boxes });
