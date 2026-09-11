# AI Analysis Message

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiAnalysisMessage`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The primary output surface for AI-generated analysis. Structured insights are labeled, sourced, and confidence-rated — so users can calibrate trust before acting.

AIAnalysisMessage is the canonical group component for delivering structured AI-generated analysis in conversational and panel surfaces. It composes an AI attribution header, optional intro text, one or more AIAnalysisInsight cards, a data sources footer, and feedback actions into a single coherent output unit. Each insight is labeled by type, rated by confidence, and grounded with data provenance — making every AI statement attributable and trust-calibrated before the user acts on it.

**Export:** `AIAnalysisMessage`

Do not use AIAnalysisMessage for urgent alerts or system events — use AINotification instead. Do not use it for simple one-sentence answers — use a plain message bubble.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-analysis-message/AIAnalysisMessage.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-analysis-message/ai-analysis-message.md` | This mirror spec |
| `components/ai/organisms/ai-analysis-message/ai-analysis-message.agent.json` | Agent manifest |
| `components/ai/organisms/ai-analysis-message/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Analyze · Summarize · Explain · Compare · Recommend · Evaluate |
| Accountability | Sources · Confidence · Data freshness · Rationale · Assumptions · Feedback |

## When to use

- When ZAIDYN AI summarizes report data or presents multiple analytical findings
- When the response needs structured insight cards with type labels and confidence ratings
- When users need data sources and feedback controls — AI Assisted Side Panel, Command Center, or response thread
- When the AI compares performance, surfaces observations, or explains patterns with source context

## When not to use

- Simple one-sentence answers — use a plain message bubble instead
- Urgent alerts or blocked states that should be notifications — use AINotification instead
- Generic product cards that are not AI-authored analysis
- Contexts where confidence, sources, or metrics cannot be verified — do not fabricate these fields

## Anatomy

1. **AI Attribution Row** _(Shared)_ — AIMessageHeader — AI avatar + agent label + timestamp establishes AI authorship
2. **Collapse/Expand Toggle** _(Unique)_ — Optional show/hide control when insights are present — preserves workspace
3. **Intro Text** _(Unique)_ — Optional preamble sentence setting context above insight cards
4. **AIAnalysisInsight Card(s)** _(Unique)_ — One or more structured findings — each with type label, confidence badge, body, and optional actions
5. **Follow-up Actions** _(Unique)_ — Optional action buttons for recommended next steps from the analysis
6. **AIResponseFooter** _(Shared)_ — Data sources strip, attribution, feedback bar, and rationale/audit links

## State variations

- **Default** _(status="default")_ — All insights rendered with confidence badges and source footer visible
- **Loading / Generating** _(loading={true})_ — Skeleton insight cards pulse while AI is generating response
- **Complete** _(status="complete")_ — All insights resolved; footer and feedback controls are active
- **Collapsed** _(collapsed={true})_ — Insights hidden — only attribution header visible with expand toggle
- **Expanded** _(status="expanded")_ — Full message with all insight cards, sources, and feedback bar
- **With source footer** _(showFooter={true} sources=[...])_ — Data sources row visible with source chips from AIResponseFooter
- **With feedback selected** _(onFeedback provided)_ — User has rated the response — feedback state reflected in AIFeedbackBar
- **With follow-up action** _(actions=[...])_ — Follow-up action buttons rendered below insight cards
- **Error** _(status="error")_ — Analysis unavailable — red error card with recovery guidance
- **Empty / no insights** _(insights=[])_ — No findings returned — neutral empty state message

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `attribution` | `string` | `"AI Analysis"` | Agent label in the attribution row |
| `timestamp` | `string` | `"Just now"` | Timestamp shown next to the attribution label |
| `intro` | `string` | `undefined` | Optional intro sentence rendered above the insight cards |
| `insights` | `AIInsightItem[]` | `[]` | Array of insight objects — each renders as an AIAnalysisInsight card |
| `sources` | `AISource[]` | `[]` | Data source objects passed to AIResponseFooter |
| `showFooter` | `boolean` | `true` | Show AIResponseFooter with sources and feedback bar |
| `showFeedback` | `boolean` | `true` | Show feedback thumbs and actions inside the footer |
| `status` | `MessageStatus` | `"default"` | default \| loading \| complete \| expanded \| collapsed \| error \| empty |
| `loading` | `boolean` | `false` | When true, renders skeleton insight cards — overrides status |
| `collapsed` | `boolean` | `false` | Initial collapsed state — shows only attribution header |
| `actions` | `{ label, onClick }[]` | `undefined` | Optional follow-up action buttons below insight cards |
| `onFeedback` | `(v: "up"\|"down") => void` | `undefined` | Feedback callback passed to AIResponseFooter |
| `onViewRationale` | `() => void` | `undefined` | Shows View rationale link in footer when provided |
| `onCopy` | `() => void` | `undefined` | Copy action passed to AIResponseFooter |
| `onShare` | `() => void` | `undefined` | Share action passed to AIResponseFooter |

## Tokens

### Insight — Key Trend
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `#0DACAD` | Left border for Key Trend insight cards |
| `bg` | `#f1feff` | Background fill for Key Trend cards |
| `label` | `#097174` | Label and confidence text for Key Trend cards |

### Insight — Observation
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `AI.color.action.primary (#4D60E6)` | Left border for Observation cards |
| `bg` | `AI.color.surface.default (#F5F6FF)` | Background for Observation cards |

### Insight — Risk Signal
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `#E74C3C` | Left border for Risk Signal cards |
| `bg` | `#FFF5F5` | Background for Risk Signal cards |
| `label` | `#C0392B` | Label text for Risk Signal cards |

### Insight — Recommendation / Watchout
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `ZS_ORANGE[60] (#EC7200)` | Left border for Recommendation and Watchout cards |
| `bg` | `ZS_ORANGE["00"] (#FEFBF4)` | Background for Recommendation and Watchout cards |
| `label` | `ZS_ORANGE[70] (#CB6100)` | Label text for Recommendation and Watchout cards |

## Flows

### AI Assisted analysis response
User asks for Q1 trends — AI message streams then reveals structured insights
- Mount with loading={true}
- Skeleton insight cards pulse while AI generates
- Response resolves → set loading={false}, pass insights array
- Insights fade in with AIAnalysisInsight cards
- AIResponseFooter appears with source chips and feedback bar
- User rates output — onFeedback fires

### Recommendation with rationale
AI presents risk signal and recommendation — user opens rationale
- Render insights including riskSignal and recommendation types
- User taps Why this? on a risk insight — onViewRationale fires
- AIRationalePanel opens in parent overlay
- User applies recommendation via follow-up action button

## Canonical implementation

```tsx
import { AIAnalysisMessage } from '@/components/ai/organisms/ai-analysis-message/AIAnalysisMessage';

<AIAnalysisMessage
  attribution="AI Analysis"
  timestamp="Just now"
  intro="Based on your Q1 alignment data, here are the key insights:"
  insights={[
    {
      type: 'keyTrend',
      body: 'Q1 oncology territories show 23% higher engagement in Northeast regions. Current alignment creates coverage gaps in 3 critical accounts.',
      confidence: 'high',
    },
    {
      type: 'observation',
      body: 'Southwest team capacity is underutilized at 67% relative to customer density.',
      confidence: 'medium',
    },
    {
      type: 'riskSignal',
      body: '3 critical accounts show declining engagement and no assigned follow-up.',
      confidence: 'high',
    },
  ]}
  sources={[
    { label: 'ZAIDYN Analytics' },
    { label: 'Territory DB' },
    { label: '+ 2 more' },
  ]}
/>
```

## Agent rules

1. Read this mirror spec and `ai-analysis-message.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-analysis-message/ai-analysis-message.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
