// After kit content grows (2026-11-11 WhatsApp CTA / OTP row): screens whose modal instance is shorter than its main
// component and fits in 720 get resized to the natural height and re-centred, so nothing is clipped.
// Lives on "↳ Global" / section "CRF:" since 2026-11-11 (section kept at 0,0).
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/fix-crf-dweb-rfe-modal-heights.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ Global"); await page.loadAsync(); await figma.setCurrentPageAsync(page);
const s = page.children.find((n) => n.type === "SECTION" && n.name === "CRF:"); // desktop rows = D-Web block of the shared CRF: section
const out = [];
for (const fr of s.children.filter((n) => n.type === "FRAME")) {
  const m = fr.children.find((n) => n.type === "INSTANCE" && /CRF revamp \/ Modal$/.test(n.name)); if (!m) continue;
  const full = (await m.getMainComponentAsync()).height;
  if (Math.round(full) > Math.round(m.height) && full <= 720) {
    m.resize(m.width, full); m.y = Math.round(400 - full / 2);
    out.push(`${fr.name} ${Math.round(full)}`);
  }
}
return out.join(" | ");
