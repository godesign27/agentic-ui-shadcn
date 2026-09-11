# AI Insight List

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiInsightList`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

A semantic list of AI findings — positive / risk / warning / observation / review-needed — with optional source, freshness, confidence, and per-item action.

AIInsightList is the canonical way to present multiple AI-generated findings together inside a larger surface — an analysis card, a response bubble, a side drawer, or a generated dashboard. Each insight carries a severity (positive / neutral / warning / critical / info / needsReview) and renders with a tone-colored status glyph that has an accessible label so colour isn't the sole signal. Optional metadata per item: source chip, freshness, confidence pill, action link.

**Export:** `AIInsightList`

DO NOT confuse with `ai-notification` — notifications are one-shot alerts / banners / toasts. Insight lists group multiple findings inside a larger analysis.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/organisms/ai-insight-list/AIInsightList.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-insight-list/ai-insight-list.md` | This mirror spec |
| `components/ai/organisms/ai-insight-list/ai-insight-list.agent.json` | Agent manifest |
| `components/ai/organisms/ai-insight-list/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Analyze · Summarize · Detect · Explain |
| Accountability | Sources · Confidence · Risk · Data freshness · Human review |

## When to use

- Multiple findings need to appear together
- Insights are part of a larger analysis or output
- User needs to scan positive, negative, and neutral signals
- A response contains findings but not a full dashboard

## When not to use

- Only one urgent event — use `ai-notification` instead
- A full recommendation comparison — use `ai-card-recommendation-compare`
- A long rationale — use `ai-rationale-panel`
- A table or detailed report — use a data-grid pattern

## Anatomy

1. **Title** _(Shared)_ — Optional uppercase eyebrow above the list ("Key insights" / "Risks").
2. **Severity marker** _(Unique)_ — Tone-colored glyph (check / alert / dot / review) with sr-only aria-label so colour isn't the sole signal.
3. **Insight body** _(Unique)_ — One-sentence finding in plain language. Primary text tone.
4. **Source / freshness** _(Shared)_ — Optional `AIChipBrief` pills per item. Gated by `showSources`.
5. **Confidence pill** _(Unique)_ — Inline `XX% confidence` pill — green ≥80, amber 60–79, red <60.
6. **Action link** _(Shared)_ — Optional per-item action — label + right-chevron, pushed to the right of the metadata row. Gated by `showActions`.
7. **Show more** _(Unique)_ — When `maxVisible` truncates the list, a "Show N more" button reveals the rest.

## State variations

- **Mixed signals** _(default)_ — Positive, risk, needs-review, and observation items in a single list.
- **Compact density** _(density="compact")_ — Tighter spacing for chat / drawer surfaces.
- **With sources + actions** _(showSources showActions)_ — Per-item source chip, freshness, and action link with right-chevron. Confidence pill optional.
- **Truncated · show more** _(maxVisible={3})_ — Cap the visible items at N; a "Show more" button reveals the rest.
- **Empty** _(items={[]})_ — Dashed-border card with calm copy when there's nothing to surface yet.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `—` | Optional uppercase eyebrow above the list. |
| `items` | `AIInsightItem[]` | `required` | Array of insight items — each with text, severity, optional source/freshness/confidence/action. |
| `density` | `"compact" \| "comfortable" \| "spacious"` | `"comfortable"` | Per-row vertical padding and gap. |
| `maxVisible` | `number` | `—` | Cap visible items; show "N more" button to reveal the rest. |
| `showSources` | `boolean` | `false` | Render `source` + `freshness` chips per item when provided. |
| `showActions` | `boolean` | `false` | Render `action` link per item when provided. |
| `onItemAction` | `(item: AIInsightItem) => void` | `—` | Callback fired when any item's action is clicked. |
| `onShowMore` | `() => void` | `—` | Callback fired when "Show more" is clicked. |

## Flows

### Insights inside an analysis card
Group multiple findings together so the user can scan positive, negative, and neutral signals at once.
- Parent analysis card supplies an `items` array — each with `text` and `severity`
- The list renders with severity-colored markers (with sr-only labels)
- When the user needs context, opt in to `showSources` for per-item source / freshness chips
- For long lists, set `maxVisible` so the list collapses to the top N with a "Show more" trigger

## Canonical implementation

```tsx
import { AIInsightList } from 'ai/organisms/ai-insight-list/AIInsightList';

<AIInsightList
  title="Key insights"
  showSources
  items={[
    { id: 'a', text: 'Northeast gap widened 12% since Q1.', severity: 'critical', source: { label: 'Territory model' }, freshness: '2h ago' },
    { id: 'b', text: 'Southeast coverage above target for 3Q.', severity: 'positive' },
    { id: 'c', text: 'Pacific ratio 1:29 — needs review.', severity: 'needsReview', confidence: 82, action: { label: 'Review' } },
    { id: 'd', text: 'Overall trend is positive.', severity: 'neutral' },
  ]}
/>
```

## Agent rules

1. Read this mirror spec and `ai-insight-list.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-insight-list/ai-insight-list.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
