# AI Response Footer

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiResponseFooter`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Closes the loop after every AI output. Sources ground the claim, freshness signals trust, feedback improves the model — all without competing with the response itself.

AIResponseFooter is the optional group component used beneath AI-generated responses, recommendations, summaries, and agent outputs. It provides lightweight trust, attribution, source context, and post-response actions. Uses AIFeedbackBar as a sub-atom — does not duplicate it. Orange is used only for stale data, missing source, or escalation states, never as a default color.

**Export:** `AIResponseFooter`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-response-footer/AIResponseFooter.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-response-footer/ai-response-footer.md` | This mirror spec |
| `components/ai/molecules/ai-response-footer/ai-response-footer.agent.json` | Agent manifest |
| `components/ai/molecules/ai-response-footer/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Cite · Attribute · Confirm · Collect feedback |
| Accountability | Sources · Data freshness · Attribution · Audit trail |

## When to use

- Under AI-generated summaries, recommendations, and insight cards
- Under assistant responses that cite data sources
- When data source visibility improves trust
- When data freshness matters for the decision at hand
- When the response should collect feedback to improve future AI quality
- Under agent outputs that users may share, save, copy or rate

## When not to use

- Do not use beneath every tiny system message — use compact footer for lightweight assistant messages
- Do not use when the parent component already provides complete source and feedback controls
- Do not use for standard non-AI product content
- Do not use source chips if sources are unknown or fabricated
- Do not show confidence, sources or freshness unless the system can support those claims

## Anatomy

1. **Top Divider** _(Shared)_ — Subtle horizontal rule separating AI output from footer — controlled by showDivider prop
2. **Stale/Warning Row** _(Unique)_ — Orange warning icon + message text — only visible when status="stale" or "missing-source"
3. **Data Sources Row** _(Unique)_ — "DATA SOURCES" label + source chip pills + overflow "+N more" chip
4. **Attribution/Freshness** _(Shared)_ — attribution · Updated updatedAt — 10px neutral text
5. **AIFeedbackBar** _(Shared)_ — Sub-atom: read aloud, thumbs, share, copy, save — showDivider=false since footer handles spacing
6. **Rationale/Audit Links** _(Shared)_ — Ghost text buttons: View rationale, View audit trail, Report issue

## State variations

- **Source only** _(sources provided, showFeedback=false)_ — Data sources row only — minimal attribution for lightweight responses
- **Attribution + feedback** _(attribution + showFeedback=true)_ — Freshness line and feedback bar — standard for most AI-assisted responses
- **Full footer** _(all regions visible)_ — Sources, attribution, feedback, rationale links — for high-value AI outputs
- **Compact / panel** _(compact={true})_ — Chips collapse behind overflow, single-line — optimized for narrow panels
- **Stale data** _(status="stale")_ — Orange warning row: "Data may be stale · Last refreshed 2 hours ago"
- **Missing source** _(status="missing-source")_ — Orange warning row: "Some sources unavailable · Confidence reduced"
- **Audit-ready** _(status="audit-ready" + showAuditTrail)_ — View audit trail link visible — for consequential AI outputs

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `sources` | `AISource[]` | `[]` | Data source chip objects — label, freshness, type, href |
| `maxVisibleSources` | `number` | `3` | Max chips shown before "+N more" overflow |
| `attribution` | `string` | `undefined` | Attribution text e.g. "Guild Analytics" |
| `updatedAt` | `string` | `undefined` | Freshness label e.g. "just now" or "12 min ago" |
| `freshnessLabel` | `string` | `undefined` | Overrides computed freshness text entirely |
| `showDivider` | `boolean` | `true` | Top divider rule between AI output and footer |
| `showFeedback` | `boolean` | `true` | Show AIFeedbackBar sub-atom |
| `showRationale` | `boolean` | `false` | Show "View rationale" ghost link |
| `showAuditTrail` | `boolean` | `false` | Show "View audit trail" ghost link |
| `status` | `"default" \| "stale" \| "missing-source" \| "readonly" \| "audit-ready"` | `"default"` | Controls warning state and color treatment |
| `compact` | `boolean` | `false` | Shorthand for layout="panel" — collapses chip row |
| `layout` | `"default" \| "compact" \| "panel" \| "command-center"` | `"default"` | Layout variant for different surfaces |
| `disabled` | `boolean` | `false` | Disables all interactive link buttons |
| `onViewRationale` | `() => void` | `undefined` | Handler for View rationale link |
| `onViewAuditTrail` | `() => void` | `undefined` | Handler for View audit trail link |
| `onReportIssue` | `() => void` | `undefined` | Handler for Report issue link — shows when provided |

## Tokens

### Source Chips (default)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.surface.default` | `#F5F6FF` | Default source chip background |
| `AI.color.border.default` | `#BECAFE` | Default source chip border |
| `AI.color.text.secondary` | `#4D60E6` | Default source chip label |

### Stale / Warning
| Token | Value | Usage |
| --- | --- | --- |
| `SIGNAL_ORANGE['00']` | `#FEFBF4` | Stale chip background |
| `SIGNAL_ORANGE[20]` | `#FFD68F` | Stale chip border |
| `SIGNAL_ORANGE[60]` | `#EC7200` | Warning icon color |
| `SIGNAL_ORANGE[70]` | `#CB6100` | Warning text color |

## Flows

### AI recommendation with sources
Recommendation appears, footer shows sources and freshness, user opens rationale, user rates response
- Recommendation renders above footer
- Footer shows DATA SOURCES chips + "Updated 12 min ago"
- RiUserLine clicks View rationale → onViewRationale fires
- RiUserLine clicks thumbs up in AIFeedbackBar
- Feedback state updates

### Stale data response
AI output appears with outdated source — footer flags it prominently
- AI response renders
- Footer status="stale" → orange warning row shows
- Stale source chip renders with orange border
- RiUserLine sees "Data may be stale · Last refreshed 2 hours ago"
- RiUserLine takes action to refresh or view source details

## Canonical implementation

```tsx
import { AIResponseFooter } from '@/components/ai/molecules/ai-response-footer/AIResponseFooter';

// Standard — attribution + feedback
<AIResponseFooter
  attribution="Guild Analytics"
  updatedAt="just now"
  showFeedback
/>

// Full footer with sources
<AIResponseFooter
  sources={[
    { label: 'Guild Analytics', freshness: 'fresh' },
    { label: 'Territory DB' },
    { label: 'Forecast' },
    { label: 'RiPulseLine' },
  ]}
  maxVisibleSources={3}
  attribution="Sources: CRM, Forecast, RiPulseLine"
  updatedAt="12 min ago"
  showFeedback
  showRationale
  onViewRationale={() => openRationale()}
/>

// Stale data state
<AIResponseFooter
  status="stale"
  updatedAt="2 hours ago"
  sources={[{ label: 'Territory DB', freshness: 'stale' }]}
  showFeedback
/>

// Compact panel layout
<AIResponseFooter
  sources={[{ label: 'Guild Analytics' }, { label: 'Forecast' }, { label: 'RiPulseLine' }]}
  maxVisibleSources={1}
  attribution="Guild Analytics"
  updatedAt="just now"
  compact
  showFeedback
/>
```

## Agent rules

1. Read this mirror spec and `ai-response-footer.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-response-footer/ai-response-footer.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
