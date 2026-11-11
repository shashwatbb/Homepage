// NP PDP desktop main component (kit page PDP, 3414:11591): add the CRF lead section to the main column right
// under Amenities (user, 2026-11-11). Insert only; nothing else in the page is touched. Default state Logged out.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-np-pdp-lead-section.js
const m = await figma.getNodeByIdAsync("3414:11591"); let pg = m; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
const col = await figma.getNodeByIdAsync("3399:12459"), amen = await figma.getNodeByIdAsync("3399:13183");
const sec = await figma.getNodeByIdAsync("7476:5436"); // Dweb / CRF revamp / PDP lead section
const before = Math.round(m.height);
let inst = col.children.find((n) => n.name === "Contact sellers");
if (!inst) {
  inst = sec.children.find((v) => v.name === "State=Logged out").createInstance(); inst.name = "Contact sellers";
  col.insertChild(col.children.indexOf(amen) + 1, inst); inst.layoutSizingHorizontal = "FILL";
}
// grow every fixed-height ancestor up to the component by the inserted height, if they don't hug
const add = inst.height + col.itemSpacing; const grown = [];
for (let p = col.parent; p && p !== m.parent; p = p.parent) {
  if (p.layoutMode && p.layoutMode !== "NONE") { const vert = p.layoutMode === "VERTICAL"; const fixed = vert ? p.primaryAxisSizingMode === "FIXED" : p.counterAxisSizingMode === "FIXED"; if (!fixed) continue; }
  if (p.type === "COMPONENT" || p.type === "FRAME") { p.resize(p.width, p.height + add); grown.push(p.name.slice(0, 24)); }
  if (p === m) break;
}
return JSON.stringify({ inst: inst.id, index: col.children.indexOf(inst), after: col.children[col.children.indexOf(inst) - 1].name, height: Math.round(inst.height), main: `${before} -> ${Math.round(m.height)}`, grown });
