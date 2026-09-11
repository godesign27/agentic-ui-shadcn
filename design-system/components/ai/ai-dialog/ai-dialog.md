# AIDialogSlim

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** groups  
**Component id:** `ai:ai-dialog`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-dialog`  

## Purpose

Where the human writes to the machine.

The composer. AIInputCard is the full card with a toolbar slot; AIDialogSlim is a single-line pill. Enter submits, Shift+Enter inserts a newline.

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
| `src/components/ai/ai-dialog.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-dialog/ai-dialog.md` | This mirror spec |
| `design-system/components/ai/ai-dialog/ai-dialog.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-dialog/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-dialog/ai-dialog.preview.html` | Visual proof of every documented state |

## When to use

- The message entry point of any AI surface
- Full card for a dedicated chat or console view
- Slim pill where vertical space is constrained

## When not to use

- As a general text input — use ui:input or ui:textarea
- More than one per surface
- Without a submit control; the button is never hidden, only disabled

## Anatomy

`AIInputCard` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `AIInputCard` | — | No | Full card. Accepts toolbar and suggestions slots. |
| `AIDialogSlim` | — | No | Single-line pill. No toolbar. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Empty** | `No value` | Submit disabled — nothing to send |
| **Composing** | `Value present` | Submit enabled |
| **Busy** | `busy` | Submit suppressed while a response generates. The control stays visible. |
| **Disabled** | `disabled` | Field and submit both inert |
| **Focused** | `Focus within` | ring-2 ring-ai-accent on the container, not the field |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-dialog.agent.json`](ai-dialog.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `from-ai-accent`, `ring-ai-accent`, `text-ai-accent`, `to-ai-accent` |
| `ai-muted` | `text-ai-muted` |
| `ai-surface` | `border-ai-surface` |
| `card` | `bg-card` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Keyboard**

- Enter — submit
- Shift+Enter — newline
- Tab — reach the toolbar and submit

**Required**

- An accessible label — supplied as sr-only from the label prop
- aria-label on the submit button

**Notes**

- Enter submits and Shift+Enter inserts a newline. Reversing this traps users mid-sentence, so it is not configurable.
- The field carries an sr-only label rather than relying on the placeholder, which disappears on input.
- Focus styling sits on the container via focus-within, so the whole composer reads as one control.
- The submit button is disabled, never hidden — a control that vanishes is harder to find than one that is greyed.
- Both forms are uncontrolled until you pass value; pass value and onValueChange together or neither.

## Examples

### Composer with toolbar

```tsx
<AIInputCard
  onSubmit={send}
  busy={generating}
  toolbar={<AIDialogButton icon={<Paperclip />} aria-label="Attach a file" />}
  suggestions={<AIChipQuick label="Find at-risk accounts" onClick={compose} />}
/>
```

## Agent rules

1. One composer per surface.
2. Never invert Enter and Shift+Enter.
3. Disable submit while busy; do not hide it.
4. Put ai:ai-dialog-button controls in the toolbar slot and ai:ai-chip-quick in suggestions.
5. Composing is not sending — the human still presses submit.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Multiple composers on one surface
- Hiding the submit control
- Inverting the Enter convention
- Use as a general text input

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-dialog-button` | Built for the toolbar slot |
| `ai:ai-chip-quick` | Built for the suggestions slot |
| `ui:textarea` | Non-AI multi-line input |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-dialog.agent.json`](ai-dialog.agent.json) → this file → [`src/components/ai/ai-dialog.tsx`](../../../../src/components/ai/ai-dialog.tsx)
