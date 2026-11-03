// Dev notes for the CRF revamp Desktop web RFE (native annotations, Dev Mode).
// Run after build-crf-dweb.js: node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/notes-crf-dweb.js
// Copy rule: no em or en dashes. One short line each, only behaviour not visible in the frame.

const page = figma.root.children.find((p) => p.name.trim() === "↳ CRF: Desktop");
await page.loadAsync();
const section = page.children.find((n) => n.name === "RFE: Desktop web CRF revamp");
const rows = { Buy: [], Rent: [] };
// screens are laid out in two rows; split by y
const tops = [...new Set(section.children.filter((n) => n.type === "FRAME" || n.type === "INSTANCE").filter((n) => n.name !== "Page kit").map((n) => Math.round(n.y)))].sort((a, b) => a - b);
const screen = (row, name) => section.children.find((n) => n.name === name && n.name !== "Page kit" && (row === "Buy" ? n.y === tops[0] : n.y > tops[0]));
const MODAL = "MODAL";
const inside = (root, layer) => layer === MODAL ? root.findOne((n) => n.type === "INSTANCE" && /CRF revamp \/ (Modal|Post CRF)$/.test(n.name)) : root.findOne((n) => n.name === layer);

// Rent connecting copy
{
  const s = screen("Rent", "Connecting to owners");
  const t = s && s.findOne((n) => n.type === "TEXT" && n.characters.startsWith("Getting you in touch"));
  if (t) { await figma.loadFontAsync(t.fontName); t.characters = "Getting you in touch with owners..."; }
}

const NOTES = [
  ["Buy", "Step 1: Phone", MODAL, "Development", "One shared CRF component for every Desktop Demand page. Changes ship everywhere."],
  ["Buy", "Step 1: Phone", MODAL, "Interaction", "Open/close = Airbnb login modal, same on CRF, Share, EMI. Open: rises 100px, 400ms cubic-bezier(0.1, 0.9, 0.2, 1), fade 75ms; overlay fades in 400ms. Close: drops 50px, 150ms cubic-bezier(0.4, 0, 1, 1), fades out, overlay 250ms. View more / less 320ms."],
  ["Buy", "Step 1: Phone", "Overlay", "Interaction", "Esc and X close. Overlay click closes only on Post CRF, never mid form."],
  ["Buy", "Step 1: Phone", "Continue Button", "Development", "Validates 10 digits on click. Buy goes to Your details, Rent sends OTP."],
  ["Buy", "Step 1: Phone", "Phone number", "Development", "No WhatsApp login on desktop. Phone + OTP only."],
  ["Buy", "Step 1: Country code", "Country code dropdown", "Interaction", "Opens on +91. Type to filter, arrow keys and Enter select."],
  ["Buy", "Step 2: Your details", "Edit phone", "Interaction", "Back arrow and Edit number return to Step 1, number kept."],
  ["Buy", "Step 2: Your details", "Google", "Development", "Google Sign in fills name and verified email. Only after Step 1."],
  ["Buy", "Step 2: Filled with Google", "Get OTP Button", "Development", "Logged in users with name and email skip Step 2."],
  ["Buy", "OTP: Enter OTP", "OTP field", "Interaction", "One field: type or paste 4 digits, Backspace edits."],
  ["Buy", "OTP: Enter OTP", "OTP field", "Interaction", "Digits slide in as typed or pasted, exactly like the m-web OTP digit slide animation."],
  ["Buy", "OTP: Enter OTP", "OTP field", "Development", "No auto fetch on desktop. Auto submit on 4th digit."],
  ["Buy", "OTP: Enter OTP", "Timer", "Development", "Resend timer and resend flow same as PROD."],
  ["Buy", "Connecting to sellers", MODAL, "Interaction", "Same delay as m-web, then Post CRF crossfades in the same 480 modal, 200ms."],
  ["Buy", "Post CRF: Multiple sellers", MODAL, "Interaction", "Max height min(720, viewport). Header fixed, body scrolls."],
  ["Buy", "Post CRF: Multiple sellers", "Scrollbar", "Interaction", "4px pill scrollbar, auto hides after 1s idle, shows on scroll or hover. White fade at bottom edge."],
  ["Buy", "Post CRF: Multiple sellers", "Contact", "Development", "Contact on a card sends an enquiry for that home with the verified details, no new form. No WhatsApp CTAs on desktop."],
  ["Buy", "Post CRF: Multiple sellers", "Dweb / CRF revamp / View more", "Development", "Shows 2 sellers, expands the rest in place. Headline counts all."],
  ["Buy", "Post CRF: Limit reached", "Limit reached", "Development", "Max attempts case lives in Post CRF, same as m-web."],
  ["Rent", "OTP: Enter OTP", "OTP field", "Development", "Rent skips Your details: phone goes straight to OTP."],
  ["Rent", "Post CRF: Multi-connect", "Connect with 2 owners Button", "Development", "Sends one enquiry per selected owner. Same API as m-web multi-connect."],
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
for (const [row, scr, layer, cat, label] of NOTES) {
  if (/[–—·]/.test(label)) throw new Error("dash in note: " + label);
  const s = screen(row, scr);
  const node = s && inside(s, layer);
  if (!node) { out.push("missing " + row + " " + scr + " > " + layer); continue; }
  if (!byNode.has(node)) byNode.set(node, []);
  const list = byNode.get(node);
  const id = await categoryId(cat);
  const same = list.find((x) => x.categoryId === id);
  if (same) same.label += " " + label; else list.push({ label, categoryId: id });
  out.push("ok " + cat + ": " + row + " " + scr + " > " + layer);
}
for (const [node, notes] of byNode) node.annotations = notes;
return out.join("\n");
