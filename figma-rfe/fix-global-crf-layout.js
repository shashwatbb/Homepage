// "↳ Global" / section "CRF:" layout (user, 2026-11-11: "weird empty space, make it clean and balanced").
// Blocks = a strip (Page kit / prototype frame, >3000 wide) + everything below it until the next strip; the
// "Click here" prototype link text rides with the prototype strip above it. Blocks restack with a 200 gap (header
// keeps its 88), nothing moves inside a block. Every strip: x 100, width = widest row's right edge - 100.
// Section hugs: right edge + 101, bottom + 100.
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/fix-global-crf-layout.js
const gp = figma.root.children.find((x) => x.name.trim() === "↳ Global"); await gp.loadAsync(); await figma.setCurrentPageAsync(gp);
const s = gp.children.find((n) => n.type === "SECTION" && n.name === "CRF:"); const r = Math.round;
s.x = 0; s.y = 0; // HARD RULE: top-level RFE frame/section sits at 0,0
const isStrip = (n) => n.width > 3000 && n.type !== "TEXT";
const strips = s.children.filter(isStrip).sort((a, b) => a.y - b.y);
const blocks = strips.map((st, i) => { const nextY = i + 1 < strips.length ? strips[i + 1].y : Infinity;
  return { st, items: s.children.filter((n) => n !== st && !isStrip(n) && n.y >= st.y && n.y < nextY) }; });
const LEFT = 100;
const right = Math.max(...s.children.filter((n) => !isStrip(n) && n.type !== "TEXT").map((n) => n.x + n.width));
let cursor = null; const out = [];
for (const [i, b] of blocks.entries()) {
  const top = b.st.y, bottom = Math.max(b.st.y + b.st.height, ...b.items.map((n) => n.y + n.height));
  const want = i === 0 ? top : cursor + (i === 1 ? 88 : 200);
  const d = r(want - top); for (const n of [b.st, ...b.items]) n.y += d;
  b.st.x = LEFT; b.st.resize(r(right - LEFT), b.st.height);
  cursor = bottom + d;
  out.push(`${r(b.st.y)} ${b.st.name === "Page kit" ? "" : b.st.name + " "}(${b.items.length}) moved ${d}`);
}
s.resizeWithoutConstraints(r(right + 101), r(cursor + 100));
out.push(`section ${r(s.width)}x${r(s.height)}, strips ${r(right - LEFT)} wide`);
return out.join("\n");
