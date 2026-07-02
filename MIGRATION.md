# Design Token Migration — Final Report

Source of truth: `design-system/tokens/*.tokens.json` (DTCG). CSS bridge: `design-system/tokens.css`. Component code must reference `var(--ds-*)` or the `ds.*` Tailwind utilities — raw values are only allowed inside `design-system/tokens.css`.

## Result summary

| Metric | Value |
|---|---|
| Tokens defined (color primitives + aliases + spacing + radius + typography) | 200+ CSS variables |
| Files touched (excluding new tokens) | 6 (`src/styles/base.css`, `src/styles/buy-mobile-shell.css`, `src/styles/buy-mobile-topfold.css`, `src/components/BuyersMegaMenu.tsx`, `src/megamenu-main.tsx`, `tailwind.config.js`, `src/index.css`) |
| Raw hex literals replaced | **327** |
| Raw hex remaining in component code | **0** |
| Raw hex remaining in `index.html` / `pdp.html` SVGs | 5 (deliberately deferred — user asked to ignore SVG) |
| Build | ✓ green (`vite build`) |
| Tests | ✓ 6/6 pass (`vitest`) |
| UI/markup/logic changes | **none** |

## What changed in the codebase

1. **New** `design-system/tokens/` — 7 canonical DTCG JSON files (manifest + color primitives + color tokens + spacing + radius + typography + text styles).
2. **New** `design-system/tokens.css` — CSS variable bridge (`--ds-*` namespace). **The only file in the repo with raw hex.**
3. **`src/index.css`** — imports `design-system/tokens.css` ahead of Tailwind.
4. **`src/styles/base.css`** —
   - `@import` of `tokens.css` at top of file.
   - `--font-sans` swapped to `var(--ds-font-family-primary)` (Google Sans Flex with Figtree fallback).
   - All 30+ pre-existing `--color-*` and `--color-neutral-*` declarations re-aliased to point at `--ds-color-*` tokens.
   - 314 inline `#hex` literals across 10k lines replaced with `var(--ds-color-*)` references.
5. **`src/styles/buy-mobile-shell.css`** + **`buy-mobile-topfold.css`** — 11 inline hex literals replaced.
6. **`src/components/BuyersMegaMenu.tsx`** — Tailwind ring color swapped from `ring-[#3200A8]/25` to `ring-ds-purple-800/25` (DS purple-800, supports opacity modifier).
7. **`src/megamenu-main.tsx`** — `bg-[#fdfbf7]` → `bg-ds-warm-neutral-50`.
8. **`tailwind.config.js`** — extended `theme.extend` with `ds.*` colors, `ds-*` spacing, `ds-*` radius, `ds-*` fontSize (with line-heights paired per the legal scale). `fontFamily.sans` now points at `var(--ds-font-family-primary)`.
9. **`scripts/migrate-hex-to-tokens.mjs`** — the codemod used for Pass C. Kept for re-runs if new hex creeps in.

## Decisions baked into the mapping

| Decision | Rationale |
|---|---|
| **Font: Google Sans Flex preferred, Figtree fallback.** | User opted in to the swap. Google Sans Flex is not on the public Google Fonts CDN, so on machines without the font file installed/served, rendering falls through to Figtree. No public CDN `<link>` was added. |
| **Brand purples collapsed:** `#4a16d9` / `#4003da` → `purple-700`, `#3200a8` / `#3508c4` / `#3c2bb0` / `#4c3494` / `#5b21b6` / `#3946b8` / `#3730a3` → `purple-800`. | Site shipped a deeper indigo than DS spec; user accepted the shift to closest DS equivalents. The legacy CSS variables `--color-search-icon-chip-bg` / `--color-search-icon-chip-hover` / `--color-overlay-nearby-chevron` were aliased to `purple-700` / `purple-800` rather than removed, so all downstream consumers keep working. |
| **Body ink `#1a1a1a` → `grey-neutral-900`.** | Small warm shift, accepted. Pure `#000000` (SVG fills + 4 stray CSS uses) also collapsed onto `grey-neutral-900` in CSS; remaining `#000000` SVG fills left alone. |
| **Out-of-palette colors mapped to closest DS option:** `#02987a` / `#0d9488` / `#0f766e` (teals) → `green-600`/`-700`; `#d97706` (amber) → `yellow-600`; `#c2410c` / `#9a3412` (burnt orange) → `red-700`/`-800`; `#ef4444` / `#e11d48` → `red-500`; `#ffcd03` / `#f5c400` / `#ffe566` / `#f5d84a` (vivid yellow) → `soft-butter` scale; `#64748b` (slate) → `grey-neutral-600`. | User chose closest-DS option for everything. |
| **rgba/hsla decoratives left as local theme variables in `base.css`.** | ~80 unique values (shadows, hero-tagline tints, themed `[data-active-service]` grid colors) — these are alpha-blended decorative tints, not part of the static palette. They live in scoped `:root` and themed selectors, never inline in component code. |
| **SVG `fill="#..."` attributes left untouched.** | 5 leaks: `index.html:455`, `pdp.html:456` (`#000000` icon), `pdp.html:939-940` (`#FFF9E6` / `#D97706` verified-badge SVG), `pdp.html:1879` (`#e11d48` heart). User said "ignore SVG right now." |
| **Inline `font-size` values left untouched.** | ~10 illegal sizes (`0.8125rem`/13, `0.9375rem`/15, `1.0625rem`/17, etc.) embedded across 10k lines of `base.css`. Snapping each is a per-line judgement that would visibly shift text density — outside the "no UI/UX change" scope. Legal-scale `text-ds-*` utilities are available for any new code; document and revisit when DS-led type pass is in scope. |

## Verification (acceptance criteria)

- ✅ `grep -rE '#[0-9a-fA-F]{3,8}' src/styles src/components src/*.tsx` → 0 matches.
- ✅ `tailwind.config.js` registers every spec color/space/radius/font-size token.
- ✅ Tokens file exports every color / size / spacing / radius from the DS spec.
- ✅ `vite build` green; `vitest run` 6/6 pass.
- ✅ Git diff: only style-value changes — no markup, layout, prop, or logic changes.
- ⚠️ Pixel parity not formally verified — dev server running at http://localhost:5173 for manual smoke test of the 4 entry pages.
- ⚠️ 5 SVG hex literals remain (user-deferred).
- ⚠️ ~10 illegal inline `font-size` values remain (deferred — outside parity scope).

## Deferred / follow-up

1. **SVG fills:** `index.html:455`, `pdp.html:456`, `pdp.html:939-940`, `pdp.html:1879`. Options: swap to `currentColor`, hardcode-to-spec, or accept leaks.
2. **Illegal inline font-sizes** in `base.css` — needs a per-line snap decision (revisit when type system is in scope).
3. **Decorative rgba/hsla** — currently scoped to `base.css` `:root` and themed selectors; not a leak, but could become DS-managed if a future "theme tokens" pass is wanted.
4. **Font file:** verify Google Sans Flex is actually being served to end users. If not, Figtree fallback renders correctly but the DS font is not visible — needs either an internal font file or a fallback policy decision.

## Re-running the codemod

```bash
node scripts/migrate-hex-to-tokens.mjs
```

Edit the `MAP` table at the top to add new hex → token entries if values creep back in.
