# AI Color Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/tokens.md`, `foundation/color.md`  
**Used By:** `components/ai/atomic/*`, `components/ai/organisms/*`, `components/ai/patterns/*`  

## Purpose

Three-tier color system for AI-native UI. Tier 1 holds raw palette ramps; Tier 2 maps palette steps to semantic intent; Tier 3 (component slots like `ai-button.*`) lives in per-component specs. **Components consume Tier 2 / Tier 3 only** — never reference Tier 1 palette steps directly.

**Programmatic map:** `components/ai/tokens/ai-tokens.ts` → `AI.color.*`, `NEUTRAL.*`

## Hard Rules

1. **Use the constants — never hardcode hex.** Reference `AI.color.brand`, `BRAND[60]`, `SIGNAL[70]`, `NEUTRAL.textDefault`, etc.
2. **Three tiers.** Tier 1 = `BRAND`, `SIGNAL`, `COMPANION`. Tier 2 = `AI.color.*`, `AI.gradient.*`, `AI.shadow.*`. Tier 3 = `ai-button.*`, `ai-card.*` (CSS variables in component files).
3. **CSS variables for surfaces.** Card backgrounds, borders, and helper text use `var(--ai-card-bg)`, `var(--ai-brand-surface)`, `var(--ai-neutral-text)`, etc., defined at `:root` from the JS constants.

---

## Tier 1 — Global Palette (token authors only)

### BRAND ramp (`brand-{step}`)

| Step | Hex | Role |
|------|-----|------|
| 100 | `#1F2A66` | Darkest brand ink |
| 90 | `#2D3DA3` | Deep brand / headings |
| 80 | `#3F50C7` | Active pressed state |
| 70 | `#4D60E6` | Hover / secondary text |
| 60 | `#5A6DFF` | Primary brand accent |
| 50 | `#7A8CFF` | Focus ring, gradient start |
| 40 | `#96A4FF` | Strong border |
| 30 | `#B4BDFF` | — |
| 20 | `#D2D6FF` | Emphasis surface, default border |
| 10 | `#E6E9FF` | Subtle surface, card bg |
| 00 | `#F5F6FF` | Lightest tint, panel bg |

### Signal orange (`signal-{step}`) — signal / attention (10% accent)

| Step | Hex | Role |
|------|-----|------|
| 60 | `#EC7200` | Primary signal — matches Standard `@token-background-secondary-bold` |
| 70 | `#CB6100` | Signal hover |
| 80 | `#A54F00` | High-stakes emphasis |
| 10 | `#FFF1D6` | Signal tinted bg |
| 00 | `#FEFBF4` | Lightest signal surface |

### BRAND Tan (`companion-{step}`) — companion warm neutral (10% accent)

| Step | Hex | Role |
|------|-----|------|
| 00 | `#F6F2EB` | Paper surface |
| 10 | `#ECE6DD` | Companion card bg |
| 20 | `#F1E4D0` | Highlight / selection |
| 30 | `#E8D6BF` | Companion border |
| 100 | `#3C2A1D` | Companion ink |

---

## Tier 2 — Semantic Aliases (`AI.color.*`)

### Action

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.action.primary` | `BRAND[60]` | Filled buttons, active chips |
| `AI.color.action.primaryHover` | `BRAND[70]` | Hover state |
| `AI.color.action.primaryActive` | `BRAND[80]` | Pressed state |

### Surface

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.surface.default` | `BRAND['00']` | Panel bg, lightest tint |
| `AI.color.surface.subtle` | `BRAND[10]` | Card bg, insight fill |
| `AI.color.surface.emphasis` | `BRAND[20]` | Badge fill, table header |

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.border.default` | `BRAND[20]` | Default card/insight border |
| `AI.color.border.strong` | `BRAND[40]` | Panel border, chip hover |
| `AI.color.border.focus` | `BRAND[50]` | Input focus ring accent |

### Text (on AI surfaces)

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.text.primary` | `BRAND[90]` | Heading / label |
| `AI.color.text.secondary` | `BRAND[70]` | Sub-label, badge label |
| `AI.color.text.onAction` | `#FFFFFF` | Text on filled button or gradient |

### Brand

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.brand` | `BRAND[60]` | Icons, active states |
| `AI.color.brandSubtle` | `BRAND[10]` | Tinted brand bg |
| `AI.color.brandSurface` | `BRAND['00']` | Panel/card bg |
| `AI.color.brandBorder` | `BRAND[20]` | Brand-tinted border |
| `AI.color.brandStrong` | `BRAND[90]` | Deep brand emphasis |
| `AI.color.brandInk` | `BRAND[100]` | Darkest brand ink |

### Signal (Signal orange)

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.signal.default` | `SIGNAL[60]` | Attention, escalation CTA |
| `AI.color.signal.hover` | `SIGNAL[70]` | Signal hover |
| `AI.color.signal.strong` | `SIGNAL[80]` | High-stakes emphasis |
| `AI.color.signal.subtle` | `SIGNAL[10]` | Signal tinted bg |
| `AI.color.signal.surface` | `SIGNAL['00']` | Lightest signal tint |

### Companion (BRAND Tan)

| Token | Value | Usage |
|-------|-------|-------|
| `AI.color.companion.paper` | `COMPANION['00']` | Warm paper surface |
| `AI.color.companion.surface` | `COMPANION[10]` | Companion card bg |
| `AI.color.companion.highlight` | `COMPANION[20]` | Selection highlight |
| `AI.color.companion.border` | `COMPANION[30]` | Companion border |
| `AI.color.companion.ink` | `COMPANION[100]` | Companion text |

---

## Gradients (`AI.gradient.*`)

| Token | Usage |
|-------|-------|
| `AI.gradient.action.full` | Primary filled button gradient |
| `AI.gradient.action.secondary` | Secondary action gradient |
| `AI.gradient.surface.idle` | Empty state page bg |
| `AI.gradient.surface.active` | Active conversation page bg |
| `AI.gradient.surface.subtle` | Insight card fill |

**Theme overrides:** `AI_THEME.aqua` replaces `gradient.surface.idle` / `active` with teal-influenced variants.

---

## Neutral Namespace (`NEUTRAL.*`)

Standard ZAIDYN text/icon/border tokens — separate from `AI.*`, never mixed.

| Token | Hex | standard equivalent |
|-------|-----|----------------|
| `NEUTRAL.textDefault` | `#2f2c3c` | `--token-text-default` |
| `NEUTRAL.textHelper` | `#5b5864` | `--token-helper-text-color` |
| `NEUTRAL.textDisabled` | `#716e79` | disabled text |
| `NEUTRAL.iconDefault` | `#5b5864` | `--token-icon-primary-default` |
| `NEUTRAL.iconHover` | `#2f2c3c` | icon hover |
| `NEUTRAL.menuHoverBg` | `rgba(178,176,182,0.4)` | menu item hover |
| `NEUTRAL.border` | `#B2B0B6` | `--token-border-color` |
| `NEUTRAL.borderFunc` | `#5b5864` | functional border |

---

## CSS Custom Properties (Tier 3 bridge)

Define at `:root` from JS constants for theme-aware surfaces:

```css
:root {
  --ai-card-bg: /* AI.color.surface.subtle */;
  --ai-brand-surface: /* AI.color.brandSurface */;
  --ai-neutral-text: /* NEUTRAL.textDefault */;
  --ai-neutral-text-helper: /* NEUTRAL.textHelper */;
}
```

Component Tier 3 tokens (`ai-button.bg`, `ai-card.border`, etc.) map to these variables in per-component `.md` / `.agent.json` files.

---

## Do's and Don'ts

- Do use `AI.color.*` and `NEUTRAL.*` in component code — never raw hex.
- Do use orange signal **sparingly** — one primary signal affordance per view (10% rule).
- Do keep companion tan surfaces for warm neutral cards and work notes.
- Don't reference `BRAND[n]` directly in components — only when authoring new Tier 2 tokens.
- Don't invent `--ai-*` hex values; source from `ai-tokens.ts`.
- Don't use dataviz palette colors for chat bubbles.
