# Repo rules

## Icons
Source: Bricks Iconography Figma lib — https://www.figma.com/design/Rq1j8iqvbJBYRb52tdpgFg/Iconography--Bricks-
Never hand-draw SVG glyph. Add/replace:
1. `figma-cli status` (start daemon if down)
2. `figma-cli find "<Name>"` — Phosphor naming (MapPin, House, TrendUp, Check…)
3. `figma-cli node tree <componentSetId>` → variant `Format=Stroke, Weight=Regular, Size=24` (project default; Fill/Duotone only if surface calls for it)
4. `figma-cli export node <variantId> -f svg -o <path>.svg`
5. Inline as `currentColor` string in `src/data/*Icons.js` (see `bricksIcons.js`) — no loose `.svg` refs in markup
Hand-drawn glyph only if no library match — say so when used.

## Prototype scope — not production
Frontend mockup only: no real backend/users/money/compliance. Optimize for token/time cost.

1. No deep tracing before small edits — read only touched functions, not whole state machine.
2. Verify once, not in a loop — one screenshot/console check per change, no retries chasing stale renders.
3. Ignore known splash-canvas bug (Lottie hang, canvas zero-width race) — reload once if blocking, move on, don't diagnose. **HARD STOP**: if the page is still blocked by this after that one reload, stop all browser investigation for the task immediately. Do not: navigate again, call `get_page_text`/`read_page` again, resize the viewport to troubleshoot, re-inspect `innerHTML`, grep the codebase for a way around the preview, or run further JS diagnostics. Instead: state that browser verification is blocked, verify the change at the code/diff level, continue with the task, stop. This failure is confirmed, not per-attempt — don't re-open the browser to try again on a later, unrelated task just because it's a new turn; treat "browser verification unavailable" as still true until the user says the preview itself has been fixed.
4. Don't exhaustively test every branch — spot-check happy path only, skip edge-case permutations unless asked.
5. Don't poll deploy status in a loop — push, wait once, check once, report link.
6. Mock data can be simple/flat/obviously fake — no elaborate logic.
7. Skip production hardening unless asked (cross-browser, a11y audits, error-state coverage, input validation).
8. No Plan-mode ceremony for small changes — reserve for genuine multi-file rewrites.
9. Grep before full-file reads — `grep -n` target, then `Read` with offset/limit; full read only on first open.
10. Never bare `git status`/`git add -A` (200+ unrelated files here). Always scope: `git status --short -- <files>`, `git add <explicit files>`.
11. Drive flows via `data-action` selectors, not screenshot-click. Verify via `javascript_tool`: `document.querySelector('[data-action="..."]').click()` + read `document.body.innerText`.
11a. **HARD: screenshots are last resort.** Before any screenshot, check if one of these answers it instead:
   - click/screen/copy correctness → `get_page_text` / `document.body.innerText`
   - exact color/size/spacing/position → `getComputedStyle(el)` / `el.getBoundingClientRect()`
   - element present/class applied → `document.querySelector(...)` / `classList.contains(...)`
   - console/network errors → `read_console_messages` / `read_network_requests`
   Screenshot only for genuine subjective visual judgment (feel/smoothness/gradient), max one per change, never a loop.
12. Background research/Plan agents only for genuinely large multi-file rewrites — otherwise read relevant functions yourself.

If scope is ambiguous: do smallest change that satisfies it, state what was skipped.

## Token discipline (additions)
13. Named target first: if given a file/component/function name, search/read that exact thing before anything else. Never open-ended-explore the repo for a small task.
14. Never full-read `index.html`, `pdp.html`, `design-system-audit.md`, `MIGRATION.md`, `SRP_DESIGN_RULES.md` — grep/offset-read only. Never `Read`/`glob` `Icons regular/`, root-level `*.png`, `dist/`, `node_modules/`, `public/pdp-gallery/*.png`.
15. No subagents for single-file edits, CSS/copy/spacing tweaks, or anything where the target file is already known. Subagents only for genuinely unfamiliar cross-file exploration or an explicitly requested audit/critique.
16. Don't run the full test suite or a full build after a trivial CSS/copy/spacing edit — targeted check only, proportional to what changed.
17. Skills (design/UX review suite) are uninstalled from this project by default — token cost of always-on skill listings wasn't worth it for solo frontend prototyping. Re-add via symlink from `.agents/skills/<name>` to `.claude/skills/<name>` if a specific one is wanted for a task; don't reinstall the whole suite.
18. Browser verification is opt-in, not default. For a routine frontend/CSS/copy change, don't open the preview at all — verify at code level (grep/Read/`node --check`/brace-balance) instead. Only open the browser when the user explicitly asks for visual/browser verification, or the change genuinely can't be checked any other way. When you do open it: max 3 browser tool calls per attempt, stop at the limit, never spend more tokens trying to make a preview render than were spent making the edit.
19. Verification proportionality: for text/copy/CSS-only changes, prefer search → targeted read → edit → code-level check. Browser verification is optional, not default — don't open a browser merely to confirm a text change if the edit is unambiguous from reading the diff. Reserve browser checks for changes where visual/interactive behavior is actually in question.
20. Deployment: when asked to push/deploy to Vercel, run the minimum workflow (commit, push, one status check). No exploratory Vercel queries, no retrying a Vercel command with guessed flags — get the command right first. After deploy is triggered, at most one concise status check, then stop.
21. Don't re-Read a file/line-range already read earlier in this same task unless the file changed since — trust what's already in context over reconfirming with another Read.
