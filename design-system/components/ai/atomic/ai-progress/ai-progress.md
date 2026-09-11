# AI Progress

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiProgress`  
**Component type:** React control  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`, `components/ai/tokens/motion.md`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Progress that communicates AI work — not just loading. Five variants, eleven states, and semantic color mapping for every agentic outcome: running, paused, blocked, escalated, and complete.

**Export:** `AIProgress`

AIProgress is the canonical progress atom for any surface where ZAIDYN AI is actively working. It extends the standard ZAIDYN progress primitive with the full AI visual language: brand fill gradient, semantic status colors, indeterminate shimmer, and agentic state transitions — paused, blocked, escalated, error, and complete.

Use AIProgress inside AI-driven cards, panels, and command center modules when the work takes more than a brief moment. Do not use it as decoration. Do not fake precise percentages when progress is unknown — use the indeterminate variant instead.

AIProgress differs from the standard ZAIDYN progress component in three ways: it applies AI brand tokens for fill and track, it has native agentic status states (blocked, escalated, paused), and it respects the AI motion system (shimmer on indeterminate, settle on complete, prefers-reduced-motion fallback).

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/progress/AIProgress.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-progress/ai-progress.md` | This mirror spec |
| `components/ai/atomic/ai-progress/ai-progress.preview.html` | Vanilla JS preview port |
| `components/ai/atomic/ai-progress/ai-progress.agent.json` | Agent manifest |
| `components/ai/atomic/ai-progress/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Processing · Generating · Retrieving · Validating · Executing · Monitoring · Pausing · Completing · Blocking · Escalating |
| Accountability | Status · Current step · Percent complete · Saved progress · Pause/cancel availability · Escalation pathway · Audit trail |

## When to use

- When AI work has measurable progress (retrieval, analysis, generation, validation)
- When an agentic workstream is running in the Command Center
- When a multi-agent task has an overall completion state visible to the user
- Inside AI cards, panels, or command center modules when work takes more than a brief moment
- When agentic progress can be blocked, paused, or escalated — use state to communicate that clearly

## When not to use

- Do not use for simple button loading states — use the AIButton loading state instead
- Do not use when ai-loading-indicators (spinner, dots) is enough for a brief wait
- Do not show fake precision when progress is unknown — use indeterminate variant
- Do not use for standard non-AI product progress unless the work is AI-driven
- Do not use orange as the default fill — orange is reserved for blocked/escalated states
- Do not use motion without a reduced-motion fallback

## Anatomy

1. **Track** _(Required)_ — Background bar — AI.color.brandSurface, with brandBorder stroke
2. **Fill** _(Required)_ — Progress fill — brand gradient for running, semantic color for status states
3. **Accessible value label** _(Required)_ — aria-valuenow + aria-label for screen readers; omitted for indeterminate
4. **Percent label** _(Optional)_ — Numeric percent shown inline, enabled via percentLabel prop
5. **Current step label** _(Optional)_ — Step name or action description above the track
6. **Status dot** _(Optional)_ — Color dot indicating state — never used as the only signal
7. **Status pill** _(Optional)_ — Pill badge for terminal states: Complete, Blocked, Failed, Escalated
8. **Estimated time remaining** _(Optional)_ — Sub-label below the track when ETA is known
9. **Step markers** _(Optional)_ — Segment dividers in the segmented variant

## State variations

- **Running (determinate)** _(status=running value=55)_ — Gradient fill at known percent — smooth width transition
- **Indeterminate** _(status=indeterminate)_ — Shimmer animation for active AI work when percent is unknown
- **Paused** _(status=paused value=55)_ — Neutral gray fill; static bar signals saved progress
- **Complete** _(status=complete value=100)_ — Success green fill with settle animation
- **Blocked** _(status=blocked value=50)_ — Signal orange fill with Blocked label — explains what is preventing continuation
- **Error** _(status=error value=50)_ — Error red fill; labels the failure clearly
- **Escalated** _(status=escalated value=70)_ — Deep orange fill — work handed to human review or operations
- **Segmented** _(variant=segmented)_ — Multi-phase bar for workstreams where stage matters more than exact percent
- **Thin embedded** _(variant=thin)_ — 2px bar for use inside card headers or multi-agent modules
- **Header progress** _(variant=header)_ — 4px bar spanning the top edge of a card or panel
- **Reduced motion** _(prefers-reduced-motion)_ — Static striped state replaces shimmer; percent or label conveys state

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `undefined` | Progress value 0–100. Omit for indeterminate. |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `status` | `AIProgressStatus` | `"running"` | idle \| running \| indeterminate \| paused \| resuming \| complete \| blocked \| error \| escalated \| disabled |
| `variant` | `AIProgressVariant` | `"linear"` | linear \| thin \| header \| segmented |
| `size` | `AIProgressSize` | `"md"` | thin (2px) \| sm (4px) \| md (6px) \| lg (10px) |
| `label` | `string` | `undefined` | Primary label shown above or beside the bar |
| `currentStep` | `string` | `undefined` | Step name or action description (e.g. "Step 2 of 5: Analyzing") |
| `percentLabel` | `boolean` | `false` | Show numeric percent alongside the bar |
| `estimatedTimeRemaining` | `string` | `undefined` | ETA sub-label shown below the bar |
| `showLabel` | `boolean` | `true` | Toggle all label rows; set false for thin/header bars |
| `segments` | `AIProgressSegment[]` | `undefined` | Array of segments for the segmented variant |
| `indeterminate` | `boolean` | `false` | Force indeterminate shimmer regardless of value |
| `ariaLabel` | `string` | `undefined` | Accessible label for the progressbar role |

## Tokens

### Fill — active states
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brand` | `#5A6DFF` | Running fill (gradient start) |
| `ai.color.action.primaryHover` | `#4D60E6` | Running fill (gradient end) |

### Fill — semantic states
| Token | Value | Usage |
| --- | --- | --- |
| `var(--success-color)` | `#0A6E5E` | Complete state fill |
| `var(--error-color)` | `#B21111` | Error/failed state fill |
| `SIGNAL[60]` | `#EC7200` | Blocked state fill |
| `SIGNAL[70]` | `#CB6100` | Escalated state fill |
| `NEUTRAL.border` | `#B2B0B6` | Paused state fill |

### Track
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brandSurface` | `#F5F6FF` | Track background for active states |
| `ai.color.brandBorder` | `#D2D6FF` | Track border stroke |

### Tier 3 component tokens (`ai-progress.*`)

| Token | Maps to | Usage |
| --- | --- | --- |
| `ai-progress.fill.running` | `AI.color.brand` | Running fill gradient start |
| `ai-progress.fill.complete` | `var(--success-color)` | Complete fill |
| `ai-progress.fill.blocked` | `SIGNAL[60]` | Blocked fill |
| `ai-progress.fill.escalated` | `SIGNAL[70]` | Escalated fill |
| `ai-progress.fill.error` | `var(--error-color)` | Error fill |
| `ai-progress.fill.paused` | `NEUTRAL.border` | Paused fill |
| `ai-progress.track.default` | `AI.color.brandSurface` | Track background |
| `ai-progress.height.md` | `6px` | Default bar height |

### Motion

| Animation | Duration | Usage |
| --- | --- | --- |
| `ai-indeterminate` | 1500ms ease-in-out | Indeterminate sliding fill |
| `ai-shimmer` | 1400ms ease-in-out | Segmented segment shimmer |
| `ai-progress-settle` | 280ms ease-out | Complete state settle |

## Flows

### AI Assisted analysis
User requests analysis → AIProgress shows retrieval and analysis → result appears
- User submits prompt → status=indeterminate, label="Retrieving territory data"
- Data loaded → status=running value=40, label="Analyzing coverage gaps"
- Analysis complete → status=complete value=100
- AIAnalysisMessage renders below

### AI Led workstream
Command Center workstream progresses through stages; user can pause or escalate
- Workstream starts → segmented variant, first segment running
- Research phase complete → segment 1 status=complete, segment 2 running
- User pauses → status=paused, label="Paused at Analysis phase"
- User resumes → status=resuming → back to running

### Blocked workflow
Progress stops mid-task; user sees reason and can act
- Progress at 50% → status=blocked, label="Blocked: CRM activity data unavailable"
- User reconnects source or escalates
- If escalated → status=escalated, label="Escalated to Territory Operations"

## JavaScript / React API

```tsx
import { AIProgress } from '@/components/ai/atomic/progress/AIProgress';

// Determinate running
<AIProgress
  status="running"
  value={62}
  label="Analyzing territory coverage"
  percentLabel
  estimatedTimeRemaining="~1 min remaining"
  size="md"
/>

// Indeterminate
<AIProgress
  status="indeterminate"
  label="Retrieving ZAIDYN Analytics data..."
  size="md"
/>

// Blocked with reason
<AIProgress
  status="blocked"
  value={50}
  label="Blocked: CRM activity data unavailable"
  size="md"
/>

// Segmented multi-phase
<AIProgress
  variant="segmented"
  label="Q2 Workstream"
  segments={[
    { id: 'research',  label: 'Research',  status: 'complete',  value: 25 },
    { id: 'analyze',   label: 'Analyze',   status: 'running',   value: 25 },
    { id: 'draft',     label: 'Draft',     status: 'idle',      value: 25 },
    { id: 'review',    label: 'Review',    status: 'idle',      value: 25 },
  ]}
/>

// Thin embedded (inside a card header)
<AIProgress variant="thin" status="running" value={40} ariaLabel="Card loading" />
```

## Agent rules

1. Read this mirror spec and `ai-progress.agent.json` before implementing.
2. Do not hardcode brand hex — use `AI.*`, `NEUTRAL.*`, `SIGNAL`, and CSS vars.
3. Copy canonical `AIProgress.tsx` verbatim — do not fabricate status colors or motion.
4. Use indeterminate when percent is unknown — never fake precision.
5. Orange fill is reserved for blocked/escalated only — running uses brand gradient.
6. All motion must respect `prefers-reduced-motion: reduce`.

Full agent contract: `components/ai/atomic/ai-progress/ai-progress.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order