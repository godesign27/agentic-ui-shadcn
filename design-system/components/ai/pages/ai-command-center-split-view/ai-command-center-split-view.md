# AI Command Center — Split View

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiCommandCenterSplitView`  
**Component type:** React page  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Chat drives the work. The right panel holds the generated output.

AICommandCenterSplitView extends the standard AI Command Center with a split-view work mode. It starts in the same centered dialog state — avatar, greeting, input card, and quick-action chips. When the user submits their first prompt, the UI transitions into a two-pane workspace: the left pane anchors the conversation thread and prompt input; the right pane surfaces conditional AI output (analysis, workflow, table, scenario, draft, or approval flow). The right pane is intentionally modular and placeholder-oriented — it defines the layout pattern without prescribing the final output type.

**Export:** `AICommandCenterSplitView`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/pages/ai-command-center-split-view/AICommandCenterSplitView.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-command-center-split-view/ai-command-center-split-view.md` | This mirror spec |
| `components/ai/pages/ai-command-center-split-view/ai-command-center-split-view.agent.json` | Agent manifest |
| `components/ai/pages/ai-command-center-split-view/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | Adaptive · AI Led |
| AI behavior | Ask · Generate · Analyze · Summarize · Build · Preview · Refine · Execute · Monitor |
| Accountability | Sources · Rationale · Assumptions · Confidence · Audit trail · Approval · Output ownership |

## When to use

- User prompt produces a generated artifact or output larger than a chat response
- AI generates analysis, workflow, scenario, table, report, draft or recommendation
- User needs to keep chatting while reviewing output
- Output may need refinement through follow-up prompts
- AI Led workflows need a workspace for generated results

## When not to use

- Simple Q&A or short conversational responses
- Lightweight clarification where a chat thread is sufficient
- When output is only plain text with no structure
- When viewport is too narrow for two panes (< 760px)
- When a standard chat thread is a clearer experience

## Anatomy

1. **Start state prompt** _(Shared)_ — Centered greeting + AIAvatar + AIInputCard — identical to standard command center idle state.
2. **Quick prompt chips** _(Shared)_ — Chip row under the input card. Tapping a chip pre-fills the input.
3. **Left chat pane** _(Unique)_ — White surface, 38% width, min 320px. Contains conversation thread and anchored input.
4. **Pane divider** _(Unique)_ — 1px neutral border separating left and right panes.
5. **Right conditional pane** _(Unique)_ — Neutral #F8F7F8 surface, flex: 1. Holds the generated output header + content area.
6. **Chat thread** _(Shared)_ — Scrollable AIUserBubble + AIPatternMessage history with loading indicators.
7. **Prompt input** _(Shared)_ — AIInputCard anchored at bottom of left pane. Uses hasMessages=true compact mode.
8. **Output header** _(Unique)_ — Status dot + output title + action buttons (copy, save, view rationale, hide pane).
9. **Output placeholder content** _(Unique)_ — Rotates through 6 placeholder types: analysis, workflow, table, scenario, draft, approval.
10. **Optional output actions** _(Unique)_ — Hide/show toggle, copy, save, export, view sources, view rationale.

## State variations

- **Start** _(mode=start)_ — Centered greeting, input card, and quick-action chips. No split view yet.
- **Transition** _(on-submit)_ — First prompt submitted — UI transitions to split view with chat sliding left and output pane sliding in from right.
- **Output loading** _(outputStatus=loading)_ — Chat shows AI loading indicator; right pane shows spinning loader and skeleton bars.
- **Output ready** _(outputStatus=ready)_ — Right pane shows placeholder conditional output with status dot and footer attribution.
- **Output updating** _(outputStatus=updating)_ — Follow-up prompt submitted; right pane shows "Updating output…" while preserving previous state.
- **Output pane hidden** _(showOutputPane=false)_ — Right pane collapsed to narrow restore button; chat pane expands to fill the space.
- **Unsupported output** _(outputStatus=idle)_ — Right pane shows "No generated output for this prompt" for conversational-only responses.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"gray" \| "aqua"` | `"gray"` | Background gradient theme. "gray" for neutral surfaces, "aqua" for teal-tinted surfaces. |
| `showBackground` | `boolean` | `true` | Render the ambient gradient background in the start state. |
| `suggestions` | `string[]` | `undefined` | Custom quick-action chip labels for the start state. Defaults to 5 ZAIDYN-specific examples. |

## Tokens

### Chat pane
| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#FFFFFF` | Left chat pane surface |
| `border` | `rgba(0,0,0,0.08)` | Pane divider and header borders |

### Output pane
| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#F8F7F8` | Right conditional output pane surface |
| `header-bg` | `#FFFFFF` | Output pane header background |

### AI accent
| Token | Value | Usage |
| --- | --- | --- |
| `action.primary` | `#4D60E6` | Loading spinner, action buttons, active affordances |
| `status.ready` | `#27AE60` | Status dot when output is ready |

## Canonical implementation

```tsx
import { AICommandCenterSplitView } from '@/components/ai/pages/ai-command-center-split-view/AICommandCenterSplitView';

// Start state — renders centered greeting + input + chips
<AICommandCenterSplitView />

// With custom prompt suggestions
<AICommandCenterSplitView
  suggestions={[
    'Analyze Q1 alignment and show key insights',
    'Create a territory balance scenario',
    'Generate a call plan for underperforming accounts',
  ]}
/>

// Submit a prompt → transitions automatically to split view
// Left pane: conversation thread + AIInputCard
// Right pane: conditional AI output (analysis, workflow, table, scenario, draft, or approval)
```

## Agent rules

1. Read this mirror spec and `ai-command-center-split-view.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-command-center-split-view/ai-command-center-split-view.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
