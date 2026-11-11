// HARD RULE (user, 2026-11-11): nothing in our kit sections may stick out of its set or section, and nothing may
// overlap. Runs automatically before every publish (publish.mjs) and can be run alone:
//   node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-hygiene.js
// Fixes: every set hugs its variants (40 inner margin), overlapping variants restack, overlapping items in a section
// move below the item they hit (80 gap), every section hugs its content (100 margin). Then re-checks; returns
// {"ok":false,...} when anything is still outside or overlapping so the caller can stop.
const SECTIONS = ["7293:22853", "7476:5242"]; // CRF/Dweb revamp (page CRF), Gallery / Desktop (page Gallery)
const box = (n) => ({ n, x: n.x, y: n.y, r: n.x + n.width, b: n.y + n.height });
const hit = (a, b) => a.x < b.r && b.x < a.r && a.y < b.b && b.y < a.b;
const fixed = [], issues = [];
for (const id of SECTIONS) {
  const sec = await figma.getNodeByIdAsync(id); if (!sec) continue;
  let pg = sec; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
  // 1. sets hug their variants; variants inside a set never overlap
  for (const set of sec.children.filter((n) => n.type === "COMPONENT_SET")) {
    const vs = [...set.children].sort((a, b) => a.y - b.y || a.x - b.x);
    for (let i = 0; i < vs.length; i++) for (let j = 0; j < i; j++) {
      if (hit(box(vs[i]), box(vs[j]))) { vs[i].y = Math.round(vs[j].y + vs[j].height + 40); fixed.push(`${set.name}: moved ${vs[i].name}`); j = -1; }
    }
    const minX = Math.min(...vs.map((v) => v.x)), minY = Math.min(...vs.map((v) => v.y));
    if (minX < 40 || minY < 40) for (const v of vs) { v.x += Math.max(0, 40 - minX); v.y += Math.max(0, 40 - minY); }
    const w = Math.round(Math.max(...vs.map((v) => v.x + v.width)) + 40), h = Math.round(Math.max(...vs.map((v) => v.y + v.height)) + 40);
    if (Math.round(set.width) !== w || Math.round(set.height) !== h) { set.resize(w, h); fixed.push(`${set.name}: hug ${w}x${h}`); }
  }
  // 2. items in the section never overlap (later/lower item moves below the one it hits)
  const items = [...sec.children].sort((a, b) => a.y - b.y || a.x - b.x);
  for (let i = 0; i < items.length; i++) for (let j = 0; j < i; j++) {
    if (hit(box(items[i]), box(items[j]))) { items[i].y = Math.round(items[j].y + items[j].height + 80); fixed.push(`${sec.name}: moved ${items[i].name}`); j = -1; }
  }
  // 3. section hugs its content, 100 margin, nothing above/left of the margin
  const minX = Math.min(...items.map((n) => n.x)), minY = Math.min(...items.map((n) => n.y));
  if (minX < 100 || minY < 100) for (const n of items) { n.x += Math.max(0, 100 - minX); n.y += Math.max(0, 100 - minY); }
  const W = Math.round(Math.max(...items.map((n) => n.x + n.width)) + 100), H = Math.round(Math.max(...items.map((n) => n.y + n.height)) + 100);
  if (Math.round(sec.width) !== W || Math.round(sec.height) !== H) { sec.resizeWithoutConstraints(W, H); fixed.push(`${sec.name}: hug ${W}x${H}`); }
  // 4. re-check
  const all = sec.children.map(box);
  for (const a of all) if (a.x < 0 || a.y < 0 || a.r > sec.width || a.b > sec.height) issues.push(`outside section: ${a.n.name}`);
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) if (hit(all[i], all[j])) issues.push(`overlap: ${all[i].n.name} x ${all[j].n.name}`);
  for (const set of sec.children.filter((n) => n.type === "COMPONENT_SET")) for (const v of set.children)
    if (v.x < 0 || v.y < 0 || v.x + v.width > set.width || v.y + v.height > set.height) issues.push(`outside set: ${set.name} / ${v.name}`);
}
return JSON.stringify({ ok: issues.length === 0, fixed, issues });
