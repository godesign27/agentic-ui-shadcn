# AI Card Multi-Agent Collaboration

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardMultiAgentCollaboration`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Unified view of a coordinated agent swarm working toward a shared goal. Surfaces each agent's contribution and emergent cross-agent findings.

The Multi-Agent Collaboration Card provides a unified view of a coordinated agent swarm working toward a shared goal. It surfaces each agent's role, status, and contribution line, plus an expandable "Shared Findings" disclosure for emergent cross-agent synthesis.

**Export:** `AICardMultiAgentCollaboration`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-multi-agent-collaboration/AICardMultiAgentCollaboration.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-multi-agent-collaboration/ai-card-multi-agent-collaboration.md` | This mirror spec |
| `components/ai/organisms/ai-card-multi-agent-collaboration/ai-card-multi-agent-collaboration.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-multi-agent-collaboration/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Execute · Monitor |
| Accountability | Owner · Audit trail · Escalation |

## Anatomy

1. **Goal Header** _(Shared)_ — AIAgentStack + shared goal text
2. **Progress Bar** _(Shared)_ — Thin completion indicator
3. **Agent Rows** _(Unique)_ — Avatar + name + AI Badge (queue variant) + contribution
4. **Shared Findings** _(Unique)_ — Collapsible disclosure section
5. **Action Row** _(Shared)_ — Pause All / Escalate / View Full Audit

## State variations

- **All Running** _(status=running)_ — All agents executing in parallel
- **Mixed** _(status=mixed)_ — Some complete, some running, one blocked
- **Findings Available** _(sharedFindings=set)_ — Shared findings section visible
- **Escalated** _(status=escalated)_ — One agent escalated to human

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `goal` | `string` | `required` | Shared goal statement |
| `agents` | `CollaboratingAgent[]` | `required` | Array of agents with status and contribution |
| `sharedFindings` | `string` | `undefined` | Cross-agent synthesis text (collapsible) |
| `onPauseAll` | `() => void` | `undefined` | Pause all agents handler |
| `onEscalate` | `() => void` | `undefined` | Escalate handler |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Agent avatars and progress bar |

### Companion
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-companion-paper` | `#F6F2EB` | Shared findings background |

## Flows

### Parallel agent monitoring
Operator monitors multi-agent run
- Card shows all agents running
- Progress bar advances as agents complete
- Shared findings appear when all agents report
- Operator reviews findings and escalates or approves

## Canonical implementation

```tsx
import { AICardMultiAgentCollaboration } from '@/components/ai/organisms/ai-card-multi-agent-collaboration/AICardMultiAgentCollaboration';

<AICardMultiAgentCollaboration
  goal="Analyze EMEA Q2 performance and identify accounts at risk"
  agents={[
    { id: 'a1', label: 'Research Agent', status: 'complete', contribution: 'Pulled CRM data for 48 accounts' },
    { id: 'a2', label: 'Risk Scorer', status: 'running', contribution: 'Scoring churn probability...' },
    { id: 'a3', label: 'Writer Agent', status: 'queued', contribution: 'Awaiting risk scores' },
  ]}
  sharedFindings="7 accounts show 3+ risk signals. Recommend escalation review."
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-multi-agent-collaboration.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-multi-agent-collaboration/ai-card-multi-agent-collaboration.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
