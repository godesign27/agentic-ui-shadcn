# Agentic Prompt — AI Command Center — Split View

You are implementing the **AI Command Center — Split View** (`ai-command-center-split-view`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Command Center — Split View (`ai-command-center-split-view`) |
| **Status** | Beta |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Chat drives the work. The right panel holds the generated output.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-command-center-split-view/ai-command-center-split-view.agent.json`
4. `components/ai/pages/ai-command-center-split-view/ai-command-center-split-view.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICommandCenterSplitView` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`"gray" \) default `"aqua"`` — `"gray"`
- `showBackground` (`boolean`) default ``true`` — Render the ambient gradient background in the start state.
- `suggestions` (`string[]`) default ``undefined`` — Custom quick-action chip labels for the start state. Defaults to 5 Guild-specific examples.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
