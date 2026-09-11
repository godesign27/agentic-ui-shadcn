# Agentic Prompt — AI Card Learning Feedback

You are implementing the **AI Card Learning Feedback** (`ai-card-learning-feedback`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Learning Feedback (`ai-card-learning-feedback`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Closes the feedback loop between user signals and AI adaptation. Shows what was learned, the preference inferred, and where it has been applied — with undo.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-learning-feedback/ai-card-learning-feedback.agent.json`
4. `components/ai/organisms/ai-card-learning-feedback/ai-card-learning-feedback.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardLearningFeedback` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `feedback` (`FeedbackSentiment`) default ``required`` — positive \
- `preference` (`string`) default ``required`` — Inferred preference label
- `appliedAreas` (`string[]`) default ``required`` — Areas where preference is applied
- `timestamp` (`string`) default ``required`` — When feedback was received
- `onUndo` (`() => void`) default ``undefined`` — Undo feedback handler
- `onViewHistory` (`() => void`) default ``undefined`` — View feedback history handler
- `onEditPreferences` (`() => void`) default ``undefined`` — Edit preferences handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
