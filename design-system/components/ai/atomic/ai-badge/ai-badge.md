# AI Badge

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiBadge`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The compact label atom for AI status and metrics. Extends the ZDS Badge with a soft emphasis and a data-viz color mode so metric-delta highlights (e.g. "+23% engagement") stay on-system.

AIBadge is a presentational label — not a button, not a chip. It mirrors the standard ZDS Badge (src/badge/): the same semantic variant set (neutral · info · success · warning · error) and the same two sizes (default 20px / 12px-bold / 10px-radius pill; small 16px / 10px-bold / 8px-radius pill). It adds two AI-surface extensions: an `emphasis` control (bold = canonical solid fill + inverse text; soft = translucent tint + colored text, for in-card metric highlights) and a `dataviz` variant that colors the badge from the ZDS categorical chart palette (@zs-data-color-1…12). If the label needs to be clickable, use AIChip instead.

**Export:** `AIBadge`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/badge/AIBadge.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-badge/ai-badge.md` | This mirror spec |
| `components/ai/atomic/ai-badge/ai-badge.agent.json` | Agent manifest |
| `components/ai/atomic/ai-badge/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Monitor |
| Accountability | Audit trail |

## Anatomy

1. **variant** _(Unique)_ — Semantic role: neutral | info | success | warning | error | dataviz. Selects the base color.
2. **emphasis** _(Unique)_ — bold = solid fill + inverse text (canonical ZDS); soft = translucent tint + colored text.
3. **series** _(Unique)_ — Data-viz series index 1–12 (used only when variant="dataviz"), mapped to @zs-data-color-*.
4. **Pill shell** _(Shared)_ — Pill-radius container + bold caption typography shared across all variants and sizes.

## State variations

- **Neutral** _(variant=neutral)_ — Default, non-semantic status.
- **Info** _(variant=info)_ — Informational status.
- **Success** _(variant=success)_ — Positive / complete status.
- **Warning** _(variant=warning)_ — Caution status.
- **Error** _(variant=error)_ — Failure / blocking status.
- **Data-viz** _(variant=dataviz)_ — Metric-delta indicator colored from the ZDS chart palette (soft emphasis).
- **Counter — default** _(appearance=counter)_ — Circular numeric count pill for notifications / tab counts (neutral).
- **Counter — success** _(appearance=counter variant=success)_ — Numeric counter tinted with the success color.
- **Counter — error** _(appearance=counter variant=error)_ — Numeric counter tinted with the error color. Caps at maxCount ("99+").
- **Indicator dot** _(appearance=dot)_ — Unread / "new" marker — a semantic-colored dot with no number.
- **Badge on icon** _(overlay)_ — Counter or dot absolutely positioned over an icon (composition).
- **Inline counter** _(appearance=inline)_ — Colored count text in-flow with a link/paragraph — no pill background.
- **Queue · Queued** _(queue=queued)_ — Queue variant — task waiting to start (clock icon).
- **Queue · Running** _(queue=running)_ — Queue variant — task in progress (animated spinner). Optional count pill.
- **Queue · Blocked** _(queue=blocked)_ — Queue variant — task blocked (block icon).
- **Queue · Needs Approval** _(queue=needs-approval)_ — Queue variant — task awaiting sign-off. Optional count pill.
- **Queue · Complete** _(queue=complete)_ — Queue variant — task finished (check icon).

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `—` | Badge label — a short status word or a metric like "+23%". |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'dataviz'` | `'neutral'` | Semantic color role. Use "dataviz" with `series`. |
| `emphasis` | `'bold' \| 'soft'` | `'bold'` | bold = solid fill + inverse text (ZDS canonical); soft = translucent tint + colored text. |
| `size` | `'default' \| 'small'` | `'default'` | default = 20px / 12px-bold / r10; small = 16px / 10px-bold / r8. |
| `series` | `1–12` | `1` | Data-viz series index (only used when variant="dataviz"), mapped to @zs-data-color-*. |
| `appearance` | `'text' \| 'counter' \| 'dot' \| 'inline'` | `'text'` | Render mode. text = pill label; counter = circular numeric count; dot = indicator marker (no number); inline = colored count text in-flow (no pill). |
| `maxCount` | `number` | `99` | Cap for numeric counter / inline appearances — values above render as "{maxCount}+" (e.g. 99+). |
| `queue` | `'queued' \| 'running' \| 'blocked' \| 'needs-approval' \| 'complete'` | `—` | Queue variant — renders a status icon + label for a queued task. Overrides variant styling when set. |
| `count` | `number` | `—` | Optional count pill shown next to a queue badge (e.g. number of running / pending tasks). |

## Tokens

### Semantic variants
| Token | Value | Usage |
| --- | --- | --- |
| `neutral` | `#1A1628` | Neutral fill (@zs-color-neutral) |
| `info` | `#1B24AA` | Info fill (@zs-color-info) |
| `AI.color.status.success` | `#0A6E5E` | Success fill |
| `AI.color.status.warning` | `#8A640C` | Warning fill |
| `AI.color.status.error` | `#C0392B` | Error fill |
| `zs-text-inverse` | `#FAFAFA` | Bold-emphasis label text |

### Data-viz palette (@zs-data-color-*)
| Token | Value | Usage |
| --- | --- | --- |
| `ZS_DATAVIZ[1]` | `#DB6C03` | Series 1 |
| `ZS_DATAVIZ[2]` | `#3287C4` | Series 2 |
| `ZS_DATAVIZ[4]` | `#2DA40C` | Series 4 (positive delta) |
| `ZS_DATAVIZ[10]` | `#299C91` | Series 10 |
| `ZS_DATAVIZ[11]` | `#FD595F` | Series 11 (negative delta) |

### Appearance (appearance=…)
| Token | Value | Usage |
| --- | --- | --- |
| `radius / min-width` | `999px · 20px` | Counter — circular pill; min-width = badge height so single digits stay round |
| `font-weight` | `700` | Counter & inline count use bold numerals |
| `dot size` | `10px · 8px` | Indicator dot diameter (default · small), background = variant base |
| `maxCount` | `99 → "99+"` | Overflow cap for counter / inline appearances |

### Queue variant (queue=…)
| Token | Value | Usage |
| --- | --- | --- |
| `var(--ai-confidence-track)` | `track` | Queued bg |
| `var(--ai-brand-surface)` | `surface` | Running bg |
| `rgba(231,76,60,0.08)` | `tint` | Blocked bg |
| `var(--ai-signal-surface)` | `surface` | Needs-approval bg |
| `var(--ai-status-success-bg)` | `bg` | Complete bg |
| `@zsai-numeric-badge` | `type` | Count pill typography |

## Canonical implementation

```tsx
import { AIBadge } from '@/components/ai/atomic/badge/AIBadge';

{/* Semantic variants — canonical ZDS bold fill */}
<AIBadge variant="success">Complete</AIBadge>
<AIBadge variant="warning">Needs review</AIBadge>
<AIBadge variant="error" size="small">Failed</AIBadge>

{/* Soft emphasis — translucent tint + colored text */}
<AIBadge variant="info" emphasis="soft">In review</AIBadge>

{/* Data-viz — metric-delta indicator from the ZDS chart palette */}
<AIBadge variant="dataviz" series={4} emphasis="soft">+23% engagement</AIBadge>

{/* Numeric counter — circular pill, caps at maxCount ("99+") */}
<AIBadge appearance="counter" variant="error">3</AIBadge>
<AIBadge appearance="counter" variant="neutral" maxCount={99}>120</AIBadge>

{/* Indicator dot — unread / status marker, no number */}
<span>Brooklyn <AIBadge appearance="dot" variant="error" /></span>

{/* Badge on icon — overlay a counter or dot on an icon */}
<span style={{ position: 'relative', display: 'inline-flex' }}>
  <Bell size={28} />
  <span style={{ position: 'absolute', top: -6, right: -8 }}>
    <AIBadge appearance="counter" variant="error" size="small">3</AIBadge>
  </span>
</span>

{/* Inline counter — colored count text in-flow, no pill */}
<p><AIBadge appearance="inline" variant="info">20</AIBadge> Search Results</p>

{/* Queue variant — status of a queued task (icon + label + optional count pill) */}
<AIBadge queue="running" count={3} />
<AIBadge queue="needs-approval" count={2} />
<AIBadge queue="complete" />
```

## Agent rules

1. Read this mirror spec and `ai-badge.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-badge/ai-badge.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
