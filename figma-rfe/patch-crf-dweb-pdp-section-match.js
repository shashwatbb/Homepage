// In place (2026-11-11, user): PDP lead section matches the other NP PDP sections exactly: same section title style
// as the page (Web/Heading/H5 SemiBold, key 66c2574a, 18/26) and the same card fills as Amenities (3399:13183).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-pdp-section-match.js
const amen = await figma.getNodeByIdAsync("3399:13183");
const amenTitle = amen.findOne((n) => n.type === "TEXT"); const st = await figma.getStyleByIdAsync(amenTitle.textStyleId); await figma.loadFontAsync(st.fontName); // the page's own H5 style
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const set = await figma.getNodeByIdAsync("7476:5436"); const out = [];
for (const v of set.children) {
  const t = v.findOne((n) => n.type === "TEXT" && n.name === "Title"); await t.setTextStyleIdAsync(st.id);
  v.fills = JSON.parse(JSON.stringify(amen.fills));
  out.push(`${v.name}: ${t.fontSize}/${t.lineHeight.value} fills ${v.fills.map((f) => f.type).join("+")}`);
}
return out.join("\n");
