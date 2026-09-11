# AI Typography Tokens

**Version:** 2.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System  
**Depends On:** `foundation/typography.md`, `foundation/tokens.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/atomic/*`, `components/ai/organisms/*`, `components/ai/patterns/*`  

## Purpose

AI surfaces inherit the Open Sans type system. Same scale, same tokens, same `.ui-master-style` scope as the standard library — never invent fonts or hex sizes in AI components.

standard typography is the foundation used by every text-bearing AI component. Open Sans at 16px root, semantic HTML first (`h1`–`h6`, `p`, `a`) or utility classes (`.ui-body`, `.ui-overline`, etc.), and text colors via `@brand-*` / `--brand-*` tokens. AI surfaces resolve through the AI token namespace so values can be tuned without touching the standard palette; the type scale, weights, link states, and list spacing remain identical to the standard library. Seventeen AI-only sizes extend the scale — four atomic-tier, six group-tier, three pattern-tier, plus four from the groups-audit normalization wave. Together they cover every AI atom, group, and pattern the audits found that doesn't map cleanly to a standard scale row.

**Programmatic maps:**

| File | Export | Role |
|------|--------|------|
| `components/ai/tokens/ai-typography.ts` | `AI_TYPOGRAPHY` | TS inline-style scale (`@brand-*` keys) |
| `components/ai/tokens/ai-tokens.ts` | `F`, `NEUTRAL.*` | Font family + neutral text colors |

**Atom spec:** `components/ai/atomic/ai-typography/ai-typography.md` — CSS-only foundation atom (`.ui-master-style` scope).

---

## Hard Rules

1. **Use the constants — never hardcode hex or pixel sizes.** Reference `AI_TYPOGRAPHY['@brand-section-subtitle']`, `F`, `NEUTRAL.textDefault`, etc.
2. **CSS-first for page typography.** Apply `.ui-master-style` at the AI surface root; use semantic HTML or `.ui-*` utility classes. Spread `AI_TYPOGRAPHY` only in TS/React inline-style components.
3. **Three tiers.** Tier 1 = raw values in `ai-typography.ts`. Tier 2 = `@brand-*` token names. Tier 3 = component slots (`ai-button.label.font`, etc.) emitted as CSS variables in component specs.
4. **Semantic HTML first.** Maintain logical heading order (`h1` → `h2` → …). Reach for utility classes only when visual style differs from element semantics.
5. **Link states are CSS-only.** Do not hand-class hover, visited, or focus variants in production.

---

## When to Use

- Apply `.ui-master-style` at the AI surface root (or configured `@brand-scope`)
- Use semantic HTML first — `h1`–`h6` / `p` / `a` / `ul` / `ol` — and reach for utility classes only when the visual style differs from the semantics
- Maintain logical heading order for accessibility
- Use the header block (overline + heading + subtitle) as the standard AI page/section title composition
- Use semantic text color tokens for helper, disabled, and caption text
- Prefer the new nested list pattern with `.ui-padding-0.ui-list-style-type-none`
- Spread `AI_TYPOGRAPHY['@brand-*']` in TS components — never inline `fontSize` / `fontWeight`

## When Not to Use

- Hardcode Open Sans or pixel font sizes in AI component LESS/CSS
- Skip heading levels purely for sizing — use the type-scale classes on the correct element instead
- Static-class hover, visited, or focus link variants — link states are CSS-only in production
- Use deprecated nested list pattern (nested `ul` without the list-style-none wrapper)
- Rely on uppercase overline as the only signal of meaning — pair with semantic structure
- Use "click here" or other non-descriptive link text

---

## Anatomy

1. **Scope** _(Shared)_ — `.ui-master-style` on `<body>` (or configured `@brand-scope`). Applies base font, color, and element styles to descendants.
2. **Display headings** _(Shared)_ — `.ui-super-hero` (64px / 400) and `.ui-hero` (48px / 700) — marketing / hero scale above h1.
3. **Semantic headings** _(Shared)_ — `h1`–`h6` and `.ui-h1`–`.ui-h4`. Bold (700) with type-driven margins. Maintain logical hierarchy.
4. **Subtitles** _(Shared)_ — `.ui-subtitle-1` (16px / 400) and `.ui-subtitle-2` (14px / 400) — supporting lines under titles.
5. **Body & caption** _(Shared)_ — `.ui-body` / `.ui-body-small` / `.ui-body-extra-small` for paragraphs; `.ui-caption-1/2` for fine print.
6. **Labels & overline** _(Shared)_ — `.ui-label` / `.ui-input-label` (16px / 700 / tracked) and `.ui-overline` (10px / 600 / uppercase / 0.4em letter-spacing).
7. **Header block** _(Shared)_ — `.ui-header-block` — composes overline + heading + subtitle as the standard section title.
8. **Links & emphasis** _(Shared)_ — `<a>` (default / visited / hover / focus / active / disabled) plus `strong`/`b` and `em`/`i`.

---

## State Variations

- **Type scale** _(16px root)_ — Full Open Sans scale from `.ui-super-hero` (64px) through `.ui-caption-2` (10px). Sizes are em-relative to `@brand-font-size`; override with `.ui-size-*` utilities for an entire subtree.
- **Weights** _(300 / 400 / 600 / 700)_ — Light · Normal · Semi-bold · Bold. Utility classes `.ui-font-weight-semi-bold` and `.ui-font-weight-bold`. Body defaults to 400.
- **Links** _(a + status text)_ — Default / hover (underline) / visited / focus-visible (ring) / active / disabled. Status text utilities: `.ui-success-text`, `.ui-error-text`, `.ui-warning-text`, `.ui-info-text`.
- **Header block** _(.ui-header-block)_ — Overline (uppercase eyebrow) + h1/h2 + subtitle-1/2. The canonical composition for page and section titles.
- **Lists** _(.ui-list)_ — Standard ordered/unordered lists with standard spacing; `.ui-bullet-list` swaps disc bullets for the icon-font glyph; nested lists use the new `.ui-padding-0.ui-list-style-type-none` wrapper.
- **AI extensions** _(17 AI-only sizes)_ — Recurring AI patterns that don't map to a standard scale row. See tables below.

---

## Tokens

### Typography foundation

| Token | Value | Usage |
| --- | --- | --- |
| `@brand-font-family` | `"Open Sans", sans-serif` | Global AI family. Maps to `F` in `ai-tokens.ts`. Never hardcode. |
| `@brand-font-size` | `16px` | Root em base for the scoped AI container. |
| `@brand-line-height` | config-defined | Labels and inputs. |
| `@brand-font-weight-light` | `300` | Light weight. |
| `@brand-font-weight-normal` | `400` | Default body weight. |
| `@brand-font-weight-semi-bold` | `600` | Overline, semibold emphasis. |
| `@brand-font-weight-bold` | `700` | Headings, labels. |

### AI type scale rows (mirrors standard scale 1:1)

Every aligned atom resolves through one of these tokens. Values match `AI_TYPOGRAPHY` in `ai-typography.ts`.

| Token | Value | Usage |
| --- | --- | --- |
| `@brand-super-hero` | `64px / 400 / 1.5` | Hero · marketing scale above h1 (`.ui-super-hero`) |
| `@brand-hero` | `48px / 700 / 1.5` | Hero · marketing display (`.ui-hero`) |
| `@brand-h1` | `32px / 700 / 1.5` | Page title (`h1` / `.ui-h1`) |
| `@brand-h2` | `24px / 700 / 1.33` | Section title (`h2` / `.ui-h2`) |
| `@brand-h3` | `20px / 700 / 1.4` | Subsection title (`h3` / `.ui-h3`) |
| `@brand-h4` | `16px / 700 / 1.5` | Card header (`h4` / `.ui-h4`) |
| `@brand-h5` | `14px / 700 / 1.4` | Compact heading (`h5` / `.ui-h5`) |
| `@brand-h6` | `12px / 700 / 1.4` | Micro heading (`h6` / `.ui-h6`) |
| `@brand-subtitle-1` | `16px / 400 / 1.5` | Subtitle paired with h1 (`.ui-subtitle-1`) |
| `@brand-subtitle-2` | `14px / 400 / 1.44` | Subtitle paired with h2 (`.ui-subtitle-2`) |
| `@brand-body` | `16px / 400 / 1.5` | Default body copy (`.ui-body`) — AIMessageBody md, response panels |
| `@brand-body-small` | `14px / 400 / 1.4` | Secondary body (`.ui-body-small`) — chip labels, brief cards, agent-work-note copy |
| `@brand-body-extra-small` | `12px / 400 / 1.63` | Fine print (`.ui-body-extra-small`) |
| `@brand-caption-1` | `12px / 400 / 1.5` | Caption (`.ui-caption-1`) — confidence/risk numeric chips, queue-badge captions, control-bar helper, text-link sm |
| `@brand-caption-2` | `10px / 400 / 1.5` | Smallest caption (`.ui-caption-2`) |
| `@brand-overline` | `10px / 600 / 1.5 · uppercase · 0.4em` | Eyebrow (`.ui-overline`) — header blocks, section labels |
| `@brand-label` | `16px / 700 / 1.5 · 2.5px tracking` | Form label (`.ui-label`) |
| `@brand-input-label` | `16px / 700 / 1.5 · 0.15px tracking` | Input field label (`.ui-input-label`) |
| `@brand-button-label` | `13px / 600 / 1.0` | Button & launcher label (AIButton lg, AILauncher). Also drawer / dialog title headers (AIAgentDrawer title, AICommandCenterDialog greeting) — tracking varies by ±0.05px and is treated as rounding noise. |
| `@brand-agent-name` | `11px / 600 / 1.0` | Agent attribution row (AIMessageHeader md) — names the assistant beside the avatar |

### Semantic text colors

| Token | Value | standard equivalent |
| --- | --- | --- |
| `@brand-text-color` | theme primary | `--brand-text-color` · `NEUTRAL.textDefault` `#2f2c3c` |
| `@brand-headline-text-color` | theme heading | `--brand-headline-text-color` |
| `@brand-helper-text-color` | theme helper | `--brand-helper-text-color` · `NEUTRAL.textHelper` `#5b5864` |
| `@brand-medium-text-color` | theme medium | `--brand-medium-text-color` |
| `@brand-disabled-text-color` | theme disabled | `--brand-disabled-text-color` · `NEUTRAL.textDisabled` `#716e79` |
| `@brand-dark-text-color` | theme dark | `--brand-dark-text-color` |
| `@brand-caption-text-color` | theme caption | `--brand-caption-text-color` |

### Link tokens

| Token | Value | Usage |
| --- | --- | --- |
| `@brand-link-text-color` | theme link | Default link color |
| `@brand-link-hover-color` | theme link hover | Hover state — paired with underline |
| `@brand-link-visited-color` | theme link visited | Visited state |
| `@brand-link-focus-color` | theme link focus | Focus state — paired with `.ui-focus()` ring |
| `@brand-link-active-color` | theme link active | Mousedown / active state |

### AI-only extensions (no standard equivalent)

| Token | Value | Usage |
| --- | --- | --- |
| `@brand-status-label` | `12px / 400 / lh 1` | Status & action pill labels (Working, Pause, Confirm cancel?). Often uppercase. Used by AILoadingIndicators, AIControlBar, AILauncher tooltip. |
| `@brand-micro-eyebrow` | `11px / 600 / 0.02em` | Micro eyebrow above progress and tight status labels. Used by AIProgress segmented + status rows. |
| `@brand-numeric-badge` | `10px / 400 / lh 16px` | Count chips beside queue / inbox labels (3, 12, 99+). Used by AIQueueBadge. |
| `@brand-help-micro` | `11.5px / 400 / 1.55` | Secondary help text ("View details", "Hide working note", "Updated 2 min ago"). Used by AILoadingIndicators, AIAgentWorkNote, AIControlBar. |
| `@brand-bubble-body` | `16px / 400 / 1.55 / -0.1px` | Conversational message copy — warmer line-height + tracking than `@brand-body` for chat readability. Used by AIUserBubble, AIAnalysisMessage. |
| `@brand-input-text` | `15px / 400 / 1.6` | Input fields and textareas. Used by AIInputCard, AICommandCenterDialog. |
| `@brand-trace-detail` | `11px / 400 / 1.55` | Process-trace detail rows. Used by AIReasoningTrace expanded step + MetaChip. |
| `@brand-notif-title-compact` | `11px / 700 / 1.3` | Compact notification heads in side panels. Used by AINotification compact variant. |
| `@brand-menu-item` | `13px / 400 / 1.4 / -0.1px` | Dropdown / popover menu labels. Used by AIInputCard AddMenu + ModeOption, AICommandCenterDialog PlusMenu. |
| `@brand-action-link` | `10px / 600 / 1.0` | Ghost action links — "Why this?", "View sources", "Open trace". Used by AIResponseFooter LinkBtn, AIReasoningTrace GhostLink, AIAnalysisInsight GhostLink, AIGeneratedDashboard ghost actions. |
| `@brand-impact-headline` | `15px / 700 / 1.1` | Compact KPI / impact-score display in dashboard modules. Used by AIGeneratedDashboard impact scores + loading label. |
| `@brand-section-subtitle` | `13px / 400 / 1.55` | Module body / descriptive copy in dashboard sections. Used by AIGeneratedDashboard AI summary, rationale text. |
| `@brand-table-cell` | `11px / 600 / 1.0` | Compact data-table cell text. Used by AIResponsePatterns table cells, AICommandCenterSplitView step number. |
| `@brand-panel-section-head` | `12px / 600 / 1.5` | Sub-head inside expanded rationale / explainability panels. Used by AIRationalePanel. |
| `@brand-card-title` | `14px / 400 / 1.4` | Group-card heading text. Used by AIQueueCard, AIHandoffTimeline, AIRecommendationCompareCard. |
| `@brand-meta-label` | `11px / 400 / 1.5` | Inline meta labels — ETAs, timestamps, queue indices. Used by AIQueueCard, AIHandoffTimeline, AILearningFeedbackCard. |
| `@brand-insight-title` | `13px / 600 / 1.4` | Bold inline title for an analysis insight body. Used by AIAnalysisInsight. |

---

## TS Usage (inline styles)

```tsx
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { F, NEUTRAL } from '../../tokens/ai-tokens';

<span style={{
  fontFamily: F,
  color: NEUTRAL.textDefault,
  ...AI_TYPOGRAPHY['@brand-body-small'],
}}>Label</span>
```

Class names like `.ui-body`, `.ui-h1` remain standard CSS classes — they are not affected by `AI_TYPOGRAPHY`. This module is for TS components using inline styles.

---

## Flows

### Apply typography to a new AI surface

There is no JS API — page typography is CSS-only. Wire it up by including the stylesheets and scoping the root.

- Include `<link rel="stylesheet" href="dist/core/core.css">` and `<link rel="stylesheet" href="dist/configuration/themes/default/config.css">`
- Add `class="ui-master-style"` to `<body>` (or the configured `@brand-scope`)
- Write semantic HTML inside — `h1`–`h6`, `p`, `a`, `ul`/`ol`/`li` — they pick up standard defaults automatically
- Reach for `.ui-h1` / `.ui-body` / `.ui-overline` / etc. only when the element semantics differ from the visual style
- Color text via `@brand-*` / `--brand-*` tokens — never hardcode hex

### Compose an AI section title

Use the canonical header block — overline + heading + subtitle.

- Wrap in `<section class="ui-header-block">`
- Add `<p class="ui-overline">` for the uppercase eyebrow label
- Add the heading element (`h1` for page title, `h2` for section title)
- Add `<p class="ui-subtitle-1">` (paired with h1) or `.ui-subtitle-2` (paired with h2)

### Render an accessible link in AI output

Link states are CSS-only — do not hand-class hover/focus.

- Use `<a href="...">` with descriptive text — never "click here"
- Browser applies default / visited / hover / active states automatically
- For a disabled link, add `class="ui-disabled"` + `aria-disabled="true"`
- Status link styles: add `.ui-success-text`, `.ui-error-text`, `.ui-warning-text`, or `.ui-info-text` utility

---

## Code Example

```tsx
// Typography is global scoped CSS — apply .ui-master-style at page root, then
// use semantic HTML or utility classes inside. No factory, no JS API.

// Scoped page
<body className="ui-master-style">
  {/* ... */}
</body>

// Header block (H1 pattern)
<section className="ui-header-block">
  <p className="ui-overline">Section label</p>
  <h1>Page title</h1>
  <p className="ui-subtitle-1">Supporting subtitle</p>
</section>

// Body with emphasis
<p className="ui-body">Regular body copy.</p>
<p className="ui-body ui-font-weight-semi-bold">Semibold emphasis.</p>
<p className="ui-body-small">Secondary detail text.</p>

// Standard link
<a href="/learn-more">Learn more</a>

// Disabled link
<a href="#" className="ui-disabled" aria-disabled="true">Unavailable</a>
```

---

## Markdown in Assistant Output

When rendering model markdown inside bubbles:

- Headings: use semantic `<h2>`–`<h4>` with `@brand-h*` tokens — do not invent sizes.
- Lists: standard `<ul>` / `<ol>` with `ui-margin-1` spacing.
- Links: `@brand-link-text-color` or `NEUTRAL.textDefault`, underline on hover per global link rules.
- Code: JetBrains Mono per `foundation/typography.md` — only in `<code>` / pre blocks.

---

## Do's and Don'ts

- Do spread `AI_TYPOGRAPHY['@brand-*']` in TS components — never inline `fontSize` / `fontWeight`.
- Do use `@brand-body-small` or `@brand-bubble-body` for message text.
- Do use `@brand-caption-1` or `@brand-help-micro` for disclaimers and meta.
- Do apply `.ui-master-style` at the AI surface root before any typography renders.
- Don't use Hero/Super display styles inside chat bubbles.
- Don't duplicate typography values in component specs — reference the token name.
- Don't hardcode Open Sans or pixel font sizes anywhere in AI component code.

---

## Validation Checklist

- [ ] All token values come from `ai-tokens.ts` / `ai-typography.ts`. No hardcoded brand hex or font sizes.
- [ ] Page surfaces scoped with `.ui-master-style`.
- [ ] Semantic heading order maintained (`h1` → `h2` → …).
- [ ] Link text is descriptive — no "click here".
- [ ] TS components spread `AI_TYPOGRAPHY['@brand-*']` rather than per-component literals.
