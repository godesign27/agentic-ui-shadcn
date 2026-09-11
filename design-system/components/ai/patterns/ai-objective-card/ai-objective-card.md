# AI Objective Card

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiObjectiveCard`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compact card that frames a goal, constraint, operating mode, or guardrail an agent must respect.

AIObjectiveCard is a compact, reusable card for surfacing a single goal, constraint, operating mode, autonomy boundary, review requirement, optimization target, risk guardrail, knowledge input, or assumption that governs how an agent should behave for a given task or workflow. Each card leads with a bold title and a small icon, anchors the type chip at the top-right, and lists short bullet items beneath. A subtle "View details" link footer connects the card to its underlying configuration drawer.

**Export:** `AIObjectiveCard`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-objective-card/AIObjectiveCard.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-objective-card/ai-objective-card.md` | This mirror spec |
| `components/ai/organisms/ai-objective-card/ai-objective-card.agent.json` | Agent manifest |
| `components/ai/organisms/ai-objective-card/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | — |
| AI behavior | — |
| Accountability | — |

## When to use

- An agent setup or inspector view needs to make the operating contract explicit
- Constraints, guardrails, or autonomy boundaries need standing visibility
- Goals and optimization targets need to be reviewable by humans

## When not to use

- A free-form notes field is sufficient — use a textarea
- The objective is ephemeral / per-message — use a notification
- A multi-step configuration wizard is required — use a dialog with form fields

## Anatomy

undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined

## State variations

- **undefined** _(undefined)_ — Default AI brand treatment — icon + bold title + chip + bulleted goals.
- **undefined** _(undefined)_ — Neutral surface for non-warning categories like constraints + knowledge inputs.
- **undefined** _(undefined)_ — Warning treatment — ZS orange border + orange icon + orange chip + orange bullet dots.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `` | `'primary-goal' \| 'constraint' \| 'operating-mode' \| 'autonomy-boundary' \| 'review-requirement' \| 'optimization-target' \| 'risk-guardrail' \| 'knowledge-input' \| 'assumption'` | `` | Objective category — drives icon, chip tint, and warning treatment. |
| `` | `string` | `` | Bold statement of the goal / constraint / mode. |
| `` | `AIObjectiveItem[]` | `` | Bullet items elaborating the contract. |
| `` | `string` | `` | Override the default icon for the type. |
| `` | `string` | `` | Override the default chip label. |
| `` | `string` | `` | Footer link label. Defaults to "View details". |
| `` | `() => void` | `` | Footer link callback — opens the objective configuration drawer. |

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


### undefined

## Canonical implementation

```tsx
import { AIObjectiveCard } from '@/components/ai/organisms/ai-objective-card/AIObjectiveCard';

<AIObjectiveCard
  type="primary-goal"
  title="Primary Goal"
  items={[
    { text: 'Optimize workload fairness' },
    { text: 'Maximize coverage efficiency' },
    { text: 'Ensure equitable opportunity' },
  ]}
  onInspect={() => openObjectiveDrawer('primary-goal')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-objective-card.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-objective-card/ai-objective-card.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
