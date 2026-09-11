# Conversational AI Output Showcase

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiConversationalAiOutputShowcase`  
**Component type:** React page  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The definitive reference for Wave 1 conversational AI output patterns. Maps every atom and group component to its experience tier, surface, behaviour verbs, and accountability tokens — with live interactive examples.

The Conversational AI Output Showcase is the primary educational reference for the Wave 1 AI component library. It presents all 18 components — 8 atoms and 10 groups — in a single scrollable page that explains the three-tier experience model, maps components to their primary surfaces, provides a live pattern gallery with scaled previews, and walks through a complete end-to-end AI Led workflow. The page is designed to be shared with product designers, engineers, and AI product managers as an on-boarding and decision-support resource.

**Export:** `ConversationalAIOutputShowcase`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `pages/ConversationalAIOutputShowcase.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/conversational-ai-output-showcase/conversational-ai-output-showcase.md` | This mirror spec |
| `components/ai/pages/conversational-ai-output-showcase/conversational-ai-output-showcase.agent.json` | Agent manifest |
| `components/ai/pages/conversational-ai-output-showcase/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Guide · Explain · Execute |
| Accountability | Audit trail · Rationale · Confidence |

## When to use

- On-boarding new product designers or engineers to the Guild AI system
- Deciding which components belong in a new AI Led or AI Assisted surface
- Presenting the AI component library to stakeholders or design review
- Exploring how atoms compose into groups in a real workflow context

## When not to use

- As a substitute for individual component documentation — always link to the detail page for anatomy, tokens, and code
- In production applications — this is a documentation surface, not a reusable UI pattern

## Anatomy

1. **Hero** _(Unique)_ — Title, subtitle, stat strip, breadcrumb back to /components
2. **Three-Tier Model** _(Unique)_ — Three-column explainer for AI Assisted / Adaptive / AI Led tiers
3. **Surface Mapping** _(Unique)_ — Two-column comparison of Command Center vs Assisted Side Panel
4. **Classification Table** _(Unique)_ — All 18 components in a navigable table with tier, behaviour, and accountability columns
5. **Pattern Gallery** _(Unique)_ — Grid of 18 live-rendered component cards with click-through navigation
6. **AI Led Flow Walkthrough** _(Unique)_ — Five-step interactive stepper showing a full governed agentic workflow
7. **AI Assisted Experience** _(Unique)_ — Side-by-side recall and transparency pattern examples

## State variations

- **Flow Step 1** _(Brief Defined)_ — AICardBrief rendered in the flow stepper
- **Flow Step 2** _(Queue Approved)_ — AICardQueue rendered in the flow stepper
- **Flow Step 3** _(Agents Running)_ — AIWorkstreamControlPanel rendered in the flow stepper
- **Flow Step 4** _(Trust Review)_ — AICardTrustSummary rendered in the flow stepper
- **Flow Step 5** _(Rationale)_ — AIRationalePanel rendered in the flow stepper

## Canonical implementation

```tsx
import ConversationalAIOutputShowcase from '@/pages/ConversationalAIOutputShowcase';

// Route in routes.tsx:
{ path: 'conversational-ai-output-showcase', Component: ConversationalAIOutputShowcase }

// TopNav link in STRATEGY_GROUPS:
{ title: "Conversational AI Output Showcase", path: "/conversational-ai-output-showcase" }
```

## Agent rules

1. Read this mirror spec and `conversational-ai-output-showcase.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/conversational-ai-output-showcase/conversational-ai-output-showcase.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
