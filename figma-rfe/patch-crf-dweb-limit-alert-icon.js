// In place (2026-11-03): Limit reached info icon sits in a 40 (= property photo, texts align) rounded square alert tile (radius s,
// semantic_surface/danger) with the icon in semantic_icons/danger; row gap s, centred (same as the success badge row).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-limit-alert-icon.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const v = (await figma.getNodeByIdAsync("7293:25390")).children.find((c) => c.name === "Type=Buy: Limit reached");
const row = v.findOne((n) => n.name === "Limit reached");
let tile = row.children.find((n) => n.name === "Alert tile");
if (!tile) {
  const icon = row.children.find((n) => n.name === "Info");
  tile = figma.createFrame(); tile.name = "Alert tile";
  row.insertChild(row.children.indexOf(icon), tile);
  tile.layoutMode = "HORIZONTAL"; tile.primaryAxisAlignItems = "CENTER"; tile.counterAxisAlignItems = "CENTER";
  tile.resize(40, 40); tile.layoutSizingHorizontal = "FIXED"; tile.layoutSizingVertical = "FIXED";
  tile.appendChild(icon);
}
tile.fills = [await paint("semantic_surface/danger")];
for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) tile.setBoundVariable(k, await V("radius", "s"));
await tintIcon(tile.children[0], "semantic_icons/danger");
row.counterAxisAlignItems = "CENTER"; row.setBoundVariable("itemSpacing", await V("spacing", "s"));
// breathing room (user: too compact): property + support rows in the Outcome card get m top/bottom
for (const r of [v.findOne((n) => n.name === "Outcome").children.find((n) => n.name === "Property"), row])
  for (const k of ["paddingTop", "paddingBottom"]) r.setBoundVariable(k, await V("spacing", "m"));
dropProbe();
return JSON.stringify({ tile: [tile.width, tile.height], row: [row.width, row.height] });
