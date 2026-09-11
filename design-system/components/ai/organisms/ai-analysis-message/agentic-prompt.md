# Agentic Prompt — AI Analysis Message

You are implementing the **AI Analysis Message** (`ai-analysis-message`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Analysis Message (`ai-analysis-message`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> The primary output surface for AI-generated analysis. Structured insights are labeled, sourced, and confidence-rated — so users can calibrate trust before acting.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-analysis-message/ai-analysis-message.agent.json`
4. `components/ai/organisms/ai-analysis-message/ai-analysis-message.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAnalysisMessage` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `attribution` (`string`) default ``"AI Analysis"`` — Agent label in the attribution row
- `timestamp` (`string`) default ``"Just now"`` — Timestamp shown next to the attribution label
- `intro` (`string`) default ``undefined`` — Optional intro sentence rendered above the insight cards
- `insights` (`AIInsightItem[]`) default ``[]`` — Array of insight objects — each renders as an AIAnalysisInsight card
- `sources` (`AISource[]`) default ``[]`` — Data source objects passed to AIResponseFooter
- `showFooter` (`boolean`) default ``true`` — Show AIResponseFooter with sources and feedback bar
- `showFeedback` (`boolean`) default ``true`` — Show feedback thumbs and actions inside the footer
- `status` (`MessageStatus`) default ``"default"`` — default \
- `loading` (`boolean`) default ``false`` — When true, renders skeleton insight cards — overrides status
- `collapsed` (`boolean`) default ``false`` — Initial collapsed state — shows only attribution header
- `actions` (`{ label, onClick }[]`) default ``undefined`` — Optional follow-up action buttons below insight cards
- `onFeedback` (`(v: "up"\) default `"down") => void`` — `undefined`
- `onViewRationale` (`() => void`) default ``undefined`` — Shows View rationale link in footer when provided
- `onCopy` (`() => void`) default ``undefined`` — Copy action passed to AIResponseFooter
- `onShare` (`() => void`) default ``undefined`` — Share action passed to AIResponseFooter

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
