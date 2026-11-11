// RFE "Post CRF full length" row: bare Post CRF instances follow their main component height (content grew with
// Smart deals / What to expect, 2026-11-11); anything below the row moves down by the same delta; section re-hugs.
// Lives on "↳ Global" / section "CRF:" since 2026-11-11 (section kept at 0,0).
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/fix-crf-dweb-rfe-fulllength-heights.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ Global"); await page.loadAsync(); await figma.setCurrentPageAsync(page);
const s = page.children.find((n) => n.type === "SECTION" && n.name === "CRF:"); // desktop rows = D-Web block of the shared CRF: section
const full = s.children.filter((n) => n.type === "INSTANCE" && /^Full length/.test(n.name));
const rowY = Math.min(...full.map((n) => n.y));
const oldBottom = Math.max(...s.children.filter((n) => Math.round(n.y) === Math.round(rowY)).map((n) => n.y + n.height));
for (const n of full) { const m = await n.getMainComponentAsync(); if (Math.round(n.height) !== Math.round(m.height)) n.resize(n.width, m.height); }
const newBottom = Math.max(...s.children.filter((n) => Math.round(n.y) === Math.round(rowY)).map((n) => n.y + n.height));
const d = Math.round(newBottom - oldBottom);
for (const n of s.children) if (n.y > oldBottom - 1) n.y += d;
const bottom = Math.max(...s.children.map((n) => n.y + n.height));
s.resizeWithoutConstraints(s.width, Math.round(bottom + 100));
return `delta ${d}, section ${Math.round(s.width)}x${Math.round(s.height)}, full: ${full.map((n) => n.name.replace("Full length: ", "") + " " + Math.round(n.height)).join(", ")}`;
