// Seen in photos pills: shared builders for the kit components (kit-isp-components.js).
// Needs in scope: filterChips (kit "Filters" set), aiLogoSource (AI logo layer), propertyCards (kit set).

// Prototype: src/data/srpFeaturePills.js + srpFeatureIcons.js (light/dark duotone pairs).
const FEATURES = [
  ["natural_light", "Natural light", "Sun", ["soft_butter/200", "yellow/600"], 312, "Light and air", "86 homes with natural light"],
  ["modular_kitchen", "Modular kitchen", "CookingPot", ["red/200", "red/500"], 268, "Kitchen", "74 homes with a modular kitchen"],
  ["balcony", "Balcony", "BuildingApartment", ["pistachio_sand/200", "pistachio_sand/500"], 405, "Outdoor spaces", "112 homes with a balcony"],
  ["ventilation", "Good ventilation", "Wind", ["blue/100", "blue/500"], 221, "Light and air", "63 homes with good ventilation"],
  ["sea_view", "Sea view", "Waves", ["blue/200", "blue/700"], 48, "Views", "18 homes with a sea view"],
  ["spacious", "Spacious rooms", "ArrowsOut", ["pink/200", "pink/600"], 187, "Interiors", "52 homes with spacious rooms"],
  ["terrace", "Terrace", "SunHorizon", ["soft_butter/200", "green/600"], 96, "Outdoor spaces", "27 homes with a terrace"],
  ["garden_view", "Garden view", "Tree", ["green/200", "green/600"], 133, "Views", "39 homes with a garden view"],
].map(([id, label, icon, duo, count, group, header]) => ({ id, label, icon, duo, count, group, header }));
const BRAND_DUO = ["purple/200", "purple/700"];
const GROUPS = ["Light and air", "Views", "Kitchen", "Interiors", "Outdoor spaces"];
const byId = (id) => FEATURES.find((f) => f.id === id);

// ---------- search chrome (prototype: SrpSearch.css + SrpImageSearchPills.css) ----------
// Chips are the Demand Component Kit "Filters" set; only copy, icon swap and count colour are overridden.
async function setChipText(inst, chars, mutedPart) {
  const t = inst.findOne((n) => n.type === "TEXT");
  await Promise.all(t.getRangeAllFontNames(0, t.characters.length).map((f) => figma.loadFontAsync(f)));
  t.characters = chars;
  if (mutedPart) {
    const i = chars.indexOf(mutedPart);
    t.setRangeFills(i, i + mutedPart.length, [await paint("grey_neutral/4")]);
  }
}
async function swapChipIcon(inst, name, duo) {
  const slot = inst.findOne((n) => n.type === "INSTANCE" && n.name === "SlidersHorizontal");
  slot.swapComponent(await iconComponent(name, "duo16"));
  const l = await paint(duo[0]), d = await paint(duo[1]);
  for (const v of slot.findAll((n) => n.type === "VECTOR")) {
    if (v.fills.length) { v.fills = [l]; v.opacity = 1; }
    if (v.strokes.length) v.strokes = [d];
  }
}
// opts: { sort } | { filters: n } | { label, dropdown } | { label, icon, duo, count, applied, noClose }
async function chip(parent, o) {
  const type = o.sort ? "Sorting"
    : o.filters != null ? (o.filters ? "Icon: Filter on" : "Icon: Filter off")
    : o.dropdown ? "Filters: Off"
    : o.applied ? "Icon: Filter on" : "Icon: Filter off";
  const inst = variant(filterChips, "Property 1=" + type).createInstance();
  parent.appendChild(inst);
  inst.name = o.label || (o.sort ? "Sort" : "Filters");
  if (o.dropdown) inst.setProperties({ "Filter Copy#104:0": o.label });
  else if (o.filters != null) await setChipText(inst, o.filters ? `Filters (${o.filters})` : "Filters");
  else if (o.label) {
    await setChipText(inst, o.count != null ? `${o.label} (${o.count})` : o.label, o.count != null ? `(${o.count})` : null);
    if (o.icon) await swapChipIcon(inst, o.icon, o.duo);
    if (o.applied && o.noClose) { const close = inst.findOne((n) => n.name === "Filter: Clicks"); if (close) close.visible = false; }
  }
  return inst;
}

// Horizontally scrolling band: clipped at 360, content runs off the right edge.
async function band(name, parent, h, padTop) {
  const b = frame(name, "HORIZONTAL", parent);
  fillW(b); fixedSize(b, null, h);
  b.counterAxisAlignItems = "CENTER"; b.clipsContent = true;
  await pad(b, padTop, "m", "xs", "m"); await gap(b, "s");
  await fill(b, "surface/white");
  return b;
}

// Search row (kit Search bar variant content). First fold: warm_neutral/200 to warm_neutral/0 gradient.
async function searchRow(container) {
  container.layoutMode = "HORIZONTAL"; container.fills = [];
  container.primaryAxisSizingMode = "FIXED"; container.counterAxisSizingMode = "AUTO";
  container.resize(360, container.height);
  container.counterAxisAlignItems = "CENTER";
  await pad(container, "s", "m", "s", "none"); await gap(container, "3xs");
  await gradient(container, "warm_neutral/200", "warm_neutral/0");
  const back = frame("Back", "HORIZONTAL", container);
  fixedSize(back, 40, 48); back.primaryAxisAlignItems = "CENTER"; back.counterAxisAlignItems = "CENTER";
  await icon("ArrowLeft", 24, "icon/grey_1", back);
  const field = frame("Search Field", "HORIZONTAL", container);
  fillW(field); fixedSize(field, null, 48); field.counterAxisAlignItems = "CENTER";
  await pad(field, "none", "s"); await gap(field, "xs"); await rad(field, "m");
  await fill(field, "surface/white"); await stroke(field, "border/default");
  await icon("MagnifyingGlass", 18, "icon/brand_1", field);
  // Search box is always one line: placeholder truncates, never wraps.
  const ph = fillW(await text("Placeholder", "2BHK in Andheri West with natural light", "Mobile/Body/default_regular", "text/muted", field));
  ph.maxLines = 1; ph.textTruncation = "ENDING";
  const divider = frame("Divider", "HORIZONTAL", field);
  fixedSize(divider, 1, 20); await fill(divider, "border/default");
  const ai = aiLogoSource.clone();
  ai.name = "AI Search";
  field.appendChild(ai);
  return container;
}

// Chip band + feature pill band under the search bar (kit SRP header variant content).
async function filterBands(chrome, features) {
  const chips = await band("Filter Chips", chrome, 52, "xs");
  await chip(chips, { sort: true });
  await chip(chips, { filters: features.length ? 1 : 0 });
  for (const t of ["Budget", "BHK", "Property type", "Status", "Listed by"]) await chip(chips, { label: t, dropdown: true });

  const pills = await band("Feature Pills", chrome, 44, "none");
  for (const f of [...features].reverse().map(byId)) await chip(pills, { label: f.label, icon: f.icon, duo: f.duo, applied: true });
  for (const f of FEATURES.filter((x) => !features.includes(x.id))) await chip(pills, { label: f.label, icon: f.icon, duo: f.duo, count: f.count });
  await chip(pills, { label: "Features", icon: "SquaresFour", duo: BRAND_DUO });
  return chrome;
}

async function tip(parent) {
  const wrap = frame("Feature Tip", "VERTICAL", parent);
  fillW(wrap);
  await pad(wrap, "s", "m", "none", "m");
  const t = frame("Tip", "HORIZONTAL", wrap);
  fillW(t); t.counterAxisAlignItems = "CENTER";
  await pad(t, "xs", "xs", "xs", "s"); await gap(t, "xs"); await rad(t, "s");
  await fill(t, "surface/brand_subtle");
  await duoIcon("Camera", BRAND_DUO[0], BRAND_DUO[1], t);
  fillW(await text("Message", "Most searched features", "Mobile/Body/small_regular", "text/secondary", t));
  const ok = frame("Got It", "HORIZONTAL", t);
  await pad(ok, "xs");
  await text("Label", "Got it", "Mobile/Body/small_medium", "text/brand", ok);
  // Caret pointing up at the pill row: pinned decoration, outside auto-layout.
  const caret = figma.createRectangle();
  caret.name = "Caret";
  t.appendChild(caret);
  caret.layoutPositioning = "ABSOLUTE";
  caret.resize(12, 12);
  caret.rotation = 45;
  caret.x = 24; caret.y = -8;
  caret.fills = [await paint("surface/brand_subtle")];
  return wrap;
}

async function countLine(parent, strong, rest) {
  const w = frame("Results Count", "HORIZONTAL", parent);
  fillW(w);
  await pad(w, "m", "m", "none", "m"); // 16 above; 16 below comes from the kit card's own top padding
  const t = await text("Count", strong + rest, "Mobile/Body/small_regular", "text/secondary", w);
  fillW(t);
  await emphasise(t, strong, "Mobile/Body/small_medium");
}

// Demand Component Kit property card; feature screens swap the first photo for a feature cover.
async function card(parent, type, coverSeed) {
  const inst = variant(propertyCards, "Property 1=" + type).createInstance();
  parent.appendChild(inst);
  fillW(inst);
  if (coverSeed) {
    const cover = inst.findAll((n) => "fills" in n && n.fills !== figma.mixed && n.fills.some((f) => f.type === "IMAGE") && n.width > 150)[0];
    if (cover) {
      try {
        const img = await figma.createImageAsync(`https://picsum.photos/seed/${coverSeed}/600/400`);
        cover.fills = [{ type: "IMAGE", imageHash: img.hash, scaleMode: "FILL" }];
      } catch (e) {}
    }
  }
  return inst;
}

async function featureDivider(parent) {
  const w = frame("Feature Divider", "VERTICAL", parent);
  fillW(w);
  await pad(w, "xs", "m", "m", "m");
  const d = frame("Divider Label", "HORIZONTAL", w);
  fillW(d); d.primaryAxisAlignItems = "CENTER";
  await pad(d, "xs", "s"); await rad(d, "s"); await fill(d, "surface/default");
  await text("Label", "Homes with some of your features", "Mobile/Body/small_medium", "text/secondary", d);
}

// Guide / tip: Bricks Tooltip (Mobile, Bottom, Start) floating ABSOLUTE over the page, caret on the first pill.
// One line, Dismissible on, Heading off, width hugs the text (+48 for padding, gap, close icon).
const TOOLTIP_SET = "15d63a3b2e4fb02adec5c768531a2665eefa764a";
async function featureGuide(page, copy) {
  const set = await figma.importComponentSetByKeyAsync(TOOLTIP_SET);
  const tip = variant(set, "Device=Mobile, Placement=Bottom, Align=Start").createInstance();
  page.appendChild(tip);
  tip.name = "Feature Guide";
  tip.layoutPositioning = "ABSOLUTE";
  const props = {};
  for (const k of Object.keys(tip.componentProperties)) { if (k.startsWith("Dismissible#")) props[k] = true; if (k.startsWith("Heading#")) props[k] = false; }
  tip.setProperties(props);
  for (const n of ["Container", "Caret Slot", "TextStack"]) tip.findOne((x) => x.name === n).layoutSizingHorizontal = "FILL";
  const body = tip.findOne((n) => n.name === "Body");
  await Promise.all(body.getRangeAllFontNames(0, body.characters.length).map((f) => figma.loadFontAsync(f)));
  body.characters = copy;
  body.layoutSizingHorizontal = "FILL"; body.maxLines = 1; body.textTruncation = "ENDING";
  const probe = body.clone(); figma.currentPage.appendChild(probe); probe.textAutoResize = "WIDTH_AND_HEIGHT"; probe.maxLines = null;
  const need = Math.ceil(probe.width); probe.remove();
  tip.resize(need + 48, tip.height);
  const pill = page.findOne((n) => n.name === "Feature Pills").children[0].absoluteBoundingBox, pb = page.absoluteBoundingBox;
  tip.x = 16; tip.y = Math.round(pill.y + pill.height - pb.y + 2);
  return tip;
}

// Bottom nav / bottom bar pinned to the page bottom so 800-tall RFE views keep it; padding keeps full length clean.
async function pinBottom(page, bar, padToken) {
  bar.layoutPositioning = "ABSOLUTE";
  page.setBoundVariable("paddingBottom", await V("spacing", padToken));
  bar.constraints = { horizontal: "STRETCH", vertical: "MAX" };
  bar.x = 0; bar.resize(page.width, bar.height);
  bar.y = page.height - bar.height;
}
