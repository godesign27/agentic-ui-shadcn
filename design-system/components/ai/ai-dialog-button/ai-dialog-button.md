# AIDialogButton

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-dialog-button`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-dialog-button`  

## Purpose

A quiet control in the composer toolbar that does not compete with the message.

A ghost toolbar button in three shapes: icon-only (a 34px circle), icon plus label, or label plus a trailing chevron for dropdowns.

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
| `src/components/ai/ai-dialog-button.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-dialog-button/ai-dialog-button.md` | This mirror spec |
| `design-system/components/ai/ai-dialog-button/ai-dialog-button.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-dialog-button/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-dialog-button/ai-dialog-button.preview.html` | Visual proof of every documented state |

## When to use

- Composer toolbar controls — attach, skills, agent mode, microphone
- Any low-emphasis control beside an input

## When not to use

- Primary actions — use ai:ai-button
- Outside a composer context
- Icon-only without an accessible name

## Anatomy

| Part | Role |
| --- | --- |
| **Icon** | Leading glyph. Sole content makes it a 34px circle. |
| **Label** | 13px medium |
| **Trailing icon** | Usually a chevron. Its presence adds aria-expanded. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Transparent |
| **Hover** | `Pointer over` | bg-accent |
| **Open** | `isOpen` | bg-accent held; aria-expanded true when a trailing icon is present |
| **Disabled** | `disabled` | opacity 0.42 |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-dialog-button.agent.json`](ai-dialog-button.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `ring-ai-accent` |
| `ai-accent` | `ring-ai-accent` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter or Space — activate

**Required**

- aria-label when icon-only

**Notes**

- Icon-only with no aria-label logs a development warning — it has no accessible name at all.
- aria-expanded is set only when a trailing icon is present, since that is what signals a dropdown.
- At 34px it is under the 44px touch guideline. Give the toolbar padding on touch surfaces.

## Examples

### Toolbar control

```tsx
<AIDialogButton icon={<Paperclip />} aria-label="Attach a file" onClick={attach} />
```

## Agent rules

1. Icon-only requires aria-label.
2. Set isOpen when it owns an open menu.
3. Use ai:ai-button for anything primary.
4. Pair icon-only controls with ui:tooltip.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Icon-only with no accessible name
- Primary actions
- Use outside a composer

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-button` | Primary AI actions |
| `ui:tooltip` | Naming icon-only controls |
| `ui:dropdown-menu` | What a trailing chevron opens |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-dialog-button.agent.json`](ai-dialog-button.agent.json) → this file → [`src/components/ai/ai-dialog-button.tsx`](../../../../src/components/ai/ai-dialog-button.tsx)
