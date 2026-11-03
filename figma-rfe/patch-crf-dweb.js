// Small in-place patches on the published CRF desktop kit variants (no rebuild: variant ids, RFE instances and notes survive).
// Then: publish.mjs "Component Kit" <set ids> and accept-updates.mjs "CRF" --page <RFE screen id> <set names>.
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb.js

const SETS = ["7293:23739", "7293:25390"]; // Modal, Post CRF
const out = [];
for (const id of SETS) {
  const set = await figma.getNodeByIdAsync(id);
  // hero illustration at 80% opacity
  for (const n of set.findAll((n) => n.name === "Illustration")) n.opacity = 0.8;
  // Bricks InputField caret is absolute and centred for a 40 box (instances can't move it): hide it, draw our own centred caret
  for (const c of set.findAll((n) => n.name === "Cursor" && n.parent.name === "Field" && n.visible)) {
    const field = c.parent, input = field.parent, variantNode = set.children.find((v) => v.findOne((x) => x.id === c.id));
    c.visible = false;
    for (const old of variantNode.children.filter((x) => x.name === "Caret")) old.remove();
    const txt = field.findOne((x) => x.name === "Text");
    const caret = figma.createRectangle(); caret.name = "Caret"; variantNode.appendChild(caret);
    caret.layoutPositioning = "ABSOLUTE"; caret.resize(1, 18); await fill(caret, "text/primary");
    const fb = field.absoluteBoundingBox, vb = variantNode.absoluteBoundingBox;
    caret.x = Math.round(txt.absoluteBoundingBox.x - vb.x); caret.y = Math.round(fb.y - vb.y + (fb.height - 18) / 2);
    out.push("caret in " + variantNode.name + " at " + caret.x + "," + caret.y + " (field " + Math.round(fb.height) + ")");
  }
  out.push(set.name + ": illustrations " + set.findAll((n) => n.name === "Illustration").map((n) => n.opacity.toFixed(1)).join(","));
}
dropProbe();
return out.join("\n");
