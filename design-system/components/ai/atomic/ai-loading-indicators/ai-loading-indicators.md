# AI Loading Indicators

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiLoadingIndicators`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`, `tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

A family of loading states that communicate AI thinking, processing, and progress. Different variants map to different task lengths and complexity levels.

**Exports:** `AIWorkingIndicator` · `AIThinkingIndicator` · `AIGettingInfoIndicator` · `AIGettingInfoIndicatorTan`

Three distinct loading patterns for AI response stages. AIWorkingIndicator shows a compact working pill with spinner during generation. AIThinkingIndicator shows collapsible reasoning steps with done/active/pending states. AIGettingInfoIndicator shows expanded step rows for async data retrieval. Each is used at a different phase of the AI response lifecycle.

Use them sequentially — never show all three at once. Hide all indicators once the response has fully rendered.

## Source (canonical implementation)

> Copy `AILoadingIndicators.tsx` verbatim from the self-contained component bundle — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/loading-indicator/AILoadingIndicators.tsx` | Canonical React source |
| `tokens/ai-tokens.ts` | `AI`, `F`, `COMPANION` — indicator colors via `AI.color.action.primary`, `surface.emphasis`, `border.strong` |
| `tokens/ai-typography.ts` | `@brand-status-label` on working pill label |
| `components/ai/atomic/ai-loading-indicators/ai-loading-indicators.md` | This mirror spec |
| `components/ai/atomic/ai-loading-indicators/ai-loading-indicators.agent.json` | Agent manifest |
| `components/ai/atomic/ai-loading-indicators/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Execute · Monitor · Generate |
| Accountability | Confidence · Audit trail |

## When to use

- Show AIWorkingIndicator immediately when a message is sent
- Swap in AIThinkingIndicator when the model emits reasoning steps
- Show AIGettingInfoIndicator when a tool call / data fetch is in progress
- Use `theme="tan"` on companion / AI Assisted surfaces (dark tan border)
- Use `theme="gray"` for neutral subdued contexts
- Use `theme="white"` on light surfaces where the pill should read as white

## When not to use

- Do not show all three indicators at the same time — use them sequentially
- Do not keep any indicator visible after the response has fully rendered
- Do not use for long-running measurable progress — use ai-progress instead

## Anatomy

1. **Working pill** _(Unique)_ — Collapsed pill with chevron, pulsing label, and orbit spinner for quick requests
2. **Thinking step row** _(Unique)_ — Expandable step rows with done/active/pending indicators and a "View details" chevron
3. **Step status dot** _(Shared)_ — Colored circle: `AI.color.action.primary` (active), `var(--ai-neutral-icon)` (done), `var(--ai-track-bg)` (pending)
4. **Orbit spinner** _(Unique)_ — CSS rotate animation on a circle path in the pill header
5. **Collapse header** _(Shared)_ — Expand/collapse chevron on thinking and getting-info cards

## State variations

- **Working** _(Pill + spinner)_ — Shown immediately when the AI starts generating. Label pulses; spinner rotates.
- **Thinking** _(Steps visible)_ — Shown when the model outputs reasoning steps. Steps are collapsible; active step advances automatically in demo.
- **Getting info** _(Steps + fetch)_ — Shown when the AI is fetching external data (search, tool call). Three steps with progressive activation.
- **Collapsed** _(Pill only)_ — User collapses thinking/getting-info card to compact pill matching working state
- **Tan theme** _(Companion surface)_ — Warm BRAND Tan pill/card with dark tan border (`COMPANION[70] #9A7560`)
- **Gray theme** _(Neutral)_ — Gray pill and border (`#F4F3F3` / `#B2B0B6`) for subdued contexts
- **White theme** _(Light surface)_ — White pill with neutral border (`#FFFFFF` / `#DEDCDE`)

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `LoaderTheme` | `"default"` | `"default"` \| `"tan"` \| `"gray"` \| `"white"` — pill/card background and border tint |
| `steps` | `ThinkingStep[]?` | `[]` | Array of reasoning steps for AIThinkingIndicator (future controlled API) |
| `collapsed` | `boolean?` | `false` | Controls whether thinking steps are collapsed (future controlled API) |

## Tokens

### Indicator Colors
| Token | Value | Usage |
| --- | --- | --- |
| `ai-loader.indicator.color` | `AI.color.action.primary #5A6DFF` | Active step dot and spinning orbit arc |
| `ai-loader.indicator.color.track` | `AI.color.surface.emphasis #D2D6FF` | Track / orbit background circle |
| `ai-loader.indicator.color.muted` | `AI.color.border.strong #96A4FF` | Done step dot color |

### Shape
| Token | Value | Usage |
| --- | --- | --- |
| `ai-loader.border.radius` | `AI.radius.sm 12px` | Step pill container radius |
| `ai-loader.dot.size` | `8px` | Working indicator dot diameter |

### CSS variables (runtime)
| Variable | Usage |
| --- | --- |
| `var(--ai-loading-pill-bg)` | Pill background (default) |
| `var(--ai-loading-card-bg)` | Expanded card background (default) |
| `var(--ai-card-border)` | Pill/card border (default brand tint) |
| `AI.color.companion.border` | `#E8D6BF` — tan surface context |
| `COMPANION[70]` | `#9A7560` — dark tan border on tan theme |
| `NEUTRAL.border` | `#B2B0B6` — gray theme border |
| `#FFFFFF` / `#DEDCDE` | White theme pill and border |
| `var(--ai-neutral-icon)` | Done step dot, chevrons |
| `var(--ai-neutral-text)` | Active step label |
| `var(--ai-neutral-helper)` | Done step label, detail text |
| `var(--ai-btn-disabled-text)` | Pending step label |
| `var(--ai-confidence-track)` | Detail panel background |
| `var(--ai-track-bg)` | Pending step dot |

## Flows

### Response lifecycle
The three indicators appear sequentially as the AI response progresses through its stages.
- Message sent → AIWorkingIndicator shown immediately
- If model uses reasoning → AIThinkingIndicator replaces working dots
- If model calls a tool → AIGettingInfoIndicator shown during fetch
- Response received → all indicators hidden, AIPatternMessage rendered

## JavaScript / React API

```tsx
import {
  AIWorkingIndicator,
  AIThinkingIndicator,
  AIGettingInfoIndicator,
  AIGettingInfoIndicatorTan,
} from '@/components/ai/atomic/loading-indicator/AILoadingIndicators';

// Level 1 — quick/direct request
<AIWorkingIndicator />

// Level 1 — companion surface
<AIWorkingIndicator theme="tan" />

// Level 2 — complex multi-step reasoning
<AIThinkingIndicator />

// Level 3 — data fetch + reasoning
<AIGettingInfoIndicator />

// Level 3 — tan companion variant
<AIGettingInfoIndicatorTan />
```

## Agent rules

1. Read this mirror spec and `ai-loading-indicators.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens and CSS variables.
3. Copy canonical implementation from the bundle — do not recreate atoms or invent icons.
4. Respect `prefers-reduced-motion: reduce` — disable non-essential animation.

Full agent contract: `components/ai/atomic/ai-loading-indicators/ai-loading-indicators.agent.json`.

## Related Components

- `components/ai/atomic/ai-progress/ai-progress.md` — measurable progress for longer AI work
- `components/ai/atomic/ai-agent-work-note/ai-agent-work-note.md` — lightweight inline working disclosure
- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order
