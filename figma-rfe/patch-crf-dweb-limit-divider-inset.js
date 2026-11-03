// In place (2026-11-03): divider above the Limit reached row inside the Outcome card is inset to the row's m padding
// (not edge to edge), radius full. node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-limit-divider-inset.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const v = (await figma.getNodeByIdAsync("7293:25390")).children.find((c) => c.name === "Type=Buy: Limit reached");
const outcome = v.findOne((n) => n.name === "Outcome");
const limit = outcome.children.find((n) => n.name === "Limit reached");
const prev = outcome.children[outcome.children.indexOf(limit) - 1];
if (prev.name === "Divider") {
  const wrap = figma.createFrame(); wrap.name = "Divider inset"; wrap.fills = [];
  outcome.insertChild(outcome.children.indexOf(prev), wrap);
  wrap.layoutMode = "HORIZONTAL"; wrap.layoutSizingHorizontal = "FILL"; wrap.layoutSizingVertical = "HUG";
  for (const k of ["paddingLeft", "paddingRight"]) wrap.setBoundVariable(k, await V("spacing", "m"));
  wrap.appendChild(prev); prev.layoutSizingHorizontal = "FILL"; prev.layoutSizingVertical = "FIXED"; prev.resize(prev.width, 1); wrap.layoutSizingVertical = "HUG";
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) prev.setBoundVariable(k, await V("radius", "full"));
}
const w = outcome.findOne((n) => n.name === "Divider inset");
return JSON.stringify({ wrap: [w.width, w.height], div: [w.children[0].x, w.children[0].width] });
