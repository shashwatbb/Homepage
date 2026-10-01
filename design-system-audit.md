# Design System Forensic Audit — Reconciliation Report

**Evidence:** 21 selected Figma frames/components on Demand Component Kit (web PDP surface), **7,353** nodes walked.
**Law:** Bricks Design Tokens **v1.2.0** (`design-system/tokens/`).
**Rule:** Frames = evidence, JSON = law. Near/missing are **not** silently resolved.

## Scope (selected roots)

- `Web / Homepage / NP / PDP` — COMPONENT · 1512×14887px · layout `VERTICAL`
- `Share and save` — COMPONENT · 100×42px · layout `HORIZONTAL`
- `Component 17` — COMPONENT_SET · 137×82px · layout `NONE`
- `Share` — COMPONENT · 600×394px · layout `VERTICAL`
- `Read more` — COMPONENT · 740×700px · layout `VERTICAL`
- `Tabs` — COMPONENT · 792×40px · layout `VERTICAL`
- `Chips` — COMPONENT · 208×44px · layout `HORIZONTAL`
- `EMI` — COMPONENT · 600×720px · layout `VERTICAL`
- `Price insights` — COMPONENT · 600×720px · layout `VERTICAL`
- `Compare properties` — COMPONENT · 1280×800px · layout `VERTICAL`
- `Compare search` — COMPONENT_SET · 1192×705px · layout `NONE`
- `Brochure full screen` — COMPONENT · 1280×800px · layout `VERTICAL`
- `Amenities` — COMPONENT · 740×648px · layout `VERTICAL`
- `Map view` — COMPONENT · 1280×800px · layout `VERTICAL`
- `Size drop down` — COMPONENT · 160×256px · layout `VERTICAL`
- `Skeleton` — COMPONENT · 1280×1112px · layout `VERTICAL`
- `Cards` — COMPONENT_SET · 705×628px · layout `NONE`
- `First fold` — COMPONENT_SET · 1240×2439px · layout `NONE`
- `Share` — COMPONENT_SET · 640×1284px · layout `NONE`
- `Rating and review` — COMPONENT_SET · 832×1363px · layout `NONE`
- `Floor plan cards` — COMPONENT_SET · 727×602px · layout `NONE`

## Platform note

- These frames are **web** (desktop PDP). Values marked `platform: web` (large page paddings, web type sizes, web shadows) must **not** be blindly reused for mobile.
- Values marked `platform: core` (color primitives, radius scale, type family/weights, base spacing steps) are style-identity regardless of platform.
- **No mobile values were invented.**

## Aesthetic reasoning (from measured values)

Personality reads as **product-dense but soft-warm**: warm neutral page surfaces, purple brand CTAs, 8–16px rhythm for in-component gaps, frequent 8–12px radii (soft, not pill-everything), Google Sans Flex across type. High information density on PDP (many nested auto-layout stacks) with muted secondary text and light borders rather than heavy chrome. Shadows appear but are not tokenized yet — elevation is under-specified in JSON relative to the frames.

## Auto layout (mandatory finding)

- `HORIZONTAL` — **1708** nodes
- `VERTICAL` — **1256** nodes
- `NONE` — **584** nodes

Nodes under `layoutMode: NONE` parent (absolute/manual stacking exceptions): **1835** path hits. Treat auto-layout as default; NONE parents are **exceptions** to flag in implementation, not a layout method to copy.

### Absolute / NONE-layout exception samples

- count 1835: Web / Homepage / NP / PDP › Web / Homepage / NP / PDP

## Component sets observed

### Component 17 (`3422:4605`)
- Variants (2): `Property 1=Default`, `Property 1=Active`

### Compare search (`3470:12256`)
- Variants (2): `Property 1=Compare search (Closed)`, `Property 1=Compare search (Open)`

### Cards (`3754:5121`)
- Variants (2): `Property 1=Default`, `Property 1=No image`

### First fold (`3767:5699`)
- Variants (4): `Property 1=Full view`, `Property 1=3D tour`, `Property 1=Single image`, `Property 1=Videos`

### Share (`3772:13965`)
- Variants (2): `Property 1=Default`, `Property 1=success`

### Rating and review (`3778:14438`)
- Variants (2): `Property 1=default`, `Property 1=new rating`

### Floor plan cards (`3788:13584`)
- Variants (2): `Property 1=Default`, `Property 1=No image`

## Matches (frame value ↔ JSON token)

_166 unique findings (showing up to 180)_

### `paddingBottom` — `0.0px`
- Count: **1869** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`

### `paddingLeft` — `0.0px`
- Count: **1869** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`

### `paddingRight` — `0.0px`
- Count: **1869** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`

### `paddingTop` — `0.0px`
- Count: **1869** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`

### `padding_shorthand` — `T/R/B/L 0/0/0/0`
- Count: **1869** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`

### `border_width` — `1.0px`
- Count: **793** · Platform: **core**
- Tokens: `(convention) 1px — no dedicated token in JSON`
- Note: JSON has no border-width scale; 1px is ubiquitous
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/MapPin/Vector`

### `gap` — `0.0px`
- Count: **740** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/project-card__primary-action`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423`

### `color` — `#ffffff @ opacity 1.0`
- Count: **667** · Platform: **core**
- Tokens: `color_tokens.surface.white`, `color_tokens.text.inverse`, `color_tokens.icon.grey_2`, `color_primitives.warm_neutral.0`, `color_primitives.grey_neutral.0`
- Token hex: `#ffffff`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421/Button Text`

### `gap` — `8.0px`
- Count: **639** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`

### `color` — `#0f0e0d @ opacity 1.0`
- Count: **553** · Platform: **core**
- Tokens: `color_tokens.text.primary`, `color_tokens.icon.grey_1`, `color_primitives.grey_neutral.900`
- Token hex: `#0f0e0d`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/Frame 2087324423/Mumbai`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2147261375/Frame 2087324424/Frame 2087324425/Frame 2087324423/Buy`

### `color` — `#edebdf @ opacity 1.0`
- Count: **350** · Platform: **core**
- Tokens: `color_tokens.border.subtle`, `color_primitives.warm_neutral.200`
- Token hex: `#edebdf`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Line 1`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Line 3`

### `color` — `#444444 @ opacity 1.0`
- Count: **289** · Platform: **core**
- Tokens: `color_tokens.text.secondary`, `color_tokens.grey_neutral.6`, `color_tokens.icon.grey_4`, `color_primitives.grey_neutral.800`
- Token hex: `#444444`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base/Zero brokerage`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base/RERA`

### `gap` — `24.0px`
- Count: **259** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464`

### `gap` — `16.0px`
- Count: **250** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2087324455`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2087324455/Frame 2087324471`

### `color` — `#ddd9ce @ opacity 1.0`
- Count: **244** · Platform: **core**
- Tokens: `color_tokens.border.default`, `color_primitives.warm_neutral.300`
- Token hex: `#ddd9ce`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447`

### `radius` — `12.0px`
- Count: **236** · Platform: **core**
- Tokens: `radius.m`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search`

### `gap` — `4.0px`
- Count: **232** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425`

### `gap` — `12.0px`
- Count: **231** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search`

### `color` — `#4a16d9 @ opacity 1.0`
- Count: **219** · Platform: **core**
- Tokens: `color_tokens.surface.brand`, `color_tokens.border.brand`, `color_tokens.text.brand`, `color_tokens.icon.brand_1`, `color_primitives.purple.700`
- Token hex: `#4a16d9`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/MapPin/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/MapPin/Vector`

### `color` — `#666666 @ opacity 1.0`
- Count: **194** · Platform: **core**
- Tokens: `color_tokens.text.muted`, `color_tokens.grey_neutral.5`, `color_primitives.grey_neutral.700`
- Token hex: `#666666`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/What are you looking for?`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428/Frame 2087324458/Placeholder`

### `color` — `#a09890 @ opacity 1.0`
- Count: **188** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.500`
- Token hex: `#a09890`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Frame 2087324393/City/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Frame 2087324393/City/Vector`

### `typography` — `Google Sans Flex|Regular|14|16px|0px`
- Count: **185** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.m`, `typography.font_height.s`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261423/Frame 2147261419/Frame 2147261439/Configuration`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261423/Frame 2147261419/Frame 2147261440/Super built-up area`

### `typography` — `Google Sans Flex|Medium|14|20px|0px`
- Count: **184** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.m`, `typography.font_height.m`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/Frame 2087324423/Mumbai`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2147261375/Frame 2087324424/Frame 2087324425/Frame 2087324423/Buy`

### `typography` — `Google Sans Flex|Medium|14|16px|0px`
- Count: **143** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.m`, `typography.font_height.s`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Frame 2087324447/Frame 2087324424/Frame 2087324425/Frame 2087324423/Get app`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261437/Frame 2147261419/Frame 2087324819/Button/Button`

### `typography` — `Google Sans Flex|Regular|14|20px|0px`
- Count: **141** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.m`, `typography.font_height.m`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/What are you looking for?`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base/Zero brokerage`

### `paddingBottom` — `16.0px`
- Count: **134** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `paddingLeft` — `16.0px`
- Count: **134** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `paddingRight` — `16.0px`
- Count: **134** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `paddingTop` — `16.0px`
- Count: **134** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `padding_shorthand` — `T/R/B/L 16/16/16/16`
- Count: **134** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `typography` — `Google Sans Flex|Medium|16|22px|0px`
- Count: **132** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.lg`, `typography.font_height.l`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428/Frame 2087324458/1, 2 BHK apartments`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427/Frame 2087324458/Ready to move`

### `padding_shorthand` — `T/R/B/L 0/0/3.5/0`
- Count: **122** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container`

### `paddingBottom` — `12.0px`
- Count: **107** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Component 17`

### `paddingLeft` — `12.0px`
- Count: **107** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Component 17`

### `paddingRight` — `12.0px`
- Count: **107** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Component 17`

### `paddingTop` — `12.0px`
- Count: **107** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Component 17`

### `padding_shorthand` — `T/R/B/L 12/12/12/12`
- Count: **107** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Component 17`

### `radius` — `8.0px`
- Count: **102** · Platform: **core**
- Tokens: `radius.s`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261433/Frame 2147261427/Frame 2087324458/Frame 2147261599/Frame 2147261623/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2087324459/Frame 2147261413/Frame 2147261595`

### `padding_shorthand` — `T/R/B/L 0/16/0/16`
- Count: **99** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Frame 2087324447`

### `radius` — `24.0px`
- Count: **94** · Platform: **core**
- Tokens: `radius.2xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423`

### `radius` — `16.0px`
- Count: **83** · Platform: **core**
- Tokens: `radius.l`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261428`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261432/Frame 2147261427`

### `radius` — `4.0px`
- Count: **80** · Platform: **core**
- Tokens: `radius.xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `color` — `#5c554d @ opacity 1.0`
- Count: **72** · Platform: **core**
- Tokens: `color_tokens.icon.warm_1`, `color_primitives.warm_neutral.700`
- Token hex: `#5c554d`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261453/Frame 2147261461/TrainSimple/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261453/Frame 2147261461/TrainSimple/Vector`

### `paddingBottom` — `4.0px`
- Count: **68** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `paddingLeft` — `8.0px`
- Count: **68** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `paddingRight` — `8.0px`
- Count: **68** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `paddingTop` — `4.0px`
- Count: **68** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `padding_shorthand` — `T/R/B/L 4/8/4/8`
- Count: **68** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `typography` — `Google Sans Flex|Regular|16|22px|0px`
- Count: **60** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.lg`, `typography.font_height.l`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2147261430/Frame 2087324408/Sector 66, Gurgaon`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2147261430/By EMAAR INDIA`

### `paddingLeft` — `20.0px`
- Count: **59** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Button`

### `paddingRight` — `20.0px`
- Count: **59** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Button`

### `padding_shorthand` — `T/R/B/L 12/20/12/20`
- Count: **59** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Button`

### `padding_shorthand` — `T/R/B/L 12/16/12/16`
- Count: **57** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324308`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324307`

### `paddingBottom` — `24.0px`
- Count: **55** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464`

### `paddingLeft` — `24.0px`
- Count: **55** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464`

### `paddingRight` — `24.0px`
- Count: **55** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464`

### `paddingTop` — `24.0px`
- Count: **55** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464`

### `padding_shorthand` — `T/R/B/L 24/24/24/24`
- Count: **55** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464`

### `color` — `#f6f4ed @ opacity 1.0`
- Count: **53** · Platform: **core**
- Tokens: `color_tokens.surface.default`, `color_primitives.warm_neutral.100`
- Token hex: `#f6f4ed`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base`

### `color` — `#faf9f5 @ opacity 1.0`
- Count: **49** · Platform: **core**
- Tokens: `color_tokens.surface.subtle`, `color_primitives.warm_neutral.50`
- Token hex: `#faf9f5`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Share and save/Frame 2087324449`

### `padding_shorthand` — `T/R/B/L 0/24/0/24`
- Count: **44** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416`

### `padding_shorthand` — `T/R/B/L 10/12/10/12`
- Count: **43** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`

### `gap` — `2.0px`
- Count: **38** · Platform: **web**
- Tokens: `spacing.3xs`
- Token value: `2.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Frame 2087324447/Frame 2087324424/Frame 2087324425`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261434/Frame 2147261433/Frame 2147261427/Frame 2087324458/Frame 2147261599/Frame 2147261623/Button/label-container`

### `typography` — `Google Sans Flex|SemiBold|18|26px|0px`
- Count: **35** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.xl`, `typography.font_height.xl`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2087324459/Frame 2147261413/Frame 2147261411/₹1.4 Cr - ₹2.5 Cr`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/About this property`

### `padding_shorthand` — `T/R/B/L 0/0/16/0`
- Count: **34** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards`

### `color` — `#245f36 @ opacity 1.0`
- Count: **33** · Platform: **core**
- Tokens: `color_tokens.semantic_text.success`, `color_primitives.green.800`
- Token hex: `#245f36`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2087324459/Frame 2147261413/Frame 2147261595/EMI at ₹1.12 L`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458/Frame 2147261444/Frame 2147261602/₹1.5L/month`

### `typography` — `Google Sans Flex|SemiBold|16|22px|0px`
- Count: **33** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.lg`, `typography.font_height.l`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2147261408/Shapoorji Joyville`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2147261407/Shapoorji Joyville`

### `padding_shorthand` — `T/R/B/L 16/0/16/0`
- Count: **30** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261511/Frame 2147261499/Frame 2147261489/Frame 2147261496`

### `color` — `#7d756c @ opacity 1.0`
- Count: **26** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.600`
- Token hex: `#7d756c`
- Samples:
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324443/MapPin/Vector`
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324443/MapPin/Vector`

### `paddingTop` — `8.0px`
- Count: **26** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`

### `padding_shorthand` — `T/R/B/L 8/0/0/0`
- Count: **26** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`

### `paddingBottom` — `8.0px`
- Count: **21** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261422`

### `padding_shorthand` — `T/R/B/L 8/8/8/8`
- Count: **21** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261422`

### `typography` — `Google Sans Flex|SemiBold|18|28px|0px`
- Count: **21** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.xl`, `typography.font_height.2xl`, `typography.letter_spacing.none`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Project plan/Frame 2147261467/Frame 2147261417/Project plan`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261417/Payment plan`

### `color` — `#edf8ee @ opacity 1.0`
- Count: **20** · Platform: **core**
- Tokens: `color_tokens.semantic_surface.success`, `color_primitives.green.50`
- Token hex: `#edf8ee`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261410/badge/base`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261410/badge/base`

### `padding_shorthand` — `T/R/B/L 16/12/12/12`
- Count: **20** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`

### `padding_shorthand` — `T/R/B/L 0/12/0/0`
- Count: **18** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261453`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261454`

### `typography` — `Google Sans Flex|Medium|12|16px|0px`
- Count: **18** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.s`, `typography.font_height.s`, `typography.letter_spacing.none`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261410/badge/base/RERA`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261410/badge/base/Possession by Dec, 2026`

### `gap` — `20.0px`
- Count: **16** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491/Frame 2147261416/Frame 2147261631`

### `padding_shorthand` — `T/R/B/L 24/0/24/0`
- Count: **14** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491`

### `paddingBottom` — `20.0px`
- Count: **13** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`

### `paddingTop` — `20.0px`
- Count: **13** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`

### `padding_shorthand` — `T/R/B/L 20/0/20/0`
- Count: **13** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`

### `color` — `#2f7f49 @ opacity 1.0`
- Count: **12** · Platform: **core**
- Tokens: `color_tokens.semantic_icons.success`, `color_primitives.green.600`
- Token hex: `#2f7f49`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261450/Frame 2147261473/Frame 2147261455/Frame 2147261462/Frame 2147261464/Frame 2147261465/ArrowUp/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261450/Frame 2147261473/Frame 2147261455/Frame 2147261462/Frame 2147261464/Frame 2147261465/ArrowUp/Vector`

### `color` — `#7d7d7d @ opacity 1.0`
- Count: **12** · Platform: **core**
- Tokens: `color_tokens.grey_neutral.4`, `color_tokens.icon.grey_3`, `color_primitives.grey_neutral.500`
- Token hex: `#7d7d7d`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539/Breadcrumb /Breadcrumb main/Frame 2087324448/CaretRight/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539/Breadcrumb /Breadcrumb main/Frame 2087324449/CaretRight/Vector`

### `color` — `#b88e12 @ opacity 1.0`
- Count: **12** · Platform: **core**
- Tokens: `color_tokens.soft_butter.5`, `color_primitives.soft_butter.400`
- Token hex: `#b88e12`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/badge/base/Star/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261512/Frame 2147261488/Frame 2147261486/Star/Vector`

### `typography` — `Google Sans Flex|Regular|12|16px|0px`
- Count: **11** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.s`, `typography.font_height.s`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content/wrap-content/view/Apr 2026`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261487/Frame 2087324463/Frame 1/Frame 2087324476/Frame 2147261507/Frame 2087324449/Frame 2087324448/View all`

### `padding_shorthand` — `T/R/B/L 8/16/8/16`
- Count: **10** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Map view › Map view/Frame 2147261578/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Map view › Map view/Frame 2147261578/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261574`

### `padding_shorthand` — `T/R/B/L 8/0/8/0`
- Count: **9** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261430/Frame 2147261562`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261430/Frame 2147261472`

### `color` — `#3a11ad @ opacity 1.0`
- Count: **8** · Platform: **core**
- Tokens: `color_primitives.purple.800`
- Token hex: `#3a11ad`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Frame 2087324393/House/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324490/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Frame 2087324393/House/Vector`

### `color` — `#3c3630 @ opacity 1.0`
- Count: **8** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.800`
- Token hex: `#3c3630`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`

### `padding_shorthand` — `T/R/B/L 8/12/8/12`
- Count: **8** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/project-card__primary-action`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2087324459/Frame 2147261413/Frame 2147261595`

### `color` — `#6b3d97 @ opacity 1.0`
- Count: **7** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.6`, `color_primitives.lavender_mist.500`
- Token hex: `#6b3d97`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Vector 5`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Group 1000004728/Indicator`

### `gap` — `40.0px`
- Count: **7** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold`

### `typography` — `Google Sans Flex|SemiBold|32|40px|0px`
- Count: **7** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.5xl`, `typography.font_height.5xl`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Frame 2087324441/EMARR MGF`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261512/Frame 2147261488/Frame 2147261486/4.3`

### `color` — `#f3f7ec @ opacity 1.0`
- Count: **6** · Platform: **core**
- Tokens: `color_tokens.pistachio_sand.1`, `color_primitives.pistachio_sand.50`
- Token hex: `#f3f7ec`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2087324459/Frame 2147261413/Frame 2147261595`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261624/Frame 2087324455/Frame 2087324470/Frame 2147261594/Frame 2147261427/Frame 2087324460/Frame 2147261413/Frame 2147261595`

### `gap` — `32.0px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466`

### `paddingLeft` — `4.0px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Size drop down › Size drop down/Frame 2147261600`
  - `Size drop down › Size drop down/Frame 43`

### `paddingRight` — `4.0px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Size drop down › Size drop down/Frame 2147261600`
  - `Size drop down › Size drop down/Frame 43`

### `padding_shorthand` — `T/R/B/L 11.127567291259766/0/11.127567291259766/0`
- Count: **6** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810/Header / Menu`

### `padding_shorthand` — `T/R/B/L 8/4/8/4`
- Count: **6** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Size drop down › Size drop down/Frame 2147261600`
  - `Size drop down › Size drop down/Frame 43`

### `paddingBottom` — `2.0px`
- Count: **5** · Platform: **web**
- Tokens: `spacing.3xs`
- Token value: `2.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `paddingTop` — `2.0px`
- Count: **5** · Platform: **web**
- Tokens: `spacing.3xs`
- Token value: `2.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `padding_shorthand` — `T/R/B/L 0/0/2/0`
- Count: **5** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `EMI › EMI/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261430/Frame 2087324479/Frame 2087324503/Frame 2087324504`
  - `EMI › EMI/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261432/Frame 2087324479/Frame 2087324503/Frame 2087324504`

### `padding_shorthand` — `T/R/B/L 2/6/2/6`
- Count: **5** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `padding_shorthand` — `T/R/B/L 8/6/8/6`
- Count: **5** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261436/Frame 2147261421`

### `typography` — `Google Sans Flex|SemiBold|28|36px|0px`
- Count: **5** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.4xl`, `typography.font_height.4xl`, `typography.letter_spacing.none`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2087324455/Frame 2087324471/Emaar MGF The Palm Drive`
  - `First fold › First fold/Property 1=Full view/Frame 2087324463/Frame 2147261540/Frame 2147261429/Frame 2087324455/Frame 2087324471/Emaar MGF The Palm Drive`

### `color` — `#d6bce4 @ opacity 1.0`
- Count: **4** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.3`, `color_primitives.lavender_mist.200`
- Token hex: `#d6bce4`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261450/Frame 2147261472/Frame 2147261461/Rectangle 72`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451/Frame 2147261583/Frame 2147261581/Frame 2147261584/Rectangle 73`

### `gap` — `48.0px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.4xl`
- Token value: `48.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324482/Frame 2147261484/Card Testimonials`

### `paddingLeft` — `40.0px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261512/Frame 2087324454`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324484/Frame 2147261487/Frame 2147261512/Frame 2087324454`

### `paddingRight` — `40.0px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261512/Frame 2087324454`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324484/Frame 2147261487/Frame 2147261512/Frame 2087324454`

### `padding_shorthand` — `T/R/B/L 16/12/12/20`
- Count: **4** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`

### `padding_shorthand` — `T/R/B/L 24/16/16/16`
- Count: **4** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324484/Frame 2147261487`

### `padding_shorthand` — `T/R/B/L 24/40/24/40`
- Count: **4** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261512/Frame 2087324454`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324484/Frame 2147261487/Frame 2147261512/Frame 2087324454`

### `typography` — `Google Sans Flex|SemiBold|14|16px|0px`
- Count: **4** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.m`, `typography.font_height.s`, `typography.letter_spacing.none`
- Samples:
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324442/Frame 2087324933/Bangalore`
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324442/Frame 2087324933/Bangalore`

### `color` — `#211d19 @ opacity 1.0`
- Count: **3** · Platform: **core**
- Tokens: `color_tokens.border.selected`, `color_primitives.warm_neutral.900`
- Token hex: `#211d19`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2147261478/Header / Menu`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2147261478/Header / Menu`

### `color` — `#b07f25 @ opacity 1.0`
- Count: **3** · Platform: **core**
- Tokens: `color_tokens.semantic_icons.warning`, `color_primitives.yellow.600`
- Token hex: `#b07f25`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324484/Frame 2147261487/Frame 2147261512/Frame 2147261488/Frame 2147261486/Star/Vector`
  - `Rating and review › Rating and review/Property 1=default/Frame 2147261487/Frame 2147261512/Frame 2147261488/Frame 2147261486/Star/Vector`

### `padding_shorthand` — `T/R/B/L 24/0/0/0`
- Count: **3** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content`

### `padding_shorthand` — `T/R/B/L 24/0/16/0`
- Count: **3** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content`

### `padding_shorthand` — `T/R/B/L 5.563783645629883/11.127567291259766/5.563783645629883/11.127567291259766`
- Count: **3** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `padding_shorthand` — `T/R/B/L 56/0/24/0`
- Count: **3** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451`

### `color` — `#5e7d24 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.pistachio_sand.6`, `color_primitives.pistachio_sand.500`
- Token hex: `#5e7d24`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar/CreditCard/Vector`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar/CreditCard/Vector`

### `color` — `#8c6900 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.soft_butter.6`, `color_primitives.soft_butter.500`
- Token hex: `#8c6900`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar/UserCheck/Vector`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar/UserCheck/Vector`

### `color` — `#a9c46a @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.pistachio_sand.4`, `color_primitives.pistachio_sand.300`
- Token hex: `#a9c46a`
- Samples:
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451/Frame 2147261583/Frame 2147261581/Frame 2147261585/Rectangle 72`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261579/Frame 2147261462/Rectangle 72`

### `color` — `#cedfa9 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.pistachio_sand.3`, `color_primitives.pistachio_sand.200`
- Token hex: `#cedfa9`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`

### `color` — `#e8efda @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.pistachio_sand.2`, `color_primitives.pistachio_sand.100`
- Token hex: `#e8efda`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`

### `color` — `#eee4f1 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.2`, `color_primitives.lavender_mist.100`
- Token hex: `#eee4f1`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`

### `color` — `#f3de8a @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.soft_butter.3`, `color_primitives.soft_butter.200`
- Token hex: `#f3de8a`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`

### `color` — `#f6f1f8 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.1`, `color_primitives.lavender_mist.50`
- Token hex: `#f6f1f8`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header`

### `color` — `#fdf5d0 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_tokens.soft_butter.2`, `color_primitives.soft_butter.100`
- Token hex: `#fdf5d0`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget/Frame 206/ic:outline-edit-calendar`

### `paddingBottom` — `40.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `padding_shorthand` — `T/R/B/L 0/0/0/16`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Margin`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Margin`

### `padding_shorthand` — `T/R/B/L 0/0/0/50`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin`

### `padding_shorthand` — `T/R/B/L 0/0/0/9`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`

### `padding_shorthand` — `T/R/B/L 0/16/16/16`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2147261522/Frame 2147261527/Row/Column`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2087324461/Frame 2147261522/Frame 2147261527/Row/Column`

### `padding_shorthand` — `T/R/B/L 0/20/0/20`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Frame 2087324424/Button`

### `padding_shorthand` — `T/R/B/L 0/240/0/240`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261609`
  - `Brochure full screen › Brochure full screen/Frame 2147261612`

### `padding_shorthand` — `T/R/B/L 0/37.36000061035156/0/37.349998474121094`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`

### `padding_shorthand` — `T/R/B/L 0/70/0/70`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`

### `padding_shorthand` — `T/R/B/L 0/8/0/0`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Margin`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Margin`

### `padding_shorthand` — `T/R/B/L 1/24/1/1`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`

### `padding_shorthand` — `T/R/B/L 16/24/16/24`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `EMI › EMI/Frame 2087324432`
  - `Price insights › Price insights/Frame 2087324431`

### `padding_shorthand` — `T/R/B/L 2/0/0/0`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`

### `padding_shorthand` — `T/R/B/L 24/10/24/10`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`

### `padding_shorthand` — `T/R/B/L 24/16/24/16`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261615/Frame 2147261487`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261487`

### `padding_shorthand` — `T/R/B/L 30/0/30/0`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`

### `padding_shorthand` — `T/R/B/L 34/0/0/0`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`

### `padding_shorthand` — `T/R/B/L 36/0/36/0`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `padding_shorthand` — `T/R/B/L 39.75/20/40/70`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `padding_shorthand` — `T/R/B/L 4.363636016845703/5.81818151473999/4.363636016845703/5.81818151473999`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `padding_shorthand` — `T/R/B/L 8/24/8/24`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers`
  - `Skeleton › Skeleton/Frame 2087324462/Headers`

### `padding_shorthand` — `T/R/B/L 8/8/8/16`
- Count: **2** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search`

### `color` — `#b58ad2 @ opacity 1.0`
- Count: **1** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.4`, `color_primitives.lavender_mist.300`
- Token hex: `#b58ad2`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Vector 4`

### `paddingLeft` — `32.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324483/Frame 2147261503/Frame 2147261503/Frame 2147261616`

### `paddingRight` — `32.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324483/Frame 2147261503/Frame 2147261503/Frame 2147261616`

### `padding_shorthand` — `T/R/B/L 0/12/12/20`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`

### `padding_shorthand` — `T/R/B/L 0/156/0/156`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539`

### `padding_shorthand` — `T/R/B/L 0/28/0/28`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261417`

### `padding_shorthand` — `T/R/B/L 0/32/0/32`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324483/Frame 2147261503/Frame 2147261503/Frame 2147261616`

### `padding_shorthand` — `T/R/B/L 0/40/0/40`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Skeleton › Skeleton/Frame 2147261539`

### `padding_shorthand` — `T/R/B/L 0/8/0/8`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261624/Frame 2087324455/Frame 2087324470/Frame 2147261594/Frame 2147261593/Frame 2087324817/Frame 2087324385/Frame 2087324819/Frame 2147261601`

### `padding_shorthand` — `T/R/B/L 12/24/12/24`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261624/Frame 2087324455/Frame 2087324470/Frame 2087324903/Button`

### `padding_shorthand` — `T/R/B/L 16.69135093688965/16.69135093688965/16.69135093688965/16.69135093688965`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `padding_shorthand` — `T/R/B/L 16/16/16/20`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430/Frame 2147261522/Frame 2147261527/Row/Column`

### `padding_shorthand` — `T/R/B/L 16/24/24/24`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430`

### `padding_shorthand` — `T/R/B/L 20/0/0/0`
- Count: **1** · Platform: **web**
- Tokens: `(composition — sides classified individually above)`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324482/Frame 2147261484/Frame 2147261627`

## Near matches (side-by-side — you decide)

_70 unique findings (showing up to 180)_

### `color` — `#222222 @ opacity 1.0`
- Count: **199** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.900`
- Token hex: `#211d19`
- Note: Δrgb≈10.3
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261422/Frame 2087324448/ArrowsClockwise/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261436/Frame 2147261422/Frame 2087324448/ArrowsClockwise/Vector`

### `typography` — `Google Sans Flex|Regular|12|16px|0.10000000149011612px`
- Count: **178** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.s`, `typography.font_height.s`
- Near deltas: ["letter_spacing frame=0.10000000149011612px vs token ['typography.letter_spacing.s']=0.1px"]
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2087323813/Mundhwa Road, East Pune`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2087323813/Mundhwa Road, East Pune`

### `paddingBottom` — `3.5px`
- Count: **122** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container`

### `typography` — `Google Sans Flex|Medium|14|20px|0.10000000149011612px`
- Count: **86** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.m`, `typography.font_height.m`
- Near deltas: ["letter_spacing frame=0.10000000149011612px vs token ['typography.letter_spacing.s']=0.1px"]
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Button`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Button`

### `typography` — `Google Sans Flex|Light|12.5|auto|0%`
- Count: **71** · Platform: **web**
- Matched: `typography.font_family.primary`
- Near deltas: ["font_size frame=12.5px vs token ['typography.font_size.s']=12.0px", 'letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_weight=Light']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container/Container/Link/Explore Satyam Paradise`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container/Container/Link/Explore ABA Orange County`

### `typography` — `Google Sans Flex|Regular|12.5|28px|0.5px`
- Count: **56** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_height.2xl`
- Near deltas: ["font_size frame=12.5px vs token ['typography.font_size.s']=12.0px", "letter_spacing frame=0.5px vs token ['typography.letter_spacing.md']=0.2px"]
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container/Link/Flats in Mumbai`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518/Frame 2147261514/Container/Link/Flats in Bengaluru`

### `typography` — `Google Sans Flex|Medium|12|16px|0.10000000149011612px`
- Count: **33** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.s`, `typography.font_height.s`
- Near deltas: ["letter_spacing frame=0.10000000149011612px vs token ['typography.letter_spacing.s']=0.1px"]
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2087324476/Frame 5/Frame 2087324449/Frame 2087324448/View all`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261421/2D`

### `color` — `#434343 @ opacity 1.0`
- Count: **30** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.800`
- Token hex: `#444444`
- Note: Δrgb≈1.7
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2087323813/Mundhwa Road, East Pune`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Frame 2147261469/Frame 2087323813/Mundhwa Road, East Pune`

### `typography` — `Google Sans Flex|Regular|16|24px|0px`
- Count: **26** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.lg`, `typography.letter_spacing.none`
- Missing bits: ["line_height=24.0px (nearest ['typography.font_height.l']=22.0px)"]
- Samples:
  - `Map view › Map view/Frame 2147261578/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu/Frame 2087324462/Placeholder`
  - `Map view › Map view/Frame 2147261578/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810/Header / Menu/Frame 2087324462/Placeholder`

### `typography` — `Google Sans Flex|Medium|16|24px|0px`
- Count: **22** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.lg`, `typography.letter_spacing.none`
- Missing bits: ["line_height=24.0px (nearest ['typography.font_height.l']=22.0px)"]
- Samples:
  - `Amenities › Amenities/Frame 2147261606/Frame 2087324430/Header / Menu/Frame 2147261551/Copy link`
  - `Amenities › Amenities/Frame 2147261606/Frame 2087324431/Header / Menu/Frame 2147261551/Copy link`

### `typography` — `Google Sans Flex|Regular|12.5|28px|0%`
- Count: **17** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_height.2xl`
- Near deltas: ["font_size frame=12.5px vs token ['typography.font_size.s']=12.0px", 'letter_spacing=0% (JSON uses px line-heights)']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container/Container/Container/Link/Careers`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container/Container/Container/Link/About Us`

### `typography` — `Google Sans Flex|Regular|10|12px|0.20000000298023224px`
- Count: **12** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.xs`, `typography.font_height.xs`
- Near deltas: ["letter_spacing frame=0.20000000298023224px vs token ['typography.letter_spacing.md']=0.2px"]
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261581/₹4,300/sq.ft. copy`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261581/₹4,300/sq.ft. copy`

### `color` — `#d9d9d9 @ opacity 1.0`
- Count: **10** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.300`
- Token hex: `#ddd9ce`
- Note: Δrgb≈11.7
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2147261596/Rectangle 1`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2147261596/Rectangle 2`

### `gap` — `19.999984741210938px`
- Count: **10** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials`

### `typography` — `Google Sans Flex|Regular|14|16px|0.20000000298023224px`
- Count: **10** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.m`, `typography.font_height.s`
- Near deltas: ["letter_spacing frame=0.20000000298023224px vs token ['typography.letter_spacing.md']=0.2px"]
- Samples:
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324442/Frame 2087324933/2 BHK in Indranagar,`
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433/Search hover/Frame 2087324442/Frame 2087324439/City`

### `gap` — `15.0px`
- Count: **8** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491/Frame 2147261416/Frame 2147261631/Frame 2147261629/Frame 2147261628/Frame 206`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491/Frame 2147261416/Frame 2147261631/Frame 2147261630/Frame 2147261628/Frame 206`

### `typography` — `Inter|Regular|14|20px|0%`
- Count: **8** · Platform: **web**
- Matched: `typography.font_weight.regular`, `typography.font_size.m`, `typography.font_height.m`
- Near deltas: ['letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_family=Inter']
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Contain/Contain/Cata/Category`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Contain/Contain/Cata/Category`

### `gap` — `7.587128639221191px`
- Count: **7** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Share › Share/Property 1=Default/Frame 2087324430/Frame 2147261625/Other cities`
  - `Share › Share/Property 1=Default/Frame 2087324430/Frame 2147261625/Other cities`

### `gap` — `8.345675468444824px`
- Count: **7** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu/Frame 2087324462`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575`

### `radius` — `5.0px`
- Count: **7** · Platform: **core**
- Tokens: `radius.xs`
- Token value: `4.0px`
- Samples:
  - `Component 17 › Component 17`
  - `Compare search › Compare search`

### `gap` — `16.69135093688965px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810`

### `gap` — `79.0px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.6xl`
- Token value: `80.0px`
- Samples:
  - `EMI › EMI/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261431/Frame 2147261561`
  - `EMI › EMI/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261432/Frame 2147261561`

### `paddingBottom` — `11.127567291259766px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810/Header / Menu`

### `paddingTop` — `11.127567291259766px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810/Header / Menu`

### `typography` — `Google Sans Flex|Medium|18|24px|0px`
- Count: **6** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.xl`, `typography.letter_spacing.none`
- Missing bits: ["line_height=24.0px (nearest ['typography.font_height.l']=22.0px)"]
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Project plan/Frame 2147261434/Frame 2087324458/Key highlights`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Compare Emaar MGF The Palm Drive with`

### `color` — `#e0e2e7 @ opacity 1.0`
- Count: **5** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.200`
- Token hex: `#e0e0e0`
- Note: Δrgb≈7.3
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Contain/Contain`

### `typography` — `Google Sans Flex|Light|12.5|18px|0%`
- Count: **5** · Platform: **web**
- Matched: `typography.font_family.primary`
- Near deltas: ["font_size frame=12.5px vs token ['typography.font_size.s']=12.0px", 'letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_weight=Light', "line_height=18.0px (nearest ['typography.font_height.s']=16.0px)"]
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container/Trending Searches`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container/Popular Localities`

### `color` — `#7f7f7f @ opacity 1.0`
- Count: **4** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.500`
- Token hex: `#7d7d7d`
- Note: Δrgb≈3.5
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Margin/Container/Open camera & scan the QR code to Download the App`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Background/©2012-26 Locon Solutions Pvt. Ltd`

### `color` — `#f6f1f8 @ opacity 0.6`
- Count: **4** · Platform: **core**
- Tokens: `color_tokens.lavender_mist.1`, `color_primitives.lavender_mist.50`
- Token hex: `#f6f1f8`
- Note: token is opaque; frame uses opacity 0.6
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324308`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324307`

### `gap` — `1.0px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521`

### `gap` — `3.034851551055908px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Compare properties › Compare properties/Frame 2087324430/Compare search/Frame 2087324384/Component 12`
  - `Compare search › Compare search/Property 1=Compare search (Closed)/Frame 2087324384/Component 12`

### `typography` — `Google Sans Flex|Regular|10|14px|0px`
- Count: **4** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.regular`, `typography.font_size.xs`, `typography.letter_spacing.none`
- Missing bits: ["line_height=14.0px (nearest ['typography.font_height.xs']=12.0px)"]
- Samples:
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451/Frame 2147261583/₹4,300/sq.ft. copy`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451/Frame 2147261583/Frame 2147261581/Frame 2147261584/₹4,300/sq.ft. copy`

### `gap` — `8.91205883026123px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261608`
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261610`

### `paddingLeft` — `11.127567291259766px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `paddingRight` — `11.127567291259766px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `radius` — `21.38894271850586px`
- Count: **3** · Platform: **core**
- Tokens: `radius.xl`
- Token value: `20.0px`
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261608/image 107`
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261610/image 107`

### `radius` — `6.0px`
- Count: **3** · Platform: **core**
- Tokens: `radius.xs`
- Token value: `4.0px`
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials/Frame 2147261482/badge/base`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324486/Frame 2147261484/Card Testimonials/Frame 2147261482/badge/base`

### `radius` — `8.345675468444824px`
- Count: **3** · Platform: **core**
- Tokens: `radius.s`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `typography` — `Google Sans Flex|Light|11.5|auto|1px`
- Count: **3** · Platform: **web**
- Matched: `typography.font_family.primary`
- Near deltas: ["font_size frame=11.5px vs token ['typography.font_size.s']=12.0px", "letter_spacing frame=1.0px vs token ['typography.letter_spacing.md']=0.2px"]
- Missing bits: ['font_weight=Light']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container/Container/Container/Company`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container/Container/Container/Partner Sites`

### `typography` — `Rubik|Light|10|auto|0%`
- Count: **3** · Platform: **web**
- Matched: `typography.font_size.xs`
- Near deltas: ['letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_family=Rubik', 'font_weight=Light']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/EXPERIENCE HOUSING APP ON MOBILE`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Margin/Container/Open camera & scan the QR code to Download the App`

### `color` — `#333333 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.800`
- Token hex: `#3c3630`
- Note: Δrgb≈9.9
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Margin/Part of`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Margin/Part of`

### `gap` — `-1.4210854715202004e-14px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `gap` — `11.127567291259766px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.s`
- Token value: `12.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803`

### `gap` — `19.770000457763672px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container`

### `gap` — `2.4200000762939453px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xs`
- Token value: `2.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container`

### `gap` — `2.909090757369995px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xs`
- Token value: `2.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `gap` — `63.689998626708984px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container`

### `paddingBottom` — `1.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`

### `paddingBottom` — `4.363636016845703px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `paddingLeft` — `1.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`

### `paddingLeft` — `9.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`

### `paddingTop` — `1.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.none`
- Token value: `0.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428`

### `paddingTop` — `39.75px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `paddingTop` — `4.363636016845703px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `radius` — `8.727272033691406px`
- Count: **2** · Platform: **core**
- Tokens: `radius.s`
- Token value: `8.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `color` — `#1a1511 @ opacity 1.0`
- Count: **1** · Platform: **core**
- Tokens: `color_primitives.warm_neutral.900`
- Token hex: `#211d19`
- Note: Δrgb≈13.3
- Samples:
  - `Floor plan cards › Floor plan cards/Property 1=No image/Frame 2147261418/Group 28/Rectangle 795`

### `gap` — `21.38894271850586px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261611`

### `gap` — `5.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261609/Frame 2147261607`

### `paddingBottom` — `16.69135093688965px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `paddingLeft` — `16.69135093688965px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `paddingRight` — `16.69135093688965px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `paddingTop` — `16.69135093688965px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `radius` — `16.69135093688965px`
- Count: **1** · Platform: **core**
- Tokens: `radius.l`
- Token value: `16.0px`
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`

### `radius` — `4.21875px`
- Count: **1** · Platform: **core**
- Tokens: `radius.xs`
- Token value: `4.0px`
- Samples:
  - `Floor plan cards › Floor plan cards/Property 1=No image/Frame 2147261418/Group 28/Rectangle 795`

### `typography` — `Google Sans Flex|Medium|10|12px|0.20000000298023224px`
- Count: **1** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.xs`, `typography.font_height.xs`
- Near deltas: ["letter_spacing frame=0.20000000298023224px vs token ['typography.letter_spacing.md']=0.2px"]
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421/Button Text`

### `typography` — `Google Sans Flex|Medium|14|24px|0px`
- Count: **1** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.medium`, `typography.font_size.m`, `typography.letter_spacing.none`
- Missing bits: ["line_height=24.0px (nearest ['typography.font_height.l']=22.0px)"]
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Frame 2147261479/Button/Button`

### `typography` — `Google Sans Flex|SemiBold|10|auto|0%`
- Count: **1** · Platform: **web**
- Matched: `typography.font_family.primary`, `typography.font_weight.semibold`, `typography.font_size.xs`
- Near deltas: ['letter_spacing=0% (JSON uses px line-heights)']
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421/Button Text`

### `typography` — `Rubik|Light|11.5|auto|0%`
- Count: **1** · Platform: **web**
- Near deltas: ["font_size frame=11.5px vs token ['typography.font_size.s']=12.0px", 'letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_family=Rubik', 'font_weight=Light']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Background/©2012-26 Locon Solutions Pvt. Ltd`

### `typography` — `Rubik|Regular|36|auto|0%`
- Count: **1** · Platform: **web**
- Matched: `typography.font_weight.regular`, `typography.font_size.6xl`
- Near deltas: ['letter_spacing=0% (JSON uses px line-heights)']
- Missing bits: ['font_family=Rubik']
- Samples:
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Margin/Part of`

### `typography` — `mixed|mixed|18|24px|0px`
- Count: **1** · Platform: **web**
- Matched: `typography.font_size.xl`, `typography.letter_spacing.none`
- Missing bits: ["line_height=24.0px (nearest ['typography.font_height.l']=22.0px)"]
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458/Frame 2147261444/EMI starts for 3BHK at ₹1.5L/month`

## Missing from JSON (repeated frame patterns)

_107 unique findings (showing up to 180)_

### `border_width` — `1.5px`
- Count: **502** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p5px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/CaretDown/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2147261375/Frame 2087324424/CaretDown/Vector`

### `gap` — `10.0px`
- Count: **408** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Proposed token (naming follows Bricks): `spacing/10px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/Frame 2087324423`

### `color` — `#000000 @ opacity 1.0`
- Count: **222** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.900`
- Token hex: `#0f0e0d`
- Note: nearest Δrgb≈24.3
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Mask group/Lines/Line 1`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Mask group/Lines/Line 2`

### `border_width` — `1.125px`
- Count: **153** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p125px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/leading-icon/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/leading-icon/Vector`

### `border_width` — `1.25px`
- Count: **92** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p25px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261453/Frame 2147261461/TrainSimple/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2087324458/Frame 2147261453/Frame 2147261461/TrainSimple/Vector`

### `opacity` — `0.2`
- Count: **48** · Platform: **core**
- Note: No opacity tokens in Bricks JSON
- Proposed token (naming follows Bricks): `opacity/20` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Frame 2087324447/Frame 2087324424/Frame 2087324425/MapPin/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Frame 2087324393/House/Vector`

### `radius` — `16/16/0/0`
- Count: **48** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261418`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261436/Frame 2147261418`

### `border_width` — `0.0703125px`
- Count: **46** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p0703125px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324464/Frame 2147261416/Button/Phone/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261419/Frame 2087324819/Button/leading-icon/Vector`

### `paddingBottom` — `10.0px`
- Count: **43** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Proposed token (naming follows Bricks): `spacing/10px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`

### `paddingTop` — `10.0px`
- Count: **43** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Proposed token (naming follows Bricks): `spacing/10px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Header/Contain`

### `radius` — `100/100/0/0`
- Count: **26** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Rectangle 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Rectangle 2`

### `radius` — `12/12/0/0`
- Count: **26** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage`

### `border_width` — `0.758712887763977px`
- Count: **20** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p758712887763977px` — **awaiting your decision**
- Samples:
  - `Share › Share`
  - `Share › Share/Line 2`

### `paint` — `GRADIENT_LINEAR:#eef4ff@0>#ffffff@100`
- Count: **20** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324483`

### `opacity` — `0.0`
- Count: **18** · Platform: **core**
- Note: No opacity tokens in Bricks JSON
- Proposed token (naming follows Bricks): `opacity/0` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Rectangle 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427/Frame 2087324389/Frame 6/Frame 5/Homepage/Rectangle 2`

### `border_width` — `2.0px`
- Count: **16** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/2p0px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491/Frame 2147261416/Frame 2147261631/Frame 2147261629/CaretRight/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324491/Frame 2147261416/Frame 2147261631/Frame 2147261630/CaretRight/Vector`

### `radius` — `100.0px`
- Count: **16** · Platform: **core**
- Tokens: `radius.3xl`
- Token value: `32.0px`
- Note: nearest token ['radius.3xl']=32.0px
- Proposed token (naming follows Bricks): `radius/100px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324308`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324471/Frame 2147261434/Frame 2147261472/Frame 2087324307`

### `effect` — `DROP_SHADOW:o0,4|b4|s0|#c1bfbf40@0.25`
- Count: **15** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2087324449`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324475/Frame 2147261466/Frame 2087324450`

### `opacity` — `0.6`
- Count: **13** · Platform: **core**
- Note: No opacity tokens in Bricks JSON
- Proposed token (naming follows Bricks): `opacity/60` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content/footer/wrap-content/author/Ram Raheja`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324481/Frame 2147261481/ card-article/body-content/footer/wrap-content/view/Apr 2026`

### `radius` — `0/0/16/16`
- Count: **12** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261419`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261436/Frame 2147261419`

### `paint` — `GRADIENT_LINEAR:#f6f4ed@0>#edebdf@45>#edebdf@51>#f6f4ed@100`
- Count: **11** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261425 - Skeleton Loader/Rectangle`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261425 - Skeleton Loader/Rectangle`

### `gap` — `60.0px`
- Count: **10** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Proposed token (naming follows Bricks): `spacing/60px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261467`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261468`

### `radius` — `24/24/0/0`
- Count: **10** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2087324427`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324490/Frame 2087324427`

### `color` — `#667085 @ opacity 1.0`
- Count: **8** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.600`
- Token hex: `#757575`
- Note: nearest Δrgb≈22.5
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Contain/Contain/Cata/Category`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324470/Frame 2147261570/Table/Contain/Contain/Cata/Category`

### `gap` — `18.209110260009766px`
- Count: **8** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Proposed token (naming follows Bricks): `spacing/18.209110260009766px` — **awaiting your decision**
- Samples:
  - `Share › Share/Frame 2087324429/Frame 2087324431`
  - `Read more › Read more/Frame 2087324429/Frame 2087324431`

### `paint` — `GRADIENT_LINEAR:#f6f4ed@0>#edebdf@32>#edebdf@60>#f6f4ed@100`
- Count: **8** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261425 - Skeleton Loader/Rectangle`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261425 - Skeleton Loader/Rectangle`

### `paint` — `GRADIENT_LINEAR:#faf9f5@0>#ffffff@100`
- Count: **8** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261420/Frame 2147261418`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261416/Frame 2147261442/Frame 2147261436/Frame 2147261418`

### `border_width` — `0.7349397540092468px`
- Count: **7** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p7349397540092468px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324489/Frame 2147261416/Frame 2147261534/Frame 2147261428/Frame 2147261443/Frame 2147261536/Frame 2147261444/Rectangle 69`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324489/Frame 2147261416/Frame 2147261534/Frame 2147261430/Frame 2147261443/Frame 2147261536/Frame 2147261445/Rectangle 69`

### `color` — `#8a38f5 @ opacity 1.0`
- Count: **7** · Platform: **core**
- Tokens: `color_primitives.purple.500`
- Token hex: `#7445e3`
- Note: nearest Δrgb≈31.3
- Samples:
  - `Component 17 › Component 17`
  - `Compare search › Compare search`

### `gap` — `56.0px`
- Count: **7** · Platform: **web**
- Tokens: `spacing.4xl`
- Token value: `48.0px`
- Proposed token (naming follows Bricks): `spacing/56px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261511/Frame 2147261499/Frame 2147261489/Frame 2147261491`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Rating and review/Frame 2147261487/Frame 2147261511/Frame 2147261499/Frame 2147261494/Frame 2147261491`

### `border_width` — `0.9375px`
- Count: **6** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p9375px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2147261478/Header / Menu/PlusCircle/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324474/Frame 2147261478/Header / Menu/PlusCircle/Vector`

### `border_width` — `1.6666667461395264px`
- Count: **6** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p6666667461395264px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539/Breadcrumb /Breadcrumb main/_Breadcrumb items core/home/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539/Breadcrumb /Breadcrumb main/_Breadcrumb items core/home/Vector`

### `border_width` — `8.0px`
- Count: **6** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/8p0px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Image Sliders/Image 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Image Sliders/Image 10`

### `effect` — `DROP_SHADOW:o6,6|b20|s0|#d0d0d04a@0.29`
- Count: **6** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Image Sliders/Image 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Image Sliders/Image 10`

### `effect` — `INNER_SHADOW:o0,-18|b20|s0|#ffffffdb@0.86`
- Count: **6** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`
  - `Share › Share`

### `gap` — `27.0px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Proposed token (naming follows Bricks): `spacing/27px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324480/Frame 2147261509/Widget`

### `gap` — `5.563783645629883px`
- Count: **6** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/5.563783645629883px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323809/Header / Menu`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2087323810/Header / Menu`

### `opacity` — `0.25`
- Count: **6** · Platform: **core**
- Note: No opacity tokens in Bricks JSON
- Proposed token (naming follows Bricks): `opacity/25` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Mumbai, Maharashtra, India - maps.to.design/Group/Group`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Mumbai, Maharashtra, India - maps.to.design/Group/Group/Vector`

### `opacity` — `0.8`
- Count: **6** · Platform: **core**
- Note: No opacity tokens in Bricks JSON
- Proposed token (naming follows Bricks): `opacity/80` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `radius` — `0/0/16/0`
- Count: **6** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2087324476/Frame 5/Rectangle 3`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261615/Frame 2147261487/Frame 2087324463/Frame 1/Frame 2087324476/Frame 2147261507/Rectangle 3`

### `radius` — `0/16/0/0`
- Count: **6** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2147261596/Rectangle 2`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261615/Frame 2147261487/Frame 2087324463/Frame 1/Frame 2087324476/Frame 2147261507/Rectangle 2`

### `effect` — `INNER_SHADOW:o0,2|b1|s0|#ffffff30@0.19`
- Count: **5** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `gap` — `28.0px`
- Count: **5** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Proposed token (naming follows Bricks): `spacing/28px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463`
  - `First fold › First fold/Property 1=Full view/Frame 2087324463`

### `paddingLeft` — `6.0px`
- Count: **5** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/6px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `paddingRight` — `6.0px`
- Count: **5** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/6px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324424/Button/Frame 2087324421`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 2147261423/Frame 2087324455/Frame 2147261542/Frame 2147261410/Frame 2087324421`

### `border_width` — `1.0909090042114258px`
- Count: **4** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p0909090042114258px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action/MagnifyingGlass/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action/MagnifyingGlass/Vector`

### `border_width` — `1.875px`
- Count: **4** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/1p875px` — **awaiting your decision**
- Samples:
  - `Floor plan cards › Floor plan cards/Property 1=No image/Frame 2147261418/Frame 2087324448/Image/Vector`
  - `Floor plan cards › Floor plan cards/Property 1=No image/Frame 2147261418/Frame 2087324448/Image/Vector`

### `gap` — `365.0px`
- Count: **4** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/365px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324489/Frame 2147261416/Frame 2147261534/Frame 2147261428/Frame 2147261443/Frame 2147261536`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324489/Frame 2147261416/Frame 2147261534/Frame 2147261430/Frame 2147261443/Frame 2147261536`

### `paint` — `GRADIENT_LINEAR:#ffffff00@0>#ddd9ce@100`
- Count: **4** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Vector`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16/Vector`

### `radius` — `0/0/0/16`
- Count: **4** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2087324476/Frame 5/Rectangle 2`
  - `First fold › First fold/Property 1=Full view/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2087324476/Frame 5/Rectangle 2`

### `radius` — `16/0/0/0`
- Count: **4** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/First fold/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2147261596/Rectangle 1`
  - `First fold › First fold/Property 1=Full view/Frame 2087324463/Frame 2147261529/Frame 1/Frame 2147261596/Rectangle 1`

### `border_width` — `0.6954729557037354px`
- Count: **3** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p6954729557037354px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Line 4`

### `color` — `#f20062 @ opacity 1.0`
- Count: **3** · Platform: **core**
- Tokens: `color_primitives.pink.600`
- Token hex: `#d4006a`
- Note: nearest Δrgb≈31.0
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Mumbai, Maharashtra, India - maps.to.design/Group/Group/Vector`
  - `Map view › Map view/Frame 2147261578/Mumbai, Maharashtra, India - maps.to.design/Group/Group/Vector`

### `effect` — `DROP_SHADOW:o0,8|b22|s-6|#4b494114@0.08`
- Count: **3** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261624/Frame 2087324455`
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433`

### `paddingBottom` — `5.563783645629883px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/5.563783645629883px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `paddingTop` — `5.563783645629883px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/5.563783645629883px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261571`
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261598/Frame 2147261504/Cards/Frame 2147261470/Frame 2087323803/Frame 2147261575/Frame 2147261576`

### `paddingTop` — `56.0px`
- Count: **3** · Platform: **web**
- Tokens: `spacing.4xl`
- Token value: `48.0px`
- Proposed token (naming follows Bricks): `spacing/56px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451`

### `paint` — `GRADIENT_LINEAR:#fefcff@0>#ffffff@28`
- Count: **3** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451`
  - `Price insights › Price insights/EMI/Frame 2087324430/Frame 2087324446/Frame 2147261586/Frame 2147261580/Frame 2147261451`

### `color` — `#000000 @ opacity 0.57`
- Count: **2** · Platform: **core**
- Tokens: `color_primitives.grey_neutral.900`
- Token hex: `#0f0e0d`
- Note: nearest Δrgb≈24.3
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261608/image 107`
  - `Brochure full screen › Brochure full screen/Frame 2147261611/Frame 2147261611/image 107`

### `color` — `#7323dc @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_primitives.purple.600`
- Token hex: `#5b2cd6`
- Note: nearest Δrgb≈26.3
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Housing.com_logo 1/Vector`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Frame 2087324423/Housing.com_logo 1/Vector`

### `color` — `#ff0033 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_primitives.pink.600`
- Token hex: `#d4006a`
- Note: nearest Δrgb≈69.8
- Samples:
  - `Share and save › Share and save/Component 17/Frame 2087324448/Heart/Vector`
  - `Component 17 › Component 17/Property 1=Active/Frame 2087324448/Heart/Vector`

### `color` — `#ffdc00 @ opacity 1.0`
- Count: **2** · Platform: **core**
- Tokens: `color_primitives.soft_butter.300`
- Token hex: `#ddba3e`
- Note: nearest Δrgb≈78.5
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Frame 2087324423/Housing.com_logo 1/Vector`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Frame 2087324423/Housing.com_logo 1/Vector`

### `gap` — `14.109999656677246px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.m`
- Token value: `16.0px`
- Proposed token (naming follows Bricks): `spacing/14.109999656677246px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container`

### `gap` — `22.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.l`
- Token value: `20.0px`
- Proposed token (naming follows Bricks): `spacing/22px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container`

### `gap` — `29.799999237060547px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/29.799999237060547px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `gap` — `35.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/35px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container/Container`

### `gap` — `400.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/400px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384`

### `gap` — `58.970001220703125px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Proposed token (naming follows Bricks): `spacing/58.970001220703125px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background/Container`

### `gap` — `72.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Proposed token (naming follows Bricks): `spacing/72px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`

### `gap` — `74.69999694824219px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.6xl`
- Token value: `80.0px`
- Proposed token (naming follows Bricks): `spacing/74.69999694824219px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`

### `paddingBottom` — `30.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/30px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`

### `paddingBottom` — `36.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/36px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `paddingLeft` — `10.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Proposed token (naming follows Bricks): `spacing/10px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`

### `paddingLeft` — `240.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/240px` — **awaiting your decision**
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261609`
  - `Brochure full screen › Brochure full screen/Frame 2147261612`

### `paddingLeft` — `37.349998474121094px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Proposed token (naming follows Bricks): `spacing/37.349998474121094px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`

### `paddingLeft` — `5.81818151473999px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/5.81818151473999px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `paddingLeft` — `50.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.4xl`
- Token value: `48.0px`
- Proposed token (naming follows Bricks): `spacing/50px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin`

### `paddingLeft` — `70.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Proposed token (naming follows Bricks): `spacing/70px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `paddingRight` — `10.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.xs`
- Token value: `8.0px`
- Proposed token (naming follows Bricks): `spacing/10px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`

### `paddingRight` — `240.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/240px` — **awaiting your decision**
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261609`
  - `Brochure full screen › Brochure full screen/Frame 2147261612`

### `paddingRight` — `37.36000061035156px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.3xl`
- Token value: `40.0px`
- Proposed token (naming follows Bricks): `spacing/37.36000061035156px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Margin/Container`

### `paddingRight` — `5.81818151473999px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/5.81818151473999px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`
  - `Skeleton › Skeleton/Frame 2087324462/Headers/Scroll search/Frame 2087324384/project-card__primary-action`

### `paddingRight` — `70.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.5xl`
- Token value: `64.0px`
- Proposed token (naming follows Bricks): `spacing/70px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background/Frame 2147261518`

### `paddingTop` — `30.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/30px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/Background`

### `paddingTop` — `34.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/34px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Frame 2147261520/Frame 2147261519/HorizontalBorder/Container/Container`

### `paddingTop` — `36.0px`
- Count: **2** · Platform: **web**
- Tokens: `spacing.2xl`
- Token value: `32.0px`
- Proposed token (naming follows Bricks): `spacing/36px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2/Footer/Frame 2147261521/Background`
  - `Skeleton › Skeleton/Frame 2/Footer/Frame 2147261521/Background`

### `paint` — `GRADIENT_LINEAR:#f6f4ed@0>#ffffff@100`
- Count: **2** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`

### `paint` — `GRADIENT_LINEAR:#ffffff@0>#f6f1f8@100`
- Count: **2** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261445`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261445`

### `radius` — `0/0/24/24`
- Count: **2** · Platform: **web**
- Samples:
  - `EMI › EMI/Frame 2087324432`
  - `Price insights › Price insights/Frame 2087324431`

### `radius` — `15/0/0/15`
- Count: **2** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261445`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261445`

### `radius` — `16/0/0/16`
- Count: **2** · Platform: **web**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261615/Frame 2147261487/Frame 2087324463/Frame 1/Rectangle 1`
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324485/Frame 2147261487/Frame 2087324463/Frame 1/Rectangle 1`

### `border_width` — `0.625px`
- Count: **1** · Platform: **core**
- Note: No border-width tokens in Bricks JSON
- Proposed token (naming follows Bricks): `border_width/0p625px` — **awaiting your decision**
- Samples:
  - `Floor plan cards › Floor plan cards/Property 1=No image/Frame 2147261418/Group 28/Rectangle 795`

### `color` — `#5945ed @ opacity 1.0`
- Count: **1** · Platform: **core**
- Tokens: `color_primitives.purple.500`
- Token hex: `#7445e3`
- Note: nearest Δrgb≈28.8
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261612/Frame 2147261613/Progress Bar with Slider/Adjustment Layer/Rectangle 4`

### `effect` — `DROP_SHADOW:o0,14|b64|s-4|#4b494114@0.08`
- Count: **1** · Platform: **web**
- Note: No shadow/elevation tokens in Bricks JSON
- Proposed token (naming follows Bricks): `elevation/* (needs naming)` — **awaiting your decision**
- Samples:
  - `Compare search › Compare search/Property 1=Compare search (Open)/Frame 2087324433`

### `gap` — `122.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/122px` — **awaiting your decision**
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261612/Frame 2147261613/Progress Bar with Slider/Adjustment Layer`

### `gap` — `6.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.2xs`
- Token value: `4.0px`
- Proposed token (naming follows Bricks): `spacing/6px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458/Frame 2147261444/Frame 2147261602`

### `gap` — `664.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/664px` — **awaiting your decision**
- Samples:
  - `Brochure full screen › Brochure full screen/Frame 2147261609`

### `paddingLeft` — `156.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/156px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539`

### `paddingLeft` — `28.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Proposed token (naming follows Bricks): `spacing/28px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261417`

### `paddingRight` — `156.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.8xl`
- Token value: `128.0px`
- Proposed token (naming follows Bricks): `spacing/156px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2147261539`

### `paddingRight` — `28.0px`
- Count: **1** · Platform: **web**
- Tokens: `spacing.xl`
- Token value: `24.0px`
- Proposed token (naming follows Bricks): `spacing/28px` — **awaiting your decision**
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324465/Frame 2147261417`

### `paint` — `GRADIENT_LINEAR:#edebdf@0>#ffffff@100`
- Count: **1** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Cards › Cards/Property 1=No image/Frame 2147261384/Rectangle 6151`

### `paint` — `GRADIENT_LINEAR:#eee4f1@0>#fefdff@100`
- Count: **1** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Mask group/Vector 3`

### `paint` — `GRADIENT_LINEAR:#eee4f1@59>#fefdff@100`
- Count: **1** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Web / Homepage / NP / PDP › Web / Homepage / NP / PDP/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324469/Frame 2147261466/Frame 2147261451/Frame 2147261473/Mask group/Vector 3`

### `paint` — `GRADIENT_LINEAR:#f3f7ec@0>#ffffff@100`
- Count: **1** · Platform: **web**
- Note: Gradient — no gradient tokens in Bricks JSON
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458/Frame 2147261444/Rectangle 4`

### `radius` — `28.0px`
- Count: **1** · Platform: **core**
- Tokens: `radius.2xl`
- Token value: `24.0px`
- Note: nearest token ['radius.2xl']=24.0px
- Proposed token (naming follows Bricks): `radius/28px` — **awaiting your decision**
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324478/Component 16`

### `radius` — `8/100/100/8`
- Count: **1** · Platform: **web**
- Samples:
  - `Skeleton › Skeleton/Frame 2087324462/Frame 2087324464/Frame 2087324465/Frame 2147261424/Frame 2147261425/Frame 2087324467/Frame 2147261416/Frame 2147261428/Frame 2147261443/Frame 2087324458/Frame 2147261444/Rectangle 4`

## Unused tokens (in JSON, not observed in these frames)

_109 token paths never referenced by an exact match in this audit. They may still be valid for other surfaces — do not delete without broader review._

- `color_primitives.blue.100`
- `color_primitives.blue.200`
- `color_primitives.blue.300`
- `color_primitives.blue.400`
- `color_primitives.blue.50`
- `color_primitives.blue.500`
- `color_primitives.blue.600`
- `color_primitives.blue.700`
- `color_primitives.blue.800`
- `color_primitives.blue.900`
- `color_primitives.green.100`
- `color_primitives.green.200`
- `color_primitives.green.300`
- `color_primitives.green.400`
- `color_primitives.green.500`
- `color_primitives.green.700`
- `color_primitives.green.900`
- `color_primitives.grey_neutral.100`
- `color_primitives.grey_neutral.200`
- `color_primitives.grey_neutral.300`
- `color_primitives.grey_neutral.400`
- `color_primitives.grey_neutral.50`
- `color_primitives.grey_neutral.600`
- `color_primitives.lavender_mist.400`
- `color_primitives.pink.100`
- `color_primitives.pink.200`
- `color_primitives.pink.300`
- `color_primitives.pink.400`
- `color_primitives.pink.50`
- `color_primitives.pink.500`
- `color_primitives.pink.600`
- `color_primitives.pink.700`
- `color_primitives.pink.800`
- `color_primitives.pink.900`
- `color_primitives.pistachio_sand.400`
- `color_primitives.purple.100`
- `color_primitives.purple.200`
- `color_primitives.purple.300`
- `color_primitives.purple.400`
- `color_primitives.purple.50`
- `color_primitives.purple.500`
- `color_primitives.purple.600`
- `color_primitives.purple.900`
- `color_primitives.red.100`
- `color_primitives.red.200`
- `color_primitives.red.300`
- `color_primitives.red.400`
- `color_primitives.red.50`
- `color_primitives.red.500`
- `color_primitives.red.600`
- `color_primitives.red.700`
- `color_primitives.red.800`
- `color_primitives.red.900`
- `color_primitives.soft_butter.300`
- `color_primitives.soft_butter.50`
- `color_primitives.warm_neutral.400`
- `color_primitives.yellow.100`
- `color_primitives.yellow.200`
- `color_primitives.yellow.300`
- `color_primitives.yellow.400`
- `color_primitives.yellow.50`
- `color_primitives.yellow.500`
- `color_primitives.yellow.700`
- `color_primitives.yellow.800`
- `color_primitives.yellow.900`
- `color_tokens.border.disabled`
- `color_tokens.grey_neutral.1`
- `color_tokens.grey_neutral.2`
- `color_tokens.grey_neutral.3`
- `color_tokens.highlight`
- `color_tokens.lavender_mist.5`
- `color_tokens.pistachio_sand.5`
- `color_tokens.semantic_border.danger`
- `color_tokens.semantic_border.info`
- `color_tokens.semantic_border.success`
- `color_tokens.semantic_border.warning`
- `color_tokens.semantic_icons.danger`
- `color_tokens.semantic_icons.info`
- `color_tokens.semantic_surface.danger`
- `color_tokens.semantic_surface.info`
- `color_tokens.semantic_surface.warning`
- `color_tokens.semantic_text.danger`
- `color_tokens.semantic_text.info`
- `color_tokens.semantic_text.warning`
- `color_tokens.soft_butter.1`
- `color_tokens.soft_butter.4`
- `color_tokens.surface.brand_subtle`
- `color_tokens.surface.disabled`
- `radius.3xl`
- `radius.full`
- `radius.none`
- `radius.xl`
- `spacing.5xl`
- `spacing.6xl`
- `spacing.7xl`
- `spacing.8xl`
- `typography.font_height.3xl`
- `typography.font_height.6xl`
- `typography.font_height.7xl`
- `typography.font_height.8xl`
- `typography.font_height.9xl`
- `typography.font_size.2xl`
- `typography.font_size.3xl`
- `typography.font_size.7xl`
- `typography.font_size.8xl`
- `typography.font_size.9xl`
- `typography.font_weight.bold`
- `typography.letter_spacing.md`
- `typography.letter_spacing.s`

## Proposed JSON version

Saved as `design-system/tokens-proposed-v1.2.1/` — **does not overwrite** v1.2.0.
Only **Missing** items with clear repeated px/hex values are proposed as additive tokens.
**Near matches are NOT applied** — they remain for your decision in this report.
