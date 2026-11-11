// Final audit fixes (2026-11-11): half-pixel text positions inside auto layout + mixed-style text check.
// x .5 in a vertical stack -> text fills the width and centre-aligns; .5 from a fixed parent of odd slack -> parent +1.
// node figma-rfe/run.mjs "Component Kit" figma-rfe/lib.js figma-rfe/fix-final-halfpx.js
const OWNED = ["7293:23739", "7293:25390", "7302:60742", "7473:35840", "7476:5436", "7473:35355"];
const dec = (v) => Math.abs(v - Math.round(v)) > 0.01; const out = { fixed: [], styles: [] };
for (const id of OWNED) {
  const set = await figma.getNodeByIdAsync(id); let pg = set; while (pg.type !== "PAGE") pg = pg.parent; await figma.setCurrentPageAsync(pg);
  const texts = set.findAll((n) => n.type === "TEXT" && n.visible && !(() => { for (let p = n.parent; p && p !== set; p = p.parent) if (p.type === "INSTANCE") return true; return false; })());
  for (const t of texts) {
    const p = t.parent;
    if (dec(t.x)) {
      if (p.layoutMode === "VERTICAL") { t.layoutSizingHorizontal = "FILL"; t.textAlignHorizontal = "CENTER"; out.fixed.push(`${t.name}: fill + centre`); }
      else if (p.layoutMode === "HORIZONTAL" && p.primaryAxisSizingMode === "FIXED") { p.resize(p.width + 1, p.height); out.fixed.push(`${p.name}: width +1`); }
    }
    if (dec(t.y) && p.layoutMode === "HORIZONTAL") {
      if (p.counterAxisSizingMode === "FIXED") { p.resize(p.width, p.height + 1); out.fixed.push(`${p.name}: height +1`); }
      else { t.textAutoResize = "NONE"; t.resize(t.width, t.height + 1); t.textAlignVertical = "CENTER"; out.fixed.push(`${t.name}: height +1`); }
    }
    if (typeof t.textStyleId !== "string") { // mixed: every range must carry a style
      const segs = t.getStyledTextSegments(["textStyleId"]); const bad = segs.filter((s) => !s.textStyleId);
      out.styles.push(`${t.name} "${t.characters.slice(0, 20)}": ${segs.length} ranges, ${bad.length} unstyled`);
    }
  }
}
dropProbe();
return JSON.stringify(out);
