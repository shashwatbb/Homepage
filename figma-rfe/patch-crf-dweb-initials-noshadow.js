// In place (2026-11-03): no text shadow under the initials in Seller Photo=No image (instance override; the NP PDP
// Agent photo component itself is untouched). node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-initials-noshadow.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const v = (await figma.getNodeByIdAsync("7347:30457")).children.find((c) => c.name === "Photo=No image");
const t = v.findOne((n) => n.name === "Avatar").findAll((n) => n.type === "TEXT");
for (const x of t) x.effects = [];
return JSON.stringify(t.map((x) => [x.characters, x.effects.length]));
