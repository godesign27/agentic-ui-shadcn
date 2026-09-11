# ScrollArea

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:scroll-area`  
**Category:** Layout  
**Status:** Stable  
**Primitive:** `@radix-ui/react-scroll-area`  
**Import:** `@/components/ui/scroll-area`  

## Purpose

A scrollable region with a scrollbar that looks the same on every platform.

Radix ScrollArea with a custom-styled scrollbar. The root must have a bounded height or nothing scrolls.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/scroll-area.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/scroll-area/scroll-area.md` | This mirror spec |
| `design-system/components/ui/scroll-area/scroll-area.agent.json` | Structured agent contract |
| `design-system/components/ui/scroll-area/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/scroll-area/scroll-area.preview.html` | Visual proof of every documented state |

## When to use

- A long list inside a fixed-height panel
- Sheet or dialog content that exceeds the viewport
- Anywhere the native scrollbar is visually disruptive

## When not to use

- The main page scroll — let the browser do it
- Short content that fits
- Where a native scrollbar is genuinely fine, since this adds DOM weight

## Anatomy

`ScrollArea` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `ScrollBar` | `ScrollArea` | No | Rendered automatically for the vertical axis. Add explicitly with orientation="horizontal" for horizontal scrolling. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Not scrollable** | `Content fits` | No scrollbar rendered |
| **Scrollable** | `Content overflows` | Scrollbar appears on hover and during scroll |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `orientation` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`scroll-area.agent.json`](scroll-area.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `border` | `bg-border` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Arrow keys — scroll when the viewport has focus
- Page Up/Down
- Home/End

**Notes**

- The viewport is keyboard scrollable. Radix handles the focus behaviour.
- The scrollbar fades unless hovered. Some users rely on a persistent scrollbar as an affordance — consider whether that matters on your surface.
- Set an explicit height on the root. Without one, the content simply grows and nothing scrolls.

## Examples

### Bounded list

```tsx
<ScrollArea className="h-72 w-full rounded-md border">
  <div className="p-4">{items.map(i => <div key={i.id}>{i.name}</div>)}</div>
</ScrollArea>
```

## Agent rules

1. Always set an explicit height or max-height on the root.
2. Add ScrollBar orientation="horizontal" explicitly for horizontal scroll.
3. Do not wrap the whole page in a ScrollArea.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- ScrollArea with no bounded height
- Wrapping the document scroll

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:sheet` | Common host for long content |
| `ui:table` | Wrap wide tables for horizontal scroll |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`scroll-area.agent.json`](scroll-area.agent.json) → this file → [`src/components/ui/scroll-area.tsx`](../../../../src/components/ui/scroll-area.tsx)
