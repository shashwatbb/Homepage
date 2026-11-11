// In place (2026-11-11, user): every "WhatsApp me the details" CTA is the Bricks Button (Secondary, L) with the
// official WhatsApp glyph in the leading icon slot, not a custom frame (CRF Modal phone steps, Inline CRF, PDP section).
// PDP section: edit phone sits in the sellers row after a vertical separator (logged-in states).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-wa-bricks.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = { swapped: 0 };
const btnSet = await figma.importComponentSetByKeyAsync("1cdd6502c90fd59d70b838a35fb444d63aef2d88");
const waComp = await figma.getNodeByIdAsync("7297:44740");
const v = btnSet.children.find((c) => c.name === "Variant=Secondary, Size=L, State=Default");
const makeWA = () => {
  const b = v.createInstance(); b.name = "WhatsApp Button"; const props = {};
  for (const k of Object.keys(b.componentProperties)) {
    if (k.startsWith("Label#")) props[k] = "WhatsApp me the details";
    if (/^Has Trailing Icon#/.test(k)) props[k] = false;
    if (/^Has Leading Icon#/.test(k)) props[k] = true;
    if (k.startsWith("Leading icon (L)#")) props[k] = waComp.id;
  }
  b.setProperties(props); return b;
};
for (const id of ["7293:23739", "7473:35355", "7476:5436"]) {
  const set = await figma.getNodeByIdAsync(id);
  for (const old of set.findAll((n) => n.name === "WhatsApp button")) {
    const p = old.parent, i = p.children.indexOf(old), fillW_ = old.layoutSizingHorizontal === "FILL";
    const b = makeWA(); p.insertChild(i, b); b.layoutSizingHorizontal = fillW_ ? "FILL" : "HUG"; old.remove(); out.swapped++;
  }
}
// PDP section: edit phone in the sellers row (after a vertical separator), logged-in states
const edit = await figma.getNodeByIdAsync("7301:59382");
const sec = await figma.getNodeByIdAsync("7476:5436"); out.edit = [];
for (const st of sec.children.filter((c) => /Details (missing|provided)/.test(c.name))) {
  for (const e of st.findAll((n) => n.name === "Edit phone" && n.parent.name === "Left")) e.remove();
  const sellers = st.findOne((n) => n.name === "Sellers"); if (sellers.findOne((n) => n.name === "Edit phone")) continue;
  const l = figma.createLine(); l.name = "Separator"; sellers.appendChild(l); l.resize(16, 0); l.rotation = -90;
  l.strokes = [await paint("border/default")]; l.strokeWeight = 1; l.strokeCap = "ROUND";
  const e = edit.clone(); sellers.appendChild(e); e.layoutSizingHorizontal = "HUG";
  sellers.counterAxisAlignItems = "CENTER";
  out.edit.push(st.name);
}
let y = 40; for (const c of sec.children) { c.y = y; y += c.height + 40; } sec.resize(sec.width, y);
out.heights = sec.children.map((c) => `${c.name} ${Math.round(c.height)}`);
dropProbe();
return JSON.stringify(out);
