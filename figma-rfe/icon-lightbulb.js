// Bricks Iconography: add "Lightbulb" (Phosphor) in the same format as every other icon set.
// Run: node figma-rfe/run.mjs "Iconography" figma-rfe/icon-lightbulb.js
// Format copied from "Lamp": white <Name>_bg_wrapper (r4) > COMPONENT_SET, Format=Stroke x Weight (Regular|Fill|Duotone) x Size (12..24).
// Each variant: invisible full-size bounds vector + glyph vectors, stroke = size/16, round caps/joins, #222, SCALE constraints.

const NAME = "Lightbulb";
const DESC = "idea, suggestion, light, tip";
const SIZES = [12, 14, 16, 18, 20, 24];
const INK = { r: 34 / 255, g: 34 / 255, b: 34 / 255 };
// Phosphor Lightbulb, 256 grid
const STROKES = [
  "M88 232 L168 232",
  "M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6A24.11,24.11,0,0,0,78.7,167Z",
  "M136,56c20,3.37,36.61,20,40,40",
];
const BULB = STROKES[1];
const FILL = "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z";

const page = figma.root.children.find((p) => p.name === "Components");
await page.loadAsync();
if (page.findOne((n) => n.type === "COMPONENT_SET" && n.name === NAME)) return NAME + " already exists";

function svgNode(size, body) {
  return figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256" fill="none">${body}</svg>`);
}
const strokeBody = STROKES.map((d) => `<path d="${d}" stroke="#222222" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`).join("");

function variant(size, weight) {
  const c = figma.createComponent();
  c.name = `Format=Stroke, Weight=${weight}, Size=${size}`;
  c.resize(size, size);
  c.fills = [];
  // invisible bounds vector, like the existing icons
  const r = figma.createRectangle(); r.resize(size, size); r.fills = []; r.strokes = [];
  c.appendChild(r);
  const bounds = figma.flatten([r], c); bounds.name = "Vector"; bounds.fills = []; bounds.strokes = [];
  let body = "";
  if (weight === "Regular") body = strokeBody;
  if (weight === "Fill") body = `<path d="${FILL}" fill="#222222" fill-rule="evenodd"/>`;
  if (weight === "Duotone") body = `<path d="${BULB}" fill="#222222" fill-opacity="0.2"/>` + strokeBody;
  const g = svgNode(size, body);
  for (const v of [...g.children]) {
    c.appendChild(v);
    v.name = "Vector";
    if (v.strokes.length) { v.strokes = [{ type: "SOLID", color: INK }]; v.strokeCap = "ROUND"; v.strokeJoin = "ROUND"; }
    if (v.fills.length) {
      const op = v.fills[0].opacity ?? 1;
      v.fills = [{ type: "SOLID", color: INK }];
      if (op < 1) { v.opacity = 0.2; }
    }
  }
  g.remove();
  for (const v of c.children) v.constraints = { horizontal: "SCALE", vertical: "SCALE" };
  return c;
}

// Same grid as Lamp: columns Regular / Fill / Duotone at x = 0, size+gap, 2*(size+gap); rows per size.
const comps = [];
let y = 0;
for (const s of SIZES) {
  const step = s + 20; // Lamp: Fill at x = size + 20, Duotone at 2 * (size + 20)
  ["Regular", "Fill", "Duotone"].forEach((w, i) => { const v = variant(s, w); v.x = i * step; v.y = y; comps.push(v); });
  y += s + 20; // Lamp rows: 0, 32, 66, 102, 140, 180
}
const set = figma.combineAsVariants(comps, page);
set.name = NAME;
set.description = DESC;

// Wrapper, like <Name>_bg_wrapper
const lamp = page.findOne((n) => n.name === "Lamp_bg_wrapper");
const pendant = page.findOne((n) => n.name === "LampPendant_bg_wrapper");
const wrap = figma.createFrame();
wrap.name = NAME + "_bg_wrapper";
wrap.fills = JSON.parse(JSON.stringify(lamp.fills));
wrap.cornerRadius = lamp.cornerRadius;
wrap.clipsContent = lamp.clipsContent;
page.appendChild(wrap);
wrap.appendChild(set);
set.x = 18; set.y = 18;
wrap.resize(set.width + 36, set.height + 36);

// Next free slot on the grid after LampPendant (same row step as Lamp -> LampPendant).
const hit = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
const stepX = pendant.x - lamp.x || 200;
let x = pendant.x + stepX, yy = pendant.y;
const others = page.children.filter((n) => n !== wrap);
for (let k = 0; k < 400; k++) {
  const box = { x, y: yy, width: wrap.width, height: wrap.height };
  if (!others.some((o) => hit(box, o))) break;
  x += stepX;
}
wrap.x = x; wrap.y = yy;

const v24 = set.children.find((c) => c.name === "Format=Stroke, Weight=Regular, Size=24");
return JSON.stringify({ set: set.id, key: set.key, wrapper: wrap.id, at: [wrap.x, wrap.y], size: [wrap.width, wrap.height], variants: set.children.length, regular24key: v24.key, regular24vectors: v24.children.map((v) => v.type + ":" + (v.strokes.length ? "stroke" + v.strokeWeight : v.fills.length ? "fill" : "bounds")) });
