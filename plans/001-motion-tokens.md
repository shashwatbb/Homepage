# 001 — Add shared motion tokens to onboarding CSS

- **Status**: DONE
- **Commit**: 851db4a
- **Severity**: LOW (prerequisite for 002–004)
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, ~8 lines added

## Problem

The onboarding flow has no motion tokens. Curves are hand-typed or bare `ease`:

```css
/* src/components/OnboardingLocality.css:733 — current */
animation: ol-card-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
/* src/components/OnboardingLocalityDiscovery.css:150 — current */
animation: ol-card-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
/* src/components/OnboardingLocality.css:124 — current */
animation: ol-fade-in 0.22s ease both;
```

## Target

Define these tokens once, at the very top of `src/components/OnboardingLocality.css` (below the leading comment block, above `html:has(.onboarding-locality)`). Both onboarding stylesheets load on the same page (`src/onboarding-locality-main.js:9,48`), so `:root` is visible to both:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

## Repo conventions to follow

- Design-system tokens are prefixed `--ds-*` and come from `src/styles/base.css`. These motion tokens are onboarding-local, so keep them unprefixed in the onboarding stylesheet; do NOT edit `src/styles/base.css` or `design-system/tokens/`.

## Steps

1. Insert the `:root` block above at the top of `src/components/OnboardingLocality.css`, after line 3 (end of the leading comment).
2. Do not replace any existing easings in this plan — plans 002–004 consume the tokens.

## Boundaries

- Do NOT touch any other file. Do NOT add `--ease-in-out` / `--ease-drawer` usages (defined for future use only).
- No new dependencies.
- If line 1–3 of the file no longer is the leading comment, STOP and report.

## Verification

- **Mechanical**: `grep -n "^:root" src/components/OnboardingLocality.css` shows exactly one match; `npx vite build` (or `node --check` is N/A for CSS) completes without CSS errors.
- **Feel check**: none — no visual change.
- **Done when**: three tokens exist and nothing else changed (`git diff --stat` shows one file).
