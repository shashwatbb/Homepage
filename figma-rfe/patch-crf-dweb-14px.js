// In-place patch: web type floor 14px. 12px styles (Web/Caption/*, Web/Label/default_*) -> Web/Body/small_*;
// inline separators next to them 12 -> 16. Skips text inside instances (design-system internals).
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-14px.js

const SETS = ["7293:23739", "7293:25390", "7293:22982", "7293:23027"]; // Modal, Post CRF, Seller, Property card
const MAP = { "Web/Caption/default_regular": "Web/Body/small_regular", "Web/Label/default_regular": "Web/Body/small_regular",
  "Web/Caption/default_medium": "Web/Body/small_medium", "Web/Label/default_medium": "Web/Body/small_medium" };
const byId = {};
for (const name of Object.keys(MAP)) byId[(await style(name)).id] = name;
const inInstance = (n) => { for (let p = n.parent; p; p = p.parent) if (p.type === "INSTANCE") return true; return false; };
let texts = 0, seps = 0;
for (const id of SETS) {
  const root = await figma.getNodeByIdAsync(id);
  for (const t of root.findAll((n) => n.type === "TEXT" && !inInstance(n))) {
    // whole node or ranges (emphasised parts)
    const segs = t.getStyledTextSegments(["textStyleId"]);
    let hit = false;
    for (const sg of segs) {
      const from = byId[sg.textStyleId]; if (!from) continue;
      await t.setRangeTextStyleIdAsync(sg.start, sg.end, (await style(MAP[from])).id); hit = true;
    }
    if (hit) texts++;
  }
  for (const l of root.findAll((n) => n.type === "LINE" && n.name === "Separator" && Math.round(n.width) === 12 && !inInstance(n))) { l.resize(16, 0); seps++; }
}
dropProbe();
return `texts restyled: ${texts}, separators 12->16: ${seps}`;
