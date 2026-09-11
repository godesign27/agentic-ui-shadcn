# AI Feedback Bar

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiFeedbackBar`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Inline feedback controls surfaced after every AI response. Captures user sentiment to improve future outputs and close the learning loop.

**Export:** `AIFeedbackBar`

AIFeedbackBar renders a horizontal row of six Standard icon-only action buttons below each AI response, separated by a top divider. Icon order: **Read aloud → Mark as helpful → Mark as not helpful → Share → Copy → Save**. Tooltips are portal-rendered above the anchored button. Voting (helpful/not helpful) replaces the entire bar with a "Feedback received — thank you" confirmation.

## Source (canonical implementation)

> Canonical source is bundled verbatim in the self-contained component bundle. Copy `AIFeedbackBar.tsx` — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/feedback-bar/AIFeedbackBar.tsx` | Canonical React source (external repo) |
| `tokens/ai-tokens.ts` | `AI`, `Standard`, `F` color tokens |
| `tokens/ai-typography.ts` | `@brand-*` typography scale |
| `components/ai/atomic/ai-feedback-bar/ai-feedback-bar.md` | This mirror spec |
| `components/ai/atomic/ai-feedback-bar/ai-feedback-bar.agent.json` | Agent manifest |
| `components/ai/atomic/ai-feedback-bar/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Guide · Evaluate · Learn |
| Accountability | User feedback · Rationale |

## When to use

- Attach to every AI response message as the canonical feedback surface
- Use when the user needs to copy, share, tag, or save an AI response
- Use for explicit quality signals (helpful / not helpful)

## When not to use

- Do not use inside a read-only or print view where interactions are disabled
- Do not show on mid-stream responses — wait until the response is complete

## Anatomy

1. **Top divider** _(Shared)_ — `1px solid var(--ai-divider)` separates bar from response body.
2. **Action button** _(Unique)_ — Icon-only **26×26px** button, **14×14px** filled Standard SVG path. Hover: `--ai-divider` bg, `--ai-neutral-text` icon.
3. **Tooltip** _(Shared)_ — Portal-rendered label above button (`#1A1628` bg, `@brand-section-subtitle`).
4. **Vote confirmation** _(Unique)_ — Green check + "Feedback received — thank you" replaces icon row after helpful/not helpful vote.

### Icon order (left → right)

| # | Action | Standard path key | Active color |
|---|--------|--------------|--------------|
| 1 | Read aloud | `ICON_VOLUME` | Brand blue + `rgba(90,109,255,0.12)` |
| 2 | Mark as helpful | `ICON_LIKE` | Green `#15803d` + helpful tint |
| 3 | Mark as not helpful | `ICON_DISLIKE` | Red `#B91C1C` + not-helpful tint |
| 4 | Share response | `ICON_SHARE` | — |
| 5 | Copy response | `ICON_COPY` | Brand blue when copied |
| 6 | Save response | `ICON_TAG` | Brand blue when saved |

## State variations

- **Default** _(All idle)_ — Icons use `var(--ai-neutral-helper)` / `NEUTRAL.iconDefault #5b5864`.
- **Read aloud active** — Brand blue icon + `rgba(90,109,255,0.12)` background.
- **Helpful / Not helpful** — Green or red semantic active colors; vote triggers **received** state.
- **Copied / Saved** — Brand blue active tint on copy or tag button.
- **Feedback received** — Entire bar replaced with green confirmation message.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showDivider` | `boolean` | `true` | Show top border divider above the icon row |

## Tokens

### Button Colors
| Token | Value | Usage |
| --- | --- | --- |
| `ai-feedbackbar.action.color.default` | `NEUTRAL.iconDefault #5b5864` / `var(--ai-neutral-helper)` | Icon color at rest |
| `ai-feedbackbar.action.color.active` | `AI.color.action.primary #5A6DFF` | Copy, save, read-aloud active |
| `ai-feedbackbar.action.surface.active` | `rgba(90,109,255,0.12)` | Brand active background |
| `ai-feedbackbar.action.color.helpful` | `#15803d` | Helpful vote active |
| `ai-feedbackbar.action.surface.helpful` | `var(--ai-feedback-active-helpful)` | Helpful hover/active bg |
| `ai-feedbackbar.action.color.notHelpful` | `#B91C1C` | Not-helpful vote active |
| `ai-feedbackbar.action.surface.notHelpful` | `var(--ai-feedback-active-not)` | Not-helpful hover/active bg |
| `ai-feedbackbar.divider` | `var(--ai-divider)` | Top border + default hover bg |

### Tooltip
| Token | Value | Usage |
| --- | --- | --- |
| `ai-feedbackbar.tooltip.bg` | `#1A1628` | Tooltip background — dark Standard navy |
| `ai-feedbackbar.tooltip.color` | `#FFFFFF` | Tooltip text color |

## Flows

### Portal tooltip positioning
Tooltips render via ReactDOM.createPortal to escape overflow:hidden parent containers.
- Button has a ref attached to its DOM node
- On mouseEnter, getBoundingClientRect() reads the button position
- Tooltip is rendered into document.body via ReactDOM.createPortal
- Position is set to { top: rect.top - tooltipHeight, left: rect.left + rect.width/2 }
- On mouseLeave, tooltip is unmounted

## JavaScript / React API

```tsx
import { AIFeedbackBar } from '@/components/ai/atomic/feedback-bar/AIFeedbackBar';

<AIFeedbackBar />
<AIFeedbackBar showDivider={false} />
```

> **Icons:** Use Standard SVG paths (`ICON_LIKE`, `ICON_DISLIKE`, `ICON_SHARE`, `ICON_COPY`, `ICON_TAG`, `ICON_VOLUME`) — not lucide-react. Full source in bundled `AIFeedbackBar.tsx`.

## Agent rules

1. Read this mirror spec and `ai-feedback-bar.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-feedback-bar/ai-feedback-bar.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order