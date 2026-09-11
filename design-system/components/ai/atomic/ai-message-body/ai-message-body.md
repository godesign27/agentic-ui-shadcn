# AI Text Response

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiMessageBody`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The voice of the AI. Plain, direct, readable — the atomic text body that carries every AI-generated sentence when no structured output is needed.

**Export:** `AIMessageBody`

AI Text Response is the atomic text body for a plain-language AI response inside a conversation. It handles typography, line height, and surface adaptation — enforcing the Guild AI typography contract via `@brand-bubble-body` (Open Sans 16px default, 1.55 line-height, `var(--ai-neutral-text)`). No bold, no headings inside this atom — formatting belongs in Markdown-rendering output groups. Max line length is governed by the container, not the atom.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/message-body/AIMessageBody.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-message-body/ai-message-body.md` | This mirror spec |
| `components/ai/atomic/ai-message-body/ai-message-body.agent.json` | Agent manifest |
| `components/ai/atomic/ai-message-body/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Explain · Guide |
| Accountability | Rationale · Assumptions · Sources |

## When to use

- As the content inside AiResponseBubble for any plain-language response — analysis, explanation, suggestion, or guidance
- When output does not require a structured format (no table, no metrics, no notification card)
- As prefix copy before a structured output group — e.g., a one-sentence summary before AiTableOutput

## When not to use

- When the response contains structured data — use the appropriate group component (AIAnalysisMessage, table, etc.)
- For short labels or status text — use Standard text styles directly
- Do not use bold or headings inside this atom — those belong in structured output groups

## Anatomy

1. **Prose Text** _(Unique)_ — AI response content — children prop. `@brand-bubble-body` token (16px default), no bold, no headings.

## State variations

- **Standard** _(default)_ — Based on Q2 territory data, coverage has improved by 8% since the last restructuring. Three reps are currently overloaded relative to their quota capacity. I recommend redistributing the Northeast accounts before Q3 planning finalizes.
- **Short answer** _(compact)_ — Coverage is at 74%. Northeast is your biggest gap.
- **Multi-sentence analysis** _(long-form)_ — Q2 performance shows three overloaded reps in the Pacific region. Their accounts per rep ratio (1:47) exceeds the recommended threshold of 1:35. Before finalizing Q3 territory assignments, consider redistributing 12–15 accounts to the two recently onboarded reps in that region. This would bring coverage ratios into balance and reduce churn risk on the 6 highest-revenue accounts currently at risk.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `required` | AI response prose — any React content. Keep formatting to plain text; no bold or headings. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Typography size: sm=14px, md=16px, lg=18px. All inherit `@brand-bubble-body` weight and line-height. |

## Tokens

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `@brand-bubble-body` | 16px / 400 / 1.55 / −0.1px letter-spacing | Default `md` size — conversational message body |
| `F` (`ai-tokens.ts`) | `"Open Sans", sans-serif` | Font family for all AI prose |
| `--ai-neutral-text` | `NEUTRAL.textDefault` (#2f2c3c) | Body text color on light surfaces |
| `size="sm"` | 14px (bubble-body overrides) | Compact prose |
| `size="lg"` | 18px (bubble-body overrides) | Emphasized prose |

## Flows

### Standard AI response
Text body renders the AI prose after the attribution header
- AIMessageHeader mounts with agent label and timestamp
- AIMessageBody renders below with response text (streams character-by-character)
- Structured content (if any) follows — e.g., AIAnalysisMessage
- AIFeedbackBar or AIResponseFooter closes the message

## JavaScript / React API

```tsx
import { AIMessageBody } from '@/components/ai/atomic/message-body/AIMessageBody';

// Standard response
<AIMessageBody>
  Based on Q2 territory data, coverage has improved by 8% since the last restructuring.
  Three reps are currently overloaded relative to their quota capacity. I recommend
  redistributing the Northeast accounts before Q3 planning finalizes.
</AIMessageBody>

// Short answer
<AIMessageBody>
  Coverage is at 74%. Northeast is your biggest gap.
</AIMessageBody>

// Multi-sentence analysis (use paragraphs, not one run-on sentence)
<AIMessageBody>
  Q2 performance shows three overloaded reps in the Pacific region.
  Their accounts per rep ratio (1:47) exceeds the recommended threshold of 1:35.
  Before finalizing Q3 territory assignments, consider redistributing 12–15 accounts
  to the two recently onboarded reps in that region.
</AIMessageBody>
```

## Agent rules

1. Read this mirror spec and `ai-message-body.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-message-body/ai-message-body.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order