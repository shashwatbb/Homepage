// Bricks Iconography: place a new icon wrapper in its alphabetical slot inside its category block.
// Run: node figma-rfe/run.mjs "Iconography" figma-rfe/icon-place.js   (edit NEW / AFTER first)
// The Components page is ONE packed grid (17 cols x 172px, rows 264px) of <Name>_bg_wrapper frames.
// Category blocks follow each other in reading order; each block is alphabetical. Insert after AFTER
// (the alphabetical predecessor in the same block) and shift the chain up to the first free slot by one.
// APPLY=false is a dry run. Verifies: 0 overlaps, nothing off-grid, neighbours printed.
const NEW = "Lightbulb_bg_wrapper";
const AFTER = "LampPendant_bg_wrapper";
const APPLY = true;
const page = figma.root.children.find(p => p.name === 'Components'); await page.loadAsync();
const all = page.children.filter(n => n.name.endsWith('_bg_wrapper'));
const bulb = all.find(n => n.name === NEW);
const w = all.filter(n => n !== bulb);
const xs = [...new Set(w.map(n => Math.round(n.x)))].sort((a, b) => a - b);
const ys = [...new Set(w.map(n => Math.round(n.y)))].sort((a, b) => a - b);
const slots = []; for (const y of ys) for (const x of xs) slots.push([x, y]);
const slotOf = new Map(slots.map((s, i) => [s[0] + ',' + s[1], i]));
const idx = new Map(); const clash = [];
for (const n of w) { const i = slotOf.get(Math.round(n.x) + ',' + Math.round(n.y)); if (i == null) clash.push('off-grid ' + n.name); else if ([...idx.values()].includes(i)) clash.push('dup ' + n.name); idx.set(n, i); }
const used = [...idx.values()].sort((a, b) => a - b);
const free = slots.map((_, i) => i).filter(i => !used.includes(i));
const pendant = w.find(n => n.name === AFTER);
const at = idx.get(pendant) + 1;
const movers = w.filter(n => idx.get(n) >= at).sort((a, b) => idx.get(a) - idx.get(b));
const firstFree = free.find(i => i >= at);
const report = { slots: slots.length, wrappers: w.length, clash: clash.slice(0, 5), free, insertAtSlot: at, displaced: movers[0] && movers[0].name, moversUntilFree: movers.filter(n => idx.get(n) < firstFree).length };
if (APPLY) {
  // shift only the chain between the insert point and the first free slot, one slot forward
  const chain = movers.filter(n => idx.get(n) < firstFree);
  for (const n of chain.reverse()) { const [x, y] = slots[idx.get(n) + 1]; n.x = x; n.y = y; }
  bulb.x = slots[at][0]; bulb.y = slots[at][1];
  // verify: no overlaps, everything on grid
  const hit = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
  const allW = page.children.filter(n => n.name.endsWith('_bg_wrapper'));
  let ov = 0; const byRow = {};
  for (const n of allW) (byRow[Math.round(n.y)] ||= []).push(n);
  for (const row of Object.values(byRow)) { row.sort((a, b) => a.x - b.x); for (let i = 1; i < row.length; i++) if (hit(row[i - 1], row[i])) ov++; }
  const offGrid = allW.filter(n => !slotOf.has(Math.round(n.x) + ',' + Math.round(n.y))).map(n => n.name);
  const nb = [...allW].sort((a, b) => Math.round(a.y) - Math.round(b.y) || a.x - b.x).map(n => n.name.replace('_bg_wrapper', ''));
  const k = nb.indexOf(NEW.replace('_bg_wrapper', ''));
  report.applied = { overlaps: ov, offGrid, neighbours: nb.slice(k - 2, k + 3).join(' > '), bulbAt: [bulb.x, bulb.y] };
}
return JSON.stringify(report);
