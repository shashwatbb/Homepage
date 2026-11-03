// In-place patch: mobile CRF "Never pay" card + sellers card with "View more / View less" bar, in Bricks tokens (14px floor).
// Adds 2 kit components, swaps them into the existing Post CRF variants (variant ids kept, RFE instances update on accept).
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-mobile-parts.js

const SECTION = "7293:22853", POST = "7293:25390", CW = 432;
const SHIELD = "b759fae727bb93305130e95cc22c9cd59448b102"; // shield image from m-web Post CRF "card-product"
const section = await figma.getNodeByIdAsync(SECTION), post = await figma.getNodeByIdAsync(POST);
const comp = (f, name, desc) => { const c = figma.createComponentFromNode(f); c.name = name; if (desc) c.description = desc; return c; };
for (const n of section.children.filter((n) => /CRF revamp \/ (Safety note|View more)$/.test(n.name))) n.remove();

// 1. Safety note (m-web card-product): white card r12, border, pad 16, gap 8, 20 shield image + muted copy
const sf = frame("Dweb / CRF revamp / Safety note", "HORIZONTAL", section);
fixedSize(sf, CW, null); sf.layoutSizingVertical = "HUG"; sf.counterAxisAlignItems = "CENTER";
await pad(sf, "m"); await gap(sf, "xs"); await rad(sf, "m"); await fill(sf, "surface/white"); await stroke(sf, "border/subtle");
const img = frame("Shield", "HORIZONTAL", sf); fixedSize(img, 20, 20); img.fills = [{ type: "IMAGE", imageHash: SHIELD, scaleMode: "FIT" }];
const st = await text("Copy", "Never pay before a visit or signed agreement", "Web/Body/small_regular", "text/muted", sf);
st.layoutSizingHorizontal = "FILL"; st.textAutoResize = "HEIGHT";
const safety = comp(sf, "Dweb / CRF revamp / Safety note", "m-web CRF safety card in Bricks tokens. Shield image is the m-web asset.");

// 2. View more bar (m-web sellers card footer): full card width, surface/subtle, top divider, bottom radius l, centred label + caret
async function vm(state) {
  const f = frame(`State=${state}`, "HORIZONTAL", section);
  fixedSize(f, CW, 40); f.primaryAxisAlignItems = "CENTER"; f.counterAxisAlignItems = "CENTER";
  await gap(f, "2xs"); await fill(f, "surface/subtle"); await stroke(f, "border/subtle", "t");
  for (const k of ["bottomLeftRadius", "bottomRightRadius"]) f.setBoundVariable(k, await V("radius", "l"));
  await text("Label", state === "Collapsed" ? "View 2 more sellers" : "View less sellers", "Web/Body/small_medium", "text/secondary", f);
  const ic = await icon(state === "Collapsed" ? "CaretDown" : "CaretUp", 16, "icon/grey_4", f);
  for (const v of ic.findAll((x) => x.type === "VECTOR" && x.strokes.length)) v.strokeWeight = 1.5;
  return comp(f, `State=${state}`);
}
const vmSet = figma.combineAsVariants([await vm("Collapsed"), await vm("Expanded")], section);
vmSet.name = "Dweb / CRF revamp / View more";
vmSet.description = "Footer bar of the sellers card (m-web pattern). Click toggles the rest of the sellers in place.";
let x = 40; for (const c of vmSet.children) { c.x = x; c.y = 40; x += c.width + 40; } vmSet.resizeWithoutConstraints(x, 120);
await stroke(vmSet, "border/brand"); vmSet.dashPattern = [10, 5]; await rad(vmSet, "l"); await fill(vmSet, "surface/white");

// place next to the atoms row
const atomsBottom = 100, right = Math.max(...section.children.filter((n) => n.y < 400 && n !== safety && n !== vmSet).map((n) => n.x + n.width));
safety.x = right + 80; safety.y = atomsBottom; vmSet.x = safety.x + safety.width + 80; vmSet.y = atomsBottom;
section.resizeWithoutConstraints(Math.max(section.width, vmSet.x + vmSet.width + 100), section.height);

// 3. patch Post CRF variants in place
const out = [];
for (const v of post.children) {
  const body = v.findChild((n) => n.name === "Body");
  // safety line -> Safety note card
  const footer = body.findChild((n) => n.name === "Footer");
  const old = footer && footer.findChild((n) => n.name === "Safety");
  if (old) { const i = footer.children.indexOf(old); old.remove(); const s = safety.createInstance(); footer.insertChild(i, s); s.layoutSizingHorizontal = "FILL"; }
  // sellers list -> bordered card, rows padded, View more bar attached at the bottom
  const contacts = body.findChild((n) => n.name === "Contacts");
  if (contacts) {
    await gap(contacts, "s");
    const list = contacts.findChild((n) => n.name === "List");
    const rows = frame("Rows", "VERTICAL", null); list.insertChild(0, rows); rows.layoutSizingHorizontal = "FILL"; await pad(rows, "none", "m");
    for (const c of [...list.children].filter((c) => c !== rows)) rows.appendChild(c);
    await stroke(list, "border/subtle"); await rad(list, "l"); await fill(list, "surface/white"); list.clipsContent = true;
    const btn = contacts.findChild((n) => /^Show (2 more sellers|less) Button$/.test(n.name));
    if (btn) {
      const expanded = /less/.test(btn.name); btn.remove();
      const bar = variant(vmSet, `State=${expanded ? "Expanded" : "Collapsed"}`).createInstance(); list.appendChild(bar); bar.layoutSizingHorizontal = "FILL";
    }
  }
  out.push(v.name + ": safety " + Boolean(old) + ", contacts " + Boolean(contacts));
}
dropProbe();
return { safety: safety.id, viewMore: vmSet.id, variants: out };
