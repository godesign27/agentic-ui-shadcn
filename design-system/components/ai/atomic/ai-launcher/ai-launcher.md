# AI Launcher

**Version:** 1.0  
**Last Updated:** 2026-06-11  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiLauncher`  
**Component type:** React control (AI entry point)  
**Status:** Stable  
**Depends On:** `components/ai/atomic/ai-avatar/ai-avatar.md`, `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI Assisted app shell, drawer entry patterns, dashboard headers  

## Purpose

The default AI entry point on standard SaaS surfaces — recognizable, confident, never instructional.

**Intent:** Open ZAIDYN Agent from product chrome via a near-black pill (avatar + **“Chat”**) or compact avatar-only control. Opens the **AI Assisted Side Drawer** or **Floating Hanging Panel** — never the full AI Command Center unless the page is explicitly AI Led.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/components/ai/atomic/launcher/AILauncher.tsx` | Canonical React source (external repo) |
| `@ai-design-system` | Published import path |
| `components/ai/atomic/ai-launcher/ai-launcher.md` | This mirror spec |
| `components/ai/atomic/ai-launcher/ai-launcher.agent.json` | Agent manifest |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted |
| AI behavior | Invite |
| Accountability | User control · Discoverability |

## When to use

- Product header, toolbar, or dashboard header on AI Assisted pages
- Persistent or floating assistant trigger
- Standard SaaS pages where AI is available but should not dominate
- `avatar-only` variant — tight toolbars, dense dashboards, mobile headers, collapsed assistant states

## When not to use

- Long labels like “Ask AI” or “Ask ZAIDYN AI”
- Competing visually with primary product actions
- Orange as the launcher surface color
- `avatar-only` without tooltip and accessible label
- Non-AI actions
- Opening full AI Command Center on AI Assisted pages

## Anatomy

| Part | Shared | Notes |
|------|--------|-------|
| Pill container | Unique | Near-black `#1A1628`, 36px tall, pill radius. Not brand-orange. |
| ZAIDYN Agent avatar | Shared | `AIAvatar` at 28px; becomes loading ring while opening |
| Label | Unique | White **“Chat”** only — omitted in `avatar-only` |
| Unread badge | Unique | Optional brand-blue dot or numeric pill |
| Focus ring | Shared | 2px `#5A6DFF` outline, 2px offset |

## Variants

| Variant | Description |
|---------|-------------|
| `avatar-chat` | Default pill — avatar + “Chat” label |
| `avatar-only` | 36px circle — compact toolbar / mobile |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| default | Resting near-black pill | Opens assistant on click |
| hover | Surface `#2F2C3C`, stronger shadow | `:hover` |
| focus | 2px brand focus ring; tooltip visible | Keyboard focus |
| active / open | Hover tone + faint inner border | Assistant is open |
| loading / opening | Avatar replaced by spinner | Drawer mounting |
| unread / update | Brand-blue dot or count badge | Clears on open |
| disabled | Faded surface, not-allowed cursor | Tooltip shows `disabledReason` |
| high-contrast | Forced near-black on light contexts | AAA label contrast |
| reduced motion | No transitions / spinner animation | `prefers-reduced-motion` |

## Color Tokens

### Surface

| Token | Value | Usage |
|-------|-------|-------|
| `ai-launcher.surface` | `#1A1628` | Resting pill |
| `ai-launcher.surface.hover` | `#2F2C3C` | Hover and active/open |
| `ai-launcher.surface.pressed` | `#0E0B1C` | Press feedback |
| `ai-launcher.surface.disabled` | `rgba(26,22,40,0.30)` | Disabled |

### Label and focus

| Token | Value | Usage |
|-------|-------|-------|
| `ai-launcher.label.color` | `#FFFFFF` | Label |
| `ai-launcher.label.color.disabled` | `rgba(255,255,255,0.55)` | Disabled label |
| `ai-launcher.focus.ring` | `#5A6DFF` | Focus outline |
| `ai-launcher.badge` | `#5A6DFF` | Unread badge |

### Geometry and elevation

| Token | Value | Usage |
|-------|-------|-------|
| `ai-launcher.radius` | `100px` pill · `50%` circle | Per variant |
| `ai-launcher.height` | `36px` | Control height |
| `ai-launcher.padding.chat` | `6px 14px 6px 6px` | avatar-chat padding |
| `ai-launcher.shadow.rest` | See bundle | Resting elevation |
| `ai-launcher.shadow.hover` | See bundle | Hover elevation |

## AI-Specific Behavior

### Open assistant

1. User hovers (surface elevates)
2. User clicks → `onClick` → parent opens side drawer / floating panel
3. Launcher shows `loading` until drawer mounted
4. Launcher switches to `active` / open state

### Unread → read

1. AI update while assistant closed → show badge
2. User opens assistant → badge clears, `active` state

### Unavailable

1. Parent sets `disabled` + `disabledReason`
2. Surface fades; tooltip explains on hover/focus

## Accessibility Requirements

- Native `<button>` (or equivalent) with `ariaLabel` default **`Open ZAIDYN Agent chat`**
- `tooltipLabel` default **`Open ZAIDYN Agent`**
- **`avatar-only`** requires tooltip + accessible name — never icon-only without label
- Focus ring visible on `:focus-visible`
- Honor `prefers-reduced-motion`

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'avatar-chat' \| 'avatar-only'` | `'avatar-chat'` | Launcher form |
| `active` | `boolean` | `false` | Assistant open |
| `unread` | `boolean` | `false` | Show unread badge |
| `unreadCount` | `number` | — | Optional count in badge |
| `loading` | `boolean` | `false` | Spinner while drawer mounts |
| `disabled` | `boolean` | `false` | AI unavailable |
| `disabledReason` | `string` | — | Tooltip when disabled |
| `highContrast` | `boolean` | `false` | Force near-black surface |
| `tooltipLabel` | `string` | `'Open ZAIDYN Agent'` | Tooltip text |
| `ariaLabel` | `string` | `'Open ZAIDYN Agent chat'` | Accessible name |
| `onClick` | `() => void` | — | Open/close assistant surface |

## JavaScript / React API

```tsx
import { AILauncher } from '@ai/atomic/launcher/AILauncher';

<AILauncher onClick={openAssistant} />
<AILauncher active onClick={closeAssistant} />
<AILauncher unread unreadCount={3} onClick={openAssistant} />
<AILauncher loading />
<AILauncher disabled disabledReason="AI is offline for maintenance" />
<AILauncher variant="avatar-only" onClick={openAssistant} />
```

Label must remain exactly **“Chat”** for `avatar-chat` — never “Ask AI”.

## Agent rules

1. Default variant is **`avatar-chat`** — near-black pill, not orange.
2. Opens **side drawer / floating panel** — not Command Center on AI Assisted pages.
3. **`avatar-only`** requires `tooltipLabel` and `ariaLabel`.
4. Compose with **`AIAvatar`** at 28px inside the pill — see `ai-avatar.md`.
5. Import from canonical package — do not rebuild launcher chrome ad hoc.

Full agent contract: `components/ai/atomic/ai-launcher/ai-launcher.agent.json`.

## Do's and Don'ts

- Do use on AI Assisted product headers and toolbars.
- Do show unread badge subtly when agent has updates.
- Don't use orange launcher background.
- Don't rename the label from “Chat”.
- Don't use for non-AI actions.

## Related Components

- `components/ai/atomic/ai-avatar/ai-avatar.md` — embedded avatar (28px in pill)
- `components/ai/organisms/ai-assistant-drawer-group.md` — typical open target
- `components/ai/pages/ai-assistant-drawer-page.md` — page pattern
