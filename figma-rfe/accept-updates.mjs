// Accept library updates in a product file for the CURRENT PAGE ONLY (the RFE page).
// usage: node figma-rfe/accept-updates.mjs "<tab title part>" "<expected component name>" [...]
// Opens Assets > library icon > Manage libraries > Updates (page-scoped list), checks every listed row is
// one of the expected components (ours), then clicks "Update all" for this page. Never uses
// "Show updates for all pages": other pages hold other people's published changes (e.g. PDP / d-web).
import { execFileSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const [title, ...expected] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ui = (...a) => { try { return execFileSync("node", [join(here, "figma-ui.mjs"), title, ...a], { encoding: "utf8" }); } catch (e) { return String(e.stdout || ""); } };

const page = (await (await fetch("http://localhost:9222/json")).json()).find((p) => p.title.includes(title) && /figma\.com\/(design|file)\//.test(p.url));
const ws = new WebSocket(page.webSocketDebuggerUrl); let seq = 0; const wait = {};
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (wait[d.id]) wait[d.id](d); };
await new Promise((r) => (ws.onopen = r));
const ev = (e) => new Promise((r) => { const k = ++seq; wait[k] = (d) => r(d.result?.result?.value); ws.send(JSON.stringify({ id: k, method: "Runtime.evaluate", params: { expression: e, returnByValue: true } })); });
const rows = () => ev(`JSON.stringify([...document.querySelectorAll('button')].filter(b => b.offsetParent && b.innerText.trim() === 'Update').map(b => { let n = b; for (let k = 0; k < 6; k++) { n = n.parentElement; if ((n.innerText || '').split('\\n').length > 1) break; } return n.innerText.split('\\n')[0].trim(); }))`);
const hasUpdateAll = () => ev(`!![...document.querySelectorAll('button')].find(b => b.offsetParent && b.innerText.trim() === 'Update all')`);

let list = [];
for (let i = 0; i < 6; i++) {
  ui("escape");
  ui("click", "Assets"); await sleep(800);
  ui("click-at", "340,23"); await sleep(2500);   // library (book) icon at the top of the Assets panel
  ui("click-at", "434,193"); await sleep(3500);  // "Updates" in Manage libraries
  list = JSON.parse(await rows() || "[]");
  if (list.length && (await hasUpdateAll())) break;
  await sleep(10000); // publishes take a little while to reach consumer files
}
console.log("updates on this page: " + (list.join(", ") || "none"));
if (!list.length) { ui("escape"); process.exit(4); }
const foreign = list.filter((n) => !expected.some((e) => n === e || n.startsWith(e)));
if (expected.length && foreign.length) { ui("escape"); console.error("ABORT: unexpected updates: " + foreign.join(", ")); process.exit(2); }
console.log(ui("click", "Update all").trim().split("\n")[0]);
await sleep(8000);
ui("escape");
ws.close();
process.exit(0);
