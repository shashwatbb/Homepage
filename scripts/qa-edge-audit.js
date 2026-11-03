// Edge-padding audit for NP PDP (desktop). Paste into the page console (or javascript_tool)
// on the prod build at 1280 wide. Flags any bordered/filled box whose text sits 0-5px from
// its left/right inner edge (e.g. RERA IDs card rows touching the border).
// Returns { page: [...], <popup>: [...] }; every list should be empty.
(async () => {
  const audit = (root) => {
    const out = [];
    for (const b of root.querySelectorAll("*")) {
      const cs = getComputedStyle(b);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (["BUTTON", "INPUT", "IMG", "LABEL", "A", "SVG"].includes(b.tagName)) continue;
      const br = b.getBoundingClientRect();
      if (br.width < 120 || br.height < 30) continue;
      const bordered = parseFloat(cs.borderLeftWidth) > 0 && cs.borderLeftStyle !== "none" && parseFloat(cs.borderRightWidth) > 0;
      const bg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && b.parentElement && cs.backgroundColor !== getComputedStyle(b.parentElement).backgroundColor;
      if (!bordered && !bg) continue;
      const L = br.left + parseFloat(cs.borderLeftWidth), R = br.right - parseFloat(cs.borderRightWidth);
      const w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        if (!n.textContent.trim()) continue;
        const btn = n.parentElement.closest("button,a,label,input");
        if (btn && b.contains(btn) && btn !== b) {
          const s = getComputedStyle(btn);
          if (parseFloat(s.paddingLeft) >= 8 || parseFloat(s.borderLeftWidth) > 0) continue;
        }
        const rg = document.createRange();
        rg.selectNodeContents(n);
        const rr = rg.getBoundingClientRect();
        if (!rr.width || rr.top < br.top || rr.bottom > br.bottom) continue; // clipped carousel text
        const dl = rr.left - L, dr = R - rr.right;
        if ((dl >= 0 && dl < 6) || (dr >= 0 && dr < 6)) {
          out.push({ box: String(b.className || b.tagName).slice(0, 40), text: n.textContent.trim().slice(0, 24), dl: Math.round(dl), dr: Math.round(dr) });
          break;
        }
      }
    }
    return out;
  };
  const res = { page: audit(document.body) };
  for (const p of ["about", "payment", "insights", "amenities", "share", "ask", "compare", "brochure", "city", "app", "menu", "rera", "asked"]) {
    window.__npOpen(p);
    await new Promise((r) => setTimeout(r, 500));
    res[p] = audit(document.querySelector("[role=dialog]") || document.body);
  }
  return res;
})();
