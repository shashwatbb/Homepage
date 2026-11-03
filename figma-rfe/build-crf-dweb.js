// After this builder, replay patch-crf-dweb-rfe-nophoto.js then patch-crf-dweb-rfe-fulllength.js (bare row packed left).
// RFE page: CRF revamp, Desktop web (CRF [Demand] file, under "Design Draft").
// Every screen = NP PDP desktop page + Overlay (Desktop) + a kit instance of
// "Dweb / CRF revamp / Modal" or "Dweb / CRF revamp / Post CRF" (built by kit-crf-dweb.js, published).
// run: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/build-crf-dweb.js

const PAGE_NAME = "      ↳ CRF: Desktop";
const AFTER_PAGE = "6001:16504";   // "↳ CRF: mweb" (Design Draft)
const SECTION_NAME = "RFE: Desktop web CRF revamp";
const MODAL_SET = "742db484be9bc3d115252701d887964a106472c4";
const POST_SET = "b1a1e60d4ef4f00542c458b252556e50dbce374a";
const PDP_PAGE = "0919f3a70fe22e6c5c6ecc8d48560fe5135057c8";  // Web / Homepage / NP / PDP
const OVERLAY_SET = "21be53303048d321068d3304cff7401b02749ba4";
const SNACKBAR_SET = "0ade9f01839f65cde243da2302edb6a597e7d474"; // Bricks Snackbar
const SW = 1280, SH = 800, STEP = 1430, X0 = 101;

const ROWS = [
  { strip: "Desktop web: Buy (Phone, Details, OTP, Post CRF)", screens: [
    ["Step 1: Phone", "m", "Step=Phone"],
    ["Step 1: Invalid number", "m", "Step=Phone: Error"],
    ["Step 1: Country code", "m", "Step=Phone: Country code"],
    ["Step 2: Your details", "m", "Step=Details"],
    ["Step 2: Filled with Google", "m", "Step=Details: Google filled"],
    ["Step 2: Invalid email", "m", "Step=Details: Error"],
    ["OTP: Enter OTP", "m", "Step=OTP"],
    ["OTP: Resend options", "m", "Step=OTP: Resend options"],
    ["OTP: Incorrect OTP", "m", "Step=OTP: Incorrect"],
    ["OTP: Auto submit", "m", "Step=OTP: Verifying"],
    ["Connecting to sellers", "m", "Step=Connecting"],
    ["Post CRF: Single seller", "p", "Type=Buy: Single seller"],
    ["Post CRF: Multiple sellers", "p", "Type=Buy: Multiple sellers"],
    ["Post CRF: All sellers", "p", "Type=Buy: All sellers"],
    ["Post CRF: Limit reached", "p", "Type=Buy: Limit reached"],
  ] },
  { strip: "Desktop web: Rent (Phone, OTP, Post CRF; details skipped)", screens: [
    ["Step 1: Phone", "m", "Step=Phone"],
    ["OTP: Enter OTP", "m", "Step=OTP"],
    ["OTP: Auto submit", "m", "Step=OTP: Verifying"],
    ["Connecting to owners", "m", "Step=Connecting"],
    ["Post CRF: Rent", "p", "Type=Rent"],
    ["Post CRF: Multi-connect", "p", "Type=Rent: Multi-connect"],
  ] },
  { strip: "Desktop web: Post CRF full length (modal content only, not a screen)", screens: [
    ["Full length: Single seller", "full", "Type=Buy: Single seller"],
    ["Full length: Multiple sellers", "full", "Type=Buy: Multiple sellers"],
    ["Full length: All sellers", "full", "Type=Buy: All sellers"],
    ["Full length: Limit reached", "full", "Type=Buy: Limit reached"],
    ["Full length: Rent", "full", "Type=Rent"],
    ["Full length: Multi-connect", "full", "Type=Rent: Multi-connect"],
  ] },
];

// page (reuse if present)
let page = figma.root.children.find((p) => p.name === PAGE_NAME);
if (!page) {
  const after = await figma.getNodeByIdAsync(AFTER_PAGE);
  page = figma.createPage(); page.name = PAGE_NAME;
  figma.root.insertChild(figma.root.children.indexOf(after) + 1, page);
  page.backgrounds = JSON.parse(JSON.stringify(after.backgrounds));
}
await figma.setCurrentPageAsync(page);
for (const n of page.children.filter((n) => n.name === SECTION_NAME)) n.remove();

const [modalSet, postSet, pkSet, ovSet, snackSet] = await Promise.all([
  figma.importComponentSetByKeyAsync(MODAL_SET), figma.importComponentSetByKeyAsync(POST_SET),
  figma.importComponentSetByKeyAsync(PAGE_KIT_SET), figma.importComponentSetByKeyAsync(OVERLAY_SET), figma.importComponentSetByKeyAsync(SNACKBAR_SET)]);
const pdp = await figma.importComponentByKeyAsync(PDP_PAGE);

const section = figma.createSection(); section.name = SECTION_NAME; page.appendChild(section);
await fill(section, "surface/white");
try { section.cornerRadius = 100; } catch (e) {}

async function pk(type, txt, x, y, w) {
  const i = variant(pkSet, `Type=${type}`).createInstance(); section.appendChild(i);
  i.x = x; i.y = y; if (w) i.resize(w, i.height);
  if (txt) for (const [layer, chars] of Object.entries(txt)) await setInstanceText(i, layer, chars);
  return i;
}

const out = { screens: {} };
let y = 100;
const lastRight = Math.max(...ROWS.map((r) => X0 + (r.screens.length - 1) * STEP + SW));
// Design Draft page: header is Type=In review (switch to "Ready" only when moved to the RFE / tech hand-over section)
await pk("In review", {}, X0, y, lastRight - X0);
y = 361;
for (const row of ROWS) {
  await pk("Info strip", { "Information strip": row.strip }, X0, y, lastRight - X0);
  const pillY = y + 224, scrY = y + 341;
  let rowBottom = 0;
  for (const [i, [name, kind, v, toast]] of row.screens.entries()) {
    const x = X0 + i * STEP;
    await pk("Flow small", { "Flow/states": name }, x, pillY, SW);
    let screen;
    if (kind === "full") {
      // full length: the bare Post CRF modal only (no PDP/overlay), so devs read it as scroll content, not a screen
      screen = variant(postSet, v).createInstance(); section.appendChild(screen);
      screen.x = x + Math.round((SW - screen.width) / 2); screen.y = scrY;
    } else {
      screen = figma.createFrame(); screen.name = name; section.appendChild(screen);
      screen.resize(SW, SH); screen.x = x; screen.y = scrY; screen.clipsContent = true; screen.fills = [];
      const bg = pdp.createInstance(); screen.appendChild(bg); bg.resize(SW, bg.height); bg.x = 0; bg.y = 0; // 1512 page -> 1280 wide (header reflows), natural height, frame crops at 800
      const ov = variant(ovSet, "Device=Desktop").createInstance(); screen.appendChild(ov); ov.resize(SW, SH); ov.x = 0; ov.y = 0;
      const m = variant(kind === "p" ? postSet : modalSet, v).createInstance(); screen.appendChild(m);
      // max height min(720, viewport): header fixed, body scrolls
      m.x = Math.round((SW - m.width) / 2);
      const full = m.height;
      if (kind === "p" && full > 720) m.resize(m.width, 720);
      m.y = Math.round((SH - m.height) / 2);
      if (full > m.height) {
        // bottom edge fade (NP PDP scroll style): the inner shadow sits under the children, so draw it explicitly on top
        const fade = figma.createRectangle(); fade.name = "Bottom fade"; screen.appendChild(fade);
        fade.resize(m.width - 2, 64); fade.x = m.x + 1; fade.y = m.y + m.height - 65;
        fade.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 1, color: { r: 1, g: 1, b: 1, a: 0.95 } }] }];
        for (const k of ["bottomLeftRadius", "bottomRightRadius"]) fade.setBoundVariable(k, await V("radius", "2xl"));
        // NP PDP scrollbar: 4 wide, full radius, border/default, 6 from the right edge, starts 32 below the 70 header, length = visible share
        const track = m.height - 70 - 64, bar = figma.createRectangle(); bar.name = "Scrollbar"; screen.appendChild(bar);
        bar.resize(4, Math.round(track * (m.height - 70) / (full - 70)));
        bar.x = m.x + m.width - 10; bar.y = m.y + 70 + 32;
        await fill(bar, "border/default"); bar.setBoundVariable("topLeftRadius", await V("radius", "full")); for (const k of ["topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) bar.setBoundVariable(k, await V("radius", "full"));
      }
      m.x = Math.round((SW - m.width) / 2);
    }
    if (toast) {
      const sb = variant(snackSet, "Property 1=One liner, Type=Web").createInstance(); screen.appendChild(sb);
      const p = {}; for (const k of Object.keys(sb.componentProperties)) { if (k.startsWith("Show button#")) p[k] = false; if (k.startsWith("Show X#")) p[k] = false; }
      sb.setProperties(p); await setInstanceText(sb, "Label", toast); sb.name = "Snackbar";
      sb.x = 40; sb.y = SH - sb.height - 40;
    }
    screen.name = name;
    out.screens[row.strip.split(" (")[0] + " / " + name] = screen.id;
    rowBottom = Math.max(rowBottom, screen.y + screen.height);
  }
  y = rowBottom + 200;
}
section.resizeWithoutConstraints(lastRight + 101, y - 200 + 100);
dropProbe();
out.page = page.id; out.section = section.id; out.size = `${Math.round(section.width)}x${Math.round(section.height)}`;
return out;
