# AIProgress

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-progress`  
**Category:** AI  
**Status:** Draft  
**Import:** `@/components/ai/ai-progress`  

## Purpose

Progress for work that can be blocked or escalated, not merely slow.

A progress bar with an agentic status vocabulary: idle, running, indeterminate, paused, complete, blocked, error, escalated. The status word is the accessible value.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Led · Adaptive |
| AI behavior | Suggest |
| Accountability | Attribution · Audit trail |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-progress.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-progress/ai-progress.md` | This mirror spec |
| `design-system/components/ai/ai-progress/ai-progress.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-progress/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-progress/ai-progress.preview.html` | Visual proof of every documented state |

## When to use

- Multi-step agent workstreams
- Anywhere work can stop and need a human
- When the total is known

## When not to use

- Standard determinate progress — use ui:progress
- Unknown-duration model latency — use ai:ai-loading-indicators
- When you would have to invent the percentage

## Anatomy

| Part | Role |
| --- | --- |
| **Label row** | Status label and optional percent |
| **Track** | bg-muted, four heights |
| **Indicator** | Colour carries the status; the aria-valuetext carries the meaning |
| **Step line** | Optional current step description |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Idle** | `status="idle"` | Not started |
| **Running** | `status="running"` | AI accent fill |
| **Indeterminate** | `value omitted` | Pulsing third-width bar; no aria-valuenow |
| **Paused** | `status="paused"` | Muted fill |
| **Complete** | `status="complete"` | Green fill |
| **Blocked** | `status="blocked"` | Signal fill — work stopped and needs input |
| **Error** | `status="error"` | Destructive fill |
| **Escalated** | `status="escalated"` | Signal fill — a person now owns this |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"thin"` | `"md"` | Declared in `trackVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-progress.agent.json`](ai-progress.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `bg-ai-accent` |
| `ai-confidence-high` | `bg-ai-confidence-high` |
| `ai-muted` | `text-ai-muted` |
| `ai-signal` | `bg-ai-signal` |
| `destructive` | `bg-destructive` |
| `foreground` | `text-foreground` |
| `muted` | `bg-muted`, `text-ai-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `progressbar` |

**Required**

- label, or the status default is used

**Notes**

- aria-valuetext carries the status word, so "Blocked" is announced rather than a bare number.
- Indeterminate omits aria-valuenow entirely rather than reporting a made-up value.
- Blocked and escalated are not decorative. Only set them when a human genuinely needs to act.

## Examples

### Blocked run

```tsx
<AIProgress
  value={62}
  status="blocked"
  label="Territory rebalance"
  currentStep="Step 3 of 5 — waiting on approval"
  percentLabel
/>
```

## Agent rules

1. Omit value rather than inventing a percentage.
2. Blocked and escalated must reflect real conditions.
3. Pair blocked with an ai:ai-control-bar or an ai:ai-action so the user can resolve it.
4. Announce completion separately — the bar reaching 100% is not itself announced.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Fabricated percentages
- Blocked or escalated used decoratively
- Use for generic loading

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- The segmented and header variants from the source design system are not implemented. Linear only.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:progress` | Standard progress |
| `ai:ai-loading-indicators` | Unknown duration |
| `ai:ai-control-bar` | Resolving a blocked run |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-progress.agent.json`](ai-progress.agent.json) → this file → [`src/components/ai/ai-progress.tsx`](../../../../src/components/ai/ai-progress.tsx)
