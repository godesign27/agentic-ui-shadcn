# AI Card Agent Reasoning

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardAgentReasoning`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Surface an agent's reasoning + optional optimization drivers behind an Explainability toggle.

AICardAgentReasoning is the canonical "what the agent is thinking" card for AI-led surfaces. The header carries the agent identity (avatar, name, AGENT chip, REASONING & ANALYSIS eyebrow) and a live-status pill. A white AI Summary panel renders a brief headline + a quoted longer analysis under a divider. In Simple density an Optimization Drivers panel appears below, listing each driver with its percentage contribution and a qualitative intensity chip (only High gets a tinted chip; Medium / Low render as plain labels). A footer pairs an Explainability toggle with a primary "Deepen Analysis" action. Use this card whenever you need to surface an agent's reasoning + decision drivers in a governable, scannable way — e.g. inside an Agent Drawer, on a generated dashboard, or above a workspace.

**Export:** `AICardAgentReasoning`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-agent-reasoning/AICardAgentReasoning.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-agent-reasoning/ai-card-agent-reasoning.md` | This mirror spec |
| `components/ai/organisms/ai-card-agent-reasoning/ai-card-agent-reasoning.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-agent-reasoning/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · AI Assisted |
| AI behavior | Explain · Summarize · Prioritize · Recommend |
| Accountability | Rationale · Assumptions · Confidence · Sources · Owner |

## When to use

- Surfacing an agent's reasoning behind a recommendation
- Showing the weighted decision drivers when Explainability is on
- Inside an AI Agent Drawer, a generated dashboard, or above an AI Led workspace

## When not to use

- For an active conversation with the agent — use the AI Command Center Dialog group
- For a list of insights without an agent identity — use AIInsightList
- For a step-by-step trace of agent operations — use AIReasoningTrace
- When the surface needs the full agent persona introduction (capabilities, talk script) — use AICardAgent

## Anatomy

1. **Card surface** _(Unique)_ — Subtle brand-tinted gradient (AI.gradient.surface.subtle) + 1px AI_RAMP[30] border + 20px padding.
2. **Agent header** _(Shared)_ — Brain avatar bubble + agent name + AGENT chip + REASONING & ANALYSIS eyebrow.
3. **Live pill** _(Shared)_ — Top-right "● LIVE" status — green dot + bold label.
4. **AI Summary panel** _(Unique)_ — White inner card — "AI SUMMARY" eyebrow, brief headline, divider, longer quoted analysis.
5. **Optimization Drivers** _(Unique)_ — Simple only. White inner card — row per driver (label + percentage + intensity chip).
6. **Explainability toggle** _(Shared)_ — role="switch" pill toggle — brand fill when on, neutral when off.
7. **Deepen Analysis CTA** _(Shared)_ — AIButton primary — refresh glyph + "Deepen Analysis" label.

## State variations

- **Basic** _(density="basic")_ — Header + AI Summary + footer. Use when only the summary + agent identity is required.
- **Simple** _(density="simple")_ — Adds the Optimization Drivers panel. Use when the user needs to see the weighted decision factors.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `'basic' \| 'simple'` | `—` | Required. Drives whether the Optimization Drivers panel renders. |
| `agentName` | `string` | `'Guild'` | Bold display name in the header. |
| `agentRole` | `string` | `'AGENT'` | Small tier chip next to the name. |
| `agentEyebrow` | `string` | `'REASONING & ANALYSIS'` | Uppercase subtitle eyebrow under the name. |
| `live` | `boolean` | `true` | Show the green "● LIVE" pill in the top right. |
| `summary` | `{ headline; detail }` | `—` | Required. Brief headline + longer quoted analysis. |
| `drivers` | `{ label; weight; intensity }[]` | `undefined` | Simple-density only. Each row renders the label + percentage + intensity (High gets a tinted chip). |
| `explainability` | `boolean` | `false` | Controls the toggle. When `onExplainabilityChange` is not wired, the card manages local state. |
| `onExplainabilityChange` | `(next: boolean) => void` | `undefined` | External handler for the Explainability toggle. |
| `onDeepenAnalysis` | `() => void` | `undefined` | Click handler for the primary "Deepen Analysis" CTA. |

## Tokens

### Card surface
| Token | Value | Usage |
| --- | --- | --- |
| `card.surface` | `AI.gradient.surface.subtle` | Subtle brand-tinted gradient backdrop |
| `card.border` | `AI_RAMP[30]` | Outer card border + inner panel borders |
| `card.radius` | `AI.radius.lg` | 20px outer radius |

### Agent identity
| Token | Value | Usage |
| --- | --- | --- |
| `avatar.bubble.bg` | `AI_RAMP[20]` | Brain-icon bubble background |
| `avatar.brain.color` | `AI_RAMP[90]` | Brain glyph stroke |
| `role.chip.bg` | `AI_RAMP[20]` | "AGENT" chip background |
| `role.chip.border` | `AI_RAMP[30]` | "AGENT" chip border |
| `role.chip.text` | `AI_RAMP[90]` | "AGENT" chip label |

### AI Summary eyebrow
| Token | Value | Usage |
| --- | --- | --- |
| `eyebrow.color` | `AI_RAMP[90]` | "AI SUMMARY" / panel eyebrows |

### Driver intensity
| Token | Value | Usage |
| --- | --- | --- |
| `driver.high.bg` | `AI_RAMP[30]` | High intensity chip background |
| `driver.high.border` | `AI.color.border.subtle — AI_RAMP[60]` | High intensity chip border |
| `driver.high.text` | `AI_RAMP[100]` | High intensity chip text |
| `driver.med-low.text` | `var(--ai-ds-helper)` | Medium / Low intensity labels (no chip) |

### Footer
| Token | Value | Usage |
| --- | --- | --- |
| `toggle.on.bg` | `AI.color.brand` | Toggle ON background |
| `toggle.off.bg` | `var(--ai-card-bg-raised)` | Toggle OFF background |
| `cta.fill` | `AI.color.brand` | Deepen Analysis button |

## Flows

### Show the agent reasoning behind a recommendation
Standard governance / explainability surface.
- Pass the agent identity (name / role / eyebrow) + a structured summary
- In Simple density, pass `drivers` to show the weighted decision factors
- Wire `onExplainabilityChange` to persist user preference across sessions if needed
- Wire `onDeepenAnalysis` to open the agent's deeper analysis surface

## Canonical implementation

```tsx
import { AICardAgentReasoning } from '@/components/ai/organisms/ai-card-agent-reasoning/AICardAgentReasoning';

<AICardAgentReasoning
  density="simple"
  agentName="Guild"
  agentRole="AGENT"
  agentEyebrow="REASONING & ANALYSIS"
  summary={{
    headline: 'Scaling the cardiovascular sales force by 15% in high-growth metro clusters.',
    detail: 'The proposed Boston cluster re-alignment prioritizes travel time efficiency over account count variance…',
  }}
  drivers={[
    { label: 'Population Density',   weight: 35, intensity: 'high'   },
    { label: 'Account Clustering',   weight: 25, intensity: 'medium' },
    { label: 'Travel Infrastructure',weight: 20, intensity: 'high'   },
    { label: 'Historical Utilization',weight: 20, intensity: 'low'   },
  ]}
  explainability
  onExplainabilityChange={(on) => { /* … */ }}
  onDeepenAnalysis={() => { /* open Deepen flow */ }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-agent-reasoning.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-agent-reasoning/ai-card-agent-reasoning.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
