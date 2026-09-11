# AI Accordion

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules  
**Repo module:** `zdsAiAccordion`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

A reusable AI-styled accordion — rounded AI card surface, brand chevron, optional icon / subtitle / status chip — for progressively disclosing generated content.

AIAccordion is the standalone, reusable disclosure used across AI surfaces — a rounded AI card whose header collapses/expands a body panel. It shares the AI Card Brief's look (20px corners, `--ai-card-bg` surface, `--ai-card-border`, raised header when open, `#4D60E6` chevron) so a brief reads as "AI card + AI accordion," but the disclosure behavior lives here and is reusable anywhere.

**Export:** `AIAccordion`

Each item takes an optional leading icon/avatar slot, a title + optional subtitle, an optional trailing `AIChip` status, and a body slot. Pass `items` for a stacked set of independent disclosures, or a single `title` + `children`.

DO NOT confuse with the standard `zds-accordion` — that is the neutral ZDS accordion (square corners, teal caret). This is the AI-styled sibling.

## When to use

- Generated content should be progressively disclosed on an AI surface
- Several related sections need independent expand/collapse
- You want disclosure that visually matches the AI Card Brief
- A header needs an optional status chip, icon, or subtitle

## When not to use

- You need the neutral product accordion — use `zds-accordion`
- The content is a full task brief with actions — use `ai-card-brief`
- Only a list of findings — use `ai-insight-list`
- A single always-visible block — no disclosure needed

## Anatomy

1. **Container** _(Shared)_ — Rounded AI card — `--ai-card-bg` surface, `--ai-card-border`, `AI.radius.lg` (20px), clipped.
2. **Header** _(Unique)_ — Clickable row (`role="button"`, tabIndex 0). Raised bg + bottom border when open.
3. **Icon slot** _(Shared)_ — Optional leading icon / AIAvatar.
4. **Title** _(Unique)_ — Primary label in `@zsai-section-subtitle`, optional subtitle in `@zsai-agent-name`.
5. **Status chip** _(Shared)_ — Optional trailing `AIChip kind="brief"` when `status` is set.
6. **Chevron** _(Unique)_ — lucide `ChevronDown`, `AI.color.brand`, rotates -180deg when open.
7. **Body** _(Unique)_ — Disclosure panel (`@zsai-body`) revealed when expanded.

## State variations

- **Collapsed** _(default)_ — Header only; body hidden. Chevron points down.
- **Expanded** _(defaultExpanded)_ — Body revealed; raised header + brand chevron rotated.
- **With status** _(status)_ — Trailing AIChip in the header signals brief state.
- **Stacked** _(items={[…]})_ — Multiple independent disclosures, small gap between each.
- **Stacked · single-open** _(singleOpen)_ — Radio-style group — opening one item collapses the others.
- **Caret left** _(caret="left")_ — Chevron leads the header instead of trailing it.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `required*` | Header title (single-item mode). *Not needed when `items` is provided. |
| `subtitle` | `string` | `—` | Optional secondary line under the title. |
| `icon` | `ReactNode` | `—` | Optional leading icon / avatar slot. |
| `status` | `BriefChipStatus` | `—` | Renders a trailing `AIChip kind="brief"` when set. |
| `defaultExpanded` | `boolean` | `false` | Start expanded. |
| `children` | `ReactNode` | `required*` | Disclosure body (single-item mode). |
| `items` | `AIAccordionItemProps[]` | `—` | Stacked mode — one independent disclosure per item. |
| `caret` | `"left" \| "right"` | `"right"` | Chevron side. |
| `radius` | `keyof typeof AI.radius` | `"lg"` | Container corner radius token. |
| `singleOpen` | `boolean` | `false` | Stacked mode only — radio-style, one item open at a time. |

## Tokens

### Surface & border
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg` | `AI card surface` | Accordion container fill. |
| `--ai-card-bg-raised` | `Raised surface` | Header fill when expanded. |
| `--ai-card-border` | `AI card border` | Container + open-header divider. |

### Radius & accent
| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.lg` | `20px` | Container corner radius. |
| `AI.color.brand` | `#4D60E6` | Chevron color. |
| `AI.color.border.focus` | `#4D60E6` | Focus ring color. |

### Typography & text
| Token | Value | Usage |
| --- | --- | --- |
| `@zsai-section-subtitle` | `Title` | Header title. |
| `@zsai-agent-name` | `Subtitle` | Header subtitle. |
| `@zsai-body` | `Body` | Disclosure panel text. |
| `--ai-zds-text` | `Primary` | Title + body text. |
| `--ai-zds-helper` | `Helper` | Subtitle text. |

## Flows

### Progressive disclosure of a generated section
Collapse long generated content behind a header so the user reveals it on demand.
- Parent supplies a `title` (+ optional `subtitle` / `status`) and the body as `children`
- The accordion renders collapsed with a brand chevron pointing down
- User clicks (or Tab + Enter/Space) the header — chevron rotates and the body reveals
- For multiple sections, pass `items` so each disclosure toggles independently

## Agent rules

1. Read this mirror spec and `zds-ai-accordion.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/molecules/zds-ai-accordion/zds-ai-accordion.agent.json`.
