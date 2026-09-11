# Agentic Prompt — AI Card Workstream

You are implementing the **AI Card Workstream** (`ai-card-workstream`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Workstream (`ai-card-workstream`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Card-style preview of an AI workstream — surfaces just enough state for the user to decide whether to drill in.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-workstream/ai-card-workstream.agent.json`
4. `components/ai/organisms/ai-card-workstream/ai-card-workstream.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardWorkstream` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `type` (`"map" \) default `"roster" \` — "data" \
- `status` (`"active" \) default `"pending" \` — "critical" \
- `title` (`string`) default ``required`` — Workstream name. Rendered as the card heading.
- `description` (`string`) default ``required`` — Two-line supporting paragraph under the title.
- `metrics` (`{ label: string; value: string }[]`) default ``required`` — Up to 3 KPI columns. Excess entries are dropped.
- `healthPercent` (`number (0–100)`) default ``required`` — Project health percentage. Drives the bar width.
- `assignees` (`{ initial: string; name?: string }[]`) default ``undefined`` — Assignee initial chips. Up to 3 shown + a +N counter for the rest.
- `lastUpdated` (`string`) default ``undefined`` — Relative timestamp ("12M ago", "1d ago").
- `onClick` (`() => void`) default ``undefined`` — Fired when the card is clicked — typically navigates to the workstream dashboard.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
