// In place, CRF desktop kit (2026-11-11, PM feedback from Atul): WhatsApp is back on desktop web.
// 1. Phone steps: "OR" + "WhatsApp me the details" under Continue (m-web CRF secondary CTA; clone of the Details
//    OR row + Google button shell, official green glyph, brand label).
// 2. OTP: Resend options gets "Send OTP on WhatsApp" above "Send OTP on call".
// 3. Seller rows (both variants): Bricks IconButton Secondary M with the official WhatsApp glyph (undoes contact-nowa #2).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-whatsapp.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = { phone: 0, otp: 0, seller: 0 };
const waComp = await figma.getNodeByIdAsync("7296:42626"); // Dweb / CRF revamp / WhatsApp
const waIcon = (size) => { const i = waComp.createInstance(); i.name = "WhatsApp glyph"; i.resize(size, size); return i; };
const setText = async (t, chars) => { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
const orSrc = await figma.getNodeByIdAsync("7301:59397"); // Details: Or row
const gbSrc = await figma.getNodeByIdAsync("7301:59403"); // Details: Google button

// 1. Phone, Phone: Error, Phone: Country code
for (const id of ["7301:58941", "7301:58987", "7301:59032"]) {
  const form = await figma.getNodeByIdAsync(id);
  let b = form.findOne((n) => n.name === "WhatsApp button");
  if (!b) {
    const cont = form.children.findIndex((n) => n.name === "Continue Button");
    const or = orSrc.clone(); form.insertChild(cont + 1, or); or.layoutSizingHorizontal = "FILL";
    b = gbSrc.clone(); b.name = "WhatsApp button"; form.insertChild(cont + 2, b); b.layoutSizingHorizontal = "FILL";
  }
  const g = b.findOne((n) => n.name === "Google G"); if (g) g.remove();
  if (!b.findOne((n) => n.name === "WhatsApp glyph")) b.insertChild(0, waIcon(20));
  const t = b.findOne((n) => n.type === "TEXT" && n.name === "Label");
  await setText(t, "WhatsApp me the details"); await fill(t, "text/brand");
  out.phone++;
}

// 2. OTP: Resend options
{
  const ways = await figma.getNodeByIdAsync("7301:59755");
  if (!ways.findOne((n) => n.name === "WhatsApp")) {
    const call = ways.findOne((n) => n.name === "Call");
    const wa = call.clone(); wa.name = "WhatsApp"; ways.insertChild(0, wa); wa.layoutSizingHorizontal = "FILL";
    const tile = wa.findOne((n) => n.name === "Icon"); tile.children[0].remove(); tile.appendChild(waIcon(20));
    await setText(wa.findOne((n) => n.type === "TEXT"), "Send OTP on WhatsApp");
    out.otp++;
  }
  out.otpGap = ways.itemSpacing;
}

// 3. Seller rows
{
  const ibSet = await figma.importComponentSetByKeyAsync("7a5e861c267757507c4c8d5f7c3682c6fcd09abd");
  const v = ibSet.children.find((c) => c.name === "Variant=Secondary, Size=M, State=Default");
  const seller = await figma.getNodeByIdAsync("7347:30457");
  for (const row of seller.children) {
    if (row.children.some((n) => n.name === "WhatsApp")) continue;
    const i = v.createInstance(); i.name = "WhatsApp"; row.appendChild(i);
    const k = Object.keys(i.componentProperties).find((p) => p.startsWith("Icon#"));
    i.setProperties({ [k]: waComp.id });
    out.seller++; out.ib = `${Math.round(i.width)}x${Math.round(i.height)} r${String(i.cornerRadius)}`;
  }
}

const modal = await figma.getNodeByIdAsync("7293:23739");
out.heights = modal.children.filter((v) => /Phone|OTP: Resend/.test(v.name)).map((v) => `${v.name} ${Math.round(v.height)}`).join(", ");
out.gbRadius = String(gbSrc.cornerRadius);
dropProbe();
return JSON.stringify(out);
