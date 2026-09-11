# AI Agent Task Card

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiAgentTaskCard`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Delegated task record · 4 densities · Needs Input + Health surfaced

AIAgentTaskCard is the supporting Group for the AI Agent Task Tracker page pattern, but it is also reusable on its own anywhere a single delegated AI task must be represented — in queues, drawers, dashboards, board columns, or notification surfaces. One component, four density variants: Basic (title + status + agent), Simple (adds task type + progress + primary action), Rich (adds intent, mutable parameters, health, confidence/risk, sources, rationale links), Robust (adds agent stack, Needs Input flow, review/approval state, sources, primary + secondary action row). Status and health always pair a glyph WITH a text label — never color alone. Needs Input rows use ZS orange only; AI emphasis uses ZSAI blue (AI.color.brand). No teal anywhere.

**Export:** `AIAgentTaskCard`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-agent-task-card/AIAgentTaskCard.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-agent-task-card/ai-agent-task-card.md` | This mirror spec |
| `components/ai/organisms/ai-agent-task-card/ai-agent-task-card.agent.json` | Agent manifest |
| `components/ai/organisms/ai-agent-task-card/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Monitor · Summarize · Validate · Ask / clarify · Recommend · Execute |
| Accountability | Durable task ID · Intent · Mutable parameters · Sources · Confidence · Risk · Data freshness · Health · Human review · Approval · Owner · Process trace |

## When to use

- Representing a single delegated AI task in any list, drawer, dashboard, board column, or notification
- Surfacing Needs Input + suggestion resolution next to the task itself
- Showing confidence + risk + sources on a consequential agentic task

## When not to use

- For a step inside one in-flight narration — use AIToDo
- For a queue of mixed work items where the durable task identity is not preserved — use AICardQueue
- For a multi-task project / workstream — use AICardWorkstream
- For an agent persona introduction — use AICardAgent

## Anatomy

1. **Card surface** _(Shared)_ — var(--ai-card-bg) + var(--ai-card-border). Left ribbon turns ZS orange for needs-input / escalated / pending-approval, red for blocked / failed.
2. **Status pill** _(Shared)_ — AIStatusPill — top-right; glyph + label.
3. **Health badge** _(Shared)_ — Glyph + label badge; success / warning / critical / info tones.
4. **Task ID + type** _(Unique)_ — Durable task identifier (T-XXXX) + task type icon (immediate / scheduled / recurring).
5. **Intent strip** _(Unique)_ — Original intent quotation with brand-left rule. Rich + Robust only.
6. **Parameter chips** _(Unique)_ — Mutable params show edit glyph + brand-tinted chip; immutable params show neutral chip.
7. **Progress** _(Shared)_ — AIProgress — maps task status to running / complete / blocked / paused / escalated.
8. **Needs Input panel** _(Unique)_ — Orange-left, orange-tinted panel with gap, why-needed, and up to three suggestion chips + Reply…
9. **Sources row** _(Shared)_ — Outlined chips with doc glyph + freshness — Rich + Robust only.
10. **Action footer** _(Shared)_ — AIButton primary + secondary; AITextLink for View rationale / trace / sources.

## State variations

- **Basic · Active** _(density="basic" · status="active")_ — 2-row layout — title on row 1, status pill + ID + agent on row 2.
- **Basic · Needs Input** _(density="basic" · status="needs-input")_ — The needs-input gap is rendered inline next to the status pill on row 2.
- **Basic · Pending Approval** _(density="basic" · status="pending-approval")_ — Compact pending-approval row for the dense list.
- **Simple · Active** _(density="simple" · status="active")_ — Title + status pill + progress + primary action. Compact card chrome.
- **Simple · Needs Input** _(density="simple" · status="needs-input")_ — Surfaces the Needs Input panel inline + sources footnote + Resolve input action.
- **Simple · Pending Approval** _(density="simple" · status="pending-approval")_ — Progress + Send for approval action in the tinted action footer.
- **Rich** _(density="rich")_ — Adds the intent strip + Needs Input panel under the title. No parameter chips, no confidence/risk row.
- **Robust** _(density="robust")_ — Full governance: agent stack, sources, review state, primary + secondary action bar.
- **Blocked / Failed** _(status="blocked")_ — Critical pill + Retry action. Blocked actions explain why in the parameter strip.
- **Selected** _(selected={true})_ — Brand border + brand glow ring; aria-pressed="true".

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `'basic' \| 'simple' \| 'rich' \| 'robust'` | `—` | Required. Drives which fields render. |
| `taskId` | `string` | `—` | Durable task identifier, e.g. T-3091. |
| `title` | `string` | `—` | Task title. |
| `taskType` | `'immediate' \| 'scheduled' \| 'recurring'` | `—` | Task execution type. Drives the leading glyph. |
| `status` | `14-value union` | `—` | Workflow state. See AIAgentTaskStatus. |
| `health` | `AIAgentTaskHealth` | `undefined` | Task-level health signal. Adds a glyph + label badge. |
| `agent` | `{ name; role? }` | `undefined` | Assigned worker agent for Basic / Simple / Rich. |
| `agentStack` | `AIAgentSummary[]` | `undefined` | Robust only. Shown via AIAgentStack. |
| `originalIntent` | `string` | `undefined` | Quoted intent strip — Rich + Robust. |
| `parameters` | `{ key; value; mutable }[]` | `undefined` | Mutable params are brand-tinted with edit glyph. |
| `progress` | `number 0–100` | `undefined` | Renders AIProgress with status-mapped fill. |
| `needsInput` | `{ gap; whyNeeded?; suggestions? }` | `undefined` | When present, renders the orange Needs Input panel. |
| `confidence` | `'high' \| 'medium' \| 'low'` | `undefined` | Rich + Robust only. |
| `risk` | `'none' \| 'low' \| 'medium' \| 'high'` | `undefined` | Pairs with confidence in AIConfidenceRiskBadge. |
| `sources` | `{ label; freshness? }[]` | `undefined` | Outlined chips. Rich + Robust only. |
| `reviewState` | `{ label; reviewer? }` | `undefined` | Robust only. Brand-tinted reviewer row. |
| `primaryAction` | `{ label; onClick?; status? }` | `undefined` | AIButton variant="primary". |
| `secondaryActions` | `{ label; onClick? }[]` | `undefined` | Robust only. AIButton variant="secondary" each. |
| `selected / onClick` | `boolean / () => void` | `undefined` | When onClick is set the card becomes role="button". |
| `onViewRationale / onViewTrace / onViewSources / onResolveInput` | `() => void` | `undefined` | Optional link + suggestion handlers. |

## Tokens

### Card surface
| Token | Value | Usage |
| --- | --- | --- |
| `card.bg` | `var(--ai-card-bg)` | Default card background |
| `card.border` | `var(--ai-card-border)` | Default 1px stroke |
| `card.selected.border` | `AI.color.brand` | Selected stroke + 2px brand glow |

### Status ribbons (left edge, 4px)
| Token | Value | Usage |
| --- | --- | --- |
| `ribbon.needs-input` | `ZS_ORANGE[60]` | needs-input / escalated / pending-approval |
| `ribbon.blocked` | `error` | blocked / failed / rejected |
| `ribbon.success` | `#1F6B40` | completed / approved |
| `ribbon.default` | `card.border` | all other statuses |

### AI emphasis
| Token | Value | Usage |
| --- | --- | --- |
| `intent.rule` | `AI.color.brand` | Left rule on intent strip |
| `param.mutable.bg` | `var(--ai-brand-surface)` | Mutable parameter chip |
| `param.mutable.border` | `var(--ai-brand-border)` | Mutable parameter chip border |

### Needs Input panel
| Token | Value | Usage |
| --- | --- | --- |
| `needsinput.bg` | `ZS_ORANGE[‘00’]` | Panel surface |
| `needsinput.border` | `ZS_ORANGE[20]` | Panel border |
| `needsinput.rule` | `ZS_ORANGE[60]` | 4px left rule |

## Flows

### Render a Needs-Input task
Standard supervised flow when an agent cannot continue.
- Pass status="needs-input" and a needsInput object
- Suggestions render as chips; user picks one or clicks Reply…
- Implement onResolveInput to apply the suggestion + advance the task

### Surface confidence + risk + sources
When the card is consequential.
- Set confidence + risk to render AIConfidenceRiskBadge
- Pass sources to render outlined source chips with freshness
- Wire onViewRationale to open AIRationalePanel in the parent surface

### Robust review + approval
High-stakes governance.
- Pass agentStack, reviewState, primaryAction="Send for approval", secondaryActions ["Pause", "Edit parameters", "Escalate"]
- Pending-approval status surfaces an orange ribbon + reviewer line
- Wire onViewSources / onViewTrace / onViewRationale to the audit surfaces

## Canonical implementation

```tsx
import { AIAgentTaskCard } from '@/components/ai/organisms/ai-agent-task-card/AIAgentTaskCard';

<AIAgentTaskCard
  density="rich"
  taskId="T-3091"
  title="Email Dr. John Lee about Lectrazine clinical trial data"
  taskType="scheduled"
  status="needs-input"
  health="needs-attention"
  agent={{ name: 'Outreach Agent', role: 'Worker' }}
  originalIntent="Share Lectrazine clinical trial data with Dr. Lee ahead of his next site visit."
  parameters={[
    { key: 'Recipient', value: 'Dr. John Lee',    mutable: false },
    { key: 'Send date', value: 'Not confirmed',   mutable: true  },
    { key: 'Channel',   value: 'Email',           mutable: true  },
  ]}
  needsInput={{
    gap: 'No send date confirmed',
    whyNeeded: 'RxVantage shows Dr. Lee’s next visit is June 12.',
    suggestions: ['Send June 10th', 'Invite the MSL'],
  }}
  confidence="medium" risk="medium"
  primaryAction={{ label: 'Resolve input', onClick: () => { /* … */ } }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-agent-task-card.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-agent-task-card/ai-agent-task-card.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
