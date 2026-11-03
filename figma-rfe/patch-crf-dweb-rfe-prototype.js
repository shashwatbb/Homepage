// RFE: Page kit Type=Prototype strip under the last row, linking the live desktop prototype (m-web RFE pattern).
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/patch-crf-dweb-rfe-prototype.js
const URL = "https://housing-homepage-preview.vercel.app/pdp.html";
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
await figma.setCurrentPageAsync(page);
const sec = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
for (const n of sec.children.filter((n) => n.name === "Page kit" && n.componentProperties?.Type?.value === "Prototype")) n.remove();
const strip = sec.children.find((n) => n.name === "Page kit" && n.componentProperties?.Type?.value === "Info strip");
const proto = strip.clone(); sec.appendChild(proto);
proto.setProperties({ Type: "Prototype" }); proto.resetOverrides?.();
const bottom = Math.max(...sec.children.filter((n) => n !== proto).map((n) => n.y + n.height));
proto.x = 101; proto.y = bottom + 100; proto.resize(strip.width, proto.height);
const texts = proto.findAll((n) => n.type === "TEXT" && n.visible);
for (const t of texts) {
  for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
  if (/click/i.test(t.characters)) t.hyperlink = { type: "URL", value: URL };
}
sec.resizeWithoutConstraints(sec.width, proto.y + proto.height + 100);
return JSON.stringify({ pos: [proto.x, proto.y, proto.width, proto.height], texts: texts.map((t) => [t.name, t.characters, t.hyperlink && t.hyperlink.value]), sec: [sec.width, sec.height] });
