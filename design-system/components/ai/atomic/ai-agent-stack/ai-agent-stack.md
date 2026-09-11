# AI Agent Stack

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiAgentStack`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Overlapping avatar stack representing multiple agents working in parallel. Status rings encode each agent's execution state at a glance.

**Export:** `AIAgentStack`

The AI Agent Stack compresses a group of AI agents into a compact overlapping avatar row. Each circle shows agent initials with a status-colored ring (active, waiting, complete, error). Overflow beyond maxVisible is represented by a "+N" count. Designed for use in multi-agent collaboration cards, command center headers, and queue summaries.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/agent-stack/AIAgentStack.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-agent-stack/ai-agent-stack.md` | This mirror spec |
| `components/ai/atomic/ai-agent-stack/ai-agent-stack.agent.json` | Agent manifest |
| `components/ai/atomic/ai-agent-stack/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Execute · Monitor |
| Accountability | Owner · Audit trail |

## When to use

- See bundle overview

## Anatomy

1. **Avatar circle** _(Unique)_ — Circle with initials, sized by size prop, offset to overlap by 45%.
2. **Status ring** _(Unique)_ — 2px border colored by agent.status token.
3. **Overflow badge** _(Shared)_ — Gray "+N" circle shown when agents.length > maxVisible.

## State variations

- **Active** _(active)_ — Agent is currently running — brand blue ring.
- **Waiting** _(waiting)_ — Agent is queued but not yet started — neutral ring.
- **Complete** _(complete)_ — Agent finished successfully — green ring.
- **Error** _(error)_ — Agent encountered an error — red ring.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `agents` | `Agent[]` | `—` | Array of { id, label, status } objects |
| `maxVisible` | `number` | `3` | Max visible avatars before overflow badge appears |
| `size` | `number` | `28` | Avatar diameter in px |

## Tokens

### Agent Stack
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#5A6DFF` | Active status ring |
| `AI.color.border.default` | `#D2D6FF` | Waiting status ring |
| `AI.color.brandSurface` | `#F5F6FF` | Active avatar bg |
| `AI.color.surface.emphasis` | `#D2D6FF` | Overflow badge bg |

## JavaScript / React API

```tsx
import { AIAgentStack } from '@/components/ai/atomic/agent-stack/AIAgentStack';

<AIAgentStack
  agents={[
    { id: '1', label: 'Research Agent', status: 'active' },
    { id: '2', label: 'Planner Agent',  status: 'complete' },
    { id: '3', label: 'Writer Agent',   status: 'waiting' },
    { id: '4', label: 'Review Agent',   status: 'error' },
  ]}
  maxVisible={3}
/>
```

## Agent rules

1. Read this mirror spec and `ai-agent-stack.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-agent-stack/ai-agent-stack.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order