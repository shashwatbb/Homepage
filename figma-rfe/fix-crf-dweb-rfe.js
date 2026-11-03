// RFE fix-up after kit updates change modal heights (no redraw): re-centre modals, clip post CRF at 720,
// refresh bottom fade + scrollbar, grow full-screen frames to fit. Run after accept-updates.
// run: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/fix-crf-dweb-rfe.js

const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop");
await page.loadAsync(); await figma.setCurrentPageAsync(page);
const section = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const SW = 1280, SH = 800, MAXH = 720;
const out = [];
for (const screen of section.children.filter((n) => n.type === "FRAME")) {
  const m = screen.findChild((n) => n.type === "INSTANCE" && /CRF revamp \/ (Modal|Post CRF)$/.test(n.name));
  if (!m) continue;
  const main = await m.getMainComponentAsync(); const full = Math.round(main.height);
  for (const n of screen.children.filter((n) => n.name === "Bottom fade" || n.name === "Scrollbar")) n.remove();
  const ov = screen.findChild((n) => n.name === "Overlay");
  {
    const isPost = /Post CRF$/.test(m.name);
    m.resize(m.width, isPost ? Math.min(full, MAXH) : full);
    m.x = Math.round((SW - m.width) / 2); m.y = Math.round((SH - m.height) / 2);
    if (full > m.height) {
      const fade = figma.createRectangle(); fade.name = "Bottom fade"; screen.appendChild(fade);
      fade.resize(m.width - 2, 64); fade.x = m.x + 1; fade.y = m.y + m.height - 65;
      fade.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 1, color: { r: 1, g: 1, b: 1, a: 0.95 } }] }];
      for (const k of ["bottomLeftRadius", "bottomRightRadius"]) fade.setBoundVariable(k, await V("radius", "2xl"));
      const track = m.height - 70 - 64, bar = figma.createRectangle(); bar.name = "Scrollbar"; screen.appendChild(bar);
      bar.resize(4, Math.round(track * (m.height - 70) / (full - 70))); bar.x = m.x + m.width - 10; bar.y = m.y + 70 + 32;
      await fill(bar, "border/default"); for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) bar.setBoundVariable(k, await V("radius", "full"));
    }
    const sb = screen.findChild((n) => n.name === "Snackbar"); if (sb) screen.appendChild(sb);
  }
  out.push(screen.name + " " + full + (full > m.height ? " scroll" : ""));
}
// full-length views are bare modal instances (no PDP/overlay): keep them at full content height
for (const m of section.children.filter((n) => n.type === "INSTANCE" && /^Full length/.test(n.name))) {
  const main = await m.getMainComponentAsync(); m.resize(m.width, Math.round(main.height)); out.push(m.name + " " + Math.round(main.height));
}
// keep the section hugging its lowest screen
const bottom = Math.max(...section.children.map((n) => n.y + n.height));
section.resizeWithoutConstraints(section.width, bottom + 100);
dropProbe();
return out.filter((l) => /scroll|Full length/.test(l)).join("\n");
