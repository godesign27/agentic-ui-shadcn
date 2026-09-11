# AIWhyThisLink

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-why-this-link`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-why-this-link`  

## Purpose

Make the reasoning reachable in one interaction.

The rationale disclosure entry point. Five variants — why this, view rationale, view sources, view assumptions, explain risk — each with its own icon and default label.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Rationale disclosure · Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-why-this-link.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-why-this-link/ai-why-this-link.md` | This mirror spec |
| `design-system/components/ai/ai-why-this-link/ai-why-this-link.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-why-this-link/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-why-this-link/ai-why-this-link.preview.html` | Visual proof of every documented state |

## When to use

- Beside any AI output the user may question
- In an approval flow, so reasoning precedes the decision
- Wherever a citation or assumption underlies a claim

## When not to use

- When there is no rationale to show — an unwired link promises transparency and does not deliver
- As a general help link — use ui:button variant="link"
- Where the explanation should simply be visible instead

## Anatomy

| Part | Role |
| --- | --- |
| **Icon** | Variant-specific, aria-hidden |
| **Label** | The accessible name. Overridable. |

## Variants

| Variant | When to use it |
| --- | --- |
| `why-this` | Generic rationale entry. |
| `view-rationale` | Opens the full reasoning panel. |
| `view-sources` | Opens the citation list. |
| `view-assumptions` | Shows what the model assumed. |
| `explain-risk` | Opens risk context. Pair with a high-risk badge. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | AI accent, underline on hover |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ai-accent |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-why-this-link.agent.json`](ai-why-this-link.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `ring-ai-accent`, `text-ai-accent` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter or Space — activate

**Required**

- A label — the default is used when none is given

**Notes**

- Renders a button, not a link: it discloses in place rather than navigating.
- If it opens a panel, that panel must receive focus — otherwise a keyboard user activates it and nothing appears to happen.

## Examples

### Rationale entry

```tsx
<AIWhyThisLink variant="view-sources" onClick={openSources} />
```

## Agent rules

1. Only render it when real rationale exists behind onClick.
2. Move focus into whatever it opens.
3. Its presence is what satisfies the Rationale disclosure obligation — do not claim that obligation without it.
4. Place it before the decision, not after.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Rendering with no rationale behind it
- Opening a panel without moving focus
- Use as a general help link

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-confidence-risk-badge` | The number it explains |
| `ai:ai-text-link` | General inline AI links |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-why-this-link.agent.json`](ai-why-this-link.agent.json) → this file → [`src/components/ai/ai-why-this-link.tsx`](../../../../src/components/ai/ai-why-this-link.tsx)
