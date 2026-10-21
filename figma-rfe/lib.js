// Bricks build helpers. Every value bound to a Bricks token, every text on a Bricks style,
// every icon a live Iconography instance, every CTA a Bricks "buttons" instance.

const COLLECTIONS = {
  color_tokens: "accf946a90feb25ede10a9452156627b5998e5b7",
  color_primitives: "f5fccecefd528ead51ee592da1b3aa721f819a91",
  spacing: "5cfae191b5576c0c1c4457fc37835db40393fdb9",
  radius: "0348dd7719c78a10b02c695ea920e3aa3326d4a6",
};
const PAGE_KIT_SET = "e268301ec758fca1eb5cd902f800dcec1d989ca2";
const BUTTON_SET = "1cdd6502c90fd59d70b838a35fb444d63aef2d88";
// Demand Component Kit (product components: reuse, never rebuild)
const KIT = {
  propertyCard: "28f78db4dccb387edd73bb7b4aee4e2d93f650dc", // Property cards / M-Web: SEO cards | Project card
  bottomNav: "77b7aee6dec5b2098e39660504f18dc44b1f1e44", // Bottom navigation: Property 1=Default
  // SRP filter chip: Sorting | Icon: Filter off/on (lead icon + label, on = brand + X) | Filters: Off (label + chevron) | Filter: On | Clear filters
  filterChip: "24c5768cfe7b8070953d5e7542fbb54ce6129f3e",
  srpPage: "6b925573cd5f4582560b360deda5cfa01fdd7c6d", // SRP m-web page: Buy | Buy: Feature pills [(1|2 selected)]
  srpHeader: "88f3a3ec6e3c59aa5615b5c81973261cf028722d", // SRP header (Base, Top): Buy | New projects | Buy: Feature pills...
  searchBar: "01acabae6a2bdf4259eaa095c735ed5b2c540c0b", // Search bar: Main search | Search + AI | Intl | Search + AI: Feature pills
  filtersScreen: "e43119bc26faf1b156b94663e95f87785e1c45da", // SRP / Filters (Android Buy/Rent); Right column has Property 4=Features
};
const KIT_SETS = Object.values(KIT);

const _varKeys = {};
for (const [col, key] of Object.entries(COLLECTIONS)) {
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(key)) _varKeys[col + ":" + v.name] = v.key;
}
const _vars = {};
async function V(col, name) {
  const id = col + ":" + name;
  if (!_varKeys[id]) throw new Error("missing token " + id);
  if (!_vars[id]) _vars[id] = await figma.variables.importVariableByKeyAsync(_varKeys[id]);
  return _vars[id];
}
// "text/primary" -> color_tokens, "warm_neutral/900" -> color_primitives when not a token
async function colorVar(name) {
  return _varKeys["color_tokens:" + name] ? V("color_tokens", name) : V("color_primitives", name);
}
// Base colour = the token's resolved value, so the paint never renders as the placeholder (black)
// before the binding resolves.
let _probe = null;
async function paint(name) {
  const v = await colorVar(name);
  if (!_probe) { _probe = figma.createRectangle(); _probe.visible = false; }
  const c = v.resolveForConsumer(_probe).value;
  const p = figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: c.r, g: c.g, b: c.b } }, "color", v);
  return p;
}
function dropProbe() { if (_probe) { _probe.remove(); _probe = null; } }
async function fill(node, name) { node.fills = [await paint(name)]; }
// sides: undefined = all, or any of "tblr"
async function stroke(node, name, sides) {
  node.strokes = [await paint(name)];
  node.strokeAlign = "INSIDE";
  if (sides) {
    node.strokeTopWeight = sides.includes("t") ? 1 : 0;
    node.strokeBottomWeight = sides.includes("b") ? 1 : 0;
    node.strokeLeftWeight = sides.includes("l") ? 1 : 0;
    node.strokeRightWeight = sides.includes("r") ? 1 : 0;
  } else node.strokeWeight = 1;
}
// pad(node, all) | pad(node, vertical, horizontal) | pad(node, t, r, b, l)
async function pad(node, t, r, b, l) {
  r = r ?? t; b = b ?? t; l = l ?? r;
  const map = { paddingTop: t, paddingRight: r, paddingBottom: b, paddingLeft: l };
  for (const [k, s] of Object.entries(map)) node.setBoundVariable(k, await V("spacing", s));
}
async function gap(node, s) { node.setBoundVariable("itemSpacing", await V("spacing", s)); }
async function wrapGap(node, s) { node.setBoundVariable("counterAxisSpacing", await V("spacing", s)); }
async function rad(node, r) {
  const v = await V("radius", r);
  for (const c of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) node.setBoundVariable(c, v);
}

function frame(name, dir, parent) {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = dir; f.fills = []; f.clipsContent = false;
  f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO";
  if (parent) parent.appendChild(f);
  return f;
}
const fillW = (n) => { n.layoutSizingHorizontal = "FILL"; return n; };
const fillH = (n) => { n.layoutSizingVertical = "FILL"; return n; };
function fixedSize(n, w, h) {
  if (w != null) n.layoutSizingHorizontal = "FIXED";
  if (h != null) n.layoutSizingVertical = "FIXED";
  n.resize(w ?? n.width, h ?? n.height);
}

const _styles = {};
async function style(name) {
  if (!_styles[name]) {
    if (!STYLE_KEYS[name]) throw new Error("missing text style " + name);
    _styles[name] = await figma.importStyleByKeyAsync(STYLE_KEYS[name]);
    await figma.loadFontAsync(_styles[name].fontName);
  }
  return _styles[name];
}
async function text(name, chars, styleName, color, parent) {
  const t = figma.createText();
  t.name = name;
  await t.setTextStyleIdAsync((await style(styleName)).id);
  t.characters = chars;
  await fill(t, color);
  if (parent) parent.appendChild(t);
  return t;
}
// Restyle a substring (e.g. the bold part of a sentence)
async function emphasise(t, part, styleName, color) {
  const i = t.characters.indexOf(part);
  if (i < 0) return;
  await t.setRangeTextStyleIdAsync(i, i + part.length, (await style(styleName)).id);
  if (color) t.setRangeFills(i, i + part.length, [await paint(color)]);
}

const _icons = {};
async function iconComponent(name, size = 16) {
  const id = name + "@" + size;
  if (!_icons[id]) {
    const k = ICON_KEYS[name] && ICON_KEYS[name][String(size)];
    if (!k) throw new Error("missing Bricks icon " + id);
    _icons[id] = await figma.importComponentByKeyAsync(k);
  }
  return _icons[id];
}
async function icon(name, size, color, parent) {
  const inst = (await iconComponent(name, size)).createInstance();
  inst.name = name;
  await tintIcon(inst, color);
  if (parent) parent.appendChild(inst);
  return inst;
}
// Duotone (Weight=Duotone, 16): filled shape gets the light tone at full opacity, strokes the dark tone.
async function duoIcon(name, light, dark, parent) {
  const inst = (await iconComponent(name, "duo16")).createInstance();
  inst.name = name;
  const l = await paint(light), d = await paint(dark);
  for (const v of inst.findAll((n) => n.type === "VECTOR")) {
    if (v.fills.length) { v.fills = [l]; v.opacity = 1; }
    if (v.strokes.length) v.strokes = [d];
  }
  if (parent) parent.appendChild(inst);
  return inst;
}
// Gradient fill whose stops are bound to color tokens (top to bottom).
async function gradient(node, from, to) {
  const stop = async (name, position) => ({ position, color: { r: 0, g: 0, b: 0, a: 1 }, boundVariables: { color: figma.variables.createVariableAlias(await colorVar(name)) } });
  node.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [await stop(from, 0), await stop(to, 1)] }];
}
async function tintIcon(inst, color) {
  const p = await paint(color);
  for (const v of inst.findAll((n) => "strokes" in n && n.type !== "INSTANCE" && n.type !== "FRAME")) {
    if (v.strokes.length) v.strokes = [p];
    if (v.fills && v.fills.length) v.fills = [p];
  }
}

async function setFromInstance(instanceId, setKey) {
  const inst = await figma.getNodeByIdAsync(instanceId);
  const mc = inst && (await inst.getMainComponentAsync());
  const set = mc && mc.parent;
  if (!set || set.key !== setKey) throw new Error("component set not found via " + instanceId);
  return set;
}
function variant(set, name) {
  const v = set.children.find((c) => c.name === name);
  if (!v) throw new Error("variant missing: " + name);
  return v;
}
async function setInstanceText(inst, layerName, chars) {
  const t = inst.findAll((n) => n.type === "TEXT" && n.name === layerName)[0];
  if (!t) return;
  await Promise.all(t.getRangeAllFontNames(0, t.characters.length).map((f) => figma.loadFontAsync(f)));
  t.characters = chars;
}

// Bricks Button: variant Primary/Secondary/Tertiary/..., size S/M/L
async function button(set, label, variantName, size, parent, leadingIcon) {
  const inst = variant(set, `Variant=${variantName}, Size=${size}, State=Default`).createInstance();
  inst.name = label + " Button";
  const props = {};
  for (const k of Object.keys(inst.componentProperties)) {
    if (k.startsWith("Label#")) props[k] = label;
    if (/^Has Trailing Icon#/.test(k)) props[k] = false;
    if (/^Has Leading Icon#/.test(k)) props[k] = Boolean(leadingIcon);
    if (leadingIcon && k.startsWith(`Leading icon (${size})#`)) props[k] = (await iconComponent(leadingIcon, 16)).id;
  }
  inst.setProperties(props);
  if (parent) parent.appendChild(inst);
  return inst;
}

// Walk a built tree (skipping inside instances) and list anything unbound.
async function audit(root) {
  const issues = [];
  let frames = 0, texts = 0, icons = 0, buttons = 0, kit = 0;
  const walk = async (n) => {
    if (n.type === "INSTANCE") {
      const mc = await n.getMainComponentAsync();
      const set = mc && mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent : null;
      if (set && set.key === BUTTON_SET) buttons++;
      else if (set && set.key === PAGE_KIT_SET) {}
      else if (set && KIT_SETS.includes(set.key)) kit++;
      else if (mc && mc.remote && Object.values(ICON_KEYS).some((k) => Object.values(k).includes(mc.key))) icons++;
      else issues.push(n.name + ": instance not from Bricks icons/buttons/Page kit");
      return;
    }
    const unboundPaint = (arr) => arr !== figma.mixed && arr.some((p) => p.visible !== false && !(p.boundVariables && p.boundVariables.color));
    if (n.type === "TEXT") {
      texts++;
      if (!n.textStyleId) issues.push(n.name + ": no text style");
      if (n.fills !== figma.mixed && unboundPaint(n.fills)) issues.push(n.name + ": raw text color");
      if (/[–—]/.test(n.characters)) issues.push(n.name + ": dash");
    }
    if (n.type === "FRAME") {
      frames++;
      if (unboundPaint(n.fills.filter((p) => p.type === "SOLID"))) issues.push(n.name + ": raw fill");
      if (unboundPaint(n.strokes)) issues.push(n.name + ": raw stroke");
      if (n.layoutMode === "NONE") issues.push(n.name + ": no auto-layout");
      const bv = n.boundVariables || {};
      for (const k of ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]) if (n[k] && !bv[k]) issues.push(n.name + ": raw " + k);
      if (n.itemSpacing && n.children.length > 1 && !bv.itemSpacing) issues.push(n.name + ": raw gap");
      if (n.topLeftRadius && !bv.topLeftRadius) issues.push(n.name + ": raw radius");
      if (/^Frame( \d+)?$/.test(n.name)) issues.push(n.id + ": default name");
    }
    if (/[–—]/.test(n.name)) issues.push(n.name + ": dash in name");
    if ("children" in n) for (const c of n.children) await walk(c);
  };
  await walk(root);
  return { frames, texts, icons, buttons, kit, issues };
}
