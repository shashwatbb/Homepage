# SRP Design System Rules — Final

## Mobile Layout (< 48rem)

### Container & Spacing
- **Standard margin:** 16px left + right on ALL containers
- **EXCEPTION:** Horizontal scroll containers (filters) overflow OUTSIDE screen to right
  - Left: 16px margin (keep)
  - Right: 0px margin (overflow off-screen)
- **Container padding:** Top/Bottom 12px, Left 16px, Right 0px
- **Gap between elements:** 12px (between major sections)

### Search Bar
- **Border-radius:** 12px
- **Background:** var(--ds-color-warm-neutral-0) (white)
- **Border:** 1px solid var(--ds-color-warm-neutral-300) (darker neutral)
- **Padding inside:** 12px 16px
- **Margin outside:** 16px right (to separate from filters)
- **Icons:** 20px × 20px (search icon, AI logo)

### Filter Chips
- **Gap between chips:** 12px
- **Can overflow:** YES, extends beyond screen edge right
- **Horizontal scroll:** Enabled (overflow-x: auto)
- **Height:** 40px (mobile), 44px (web)
- **Border-radius:** 12px
- **Default state:** 1px border (var(--ds-color-warm-neutral-200))
- **Shadow:** `0 1px 2px rgba(26, 26, 26, 0.04)` (very light, mild)

### Filter Chip Variants

#### Sort Button
- Icon only (no text)
- Width: 40px (mobile), 44px (web)
- Icon size: 16px × 16px
- Padding: 0 (centered)

#### Filters (3) + Clear Chip
- One unified chip with vertical separator
- Filters section: icon (16px) + text
- Separator: 20px height, 1.5px width, 0.4 opacity, centered
- Clear button: text only
- Active state:
  - Border: 1px solid var(--ds-color-purple-700)
  - Background: var(--ds-color-lavender-mist-50)
  - Text + icons: var(--ds-color-purple-700)

#### Dropdown Buttons (Budget, Property Type, etc.)
- Text + chevron icon
- Chevron: 16px × 16px minimum
- Icon color: inherits text color
- Default text: var(--ds-color-grey-neutral-900)

### Icon Rules
- **Minimum size:** 16px × 16px everywhere
- **No smaller icons allowed**
- **Search/sort/sliders:** 16px × 16px
- **Chevrons/dropdowns:** 16px × 16px
- **AI logo:** 20px × 20px

### Color Tokens (All DS tokens)
- **White/default background:** var(--ds-color-warm-neutral-0)
- **Border default:** var(--ds-color-warm-neutral-300)
- **Text default:** var(--ds-color-grey-neutral-900)
- **Active border:** var(--ds-color-purple-700)
- **Active background:** var(--ds-color-lavender-mist-50)
- **Active text/icons:** var(--ds-color-purple-700)

---

## Desktop Layout (≥ 48rem)

### Container & Spacing
- Same 16px margins apply
- **Container padding:** Top/Bottom 16px, Left 24px, Right 0px
- **Gap between elements:** 16px
- **Filter gap:** 12px (same as mobile)

### Search Bar
- **Padding inside:** 14px 20px
- **Margin outside:** 16px right (same)

### Filter Chips
- **Height:** 44px (increased from mobile 40px)
- **All padding:** adjusted to 10px (from 8px)
- **Spacing remains:** 12px gaps

---

## Strict Rules Summary

✅ **ALWAYS:**
- Use DS color tokens only (never hardcoded colors)
- 16px left + right margin on standard containers
- Horizontal scroll containers overflow right (0px right margin)
- 12px gap between filter chips
- 16px × 16px minimum for all icons
- 1px borders (no thicker unless active state)
- Centered alignment for elements

❌ **NEVER:**
- Add right padding to containers with horizontal scroll
- Use hardcoded colors instead of DS tokens
- Make icons smaller than 16px
- Change gap sizes without explicit rule update
- Clip content on right edge

---

---

## Checkpoints (Revert Points)

### ✓ CHECKPOINT: Light Shadows Added
**Date:** July 1, 2026  
**What:** Added very light, mild shadows to all filter chips  
**Shadow:** `0 1px 2px rgba(26, 26, 26, 0.04)`  
**Commit point:** All rules stable, shadows in place  
**Revert to here if:** Shadows need adjustment, styling looks wrong

---

**Last Updated:** July 1, 2026  
**Status:** FINAL - Approved by user with shadows
