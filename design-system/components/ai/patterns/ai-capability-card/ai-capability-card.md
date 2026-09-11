# AI Capability Card

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCapabilityCard`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compact card that surfaces a specific AI capability or model skill, with origin chip + Inspect affordance.

AICapabilityCard is a compact, reusable card for representing a single AI capability, model skill, or agent behavior. Each card pairs an origin chip (System Defined / Client Extended / User Configured / Experimental) with a bold title, a short description, and a layers footnote. Clicking the card opens a detail drawer with the capability's reasoning summary, confidence + trend metrics, autonomy boundaries, and knowledge inputs — making the agent's skills inventoryable and reviewable. A "View Full Details" footer link deep-links to a standalone capability page when configured.

**Export:** `AICapabilityCard`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-capability-card/AICapabilityCard.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-capability-card/ai-capability-card.md` | This mirror spec |
| `components/ai/organisms/ai-capability-card/ai-capability-card.agent.json` | Agent manifest |
| `components/ai/organisms/ai-capability-card/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | — |
| AI behavior | — |
| Accountability | — |

## When to use

- A capability gallery or inspector needs an inventoryable view of agent skills
- Capability origin (system / client / user / experimental) needs to be explicit
- Capabilities need to be marked needs-review or disabled with a clear reason

## When not to use

- A single binary toggle is enough — use ai-toggle
- You need to show *what an agent did*, not *what it can do* — use ai-card-agent-reasoning
- A long-form capability spec is needed — use a dedicated capability detail page

## Anatomy

undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined

## State variations

- **undefined** _(undefined)_ — Default treatment — full description + footnote. Click opens the detail drawer.
- **undefined** _(undefined)_ — Client-authored capabilities — teal-toned chip, brand-blue Extend dot.
- **undefined** _(undefined)_ — ZS orange border + needs-review status — flags capabilities that require human approval.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `` | `string` | `` | Capability name. Rendered bold at 18px. |
| `` | `string` | `` | Short clarification of what the capability does. |
| `` | `'system-defined' \| 'client-extended' \| 'user-configured' \| 'experimental'` | `` | Source of the capability. Drives the chip tint. |
| `` | `'active' \| 'disabled' \| 'needs-review'` | `` | Operational status. Drives the right-side status indicator and border tint. |
| `` | `string` | `` | ZAIDYN icon class for the drawer header tile. |
| `` | `ReactNode` | `` | Dashed-rule footnote with a layers glyph. |
| `` | `string` | `` | Override the right-side action label (defaults from status). |
| `` | `() => void` | `` | Override default drawer behavior. When set, the drawer does not open automatically. |
| `` | `() => void` | `` | When set, the drawer renders a "View Full Details" footer CTA. |
| `` | `AICapabilityDetail` | `` | Drawer content — reasoningSummary, confidence, trend, autonomy[], knowledgeInputs[]. |
| `` | `boolean` | `` | Controlled drawer state. Omit to use internal state. |
| `` | `() => void` | `` | Notify parent that the drawer wants to close (controlled mode). |
| `` | `string` | `` | When set, forces disabled styling + tooltip. |

## Tokens

### undefined
| Token | Value | Usage |
| --- | --- | --- |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |

### undefined
| Token | Value | Usage |
| --- | --- | --- |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |

### undefined
| Token | Value | Usage |
| --- | --- | --- |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |

### undefined
| Token | Value | Usage |
| --- | --- | --- |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |
| `undefined` | `undefined` | undefined |

## Flows

### undefined


### undefined

## Canonical implementation

```tsx
import { AICapabilityCard } from '@/components/ai/organisms/ai-capability-card/AICapabilityCard';

<AICapabilityCard
  origin="system-defined"
  status="active"
  iconName="zs-icon-ai-assist"
  title="Density Awareness"
  description="Evaluates HCP and zip code clustering to ensure efficient routing."
  supportingNote="Used to flag geographically inefficient territories."
  detail={{
    reasoningSummary: '"I identify spatial inefficiencies by clustering HCP locations against zip code centroids."',
    confidence: 94,
    confidenceLabel: 'High',
    trend: 'Stable',
    autonomy: [
      { label: 'Acts Silently On',          scope: 'Routing efficiency monitoring, Density heat-map generation', tone: 'silent' },
      { label: 'Requires Confirmation For', scope: 'Route assignment changes',                                   tone: 'confirm' },
    ],
    knowledgeInputs: [
      { label: 'Geospatial Engine', source: 'System' },
    ],
  }}
  onViewFullPage={() => navigate('/capabilities/density-awareness')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-capability-card.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-capability-card/ai-capability-card.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
