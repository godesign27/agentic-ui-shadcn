# AI Radius Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/tokens.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/atomic/*`, `components/ai/organisms/*`, `components/ai/patterns/*`  

## Purpose

Five-step border-radius scale on `AI.radius` (xs / sm / md / lg / full). Scale names encode size intent — never raw pixels in component code.

Corner radius decisions for AI-specific surfaces live in one place so buttons, chips, input cards, badges, and panels stay visually consistent across the AI library.

**Programmatic map:** `components/ai/tokens/ai-tokens.ts` → `AI.radius.*`

---

## Hard Rules

1. **Use the constants — never hardcode pixel values.** Reference `AI.radius.md`, `AI.radius.full`, etc. Tier 1 palettes are for token authors; components consume Tier 2 (`AI.*`) / Tier 3 component tokens only.
2. **Use the scale name.** `AI.radius.md` for buttons / chips / input-card-in-chat. `AI.radius.lg` for empty-state input / panels. `AI.radius.full` only for pills.
3. **No raw `borderRadius: '12px'`.** The scale exists so corner radius decisions live in one place.
4. **CSS variables for Tier 3.** Component slots emit `--ai-radius-button`, `--ai-radius-chip`, etc., defined at `:root` from JS constants for theme-aware surfaces.
5. **Avatars are not on this scale.** Use `50%` / full circle only for avatars and icon-only badges — not `AI.radius.full`.

---

## Scale (`AI.radius.*`)

| Token | Value | Use case |
| --- | --- | --- |
| `AI.radius.xs` | `6px` | Tight — insight card accents, table corners |
| `AI.radius.sm` | `12px` | Small — badges, loader pills, queue badges |
| `AI.radius.md` | `16px` | Medium — buttons, chips, input card in chat state |
| `AI.radius.lg` | `20px` | Large — input card in empty state, panels |
| `AI.radius.full` | `100px` | Full-round — pill chips, handoff chips, "All Prompts" chip |

---

## Quick Reference

| Surface | Token |
| --- | --- |
| Input card (empty state) | `AI.radius.lg` |
| Input card (chat state) | `AI.radius.md` |
| Buttons / Send | `AI.radius.md` |
| Quick chips / handoff chips | `AI.radius.full` |
| Insight cards / badges | `AI.radius.sm` or `AI.radius.xs` |
| Data tables | `AI.radius.xs` |
| Progress bar track / fill | `100px` (pill ends — same intent as `full`) |

---

## Consumer Mapping

| Component / surface | Token | Notes |
| --- | --- | --- |
| `AIButton` | `AI.radius.md` | Default button corners |
| `AIChipQuick` | `AI.radius.full` | Pill shape |
| `AIChipHandoff` | `AI.radius.full` | Pill shape |
| `AIQueueBadge` | `AI.radius.sm` | Compact badge shell |
| `AIInputCard` (empty) | `AI.radius.lg` | Large composer in idle state |
| `AIInputCard` (chat) | `AI.radius.md` | Composer in active thread |
| `AIDialogButton` | pill / circle | Toolbar triggers — see component spec |
| Insight / analysis cards | `AI.radius.xs` | Tight card accents |
| Avatar / icon badge | `50%` | Not on `AI.radius` scale |

---

## Standard Reference

| AI token | standard equivalent | Notes |
| --- | --- | --- |
| `AI.radius.md` (16px) | `rounded.card` (8px in legacy specs) | AI surfaces use larger radii than standard cards |
| `AI.radius.sm` (12px) | — | AI-specific; no direct standard scale row |
| Avatar | `50%` | Circular icons — outside this scale |

---

## CSS Custom Properties (Tier 3 bridge)

Define at `:root` from `ai-tokens.ts` constants:

```css
:root {
  --ai-radius-xs:   /* AI.radius.xs */;
  --ai-radius-sm:   /* AI.radius.sm */;
  --ai-radius-md:   /* AI.radius.md */;
  --ai-radius-lg:   /* AI.radius.lg */;
  --ai-radius-full: /* AI.radius.full */;
  --ai-radius-button: /* AI.radius.md */;
  --ai-radius-chip:   /* AI.radius.full */;
}
```

Component Tier 3 tokens (`ai-button.radius`, `ai-card.radius`, etc.) map to these variables in per-component `.md` / `.agent.json` files.

---

## Usage

```tsx
import { AI } from './tokens/ai-tokens';

<button style={{ borderRadius: AI.radius.md }}>Run</button>
<div    style={{ borderRadius: AI.radius.lg }}>Empty state card</div>
<span   style={{ borderRadius: AI.radius.full }}>Pill chip</span>
```

In vanilla CSS / preview HTML, mirror the same values via CSS custom properties — never hardcode `border-radius: 16px` when the intent is `md`.

---

## Do's and Don'ts

- Do use `AI.radius.*` — not hardcoded `borderRadius: '16px'`.
- Do use `AI.radius.full` for pill chips, handoff chips, and prompt tags.
- Do use `AI.radius.xs` for insight card accents and tight table corners.
- Do use full circle (`50%`) only for avatars and icon-only badges.
- Don't use legacy 8px bubble radius unless a spec explicitly requires it.
- Don't substitute a large pixel value for `AI.radius.full` — use the token name.

---

## Validation Checklist

- [ ] No raw `px` border-radius in component code.
- [ ] Pill / capsule shapes use `AI.radius.full` (not a large pixel value).
- [ ] Insight card accents use `AI.radius.xs`.
- [ ] Input card empty state uses `AI.radius.lg`; chat state uses `AI.radius.md`.
- [ ] CSS custom properties defined at `:root` when emitting Tier 3 component tokens.
