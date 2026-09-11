# AI Text Link

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiTextLink`  
**Component type:** React control  
**Status:** Beta  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Not a generic product link. The AI-specific text link treatment used when an AI output needs to expose its reasoning, sources, assumptions, or governance information.

**Exports:** `AITextLink` · `AITextLinkGroup`

AITextLink is the canonical inline link for AI explainability surfaces. It supports six variants: text-only, icon-leading, accordion chevron, icon + chevron, external navigation, and attention (orange-toned). Use it inside response footers, rationale panels, notification outputs, and trust summary cards to let users inspect and verify AI-generated content without disrupting the primary experience. Use ai-action or ai-button for primary decisions. Attention (orange) tone is reserved strictly for escalation, approval-needed, stale data, and warning contexts.

## Source (canonical implementation)

> Copy `AITextLink.tsx` verbatim from the self-contained component bundle — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/text-link/AITextLink.tsx` | Canonical React source |
| `tokens/ai-tokens.ts` | `AI`, `Standard`, `SIGNAL`, `F` — tone color map |
| `tokens/ai-typography.ts` | `@brand-caption-1` (sm), inline md spec |
| `components/ai/molecules/ai-text-link/ai-text-link.md` | This mirror spec |
| `components/ai/molecules/ai-text-link/ai-text-link.agent.json` | Agent manifest |
| `components/ai/molecules/ai-text-link/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Explain · Cite · Reveal · Expand · Inspect · Verify · Disclose |
| Accountability | Sources · Rationale · Assumptions · Confidence · Audit trail · Data freshness |

## When to use

- In response footers for "Why this?", "View sources", "View rationale" explainability actions
- When an accordion link should expand inline assumptions or disclosure content
- For external navigation to audit trails, source records, or governance pages (`variant="external"`)
- Inside `AITextLinkGroup` for a row of related transparency links

## When not to use

- For primary decisions — use ai-action or ai-button instead
- Orange attention tone for informational links — reserve for escalation, approval, stale data
- Generic product navigation unrelated to AI explainability

## Anatomy

1. **Label** _(Unique)_ — Link text — must make purpose clear without relying on icon alone
2. **Leading Icon** _(Shared)_ — Optional 12–14px icon from INLINE_ICON_PATHS. Same color as label. aria-hidden.
3. **Accordion Chevron** _(Unique)_ — Rotates 180° on expand. Announces expanded state via aria-expanded.
4. **External Icon** _(Unique)_ — Appears when variant="external". Signals new-tab / source record navigation.
5. **Focus Ring** _(Shared)_ — 2px solid BRAND[50] (#7A8CFF) outline at 2px offset. Keyboard accessible.
6. **Disabled Reason** _(Unique)_ — Tooltip via title attr + aria-label fallback when link is unavailable.

## State variations

- **Text only** _(variant="text")_ — Label alone — simplest explainability link
- **Icon + label** _(variant="icon-leading")_ — Leading icon + label — most common for Why this? / View sources
- **Chevron** _(variant="chevron")_ — Label + accordion chevron — use when link expands inline content
- **Icon + chevron** _(variant="icon-chevron")_ — Full anatomy: icon + label + chevron — disclosure trigger
- **External** _(variant="external")_ — Label + external icon — opens source record, audit trail, new tab
- **Attention** _(variant="attention")_ — Orange-toned — escalation, approval needed, stale data, review required
- **Disabled** _(disabled + disabledReason)_ — Muted, not clickable. Tooltip explains why unavailable.
- **Loading** _(loading)_ — Spinner replaces leading icon while source is resolving

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `required` | Link text. Must make purpose clear without relying on icon alone. |
| `href` | `string` | `undefined` | URL for navigation links. Omit for in-page disclosure/callback actions. |
| `icon` | `string` | `undefined` | Leading icon name from INLINE_ICON_PATHS (info, database, history, shield-check, flag, link, error-circle) |
| `trailingIcon` | `string` | `undefined` | Non-chevron trailing icon (used sparingly) |
| `showChevron` | `boolean` | `false` | Show accordion chevron. Automatically set by variant="chevron" or "icon-chevron". |
| `expanded` | `boolean` | `undefined` | Controlled expanded state for accordion links |
| `defaultExpanded` | `boolean` | `false` | Uncontrolled default expanded state |
| `disabled` | `boolean` | `false` | Disable the link. Always pair with disabledReason. |
| `disabledReason` | `string` | `undefined` | Explains why the link is unavailable. Shown as tooltip title + aria-label. |
| `variant` | `AITextLinkVariant` | `"text"` | text \| icon-leading \| chevron \| icon-chevron \| external \| attention |
| `tone` | `AITextLinkTone` | `"ai"` | ai \| neutral \| attention \| warning \| error. Use attention/warning ONLY for escalation, approval, stale. |
| `size` | `AITextLinkSize` | `"md"` | sm=11px, md=13px |
| `loading` | `boolean` | `false` | Show spinner while source is resolving; replaces leading icon |
| `external` | `boolean` | `false` | Force external-link icon; equivalent to variant="external" |
| `ariaLabel` | `string` | `undefined` | Explicit accessible label override |
| `onClick` | `() => void` | `undefined` | Click callback for non-href action links |
| `onToggle` | `(expanded: boolean) => void` | `undefined` | Called when accordion chevron toggles |

## Tokens

### Link Color — AI tone (default)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#5A6DFF` | Default link color — AI explainability |
| `AI.color.action.primaryHover` | `#4D60E6` | Hover state |
| `AI.color.brandStrong` | `#2D3DA3` | Active / pressed state |

### Link Color — Attention tone
| Token | Value | Usage |
| --- | --- | --- |
| `SIGNAL[60]` | `#EC7200` | Attention link — escalation, approval, stale data ONLY |
| `SIGNAL[70]` | `#CB6100` | Attention hover |

### Focus + Accessibility
| Token | Value | Usage |
| --- | --- | --- |
| `BRAND[50] focus ring` | `rgba(90,109,255,0.35)` | 2px solid focus ring — keyboard navigation |

## Flows

### AI recommendation explainability
User inspects the rationale behind an AI recommendation
- Recommendation card renders with AITextLink "Why this?" (icon-leading)
- User clicks → onToggle fires → rationale panel opens
- Chevron rotates to indicate expanded state
- User reads rationale and closes panel

### Source inspection
User verifies data sources behind an AI output
- AI summary appears with AITextLink "View sources" in response footer
- User clicks → source list renders inline or in drawer
- Each source shows freshness indicator and data type

### Audit trail navigation
Governance review of AI-led decision
- Approval output shows AITextLink "View audit trail" with variant="external"
- User clicks → opens audit trail in new tab
- External icon signals navigation away from current context

## JavaScript / React API

```tsx
import { AITextLink, AITextLinkGroup } from '@/components/ai/atomic/text-link/AITextLink';

// Text only
<AITextLink label="Why this?" />

// Icon + label (most common)
<AITextLink label="View sources"     icon="database"     variant="icon-leading" />
<AITextLink label="Why this?"        icon="info"         variant="icon-leading" />
<AITextLink label="View rationale"   icon="info"         variant="icon-leading" />

// Accordion
<AITextLink label="View assumptions" icon="info"         variant="icon-chevron"
  onToggle={(open) => setOpen(open)} />

// External navigation
<AITextLink label="Open audit trail" variant="external" href="/audit/trail-123" />

// Attention (orange — escalation/review only)
<AITextLink label="Review required"  variant="attention" tone="attention" />

// Disabled with reason
<AITextLink label="View sources" disabled disabledReason="Sources unavailable for this recommendation" />

// Inline group
<AITextLinkGroup>
  <AITextLink label="Why this?"      icon="info"     variant="icon-leading" />
  <AITextLink label="View sources"   icon="database" variant="icon-leading" />
  <AITextLink label="View rationale" icon="info"     variant="icon-leading" />
</AITextLinkGroup>
```

## Agent rules

1. Read this mirror spec and `ai-text-link.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/molecules/ai-text-link/ai-text-link.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order