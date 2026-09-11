# AI Agent Task Tracker

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiAgentTaskTracker`  
**Component type:** React page  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Persistent task supervision · Needs Input resolution · Bidirectional UI + natural-language mutation

AIAgentTaskTracker is the AI-led supervisory workspace for delegated agentic work. A persistent task registry shows every task a user has delegated to one or more agents, along with the original intent, the mutable execution parameters, the assigned agent or agent stack, the task status, the proactive health signal, and the next action. A Smart-Assist supervisor agent companion strip (AI_RAMP tan) sits at the top of the page; Proactive Agentic Insights surface signals before the user has to ask; a natural-language command bar at the bottom lets the user mutate any task in plain language, with conflict resolution if a structured UI edit and a natural-language edit disagree. Default preview is Rich; full governance example is Robust. No teal anywhere — AI emphasis uses AI_RAMP blue (#4D60E6); Guild orange is reserved for Needs Input / blocked / warning / pending approval; AI_RAMP tan stays on the supervisor agent surface only.

**Export:** `AIAgentTaskTracker`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/pages/ai-agent-task-tracker/AIAgentTaskTracker.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-agent-task-tracker/ai-agent-task-tracker.md` | This mirror spec |
| `components/ai/pages/ai-agent-task-tracker/ai-agent-task-tracker.agent.json` | Agent manifest |
| `components/ai/pages/ai-agent-task-tracker/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive · AI Assisted |
| AI behavior | Monitor · Summarize · Prioritize · Validate · Execute · Escalate · Review · Explain · Ask / clarify · Recommend · Retrieve |
| Accountability | Durable task ID · Intent · Mutable parameters · Sources · Rationale · Confidence · Risk · Data freshness · Health · Human review · Approval · Audit trail · Owner · Undo · Process trace · Escalation · Permission state · Review status |

## When to use

- Users need to monitor delegated AI tasks
- Multiple tasks or agents are active
- Task state must persist across sessions
- Users need to resolve missing input
- Users need proactive task health insights
- Users need to edit tasks through UI or natural language
- Tasks need cross-device supervision
- Human review, approval, or audit is required

## When not to use

- A single simple task can be shown in ai-to-do
- A simple status card is enough
- The user only needs a notification
- A full task registry is not required
- The workflow does not involve agentic task delegation
- The output is only a static report

## Anatomy

1. **Page header** _(Unique)_ — Smart Assist supervisor agent companion strip (AI_RAMP tan) + page title + global actions (New task, Review Needs Input, View process trace, Export, Settings).
2. **Summary metric row** _(Shared)_ — 4 AICardMetric tiles (Active, Needs Input, Scheduled, Health risks). Robust adds Recurring, Completed today, Blocked, Pending approval — 8 total.
3. **Proactive Agentic Insights** _(Shared)_ — AIInsightList composing AIAnalysisInsight rows on a brand-tinted surface. Each insight ends in an action link.
4. **Filter + control bar** _(Unique)_ — Pill filter chips with live counts (Needs Input chip is always orange when > 0) + Search + Sort + List/Board toggle.
5. **Task registry** _(Unique)_ — AIAgentTaskCard list. Rich page upgrades Needs-Input and Pending-approval tasks to Rich density automatically; Robust page renders every card at Robust.
6. **Task detail panel** _(Unique)_ — Right-side panel — Robust card + AIRationalePanel + activity timeline of AIAgentWorkNote rows.
7. **NL mutation bar** _(Unique)_ — Bottom-anchored input strip. AI gradient avatar + free-text command + Attach + Send. Conflict surfaces in a modal.
8. **Mobile companion** _(Shared)_ — Standalone AIAgentTaskTrackerMobile component — two AINotification cards with inline action buttons.

## State variations

- **Basic** _(density="basic" + supervisorTone="dark")_ — Header + summary row + dense list (Basic cards). MVP scope — pairs the basic density with the dark ai-ramp-100 supervisor bar.
- **Simple** _(density="simple")_ — Adds NL command bar + simple task cards.
- **Rich (default)** _(density="rich")_ — Adds Agentic Insights + Rich cards + detail drawer.
- **Robust** _(density="robust")_ — Full governance: Robust cards + bidirectional mutation + review/approval + audit trail.
- **Needs Input resolution** _(flow="needs-input")_ — Default density with the Needs-Input task selected; suggestion chips visible.
- **Conflict resolution** _(flow="conflict")_ — Modal showing panel edit vs natural-language edit side by side.
- **Mobile companion** _(mobile)_ — Standalone push view with Needs Input + Insight cards and inline actions.
- **Empty (no active tasks)** _(flow="empty")_ — Page-level empty state — no metrics, no insights, calm empty card.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `'basic' \| 'simple' \| 'rich' \| 'robust'` | `'rich'` | Content density of the whole page — gates summary card count, insights region, detail panel, and task-card density. |
| `flow` | `'default' \| 'needs-input' \| 'conflict' \| 'empty'` | `'default'` | Selects the rendered scenario for previews + demos. Conflict overlays the modal; empty hides metrics + insights + filters. |
| `supervisorAgent` | `{ name; tasksTracked; lastUpdated? }` | `Smart Assist · 7 tasks` | Header companion strip identity. |
| `tasks` | `AIAgentTaskCardProps[]` | `SAMPLE_TASKS` | Data-driven task list. Each task is an AIAgentTaskCard props object. |
| `selectedTaskId` | `string` | `undefined` | Initial selected task id for the detail panel. |
| `layout` | `'list' \| 'board'` | `'list'` | Registry layout. |
| `onNewTask` | `() => void` | `undefined` | Header New task action. |
| `onReviewNeedsInput` | `() => void` | `undefined` | Header Review Needs Input action. |
| `onSettings` | `() => void` | `undefined` | Header Settings action. |

## Tokens

### Page surface
| Token | Value | Usage |
| --- | --- | --- |
| `page.bg` | `#F7F8FC` | Neutral enterprise canvas (no AI gradient on root) |
| `supervisor.surface` | `COMPANION_TAN[‘00’]` | Smart Assist companion strip background |
| `supervisor.border` | `COMPANION_TAN[30]` | Companion strip border |
| `supervisor.ink` | `COMPANION_TAN[100]` | Companion strip text |

### AI emphasis
| Token | Value | Usage |
| --- | --- | --- |
| `insights.surface` | `var(--ai-brand-surface)` | Proactive Agentic Insights container |
| `insights.border` | `var(--ai-brand-border)` | Insights container border |
| `avatar.gradient` | `AI.gradient.action.full` | Supervisor + NL bar avatar |
| `filter.active.bg` | `var(--ai-brand-surface)` | Active filter chip background |

### Needs Input (Guild orange — 10% accent rule)
| Token | Value | Usage |
| --- | --- | --- |
| `needsinput.chip.bg` | `SIGNAL_ORANGE[10]` | Active Needs-Input filter chip when count > 0 |
| `needsinput.chip.border` | `SIGNAL_ORANGE[40]` | Active Needs-Input filter chip border |
| `needsinput.chip.text` | `SIGNAL_ORANGE[80]` | Active Needs-Input filter chip text |
| `task.ribbon` | `SIGNAL_ORANGE[60]` | Left ribbon on Needs Input / escalated / pending-approval task cards |

## Flows

### Create delegated task
User creates a task through natural language.
- User types intent in the NL command bar
- Supervisor agent creates a persistent task record with a durable ID, original intent, and mutable parameters
- Task appears in the registry with status="pending" or "active"

### Resolve Needs Input
Worker agent detects a missing parameter.
- Task enters status="needs-input"; orange ribbon + Needs Input panel render on the card
- User picks a suggestion chip OR clicks Reply…
- Task resumes; activity timeline records the resolution

### Modify task through UI
Structured UI edit of mutable parameters.
- User opens the detail panel and edits mutable parameters
- Original intent stays unchanged
- Change Summary records the diff (linked from detail panel)

### Modify task through NL
Natural-language mutation.
- RiUserLine types e.g. "RiDragMoveLine this to next week and make it monthly"
- Supervisor parses command into intended parameter mutation + preview
- User confirms; mutation applies to mutable parameters; intent unchanged

### Resolve conflict
Structured + NL edits conflict.
- Conflict resolution modal renders both proposed changes
- User picks Keep panel edit / Keep NL edit / Merge / Cancel
- Nothing is applied silently

### Proactive health monitoring
Insight surfaces a task health risk.
- Health monitor detects outreach risk from CRM + email signals
- Insight appears in Proactive Agentic Insights — recommends action
- RiUserLine picks "Schedule a visit…" → creates a follow-up task

### Cross-device resolution
Mobile push resolves Needs Input.
- User receives mobile push via AIAgentTaskTrackerMobile
- RiUserLine taps "Use June 10th" inline
- Desktop task registry updates; task resumes

### Approval workflow
High-stakes change.
- AI recommends a parameter change with business impact
- User sends for approval instead of applying
- Task enters status="pending-approval" with orange ribbon + reviewer line

## Canonical implementation

```tsx
import { AIAgentTaskTracker } from '@/components/ai/pages/ai-agent-task-tracker/AIAgentTaskTracker';
import { AIAgentTaskTrackerMobile } from '@/components/ai/pages/ai-agent-task-tracker/AIAgentTaskTrackerMobile';

<AIAgentTaskTracker
  density="rich"
  supervisorAgent={{ name: 'Smart Assist', tasksTracked: 7, lastUpdated: 'Updated 2m ago' }}
  onNewTask={() => { /* open New Task dialog */ }}
  onReviewNeedsInput={() => { /* filter to Needs Input */ }}
  onSettings={() => { /* open settings */ }}
/>

// Mobile companion (rendered separately on small viewports / native push):
<AIAgentTaskTrackerMobile
  onUseSuggestion={() => { /* mutate task */ }}
  onReply={() => { /* open reply composer */ }}
  onApproveVisit={() => { /* create follow-up task */ }}
  onDismiss={() => { /* dismiss insight */ }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-agent-task-tracker.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-agent-task-tracker/ai-agent-task-tracker.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
