// Gallery desktop set lives on the kit's Gallery page (user, 2026-11-11), in its own section "Gallery / Desktop",
// top-aligned right of the existing Gallery / Android section (gap 400, padding 100, hugs content).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-gallery-move.js
const crf = await figma.getNodeByIdAsync("2016:179"); await crf.loadAsync();
const galPage = figma.root.children.find((p) => p.name.trim() === "Gallery"); await galPage.loadAsync();
const set = crf.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Dweb / CRF revamp / Gallery") || galPage.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Dweb / CRF revamp / Gallery");
await figma.setCurrentPageAsync(galPage);
let sec = galPage.children.find((n) => n.type === "SECTION" && n.name === "Gallery / Desktop");
const android = galPage.children.find((n) => n.type === "SECTION" && n.name === "Gallery / Android");
if (!sec) { sec = figma.createSection(); sec.name = "Gallery / Desktop"; galPage.appendChild(sec); sec.fills = android.fills; }
sec.appendChild(set); set.name = "Gallery / Desktop"; set.x = 100; set.y = 100;
sec.x = android.x + android.width + 400; sec.y = android.y;
sec.resizeWithoutConstraints(set.width + 200, set.height + 200);
// CRF section: close the gap the set left (shrink to content)
const crfSec = await figma.getNodeByIdAsync("7293:22853");
const bottom = Math.max(...crfSec.children.map((c) => c.y + c.height)); crfSec.resizeWithoutConstraints(crfSec.width, Math.round(bottom + 100));
const b = galPage.children.map((c) => [c.name, c.x, c.y, c.x + c.width, c.y + c.height]); const ov = [];
for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (b[i][1] < b[j][3] && b[j][1] < b[i][3] && b[i][2] < b[j][4] && b[j][2] < b[i][4]) ov.push(b[i][0] + " x " + b[j][0]);
return JSON.stringify({ set: set.id, section: sec.id, at: [Math.round(sec.x), Math.round(sec.y), Math.round(sec.width), Math.round(sec.height)], overlaps: ov, crfSection: Math.round(crfSec.height) });
