// CRF desktop RFE goes under "↳ Global" (section "CRF:"), replacing the old D-Web rows (user, 2026-11-11).
// 1. delete everything in the CRF: section from the D-Web strip down; 2. move our rows (all of the CRF: Desktop RFE
// section except its own Ready header) into that slot, strips widened to the Global strips; 3. section hugs;
// 4. remove the emptied "↳ CRF: Desktop" page.
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/move-crf-dweb-to-global.js
const out = {};
const gp = figma.root.children.find((x) => x.name.trim() === "↳ Global"); await gp.loadAsync(); await figma.setCurrentPageAsync(gp);
const gs = gp.children.find((n) => n.type === "SECTION" && n.name === "CRF:");
const txt = (n) => (n.findAll ? n.findAll((t) => t.type === "TEXT" && t.visible).map((t) => t.characters).join(" | ") : "");
const dweb = gs.children.find((n) => n.name === "Page kit" && n.width > 3000 && txt(n) === "D-Web");
const top = dweb.y, stripX = dweb.x, stripW = dweb.width;
const old = gs.children.filter((n) => n.y >= top - 1);
out.removed = old.length; for (const n of old) n.remove();

const dp = figma.root.children.find((x) => x.name.trim() === "↳ CRF: Desktop"); await dp.loadAsync();
const ds = dp.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const ready = ds.children.find((n) => n.name === "Page kit" && Math.round(n.y) === 100);
const first = ds.children.find((n) => n.name === "Page kit" && /^Desktop web: Buy/.test(txt(n)));
const dx = stripX - first.x, dy = top - first.y;
const moving = ds.children.filter((n) => n !== ready);
for (const n of moving) {
  const x = n.x + dx, y = n.y + dy; gs.appendChild(n); n.x = x; n.y = y;
  if (n.name === "Page kit" && n.width > 3000) { n.resize(stripW, n.height); n.x = stripX; }
}
out.moved = moving.length;
const bottom = Math.max(...gs.children.map((n) => n.y + n.height)), right = Math.max(...gs.children.map((n) => n.x + n.width));
gs.resizeWithoutConstraints(Math.max(gs.width, Math.round(right + 100)), Math.round(bottom + 100));
out.section = `${Math.round(gs.width)}x${Math.round(gs.height)}`;
out.notes = gs.findAll((n) => "annotations" in n && n.annotations.length && n.y >= top).length;
// emptied page goes (only its Ready header was left)
if (ds.children.length === 1) { await figma.setCurrentPageAsync(gp); dp.remove(); out.pageRemoved = true; }
out.firstStrip = first.id;
return JSON.stringify(out);
