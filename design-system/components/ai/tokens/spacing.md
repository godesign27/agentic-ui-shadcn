# AI Spacing Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/tokens.md`, `foundation/layout.md`  
**Used By:** `components/ai/atomic/*`, `components/ai/organisms/*`, `components/ai/patterns/*`  

## Purpose

`@token-space-unit` (8px) ramp shared with the standard spacing system. AI surfaces inherit the same scale — don't hand-tune padding.

AI components use explicit pixel values for spacing in React inline styles (no Tailwind). In LESS / scoped Guild CSS, prefer `ui-padding-*` / `ui-margin-*` utility classes. All values are multiples of the base unit.

**Programmatic map:** Documentation-only — spacing constants are not yet exported from `ai-tokens.ts`. Use Standard `@token-space-unit` utilities and the tables below.

---

## Hard Rules

1. **Base unit = 8px.** All spacing is a multiple of `@token-space-unit` (0 / 0.5 / 1 / 1.5 / 2 → 0 / 4 / 8 / 12 / 16 px).
2. **Use the utilities in CSS.** Reach for `ui-padding-*` / `ui-margin-*` / `ui-gap-*` when working in LESS / scoped Guild CSS.
3. **Use the same multiples in React.** Inline styles should use 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 — never arbitrary values like `13px`.
4. **CSS variables for Tier 3.** Component slots may emit `--ai-padding-card`, `--ai-gap-thread`, etc., defined at `:root` from documented values.
5. **Don't compress touch targets.** Bubble and chip padding must not drop below 12px on interactive surfaces.

---

## Base Unit Ramp

| Step | Multiplier | px | Standard utility (typical) |
| --- | --- | --- | --- |
| 0 | 0 | `0px` | — |
| 0.5 | ½× | `4px` | `ui-padding-0-5`, tight inline gaps |
| 1 | 1× | `8px` | `ui-padding-1`, action gap, icon spacing |
| 1.5 | 1.5× | `12px` | `ui-padding-1-5`, toolbar padding, step gaps |
| 2 | 2× | `16px` | `ui-padding-2`, bubble padding, message gap |
| 3 | 3× | `24px` | `ui-padding-3`, section gap, chat gutter |
| 4 | 4× | `32px` | `ui-padding-4`, console section gap |
| 6 | 6× | `48px` | `ui-padding-6`, empty state vertical padding |

---

## Common Padding Values

Documented pixel values from AI component specs — all on the 8px grid (or 4px half-step where noted).

| Context | Value | Notes |
| --- | --- | --- |
| Input card textarea (empty) | `20px 20px 0` | Empty-state composer |
| Input card textarea (chat) | `14px 20px 0` | Active thread composer |
| Input card toolbar | `12px 16px 16px` | Send / attach row |
| Chip | `7px 14px` | Quick chip, handoff chip — half-step vertical |
| Insight card | `10px 14px` | Analysis insight body |
| Table cell | `7px 10px` | Compact data table |
| Attribution gap | `7px` | Avatar → label inline gap |
| Message gap | `16px` | Vertical stack between bubbles |
| Thinking step gap | `12px` | Collapsible reasoning steps |
| Queue badge shell | `3px 9px` | Compact status pill |
| Handoff chip (md) | `4px 10px` | Directional ownership pill |

---

## Semantic Spacing

| Role | px | Utility (typical) | Usage |
| --- | --- | --- | --- |
| Prompt padding X | 16 | `ui-padding-2` horizontal | Text area inset |
| Prompt padding Y | 12 | `ui-padding-1-5` | Vertical inset in composer |
| Bubble padding | 16 | `ui-padding-2` | Message body inset |
| Thread gap | 12–16 | `ui-margin-0-0-1-0` | Vertical stack in chat thread |
| Console section gap | 24 | `ui-margin-0-0-3-0` | Between console regions |
| Action gap | 8 | `ui-margin-0-1-0-0` | Icon buttons in response actions |
| Composer to thread | 16 | `ui-margin-1-0-0-0` | Sticky prompt above transcript |

---

## Layout

| Region | Value / guidance |
| --- | --- |
| Max content width (chat) | `680px` |
| Chat scroll area padding | `36px 24px 16px` |
| Chat input bar padding | `16px 24px 20px` |
| Empty state padding | `48px 24px` |
| Chat column max (legacy) | 720–800px readable width inside main |
| Drawer AI panel | 360–400px per `ai-assistant-drawer` pattern |
| Console split | Follow `patterns/ai/ai-console-page.md` when populated |

### Density modes

| Mode | Card padding | Thread gap | Usage |
| --- | --- | --- | --- |
| Compact | 12px | 12px | Dense audit rows, side panels |
| Default | 16px | 16px | Standard chat and console |
| Spacious | 24px | 24px | Empty state, marketing hero AI surfaces |

---

## Consumer Mapping

| Component / surface | Spacing | Notes |
| --- | --- | --- |
| `AIInputCard` (empty) | textarea `20px 20px 0`, toolbar `12px 16px 16px` | See input card spec |
| `AIInputCard` (chat) | textarea `14px 20px 0` | Reduced top inset in thread |
| `AIChipQuick` | `7px 14px` | Pill chip |
| `AIChipHandoff` | `4px 10px` (md) / `2px 8px` (sm) | Audit trail density |
| `AIMessageBody` | bubble `16px`, thread gap `16px` | Conversational stack |
| `AILoadingIndicators` | step gap `12px` | Thinking card steps |
| Chat page shell | scroll `36px 24px 16px`, input bar `16px 24px 20px` | Page-level gutters |

---

## CSS Custom Properties (Tier 3 bridge)

When emitting component tokens, define at `:root`:

```css
:root {
  --ai-gap-thread:     16px;
  --ai-gap-action:     8px;
  --ai-padding-bubble: 16px;
  --ai-padding-chip:   7px 14px;
  --ai-padding-input:  20px 20px 0;
  --ai-max-chat-width: 680px;
}
```

---

## Usage

```tsx
// All AI surface padding / gap values are multiples of 8px (or 4px half-steps).
<div style={{ padding: 12, gap: 8 }}>
  <div style={{ marginBottom: 16 }}>Header</div>
  <div>Body</div>
</div>
```

In Guild-scoped LESS / CSS, use utility classes:

```html
<div class="ui-padding-1 ui-margin-bottom-2">…</div>
```

---

## Do's and Don'ts

- Do align all AI spacing to multiples of 8px (4px half-steps allowed for compact chips/badges).
- Do use tokenized utilities in CSS — not arbitrary `margin: 13px`.
- Do follow documented density mode (compact / default / spacious) per surface.
- Do use page gutter values from the Layout table — no ad-hoc page-shell padding.
- Don't compress bubble text below 12px padding on touch targets.
- Don't mix spacing systems — stay on `@token-space-unit` / standard utilities.

---

## Validation Checklist

- [ ] Every padding / margin / gap is a multiple of 8px (4px half-steps only where documented).
- [ ] Card padding follows the documented density mode (compact / default / spacious).
- [ ] Page gutters use the documented breakpoint rules — no ad-hoc page-shell padding.
- [ ] Input card textarea/toolbar padding matches empty vs chat state values.
- [ ] Chat max width respects `680px` content column where specified.
