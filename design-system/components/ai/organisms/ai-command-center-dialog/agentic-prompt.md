# Agentic Prompt — AI Command Center Dialog

You are implementing the **AI Command Center Dialog** (`ai-command-center-dialog`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Command Center Dialog (`ai-command-center-dialog`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> The conversational core of the AI Command Center — independently composable in any surface that needs a first-class AI chat experience without the full page shell.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-command-center-dialog/ai-command-center-dialog.agent.json`
4. `components/ai/organisms/ai-command-center-dialog/ai-command-center-dialog.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICommandCenterDialog` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`"robust" \) default `"slim" \` — "bottom-docked"`
- `maxWidth` (`number \) default `string`` — `680`
- `backdropColor` (`string`) default ``"#F7F8FC"`` — Bottom-docked only. Color the gradient backdrop fades into (should match the page background so content reads cleanly behind the pill).
- `theme` (`"gray" \) default `"aqua"`` — `"gray"`
- `greeting` (`string`) default ``auto`` — Override the time-of-day greeting (e.g. "Good morning, Theo!").
- `subtitle` (`string`) default ``"Ask me anything..."`` — Subtitle shown below the greeting in robust variant.
- `showBackground` (`boolean`) default ``true`` — Enable or disable the ambient gradient background.
- `onSubmit` (`(text: string) => void`) default ``undefined`` — Optional external submit handler (in addition to useAIChat internal handling).

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
