// One-shot: publish kit sets -> reload consumer tab -> wait until it is ready -> accept updates ONCE. No polling loops.
// Nested components only reach screens when every set that NESTS them is republished too, so always pass the parents
// (CRF desktop: Post CRF 7293:25390 / Modal 7293:23739 nest Seller, Card, View more, Safety note, WhatsApp).
// usage: node figma-rfe/ship.mjs "<consumer tab>" <live screen id> <setId...> -- "<Set name>"...
import { execFileSync } from "child_process";
import { FigmaClient } from "/Users/shashwat/Documents/Work/Cursor:Claude/bricks-design-system/tools/figma-cli/src/figma-client.js";
const [tab, screen, ...rest] = process.argv.slice(2);
const cut = rest.indexOf("--"); const ids = rest.slice(0, cut), names = rest.slice(cut + 1);
const run = (args) => { try { return execFileSync("node", args, { encoding: "utf8" }); } catch (e) { return (e.stdout || "") + (e.stderr || ""); } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
console.log(run(["figma-rfe/publish.mjs", "Component Kit", ...ids]).trim().split("\n").pop());
run(["figma-rfe/figma-ui.mjs", tab, "reload"]);
for (let i = 0; i < 20; i++) { // wait for the reloaded tab's plugin context (max ~60s), then stop waiting
  await sleep(3000);
  try { const c = new FigmaClient(); await c.connect(tab, { timeoutMs: 5000 }); await c.eval("1"); break; } catch (e) {}
}
console.log(run(["figma-rfe/accept-updates.mjs", tab, "--page", screen, ...names]).trim().split("\n").slice(-2).join(" | "));
process.exit(0);
