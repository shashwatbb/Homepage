// Final audit of the CRF desktop RFE page layout: screen sizes, centring, pill alignment, even spacing, overlaps,
// header/strip span, section margins, notes, stray layers.
// run: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/audit-crf-dweb-rfe.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
const s = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const issues = []; const r = (n) => Math.round(n);
const kids = s.children;
const screens = kids.filter((n) => n.type === "FRAME" || (n.type === "INSTANCE" && /^(Full length|Seller: )/.test(n.name)));
const pills = kids.filter((n) => n.name === "Page kit" && r(n.height) === 60);
const wide = kids.filter((n) => n.name === "Page kit" && r(n.height) !== 60);
// rows by y
const rows = [...new Set(screens.map((n) => r(n.y)))].sort((a, b) => a - b).map((y) => screens.filter((n) => r(n.y) === y).sort((a, b) => a.x - b.x));
for (const fr of screens.filter((n) => n.type === "FRAME")) {
  if (r(fr.width) !== 1280 || r(fr.height) !== 800) issues.push("frame size " + fr.name + " " + r(fr.width) + "x" + r(fr.height));
  const m = fr.children.find((n) => n.type === "INSTANCE" && /CRF revamp \/ (Modal|Post CRF)$/.test(n.name));
  if (!m) { issues.push("no modal in " + fr.name); continue; }
  if (Math.abs(m.x + m.width / 2 - 640) > 1) issues.push("modal not centred x " + fr.name);
  if (Math.abs(m.y + m.height / 2 - 400) > 1) issues.push("modal not centred y " + fr.name);
  if (m.y < 0 || m.y + m.height > 800) issues.push("modal crosses frame " + fr.name);
  const bg = fr.children.find((n) => n.name === "Web / Homepage / NP / PDP"); if (!bg || r(bg.width) !== 1280 || r(bg.x) !== 0 || r(bg.y) !== 0) issues.push("backdrop " + fr.name);
  const ov = fr.children.find((n) => n.name === "Overlay"); if (!ov || r(ov.width) !== 1280 || r(ov.height) !== 800) issues.push("overlay " + fr.name);
  const extra = fr.children.filter((n) => !["Web / Homepage / NP / PDP", "Overlay", "Bottom fade", "Scrollbar", "Snackbar"].includes(n.name) && n !== m);
  if (extra.length) issues.push("stray layers in " + fr.name + ": " + extra.map((n) => n.name).join(","));
  const full = r((await m.getMainComponentAsync()).height); const scrolls = full > r(m.height);
  const hasFade = !!fr.children.find((n) => n.name === "Bottom fade"), hasBar = !!fr.children.find((n) => n.name === "Scrollbar");
  if (scrolls !== hasFade || scrolls !== hasBar) issues.push("scroll treatment mismatch " + fr.name);
}
// slots: each item (screen frame or bare component) has a pill on its left edge, same width, pill text = item name;
// next item starts 150 after the previous one's right edge (screens step 1430, bare components pack left)
for (const row of rows) {
  row.forEach((sc, i) => {
    const slotX = sc.x;
    if (i && Math.abs(sc.x - (row[i - 1].x + row[i - 1].width + 150)) > 1) issues.push("uneven slot " + sc.name);
    const pill = pills.find((p) => Math.abs(p.x - slotX) < 2 && p.y < sc.y && sc.y - p.y < 140);
    if (!pill) issues.push("no pill for " + sc.name);
    else { const t = pill.findOne((n) => n.type === "TEXT" && n.name === "Flow/states"); if (t && t.characters !== sc.name) issues.push("pill text " + t.characters + " vs " + sc.name); if (r(pill.width) !== r(sc.width)) issues.push("pill width " + sc.name); if (r(sc.y - pill.y) !== 117) issues.push("pill gap " + sc.name + " " + r(sc.y - pill.y)); }
  });
}
// overlaps between top-level items
for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) { const a = kids[i], b = kids[j];
  if (a.x < b.x + b.width - 1 && b.x < a.x + a.width - 1 && a.y < b.y + b.height - 1 && b.y < a.y + a.height - 1) issues.push("overlap " + a.name + " / " + b.name); }
// header + strips span first..last screen slot
const left = Math.min(...screens.map((n) => n.x));
const right = Math.max(...screens.map((n) => n.x + n.width));
for (const w of wide) if (Math.abs(w.x - left) > 1 || Math.abs(w.x + w.width - right) > 1) issues.push("span " + w.findOne((n) => n.type === "TEXT").characters.slice(0, 30) + " x" + r(w.x) + " w" + r(w.width) + " (want " + r(left) + "-" + r(right) + ")");
if (Math.abs(s.width - (right + 101)) > 1) issues.push("section width " + r(s.width) + " want " + r(right + 101));
const bottom = Math.max(...kids.map((n) => n.y + n.height)); if (Math.abs(s.height - (bottom + 100)) > 1) issues.push("section height " + r(s.height) + " want " + r(bottom + 100));
const notes = s.findAll((n) => "annotations" in n && n.annotations.length).reduce((a, n) => a + n.annotations.length, 0);
return JSON.stringify({ screens: screens.length, rows: rows.map((rw) => rw.length), pills: pills.length, notes, issues }, null, 1);
