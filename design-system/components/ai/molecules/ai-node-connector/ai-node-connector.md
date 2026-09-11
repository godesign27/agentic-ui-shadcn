# AI Node Connector

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiNodeConnector`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The standard connector with the theme swapped — plus the four states an agent graph needs.

An AI Node Connector is the edge drawn between a parent node and a child node on an AI surface. It is a deliberate mirror of the DS Node Connector rather than a new design: the same single open path across four vertices, the same three segments, the same endpoint markers implemented as SVG <marker> stroke caps with orient="auto", the same badge seated on the bottom run over a knockout ellipse, and the same thirteen documented variants in the same order. What changes is the theme, and it changes narrowly. The DS accent — teal #2f6f7b, and its subtle fill #eaf4f6 — becomes AI brand; every neutral stays neutral, read through the DS namespace in ai-tokens.ts. The connector stroke in particular is untouched at #1a1628, so a plain edge in an AI tree is indistinguishable from a plain edge in a standard tree. The one geometric departure is corner language: 8px elbows against 4px, and ai.radius.md on the node card against 2px, because AI surfaces do not use 0-radius corners. On top of that mirror sit four additive capabilities, all default-off. `intent` names the state of the relationship rather than its tone — structural intents (default, suggested, muted) reuse the standard connector's own three line colors, and only the lifecycle intents (active, complete, attention) spend AI color, so color on an edge always means the edge is doing something an org chart could not say. `flow` marches a pathLength-normalised pulse along an active run, decorative and suppressed under prefers-reduced-motion. The badge slot gains confidence, a ring plus percentage on a light disc, and agent, the AI spark. And the node card gains an attention badge — a corner disc marking a node the model has surfaced — plus an optional confidence rule. Take all four away and the component renders the standard connector, re-accented.

**Export:** `node-connector`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/node-connector/` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-node-connector/ai-node-connector.md` | This mirror spec |
| `components/ai/molecules/ai-node-connector/ai-node-connector.agent.json` | Agent manifest |
| `components/ai/molecules/ai-node-connector/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI |
| AI behavior | Data visualization · Diagram |
| Accountability | Tree · Agent graph |

## When to use

- Agent graphs, plan trees, lineage views and AI-assisted org charts on an AI surface
- Anywhere a parent/child edge needs to carry lifecycle — proposed, running, done, blocked
- Trees on an AI surface that need to match the standard connector exactly — leave intent at its default

## When not to use

- Don't use it on a standard surface — use ds-node-connector, so the accent stays teal
- Don't use it as a plain divider or rule — it carries hierarchy meaning
- Don't expect it to lay itself out: width / height / indent come from the caller
- Don't spend a lifecycle intent on a structural edge — color on an edge should mean the edge is doing something
- Don't rely on flow to convey state; it is decorative and off under reduced motion

## Anatomy

1. **Connector path** _(Unique)_ — Single open path — 3 segments, 4 vertices. Stroke weight follows intent: 1.5px muted, 2px structural, 2.5px lifecycle.
2. **Elbows** _(Shared)_ — The two 90° turns, as quadratics. 8px radius (With) or a sharp corner (Without) — rounder than the standard 4px.
3. **Starting marker** _(Shared)_ — Filled dot at the parent end, or a hollow ring for an origin edge.
4. **Ending marker** _(Shared)_ — Open chevron or terminal dot at the child end, oriented along the segment.
5. **Badge** _(Shared)_ — 28×28 control on the bottom run over a knockout ellipse. Expand, collapse, agent or confidence. Becomes a real button when onBadgeClick is supplied.
6. **Focus ring** _(Behavior)_ — Halo drawn on the badge wrapper, so the UA outline can be suppressed and the two cannot double up.
7. **Flow pulse** _(AI)_ — A short dash marching parent → child on an active run. pathLength-normalised, decorative, off under reduced motion.
8. **Edge label** _(AI)_ — A pill on the bottom run naming the relationship — "Handoff", "Cites", "Derived from". Brand-tinted on lifecycle intents, plain white on structural ones.
9. **Attention badge** _(AI)_ — On the node card, not the connector: a corner disc marking a node the model has surfaced. Spark, review or new.

## State variations

- **Default** _(solid / 8px elbows)_ — The base run, then the same run with each endpoint marker added. Stroke is #1a1628 — the standard connector ink, unchanged.
- **Dashed** _(suggested)_ — Dash pattern running unbroken through both elbows, across marker combinations.
- **Radius** _(8px / 0px)_ — Rounded elbows compared against sharp mitered corners, solid and dashed. 8px rather than the standard 4px.
- **Endpoint markers** _(stroke caps)_ — None, arrow only, circle only, ring, and both — the standard four plus the AI ring cap.
- **With badge** _(full matrix)_ — Expand over collapse, across all four line/radius columns and all four endpoint rows, plus the single focused variant.
- **With badge (expand)** _(brand disc)_ — Expand control on the bottom run, across line and marker combinations.
- **With badge (collapse)** _(brand disc)_ — Collapse control on the bottom run, across the same combinations.
- **Focused** _(focus ring)_ — Focus halo around either badge, drawn on the wrapper so the UA outline can be suppressed.
- **Badge part** _(parts/Badge)_ — The badge on its own — the two standard variants, the muted tone, and the two AI additions.
- **Bracket styles** _(1px / 2px / dashed)_ — One trunk with a stub per child row, in the neutral, brand and muted tones, plus the tree-label pill.
- **Node card states** _(6 states)_ — The node card the connector wires together — base, active, selected, hover, defocused, disabled, plus reduced height and the four card type icons. One for one with the standard roster card.
- **Draggable** _(interactive)_ — Two draggable nodes with the connector re-derived from their positions.
- **With node actions** _(composition)_ — Roster cards carrying counts, wired with collapse badges — solid runs on the live branch, 1px dashed muted runs to the sibling rows.
- **Intent** _(AI · 6 intents)_ — The palette split in one view. Structural intents reuse the standard connector's three line colors; only the lifecycle intents carry AI color.
- **Flow** _(AI · motion)_ — A pathLength-normalised pulse marching parent → child on an active run. Decorative; off under prefers-reduced-motion.
- **Confidence** _(AI · badge)_ — The badge as a progress ring, so an edge can say how sure the model is without a separate chip.
- **Attention** _(AI · card)_ — The corner badge on the node card — spark, review, new — plus the optional confidence rule. Additive: the card underneath still reads its own six states.
- **Agent graph** _(AI · composition)_ — Everything the AI layer adds, composed — a completed handoff, a run in progress, a blocked branch, and an uncommitted proposal.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `intent` | `'default' \| 'suggested' \| 'active' \| 'complete' \| 'attention' \| 'muted'` | `'default'` | State of the relationship. Drives color, weight and the default line style. The first two and the last are structural and stay on the standard neutrals. |
| `line` | `'solid' \| 'dashed'` | `intent's default` | Overrides the intent default. Suggested edges are dashed unless set. |
| `radius` | `'with' \| 'without'` | `'with'` | 8px rounded elbows, or sharp mitered corners. |
| `startingPoint` | `'none' \| 'circle' \| 'ring'` | `'none'` | Marker at the parent end. `ring` is the hollow origin cap. |
| `endingPoint` | `'none' \| 'arrow' \| 'dot'` | `'none'` | Marker at the child end, oriented along the segment. |
| `badge` | `'none' \| 'expand' \| 'collapse' \| 'agent' \| 'confidence'` | `'none'` | Control seated on the bottom run. The last two are AI additions. |
| `confidence` | `number` | `0.8` | 0–1. Renders the ring on badge="confidence" and its percentage in the disc. |
| `flow` | `boolean` | `false` | Marches a pulse along the run. Decorative; suppressed under reduced motion. |
| `label` | `string` | `—` | Relationship pill on the bottom run. |
| `state` | `'default' \| 'focused'` | `'default'` | Adds the focus halo. No-op without a badge. |
| `weight` | `number` | `intent's default` | Overrides the intent stroke weight. |
| `width` | `number` | `73.5` | Overall width — grow to reach a deeper child column. |
| `height` | `number` | `115` | Overall height — grow to span more rows. |
| `indent` | `number` | `18.5` | x of the trunk, and the length of the top run. 0 collapses it to a two-segment elbow. |
| `onBadgeClick` | `() => void` | `—` | Supplying it makes the badge a real button with aria-expanded. |
| `badgeLabel` | `string` | `derived` | Accessible name for the badge control. |

## Tokens

### Line
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-background-extra-bold` | `#1a1628` | Connector stroke and both endpoint markers — kept, identical to the standard connector |
| `@ds-node-connector-dashed-border-color` | `#9c9aa1` | Suggested intent — kept |
| `--zs-border-neutral-subtle` | `#d5d3d8` | Muted intent, and the resting card border — kept |

### Lifecycle (AI only)
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brand` | `#4D60E6` | Active intent — the run in progress, stroked with ai.gradient.action |
| `ai.gradient.action.start` | `#657CEC` | Parent-end stop of the active gradient |
| `ai.color.status.success` | `#0A6E5E` | Complete intent — the handoff finished |
| `ai.color.signal.default` | `#A54F00` | Attention intent — blocked, or waiting on a person |

### Badge
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brand` | `#4D60E6` | Expand glyph disc — was --zs-icon-primary-default #2f6f7b |
| `--zs-icon-neutral-inverse` | `#ffffff` | Knockout ellipse and the glyph knocked out of a filled disc — kept |
| `--zs-icon-neutral-disabled` | `#c7c5cc` | Badge disc on a muted branch — kept |
| `ai.color.border.focus` | `#4D60E6` | Focus ring around the badge — was --zs-border-focus #027aff |

### Node card
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brand` | `#4D60E6` | Card title, counts, type icon, accent bar, action button — was the four #2f6f7b reads |
| `ai.color.brandSurface` | `#F5F6FF` | Selected card fill — was --zs-background-primary-subtle #eaf4f6 |
| `--zs-background-default` | `#ffffff` | Card surface at rest — kept |
| `--zs-text-default` | `#2f2c3c` | Card subtitle — kept |
| `--zs-text-helper` | `#5b5864` | Count icons and captions — kept |

### Geometry
| Token | Value | Usage |
| --- | --- | --- |
| `stroke-width` | `1.5 / 2 / 2.5px` | Muted / structural / lifecycle intents |
| `corner-radius` | `8px / 0px` | With radius (rounder than the standard 4px) / Without radius |
| `ai.radius.md` | `16px` | Node card corners — was 2px on the standard card |
| `ai.radius.full` | `100px` | Edge-label pill and the card confidence rule |
| `badge-size` | `28 × 28` | Badge frame — 4px larger than the standard badge, for the gradient fill and soft shadow |
| `card-width` | `242px` | Node card; 262px for the wider affiliations card |
| `card-accent-bar` | `3px` | Bottom border on active / selected / defocused cards — kept |
| `card-defocus-opacity` | `50%` | Defocused card — dimmed, not recolored — kept |
| `flow-duration` | `1.8s linear` | Flow pulse; suppressed under prefers-reduced-motion |

## Flows

### Wire a child row to its parent
Place a connector at the start of each child row.
- Render <AINodeConnector endingPoint="arrow" /> as the first element of the child row
- Set height to the vertical distance between the parent baseline and the child
- Set width and indent to match the indentation step of the tree
- Leave intent alone — a plain structural edge should look exactly like the standard one

### Expand / collapse a branch
Turn the badge into a control.
- Pass badge="expand" when the branch is closed, badge="collapse" when open
- Pass onBadgeClick to toggle — the badge becomes a button carrying aria-expanded
- Pass state="focused" to show the halo when the control holds keyboard focus

### Show an agent handoff in progress
Let the edge carry the lifecycle.
- Set intent="active" while the step is running, and flow to march the pulse
- Pass label to name the relationship — "Handoff", "Cites", "Derived from"
- Move to intent="complete" when the step finishes, or intent="attention" if it blocks
- Never rely on flow alone — intent is what carries the meaning

### Surface a node for review
Let the system raise its hand without recoloring the tree.
- Set attention="spark" on the AINodeCard the model wants looked at
- Use attention="review" when the node is blocked on a person
- Add confidence to show how sure the model is, as a rule under the counts
- Leave the card state prop alone — attention is additive, not a seventh state

## Canonical implementation

```tsx
import { AINodeConnector } from './components/ai/molecules/node-connector/AINodeConnector';

// Default — the standard connector, re-themed. Stroke is #1a1628.
<AINodeConnector />

// Dashed run with an arrow pointing at the child
<AINodeConnector line="dashed" endingPoint="arrow" />

// Interactive collapse control on the bottom run
<AINodeConnector
  badge={open ? 'collapse' : 'expand'}
  endingPoint="arrow"
  onBadgeClick={() => setOpen((o) => !o)}
  badgeLabel={open ? 'Collapse branch' : 'Expand branch'}
/>

// AI: a run in progress, with the pulse and a relationship label
<AINodeConnector intent="active" flow label="Handoff" endingPoint="arrow" />

// AI: how sure the model is about this edge
<AINodeConnector intent="attention" badge="confidence" confidence={0.41} />

// Driven by two node positions — indent 0 collapses the top run to an elbow
<span style={{ position: 'absolute', left: from.x, top: from.y }}>
  <AINodeConnector
    width={to.x - from.x}
    height={to.y - from.y}
    indent={0}
    endingPoint="arrow"
  />
</span>
```

## Agent rules

1. Read this mirror spec and `ai-node-connector.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-node-connector/ai-node-connector.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
