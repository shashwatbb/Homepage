// In-place patch: success badge back to the green SealCheck on a white round badge, smaller (32 badge, 20 icon);
// strip wash lighter (green/50 -> surface/white).
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-success-icon.js

const post = await figma.getNodeByIdAsync("7293:25390");
const LTR = [[1, 0, 0], [0, 1, 0]];
const stop = async (name, position) => ({ position, color: { r: 0, g: 0, b: 0, a: 1 }, boundVariables: { color: figma.variables.createVariableAlias(await colorVar(name)) } });
let n = 0;
for (const v of post.children) {
  const strip = v.findOne((x) => x.name === "Success" && x.parent.name === "Outcome"); if (!strip) continue;
  strip.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: LTR, gradientStops: [await stop("green/50", 0), await stop("surface/white", 1)] }];
  const badge = strip.findChild((x) => x.name === "Tick");
  for (const c of [...badge.children]) c.remove();
  badge.resize(32, 32); await fill(badge, "surface/white");
  badge.effects = []; // no shadow behind the tick badge
  await icon("SealCheck", "fill20", "semantic_icons/success", badge);
  n++;
}
dropProbe();
return "patched " + n;
