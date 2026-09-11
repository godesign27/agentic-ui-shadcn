# AIConfidenceRiskBadge

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-confidence-risk-badge`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-confidence-risk-badge`  

## Purpose

State how sure the model is and how much is at stake, before the human decides.

A labelled confidence level with an optional risk level, plus stale-data and missing-source indicators. The bar is decorative; the text is the value.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution · Confidence signalling · Rationale disclosure |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-confidence-risk-badge.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.md` | This mirror spec |
| `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-confidence-risk-badge/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.preview.html` | Visual proof of every documented state |

## When to use

- Beside any AI output a human will act on
- In an approval flow, before ai:ai-action
- Wherever the cost of the model being wrong is non-trivial

## When not to use

- When the model did not produce a confidence value — omit it rather than inventing one
- On trivial output where the badge is noise
- As a generic status badge — use ui:badge

## Anatomy

| Part | Role |
| --- | --- |
| **Confidence bar** | Decorative fill at 90 / 55 / 20 percent. aria-hidden. |
| **Confidence label** | The accessible value: "High confidence" |
| **Risk label** | Optional. Low, medium or high. |
| **Stale chip** | Signal-coloured. The underlying data may be out of date. |
| **Missing source chip** | Destructive. The claim has no citation. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **High** | `confidence="high"` | Green, bar at 90% |
| **Medium** | `confidence="medium"` | Amber, bar at 55% |
| **Low** | `confidence="low"` | Red, bar at 20% |
| **Stale data** | `staleData` | Clock chip appended |
| **Missing source** | `missingSource` | Info chip appended |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-confidence-risk-badge.agent.json`](ai-confidence-risk-badge.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-confidence-high` | `bg-ai-confidence-high`, `text-ai-confidence-high` |
| `ai-confidence-low` | `bg-ai-confidence-low`, `text-ai-confidence-low` |
| `ai-confidence-medium` | `bg-ai-confidence-medium`, `text-ai-confidence-medium` |
| `ai-signal` | `bg-ai-signal`, `border-ai-signal`, `text-ai-signal` |
| `border` | `border-border` |
| `card` | `bg-card` |
| `destructive` | `border-destructive`, `text-destructive` |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Notes**

- The bar is aria-hidden. Every level has a text label, so confidence is never colour-only.
- The three confidence colours are green, amber and red — do not rely on them alone for users who cannot distinguish them. The labels are the contract.

## Examples

### Before a decision

```tsx
<AIConfidenceRiskBadge confidence="medium" risk="high" staleData />
<AIAction primaryLabel="Approve" secondaryLabel="Review" requiresReview />
```

## Agent rules

1. Never render a confidence value the model did not produce. Absent means absent, not high.
2. Never map a model probability onto a level without documenting the thresholds.
3. Show it before the decision, not after.
4. missingSource is a claim about the output, not a UI state — only set it when true.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Invented confidence values
- Colour without the text label
- Use as a generic status badge

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-why-this-link` | The reasoning behind the number |
| `ai:ai-action` | The decision it informs |
| `ui:badge` | Generic status |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-confidence-risk-badge.agent.json`](ai-confidence-risk-badge.agent.json) → this file → [`src/components/ai/ai-confidence-risk-badge.tsx`](../../../../src/components/ai/ai-confidence-risk-badge.tsx)
