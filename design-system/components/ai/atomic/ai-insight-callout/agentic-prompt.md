# Agentic Prompt — AI Insight Callout

You are implementing the **AI Insight Callout** (`ai-insight-callout`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Insight Callout (`ai-insight-callout`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The "what does this mean?" callout. AI text that earns trust by being clearly attributed as AI-generated.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-insight-callout/ai-insight-callout.agent.json`
4. `components/ai/atomic/ai-insight-callout/ai-insight-callout.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIInsightCallout` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `body` (`string`) default ``required`` — Body text rendered as an italic blockquote.
- `eyebrow` (`string`) default ``"AI INSIGHT"`` — Label above the body. Override for non-AI insights.
- `tone` (`"brand" \) default `"warning" \` — "critical" \

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
