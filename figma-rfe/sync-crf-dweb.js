// Pull the latest published CRF desktop kit sets into the CRF file (no "Accept updates" dialog, no polling):
// importing a library set by key fetches its newest published version, and every instance on the page follows.
// run right after publish.mjs: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/sync-crf-dweb.js
// nested sets/components first (each is its own published asset), then the screens' sets
const SETS = { viewMore: "7be0927439b8f6a6fa26ee9d0fe48cdc3d10691c", card: "fabeeed79d4bc3d289f14827458a7a250f2c66c3",
  modal: "742db484be9bc3d115252701d887964a106472c4", post: "b1a1e60d4ef4f00542c458b252556e50dbce374a" };
const COMPS = { safety: "2437eb2e8319e4bd6eceb2370618fdc48355c619", seller: "1430343fd5f5d761856963d03334c3b80fa5e19c", whatsapp: "f72c001b44772bd67d5006ee97b708c6a28b5b63" };
const out = [];
for (const key of Object.values(COMPS)) await figma.importComponentByKeyAsync(key);
for (const [k, key] of Object.entries(SETS)) await figma.importComponentSetByKeyAsync(key);
out.push("imported " + (Object.keys(SETS).length + Object.keys(COMPS).length));
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
const section = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const w = []; for (const b of section.findAll((n) => n.name === "Dweb / CRF revamp / View more")) for (const v of b.findAll((x) => x.type === "VECTOR" && x.strokes.length)) w.push(v.strokeWeight);
out.push("view more caret weights: " + [...new Set(w)].join(","));
out.push("notes: " + section.findAll((n) => "annotations" in n && n.annotations.length).reduce((a, n) => a + n.annotations.length, 0));
return out.join(" | ");
