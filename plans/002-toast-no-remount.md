# 002 — Toast must not re-mount the whole screen (and gets an exit)

- **Status**: DONE
- **Commit**: 851db4a
- **Severity**: HIGH
- **Category**: Interruptibility / purpose
- **Estimated scope**: 2 files, ~30 lines
- **Depends on**: 001

## Problem

`showToast()` and the two dismiss paths call `render()`, which replaces the whole screen (`root.innerHTML = SCREEN_BUILDERS[state.step]() + toastHtml();`). Every toast appearing — and disappearing 3s later — re-mounts the screen, replaying `ol-fade-in` and the card/chip entrance stagger. The toast also vanishes with no exit animation.

```js
// src/onboarding-locality-main.js:266-272 — current
function showToast(message, icon) {
  window.clearTimeout(toastTimer);
  toast = { message, icon };
  render();
  toastTimer = window.setTimeout(() => {
    toast = null;
    render();
  }, 3000);
}
```
```js
// src/onboarding-locality-main.js:2764-2768 — current
      case "dismiss-toast":
        window.clearTimeout(toastTimer);
        toast = null;
        render();
        break;
```
```css
/* src/components/OnboardingLocality.css:1148 — current */
animation: ol-toast-in 0.25s ease both;
```

## Target

Only the `.ol-toast-layer` element is inserted/removed. Full `render()` still emits `toastHtml()` (unchanged) so a toast survives a normal re-render.

```js
// target — add near showToast
function syncToast() {
  const root = document.getElementById("onboarding-locality");
  if (!root) return;
  root.querySelector(".ol-toast-layer")?.remove();
  if (toast) root.insertAdjacentHTML("beforeend", toastHtml());
}

function hideToast() {
  window.clearTimeout(toastTimer);
  toast = null;
  const layer = document.querySelector("#onboarding-locality .ol-toast-layer");
  const el = layer?.querySelector(".ol-toast");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    layer?.remove();
    return;
  }
  el.classList.add("is-leaving");
  el.addEventListener("animationend", () => layer.remove(), { once: true });
}

function showToast(message, icon) {
  window.clearTimeout(toastTimer);
  toast = { message, icon };
  syncToast();
  toastTimer = window.setTimeout(hideToast, 3000);
}
```
```js
// dismiss-toast case target
      case "dismiss-toast":
        hideToast();
        break;
```
```css
/* target — OnboardingLocality.css, replace line 1148 and add exit */
  animation: ol-toast-in 0.25s var(--ease-out) both;
}

.ol-toast.is-leaving {
  animation: ol-toast-out 0.15s var(--ease-out) both;
}

@keyframes ol-toast-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(8px); }
}
```
(Keep the existing `@keyframes ol-toast-in` block as is.)

## Repo conventions to follow

- Screens are string-templated and re-rendered wholesale; other code toggles classes directly instead of re-rendering, e.g. `el.classList.toggle("is-active", isActive)` at `src/onboarding-locality-main.js:2594` and `:2719`. Imitate that direct-DOM approach.
- `toast` module variable and `toastHtml()` (`:153`, `:283`) stay as-is.

## Steps

1. In `src/onboarding-locality-main.js`, add `syncToast()` and `hideToast()` above `showToast` (line 266) exactly as in Target.
2. Replace the body of `showToast` with the Target version.
3. Replace the `dismiss-toast` case body (line 2764–2768) with `hideToast();`.
4. Leave line ~2808 (`toast = null;` inside the `restart` case, which is followed by a full render) untouched.
5. In `src/components/OnboardingLocality.css`, change line 1148 to use `var(--ease-out)` and add `.ol-toast.is-leaving` + `@keyframes ol-toast-out` after the `ol-toast-in` keyframes block.

## Boundaries

- Do NOT change `toastHtml()` markup, `render()`, or any other `render()` callers.
- Do NOT add dependencies.
- If the code at the cited lines does not match the excerpts, STOP and report.

## Verification

- **Mechanical**: `node --check src/onboarding-locality-main.js`; `npx vite build` succeeds.
- **Feel check**: open `/onboarding-locality.html` on mobile width; go to a screen that triggers a toast.
  - The screen behind the toast does NOT fade/stagger again when the toast appears or disappears.
  - Toast slides out (~150ms) instead of vanishing; tapping the close button does the same.
  - Triggering a second toast while one is showing replaces it without a screen flash.
  - DevTools Animations panel at 10%: exit fades and drops slightly.
  - Reduced motion on: toast is removed immediately, no movement.
- **Done when**: no `.ol-screen` re-animation on toast show/hide, and the exit plays.
