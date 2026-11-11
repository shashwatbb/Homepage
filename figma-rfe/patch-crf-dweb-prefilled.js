// In place (2026-11-11, user):
// 1. Post CRF Type=Rent: remove the "Know an owner? Earn up to ₹500 / Refer an owner" row from the footer.
// 2. PDP lead section, Details provided: all fields shown, prefilled (Bricks InputField State=Filled):
//    Phone | Name, Email (phone width), consent; no edit phone in the sellers row (the phone field shows it).
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-prefilled.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const refer = await figma.getNodeByIdAsync("7301:60476"); if (refer) { refer.remove(); out.refer = "removed"; }
const SP = { 12: "s", 16: "m" };
const N = async (id) => figma.getNodeByIdAsync(id);
const PARTS = { phone: await N("7301:58942"), name: await N("7301:59313"), email: await N("7301:59332"), consent: await N("7301:59351") };
const setT = async (n, layer, chars) => { const t = n.findOne((x) => x.type === "TEXT" && x.name === layer); for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
const filled = async (src, parent, value) => { const c = src.clone(); parent.appendChild(c); c.layoutSizingHorizontal = "FILL"; c.setProperties({ State: "Filled" }); await setT(c, "Text", value); return c; };
const sec = await N("7476:5436");
const v = sec.children.find((c) => c.name === "State=Details provided");
const sellers = v.findOne((n) => n.name === "Sellers");
for (const n of [...sellers.children]) if (n.name === "Edit phone" || n.name === "Separator") n.remove();
const form = v.findOne((n) => n.name === "Form");
if (!form.findOne((n) => n.name === "Fields")) {
  const rows = frame("Fields", "VERTICAL", form); form.insertChild(0, rows); rows.layoutSizingHorizontal = "FILL"; await gap(rows, SP[12]);
  const r1 = frame("Row 1", "HORIZONTAL", rows); r1.layoutSizingHorizontal = "FILL"; await gap(r1, SP[12]);
  await filled(PARTS.phone, r1, "9711663070"); await filled(PARTS.name, r1, "Rohit Mehra");
  const r2 = frame("Row 2", "HORIZONTAL", rows); r2.layoutSizingHorizontal = "FILL"; await gap(r2, SP[12]);
  await filled(PARTS.email, r2, "rohit.mehra@gmail.com");
  const sp = frame("Spacer", "HORIZONTAL", r2); sp.resize(1, 1); sp.layoutSizingHorizontal = "FILL"; sp.layoutSizingVertical = "FIXED";
  const cons = PARTS.consent.clone(); form.insertChild(1, cons); cons.layoutSizingHorizontal = "FILL";
}
let y = 40; for (const c of sec.children) { c.y = y; y += c.height + 40; } sec.resize(sec.width, y);
out.heights = sec.children.map((c) => `${c.name} ${Math.round(c.height)}`);
const rent = (await N("7293:25390")).children.find((c) => c.name === "Type=Rent"); out.rent = Math.round(rent.height);
dropProbe();
return JSON.stringify(out);
