# AIResponse

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** groups  
**Component id:** `ai:ai-response`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-response`  
**Depends on:** `ai:ai-soft-surface`, `ai:ai-message-header`, `ai:ai-message-body`, `ai:ai-message-footer`, `ai:ai-feedback-bar`, `ai:ai-loading-indicators`, `ai:ai-agent-work-note`  

## Purpose

One AI turn, assembled so attribution, progress and recourse are present by construction.

patterns/ai-response.json as a component. Renders the required parts in the required order — header, optional work note, body or loading indicator, actions, feedback — so the pattern cannot be composed wrongly.

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
| `src/components/ai/ai-response.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-response/ai-response.md` | This mirror spec |
| `design-system/components/ai/ai-response/ai-response.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-response/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-response/ai-response.preview.html` | Visual proof of every documented state |

## When to use

- Any AI response in a thread or panel
- Whenever you would otherwise hand-assemble header, body and feedback
- Streaming responses, via the streaming prop

## When not to use

- Human messages
- A consequential approval — use ai:ai-approval-card, which carries the confidence and rationale slots
- When you need a different part order; that order is the point

## Anatomy

| Part | Role |
| --- | --- |
| **Surface** | ai:ai-soft-surface as a labelled region. Skipped when bare. |
| **Header** | ai:ai-message-header. Always first. |
| **Work note** | Optional ai:ai-agent-work-note, collapsed |
| **Body or loader** | ai:ai-message-body, or ai:ai-loading-indicators while loading |
| **Footer** | Optional ai:ai-message-footer actions |
| **Feedback** | ai:ai-feedback-bar unless suppressed |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Loading** | `loading` | Announcing loading indicator replaces the body; actions and feedback withheld until there is something to act on |
| **Streaming** | `streaming` | Body becomes a polite live region |
| **Complete** | `Neither` | Body, actions and feedback all present |
| **Bare** | `bare` | No surface wash — for a thread already marked as AI |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `agentLabel` | `string` | **required** | Required. Declared in the component source. |
| `timestamp` | `string` | — | Declared in the component source. |
| `loading` | `boolean` | — | One AI turn, assembled so that authorship, progress and recourse are all present by construction. This is design-system/patterns/ai-response.json as a component: it renders the required parts in the required order, so the pattern cannot be composed wrongly. The header always precedes the body; the loading indicator announces; feedback is available unless explicitly suppressed. / export interface AIResponseProps extends React.HTMLAttributes<HTMLDivElement> { agentLabel: string timestamp?: string /** While true, the loading indicator replaces the body and announces politely. |
| `loadingVariant` | `"thinking" \| "working" \| "retrieving"` | — | Declared in the component source. |
| `streaming` | `boolean` | — | One AI turn, assembled so that authorship, progress and recourse are all present by construction. This is design-system/patterns/ai-response.json as a component: it renders the required parts in the required order, so the pattern cannot be composed wrongly. The header always precedes the body; the loading indicator announces; feedback is available unless explicitly suppressed. / export interface AIResponseProps extends React.HTMLAttributes<HTMLDivElement> { agentLabel: string timestamp?: string /** While true, the loading indicator replaces the body and announces politely. */ loading?: boolean loadingVariant?: "thinking" | "working" | "retrieving" /** While true, the body is a polite live region so arriving text is announced. |
| `actions` | `FooterAction[]` | — | Declared in the component source. |
| `showFeedback` | `boolean` | — | One AI turn, assembled so that authorship, progress and recourse are all present by construction. This is design-system/patterns/ai-response.json as a component: it renders the required parts in the required order, so the pattern cannot be composed wrongly. The header always precedes the body; the loading indicator announces; feedback is available unless explicitly suppressed. / export interface AIResponseProps extends React.HTMLAttributes<HTMLDivElement> { agentLabel: string timestamp?: string /** While true, the loading indicator replaces the body and announces politely. */ loading?: boolean loadingVariant?: "thinking" | "working" | "retrieving" /** While true, the body is a polite live region so arriving text is announced. */ streaming?: boolean /** Optional disclosure of what the agent did to produce this. */ workNote?: { content?: string; items?: string[] } actions?: FooterAction[] /** Set false only where feedback genuinely has nowhere to go. |
| `onSentiment` | `(value: "up" \| "down") => void` | — | Declared in the component source. |
| `onCopy` | `() => void` | — | Declared in the component source. |
| `bare` | `boolean` | — | One AI turn, assembled so that authorship, progress and recourse are all present by construction. This is design-system/patterns/ai-response.json as a component: it renders the required parts in the required order, so the pattern cannot be composed wrongly. The header always precedes the body; the loading indicator announces; feedback is available unless explicitly suppressed. / export interface AIResponseProps extends React.HTMLAttributes<HTMLDivElement> { agentLabel: string timestamp?: string /** While true, the loading indicator replaces the body and announces politely. */ loading?: boolean loadingVariant?: "thinking" | "working" | "retrieving" /** While true, the body is a polite live region so arriving text is announced. */ streaming?: boolean /** Optional disclosure of what the agent did to produce this. */ workNote?: { content?: string; items?: string[] } actions?: FooterAction[] /** Set false only where feedback genuinely has nowhere to go. */ showFeedback?: boolean onSentiment?: (value: "up" | "down") => void onCopy?: () => void /** Renders without the AI surface wash — for a thread that is already marked. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-response.agent.json`](ai-response.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region` |
| Live region | Loading announces politely; the body becomes a live region while streaming |

**Keyboard**

- Tab through actions and feedback controls

**Required**

- agentLabel

**Notes**

- The region is labelled "Response from {agentLabel}", so a screen-reader user can identify and skip it.
- Actions and feedback are withheld while loading — offering them before there is output invites acting on nothing.
- The part order is fixed. Attribution before content is the property this component exists to guarantee.

## Examples

### A turn

```tsx
<AIResponse
  agentLabel="Research agent"
  timestamp="Just now"
  loading={isLoading}
  streaming={isStreaming}
  onCopy={copy}
>
  <p>{text}</p>
</AIResponse>
```

## Agent rules

1. Prefer this over hand-assembling the parts — the order is the safety property.
2. Set streaming only while text is arriving.
3. Use bare only where the containing thread already marks AI authorship.
4. Set showFeedback false only when feedback genuinely has nowhere to go.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Human messages
- Reordering the parts
- Consequential approvals

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-approval-card` | Consequential decisions |
| `ai:ai-message-header` | The parts, used directly |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-response.agent.json`](ai-response.agent.json) → this file → [`src/components/ai/ai-response.tsx`](../../../../src/components/ai/ai-response.tsx)
