// In place, CRF desktop kit (2026-11-03): Limit reached support row lives inside the Outcome card (under the property,
// card hairline divider above, same s/m padding as the property row); the last section divider on that screen goes.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/patch-crf-dweb-limit-in-card.js
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("2016:179"));
const v = (await figma.getNodeByIdAsync("7293:25390")).children.find((c) => c.name === "Type=Buy: Limit reached");
const outcome = v.findOne((n) => n.name === "Outcome");
const limit = v.findOne((n) => n.name === "Limit reached");
if (limit.parent !== outcome) {
  const div = outcome.findOne((n) => n.name === "Divider").clone();
  outcome.appendChild(div); outcome.appendChild(limit);
  limit.layoutSizingHorizontal = "FILL";
  for (const [k, t] of [["paddingTop", "s"], ["paddingBottom", "s"], ["paddingLeft", "m"], ["paddingRight", "m"]]) limit.setBoundVariable(k, await V("spacing", t));
  limit.findOne((n) => n.name === "Copy").layoutSizingHorizontal = "FILL";
}
let removed = 0;
for (const d of v.findAll((n) => n.name === "Section divider")) { d.remove(); removed++; }
return JSON.stringify({ outcome: [outcome.width, outcome.height], limit: [limit.width, limit.height], removed, v: v.height });
