// CRF desktop kit (2026-11-11, PM comment #71): inline CRF on the NP PDP = a page section like the other NP PDP
// sections (PDP [Demand] desktop page: white, radius 2xl, padding xl, gap 24, title Web/Heading/h5_semibold, 792 wide).
// Same states as the gallery card: Logged out, Details missing, Details provided. Parts cloned from the CRF Modal.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-pdp-section.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const SP = { 8: "xs", 12: "s", 16: "m", 24: "xl" };
const G = (n, px) => gap(n, SP[px]);
const setLabel = (inst, label) => { const k = Object.keys(inst.componentProperties).find((p) => p.startsWith("Label#")); if (k) inst.setProperties({ [k]: label }); };
const N = async (id) => figma.getNodeByIdAsync(id);
const section = await N("7293:22853");
const PARTS = { phone: await N("7301:58942"), name: await N("7301:59313"), email: await N("7301:59332"), consent: await N("7301:59351"),
  cta: await N("7301:58963"), edit: await N("7301:59382"), sellers: await N("7301:59307"),
  wa: (await N("7301:58941")).findOne((n) => n.name === "WhatsApp button") };
const put = (node, parent, fill = true) => { const c = node.clone(); parent.appendChild(c); if (fill && "layoutSizingHorizontal" in c) c.layoutSizingHorizontal = "FILL"; return c; };
let set = section.children.find((n) => n.name === "Dweb / CRF revamp / PDP lead section");
if (!set) {
  const comps = [];
  for (const state of ["Logged out", "Details missing", "Details provided"]) {
    const f = frame(`State=${state}`, "VERTICAL", section); fixedSize(f, 792, null); f.primaryAxisSizingMode = "AUTO";
    await pad(f, "xl", "xl", "xl", "xl"); await G(f, 24); await rad(f, "2xl"); await fill(f, "surface/white");
    const head = fillW(frame("Heading", "VERTICAL", f)); await G(head, 8);
    await text("Title", "Contact sellers", "Web/Heading/h5_semibold", "text/primary", head);
    put(PARTS.sellers, head, false);
    const form = fillW(frame("Form", "VERTICAL", f)); await G(form, 16);
    if (state !== "Details provided") {
      const fields = fillW(frame("Fields", "HORIZONTAL", form)); await G(fields, 12);
      if (state === "Logged out") put(PARTS.phone, fields);
      put(PARTS.name, fields); put(PARTS.email, fields);
      put(PARTS.consent, form);
    }
    const acts = fillW(frame("Actions", "HORIZONTAL", form)); acts.counterAxisAlignItems = "CENTER"; await G(acts, 16);
    const cta = put(PARTS.cta, acts); cta.name = "Contact Button"; setLabel(cta, "Contact the seller");
    await text("Or", "OR", "Web/Body/small_regular", "text/muted", acts);
    put(PARTS.wa, acts);
    if (state === "Details missing") put(PARTS.edit, form);
    comps.push(figma.createComponentFromNode(f));
  }
  set = figma.combineAsVariants(comps, section); set.name = "Dweb / CRF revamp / PDP lead section";
  comps.forEach((c, i) => { c.x = 40; c.y = 40 + comps.slice(0, i).reduce((a, x) => a + x.height + 40, 0); });
  set.resize(792 + 80, comps.reduce((a, x) => a + x.height + 40, 40));
  set.fills = [{ type: "SOLID", color: { r: 0.949, g: 0.949, b: 0.949 } }]; // grey canvas behind white sections, like the PDP page
  set.description = "NP PDP desktop lead form section (inline CRF in the page flow). Contact the seller = CRF flow (OTP for new numbers), WhatsApp me the details = WhatsApp web.";
}
// place below the Inline CRF set, section re-hugs, overlap check
const inline = section.children.find((n) => n.name === "Dweb / CRF revamp / Inline CRF");
set.x = Math.round(inline.x + inline.width + 80); set.y = inline.y;
const need = Math.max(...section.children.map((c) => c.y + c.height)) + 100; section.resizeWithoutConstraints(Math.max(section.width, set.x + set.width + 100), Math.round(need));
const b = section.children.map((c) => [c.name, c.x, c.y, c.x + c.width, c.y + c.height]); const ov = [];
for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (b[i][1] < b[j][3] && b[j][1] < b[i][3] && b[i][2] < b[j][4] && b[j][2] < b[i][4]) ov.push(b[i][0] + " x " + b[j][0]);
const res = { set: set.id, variants: set.children.map((v) => `${v.name} ${Math.round(v.height)}`), overlaps: ov, audit: (await audit(set)).issues.length };
dropProbe();
return JSON.stringify(res);
