# 003 — Faster ease-out entrances for service rows, choice cards, chips

- **Status**: PARTIAL (discovery cards/chips only)
- **Commit**: 851db4a
- **Severity**: HIGH (service rows) / MEDIUM (cards, chips)
- **Category**: Easing & duration
- **Estimated scope**: 3 files, ~10 lines
- **Depends on**: 001

## Problem

All three entrances use `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out — slow start on an entrance). Service rows are extreme: 0.8s plus inline delays of 200/400/800ms, so the last row finishes at ~1.6s.

```css
/* src/components/OnboardingLocality.css:731-733 — current */
  opacity: 0;
  transform: translateY(24px);
  animation: ol-card-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
```
```js
// src/data/onboardingLocality.mock.js — current (delayMs at lines ~106, ~113, ~121)
delayMs: 200,   // buy
delayMs: 400,   // rent
delayMs: 800,   // sell
```
```css
/* src/components/OnboardingLocalityDiscovery.css:150 — current */
animation: ol-card-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
/* src/components/OnboardingLocalityDiscovery.css:518 — current */
animation: ol-card-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
```

## Target

```css
/* OnboardingLocality.css:733 */
animation: ol-card-in 0.3s var(--ease-out) forwards;
/* OnboardingLocalityDiscovery.css:150 */
animation: ol-card-in 0.3s var(--ease-out) forwards;
/* OnboardingLocalityDiscovery.css:518 */
animation: ol-card-in 0.25s var(--ease-out) forwards;
```
```js
// onboardingLocality.mock.js
delayMs: 40,    // buy
delayMs: 100,   // rent
delayMs: 160,   // sell
```
(Matches the existing 60ms step of `.od-choice-card:nth-child` delays at Discovery.css:154-157.)

## Repo conventions to follow

- Stagger delays are already 40/100/160/220ms on `.od-choice-card` (`OnboardingLocalityDiscovery.css:154-157`) — same cadence.
- Curve comes from the `--ease-out` token added in plan 001.

## Steps

1. `OnboardingLocality.css:733` → Target value.
2. `OnboardingLocalityDiscovery.css:150` and `:518` → Target values.
3. `src/data/onboardingLocality.mock.js`: set the three `delayMs` values to 40, 100, 160 (buy, rent, sell order unchanged).

## Boundaries

- Do NOT change `translateY` start offsets, the `ol-card-in` keyframe, or `.od-chip:nth-child` / `.od-choice-card:nth-child` delays.
- Do NOT touch `transition:` lines on these elements (hover/press are fine).
- If any current value differs from the excerpts, STOP and report.

## Verification

- **Mechanical**: `node --check src/data/onboardingLocality.mock.js`; `npx vite build` succeeds.
- **Feel check**: service screen, then discovery choice cards and chips.
  - All three service rows are fully in by ~460ms, not ~1.6s; they still read as a cascade.
  - Cards/chips start moving immediately (no slow start) and settle softly.
  - DevTools Animations at 10%: motion is front-loaded, decelerating to rest.
- **Done when**: no `cubic-bezier(0.4, 0, 0.2, 1)` remains on `ol-card-in` usages (`grep -n "ol-card-in" src/components/*.css`).
