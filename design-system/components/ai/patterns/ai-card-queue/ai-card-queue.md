# AI Card Queue

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardQueue`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Live view of an agent's execution queue with per-item approval controls, progress tracking, and pause/approve-all governance actions.

The AI Card Queue surfaces the live execution queue for an agent workstream, letting operators monitor progress, approve individual items, and pause or stop execution. It is the primary control surface for AI Led batch processing.

**Export:** `AICardQueue`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-queue/AICardQueue.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-queue/ai-card-queue.md` | This mirror spec |
| `components/ai/organisms/ai-card-queue/ai-card-queue.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-queue/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Monitor · Execute · Confirm |
| Accountability | Approval · Audit trail · Escalation |

## Anatomy

1. **Header** _(Shared)_ — Title + summary + AI Badge (queue variant) counts
2. **Progress Bar** _(Unique)_ — Thin completion bar showing % done
3. **Queue List** _(Unique)_ — Scrollable list of items with status + ETA
4. **Inline Approve** _(Unique)_ — Per-item Approve button for needs-approval items
5. **Action Row** _(Shared)_ — Approve All / Pause / View Details

## State variations

- **Running** _(running)_ — Queue executing — items progressing
- **Needs Approval** _(needs-approval)_ — One or more items blocked on human approval
- **Paused** _(paused)_ — Execution paused by operator
- **Complete** _(complete)_ — All items done — full bar
- **Blocked** _(blocked)_ — Item blocked — queue halted

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Execution Queue"` | Card title |
| `summary` | `string` | `undefined` | Subtitle summary below title |
| `items` | `QueueItem[]` | `required` | Queue items array |
| `onApproveAll` | `() => void` | `undefined` | Approve all handler |
| `onPause` | `() => void` | `undefined` | Pause queue handler |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Progress bar and running badges |

## Flows

### Bulk approval
Operator approves all pending items
- Card shows needs-approval count
- Operator clicks Approve All
- All items transition to complete
- Progress bar fills

## Canonical implementation

```tsx
import { AICardQueue } from '@/components/ai/organisms/ai-card-queue/AICardQueue';

<AICardQueue
  title="Enrichment Queue"
  summary="Enriching 24 accounts with Clearbit data"
  items={[
    { id: '1', label: 'Acme Corp', status: 'complete' },
    { id: '2', label: 'Globex', status: 'running', eta: '~30s' },
    { id: '3', label: 'Initech', status: 'needs-approval' },
  ]}
  onApproveAll={() => console.log('Approve all')}
  onPause={() => console.log('Pause')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-queue.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-queue/ai-card-queue.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
