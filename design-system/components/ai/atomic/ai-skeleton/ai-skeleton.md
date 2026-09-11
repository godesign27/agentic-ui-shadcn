# AI Skeleton

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiSkeleton`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Four atoms → three patterns. Brand-blue fill, brand sweep, AI radius. Motion on by default.

AI Skeleton is the AI-library mirror of ZDS Skeleton. Every measurement is identical — 48/40 profile, 56×24 controls, 120×24 header, exactly two 16px body lines 16px apart, 280×160 card, 56px table rows, 400×900 panel — so a layout can move between the two libraries without reflowing. Three things change. Corners round: the standard's 0px is a standard-only rule, so blocks take AI.radius.xs, the card takes sm and the panel takes lg. Motion runs by default: the standard ships no keyframes because its Figma page has none, but an AI surface that is thinking should look like it, so `shimmer` defaults to true and the table and panel cascade their sweep down the rows. And the whole loader is brand blue: the standard's neutral #dedcde is replaced by AI.color.brandSubtle, with a translucent AI.color.brand band sweeping across it. The two are the same hue at different strengths, so it still reads as one flat colour under a moving highlight rather than two colours competing. Surfaces, rules, icons and the table checkbox follow the same ramp; only real text — column names, the panel title — stays legible AI.color.brandInk rather than washing out. The two content rules carry over unchanged — the table header is real text, and the panel header is real chrome whose close button stays live while the body loads.

**Export:** `AISkeleton`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/skeleton/AISkeleton.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-skeleton/ai-skeleton.md` | This mirror spec |
| `components/ai/atomic/ai-skeleton/ai-skeleton.agent.json` | Agent manifest |
| `components/ai/atomic/ai-skeleton/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted |
| AI behavior | Feedback · Loading |
| Accountability | Atoms + composed patterns |

## When to use

- Loading states for AI cards, tables, panels and result lists
- Any wait long enough that a spinner would read as a stall
- Agent-populated surfaces where the layout is known before the content
- An agent composing a reply — AISkeletonMessage, with the thinking tail
- Re-fetching data that is already on screen — AISkeletonOverlay, not a full teardown

## When not to use

- Don't attach click or focus handlers to skeleton blocks
- Don't skeletonize table column headers — the header is real text
- Don't mix a neutral grey placeholder into this loader — the fill is one brand ramp
- Don't announce every skeleton individually to screen readers
- Don't use Overlay for initial load — with nothing underneath it is just a blank plate
- Don't aria-hide the content under an Overlay; stale values are still true, just stale
- Don't use the sweep to imply progress — it carries no value

## Anatomy

1. **Block** _(Shared)_ — AISkeletonBlock — the one rectangle every shape is made of, filled AI.color.brandSubtle. AI.radius.xs by default; a ::after band carries the sweep.
2. **Sweep** _(Unique)_ — AI.color.brand at 30% travelling left→right at fixed width. Fixed width matters: a band that grew would read as a quantity.
3. **Profile** _(Shared)_ — 48×48 frame, 40×40 disc at AI.radius.full. The standard needs a circle vector here; rounded rects are legal in this library.
4. **Controls** _(Shared)_ — Two 24×24 squares 8px apart in a 56×24 frame. Always a pair.
5. **Header** _(Shared)_ — A single 24px-tall bar, 120px by default, fluid.
6. **Body** _(Shared)_ — Exactly two 16px lines 16px apart. The second is offset 200ms so the sweep reads as one pass over a paragraph.
7. **Card** _(Unique)_ — 280×160, AI.radius.sm, brand-tinted border and AI.shadow.card.default.
8. **Table** _(Unique)_ — Real header row over N 56px skeleton rows, cascading 80ms per row.
9. **Panel** _(Unique)_ — 400×900, AI.radius.lg, brandInk header with a live close button, rows cascading 60ms.
10. **Media** _(Unique)_ — AISkeletonMedia — holds its height from its width, so a card never reflows when the picture lands.
11. **Paragraph** _(Unique)_ — AISkeletonParagraph — n lines with a short last one. The ragged edge is what makes text read as text.
12. **List row** _(Unique)_ — Avatar · two lines · optional trailing block, cascading 80ms down the list.
13. **Message** _(Unique)_ — Agent composing a reply: avatar, ragged paragraph, three pulsing brand dots.
14. **Grid** _(Unique)_ — Repeats any skeleton across a responsive grid and owns the cascade.
15. **Overlay** _(Unique)_ — Refresh mode — a sweeping plate over live content, which keeps its layout and stays readable.
16. **Metric tile** _(Unique)_ — Label · large value · delta pill · optional sparkline. Covers the KPI family.
17. **Chart** _(Unique)_ — Bar, line or donut. Heights are a fixed decorative pattern, never a plausible reading.
18. **Timeline** _(Unique)_ — Vertical trace or horizontal stepper. Connectors are real geometry so the process shape lands first.
19. **Field** _(Unique)_ — Label · control at the real 50/44/38 height · optional helper. Forms do not resize when they go live.
20. **Chips** _(Unique)_ — Uneven full-radius pills. A row of identical pills would read as a control, not as content.
21. **Live region** _(Shared)_ — Composed roots carry aria-busy + aria-live="polite"; every placeholder shape below is aria-hidden.

## State variations

- **Atoms** _(profile · controls · header · body)_ — The four building blocks at their Figma sizes, rounded and sweeping.
- **Body block** _(body)_ — Two 16px lines, 16px apart, brand-blue. The second sweeps 200ms behind the first.
- **Profile** _(profile)_ — 48×48 frame, 40×40 disc at full radius.
- **Card variants** _(4 variants)_ — profile-left · profile-center · title · text. Brand surface, brand border, soft card shadow.
- **Table** _(table)_ — Header row is real content; the sweep cascades down the rows so the table fills top-to-bottom.
- **Panel** _(panel)_ — BrandInk header is real chrome — the close button stays live while the body loads.
- **Static** _(shimmer={false})_ — Motion off — a flat brand tint. This is what every user sees under prefers-reduced-motion.
- **Fluid width** _(width)_ — Body and header stretch to the parent. Default widths are starting values, not constraints.
- **Media** _(AI-only)_ — Aspect-ratio imagery — 16:9, 4:3, 3:2, 1:1, with an optional play or image glyph. Reserves height so nothing jumps.
- **Paragraph** _(AI-only)_ — Variable-length copy with a short last line. Body stays locked to two equal lines; this is for when the length is genuinely unknown.
- **List** _(AI-only)_ — Avatar · two lines · trailing affordance, cascading 80ms per row.
- **Message** _(AI-only)_ — An agent composing a reply — the most common wait in this library. Assistant sits left in a tinted bubble, user right and bare.
- **Grid** _(AI-only)_ — Repeats any skeleton across a responsive grid and owns the cascade, so callers never hand-compute delays.
- **Overlay** _(refresh)_ — Refresh, not initial load. Real content stays mounted and readable underneath; only pointer events are blocked.
- **Metric tile** _(coverage)_ — ai-metric-value · ai-metric-tile · ai-trend-indicator · ai-card-metric · ai-generated-dashboard. The value bar is taller and shorter than the label, because a number is the largest, briefest thing on a tile.
- **Chart** _(coverage)_ — ai-card-analysis · ai-analysis-insight · ai-generated-dashboard. Bar, line and donut. The bar heights are a fixed decorative pattern — a chart skeleton that looked like a plausible reading would be a claim about data nobody has yet.
- **Timeline** _(coverage)_ — ai-reasoning-trace · ai-handoff-timeline · ai-agent-task-tracker · zds-ai-stepper. The connectors are drawn for real: the shape of a process is known before its contents are.
- **Field** _(coverage)_ — ai-input-field · ai-picker · ai-date-picker · ai-time-picker · ai-search · forms inside ai-dialog. Keeps the real field height and AI.radius.md.
- **Chips** _(coverage)_ — ai-chip · ai-badge · ai-confidence-risk-badge · ai-source-tile · ai-file-attachment. Widths are uneven and fixed, so the row neither reshuffles nor reads as a toolbar.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `delta` | `boolean` | `true` | AISkeletonMetricTile — trailing full-radius pill for the trend indicator. |
| `sparkline` | `boolean` | `false` | AISkeletonMetricTile — thin plotted strip beneath the value. |
| `bordered` | `boolean` | `true` | AISkeletonMetricTile — brandSurface plate and brandBorder. Off when the tile sits inside a card that already has one. |
| `variant` | `'bar' \| 'line' \| 'donut'` | `'bar'` | AISkeletonChart — which chart shape to reserve. |
| `axis` | `boolean` | `true` | AISkeletonChart — separator-coloured left and bottom rules. Off for a sparkline strip. |
| `bars` | `number` | `8` | AISkeletonChart — column count for the bar variant. |
| `steps` | `number` | `4` | AISkeletonTimeline — how many nodes to draw. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | AISkeletonTimeline — vertical for a trace or handoff, horizontal for a stepper. |
| `label` | `boolean` | `true` | AISkeletonField / AISkeletonMetricTile — leading label bar. |
| `helper` | `boolean` | `false` | AISkeletonField — helper line under the control. |
| `size` | `'normal' \| 'small' \| 'xsmall'` | `'normal'` | AISkeletonField — 50 / 44 / 38px, matching the real AI field heights. |
| `count` | `number` | `4` | AISkeletonChips — how many pills. Widths cycle a fixed uneven set. |
| `shimmer` | `boolean` | `true` | All exports. Brand sweep — ON by default, the inverse of ZDS Skeleton. |
| `Block · width / height` | `number \| string` | `'100%' / 16` | The primitive rectangle. |
| `Block · radius` | `string` | `AI.radius.xs` | Pass AI.radius.full for pill strips. |
| `Block · delay` | `number` | `0` | Offsets the sweep, in ms. Set via a custom property — inline styles cannot reach a ::after. |
| `Profile · size` | `number` | `48` | Frame size; the disc stays at 40/48 of it. |
| `Controls · size` | `number` | `24` | Square edge. The 8px gap holds regardless. |
| `Header · width` | `number \| string` | `120` | Starting value; stretches to the parent. |
| `Body · stagger` | `boolean` | `true` | Offsets the second line 200ms. |
| `Card · variant` | `'profile-left' \| 'profile-center' \| 'title' \| 'text'` | `'profile-left'` | What sits above the body. |
| `Card · title` | `string` | `'Card Title'` | Read by the "text" variant only. |
| `Card · announce` | `boolean` | `true` | Set false when an ancestor already carries the live region. |
| `Table · rows` | `number` | `7` | Skeleton data rows. Row height is fixed at 56px. |
| `Table · columns` | `AISkeletonTableColumn[]` | `AI_SKELETON_TABLE_COLUMNS` | { label?, width, icons? }. |
| `Table · header` | `boolean` | `true` | Render the real header row. |
| `Table · cascade` | `boolean` | `true` | 80ms per row. |
| `Panel · items` | `number` | `10` | 48px placeholder rows. |
| `Panel · title` | `string` | `—` | Optional real Menu Title row. |
| `Panel · onClose` | `() => void` | `—` | The close button is real UI, not a placeholder. |
| `Panel · cascade` | `boolean` | `true` | 60ms per row. |
| `duration` | `number` | `1600` | All exports. Sweep duration in ms, via --ai-skeleton-duration. The property inherits, so setting it on any ancestor rescales everything below. |
| `Media · ratio` | `'16:9' \| '4:3' \| '3:2' \| '1:1'` | `'16:9'` | Reserves height from width — the reason imagery needs its own atom. |
| `Media · glyph` | `'none' \| 'play' \| 'image'` | `'none'` | Centered hint for video vs still. |
| `Paragraph · lines` | `number` | `3` | Line count. The last is short. |
| `Paragraph · lastLineWidth` | `number \| string` | `'60%'` | The ragged edge. |
| `Paragraph · stagger` | `number` | `120` | Per-line sweep offset, ms. |
| `List · rows` | `number` | `5` | Row count; cascades 80ms each. |
| `ListRow · avatarShape` | `'circle' \| 'square'` | `'circle'` | Circle reads as a person, square as a thumbnail. |
| `ListRow · trailing` | `boolean` | `false` | Placeholder for a trailing action or timestamp. |
| `Message · from` | `'assistant' \| 'user'` | `'assistant'` | Assistant sits left in a tinted bubble; user right and bare. |
| `Message · thinking` | `boolean` | `true` | Three pulsing brand dots — still composing. |
| `Grid · count / columns` | `number` | `6 / auto-fill` | Leave columns unset to auto-fill against minItemWidth. |
| `Grid · renderItem` | `(i: number) => ReactNode` | `AISkeletonCard` | Any skeleton can be the repeated cell. |
| `Overlay · busy` | `boolean` | `true` | False removes the plate and restores pointer events. |
| `Overlay · opacity` | `number` | `0.82` | How much stale content shows through. |

## Tokens

### Fill — all brand blue
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-ai-skeleton-default` | `AI.color.brandSubtle · #D2DBFF` | Every placeholder shape. Replaces the standard neutral #dedcde. |
| `--zs-ai-skeleton-surface` | `AI.color.brandSurface · #F5F6FF` | Card / table cell / panel surface |
| `--zs-ai-skeleton-separator` | `AI.color.brandBorder · #BECAFE` | Table header rule and row dividers |
| `--zs-ai-skeleton-text` | `AI.color.brandInk · #1F2A66` | Real text only — column names, card title, panel title |
| `--zs-ai-skeleton-text-helper` | `AI.color.brandStrong · #3544A4` | Secondary chrome |
| `--zs-ai-skeleton-icon` | `AI.color.brand · #4D60E6` | Header sort / filter / info glyphs |
| `--zs-text-inverse` | `#ffffff` | Panel close icon on brandInk |

### Brand chrome (the accent swap)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand @ 30%` | `rgba(77,96,230,0.30)` | Sweep highlight over the brandSubtle base |
| `AI.color.brandBorder` | `#BECAFE` | Card and table border |
| `AI.color.brand` | `#4D60E6` | Table header checkbox |
| `AI.color.brandInk` | `#1F2A66` | Panel header (was ZDS #1a1628) |
| `AI.shadow.card.default` | `0 1px 4px rgba(77,96,230,0.10)` | Card elevation |
| `AI.shadow.card.raised` | `0 4px 16px rgba(77,96,230,0.14)` | Panel elevation |

### Geometry — the one divergence
| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.xs` | `6px` | Every block. Standard is 0px. |
| `AI.radius.sm` | `12px` | Card and table shell |
| `AI.radius.lg` | `20px` | Panel shell |
| `AI.radius.full` | `100px` | Profile disc |
| `Body line` | `16px × 2` | 16px gap → 48px total (unchanged) |
| `Table row` | `56px` | Unchanged |
| `Panel` | `400×900px` | Unchanged |

### Motion
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-skeleton-duration` | `1600ms` | Sweep speed. Inherits — set it on any ancestor to rescale everything below. |
| `Sweep duration` | `1600ms ease-in-out infinite` | Fixed-width band, left→right |
| `Paragraph stagger` | `120ms / line` | Ragged copy fills top-to-bottom |
| `List cascade` | `80ms / row` | Matches the table |
| `Grid stagger` | `90ms / cell` | Owned by AISkeletonGrid |
| `Thinking dots` | `opacity pulse, 180ms apart` | Message only |
| `Body stagger` | `200ms` | Second line offset |
| `Table cascade` | `80ms / row` | Fills top-to-bottom |
| `Panel cascade` | `60ms / row` | Fills top-to-bottom |
| `Reduced motion` | `sweep hidden` | Override lives inside the injected sheet |

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `Card title` | `Open Sans Bold 14px` | "text" card variant only |
| `Table header` | `Open Sans SemiBold 16px` | Real column names |
| `Panel title` | `Open Sans Regular 14px` | Optional Menu Title row |

## Flows

### Replace loading content
Atomic swap.
- Wrap the region in aria-live="polite" aria-busy="true"
- Render a skeleton whose shape matches the final layout, not a generic block
- When data arrives: drop aria-busy and swap the subtree in one render
- Leave the sweep on — an AI surface that is working should look like it

### Skeleton an agent-populated table
Header first.
- Render the real header row immediately — the columns are known before the rows
- Let the cascade run top-to-bottom so the fill direction matches the read direction
- Keep row height at 56px so nothing jumps when real rows land
- Match the skeleton row count to the page size, not to the total

## Canonical implementation

```tsx
import {
  AISkeletonProfile, AISkeletonControls, AISkeletonHeader, AISkeletonBody,
  AISkeletonCard, AISkeletonTable, AISkeletonPanel,
} from '@/app/components/ai/atomic/skeleton/AISkeleton';

// Atoms — the sweep runs by default
<AISkeletonProfile />
<AISkeletonControls />
<AISkeletonHeader width="40%" />
<AISkeletonBody />                        {/* two lines, second offset 200ms */}

// Cards — four variants, AI.radius.sm shell
<AISkeletonCard variant="profile-left" />
<AISkeletonCard variant="text" title="Card Title" />

// Table — real header, sweep cascades 80ms per row
<AISkeletonTable rows={7} />
<AISkeletonTable rows={5} cascade={false} />

// Panel — brandInk header, close stays live
<AISkeletonPanel items={10} onClose={dismiss} />

// Loading region: swap the whole subtree when the data lands
<div aria-live="polite" aria-busy={loading}>
  {loading ? <AISkeletonCard variant="text" /> : <Card {...data} />}
</div>

// Motion off — matches the standard component apart from radius
<AISkeletonBody shimmer={false} />

// ── AI-only shapes ─────────────────────────────────────────────────────────
<AISkeletonMedia ratio="16:9" glyph="play" />        {/* reserves its own height */}
<AISkeletonParagraph lines={4} lastLineWidth="45%" /> {/* ragged last line */}
<AISkeletonList rows={5} trailing />
<AISkeletonMessage from="assistant" lines={3} />      {/* agent composing */}

// Grid owns the cascade — no hand-computed delays
<AISkeletonGrid count={8} minItemWidth={220} />
<AISkeletonGrid count={6} renderItem={() => <AISkeletonMedia ratio="1:1" />} />

// Refresh vs initial load: content stays mounted, readable and laid out
<AISkeletonOverlay busy={refetching}>
  <DataTable rows={staleRows} />
</AISkeletonOverlay>

// Speed. The property inherits, so this rescales every skeleton inside.
<div style={{ '--ai-skeleton-duration': '2400ms' } as React.CSSProperties}>
  <AISkeletonList rows={6} />
</div>
```

## Agent rules

1. Read this mirror spec and `ai-skeleton.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-skeleton/ai-skeleton.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
