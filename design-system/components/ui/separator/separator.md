# Separator

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:separator`  
**Category:** Layout  
**Status:** Stable  
**Primitive:** `@radix-ui/react-separator`  
**Import:** `@/components/ui/separator`  

## Purpose

A visible break between groups, without implying they are different kinds of thing.

Radix Separator. Decorative by default, which keeps it out of the accessibility tree.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/separator.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/separator/separator.md` | This mirror spec |
| `design-system/components/ui/separator/separator.agent.json` | Structured agent contract |
| `design-system/components/ui/separator/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/separator/separator.preview.html` | Visual proof of every documented state |

## When to use

- Between sections inside a card or panel
- Between groups in a menu or list
- As a vertical divider in a toolbar, with orientation="vertical"

## When not to use

- Where spacing alone would do — a rule is heavier than a gap
- Between every item in a list
- To create a border — use border utilities

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | A 1px line, horizontal or vertical |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Horizontal** | `Default` | h-px w-full |
| **Vertical** | `orientation="vertical"` | h-full w-px — requires the parent to have a height |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `orientation` | `see source` | — | Declared in the component source. |
| `decorative` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`separator.agent.json`](separator.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `border` | `bg-border` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `separator or none` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Notes**

- decorative defaults to true, which sets role="none" and keeps it out of the accessibility tree. That is right for visual grouping.
- Set decorative={false} only when the separation carries meaning a screen-reader user would otherwise miss.
- A vertical separator needs a parent with a resolved height, or it collapses to nothing.

## Examples

### Toolbar divider

```tsx
<div className="flex h-5 items-center gap-4">
  <span>Edit</span>
  <Separator orientation="vertical" />
  <span>View</span>
</div>
```

## Agent rules

1. Leave decorative true unless the break is semantically meaningful.
2. Vertical separators need a parent height.
3. Prefer spacing over rules when either would work.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Separator as a general border
- Vertical separator in a parent with no height

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:card` | Sectioning inside a card |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`separator.agent.json`](separator.agent.json) → this file → [`src/components/ui/separator.tsx`](../../../../src/components/ui/separator.tsx)
