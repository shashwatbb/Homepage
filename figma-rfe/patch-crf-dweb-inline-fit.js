// In place (2026-11-11, user): gallery lead card height = gallery photo height; consent copy smaller in the card
// (Web/Caption/default_regular 12, below the 14 web floor on request).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-inline-fit.js
const out = {};
const crf = await figma.getNodeByIdAsync("2016:179"); await figma.setCurrentPageAsync(crf);
const inline = await figma.getNodeByIdAsync("7473:35355");
const st = await style("Web/Caption/default_regular"); out.consent = 0;
for (const t of inline.findAll((n) => n.type === "TEXT" && /^I agree to be contacted/.test(n.characters))) {
  for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
  await t.setTextStyleIdAsync(st.id); out.consent++;
}
out.inline = inline.children.map((v) => `${v.name} ${Math.round(v.height)}`);
const gal = await figma.getNodeByIdAsync("7473:35840"); let pg = gal; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
out.gallery = [];
for (const v of gal.children) {
  const form = v.findOne((n) => n.name === "Lead form"); form.layoutSizingVertical = "FILL";
  const prev = v.findOne((n) => n.name === "Previous slide");
  out.gallery.push(`${v.name}: card ${Math.round(form.height)} / photo ${Math.round(prev.height)}`);
}
dropProbe();
return JSON.stringify(out);
