// Mechanical hex → DS token replacer.
// Reads target files, replaces every occurrence of each mapped hex with var(--ds-*).
// Word-boundary safe: a hex literal must end at end-of-hex (not followed by [0-9a-fA-F]).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");

const MAP = {
  // Whites / warm neutrals
  "#ffffff": "var(--ds-color-warm-neutral-0)",
  "#fff":    "var(--ds-color-warm-neutral-0)",
  "#fafafa": "var(--ds-color-warm-neutral-50)",
  "#fdfbf7": "var(--ds-color-warm-neutral-50)",
  "#fdfaf6": "var(--ds-color-warm-neutral-50)",
  "#fcfbf8": "var(--ds-color-warm-neutral-50)",
  "#fffdf8": "var(--ds-color-warm-neutral-50)",
  "#faf9f5": "var(--ds-color-warm-neutral-50)",
  "#f6f4ed": "var(--ds-color-warm-neutral-100)",
  "#f2ece2": "var(--ds-color-warm-neutral-100)",
  "#ebe5dc": "var(--ds-color-warm-neutral-200)",
  "#e8e4dc": "var(--ds-color-warm-neutral-200)",
  "#e8e3d8": "var(--ds-color-warm-neutral-200)",
  "#d8d4cf": "var(--ds-color-warm-neutral-300)",
  "#d2c8b8": "var(--ds-color-warm-neutral-400)",
  "#cec7bc": "var(--ds-color-warm-neutral-300)",
  "#c9bda5": "var(--ds-color-warm-neutral-400)",
  "#c9b8a6": "var(--ds-color-warm-neutral-400)",
  "#9a948e": "var(--ds-color-warm-neutral-500)",
  "#948f89": "var(--ds-color-warm-neutral-500)",
  "#8a8580": "var(--ds-color-warm-neutral-600)",
  "#8a8278": "var(--ds-color-warm-neutral-600)",
  "#6f6a65": "var(--ds-color-warm-neutral-600)",
  "#5c4f4a": "var(--ds-color-warm-neutral-700)",
  "#4a433c": "var(--ds-color-warm-neutral-700)",
  "#1f1c18": "var(--ds-color-warm-neutral-900)",

  // Grey neutrals
  "#f5f5f5": "var(--ds-color-grey-neutral-50)",
  "#f0f0f0": "var(--ds-color-grey-neutral-100)",
  "#eeeeee": "var(--ds-color-grey-neutral-100)",
  "#ececec": "var(--ds-color-grey-neutral-100)",
  "#ebebeb": "var(--ds-color-grey-neutral-100)",
  "#e8e8e8": "var(--ds-color-grey-neutral-100)",
  "#e5e5e5": "var(--ds-color-grey-neutral-200)",
  "#e0e0e0": "var(--ds-color-grey-neutral-200)",
  "#d9d9d9": "var(--ds-color-grey-neutral-200)",
  "#d4d4d4": "var(--ds-color-grey-neutral-200)",
  "#a3a3a3": "var(--ds-color-grey-neutral-400)",
  "#888888": "var(--ds-color-grey-neutral-500)",
  "#7d7d7d": "var(--ds-color-grey-neutral-500)",
  "#757575": "var(--ds-color-grey-neutral-600)",
  "#737373": "var(--ds-color-grey-neutral-600)",
  "#666666": "var(--ds-color-grey-neutral-700)",
  "#555555": "var(--ds-color-grey-neutral-700)",
  "#525252": "var(--ds-color-grey-neutral-800)",
  "#444444": "var(--ds-color-grey-neutral-800)",
  "#444":    "var(--ds-color-grey-neutral-800)",
  "#404040": "var(--ds-color-grey-neutral-800)",
  "#333333": "var(--ds-color-grey-neutral-800)",
  "#2d2d2d": "var(--ds-color-grey-neutral-800)",
  "#262626": "var(--ds-color-grey-neutral-900)",
  "#222":    "var(--ds-color-grey-neutral-900)",
  "#171717": "var(--ds-color-grey-neutral-900)",
  "#141414": "var(--ds-color-grey-neutral-900)",
  "#0f0e0d": "var(--ds-color-grey-neutral-900)",
  "#0a0a0a": "var(--ds-color-grey-neutral-900)",
  "#1a1a1a": "var(--ds-color-grey-neutral-900)",
  "#000000": "var(--ds-color-grey-neutral-900)",

  // Brand purples — collapse the indigo family onto purple-700/-800
  "#4a16d9": "var(--ds-color-purple-700)",
  "#4003da": "var(--ds-color-purple-700)",
  "#3508c4": "var(--ds-color-purple-800)",
  "#3200a8": "var(--ds-color-purple-800)",
  "#3c2bb0": "var(--ds-color-purple-800)",
  "#4c3494": "var(--ds-color-purple-800)",
  "#5b21b6": "var(--ds-color-purple-800)",
  "#3946b8": "var(--ds-color-purple-800)",
  "#3730a3": "var(--ds-color-purple-800)",
  "#1a0a52": "var(--ds-color-purple-900)",
  "#6b52d8": "var(--ds-color-purple-500)",
  "#7c3aed": "var(--ds-color-purple-500)",
  "#4f46e5": "var(--ds-color-purple-600)",
  "#5b6cf0": "var(--ds-color-purple-500)",
  "#bfa7f1": "var(--ds-color-purple-300)",
  "#c7d2fe": "var(--ds-color-purple-200)",
  "#ece9f7": "var(--ds-color-purple-50)",
  "#f7f6fc": "var(--ds-color-purple-50)",
  "#eef2ff": "var(--ds-color-blue-50)",

  // Pinks / reds
  "#fff0f3": "var(--ds-color-pink-50)",
  "#ffd0d8": "var(--ds-color-pink-100)",
  "#e91e63": "var(--ds-color-pink-500)",
  "#e8006e": "var(--ds-color-pink-600)",
  "#ef4444": "var(--ds-color-red-500)",
  "#e11d48": "var(--ds-color-red-500)",
  "#b42318": "var(--ds-color-red-700)",
  "#c2410c": "var(--ds-color-red-700)",
  "#9a3412": "var(--ds-color-red-800)",
  "#d97706": "var(--ds-color-yellow-600)",

  // Greens / teals (closest DS option)
  "#245f36": "var(--ds-color-green-800)",
  "#2e7d32": "var(--ds-color-green-600)",
  "#e8f5e9": "var(--ds-color-green-50)",
  "#e6f9f6": "var(--ds-color-green-50)",
  "#02987a": "var(--ds-color-green-600)",
  "#0d9488": "var(--ds-color-green-600)",
  "#0f766e": "var(--ds-color-green-700)",

  // Soft butter / yellow
  "#fff9e6": "var(--ds-color-soft-butter-50)",
  "#ffe566": "var(--ds-color-soft-butter-200)",
  "#ffcd03": "var(--ds-color-soft-butter-300)",
  "#f5c400": "var(--ds-color-soft-butter-400)",
  "#f5d84a": "var(--ds-color-soft-butter-300)",
  "#c9a227": "var(--ds-color-yellow-500)",

  // Slate / pistachio
  "#64748b": "var(--ds-color-grey-neutral-600)",
  "#f3f7ec": "var(--ds-color-pistachio-sand-50)",
};

const FILES = [
  "src/styles/base.css",
  "src/styles/buy-mobile-shell.css",
  "src/styles/buy-mobile-topfold.css",
  "src/components/BuyersMegaMenu.tsx",
  "src/megamenu-main.tsx",
];

// Sort hex keys long → short so 4-digit shorthand (#fff, #444, #222) is
// replaced AFTER any 6/8-digit literal it overlaps with.
const hexes = Object.keys(MAP).sort((a, b) => b.length - a.length);

let grandTotal = 0;
const perFile = [];

for (const rel of FILES) {
  const abs = resolve(repo, rel);
  let src;
  try { src = readFileSync(abs, "utf8"); }
  catch { console.warn(`skip (missing): ${rel}`); continue; }

  let updated = src;
  let fileCount = 0;
  const perHex = {};

  for (const hex of hexes) {
    // Match the hex case-insensitively, but require that it's not part of a longer hex.
    // The lookbehind ensures we don't match inside another hex; the lookahead does the same on the right.
    const esc = hex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![0-9a-fA-F])${esc}(?![0-9a-fA-F])`, "gi");
    const m = updated.match(re);
    if (!m) continue;
    perHex[hex] = m.length;
    fileCount += m.length;
    updated = updated.replace(re, MAP[hex]);
  }

  if (updated !== src) {
    writeFileSync(abs, updated);
    perFile.push({ rel, count: fileCount, perHex });
    grandTotal += fileCount;
  }
}

console.log(JSON.stringify({ grandTotal, perFile }, null, 2));
