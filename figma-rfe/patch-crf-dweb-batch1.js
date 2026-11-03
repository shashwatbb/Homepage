// Feedback batch 1 (2026-11-02), in place on "Dweb / CRF revamp / Modal" (variant ids kept).
// 1 error copy | 2 dropdown spacing + scrollbar + bottom fade | 4 minimal edit pattern (underlined number + pencil)
// 5 Google button radius m | 6 call option = m-web row | 7 no seal icons in Google-filled inputs | 8 no Google note
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-batch1.js

const set = await figma.getNodeByIdAsync("7293:23739");
const V_ = (name) => set.children.find((c) => c.name === name);
const loadAll = async (t) => Promise.all(t.getRangeAllFontNames(0, t.characters.length).map((f) => figma.loadFontAsync(f)));
const prop = (inst, prefix) => Object.keys(inst.componentProperties).find((k) => k.startsWith(prefix));
const out = [];

// 1. phone error copy
{ const i = V_("Step=Phone: Error").findOne((n) => n.type === "INSTANCE" && n.name === "Phone number"); await setInstanceText(i, "Supporting Text", "Enter a valid phone number"); out.push("1 ok"); }

// 2. country dropdown: roomier 40 rows, fixed height list that scrolls, NP scrollbar + bottom fade
{
  const v = V_("Step=Phone: Country code"); const dd = v.findOne((n) => n.name === "Country code dropdown");
  const flagSet = await figma.importComponentSetByKeyAsync("7256f7ba82f41643a455c096877d38e48b5d2056");
  for (const [name, code] of [["Canada", "+1"], ["Germany", "+49"]]) {
    await divider_(dd);
    const r = fillW(frame(name, "HORIZONTAL", dd)); r.counterAxisAlignItems = "CENTER"; await gap(r, "xs");
    const f = flagSet.children.find((c) => c.name === `Country=${name}`).createInstance(); r.appendChild(f); f.resize(18, 12);
    (await text("Country", name, "Web/Body/small_regular", "text/primary", r)).layoutSizingHorizontal = "FILL";
    await text("Code", code, "Web/Body/small_regular", "text/muted", r);
  }
  for (const r of dd.children.filter((n) => n.type === "FRAME" && n.name !== "Line")) {
    r.layoutSizingVertical = "FIXED"; r.resize(r.width, 40); await pad(r, "none", "xs"); await rad(r, "s");
  }
  dd.layoutSizingVertical = "FIXED"; dd.resize(280, 236); dd.clipsContent = true;
  for (const t of dd.findAll((n) => n.type === "TEXT" && n.name === "Country")) { t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT"; t.textTruncation = "ENDING"; t.maxLines = 1; }
  for (const n of dd.children.filter((n) => n.name === "Scrollbar" || n.name === "Bottom fade")) n.remove();
  const fade = figma.createRectangle(); fade.name = "Bottom fade"; dd.appendChild(fade); fade.layoutPositioning = "ABSOLUTE";
  fade.resize(dd.width - 2, 48); fade.x = 1; fade.y = dd.height - 49;
  fade.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 1, color: { r: 1, g: 1, b: 1, a: 0.95 } }] }];
  for (const k of ["bottomLeftRadius", "bottomRightRadius"]) fade.setBoundVariable(k, await V("radius", "l"));
  const bar = figma.createRectangle(); bar.name = "Scrollbar"; dd.appendChild(bar); bar.layoutPositioning = "ABSOLUTE";
  bar.resize(4, 88); bar.x = dd.width - 8; bar.y = 16; await fill(bar, "border/default");
  for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) bar.setBoundVariable(k, await V("radius", "full"));
  out.push("2 ok rows " + dd.children.filter((n) => n.type === "FRAME" && n.name !== "Line").length);
}
async function divider_(parent) { const d = frame("Line", "HORIZONTAL", parent); fixedSize(d, null, 1); d.layoutSizingHorizontal = "FILL"; await fill(d, "border/subtle"); await rad(d, "full"); }

// 4. minimal edit pattern: "OTP sent to" + underlined number + pencil; details: underlined number + pencil
async function editRow(row, lead) {
  for (const c of [...row.children]) c.remove();
  row.counterAxisAlignItems = "CENTER"; await gap(row, "xs");
  if (lead) await text("Copy", lead, "Web/Body/small_regular", "text/secondary", row);
  const num = await text("Number", "+91 9711663070", "Web/Body/small_regular", "text/secondary", row);
  num.textDecoration = "UNDERLINE";
  await icon("PencilSimple", 16, "icon/grey_3", row);
}
for (const v of set.children) {
  const sent = v.findOne((n) => n.name === "Sent to" && n.type === "FRAME"); if (sent) await editRow(sent, "OTP sent to");
  const ed = v.findOne((n) => n.name === "Edit phone" && n.type === "FRAME"); if (ed) await editRow(ed, null);
}
out.push("4 ok");

// 5. Google button: rounded rectangle (radius m), not a pill
for (const g of set.findAll((n) => n.name === "Google button" && n.type === "FRAME")) await rad(g, "m");
out.push("5 ok");

// 6. call option = m-web row: icon tile + "Send OTP on call" (call underlined), no card, no chevron, no title
{
  const alts = V_("Step=OTP: Resend options").findOne((n) => n.name === "Other ways");
  for (const c of [...alts.children]) c.remove();
  const r = fillW(frame("Call", "HORIZONTAL", alts)); r.counterAxisAlignItems = "CENTER"; await gap(r, "s");
  const tile = frame("Icon", "HORIZONTAL", r); fixedSize(tile, 36, 36); tile.primaryAxisAlignItems = "CENTER"; tile.counterAxisAlignItems = "CENTER";
  await rad(tile, "s"); await fill(tile, "surface/default"); await icon("Phone", 20, "icon/grey_1", tile);
  const t = await text("Label", "Send OTP on call", "Web/Body/small_regular", "text/primary", r);
  t.setRangeTextDecoration(t.characters.length - 4, t.characters.length, "UNDERLINE");
  out.push("6 ok");
}

// 7. no seal icon in Google-filled inputs; 8. no "filled from Google" note
{
  const v = V_("Step=Details: Google filled");
  for (const i of v.findAll((n) => n.type === "INSTANCE" && prop(n, "Show Trailing Icon#"))) i.setProperties({ [prop(i, "Show Trailing Icon#")]: false });
  const note = v.findOne((n) => n.name === "Google note"); if (note) note.remove();
  out.push("7 8 ok");
}
dropProbe();
return out.join(" | ");
