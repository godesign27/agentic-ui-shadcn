# AI Motion Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/tokens.md`, `rules/motion-rules.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/atomic/ai-icon.md`, `components/ai/atomic/ai-loading-indicators.md`, `components/ai/atomic/ai-progress.md`, streaming UI  

## Purpose

Semantic motion aliases on `AI.motion.icon.*` for the Motion Icon treatment layer. Used only when state requires emphasis; default is no motion. All timings respect `prefers-reduced-motion`.

Motion for AI interactions spans icon treatments, loading spinners, message entry, progress shimmer, and surface transitions. Icon motion is semantic — decorative parallax in chat is out of scope.

**Programmatic map:** `components/ai/tokens/ai-tokens.ts` → `AI.motion.icon.*`

---

## Hard Rules

1. **Use the constants — never hand-tune duration / easing.** Reference `AI.motion.icon.pulse`, `AI.motion.icon.spin`, etc. Tier 1 palettes are for token authors; components consume Tier 2 (`AI.*`) / Tier 3 component tokens only.
2. **Respect `prefers-reduced-motion`.** Gate every animation behind `@media (prefers-reduced-motion: no-preference)` or disable via `animation: none` in the reduce block. The `AIIcon` component already does this — match its pattern.
3. **Use the semantic name.** `AI.motion.icon.pulse` for waiting, `spin` for loading, `nudge` for hover, `handoff` for agent transfer. Don't invent per-component timings.
4. **Motion fires only when needed.** Loading, handoff, completion, and alert states — not idle decoration.
5. **Default is no motion.** Absence of a motion token means static presentation.

---

## `AI.motion.icon.*`

Semantic motion aliases for the Motion Icon treatment layer. Each entry is `{ duration, easing }`.

| Token | Duration | Easing | When it fires |
| --- | --- | --- | --- |
| `AI.motion.icon.pulse` | `1200ms` | `ease-in-out` | Waiting / thinking emphasis on icon |
| `AI.motion.icon.spin` | `900ms` | `linear` | Loading spinner (queue badge, icon orbit) |
| `AI.motion.icon.shimmer` | `1400ms` | `ease-in-out` | Shimmer highlight on active surfaces |
| `AI.motion.icon.nudge` | `220ms` | `ease-out` | Micro nudge on hover / focus emphasis |
| `AI.motion.icon.handoff` | `600ms` | `ease-in-out` | Agent handoff transition |
| `AI.motion.icon.completion` | `280ms` | `ease-out` | Task complete settle |
| `AI.motion.icon.alertRing` | `1000ms` | `ease-out` | Alert ring expand |

```tsx
import { AI } from './tokens/ai-tokens';

const { duration, easing } = AI.motion.icon.pulse;
// animation: `pulse ${duration} ${easing} infinite`
```

---

## CSS Keyframe Animations

Defined inline via `<style>` helpers in command-center / chat surfaces (e.g. `AIChatAnimStyles`):

```css
@keyframes ai-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes ai-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ai-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

@keyframes ai-indeterminate {
  0%   { left: -40%; width: 40%; }
  50%  { left: 30%;  width: 50%; }
  100% { left: 110%; width: 40%; }
}

@keyframes ai-progress-settle {
  0%   { opacity: 0.7; transform: scaleX(1.01); }
  100% { opacity: 1;   transform: scaleX(1); }
}

@keyframes ai-queue-spin {
  to { transform: rotate(360deg); }
}
```

### Keyframe usage

| Animation | Where | Duration | Token alignment |
| --- | --- | --- | --- |
| `ai-spin` | Loading spinner circle | `0.9s linear infinite` | `AI.motion.icon.spin` (900ms) |
| `ai-queue-spin` | Queue badge running spinner | `0.9s linear infinite` | `AI.motion.icon.spin` |
| `ai-in` | Message entry | `0.2s ease both` | General UI fast (200ms) |
| `ai-in` | Pattern response entry | `0.25s ease both` | General UI normal |
| `ai-shimmer` | Progress segmented / indeterminate | `1400ms ease-in-out` | `AI.motion.icon.shimmer` |
| `ai-indeterminate` | Progress bar sliding fill | `1500ms ease-in-out` | Progress component |
| `ai-progress-settle` | Complete state fill | `280ms ease-out` | `AI.motion.icon.completion` |

---

## Transitions

Non-keyframe property changes — use documented durations, not ad-hoc values.

| Element | Property | Duration | Notes |
| --- | --- | --- | --- |
| Background crossfade | `opacity` | `0.7s ease` | Page surface idle ↔ active |
| Ambient blobs | `opacity` | `0.7s ease` | Command center ambient layer |
| Input card shadow | `box-shadow` | `0.25s ease` | `AI.shadow.input.default` → `focus` |
| Input card border | `border-color` | `0.25s ease` | Focus ring transition |
| Chip hover | `all` | `0.18s ease` | Quick chip affordance |
| Send button | `all` | `0.18s ease` | Composer toolbar |
| Thinking chevron | `transform` | `0.18s ease` | Collapse / expand |
| Segmented control tab | `all` | `0.15s ease` | Mode picker |
| Progress fill width | `width` | `350ms ease-out` | Determinate progress |

---

## General UI Motion (design system alignment)

| Role | Value | design system alignment | Usage |
| --- | --- | --- | --- |
| Fast | 120ms | `@token-animation-duration-fast` | Hover on send/stop, chip hover |
| Normal | 200ms | medium | Message fade-in, panel expand |
| Slow | 300ms | slow | Drawer, overlay enter |
| Streaming loop | 1.6s | skeleton pulse | Thinking indicator, typing dots |

---

## AI-Specific Behaviors

| Pattern | Motion rule |
| --- | --- |
| New message appears | Opacity 0→1, 200ms ease-out; no slide >16px |
| Thinking indicator | Opacity pulse or rotate per loader spec — 1.6s loop max |
| Streamed text | No per-character animation; update content in place |
| Stop generation | Immediate halt — no exit animation on partial text |
| Overlay open | Opacity + scale 0.96→1, 200ms |
| Agent handoff | `AI.motion.icon.handoff` on icon layer only |
| Progress complete | `ai-progress-settle` + `AI.motion.icon.completion` timing |

---

## Consumer Mapping

| Component | Motion token / keyframe | Notes |
| --- | --- | --- |
| `AIIcon` | `AI.motion.icon.*` | Gates all treatments behind reduced-motion |
| `AIQueueBadge` (running) | `ai-queue-spin` / `AI.motion.icon.spin` | Spinner rotation |
| `AIProgress` (indeterminate) | `ai-indeterminate`, `ai-shimmer` | Sliding / shimmer fill |
| `AIProgress` (complete) | `ai-progress-settle` | Settle on 100% |
| `AILoadingIndicators` | pulse / spin | Working pill, thinking steps |
| Chat message entry | `ai-in` | 200ms fade + 8px translateY |
| `AIInputCard` focus | shadow/border transitions | 250ms — pairs with `AI.shadow.input.*` |

---

## Reduced Motion

Always gate animations and disable non-essential motion:

```css
@media (prefers-reduced-motion: reduce) {
  .ui-ai-thinking,
  .ui-ai-streaming,
  .ai-icon-motion,
  .ai-progress-shimmer,
  .ai-progress-indeterminate,
  .ai-queue-badge__spinner {
    animation: none !important;
    transition: none;
  }
}
```

Prefer `@media (prefers-reduced-motion: no-preference)` when *adding* animations. Apply to all AI prototypes. See `rules/accessibility-rules.md`.

Static fallbacks: show percent label, status text, or icon state without animation.

---

## Usage

```tsx
import { AI } from './tokens/ai-tokens';

const { duration, easing } = AI.motion.icon.pulse;
<div style={{ animation: `pulse ${duration} ${easing} infinite` }} />

// CSS — gate behind no-preference
@media (prefers-reduced-motion: no-preference) {
  .ai-icon-spin {
    animation: ai-spin 900ms linear infinite;
  }
}
```

---

## Do's and Don'ts

- Do respect `prefers-reduced-motion` for all icon, progress, and streaming UI.
- Do use `AI.motion.icon.*` constants — not hardcoded durations in components.
- Do keep motion functional — not decorative parallax in chat.
- Do use semantic names (`spin`, `handoff`, `completion`) — not appearance-based names.
- Don't animate layout height on every streamed token append.
- Don't use motion >5s without user pause control (WCAG).
- Don't hand-tune `duration` / `easing` per component when a token exists.

---

## Validation Checklist

- [ ] Every animation gated by `@media (prefers-reduced-motion: no-preference)` or disabled in the reduce block.
- [ ] No hand-tuned `duration` / `easing` in component code — sourced from `AI.motion.icon.*`.
- [ ] Motion fires only for state changes that need user attention (loading, handoff, completion).
- [ ] Spinner animations align with `AI.motion.icon.spin` (900ms linear).
- [ ] Progress complete uses `ai-progress-settle` / `AI.motion.icon.completion` (280ms ease-out).
- [ ] Streamed text updates in place — no per-character animation.
