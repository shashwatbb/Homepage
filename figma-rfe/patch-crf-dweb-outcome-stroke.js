// In place (2026-11-03): Outcome (success) card stroke 0.76 -> 1, same as the sellers card and every other card in the
// modal (only the modal shell keeps the NP 0.76 hairline). node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-outcome-stroke.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const post = await figma.getNodeByIdAsync("7293:25390");
let n = 0;
for (const o of post.findAll((x) => x.name === "Outcome")) { o.strokeWeight = 1; n++; }
return "outcome strokes -> 1: " + n;
