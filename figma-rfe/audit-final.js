// Final design-system audit (2026-11-11): every CRF desktop kit set/component we own + the RFE rows on Global.
// Checks (skipping layers inside instances, which belong to their own components):
//   tokens: solid fills/strokes bound to a colour variable; padding/gap/radius bound to spacing/radius variables
//   type: every text has a text style
//   instances: no detached copies (frames named like DS parts), remote/library sources only for DS parts
//   decimals: x/y/w/h, padding, gap, radius, stroke, font size must be whole numbers
// FIX=true rounds decimals in place (positions/sizes/paddings/gaps/radii of our own layers).
// Exceptions (intentional, reported separately): live gallery chrome (user: keep live UI, raw colours + Rubik),
// gradients/fades (no alpha token), effects (no elevation token), black overlay/backdrop, image fills.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/audit-final.js     (kit)
// node figma-rfe/run.mjs "CRF" figma-rfe/lib.js figma-rfe/audit-final.js               (RFE on Global)
const FIX = true;
const OWN = ["7293:23739", "7293:25390", "7347:30457", "7293:23027", "7472:34388", "7472:34405", "7302:60729", "7302:60742", "7297:44740", "7473:35355", "7476:5436", "7473:35840", "7477:82071"];
const isKit = figma.root.name.includes("Component Kit") || !!(await figma.getNodeByIdAsync("7293:23739"));
const res = { file: isKit ? "kit" : "CRF", tokens: [], styles: [], decimals: [], detached: [], exceptions: new Set(), fixed: 0 };
const dec = (v) => typeof v === "number" && Math.abs(v - Math.round(v)) > 0.01;
const path = (n) => { const p = []; for (let x = n; x && x.type !== "PAGE" && p.length < 4; x = x.parent) p.unshift(x.name.slice(0, 22)); return p.join(" > "); };
const inLiveGallery = (n) => { for (let x = n; x; x = x.parent) if (x.name === "Top" || x.name === "Carousel" && x.parent?.parent?.name === "Gallery / Desktop" || x.name === "Previous slide" || x.name === "Close" && x.parent?.parent?.name === "Gallery / Desktop") return true; return false; };
const galleryRoot = (n) => { for (let x = n; x; x = x.parent) if (x.parent && x.parent.name === "Gallery / Desktop") return x === n; return false; };
const solidUnbound = (n, key) => { const ps = n[key]; if (!Array.isArray(ps)) return false; const bv = n.boundVariables && n.boundVariables[key];
  return ps.some((p, i) => p.visible !== false && p.type === "SOLID" && !(p.boundVariables && p.boundVariables.color) && !(bv && bv[i])); };
async function walk(n, top) {
  if (!n.visible) return;
  // decimals (own layers + top-level instance box)
  for (const k of ["x", "y", "width", "height"]) if (dec(n[k]) && !(n.type === "LINE" || n.rotation)) {
    if (FIX && n.type !== "TEXT") { try { if (k === "x" || k === "y") n[k] = Math.round(n[k]); else if ("resize" in n) n.resize(Math.round(n.width), Math.round(n.height)); res.fixed++; continue; } catch (e) {} }
    res.decimals.push(`${path(n)} ${k}=${(+n[k]).toFixed(2)}`); }
  if (n.type !== "INSTANCE") {
    for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing", "cornerRadius", "strokeWeight"]) if (k in n && dec(n[k])) {
      if (FIX && !(n.boundVariables && n.boundVariables[k])) { n[k] = Math.round(n[k]); res.fixed++; } else res.decimals.push(`${path(n)} ${k}=${(+n[k]).toFixed(2)}`); }
    if (n.type === "TEXT" && dec(n.fontSize)) res.decimals.push(`${path(n)} fontSize=${n.fontSize}`);
    const live = inLiveGallery(n) || galleryRoot(n);
    // tokens
    if (["FRAME", "COMPONENT", "RECTANGLE", "TEXT", "ELLIPSE", "LINE", "VECTOR"].includes(n.type)) {
      if (solidUnbound(n, "fills")) live ? res.exceptions.add("live gallery chrome raw colours") : (/overlay|fade|backdrop/i.test(n.name) ? res.exceptions.add("overlay/fade " + n.name) : res.tokens.push(`${path(n)} fill`));
      if (solidUnbound(n, "strokes")) live ? res.exceptions.add("live gallery chrome raw colours") : res.tokens.push(`${path(n)} stroke`);
      if (n.effects && n.effects.some((e) => e.visible)) res.exceptions.add("effects (no elevation token): " + n.name.slice(0, 20));
      if (n.fills && Array.isArray(n.fills) && n.fills.some((p) => /GRADIENT/.test(p.type))) res.exceptions.add("gradient (no alpha token): " + n.name.slice(0, 20));
    }
    if (n.layoutMode && n.layoutMode !== "NONE" && !live) {
      for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing"]) if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) res.tokens.push(`${path(n)} ${k}=${n[k]}`);
    }
    if ((n.type === "FRAME" || n.type === "COMPONENT") && !live && typeof n.cornerRadius === "number" && n.cornerRadius > 0 && !(n.boundVariables && (n.boundVariables.topLeftRadius || n.boundVariables.cornerRadius)))
      res.tokens.push(`${path(n)} radius=${n.cornerRadius}`);
    if (n.type === "TEXT" && !live && !(typeof n.textStyleId === "string" && n.textStyleId)) res.styles.push(`${path(n)} "${n.characters.slice(0, 24)}"`);
    if (n.type === "TEXT" && live) res.exceptions.add("live gallery chrome Rubik text (no Bricks style, user: keep live UI)");
    if (/^(buttons|InputField|Checkbox|IconButton|Button)/i.test(n.name) && n.type === "FRAME") res.detached.push(`${path(n)} looks detached`);
    if ("children" in n) for (const c of n.children) await walk(c, top);
  }
}
if (isKit) {
  for (const id of OWN) { const n = await figma.getNodeByIdAsync(id); if (!n) continue; let pg = n; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
    if (n.type === "INSTANCE") { await walk(n, n); continue; } // lead section inside NP PDP: its box only
    for (const v of (n.type === "COMPONENT_SET" ? n.children : [n])) await walk(v, n); }
} else {
  const gp = figma.root.children.find((x) => x.name.trim() === "↳ Global"); await gp.loadAsync(); await figma.setCurrentPageAsync(gp);
  const s = gp.children.find((n) => n.type === "SECTION" && n.name === "CRF:");
  if (s.x !== 0 || s.y !== 0) res.decimals.push(`section not at 0,0 (${s.x},${s.y})`);
  for (const k of ["width", "height"]) if (dec(s[k])) { s.resizeWithoutConstraints(Math.round(s.width), Math.round(s.height)); res.fixed++; }
  for (const n of s.children) { for (const k of ["x", "y", "width", "height"]) if (dec(n[k])) { if (k === "x" || k === "y") n[k] = Math.round(n[k]); else n.resize(Math.round(n.width), Math.round(n.height)); res.fixed++; }
    if (n.type === "FRAME") for (const c of n.children) for (const k of ["x", "y", "width", "height"]) if (dec(c[k])) { if (k === "x" || k === "y") c[k] = Math.round(c[k]); else c.resize(Math.round(c.width), Math.round(c.height)); res.fixed++; } }
}
res.exceptions = [...res.exceptions];
const cap = (a) => { a = a.filter((x) => !/Housing logo/.test(x)); return a.length > 40 ? [...a.slice(0, 40), `... +${a.length - 40} more`] : a; };
return JSON.stringify({ ...res, tokens: cap(res.tokens), styles: cap(res.styles), decimals: cap(res.decimals), counts: { tokens: res.tokens.length, styles: res.styles.length, decimals: res.decimals.length, detached: res.detached.length } }, null, 1);
