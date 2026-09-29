# Animation plans — onboarding flow

Written at commit 851db4a. Scope: `onboarding-locality.html` flow only.

| # | Title | Severity | Status |
|---|---|---|---|
| 001 | Add shared motion tokens | LOW (prereq) | DONE |
| 002 | Toast must not re-mount the whole screen (+ exit) | HIGH | DONE |
| 003 | Faster ease-out entrances (service rows, cards, chips) | HIGH/MED | PARTIAL (discovery cards/chips done; service rows + mock delays not) |
| 004 | Close reduced-motion gaps | MEDIUM | TODO |

## Execution order

001 → 002 → 003 → 004.

## Dependencies

- 002 and 003 use `--ease-out` from 001.
- 004 is independent; run last so it can account for 002's `.ol-toast.is-leaving`.

## Not planned (from the audit)

- Ease swaps on remaining bare `ease` entrances (`ol-fade-in`, `ol-quote-in`, `ol-otp-pop`, `od-stepper-pop`) — LOW.
- Shake retune (0.18s, linear) — needs a device feel check first.
- Chip stagger beyond 6 children — unconfirmed.
- Missed opportunities: screen exit transition, done-screen badge reveal (`onboarding-locality-main.js:2401`).
- Respected as documented decisions: progress-bar `width` transition, drawer `flex-basis` transition.
