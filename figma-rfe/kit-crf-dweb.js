// CRF revamp, Desktop web (v2): kit components on the Demand Component Kit "CRF" page, section "CRF/Dweb revamp".
// v2 rules (Shashwat, 2026-11-02): every screen 480 wide (Airbnb login/sign-up size), post CRF calm single column
// (scroll ok, no clutter), Bricks components first (InputField, OTPField, Checkbox, IconButton), OTP = one rectangular
// field, no auto fetch on desktop, WhatsApp = official green glyph from the CRF form, dropdown = NP PDP desktop dropdown.
// Rebuilds variants INSIDE the existing published sets so set keys stay stable.
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb.js
// After a FULL rebuild only, replay the in-place patches: patch-crf-dweb-mobile-parts.js (Safety note card + View more bar), patch-crf-dweb-success.js then patch-crf-dweb-success-icon.js (success card), then patch-crf-dweb-icon-stroke.js (all icons 1.5 stroke), patch-crf-dweb-sep-14.js (separators 14), patch-crf-dweb-noimage-priceband.js (Seller No image + price band), patch-crf-dweb-card-stroke.js then patch-crf-dweb-card-stroke2.js (stroke cards, band off Meta, band flush left), patch-crf-dweb-contact-nowa.js (Contact CTA, no WhatsApp), patch-crf-dweb-no-safety-divider.js, patch-crf-dweb-limit-in-card.js then patch-crf-dweb-limit-divider-inset.js, patch-crf-dweb-limit-alert-icon.js; after build-crf-dweb.js run patch-crf-dweb-rfe-nophoto.js.
// Small changes: never rerun this file; patch in place (patch-crf-dweb*.js), publish, accept-updates, fix-crf-dweb-rfe.js.

const PAGE = "2016:179";                 // kit page "CRF"
const SECTION = "7293:22853";            // "CRF/Dweb revamp"
const SETS = { modal: "7293:23739", post: "7293:25390", seller: "7293:22982", card: "7293:23027" };
const RETIRED = ["7293:22909", "7293:22950"]; // v1 custom Input + OTP field (replaced by Bricks InputField / OTPField)
const HOUSING_LOGO = "4948:8972";        // Housing logo in its white rounded container (Dweb / CRF / Login)
const GOOGLE_G = "I4948:9330;2244:509";  // Google "G" brand mark (Dweb / Details)
const WA_GLYPH = "4948:9591";            // official WhatsApp glyph used on the CRF form (Dweb / Details)
const BRICKS = {
  input: "8ff97505819f63e56c80ed0026d6bf71f7ddcdde",
  otp: "885e24074753bf77d48f7b168b967403125e46cc",
  checkbox: "038aeb3df2be311efcd9dcf7c6cfc9adf2447a46",
  iconButton: "7a5e861c267757507c4c8d5f7c3682c6fcd09abd",
  flags: "7256f7ba82f41643a455c096877d38e48b5d2056",
};
const IMG = {
  hero: { hash: "2a36f70b7041cc8783a4917f444f7bccd92db664", t: [[1, 0, 0], [0, 0.5508, 0.1346]] },
  property: "bfd3bbf7fbcf5c40f330cdffd3c3619b5847b40d",
  avatars: ["c50aecc3d639d993708863451867f2935a00537d", "151352e99c7213f43eef4a4f51f6e6083a8e5ab2", "7af26e679cca3364052f759dba663be3260729cd"],
  sellers: ["ef2ffc782c23c67c671dd7df8b33651aabf459ca", "5ac68dbb46ded5c07fb7f2a21c745999cdaa2124", "fbc502a889c13644a6bb8cba5f6ab86709d2da90", "ef2ffc782c23c67c671dd7df8b33651aabf459ca"],
  cards: ["f2aaebfb74f964dc8a126fce31083651694f4fc4", "2685ddc988d578e81ef75fd0520662726c6d6e8d", "e55bf5ff4f733e3bdd4d4d82fb92d230d1d53669"],
};
const PHONE = "+91 9711663070";
const W = 480, CW = 432; // modal width, content width (24 side padding)

const SP = { 0: "none", 2: "3xs", 4: "2xs", 8: "xs", 12: "s", 16: "m", 20: "l", 24: "xl", 32: "2xl", 40: "3xl", 48: "4xl", 64: "5xl" };
const RD = { 4: "xs", 8: "s", 12: "m", 16: "l", 20: "xl", 24: "2xl", 999: "full" };
const P = async (n, t, r, b, l) => pad(n, SP[t], r == null ? undefined : SP[r], b == null ? undefined : SP[b], l == null ? undefined : SP[l]);
const G = (n, px) => gap(n, SP[px]);
const Rr = (n, px) => rad(n, RD[px]);

const page = await figma.getNodeByIdAsync(PAGE);
await figma.setCurrentPageAsync(page);
const section = await figma.getNodeByIdAsync(SECTION);
for (const id of RETIRED) { const n = await figma.getNodeByIdAsync(id); if (n) n.remove(); }

const [btnSet, inSet, otpSet, cbSet, ibSet, flagSet] = await Promise.all([
  figma.importComponentSetByKeyAsync(BUTTON_SET), figma.importComponentSetByKeyAsync(BRICKS.input),
  figma.importComponentSetByKeyAsync(BRICKS.otp), figma.importComponentSetByKeyAsync(BRICKS.checkbox),
  figma.importComponentSetByKeyAsync(BRICKS.iconButton), figma.importComponentSetByKeyAsync(BRICKS.flags)]);

const prop = (inst, prefix) => Object.keys(inst.componentProperties).find((k) => k.startsWith(prefix));
function setProps(inst, map) {
  const p = {};
  for (const [prefix, v] of Object.entries(map)) { const k = prop(inst, prefix); if (k) p[k] = v; }
  inst.setProperties(p);
}
async function btn(label, v, size, parent, opts = {}) {
  const inst = variant(btnSet, `Variant=${v}, Size=${size}, State=${opts.state || "Default"}`).createInstance();
  inst.name = label + " Button";
  const p = { "Label#": label, "Has Trailing Icon#": false, "Has Leading Icon#": Boolean(opts.icon) };
  if (opts.underline != null) p["Has underline#"] = opts.underline;
  setProps(inst, p);
  if (opts.icon) setProps(inst, { [`Leading icon (${size})#`]: opts.icon.id || (await iconComponent(opts.icon, 16)).id });
  if (parent) parent.appendChild(inst);
  if (opts.fill) inst.layoutSizingHorizontal = "FILL";
  return inst;
}
function imageFill(node, hash, t) {
  node.fills = [t ? { type: "IMAGE", imageHash: hash, scaleMode: "CROP", imageTransform: t } : { type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
}
function photo(name, hash, w, h, parent) {
  const f = frame(name, "HORIZONTAL", parent);
  fixedSize(f, w, h); imageFill(f, hash); f.clipsContent = true;
  return f;
}
async function divider(parent, name = "Divider") {
  const d = frame(name, "HORIZONTAL", parent);
  fixedSize(d, null, 1); d.layoutSizingHorizontal = "FILL";
  await fill(d, "border/subtle"); await Rr(d, 999); // separators always fully rounded
  return d;
}
async function orRow(parent) {
  const row = fillW(frame("Or", "HORIZONTAL", parent));
  row.counterAxisAlignItems = "CENTER"; await G(row, 12);
  (await divider(row)).layoutSizingHorizontal = "FILL";
  await text("Or", "OR", "Web/Body/small_regular", "text/muted", row);
  (await divider(row)).layoutSizingHorizontal = "FILL";
}
async function oneLine(t) { t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT"; t.textTruncation = "ENDING"; t.maxLines = 1; return t; }
async function wrap(t) { t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT"; return t; }
// NP PDP inline separator: vertical 1px line, border/default, length = adjacent line height, gap 8, centred ("Owner | 1 year ago")
async function sep(parent, len) {
  const l = figma.createLine(); l.name = "Separator"; parent.appendChild(l);
  l.resize(len, 0); l.rotation = -90; l.strokes = [await paint("border/default")]; l.strokeWeight = 1; l.strokeCap = "ROUND"; // separators always fully rounded
  return l;
}
async function sepRow(parent, name, parts, len, style, color) {
  const r = frame(name, "HORIZONTAL", parent); r.counterAxisAlignItems = "CENTER"; await G(r, 8);
  for (const [i, [layer, chars]] of parts.entries()) { if (i) await sep(r, len); await text(layer, chars, style, color, r); }
  return r;
}
const comp = (f, name, desc) => { const c = figma.createComponentFromNode(f); c.name = name; if (desc) c.description = desc; return c; };
function layoutSet(set, cols, gx = 40, gy = 40) {
  let x = gx, y = gy, rowH = 0;
  set.children.forEach((c, i) => {
    if (i && i % cols === 0) { x = gx; y += rowH + gy; rowH = 0; }
    c.x = x; c.y = y; x += c.width + gx; rowH = Math.max(rowH, c.height);
  });
  set.resizeWithoutConstraints(Math.max(...set.children.map((c) => c.x + c.width)) + gx, Math.max(...set.children.map((c) => c.y + c.height)) + gy);
}
async function replaceVariants(setId, comps, cols) {
  const set = await figma.getNodeByIdAsync(setId);
  const old = [...set.children];
  for (const c of comps) set.appendChild(c);
  for (const o of old) o.remove();
  layoutSet(set, cols);
  return set;
}

/* ---------------- atoms ---------------- */

// Official WhatsApp glyph as a component, so it can sit in Bricks IconButton / Button icon slots
// reuse the published glyph component (keeps its key); create only if missing
let waComp = section.children.find((n) => n.type === "COMPONENT" && n.name === "Dweb / CRF revamp / WhatsApp");
if (!waComp) {
  const waFrame = frame("Dweb / CRF revamp / WhatsApp", "HORIZONTAL", section);
  fixedSize(waFrame, 20, 20); waFrame.primaryAxisAlignItems = "CENTER"; waFrame.counterAxisAlignItems = "CENTER";
  const glyph = (await figma.getNodeByIdAsync(WA_GLYPH)).clone(); glyph.name = "WhatsApp glyph"; waFrame.appendChild(glyph);
  glyph.resize(20, 20); glyph.constraints = { horizontal: "SCALE", vertical: "SCALE" };
  waComp = comp(waFrame, "Dweb / CRF revamp / WhatsApp", "Official WhatsApp glyph (as on the CRF form). Use for every WhatsApp affordance, never the Bricks WhatsappLogo icon.");
}
const wa = (parent) => { const i = waComp.createInstance(); if (parent) parent.appendChild(i); return i; };

async function iconBtn(iconComp, v, size, parent, name) {
  const i = variant(ibSet, `Variant=${v}, Size=${size}, State=Default`).createInstance(); i.name = name;
  setProps(i, { "Icon#": iconComp.id });
  if (parent) parent.appendChild(i);
  return i;
}

// Seller row (in place): avatar, name + role, number + copy, WhatsApp
{
  const s = await figma.getNodeByIdAsync(SETS.seller);
  for (const c of [...s.children]) c.remove();
  s.layoutMode = "HORIZONTAL"; s.primaryAxisSizingMode = "FIXED"; s.counterAxisSizingMode = "AUTO";
  s.resize(CW, s.height); s.counterAxisAlignItems = "CENTER"; s.fills = []; s.strokes = []; s.clipsContent = false;
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) { s.setBoundVariable(k, null); s[k] = 0; }
  await P(s, 12, 0); await G(s, 12);
  const av = photo("Avatar", IMG.sellers[0], 40, 40, s); await Rr(av, 8); // seller photos: rounded square, never circle
  const col = frame("Name and number", "VERTICAL", s); col.layoutSizingHorizontal = "FILL"; await G(col, 2);
  const nr = frame("Name row", "HORIZONTAL", col); nr.counterAxisAlignItems = "CENTER"; await G(nr, 8);
  await text("Name", "Rohit Mehra", "Web/Body/small_medium", "text/primary", nr);
  await sep(nr, 16);
  await text("Role", "Agent", "Web/Body/small_regular", "text/muted", nr);
  const num = frame("Number row", "HORIZONTAL", col); num.counterAxisAlignItems = "CENTER"; await G(num, 4);
  await text("Phone", "+91 9711663204", "Web/Body/small_regular", "text/secondary", num);
  await iconBtn(waComp, "Secondary", "M", s, "WhatsApp");
  s.name = "Dweb / CRF revamp / Seller";
  s.description = "Post CRF seller row: avatar, name + role, full number, WhatsApp (opens WhatsApp web chat in a new tab).";
  var sellerComp = s;
}

// Property card: borderless, image led, no CTA (hover reveals Contact)
const CARD_W = 208;
async function cardVariant(service) {
  const f = frame(`Service=${service}`, "VERTICAL", section);
  fixedSize(f, CARD_W, null); f.layoutSizingVertical = "HUG"; await G(f, 8);
  const img = photo("Photo", IMG.cards[0], CARD_W, 128, f); await Rr(img, 12);
  const body = fillW(frame("Details", "VERTICAL", f)); await G(body, 2);
  await text("Price", service === "Rent" ? "₹22,000/month" : "₹1.79 Cr", "Web/Heading/h6_semibold", "text/primary", body);
  await sepRow(body, "Config", service === "Rent" ? [["BHK", "2 BHK"], ["Furnishing", "Semi furnished"]] : [["BHK", "2 BHK"], ["Type", "Apartment"]], 16, "Web/Body/small_regular", "text/secondary");
  await oneLine(await text("Locality", "Sector 91, Gurgaon", "Web/Body/small_regular", "text/muted", body));
  return comp(f, `Service=${service}`);
}
const cardSet = await replaceVariants(SETS.card, [await cardVariant("Buy"), await cardVariant("Rent")], 2);
cardSet.description = "Post CRF recommendation card, borderless. Click opens the PDP in a new tab; hover shows a Contact button (one tap, user is verified).";

/* ---------------- shell + shared blocks ---------------- */

async function shell(name, header) {
  const m = frame(name, "VERTICAL", section);
  fixedSize(m, W, null); m.layoutSizingVertical = "HUG"; m.clipsContent = true;
  await Rr(m, 24); await fill(m, "surface/white"); await stroke(m, "border/subtle");
  // NP PDP desktop modal micro details: hairline border (0.76) + white bottom-edge fade (inner shadow) so scrolled content melts into the edge
  m.strokeWeight = 0.76;
  m.effects = [{ type: "INNER_SHADOW", color: { r: 1, g: 1, b: 1, a: 0.86 }, offset: { x: 0, y: -18 }, radius: 20, spread: 0, visible: true, blendMode: "NORMAL" }];
  if (header) {
    const h = fillW(frame("Header", "HORIZONTAL", m)); await P(h, 24); h.counterAxisAlignItems = "CENTER"; await G(h, 12);
    if (header.back) await icon("ArrowLeft", 20, "icon/grey_1", h);
    (await text("Title", header.title, "Web/Heading/h6_medium", "text/primary", h)).layoutSizingHorizontal = "FILL";
    await icon("X", 20, "icon/grey_1", h);
    await divider(m);
  }
  const body = fillW(frame("Body", "VERTICAL", m)); await P(body, 24); await G(body, 24);
  if (!header) {
    const x = await icon("X", 20, "icon/grey_1", m);
    x.layoutPositioning = "ABSOLUTE"; x.x = W - 44; x.y = 24; x.constraints = { horizontal: "MAX", vertical: "MIN" };
  }
  return { m, body };
}
async function hero(body, title) {
  const top = fillW(frame("Intro", "VERTICAL", body)); top.counterAxisAlignItems = "CENTER"; await G(top, 12);
  const h = fillW(frame("Hero", "VERTICAL", top)); fixedSize(h, null, 181); h.layoutSizingHorizontal = "FILL"; h.counterAxisAlignItems = "CENTER";
  const art = fillW(frame("Illustration", "HORIZONTAL", h)); fixedSize(art, null, 155); art.layoutSizingHorizontal = "FILL";
  imageFill(art, IMG.hero.hash, IMG.hero.t); await Rr(art, 16); art.opacity = 0.8;
  const logo = (await figma.getNodeByIdAsync(HOUSING_LOGO)).clone(); logo.name = "Housing logo"; h.appendChild(logo);
  logo.layoutPositioning = "ABSOLUTE"; logo.x = (CW - 60) / 2; logo.y = 121; logo.constraints = { horizontal: "CENTER", vertical: "MAX" };
  await text("Title", title, "Web/Heading/h5_semibold", "text/primary", top);
  return top;
}
// Bricks InputField, label off, supporting text only for errors
async function field(parent, type, state, value, error, verified) {
  const i = variant(inSet, `Type=${type}, State=${state}`).createInstance(); parent.appendChild(i);
  i.name = type === "Phone Number" ? "Phone number" : value || "Input";
  i.layoutSizingHorizontal = "FILL";
  // Large input (48): Bricks InputField box is 40 with no size variant; hug + 14 vertical padding (no 14 spacing token)
  const box = i.findOne((n) => n.name === "Field"); box.layoutSizingVertical = "HUG"; box.paddingTop = 14; box.paddingBottom = 14;
  const p = { "Show Label#": false, "Show Leading Icon#": false, "Show Supporting Content#": Boolean(error), "Show Trailing Icon#": Boolean(verified) };
  if (verified) p["Trailing Icon#"] = (await iconComponent("SealCheck", "fill16")).id;
  setProps(i, p);
  if (value) await setInstanceText(i, "Text", value);
  if (error) await setInstanceText(i, "Supporting Text", error);
  if (verified) { const ti = i.findOne((n) => n.name === "Trailing Icon"); if (ti) await tintIcon(ti, "semantic_icons/success"); }
  return i;
}
async function terms(parent) {
  const t = await wrap(await text("Terms", "By continuing, you agree to our terms and conditions", "Web/Body/small_regular", "text/muted", parent));
  t.textAlignHorizontal = "CENTER";
  await emphasise(t, "terms and conditions", "Web/Body/small_medium", "text/brand");
}
// NP PDP desktop dropdown: white, border/subtle, radius l, pad 12, gap 4, 32 rows, dividers, selected row surface/subtle, soft shadow
async function countryDropdown(m, anchor) {
  const dd = frame("Country code dropdown", "VERTICAL", m);
  dd.layoutPositioning = "ABSOLUTE"; fixedSize(dd, 240, null); dd.layoutSizingVertical = "HUG";
  await P(dd, 12); await G(dd, 4); await Rr(dd, 16); await fill(dd, "surface/white"); await stroke(dd, "border/subtle");
  dd.effects = [{ type: "DROP_SHADOW", color: { r: 0.2934, g: 0.2872, b: 0.2562, a: 0.08 }, offset: { x: 0, y: 8 }, radius: 22, spread: -6, visible: true, blendMode: "NORMAL", showShadowBehindNode: true }];
  const rows = [["India", "+91"], ["United Arab Emirates", "+971"], ["United States", "+1"], ["United Kingdom", "+44"], ["Singapore", "+65"], ["Saudi Arabia", "+966"]];
  for (const [i, [name, code]] of rows.entries()) {
    if (i) await divider(dd, "Line");
    const r = fillW(frame(name, "HORIZONTAL", dd)); fixedSize(r, null, 32); r.layoutSizingHorizontal = "FILL"; r.counterAxisAlignItems = "CENTER";
    await P(r, 8, 4); await G(r, 8); await Rr(r, 4);
    if (i === 0) await fill(r, "surface/subtle");
    const f = variant(flagSet, `Country=${name}`).createInstance(); r.appendChild(f); f.resize(18, 12);
    (await text("Country", name, "Web/Body/small_regular", "text/primary", r)).layoutSizingHorizontal = "FILL";
    await text("Code", code, "Web/Body/small_regular", "text/muted", r);
  }
  dd.x = 24; dd.y = Math.round(anchor.absoluteBoundingBox.y - m.absoluteBoundingBox.y + anchor.height + 8);
  m.clipsContent = false;
}

/* ---------------- step modal ---------------- */

async function stepPhone(state) {
  const { m, body } = await shell(`Step=${state}`);
  await hero(body, "Connect with sellers instantly!");
  const form = fillW(frame("Form", "VERTICAL", body)); await G(form, 16);
  const inp = await field(form, "Phone Number", state === "Phone: Error" ? "Error" : state === "Phone: Country code" ? "Selected" : "Default",
    state === "Phone: Error" ? "97116630" : "Phone number", state === "Phone: Error" ? "Enter a valid 10 digit phone number" : null);
  await btn("Continue", "Primary", "L", form, { fill: true });
  await terms(body);
  if (state === "Phone: Country code") {
    await countryDropdown(m, inp);
    // Bricks caret is absolute, centred for a 40 box, and can't be moved in an instance: hide it, draw a centred one
    const c = inp.findOne((n) => n.name === "Cursor"); if (c) c.visible = false;
    const box = inp.findOne((n) => n.name === "Field"), txt = box.findOne((n) => n.name === "Text");
    const caret = figma.createRectangle(); caret.name = "Caret"; m.appendChild(caret); caret.layoutPositioning = "ABSOLUTE";
    caret.resize(1, 18); await fill(caret, "text/primary");
    caret.x = Math.round(txt.absoluteBoundingBox.x - m.absoluteBoundingBox.x); caret.y = Math.round(box.absoluteBoundingBox.y - m.absoluteBoundingBox.y + 15);
  }
  return comp(m, `Step=${state}`);
}

async function stepDetails(state) {
  const { m, body } = await shell(`Step=${state}`, { title: "Your details", back: true });
  const prop = fillW(frame("Property", "HORIZONTAL", body)); prop.counterAxisAlignItems = "CENTER"; await G(prop, 12);
  await P(prop, 12); await Rr(prop, 16); await fill(prop, "surface/subtle");
  await Rr(photo("Photo", IMG.property, 40, 40, prop), 8);
  const pc = frame("Property details", "VERTICAL", prop); pc.layoutSizingHorizontal = "FILL"; await G(pc, 2);
  await oneLine(await text("Name", "Evolvus Phase 1, Sikanderpur", "Web/Body/small_medium", "text/primary", pc));
  await sepRow(pc, "Meta", [["Price", "₹2.5 Cr. - 4.53 Cr."], ["Type", "Apartment, Villa"]], 16, "Web/Body/small_regular", "text/muted");
  const form = fillW(frame("Form", "VERTICAL", body)); await G(form, 16);
  const head = fillW(frame("Heading", "VERTICAL", form)); await G(head, 8);
  await text("Title", "Tell us your details", "Web/Heading/h6_semibold", "text/primary", head);
  const reach = frame("Sellers", "HORIZONTAL", head); reach.counterAxisAlignItems = "CENTER"; await G(reach, 8);
  const stack = frame("Avatars", "HORIZONTAL", reach); stack.itemSpacing = -6; stack.itemReverseZIndex = true;
  for (const h of IMG.avatars) { const a = photo("Avatar", h, 22, 22, stack); await Rr(a, 999); // only the overlapping stack is circular await stroke(a, "surface/white"); }
  await text("Reach", "Reach sellers like Abhishek +3 others", "Web/Body/small_regular", "text/secondary", reach);
  const google = state === "Details: Google filled", err = state === "Details: Error";
  await field(form, "Text Field", google ? "Filled" : "Default", google ? "Rohit Mehra" : "Name", null, google);
  await field(form, "Text Field", google ? "Filled" : err ? "Error" : "Default", google ? "rohit.mehra@gmail.com" : err ? "rohit.mehra@gmail" : "Email", err ? "Enter a valid email ID" : null, google);
  // Bricks Checkbox (box only; its label slot doesn't wrap) + wrapping consent copy
  const consent = fillW(frame("Consent", "HORIZONTAL", form)); await G(consent, 8);
  const cb = variant(cbSet, "Size=Medium, Position=Left").createInstance(); consent.appendChild(cb); cb.name = "Checkbox";
  setProps(cb, { "Selected#": true, "Label#": false, "Description#": false });
  await wrap(await text("Consent copy", "I agree to be contacted by Housing & other agents via WhatsApp, SMS, phone, email etc.", "Web/Body/small_regular", "text/secondary", consent));
  await btn("Get OTP", "Primary", "L", form, { fill: true });
  const edit = fillW(frame("Edit phone", "HORIZONTAL", form)); edit.primaryAxisAlignItems = "CENTER"; edit.counterAxisAlignItems = "CENTER"; await G(edit, 4);
  await text("Number", PHONE, "Web/Body/small_regular", "text/secondary", edit);
  await btn("Edit number", "Link purple", "S", edit, { icon: "PencilSimple" });
  if (!google) {
    // Google: m-web CRF treatment (label + white pill, neutral border, dark text), Bricks has no Google button
    await orRow(form);
    const gg = fillW(frame("Google", "VERTICAL", form)); await G(gg, 12);
    await text("Google label", "Use Google to fill details instead", "Web/Body/small_regular", "text/muted", gg);
    const gb = fillW(frame("Google button", "HORIZONTAL", gg)); fixedSize(gb, null, 48); gb.layoutSizingHorizontal = "FILL";
    gb.primaryAxisAlignItems = "CENTER"; gb.counterAxisAlignItems = "CENTER"; await G(gb, 8); await P(gb, 0, 16);
    await Rr(gb, 999); await fill(gb, "surface/white"); await stroke(gb, "border/default");
    const gm = (await figma.getNodeByIdAsync(GOOGLE_G)).clone(); gm.name = "Google G"; gb.appendChild(gm);
    await text("Label", "Continue with Google", "Web/Body/small_medium", "text/primary", gb);
  } else {
    const ok = fillW(frame("Google note", "HORIZONTAL", form)); ok.primaryAxisAlignItems = "CENTER"; ok.counterAxisAlignItems = "CENTER"; await G(ok, 8);
    await icon("SealCheck", "fill16", "semantic_icons/success", ok);
    await text("Note", "Name and email filled from your Google account", "Web/Body/small_regular", "semantic_text/success", ok);
  }
  return comp(m, `Step=${state}`);
}

async function stepOtp(state) {
  const { m, body } = await shell(`Step=${state}`, { title: "Verify your phone", back: true });
  const head = fillW(frame("Heading", "VERTICAL", body)); await G(head, 4);
  await text("Title", "Enter OTP to verify details", "Web/Heading/h5_semibold", "text/primary", head);
  const sent = frame("Sent to", "HORIZONTAL", head); sent.counterAxisAlignItems = "CENTER"; await G(sent, 4);
  await text("Copy", `OTP sent to ${PHONE}`, "Web/Body/small_regular", "text/secondary", sent);
  await btn("Edit", "Link purple", "S", sent, { icon: "PencilSimple" });
  const box = fillW(frame("OTP", "VERTICAL", body)); await G(box, 12);
  const o = variant(otpSet, `State=${{ "OTP": "Default", "OTP: Resend options": "Default", "OTP: Incorrect": "Error", "OTP: Verifying": "Filled" }[state]}`).createInstance();
  box.appendChild(o); o.name = "OTP field"; // natural Bricks width, never full width
  setProps(o, { "Show Supporting Text#": state === "OTP: Incorrect" });
  if (state === "OTP") await text("Timer", "Resend OTP in 00:15", "Web/Body/small_regular", "text/muted", box);
  if (state === "OTP: Incorrect" || state === "OTP: Resend options") await btn("Resend OTP", "Link purple", "S", box);
  if (state === "OTP: Resend options") {
    const alts = fillW(frame("Other ways", "VERTICAL", body)); await G(alts, 8);
    await text("Title", "Or get it another way", "Web/Body/small_regular", "text/muted", alts);
    for (const [kind, link] of [["call", "call"]]) {
      const r = fillW(frame(link, "HORIZONTAL", alts)); r.counterAxisAlignItems = "CENTER"; await G(r, 12);
      await P(r, 12); await Rr(r, 12); await stroke(r, "border/subtle");
      if (kind === "wa") wa(r); else await icon("Phone", 20, "icon/grey_1", r);
      const t = await text("Label", kind === "wa" ? "Get OTP on WhatsApp" : "Get OTP on a call", "Web/Body/small_regular", "text/primary", r); t.layoutSizingHorizontal = "FILL";
      await icon("CaretRight", 16, "icon/grey_3", r);
    }
  }
  await btn(state === "OTP: Verifying" ? "Verifying" : "Verify OTP", "Primary", "L", body, { fill: true, state: state === "OTP: Verifying" ? "Loading" : "Disabled" });
  return comp(m, `Step=${state}`);
}

async function stepConnecting() {
  const { m, body } = await shell("Step=Connecting");
  await hero(body, "Getting you in touch with sellers...");
  const list = fillW(frame("Sellers", "VERTICAL", body));
  for (const [i, n] of ["Rohit Mehra", "Sneha Kapoor"].entries()) {
    if (i) await divider(list);
    const r = fillW(frame(n, "HORIZONTAL", list)); r.counterAxisAlignItems = "CENTER"; await G(r, 12); await P(r, 12, 0);
    await Rr(photo("Avatar", IMG.sellers[i], 40, 40, r), 8);
    const c = frame("Text", "VERTICAL", r); c.layoutSizingHorizontal = "FILL"; await G(c, 2);
    await text("Name", n, "Web/Body/small_medium", "text/primary", c);
    await text("Phone", "+91 97116XXXXX", "Web/Body/small_regular", "text/muted", c);
  }
  return comp(m, "Step=Connecting");
}

const steps = [];
for (const s of ["Phone", "Phone: Error", "Phone: Country code"]) steps.push(await stepPhone(s));
for (const s of ["Details", "Details: Google filled", "Details: Error"]) steps.push(await stepDetails(s));
for (const s of ["OTP", "OTP: Resend options", "OTP: Incorrect", "OTP: Verifying"]) steps.push(await stepOtp(s));
steps.push(await stepConnecting());
const modalSet = await replaceVariants(SETS.modal, steps, 6);
modalSet.description = "One shared CRF pop-up for every Desktop Demand page. 480 wide (Airbnb login size). Phone, Details (Buy only), OTP (manual, paste, auto submit; no auto fetch; no WhatsApp flow), connecting delay. Bricks InputField, OTPField, Checkbox.";

/* ---------------- post CRF: calm single column, 480 ---------------- */

async function postCrf(type) {
  const rent = type.startsWith("Rent"), limit = type === "Buy: Limit reached";
  const n = type === "Buy: All sellers" ? 4 : type === "Buy: Multiple sellers" ? 2 : 1;
  const { m, body } = await shell(`Type=${type}`, { title: rent ? "Owner & agent details" : "Sellers details" });
  await G(body, 32);

  // 1. Outcome: compact success panel (badge beside headline), then the property strip
  const out = fillW(frame("Outcome", "VERTICAL", body)); await G(out, 12);
  const ok = fillW(frame("Success", "HORIZONTAL", out)); ok.counterAxisAlignItems = "CENTER"; await P(ok, 16); await G(ok, 12);
  await Rr(ok, 16); await fill(ok, "semantic_surface/success"); await stroke(ok, "semantic_border/success"); ok.strokeWeight = 0.76;
  const mark = frame("Success mark", "HORIZONTAL", ok); fixedSize(mark, 40, 40); mark.primaryAxisAlignItems = "CENTER"; mark.counterAxisAlignItems = "CENTER";
  await Rr(mark, 999); await fill(mark, "surface/white");
  await icon("SealCheck", "fill24", "semantic_icons/success", mark);
  const copy = frame("Copy", "VERTICAL", ok); copy.layoutSizingHorizontal = "FILL"; await G(copy, 2);
  const headline = rent ? "Owner notified" : n > 1 ? `${n === 2 ? 4 : n} sellers notified` : limit ? "Sellers notified" : "Seller notified";
  await wrap(await text("Headline", headline, "Web/Heading/h5_semibold", "semantic_text/success", copy));
  await wrap(await text("Next", `They may reach out soon on call or WhatsApp`, "Web/Body/small_regular", "semantic_text/success", copy));
  const prop = fillW(frame("Property", "HORIZONTAL", out)); prop.counterAxisAlignItems = "CENTER"; await G(prop, 12);
  await P(prop, 12); await Rr(prop, 16); await fill(prop, "surface/subtle");
  await Rr(photo("Photo", IMG.property, 40, 40, prop), 8);
  const pc = frame("Property details", "VERTICAL", prop); pc.layoutSizingHorizontal = "FILL"; await G(pc, 2);
  await oneLine(await text("Name", "Evolvus Phase 1, Sikanderpur, MG Road", "Web/Body/small_medium", "text/primary", pc));
  await sepRow(pc, "Meta", [["Config", "3BHK Apartment"], ["Price", rent ? "₹27,000/month" : "₹2.5 Cr."]], 16, "Web/Body/small_regular", "text/muted");

  // 2. Contacts: a divided list, not tiles
  if (limit) {
    const info = fillW(frame("Limit reached", "HORIZONTAL", body)); await G(info, 8);
    await icon("Info", 20, "icon/grey_4", info);
    const t = await wrap(await text("Copy", "You've reached your enquiry limit. For concerns contact support@housing.com", "Web/Body/small_regular", "text/secondary", info));
    await emphasise(t, "support@housing.com", "Web/Body/small_medium", "text/brand");
  } else {
    const list = fillW(frame("Contacts", "VERTICAL", body)); await G(list, 4);
    await text("Title", rent ? "Owner" : n > 1 ? "Sellers" : "Seller", "Web/Body/small_medium", "text/primary", list);
    const rows = fillW(frame("List", "VERTICAL", list));
    const names = rent ? [["Arjun Patel", "Owner"]] : [["Rohit Mehra", "Agent"], ["Sneha Kapoor", "Agent"], ["Amit Verma", "Builder"], ["Rahul Jain", "Agent"]];
    for (let i = 0; i < n; i++) {
      if (i) await divider(rows);
      const s = sellerComp.createInstance(); rows.appendChild(s); s.layoutSizingHorizontal = "FILL";
      await setInstanceText(s, "Name", names[i][0]); await setInstanceText(s, "Role", names[i][1]);
      const av = s.findOne((x) => x.name === "Avatar"); if (av) imageFill(av, IMG.sellers[i]);
    }
    if (type === "Buy: Multiple sellers") await btn("Show 2 more sellers", "Link black", "S", list, { underline: true });
    if (type === "Buy: All sellers") await btn("Show less", "Link black", "S", list, { underline: true });
  }

  // 4. Next step: multi-connect (Rent) or one row of similar homes (section divider like NP RERA modal)
  await divider(body, "Section divider");
  if (type === "Rent: Multi-connect") {
    const mc = fillW(frame("Visit nearby homes", "VERTICAL", body)); await G(mc, 16);
    const hc = fillW(frame("Heading", "VERTICAL", mc)); await G(hc, 4);
    await text("Title", "Visit nearby homes together", "Web/Heading/h6_semibold", "text/primary", hc);
    await wrap(await text("Subtitle", "Pick homes and we'll share your details with each owner", "Web/Body/small_regular", "text/muted", hc));
    const row = fillW(frame("Cards", "HORIZONTAL", mc)); await G(row, 16);
    for (let i = 0; i < 2; i++) {
      const w = frame("Selectable card", "VERTICAL", row);
      const c = variant(cardSet, "Service=Rent").createInstance(); w.appendChild(c);
      const ph = c.findOne((x) => x.name === "Photo"); if (ph) imageFill(ph, IMG.cards[i + 1]);
      const cb = variant(cbSet, "Size=Medium, Position=Left").createInstance(); w.appendChild(cb);
      setProps(cb, { "Selected#": true, "Label#": false, "Description#": false });
      cb.layoutPositioning = "ABSOLUTE"; cb.x = CARD_W - cb.width - 4; cb.y = 4;
    }
    await btn("Connect with 2 owners", "Primary", "L", mc, { fill: true });
  } else {
    const rec = fillW(frame("Similar homes", "VERTICAL", body)); await G(rec, 16);
    const tr = fillW(frame("Title row", "HORIZONTAL", rec)); tr.counterAxisAlignItems = "CENTER"; tr.primaryAxisAlignItems = "SPACE_BETWEEN";
    await text("Title", rent ? "Tenants also explored" : "Buyers also explored", "Web/Heading/h6_semibold", "text/primary", tr);
    await btn("See all", "Link purple", "S", tr, { underline: false });
    const row = fillW(frame("Cards", "HORIZONTAL", rec)); await G(row, 16);
    for (let i = 0; i < 2; i++) {
      const c = variant(cardSet, `Service=${rent ? "Rent" : "Buy"}`).createInstance(); row.appendChild(c);
      const ph = c.findOne((x) => x.name === "Photo"); if (ph) imageFill(ph, IMG.cards[i]);
    }
  }

  // 5. One quiet closing line (safety), referral for Rent
  await divider(body, "Section divider");
  const foot = fillW(frame("Footer", "VERTICAL", body)); await G(foot, 12);
  if (type === "Rent") {
    const ref = fillW(frame("Refer", "HORIZONTAL", foot)); ref.counterAxisAlignItems = "CENTER"; await G(ref, 4);
    await text("Copy", "Know an owner? Earn up to ₹500", "Web/Body/small_regular", "text/secondary", ref);
    await btn("Refer an owner", "Link purple", "S", ref, { underline: false });
  }
  const safe = fillW(frame("Safety", "HORIZONTAL", foot)); safe.counterAxisAlignItems = "CENTER"; await G(safe, 8);
  await icon("ShieldCheck", 16, "semantic_icons/warning", safe);
  await wrap(await text("Copy", "Never pay before a site visit or a signed agreement", "Web/Body/small_regular", "text/muted", safe));
  return comp(m, `Type=${type}`);
}
const posts = [];
for (const t of ["Buy: Single seller", "Buy: Multiple sellers", "Buy: All sellers", "Buy: Limit reached", "Rent", "Rent: Multi-connect"]) posts.push(await postCrf(t));
const postSet = await replaceVariants(SETS.post, posts, 7);
postSet.description = "Post CRF on desktop, same 480 modal as the steps. Outcome first, then contacts as a list (number + WhatsApp), one row of 2 similar homes, one safety line. Max height min(720, viewport); header fixed, body scrolls.";

/* ---------------- arrange section ---------------- */
let y = 100, x = 100;
for (const nd of [sellerComp, cardSet, waComp]) { nd.x = x; nd.y = y; x += nd.width + 80; }
y += Math.max(sellerComp.height, cardSet.height, 20) + 120;
modalSet.x = 100; modalSet.y = y; y += modalSet.height + 120;
postSet.x = 100; postSet.y = y; y += postSet.height + 100;
section.resizeWithoutConstraints(Math.max(...section.children.map((nd) => nd.x + nd.width)) + 100, y);

const issues = [];
for (const s of [sellerComp, cardSet, modalSet, postSet]) {
  const a = await audit(s);
  issues.push(s.name + ": " + a.issues.filter((i) => !/instance not from|Housing logo|^Logo|Google|Avatars: raw gap/.test(i)).join(" | "));
}
dropProbe();
return { section: section.id, size: `${Math.round(section.width)}x${Math.round(section.height)}`, sets: { seller: sellerComp.id, card: cardSet.id, wa: waComp.id, modal: modalSet.id, post: postSet.id }, postHeights: postSet.children.map((c) => c.name + " " + Math.round(c.height)), issues };
