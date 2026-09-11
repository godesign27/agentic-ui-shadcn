# Slider

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:slider`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-slider`  
**Import:** `@/components/ui/slider`  

## Purpose

An approximate value along a continuous range, where the relative position matters more than the exact number.

Radix Slider with a track, range fill and thumb. Supports multiple thumbs for range selection.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/slider.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/slider/slider.md` | This mirror spec |
| `design-system/components/ui/slider/slider.agent.json` | Structured agent contract |
| `design-system/components/ui/slider/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/slider/slider.preview.html` | Visual proof of every documented state |

## When to use

- Volume, opacity, zoom, brightness — anything with immediate visible feedback
- A price or date range, using two thumbs

## When not to use

- Precise numeric entry — use ui:input, or pair the slider with one
- Fewer than about ten discrete steps — use ui:radio-group or ui:toggle-group
- Any value where being one step off matters

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | Owns value, min, max, step |
| **Track** | The full range, bg-secondary |
| **Range** | The filled portion, bg-primary |
| **Thumb** | The draggable handle. One per value in the array. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Thumb positioned by value |
| **Focus-visible** | `Keyboard focus on a thumb` | ring-2 ring-ring ring-offset-2 |
| **Dragging** | `Pointer down on a thumb` | Value updates continuously |
| **Disabled** | `disabled prop` | opacity-50, pointer-events-none |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`slider.agent.json`](slider.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `primary` | `bg-primary`, `border-primary` |
| `ring` | `ring-ring` |
| `secondary` | `bg-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `slider` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Arrow keys — step by one
- Page Up/Down — step by a larger increment
- Home/End — jump to min or max

**Required**

- aria-label or aria-labelledby on the root
- aria-valuetext when the raw number is not meaningful on its own

**Notes**

- Radix sets aria-valuemin, aria-valuemax and aria-valuenow.
- Set aria-valuetext when the number needs units or context — "40 percent" rather than "40".
- The thumb is 20px. Its hit area is below the 44px guideline; add vertical padding to the container on touch surfaces.

## Examples

### Labelled with value

```tsx
<div className="space-y-2">
  <div className="flex justify-between">
    <Label htmlFor="volume">Volume</Label>
    <span className="text-sm text-muted-foreground">{value}%</span>
  </div>
  <Slider id="volume" value={[value]} onValueChange={([v]) => setValue(v)} max={100} step={1} />
</div>
```

## Agent rules

1. Label the slider.
2. Display the current value in text beside it — the thumb position is not readable enough alone.
3. Set aria-valuetext when units matter.
4. For exact entry, pair with ui:input.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- A slider as the only way to enter a precise value
- Unlabelled slider
- A slider with fewer than ten meaningful steps

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:input` | Exact numeric entry |
| `ui:progress` | Read-only progress, not input |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`slider.agent.json`](slider.agent.json) → this file → [`src/components/ui/slider.tsx`](../../../../src/components/ui/slider.tsx)
