# AILoadingIndicator

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-loading-indicators`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-loading-indicators`  

## Purpose

Say that the machine is working, truthfully.

Thinking, working and retrieving indicators. Each announces its status as text through a polite live region; animation is never the only signal.

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
| `src/components/ai/ai-loading-indicators.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.md` | This mirror spec |
| `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-loading-indicators/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.preview.html` | Visual proof of every documented state |

## When to use

- While a model request is genuinely in flight
- While a tool call or retrieval is running
- Between a user message and the first token of a response

## When not to use

- To simulate effort — a deliberate pause to seem thoughtful is forbidden
- For determinate work with a known total — use ai:ai-progress
- For content loading — use ui:skeleton

## Anatomy

| Part | Role |
| --- | --- |
| **Indicator** | Three pulsing dots for thinking; a spinner for working and retrieving. aria-hidden. |
| **Label** | The accessible status text. This is the real signal. |

## Variants

| Variant | When to use it |
| --- | --- |
| `thinking` | Short model latency. Dots. |
| `working` | A tool call or longer operation. Spinner. |
| `retrieving` | Fetching context or sources. Spinner. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Thinking** | `variant="thinking"` | Three staggered pulsing dots |
| **Working** | `variant="working"` | Spinner with "Working" |
| **Retrieving** | `variant="retrieving"` | Spinner with "Getting information" |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `LoaderVariant` | — | Declared in the component source. |
| `label` | `string` | — | Declared in the component source. |
| `size` | `"sm" \| "md"` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-loading-indicators.agent.json`](ai-loading-indicators.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `bg-ai-accent` |
| `ai-muted` | `text-ai-muted` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `status` |
| Live region | role="status" with aria-live="polite" |

**Notes**

- The label is the accessible signal. Animation is decorative and aria-hidden.
- All animation carries motion-reduce:animate-none, so the text still communicates under reduced motion.
- Unmount it when the work finishes and announce the result — a live region that simply disappears says nothing.

## Examples

### While streaming

```tsx
{isThinking && <AILoadingIndicator variant="thinking" />}
```

## Agent rules

1. Must track real in-flight work. Never animate to simulate effort.
2. Announce the outcome when it unmounts.
3. Use ai:ai-progress when the total is known.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Simulated thinking time
- Animation with no status text
- Use for content loading

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-progress` | Determinate agentic work |
| `ui:skeleton` | Content loading |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-loading-indicators.agent.json`](ai-loading-indicators.agent.json) → this file → [`src/components/ai/ai-loading-indicators.tsx`](../../../../src/components/ai/ai-loading-indicators.tsx)
