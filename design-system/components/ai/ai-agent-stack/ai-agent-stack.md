# AIAgentStack

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** molecules  
**Component id:** `ai:ai-agent-stack`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-agent-stack`  
**Depends on:** `ai:ai-avatar`  

## Purpose

Several agents working at once, and what each of them is doing.

Overlapping agent marks with status rings and an overflow count. Each mark carries its agent name and status as its accessible name.

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
| `src/components/ai/ai-agent-stack.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-agent-stack/ai-agent-stack.md` | This mirror spec |
| `design-system/components/ai/ai-agent-stack/ai-agent-stack.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-agent-stack/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-agent-stack/ai-agent-stack.preview.html` | Visual proof of every documented state |

## When to use

- Multi-agent workstreams
- Showing parallel work at a glance
- In a header above ai:ai-progress

## When not to use

- A single agent — use ai:ai-avatar
- Human users — use a ui:avatar group
- More than about six agents; the stack stops being readable

## Anatomy

| Part | Role |
| --- | --- |
| **Marks** | Overlapping BotAvatars, each ringed by status |
| **Ring** | Colour summary of execution state |
| **Overflow** | +n badge past maxVisible |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Running** | `status="running"` | AI accent ring |
| **Waiting** | `status="waiting"` | Signal ring — waiting for approval |
| **Blocked** | `status="blocked"` | Destructive ring |
| **Complete** | `status="complete"` | Green ring |
| **Idle** | `status="idle"` | Border ring |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `agents` | `Agent[]` | **required** | Required. Declared in the component source. |
| `maxVisible` | `number` | — | Declared in the component source. |
| `size` | `number` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-agent-stack.agent.json`](ai-agent-stack.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `ring-ai-accent` |
| `ai-confidence-high` | `ring-ai-confidence-high` |
| `ai-signal` | `ring-ai-signal` |
| `background` | `bg-background` |
| `border` | `border-border`, `ring-border` |
| `destructive` | `ring-destructive` |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `group` |

**Required**

- A label per agent — generated from label and status

**Notes**

- Each mark is labelled "Name — status", so ring colour is never the only signal.
- The group announces the total count, including agents hidden behind the overflow badge.
- The overflow badge is visual only. Provide a full list elsewhere when the detail matters.

## Examples

### Parallel agents

```tsx
<AIAgentStack agents={[
  { id: "a", label: "Research", status: "running" },
  { id: "b", label: "Drafting", status: "waiting" },
  { id: "c", label: "Review", status: "idle" },
]} />
```

## Agent rules

1. Every agent needs a real label and a real status.
2. Keep maxVisible at three or four.
3. Provide a full list somewhere when there is overflow.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Human users
- Status conveyed only by ring colour
- More than about six agents

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-avatar` | A single agent |
| `ai:ai-queue-badge` | Per-item detail |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-agent-stack.agent.json`](ai-agent-stack.agent.json) → this file → [`src/components/ai/ai-agent-stack.tsx`](../../../../src/components/ai/ai-agent-stack.tsx)
