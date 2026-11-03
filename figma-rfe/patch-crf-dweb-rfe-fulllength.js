// RFE layout rule (2026-11-03): rows of bare components outside screens (Full length, Seller: No photo) are packed
// left: each item's left edge = its flow pill's left edge, pill width = item width, next slot = item right + 150.
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/patch-crf-dweb-rfe-fulllength.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
const sec = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const isPill = (n) => n.name === "Page kit" && Math.round(n.height) === 60;
const pillYs = [...new Set(sec.children.filter(isPill).map((n) => Math.round(n.y)))].sort((a, b) => a - b);
const rowY = pillYs[pillYs.length - 1];
const pills = sec.children.filter((n) => isPill(n) && Math.round(n.y) === rowY).sort((a, b) => a.x - b.x);
const items = sec.children.filter((n) => n.type === "INSTANCE" && n.name !== "Page kit" && n.y > rowY && n.y < rowY + 200).sort((a, b) => a.x - b.x);
if (pills.length !== items.length) throw new Error(`pills ${pills.length} vs items ${items.length}`);
let x = 101; const out = [];
for (const [i, it] of items.entries()) {
  const p = pills[i];
  p.x = x; p.resize(it.width, p.height);
  it.x = x;
  out.push([it.name, x, Math.round(it.width)]);
  x += it.width + 150;
}
return JSON.stringify(out);
