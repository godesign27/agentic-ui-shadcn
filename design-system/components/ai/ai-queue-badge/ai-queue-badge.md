# AIQueueBadge

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-queue-badge`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-queue-badge`  

## Purpose

The state of one item in an agent queue, readable at a glance.

Colour, icon and text together for queued, running, blocked, needs-approval and complete.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Led |
| AI behavior | Suggest |
| Accountability | Attribution · Audit trail |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-queue-badge.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-queue-badge/ai-queue-badge.md` | This mirror spec |
| `design-system/components/ai/ai-queue-badge/ai-queue-badge.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-queue-badge/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-queue-badge/ai-queue-badge.preview.html` | Visual proof of every documented state |

## When to use

- In an agent execution queue or task list
- In a table of agent work items
- Wherever per-item state matters

## When not to use

- As a general status badge — use ui:badge
- For overall progress — use ai:ai-progress
- As a button

## Anatomy

| Part | Role |
| --- | --- |
| **Icon** | Status glyph, aria-hidden. Spins while running. |
| **Label** | The status word. Always present. |
| **Count** | Optional numeric pill |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Queued** | `status="queued"` | Muted, clock icon |
| **Running** | `status="running"` | AI surface, spinning icon |
| **Blocked** | `status="blocked"` | Destructive tint |
| **Needs approval** | `status="needs-approval"` | Signal tint — a human must act |
| **Complete** | `status="complete"` | Green tint |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `status` | `QueueStatus` | **required** | Required. Declared in the component source. |
| `count` | `number` | — | Declared in the component source. |
| `label` | `string` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-queue-badge.agent.json`](ai-queue-badge.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `border-ai-accent`, `text-ai-accent` |
| `ai-confidence-high` | `bg-ai-confidence-high`, `border-ai-confidence-high`, `text-ai-confidence-high` |
| `ai-signal` | `bg-ai-signal`, `border-ai-signal`, `text-ai-signal` |
| `ai-surface` | `bg-ai-surface` |
| `border` | `border-border` |
| `destructive` | `bg-destructive`, `border-destructive`, `text-destructive` |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Notes**

- Colour, icon and text always appear together — colour is never the only signal.
- The spin animation carries motion-reduce:animate-none.
- A bare count pill needs surrounding context; the status word supplies it here.

## Examples

### Queue row

```tsx
<AIQueueBadge status="needs-approval" count={3} />
```

## Agent rules

1. Never a button — pair it with a real control.
2. needs-approval must mean a human genuinely has to act.
3. Use ui:badge for non-AI status.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Use as an interactive control
- Generic status
- Colour-only status

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:badge` | Generic status |
| `ai:ai-chip-brief` | Task brief readiness |
| `ai:ai-progress` | Overall progress |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-queue-badge.agent.json`](ai-queue-badge.agent.json) → this file → [`src/components/ai/ai-queue-badge.tsx`](../../../../src/components/ai/ai-queue-badge.tsx)
