# AI Avatar

**Version:** 1.1  
**Last Updated:** 2026-06-11  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiAvatar`  
**Component type:** React presentational SVG (no Standard web CE)  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/atomic/ai-launcher/ai-launcher.md`, AI command center / chat attribution patterns  

## Purpose

Identity mark for the ZAIDYN AI agent — the visual anchor that signals AI presence across every surface and interaction.

**Exports:** `AIAvatar` (34px default) and `BotAvatar` (18px inline attribution).

Both render the **same** BRAND blue concentric rings + white cross-star monogram. **There is no orange gradient ring.** Both are presentational SVGs with **no internal gradients** and **no `useId()` requirement**.

**Intent:** Use `AIAvatar` for hero/idle agent identity; use `BotAvatar` beside AI message text. Do not use as a generic decorative icon without AI context.

## Source (canonical implementation)

| Path | Role |
|------|------|
| `src/components/ai/atomic/avatar/AIAvatar.tsx` | Canonical React source (when synced) |
| `components/ai/atomic/ai-avatar/ai-avatar.md` | This mirror spec |
| `components/ai/atomic/ai-avatar/ai-avatar.agent.json` | Agent manifest |
| `components/ai/atomic/ai-avatar/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Guide |
| Accountability | Confidence |

## When to use

- `AIAvatar` (34px) — bot identity in hero idle state of AI Command Center
- `BotAvatar` (18px) — inline attribution beside AI response text
- `AIAvatar3D` — dimensional BRAND blue variant when product spec requires dimensional treatment (separate asset)

## When not to use

- Generic icon or decoration without AI context
- Custom sizes outside **34px** and **18px** without design review
- **Do not** add an orange gradient ring or recolor rings outside the BRAND ramp — the mark must read as BRAND blue
- **Do not** theme-adapt ring fills to dark mode — see **Presentation & theme** below

## Anatomy

| Part | Notes |
|------|--------|
| Outer ring | BRAND[30] `#B4BDFF` — outermost circle (soft halo) |
| Mid ring | BRAND[60] `#5A6DFF` — middle ring |
| Core | BRAND[100] `#1F2A66` — dark core behind monogram |
| Monogram | White cross-star SVG path — ZAIDYN brand glyph |

**Layer order (back → front):** outer circle → mid circle → core circle → monogram path.

## Variants

| Export | Default size | Visual difference |
|--------|--------------|-----------------|
| `AIAvatar` | 34px | Same three rings + monogram; optional blue `drop-shadow` on SVG |
| `BotAvatar` | 18px | **Identical SVG structure** — smaller size; no drop-shadow; `aria-hidden` |

> **Common agent mistake:** Treating `BotAvatar` as the “no ring” variant and `AIAvatar` as an orange-ring variant. **Both use the same concentric BRAND blue rings.** Only size, shadow, and a11y differ.

## States

| State | Visual | Use |
|-------|--------|-----|
| default (hero) | 34px, three BRAND rings + monogram | Agent identity / idle hero |
| bot (inline) | 18px, same rings + monogram | Message attribution row |

## Presentation & theme (read before implementing)

The avatar uses **fixed SVG fill colors**, not `currentColor` and not page theme tokens.

| Rule | Detail |
|------|--------|
| **Fixed fills** | Always `#B4BDFF` → `#5A6DFF` → `#1F2A66` → white monogram |
| **Light preview** | Correct appearance matches doc-site live preview on **white/light** background |
| **Dark page chrome** | Avatar colors **do not invert** on dark headers or dark mode — same hex fills |
| **No gradient ring** | Do not add orange `#FF8904` / `#F54900` outer ring — removed from Stable spec |
| **No `useId()`** | No `<linearGradient>` — multiple avatars can coexist without id scoping |
| **Hero shadow only** | `AIAvatar` may use `filter: drop-shadow(0 4px 14px rgba(90,109,255,0.45))` — not on `BotAvatar` |
| **Do not** | Wrap in `dark:` Tailwind classes that recolor circles, use `currentColor`, or substitute generic bot icons |

## Color Tokens

Map to `ai-avatar.*` in product code where possible. Documented hex is design reference.

### Avatar fill

| Token | Value | Usage |
|-------|-------|-------|
| `ai-avatar.ring.outer` | BRAND[30] `#B4BDFF` | Outermost circle |
| `ai-avatar.ring.mid` | BRAND[60] `#5A6DFF` | Middle ring |
| `ai-avatar.core` | BRAND[100] `#1F2A66` | Dark core |
| `ai-avatar.monogram.color` | `#FFFFFF` | Monogram fill |

### Size

| Token | Value | Usage |
|-------|-------|-------|
| `ai-avatar.size.default` | `34px` | `AIAvatar` diameter |
| `ai-avatar.size.bot` | `18px` | `BotAvatar` diameter |

**Removed tokens (do not use):** `ai-avatar.ring.gradient.start`, `ai-avatar.ring.gradient.end`

## AI-Specific Behavior

### Avatar rendering

Presentational only — same SVG structure everywhere; only `size` varies.

1. Parent passes `size` (default 34 or 18)
2. SVG `viewBox="0 0 42 42"`, `width`/`height` = size
3. Three concentric `<circle>` elements with fixed fills
4. White cross-star `<path>` on top
5. No gradients, no per-instance state

## Accessibility Requirements

| Export | Requirement |
|--------|-------------|
| `AIAvatar` | `aria-label="ZAIDYN Agent"` on SVG |
| `BotAvatar` | `aria-hidden="true"` when adjacent text attributes the message |

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number?` | `34` (`AIAvatar`) / `18` (`BotAvatar`) | Diameter in px |

## JavaScript / React API

```tsx
import { AIAvatar, BotAvatar } from '@ai/atomic/avatar/AIAvatar';

<AIAvatar />
<BotAvatar />
```

## Canonical implementation (copy exactly)

```tsx
import React from 'react';

export function AIAvatar({ size = 34 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 42 42"
      aria-label="ZAIDYN Agent"
      style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 14px rgba(90,109,255,0.45))' }}
    >
      <circle cx="21" cy="21" r="21" fill="#B4BDFF" />
      <circle cx="21" cy="21" r="16.3936" fill="#5A6DFF" />
      <circle cx="21" cy="21" r="11.7871" fill="#1F2A66" />
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12.4645 21C17.8898 21 21 17.8898 21 12.4645C21 17.8898 24.1102 21 29.5355 21C24.1102 21 21 24.1102 21 29.5355C21 24.1102 17.8898 21 12.4645 21Z"
        fill="white"
      />
    </svg>
  );
}

export function BotAvatar({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="21" cy="21" r="21" fill="#B4BDFF" />
      <circle cx="21" cy="21" r="16.3936" fill="#5A6DFF" />
      <circle cx="21" cy="21" r="11.7871" fill="#1F2A66" />
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12.4645 21C17.8898 21 21 17.8898 21 12.4645C21 17.8898 24.1102 21 29.5355 21C24.1102 21 21 24.1102 21 29.5355C21 24.1102 17.8898 21 12.4645 21Z"
        fill="white"
      />
    </svg>
  );
}
```

## Agent rules

1. **Copy the canonical SVG above** — do not improvise structure or colors.
2. **No orange gradient ring** — Stable spec is BRAND blue rings only.
3. **No `useId()`** — no linear gradients in this component.
4. **Fixed hex fills** — do not theme-adapt for dark mode.
5. **`AIAvatar` and `BotAvatar` share the same circles + path** — only size, shadow, and a11y differ.
6. Use only **34px** and **18px** unless design approves otherwise.

Full agent contract: `components/ai/atomic/ai-avatar/ai-avatar.agent.json`.

## Do's and Don'ts

- Do render on light or dark page chrome with the **same** `#B4BDFF` / `#5A6DFF` / `#1F2A66` fills.
- Do use `BotAvatar` for inline message attribution.
- Do use `AIAvatar` for command center hero / agent chrome.
- Don't add orange outer rings or `<linearGradient>`.
- Don't invert or recolor rings for dark mode.
- Don't substitute Lucide/Material bot icons.

## Related Components

- `components/ai/atomic/ai-launcher/ai-launcher.md` — embeds scaled `AIAvatar` in launcher pill
- `components/ai/atomic/ai-message-bubble.md` — may pair with `BotAvatar`
- `components/ai/atomic/ai-badge-avatar.md` — legacy stub; prefer this spec
