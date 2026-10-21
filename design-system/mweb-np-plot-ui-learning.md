# Mweb NP PLOT — UI learning bible (SoT = user handcraft)

> **Scope:** Design language only — replicate UI faithfully. Not content invention.  
> **Measured:** 2026-08-12 from selected frame **`FINALL`** (`46:9766`) on page **PDP**.  
> **This frame is the SoT.** Earlier AI-built `Mobile / NP PDP / JMS The Nation` and older mobile rules are **not** authority when they disagree with this file.

Scratch dumps: `scratch/mweb-plot-pass1.clean.json`, `scratch/mweb-plot-structs.clean.json`, `scratch/mweb-plot-pass3.clean.json`.

---

## 0. Anti-slop hard bans

When asked to replicate / extend this language:

1. **Re-measure `46:9766` first** — do not invent from memory or from the old 360 JMS frame.  
2. **Do not** default to 360 width — SoT is **412**.  
3. **Do not** force section titles to 16px — SoT section H1 is **SemiBold 18**.  
4. **Do not** use pad-all-16 on sections — SoT is **`[20, 16, 20, 16]`**.  
5. **Do not** round every body section — only the **first shelf** has top radius 24; body sections are **flat**.  
6. **Do not** invent black Zero brokerage pills — soft `badge/base` only.  
7. **Do not** invent circular icon chrome — **40×40**, `radius/m`, stroke **1.5**.  
8. **Do not** invent icons — Bricks Iconography only (`SealCheck`, chevrons, etc.).  
9. **Do not** dump raw KV lists as the primary Payment plan UI — follow the EMI card + CTA pattern in SoT.  
10. **Do not** mix web NP PDP 1512 recipes into this mobile plot page.

---

## 1. Page shell

| Prop | Measured |
|---|---|
| Frame | **`FINALL`** `46:9766` |
| Size | **412 × ~6389** |
| Layout | VERTICAL |
| Gap | **-24** (gallery / tray overlap) |
| Fill | `surface/default` |
| Pad / radius | 0 |

### Structure (exactly 2 top children)

1. **`Gallery`** — 412×400  
2. **`Sections tray`** — VERTICAL, gap **8**, full width  

---

## 2. Gallery

| Prop | Measured |
|---|---|
| Size | **412 × 400** |
| Layout | VERTICAL |
| Fill | IMAGE (hero photo) |
| Pad | **`[0, 0, 32, 0]`** (bottom 32 for shelf overlap breathing) |

### Stack (top → bottom)

| Layer | Size / recipe |
|---|---|
| Status bar | 412×40 |
| Nav chrome row | 412×56, pad **`[16, 16, 0, 16]`**, HORIZONTAL SPACE_BETWEEN: **Back** + **Tools** |
| Gallery fill | 412×252 (image plane) |
| Bottom meta row | 412×20, pad H **16**: left time chip · **centre dots** · right **Gallery index** |

### Gallery icon chrome (Back / Share / Save)

| Prop | Required |
|---|---|
| Size | **40×40** FIXED |
| Radius | **`radius/m` (12)** — not circle |
| Stroke | **`border/subtle` · 1.5** · INSIDE |
| Back fill | **`surface/subtle`** |
| Share / Save fill | **`surface/white`** |
| Tools gap | **8** |

### Pagination dots (centre)

| Prop | Measured |
|---|---|
| Dot size | **6×6** |
| Radius | full (~32) |
| Gap | **8** |
| Active | `surface/subtle` |
| Inactive | `icon/grey_2` |

### Gallery index chip

| Prop | Measured |
|---|---|
| Label | e.g. `1 / 24` Regular **12** / `text/inverse` |
| Pad | `[4, 6, 4, 8]` |
| Radius | **8** |
| Fill | dark warm (measured ~`rgb(33,29,25)` — prefer binding closest Bricks dark surface / warm_neutral if available) |

---

## 3. Sections tray

| Prop | Measured |
|---|---|
| Gap between sections | **8** |
| Pad | 0 |

### Section shell (body cards) — census

| Prop | Dominant recipe |
|---|---|
| Width | **412** |
| Pad | **`[20, 16, 20, 16]`** (13/15) |
| Internal gap | **24** most common; **20** on early detail/about; **32** rare |
| Radius | **0** flat (14/15) |
| Fill | white (`surface/white` or solid white) |

### First shelf exception (Property details #0)

| Prop | Measured |
|---|---|
| Radius | **`[24, 24, 0, 0]`** only — overlaps gallery |
| Pad | `[20, 16, 20, 16]` |
| Gap | **20** |
| Fill | white |

### Edge-bleed exception

- **About the developers**: pad **`[20, 0, 20, 0]`** (horizontal bleed for carousel)  
- **Footer**: pad `[16,16,16,16]`, fill `warm_neutral/800`

---

## 4. Section inventory (SoT order)

0. Property details (first shelf / hero summary)  
1. About this property  
2. Project overview  
3. Payment plan  
4. Investment insights  
5. (featured / gradient property card block)  
6. Explore neighbourhood  
7. Better priced properties  
8. Sellers for this project  
9. About the developers  
10. FAQ  
11. Quick links  
12. Breadcrumb / home path  
13. Disclaimer  
14. Footer (`warm_neutral/800`)

---

## 5. Typography roles (measured)

Family: **Google Sans Flex** (status bar may use Google Sans).

| Role | Style | Size | Fill |
|---|---|---|---|
| Project name (first shelf) | SemiBold | **20** | `text/primary` |
| Section H1 | SemiBold | **18** | `text/primary` |
| Price under name | — | ~22h box | `text/secondary` |
| Body / list primary | Medium or Regular | **14** | `text/primary` |
| Body secondary | Regular | **14** | `text/secondary` |
| Meta label | Medium | **12** | `text/muted` |
| Meta / badge text | Regular | **12** | `text/secondary` or success |
| Brand link (section) | Medium | **14** | `text/brand` |
| Brand link (compact) | Medium | **12** | `text/brand` |
| CTA label | Medium | **14** | `text/inverse` |
| Absolute max seen | SemiBold | **20** (project name only) |

---

## 6. Summary badges (above project name)

Row above **JMS The Nation**, gap ~4–8.

### Zero brokerage — soft

| Prop | Required |
|---|---|
| Fill | `surface/default` |
| Label | Regular **12** / `text/secondary` |
| Pad | `[4, 8, 4, 8]` |
| Radius | **8** (`radius/s`) |
| Stroke | none |

### RERA — success

| Prop | Required |
|---|---|
| Fill | `pistachio_sand/2` |
| Label | Regular **12** / `semantic_text/success` |
| Icon | Bricks **`SealCheck`** 16, tint `semantic_icons/success` |
| Pad | `[4, 8, 4, 8]` |
| Gap | **4** |
| Radius | **8** |

**Ban:** black / inverse Zero brokerage.

---

## 7. First shelf content pattern

1. Badges row  
2. Title stack (gap **4**): project name SemiBold 20 → price `text/secondary`  
3. Location + agent block (gap **16**): locality Medium 14 + city muted 12 → divider → Agent info row + compact **Contact** button  

Agent Contact: **40**h, pad `[12, 24]`, radius 12, `surface/brand`, label Medium 14 inverse (“Contact”).

---

## 8. Payment plan pattern (SoT)

Not a stage list as primary UI:

1. Title row SemiBold 18  
2. Soft EMI summary row/card (radius **16** nested):  
   - “EMI for … at” Medium 14 primary + amount Medium 14 **`semantic_text/success`**  
   - Duration / Interest Regular 12 `text/secondary`  
3. Primary CTA **Contact seller** — full width ~380, **48**h, pad `[12, 20]`, radius 12, `surface/brand`

---

## 9. Project overview pattern

- Title SemiBold 18  
- Spec grid: label Medium 12 muted → value Medium 14 primary; stack gap **16**  
- RERA/permit meta: Regular 12 + brand Medium 12 IDs  
- Secondary CTA: outline/ghost **Ask for details** — Medium 14 `text/brand`, h48, pad `[12,20]` (no brand fill)

---

## 10. FAQ pattern

- Header row: “FAQ” SemiBold 18 + trailing **View in detail** Medium 12 `text/brand` (+ link/chevron instance)  
- Expandable rows with Bricks caret (same expand affordance law)  
- Answers Regular/Medium 14 secondary/primary  

---

## 11. CTA recipes

| Kind | H | Pad | Radius | Fill | Label |
|---|---|---|---|---|---|
| Primary (Contact seller, Download, Request…) | **48** | `[12, 20, 12, 20]` | **12** | `surface/brand` | Medium 14 / `text/inverse` |
| Compact (Agent Contact) | **40** | `[12, 24, 12, 24]` | **12** | `surface/brand` | Medium 14 / `text/inverse` |
| Ghost / text CTA | **48** | `[12, 20, …]` | **12** | none / white | Medium 14 / `text/brand` |

---

## 12. Nested cards

- Nested soft surfaces: radius **16** (`radius/l`) common  
- Badge radius **8**  
- Icon chrome radius **12**  
- Outer body sections: radius **0** (except first shelf top 24)

---

## 13. Replication checklist

```
Frame 412 wide; root gap -24; surface/default
Gallery 412×400; bottom pad 32; icons 40×40 radius 12 stroke border/subtle 1.5
Dots 6×6 gap 8; active surface/subtle; inactive icon/grey_2
Tray gap 8
Sections pad [20,16,20,16]; gap 20|24; body radius 0; first shelf radius [24,24,0,0]
Titles SemiBold 18; project name SemiBold 20
Zero brokerage soft; RERA pistachio_sand/2 + SealCheck
Primary CTA h48 pad [12,20] surface/brand
No invented icons; Bricks only
```
