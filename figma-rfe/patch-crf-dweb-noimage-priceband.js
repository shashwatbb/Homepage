// In place, CRF desktop kit (2026-11-03):
// 1. Seller becomes a set: Photo=Yes (existing component, key kept) + Photo=No image, whose avatar is the NP PDP
//    kit "Agent photo / Property 1=No image" instance (initials on warm grey gradient, r12). Idempotent.
// 2. Price band: soft lavender (lavender_mist/2 -> surface/white, left to right) absolute behind every price on the
//    Property card set and the success card Meta row (m-web Post CRF pattern, 26 high, text width + 40).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-noimage-priceband.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = [];

// 1. Seller no image
let seller = await figma.getNodeByIdAsync("7293:22982");
let set = seller.parent.type === "COMPONENT_SET" ? seller.parent : null;
if (!set) {
  const sec = seller.parent, x = seller.x, y = seller.y;
  const noimg = seller.clone();
  const avatar = noimg.findOne((n) => n.name === "Avatar");
  const agent = (await figma.getNodeByIdAsync("4887:16969")).createInstance();
  noimg.insertChild(avatar.parent.children.indexOf(avatar), agent);
  agent.name = "Avatar"; avatar.remove();
  seller.name = "Photo=Yes"; noimg.name = "Photo=No image";
  set = figma.combineAsVariants([seller, noimg], sec);
  set.name = "Dweb / CRF revamp / Seller";
  const card = await figma.getNodeByIdAsync("7293:23027");
  set.fills = JSON.parse(JSON.stringify(card.fills)); set.strokes = JSON.parse(JSON.stringify(card.strokes));
  set.dashPattern = card.dashPattern; set.strokeWeight = card.strokeWeight; set.cornerRadius = card.cornerRadius;
  seller.x = 40; seller.y = 40; noimg.x = 40; noimg.y = 40 + seller.height + 40;
  set.resize(seller.width + 80, noimg.y + noimg.height + 40);
  set.x = x - 40; set.y = y - 40;
  out.push("seller set " + set.id + " key kept " + seller.key);
} else out.push("seller set exists " + set.id);

// 2. Price band
async function band(price) {
  const box = price.parent;
  if (box.children.some((n) => n.name === "Price band")) return 0;
  const r = figma.createRectangle(); r.name = "Price band";
  box.insertChild(0, r); r.layoutPositioning = "ABSOLUTE";
  const h = 26;
  r.resize(Math.ceil(price.width) + 40, h);
  r.x = price.x; r.y = price.y + (price.height - h) / 2;
  const stop = async (name, position) => {
    const v = await colorVar(name); const c = v.resolveForConsumer(r).value;
    return { position, color: { r: c.r, g: c.g, b: c.b, a: 1 }, boundVariables: { color: figma.variables.createVariableAlias(v) } };
  };
  r.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [await stop("lavender_mist/2", 0), await stop("surface/white", 1)] }];
  for (const k of ["topLeftRadius", "bottomLeftRadius"]) r.setBoundVariable(k, await V("radius", "xs"));
  r.constraints = { horizontal: "MIN", vertical: "MIN" };
  box.clipsContent = false;
  return 1;
}
let bands = 0;
const cardSet = await figma.getNodeByIdAsync("7293:23027");
for (const t of cardSet.findAll((n) => n.type === "TEXT" && n.name === "Price")) bands += await band(t);
const post = await figma.getNodeByIdAsync("7293:25390");
for (const t of post.findAll((n) => n.type === "TEXT" && n.parent.name === "Meta" && /₹/.test(n.characters))) bands += await band(t);
out.push("price bands " + bands);
dropProbe();
return out.join("\n");
