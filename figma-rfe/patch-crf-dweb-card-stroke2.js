// In place, CRF desktop kit (2026-11-03, round 2 on Property card):
// stroke border/default -> border/subtle (same as the other strokes in the modal), radius m -> l (NP PDP desktop
// cards: r16 border/subtle), price band flush with the card's left edge (bleeds through the s padding), no radius.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-card-stroke2.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const set = await figma.getNodeByIdAsync("7293:23027");
const out = [];
for (const c of set.children) {
  c.strokes = [await paint("border/subtle")];
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) c.setBoundVariable(k, await V("radius", "l"));
  c.clipsContent = true;
  const b = c.findOne((n) => n.name === "Price band");
  const price = c.findOne((n) => n.type === "TEXT" && n.name === "Price");
  for (const k of ["topLeftRadius", "bottomLeftRadius"]) b.setBoundVariable(k, null);
  b.topLeftRadius = 0; b.bottomLeftRadius = 0;
  b.x = -c.paddingLeft; b.resize(Math.ceil(price.width) + 40 + c.paddingLeft, b.height);
  out.push([c.name, b.x, b.width]);
}
dropProbe();
return JSON.stringify(out);
