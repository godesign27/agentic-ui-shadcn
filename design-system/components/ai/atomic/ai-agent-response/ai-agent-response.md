# AI Agent Response

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiAgentResponse`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The minimal unit of AI speech — header plus body in a branded card. Use this atom when the response stands alone with no follow-up actions or structured data.

AIAgentResponse is the foundational conversational atom — a single card that wraps an AIMessageHeader (bot avatar, agent name, timestamp) above an AIMessageBody (plain-language prose). It establishes AI authorship with no extra chrome.

**Export:** `AIAgentResponse`

Use it for one-shot responses, confirmation messages, short answers, and any context where follow-up action buttons or structured insight cards are not needed. When you need action buttons or a full response footer, use the AIAgentResponseGroup instead.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/agent-response/AIAgentResponse.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-agent-response/ai-agent-response.md` | This mirror spec |
| `components/ai/atomic/ai-agent-response/ai-agent-response.agent.json` | Agent manifest |
| `components/ai/atomic/ai-agent-response/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Respond · Suggest · Explain |
| Accountability | Agent identity · Timestamp · Plain-language response |

## When to use

- Short, plain-language AI responses with no follow-up actions
- Confirmation or acknowledgement messages from the agent
- Streaming message placeholder before content resolves
- Inline AI answers inside panels or drawers

## When not to use

- When you need primary/secondary action buttons — use AIAgentResponseGroup with variant="with-actions"
- When the response includes structured insights — use AIAnalysisMessage
- When the response needs source attribution or a feedback bar — use AIAgentResponseGroup with variant="with-footer"

## Anatomy

1. **Card surface** _(Unique)_ — Soft raised card — `var(--ai-card-bg-raised)` fill, `var(--ai-card-border)` stroke, `AI.radius.lg` corners.
2. **Message header** _(Shared)_ — AIMessageHeader — bot avatar dot, agent label, right-aligned timestamp.
3. **Message body** _(Shared)_ — AIMessageBody — prose content at `@zsai-bubble-body` (16/400/1.55). Bold spans with brand color for emphasis.

## State variations

- **Default (md)** _(size="md")_ — 16px avatar, 16px body text. Standard conversational weight.
- **Compact (sm)** _(size="sm")_ — 14px avatar, 14px body text. Use in tight panels or sidebars.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `agentLabel` | `string` | `"AI Assistant"` | Name displayed in the attribution header. |
| `timestamp` | `string` | `"Just now"` | Right-aligned timestamp string in the header. |
| `size` | `"sm" \| "md"` | `"md"` | Controls avatar size and body text size together. |
| `children` | `React.ReactNode` | `required` | Body content. Use <strong> with brand color for emphasis. |
| `dark` | `boolean` | `false` | Renders the response card on a deep brand-ink surface with light text — for use on dark chat chrome. |

## Tokens

### Card surface
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg-raised` | `#FFFFFF` | Card background |
| `--ai-card-border` | `#BECAFE` | Card border stroke |
| `AI.radius.lg` | `20px` | Corner radius |

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `@zsai-bubble-body` | `16/400/1.55/-0.1px` | Body text — md size |
| `@zsai-agent-name` | `12/600/1.0` | Agent label in header |

## Flows

### Streaming AI response
Agent types a plain-language reply into the message surface.
- Mount AIAgentResponse with an empty or skeleton children prop
- Progressively update children as tokens stream in
- Response settles — content is static

## Canonical implementation

```tsx
import { AIAgentResponse } from '@/components/ai/atomic/agent-response/AIAgentResponse';

// Default
<AIAgentResponse agentLabel="AI Agent" timestamp="Just now">
  Let's build your campaign.{' '}
  <strong style={{ color: 'var(--ai-brand, #4D60E6)' }}>
    What brand are you trying to grow, and what's the primary goal?
  </strong>
</AIAgentResponse>

// Compact
<AIAgentResponse agentLabel="AI Agent" timestamp="Just now" size="sm">
  Got it — I'll keep the recommendations focused on RiShareLine of Voice.
</AIAgentResponse>
```

## Agent rules

1. Read this mirror spec and `ai-agent-response.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-agent-response/ai-agent-response.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
