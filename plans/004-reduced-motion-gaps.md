# 004 — Close reduced-motion gaps in onboarding

- **Status**: TODO
- **Commit**: 851db4a
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file, ~25 lines added
- **Depends on**: none (independent of 001–003; can run in any order)

## Problem

Only `.ol-screen` (`OnboardingLocality.css:151-155`) has a reduced-motion rule in that file. These still animate with `prefers-reduced-motion: reduce`: `ol-shake` (`.ol-phone-field.is-shaking` at `:275-277`, `.ol-otp-row.is-error` at `:930-933`), `ol-quote-in` (`.ol-splash__quote`, `:660`), `ol-card-in` (`.ol-service-row`, `:733`), `ol-toast-in` (`.ol-toast`, `:1148`), `ol-otp-pop` (`.ol-otp-box__digit`, `:953`), `ol-dot-bounce` (`.ol-btn-dots span`, `:578`).

`.ol-splash__quote` and `.ol-service-row` have `opacity: 0; transform: translateY(...)` as their BASE state and rely on the animation to reveal them — so a bare `animation: none` would leave them invisible.

The comment at `OnboardingLocalityDiscovery.css:566-570` claims the shake is dropped under reduced motion; the query at `:571-578` only covers `.od-choice-card, .od-chip`. This plan fixes that gap via the rule below (shake is defined in `OnboardingLocality.css`).

## Target

Append to the end of `src/components/OnboardingLocality.css`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Reveal-by-animation elements: show immediately (base state is opacity 0) */
  .ol-splash__quote,
  .ol-service-row {
    opacity: 1;
    transform: none;
    animation: none;
  }

  /* Error shake: drop movement; the red border (.is-error) is the signal */
  .ol-phone-field.is-shaking,
  .ol-otp-row.is-error {
    animation: none;
  }

  /* Keep a gentle opacity-only entrance/feedback, drop movement */
  .ol-toast {
    animation: ol-fade-only 0.15s ease both;
  }
  .ol-otp-box__digit {
    animation: none;
  }
  .ol-btn-dots span {
    animation: ol-dot-fade 0.9s ease-in-out infinite;
  }
}

@keyframes ol-fade-only {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes ol-dot-fade {
  0%, 66.66%, 100% { opacity: 0.3; }
  33.33% { opacity: 1; }
}
```

## Repo conventions to follow

- Exemplar: `OnboardingLocalityDiscovery.css:571-578` sets `opacity: 1; transform: none; animation: none;` for base-hidden elements. Imitate it.
- Existing pattern of opacity-preserving fallback: `OnboardingLocalityDiscovery.css:1095-1099`.

## Steps

1. Append the Target block at the end of `src/components/OnboardingLocality.css`.
2. Update the comment at `src/components/OnboardingLocalityDiscovery.css:566-570` so it no longer claims the shake is handled there — replace "and drop the shake (the toast + border/tint state are the accessible signal)" with "(the shake is dropped in OnboardingLocality.css)".
3. If plan 002 has been applied, its `.ol-toast.is-leaving` animation still works; the `.ol-toast` rule above is overridden for `is-leaving` only if specificity ties — add `.ol-toast.is-leaving { animation: ol-toast-out 0.15s ease both; }` inside the media query ONLY if a visual check shows the exit missing. Otherwise skip.

## Boundaries

- Do NOT change any non-reduced-motion rule.
- Do NOT touch `.ol-screen` reduced-motion rule (already present) or the Discovery reduced-motion queries other than the comment in step 2.
- No new dependencies. If line numbers/selectors differ from excerpts, STOP and report.

## Verification

- **Mechanical**: `npx vite build` succeeds.
- **Feel check**: DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`.
  - Splash quote and all three service rows are visible immediately (not blank).
  - Wrong phone number / wrong OTP: border turns red, no shaking.
  - Toast fades only; button loading dots pulse opacity only, no bounce.
  - Emulation off: everything animates as before.
- **Done when**: no `transform`-moving animation remains under reduced motion in the onboarding flow, and nothing is invisible.
