// In place, CRF desktop kit (2026-11-03): no divider above the Safety note card on Post CRF (the card's own border
// already separates it). node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-no-safety-divider.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const post = await figma.getNodeByIdAsync("7293:25390");
const out = [];
for (const v of post.children) {
  const safe = v.findOne((n) => n.type === "INSTANCE" && /Safety note/.test(n.name));
  if (!safe) { out.push(v.name + ": no safety"); continue; }
  // walk up until a sibling precedes it, then remove that sibling if it is a divider
  let node = safe;
  while (node.parent && node.parent.children.indexOf(node) === 0) node = node.parent;
  const sibs = node.parent.children, prev = sibs[sibs.indexOf(node) - 1];
  if (prev && /divider/i.test(prev.name) && prev.height <= 2) { out.push(v.name + ": removed " + prev.name); prev.remove(); }
  else out.push(v.name + ": prev " + (prev && prev.name + " " + Math.round(prev.height)));
}
return out.join("\n");
