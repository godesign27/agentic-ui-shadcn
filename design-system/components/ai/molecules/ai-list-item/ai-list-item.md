# AI List Item

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiListItem`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Card row that presents one AI-generated signal, recommendation, or update.

AIListItem is the canonical row used inside AI-led lists. It supports six variants (signal, stable, impact, assessment, change, dataUpdate) plus the rare alert/recommendation. Each item composes a leading icon, an optional eyebrow row (type · label · status pill), a title, a body paragraph, and an optional footer row of chips (metric · source · freshness · confidence). Interactive items show a trailing chevron and lift on hover; informational items render flat.

**Export:** `AIListItem`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-list-item/AIListItem.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-list-item/ai-list-item.md` | This mirror spec |
| `components/ai/molecules/ai-list-item/ai-list-item.agent.json` | Agent manifest |
| `components/ai/molecules/ai-list-item/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · AI Assisted |
| AI behavior | Summarize · Recommend · Monitor |
| Accountability | Status · Confidence · Audit trail |

## Anatomy

1. **Leading icon** _(Shared)_ — 32×32 tinted square. Variant chooses a default lucide icon; consumer can override.
2. **Eyebrow row** _(Shared)_ — Optional uppercase type tag + secondary label + status pill (with dot).
3. **Title** _(Unique)_ — @ai-h5 (14/700/1.4). The headline of the row.
4. **Body** _(Unique)_ — @ai-section-subtitle (13/400/1.55). 1–2 line narrative.
5. **Footer chips** _(Shared)_ — Metric pill · source · freshness · confidence — appear only if provided.
6. **Action affordance** _(Shared)_ — Either an inline actionLabel (text + chevron) or a trailing-edge chevron when clickable.

## State variations

- **Signal · Needs Review** _(variant="signal" status="needsReview")_ — Monitored territory with elevated workload pressure.
- **Stable · Balanced** _(variant="stable" status="balanced")_ — Positive / balanced monitoring item.
- **Impact** _(variant="impact")_ — Recent AI impact or outcome — single accent block.
- **Assessment · Recommended** _(variant="assessment" status="recommended")_ — Suggested next assessment with action label.
- **Change** _(variant="change" type="Request")_ — Change since last looked. Uppercase type tag.
- **Data Update** _(variant="dataUpdate" type="Data Update")_ — New data ingested or normalized.
- **Selected** _(selected)_ — Focused/selected row — 3px brand ring.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"signal" \| "stable" \| "impact" \| "assessment" \| "change" \| "dataUpdate" \| "recommendation" \| "alert"` | `"signal"` | Item variant — drives default leading icon. |
| `title` | `string` | `required` | Row headline. |
| `label` | `string` | `undefined` | Secondary label in the eyebrow row. |
| `status` | `AIListItemStatus` | `undefined` | One of needsReview / balanced / recommended / ready / optional / active / critical / dataStale. |
| `body` | `string` | `undefined` | One-to-two-line narrative under the title. |
| `type` | `string` | `undefined` | Uppercase type tag (e.g. "Request", "Data Update"). |
| `icon` | `ReactNode` | `undefined` | Overrides the variant default icon. |
| `metric` | `string` | `undefined` | Optional metric pill (e.g. "+6% balance"). |
| `source` | `string` | `undefined` | Optional source label. |
| `freshness` | `string` | `undefined` | Optional freshness/timestamp label. |
| `confidence` | `"high" \| "medium" \| "low"` | `undefined` | Optional confidence chip. |
| `actionLabel` | `string` | `undefined` | Inline action affordance text (replaces trailing chevron). |
| `onClick` | `() => void` | `undefined` | Click handler. Implies interactive=true. |
| `interactive` | `boolean` | `auto` | Force interactivity. Auto-detected from onClick. |
| `tone` | `"ai" \| "tan" \| "neutral"` | `"ai"` | Surface tone — tan version is for placement on ai-soft-surface tan/mixed. |
| `selected` | `boolean` | `false` | Highlighted/selected state. |
| `loading` | `boolean` | `false` | Dimmed loading state. |

## Tokens

### Surface
| Token | Value | Usage |
| --- | --- | --- |
| `list-item.surface` | `var(--ai-card-bg)` | Card background |
| `list-item.border` | `var(--ai-card-border)` | Card border |
| `list-item.selected` | `AI.color.action.primary` | Selected ring |

### Status tones
| Token | Value | Usage |
| --- | --- | --- |
| `status.needsReview` | `SIGNAL_ORANGE[70]` | Needs Review pill text |
| `status.balanced` | `var(--ai-status-success-text)` | Balanced pill text |
| `status.recommended` | `var(--ai-status-info-text)` | Recommended pill text |

## Flows

### Open detail
User opens a clickable item.
- Hover lifts the card 1px and reveals the trailing chevron color shift
- Click or Enter fires onClick
- Parent navigates / opens detail surface

## Canonical implementation

```tsx
import { AIListItem } from '@/components/ai/molecules/ai-list-item/AIListItem';

<AIListItem
  variant="signal"
  title="Newark Territory"
  label="Alignment Monitor"
  status="needsReview"
  body="There's a noticeable shift in workload — it's climbed to 1.15 in zip 07102."
  metric="Workload 1.15×"
  confidence="medium"
  onClick={() => openTerritory('newark')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-list-item.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-list-item/ai-list-item.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
