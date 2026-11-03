// RFE header state rule (2026-11-03): pages under "Design Draft" use Page kit Type=In review; only once the work moves
// to the RFE / tech hand-over section does it switch to Type=Ready. The In review variant has its own layers
// (#Title + reviewer names), so swap and reset overrides; never copy Ready texts across.
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/patch-crf-dweb-rfe-inreview.js   (pass TYPE=Ready later)
const TYPE = "In review";
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
const sec = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const head = sec.children.find((n) => n.name === "Page kit" && Math.round(n.x) === 101 && Math.round(n.y) === 100);
const w = head.width;
head.setProperties({ Type: TYPE }); head.resetOverrides(); head.resize(w, head.height); head.x = 101; head.y = 100;
return JSON.stringify({ type: head.componentProperties.Type.value, size: [head.width, head.height] });
