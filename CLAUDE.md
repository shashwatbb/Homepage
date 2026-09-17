# Repo rules

## Icons

Always source icons from the **Bricks Iconography** Figma library:
https://www.figma.com/design/Rq1j8iqvbJBYRb52tdpgFg/Iconography--Bricks-

Never hand-draw a new SVG glyph. To add or replace an icon:

1. `figma-cli status` — confirm Figma Desktop has that file open, and
   `figma-cli daemon start` if the daemon isn't running.
2. `figma-cli find "<Name>"` to locate the icon's `COMPONENT_SET` (icons
   follow Phosphor Icons naming: `MapPin`, `House`, `TrendUp`, `Check`, …).
3. `figma-cli node tree <componentSetId>` to find the `Format=Stroke,
   Weight=Regular, Size=24` variant (this project's default: line icons,
   1.5px stroke, 24px grid — match the existing style unless the surface
   calls for `Fill`/`Duotone`).
4. `figma-cli export node <variantId> -f svg -o <path>.svg` to pull it.
5. Inline the SVG as a `currentColor` string in the relevant
   `src/data/*Icons.js` module (see `src/data/bricksIcons.js` for the
   onboarding-locality flow's set) — don't reference loose `.svg` files from
   markup for these.

Only fall back to a hand-drawn glyph when nothing in that library is a
reasonable match, and say so when you do.
