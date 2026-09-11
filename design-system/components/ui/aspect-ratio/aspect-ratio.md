# AspectRatio

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** layout  
**Component id:** `ui:aspect-ratio`  
**Category:** Layout  
**Status:** Stable  
**Primitive:** `@radix-ui/react-aspect-ratio`  
**Import:** `@/components/ui/aspect-ratio`  

## Purpose

Reserve the right shape before the content arrives, so nothing jumps.

Radix AspectRatio. A six-line wrapper that holds a proportional box.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/aspect-ratio.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/aspect-ratio/aspect-ratio.md` | This mirror spec |
| `design-system/components/ui/aspect-ratio/aspect-ratio.agent.json` | Structured agent contract |
| `design-system/components/ui/aspect-ratio/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/aspect-ratio/aspect-ratio.preview.html` | Visual proof of every documented state |

## When to use

- Images and video where the ratio is known
- Preventing layout shift while media loads
- Uniform media tiles in a grid

## When not to use

- Text content, which should size to its content
- When the natural dimensions are already known and set

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The proportional box. Children should fill it with object-cover. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Always` | Maintains the given ratio at any width |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`aspect-ratio.agent.json`](aspect-ratio.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Required**

- alt on any image inside

**Notes**

- Purely presentational. Accessibility lives with the content you place inside.

## Examples

### 16:9 image

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="Conference stage" className="h-full w-full rounded-md object-cover" />
</AspectRatio>
```

## Agent rules

1. Children need object-cover or object-contain and full width and height.
2. Use for media, not text.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Constraining text content

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:skeleton` | Pair for a loading placeholder of the same shape |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`aspect-ratio.agent.json`](aspect-ratio.agent.json) → this file → [`src/components/ui/aspect-ratio.tsx`](../../../../src/components/ui/aspect-ratio.tsx)
