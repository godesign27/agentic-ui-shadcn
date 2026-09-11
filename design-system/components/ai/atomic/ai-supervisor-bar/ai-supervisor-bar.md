# AI Top Bar

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiSupervisorBar`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Page-top agent identity strip · tan · dark · light · uses AIAvatar

AISupervisorBar is the flush page-top identity strip for an AI-led workspace — typically the supervisor agent that coordinates work below (e.g. Smart Assist). The bar uses the AIAvatar atom on the left, the agent name + role eyebrow on the same line, and a secondary stat line for tasks-tracked / last-updated. It sits flush against the top edge of its parent — no border-radius, no horizontal margin, only a single bottom border for separation. Three tone variants cover the major surface contexts: tan (ZSAI tan companion surface — calmest, default), dark (inverted AI brand ink — hero / high-emphasis), and light (neutral white with a subtle bottom rule — low chrome, when the bar should recede).

**Export:** `AISupervisorBar`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/supervisor-bar/AISupervisorBar.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-supervisor-bar/ai-supervisor-bar.md` | This mirror spec |
| `components/ai/atomic/ai-supervisor-bar/ai-supervisor-bar.agent.json` | Agent manifest |
| `components/ai/atomic/ai-supervisor-bar/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive · AI Assisted |
| AI behavior | Identify · Monitor · Attribute |
| Accountability | Owner · Permission state · Data freshness |

## When to use

- As the flush top-edge identity strip on an AI-led page
- To anchor a supervisor agent (Smart Assist, Orchestrator, etc.) at the top of a workspace
- On mobile companion views where the agent identity must persist across scroll

## When not to use

- Inside cards, drawers, or dialogs — use AICardAgent instead
- For sub-page section headers — use AIMessageHeader or a regular heading
- For navigation — use AILedNavigation or ZDS top navigation

## Anatomy

1. **Surface** _(Unique)_ — Flush 100%-width strip — no border-radius, no horizontal margin. Background per tone.
2. **Avatar** _(Shared)_ — AIAvatar atom on the left, sized 36px by default.
3. **Name** _(Unique)_ — Agent name in the tone-mapped primary ink (e.g. "Smart Assist").
4. **Role eyebrow** _(Unique)_ — Inline secondary label — default "Supervisor agent".
5. **Stat line** _(Unique)_ — Second line — "{stat} · {meta}" e.g. "7 tasks tracked · Updated 2m ago".
6. **Actions slot** _(Shared)_ — Right-aligned optional slot for inline action buttons (`actions`) and an overflow trigger (`moreMenu`). Both props are optional — omit both for the minimal no-chrome pattern.
7. **Bottom border** _(Shared)_ — Single 1px tone-mapped border-bottom — only separator (no shadow, no card chrome).

## State variations

- **Tan (default)** _(actions={…} moreMenu={…})_ — ZSAI tan companion surface with inline action button and overflow trigger. Use for Smart Assist or any default supervisor identity. Remove `actions` and `moreMenu` for the no-chrome minimal pattern.
- **Dark (hero)** _(tone="dark" actions={…} moreMenu={…})_ — Inverted AI brand ink with inline action and overflow trigger. Use as the hero header on workspaces where the supervisor is the primary identity.
- **Light (low-chrome)** _(tone="light" actions={…} moreMenu={…})_ — Neutral white surface with inline action and overflow trigger. Use when the bar should recede inside a longer workspace.
- **No actions** _(tone="tan")_ — Minimal pattern — no `actions` or `moreMenu` props. Use when the bar is purely informational and all workflow entry points live elsewhere on the page.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Agent display name shown as the primary label. |
| `role` | `string` | `'Supervisor agent'` | Inline eyebrow next to the name. |
| `stat` | `string` | `undefined` | Second line, e.g. "7 tasks tracked". |
| `meta` | `string` | `undefined` | Appended to stat with a `·` separator, e.g. "Updated 2m ago". |
| `tone` | `'tan' \| 'dark' \| 'light'` | `'tan'` | Color tone. |
| `avatarSize` | `number` | `36` | AIAvatar pixel size. Bar height auto-adjusts. |
| `actions` | `React.ReactNode` | `undefined` | Right-aligned slot for optional controls (chevron / settings / dismiss). |
| `onClick` | `() => void` | `undefined` | When set, the bar renders as role="button" with Enter/Space activation. |
| `ariaLabel` | `string` | ``${name}, ${role}`` | Accessible label override. |

## Tokens

### Tone — tan (default)
| Token | Value | Usage |
| --- | --- | --- |
| `bar.bg` | `ZSAI_TAN[‘00’]` | Strip background |
| `bar.border-bottom` | `ZSAI_TAN[30]` | Bottom separator |
| `bar.name` | `ZSAI_TAN[100]` | Primary text (name) |
| `bar.role / stat` | `ZSAI_TAN[80]` | Secondary text |

### Tone — dark
| Token | Value | Usage |
| --- | --- | --- |
| `bar.bg` | `ZSAI[100]` | Strip background — darkest brand ink |
| `bar.border-bottom` | `ZSAI[100]` | Bottom separator |
| `bar.name` | `AI.color.text.onAction` | Primary text (name) |
| `bar.role / stat` | `rgba(255,255,255,0.78)` | Secondary text |

### Tone — light
| Token | Value | Usage |
| --- | --- | --- |
| `bar.bg` | `#FFFFFF` | Strip background |
| `bar.border-bottom` | `var(--ai-card-border)` | Bottom separator |
| `bar.name` | `var(--ai-zds-text)` | Primary text (name) |
| `bar.role / stat` | `var(--ai-zds-helper)` | Secondary text |

## Flows

### Anchor an AI-led page
Use the bar as the first element of the page.
- Render AISupervisorBar as the immediate first child of the page root
- Do NOT wrap the bar in horizontal padding — it must sit flush to the page edges
- Pick tone="tan" for default supervisor identity (calmest), tone="dark" for hero contexts, tone="light" when the bar should recede
- Apply page padding ONLY to content below the bar

## Canonical implementation

```tsx
import { AISupervisorBar } from '@/components/ai/atomic/supervisor-bar/AISupervisorBar';

<AISupervisorBar
  name="Smart Assist"
  role="Supervisor agent"
  stat="7 tasks tracked"
  meta="Updated 2m ago"
  tone="tan"          // 'tan' (default) · 'dark' · 'light'
  avatarSize={36}
/>
```

## Agent rules

1. Read this mirror spec and `ai-supervisor-bar.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-supervisor-bar/ai-supervisor-bar.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
