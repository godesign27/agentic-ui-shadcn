# Agentic Prompt — AI Skeleton

You are implementing the **AI Skeleton** (`ai-skeleton`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Skeleton (`ai-skeleton`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Four atoms → three patterns. Brand-blue fill, brand sweep, AI radius. Motion on by default.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-skeleton/ai-skeleton.agent.json`
4. `components/ai/atomic/ai-skeleton/ai-skeleton.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISkeleton` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `delta` (`boolean`) default ``true`` — AISkeletonMetricTile — trailing full-radius pill for the trend indicator.
- `sparkline` (`boolean`) default ``false`` — AISkeletonMetricTile — thin plotted strip beneath the value.
- `bordered` (`boolean`) default ``true`` — AISkeletonMetricTile — brandSurface plate and brandBorder. Off when the tile sits inside a card that already has one.
- `variant` (`'bar' \) default `'line' \` — 'donut'`
- `axis` (`boolean`) default ``true`` — AISkeletonChart — separator-coloured left and bottom rules. Off for a sparkline strip.
- `bars` (`number`) default ``8`` — AISkeletonChart — column count for the bar variant.
- `steps` (`number`) default ``4`` — AISkeletonTimeline — how many nodes to draw.
- `orientation` (`'vertical' \) default `'horizontal'`` — `'vertical'`
- `label` (`boolean`) default ``true`` — AISkeletonField / AISkeletonMetricTile — leading label bar.
- `helper` (`boolean`) default ``false`` — AISkeletonField — helper line under the control.
- `size` (`'normal' \) default `'small' \` — 'xsmall'`
- `count` (`number`) default ``4`` — AISkeletonChips — how many pills. Widths cycle a fixed uneven set.
- `shimmer` (`boolean`) default ``true`` — All exports. Brand sweep — ON by default, the inverse of DS Skeleton.
- `Block · width / height` (`number \) default `string`` — `'100%' / 16`
- `Block · radius` (`string`) default ``AI.radius.xs`` — Pass AI.radius.full for pill strips.
- `Block · delay` (`number`) default ``0`` — Offsets the sweep, in ms. Set via a custom property — inline styles cannot reach a ::after.
- `Profile · size` (`number`) default ``48`` — Frame size; the disc stays at 40/48 of it.
- `Controls · size` (`number`) default ``24`` — Square edge. The 8px gap holds regardless.
- `Header · width` (`number \) default `string`` — `120`
- `Body · stagger` (`boolean`) default ``true`` — Offsets the second line 200ms.
- `Card · variant` (`'profile-left' \) default `'profile-center' \` — 'title' \
- `Card · title` (`string`) default ``'Card Title'`` — Read by the "text" variant only.
- `Card · announce` (`boolean`) default ``true`` — Set false when an ancestor already carries the live region.
- `Table · rows` (`number`) default ``7`` — Skeleton data rows. Row height is fixed at 56px.
- `Table · columns` (`AISkeletonTableColumn[]`) default ``AI_SKELETON_TABLE_COLUMNS`` — { label?, width, icons? }.
- `Table · header` (`boolean`) default ``true`` — Render the real header row.
- `Table · cascade` (`boolean`) default ``true`` — 80ms per row.
- `Panel · items` (`number`) default ``10`` — 48px placeholder rows.
- `Panel · title` (`string`) default ``—`` — Optional real Menu Title row.
- `Panel · onClose` (`() => void`) default ``—`` — The close button is real UI, not a placeholder.
- `Panel · cascade` (`boolean`) default ``true`` — 60ms per row.
- `duration` (`number`) default ``1600`` — All exports. Sweep duration in ms, via --ai-skeleton-duration. The property inherits, so setting it on any ancestor rescales everything below.
- `Media · ratio` (`'16:9' \) default `'4:3' \` — '3:2' \
- `Media · glyph` (`'none' \) default `'play' \` — 'image'`
- `Paragraph · lines` (`number`) default ``3`` — Line count. The last is short.
- `Paragraph · lastLineWidth` (`number \) default `string`` — `'60%'`
- `Paragraph · stagger` (`number`) default ``120`` — Per-line sweep offset, ms.
- `List · rows` (`number`) default ``5`` — Row count; cascades 80ms each.
- `ListRow · avatarShape` (`'circle' \) default `'square'`` — `'circle'`
- `ListRow · trailing` (`boolean`) default ``false`` — Placeholder for a trailing action or timestamp.
- `Message · from` (`'assistant' \) default `'user'`` — `'assistant'`
- `Message · thinking` (`boolean`) default ``true`` — Three pulsing brand dots — still composing.
- `Grid · count / columns` (`number`) default ``6 / auto-fill`` — Leave columns unset to auto-fill against minItemWidth.
- `Grid · renderItem` (`(i: number) => ReactNode`) default ``AISkeletonCard`` — Any skeleton can be the repeated cell.
- `Overlay · busy` (`boolean`) default ``true`` — False removes the plate and restores pointer events.
- `Overlay · opacity` (`number`) default ``0.82`` — How much stale content shows through.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
