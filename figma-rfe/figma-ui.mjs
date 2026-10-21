// Drive Figma desktop UI for things the plugin API can't do (publish library, accept library updates).
// Uses the same local debugging port figma-cli enables. Requested by Shashwat, 2026-10-21.
// usage:
//   node figma-rfe/figma-ui.mjs "<tab title part>" quick "<Quick actions query>"   open Quick actions, type, Enter
//   node figma-rfe/figma-ui.mjs "<tab title part>" read                          print visible dialog / modal text
//   node figma-rfe/figma-ui.mjs "<tab title part>" click "<exact button text>"   click the last visible button with that text
//   node figma-rfe/figma-ui.mjs "<tab title part>" buttons                       list visible button labels
import { switchTab } from "./tabs.mjs";
const [title, action, arg] = process.argv.slice(2);
await switchTab(title); // input only reaches the visible tab
const list = await (await fetch("http://localhost:9222/json")).json();
const page = list.find((p) => p.title.includes(title) && /figma\.com\/(design|file)\//.test(p.url));
if (!page) { console.log("tab not found: " + title); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0; const waiting = {};
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting[d.id]) { waiting[d.id](d); delete waiting[d.id]; } };
await new Promise((r) => (ws.onopen = r));
const send = (method, params = {}) => new Promise((r) => { const i = ++seq; waiting[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const run = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const key = async (k, code, vk, modifiers = 0) => {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: k, code, windowsVirtualKeyCode: vk, modifiers });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk, modifiers });
};
const visibleText = `(() => {
  const vis = (e) => e.offsetParent && e.getBoundingClientRect().width > 0;
  const modal = [...document.querySelectorAll('[role=dialog],[class*=modal],[class*=Modal]')].filter(vis).pop();
  return modal ? modal.innerText.slice(0, 4000) : 'no dialog';
})()`;

await send("Page.bringToFront");
if (action === "quick") {
  // The canvas keeps focus on a hidden INPUT.focus-target, so only the real Quick actions search box counts.
  const inputFocused = () => run(`(() => { const a = document.activeElement; return !!a && a.tagName === 'INPUT' && a.getAttribute('placeholder') === 'Search' && /search/i.test(a.className); })()`);
  if (!(await inputFocused())) { await key("/", "Slash", 191, 4); await sleep(900); } // Cmd+/ toggles: only press when closed
  if (!(await inputFocused())) { console.log("quick actions did not open; nothing typed"); ws.close(); process.exit(3); }
  await run(`(() => { const a = document.activeElement; if (a && 'value' in a) { a.select?.(); } })()`);
  await send("Input.insertText", { text: arg }); // only ever typed into the focused search field, never the canvas
  await sleep(1200);
  console.log("options:\n" + (await run(`[...document.querySelectorAll('[role=option],[role=listbox] *')].filter(e=>e.offsetParent).map(e=>e.innerText.trim()).filter(Boolean).slice(0,12).join('\\n')`)));
  await key("Enter", "Enter", 13);
  await sleep(2500);
  console.log("---\n" + (await run(visibleText)));
} else if (action === "click-at") {
  // arg "x,y" in CSS pixels (screenshot device px / 2 on retina)
  const [x, y] = arg.split(",").map(Number);
  for (const type of ["mousePressed", "mouseReleased"]) await send("Input.dispatchMouseEvent", { type, x, y, button: "left", clickCount: 1 });
  await sleep(1500);
  console.log("clicked at " + x + "," + y);
} else if (action === "reload") {
  // Restores the plugin execution context when scripts report "Could not find Figma execution context".
  await send("Page.reload", {});
  await sleep(15000);
  console.log("reloaded");
} else if (action === "escape") {
  await key("Escape", "Escape", 27);
  await sleep(400);
} else if (action === "read") {
  console.log(await run(visibleText));
} else if (action === "buttons") {
  console.log(await run(`[...document.querySelectorAll('button,[role=button]')].filter(b=>b.offsetParent).map(b=>b.innerText.trim()).filter(Boolean).join(' | ')`));
} else if (action === "click") {
  // Real mouse click at the element's centre: Figma list items (Quick actions) ignore element.click().
  const r = await run(`(() => { const b = [...document.querySelectorAll('button,[role=button],[role=option]')].filter(b => b.offsetParent && b.innerText.trim() === ${JSON.stringify(arg)}); if (!b.length) return null; const e = b[b.length - 1].getBoundingClientRect(); return { x: e.x + e.width / 2, y: e.y + e.height / 2 }; })()`);
  if (!r) console.log("no button: " + arg);
  else {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x, y: r.y });
    for (const type of ["mousePressed", "mouseReleased"]) await send("Input.dispatchMouseEvent", { type, x: r.x, y: r.y, button: "left", clickCount: 1 });
    console.log("clicked " + arg);
  }
  await sleep(3000);
  console.log("---\n" + (await run(visibleText)));
}
ws.close();
process.exit(0);
