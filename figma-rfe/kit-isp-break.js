// Demand Component Kit: "Feed break" options for the few results state (where feature matches end
// and other properties start). One set, one variant per option, stacked one under the other.
// Locked 2026-11-05: Dashed line (pill, gradient and other options dropped after review).
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-isp-break.js
// Rerunnable: the set (unpublished options) is rebuilt in place.

const SECTION = "2068:3909"; // SRP / M-Web / Buy
const SET_NAME = "Feed break";
const COPY = "Keep exploring other properties";

const sec = await figma.getNodeByIdAsync(SECTION);
const old = sec.children.find((n) => n.type === "COMPONENT_SET" && n.name === SET_NAME);
const slot = old ? { x: old.x, y: old.y } : null;
if (old) old.remove();

// Hairline separator: 1px, fully rounded ends (unused by the locked option, kept for reuse).
async function hairline(parent) {
  const l = frame("Line", "HORIZONTAL", parent);
  fillW(l); fixedSize(l, null, 1); l.layoutSizingHorizontal = "FILL";
  await fill(l, "border/default"); await rad(l, "full");
  return l;
}
async function shell(name) {
  const v = figma.createComponent();
  v.name = "Option=" + name;
  v.layoutMode = "HORIZONTAL"; v.primaryAxisSizingMode = "FIXED"; v.counterAxisSizingMode = "AUTO";
  v.counterAxisAlignItems = "CENTER";
  v.resize(360, 10);
  v.counterAxisSizingMode = "AUTO"; // resize() pins the height; hug again
  await fill(v, "surface/subtle"); // sits on the feed
  await pad(v, "m", "m", "none", "m"); // 16 above; 16 below comes from the next card's own top padding
  return v;
}
const variants = [];

// Dashed line: label on the feed bg, rounded border/default dashes run straight after it, vertically centred.
// No pill, no gradient, no shadows.
{
  const v = await shell("Dashed line");
  v.layoutMode = "VERTICAL"; v.counterAxisSizingMode = "FIXED"; v.primaryAxisSizingMode = "AUTO";
  await pad(v, "m", "none", "none", "none");
  const band = frame("Band", "HORIZONTAL", v);
  fillW(band); band.counterAxisAlignItems = "CENTER";
  await pad(band, "s", "m", "s", "m"); await gap(band, "s"); // 24 above (16 + 8), 24 below (8 + next card's 16)
  const t = await text("Label", COPY, "Mobile/Body/small_medium", "text/secondary", band);
  t.maxLines = 1; t.textTruncation = "ENDING";
  // One LINE, dashed: 1.5 stroke, round caps, dash 6.5 gap 5.5 = 8px rounded dashes 4 apart, border/default
  // (house stroke values, Bricks has no stroke tokens). Sits in a text-height slot and is nudged so its
  // rendered stroke centre equals the text line centre (Figma draws a line's stroke offset from its y).
  const slot = frame("Line slot", "HORIZONTAL", band);
  slot.layoutMode = "NONE"; slot.layoutSizingHorizontal = "FILL"; fixedSize(slot, null, t.height);
  const l = figma.createLine(); l.name = "Dashed line";
  slot.appendChild(l);
  l.strokes = [await paint("border/default")];
  l.strokeWeight = 1.5; l.strokeCap = "ROUND"; l.strokeAlign = "CENTER"; l.dashPattern = [6.5, 5.5];
  // Figma trims both end dashes to ~half and stretches gaps to fit the length: run the line 8.125 past each
  // slot edge (partial dash + gap) and clip the slot, so every visible dash is full, first and last included.
  const OVER = 8.125;
  slot.clipsContent = true;
  l.x = -OVER; l.resize(slot.width + 2 * OVER, 0); l.constraints = { horizontal: "STRETCH", vertical: "CENTER" };
  l.y = slot.height / 2;
  const r = l.absoluteRenderBounds;
  l.y += slot.height / 2 - (r.y + r.height / 2 - slot.absoluteBoundingBox.y);
  variants.push(v);
}

for (const v of variants) sec.appendChild(v);
const set = figma.combineAsVariants(variants, sec);
set.name = SET_NAME;
let y = 20;
for (const v of set.children) { v.x = 20; v.y = y; y += v.height + 40; }
set.resizeWithoutConstraints(400, y - 20);
// Below the existing content of the section, left aligned at the 100 margin, 80 gap.
const others = sec.children.filter((n) => n !== set);
set.x = slot ? slot.x : 100;
set.y = slot ? slot.y : Math.max(...others.map((n) => n.y + n.height)) + 80;

// Section hugs (100 margin), then the Desktop section below keeps its 200 gap in the column.
const k = sec.children;
sec.resizeWithoutConstraints(Math.max(...k.map((c) => c.x + c.width)) + 100, Math.max(...k.map((c) => c.y + c.height)) + 100);
const root = sec.parent;
const desk = root.children.find((n) => n.name === "SRP / Desktop / Buy");
if (desk) desk.y = sec.y + sec.height + 200;
const rk = root.children;
root.resizeWithoutConstraints(root.width, Math.max(root.height, Math.max(...rk.map((c) => c.y + c.height)) + 100));

const bb = (n) => [n.x, n.y, n.x + n.width, n.y + n.height];
const hit = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
const ov = [];
for (const p of [sec, root]) { const c = p.children; for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) if (hit(bb(c[i]), bb(c[j]))) ov.push(c[i].name + " x " + c[j].name); }
const stick = sec.children.filter((c) => c.x + c.width > sec.width || c.y + c.height > sec.height).map((c) => c.name);
const fits = set.findAll((n) => n.type === "TEXT").map((t) => { const c = t.clone(); c.textAutoResize = "WIDTH_AND_HEIGHT"; c.maxLines = null; const r = t.name + " " + Math.round(c.width) + "/" + Math.round(t.width); c.remove(); return r; });
const a = await audit(set);
dropProbe();
return JSON.stringify({ set: set.id, size: [set.width, set.height], variants: set.children.map((v) => v.name + " " + Math.round(v.height)), section: [sec.width, sec.height], overlaps: ov, stick, fits, issues: a.issues });
