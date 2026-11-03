// In place, CRF desktop kit (2026-11-03):
// 1. Property card gets the m-web secondary contact CTA: Bricks Button Secondary M "Contact", fill width, after Details.
//    Hidden on Rent multi-connect Selectable cards (those cards are pick-to-select).
// 2. No WhatsApp CTAs on desktop web: WhatsApp button removed from both Seller variants (all Post CRF rows follow).
//    Copy that only mentions WhatsApp (consent, "reach out on call or WhatsApp") stays.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-contact-nowa.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const out = {};
const btnSet = await figma.importComponentSetByKeyAsync("1cdd6502c90fd59d70b838a35fb444d63aef2d88");
const sec = btnSet.children.find((c) => c.name === "Variant=Secondary, Size=M, State=Default");
const cardSet = await figma.getNodeByIdAsync("7293:23027");
out.cards = [];
for (const c of cardSet.children) {
  if (c.findOne((n) => n.name === "Contact")) continue;
  const b = sec.createInstance(); c.appendChild(b);
  b.name = "Contact"; b.setProperties({ "Label#129:0": "Contact" });
  b.layoutSizingHorizontal = "FILL";
  out.cards.push([c.name, c.width, c.height]);
}
cardSet.resize(cardSet.width, Math.max(...cardSet.children.map((c) => c.y + c.height)) + 40);
const post = await figma.getNodeByIdAsync("7293:25390");
out.hidden = 0;
for (const s of post.findAll((n) => n.name === "Selectable card")) {
  const b = s.findOne((n) => n.name === "Contact"); if (b) { b.visible = false; out.hidden++; }
}
const seller = await figma.getNodeByIdAsync("7347:30457");
out.wa = 0;
for (const v of seller.children) for (const w of v.children.filter((n) => n.name === "WhatsApp")) { w.remove(); out.wa++; }
const nn = seller.children.map((v) => v.findOne((n) => n.name === "Name and number"));
for (const n of nn) n.layoutSizingHorizontal = "FILL";
out.left = post.findAll((n) => n.name === "WhatsApp" && n.visible).length;
return JSON.stringify(out);
