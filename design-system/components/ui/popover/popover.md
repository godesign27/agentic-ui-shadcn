# Popover

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:popover`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-popover`  
**Import:** `@/components/ui/popover`  

## Purpose

Contextual content anchored to a trigger, without blocking the page.

Radix Popover. Non-modal by default: the page stays interactive and scrollable. Positioned automatically with collision detection.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/popover.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/popover/popover.md` | This mirror spec |
| `design-system/components/ui/popover/popover.agent.json` | Structured agent contract |
| `design-system/components/ui/popover/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/popover/popover.preview.html` | Visual proof of every documented state |

## When to use

- A date picker, colour picker or small settings cluster
- Supplementary detail the user opts into
- Anything needing interactive content near its trigger

## When not to use

- Content critical to the task — if the user must read it, it cannot be behind a click
- A simple text hint — use ui:tooltip
- A list of actions — use ui:dropdown-menu, which has menu semantics and arrow-key navigation
- A form that warrants full attention — use ui:dialog

## Anatomy

`Popover` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `PopoverTrigger` | `Popover` | Yes | Use asChild to wrap your own control |
| `PopoverContent` | `Popover` | Yes | Accepts align and sideOffset |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Nothing rendered |
| **Open** | `Click or Enter on trigger` | Animates in from the computed side |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `align` | `see source` | — | Declared in the component source. |
| `sideOffset` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`popover.agent.json`](popover.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `dialog` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |
| Focus management | Focus moves into the content on open and returns to the trigger on close. |

**Keyboard**

- Enter or Space — open
- Escape — close and return focus to trigger
- Tab — move through content

**Required**

- An accessible name on the trigger

**Notes**

- Non-modal: the rest of the page stays interactive. That is the difference from ui:dialog.
- Content is portalled, so overflow-hidden ancestors do not clip it.

## Examples

### Date picker

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Pick a date</Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>
```

## Agent rules

1. Never hide critical information in a popover.
2. Use ui:dropdown-menu for action lists, not this.
3. Use ui:tooltip for plain hints.
4. Trigger needs an accessible name.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Critical-only information
- Action menus
- Nesting a modal dialog inside a popover

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:tooltip` | Text hints |
| `ui:dropdown-menu` | Actions |
| `ui:hover-card` | Hover-triggered preview |
| `ui:dialog` | Focused tasks |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`popover.agent.json`](popover.agent.json) → this file → [`src/components/ui/popover.tsx`](../../../../src/components/ui/popover.tsx)
