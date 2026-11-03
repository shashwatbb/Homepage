// In place: every stroke icon (Bricks Iconography Format=Stroke) inside the CRF desktop kit sets gets a 1.5 stroke,
// whatever its size. Fill icons (no strokes) are untouched. Also returns set names + a live RFE screen id for ship.mjs.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-icon-stroke.js
const SETS = ["7293:23739", "7293:25390", "7293:22982", "7293:23027", "7302:60729", "7302:60742"];
const page = await figma.getNodeByIdAsync("2016:179");
await figma.setCurrentPageAsync(page);
let icons = 0, vectors = 0;
const names = [];
for (const id of SETS) {
  const set = await figma.getNodeByIdAsync(id);
  names.push(set.name);
  for (const inst of set.findAll((n) => n.type === "INSTANCE")) {
    const main = await inst.getMainComponentAsync();
    if (!main || !/Format=Stroke/.test(main.name)) continue;
    let hit = false;
    for (const v of inst.findAll((n) => "strokes" in n && n.strokes.length && n.visible)) {
      if (v.strokeWeight !== 1.5) { v.strokeWeight = 1.5; vectors++; }
      hit = true;
    }
    if (hit) icons++;
  }
}
return JSON.stringify({ icons, vectors, names });
