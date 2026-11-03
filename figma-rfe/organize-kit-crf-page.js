// Organize the Demand Component Kit CRF page (2026-11-03): one top-aligned row of sections, 400 apart;
// loose sets go into a "CRF/Shared" section; the revamp section is a clean grid (parts row, Modal, Post CRF),
// 100 padding, 80 gaps, hugging its content. Only whole sets move; nothing inside them changes (keys stay).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/organize-kit-crf-page.js
const page = await figma.getNodeByIdAsync("2016:179"); await figma.setCurrentPageAsync(page);
const PAD = 100, GAP = 80, SEC_GAP = 400, X0 = -757;
const byId = async (id) => figma.getNodeByIdAsync(id);
const hug = (sec) => { const k = sec.children; const r = Math.max(...k.map((n) => n.x + n.width)), b = Math.max(...k.map((n) => n.y + n.height)); sec.resizeWithoutConstraints(r + PAD, b + PAD); };

// 1. revamp section grid
const rev = await byId("7293:22853");
const parts = ["7347:30457", "7293:23027", "7302:60729", "7302:60742", "7297:44740"]; // Seller, Property card, Safety note, View more, WhatsApp
let x = PAD;
for (const id of parts) { const n = await byId(id); n.x = x; n.y = PAD; x += n.width + GAP; }
const partsBottom = Math.max(...(await Promise.all(parts.map(byId))).map((n) => n.y + n.height));
const modal = await byId("7293:23739"), post = await byId("7293:25390");
modal.x = PAD; modal.y = partsBottom + GAP * 1.5;
post.x = PAD; post.y = modal.y + modal.height + GAP * 1.5;
hug(rev);

// 2. loose sets -> CRF/Shared section
let shared = page.children.find((n) => n.type === "SECTION" && n.name === "CRF/Shared");
if (!shared) { shared = figma.createSection(); shared.name = "CRF/Shared"; page.appendChild(shared); }
const loose = page.children.filter((n) => n.type !== "SECTION");
let sx = PAD;
for (const n of loose.sort((a, b) => a.x - b.x)) { shared.appendChild(n); n.x = sx; n.y = PAD; sx += n.width + GAP; }
if (shared.children.length) hug(shared);
shared.fills = JSON.parse(JSON.stringify(rev.fills));

// 2b. other sections: masonry, 80 gaps, top-aligned at 100; no random gaps
function pack(sec) {
  // masonry: flow order (left to right, top down), each set into the shortest column; fewest columns whose
  // tallest column stays within the tallest set + one row, so bottoms line up and no holes are left
  const all = [...sec.children].sort((a, b) => a.x - b.x || a.y - b.y);
  const wide = all.filter((n) => n.width > 600), sets = all.filter((n) => n.width <= 600); // wide sets would widen a whole column
  const tallest = Math.max(...sets.map((n) => n.height));
  let best = [];
  for (let k = 1; k <= sets.length; k++) {
    const cols = Array.from({ length: k }, () => ({ h: 0, items: [] }));
    for (const n of sets) { const c = cols.reduce((m, c) => (c.h < m.h ? c : m)); c.items.push(n); c.h += n.height + GAP; }
    best = cols;
    if (Math.max(...cols.map((c) => c.h)) <= tallest + 600) break;
  }
  let cx = PAD;
  for (const c of best) {
    let cy = PAD;
    for (const n of c.items) { n.x = cx; n.y = cy; cy += n.height + GAP; }
    cx += Math.max(...c.items.map((n) => n.width)) + GAP;
  }
  let wx = PAD; const wy = sets.length ? Math.max(...sets.map((n) => n.y + n.height)) + GAP : PAD;
  for (const n of wide) { n.x = wx; n.y = wy; wx += n.width + GAP; }
  hug(sec);
  return best.length;
}
const packed = {};
for (const nm of ["CRF/Mobile", "CRF/Dweb", "CRF/Shared"]) { const sec = page.children.find((n) => n.type === "SECTION" && n.name === nm); if (sec) packed[nm] = pack(sec); }

// 3. one horizontal row, top aligned, even gaps (user: "keep frames horizontally")
const order = ["CRF/Mobile", "CRF/Dweb", "CRF/Dweb revamp", "CRF/Shared"].map((nm) => page.children.find((n) => n.type === "SECTION" && n.name === nm)).filter(Boolean);
const Y0 = -77;
let sxx = X0;
for (const s of order) { s.x = sxx; s.y = Y0; sxx += s.width + SEC_GAP; }

// 4. checks: overlaps between sections and between items inside the two sections we laid out
const ov = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
const issues = [];
for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) if (ov(order[i], order[j])) issues.push("section overlap " + order[i].name + "/" + order[j].name);
for (const s of order) { const k = s.children; for (let i = 0; i < k.length; i++) { if (k[i].x < 0 || k[i].y < 0 || k[i].x + k[i].width > s.width || k[i].y + k[i].height > s.height) issues.push("sticks out " + k[i].name); for (let j = i + 1; j < k.length; j++) if (ov(k[i], k[j])) issues.push("overlap " + k[i].name + "/" + k[j].name); } }
return JSON.stringify({ packed, sections: order.map((s) => [s.name, Math.round(s.x), Math.round(s.y), Math.round(s.width), Math.round(s.height)]), shared: shared.children.map((n) => n.name), loose: page.children.filter((n) => n.type !== "SECTION").length, issues });
