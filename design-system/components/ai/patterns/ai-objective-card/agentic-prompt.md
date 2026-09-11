# Agentic Prompt — AI Objective Card

You are implementing the **AI Objective Card** (`ai-objective-card`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Objective Card (`ai-objective-card`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Compact card that frames a goal, constraint, operating mode, or guardrail an agent must respect.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-objective-card/ai-objective-card.agent.json`
4. `components/ai/organisms/ai-objective-card/ai-objective-card.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIObjectiveCard` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `` (`'primary-goal' \) default `'constraint' \` — 'operating-mode' \
- `` (`string`) default ```` — Bold statement of the goal / constraint / mode.
- `` (`AIObjectiveItem[]`) default ```` — Bullet items elaborating the contract.
- `` (`string`) default ```` — Override the default icon for the type.
- `` (`string`) default ```` — Override the default chip label.
- `` (`string`) default ```` — Footer link label. Defaults to "View details".
- `` (`() => void`) default ```` — Footer link callback — opens the objective configuration drawer.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
