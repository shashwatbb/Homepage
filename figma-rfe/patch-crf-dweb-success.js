// In-place patch: Post CRF success state = m-web pattern (success strip + property in one card), Bricks tokens.
// No green stroke: neutral hairline card, soft green wash (green/100 -> green/50), round tick badge with a light-to-dark
// green gradient (green/400 -> green/700), white check, soft green glow.
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-success.js

const POST = "7293:25390";
const post = await figma.getNodeByIdAsync(POST);
async function grad(node, stops, t) {
  node.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: t, gradientStops: await Promise.all(stops.map(async ([name, position]) => ({ position, color: { r: 0, g: 0, b: 0, a: 1 }, boundVariables: { color: figma.variables.createVariableAlias(await colorVar(name)) } }))) }];
}
const LTR = [[1, 0, 0], [0, 1, 0]], TL_BR = [[0.7, 0.7, -0.2], [-0.7, 0.7, 0.5]];
const out = [];
for (const v of post.children) {
  const outcome = v.findOne((n) => n.name === "Outcome"); if (!outcome) continue;
  const headline = outcome.findOne((n) => n.name === "Headline").characters;
  const next = outcome.findOne((n) => n.name === "Next").characters;
  const pName = outcome.findOne((n) => n.type === "TEXT" && n.parent.name === "Property details" && n.name === "Name").characters;
  const metas = outcome.findOne((n) => n.name === "Meta").findAll((n) => n.type === "TEXT").map((t) => [t.name, t.characters]);
  const photoFill = JSON.parse(JSON.stringify(outcome.findOne((n) => n.name === "Photo").fills));
  for (const c of [...outcome.children]) c.remove();

  // one card, neutral hairline, clip
  outcome.itemSpacing = 0; outcome.setBoundVariable("itemSpacing", null); outcome.itemSpacing = 0;
  await fill(outcome, "surface/white"); await stroke(outcome, "border/subtle"); outcome.strokeWeight = 0.76;
  await rad(outcome, "l"); outcome.clipsContent = true;

  // success strip
  const ok = fillW(frame("Success", "HORIZONTAL", outcome)); ok.counterAxisAlignItems = "CENTER"; await pad(ok, "m"); await gap(ok, "s");
  await grad(ok, [["green/100", 0], ["green/50", 1]], LTR);
  const badge = frame("Tick", "HORIZONTAL", ok); fixedSize(badge, 40, 40); badge.primaryAxisAlignItems = "CENTER"; badge.counterAxisAlignItems = "CENTER";
  await rad(badge, "full"); await grad(badge, [["green/400", 0], ["green/700", 1]], TL_BR);
  badge.effects = [{ type: "DROP_SHADOW", color: { r: 0.18, g: 0.5, b: 0.29, a: 0.28 }, offset: { x: 0, y: 4 }, radius: 10, spread: 0, visible: true, blendMode: "NORMAL", showShadowBehindNode: false }];
  await icon("Check", 20, "text/inverse", badge);
  const copy = frame("Copy", "VERTICAL", ok); copy.layoutSizingHorizontal = "FILL"; await gap(copy, "3xs");
  const h = await text("Headline", headline, "Web/Heading/h5_semibold", "semantic_text/success", copy); h.layoutSizingHorizontal = "FILL"; h.textAutoResize = "HEIGHT";
  const s = await text("Next", next, "Web/Body/small_regular", "text/secondary", copy); s.layoutSizingHorizontal = "FILL"; s.textAutoResize = "HEIGHT";

  // property row, same card
  const div = frame("Divider", "HORIZONTAL", outcome); fixedSize(div, null, 1); div.layoutSizingHorizontal = "FILL"; await fill(div, "border/subtle"); await rad(div, "full");
  const prop = fillW(frame("Property", "HORIZONTAL", outcome)); prop.counterAxisAlignItems = "CENTER"; await pad(prop, "s", "m"); await gap(prop, "s");
  const ph = frame("Photo", "HORIZONTAL", prop); fixedSize(ph, 40, 40); ph.fills = photoFill; ph.clipsContent = true; await rad(ph, "s");
  const pc = frame("Property details", "VERTICAL", prop); pc.layoutSizingHorizontal = "FILL"; await gap(pc, "3xs");
  const nm = await text("Name", pName, "Web/Body/small_medium", "text/primary", pc); nm.layoutSizingHorizontal = "FILL"; nm.textAutoResize = "HEIGHT"; nm.textTruncation = "ENDING"; nm.maxLines = 1;
  const meta = frame("Meta", "HORIZONTAL", pc); meta.counterAxisAlignItems = "CENTER"; await gap(meta, "xs");
  for (const [i, [layer, chars]] of metas.entries()) {
    if (i) { const l = figma.createLine(); l.name = "Separator"; meta.appendChild(l); l.resize(16, 0); l.rotation = -90; l.strokes = [await paint("border/default")]; l.strokeWeight = 1; l.strokeCap = "ROUND"; }
    await text(layer, chars, "Web/Body/small_regular", "text/muted", meta);
  }
  out.push(v.name + ": " + headline);
}
dropProbe();
return out.join("\n");
