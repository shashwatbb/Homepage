// CRF desktop kit (2026-11-11, PM comment #71 "Inline CRF on desktop missing, fixed element in gallery").
// Gallery = the live desktop gallery (PDP [Demand] file, Roomvo draft "dWeb-open-gallery-main-single img view"
// 6944:18640, base layers only) rebuilt in auto layout at 1280x800: black 80% backdrop, white r24 modal inset 48,
// tabs (16, active underline 2), Share / Save / Close, photo grid (r8, gap 8) and the fixed right column.
// Only the right column form is redesigned: "Inline CRF" (m-web Open CRF gallery states, CRF file page Open CRF):
//   Logged out (phone + name + email), Details missing (name + email, phone known), Details provided (one tap).
// Form parts are clones of the CRF desktop Modal parts (Bricks InputField, Checkbox, Button, OR, WhatsApp button).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-gallery.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const SP = { 0: "none", 2: "3xs", 4: "2xs", 8: "xs", 12: "s", 16: "m", 20: "l", 24: "xl", 32: "2xl", 48: "4xl" };
const RD = { 8: "s", 12: "m", 16: "l", 24: "2xl", 999: "full" };
const P = async (n, t, r, b, l) => pad(n, SP[t], r == null ? undefined : SP[r], b == null ? undefined : SP[b], l == null ? undefined : SP[l]);
const G = (n, px) => gap(n, SP[px]);
const Rr = (n, px) => rad(n, RD[px]);
const divider = async (parent, name = "Divider") => { const d = frame(name, "HORIZONTAL", parent); fixedSize(d, null, 1); d.layoutSizingHorizontal = "FILL"; await fill(d, "border/subtle"); await Rr(d, 999); return d; };
const setLabel = (inst, label) => { const k = Object.keys(inst.componentProperties).find((p) => p.startsWith("Label#")); if (k) inst.setProperties({ [k]: label }); };
const setT = async (t, chars) => { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
const section = await figma.getNodeByIdAsync("7293:22853");
const N = async (id) => figma.getNodeByIdAsync(id);
const PARTS = { phone: await N("7301:58942"), name: await N("7301:59313"), email: await N("7301:59332"), consent: await N("7301:59351"),
  cta: await N("7301:58963"), or: await N("7301:59397"), edit: await N("7301:59382"), sellers: await N("7301:59307"),
  wa: (await N("7301:58941")).findOne((n) => n.name === "WhatsApp button"),
  property: (await N("7301:59984")).findOne((n) => n.name === "Property") };
const put = (node, parent) => { const c = node.clone(); parent.appendChild(c); if ("layoutSizingHorizontal" in c) c.layoutSizingHorizontal = "FILL"; return c; };

// 1. Inline CRF (3 states)
let inlineSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Inline CRF");
if (!inlineSet) {
  const comps = [];
  for (const state of ["Logged out", "Details missing", "Details provided"]) {
    const f = frame(`State=${state}`, "VERTICAL", section); fixedSize(f, 360, null); f.primaryAxisSizingMode = "AUTO";
    await P(f, 20); await G(f, 16); await Rr(f, 16); await fill(f, "surface/white"); await stroke(f, "border/subtle"); f.clipsContent = true;
    const head = fillW(frame("Heading", "VERTICAL", f)); await G(head, 12);
    const t = await text("Title", "Like what you see? Reach out", "Web/Heading/h6_semibold", "text/primary", head); t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT";
    const pr = put(PARTS.property, head); await P(pr, 0); pr.name = "Property";
    await divider(f);
    const form = fillW(frame("Form", "VERTICAL", f)); await G(form, 16);
    if (state === "Details provided") {
      put(PARTS.sellers, form);
    } else {
      const fields = fillW(frame("Fields", "VERTICAL", form)); await G(fields, 12);
      if (state === "Logged out") put(PARTS.phone, fields);
      put(PARTS.name, fields); put(PARTS.email, fields);
      put(PARTS.consent, form);
    }
    const cta = put(PARTS.cta, form); cta.name = "Contact Button"; setLabel(cta, "Contact the seller");
    if (state === "Details missing") put(PARTS.edit, form);
    put(PARTS.or, form);
    put(PARTS.wa, form);
    comps.push(figma.createComponentFromNode(f));
  }
  inlineSet = figma.combineAsVariants(comps, section); inlineSet.name = "Dweb / CRF revamp / Inline CRF";
  comps.forEach((c, i) => { c.x = 40 + i * 440; c.y = 40; });
  inlineSet.resize(40 + comps.length * 440 - 80 + 40 + 40, Math.max(...comps.map((c) => c.height)) + 80);
  inlineSet.description = "Desktop inline CRF (fixed right column of the gallery). m-web Open CRF gallery states + Logged out. Contact the seller = same flow as the CRF modal (OTP for new numbers), WhatsApp me the details = WhatsApp web.";
}
out.inline = inlineSet.children.map((v) => `${v.name} ${Math.round(v.width)}x${Math.round(v.height)}`);

// 2. Gallery (3 variants, one per form state)
const URLS = ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&fm=jpg",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&fm=jpg",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80&fm=jpg",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&fm=jpg",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fm=jpg"];
const FALLBACK = ["f2aaebfb74f964dc8a126fce31083651694f4fc4", "2685ddc988d578e81ef75fd0520662726c6d6e8d", "e55bf5ff4f733e3bdd4d4d82fb92d230d1d53669", "bfd3bbf7fbcf5c40f330cdffd3c3619b5847b40d", "2685ddc988d578e81ef75fd0520662726c6d6e8d"];
const hashes = []; out.unsplash = 0;
for (const [i, u] of URLS.entries()) { try { hashes.push((await figma.createImageAsync(u)).hash); out.unsplash++; } catch (e) { hashes.push(FALLBACK[i]); } }
const img = (name, hash, parent, h) => { const r = frame(name, "HORIZONTAL", parent); r.layoutSizingHorizontal = "FILL"; fixedSize(r, null, h); r.layoutSizingHorizontal = "FILL"; r.fills = [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }]; return r; };

for (const n of section.children.filter((n) => n.type === "FRAME" && /^State=/.test(n.name))) n.remove(); // partial-run leftovers
let galSet = section.children.find((n) => n.name === "Dweb / CRF revamp / Gallery");
if (!galSet) {
  const [xIcon, shareIcon, heartIcon] = [await iconComponent("X", 24), await iconComponent("ShareNetwork", 20), await iconComponent("Heart", 20)];
  const comps = [];
  for (const v of inlineSet.children) {
    const state = v.name.replace("State=", "");
    const root = frame(`State=${state}`, "VERTICAL", section); fixedSize(root, 1280, 800);
    root.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 0.8 }]; // live gallery backdrop: black 80% (no alpha token)
    await P(root, 48); root.clipsContent = true;
    const modal = frame("Modal", "VERTICAL", root); modal.layoutSizingHorizontal = "FILL"; modal.layoutSizingVertical = "FILL";
    await fill(modal, "surface/white"); await Rr(modal, 24); await P(modal, 24, 32, 0, 32); await G(modal, 32); modal.clipsContent = true;
    const top = fillW(frame("Top", "VERTICAL", modal));
    const bar = fillW(frame("Bar", "HORIZONTAL", top)); bar.primaryAxisAlignItems = "SPACE_BETWEEN"; bar.counterAxisAlignItems = "MAX";
    const tabs = frame("Tabs", "HORIZONTAL", bar); await G(tabs, 32);
    for (const [i, name] of ["Photos", "Videos", "Floor plan", "Location", "Shorts", "3D Tour"].entries()) {
      const tab = frame(name, "VERTICAL", tabs); await G(tab, 12); await P(tab, 4, 0, 0, 0);
      await text("Label", name, i ? "Web/Body/default_regular" : "Web/Body/default_medium", i ? "text/secondary" : "text/primary", tab);
      const u = frame("Active line", "HORIZONTAL", tab); fixedSize(u, null, 2); u.layoutSizingHorizontal = "FILL"; await fill(u, "text/primary"); await Rr(u, 999); u.visible = i === 0;
    }
    const acts = frame("Actions", "HORIZONTAL", bar); acts.counterAxisAlignItems = "CENTER"; await G(acts, 24); await P(acts, 0, 0, 8, 0);
    for (const [name, ic] of [["Share", shareIcon], ["Save", heartIcon]]) {
      const b = frame(name, "HORIZONTAL", acts); b.counterAxisAlignItems = "CENTER"; await G(b, 8);
      const i = ic.createInstance(); b.appendChild(i); await tintIcon(i, "text/secondary");
      await text("Label", name, "Web/Body/default_regular", "text/secondary", b);
    }
    const x = xIcon.createInstance(); x.name = "Close"; acts.appendChild(x); await tintIcon(x, "text/primary");
    const line = frame("Tab line", "HORIZONTAL", top); fixedSize(line, null, 1); line.layoutSizingHorizontal = "FILL"; await fill(line, "border/default");
    const body = frame("Body", "HORIZONTAL", modal); body.layoutSizingHorizontal = "FILL"; body.layoutSizingVertical = "FILL"; await G(body, 32);
    const grid = frame("Photos", "VERTICAL", body); grid.layoutSizingHorizontal = "FILL"; grid.layoutSizingVertical = "FILL"; await G(grid, 8); grid.clipsContent = true;
    const im1 = img("Image", hashes[0], grid, 380); await Rr(im1, 8);
    for (const [a, b, h] of [[1, 2, 230], [3, 4, 460]]) {
      const row = fillW(frame("Row", "HORIZONTAL", grid)); await G(row, 8);
      for (const k of [a, b]) { const r = img("Image", hashes[k], row, h); await Rr(r, 8); }
    }
    const rhs = frame("Contact", "VERTICAL", body); fixedSize(rhs, 360, null); rhs.layoutSizingVertical = "FILL"; rhs.clipsContent = true; // fixed right column, scrolls on its own
    const inst = v.createInstance(); rhs.appendChild(inst);
    comps.push(figma.createComponentFromNode(root));
  }
  galSet = figma.combineAsVariants(comps, section); galSet.name = "Dweb / CRF revamp / Gallery";
  comps.forEach((c, i) => { c.x = 40 + (i % 2) * 1360; c.y = 40 + Math.floor(i / 2) * 880; });
  galSet.resize(40 + 2 * 1360 - 80 + 40, 40 + 2 * 880 - 80 + 40);
  galSet.description = "Desktop gallery (live layout, auto layout at 1280x800) with the redesigned inline CRF fixed in the right column. One variant per form state.";
}
out.gallery = galSet.children.map((v) => `${v.name} ${Math.round(v.width)}x${Math.round(v.height)} form ${Math.round(v.findOne((n) => n.name === "Contact").children[0].height)}`);

// 3. Kit layout: new sets below Deal card / What to expect, section grows, overlap check
{
  const prev = section.children.filter((n) => /Deal card|What to expect/.test(n.name));
  const y = Math.round(Math.max(...prev.map((n) => n.y + n.height)) + 80);
  inlineSet.x = 100; inlineSet.y = y; galSet.x = 100; galSet.y = Math.round(inlineSet.y + inlineSet.height + 80);
  const need = Math.max(...section.children.map((c) => c.y + c.height)) + 100; section.resizeWithoutConstraints(Math.max(section.width, galSet.x + galSet.width + 100), Math.round(need));
  const b = section.children.map((c) => [c.name, c.x, c.y, c.x + c.width, c.y + c.height]); const ov = [];
  for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (b[i][1] < b[j][3] && b[j][1] < b[i][3] && b[i][2] < b[j][4] && b[j][2] < b[i][4]) ov.push(b[i][0] + " x " + b[j][0]);
  out.layout = { inline: inlineSet.id, gallery: galSet.id, section: `${Math.round(section.width)}x${Math.round(section.height)}`, overlaps: ov };
}
out.audit = await audit(galSet);
dropProbe();
return JSON.stringify(out, null, 1);
