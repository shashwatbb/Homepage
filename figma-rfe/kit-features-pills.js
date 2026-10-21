// Demand Component Kit: Features filter pills restyled to the filter-screen pill pattern
// (SRP / Filters > Budget "Popular selections"): white, border/subtle, radius s, 12/16 text/primary, no shadow.
// Selected = surface/subtle + border/selected. No close icon: tapping a selected pill again unselects it (the X is SRP-page only). Then SRP / Filters: Features shows Balcony selected.
// Run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/isp-blocks.js figma-rfe/kit-features-pills.js

const FEATURES_VARIANT = "6912:49510"; // Right column, Property 4=Features
const FILTERS_FEATURES = "6916:54579"; // SRP / Filters, Property 3=Filters: Features
const BUDGET_REF = "2799:6978"; // SRP / Filters Buy: holds the XCircle used by selected pills

const budget = await figma.getNodeByIdAsync(BUDGET_REF);
const xRef = budget.findOne((n) => n.type === "INSTANCE" && n.name === "XCircle");
const xCircle = await xRef.getMainComponentAsync();

async function pill(parent, f) {
  const p = frame(f.label, "HORIZONTAL", parent);
  p.counterAxisAlignItems = "CENTER";
  await pad(p, "xs"); await gap(p, "xs"); await rad(p, "s");
  await fill(p, "surface/white"); await stroke(p, "border/subtle");
  p.strokesIncludedInLayout = false; // 32h like the kit pills
  await duoIcon(f.icon, f.duo[0], f.duo[1], p);
  const t = await text("Label", f.label, "Mobile/Body/small_regular", "text/primary", p);
  t.maxLines = 1; t.textTruncation = "ENDING";
  return p;
}

const v = await figma.getNodeByIdAsync(FEATURES_VARIANT);
const options = v.children.find((n) => n.type === "FRAME" && n.name === "Options");
for (const c of [...options.children]) c.remove();
await gap(options, "l");
for (const g of GROUPS) {
  const grp = frame(g, "VERTICAL", options);
  fillW(grp); await gap(grp, "m");
  await text("Group Label", g, "Mobile/Label/default_regular", "text/secondary", grp);
  const wrap = frame("Pills", "HORIZONTAL", grp);
  fillW(wrap); wrap.layoutWrap = "WRAP";
  await gap(wrap, "s"); await wrapGap(wrap, "s");
  for (const f of FEATURES.filter((x) => x.group === g)) await pill(wrap, f);
}

// Selected state on the Filters: Features page variant (instance overrides only).
const fv = await figma.getNodeByIdAsync(FILTERS_FEATURES);
const right = fv.findOne((n) => n.type === "INSTANCE" && n.name === "SRP / Android / Buy / Right column");
const bal = right.findOne((n) => n.type === "FRAME" && n.name === "Balcony");
await fill(bal, "surface/subtle"); await stroke(bal, "border/selected");

// No overlaps in the Right column set after the height change.
const set = v.parent;
const hit = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
const ov = set.children.filter((c) => c !== v && hit(c, v)).map((c) => c.name);
const fx = v.findAll((n) => "effects" in n && n.effects.length).length;
dropProbe();
return `Features variant ${Math.round(v.width)}x${Math.round(v.height)} pills=${v.findAll((n) => n.parent && n.parent.name === "Pills").length} shadows=${fx} overlaps=${ov.length ? ov.join(",") : "none"} | Balcony selected on ${fv.name}`;
