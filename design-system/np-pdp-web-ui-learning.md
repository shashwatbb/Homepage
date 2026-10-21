# NP PDP Web — UI learning bible (forensic)

> **Scope:** UI patterns only. Not content. Not Housing URL section inventory.  
> **Measured:** 2026-08-10 from Demand Component Kit page **PDP**, selection centered on `Web / Homepage / NP / PDP` (`3414:11591`) + sister components.  
> **Token law:** Bricks DS only. Bind library variables — never invent local colors/radii.  
> **Hard rule:** Re-measure these node IDs before changing chrome recipes. Do not “improve” from CSS or mobile.

## Sources of truth (node IDs)

| Role | Name | ID |
|---|---|---|
| Full page | `Web / Homepage / NP / PDP` | `3414:11591` |
| Left section stack | `Frame 2147261425` | `3399:12459` |
| Body row (left+rail) | `Frame 2147261424` | (child of content host) |
| First fold set | `First fold` | `3767:5699` |
| Share / Save | `Share and save` | `3422:4581` |
| Tabs | `Tabs` | `3468:9584` |
| Chips | `Chips` | `3468:9671` |
| Amenities panel | `Amenities` | `3474:2277` |
| Rating set | `Rating and review` | `3778:14438` |
| Floor plan cards | `Floor plan cards` | `3788:13584` |
| Compare | `Compare properties` | `3470:11722` |
| Price insights | `Price insights` | `3470:11300` |
| EMI | `EMI` | `3469:10687` |
| Brochure fullscreen | `Brochure full screen` | `3474:1676` |
| Map view | `Map view` | `3474:2882` |
| Property cards | `Cards` | `3754:5121` |
| Read more panel | `Read more` | `3462:8992` |

Scratch dumps: `scratch/np-web-*.clean.json`, `scratch/np-web-final-precision.clean.json`.

---

## 1. Page shell

| Prop | Measured |
|---|---|
| Size | **1512 × ~14887** |
| Layout | VERTICAL |
| Gap | **40** |
| Fill | `surface/default` |
| Pad / radius | none |

### Header (`Headers`)

| Prop | Measured |
|---|---|
| Size | **1512 × 64** |
| Layout | HORIZONTAL |
| Gap | **48** |
| Pad | **[8, 24, 8, 24]** (T R B L) |
| Fill | `surface/subtle` |
| Radius | 0 |

Children (48h row):
- Left cluster gap **12**
- **Scroll search**: 730×48, pad **[8, 8, 8, 16]**, radius **12**, fill `surface/white`
- Right cluster gap **12**

### Content host

| Prop | Measured |
|---|---|
| Width | **1200** (centered in 1512) |
| Layout | VERTICAL gap **24** for fold + body stack |
| Body row | HORIZONTAL gap **24**: left **792** + rail **384** |

### Footer

| Prop | Measured |
|---|---|
| Size | 1512 × ~1415 |
| Fill | `warm_neutral/800` |
| Gap | 0 |

---

## 2. First fold (web)

**Component set** `3767:5699` — variants: Full view / 3D tour / Single image / Videos.

| Prop | Full view (`Property 1=Full view`) |
|---|---|
| Size | **1200 × 566** |
| Layout | HORIZONTAL |
| Gap | **40** |
| Pad | **[24, 24, 24, 24]** |
| Radius | **24** all (`radius/2xl`) |
| Fill | `surface/white` |

Inner column (1152×518): VERTICAL gap **28**.
- Top meta row: HORIZONTAL gap **24**, h≈66
- Gallery/details row: HORIZONTAL gap **24**, h≈424

**Do not** shrink first-fold card radius to 16 or remove 24 pad.

---

## 3. Share and save (WEB chrome SoT)

Component `3422:4581`:

| Prop | Measured |
|---|---|
| Root | 100×42, HORIZONTAL, gap **16**, align MIN/CENTER |
| Each icon button | **42×42** |
| Pad | **[12, 12, 12, 12]** |
| Radius | **12** all = `radius/m` — **rounded square, NOT circle / NOT `radius/full`** |
| Fill | `surface/white` |
| Stroke | **`border/default` 1px** |
| Glyph frame | ~18×18 |

Same recipe reused on brochure fullscreen nav chevrons (42×42, pad 12, radius 12, `surface/white`).

### Web vs mobile (do not conflate)

| | Web Share/Save | Mobile first-fold Back/Share/Save |
|---|---|---|
| SoT | `3422:4581` | `4678:13581` |
| Size | **42×42** | **40×40** |
| Radius | `radius/m` (12) | `radius/m` (12) |
| Stroke | `border/default` 1 | **none** |

Both ban circles. Never copy mobile size onto web or drop web stroke “to match mobile.”

---

## 4. Left column section cards (23/23)

Stack `3399:12459` — **792** wide, VERTICAL, gap **24**.

### Universal section-card recipe (strict)

| Prop | Required |
|---|---|
| Fill | `surface/white` (23/23) |
| Radius | **24** all (23/23) → `radius/2xl` |
| Internal gap | **24** (23/23) |
| Pad A (default) | **[24, 24, 24, 24]** — 16 sections |
| Pad B (edge-bleed carousels/tables) | **[24, 0, 24, 0]** — 7 sections |

**Never** use radius 16 on the outer section card. Radius 16 is for **inner** nested cards only.

### Section titles (in-page cards)

| Prop | Required |
|---|---|
| Font | Google Sans Flex |
| Style | **SemiBold** |
| Size | **18** |
| Line box | height **26** |
| Fill | `text/primary` |
| Census | **23/23** identical |

### Section inventory (UI order in web template — learning only)

0. About this property  
1. Floor plan and pricing  
2. Project phases  
3. Project overview  
4. Payment plan  
5. Investment insights  
6. Compare with other projects  
7. Government registry records  
8. Explore properties for resale  
9. Preferred projects nearby  
10. Project brochure  
11. Better priced projects  
12. Amenities  
13. Ratings and reviews  
14. Properties available to buy/rent  
15. About the developers  
16. Sellers for this project  
17. Explore neighbourhood  
18. Helpful tools  
19. Questions and answers  
20. Frequently asked questions  
21. News  
22. Quick links  

> Content tasks must still obey `figma-housing-url-sections-only` for live Housing URLs. This list is **UI pattern inventory**, not permission to ship every section for every project.

### About this property (canonical content card)

| Layer | Recipe |
|---|---|
| Root | 792×~428, VERTICAL gap 24, pad 24, radius 24, `surface/white` |
| Title | SemiBold 18 / h26 / `text/primary` |
| Spec rows stack | VERTICAL gap **20** |
| Spec row | HORIZONTAL, pad right **12**, h≈22 |
| Dividers | LINE w=744, stroke **`border/subtle` 1**, align CENTER |
| Description | VERTICAL gap **8**; body Regular; `text/*` |
| Text button | ghost/link style, radius 12, gap 4 |

---

## 5. Typography roles (census)

Family everywhere: **Google Sans Flex**.

| Role | Style | Size | Typical h | Fill | Notes |
|---|---|---|---|---|---|
| Section card H1 | SemiBold | 18 | 26 | `text/primary` | In-page cards only |
| Modal / panel header | Medium | 16 | 22 | `text/primary` | Amenities / Read more header rows |
| Body emphasis | Medium | 14 | 20 | `text/primary` | Dominant body/meta |
| Body regular | Regular | 14 | 20 | `text/primary` | |
| Subhead / map title | Medium | 16 | 22 | `text/primary` | |
| Secondary body | Regular | 16 | 22 | varies | |
| Caption / chip meta | Regular or Medium | 12 | 16 | `text/secondary` often | Floor-plan “2D” chip |
| Display / price hero | SemiBold | 32 | 40 | `text/primary` | Rare; first-fold / price |
| CTA label | Medium | 14 | 20 | `text/inverse` on brand | |
| Link / tertiary CTA | Medium | 14 | 20 | `text/primary` | Report listing |

---

## 6. Chips (`3468:9671`)

| Prop | Unselected | Selected |
|---|---|---|
| Size | 72×44 (hug) | same |
| Pad | **[12, 16, 12, 16]** | same |
| Radius | **12** | same |
| Gap (icon/label) | 8 | 8 |
| Fill | `surface/white` | `surface/subtle` |
| Stroke | `border/subtle` **1** | `warm_neutral/500` **1.5** |
| Label | Regular 14 / `text/primary` | same |
| Row gap between chips | **16** | |
| Row pad | **[0, 24, 0, 24]** | |

---

## 7. Tabs (`3468:9584`)

| Prop | Measured |
|---|---|
| Width | **792** (matches left column) |
| Height | **40** |
| Fill | `surface/white` |
| Radius | **[24, 24, 0, 0]** — top only (joins section below) |
| Inner pad | horizontal **24** |

---

## 8. Nested cards & carousels

### Floor plan card (`3788:13584` Default)

| Part | Recipe |
|---|---|
| Width | **320** |
| Image block | pad 16, radius **[16,16,0,0]**, gradient/image |
| Body | pad 16, gap 16, radius **[0,0,16,16]**, `surface/white` |
| Dividers | LINE inside body |
| Overlay chrome | 32×32 or 32×64, pad 8, radius **8**, `surface/white` |
| 2D chip | pad [8,6,8,6], radius 8, Medium 12 / `text/secondary` |

### Property card (`3754:5121` Default)

| Prop | Measured |
|---|---|
| Size | **280 × ~588** |
| Outer radius | **16** all |
| Fill | `background/neutral/primary` |
| Gap | **16** |
| Bottom pad | 16 |
| Image | 280×160, top radius 16 |
| Save chrome on image | **40×40**, pad 12, radius **12**, `surface/white` |
| Body pad | horizontal **16** |

### Rating panel (`3778:14438` default)

| Prop | Measured |
|---|---|
| Outer | 792×640, gap 24, pad 24, radius 24, `surface/white` (+ optional gradient) |
| Inner summary | radius **16**, fill `surface/subtle`, pad **[24,16,16,16]**, gap 24 |

---

## 9. Modals / full-screen panels

Shared header recipe (Amenities, Read more, Compare, Price insights, EMI):

1. Header block pad **[24,24,24,24]**, title row SPACE_BETWEEN  
2. **LINE** full width (`border/subtle` 1)  
3. Body pad **24** (or pad B `[24,0,24,0]` for charts)

| Panel | Size | Notes |
|---|---|---|
| Amenities | 740×648, radius 24, `surface/white` | 2-col body pad 24 gap 16; scrollbar `warm_neutral/200` r100 |
| Read more | 740×700, radius 24 | body gap 24 pad 24 |
| Compare | 1280×800 | search field pad [12,16], radius 12, `surface/white` |
| Price insights / EMI | 600 wide | top radius [24,24,0,0]; footer pad [16,24], bottom radius [0,0,24,24] |
| Map view | 1280×800, pad 24 | left cards 360 radius 24 `background/neutral/primary`; map 848 radius 24 |
| Brochure FS | 1280×800 | Share/save + 42×42 chevrons; unbound page fill |

Modal title type: **Medium 16** (not SemiBold 18).

---

## 10. Right rail (sticky CTA)

Rail frame ~**384** wide, VERTICAL gap **16**.

| Part | Recipe |
|---|---|
| Card | radius **24**, fill `surface/white`, pad **[24, 0, 24, 0]** |
| Inner stack | gap **24** |
| Primary CTA | height **48**, pad **[12, 24, 12, 24]**, radius **12**, fill `surface/brand`, label Medium 14 / `text/inverse` |
| Tertiary | no fill, Medium 14 / `text/primary` (e.g. Report this listing) |

In-section brand CTAs (Ask for details, etc.): height **48**, pad **[12, 20, 12, 20]**, radius **12**, `surface/brand`, Medium 14 / `text/inverse`.

---

## 11. Dividers

| Prop | Required |
|---|---|
| Type | LINE |
| Stroke | `border/subtle` |
| Weight | **1** |
| Align | CENTER |

Do not invent `warm_neutral/*` lines for standard section dividers (scrollbar thumb is the exception: `warm_neutral/200`).

---

## 12. Hard bans (web)

1. **No circular** Share/Save/Back — always `radius/m` (12).  
2. **No inventing** section-card radius 16 / pad 16 on outer 792 cards.  
3. **No mixing** mobile 40×40 no-stroke chrome into web Share/Save.  
4. **No** unbound hex colors; Bricks vars only.  
5. **No** Inter/Roboto/system for PDP web type — Google Sans Flex only (as measured).  
6. **No** skipping re-measure of SoT IDs when “fixing” chrome.  
7. **No** treating this web template section list as Housing URL content authority.

---

## 13. Verification checklist (before shipping web UI)

```
Page: 1512, gap 40, surface/default
Header: 64h, pad [8,24,8,24], surface/subtle
Content: 1200; body gap 24; left 792 / rail 384
First fold: 1200×566, pad 24, radius 24, surface/white, gap 40
Share/Save: 42×42, radius 12, surface/white, border/default 1
Section cards: surface/white, radius 24, gap 24, pad 24|24|24|24 or 24|0|24|0
Titles: GSF SemiBold 18 / h26 / text/primary
Dividers: border/subtle 1
Primary CTA: h48, radius 12, surface/brand, Medium 14 text/inverse
Chips: pad [12,16], radius 12; selected surface/subtle + warm_neutral/500 1.5
```
