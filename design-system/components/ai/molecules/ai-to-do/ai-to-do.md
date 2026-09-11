# AI To-Do

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiToDo`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Calm checklist the agent uses to narrate its plan and progress.

AIToDo is the agent's scratch-pad checklist — the calm UI used to surface what the agent has done, what it's working on right now, and what is queued. Done items use solid filled icons (success-green check for completed, brand-blue check with a pulsing ring for in-progress); pending items use a hollow outlined check in gray so the difference between "done" and "to do" is unmistakable at a glance. Blocked uses the orange review-needed ring. Font weight encodes hierarchy: 700 (heavy) for in-progress so the current step jumps off the list, 500 (medium) for completed, 300 (light) for pending. Every text + background pair clears WCAG AA contrast on ZSAI_TAN[00]. When every item is completed, the list flips to a calm "Complete" state: the list icon swaps for RiCheckboxCircleLine, the title turns accent, an "All done" badge appears, and the progress bar runs one shimmer sweep before settling.

**Export:** `AIToDo`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-to-do/AIToDo.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-to-do/ai-to-do.md` | This mirror spec |
| `components/ai/molecules/ai-to-do/ai-to-do.agent.json` | Agent manifest |
| `components/ai/molecules/ai-to-do/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Plan · Monitor · Communicate |
| Accountability | Status · Audit trail · Transparency |

## Anatomy

1. **Tan surface** _(Shared)_ — ZSAI_TAN[00] background with a soft tan border — signals agent companion context.
2. **List icon** _(Unique)_ — Three-line hamburger glyph that anchors the list role. Swaps to a filled Done when the whole list is complete.
3. **Title + count** _(Unique)_ — Section title (@zsai-h5) followed by "Close of N complete" meta label.
4. **Progress bar** _(Shared)_ — Brand-accent fill over a low-contrast tan track. Width animates 450ms on value change; shimmers while the agent is working.
5. **Status icons** _(Shared)_ — Solid filled circle-with-check for "done" states (success-green completed; brand-blue in-progress with a pulsing ring). Hollow outlined check in gray for pending — clear at-a-glance difference between done and to-do. Orange outlined ring + dot for blocked.
6. **In-progress row** _(Unique)_ — Faint brand-accent surface + heavy (700) font weight. Only one row should be in this state at a time.
7. **Item note** _(Shared)_ — Optional secondary line in @zsai-meta-label below the label.

## State variations

- **Completed item** _(status="completed")_ — Solid success-green circle with white check. Medium (500) weight copy in helper gray. AA contrast.
- **In-progress item** _(status="inProgress")_ — Solid brand-blue circle with white check + pulsing outer ring. Heavy (700) weight copy in default text color, faint accent row surface. Only one row in this state at a time.
- **Pending item** _(status="pending")_ — Hollow outlined check on a transparent background — gray ring + gray check. Reads clearly as "not done yet" next to the solid done icons. Light (300) weight copy in #454250 (darker than helper to keep AA contrast under the lighter weight).
- **Blocked item** _(status="blocked")_ — Orange outlined ring + dot. The only orange affordance — signals review-needed.
- **All complete** _(forceComplete or every item completed)_ — Whole-list celebration: list icon → RiCheckboxCircleLine, title and border in accent, "All done" badge in the header, one-time 1.4s shimmer sweep across the full progress bar.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"To-do list"` | Section title in the header. |
| `items` | `AIToDoItem[]` | `required` | Ordered list. Each item has { label, status, note?, id? }. |
| `collapsible` | `boolean` | `true` | Allow the user to collapse the list. Header becomes a button. |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state when collapsible. |
| `forceComplete` | `boolean` | `auto` | Override the auto "all complete" celebration state. Auto-detects from items.every(status === "completed"). |
| `onItemClick` | `(item, index) => void` | `undefined` | Optional click handler — rows become buttons. Useful for jumping the user to the artifact the row represents. |

## Tokens

### Surface
| Token | Value | Usage |
| --- | --- | --- |
| `todo.surface` | `ZSAI_TAN[00] #F6F2EB` | Card surface — agent companion context |
| `todo.border` | `rgba(60,42,29,0.10)` | Hairline tan border |

### Status (icon fill)
| Token | Value | Usage |
| --- | --- | --- |
| `todo.icon.completed` | `#0E8170` | Completed — solid success green (one step lighter; white check inside ≥4.7:1, AA) |
| `todo.icon.inProgress` | `AI.color.action.primary` | In-progress — solid brand blue + pulsing ring |
| `todo.icon.pending` | `#5B5864` | Pending — hollow ring + check (helper text token); transparent fill |
| `todo.icon.blocked` | `#A5570B` | Blocked — orange ring + dot |

### Text (AA on ZSAI_TAN[00])
| Token | Value | Usage |
| --- | --- | --- |
| `todo.text.completed` | `#5B5864` | Completed copy · weight 500 · ratio 5.4:1 |
| `todo.text.inProgress` | `#1A1628` | In-progress copy · weight 700 · ratio 12.5:1 |
| `todo.text.pending` | `#454250` | Pending copy · weight 300 · ratio 8.2:1 (darker than helper to offset the light weight) |
| `todo.text.blocked` | `#7A3F08` | Blocked copy · weight 600 · ratio 5.0:1 |

## Flows

### Agent narrates work
Agent updates the to-do list as it works.
- Agent emits a plan: every item starts pending
- Agent marks the first item inProgress — row gets the accent surface
- Agent finishes the item — status flips to completed, progress bar advances
- Agent moves on to the next item; repeat

### Blocked step
Agent flags an item that needs human input.
- Item status flips to blocked; ring + dot turn orange
- User clicks the row → onItemClick fires
- Parent opens the review/approval surface

## Canonical implementation

```tsx
import { AIToDo } from '@/components/ai/molecules/ai-to-do/AIToDo';

<AIToDo
  title="To-do list"
  items={[
    { label: 'Inspect existing atom/page-pattern conventions', status: 'completed' },
    { label: 'Create ai-soft-surface atom',                    status: 'completed' },
    { label: 'Create AIListItem group',                        status: 'completed' },
    { label: 'Create AIList group',                            status: 'completed' },
    { label: 'Create AIListLanding page pattern',              status: 'completed' },
    { label: 'Register all 4 entries in registry.tsx',         status: 'completed' },
    { label: 'Wiring detail-page preview cases',               status: 'inProgress' },
  ]}
/>
```

## Agent rules

1. Read this mirror spec and `ai-to-do.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-to-do/ai-to-do.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
