// Publish ONLY the given component sets from a library file (never the whole library: the Demand kit
// carries ~200 pending team changes incl. removals).
// usage: node figma-rfe/publish.mjs "<tab title part>" <nodeId> [<nodeId> ...]
// Steps: select nodes (plugin API) -> Quick actions "Publish selected components" (or the right-panel
// "Publish…" for a single component) -> scroll the dialog and read every ticked row -> abort unless the
// ticked rows are exactly the selected sets -> click Publish -> poll getPublishStatusAsync until CURRENT.
import { execFileSync } from "child_process";
import { writeFileSync, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const [title, ...ids] = process.argv.slice(2);
if (!title || !ids.length) { console.error("usage: publish.mjs <tab> <nodeId...>"); process.exit(1); }
const tmp = mkdtempSync(join(tmpdir(), "figma-publish-"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const runPlugin = (code) => {
  const f = join(tmp, "s.js"); writeFileSync(f, code);
  return execFileSync("node", [join(here, "run.mjs"), title, f], { encoding: "utf8" }).trim().split("\n").pop();
};
const ui = (...args) => { try { return execFileSync("node", [join(here, "figma-ui.mjs"), title, ...args], { encoding: "utf8" }); } catch (e) { return String(e.stdout || ""); } };

// 1. select exactly these nodes
const names = JSON.parse(runPlugin(`
const nodes = await Promise.all(${JSON.stringify(ids)}.map(id => figma.getNodeByIdAsync(id)));
let pg = nodes[0]; while (pg.type !== 'PAGE') pg = pg.parent;
await figma.setCurrentPageAsync(pg);
figma.currentPage.selection = nodes;
return JSON.stringify(nodes.map(n => n.name));`));
console.log("selected: " + names.join(", "));

// 2. open the publish dialog for the selection
const page = (await (await fetch("http://localhost:9222/json")).json()).find((p) => p.title.includes(title) && /figma\.com\/(design|file)\//.test(p.url));
const ws = new WebSocket(page.webSocketDebuggerUrl); let seq = 0; const wait = {};
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (wait[d.id]) wait[d.id](d); };
await new Promise((r) => (ws.onopen = r));
const send = (method, params = {}) => new Promise((r) => { const k = ++seq; wait[k] = r; ws.send(JSON.stringify({ id: k, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
const dialogOpen = async () => ev(`!![...document.querySelectorAll('button')].find(b => b.offsetParent && b.innerText.trim() === 'Publish')`);
const entryVisible = async () => ev(`!![...document.querySelectorAll('button,[role=option]')].find(b => b.offsetParent && b.innerText.trim() === 'Publish selected components')`);
for (let i = 0; i < 4 && !(await dialogOpen()); i++) {
  if (ids.length === 1) { ui("click", "Publish…"); await sleep(2500); if (await dialogOpen()) break; }
  if (!(await entryVisible())) { ui("quick", "Publish selected components"); await sleep(2000); }
  if (!(await dialogOpen()) && (await entryVisible())) { ui("click", "Publish selected components"); await sleep(3000); }
  if (!(await dialogOpen())) { ui("escape"); await sleep(800); }
}
if (!(await dialogOpen())) { console.error("publish dialog did not open"); process.exit(1); }

// 3. read every ticked row (list is virtualised: wheel-scroll through it)
const pos = await ev(`(() => { const b = [...document.querySelectorAll('button')].find(e => e.offsetParent && e.innerText.trim() === 'Publish'); const r = b.getBoundingClientRect(); return { x: r.x - 300, y: r.y - 250 }; })()`);
const grab = `JSON.stringify([...document.querySelectorAll('input[data-testid="publish-library-item-checkbox"]')].map(cb => { const row = cb.closest('label'); return [row?.querySelector('[title]')?.title || '?', row?.querySelector('[class*=statusTag]')?.innerText || '', cb.checked]; }))`;
const ticked = new Map(); let last = "";
for (let s = 0; s < 150; s++) {
  for (const [n, st, c] of JSON.parse(await ev(grab))) if (c) ticked.set(n + " [" + st + "]", n);
  await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: pos.x, y: pos.y, deltaX: 0, deltaY: 300 });
  await sleep(120);
  const sig = await ev(grab); if (sig === last && s > 3) break; last = sig;
}
for (let s = 0; s < 150; s++) await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: pos.x, y: pos.y, deltaX: 0, deltaY: -600 });
const tickedNames = [...ticked.values()];
console.log("ticked: " + [...ticked.keys()].join(", "));
const extra = tickedNames.filter((n) => !names.includes(n));
const missing = [...new Set(names)].filter((n) => !tickedNames.includes(n));
if (extra.length) { ui("click", "Cancel"); console.error("ABORT: other rows ticked: " + extra.join(", ")); process.exit(2); }
if (missing.length) console.log("note: not in list (no pending change): " + missing.join(", "));
if (!tickedNames.length) { ui("click", "Cancel"); console.log("nothing to publish"); process.exit(0); }

// 4. publish and wait until CURRENT
ui("click", "Publish");
ws.close();
for (let i = 0; i < 15; i++) {
  await sleep(8000);
  const st = runPlugin(`const r = []; for (const id of ${JSON.stringify(ids)}) { const n = await figma.getNodeByIdAsync(id); r.push(n.name + ':' + await n.getPublishStatusAsync()); } return r.join(' | ');`);
  if (!/CHANGED|UNPUBLISHED/.test(st)) { console.log("published: " + st); process.exit(0); }
  if (i === 14) { console.log("status: " + st); process.exit(3); }
}
