// In place (2026-11-11, user): Post CRF contacts heading "Seller" / "Sellers" / "Owner" -> "Reach out to" (all variants).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-reach-out.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const set = await figma.getNodeByIdAsync("7293:25390"); const out = [];
for (const v of set.children) {
  const t = v.findOne((n) => n.name === "Contacts")?.findOne((n) => n.type === "TEXT" && n.name === "Title"); if (!t) continue;
  for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
  t.characters = "Reach out to"; out.push(`${v.name}: ${Math.round(t.x)},${Math.round(t.y)} ${Math.round(t.width)}x${Math.round(t.height)}`);
}
return out.join("\n");
