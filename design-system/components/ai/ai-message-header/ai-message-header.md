# AIMessageHeader

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-message-header`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-message-header`  
**Depends on:** `ai:ai-avatar`  

## Purpose

Establish who is speaking before the user reads a word.

Agent avatar, agent name and timestamp. Renders before the body, never after.

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
| `src/components/ai/ai-message-header.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-message-header/ai-message-header.md` | This mirror spec |
| `design-system/components/ai/ai-message-header/ai-message-header.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-message-header/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-message-header/ai-message-header.preview.html` | Visual proof of every documented state |

## When to use

- Above every AI response
- At the top of a generated card or panel
- Anywhere authorship could otherwise be ambiguous

## When not to use

- For human messages — build a separate header with ui:avatar
- After the body
- When ai:ai-soft-surface already carries a labelled region and a second attribution would be redundant

## Anatomy

| Part | Role |
| --- | --- |
| **Avatar** | ai:ai-avatar BotAvatar, aria-hidden because the name is adjacent |
| **Agent label** | The agent name. The accessible attribution. |
| **Timestamp** | Right-aligned. Pass undefined to hide. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `size="md"` | 20px avatar, 14px label |
| **Compact** | `size="sm"` | 16px avatar, 12px label |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `agentLabel` | `string` | **required** | Required. Declared in the component source. |
| `timestamp` | `string` | — | Attribution. Renders before the body, never after. This is the component that satisfies the "Attribution" obligation for a conversational surface. An AI response without it is unattributed output. / export interface AIMessageHeaderProps extends React.HTMLAttributes<HTMLDivElement> { agentLabel: string /** Pass undefined to hide. Use a machine-readable dateTime on the caller side where possible. |
| `size` | `"sm" \| "md"` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-message-header.agent.json`](ai-message-header.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-muted` | `text-ai-muted` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Required**

- agentLabel

**Notes**

- The avatar is aria-hidden because the agent name sits beside it — announcing both would be redundant.
- A relative timestamp like "Just now" goes stale. Prefer a <time dateTime> element supplied by the caller when the exact time matters.

## Examples

### Standard

```tsx
<AIMessageHeader agentLabel="Research agent" timestamp="Just now" />
```

## Agent rules

1. Render before the body, always.
2. Name the agent specifically — "Research agent", not "AI".
3. This is what satisfies the Attribution obligation on a conversational surface.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Rendering after the body
- Use for human messages
- A generic "AI" label where a specific agent name exists

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-message-body` | What follows it |
| `ai:ai-avatar` | The mark it uses |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-message-header.agent.json`](ai-message-header.agent.json) → this file → [`src/components/ai/ai-message-header.tsx`](../../../../src/components/ai/ai-message-header.tsx)
