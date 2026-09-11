# AIChipQuick

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-chip-quick`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-chip-quick`  

## Purpose

Offer a starting point so the user does not face an empty box.

A suggested prompt chip. Tapping one composes a message; it never executes. An optional special variant carries the gradient for an "All prompts" call to action.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | Yes — no state may change without one |
| Reversible | always |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-chip-quick.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-chip-quick/ai-chip-quick.md` | This mirror spec |
| `design-system/components/ai/ai-chip-quick/ai-chip-quick.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-chip-quick/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-chip-quick/ai-chip-quick.preview.html` | Visual proof of every documented state |

## When to use

- Idle state of a composer
- Suggested follow-ups after a response
- Reducing the cost of starting

## When not to use

- For chips that perform an action — that is a different, higher-autonomy component
- More than about five at once
- As a filter chip — use ui:toggle

## Anatomy

| Part | Role |
| --- | --- |
| **Icon** | Optional leading glyph, aria-hidden |
| **Label** | The suggested prompt |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Card background, AI border |
| **Special** | `isSpecial` | Gradient fill. One per group at most. |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ai-accent |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | `React.ComponentType<object>` | — | Declared in the component source. |
| `label` | `string` | **required** | Required. Declared in the component source. |
| `isSpecial` | `boolean` | — | A suggested prompt, offered so the user does not have to start from nothing. Suggest-level only: tapping one composes a message, it never executes. A quick chip that performs an action is a different component. / export interface AIChipQuickProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon?: React.ComponentType<{ className?: string }> label: string /** The "All prompts" call to action. One per group at most. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-chip-quick.agent.json`](ai-chip-quick.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `from-ai-accent`, `ring-ai-accent`, `text-ai-accent`, `to-ai-accent` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |
| `card` | `bg-card` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter or Space — compose the prompt

**Required**

- label

**Notes**

- Composing rather than executing is the whole safety property: the user still sees and sends the message.
- The icon is decorative; the label carries the meaning.

## Examples

### Idle suggestions

```tsx
<AIChipQuick icon={Search} label="Find at-risk accounts" onClick={() => compose("Find at-risk accounts")} />
```

## Agent rules

1. Compose, never execute.
2. Five chips maximum.
3. One isSpecial chip per group.
4. Write labels as the user would phrase the request.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Executing on click
- More than five chips
- Use as filter chips

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toggle` | Filter chips |
| `ai:ai-dialog-button` | Composer toolbar controls |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-chip-quick.agent.json`](ai-chip-quick.agent.json) → this file → [`src/components/ai/ai-chip-quick.tsx`](../../../../src/components/ai/ai-chip-quick.tsx)
