// In place (2026-11-11, user): NP PDP lead section layout.
// Phone | Name on one row (equal halves), Email on the next row at the Phone field's width, consent, separator,
// CTAs right-aligned: Secondary (WhatsApp me the details) then Primary (Contact the seller) on the far right. No OR.
// Details missing: Name | Email row, edit phone at the left of the CTA row. Details provided: no fields.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-pdp-section-layout.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const SP = { 8: "xs", 12: "s", 16: "m", 24: "xl" };
const G = (n, px) => gap(n, SP[px]);
const setLabel = (inst, label) => { const k = Object.keys(inst.componentProperties).find((p) => p.startsWith("Label#")); if (k) inst.setProperties({ [k]: label }); };
const N = async (id) => figma.getNodeByIdAsync(id);
const PARTS = { phone: await N("7301:58942"), name: await N("7301:59313"), email: await N("7301:59332"), consent: await N("7301:59351"),
  cta: await N("7301:58963"), edit: await N("7301:59382"), sellers: await N("7301:59307"),
  wa: (await N("7301:58941")).findOne((n) => n.name === "WhatsApp button") };
const put = (node, parent, fillW_ = true) => { const c = node.clone(); parent.appendChild(c); if (fillW_ && "layoutSizingHorizontal" in c) c.layoutSizingHorizontal = "FILL"; return c; };
const divider = async (parent) => { const d = frame("Separator", "HORIZONTAL", parent); fixedSize(d, null, 1); d.layoutSizingHorizontal = "FILL"; await fill(d, "border/subtle"); await rad(d, "full"); return d; };
const set = await N("7476:5436"); const out = [];
for (const v of set.children) {
  const state = v.name.replace("State=", "");
  const form = v.findOne((n) => n.name === "Form"); for (const c of [...form.children]) c.remove();
  await G(form, 16);
  if (state !== "Details provided") {
    const rows = fillW(frame("Fields", "VERTICAL", form)); await G(rows, 12);
    const r1 = fillW(frame("Row 1", "HORIZONTAL", rows)); await G(r1, 12);
    const [a, b] = state === "Logged out" ? [PARTS.phone, PARTS.name] : [PARTS.name, PARTS.email];
    put(a, r1); put(b, r1);
    if (state === "Logged out") {
      const r2 = fillW(frame("Row 2", "HORIZONTAL", rows)); await G(r2, 12);
      put(PARTS.email, r2); const spacer = frame("Spacer", "HORIZONTAL", r2); spacer.resize(1, 1); spacer.layoutSizingHorizontal = "FILL"; spacer.layoutSizingVertical = "FIXED"; // email = phone width
    }
    put(PARTS.consent, form);
  }
  await divider(form);
  const acts = fillW(frame("Actions", "HORIZONTAL", form)); acts.counterAxisAlignItems = "CENTER"; acts.primaryAxisAlignItems = "SPACE_BETWEEN";
  const leftSlot = frame("Left", "HORIZONTAL", acts); leftSlot.resize(1, 1); if (state === "Details missing") { const e = put(PARTS.edit, leftSlot, false); e.layoutSizingHorizontal = "HUG"; }
  const ctas = frame("CTAs", "HORIZONTAL", acts); await G(ctas, 12);
  const wa = put(PARTS.wa, ctas, false); wa.layoutSizingHorizontal = "HUG"; await pad(wa, "none", "xl", "none", "xl");
  const cta = put(PARTS.cta, ctas, false); cta.layoutSizingHorizontal = "HUG"; cta.name = "Contact Button"; setLabel(cta, "Contact the seller");
  out.push(`${v.name} ${Math.round(v.height)} | wa ${Math.round(wa.width)}x${Math.round(wa.height)} cta ${Math.round(cta.width)}x${Math.round(cta.height)} at right ${Math.round(acts.width - (ctas.x + ctas.width))}`);
}
// variants restack (heights changed)
let y = 40; for (const c of set.children) { c.y = y; y += c.height + 40; } set.resize(set.width, y);
dropProbe();
return out.join("\n");
