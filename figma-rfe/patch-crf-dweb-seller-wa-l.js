// In place (2026-11-11): Seller row WhatsApp IconButton Secondary M -> L, glyph stays 20.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-seller-wa-l.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const seller = await figma.getNodeByIdAsync("7347:30457"); const out = [];
for (const row of seller.children) {
  const b = row.children.find((n) => n.name === "WhatsApp"); if (!b) continue;
  const before = b.findOne((n) => n.type === "INSTANCE" && /WhatsApp/.test(n.name));
  b.setProperties({ Size: "L" });
  const g = b.findOne((n) => n.type === "INSTANCE" && (n.mainComponent?.name || n.name).includes("WhatsApp"));
  const gm = g ? await g.getMainComponentAsync() : null;
  // glyph stays 20 (user: "icon size is perfect"); button keeps the L 40x40 box, glyph centred
  b.layoutSizingHorizontal = "FIXED"; b.layoutSizingVertical = "FIXED"; b.resize(40, 40);
  let slot = g; while (slot.parent && slot.parent !== b) slot = slot.parent;
  for (const n of [g, slot]) if (n.resize && (n.width > 20 || n.height > 20)) { if ("layoutSizingHorizontal" in n && n.parent.layoutMode && n.parent.layoutMode !== "NONE") { n.layoutSizingHorizontal = "FIXED"; n.layoutSizingVertical = "FIXED"; } n.resize(20, 20); }
  out.push(`${row.name}: ${Math.round(b.width)}x${Math.round(b.height)} r${String(b.cornerRadius)} pad ${b.paddingLeft} glyph ${g ? Math.round(g.width) : "?"} (${gm && gm.name}) before ${before ? Math.round(before.width) : "?"} row h ${Math.round(row.height)}`);
}
return out.join("\n");
