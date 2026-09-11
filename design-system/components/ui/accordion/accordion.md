# Accordion

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:accordion`  
**Category:** Disclosure  
**Status:** Stable  
**Primitive:** `@radix-ui/react-accordion`  
**Import:** `@/components/ui/accordion`  

## Purpose

Let a long page stay scannable by collapsing detail the user can open on demand.

Radix Accordion in single or multiple mode, with an animated chevron and height transition.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/accordion.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/accordion/accordion.md` | This mirror spec |
| `design-system/components/ui/accordion/accordion.agent.json` | Structured agent contract |
| `design-system/components/ui/accordion/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/accordion/accordion.preview.html` | Visual proof of every documented state |

## When to use

- FAQs
- Long forms broken into optional sections
- Settings groups most users will not open
- Progressive disclosure of secondary detail

## When not to use

- Content most users need — hiding it costs more than the vertical space saves
- Fewer than three sections
- Peer views of one object — use ui:tabs
- Content that must be searchable in-page, since collapsed text is not findable by Ctrl+F

## Anatomy

`Accordion` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `AccordionItem` | `Accordion` | Yes | Needs a unique value |
| `AccordionTrigger` | `AccordionItem` | Yes | Renders a button inside an h3 |
| `AccordionContent` | `AccordionItem` | Yes |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Collapsed** | `Not in value` | Content hidden; chevron pointing down |
| **Expanded** | `In value` | Content animates open; chevron rotates 180° |
| **Focus-visible** | `Keyboard focus on a trigger` | Focus ring on the trigger |
| **Disabled** | `disabled on an item` | opacity-50, not togglable |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`accordion.agent.json`](accordion.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Enter or Space — toggle
- Tab — move between triggers
- Arrow keys — move between triggers

**Required**

- type is required: "single" or "multiple"

**Notes**

- Radix wraps each trigger in an h3 with a button inside, and wires aria-expanded and aria-controls.
- Collapsed content is removed from the DOM, so browser find-in-page will not reach it.
- type="single" with collapsible={false} means one section is always open — decide which.

## Examples

### FAQ

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="billing">
    <AccordionTrigger>How does billing work?</AccordionTrigger>
    <AccordionContent>Monthly, in arrears.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Agent rules

1. type is required.
2. Do not hide content most users need.
3. Three or more sections, or use something else.
4. Remember collapsed content is not findable by Ctrl+F.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Accordion with no type
- Hiding primary content
- Fewer than three sections

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:collapsible` | A single disclosure with no group behaviour |
| `ui:tabs` | Peer views |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`accordion.agent.json`](accordion.agent.json) → this file → [`src/components/ui/accordion.tsx`](../../../../src/components/ui/accordion.tsx)
