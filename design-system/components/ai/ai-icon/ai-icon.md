# AIIcon

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-icon`  
**Category:** AI  
**Status:** Beta  
**Import:** `@/components/ai/ai-icon`  

## Purpose

A treatment layer over standard icons — not a new icon set.

Wraps any icon component with sizing, colour treatment, semantic tone, an optional container and motion. Governed by the 60-30-10 rule.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-icon.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-icon/ai-icon.md` | This mirror spec |
| `design-system/components/ai/ai-icon/ai-icon.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-icon/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-icon/ai-icon.preview.html` | Visual proof of every documented state |

## When to use

- Applying AI identity colour to a standard icon
- Semantic tones for agentic states
- Motion on an icon that reflects real activity

## When not to use

- As a source of new icons — pass in an existing one
- Applying treatment="ai" broadly; if every icon is an AI icon, none is
- Motion that does not track real work

## Anatomy

| Part | Role |
| --- | --- |
| **Wrapper** | Carries sizing, colour, container and motion |
| **Icon** | The component you pass in |

## Variants

| Variant | When to use it |
| --- | --- |
| `neutral` | About 60% of icons on an AI surface. The default. |
| `ai` | About 10%. The identity colour. Scarce by design. |
| `ai-contained` | A rounded container for prominent AI identity. |
| `semantic` | About 30%. Use with tone for state. |
| `orange-signal` | Review and escalation only. |

## Sizes

| Size | Guidance |
| --- | --- |
| `xs` | 12px. Inline metadata. |
| `sm` | 16px. Most contexts. |
| `md` | 20px. The standard AI icon. |
| `lg` | 24px. Prominent identity. |
| `xl` | 32px. Hero and empty states only. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Decorative** | `decorative` | aria-hidden. Correct when adjacent text carries the meaning. |
| **Labelled** | `label` | role="img" with an accessible name |
| **Spinning** | `motion="spin"` | Respects reduced motion |
| **Pulsing** | `motion="pulse"` | Respects reduced motion |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` | `"md"` | Declared in `aiIconVariants` |
| `treatment` | `"neutral"` \| `"ai"` \| `"ai-contained"` \| `"semantic"` \| `"orange-signal"` | `"neutral"` | Declared in `aiIconVariants` |
| `tone` | `"default"` \| `"success"` \| `"warning"` \| `"error"` \| `"blocked"` \| `"escalated"` | `"default"` | Declared in `aiIconVariants` |
| `container` | `"true"` \| `"false"` | — | Declared in `aiIconVariants` |
| `motion` | `"none"` \| `"spin"` \| `"pulse"` | `"none"` | Declared in `aiIconVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-icon.agent.json`](ai-icon.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `text-ai-accent` |
| `ai-confidence-high` | `text-ai-confidence-high` |
| `ai-signal` | `text-ai-signal` |
| `ai-surface` | `bg-ai-surface` |
| `destructive` | `text-destructive` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `img or none` |

**Required**

- Either label or decorative — one of the two, always

**Notes**

- Setting neither logs a development warning. An icon with meaning and no name is invisible.
- All motion carries motion-reduce:animate-none.
- Motion must reflect real activity. A permanently spinning icon is noise that trains users to ignore it.

## Examples

### Semantic state

```tsx
<AIIcon icon={ShieldAlert} treatment="semantic" tone="escalated" label="Escalated to a person" />
```

## Agent rules

1. Set either label or decorative on every instance.
2. Follow 60-30-10 — treatment="ai" is scarce.
3. Motion must track real work.
4. Reserve orange-signal for review and escalation.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Neither labelled nor decorative
- Decorative motion
- Overusing the AI treatment

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- The handoff-trail, completion-settle, nudge, shimmer and alert-ring motions from the source system are not implemented. Only spin and pulse.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-avatar` | Agent identity, not iconography |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-icon.agent.json`](ai-icon.agent.json) → this file → [`src/components/ai/ai-icon.tsx`](../../../../src/components/ai/ai-icon.tsx)
