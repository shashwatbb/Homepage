// CRF desktop kit (2026-11-11, PM comment #67 from Atul): Post CRF gets the m-web sections it was missing.
// m-web order (CRF file, Post CRF / Buy): Buyers also exploring, safety line, Smart deals for you, What to expect?
// New kit components (below Post CRF on the CRF/Dweb revamp section): Deal card, What to expect.
// Buy variants (Single, Multiple, All sellers) get Smart deals + What to expect; Rent variants get What to expect.
// Also swaps WhatsApp glyph instances off the orphan copy 7296:42626 onto the kit component 7297:44740.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-smart-deals.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const SP = { 0: "none", 2: "3xs", 4: "2xs", 8: "xs", 12: "s", 16: "m", 20: "l", 24: "xl", 32: "2xl" };
const RD = { 8: "s", 12: "m", 16: "l", 999: "full" };
const P = async (n, t, r, b, l) => pad(n, SP[t], r == null ? undefined : SP[r], b == null ? undefined : SP[b], l == null ? undefined : SP[l]);
const G = (n, px) => gap(n, SP[px]);
const Rr = (n, px) => rad(n, RD[px]);
const IMG = { cards: ["f2aaebfb74f964dc8a126fce31083651694f4fc4", "2685ddc988d578e81ef75fd0520662726c6d6e8d", "e55bf5ff4f733e3bdd4d4d82fb92d230d1d53669"],
  avatars: ["c50aecc3d639d993708863451867f2935a00537d", "151352e99c7213f43eef4a4f51f6e6083a8e5ab2", "7af26e679cca3364052f759dba663be3260729cd"] };
const photo = (name, hash, w, h, parent) => { const f = frame(name, "HORIZONTAL", parent); fixedSize(f, w, h); f.fills = [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }]; f.clipsContent = true; return f; };
const divider = async (parent, name = "Divider") => { const d = frame(name, "HORIZONTAL", parent); fixedSize(d, null, 1); d.layoutSizingHorizontal = "FILL"; await fill(d, "border/subtle"); await Rr(d, 999); return d; };
const sep = async (parent, len) => { const l = figma.createLine(); l.name = "Separator"; parent.appendChild(l); l.resize(len, 0); l.rotation = -90; l.strokes = [await paint("border/default")]; l.strokeWeight = 1; l.strokeCap = "ROUND"; return l; };
const sepRow = async (parent, name, parts) => { const r = frame(name, "HORIZONTAL", parent); r.counterAxisAlignItems = "CENTER"; await G(r, 8);
  for (const [i, [layer, chars]] of parts.entries()) { if (i) await sep(r, 14); await text(layer, chars, "Web/Body/small_regular", "text/secondary", r); } return r; };
const oneLine = (t) => { t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT"; t.textTruncation = "ENDING"; t.maxLines = 1; return t; };
const wrapT = (t) => { t.layoutSizingHorizontal = "FILL"; t.textAutoResize = "HEIGHT"; return t; };

const section = await figma.getNodeByIdAsync("7293:22853");
const waComp = await figma.getNodeByIdAsync("7297:44740");
const postSet = await figma.getNodeByIdAsync("7293:25390");

// 0. WhatsApp glyph: orphan -> kit component
{
  const orphan = await figma.getNodeByIdAsync("7296:42626"); let n = 0;
  if (orphan) for (const i of section.findAll((x) => x.type === "INSTANCE")) {
    if (i.name === "WhatsApp glyph" && (await i.getMainComponentAsync())?.id === orphan.id) { i.swapComponent(waComp); n++; }
    else if (i.name === "WhatsApp" && i.componentProperties) {
      const k = Object.keys(i.componentProperties).find((p) => p.startsWith("Icon#"));
      if (k && i.componentProperties[k].value === orphan.id) { i.setProperties({ [k]: waComp.id }); n++; }
    }
  }
  out.waSwapped = n;
}

// 1. Deal card component
const [btnSet, ibSet] = await Promise.all([figma.importComponentSetByKeyAsync("1cdd6502c90fd59d70b838a35fb444d63aef2d88"),
  figma.importComponentSetByKeyAsync("7a5e861c267757507c4c8d5f7c3682c6fcd09abd")]);
let deal = section.children.find((n) => n.name === "Dweb / CRF revamp / Deal card");
if (!deal) {
  const f = frame("Dweb / CRF revamp / Deal card", "VERTICAL", section); fixedSize(f, 430, null); f.primaryAxisSizingMode = "AUTO";
  await P(f, 16); await G(f, 16); await Rr(f, 16); await fill(f, "surface/white"); await stroke(f, "border/subtle"); f.clipsContent = true;
  const top = fillW(frame("Listing", "HORIZONTAL", f)); await G(top, 12);
  const ph = photo("Photo", IMG.cards[0], 96, 96, top); await Rr(ph, 12);
  const det = fillW(frame("Details", "VERTICAL", top)); await G(det, 4);
  oneLine(await text("Price", "₹1.62 - 1.94 Cr", "Web/Heading/h6_semibold", "text/primary", det));
  await sepRow(det, "Config", [["BHK", "2, 3 BHK"], ["Type", "Apartment"]]);
  oneLine(await text("Locality", "Sector 92, Gurgaon", "Web/Body/small_regular", "text/secondary", det));
  await sepRow(det, "Area", [["Size", "1,240 sq.ft."], ["Rate", "₹13.1K/sq.ft."]]);
  await divider(f);
  const bot = fillW(frame("Seller", "HORIZONTAL", f)); bot.counterAxisAlignItems = "CENTER"; await G(bot, 12);
  const av = photo("Avatar", IMG.avatars[0], 36, 36, bot); await Rr(av, 8); // seller photos: rounded square
  const col = fillW(frame("Name", "VERTICAL", bot)); await G(col, 2);
  oneLine(await text("Developer", "DLF Developers", "Web/Body/small_medium", "text/primary", col));
  oneLine(await text("Role", "Developer", "Web/Body/small_regular", "text/muted", col));
  const wa = ibSet.children.find((c) => c.name === "Variant=Secondary, Size=L, State=Default").createInstance(); wa.name = "WhatsApp"; bot.appendChild(wa);
  const k = Object.keys(wa.componentProperties).find((p) => p.startsWith("Icon#")); wa.setProperties({ [k]: waComp.id });
  await button(btnSet, "Contact", "Secondary", "M", bot);
  deal = figma.createComponentFromNode(f);
  deal.description = "Post CRF Smart deals row (m-web Smart deals for you card on desktop): photo, price range, config, locality, area and rate, developer, WhatsApp (WhatsApp web) + Contact (enquiry, no new form).";
}
// 2. What to expect component
let expect = section.children.find((n) => n.name === "Dweb / CRF revamp / What to expect");
if (!expect) {
  const f = frame("Dweb / CRF revamp / What to expect", "VERTICAL", section); fixedSize(f, 430, null); f.primaryAxisSizingMode = "AUTO";
  await P(f, 16); await G(f, 16); await Rr(f, 16); await fill(f, "surface/white"); await stroke(f, "border/subtle"); f.clipsContent = true;
  await text("Title", "What to expect?", "Web/Heading/h6_semibold", "text/primary", f);
  await divider(f);
  const rows = [["Call", "A seller or agent may contact you on call or WhatsApp"], ["Reach out", "You can also reach out to the sellers using the details above"]];
  for (const [i, [name, copy]] of rows.entries()) {
    if (i) await divider(f);
    const r = fillW(frame(name, "HORIZONTAL", f)); await G(r, 8);
    await icon("CheckCircle", 20, "semantic_icons/success", r);
    wrapT(await text("Copy", copy, "Web/Body/small_regular", "text/secondary", r));
  }
  expect = figma.createComponentFromNode(f);
  expect.description = "Post CRF What to expect (m-web What to expect? card on desktop). Static copy.";
}

// 3. Post CRF variants
const DEALS = [
  { img: 0, av: 0, price: "₹1.62 - 1.94 Cr", bhk: "2, 3 BHK", loc: "Sector 92, Gurgaon", size: "1,240 sq.ft.", rate: "₹13.1K/sq.ft.", dev: "DLF Developers" },
  { img: 1, av: 1, price: "₹2.10 - 2.48 Cr", bhk: "3 BHK", loc: "Sector 65, Gurgaon", size: "1,610 sq.ft.", rate: "₹13.4K/sq.ft.", dev: "M3M India" },
  { img: 2, av: 2, price: "₹98 L - 1.21 Cr", bhk: "2 BHK", loc: "Sohna Road, Gurgaon", size: "1,080 sq.ft.", rate: "₹9.1K/sq.ft.", dev: "Godrej Properties" }];
const setT = async (inst, layer, chars) => { const t = inst.findOne((n) => n.type === "TEXT" && n.name === layer); for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
out.variants = [];
for (const v of postSet.children) {
  const body = v.findOne((n) => n.name === "Body"); const isBuy = /^Type=Buy: (Single|Multiple|All)/.test(v.name), isRent = /^Type=Rent/.test(v.name);
  if (!isBuy && !isRent) continue;
  if (isBuy && !body.children.some((n) => n.name === "Smart deals")) {
    const sh = body.findOne((n) => n.name === "Similar homes");
    const sd = sh.clone(); sd.name = "Smart deals"; body.appendChild(sd); sd.layoutSizingHorizontal = "FILL";
    await setT(sd, "Title", "Smart deals for you");
    const cards = sd.findOne((n) => n.name === "Cards"); for (const c of [...cards.children]) c.remove();
    cards.layoutMode = "VERTICAL"; await G(cards, 12); cards.layoutSizingHorizontal = "FILL"; cards.layoutSizingVertical = "HUG";
    for (const d of DEALS) {
      const i = deal.createInstance(); cards.appendChild(i); i.layoutSizingHorizontal = "FILL";
      i.findOne((n) => n.name === "Photo").fills = [{ type: "IMAGE", imageHash: IMG.cards[d.img], scaleMode: "FILL" }];
      i.findOne((n) => n.name === "Avatar").fills = [{ type: "IMAGE", imageHash: IMG.avatars[d.av], scaleMode: "FILL" }];
      await setT(i, "Price", d.price); await setT(i, "BHK", d.bhk); await setT(i, "Locality", d.loc);
      await setT(i, "Size", d.size); await setT(i, "Rate", d.rate); await setT(i, "Developer", d.dev);
    }
  }
  const sdx = body.children.find((n) => n.name === "Smart deals");
  if (sdx) { const c = sdx.findOne((n) => n.name === "Cards"); c.layoutSizingVertical = "HUG"; sdx.layoutSizingVertical = "HUG"; }
  if (!body.children.some((n) => n.name === "What to expect")) {
    const e = expect.createInstance(); e.name = "What to expect"; body.appendChild(e); e.layoutSizingHorizontal = "FILL";
  }
  out.variants.push(`${v.name} ${Math.round(v.height)}`);
}

// 4. Kit hygiene: set hugs its variants, new parts sit below it, section grows
{
  const kids = postSet.children; const bottom = Math.max(...kids.map((c) => c.y + c.height));
  postSet.resize(postSet.width, Math.round(bottom + 40));
  const y = Math.round(postSet.y + postSet.height + 80);
  deal.x = 100; deal.y = y; expect.x = 100 + deal.width + 80; expect.y = y;
  const need = Math.max(deal.y + deal.height, expect.y + expect.height) + 100;
  if (section.height < need) section.resizeWithoutConstraints(section.width, need);
  const boxes = section.children.map((c) => [c.name, c.x, c.y, c.x + c.width, c.y + c.height]);
  const ov = []; for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
    const A = boxes[a], B = boxes[b]; if (A[1] < B[3] && B[1] < A[3] && A[2] < B[4] && B[2] < A[4]) ov.push(A[0] + " x " + B[0]); }
  const out_ = section.children.filter((c) => c.x < 0 || c.y < 0 || c.x + c.width > section.width || c.y + c.height > section.height).map((c) => c.name);
  out.layout = { set: `${Math.round(postSet.width)}x${Math.round(postSet.height)}`, deal: `${deal.id} ${Math.round(deal.width)}x${Math.round(deal.height)}`, expect: `${expect.id} ${Math.round(expect.width)}x${Math.round(expect.height)}`, section: `${Math.round(section.width)}x${Math.round(section.height)}`, overlaps: ov, outside: out_ };
}
out.audit = await audit(deal); out.audit2 = await audit(expect);
dropProbe();
return JSON.stringify(out, null, 1);
