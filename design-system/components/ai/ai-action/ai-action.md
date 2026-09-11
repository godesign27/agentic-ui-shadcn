# AIAction

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-action`  
**Category:** AI  
**Status:** Beta  
**Import:** `@/components/ai/ai-action`  
**Depends on:** `ai:ai-button`  

## Purpose

The decision point at the end of every AI recommendation. Primary confirms, secondary reviews, tertiary dismisses.

The compact action row closing an AI recommendation, assignment, approval or next-best-action. At most three choices, an optional review signal, and loading, complete, disabled and error states.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Confirm · Apply · Approve |
| Accountability | Attribution · Approval · Audit trail · Rationale disclosure |
| Human gesture required | Yes — no state may change without one |
| Reversible | conditional |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-action.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-action/ai-action.md` | This mirror spec |
| `design-system/components/ai/ai-action/ai-action.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-action/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-action/ai-action.preview.html` | Visual proof of every documented state |

## When to use

- At the end of an AI recommendation or approval card
- After a generated draft — use draft, edit draft, regenerate
- When an agent needs a human to confirm before it proceeds
- In AI Assisted panels where the human stays in control

## When not to use

- Standard product actions that are not AI-generated
- As a generic button group
- With more than three visible actions
- When no decision is actually being requested

## Anatomy

| Part | Role |
| --- | --- |
| **Review signal** | The signal-coloured pill. Renders above the row so it is read before the buttons. |
| **Primary** | Gradient. The recommended next step. |
| **Secondary** | Outlined. Review, edit, an alternative. Optional. |
| **Tertiary** | Ghost. Dismiss or skip. Optional. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `status="default"` | All actions live |
| **Loading** | `status="loading"` | Primary shows a spinner; secondary and tertiary disable so the decision cannot change mid-flight |
| **Complete** | `status="complete"` | Primary shows a check |
| **Disabled** | `status="disabled"` | All actions inert — required information is not yet present |
| **Error** | `status="error"` | Primary renders destructive. The failure reason belongs adjacent. |
| **Requires review** | `requiresReview` | Signal pill renders above the row, before the buttons in DOM order |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `layout` | `"inline"` \| `"stacked"` | `"inline"` | Declared in `aiActionVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-action.agent.json`](ai-action.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-signal` | `bg-ai-signal`, `border-ai-signal`, `text-ai-signal` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `group` |
| Live region | The review pill is role="status" — a standing condition, not an interruption. |

**Keyboard**

- Tab between actions
- Enter or Space to activate

**Required**

- A verb label on every action

**Notes**

- The review signal precedes the buttons in DOM order, so a screen-reader user meets the warning before the action.
- Nothing here fires on mount. A human gesture is required — auto-applying is a critical violation.
- Secondary and tertiary disable during loading so the user cannot change the decision while it is executing.

## Examples

### Recommendation

```tsx
<AIAction
  primaryLabel="Apply recommendation"
  secondaryLabel="Review details"
  tertiaryLabel="Dismiss"
  onPrimary={apply}
/>
```

### Approval with review

```tsx
<AIAction
  primaryLabel="Approve territory change"
  secondaryLabel="Edit first"
  requiresReview
  size="lg"
  onPrimary={approve}
/>
```

## Agent rules

1. Never auto-fire. A human gesture is always required.
2. Three visible actions maximum. A fourth belongs in an overflow menu.
3. When requiresReview is set, the signal must render before the row — do not reorder it.
4. Label with verbs naming the outcome: "Approve territory change", not "OK".
5. Pair with ai:ai-confidence-risk-badge and ai:ai-why-this-link so the user can judge before deciding.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Standard product actions that are not AI-generated
- A generic button replacement
- More than three visible actions
- Rendering when no decision is being requested
- Auto-applying on mount

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-button` | The individual button |
| `ai:ai-confidence-risk-badge` | Show certainty before asking for a decision |
| `ai:ai-why-this-link` | Show reasoning before asking for a decision |
| `ui:alert-dialog` | Destructive confirmations still need one |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-action.agent.json`](ai-action.agent.json) → this file → [`src/components/ai/ai-action.tsx`](../../../../src/components/ai/ai-action.tsx)
