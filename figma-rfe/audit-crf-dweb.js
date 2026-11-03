// Final audit of the CRF desktop kit components: token binding, text styles, 14px floor, instance sources, dashes, bounds.
// run: node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/audit-crf-dweb.js
const ROOTS = ["7293:23739", "7293:25390", "7293:22982", "7293:23027", "7302:60729", "7302:60742", "7297:44740"];
const ALLOWED_LIB = /^(buttons|InputField|OTPField|Checkbox|IconButton|Country Flag Icons|Dweb \/ CRF revamp \/ .+)$/;
const issues = {}; const add = (k, v) => { (issues[k] = issues[k] || []).push(v); };
const known = { gradients: 0, effects: 0, images: 0, brand: 0 };
const isBrand = (n) => { for (let p = n; p; p = p.parent) if (/^(Housing logo|Google G|WhatsApp glyph|Google)$/.test(p.name)) return true; return false; };
const unbound = (arr) => arr !== figma.mixed && arr.some((p) => p.visible !== false && p.type === "SOLID" && !(p.boundVariables && p.boundVariables.color));
for (const id of ROOTS) {
  const root = await figma.getNodeByIdAsync(id); const path = (n) => root.name.replace("Dweb / CRF revamp / ", "") + " > " + (n.parent && n.parent.type === "COMPONENT" ? n.parent.name + " > " : "") + n.name;
  const walk = async (n, inInst) => {
    if (n.type === "INSTANCE" && !inInst) {
      const mc = await n.getMainComponentAsync(); const setName = mc && mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent.name : mc && mc.name;
      const iconLib = mc && mc.remote && Object.values(ICON_KEYS).some((k) => Object.values(k).includes(mc.key));
      if (!iconLib && !ALLOWED_LIB.test(setName || "")) add("instance from unknown source", path(n) + " <" + setName + ">");
    }
    if (inInst || isBrand(n)) { if (isBrand(n) && !inInst) known.brand++; if ("children" in n) for (const c of n.children) await walk(c, true); return; }
    if ("fills" in n && n.fills !== figma.mixed) {
      if (unbound(n.fills)) add("raw hex fill", path(n));
      if (n.fills.some((p) => p.type.startsWith("GRADIENT"))) { const raw = n.fills.some((p) => p.gradientStops && p.gradientStops.some((s) => !(s.boundVariables && s.boundVariables.color))); if (raw) add("raw gradient (no alpha token)", path(n)); else known.gradients++; }
      if (n.fills.some((p) => p.type === "IMAGE")) known.images++;
    }
    if ("strokes" in n && n.strokes.length && unbound(n.strokes)) add("raw hex stroke", path(n));
    if (n.effects && n.effects.length) { known.effects++; add("effect (no elevation token in Bricks)", path(n) + " " + n.effects.map((e) => e.type).join("+")); }
    if (n.type === "TEXT") {
      if (!n.textStyleId || n.textStyleId === figma.mixed) { const segs = n.getStyledTextSegments(["textStyleId"]); if (segs.some((s) => !s.textStyleId)) add("text without style", path(n)); }
      if (n.fills !== figma.mixed && unbound(n.fills)) add("raw text colour", path(n));
      const sizes = n.fontSize === figma.mixed ? n.getStyledTextSegments(["fontSize"]).map((s) => s.fontSize) : [n.fontSize];
      if (Math.min(...sizes) < 14) add("text under 14px", path(n) + " " + Math.min(...sizes));
      if (/[–—·]/.test(n.characters)) add("dash or middle dot", path(n));
    }
    if ((n.type === "FRAME" || n.type === "COMPONENT") && n.layoutMode && n.layoutMode !== "NONE") {
      const bv = n.boundVariables || {};
      for (const k of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]) if (n[k] && !bv[k]) add("raw padding", path(n) + " " + k + "=" + n[k]);
      if (n.itemSpacing && n.children.filter((c) => c.visible && c.layoutPositioning !== "ABSOLUTE").length > 1 && !bv.itemSpacing) add("raw gap", path(n) + " " + n.itemSpacing);
    }
    if ((n.type === "FRAME" || n.type === "RECTANGLE" || n.type === "COMPONENT") && n.topLeftRadius && !(n.boundVariables || {}).topLeftRadius && !(n.boundVariables || {}).bottomLeftRadius) add("raw radius", path(n) + " " + n.topLeftRadius);
    if (n.type === "FRAME" && n.layoutMode === "NONE" && !isBrand(n)) add("frame without auto layout", path(n));
    if (/^Frame( \d+)?$/.test(n.name)) add("default layer name", path(n));
    if (n.layoutPositioning === "ABSOLUTE" && n.parent && "width" in n.parent) { if (n.x < -1 || n.y < -1 || n.x + n.width > n.parent.width + 1) add("absolute layer outside parent", path(n)); }
    if ("children" in n) for (const c of n.children) await walk(c, n.type === "INSTANCE");
  };
  await walk(root, false);
}
const summary = Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length]));
return JSON.stringify({ summary, known, detail: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, [...new Set(v)].slice(0, 12)])) }, null, 1);
