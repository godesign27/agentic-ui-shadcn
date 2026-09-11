# AI Surface Theme

**Version:** 1.0  
**Last Updated:** 2026-06-22  
**Owner:** Guild Design System  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/color.md`  
**Used By:** AI surfaces, DS component hosts, shadcn/ui app shells  

## Purpose

A **surface theme** is a CSS scope — a `data-theme` attribute on any container that redefines `--ai-*` CSS variables inside it. Components read CSS variables only, so wrapping any section in a theme context changes every component inside with zero code changes.

Three tiers participate:

| Tier | Example | Role in surface theme |
|------|---------|----------------------|
| Tier 1 | `AI_RAMP[60]` | Palette overrides per theme variant (theme files only) |
| Tier 2 | `AI.color.action.primary` | Semantic contract — unchanged across themes |
| Tier 3 | `--ai-action-primary` | CSS pivot — what components actually read |

**Programmatic maps:**

| File | Role |
|------|------|
| `themes/index.ts` | Theme registry (`ai-default`, `ai-bold`, `ai-companion`, `ai-aqua`) |
| `css/ai-surface.css` | Tier 3 `--ai-*` vars at `:root` + per `[data-theme]` |
| `css/ai-component-tokens.css` | Component slots (`--ai-button-*`, `--ai-card-*`) |
| `css/ds-bridge.css` | Remaps `--zs-*` for standard DS components |
| `css/shadcn-bridge.css` | Remaps shadcn vars (`--primary`, `--background`, etc.) |
| `maps/component-tokens.json` | Agent-parseable component → semantic → CSS chain |
| `react/SurfaceThemeProvider.tsx` | React wrapper setting `data-theme` |

---

## Hard Rules

1. **Components read CSS variables, not hex.** Use `var(--ai-action-primary)`, never `#5A6DFF` in component code.
2. **Theme files override Tier 1 only** (or explicit Tier 3 `--ai-*` overrides). Tier 2 semantic names never change.
3. **Scope with `data-theme`.** Valid values: `ai-default`, `ai-bold`, `ai-companion`, `ai-aqua`.
4. **Load CSS in order:** `ai-surface.css` → `ai-component-tokens.css` → bridge file(s).
5. **DS still needs `.zs-master-style`.** The AI surface theme overrides token values inside that scope — it does not replace DS scoping.

---

## Theme Variants

| `data-theme` | Label | Description |
|--------------|-------|-------------|
| `ai-default` | AI_RAMP Default | Light brand surface — ghost tint panels, blue-purple accents |
| `ai-bold` | AI_RAMP Bold | Dark brand surface — deep navy panels, lighter action accents |
| `ai-companion` | AI_RAMP Companion | Warm tan paper surface — companion ink and borders |
| `ai-aqua` | AI_RAMP Aqua | Teal-influenced page gradients — colors match `ai-default` |

---

## Implementation (3 steps)

### Step 1 — Map `AI.*` to CSS custom properties

Committed in `css/ai-surface.css`. Example:

```css
:root,
[data-theme="ai-default"] {
  --ai-action-primary: #5A6DFF;   /* AI.color.action.primary */
  --ai-surface-default: #F5F6FF; /* AI.color.surface.default */
  --ai-border-focus: #7A8CFF;    /* AI.color.border.focus */
}
```

### Step 2 — Define theme variants

Same file — each `[data-theme="…"]` block overrides the same variable names:

```css
[data-theme="ai-bold"] {
  --ai-action-primary: #7A8CFF;
  --ai-surface-default: #1F2A66;
  --ai-text-primary: #F5F6FF;
  --ai-border-default: rgba(255, 255, 255, 0.12);
}
```

### Step 3 — Apply to any container

```html
<div data-theme="ai-default">
  <!-- AI, DS, and shadcn components inside read themed vars -->
</div>
```

---

## Consumer Integration

### AI components

Read `--ai-*` or component slots from `ai-component-tokens.css`:

```tsx
<div style={{
  background: 'var(--ai-card-bg)',
  border: '1px solid var(--ai-border-default)',
  borderRadius: 'var(--ai-radius-md)',
}} />
```

### Standard Guild (DS)

```html
<link rel="stylesheet" href="components/ai/tokens/css/ai-surface.css">
<link rel="stylesheet" href="components/ai/tokens/css/ai-component-tokens.css">
<link rel="stylesheet" href="components/ai/tokens/css/ds-bridge.css">

<div class="zs-master-style" data-theme="ai-default">
  <!-- DS button, field, card inherit remapped --zs-* vars -->
</div>
```

### shadcn/ui

```tsx
import '@/components/ai/tokens/css/ai-surface.css';
import '@/components/ai/tokens/css/shadcn-bridge.css';
import { SurfaceThemeProvider } from '@/components/ai/tokens/react';

<SurfaceThemeProvider theme="ai-default">
  <Button />  {/* reads --primary → --ai-action-primary */}
</SurfaceThemeProvider>
```

---

## React API

```tsx
import { SurfaceThemeProvider, useSurfaceTheme } from './react';

<SurfaceThemeProvider theme="ai-bold">
  <AIInputCard />
</SurfaceThemeProvider>

const { theme } = useSurfaceTheme();
```

Runtime CSS var resolution (no DOM):

```ts
import { resolveAICssVars } from './maps/ai-css-vars';

const vars = resolveAICssVars('ai-companion');
// → { '--ai-surface-default': '#F6F2EB', ... }
```

---

## File Layout

```
components/ai/tokens/
├── themes/                  ← Tier 1 palette overrides per variant
├── css/                     ← committed runtime CSS (Tier 3 + bridges)
├── maps/                    ← agent JSON + TS resolution helpers
├── build/                   ← optional codegen from theme definitions
├── react/                   ← SurfaceThemeProvider
├── surface-theme.md         ← this file
├── surface-theme.json
└── surface-theme.agent.json
```

Existing token files (`ai-tokens.ts`, `color.md`, etc.) are **not modified** — surface theme reads from them.

---

## Do's and Don'ts

- Do wrap AI/DS/shadcn surfaces in `data-theme` (or `SurfaceThemeProvider`).
- Do load bridge CSS for the consumer library you are using.
- Do use theme variant names — not ad-hoc inline overrides on containers.
- Don't hardcode hex in components when a `--ai-*` var exists.
- Don't skip `ai-surface.css` — bridges depend on `--ai-*` being defined first.
- Don't replace `.zs-master-style` with `data-theme` — use both together for DS.

---

## Validation Checklist

- [ ] Container has `data-theme="ai-*"` (or uses `SurfaceThemeProvider`).
- [ ] CSS loaded in order: surface → component tokens → bridge(s).
- [ ] No hardcoded brand hex in themed components — all values from `var(--ai-*)`.
- [ ] DS hosts include `.zs-master-style` on an ancestor.
- [ ] Theme switch changes surface/bg/border/text without component code changes.
- [ ] `ai-bold` and `ai-companion` variants tested for text contrast on their surfaces.
