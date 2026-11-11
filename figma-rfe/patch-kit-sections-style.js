// Kit sections holding our sets follow the NP PDP kit section (PDP 2269:4590): white fill, 1px #555555 dashed 12/12
// stroke, corner radius 120 (user rule 2026-11-11). Sets keep the default purple dashed frame, no fill.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-kit-sections-style.js
const ref = await figma.getNodeByIdAsync("2269:4590"); const out = [];
for (const id of ["7293:22853", "7476:5242"]) {
  const s = await figma.getNodeByIdAsync(id); let pg = s; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
  s.fills = JSON.parse(JSON.stringify(ref.fills)); s.strokes = JSON.parse(JSON.stringify(ref.strokes));
  s.strokeWeight = ref.strokeWeight; s.strokeAlign = ref.strokeAlign; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius;
  out.push(`${s.name}: r${s.cornerRadius} dash ${JSON.stringify(s.dashPattern)} fill white`);
}
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
(await figma.getNodeByIdAsync("7476:5436")).fills = [];
return out.join("\n");
