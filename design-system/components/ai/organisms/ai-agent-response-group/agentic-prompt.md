# Agentic Prompt — AI Agent Response Group

You are implementing the **AI Agent Response Group** (`ai-agent-response-group`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Agent Response Group (`ai-agent-response-group`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> A flexible conversational card that upgrades from plain text to actions, alerts, or full footer — controlled by a single variant prop.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-agent-response-group/ai-agent-response-group.agent.json`
4. `components/ai/organisms/ai-agent-response-group/ai-agent-response-group.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAgentResponseGroup` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `agentLabel` (`string`) default ``"AI Assistant"`` — Agent name shown in the attribution header.
- `timestamp` (`string`) default ``"Just now"`` — Right-aligned timestamp in the header.
- `children` (`React.ReactNode`) default ``required`` — Body content. Use <strong> with brand color for inline emphasis.
- `variant` (`"default" \) default `"with-actions" \` — "with-alert" \
- `alertLabel` (`string`) default ``"Heads up"`` — Label text inside the orange alert sub-row. Only visible in with-alert variant.
- `primaryAction` (`{ label: string; onClick?: () => void }`) default ``undefined`` — Primary pill button. Visible in with-actions and with-alert variants.
- `secondaryAction` (`{ label: string; onClick?: () => void }`) default ``undefined`` — Secondary outline pill button. Visible in with-actions and with-alert variants.
- `sources` (`AISource[]`) default ``[]`` — Source chips passed to AIResponseFooter. Only used in with-footer variant.
- `showFeedback` (`boolean`) default ``false`` — Shows thumbs up/down feedback bar in AIResponseFooter. Only used in with-footer variant.
- `onFeedback` (`(v: "up" \) default `"down") => void`` — `undefined`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
