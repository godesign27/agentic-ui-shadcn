# AIMessageFooter

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-message-footer`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-message-footer`  
**Depends on:** `ai:ai-button`  

## Purpose

Where the user says yes to what the response offered.

An action row for a response. Capped at three; a fourth logs a development warning and is not rendered.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Confirm · Apply |
| Accountability | Attribution · Approval |
| Human gesture required | Yes — no state may change without one |
| Reversible | conditional |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-message-footer.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-message-footer/ai-message-footer.md` | This mirror spec |
| `design-system/components/ai/ai-message-footer/ai-message-footer.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-message-footer/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-message-footer/ai-message-footer.preview.html` | Visual proof of every documented state |

## When to use

- When a response affords a concrete action
- Below ai:ai-message-body

## When not to use

- On purely informational responses
- For approval of a consequential change — use ai:ai-action, which carries the review signal
- With more than three actions

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The action row. Renders nothing when actions is empty or visible is false. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Hidden** | `visible={false} or no actions` | Renders null |
| **Visible** | `actions present` | First action defaults to primary, the rest to secondary |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `actions` | `FooterAction[]` | **required** | Required. Declared in the component source. |
| `visible` | `boolean` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-message-footer.agent.json`](ai-message-footer.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Keyboard**

- Tab between actions

**Required**

- A verb label per action

**Notes**

- Actions beyond the third are dropped, with a console warning in development. Do not rely on that truncation — cap it yourself.

## Examples

### Draft actions

```tsx
<AIMessageFooter actions={[
  { label: "Use draft", onClick: use },
  { label: "Edit draft", onClick: edit },
  { label: "Regenerate", variant: "tertiary", onClick: regen },
]} />
```

## Agent rules

1. Three actions maximum.
2. Use ai:ai-action when the decision needs a review signal.
3. Label with verbs.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- More than three actions
- Consequential approval without a review signal

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-action` | Approval decisions |
| `ai:ai-feedback-bar` | Sentiment, not actions |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-message-footer.agent.json`](ai-message-footer.agent.json) → this file → [`src/components/ai/ai-message-footer.tsx`](../../../../src/components/ai/ai-message-footer.tsx)
