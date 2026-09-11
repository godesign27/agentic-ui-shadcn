# AI Card Brief

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardBrief`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Pre-execution brief for an agent task. Surfaces goal, data sources, constraints, and output format so humans can review and approve before the AI acts.

The AI Card Brief surfaces the structured task brief for an agent, showing goal, data sources, constraints, and expected output. It is the foundational transparency layer for AI Led experiences — always surfaced before an agent executes a consequential action.

**Export:** `AICardBrief`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-brief/AICardBrief.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-brief/ai-card-brief.md` | This mirror spec |
| `components/ai/organisms/ai-card-brief/ai-card-brief.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-brief/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Confirm · Execute |
| Accountability | Approval · Audit trail · Rationale |

## Anatomy

1. **Attribution Header** _(Shared)_ — AIAvatar + agent name + AIChipBrief status badge
2. **Goal Block** _(Unique)_ — Plain-text goal statement with GOAL label
3. **Sources List** _(Unique)_ — Linked data sources with AIWhyThisLink
4. **Constraints Block** _(Unique)_ — Bullet list of agent constraints
5. **Output Format Note** _(Unique)_ — Expected output format descriptor
6. **Action Row** _(Shared)_ — Run / Edit / Save / Cancel buttons

## State variations

- **Default** _(status=default)_ — Brief ready to review before execution.
- **Running** _(status=running)_ — Agent executing — actions grayed out.
- **Ready** _(status=ready)_ — Brief validated and ready to run.
- **Edited** _(status=edited)_ — Brief modified — unsaved changes indicated.
- **Waiting Approval** _(status=waiting-approval)_ — Awaiting human approval to proceed.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `agentName` | `string` | `"Research Agent"` | Display name of the agent |
| `goal` | `string` | `required` | Task goal statement shown in GOAL block |
| `sources` | `string[]` | `[]` | Data sources list |
| `constraints` | `string[]` | `[]` | Agent constraints list |
| `outputFormat` | `string` | `undefined` | Expected output format description |
| `status` | `BriefChipStatus` | `"default"` | Status chip state |
| `onRun` | `() => void` | `undefined` | Run button handler |
| `onEdit` | `() => void` | `undefined` | Edit button handler |

## Tokens

### Surface
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-surface-default` | `#F5F6FF` | Card and header backgrounds |

### Border
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-border-default` | `#BECAFE` | Card and section dividers |

## Flows

### Pre-execution review
Human reviews brief before agent runs
- Brief Card shown
- Human reviews goal/constraints
- Clicks Run
- Status transitions to running
- Card collapses to status view

## Canonical implementation

```tsx
import { AICardBrief } from '@/components/ai/organisms/ai-card-brief/AICardBrief';

<AICardBrief
  agentName="Research Agent"
  goal="Summarize Q2 performance across all EMEA accounts and flag accounts at risk."
  sources={['Salesforce CRM', 'Amplitude Analytics']}
  constraints={['Max 3 pages', 'English only', 'No PII']}
  outputFormat="Structured JSON + Executive summary PDF"
  status="ready"
  onRun={() => console.log('Run')}
  onEdit={() => console.log('Edit')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-brief.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-brief/ai-card-brief.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
