# AIChipHandoff

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-chip-handoff`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-chip-handoff`  

## Purpose

Show the moment accountability changed hands.

A directional pill naming the source and target of a handoff: agent to agent, agent to human, human to agent, system to agent, or failed.

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
| `src/components/ai/ai-chip-handoff.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.md` | This mirror spec |
| `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-chip-handoff/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.preview.html` | Visual proof of every documented state |

## When to use

- In an agent activity log or timeline
- When work transfers between agents or between an agent and a person
- To make it clear who is currently responsible

## When not to use

- As a general direction indicator
- When no actual transfer occurred
- As a button

## Anatomy

| Part | Role |
| --- | --- |
| **From** | Source icon and name |
| **Arrow** | Direction, aria-hidden |
| **To** | Target icon and name |

## Variants

| Variant | When to use it |
| --- | --- |
| `agent-to-agent` | One agent passed to another. AI tint. |
| `agent-to-human` | The machine handed back. Signal tint — a person now owns it. |
| `human-to-agent` | A person delegated. AI tint. |
| `system-to-agent` | Automated dispatch. Neutral tint. |
| `failed` | The handoff did not complete. Destructive tint. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Agent to agent** | `direction="agent-to-agent"` | AI surface |
| **Agent to human** | `direction="agent-to-human"` | Signal — escalation |
| **Human to agent** | `direction="human-to-agent"` | AI surface |
| **System to agent** | `direction="system-to-agent"` | Neutral |
| **Failed** | `direction="failed"` | Destructive — nobody picked it up |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `direction` | `HandoffDirection` | **required** | Required. Declared in the component source. |
| `fromLabel` | `string` | **required** | Required. Declared in the component source. |
| `toLabel` | `string` | **required** | Required. Declared in the component source. |
| `size` | `"sm" \| "md"` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-chip-handoff.agent.json`](ai-chip-handoff.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `text-ai-accent` |
| `ai-signal` | `bg-ai-signal`, `border-ai-signal`, `text-ai-signal` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |
| `border` | `border-border` |
| `destructive` | `bg-destructive`, `border-destructive`, `text-destructive` |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Required**

- fromLabel and toLabel

**Notes**

- Both party names are visible text, so the icons carry no unique meaning.
- An sr-only suffix distinguishes a completed handoff from a failed one.

## Examples

### Escalation

```tsx
<AIChipHandoff direction="agent-to-human" fromLabel="Research agent" toLabel="Dana" />
```

## Agent rules

1. Only render for real transfers.
2. Name both parties specifically.
3. agent-to-human means a person is now accountable — do not use it loosely.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Decorative direction indicators
- Unnamed parties
- Interactive use

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-agent-stack` | Who is working now |
| `ai:ai-agent-work-note` | What they did |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-chip-handoff.agent.json`](ai-chip-handoff.agent.json) → this file → [`src/components/ai/ai-chip-handoff.tsx`](../../../../src/components/ai/ai-chip-handoff.tsx)
