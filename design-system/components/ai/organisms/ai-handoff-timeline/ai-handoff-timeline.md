# AI Handoff Timeline

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiHandoffTimeline`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Auditable vertical timeline of every ownership transfer in a multi-agent or human-in-loop workflow. Each node records who held ownership, when, and why.

The AI Handoff Timeline provides an auditable vertical timeline of every ownership transition in a multi-agent or human-in-loop workflow. Each node shows the owner, timestamp, and handoff reason. Failed handoffs display retry/reassign actions.

**Export:** `AIHandoffTimeline`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-handoff-timeline/AIHandoffTimeline.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-handoff-timeline/ai-handoff-timeline.md` | This mirror spec |
| `components/ai/organisms/ai-handoff-timeline/ai-handoff-timeline.agent.json` | Agent manifest |
| `components/ai/organisms/ai-handoff-timeline/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Transfer · Escalate |
| Accountability | Audit trail · Owner · Rollback |

## Anatomy

1. **Header** _(Shared)_ — Title + AIChipHandoff summary + collapse toggle
2. **Timeline Nodes** _(Unique)_ — Status dot + connector line per step
3. **Step Content** _(Unique)_ — Owner name + type badge + timestamp + note
4. **Action Row** _(Shared)_ — Retry / Reassign / View Audit

## State variations

- **Agent-to-Agent** _(direction=agent-to-agent)_ — Standard multi-agent handoff
- **Agent-to-Human** _(direction=agent-to-human)_ — Escalation to human reviewer
- **Failed** _(hasFailed=true)_ — Failed step — Retry action visible
- **Collapsed** _(expanded=false)_ — Header only — timeline hidden

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `steps` | `HandoffStep[]` | `required` | Array of timeline steps |
| `direction` | `HandoffDirection` | `"agent-to-agent"` | Controls AIChipHandoff in header |
| `title` | `string` | `"Handoff Timeline"` | Card title |
| `onRetry` | `() => void` | `undefined` | Retry handler (shown on failed) |
| `onReassign` | `() => void` | `undefined` | Reassign handler |
| `onViewAudit` | `() => void` | `undefined` | View audit handler |

## Tokens

### Status
| Token | Value | Usage |
| --- | --- | --- |
| `--color-complete` | `#27AE60` | Complete dot and line |
| `--color-failed` | `#E74C3C` | Failed dot and line |
| `--ai-brand` | `#4D60E6` | Active dot and line |

## Flows

### Failed handoff recovery
Operator retries a failed handoff step
- Timeline shows failed node in red
- Retry button visible
- Operator clicks Retry
- Step transitions to active
- New timeline node appended

## Canonical implementation

```tsx
import { AIHandoffTimeline } from '@/components/ai/organisms/ai-handoff-timeline/AIHandoffTimeline';

<AIHandoffTimeline
  direction="agent-to-human"
  steps={[
    { owner: 'Research Agent', ownerType: 'agent', timestamp: 'Jun 6, 10:12 AM', status: 'complete', note: 'Analysis complete — escalating for review' },
    { owner: 'Sarah Chen', ownerType: 'human', timestamp: 'Jun 6, 10:35 AM', status: 'active' },
  ]}
  onViewAudit={() => console.log('Audit')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-handoff-timeline.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-handoff-timeline/ai-handoff-timeline.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
