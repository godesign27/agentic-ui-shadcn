# AI Card Workstream

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardWorkstream`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Card-style preview of an AI workstream — surfaces just enough state for the user to decide whether to drill in.

AICardWorkstream is the canonical entry-point card for any AI-operated workstream. The icon encodes the workstream type (map / roster / data / forecast); the status pill encodes operational state (active / pending / critical / complete); up to three KPI columns show at-a-glance metrics; a Project Health bar shows progress with color tied to status; the footer carries assignee initials and the last-updated timestamp. Clicking the whole card navigates to the workstream dashboard.

**Export:** `AICardWorkstream`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-workstream/AICardWorkstream.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-workstream/ai-card-workstream.md` | This mirror spec |
| `components/ai/organisms/ai-card-workstream/ai-card-workstream.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-workstream/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Summarize · Recall · Monitor |
| Accountability | Owner · Audit trail · Context awareness |

## Anatomy

1. **RiFontSize2 icon** _(Unique)_ — 48×48 rounded square. Color encodes work type — map (green), roster (orange), data (brand-blue), forecast (purple). Decorative tinted blob in the top-right corner reinforces the tone.
2. **RiFontSize2 badge** _(Shared)_ — Compact uppercase pill — MAP / ROSTER / DATA / FORECAST.
3. **Status pill** _(Shared)_ — Active / Pending / Critical / Complete. Dot + uppercase label. Color tied to status.
4. **Title + desc** _(Unique)_ — Workstream name (h4) + supporting description (section-subtitle).
5. **KPI columns** _(Unique)_ — Up to 3 metric columns — uppercase label + large h3 value.
6. **Health bar** _(Shared)_ — Horizontal progress bar — brand-blue for active/complete, amber for pending, red for critical.
7. **Assignee stack** _(Shared)_ — Initial chips (up to 3 visible), +N counter when more assignees exist.
8. **Last-updated** _(Shared)_ — RiTimeLine icon + uppercase relative timestamp ("12M AGO").

## State variations

- **Active** _(status="active")_ — Brand-blue health bar + green status pill. Default state for in-flight workstreams.
- **Pending** _(status="pending")_ — Amber health bar + amber status pill. Awaiting input or approval.
- **Critical** _(status="critical")_ — Red health bar + red status pill. Action required.
- **Complete** _(status="complete")_ — Brand-blue health bar at 100% + gray status pill. Workstream closed.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `type` | `"map" \| "roster" \| "data" \| "forecast"` | `required` | Work type — encodes icon + tinted accent blob in the top-right corner. |
| `status` | `"active" \| "pending" \| "critical" \| "complete"` | `required` | Operational state — drives the status pill color and the health-bar tone. |
| `title` | `string` | `required` | Workstream name. Rendered as the card heading. |
| `description` | `string` | `required` | Two-line supporting paragraph under the title. |
| `metrics` | `{ label: string; value: string }[]` | `required` | Up to 3 KPI columns. Excess entries are dropped. |
| `healthPercent` | `number (0–100)` | `required` | Project health percentage. Drives the bar width. |
| `assignees` | `{ initial: string; name?: string }[]` | `undefined` | Assignee initial chips. Up to 3 shown + a +N counter for the rest. |
| `lastUpdated` | `string` | `undefined` | Relative timestamp ("12M ago", "1d ago"). |
| `onClick` | `() => void` | `undefined` | Fired when the card is clicked — typically navigates to the workstream dashboard. |

## Tokens

### RiFontSize2 tones
| Token | Value | Usage |
| --- | --- | --- |
| `workstream.type.map` | `#0A9963` | Map / territory workstream icon |
| `workstream.type.roster` | `#D97706` | Roster / people workstream icon |
| `workstream.type.data` | `#4D60E6` | Data / pipeline workstream icon (AI_RAMP brand) |
| `workstream.type.forecast` | `#9B59B6` | Forecast / predictive workstream icon |

### Status tones
| Token | Value | Usage |
| --- | --- | --- |
| `workstream.status.active` | `#0A6E5E` | In-flight workstreams |
| `workstream.status.pending` | `#8A640C` | Awaiting input / approval |
| `workstream.status.critical` | `#B21111` | Action required |
| `workstream.status.complete` | `#5B5864` | Closed workstreams |

### Health bar
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#4D60E6` | Default health bar fill (active / complete) |

## Flows

### Enter workstream
User clicks the card to open the dashboard.
- User hovers card — subtle lift + shadow
- User clicks anywhere on the card
- onClick fires — parent navigates to /workstreams/:id
- Dashboard renders with the full workstream context

## Canonical implementation

```tsx
import { AICardWorkstream } from '@/components/ai/organisms/ai-card-workstream/AICardWorkstream';

<AICardWorkstream
  type="map"
  status="active"
  title="Cardiology Expansion Q2"
  description="Scaling the cardiovascular sales force by 15% in high-growth metro clusters."
  metrics={[
    { label: 'ACCOUNTS',    value: '4.2k' },
    { label: 'TERRITORIES', value: '124'  },
    { label: 'VARIANCE',    value: '4.2%' },
  ]}
  healthPercent={68}
  assignees={[
    { initial: 'S', name: 'Sarah Chen' },
    { initial: 'J', name: 'Jonas Park' },
    { initial: 'E', name: 'Eli Ross'   },
  ]}
  lastUpdated="12M ago"
  onClick={() => navigate('/workstreams/cardiology-expansion-q2')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-workstream.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-workstream/ai-card-workstream.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
