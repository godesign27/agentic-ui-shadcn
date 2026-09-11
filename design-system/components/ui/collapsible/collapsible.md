# Collapsible

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:collapsible`  
**Category:** Disclosure  
**Status:** Stable  
**Primitive:** `@radix-ui/react-collapsible`  
**Import:** `@/components/ui/collapsible`  

## Purpose

One thing that opens and closes, with no group to coordinate.

Radix Collapsible, unstyled. Twelve lines: three re-exports with no classes applied.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/collapsible.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/collapsible/collapsible.md` | This mirror spec |
| `design-system/components/ui/collapsible/collapsible.agent.json` | Structured agent contract |
| `design-system/components/ui/collapsible/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/collapsible/collapsible.preview.html` | Visual proof of every documented state |

## When to use

- A single show-more region
- Advanced options below a form
- A sidebar section that expands

## When not to use

- Several related sections — use ui:accordion, which handles the group and the heading semantics
- Content that should be visible by default

## Anatomy

`Collapsible` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `CollapsibleTrigger` | `Collapsible` | Yes | Use asChild to supply your own button |
| `CollapsibleContent` | `Collapsible` | Yes |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `open={false}` | Content hidden |
| **Open** | `open={true}` | Content revealed. No animation is applied by this component — add your own. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`collapsible.agent.json`](collapsible.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button with aria-expanded` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Enter or Space — toggle

**Required**

- A meaningful trigger label that reflects the action

**Notes**

- Radix wires aria-expanded and aria-controls.
- This component applies no styling at all. The chevron, the animation and the spacing are all yours.
- The trigger label should say what will be revealed — "Advanced options", not "More".

## Examples

### Advanced options

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">Advanced options</Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2 pt-2">
    {/* … */}
  </CollapsibleContent>
</Collapsible>
```

## Agent rules

1. Bring your own styling — nothing is applied.
2. Use ui:accordion for grouped sections.
3. Trigger labels name the content, not the gesture.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Using Collapsible for a group where Accordion belongs

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- Entirely unstyled — no animation, chevron or spacing. Unlike every other component here, you supply all of it.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:accordion` | Grouped, styled, with heading semantics |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`collapsible.agent.json`](collapsible.agent.json) → this file → [`src/components/ui/collapsible.tsx`](../../../../src/components/ui/collapsible.tsx)
