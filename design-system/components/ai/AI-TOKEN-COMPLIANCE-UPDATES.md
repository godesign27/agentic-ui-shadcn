# AI Token-Compliance Sync — Updates Log

**Date:** 2026-07-21
**Scope:** ZDS AI packages (`packages/ai-tokens`, `packages/ai-ui`, `packages/ai-ui-angular`)
**Audience:** the design-system **doc-site** AI agent (sync bundles, mirrors, generated exports, and docs to match this source-of-truth work)
**Rule basis:** `components/agent-instructions.md` rule 5 (use `--zs-*`/`@zs-*`/AI tokens; never hardcode hex) + the 3-tier token system.

> **Canonical source is `packages/`.** All edits below were made in `packages/`. The doc site's mirrors (`components/ai/tokens/*`), generated exports (`design-system/generated/exports/*`), and download bundles must be **regenerated from these**, not hand-edited.

---

## 1. New / changed tokens

### Tier 1 — Global palette (`packages/ai-tokens/src/ai-tokens.ts`)
- `ZS_GREEN[60] = #27AE60`
- `ZS_AMBER[60] = #E67E22`

### Tier 2 — Semantic aliases (`ai-tokens.ts`)
- `AI.color.status.success = ZS_GREEN[60]`
- `AI.color.status.warning = ZS_AMBER[60]`
- `AI.gradient.surface.neutral = linear-gradient(135deg, #F4F3F3 0%, #E8E7EA 100%)`
- `AI_THEME.aqua['gradient.surface.neutral'] = linear-gradient(135deg, #E6F6F6 0%, #D0EFEF 100%)`

### Tier 3 — CSS custom properties (`packages/ai-tokens/src/css/ai-surface.css`)
- `--ai-status-success: #27AE60`, `--ai-status-warning: #E67E22`
- `--ai-gradient-surface-neutral`, `--ai-gradient-surface-aqua`
- `--ai-surface-aqua-tint: #E6F6F6` (solid aqua tint for command-center gradients)

### Typography scale — **NEW source of truth for CSS consumers**
- `packages/ai-tokens/src/ai-typography.ts`: added `@zsai-metric-value-md` (26/700/1.1) and `@zsai-metric-value-lg` (34/700/1.1) — large numeric display scale.
- **NEW FILE** `packages/ai-tokens/src/css/ai-typography.css` — mirrors `AI_TYPOGRAPHY` font sizes as CSS vars for Angular/CSS consumers:
  `--zsai-font-size-{12,14,15,16,20,22,24,26,32,34,48,64}`.
- **NEW EXPORT** in `packages/ai-tokens/package.json`: `"./ai-typography.css": "./src/css/ai-typography.css"`.

---

## 2. Component API changes (parity)

| Component (Angular) | Change |
|---|---|
| `ai-chip-brief` (`packages/ai-ui-angular/src/atomic/ai-chip-brief`) | **New @Inputs:** `accentColor`, `accentBg`, `noDot`, `icon` (matches React `AIChipBrief`). Dot now renders for **all** statuses (was `running`-only); `icon` (a `zs-icon-*` glyph name) replaces the dot. |
| `ai-agent-response` (`.../atoms/ai-agent-response`) | **New @Input:** `dark` (boolean) with a token-based dark surface variant. (React declares `dark` but currently no-ops it — align React later if desired.) |

React `children` remain `<ng-content>` in Angular (not a prop) — no change needed.

---

## 3. Behavioral changes to reflect in docs / re-exported bundles

### A. Bare hex → tokens (visual: unchanged; hex kept as `var()` fallback)
- React `AIChipBrief` status map → `--zs-surface-*`/`--zs-border-*`/`--zs-text-*` + `--zsai-*`.
- `ai-card-metric` `teal` accent → `var(--zs-text-info,#0DACAD)`; button text → `var(--ai-text-on-action,#fff)`.
- `ai-command-center` + `ai-command-center-dialog` aqua tint → `var(--ai-surface-aqua-tint,#E6F6F6)`; button text → `var(--ai-text-on-action,#fff)`.
- **Repo-wide semantic bare-hex outside `ai-avatar`: 0.**

### B. Reduced-motion (accessibility)
- Every animated component now gates its `animation:` behind `@media (prefers-reduced-motion: no-preference)` (16 Angular components + `ai-chip-brief`). Under reduced-motion the motion is disabled.
- `ai-button` family is the **reference** and keeps its existing `prefers-reduced-motion: reduce` (slow-spinner) guard.

### C. Typography → tokens (some deliberate visual normalization)
- **181** `font-size` literals at existing scale sizes → `var(--zsai-font-size-N, Npx)` (no visual change).
- **197** off-scale literals **normalized** to the nearest token (visual change — intended):
  - `9px, 10px, 11px → 12px` (`--zsai-font-size-12`) — 12px floor (typography.md §2)
  - `13px → 14px` (`--zsai-font-size-14`) — sub-14 tier fix (§3)
  - `18px → 20px` (`--zsai-font-size-20`)
  - `26px → 26px`, `34px → 34px` (new metric display tokens)
  - `28px → 26px` (normalized to metric-md)
- Result: **0 px `font-size` literals** in `packages/ai-ui-angular/src` (only relative `em` units remain).
- `ai-metric-value` keeps its sm/md/lg scale = 20 / 26 / 34.

### D. React typography
- `AIMessageHeader` (label → `@zsai-agent-name`, timestamp → `@zsai-caption-1`), `AIConfidenceRiskBadge` compact → `@zsai-caption-2`, `AIChipBrief` sm → `@zsai-caption-2`.

---

## 4. Scan allowlist
- `components/ai/scan-allowlist.json` — **`ai-avatar` is exempt** (fixed brand fills `#B4BDFF`/`#5A6DFF`/`#1F2A66` are mandated). Do not tokenize it.
- Structural white used only as a `var(..., #fff)` fallback is not a violation.

---

## 5. Verification done
- Isolated `tsc --strict --skipLibCheck` on the referenced `AI_TYPOGRAPHY` keys and token members → **pass**.
- Re-scan: 0 semantic bare-hex (outside `ai-avatar`); 0 px `font-size` literals (outside relative `em`); every `animation:` behind a reduced-motion gate (outside the `ai-button` reference).
- `ngc` not run (no Angular build harness in this repo); Angular edits are typed `@Input`s + CSS-string content.

---

## 6. Doc-site agent — action checklist

1. **Re-sync token mirrors** from `packages/ai-tokens/src` → `components/ai/tokens/`:
   `node scripts/sync-ai-packages.mjs`
   (Script copies **package → mirror** only. Do not reverse this.)
   Ensure `ai-tokens.ts`, `ai-typography.ts`, `ai-surface.css`, and the **new** `ai-typography.css` are all mirrored, and the new package export path is carried over.
2. **Load the new type-scale layer** on the doc site (import `@zaidyn/ai-tokens/ai-typography.css` after `ai-surface.css` + `ai-component-tokens.css`). Until loaded, the px fallbacks render identically — but the `--zsai-font-size-*` vars won't be themable.
3. **Rebuild component export/download bundles** for every touched component so the doc-site code matches source:
   `node scripts/build-ai-component-export.mjs <slug>` (and/or `node scripts/migrate-ai-bundles.mjs`).
   Prioritize: `ai-button`, `ai-chip-brief`, `ai-card-metric`, `ai-agent-response`, `ai-command-center`, `ai-command-center-dialog`, `ai-metric-value`, plus all reduced-motion/typography-touched components.
4. **Update component docs / `.agent.json` manifests**:
   - `ai-chip-brief`: document new inputs `accentColor`, `accentBg`, `noDot`, `icon`; note dot-for-all-statuses.
   - `ai-agent-response`: document new `dark` input.
   - Note reduced-motion behavior and the normalized type scale (`--zsai-font-size-*` + `@zsai-metric-value-md/lg`).
5. **Regenerate manifests / indexes** as needed: `node scripts/validate-ai-manifests.mjs`, `node scripts/generate-ai-llms-index.mjs`.
6. Keep `ai-avatar` untouched (allowlisted).
