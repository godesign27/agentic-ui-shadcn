# AI Source Accordion

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiSourceAccordion`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Collapsible question-scoped multi-select. Stacks selectable AISourceTile rows under a header with a live "N selected" pill; optional free-text row + Continue CTA.

AISourceAccordion is a collapsible, question-scoped multi-select surface used for agent decision prompts ("Which brand(s) is this campaign for?", "Which sources should the agent draw from?"). A header pairs the question with a live "N selected" pill; expanding the accordion reveals a grouped list of selectable AISourceTile rows and — optionally — a free-text row for adding user-authored options and a Continue CTA. Selection state can be controlled or uncontrolled.

**Export:** `AISourceAccordion`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-source-accordion/AISourceAccordion.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-source-accordion/ai-source-accordion.md` | This mirror spec |
| `components/ai/organisms/ai-source-accordion/ai-source-accordion.agent.json` | Agent manifest |
| `components/ai/organisms/ai-source-accordion/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | — |
| AI behavior | — |
| Accountability | — |

## When to use

- Agent needs the user to pick one or more items from a short list before proceeding
- A single question governs several selectable options + potentially user-authored additions
- Selection state needs to travel forward as a group (multi-brand picker, source picker, capability picker)

## When not to use

- A binary yes/no — use AIToggle
- A single-choice picker — a radio group is a better fit (this component is intentionally multi-select)
- A search-based long-tail picker — this component doesn't include filter / search UI
- A form field — for structured input, reach for a native form component

## Anatomy

undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined
undefined. **undefined** _(undefined)_ — undefined

## State variations

- **undefined** _(undefined)_ — Default open state with two rows selected — matches the "Which brand" reference.
- **undefined** _(undefined)_ — Closed accordion — chevron rotated, body hidden. Header still shows "N selected" pill.
- **undefined** _(undefined)_ — Adds a dashed-tile row with an inline input for user-authored options.
- **undefined** _(undefined)_ — Adds a full-width primary-solid Continue CTA that reports the current selection.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `` | `ReactNode` | `` | Header label — the decision prompt this accordion scopes. |
| `` | `AISourceAccordionOption[]` | `` | Rows to render. Each option supports title, subtitle, rank, tone, disabled. |
| `` | `string[]` | `` | Controlled selection — pair with onChange. |
| `` | `(ids: string[]) => void` | `` | Fires whenever selection changes (controlled or uncontrolled). |
| `` | `string[]` | `` | Uncontrolled default selection. Defaults to []. |
| `` | `boolean` | `` | Renders a dashed-tile free-text row below the last option. |
| `` | `string` | `` | Placeholder for the free-text input. Defaults to "Or type…". |
| `` | `(value: string) => void` | `` | Fires when the user submits the free-text row. |
| `` | `string` | `` | Continue CTA label. Renders only when paired with onSubmit. |
| `` | `(selectedIds: string[]) => void` | `` | CTA click handler — receives the current selection. |
| `` | `boolean` | `` | Initial open state. Defaults to true. |
| `` | `boolean` | `` | Suppresses toggling + CTA + input. |
| `` | `AISourceTileTone` | `` | Applied to rows that don't set their own tone. Defaults to "ai". |

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
| `undefined` | `undefined` | undefined |

## Flows

### undefined


### undefined


### undefined

## Canonical implementation

```tsx
import { AISourceAccordion } from '@/components/ai/organisms/ai-source-accordion/AISourceAccordion';

<AISourceAccordion
  question="Which brand(s) is this campaign for?"
  options={[
    { id: 'cortinol', title: 'CORTINOL', subtitle: 'Immunology',   rank: 1 },
    { id: 'alphera',  title: 'ALPHERA',  subtitle: 'Endocrinology', rank: 2 },
    { id: 'betavex',  title: 'BETAVEX',  subtitle: 'Cardiology',    rank: 3 },
  ]}
  defaultSelectedIds={['cortinol', 'alphera']}
  allowCustom
  customPlaceholder="Or type a brand…"
  onCustomSubmit={(v) => addBrand(v)}
  ctaLabel="Continue (portfolio)"
  onSubmit={(ids) => next(ids)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-source-accordion.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-source-accordion/ai-source-accordion.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
