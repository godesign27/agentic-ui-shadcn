# AI Action

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiAction`  
**Component type:** React control  
**Status:** Beta  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The decision point at the end of every AI recommendation. Primary confirms, secondary reviews, tertiary dismisses — all in one clear, accountable row.

**Export:** `AIAction`

AIAction is the compact action atom used at the end of AI-generated recommendations, assignments, approvals, and next-best-action outputs. It gives the user a clear way to accept, apply, edit, reject, dismiss or continue an AI-generated output. Built on the existing ai-button visual language with additional loading, complete, review, and error states.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/action/AIAction.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-action/ai-action.md` | This mirror spec |
| `components/ai/atomic/ai-action/ai-action.agent.json` | Agent manifest |
| `components/ai/atomic/ai-action/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Confirm · Apply · Approve |
| Accountability | Approval · Audit trail · Rationale disclosure |

## When to use

- At the end of AI recommendations, inside approval request cards
- After generated summaries or drafts — use draft, edit draft, regenerate
- When the AI needs the user to confirm, edit or dismiss a proposed action
- In AI Assisted side panels where the user remains in control
- In AI Command Center workflows where an agent needs human approval

## When not to use

- Do not use for standard product actions that are not AI-generated
- Do not use as a generic button replacement
- Do not place more than three visible actions in one group
- Do not use when no decision or action is being requested

## Anatomy

1. **Primary Button** _(Unique)_ — Gradient AI button — recommended next step. Shows spinner when loading, checkmark when complete.
2. **Secondary Button** _(Shared)_ — Outlined button — review, edit or alternative path. Optional.
3. **Tertiary Button** _(Shared)_ — Text-only — dismiss, cancel or skip. Low emphasis. Optional.
4. **Review Signal** _(Unique)_ — Orange "Requires review" pill shown above buttons when requiresReview is true.
5. **Loading Spinner** _(Shared)_ — White SVG spinner injected into primary button during loading state.

## State variations

- **Default** _(status="default")_ — Apply Recommendation + Edit + Dismiss — standard recommendation action row
- **Loading** _(status="loading")_ — Primary shows spinner + ellipsis while AI executes the action
- **Complete** _(status="complete")_ — Primary shows checkmark — action successfully applied
- **Disabled** _(status="disabled")_ — All buttons disabled at 45% opacity — required information not yet present
- **Requires review** _(requiresReview={true})_ — Orange review pill appears above the action row before user can proceed
- **Error** _(status="error")_ — Primary button renders in error red — action failed, try again

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `primaryLabel` | `string` | `required` | Label for the primary action button |
| `secondaryLabel` | `string` | `undefined` | Label for optional secondary (outlined) button |
| `tertiaryLabel` | `string` | `undefined` | Label for optional tertiary (text) button |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height: sm=32px, md=40px, lg=48px |
| `layout` | `"inline" \| "stacked"` | `"inline"` | Stacked places buttons in a column — use in narrow panels |
| `status` | `"default" \| "loading" \| "complete" \| "disabled" \| "error" \| "requires-review"` | `"default"` | Controls button state and visual treatment |
| `requiresReview` | `boolean` | `false` | Shows orange review pill above action row |
| `requiresConfirmation` | `boolean` | `false` | Reserved for future confirmation dialog pattern |
| `onPrimary` | `() => void` | `undefined` | Primary button click handler |
| `onSecondary` | `() => void` | `undefined` | Secondary button click handler |
| `onTertiary` | `() => void` | `undefined` | Tertiary button click handler |

## Tokens

### Primary Button
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(#5A6DFF → #7B5CE6)` | Default primary background |
| `AI.color.action.primaryActive` | `#4D60E6` | Hover + loading + complete state |
| `AI.color.text.onAction` | `#FFFFFF` | Primary button label color |

### Review Signal
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.signal.surface` | `#FEFBF4` | Review pill background |
| `AI.color.signal.subtle` | `#FFD68F` | Review pill border |
| `SIGNAL[70]` | `#CB6100` | Review pill label color |

## Flows

### AI recommendation flow
User reviews and applies an AI-generated recommendation
- AIAction renders with default state
- User clicks Apply Recommendation
- status → loading, spinner shows
- Action completes → status → complete, checkmark shows
- Parent component resets or navigates away

### Approval flow
AI proposes an assignment, user confirms or edits
- AIAction renders with requiresReview=true
- Orange review pill visible above buttons
- User clicks Approve or Edit First
- If Edit First → navigates to edit form
- On confirm → loading → complete

### Generated draft flow
AI creates a draft, user accepts, edits, or regenerates
- Draft appears above AIAction
- User sees Use Draft / Edit Draft / Regenerate
- Regenerate triggers parent re-generation
- Use Draft → loading → complete

## JavaScript / React API

```tsx
import { AIAction } from '@/components/ai/atomic/action/AIAction';

// Recommendation flow
<AIAction
  primaryLabel="Apply Recommendation"
  secondaryLabel="Review Details"
  tertiaryLabel="Dismiss"
  onPrimary={() => applyRecommendation()}
/>

// Approval with review signal
<AIAction
  primaryLabel="Approve Territory Change"
  secondaryLabel="Edit First"
  requiresReview
  size="lg"
/>

// Loading state
<AIAction
  primaryLabel="Applying..."
  status="loading"
/>

// Complete state
<AIAction
  primaryLabel="Applied"
  status="complete"
/>
```

## Agent rules

1. Read this mirror spec and `ai-action.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-action/ai-action.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order