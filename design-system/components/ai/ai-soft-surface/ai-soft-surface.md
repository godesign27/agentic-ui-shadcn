# AISoftSurface

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-soft-surface`  
**Category:** AI  
**Status:** Beta  
**Import:** `@/components/ai/ai-soft-surface`  

## Purpose

The wash that says everything inside this boundary was machine-generated.

A tinted container using the --ai-surface scale. The primary non-textual attribution affordance for a region of AI output.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-soft-surface.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-soft-surface/ai-soft-surface.md` | This mirror spec |
| `design-system/components/ai/ai-soft-surface/ai-soft-surface.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-soft-surface/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-soft-surface/ai-soft-surface.preview.html` | Visual proof of every documented state |

## When to use

- Wrapping an AI response, recommendation or generated draft
- Marking an agent-driven region inside an otherwise human-authored page
- As the canvas for an ai-approval-flow

## When not to use

- As a general card — use ui:card
- Decoratively, for visual interest
- Around human-authored content, ever — it would falsely attribute it to a machine
- Nested inside another soft surface; one boundary per region

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The tinted container. Everything inside is understood to be AI-generated. |

## Variants

| Variant | When to use it |
| --- | --- |
| `ai` | The default. Blue wash, the AI identity. |
| `neutral` | Low emphasis, for a secondary AI region on a busy page. |
| `mixed` | Blue into signal — use when the region contains something awaiting review. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Subtle** | `intensity="subtle"` | Flat --ai-surface. The everyday choice. |
| **Medium** | `intensity="medium"` | Gradient into the accent at 10% |
| **Expressive** | `intensity="expressive"` | Three-stop gradient. Hero surfaces only. |
| **Raised** | `elevation="soft"` | Adds shadow-sm |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `"ai"` \| `"neutral"` \| `"mixed"` | `"ai"` | Declared in `aiSoftSurfaceVariants` |
| `intensity` | `"subtle"` \| `"medium"` \| `"expressive"` | `"subtle"` | Declared in `aiSoftSurfaceVariants` |
| `elevation` | `"flat"` \| `"soft"` | `"flat"` | Declared in `aiSoftSurfaceVariants` |
| `bordered` | `"true"` \| `"false"` | — | Declared in `aiSoftSurfaceVariants` |
| `radius` | `"none"` \| `"md"` \| `"lg"` \| `"full"` | `"lg"` | Declared in `aiSoftSurfaceVariants` |
| `asChild` | `boolean` | `false` | Render the child element instead, merging props and styles |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-soft-surface.agent.json`](ai-soft-surface.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `to-ai-accent`, `via-ai-accent` |
| `ai-signal` | `to-ai-signal` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface`, `from-ai-surface`, `via-ai-surface` |
| `muted` | `bg-muted`, `from-muted`, `to-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Notes**

- A tinted background is invisible to screen readers. The visual wash is NOT sufficient attribution on its own.
- Always pair it with text attribution — ai:ai-message-header, or an aria-label on the region.
- Contrast: --ai-surface is deliberately close to the page background, so any text inside still needs a foreground token, never a lightened one.

## Examples

### Attributed AI region

```tsx
<AISoftSurface className="space-y-3 p-4" role="region" aria-label="AI recommendation">
  <AIMessageHeader agentLabel="Research agent" timestamp="Just now" />
  <AIMessageBody>Three accounts match your criteria.</AIMessageBody>
</AISoftSurface>
```

## Agent rules

1. Never wrap human-authored content in it.
2. The wash is not attribution by itself — pair it with ai:ai-message-header or a labelled region.
3. One surface per region. Do not nest.
4. Reserve expressive intensity for hero surfaces.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Wrapping human-authored content
- Decorative use
- Nested soft surfaces
- As a replacement for ui:card

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:card` | Human-authored containers |
| `ai:ai-message-header` | The text attribution it needs |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-soft-surface.agent.json`](ai-soft-surface.agent.json) → this file → [`src/components/ai/ai-soft-surface.tsx`](../../../../src/components/ai/ai-soft-surface.tsx)
