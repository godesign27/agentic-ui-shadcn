# Agentic Prompt — AI Card Multi-Agent Collaboration

You are implementing the **AI Card Multi-Agent Collaboration** (`ai-card-multi-agent-collaboration`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Multi-Agent Collaboration (`ai-card-multi-agent-collaboration`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Unified view of a coordinated agent swarm working toward a shared goal. Surfaces each agent's contribution and emergent cross-agent findings.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-multi-agent-collaboration/ai-card-multi-agent-collaboration.agent.json`
4. `components/ai/organisms/ai-card-multi-agent-collaboration/ai-card-multi-agent-collaboration.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardMultiAgentCollaboration` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `goal` (`string`) default ``required`` — Shared goal statement
- `agents` (`CollaboratingAgent[]`) default ``required`` — Array of agents with status and contribution
- `sharedFindings` (`string`) default ``undefined`` — Cross-agent synthesis text (collapsible)
- `onPauseAll` (`() => void`) default ``undefined`` — Pause all agents handler
- `onEscalate` (`() => void`) default ``undefined`` — Escalate handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
