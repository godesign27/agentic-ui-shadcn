# AIChipMemory

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-chip-memory`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-chip-memory`  

## Purpose

Tell the user when the system is drawing on something it learned earlier.

An inline label for remembered context: using-memory, previous-context, memory-available, memory-ignored, memory-removed.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | Adaptive · AI Assisted |
| AI behavior | Suggest |
| Accountability | Attribution · Rationale disclosure · Audit trail |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-chip-memory.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-chip-memory/ai-chip-memory.md` | This mirror spec |
| `design-system/components/ai/ai-chip-memory/ai-chip-memory.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-chip-memory/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-chip-memory/ai-chip-memory.preview.html` | Visual proof of every documented state |

## When to use

- When a response depends on remembered context
- To show what memory is available but unused
- To confirm that memory was ignored or removed

## When not to use

- When no memory is in play
- As a general tag — use ui:badge
- To imply memory the system does not actually have

## Anatomy

| Part | Role |
| --- | --- |
| **Icon** | Variant glyph, aria-hidden |
| **Prefix** | sr-only — "Using memory:" etc. |
| **Label** | What is remembered |

## Variants

| Variant | When to use it |
| --- | --- |
| `using-memory` | Actively drawing on it now. Signal tint, because the user should notice. |
| `previous-context` | Carried from earlier in the session. Neutral. |
| `memory-available` | Could be used, currently is not. |
| `memory-ignored` | Deliberately not used this time. |
| `memory-removed` | Deleted. Struck through. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Using memory** | `variant="using-memory"` | Signal tint |
| **Previous context** | `variant="previous-context"` | Neutral |
| **Memory available** | `variant="memory-available"` | AI surface |
| **Memory ignored** | `variant="memory-ignored"` | Transparent, muted |
| **Memory removed** | `variant="memory-removed"` | Struck through |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `MemoryVariant` | **required** | Required. Declared in the component source. |
| `label` | `string` | **required** | Required. Declared in the component source. |
| `size` | `"sm" \| "md"` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-chip-memory.agent.json`](ai-chip-memory.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `text-ai-accent` |
| `ai-signal` | `bg-ai-signal`, `border-ai-signal`, `text-ai-signal` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |
| `border` | `border-border` |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Required**

- label

**Notes**

- The sr-only prefix supplies the variant meaning, so the icon and tint are never the only signal.
- memory-removed uses line-through, which is not announced by screen readers — the prefix carries it instead.

## Examples

### Active memory

```tsx
<AIChipMemory variant="using-memory" label="Your Q3 pipeline preferences" />
```

## Agent rules

1. Only render when memory is genuinely involved.
2. Name what is remembered, specifically.
3. Forgetting should be as visible as remembering — do not silently drop the removed and ignored variants.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Implying memory that does not exist
- Generic tagging
- Hiding memory use

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-agent-work-note` | What the agent did with it |
| `ui:badge` | Generic tags |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-chip-memory.agent.json`](ai-chip-memory.agent.json) → this file → [`src/components/ai/ai-chip-memory.tsx`](../../../../src/components/ai/ai-chip-memory.tsx)
