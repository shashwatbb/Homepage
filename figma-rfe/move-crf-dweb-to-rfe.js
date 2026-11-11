// CRF desktop: Design Draft -> Tech hand-over (user, 2026-11-11). Page moves after the last hand-over page (before
// the first "--" separator); header Page kit swaps In review -> Ready (reset overrides, size/position kept).
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/move-crf-dweb-to-rfe.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop");
const sepIdx = figma.root.children.findIndex((p) => p.name === "--");
figma.root.insertChild(sepIdx, page);
await page.loadAsync(); await figma.setCurrentPageAsync(page);
const sec = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const head = sec.children.find((n) => n.name === "Page kit" && Math.round(n.x) === 101 && Math.round(n.y) === 100);
const w = head.width;
head.setProperties({ Type: "Ready" }); head.resetOverrides(); head.resize(w, head.height); head.x = 101; head.y = 100;
return JSON.stringify({ order: figma.root.children.slice(0, 9).map((p) => p.name.trim()), type: head.componentProperties.Type.value, head: head.id,
  texts: head.findAll((n) => n.type === "TEXT" && n.visible).map((t) => t.name + "=" + t.characters), props: Object.fromEntries(Object.entries(head.componentProperties).map(([k, v]) => [k, v.value])) });
