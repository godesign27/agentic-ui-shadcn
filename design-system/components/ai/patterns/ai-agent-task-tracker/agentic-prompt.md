# Agentic Prompt — AI Agent Task Tracker

You are implementing the **AI Agent Task Tracker** (`ai-agent-task-tracker`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Agent Task Tracker (`ai-agent-task-tracker`) |
| **Status** | Beta |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Persistent task supervision · Needs Input resolution · Bidirectional UI + natural-language mutation

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-agent-task-tracker/ai-agent-task-tracker.agent.json`
4. `components/ai/pages/ai-agent-task-tracker/ai-agent-task-tracker.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAgentTaskTracker` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`'basic' \) default `'simple' \` — 'rich' \
- `flow` (`'default' \) default `'needs-input' \` — 'conflict' \
- `supervisorAgent` (`{ name; tasksTracked; lastUpdated? }`) default ``Smart Assist · 7 tasks`` — Header companion strip identity.
- `tasks` (`AIAgentTaskCardProps[]`) default ``SAMPLE_TASKS`` — Data-driven task list. Each task is an AIAgentTaskCard props object.
- `selectedTaskId` (`string`) default ``undefined`` — Initial selected task id for the detail panel.
- `layout` (`'list' \) default `'board'`` — `'list'`
- `onNewTask` (`() => void`) default ``undefined`` — Header New task action.
- `onReviewNeedsInput` (`() => void`) default ``undefined`` — Header Review Needs Input action.
- `onSettings` (`() => void`) default ``undefined`` — Header Settings action.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
