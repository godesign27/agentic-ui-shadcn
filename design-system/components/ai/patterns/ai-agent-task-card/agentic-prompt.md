# Agentic Prompt — AI Agent Task Card

You are implementing the **AI Agent Task Card** (`ai-agent-task-card`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Agent Task Card (`ai-agent-task-card`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Delegated task record · 4 densities · Needs Input + Health surfaced

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-agent-task-card/ai-agent-task-card.agent.json`
4. `components/ai/organisms/ai-agent-task-card/ai-agent-task-card.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAgentTaskCard` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`'basic' \) default `'simple' \` — 'rich' \
- `taskId` (`string`) default ``—`` — Durable task identifier, e.g. T-3091.
- `title` (`string`) default ``—`` — Task title.
- `taskType` (`'immediate' \) default `'scheduled' \` — 'recurring'`
- `status` (`14-value union`) default ``—`` — Workflow state. See AIAgentTaskStatus.
- `health` (`AIAgentTaskHealth`) default ``undefined`` — Task-level health signal. Adds a glyph + label badge.
- `agent` (`{ name; role? }`) default ``undefined`` — Assigned worker agent for Basic / Simple / Rich.
- `agentStack` (`AIAgentSummary[]`) default ``undefined`` — Robust only. Shown via AIAgentStack.
- `originalIntent` (`string`) default ``undefined`` — Quoted intent strip — Rich + Robust.
- `parameters` (`{ key; value; mutable }[]`) default ``undefined`` — Mutable params are brand-tinted with edit glyph.
- `progress` (`number 0–100`) default ``undefined`` — Renders AIProgress with status-mapped fill.
- `needsInput` (`{ gap; whyNeeded?; suggestions? }`) default ``undefined`` — When present, renders the orange Needs Input panel.
- `confidence` (`'high' \) default `'medium' \` — 'low'`
- `risk` (`'none' \) default `'low' \` — 'medium' \
- `sources` (`{ label; freshness? }[]`) default ``undefined`` — Outlined chips. Rich + Robust only.
- `reviewState` (`{ label; reviewer? }`) default ``undefined`` — Robust only. Brand-tinted reviewer row.
- `primaryAction` (`{ label; onClick?; status? }`) default ``undefined`` — AIButton variant="primary".
- `secondaryActions` (`{ label; onClick? }[]`) default ``undefined`` — Robust only. AIButton variant="secondary" each.
- `selected / onClick` (`boolean / () => void`) default ``undefined`` — When onClick is set the card becomes role="button".
- `onViewRationale / onViewTrace / onViewSources / onResolveInput` (`() => void`) default ``undefined`` — Optional link + suggestion handlers.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
