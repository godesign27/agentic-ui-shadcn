# Agentic Prompt — AI Card Trust Summary

You are implementing the **AI Card Trust Summary** (`ai-card-trust-summary`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Trust Summary (`ai-card-trust-summary`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Governance surface for AI-generated outputs. Visualises confidence level, risk, data quality, and freshness — and flags when human review is required.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-trust-summary/ai-card-trust-summary.agent.json`
4. `components/ai/organisms/ai-card-trust-summary/ai-card-trust-summary.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardTrustSummary` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `confidence` (`number`) default ``required`` — Confidence score 0–100. Tone (green/amber/red) is derived from this value.
- `risk` (`RiskLevel`) default ``required`` — none \
- `dataQuality` (`number \) default `string`` — `required`
- `lastUpdated` (`string`) default ``required`` — Human-readable last updated value (e.g. "2 hours ago", "Jun 6, 2026").
- `sources` (`string[]`) default ``undefined`` — Source chip labels rendered as bordered pills. Falls back to "N sources" if absent.
- `sourceCount` (`number`) default ``undefined`` — Number of data sources — used when `sources` is not provided.
- `requiresReview` (`boolean`) default ``required`` — Toggles the Request Review footer button.
- `headerTone` (`"gray" \) default `"tan"`` — `"gray"`
- `onRequestReview` (`() => void`) default ``undefined`` — Called when the Request Review button is clicked.
- `onViewSources` (`() => void`) default ``undefined`` — Called when "View sources" link is clicked.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
