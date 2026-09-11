# Agentic Prompt — AI To-Do

You are implementing the **AI To-Do** (`ai-to-do`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI To-Do (`ai-to-do`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> Calm checklist the agent uses to narrate its plan and progress.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-to-do/ai-to-do.agent.json`
4. `components/ai/molecules/ai-to-do/ai-to-do.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIToDo` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``"To-do list"`` — Section title in the header.
- `items` (`AIToDoItem[]`) default ``required`` — Ordered list. Each item has { label, status, note?, id? }.
- `collapsible` (`boolean`) default ``true`` — Allow the user to collapse the list. Header becomes a button.
- `defaultCollapsed` (`boolean`) default ``false`` — Initial collapsed state when collapsible.
- `forceComplete` (`boolean`) default ``auto`` — Override the auto "all complete" celebration state. Auto-detects from items.every(status === "completed").
- `onItemClick` (`(item, index) => void`) default ``undefined`` — Optional click handler — rows become buttons. Useful for jumping the user to the artifact the row represents.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
