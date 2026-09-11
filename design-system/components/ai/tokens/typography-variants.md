# AI Typography Variants Reference

**Last Updated:** 2026-07-06  
**Source:** ZAIDYN AI Design System token bundle (`ai-tokens.bundle.md`)

---

# Typography Variants Reference
_Every `@zsai-*` token in `AI_TYPOGRAPHY` at a glance, plus the reconciled typography.md rules doc (12px floor, weight rules, role→token map). Full narrative in `/typography.md` at repo root._
---
## 1. Hard rules
1. **12px is the hard floor.** No text below 12 anywhere. Icon glyphs (`<i className="zs-icon-*">`) are exempt — those are decorative render sizes, not text.
2. **14px is the UI-control default.** Buttons, tabs, chips, action links, filter labels, table headers, status pills.
3. **Medium (500) minimum below 14.** Sub-14 Regular (400) is illegal in AI components.
4. **Structural text is fixed.** Never shrink `h1`–`h5` / `p` to match nearby dense component density.
---
## 2. Element token table (structural — outside components)
| Element | Size | Weight | LH | ZAIDYN token | Notes |
|---------|------|--------|----|--------------|-------|
| `h1` | 48px | Bold (700) | 1.5 | `@zsai-hero` | Naming: reference `h1` tier = our `@zsai-hero`. |
| `h2` | 32px | Bold (700) | 1.5 | `@zsai-h1` | Off-by-one from ref (see notes below). |
| `h3` | 24px | Bold (700) | 1.5 | `@zsai-h2` | |
| `h4` | 16px | Bold (700) | 1.5 | `@zsai-h4` / `@zsai-card-title` | Card / dialog title tier. |
| `h5` | 14px | Bold (700) | 1.5 | `@zsai-h5` | Smallest structural heading. |
| `p` | 16px | Regular (400) | 1.5 | `@zsai-body` | |
| `label` (eyebrow) | 12px | **Semibold (600)** *(exception)* | 1.5 | `@zsai-overline` / `@zsai-micro-eyebrow` | Ships Semibold (documented exception vs reference Bold). |
| `button` | 16px | Regular (400) | 1.5 | `<AIButton size="xl">` | Page-level structural CTA. Component buttons use `@zsai-button-label` (14/600). |
| `input` | 16px | Regular (400) | 1.5 | `@zsai-input-text` | |
| `caption` | 12px | Regular (400) | 1.5 | `@zsai-caption-1` | Prose caption. Use `@zsai-caption-2` (12/500) for control-adjacent caption. |
---
## 3. AI type-scale tokens — full variant dump
### 3a. Standard scale (mirrors ZDS scale)
| Token | Size | Weight | Line-height | Letter-spacing | Text-transform |
|-------|------|--------|-------------|----------------|----------------|
| `@zsai-super-hero` | 64px | 400 | 1.5 | — | — |
| `@zsai-hero` | 48px | 700 | 1.5 | — | — |
| `@zsai-h1` | 32px | 700 | 1.5 | — | — |
| `@zsai-h2` | 24px | 700 | 1.5 | — | — |
| `@zsai-h3` | 20px | 700 | 1.4 | — | — |
| `@zsai-h4` | 16px | 700 | 1.5 | — | — |
| `@zsai-h5` | 14px | 700 | 1.5 | — | — |
| `@zsai-h6` | 12px | 700 | 1.4 | — | — |
| `@zsai-subtitle-1` | 16px | 400 | 1.5 | — | — |
| `@zsai-subtitle-2` | 14px | 400 | 1.44 | — | — |
| `@zsai-body` | 16px | 400 | 1.5 | — | — |
| `@zsai-body-small` | 14px | 400 | 1.4 | — | — |
| `@zsai-body-extra-small` | 12px | 400 | 1.63 | — | — |
| `@zsai-caption-1` | 12px | 400 | 1.5 | — | — |
| `@zsai-caption-2` | 12px | 500 | 1.5 | — | — |
| `@zsai-overline` | 12px | 600 | 1.5 | `0.4em` | uppercase |
| `@zsai-label` | 16px | 700 | 1.5 | `2.5px` | — |
| `@zsai-input-label` | 16px | 700 | 1.5 | `0.15px` | — |
| `@zsai-button-label` | 14px | 600 | 1 | — | — |
| `@zsai-agent-name` | 12px | 600 | 1 | — | — |
### 3b. Atomic-tier AI extensions
| Token | Size | Weight | Line-height | Letter-spacing | Text-transform |
|-------|------|--------|-------------|----------------|----------------|
| `@zsai-status-label` | 12px | 500 | 1 | — | — |
| `@zsai-micro-eyebrow` | 12px | 600 | 1 | `0.02em` | — |
| `@zsai-numeric-badge` | 12px | 500 | 16px | — | — |
| `@zsai-help-micro` | 12px | 500 | 1.55 | — | — |
### 3c. Group-tier AI extensions
| Token | Size | Weight | Line-height | Letter-spacing | Text-transform |
|-------|------|--------|-------------|----------------|----------------|
| `@zsai-bubble-body` | 16px | 400 | 1.55 | `-0.1px` | — |
| `@zsai-input-text` | 16px | 400 | 1.5 | — | — |
| `@zsai-trace-detail` | 12px | 500 | 1.55 | — | — |
| `@zsai-notif-title-compact` | 12px | 700 | 1.3 | — | — |
| `@zsai-menu-item` | 14px | 400 | 1.4 | `-0.1px` | — |
| `@zsai-action-link` | 12px | 600 | 1 | — | — |
### 3d. Pattern-tier AI extensions
| Token | Size | Weight | Line-height | Letter-spacing | Text-transform |
|-------|------|--------|-------------|----------------|----------------|
| `@zsai-metric-value` | 22px | 600 | 1.1 | — | — |
| `@zsai-impact-headline` | 15px | 700 | 1.1 | — | — *(deliberate 15px exception)* |
| `@zsai-section-subtitle` | 14px | 400 | 1.55 | — | — |
| `@zsai-table-cell` | 14px | 400 | 1.4 | — | — |
### 3e. Group normalization wave
| Token | Size | Weight | Line-height | Letter-spacing | Text-transform |
|-------|------|--------|-------------|----------------|----------------|
| `@zsai-panel-section-head` | 12px | 600 | 1.5 | — | — |
| `@zsai-card-title` | 16px | 700 | 1.4 | — | — |
| `@zsai-meta-label` | 12px | 500 | 1.5 | — | — |
| `@zsai-insight-title` | 14px | 600 | 1.4 | — | — |
---
## 4. Role → token map (drift prevention)
Look up the token by role instead of hardcoding a `fontSize`. If a role isn't listed here it doesn't have a token yet — file a token request rather than inventing a fontSize.
| Role | Token / API | Value |
|------|-------------|-------|
| Page hero title | `@zsai-hero` | 48/700/1.5 |
| Page title | `@zsai-h1` | 32/700/1.5 |
| Section title | `@zsai-h2` | 24/700/1.5 |
| Card / dialog title | `@zsai-h4` · `@zsai-card-title` | 16/700 |
| Body copy | `@zsai-body` | 16/400/1.5 |
| Page-level button | `<AIButton size="xl">` | 16/400/1.5 |
| Component button | `@zsai-button-label` | 14/600/1.0 |
| Body compact | `@zsai-body-small` | 14/400/1.4 |
| Table header | `AICardDataTable <th>` | 14/700 uppercase |
| Table cell | `@zsai-table-cell` | 14/400/1.4 |
| Menu item | `@zsai-menu-item` | 14/400/1.4 |
| Metric value | `@zsai-metric-value` | 22/600/1.1 |
| Metric qualifier | `AIMetricTile` qualifier | 12/600 |
| Reasoning quote (italic) | `AIReasoningQuote` | 14/400 italic /1.55 |
| Status pill (default) | `<AIStatusPill>` | 14/600/1.3 |
| Status pill (sm) | `<AIStatusPill size="sm">` | 12/600/1.3 |
| Dialog title (md) | `<AICommandCenterDialog titleSize="md">` | 16/700/1.3 |
| Dialog title (lg) | `<AICommandCenterDialog titleSize="lg">` | 24/700/1.3 |
| Chip / badge label | `@zsai-caption-1` · `@zsai-caption-2` | 12/400 or 12/500 |
| Eyebrow / overline | `@zsai-overline` · `@zsai-micro-eyebrow` | 12/600 uppercase |
| Meta / caption | `@zsai-meta-label` | 12/500 |
| Helper / hint | `@zsai-help-micro` | 12/500/1.55 |
| Icon glyph (exempt) | `<i className="zs-icon-*">` | 9–24px — exempt from 12px text floor |
---
## 5. Never-do list
- **NEVER** use `fontSize: 10` or `fontSize: 11` (any form: numeric, string, ternary). 12px is the hard floor.
- **NEVER** pair `fontSize: 12` or `fontSize: 13` with `fontWeight: 400`. Sub-14 requires Medium (500) minimum.
- **NEVER** use `fontSize: 15` or `fontSize: 11.5` inline — snap to 12 / 14 / 16. *(Exception: `@zsai-impact-headline` for compact KPI display.)*
- **NEVER** rename an `@zsai-*` token from its current size — downstream consumers break.
- **NEVER** mix ALL-CAPS with size hierarchy — acronyms only (and the `@zsai-overline` eyebrow).
- **NEVER** hardcode a `fontSize` when a role token exists — see §4.
- **NEVER** shrink structural text to match nearby component density.
### Token-level exceptions
| Token | Value | Notes |
|-------|-------|-------|
| `@zsai-impact-headline` | 15/700/1.1 | Compact KPI display — only via token spread |
| `@zsai-caption-1` | 12/400/1.5 | Structural prose caption — not control-adjacent UI |
| `@zsai-body-extra-small` | 12/400/1.63 | Dense prose helper — same prose exception |
---
## 6. Source-of-truth files
| Content | File |
|---------|------|
| AI type scale (`AI_TYPOGRAPHY['@zsai-*']`) | `components/ai/tokens/ai-typography.ts` |
| Typography rules doc | `components/ai/tokens/typography.md` (mirrored at `/typography.md` repo root) |
| Downloadable CSS custom properties | Generated from Downloads → `global.css` |
_Regenerate this bundle from Downloads → Design Tokens whenever the source files change._