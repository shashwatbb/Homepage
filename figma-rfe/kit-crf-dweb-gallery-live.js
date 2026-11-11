// CRF desktop kit (2026-11-11, PM comment #71): desktop gallery = LIVE housing.com full-screen gallery, rebuilt 1:1
// in auto layout from the live screenshots (no Figma source exists): black, Rubik, title + Verified + price,
// Share / Save, counter with green bar, green Contact Seller, outlined pills (Contact active), arrows, full-bleed
// carousel with peeking slides. Live colours kept as raw values on purpose (user: "no UI changes").
// Only change: the Contact slide is a vertical lead form card (Inline CRF, Bricks), learnt from the Android
// "Gallery / Contact seller" (kit 2277:738). Rebuilds the Gallery set variants in place (ids and key stay).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-gallery-live.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const rgb = (h, a = 1) => ({ type: "SOLID", color: { r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 }, opacity: a });
const LIVE = { black: "#000000", white: "#ffffff", green: "#1bd290", chip: "#f2f3f7", chipText: "#656565", pill: "#909090", pillText: "#c8c8c8", active: "#f0f0f0", line: "#2e2e2e" };
const F = async (style) => { const f = { family: "Rubik", style }; await figma.loadFontAsync(f); return f; };
const [reg, med] = [await F("Regular"), await F("Medium")];
const fr = (name, dir, parent) => { const f = figma.createFrame(); f.name = name; f.layoutMode = dir; f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO"; f.fills = []; if (parent) parent.appendChild(f); return f; };
const tx = (name, chars, font, size, color, parent, lh) => { const t = figma.createText(); t.name = name; t.fontName = font; t.fontSize = size; t.characters = chars; t.fills = [rgb(color)]; if (lh) t.lineHeight = { unit: "PIXELS", value: lh }; if (parent) parent.appendChild(t); return t; };

const section = await figma.getNodeByIdAsync("7293:22853");
const galSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Gallery");
const inlineSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Inline CRF");
const URLS = ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&fm=jpg"];
let photo; try { photo = (await figma.createImageAsync(URLS[0])).hash; } catch (e) { photo = "f2aaebfb74f964dc8a126fce31083651694f4fc4"; }
const [shareI, heartI, xI, cl, cr, checkI] = await Promise.all([iconComponent("ShareNetwork", 16), iconComponent("Heart", 16), iconComponent("X", 24), iconComponent("CaretLeft", 16), iconComponent("CaretRight", 16), iconComponent("Check", 14)]);
const tint = (inst, hex) => { for (const v of inst.findAll((n) => "strokes" in n && n.type !== "INSTANCE" && n.type !== "FRAME")) { if (v.strokes.length) v.strokes = [rgb(hex)]; if (v.fills && v.fills.length) v.fills = [rgb(hex)]; } return inst; };

for (const v of galSet.children) {
  for (const c of [...v.children]) c.remove();
  v.layoutMode = "VERTICAL"; v.primaryAxisSizingMode = "FIXED"; v.counterAxisSizingMode = "FIXED"; v.resize(1280, 800);
  v.fills = [rgb(LIVE.black)]; v.clipsContent = true; v.itemSpacing = 0; v.counterAxisAlignItems = "MIN";
  for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing"]) v.setBoundVariable(k, null);
  v.paddingTop = 24; v.paddingBottom = 0; v.paddingLeft = 0; v.paddingRight = 0;

  // top: header + pills + line (64 side margins)
  const top = fr("Top", "VERTICAL", v); top.layoutSizingHorizontal = "FILL"; top.paddingLeft = top.paddingRight = 64; top.itemSpacing = 16;
  const head = fr("Header", "HORIZONTAL", top); head.layoutSizingHorizontal = "FILL"; head.primaryAxisAlignItems = "SPACE_BETWEEN"; head.counterAxisAlignItems = "MIN";
  const left = fr("Property", "HORIZONTAL", head); left.itemSpacing = 32; left.counterAxisAlignItems = "MIN";
  const tb = fr("Title block", "VERTICAL", left); tb.itemSpacing = 2;
  const tr = fr("Title row", "HORIZONTAL", tb); tr.itemSpacing = 10; tr.counterAxisAlignItems = "CENTER";
  tx("Title", "3 BHK Flat for sale", reg, 18, LIVE.white, tr, 24);
  const badge = fr("Verified", "HORIZONTAL", tr); badge.itemSpacing = 4; badge.paddingLeft = badge.paddingRight = 6; badge.paddingTop = badge.paddingBottom = 2; badge.counterAxisAlignItems = "CENTER";
  badge.strokes = [rgb(LIVE.green)]; badge.strokeWeight = 1; badge.cornerRadius = 3;
  const ck = checkI.createInstance(); badge.appendChild(ck); tint(ck, LIVE.green);
  tx("Label", "Verified", med, 13, LIVE.green, badge, 18);
  tx("Price", "₹2.5 Cr", reg, 18, LIVE.white, tb, 24);
  const acts = fr("Actions", "HORIZONTAL", left); acts.itemSpacing = 16;
  for (const [name, ic] of [["Share", shareI], ["Save", heartI]]) {
    const b = fr(name, "HORIZONTAL", acts); b.itemSpacing = 6; b.paddingLeft = b.paddingRight = 10; b.paddingTop = b.paddingBottom = 4; b.counterAxisAlignItems = "CENTER";
    b.fills = [rgb(LIVE.chip)]; b.cornerRadius = 3; const i = ic.createInstance(); b.appendChild(i); tint(i, LIVE.chipText);
    tx("Label", name, med, 14, LIVE.chipText, b, 18);
  }
  const right = fr("Contact", "HORIZONTAL", head); right.itemSpacing = 44; right.counterAxisAlignItems = "CENTER"; right.paddingRight = 40;
  const cnt = fr("Counter", "VERTICAL", right); cnt.itemSpacing = 8; cnt.counterAxisAlignItems = "CENTER";
  tx("Count", "13/13", reg, 16, LIVE.white, cnt, 20);
  const bar = fr("Progress", "HORIZONTAL", cnt); bar.primaryAxisSizingMode = "FIXED"; bar.counterAxisSizingMode = "FIXED"; bar.resize(86, 3); bar.fills = [rgb(LIVE.green)]; bar.cornerRadius = 2;
  const cta = fr("Contact Seller", "HORIZONTAL", right); cta.primaryAxisSizingMode = "FIXED"; cta.counterAxisSizingMode = "FIXED"; cta.resize(160, 36);
  cta.primaryAxisAlignItems = "CENTER"; cta.counterAxisAlignItems = "CENTER"; cta.fills = [rgb(LIVE.green)]; cta.cornerRadius = 2;
  tx("Label", "Contact Seller", reg, 16, LIVE.white, cta, 20);
  const pr = fr("Pills row", "HORIZONTAL", top); pr.layoutSizingHorizontal = "FILL"; pr.primaryAxisAlignItems = "SPACE_BETWEEN"; pr.counterAxisAlignItems = "CENTER";
  const pills = fr("Pills", "HORIZONTAL", pr); pills.itemSpacing = 9;
  for (const name of ["Main Image", "Bedroom", "Kitchen", "Bathroom", "Others", "Living Room", "Contact"]) {
    const on = name === "Contact";
    const p = fr(name, "HORIZONTAL", pills); p.paddingLeft = p.paddingRight = 14; p.paddingTop = p.paddingBottom = 5; p.cornerRadius = 15;
    p.strokes = [rgb(on ? LIVE.active : LIVE.pill)]; p.strokeWeight = on ? 1.5 : 1; tx("Label", name, reg, 14, on ? LIVE.white : LIVE.pillText, p, 20);
  }
  const ar = fr("Arrows", "HORIZONTAL", pr); ar.itemSpacing = 4;
  for (const ic of [cl, cr]) { const i = ic.createInstance(); ar.appendChild(i); tint(i, LIVE.pillText); }
  const line = fr("Line", "HORIZONTAL", top); line.layoutSizingHorizontal = "FILL"; line.counterAxisSizingMode = "FIXED"; line.resize(line.width, 1); line.fills = [rgb(LIVE.line)];

  // carousel: previous photo (dimmed, peeking), vertical lead form card centred, empty slot after (last slide)
  const car = fr("Carousel", "HORIZONTAL", v); car.layoutSizingHorizontal = "FILL"; car.layoutSizingVertical = "FILL";
  car.primaryAxisAlignItems = "CENTER"; car.counterAxisAlignItems = "MIN"; car.itemSpacing = 21; car.paddingTop = 30; car.paddingBottom = 40; car.clipsContent = true;
  const prev = fr("Previous slide", "VERTICAL", car); prev.primaryAxisSizingMode = "FIXED"; prev.counterAxisSizingMode = "FIXED"; prev.resize(1032, 580); prev.layoutSizingVertical = "FILL";
  prev.fills = [{ type: "IMAGE", imageHash: photo, scaleMode: "FILL" }, rgb(LIVE.black, 0.55)]; // live dims slides that are not active
  const form = inlineSet.children.find((c) => c.name === v.name).createInstance(); car.appendChild(form); form.name = "Lead form";
  const after = fr("Next slot", "VERTICAL", car); after.primaryAxisSizingMode = "FIXED"; after.counterAxisSizingMode = "FIXED"; after.resize(1032, 10);
  // close + carousel arrow (absolute, as live)
  const x = xI.createInstance(); x.name = "Close"; v.appendChild(x); x.layoutPositioning = "ABSOLUTE"; x.resize(28, 28); x.x = 1280 - 24 - 28; x.y = 18; tint(x, LIVE.white);
  const la = cl.createInstance(); la.name = "Previous"; v.appendChild(la); la.layoutPositioning = "ABSOLUTE"; la.resize(28, 28); la.x = 24; la.y = 440; tint(la, LIVE.white);
  out[v.name] = `form ${Math.round(form.height)} / carousel ${Math.round(car.height - 70)}`;
}
dropProbe();
return JSON.stringify(out, null, 1);
