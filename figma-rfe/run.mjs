// Run plugin-API scripts against a specific open Figma tab (not just the frontmost one).
// usage: node figma-rfe/run.mjs "<tab title part>" lib.js build.js ...
// Files are concatenated and run as one async function body; `return` sends a value back.
// lib.js gets ICON_KEYS / STYLE_KEYS injected from the json files beside this script.
//
// Tab handling is automatic (never wait for the user to click a tab):
//   1. file not open  -> opens it in the Figma app (FILES map) and waits for the tab
//   2. tab in background -> switches Figma's visible tab to it (tabs.mjs, via the desktop shell tab bar)
//   3. "Could not find Figma execution context" / connect timeout -> reloads that tab and retries (3x)
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { FigmaClient } from "/Users/shashwat/Documents/Work/Cursor:Claude/figma-cli-main/src/figma-client.js";
import { switchTab } from "./tabs.mjs";


const here = dirname(fileURLToPath(import.meta.url));
const [title, ...files] = process.argv.slice(2);
const json = (f) => readFileSync(join(here, f), "utf8");
const prelude = `const ICON_KEYS = ${json("icon-keys.json")};\nconst STYLE_KEYS = ${json("text-style-keys.json")};\n`;
const body = prelude + files.map((f) => readFileSync(f, "utf8")).join("\n");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const tabs = async () => (await (await fetch("http://localhost:9222/json")).json()).filter((p) => /figma\.com\/(design|file)\//.test(p.url || ""));
async function cdp(page, method, params = {}) {
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  const res = await new Promise((r) => { ws.onmessage = (m) => r(JSON.parse(m.data)); ws.send(JSON.stringify({ id: 1, method, params })); });
  ws.close();
  return res;
}
const ensureTab = () => switchTab(title); // makes it the VISIBLE Figma tab (opens the file if needed)

let res, lastErr;
for (let attempt = 0; attempt < 3; attempt++) {
  const page = await ensureTab();
  try {
    const client = new FigmaClient();
    await client.connect(title, { timeoutMs: 30000 });
    res = await client.eval(`(async () => { ${body} })()`);
    lastErr = null;
    break;
  } catch (e) {
    lastErr = e;
    if (!/execution context|Unable to establish connection|timed out|Timeout/i.test(String(e.message))) break;
    await cdp(page, "Page.reload"); // restores the plugin context of a stale background tab
    await sleep(15000);
  }
}
if (lastErr) { console.error(lastErr.message); process.exit(1); }
// Write fully before exiting: big results (e.g. base64 exports) get cut at the pipe buffer otherwise.
process.stdout.write((typeof res === "string" ? res : JSON.stringify(res, null, 1)) + "\n", () => process.exit(0));
