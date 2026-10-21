---
name: rfe-figma-handoff
description: Turn a prototype feature into a Ready-for-Engineering (RFE) Figma handoff for devs. Builds the changed UI as new variants of existing Demand Component Kit / Bricks components, publishes ONLY those, updates the product file, lays out the RFE page (Page kit header, flow pills, whole-page instances at 360x800) and adds short categorised dev notes. Use when the user asks for an RFE, dev handoff, "ready for dev / engineering" frames, to put a prototype feature on Figma, or to change anything on an existing RFE page.
---

# RFE Figma handoff

Everything here was set up and agreed with Shashwat on 2026-10-21. Follow it exactly; it encodes many corrections. When a rule here conflicts with a habit, the rule wins.

## 0. Before starting

- Ask only what is genuinely unknown: which feature / prototype (route or experiment flag), which product file + page, platforms. Defaults: platforms "Android/iOS/mweb", 360 wide, 800 tall.
- Read the prototype code first (markup + CSS) and match it exactly: sizes, paddings, colours, copy, states. Never approximate from memory or screenshots.
- Prototype for Seen in photos pills = experiment `srp_image_feature_pills` (toggle: double-click Housing logo on homepage, radio button), files `src/srp-image-search-pills-main.js`, `src/srp-isp-filters.js`, `src/data/srpFeaturePills.js`, `src/data/srpFeatureIcons.js`, `src/components/SrpSearch.css`, `src/components/SrpImageSearchPills.css`.
- Rules in this repo's CLAUDE.md still apply (scoped git, no full reads of big files, verification proportional).

## 1. Files, libraries, IDs

| What | Figma file | Key / node |
|---|---|---|
| Product file (SRP) | Search Results Page (SRP) [Demand] `smvDlE5T1d0J7sBiLuOaKe` | pages under "✅ Tech hand-over: SRP" (names `      ↳ <Name>`), canvas bg `#f2f2f2` |
| Product component kit | Demand Component Kit `xYC0W1LzOyf0ll2LF5iCZq` (tab title contains a U+2028; match it with "Component Kit") | SRP page of the kit holds all SRP sets |
| Design system (tokens, text styles, Button, Tooltip) | Bricks Design System `ZGl9LhEtqlE9JiMKBuYrdT` | repo rules in `~/Documents/Work/Cursor:Claude/bricks-design-system` |
| Icons | Iconography (Bricks) `Rq1j8iqvbJBYRb52tdpgFg` | page "Components", `<Name>_bg_wrapper` grid |
| Page management | "Page Management Components" library | Page kit set `e268301ec758fca1eb5cd902f800dcec1d989ca2` |
| Reference RFE layout | Sample File [Demand] `13QumTZLIxuCIPzCyhg1tM` section `3:5434` | |

Component sets (import with `figma.importComponentSetByKeyAsync`):

| Set | Key | Kit node | Notes |
|---|---|---|---|
| Page kit | `e268301e…989ca2` | | Type = Ready / In progress / In review / Info strip / Flow small / Flow large / Prototype |
| Bricks Button `buttons` | `1cdd6502c90fd59d70b838a35fb444d63aef2d88` | | Variant Primary/Secondary/Tertiary/Destructive/Link…, Size S/M/L (M = 40h), State; `Label#129:0` |
| Bricks Tooltip | `15d63a3b2e4fb02adec5c768531a2665eefa764a` | | Device Web/Mobile, Placement, Align; `Dismissible#2376:325`, `Heading#2376:350` |
| SRP m-web page | `6b925573cd5f4582560b360deda5cfa01fdd7c6d` | `5355:24263` | Property 2 = Buy, Buy: Feature pills, Buy: Feature pills (1 selected), (2 selected), Rent: Feature pills |
| SRP header (Base, Top) | `88f3a3ec6e3c59aa5615b5c81973261cf028722d` | `2533:3148` | Property 3 = Buy, New projects, Buy: Feature pills [(1/2 selected)] |
| Search bar | `01acabae6a2bdf4259eaa095c735ed5b2c540c0b` | `2031:936` | Main search, Search + AI, Intl, Search + AI: Feature pills |
| Filters chip | `24c5768cfe7b8070953d5e7542fbb54ce6129f3e` | `2307:13002` | Sorting, Icon: Filter off/on, Filters: Off, Filter: On, Clear filters. Flagged "Invalid asset", ships nested inside published sets |
| SRP / Filters (screen) | `e43119bc26faf1b156b94663e95f87785e1c45da` | `2837:5404` | Android Buy/Rent Filters, Filters: Features |
| Right column (filter panes) | `00a53ca1d07ed1f0ee2d7425b75ebbe175aa8295` | `2772:13237` | Property 4 = categories incl. Features (`6912:49510`) |
| Left drawer (filter rail) | | `2830:4356` | Buy rail has a Features item |
| Property cards / M-Web | `28f78db4dccb387edd73bb7b4aee4e2d93f650dc` | | SEO cards, Project card |
| Bottom navigation | `77b7aee6dec5b2098e39660504f18dc44b1f1e44` | `2117:6306` | Default, Buy, AI, Buy resale (Explore, Projects, Top localities, Shorts, Saved 188) |
| Rent bottom navigation | `533896f00ee7343d68b9c6ef5097e0ac67f863a0` | `3477:9443` | Default, Rent SRP (Suggestion=Lightbulb, Premium=SketchLogo, Saved 5, Profile) |

Bricks variable collections (library keys, use via `teamLibrary.getVariablesInLibraryCollectionAsync`): color_tokens `accf946a90feb25ede10a9452156627b5998e5b7`, color_primitives `f5fccecefd528ead51ee592da1b3aa721f819a91`, spacing `5cfae191b5576c0c1c4457fc37835db40393fdb9`, radius `0348dd7719c78a10b02c695ea920e3aa3326d4a6`, typography `db475d7c661b50141e79f3b7db1cf83470ef8488`. Text style keys: `figma-rfe/text-style-keys.json` (66). Icon keys: `figma-rfe/icon-keys.json`.

## 2. Tooling (folder `figma-rfe/`)

All scripts drive the Figma desktop app via figma-cli's debug port (9222). `figma-cli daemon start` if "fetch failed".

| File | Does |
|---|---|
| `run.mjs "<tab>" a.js b.js` | Runs plugin-API JS in a named file tab (files concatenated, top-level `await`/`return` ok). Switches the visible tab, opens the file if closed, reloads a stale tab and retries. Injects ICON_KEYS / STYLE_KEYS |
| `tabs.mjs` | `switchTab(title)`: clicks the tab in Figma's shell tab bar (`shell.html`, `button[role=tab]`) and waits for `aria-selected`. `Page.bringToFront` alone does NOT change the visible tab |
| `figma-ui.mjs "<tab>" <action>` | UI actions the plugin API can't do: `quick "<text>"` (Quick actions, types only into the real search box), `click "<label>"` (real mouse click), `click-at "x,y"` (CSS px = screenshot px / 2), `buttons`, `read`, `escape`, `reload`. Allowed in `.claude/settings.local.json` |
| `publish.mjs "<tab>" <nodeId…>` | Publish ONLY those sets: selects them, opens Publish selected components, scrolls the dialog, aborts if any other row is ticked, publishes, waits for CURRENT |
| `accept-updates.mjs "<tab>" "<Name>"…` | Accepts library updates for the CURRENT PAGE only; aborts if a listed update is not one of ours |
| `lib.js` | Token-bound builders: `paint/fill/stroke` (bound to tokens, base colour = resolved value), `pad/gap/wrapGap/rad`, `frame/fillW/fixedSize`, `text/style/emphasise`, `icon/duoIcon/tintIcon/iconComponent`, `gradient` (bound stops), `button`, `variant`, `setInstanceText`, `audit(root)`; call `dropProbe()` before `return` |
| `isp-blocks.js` | Feature-specific builders (pills data, chip rows, search row, tooltip-era tip, count line, card) |
| `kit-*.js` | Kit edits: `kit-isp-components.js` (search/header/page variants), `kit-features-filter.js` + `kit-features-pills.js` (Features filter pane), `kit-navs.js` (navs + Rent page variant) |
| `build-isp.js` | Builds the RFE page section from page instances only |
| `notes-isp.js` | Dev notes (annotations with categories) |
| `icon-lightbulb.js`, `icon-place.js` | Add an icon to Iconography in house format; place it alphabetically in the grid |

Scratch inspection scripts go in the session scratchpad, not the repo.

## 3. Workflow

1. **Inspect** the prototype code and the kit: find which existing kit sets already own the UI that changes (search bar, header, filters, cards, nav, page). Dump their structure (`findAll`, sizes, paddings, styles) before touching anything.
2. **Kit first.** Everything shown on the RFE is a kit component. Changed UI = NEW VARIANTS of the existing kit sets (never detached copies, never local frames on the RFE). Unchanged UI = existing kit instances (cards, nav…). The full screen itself is a variant of the kit page set (e.g. SRP page `Property 2=Buy: Feature pills`). One variant per state; variant values cannot contain commas (`Buy: Feature pills (1 selected)`).
3. **Build variants** token-bound (`lib.js`): every fill/stroke a Bricks colour token, padding/gap/radius spacing+radius tokens, every text a Bricks text style (`Mobile/*`, `CTA/*`), icons Bricks Iconography instances, CTAs Bricks Button. Mirror the sibling variants' shell (clone a sibling, e.g. BHK filter pane, then replace content).
4. **Kit hygiene** (hard rule): new variants go below existing rows on the set's grid; never edit existing variants; if a set grows, shift items below it down and grow the section; verify zero overlaps at set, section and page level and nothing sticking out of its section (3 pre-existing stick-outs on the kit SRP page are not ours: SRP /Bottom sheets: Hotspots / Amenities, SRP / Desktop / Buy: Hotspots card, Hotspots card / Properties).
5. **Publish only ours**: `node figma-rfe/publish.mjs "Component Kit" <setIds…>`. The kit has ~200 pending team changes (incl. removals, variables, styles): never "Publish changes to library". If a set nests another changed set, publish both. Iconography: same script with `"Iconography"`.
6. **Accept updates in the product file for the RFE page only**: `node figma-rfe/accept-updates.mjs "Search Results Page" "SRP" "SRP / Filters"`. Never "Show updates for all pages" / update other pages (others' work, e.g. PDP / d-web). Updates can take ~10-60s to arrive; the script retries.
7. **Build the RFE page**: `node figma-rfe/run.mjs "Search Results Page" figma-rfe/lib.js figma-rfe/build-isp.js` (copy and adapt for a new feature). Then notes: `… figma-rfe/notes-isp.js`.
8. **Verify** with scripts (sizes, bindings, which variant each screen uses, annotations count). One export/screenshot only for real visual judgement (`node.exportAsync` → base64 through `run.mjs`; it writes stdout fully).
9. **Report** plainly what changed, what was published, what was not verified.

## 4. RFE page layout

- New page under "✅ Tech hand-over: SRP" (insert before the first `--` separator), name `      ↳ <Feature>` (copy the prefix from the Buy page name). Canvas bg copied from a sibling page (`#f2f2f2`); API-created pages default to dark `#1e1e1e`.
- If the page or an RFE section already exists, reuse it; never duplicate.
- One SECTION, white (`surface/white`), corner radius 100 (like "RFE: Android"), name `RFE: <platform> · <Feature>` (no dashes).
- Page kit (instances from the library): Type=Ready at (101,100) with `#Label` "Sprint" and subline = flag/rollout; Type=Info strip at (101,361) text "Android/iOS/mweb"; Type=Flow small above each screen at y 585, resized to screen width (360), text = screen name.
- Screens: one whole-page kit instance each at y 702, x from 101 stepping 510 (360 + 150 gap), named like the flow pill. Mobile screens 360x800 (`instance.resize(360, 800)`) unless the user asks for full length. Kit page variants pin the bottom nav / bottom bar (absolute, constraint bottom, matching bottom padding `5xl` / `6xl`) so 800-tall views keep it visible.
- Section size hugs content: width max(3280, content), height = lowest screen bottom + 100 (same margin as the top). No empty space.

## 5. Visual rules (all hard)

- No em or en dashes anywhere: copy, layer names, section names, notes.
- Tokens only (Bricks). If no token exists (e.g. 6px gap, 160px image, 100 section radius, 1px stroke), use the closest/house value and say so. Gaps: motion, opacity, elevation, z-index, stroke width, icon sizes, `surface/inverse` (use `warm_neutral/900`).
- Icons: only Bricks Iconography, live instances, `Format=Stroke, Weight=Regular, Size=24` default; Duotone 16 for coloured feature icons (light tone = fill at 100%, dark tone = strokes). Missing icon → add it to Iconography properly (section 7), never hand-draw on the RFE.
- CTAs: Bricks Button instances only (never old kits `med_impact_button`, `high_impact_button`, `button theme=demand`, `CTA`).
- Search box always one line, fixed 48h; text `maxLines 1` + `textTruncation ENDING`. Same for chips, pills, nav labels.
- SRP chips (search chrome) = kit "Filters" chip set (has shadow). Filters SCREEN pills = filter-screen pattern (Budget "Popular selections"): 32h (`strokesIncludedInLayout=false`), pad 8, gap 8, radius s, `surface/white` + `border/subtle`, `Mobile/Body/small_regular` `text/primary`, NO shadow; selected = `surface/subtle` + `border/selected`, NO close icon (tap again to unselect). The X close icon exists only on SRP page pills.
- Feed background behind cards = prototype `--isp-subtle` `#faf9f5` = `surface/subtle`; header bands white; search container gradient `warm_neutral/200 → warm_neutral/0` with token-bound stops.
- Spacing must look balanced: measure actual px (component inner padding counts, e.g. kit cards carry 16 top). Results line: 16 above, 16 below.
- Guides / tips / demo hints = Bricks Tooltip (Device=Mobile, Placement=Bottom, Align=Start), ABSOLUTE over the UI, caret pointing at its target, one line, Dismissible on, Heading off, no extra icons, width hugs text (`text width + 48`). Never in the layout flow.
- Bottom nav labels: `Mobile/Label/small_regular` 10px, items equal width (no side padding, no gaps, FILL, centered), badge `highlight` pink with `Mobile/Label/small_medium` text/inverse pinned to the heart.
- Single-line text must never wrap; check label slot width vs natural width.

## 6. Dev notes

- Native Figma annotations on the layer inside the screen instance; max ~5-7 per RFE, one short line each, only behaviour invisible in the frame: haptics, durations, rotation intervals, show-once/persistence, flags, ordering, data swaps.
- Every note has a category: **Interaction** (preset) = motion, haptics, durations, gestures; **Development** (create green via `figma.annotations.addAnnotationCategoryAsync` if missing) = flags, logic, ordering, persistence, data. One note per category per layer.
- Re-run notes after every RFE rebuild (instances are recreated).

## 7. Iconography additions

- Format (copy from an existing set like Lamp): white `<Name>_bg_wrapper` frame r4 148x240 containing COMPONENT_SET 112x204 at (18,18); variants `Format=Stroke, Weight=Regular|Fill|Duotone, Size=12|14|16|18|20|24` laid out columns x = 0, s+20, 2(s+20), rows y += s+20; each variant = invisible full-size bounds vector + glyph vectors, stroke weight = size/16, round caps/joins, `#222222`, SCALE constraints; Fill = solid; Duotone = 20% fill + strokes; description = search tags. Build from the Phosphor stroke paths (`icon-lightbulb.js` is the template).
- Placement (hard rule): the Components page is one packed grid (17 cols, 172 apart, rows 264) of category blocks, each alphabetical. Put the new wrapper right after its alphabetical predecessor in the matching category and shift the chain to the first free slot (`icon-place.js`, dry run first). Verify 0 overlaps, nothing off-grid, neighbours. Never leave an icon at a random spot.
- Publish only the new icon set (`publish.mjs "Iconography" <setId>`), then add its key to `icon-keys.json`.

## 8. Gotchas (learned the hard way)

- figma-cli `eval` chokes on top-level await → always `run.mjs`.
- Background tabs lose the plugin context ("Could not find Figma execution context") → `run.mjs` switches tab + reloads; the canvas keeps focus on a hidden `INPUT.focus-target`, so never type unless the Quick actions `INPUT[placeholder=Search]` is focused (letters on the canvas are tool shortcuts).
- Figma list items ignore `element.click()` → real mouse events (`figma-ui click`).
- Quick actions Enter may run a different first option → click the "Publish selected components" entry.
- Variant switch on a nested instance invalidates its sublayer ids → resolve labels first, then switch, then re-query.
- `importComponentSetByKeyAsync` works through `run.mjs` (~7s); unpublished sets can't be imported → reach them through a published set that nests them (`getMainComponentAsync().parent`).
- Bound paints with a black placeholder can render black → `paint()` sets the resolved token value as base colour.
- Plugin API can't publish libraries or accept updates → `publish.mjs` / `accept-updates.mjs`.
- `getPublishStatusAsync` lags a few seconds after publishing; poll.
- Instances in product files don't change until the update is accepted; published-but-not-accepted looks like "nothing happened".
- Strokes count in hug layout unless `strokesIncludedInLayout = false`.
- Text in fixed slots: measure natural width with a clone (`textAutoResize WIDTH_AND_HEIGHT`) before trusting a fit.
- Annotations survive library updates; they are lost on rebuild.
- Never chain `sleep` for waits in Bash; poll a condition.

## 9. Done checklist

- [ ] Every RFE screen is one kit page instance at 360x800 (or full length on request).
- [ ] Changed UI lives as variants in the kit; zero overlaps; existing variants untouched.
- [ ] Only our sets published; only the RFE page updated in the product file.
- [ ] Page kit header (Ready, Sprint, flag) + Info strip "Android/iOS/mweb" + flow pills.
- [ ] Section rounded 100, white, hugs content (100 bottom margin).
- [ ] Tokens, Bricks styles, Bricks icons, Bricks Buttons; no dashes; single-line inputs.
- [ ] Dev notes short and categorised.
- [ ] Iconography additions in house format, alphabetical slot, published alone.
- [ ] Memory updated with any new rule the user gave.

## Worked example: Seen in photos pills (2026-10-21)

RFE page `↳ Image search pills`, section `6687:3997` in the SRP file: SRP Default with tip (Buy), One feature selected, Two features selected, SRP Rent Default with tip, Filters: Features. Kit additions: Search bar `Search + AI: Feature pills` `6914:50920`; header variants `6915:50938`, `6916:51335`, `6916:51622`; page variants `6916:51912`, `6916:52850`, `6916:53713`, Rent `6923:29822`; Filters: Features `6916:54579`; Right column Features `6912:49510`; navs `6923:29437` (Buy resale), `6923:29562` (Rent SRP); Iconography Lightbulb set `11447:140` (wrapper `11447:141`, Regular 24 key `0942cac9cdbbc2f12b0fe8816783e453f4c7e55a`). Feature pills use Duotone icons: Natural light Sun (soft_butter/200, yellow/600), Modular kitchen CookingPot (red/200, red/500), Balcony BuildingApartment (pistachio_sand/200, /500), Good ventilation Wind (blue/100, blue/500), Sea view Waves (blue/200, blue/700), Spacious rooms ArrowsOut (pink/200, pink/600), Terrace SunHorizon (soft_butter/200, green/600), Garden view Tree (green/200, green/600), Features SquaresFour (purple/200, purple/700). Tooltip copy "Most searched features".
