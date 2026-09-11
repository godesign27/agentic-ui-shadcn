# AIButton

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-button`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-button`  

## Purpose

Commit to something a machine proposed.

The AI call to action. Gradient primary, outlined secondary, ghost tertiary. Status is part of the contract: loading, complete and error are visual states the caller drives from real work.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Confirm · Apply |
| Accountability | Attribution · Approval |
| Human gesture required | Yes — no state may change without one |
| Reversible | conditional |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-button.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-button/ai-button.md` | This mirror spec |
| `design-system/components/ai/ai-button/ai-button.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-button/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-button/ai-button.preview.html` | Visual proof of every documented state |

## When to use

- Accepting, applying or regenerating AI output
- Inside ai:ai-action and ai:ai-message-footer
- Any button whose action originates from a machine suggestion

## When not to use

- Standard product actions — use ui:button
- As a decorative gradient button; the gradient means "AI proposed this"
- Where three or more would appear in one row — see AI_RULE_MAX_THREE_ACTIONS

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The button. Disabled automatically while status is loading. |
| **Status icon** | Spinner, check or alert, swapped by status |
| **Label** | A verb naming the outcome |

## Variants

| Variant | When to use it |
| --- | --- |
| `primary` | The gradient. One per action row. |
| `secondary` | Outlined. Review, edit, or an alternative path. |
| `tertiary` | Ghost. Dismiss, skip, cancel. |

## Sizes

| Size | Guidance |
| --- | --- |
| `sm` | 32px. Message footers and dense rows. |
| `md` | 40px. The default. |
| `lg` | 48px. Hero approval surfaces. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `status="default"` | Gradient from --ai-accent to --ai-accent-strong |
| **Loading** | `status="loading"` | Spinner, aria-busy, and the button is disabled so a double-click cannot fire twice |
| **Complete** | `status="complete"` | Check icon on the active fill |
| **Error** | `status="error"` | Destructive fill with an alert icon. Say what failed nearby. |
| **Disabled** | `disabled` | opacity-45, pointer-events-none |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"primary"` \| `"secondary"` \| `"tertiary"` | `"primary"` | Declared in `aiButtonVariants` |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Declared in `aiButtonVariants` |
| `status` | `"default"` \| `"loading"` \| `"complete"` \| `"error"` | `"default"` | Declared in `aiButtonVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-button.agent.json`](ai-button.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `from-ai-accent`, `ring-ai-accent`, `text-accent`, `text-ai-accent`, `to-ai-accent` |
| `ai-accent` | `from-ai-accent`, `ring-ai-accent`, `text-ai-accent`, `to-ai-accent` |
| `ai-muted` | `text-ai-muted` |
| `border` | `border-border` |
| `destructive` | `border-destructive`, `from-destructive`, `text-destructive`, `to-destructive` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter — activate
- Space — activate

**Required**

- label is required — there is no icon-only form

**Notes**

- status="loading" sets aria-busy and disables the button, so the action cannot be double-fired.
- The status icon is aria-hidden; the label must change to carry the meaning ("Applying…", "Applied").
- The error state colours the button but does not explain the failure. Render the reason adjacent.

## Examples

### Apply with status

```tsx
<AIButton
  label={applying ? "Applying…" : "Apply recommendation"}
  status={applying ? "loading" : "default"}
  onClick={apply}
/>
```

## Agent rules

1. Only for actions originating from AI output. Standard actions use ui:button.
2. status must track real work — never animate loading to simulate effort.
3. Change the label with the status; the icon alone is not announced.
4. On error, say what failed and what the user can do next.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Use on standard product actions
- Simulated loading
- Error state with no explanation

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:button` | Standard actions |
| `ai:ai-action` | The full decision row |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-button.agent.json`](ai-button.agent.json) → this file → [`src/components/ai/ai-button.tsx`](../../../../src/components/ai/ai-button.tsx)
