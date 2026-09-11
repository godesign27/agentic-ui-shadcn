# AIChipBrief

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-chip-brief`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-chip-brief`  

## Purpose

Whether an agent task brief is ready to run — and whether a human still has to say yes.

A status chip for agent task briefs: default, ready, missing, edited, waiting-approval, running. The status word renders as text beside the label, never as colour alone.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Led |
| AI behavior | Suggest |
| Accountability | Attribution · Approval |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-chip-brief.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-chip-brief/ai-chip-brief.md` | This mirror spec |
| `design-system/components/ai/ai-chip-brief/ai-chip-brief.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-chip-brief/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-chip-brief/ai-chip-brief.preview.html` | Visual proof of every documented state |

## When to use

- In a list of agent task briefs
- Wherever readiness to execute must be scannable
- Before an agent run is triggered

## When not to use

- For execution state once running — use ai:ai-queue-badge
- As a general badge — use ui:badge
- As a button

## Anatomy

| Part | Role |
| --- | --- |
| **Label** | The brief name |
| **Status text** | Appended after a separator. The accessible value. |

## Variants

| Variant | When to use it |
| --- | --- |
| `default` | Draft. Not yet complete. |
| `ready` | All inputs present. Can run. |
| `missing` | Required information absent. |
| `edited` | A human changed the agent-generated brief. |
| `waiting-approval` | The state that matters — a human must approve before it runs. |
| `running` | Executing now. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Draft** | `status="default"` | Muted |
| **Ready** | `status="ready"` | Green tint |
| **Missing information** | `status="missing"` | Destructive tint |
| **Edited** | `status="edited"` | AI surface tint |
| **Waiting for approval** | `status="waiting-approval"` | Signal tint |
| **Running** | `status="running"` | AI surface tint |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `status` | `"default"` \| `"ready"` \| `"missing"` \| `"edited"` \| `"waiting-approval"` \| `"running"` | `"default"` | Declared in `aiChipBriefVariants` |
| `size` | `"sm"` \| `"md"` | `"md"` | Declared in `aiChipBriefVariants` |
| `label` | `string` | **required** | Required. Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-chip-brief.agent.json`](ai-chip-brief.agent.json)

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

**Required**

- label

**Notes**

- The status word appears both visually and in an sr-only span, so the tint is never the sole carrier of meaning.

## Examples

### Awaiting approval

```tsx
<AIChipBrief status="waiting-approval" label="Q4 territory rebalance" />
```

## Agent rules

1. Never a button.
2. waiting-approval must mean a human genuinely has to approve.
3. Use ai:ai-queue-badge once it is executing.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Interactive use
- Colour-only status
- Generic badging

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-queue-badge` | Execution state |
| `ui:badge` | Generic status |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-chip-brief.agent.json`](ai-chip-brief.agent.json) → this file → [`src/components/ai/ai-chip-brief.tsx`](../../../../src/components/ai/ai-chip-brief.tsx)
