// In place: vertical inline separators next to 14px text 16 -> 14 long (user: "slightly shorter").
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-sep-14.js
const SETS = ["7293:23739", "7293:25390", "7293:22982", "7293:23027", "7302:60729", "7302:60742"];
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const inInstance = (n) => { for (let p = n.parent; p; p = p.parent) if (p.type === "INSTANCE") return true; return false; };
let seps = 0;
for (const id of SETS) {
  const set = await figma.getNodeByIdAsync(id);
  for (const l of set.findAll((n) => n.type === "LINE" && n.name === "Separator" && Math.round(n.width) === 16 && !inInstance(n))) { l.resize(14, 0); seps++; }
}
return `separators 16->14: ${seps}`;
