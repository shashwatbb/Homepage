// CRF desktop RFE (2026-11-11, PM comment #71): new row "Desktop web: Inline CRF" before the Prototype strip.
// 3 gallery screens (kit Gallery / Desktop, Contact slide, one per form state) at 1280x800, then the NP PDP lead
// section states as bare components (left aligned to their pill, next item at previous right + 150).
// Re-runnable: removes its own row first. Prototype strip moves below; section re-hugs (100 margin).
// Lives on "↳ Global" / section "CRF:" since 2026-11-11 (section kept at 0,0).
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/build-crf-dweb-inline.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ Global"); await page.loadAsync(); await figma.setCurrentPageAsync(page);
const s = page.children.find((n) => n.type === "SECTION" && n.name === "CRF:"); // desktop rows = D-Web block of the shared CRF: section
const [gal, sec] = await Promise.all([figma.importComponentSetByKeyAsync("bd8ac96772ca4b580346ccd03d4659b187e79347"), figma.importComponentSetByKeyAsync("837ae5d23b4f2372ef105fcf0a0f554519201470")]);
const TAG = "Desktop web: Inline CRF (gallery Contact slide, NP PDP section)";
const setT = async (n, layer, chars) => { const t = n.findOne((x) => x.type === "TEXT" && x.name === layer); for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
// remove a previous run of this row
for (const n of [...s.children]) if (n.getSharedPluginData("crfrfe", "row") === "inline") n.remove();
const proto = s.children.find((n) => n.name === "Page kit" && n.findOne((t) => t.type === "TEXT" && /Prototype/.test(t.characters)));
const stripSrc = await figma.getNodeByIdAsync("9469:875675"), pillSrc = await figma.getNodeByIdAsync("9469:886857");
const y0 = Math.round(Math.max(...s.children.filter((n) => n !== proto).map((n) => n.y + n.height)) + 200); // 200 below the previous row
const strip = stripSrc.clone(); s.appendChild(strip); strip.x = stripSrc.x; strip.y = y0; strip.setSharedPluginData("crfrfe", "row", "inline");
await setT(strip, "Information strip", TAG);
const pdp = await figma.importComponentByKeyAsync("0919f3a70fe22e6c5c6ecc8d48560fe5135057c8"); // Web / Homepage / NP / PDP (lead section under Amenities)
const stickyHeader = await figma.importComponentByKeyAsync("eb57a9b5f17f599674ac1946cb59b03708fe2b73"); // Headers / PDP: Scroll (after first fold)

// PDP section screens: 1280x800 crop of the NP PDP page, only the Amenities + Contact sellers part (not the whole page)
const crop = async (state) => {
  const f = figma.createFrame(); f.name = `PDP section: ${state}`; f.resize(1280, 800); f.clipsContent = true; f.fills = [];
  const i = pdp.createInstance(); f.appendChild(i); i.resize(1280, i.height);
  const lead = i.findOne((n) => n.type === "INSTANCE" && n.name === "Contact sellers"); lead.setProperties({ State: state });
  const amen = i.findOne((n) => n.type === "TEXT" && n.characters.trim() === "Amenities").parent.parent.parent; // Amenities section card
  const top = amen.absoluteBoundingBox.y - i.absoluteBoundingBox.y;
  i.x = 0; i.y = -Math.round(top - 64 - 24); // content scrolled under the sticky header
  // sticky layers stay put while the page scrolls: header on top, summary/lead card in the right column
  const h = stickyHeader.createInstance(); f.appendChild(h); h.x = 0; h.y = 0; h.resize(1280, h.height);
  // sticky right card ("Component 18", unpublished): shown through a 384x456 window onto a second page instance
  const w = figma.createFrame(); w.name = "Sticky card"; w.resize(384, 456); w.x = 856; w.y = 64 + 24; w.clipsContent = true; w.fills = []; f.appendChild(w);
  const p2 = pdp.createInstance(); w.appendChild(p2); p2.resize(1280, p2.height); p2.x = -856; p2.y = -678;
  return f;
};
const items = [...gal.children.map((v) => [v, `Gallery: ${v.name.replace("State=", "")}`]), ...["Logged out", "Details missing", "Details provided"].map((st) => ["crop", st])];
let x = 101; const out = [];
for (const [v, name] of items) {
  const i = v === "crop" ? await crop(name) : v.createInstance(); s.appendChild(i); if (v !== "crop") i.name = name; i.x = x; i.y = y0 + 341; i.setSharedPluginData("crfrfe", "row", "inline");
  const p = pillSrc.clone(); s.appendChild(p); p.resize(i.width, p.height); p.x = x; p.y = y0 + 224; p.setSharedPluginData("crfrfe", "row", "inline");
  await setT(p, "Flow/states", i.name);
  out.push(`${name} ${Math.round(i.width)}x${Math.round(i.height)} @${x}`);
  x += Math.round(i.width) + 150;
}
const rowBottom = Math.max(...s.children.filter((n) => n.getSharedPluginData("crfrfe", "row") === "inline").map((n) => n.y + n.height));
proto.y = Math.round(rowBottom + 200);
const bottom = Math.max(...s.children.map((n) => n.y + n.height));
s.resizeWithoutConstraints(Math.max(s.width, x - 150 + 101), Math.round(bottom + 100));
s.x = 0; s.y = 0;
return out.join("\n") + `\nprototype y ${Math.round(proto.y)}, section ${Math.round(s.width)}x${Math.round(s.height)}`;
