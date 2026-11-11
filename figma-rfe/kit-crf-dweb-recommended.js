// CRF desktop kit (2026-11-11): Rent Post CRF gets m-web "Recommended properties" (m-web Post CRF / Rent order:
// Tenants also exploring, safety line, Recommended properties, What to expect?). Same Deal card list as Buy Smart deals,
// rent copy. Inserted right before What to expect in Type=Rent and Type=Rent: Multi-connect.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/kit-crf-dweb-recommended.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const postSet = await figma.getNodeByIdAsync("7293:25390"); const section = await figma.getNodeByIdAsync("7293:22853");
const src = postSet.children.find((v) => v.name === "Type=Buy: Single seller").findOne((n) => n.name === "Smart deals");
const IMG = ["2685ddc988d578e81ef75fd0520662726c6d6e8d", "e55bf5ff4f733e3bdd4d4d82fb92d230d1d53669", "f2aaebfb74f964dc8a126fce31083651694f4fc4"];
const AV = ["151352e99c7213f43eef4a4f51f6e6083a8e5ab2", "7af26e679cca3364052f759dba663be3260729cd", "c50aecc3d639d993708863451867f2935a00537d"];
const ROWS = [
  { price: "₹26,000/month", bhk: "2 BHK", loc: "Sector 50, Gurgaon", size: "1,050 sq.ft.", rate: "Semi furnished", dev: "Arjun Patel", role: "Owner" },
  { price: "₹31,500/month", bhk: "3 BHK", loc: "Golf Course Road, Gurgaon", size: "1,420 sq.ft.", rate: "Fully furnished", dev: "Neha Sharma", role: "Agent" },
  { price: "₹19,000/month", bhk: "2 BHK", loc: "Sector 56, Gurgaon", size: "980 sq.ft.", rate: "Unfurnished", dev: "Vikram Singh", role: "Owner" }];
const setT = async (inst, layer, chars) => { const t = inst.findOne((n) => n.type === "TEXT" && n.name === layer); for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = chars; };
const out = [];
for (const v of postSet.children.filter((x) => /^Type=Rent/.test(x.name))) {
  const body = v.findOne((n) => n.name === "Body");
  if (body.children.some((n) => n.name === "Recommended properties")) continue;
  const r = src.clone(); r.name = "Recommended properties";
  body.insertChild(body.children.findIndex((n) => n.name === "What to expect"), r); r.layoutSizingHorizontal = "FILL";
  await setT(r, "Title", "Recommended properties");
  const cards = r.findOne((n) => n.name === "Cards").children;
  for (const [i, c] of cards.entries()) {
    const d = ROWS[i];
    c.findOne((n) => n.name === "Photo").fills = [{ type: "IMAGE", imageHash: IMG[i], scaleMode: "FILL" }];
    c.findOne((n) => n.name === "Avatar").fills = [{ type: "IMAGE", imageHash: AV[i], scaleMode: "FILL" }];
    for (const [k, val] of Object.entries({ Price: d.price, BHK: d.bhk, Locality: d.loc, Size: d.size, Rate: d.rate, Developer: d.dev, Role: d.role })) await setT(c, k, val);
  }
  out.push(`${v.name} ${Math.round(v.height)}: ${body.children.map((n) => n.name).join(", ")}`);
}
// set hugs variants; parts below move down; section re-hugs; overlap check
const bottom = Math.max(...postSet.children.map((c) => c.y + c.height)); const old = postSet.y + postSet.height;
postSet.resize(postSet.width, Math.round(bottom + 40)); const d = postSet.y + postSet.height - old;
for (const c of section.children) if (c !== postSet && c.y >= old) c.y += d;
const need = Math.max(...section.children.map((c) => c.y + c.height)) + 100; section.resizeWithoutConstraints(section.width, Math.round(need));
const b = section.children.map((c) => [c.name, c.x, c.y, c.x + c.width, c.y + c.height]); const ov = [];
for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (b[i][1] < b[j][3] && b[j][1] < b[i][3] && b[i][2] < b[j][4] && b[j][2] < b[i][4]) ov.push(b[i][0] + " x " + b[j][0]);
out.push(`set ${Math.round(postSet.height)}, moved ${Math.round(d)}, section ${Math.round(section.height)}, overlaps ${ov.length}`);
return out.join("\n");
