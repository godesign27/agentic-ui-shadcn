# Agentic Prompt — AI Workstream Control Panel

You are implementing the **AI Workstream Control Panel** (`ai-workstream-control-panel`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Workstream Control Panel (`ai-workstream-control-panel`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Command-center surface for long-running multi-step AI workflows. Combines step stepper, progress tracking, execution controls, and governance actions in one panel.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-workstream-control-panel/ai-workstream-control-panel.agent.json`
4. `components/ai/organisms/ai-workstream-control-panel/ai-workstream-control-panel.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIWorkstreamControlPanel` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `steps` (`WorkstreamStep[]`) default ``required`` — Steps array with label and complete flag
- `currentStep` (`number`) default ``required`` — Zero-based index of active step
- `progress` (`number`) default ``required`` — Progress percentage 0–100
- `controlState` (`ControlBarState`) default ``required`` — AIControlBar state
- `checkpointNote` (`string`) default ``undefined`` — Contextual note displayed below stepper

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
