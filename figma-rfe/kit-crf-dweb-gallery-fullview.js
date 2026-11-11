// CRF desktop kit (2026-11-11, PM comment #71): desktop gallery = FULL SCREEN viewer, not the grid modal.
// Base: PDP [Demand] "Gallery full view / Dweb" (Cage Page, Property 1=Gallery, 1280x900) rebuilt in auto layout at
// 1280x800: black, title h1 + X, Tabs / Gallery (library), carousel of r16 slides (centre slide + peeking sides,
// side fades, white arrow buttons), Secondary + Primary L CTAs. As on live desktop, the last tab/slide is "Contact":
// a white slide with Property information (stat tiles + highlight) and the redesigned Inline CRF on the right.
// Rebuilds the variants of the existing "Dweb / CRF revamp / Gallery" set in place (component ids and key stay).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-gallery-fullview.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const SP = { 0: "none", 2: "3xs", 4: "2xs", 8: "xs", 12: "s", 16: "m", 20: "l", 24: "xl", 32: "2xl", 40: "3xl" };
const RD = { 8: "s", 12: "m", 16: "l", 999: "full" };
const P = async (n, t, r, b, l) => pad(n, SP[t], r == null ? undefined : SP[r], b == null ? undefined : SP[b], l == null ? undefined : SP[l]);
const G = (n, px) => gap(n, SP[px]);
const Rr = (n, px) => rad(n, RD[px]);
const BLACK = { type: "SOLID", color: { r: 0, g: 0, b: 0 } }; // live gallery is pure black; no black token in Bricks
const setT = async (t, chars) => { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
const setLabel = (inst, label) => { const k = Object.keys(inst.componentProperties).find((p) => p.startsWith("Label#")); if (k) inst.setProperties({ [k]: label }); };

const section = await figma.getNodeByIdAsync("7293:22853");
const galSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Gallery");
const inlineSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Inline CRF");
const btnSet = await figma.importComponentSetByKeyAsync("1cdd6502c90fd59d70b838a35fb444d63aef2d88");
const dl = await figma.importComponentByKeyAsync("ca2d5d878a1fe13b0d81b13b618e47cf830c6155"); // DownloadSimple 20
// photos (Unsplash, same set as the grid gallery)
const URLS = ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&fm=jpg",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&fm=jpg"];
const photoHashes = [];
for (const u of URLS) { try { photoHashes.push((await figma.createImageAsync(u)).hash); } catch (e) { photoHashes.push("f2aaebfb74f964dc8a126fce31083651694f4fc4"); } }
out.photos = photoHashes.length;

const slideImg = (name, hash, label, parent) => {
  const s = frame(name, "VERTICAL", parent); fixedSize(s, 996, 528); s.primaryAxisAlignItems = "MAX"; s.clipsContent = true;
  s.fills = [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
  return s;
};

for (const v of galSet.children) {
  const state = v.name.replace("State=", "");
  for (const c of [...v.children]) c.remove();
  v.layoutMode = "VERTICAL"; v.primaryAxisSizingMode = "FIXED"; v.counterAxisSizingMode = "FIXED"; v.resize(1280, 800);
  v.counterAxisAlignItems = "CENTER"; v.fills = [BLACK]; v.clipsContent = true; v.strokes = [];
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) { v.setBoundVariable(k, null); v[k] = 0; }
  await P(v, 24, 0, 24, 0); await G(v, 32);

  // header: title + close, tabs
  const head = frame("Header", "VERTICAL", v); fixedSize(head, 996, null); head.primaryAxisSizingMode = "AUTO"; await G(head, 24);
  const row = fillW(frame("Title row", "HORIZONTAL", head)); row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER";
  await text("Title", "Evolvus Phase 1", "Web/Heading/h1_semibold", "text/inverse", row);
  await icon("X", 24, "text/inverse", row).then((x) => { x.name = "Close"; x.resize(32, 32); });
  // tabs: Gallery tab style (Tabs / Gallery on black), built token-bound because the library item's Selected state is light-theme
  const tabs = fillW(frame("Tabs", "HORIZONTAL", head)); await stroke(tabs, "warm_neutral/700", "b"); tabs.strokesIncludedInLayout = false;
  const labels = ["Main image", "Bedroom", "Kitchen", "Bathroom", "Living room", "Contact"];
  for (const [i, lab] of labels.entries()) {
    const on = i === labels.length - 1; // Contact = active tab
    const t = frame(lab, "VERTICAL", tabs); await P(t, 12, 12, 0, 12); await G(t, 12);
    await text("Label", lab, "Web/Body/small_medium", on ? "text/inverse" : "warm_neutral/400", t);
    const u = frame("Active line", "HORIZONTAL", t); fixedSize(u, null, 2); u.layoutSizingHorizontal = "FILL"; await fill(u, "text/inverse"); await Rr(u, 999); u.opacity = on ? 1 : 0;
  }

  // carousel: prev image, Contact slide (centre), next image; overflow centred so sides peek
  const car = frame("Carousel", "HORIZONTAL", v); car.layoutSizingHorizontal = "FILL"; fixedSize(car, null, 528); car.layoutSizingHorizontal = "FILL";
  car.primaryAxisAlignItems = "CENTER"; await G(car, 24); car.clipsContent = true;
  const prev = slideImg("Previous slide", photoHashes[1] || photoHashes[0], "Living room", car); await Rr(prev, 16);
  const cs = frame("Contact slide", "HORIZONTAL", car); fixedSize(cs, 996, 528); await fill(cs, "surface/white"); await Rr(cs, 16); await P(cs, 32); await G(cs, 32); cs.clipsContent = true;
  const next = slideImg("Next slide", photoHashes[0], "Main image", car); await Rr(next, 16);

  // Contact slide, left: property information
  const left = frame("Property information", "VERTICAL", cs); left.layoutSizingHorizontal = "FILL"; await G(left, 24);
  await text("Title", "Property information", "Web/Heading/h5_semibold", "text/primary", left);
  const grid = fillW(frame("Stats", "HORIZONTAL", left)); grid.layoutWrap = "WRAP"; await G(grid, 8); await wrapGap(grid, "xs");
  const stats = [["₹2.5 - 4.53 Cr", "Price"], ["1,250 - 2,890 sq.ft.", "Size"], ["3, 4 BHK", "Apartments"], ["Dec, 2026", "Possession"], ["4.06 Acres", "Project area"], ["4 Buildings", "Project size"]];
  for (const [val, lab] of stats) {
    const t = frame(lab, "VERTICAL", grid); fixedSize(t, 172, null); t.primaryAxisSizingMode = "AUTO"; await P(t, 12, 16); await G(t, 2); await fill(t, "surface/subtle"); await Rr(t, 12);
    const a = await text("Value", val, "Web/Body/default_medium", "text/primary", t); a.layoutSizingHorizontal = "FILL"; a.textTruncation = "ENDING"; a.maxLines = 1;
    await text("Label", lab, "Web/Body/small_regular", "text/secondary", t);
  }
  const hl = fillW(frame("Highlight", "HORIZONTAL", left)); hl.counterAxisAlignItems = "CENTER"; await P(hl, 12, 16); await G(hl, 8);
  await fill(hl, "semantic_surface/warning"); await stroke(hl, "semantic_border/warning"); await Rr(hl, 12);
  await icon("TrendUp", 20, "semantic_icons/warning", hl);
  await text("Copy", "Great choice! Most viewed project in this area", "Web/Body/small_medium", "text/primary", hl);

  // Contact slide, right: inline CRF (fixed column; scrolls when taller than the slide)
  const right = frame("Contact", "VERTICAL", cs); fixedSize(right, 376, null); await P(right, 0, 16, 0, 0); // 16 scroll gutter right.layoutSizingVertical = "FILL"; right.clipsContent = true;
  const form = inlineSet.children.find((c) => c.name === v.name).createInstance(); right.appendChild(form);
  form.strokes = []; form.clipsContent = false; form.layoutSizingHorizontal = "FILL"; for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]) { form.setBoundVariable(k, null); form[k] = 0; } // slide is the card: no card in card
  const avail = 528 - 64;
  if (form.height > avail) {
    const fade = frame("Bottom fade", "HORIZONTAL", right); fade.layoutPositioning = "ABSOLUTE"; fade.resize(376, 48); fade.x = 0; fade.y = avail - 48;
    fade.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 1, color: { r: 1, g: 1, b: 1, a: 1 } }] }];
    const bar = frame("Scrollbar", "HORIZONTAL", right); bar.layoutPositioning = "ABSOLUTE"; bar.resize(4, Math.round(avail * avail / form.height)); bar.x = 372; bar.y = 8;
    await fill(bar, "border/default"); await Rr(bar, 999);
  }

  // side fades + arrows (absolute, over the peeking slides)
  const carY = 24 + head.height + 32;
  for (const [name, x, flip] of [["Fade left", 0, false], ["Fade right", 1280 - 142, true]]) { // peek area only, never over the white slide
    const f = frame(name, "HORIZONTAL", v); f.layoutPositioning = "ABSOLUTE"; f.resize(142, 528); f.x = x; f.y = carY;
    f.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: flip ? [[1, 0, 0], [0, 1, 0]] : [[-1, 0, 1], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0, b: 0, a: 0 } }, { position: 1, color: { r: 0, g: 0, b: 0, a: 1 } }] }];
  }
  for (const [name, ic, x] of [["Previous", "CaretLeft", 82], ["Next", "CaretRight", 1280 - 82 - 42]]) {
    const a = frame(name, "HORIZONTAL", v); a.layoutPositioning = "ABSOLUTE"; a.primaryAxisAlignItems = "CENTER"; a.counterAxisAlignItems = "CENTER";
    a.resize(42, 42); a.x = x; a.y = carY + 264 - 21; await fill(a, "surface/white"); await stroke(a, "border/subtle"); await Rr(a, 12);
    a.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.08 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0, visible: true, blendMode: "NORMAL" }];
    await icon(ic, 16, "text/primary", a);
  }

  // CTAs
  const ctas = frame("CTAs", "HORIZONTAL", v); await G(ctas, 16);
  const b1 = await button(btnSet, "Download brochure", "Secondary", "L", ctas);
  b1.fills = []; await stroke(b1, "border/default");
  for (const t of b1.findAll((n) => n.type === "TEXT")) await fill(t, "text/inverse");
  await button(btnSet, "Request floor plans", "Primary", "L", ctas);
  out[state] = `form ${Math.round(form.height)} (avail ${avail})`;
}
out.audit = await audit(galSet);
dropProbe();
return JSON.stringify(out, null, 1);
