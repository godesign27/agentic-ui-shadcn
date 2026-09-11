# AI Queue Badge

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiQueueBadge`  
**Component type:** React status badge  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI queue cards, sidebars, table rows — see `components/ai/llms.txt`  

## Purpose

Compact status badge for items in an agent execution queue. Shows running, blocked, needs-approval, and complete states with accessible color and icon coding.

**Export:** `AIQueueBadge` — `QueueStatus` type, optional `count` and `label` props.

The AI Queue Badge conveys the queue state of a single item in an AI execution pipeline. It pairs a contextual icon with a status label and an optional count bubble. Intended for use inside queue cards, sidebars, and table rows where dense status communication is required.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/queue-badge/AIQueueBadge.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-queue-badge/ai-queue-badge.md` | This mirror spec |
| `components/ai/atomic/ai-queue-badge/ai-queue-badge.preview.html` | Vanilla JS preview port |
| `components/ai/atomic/ai-queue-badge/ai-queue-badge.agent.json` | Agent manifest |
| `components/ai/atomic/ai-queue-badge/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Monitor · Execute |
| Accountability | Audit trail · Approval |

## When to use

- Show queue state on a single pipeline item inside queue cards, sidebars, or table rows
- Communicate dense status at a glance — icon + label + optional count
- Pair with queue list patterns where multiple items need independent status coding

## When not to use

- General-purpose status chips unrelated to execution queues — use appropriate domain badge
- Interactive status toggles — badge is display-only; use controls for state changes
- Long descriptive text — keep labels short; use tooltips or detail panels for prose

## Anatomy

1. **Status icon** _(Unique)_ — SVG icon encoding state — clock, spinner, block circle, info, or check.
2. **Label** _(Unique)_ — Human-readable status string (default per status or overridden via `label` prop).
3. **Count bubble** _(Unique)_ — Optional numeric pill shown when `count` prop is provided. Uses `@brand-numeric-badge`.
4. **Badge shell** _(Shared)_ — `AI.radius.sm` (12px) container with status-tinted bg/border.

## State variations

| Status | Key | Icon | Default label | Shell treatment |
|--------|-----|------|---------------|-----------------|
| **Queued** | `queued` | Clock | Queued | Neutral gray bg (`--ai-confidence-track`), gray border |
| **Running** | `running` | Spinner (rotating) | Running | Brand surface bg, brand border, brand text |
| **Blocked** | `blocked` | Prohibition circle | Blocked | Red-tinted bg/border, `#E74C3C` text |
| **Needs Approval** | `needs-approval` | Info circle | Needs Approval | Signal surface bg/border, signal strong text |
| **Complete** | `complete` | Check circle | Complete | Success-tinted bg/border, `#27AE60` text |

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `QueueStatus` | — | `queued` \| `running` \| `blocked` \| `needs-approval` \| `complete` |
| `count` | `number` | `undefined` | Optional count shown as a pill inside the badge |
| `label` | `string` | `undefined` | Override the default status label |

## Tokens

### Per-status color mapping

| Status | Background | Border | Text | Source |
| --- | --- | --- | --- | --- |
| Queued | `var(--ai-confidence-track)` | `var(--ai-card-border)` | `var(--ai-neutral-helper)` | neutral |
| Running | `var(--ai-brand-surface)` | `var(--ai-brand-border)` | `var(--ai-brand-text)` | `AI.color.brandSurface`, `AI.color.brandBorder`, `AI.color.text.primary` |
| Blocked | `rgba(231,76,60,0.08)` | `rgba(231,76,60,0.25)` | `#E74C3C` | Error state |
| Needs Approval | `var(--ai-signal-surface)` | `var(--ai-signal-border)` | `AI.color.signal.strong` | Signal palette |
| Complete | `var(--ai-status-success-bg)` | `var(--ai-status-success-border)` | `#27AE60` | Success state |

### Structural tokens

| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.sm` | `12px` | Badge shell border-radius |
| `AI.color.brand` | `#5A6DFF` | Spinner arc stroke |
| `AI.color.brandBorder` | `#D2D6FF` | Spinner track stroke |
| `AI_TYPOGRAPHY['@brand-status-label']` | `12px / 400 / lh 1` | Label typography |
| `AI_TYPOGRAPHY['@brand-numeric-badge']` | `10px / 400 / lh 16px` | Count pill typography |
| `AI.motion.icon.spin` | `900ms linear` | Spinner rotation duration |

### CSS custom properties (Tier 3)

Define at `:root` from `ai-tokens.ts`:

```css
--ai-brand-surface: /* AI.color.brandSurface */;
--ai-brand-border: /* AI.color.brandBorder */;
--ai-brand-text: /* AI.color.text.primary */;
--ai-signal-surface: /* AI.color.signal.surface */;
--ai-signal-border: /* signal border tint */;
--ai-confidence-track: /* neutral track */;
--ai-neutral-helper: /* NEUTRAL.textHelper */;
```

## Flows

### Spinner rotation (running state)

- `status="running"` renders `SpinnerIcon`
- CSS keyframe `ai-queue-spin` applied at 0.9s linear (matches `AI.motion.icon.spin`)
- Spinner rotates 360° continuously while running
- `prefers-reduced-motion: reduce` halts animation

### Count pill

- When `count` is provided, render inverted-color numeric pill after label
- Count background uses status text color; count text uses status bg color

## JavaScript / React API

```tsx
import { AIQueueBadge } from '@/components/ai/atomic/queue-badge/AIQueueBadge';

<AIQueueBadge status="running" />
<AIQueueBadge status="needs-approval" count={3} />
<AIQueueBadge status="complete" label="Done" />
```

## Agent rules

1. Read this mirror spec and `ai-queue-badge.agent.json` before implementing.
2. Do not hardcode brand hex — use `AI.*`, CSS vars, and `AI_TYPOGRAPHY`.
3. Copy canonical `AIQueueBadge.tsx` verbatim — do not fabricate icons or status colors.
4. Spinner must use `AI.color.brand` and `AI.color.brandBorder` — not generic blue.
5. Respect `prefers-reduced-motion` for the running spinner.

Full agent contract: `components/ai/atomic/ai-queue-badge/ai-queue-badge.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order
