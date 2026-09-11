# AI Workstream Control Panel

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiWorkstreamControlPanel`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Command-center surface for long-running multi-step AI workflows. Combines step stepper, progress tracking, execution controls, and governance actions in one panel.

The Workstream Control Panel is the command-center surface for long-running multi-step AI workflows. It combines a numbered step stepper with visual connectors, a granular progress bar, an inline checkpoint note, the full AIControlBar for state-aware execution controls, and lower-level rollback/escalate actions.

**Export:** `AIWorkstreamControlPanel`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-workstream-control-panel/AIWorkstreamControlPanel.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-workstream-control-panel/ai-workstream-control-panel.md` | This mirror spec |
| `components/ai/organisms/ai-workstream-control-panel/ai-workstream-control-panel.agent.json` | Agent manifest |
| `components/ai/organisms/ai-workstream-control-panel/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Execute · Monitor · Pause · Redirect |
| Accountability | Rollback · Escalation · Approval · Audit trail |

## Anatomy

1. **Header** _(Shared)_ — Title + progress percentage
2. **Progress Bar** _(Shared)_ — Thin bar with percentage fill
3. **Step Stepper** _(Unique)_ — Numbered circles + connector lines + labels
4. **Checkpoint Note** _(Unique)_ — Contextual info note below stepper
5. **AIControlBar** _(Shared)_ — State-aware execution controls
6. **Governance Row** _(Unique)_ — Rollback + Escalate buttons

## State variations

- **Running** _(controlState=running)_ — Workstream executing — Pause/Cancel visible
- **Paused** _(controlState=paused)_ — Execution paused — Resume/Cancel visible
- **Redirect Available** _(controlState=redirect-available)_ — Alternative path offered
- **Cancel Confirm** _(controlState=cancel-confirm)_ — Confirmation dialog for cancel
- **Saved Progress** _(controlState=saved-progress)_ — Checkpoint saved confirmation

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `steps` | `WorkstreamStep[]` | `required` | Steps array with label and complete flag |
| `currentStep` | `number` | `required` | Zero-based index of active step |
| `progress` | `number` | `required` | Progress percentage 0–100 |
| `controlState` | `ControlBarState` | `required` | AIControlBar state |
| `checkpointNote` | `string` | `undefined` | Contextual note displayed below stepper |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Progress bar and completed step circles |

### Companion
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-companion-paper` | `#F6F2EB` | Checkpoint note background |

## Flows

### Mid-run pause and resume
Operator pauses and resumes
- Panel shows running state
- Operator clicks Pause
- controlState → paused
- Resume button appears
- Operator clicks Resume
- controlState → running

## Canonical implementation

```tsx
import { AIWorkstreamControlPanel } from '@/components/ai/organisms/ai-workstream-control-panel/AIWorkstreamControlPanel';

<AIWorkstreamControlPanel
  steps={[
    { label: 'Research', complete: true },
    { label: 'Analyze', complete: true },
    { label: 'Draft', complete: false },
    { label: 'Review', complete: false },
  ]}
  currentStep={2}
  progress={55}
  controlState="running"
  checkpointNote="Drafting executive summary — estimated 2 minutes remaining."
  onPause={() => console.log('Pause')}
  onCancel={() => console.log('Cancel')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-workstream-control-panel.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-workstream-control-panel/ai-workstream-control-panel.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
