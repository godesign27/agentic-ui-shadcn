# AI Shadow Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/tokens.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/atomic/*`, `components/ai/organisms/*`, `components/ai/patterns/*`  

## Purpose

Two shadow families on `AI.shadow`: **action** (drop shadow for interactive elements) and **input** (composite shadow for the AI input card resting / focus states).

AI-specific shadows use brand-tinted rgba — never plain black. Overlays and drawers may still reference standard blur tokens where appropriate.

**Programmatic map:** `components/ai/tokens/ai-tokens.ts` → `AI.shadow.*`

---

## Hard Rules

1. **Use the constants — never hardcode shadow values.** Reference `AI.shadow.action.default`, `AI.shadow.input.focus`, etc. Tier 1 palettes are for token authors; components consume Tier 2 (`AI.*`) / Tier 3 component tokens only.
2. **Drop shadows are brand-tinted.** `AI.shadow.action.*` is `rgba(90, 109, 255, …)` — never plain black on AI surfaces.
3. **Input card uses the composite shadow.** Don't recompose the input shadow inline; reach for `AI.shadow.input.default` / `AI.shadow.input.focus`.
4. **Hover / pressed elevation uses `emphasis`.** Don't invent a custom alpha bump — use `AI.shadow.action.emphasis`.
5. **CSS variables for Tier 3.** Component slots emit `--ai-shadow-button`, `--ai-shadow-input`, etc., defined at `:root` from JS constants for theme-aware surfaces.
6. **Shadow is not the only focus signal.** Pair input focus shadow with `AI.color.border.focus` where the component spec requires it.

---

## `AI.shadow.action.*`

Drop shadow for interactive / elevated elements (hover states, filled buttons, elevated chips).

| Token | Value | Usage |
| --- | --- | --- |
| `AI.shadow.action.default` | `rgba(90, 109, 255, 0.18)` | Default elevation on primary buttons, active chips |
| `AI.shadow.action.emphasis` | `rgba(90, 109, 255, 0.24)` | Hover / pressed / active elevation |

The action tokens are **color-only** rgba values — wrap them in a spread offset when applying:

```tsx
boxShadow: `0 2px 8px ${AI.shadow.action.default}`
boxShadow: `0 4px 14px ${AI.shadow.action.emphasis}`  // hover
```

---

## `AI.shadow.input.*`

Composite shadow for the AI input card. Includes ring stroke + ambient blur stack — apply as a complete `box-shadow` value, do not decompose.

| Token | Value |
| --- | --- |
| `AI.shadow.input.default` | `0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05)` |
| `AI.shadow.input.focus` | `0 0 0 2px rgba(90,109,255,0.35), 0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)` |

The input shadow transitions from `default` → `focus` on textarea / composer focus. The focus variant adds a brand-tinted ring (`rgba(90,109,255,0.35)`) and increases blur spread.

```tsx
boxShadow: AI.shadow.input.default   // resting
boxShadow: AI.shadow.input.focus     // focused
```

---

## Quick Reference

| Surface | Token |
| --- | --- |
| Primary button (default) | `` `0 2px 8px ${AI.shadow.action.default}` `` |
| Primary button (hover) | `` `0 4px 14px ${AI.shadow.action.emphasis}` `` |
| AI input card (resting) | `AI.shadow.input.default` |
| AI input card (focused) | `AI.shadow.input.focus` |
| Console overlay / drawer | standard blur tokens (see below) |

---

## Consumer Mapping

| Component / surface | Token | Notes |
| --- | --- | --- |
| `AIButton` primary | `AI.shadow.action.default` / `emphasis` | Gradient fill + brand-tinted drop shadow |
| `AIInputCard` | `AI.shadow.input.default` / `focus` | Full composite — never partial recomposition |
| `AIChipQuick` | none or minimal | Pill chips rely on border, not shadow |
| Elevated insight cards | Standard `--token-shadow-blur-1` | Non-interactive lift — not `AI.shadow.action` |
| Assistant drawer | `--token-shadow-flat-right-8` | Directional flat shadow |
| Generative overlay | `--token-shadow-blur-3` | Full-screen scrim stack |

---

## Standard Shadow Reference (overlays / drawers)

Use standard tokens for non-AI-interactive elevation — not `AI.shadow.*`.

| Role | standard token | Usage |
| --- | --- | --- |
| Message bubble (elevated) | `--token-shadow-blur-1` | Optional lift for assistant card-style bubbles |
| Console card | `--token-shadow-blur-2` | Generated content cards in console |
| Generative overlay / modal | `--token-shadow-blur-3` | Full-screen or large overlay scrim stack |
| Assistant drawer edge | `--token-shadow-flat-right-8` | Right-side drawer panel depth |

---

## Layering (z-index)

| UI | Z-index class |
| --- | --- |
| Inline AI suggestions | `ui-layer-1` |
| Popover / menu in AI chrome | `ui-layer-2` |
| Assistant drawer | `ui-layer-3` |
| Generative overlay | `ui-layer-4` |
| Toast / global AI notice | `ui-layer-5` |

See `foundation/tokens.md` z-index scale.

---

## CSS Custom Properties (Tier 3 bridge)

Define at `:root` from `ai-tokens.ts` constants:

```css
:root {
  --ai-shadow-action-default:  /* AI.shadow.action.default */;
  --ai-shadow-action-emphasis: /* AI.shadow.action.emphasis */;
  --ai-shadow-input-default:   /* AI.shadow.input.default */;
  --ai-shadow-input-focus:     /* AI.shadow.input.focus */;
  --ai-shadow-button:          /* wraps action.default with offset */;
}
```

Component Tier 3 tokens (`ai-button.shadow`, `ai-input-card.shadow`, etc.) map to these variables in per-component `.md` / `.agent.json` files.

---

## Usage

```tsx
import { AI } from './tokens/ai-tokens';

<button style={{ boxShadow: `0 2px 8px ${AI.shadow.action.default}` }}>Apply</button>
<div    style={{ boxShadow: AI.shadow.input.default }}>Input card</div>
<div    style={{ boxShadow: AI.shadow.input.focus   }}>Input card · focused</div>
```

---

## Do's and Don'ts

- Do use `AI.shadow.action.*` for brand-tinted interactive elevation.
- Do use `AI.shadow.input.*` for the composer card — not ad-hoc box-shadow.
- Do transition input shadow from `default` → `focus` on focus — don't swap border-only.
- Do use `emphasis` for hover / pressed states on action shadows.
- Do match drawer shadow direction (`flat-right-8`) per drawer specs.
- Don't use plain-black box-shadows on AI surfaces.
- Don't stack multiple heavy shadows on nested bubbles.
- Don't use shadow as the only focus indicator — pair with `AI.color.border.focus` where required.
- Don't decompose `AI.shadow.input.*` into separate ring and blur values in component code.

---

## Validation Checklist

- [ ] No plain-black box-shadows on AI surfaces — drop shadows carry the brand tint.
- [ ] AI input card resting and focus states use the composite tokens, not hand-tuned shadows.
- [ ] Hover / pressed elevation uses `emphasis`, not a custom alpha bump.
- [ ] Action shadows wrap `AI.shadow.action.*` rgba — not hardcoded `rgba(90,109,255,…)`.
- [ ] Overlays and drawers use standard blur tokens, not `AI.shadow.input`.
