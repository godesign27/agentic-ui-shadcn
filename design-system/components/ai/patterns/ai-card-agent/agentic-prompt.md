# Agentic Prompt — AI Card Agent

You are implementing the **AI Card Agent** (`ai-card-agent`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Agent (`ai-card-agent`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Named agent entry-point — voice-first introduction with chat fallback.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-agent/ai-card-agent.agent.json`
4. `components/ai/organisms/ai-card-agent/ai-card-agent.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardAgent` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `config` (`AgentCardConfig`) default ``required`` — Agent identity + content. See AGENT_CONFIGS for canonical presets.
- `forceState` (`"idle" \) default `"talking"`` — `undefined`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
