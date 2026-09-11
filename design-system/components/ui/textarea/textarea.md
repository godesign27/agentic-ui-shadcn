# Textarea

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:textarea`  
**Category:** Forms  
**Status:** Stable  
**Import:** `@/components/ui/textarea`  

## Purpose

Multi-line text where the length is genuinely open-ended.

A styled native textarea with a min-height of 80px. Does not auto-grow.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/textarea.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/textarea/textarea.md` | This mirror spec |
| `design-system/components/ui/textarea/textarea.agent.json` | Structured agent contract |
| `design-system/components/ui/textarea/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/textarea/textarea.preview.html` | Visual proof of every documented state |

## When to use

- Comments, descriptions, notes, messages — anything where the user may reasonably write a paragraph

## When not to use

- Single-line values, even long ones — use ui:input
- Rich text — this component has no formatting affordances
- Code entry where monospace and tab handling matter

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The native textarea element |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | min-h-[80px], resizable by the browser default |
| **Focus-visible** | `Focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled prop` | cursor-not-allowed, opacity-50 |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`textarea.agent.json`](textarea.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `input` | `border-input` |
| `muted` | `text-muted` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `textbox` |

**Keyboard**

- Standard text editing
- Tab moves focus out rather than inserting a tab

**Required**

- An associated label
- aria-describedby for character limits or helper text

**Notes**

- If you impose a character limit, announce the remaining count in a polite live region, not only visually.

## Examples

### Labelled textarea

```tsx
<div className="space-y-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea id="notes" rows={5} />
</div>
```

## Agent rules

1. Always pair with ui:label.
2. Does not auto-grow — set rows or a min-height class if the default is wrong.
3. Announce character limits in a live region.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Placeholder as the only label
- A hard character limit with no visible or announced counter

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:input` | Single-line |
| `ui:form` | Validation |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`textarea.agent.json`](textarea.agent.json) → this file → [`src/components/ui/textarea.tsx`](../../../../src/components/ui/textarea.tsx)
