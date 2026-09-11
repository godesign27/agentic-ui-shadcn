# AI Source Tile

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiSourceTile`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Tinted icon square + bold title + uppercase source caption — for knowledge inputs, citations, attached files.

AISourceTile surfaces a single knowledge input, data source, citation, attached file, or capability dependency in detail drawers and inspector panels. It composes AIIcon (container + treatment="ai-contained") so the icon tile inherits the brand container chrome correctly and avoids the manual .zs-master-style wrapper bug.

**Export:** `AISourceTile`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/source-tile/AISourceTile.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-source-tile/ai-source-tile.md` | This mirror spec |
| `components/ai/atomic/ai-source-tile/ai-source-tile.agent.json` | Agent manifest |
| `components/ai/atomic/ai-source-tile/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Ground · Cite · Inspect |
| Accountability | Transparency · Provenance · Accountability |

## Anatomy

1. **Icon tile** _(Shared)_ — AIIcon with container=true and treatment=ai-contained (or orange-signal in warning tone).
2. **Title** _(Unique)_ — Bold 13px source name — truncates with ellipsis.
3. **Source caption** _(Optional)_ — Uppercase meta label — "SYSTEM", "EXTERNAL", "PILOT".
4. **Trailing meta** _(Optional)_ — Optional small right-aligned meta (percent, freshness).

## State variations

- **AI tone (default)** _(tone="ai")_ — Brand-blue icon tile. Used for system / external knowledge sources.
- **Warning tone** _(tone="warning")_ — Guild orange icon tile. Reserved for risk / guardrail sources.
- **Interactive** _(onClick)_ — Whole tile becomes a button — drills into the source detail drawer.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `—` | Source name (bold). |
| `source` | `string` | `—` | Uppercase caption shown beneath the title. |
| `iconName` | `string` | `"zs-icon-layers"` | Guild icon class for the leading tile. |
| `tone` | `"ai" \| "warning" \| "error" \| "success" \| "neutral"` | `"ai"` | Drives the icon tile tint, card hover border, and shadow halo. |
| `trailing` | `ReactNode` | `—` | Optional small right-aligned meta. |
| `chevron` | `boolean` | `false` | Show a right-facing chevron affordance. Auto-true when onClick is provided. Suppressed when rank is set. |
| `subtitle` | `ReactNode` | `—` | Second line under the title (mixed-case body-compact). Wins over `source` when both are set. |
| `rank` | `number \| string` | `—` | Small circular badge in the trailing slot (1 · 2 · 99+). Renders instead of the chevron. |
| `selectable` | `boolean` | `false` | Turn the leading icon square into a checkbox tile. Combine with `selected` + `onSelect` for multi-select behavior. |
| `selected` | `boolean` | `false` | Selectable-only. Selected rows carry a brand-tinted background + border. |
| `onSelect` | `(next: boolean) => void` | `—` | Selectable-only. Row becomes role="checkbox" with Space/Enter toggling. |
| `onClick` | `() => void` | `—` | When set, the tile becomes a clickable button and auto-enables the chevron + hover state. |
| `ariaLabel` | `string` | `—` | Override the auto-derived aria-label. |

## Canonical implementation

```tsx
import { AISourceTile } from '@/components/ai/atomic/source-tile/AISourceTile';

<AISourceTile title="Geospatial Engine" source="System" iconName="zs-icon-layers" />

<AISourceTile
  title="Engagement Risk Model"
  source="External"
  iconName="zs-icon-alert"
  tone="warning"
  onClick={() => openSourceDrawer('engagement-risk-model')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-source-tile.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-source-tile/ai-source-tile.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
