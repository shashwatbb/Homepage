// Feedback batch 1, RFE side (no redraw): 3 PDP backdrop at NP resolution (instance resized to 1280x800, like NP frames);
// 9 every screen frame fixed 800; full-length post CRF = bare modal instance (no PDP/overlay) in its own slot.
// run: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/patch-crf-dweb-rfe-batch1.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync(); await figma.setCurrentPageAsync(page);
const section = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const out = []; let bgs = 0, bare = 0;
for (const fr of section.children.filter((n) => n.type === "FRAME")) {
  const bg = fr.children.find((n) => n.type === "INSTANCE" && n.name === "Web / Homepage / NP / PDP");
  if (/^Full screen/.test(fr.name)) {
    const m = fr.children.find((n) => n.type === "INSTANCE" && /CRF revamp \/ Post CRF$/.test(n.name));
    const name = fr.name.replace("Full screen", "Full length");
    section.appendChild(m); m.name = name;
    m.x = fr.x + Math.round((1280 - m.width) / 2); m.y = fr.y;
    const pill = section.children.find((n) => n.name === "Page kit" && Math.abs(n.x - fr.x) < 2 && n.y < fr.y && n.y > fr.y - 200);
    if (pill) await setInstanceText(pill, "Flow/states", name);
    fr.remove(); bare++; continue;
  }
  if (bg) { bg.resize(1280, (await bg.getMainComponentAsync()).height); bg.x = 0; bg.y = 0; bgs++; } // width only: keeps the first fold on top
  fr.resize(1280, 800);
}
// row strip copy
for (const s of section.children.filter((n) => n.name === "Page kit")) {
  const t = s.findOne((n) => n.type === "TEXT" && /full screen/.test(n.characters));
  if (t) await setInstanceText(s, "Information strip", "Desktop web: Post CRF full length (modal content only, not a screen)");
}
const bottom = Math.max(...section.children.map((n) => n.y + n.height)); section.resizeWithoutConstraints(section.width, bottom + 100);
dropProbe();
return `backdrops resized ${bgs}, full-length bare modals ${bare}, frames >800: ${section.children.filter((n) => n.type === "FRAME" && n.height > 800).length}`;
