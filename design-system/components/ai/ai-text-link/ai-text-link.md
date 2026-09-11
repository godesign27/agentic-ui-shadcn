# AITextLink

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-text-link`  
**Category:** AI  
**Status:** Beta  
**Import:** `@/components/ai/ai-text-link`  

## Purpose

An inline link inside AI prose whose label stands on its own.

An explainability link with six variants and three tones. Renders an anchor when href is given and a button otherwise, so disclosure actions are announced correctly.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution · Rationale disclosure |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-text-link.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-text-link/ai-text-link.md` | This mirror spec |
| `design-system/components/ai/ai-text-link/ai-text-link.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-text-link/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-text-link/ai-text-link.preview.html` | Visual proof of every documented state |

## When to use

- Citations and source links inside AI prose
- Inline disclosure triggers
- Opening an audit record in a new tab

## When not to use

- The standard rationale entry — use ai:ai-why-this-link, which has the right defaults
- General product links — use a plain anchor
- Disabled without a reason

## Anatomy

| Part | Role |
| --- | --- |
| **Leading icon** | Optional, aria-hidden. Replaced by a spinner while loading. |
| **Label** | Must make the purpose clear without the icon |
| **Chevron** | For disclosure variants; rotates when expanded |
| **External mark** | With an sr-only "opens in a new tab" |

## Variants

| Variant | When to use it |
| --- | --- |
| `text` | Label alone. |
| `icon-leading` | Icon plus label. The common case. |
| `chevron` | Label plus chevron — expands inline content. |
| `icon-chevron` | Full anatomy for a disclosure trigger. |
| `external` | Opens a source record in a new tab. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Tone colour, underline on hover |
| **Expanded** | `expanded` | Chevron rotated; aria-expanded set |
| **Loading** | `loading` | Spinner replaces the leading icon |
| **Disabled** | `disabled` | Muted and inert. disabledReason becomes the title and accessible name. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | **required** | Required. Declared in the component source. |
| `icon` | `React.ComponentType< >` | — | Declared in the component source. |
| `variant` | `AITextLinkVariant` | — | Declared in the component source. |
| `tone` | `AITextLinkTone` | — | Declared in the component source. |
| `size` | `"sm" \| "md"` | — | Declared in the component source. |
| `expanded` | `boolean` | — | Declared in the component source. |
| `loading` | `boolean` | — | Declared in the component source. |
| `disabled` | `boolean` | — | Declared in the component source. |
| `disabledReason` | `string` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-text-link.agent.json`](ai-text-link.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `ring-ai-accent`, `text-ai-accent` |
| `ai-signal` | `text-ai-signal` |
| `foreground` | `text-foreground` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `link or button` |

**Keyboard**

- Enter — activate
- Space — activate when rendered as a button

**Required**

- label
- disabledReason when disabled

**Notes**

- No href means it renders a button, because a disclosure action is not navigation. This is what makes Space work and keeps it out of the link list.
- External links carry rel="noreferrer noopener" and an sr-only "opens in a new tab".
- Disabling without disabledReason logs a development warning — removing an affordance without explaining why is a dead end.
- The attention tone is reserved for escalation, approval and staleness. Do not use it for emphasis.

## Examples

### Source citation

```tsx
<AITextLink variant="external" label="Q3 pipeline report" href="/reports/q3" />
```

## Agent rules

1. The label must stand alone — an icon is never the only signal of purpose.
2. Always pair disabled with disabledReason.
3. Reserve the attention tone for escalation, approval and staleness.
4. Use ai:ai-why-this-link for the standard rationale entry.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Icon-only meaning
- Disabled with no reason
- Attention tone for emphasis

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-why-this-link` | The standard rationale entry |
| `ui:button` | variant="link" for standard links |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-text-link.agent.json`](ai-text-link.agent.json) → this file → [`src/components/ai/ai-text-link.tsx`](../../../../src/components/ai/ai-text-link.tsx)
