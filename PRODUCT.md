# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Indian property buyers/renters who are early in their search and
unsure which locality fits them — the "discover" flow (entered via "Not sure,
help me find one" on the locality-check screen) exists specifically to guide
this user from budget/BHK/lifestyle preferences to a matched shortlist of
localities.

Secondary: buyers/renters who already know their target locality (the
"Yes, I know it" path) — faster, no guidance needed.

## Product Purpose

An internal Housing.com concept prototype: an exploration of new UX/UI
patterns (property discovery/onboarding, search, PDP, SRP) built to be
pitched into the real Housing.com product, not itself the live product.

## Positioning

Not a general real-estate listings clone — the differentiated mechanism is
the locality-discovery flow itself: instead of requiring the user to already
know a locality (as most portals assume), it derives a locality shortlist
from budget, configuration, landmarks/commute tolerance, intent (live-in vs
investment), and lifestyle preference.

## Operating Context

- Mobile-only web surface for the onboarding/discovery flow — desktop
  viewport shows an "open in mobile" notice (`resize_window` to mobile
  when developing/testing it).
- Sibling surfaces in the same repo: homepage (`index.html`), buy landing
  (`buy.html`, `buyers-megamenu.html`), search results (`srp.html`), and
  property detail (`pdp.html` / `pdp-mobile.html`).
- Currency/locale: India (₹, cities like Gurgaon/Mumbai).

## Capabilities and Constraints

- Frontend mockup only — no real backend, auth, users, payments, or
  compliance (see repo `CLAUDE.md`).
- Icons must come from the Bricks Iconography Figma library via
  `figma-cli`, inlined as `currentColor` SVG strings in `src/data/*Icons.js`
  — no hand-drawn glyphs unless the library has no match (state it when used).
- Mock data can be simple/flat/obviously fake.

## Brand Commitments

Housing.com name/brand is real (this is an internal Housing.com concept),
but no specific brand asset, voice, or identity constraint was called out
as binding for this exploration — visual direction is open.

## Evidence on Hand

No real user research, testimonials, or case studies on hand for this
prototype — none should be fabricated.

## Product Principles

- Guidance over assumption: the discover flow's whole reason to exist is
  helping users who don't already know what they want — don't design it
  like a fast-path power-user tool.
- This is a pitch artifact, not shipped product: craft and polish matter
  more than production hardening (error states, i18n, a11y audits are
  explicitly out of scope per CLAUDE.md prototype rules).
- Consistency across the flow's own screens matters more than matching the
  rest of the site pixel-for-pixel — it's being evaluated as its own concept.

## Accessibility & Inclusion

No specific standard required for this exploration; keep the incumbent
basic affordances (focus rings, aria-labels) rather than regressing them.
