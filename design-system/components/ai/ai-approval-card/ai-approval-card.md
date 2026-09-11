# AIApprovalCard

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** groups  
**Component id:** `ai:ai-approval-card`  
**Category:** AI  
**Status:** Beta  
**Import:** `@/components/ai/ai-approval-card`  
**Depends on:** `ai:ai-soft-surface`, `ai:ai-message-header`, `ai:ai-message-body`, `ai:ai-action`, `ai:ai-confidence-risk-badge`, `ai:ai-why-this-link`  

## Purpose

A consequential proposal, and the human decision about it, in an order that cannot be got wrong.

patterns/ai-approval-flow.json as a component. Attribution, then the proposal, then confidence, then rationale, then the actions — and only then.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · AI Led |
| AI behavior | Confirm · Apply · Approve |
| Accountability | Attribution · Rationale disclosure · Confidence signalling · Approval · Audit trail · Reversibility |
| Human gesture required | Yes — no state may change without one |
| Reversible | conditional |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-approval-card.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-approval-card/ai-approval-card.md` | This mirror spec |
| `design-system/components/ai/ai-approval-card/ai-approval-card.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-approval-card/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-approval-card/ai-approval-card.preview.html` | Visual proof of every documented state |

## When to use

- Any AI proposal a human must approve
- Agent-initiated changes to shared or outward-facing state
- Anywhere an agent needs authority it does not have

## When not to use

- Informational responses — use ai:ai-response
- Trivial reversible actions, where the ceremony is friction for nothing
- Destructive operations on their own; pair with ui:alert-dialog for the final confirmation

## Anatomy

| Part | Role |
| --- | --- |
| **Surface** | ai:ai-soft-surface, tone mixed when review is required |
| **Header** | ai:ai-message-header — who proposes this |
| **Proposal** | What the agent wants to do, stated plainly |
| **Confidence** | ai:ai-confidence-risk-badge. Omit entirely when unknown. |
| **Rationale** | ai:ai-why-this-link. Omit when there is nothing behind it. |
| **Actions** | ai:ai-action. Last in reading order, deliberately. |
| **Error** | role="alert" message beneath, when status is error |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Proposed** | `status="default"` | Awaiting the human |
| **Requires review** | `requiresReview` | Mixed surface tone and the review signal above the actions |
| **Applying** | `status="loading"` | Primary spins; alternatives disable |
| **Applied** | `status="complete"` | Primary shows a check |
| **Blocked** | `status="disabled"` | Required information not yet present |
| **Failed** | `status="error"` | Destructive primary plus an announced errorMessage |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-approval-card.agent.json`](ai-approval-card.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `destructive` | `text-destructive` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region` |
| Live region | errorMessage is role="alert" |

**Keyboard**

- Tab reaches rationale, then the actions

**Required**

- agentLabel
- proposal
- primaryLabel

**Notes**

- The order is the accessibility property. A user who tabs straight to the primary button has still passed the confidence badge and the rationale link in reading order.
- The region is labelled "Approval requested by {agentLabel}".
- There is no autoApply prop, and adding one would violate AI_RULE_NO_SILENT_APPLY. Nothing fires without a human gesture.
- Omitting confidence is correct when the model produced none. The component renders no badge rather than a default.

## Examples

### Territory change

```tsx
<AIApprovalCard
  agentLabel="Planning agent"
  proposal="Move 14 accounts from the West region to Central to balance quota coverage."
  confidence="medium"
  risk="high"
  requiresReview
  onWhyThis={openRationale}
  primaryLabel="Approve territory change"
  secondaryLabel="Edit first"
  tertiaryLabel="Dismiss"
  onPrimary={approve}
/>
```

## Agent rules

1. Never auto-fire. There is no prop for it, and there must not be.
2. Omit confidence when the model produced none — never pass a guess.
3. Wire onWhyThis to real reasoning, or omit it.
4. Set requiresReview for anything consequential.
5. On failure, always supply errorMessage saying what to do next.
6. Pair with ui:alert-dialog when the approved action is also destructive.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Auto-applying on mount
- Invented confidence values
- A rationale link with nothing behind it
- An error state with no explanation
- Use for informational responses

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-response` | Informational turns |
| `ai:ai-action` | The decision row alone |
| `ui:alert-dialog` | Final confirmation for destructive actions |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-approval-card.agent.json`](ai-approval-card.agent.json) → this file → [`src/components/ai/ai-approval-card.tsx`](../../../../src/components/ai/ai-approval-card.tsx)
