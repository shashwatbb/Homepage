// Dev notes (native Figma annotations, visible in Dev Mode) for the Seen in photos pills RFE.
// Run after build-isp.js: node figma-rfe/run.mjs "Search Results Page" figma-rfe/lib.js figma-rfe/notes-isp.js
// Copy rule: no em or en dashes.

const page = figma.root.children.find((p) => p.name.trim() === "↳ Image search pills");
await page.loadAsync();
const section = page.children.find((n) => n.name === "RFE: m-Web · Seen in photos pills");
const screen = (name) => section.children.find((n) => n.name === name);
const inside = (root, name) => root.findOne((n) => n.name === name);

// Keep notes few and short: only behaviour devs can't see in the frame.
// Category: Interaction = motion, haptics, timing, gestures. Development = flags, logic, persistence, data.
const NOTES = [
  ["SRP: Default with tip", "Search Field", "Interaction", "Placeholder rotates every 3s."],
  ["SRP: Default with tip", "Feature Pills", "Interaction", "Haptic on tap. 180ms transition. Selected moves to front."],
  ["SRP: Default with tip", "Feature Pills", "Development", "Behind flag srp_image_feature_pills."],
  ["SRP: Default with tip", "Feature Guide", "Development", "Show once. Hide for good after close."],
  ["SRP: One feature selected", "Property cards / M-Web", "Development", "First 2 cards: cover photo = feature photo."],
  ["Filters: Features", "Balcony", "Interaction", "Tap a selected pill again to unselect. No close icon here."],
];

const cats = await figma.annotations.getAnnotationCategoriesAsync();
async function categoryId(label) {
  let c = cats.find((x) => x.label === label);
  if (!c) { c = await figma.annotations.addAnnotationCategoryAsync({ label, color: "green" }); cats.push(c); }
  return c.id;
}
const out = [];
for (const n of section.findAll((x) => "annotations" in x && x.annotations.length)) n.annotations = [];
const byNode = new Map();
for (const [scr, layer, cat, label] of NOTES) {
  if (/[\u2013\u2014]/.test(label)) throw new Error("dash in note: " + layer);
  const s = screen(scr);
  const node = s && inside(s, layer);
  if (!node) { out.push("missing " + scr + " > " + layer); continue; }
  if (!byNode.has(node)) byNode.set(node, []);
  byNode.get(node).push({ label, categoryId: await categoryId(cat) });
  out.push("ok " + cat + ": " + scr + " > " + layer);
}
for (const [node, notes] of byNode) node.annotations = notes;
return out.join("\n");
