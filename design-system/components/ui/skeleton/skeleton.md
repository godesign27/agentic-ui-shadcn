# Skeleton

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:skeleton`  
**Category:** Feedback  
**Status:** Stable  
**Import:** `@/components/ui/skeleton`  

## Purpose

Show the shape of what is coming, so the wait feels shorter and the layout does not jump.

A pulsing placeholder block. Sixteen lines: a div with animate-pulse, bg-muted and rounded-md.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/skeleton.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/skeleton/skeleton.md` | This mirror spec |
| `design-system/components/ui/skeleton/skeleton.agent.json` | Structured agent contract |
| `design-system/components/ui/skeleton/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/skeleton/skeleton.preview.html` | Visual proof of every documented state |

## When to use

- Loading content whose shape is known
- Initial page load
- Anywhere a spinner would leave a blank region

## When not to use

- Waits under about 300ms — the flash is worse than nothing
- Unknown-shape content — a skeleton that misleads is worse than a spinner
- Indeterminate background work — use ui:progress
- After an error — show the error, not a permanent skeleton

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | One placeholder block. Compose several to mirror the real layout. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Pulsing** | `Always` | animate-pulse on bg-muted. Respects prefers-reduced-motion via Tailwind defaults. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`skeleton.agent.json`](skeleton.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `muted` | `bg-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `status` |

**Required**

- aria-busy="true" on the container, or a role="status" region announcing loading

**Notes**

- A Skeleton has no semantics of its own. On its own, a screen-reader user hears nothing at all while waiting.
- Wrap the loading region with role="status" aria-live="polite" and an sr-only "Loading" — otherwise the wait is silent.
- Announce completion too, or the user does not know the content arrived.

## Examples

### Announced skeleton

```tsx
<div role="status" aria-live="polite" aria-busy={loading}>
  <span className="sr-only">Loading profile</span>
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
</div>
```

## Agent rules

1. Mirror the real layout — matching sizes and counts.
2. Always pair with an announced loading state; the visual pulse is invisible to screen readers.
3. Do not leave a skeleton up after an error.
4. Skip it for waits under 300ms.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Skeleton with no announced loading state
- Skeleton persisting through an error
- Shapes that do not match the eventual content

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- Provides no live-region semantics of its own. The announcement is yours to add every time.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:progress` | Determinate progress |
| `ui:card` | Common host |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`skeleton.agent.json`](skeleton.agent.json) → this file → [`src/components/ui/skeleton.tsx`](../../../../src/components/ui/skeleton.tsx)
