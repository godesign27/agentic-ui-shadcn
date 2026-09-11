# AI Why This Link

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiWhyThisLink`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Minimal inline entry point to AI transparency. Opens rationale panels, source lists, assumption disclosures, or risk explanations without disrupting the primary flow.

**Export:** `AIWhyThisLink`

The AI Why This Link provides a lightweight, non-disruptive entry point into AI transparency. It appears inline adjacent to AI-generated content and opens a rationale panel, source list, assumption disclosure, or risk explanation on click. The ghost button format ensures it never competes with primary content hierarchy while remaining discoverable.

## Source (canonical implementation)

> Copy `AIWhyThisLink.tsx` verbatim from the self-contained component bundle — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/why-this-link/AIWhyThisLink.tsx` | Canonical React source |
| `tokens/ai-tokens.ts` | `AI.color.brand` — icon and label color |
| `tokens/ai-typography.ts` | `@brand-caption-1` — 12px label typography |
| `components/ai/molecules/ai-why-this-link/ai-why-this-link.md` | This mirror spec |
| `components/ai/molecules/ai-why-this-link/ai-why-this-link.agent.json` | Agent manifest |
| `components/ai/molecules/ai-why-this-link/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Explain · Evaluate |
| Accountability | Rationale · Sources · Assumptions |

## When to use

- Inline adjacent to AI recommendations, insights, or flagged outputs
- When a lightweight transparency entry is needed without a full footer link row
- For variant-specific disclosure: rationale, sources, assumptions, or risk context

## When not to use

- For a row of multiple explainability links — use `AITextLink` + `AITextLinkGroup` instead
- For primary actions or navigation — use ai-button or standard links

## Anatomy

1. **Icon** _(Unique)_ — Variant-specific SVG icon — question, book, link, lightbulb, or warning.
2. **Label text** _(Unique)_ — Default or caller-overridden label string.

## State variations

- **Why This?** _(why-this)_ — Generic rationale entry — question mark icon.
- **View Rationale** _(view-rationale)_ — Opens full reasoning panel — book icon.
- **View Sources** _(view-sources)_ — Opens source citation list — link icon.
- **View Assumptions** _(view-assumptions)_ — Shows underlying assumptions — lightbulb icon.
- **Explain Risk** _(explain-risk)_ — Opens risk context — warning triangle icon.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `WhyThisVariant` | `"why-this"` | why-this \| view-rationale \| view-sources \| view-assumptions \| explain-risk |
| `label` | `string` | `undefined` | Override the default label for this variant |
| `onClick` | `() => void` | `undefined` | Click handler — typically opens a panel or modal |

## Tokens

### Why This Link
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#5A6DFF` | Icon and label color (all variants) |

## Flows

### Transparency disclosure
User clicks Why This?
- User clicks AIWhyThisLink
- onClick fires
- Parent opens AIRationalePanel or AITrustSummaryCard
- User reviews context
- Dismisses panel — returns to content

## JavaScript / React API

```tsx
import { AIWhyThisLink } from '@/components/ai/atomic/why-this-link/AIWhyThisLink';

<AIWhyThisLink variant="why-this" onClick={openRationale} />
<AIWhyThisLink variant="view-sources" onClick={openSources} />
<AIWhyThisLink variant="explain-risk" label="Why is this flagged?" onClick={openRisk} />
```

## Agent rules

1. Read this mirror spec and `ai-why-this-link.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/molecules/ai-why-this-link/ai-why-this-link.agent.json`.

## Related Components

- `components/ai/molecules/ai-text-link/ai-text-link.md` — fuller explainability link with chevron, external, attention variants
- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order