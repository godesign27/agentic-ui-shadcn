# AILauncher

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-launcher`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-launcher`  
**Depends on:** `ai:ai-avatar`  

## Purpose

The way in. Recognisable, confident, never instructional.

The assistant entry point. A pill with the bot mark and a label, or the mark alone. Carries active, unread, loading and disabled states.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | Yes — no state may change without one |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-launcher.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-launcher/ai-launcher.md` | This mirror spec |
| `design-system/components/ai/ai-launcher/ai-launcher.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-launcher/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-launcher/ai-launcher.preview.html` | Visual proof of every documented state |

## When to use

- The persistent entry point to an assistant
- In an app header or as a floating action
- Anywhere the user should be able to reach the agent

## When not to use

- More than once per surface
- As a generic button
- Without a disabledReason when AI is unavailable

## Anatomy

| Part | Role |
| --- | --- |
| **Mark** | BotAvatar at 22px, or a spinner while the drawer mounts |
| **Label** | Hidden in avatar-only mode, where aria-label takes over |
| **Unread badge** | Signal-coloured, with an accessible count |

## Variants

| Variant | When to use it |
| --- | --- |
| `avatar-chat` | The default. Pill with a label — more discoverable. |
| `avatar-only` | Circle. For dense headers, where space is genuinely tight. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Card background, AI border |
| **Active** | `active` | AI surface with an accent border; aria-expanded is true |
| **Unread** | `unread` | Signal badge with a labelled count |
| **Loading** | `loading` | Spinner replaces the mark while the drawer mounts |
| **Disabled** | `disabled` | Reduced opacity. disabledReason becomes the title and the accessible name. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"avatar-chat" \| "avatar-only"` | — | Declared in the component source. |
| `label` | `string` | — | Declared in the component source. |
| `active` | `boolean` | — | Declared in the component source. |
| `unread` | `boolean` | — | Declared in the component source. |
| `unreadCount` | `number` | — | Declared in the component source. |
| `loading` | `boolean` | — | Declared in the component source. |
| `disabledReason` | `string` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-launcher.agent.json`](ai-launcher.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `border-ai-accent`, `ring-ai-accent`, `text-ai-accent` |
| `ai-signal` | `bg-ai-signal` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |
| `card` | `bg-card` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter or Space — open

**Required**

- aria-label in avatar-only mode — supplied by the component
- disabledReason when disabled

**Notes**

- aria-expanded reflects whether the assistant is open, so the control is announced as a disclosure.
- The unread badge carries an accessible label with the count — a bare number means nothing out of context.
- When AI is unavailable, disabledReason explains why. A dead button teaches nothing.

## Examples

### Header launcher

```tsx
<AILauncher active={open} unread unreadCount={2} onClick={() => setOpen(!open)} />
```

## Agent rules

1. One per surface.
2. Always give disabledReason when disabling.
3. Keep the label plain — "Chat", not "Ask me anything!"
4. Wire aria-expanded to the real drawer state.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Multiple launchers on one surface
- Disabled with no reason
- Instructional or chatty labels

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:sheet` | The drawer it usually opens |
| `ai:ai-avatar` | The mark it uses |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-launcher.agent.json`](ai-launcher.agent.json) → this file → [`src/components/ai/ai-launcher.tsx`](../../../../src/components/ai/ai-launcher.tsx)
