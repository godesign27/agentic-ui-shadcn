# AI Rationale

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiRationalePanel`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Collapsible explainability output revealing what the AI found, why it matters, what alternatives were considered, and what assumptions and sources informed the decision. Surfaces in chat, drawers, command center, or any AI output context.

AI Rationale is the primary explainability output for AI-generated decisions. It presents four nested disclosure sections — What I found, Why it matters, What I considered, and Assumptions + Sources — in a collapsible disclosure block that can be embedded in any AI output surface: chat responses in the Command Center, AI Assisted side-panel drawers, rationale drawers in notification cards, or inline below structured group outputs.

**Export:** `AIRationalePanel`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-rationale-panel/AIRationalePanel.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-rationale-panel/ai-rationale-panel.md` | This mirror spec |
| `components/ai/organisms/ai-rationale-panel/ai-rationale-panel.agent.json` | Agent manifest |
| `components/ai/organisms/ai-rationale-panel/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Explain · Evaluate |
| Accountability | Rationale · Assumptions · Sources |

## Anatomy

1. **Toggle Header** _(Shared)_ — "Why this decision?" header with expand/collapse — works as a full-width row in any container
2. **What I Found** _(Unique)_ — Key finding from the analysis
3. **Why It Matters** _(Unique)_ — Business/user impact explanation
4. **What I Considered** _(Unique)_ — Bullet list of alternatives considered
5. **Assumptions + Sources** _(Unique)_ — Assumptions list + AIWhyThisLink sources

## State variations

- **Collapsed** _(defaultOpen=false)_ — Closed — toggle header only visible. Appropriate default when embedded in dense surfaces.
- **Open: Found** _(section=found)_ — "What I found" section expanded — default open state when transparency is the primary action.
- **All Open** _(allOpen=true)_ — All four sections expanded. Used when the user explicitly wants full reasoning context.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `whatFound` | `string` | `required` | Key finding text |
| `whyMatters` | `string` | `required` | Business impact text |
| `considered` | `string[]` | `required` | List of alternatives considered |
| `assumptions` | `string[]` | `required` | List of assumptions |
| `sources` | `RationaleSource[]` | `required` | Sources array with label and optional url |
| `defaultOpen` | `boolean` | `false` | Whether panel starts open |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Toggle header icon and source links |

## Flows

### Transparency review
User reads AI reasoning before acting
- User sees collapsed disclosure below AI output — in chat, drawer, or card
- Clicks to expand
- Reads What I found
- Opens Why it matters
- Reviews sources
- Closes and proceeds with the recommended action

## Canonical implementation

```tsx
import { AIRationalePanel } from '@/components/ai/organisms/ai-rationale-panel/AIRationalePanel';

<AIRationalePanel
  whatFound="7 of 24 EMEA accounts show 3+ churn risk signals based on CRM and product usage data."
  whyMatters="These accounts represent 34% of EMEA ARR — early intervention can prevent ~$2.4M at-risk revenue."
  considered={['Contacted CSM team first', 'Reviewed last 3 QBRs', 'Checked NPS scores']}
  assumptions={['CRM data current as of Jun 1', 'Churn model v2.3 applied']}
  sources={[{ label: 'Salesforce EMEA Report' }, { label: 'Amplitude Cohort Analysis' }]}
  defaultOpen={true}
/>
```

## Agent rules

1. Read this mirror spec and `ai-rationale-panel.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-rationale-panel/ai-rationale-panel.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
