// Switch Figma desktop's VISIBLE tab. Page.bringToFront on a file page does not change the tab Figma
// shows, so UI input (clicks, keys) would land on a hidden tab and nothing happens. The tab bar lives in
// the desktop shell page (shell.html): click the tab button there and wait for aria-selected=true.
// Also opens the file in the Figma app if it isn't open yet.
import { execFileSync } from "child_process";

export const FILES = {
  "Search Results Page": "https://www.figma.com/design/smvDlE5T1d0J7sBiLuOaKe/Search-Results-Page--SRP---Demand-",
  "Component Kit": "https://www.figma.com/design/xYC0W1LzOyf0ll2LF5iCZq/Demand%E2%80%A8Component-Kit",
  "Iconography": "https://www.figma.com/design/Rq1j8iqvbJBYRb52tdpgFg/Iconography--Bricks-",
  "Bricks Design System": "https://www.figma.com/design/ZGl9LhEtqlE9JiMKBuYrdT/Bricks-Design-System",
  "Sample File": "https://www.figma.com/design/13QumTZLIxuCIPzCyhg1tM/Sample-File--Demand-",
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const targets = async () => (await (await fetch("http://localhost:9222/json")).json());
export const findPage = async (title) => (await targets()).find((p) => p.title.includes(title) && /figma\.com\/(design|file)\//.test(p.url || ""));

async function shellEval(expr, mouseAt) {
  const shell = (await targets()).find((p) => (p.url || "").includes("shell.html"));
  if (!shell) return null;
  const ws = new WebSocket(shell.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const wait = {};
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (wait[d.id]) wait[d.id](d); };
  const send = (method, params = {}) => new Promise((r) => { const k = ++id; wait[k] = r; ws.send(JSON.stringify({ id: k, method, params })); });
  const v = (await send("Runtime.evaluate", { expression: expr, returnByValue: true })).result?.result?.value;
  if (mouseAt && v && v.x != null) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: v.x, y: v.y });
    for (const type of ["mousePressed", "mouseReleased"]) await send("Input.dispatchMouseEvent", { type, x: v.x, y: v.y, button: "left", clickCount: 1 });
  }
  ws.close();
  return v;
}

const tabExpr = (title, wantRect) => `(() => {
  const t = [...document.querySelectorAll('button[role=tab]')].find(b => b.innerText.replace(/\\s+/g, ' ').includes(${JSON.stringify(title)}));
  if (!t) return null;
  ${wantRect ? "const r = t.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };" : "return t.getAttribute('aria-selected') === 'true';"}
})()`;

export async function switchTab(title) {
  let page = await findPage(title);
  if (!page && FILES[title]) {
    execFileSync("open", ["-a", "Figma", FILES[title]]);
    for (let i = 0; i < 25 && !page; i++) { await sleep(2000); page = await findPage(title); }
    await sleep(5000);
  }
  if (!page) throw new Error("Figma tab not found and no URL known for: " + title);
  for (let i = 0; i < 5; i++) {
    if (await shellEval(tabExpr(title, false))) return page;
    await shellEval(tabExpr(title, true), true);
    await sleep(1200);
  }
  if (!(await shellEval(tabExpr(title, false)))) throw new Error("could not switch Figma to tab: " + title);
  return page;
}
