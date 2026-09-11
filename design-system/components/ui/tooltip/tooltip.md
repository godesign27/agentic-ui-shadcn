# Tooltip

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:tooltip`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-tooltip`  
**Import:** `@/components/ui/tooltip`  

## Purpose

Name a control whose purpose is not obvious from its appearance.

Radix Tooltip. Opens on hover and on keyboard focus. Requires TooltipProvider somewhere above it.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/tooltip.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/tooltip/tooltip.md` | This mirror spec |
| `design-system/components/ui/tooltip/tooltip.agent.json` | Structured agent contract |
| `design-system/components/ui/tooltip/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/tooltip/tooltip.preview.html` | Visual proof of every documented state |

## When to use

- Naming an icon-only button
- Showing a full value that is truncated
- A keyboard shortcut hint

## When not to use

- Any information the user needs to complete the task — tooltips are invisible on touch and easy to miss
- Interactive content — a tooltip cannot be focused or clicked into
- Long text — use ui:popover or ui:hover-card
- As a replacement for a visible label

## Anatomy

`TooltipProvider` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `TooltipProvider` | — | Yes | Mount once high in the tree. Without it, Tooltip throws. |
| `Tooltip` | `TooltipProvider` | Yes |  |
| `TooltipTrigger` | `Tooltip` | Yes | Use asChild. The trigger must be focusable. |
| `TooltipContent` | `Tooltip` | Yes |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Hidden** | `Rest` | Nothing rendered |
| **Visible** | `Hover or focus after the delay` | Fades and zooms in from the computed side |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`tooltip.agent.json`](tooltip.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `tooltip` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Tab to the trigger — opens
- Escape — closes

**Required**

- The trigger must be focusable — a div will not do

**Notes**

- Opens on keyboard focus as well as hover. Radix handles this; do not reimplement it on mouse events.
- Touch devices have no hover. Anything tooltip-only is invisible to those users — this is the reason for the critical-information rule.
- A tooltip on an icon button supplies the visible hint; the button still needs aria-label for its accessible name.

## Examples

### Icon button

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="icon" variant="ghost" aria-label="Duplicate">
        <Copy className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Duplicate</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Agent rules

1. Never put critical information in a tooltip.
2. The trigger must be focusable.
3. An icon button still needs aria-label — the tooltip is not a substitute.
4. Mount TooltipProvider once at the app root, not per tooltip.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Critical-only information
- Interactive content inside TooltipContent
- Non-focusable trigger
- Tooltip as the only accessible name

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:hover-card` | Richer hover preview |
| `ui:popover` | Interactive content |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`tooltip.agent.json`](tooltip.agent.json) → this file → [`src/components/ui/tooltip.tsx`](../../../../src/components/ui/tooltip.tsx)
