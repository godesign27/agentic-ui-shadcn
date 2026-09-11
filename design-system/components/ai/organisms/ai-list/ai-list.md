# AI List

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiList`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Section wrapper for AI-led narrative lists.

AIList groups related AIListItems under a section heading with optional leading icon, count badge, intro narrative paragraph, and a collapse/expand toggle. Items can render as a vertical stack (default), a 2-up grid (for change/grid layouts), or a compact stack (for side panels and drawers). The section can show loading, empty, error, updating, data-stale, or no-changes states so a single component spans the full briefing lifecycle.

**Export:** `AIList`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-list/AIList.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-list/ai-list.md` | This mirror spec |
| `components/ai/organisms/ai-list/ai-list.agent.json` | Agent manifest |
| `components/ai/organisms/ai-list/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Summarize · Prioritize · Monitor |
| Accountability | Status · Data freshness · Audit trail |

## Anatomy

1. **Section heading** _(Unique)_ — h4 title + optional leading icon + optional count pill.
2. **Collapse toggle** _(Shared)_ — Chevron in the heading row. Only visible when collapsible.
3. **Intro narrative** _(Unique)_ — Optional one-paragraph AI briefing copy under the heading.
4. **Item container** _(Shared)_ — CSS grid — single column (stack), auto-fit minmax(280px) (grid), or tighter gap (compact).
5. **Footer action** _(Shared)_ — Optional ghost link (e.g. "View all changes →").
6. **State surfaces** _(Shared)_ — Inline loading / empty / error / no-changes panels swap in based on status.

## State variations

- **Default** _(status="default")_ — Items rendered as a stack.
- **Grid** _(layout="grid")_ — Two-column auto-fit grid for change-style sections.
- **Compact** _(layout="compact")_ — Tighter gap for side panels and drawers.
- **Collapsible** _(collapsible)_ — Heading becomes a button that toggles section visibility.
- **Loading** _(status="loading")_ — Shows "Generating briefing…" placeholder.
- **Empty** _(status="empty")_ — Custom emptyMessage panel.
- **No changes** _(status="noChanges")_ — Calm "No major changes since you last looked." panel.
- **Data stale** _(status="dataStale")_ — Items render plus a warning footer about stale sources.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `required` | Section heading. |
| `icon` | `ReactNode` | `undefined` | Leading icon in the heading row. |
| `intro` | `string` | `undefined` | AI briefing paragraph under the heading. |
| `items` | `AIListItemProps[]` | `required` | List rows. Each entry is the props object of an AIListItem. |
| `layout` | `"stack" \| "grid" \| "compact"` | `"stack"` | Item layout. grid = 2-up auto-fit; compact = tighter gap. |
| `collapsible` | `boolean` | `false` | Enables the collapse toggle. |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state when collapsible. |
| `status` | `AIListStatus` | `"default"` | Section state — default / loading / empty / updating / dataStale / error / noChanges. |
| `count` | `number` | `items.length` | Override the count pill value. |
| `emptyMessage` | `string` | `"No items to show."` | Custom message for empty state. |
| `footerAction` | `{ label: string; onClick?: () => void }` | `undefined` | Ghost link below the items. |
| `onItemOpen` | `(item, index) => void` | `undefined` | Fallback handler when an item has no onClick of its own. |
| `tone` | `"ai" \| "tan" \| "neutral"` | `"ai"` | Default tone propagated to items. |

## Tokens

### Layout
| Token | Value | Usage |
| --- | --- | --- |
| `list.gap.stack` | `12px` | Gap between items in stack layout |
| `list.gap.compact` | `8px` | Gap between items in compact layout |
| `list.grid.min` | `280px` | min-column for grid layout |

## Flows

### Collapse / expand
User toggles a section.
- Click heading button
- aria-expanded flips
- Items + intro hide/show
- onToggle(collapsed) fires

## Canonical implementation

```tsx
import { AIList } from '@/components/ai/organisms/ai-list/AIList';
import { RiPulseLine } from '@remixicon/react';

<AIList
  title="Territory Health Overview"
  icon={<RiPulseLine size={18} />}
  intro="I've been monitoring the territories…"
  items={[
    { variant: 'signal', title: 'Newark Territory', status: 'needsReview', body: '…' },
    { variant: 'stable', title: 'Boston South',     status: 'balanced',    body: '…' },
  ]}
  collapsible
/>
```

## Agent rules

1. Read this mirror spec and `ai-list.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-list/ai-list.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
