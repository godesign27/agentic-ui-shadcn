# Agentic Prompt — AI Metric Tile

You are implementing the **AI Metric Tile** (`ai-metric-tile`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Metric Tile (`ai-metric-tile`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Compact raised tile for a single metric reading — eyebrow + value + optional qualifier.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-metric-tile/ai-metric-tile.agent.json`
4. `components/ai/atomic/ai-metric-tile/ai-metric-tile.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIMetricTile` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `label` (`string`) default ``—`` — Uppercase eyebrow label.
- `value` (`ReactNode`) default ``—`` — Metric value body.
- `qualifier` (`string`) default ``—`` — Small trailing chip text.
- `qualifierTone` (`"positive" \) default `"attention" \` — "critical" \
- `size` (`"sm" \) default `"md"`` — `"md"`
- `accent` (`boolean`) default ``false`` — Adds a 3px right border in the qualifier tone.
- `ariaLabel` (`string`) default ``—`` — Override the auto-derived aria-label.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
