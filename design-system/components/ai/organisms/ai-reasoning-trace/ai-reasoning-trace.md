# AI Process Trace

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiReasoningTrace`  
**Component type:** React organism  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Governed process telemetry, not private reasoning. Shows what the AI system did — step by step — so users, admins, and governance reviewers can inspect execution without seeing internal deliberation.

AI Process Trace is the step-level execution transparency component for the Guild AI Design System. It shows what process steps, agents, tools, and validations occurred behind the scenes to produce an AI output — not why the output makes sense (that is AI Rationale).

**Export:** `AIReasoningTrace`

Use AI Process Trace when users, admins, support teams, or governance reviewers need to inspect how an AI output moved through planning, routing, retrieval, validation, execution, and finalization.

**AI Process Trace vs AI Rationale — they are sibling patterns, not alternatives:**
- **AI Rationale** explains the output in human-readable business terms: what the AI found, why it matters, what alternatives were considered, and what assumptions it made.
- **AI Process Trace** shows the execution record: which agents ran, what tools were called, how long each step took, and what status each step reached.

AI Rationale may link to AI Process Trace when users want deeper process context. AI Response Footer may include a "View process trace" link. Never merge the two by default.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-reasoning-trace/AIReasoningTrace.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-reasoning-trace/ai-reasoning-trace.md` | This mirror spec |
| `components/ai/organisms/ai-reasoning-trace/ai-reasoning-trace.agent.json` | Agent manifest |
| `components/ai/organisms/ai-reasoning-trace/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Plan · Route · Retrieve · Validate · Execute · Monitor · Handoff · Finalize · Escalate |
| Accountability | Status · Agent role · Tool or service used · Source retrieval summary · Permissions validation · Timing or latency · Owner · Audit trail · Error or blocked reason · Completion state |

## When to use

- When users need visibility into agent execution steps
- When AI Led workflows require operational transparency for admins or governance reviewers
- When a workflow is blocked, failed, or escalated and users need to understand what stopped it
- When support teams need to inspect what the AI system did to produce an output
- When an AI output requires audit-ready process context
- When a complex multi-agent workflow needs step-level traceability

## When not to use

- Do not use for every simple AI response — use AI Rationale instead
- Do not use as a replacement for AI Rationale (they are siblings, not substitutes)
- Do not show raw hidden chain-of-thought or internal model deliberation
- Do not expose sensitive prompts, user data, or private model reasoning
- Do not overwhelm business users with technical process details by default — use mode="presentation" or keep collapsed
- Do not show fabricated timings, agent names, or tool invocations

## Anatomy

1. **Header** _(Required)_ — Bot icon + title + overall status badge + step count + collapse toggle
2. **Overall status badge** _(Required)_ — Pill badge: Running, Done, Blocked, Failed, Escalated, Needs review
3. **Collapse control** _(Required)_ — Chevron button that collapses and expands the entire trace body
4. **Step number** _(Required)_ — Sequential integer; color reflects step status
5. **Step status icon** _(Required)_ — Unique icon per status — never relies on color alone
6. **Role badge** _(Required)_ — Semantic color badge: Planner, Router, Retriever, Validator, Executor, Reviewer, Memory, Tool, Human, System
7. **Step label** _(Required)_ — Action description, truncated with ellipsis on overflow
8. **Duration** _(Optional)_ — Mono-spaced timing string; hidden in presentation mode
9. **Expand chevron** _(Optional)_ — Reveals step detail row — only shown when step has detail data
10. **Expanded detail** _(Optional)_ — Short audit-safe fact text + metadata chips (agent, tool, owner, timestamp)
11. **Step connector line** _(Shared)_ — Thin vertical line between steps; color reflects upstream step status
12. **Footer actions** _(Optional)_ — Ghost links: Copy trace, View rationale, View sources, View audit trail
13. **Expand/collapse all** _(Optional)_ — Two ghost links in the sub-header strip for power users and audit mode

## State variations

- **Collapsed** _(defaultExpanded=false)_ — Header and status only — default for business-user contexts
- **Compact running** _(status=running)_ — Expanded steps with active step highlighted and spinner; durations visible
- **Done** _(status=complete)_ — All steps complete with success icon and green Done badge
- **Blocked** _(status=blocked)_ — Stopped at blocked step with orange indicator; escalate action available
- **Failed** _(status=failed)_ — Error state with red border and failure detail in expanded step row
- **Escalated** _(status=escalated)_ — Handoff state; orange accent; escalated step shows owner field
- **All steps open** _(expandAll)_ — Every step expanded to show detail text and metadata chips
- **Audit mode** _(mode=audit)_ — Progress bar in header, all durations and metadata visible, audit trail link in footer
- **Presentation mode** _(mode=presentation)_ — Simplified view with durations hidden — suitable for business user contexts
- **Needs review** _(status=needsReview)_ — Orange badge prompts human review; review link surfaced in footer

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"AI Process Trace"` | Display title in the header row |
| `status` | `TraceOverallStatus` | `required` | running \| complete \| blocked \| failed \| escalated \| needsReview |
| `steps` | `TraceStep[]` | `required` | Ordered array of trace step objects |
| `defaultExpanded` | `boolean` | `false` | Start with the trace body visible |
| `expandedStepIds` | `string[]` | `[]` | IDs of steps that start pre-expanded |
| `allowExpandAll` | `boolean` | `true` | Show Expand all / Collapse all controls |
| `allowCopy` | `boolean` | `true` | Show Copy trace action in footer |
| `showDurations` | `boolean` | `true` | Show per-step timing strings |
| `showAuditLink` | `boolean` | `false` | Show View audit trail link in footer |
| `showRationaleLink` | `boolean` | `false` | Show View rationale link in footer |
| `showSourcesLink` | `boolean` | `false` | Show View sources link in footer |
| `mode` | `TraceMode` | `"technical"` | business \| technical \| audit \| presentation |
| `compact` | `boolean` | `false` | Reduce row height and padding — for embedded contexts |
| `onToggle` | `(expanded: boolean) => void` | `undefined` | Called when the trace header is toggled |
| `onToggleStep` | `(id, expanded) => void` | `undefined` | Called when a step row is expanded or collapsed |
| `onCopyTrace` | `() => void` | `undefined` | Called after clipboard copy |
| `onViewAuditTrail` | `() => void` | `undefined` | Called when View audit trail is clicked |
| `onViewRationale` | `() => void` | `undefined` | Called when View rationale is clicked |
| `onRetryStep` | `(id: string) => void` | `undefined` | Called when Retry is clicked on a failed step |
| `onEscalateStep` | `(id: string) => void` | `undefined` | Called when Escalate is clicked on a blocked step |

## Tokens

### AI identity (header + active steps)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#4D60E6` | Running step icon, header spinner, expand controls |
| `AI.color.brandSurface` | `#F5F6FF` | Expanded step detail background, row hover |
| `AI.color.brandBorder` | `#BECAFE` | Container border (default), step dividers, connector lines |

### Semantic step states
| Token | Value | Usage |
| --- | --- | --- |
| `var(--success-color)` | `#0A6E5E` | Complete step icon, complete step number color |
| `var(--error-color)` | `#B21111` | Failed step icon, failed step label, container border on failure |
| `SIGNAL_ORANGE[70]` | `#CB6100` | Blocked/escalated step icon and label, warning icon |
| `SIGNAL_ORANGE[60]` | `#EC7200` | Warning step icon, needs-review badge |

### Role badges
| Token | Value | Usage |
| --- | --- | --- |
| `Validator badge` | `SIGNAL_ORANGE[70] / SIGNAL_ORANGE[00]` | Validator role — orange only for permission/validation roles |
| `Retriever badge` | `#2980B9 / #EBF5FB` | Retriever role — information blue |
| `Router badge` | `#0DACAD / #f1feff` | Router role — teal routing indicator |
| `Memory badge` | `#7A5944 / #F6F2EB` | Memory role — companion tan palette |

## Flows

### AI Led workflow trace
User asks Guild to generate an approval workflow → trace shows planner, router, retriever, validator and executor steps → output completes
- User submits prompt in Command Center
- AI Process Trace renders collapsed below response
- User expands trace → 7 steps visible, all complete with durations
- User expands Planner step → sees intent classification detail
- RiUserLine reads "Identified intent: workflow generation" and trusts the output

### Blocked trace
Agent cannot continue because permission validation fails → blocked step expands → user escalates or requests access
- Trace reaches Validator step → status=blocked
- Overall badge changes to Blocked; orange border appears on container
- RiUserLine expands blocked step → sees "User does not have workflow_create scope"
- Escalate link appears → user clicks → status=escalated, owner field populated

### Rationale connection
User opens Why this? from response footer → AI Rationale opens → user selects View process trace → AI Process Trace opens
- User sees AI output in assistant panel
- Clicks "Why this?" in AIResponseFooter
- AIRationale opens with business explanation
- RiUserLine clicks "View process trace" link in rationale footer
- AIReasoningTrace opens expanded below rationale

### Audit review
Governance reviewer inspects a completed workflow trace in audit mode
- Reviewer opens trace with mode="audit"
- Progress bar in header shows 100% complete
- All step timings, agent names, source counts visible
- Reviewer clicks "View audit trail" in footer → full audit log opens

## Canonical implementation

```tsx
import { AIReasoningTrace } from '@/components/ai/organisms/ai-reasoning-trace/AIReasoningTrace';
import type { TraceStep } from '@/components/ai/organisms/ai-reasoning-trace/AIReasoningTrace';

const steps: TraceStep[] = [
  { id: 'p1',  role: 'planner',   label: 'Parsing prompt',         status: 'complete', duration: '0.3s',
    detail: 'Identified intent: workflow generation. Entities: approval flow, Q3 budget.' },
  { id: 'r1',  role: 'router',    label: 'Routing to agents',      status: 'complete', duration: '0.1s',
    detail: 'Selected Retrieval Agent, Validation Agent and Executor Agent.' },
  { id: 're1', role: 'retriever', label: 'Fetching context',       status: 'complete', duration: '1.2s',
    detail: 'Pulled 4 relevant workflows. Similarity threshold: 0.82.', sourceCount: 4 },
  { id: 'v1',  role: 'validator', label: 'Validating permissions', status: 'complete', duration: '0.4s',
    detail: 'User has workflow_create scope. Quota: 3 of 10.' },
  { id: 'e1',  role: 'executor',  label: 'Generating step graph',  status: 'complete', duration: '2.1s' },
  { id: 'v2',  role: 'validator', label: 'Validating graph',       status: 'complete', duration: '0.6s' },
  { id: 'e2',  role: 'executor',  label: 'Finalizing output',      status: 'complete', duration: '0.9s' },
];

// Default (collapsed)
<AIReasoningTrace status="complete" steps={steps} />

// Expanded with rationale + audit links
<AIReasoningTrace
  status="complete"
  steps={steps}
  defaultExpanded
  showRationaleLink
  showAuditLink
  mode="audit"
  onViewRationale={() => setRationaleOpen(true)}
  onViewAuditTrail={() => navigate('/audit/' + traceId)}
/>

// Blocked trace
<AIReasoningTrace
  status="blocked"
  steps={blockedSteps}
  defaultExpanded
  onEscalateStep={(id) => escalate(id)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-reasoning-trace.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-reasoning-trace/ai-reasoning-trace.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
