# AIFeedbackBar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-feedback-bar`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-feedback-bar`  

## Purpose

Let the human correct the record.

Like, dislike, copy and optional share. Every control is icon-only and therefore carries an accessible name.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-feedback-bar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.md` | This mirror spec |
| `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-feedback-bar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.preview.html` | Visual proof of every documented state |

## When to use

- After every substantive AI response
- Wherever sentiment would improve future output

## When not to use

- When the feedback goes nowhere — a bar that discards input is a lie about listening
- On trivial responses
- More than once per response

## Anatomy

| Part | Role |
| --- | --- |
| **Thumbs up** | aria-pressed reflects the current sentiment |
| **Thumbs down** | aria-pressed reflects the current sentiment |
| **Copy** | Swaps to a check for 1.5s and announces via a status region |
| **Share** | Rendered only when onShare is supplied |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Neutral** | `sentiment={null}` | Both thumbs muted |
| **Positive** | `sentiment="up"` | Thumbs up in the AI accent, aria-pressed |
| **Negative** | `sentiment="down"` | Thumbs down in destructive, aria-pressed |
| **Copied** | `After copy` | Check icon and a status announcement for 1.5s |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-feedback-bar.agent.json`](ai-feedback-bar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `ring-ai-accent`, `text-ai-accent` |
| `ai-accent` | `ring-ai-accent`, `text-ai-accent` |
| `ai-muted` | `text-ai-muted` |
| `border` | `border-border` |
| `destructive` | `text-destructive` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Keyboard**

- Tab between controls
- Enter or Space to activate

**Required**

- aria-label on every control — supplied by the component

**Notes**

- Thumbs use aria-pressed so the current sentiment is announced, not just shown.
- The copy confirmation goes through a role="status" region — the icon swap alone is invisible to screen readers.

## Examples

### After a response

```tsx
<AIFeedbackBar sentiment={sentiment} onSentiment={record} onCopy={copy} />
```

## Agent rules

1. Wire the handlers to something real.
2. One bar per response.
3. Reflect the stored sentiment through the sentiment prop so it survives a re-render.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Feedback that is discarded
- Multiple bars per response
- Removing the accessible names

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-message-footer` | Actions rather than sentiment |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-feedback-bar.agent.json`](ai-feedback-bar.agent.json) → this file → [`src/components/ai/ai-feedback-bar.tsx`](../../../../src/components/ai/ai-feedback-bar.tsx)
