# AI Search

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiSearch`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The standard Search, themed. Teal becomes AI brand, square corners become rounded, and the field gains a focus ring.

AI Search is a one-for-one port of the standard DS Search onto the AI surface. Both libraries describe the same two component sets — Search (Size x Condensed) and Dropdown Filter (Orientation x Size) — and both build them over a single shared field whose left icon and caret are independent toggles. That shared box is the whole reason the two sets cannot drift apart.

**Export:** `AISearch`

Only three things move in the port. The accent: the standard’s teal --zs-background-primary-bold maps to AI.color.action.primary (#4D60E6) on the button, and the magnifier picks up AI.color.brand. The corners: the standard’s deliberate 0px is a standard-only rule, so the radius comes from AI.radius, stepping down on X-Small so a 38px field does not turn into a stadium, and the condensed trigger goes fully round. And the ring: AI.shadow.field.default at rest, AI.shadow.field.focus on focus, matching AIInputField — on a tinted AI panel the resting ring is what makes an input read as an input.

Everything neutral stays exactly where it was. White field, --zs-text-helper placeholder ink, --zs-text-default typed text, --zs-text-inverse button label. Re-tinting those would make this a different control rather than the same control themed.

Two rules carry over verbatim, because they are about meaning rather than style. Placeholder text is always italic, flipping upright the moment a value is typed — italic is the placeholder signal. And Dropdown Filter never gets a button: it filters live, and adding one would make it a different component. X-Small stays annotated not-recommended in both sets.

One thing is AI-only. `busy` hangs an indeterminate hairline under the field while a query is in flight, because agentic search is asynchronous in a way list filtering is not. It reuses AIProgressBar rather than reimplementing one, so it inherits the dropped aria-valuenow and the reduced-motion park.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/search/AISearch.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-search/ai-search.md` | This mirror spec |
| `components/ai/atomic/ai-search/ai-search.agent.json` | Agent manifest |
| `components/ai/atomic/ai-search/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted |
| AI behavior | Recall |
| Accountability | Audit trail |

## When to use

- Filtering or searching a table, list, or content area on an AI surface
- A dense toolbar that needs a search affordance in one square of space (condensed)
- A category-plus-keyword filter pair over a result set

## When not to use

- Do not add a button to AIDropdownFilter — it filters live, and a button makes it a different component
- Do not use X-Small; it is annotated not-recommended in both libraries
- Do not square the corners to match the standard — 0px is a standard-only rule and rounding is the AI theme
- Do not re-tint the neutrals; only the accent moves between the two libraries
- For a labelled form input with helper text and validation, use ai-input-field instead

## Anatomy

1. **Root** _(Shared)_ — form[role="search"], horizontal, 8px gap. The condensed variant short-circuits to a single square button and renders no form.
2. **Search field** _(Shared)_ — AISearchField — the one box both component sets instance. White fill, 1px AI_RAMP[70] border, AI.shadow.field ring, height and padding from the size table.
3. **Left icon** _(Unique)_ — Filled magnifier vector, same path as the standard, filled with AI.color.brand instead of neutral grey. On the dropdown select field this is off.
4. **Right caret** _(Unique)_ — Filled triangle, kept at --zs-icon-neutral-default — it is chrome, not identity. On the search field this is off.
5. **Placeholder** _(Shared)_ — Always italic at the size’s font size in --zs-text-helper; flips to upright --zs-text-default when a value exists.
6. **Action button** _(Unique)_ — Solid AI.color.action.primary, SemiBold label in --zs-text-inverse, border matching its own fill so the box measures like the field’s. Hover steps to primaryHover.
7. **Condensed** _(Unique)_ — Exactly height x height, AI.radius.full. Icon only, no text, no button — a circular icon trigger.
8. **Filter root** _(Shared)_ — Two fields, horizontal or stacked, 8px gap, equal width. No button, by design.
9. **Corner radius** _(Unique)_ — AI.radius.md on Normal and Small, AI.radius.sm on X-Small, AI.radius.full on the condensed square. The one intentional divergence from the standard’s 0px.
10. **Busy hairline** _(Unique)_ — AIProgressBar, indeterminate, hairline. AI-only; sits under the field and drops aria-valuenow.

## State variations

- **Size scale** _(size)_ — Normal 50px, Small 44px, X-Small 38px. X-Small is banded and dimmed — it is annotated not-recommended upstream.
- **Condensed** _(condensed)_ — Icon-only square, pinned to height x height and fully rounded.
- **With button** _(button)_ — Field plus a solid brand submit button, 8px apart.
- **Field only** _(button={false})_ — The bare field, for toolbars that already have a submit affordance.
- **Filled** _(value)_ — A typed value flips the text upright and to Text/Default.
- **Focused** _(:focus)_ — AI.shadow.field.focus ring and the brand border — the AI-only addition over the standard.
- **Busy** _(busy)_ — Indeterminate hairline under the field while a query is in flight. AI-only.
- **Filter — horizontal** _(orientation="horizontal")_ — Select and search side by side, equal width, no button.
- **Filter — vertical** _(orientation="vertical")_ — The same two fields stacked, select on top.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `AISearch · size` | `'normal' \| 'small' \| 'x-small'` | `'normal'` | Height, padding, icon, font and radius. X-Small is not recommended. |
| `AISearch · condensed` | `boolean` | `false` | Icon-only round trigger, exactly height x height. Suppresses the button. |
| `AISearch · button` | `boolean` | `true` | Render the solid brand submit button beside the field. |
| `AISearch · value` | `string` | `''` | Controlled value. A non-empty value flips the text upright. |
| `AISearch · onChange` | `(value: string) => void` | `—` | Fires on every keystroke. |
| `AISearch · onSearch` | `(value: string) => void` | `—` | Fires on submit, or on click in the condensed variant. |
| `AISearch · busy` | `boolean` | `false` | AI-only. Indeterminate hairline under the field. |
| `AISearch · fieldWidth` | `number \| 'fill'` | `332` | Field width. "fill" stretches to the container. |
| `AISearch · disabled` | `boolean` | `false` | Dims to 0.55 and drops the ring. |
| `AIDropdownFilter · orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Side by side or stacked. Both fields keep equal width. |
| `AIDropdownFilter · filterValue / searchValue` | `string` | `''` | The two independently controlled values. |
| `AISearchField · leftIcon` | `boolean` | `true` | Show the magnifier. Off on the dropdown select field. |
| `AISearchField · caret` | `boolean` | `false` | Show the caret. On for the dropdown select field. |
| `AISearchField · asSelect` | `boolean` | `false` | Render a listbox trigger button instead of a text input. |
| `AISearchField · focusState` | `boolean` | `—` | Force the focused visual for docs and previews. |

## Tokens

### Surface + border
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-background-default` | `#FFFFFF` | Field fill. Shared with the standard — unchanged in the port. |
| `AI_RAMP[70]` | `#657CEC` | Rest border. One step softer than AI.color.border.default, matching AIInputField. |
| `AI.color.border.focus` | `#4D60E6` | Border on focus. |
| `AI.shadow.field.default` | `0 0 0 1px #BECAFE` | Resting ring. AI-only — the standard bar has none. |
| `AI.shadow.field.focus` | `0 0 0 2px #3544A4` | Focus ring. |

### Accent
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.action.primary` | `#4D60E6` | Button fill and its matching border. This is the teal swap. |
| `AI.color.action.primaryHover` | `#3544A4` | Button hover. |
| `AI.color.brand` | `#4D60E6` | Magnifier fill. Neutral in the standard, brand here. |

### Text + icon ink (unchanged)
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-text-helper` | `#5B5864` | Placeholder ink. |
| `--zs-text-default` | `#2F2C3C` | Typed value ink. |
| `--zs-text-inverse` | `#FAFAFA` | Button label. |
| `--zs-icon-neutral-default` | `#5B5864` | Caret fill — chrome, so it stays neutral. |

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-font-family` | `"Open Sans", system-ui, sans-serif` | The only face used, per the design system. |
| `font-style: italic` | `400 italic` | Placeholder only. Flips upright when filled. |
| `font-weight: 600` | `SemiBold` | Button label. |

### Geometry
| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.md` | `16px` | Field and button on Normal and Small. |
| `AI.radius.sm` | `12px` | Field on X-Small, so it stays rectangular. |
| `AI.radius.full` | `100px` | The condensed square, read as a circular trigger. |

## Flows

### Run a search
The default path for the button variant.
- Field renders empty with italic placeholder and the resting ring
- User focuses — border steps to AI.color.border.focus, ring to AI.shadow.field.focus
- User types — text flips upright to --zs-text-default
- User submits with Enter or the Search button — onSearch fires with the current value
- If the query is asynchronous, set busy to hang the indeterminate hairline until results land

### Filter a list live
The Dropdown Filter path. There is no submit step.
- User picks a category from the select field — onFilterChange fires and the list narrows
- User types in the search field — onSearchChange fires on every keystroke
- Results update continuously; no button is offered because none is needed

## Canonical implementation

```tsx
import {
  AISearch,
  AIDropdownFilter,
} from '@/components/ai/atomic/search/AISearch';

// Search bar with a submit button
const [q, setQ] = useState('');

<AISearch
  size="normal"
  value={q}
  onChange={setQ}
  onSearch={(v) => runQuery(v)}
/>

// Field only, no button
<AISearch size="small" button={false} value={q} onChange={setQ} />

// Condensed round trigger for a dense toolbar
<AISearch size="small" condensed onSearch={() => openSearchPanel()} />

// Busy — indeterminate hairline while the agent runs the query
<AISearch size="normal" value={q} onChange={setQ} busy={pending} />

// Dropdown Filter — no button, filters live
<AIDropdownFilter
  size="normal"
  orientation="horizontal"
  filterPlaceholder="Select an option"
  filterValue={category}
  onFilterChange={setCategory}
  searchValue={q}
  onSearchChange={setQ}
/>
```

## Agent rules

1. Read this mirror spec and `ai-search.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-search/ai-search.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
