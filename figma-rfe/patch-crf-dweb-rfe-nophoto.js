// RFE: bare "Seller: No photo" case in the Full length row (slot 7). Replay after build-crf-dweb.js.
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/patch-crf-dweb-rfe-nophoto.js
const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop"); await page.loadAsync();
await figma.setCurrentPageAsync(page);
const sec = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const NAME = "Seller: No photo";
for (const n of sec.children.filter((n) => n.name === NAME || (n.name === "Page kit" && n.x === 8681 && n.y === 3267))) n.remove();
const src = sec.children.find((n) => n.name === "Page kit" && n.x === 7251 && n.y === 3267);
const pill = src.clone(); sec.appendChild(pill); pill.x = 8681; pill.y = 3267;
const t = pill.findAll((n) => n.type === "TEXT").find((n) => n.characters.startsWith("Full length"));
await figma.loadFontAsync(t.fontName); t.characters = NAME;
const comp = await figma.importComponentByKeyAsync("a1bf5332b95afe83e172b34cb72014f247288ebc");
const inst = comp.createInstance(); sec.appendChild(inst); inst.name = NAME;
inst.x = 8681 + (1280 - inst.width) / 2; inst.y = 3384;
return JSON.stringify({ pill: [pill.x, pill.y, t.characters], inst: [inst.x, inst.y, inst.width, inst.height], sec: [sec.width, sec.height] });
