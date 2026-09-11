import React from 'react';
import { AI, ZDS, ZSAI, F } from '../../tokens/ai-tokens';

/**
 * AI Node Connector
 * =================
 * The AI-surface counterpart to the ZDS Node Connector (src/nodeConnector/).
 * Same geometry contract — one open path, three segments, four vertices, with
 * endpoint markers as real stroke caps — restyled onto the ZAIDYN AI brand and
 * extended with the one thing an agent graph needs that an org chart does not:
 * **the edge carries state**.
 *
 *     (0,0) ──── (indent,0)               ← starting point
 *                    │
 *                    │  ● ● ●             ← flow pulse (active edges only)
 *                    │
 *                (indent,H) ──── (W,H)    ← ending point
 *                         [badge]
 *
 * What differs from the standard connector, and why:
 *
 *  - **Intent, not tone.** A tree branch is selected or it isn't. An agent edge
 *    is proposed, running, done, or blocked — so `intent` names the state of the
 *    relationship (`suggested` / `active` / `complete` / `attention` / `muted`).
 *    Suggested edges default to dashed because the AI has not committed to them
 *    yet.
 *
 *    The palette split is deliberate and is the whole theme in one rule:
 *    **structural intents stay neutral, lifecycle intents carry AI color.**
 *    `default` / `suggested` / `muted` reuse the standard connector's own three
 *    line colors, so a plain edge in an AI tree is pixel-identical to a plain
 *    edge in a ZDS tree. Color departs only when the edge is saying something
 *    the standard connector cannot express — `active`, `complete`, `attention`.
 *  - **Gradient ink.** Active edges stroke with ai.gradient.action rather than a
 *    flat color, so the run reads as brand-energised the way filled AI buttons
 *    do. Every other intent is flat — the gradient is the signal, so it is spent
 *    on exactly one state.
 *  - **Flow.** `flow` marches a short dash along the path from parent to child,
 *    normalised with `pathLength` so the pulse reads the same on a 40px hop and
 *    a 400px span. Purely decorative: it is behind `prefers-reduced-motion` and
 *    never the sole carrier of meaning — `intent="active"` is.
 *  - **Confidence.** The badge can render a progress ring, so a graph can show
 *    how sure the model is about an edge without a separate chip.
 *  - **Edge label.** A pill on the bottom run for the relationship itself —
 *    "Handoff", "Cites", "Derived from".
 *
 * Rounder than its ZDS sibling by design: 8px elbows against 4px, matching the
 * AI surface's ai.radius scale.
 *
 * The connector owns geometry only. Node cards, their layout, and reflow on
 * drag stay the caller's — see AINodeCard for the matching node surface.
 */

// ── Tokens ───────────────────────────────────────────────────────────────────
// `AI.*` for brand and lifecycle, `ZDS.*` for structure. The one Tier 1 read is
// the gradient start stop, which has no alias of its own — ai.gradient.action
// .start is a raw string, not a token the marker can interpolate against.
const GRADIENT_START = ZSAI[70]; // #657CEC — ai.gradient.action.start

export type AIConnectorIntent =
  | 'default'    // a plain structural edge
  | 'suggested'  // model-proposed, not yet accepted
  | 'active'     // work is moving across this edge right now
  | 'complete'   // the handoff finished
  | 'attention'  // blocked, low confidence, needs a human
  | 'muted';     // collapsed / out of focus

interface IntentSpec {
  ink: string;
  /** Stroke the run with ai.gradient.action instead of a flat color. */
  gradient?: boolean;
  /** Suggested edges are dashed unless the caller overrides `line`. */
  line: AIConnectorLine;
  weight: number;
  label: string;
}

const INTENT: Record<AIConnectorIntent, IntentSpec> = {
  // Structural — the standard connector's own three line colors, unchanged.
  default:   { ink: ZDS.inkBold,              line: 'solid',  weight: 2,   label: 'Linked' },      // --zs-background-extra-bold
  suggested: { ink: ZDS.lineDashed,           line: 'dashed', weight: 2,   label: 'Suggested' },   // @zs-node-connector-dashed-border-color
  muted:     { ink: ZDS.borderSubtle,         line: 'solid',  weight: 1.5, label: 'Collapsed' },   // --zs-border-neutral-subtle
  // Lifecycle — states the standard connector has no equivalent for.
  active:    { ink: AI.color.brand,           line: 'solid',  weight: 2.5, label: 'In progress', gradient: true },
  complete:  { ink: AI.color.status.success,  line: 'solid',  weight: 2,   label: 'Complete' },
  attention: { ink: AI.color.signal.default,  line: 'solid',  weight: 2.5, label: 'Needs review' },
};

/**
 * The three intents that are pure structure. Used to keep the edge-label pill
 * off the brand tint when the edge itself is neutral — a "Manages" label on a
 * plain branch should not look like a model annotation.
 */
const STRUCTURAL = new Set<AIConnectorIntent>(['default', 'suggested', 'muted']);
const pillBg = (intent: AIConnectorIntent) =>
  STRUCTURAL.has(intent) ? ZDS.surface : AI.color.brandSurface;

/** Rounder than ZDS (4px) — the AI surface's corner language. */
const CORNER_R = 8;

// Default geometry, in rendered orientation. Matches the ZDS sibling so the two
// are drop-in swappable inside the same layout math.
const W = 73.5;
const H = 115;
const INDENT = 18.5;

export type AIConnectorLine   = 'solid' | 'dashed';
export type AIConnectorRadius = 'with' | 'without';
export type AIConnectorStart  = 'none' | 'circle' | 'ring';
export type AIConnectorEnd    = 'none' | 'arrow' | 'dot';
export type AIConnectorBadge  = 'none' | 'expand' | 'collapse' | 'agent' | 'confidence';
export type AIConnectorState  = 'default' | 'focused';

export interface AINodeConnectorProps {
  /** State of the relationship. Drives color, weight and the default line style. */
  intent?:        AIConnectorIntent;
  /** Overrides the intent's default line style. */
  line?:          AIConnectorLine;
  /** 8px rounded elbows, or sharp 90° corners. */
  radius?:        AIConnectorRadius;
  /** Marker at the parent end. `ring` is the hollow "origin" cap. */
  startingPoint?: AIConnectorStart;
  /** Marker at the child end. */
  endingPoint?:   AIConnectorEnd;
  /** Control seated on the bottom run. */
  badge?:         AIConnectorBadge;
  /** 0–1. Renders the ring on `badge="confidence"`, and its % as the tooltip. */
  confidence?:    number;
  /** Marches a pulse along the run. Decorative; suppressed under reduced motion. */
  flow?:          boolean;
  /** Relationship pill on the bottom run — "Handoff", "Cites", "Derived from". */
  label?:         string;
  /** `focused` adds the focus halo around the badge. No-op without a badge. */
  state?:         AIConnectorState;
  /** Overrides the intent's stroke weight. */
  weight?:        number;
  width?:         number;
  height?:        number;
  /** x of the trunk, and the length of the top run. */
  indent?:        number;
  onBadgeClick?:  () => void;
  badgeLabel?:    string;
  className?:     string;
  style?:         React.CSSProperties;
}

/**
 * Three segments across four vertices, with the two elbows optionally rounded.
 * Quadratics rather than arcs: at a 90° turn the control point is the corner
 * itself, which is exactly the curve a Figma corner radius produces.
 */
function connectorPath(w: number, h: number, indent: number, r: number): string {
  if (r <= 0) return `M 0 0 L ${indent} 0 L ${indent} ${h} L ${w} ${h}`;

  // Never let the radius eat more than half of the run it sits on.
  const rTop = Math.min(r, indent, h / 2);
  const rBot = Math.min(r, w - indent, h / 2);

  return [
    'M 0 0',
    `L ${indent - rTop} 0`,
    `Q ${indent} 0 ${indent} ${rTop}`,        // turn down onto the trunk
    `L ${indent} ${h - rBot}`,
    `Q ${indent} ${h} ${indent + rBot} ${h}`, // turn right off the trunk
    `L ${w} ${h}`,
  ].join(' ');
}

// ── Badge ────────────────────────────────────────────────────────────────────
// 28×28 — four px larger than the ZDS badge, because the AI badge carries a
// gradient fill and a soft brand shadow and needs the room to not read cramped.
//
// Drawn as inline SVG, not an icon font: the ZSUI font only resolves inside a
// `.zs-master-style` context, so a glyph route renders blank in the library.

export interface AINodeConnectorBadgeProps {
  badge: Exclude<AIConnectorBadge, 'none'>;
  intent?: AIConnectorIntent;
  /** 0–1, used by `badge="confidence"`. */
  confidence?: number;
  size?: number;
  className?: string;
}

export function AINodeConnectorBadge({
  badge, intent = 'default', confidence = 0.8, size = 28, className,
}: AINodeConnectorBadgeProps) {
  const uid = React.useId().replace(/:/g, '');
  const gid = `ai-badge-grad-${uid}`;
  const spec = INTENT[intent];
  const R = 11;                        // disc radius in the 28-unit frame
  const C = 2 * Math.PI * R;           // circumference, for the confidence arc
  const pct = Math.max(0, Math.min(1, confidence));

  // Confidence is a ring around a light disc, so the arc is legible; every other
  // badge is a filled disc with a white glyph knocked out of it.
  const ring = badge === 'confidence';
  const fill = ring ? ZDS.surface : `url(#${gid})`;
  const glyph = ring ? spec.ink : ZDS.textInverse;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', filter: `drop-shadow(0 2px 6px ${AI.shadow.action.default})` }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={spec.gradient ? GRADIENT_START : spec.ink} />
          <stop offset="1" stopColor={spec.ink} />
        </linearGradient>
      </defs>

      {/* Knockout — hides the connector stroke running under the badge. */}
      <circle cx={14} cy={14} r={13} fill={ZDS.surface} />
      <circle cx={14} cy={14} r={R} fill={fill} />

      {ring && (
        <>
          <circle cx={14} cy={14} r={R} fill="none" stroke={ZDS.borderSubtle} strokeWidth={2.5} />
          <circle
            cx={14} cy={14} r={R} fill="none"
            stroke={spec.ink} strokeWidth={2.5} strokeLinecap="round"
            strokeDasharray={`${C * pct} ${C}`}
            transform="rotate(-90 14 14)"
          />
          <text
            x={14} y={14} textAnchor="middle" dominantBaseline="central"
            fontFamily={F} fontSize={9} fontWeight={700} fill={glyph}
          >
            {Math.round(pct * 100)}
          </text>
        </>
      )}

      {/* Expand / collapse — the sign knocked out of the disc. */}
      {(badge === 'expand' || badge === 'collapse') && (
        <>
          <rect x={8} y={13} width={12} height={2} rx={1} fill={glyph} />
          {badge === 'expand' && <rect x={13} y={8} width={2} height={12} rx={1} fill={glyph} />}
        </>
      )}

      {/* Agent — the AI spark. A four-point star plus a smaller companion, the
          same mark the AI icon layer uses for generated content. */}
      {badge === 'agent' && (
        <>
          <path
            d="M13.4 7.6 14.9 11.1 18.4 12.6 14.9 14.1 13.4 17.6 11.9 14.1 8.4 12.6 11.9 11.1 Z"
            fill={glyph}
          />
          <path d="M18 15.6 18.7 17.3 20.4 18 18.7 18.7 18 20.4 17.3 18.7 15.6 18 17.3 17.3 Z" fill={glyph} opacity={0.85} />
        </>
      )}
    </svg>
  );
}

// ── Connector ────────────────────────────────────────────────────────────────

export function AINodeConnector({
  intent        = 'default',
  line,
  radius        = 'with',
  startingPoint = 'none',
  endingPoint   = 'none',
  badge         = 'none',
  confidence    = 0.8,
  flow          = false,
  label,
  state         = 'default',
  weight,
  width         = W,
  height        = H,
  indent        = INDENT,
  onBadgeClick,
  badgeLabel,
  className,
  style,
}: AINodeConnectorProps) {
  // Ids must be unique per instance, or the first connector on the page wins and
  // every later one inherits its markers and gradient.
  const uid = React.useId().replace(/:/g, '');
  const capStart = `ai-conn-start-${uid}`;
  const capEnd   = `ai-conn-end-${uid}`;
  const gradId   = `ai-conn-grad-${uid}`;

  const spec = INTENT[intent];
  const w    = weight ?? spec.weight;
  const dash = (line ?? spec.line) === 'dashed';

  // Gradient runs along the diagonal of the box so it tracks the direction of
  // travel — lighter at the parent, full brand at the child.
  const ink = spec.gradient ? `url(#${gradId})` : spec.ink;
  // Markers can't reference a userSpaceOnUse gradient meaningfully at their own
  // scale, so caps take the solid end stop of the same ramp.
  const capInk = spec.ink;

  const d = connectorPath(width, height, indent, radius === 'with' ? CORNER_R : 0);

  // Markers and the badge overhang the path box, so the viewBox is padded.
  const PAD = 10;
  const focused = state === 'focused' && badge !== 'none';

  const badgeNode = badge !== 'none' && (
    <AINodeConnectorBadge badge={badge} intent={intent} confidence={confidence} />
  );

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', width, height, ...style }}
    >
      <svg
        width={width + PAD * 2}
        height={height + PAD * 2}
        viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
        fill="none"
        aria-hidden="true"
        style={{ position: 'absolute', left: -PAD, top: -PAD, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={GRADIENT_START} />
            <stop offset="1" stopColor={AI.color.brand} />
          </linearGradient>

          {/* Parent cap — filled dot, or a hollow ring for an "origin" edge. */}
          <marker
            id={capStart}
            markerUnits="userSpaceOnUse"
            markerWidth={w * 5}
            markerHeight={w * 5}
            refX={w * 2.5}
            refY={w * 2.5}
          >
            <circle
              cx={w * 2.5} cy={w * 2.5} r={w * 1.7}
              fill={startingPoint === 'ring' ? ZDS.surface : capInk}
              stroke={capInk}
              strokeWidth={startingPoint === 'ring' ? w : 0}
            />
          </marker>

          {/* Child cap — a soft chevron with round joins, or a terminal dot. */}
          <marker
            id={capEnd}
            markerUnits="userSpaceOnUse"
            markerWidth={w * 6}
            markerHeight={w * 6}
            refX={endingPoint === 'dot' ? w * 3 : w * 4.2}
            refY={w * 3}
            orient="auto"
          >
            {endingPoint === 'dot' ? (
              <circle cx={w * 3} cy={w * 3} r={w * 1.7} fill={capInk} />
            ) : (
              <path
                d={`M ${w * 1.4} ${w * 1.1} L ${w * 4.2} ${w * 3} L ${w * 1.4} ${w * 4.9}`}
                fill="none"
                stroke={capInk}
                strokeWidth={w}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </marker>
        </defs>

        <path
          d={d}
          fill="none"
          stroke={ink}
          strokeWidth={w}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash ? `${w * 2} ${w * 2.4}` : undefined}
          markerStart={startingPoint !== 'none' ? `url(#${capStart})` : undefined}
          markerEnd={endingPoint !== 'none' ? `url(#${capEnd})` : undefined}
        />

        {/* Flow pulse. pathLength normalises the run to 100 units, so an 8-unit
            dash reads as the same-sized packet whatever the span. */}
        {flow && (
          <path
            className="ai-conn-flow"
            d={d}
            pathLength={100}
            fill="none"
            stroke={ZDS.textInverse}
            strokeWidth={Math.max(1.5, w - 0.75)}
            strokeLinecap="round"
            strokeDasharray="7 100"
            opacity={0.9}
          />
        )}
      </svg>

      {flow && (
        <style>{`
          @keyframes ai-conn-flow-run { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -7; } }
          .ai-conn-flow { animation: ai-conn-flow-run 1.8s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .ai-conn-flow { animation: none; opacity: 0; } }
        `}</style>
      )}

      {label && (
        <span
          style={{
            position: 'absolute',
            left: indent + CORNER_R + 6,
            top: height,
            transform: 'translateY(-50%)',
            // The connector is usually drawn *before* the node cards it joins,
            // and both are positioned, so a card later in DOM order paints over
            // the pill. Lift the connector's own controls out of that race.
            zIndex: 1,
            padding: '2px 9px',
            borderRadius: AI.radius.full,
            border: `1px solid ${spec.ink}`,
            background: pillBg(intent),
            color: spec.ink,
            fontFamily: F,
            fontSize: 11,
            fontWeight: 600,
            lineHeight: '15px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}

      {badgeNode && (
        <span
          style={{
            position: 'absolute',
            // Seated on the bottom run, midway between the lower elbow and the
            // child end — the same anchor the ZDS sibling documents, so the two
            // line up when a graph mixes standard and AI edges.
            left: (indent + width) / 2,
            top: height,
            transform: 'translate(-50%, -50%)',
            display: 'inline-flex',
            borderRadius: '50%',
            zIndex: 1,
            ...(focused
              ? { boxShadow: `0 0 0 2px ${ZDS.surface}, 0 0 0 4px ${AI.color.border.focus}` }
              : null),
          }}
        >
          {onBadgeClick ? (
            <button
              type="button"
              onClick={onBadgeClick}
              aria-label={badgeLabel ?? (badge === 'expand' ? 'Expand branch' : badge === 'collapse' ? 'Collapse branch' : 'Edge details')}
              aria-expanded={badge === 'expand' ? false : badge === 'collapse' ? true : undefined}
              style={{
                display: 'inline-flex', padding: 0, border: 'none',
                background: 'transparent', borderRadius: '50%', cursor: 'pointer',
                // The halo is drawn on the wrapper so it tracks `state`;
                // suppress the UA ring so the two cannot double up.
                outline: 'none',
              }}
            >
              {badgeNode}
            </button>
          ) : (
            badgeNode
          )}
        </span>
      )}
    </span>
  );
}

// ── Bracket ──────────────────────────────────────────────────────────────────
// One trunk, a stub per child row. Same single-path discipline as the connector,
// so a dash pattern runs continuously down the branch rather than restarting at
// each child. Used when an agent fans out to several children at once.

export interface AINodeBracketProps {
  /** y of each child row, measured from the top of the bracket. */
  stops: number[];
  height?: number;
  stubWidth?: number;
  intent?: AIConnectorIntent;
  line?: AIConnectorLine;
  weight?: number;
  radius?: AIConnectorRadius;
  flow?: boolean;
  badge?: AIConnectorBadge;
  badgeAt?: number;
  label?: string;
  onBadgeClick?: () => void;
  badgeLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AINodeBracket({
  stops,
  height,
  stubWidth = 32,
  intent = 'default',
  line,
  weight,
  radius = 'with',
  flow = false,
  badge = 'none',
  badgeAt,
  label,
  onBadgeClick,
  badgeLabel,
  className,
  style,
}: AINodeBracketProps) {
  const uid = React.useId().replace(/:/g, '');
  const gradId = `ai-brk-grad-${uid}`;

  const spec = INTENT[intent];
  const w = weight ?? spec.weight;
  const dash = (line ?? spec.line) === 'dashed';

  const rows = [...stops].sort((a, b) => a - b);
  const h = height ?? (rows.length ? rows[rows.length - 1] : 0);
  const r = radius === 'with' ? Math.min(CORNER_R, stubWidth) : 0;
  const x = w / 2; // keep the trunk crisp on the pixel grid

  // Trunk, then one stub per row. The last stub turns out of the trunk with a
  // rounded elbow; intermediate stubs are plain tees.
  const last = rows.length ? rows[rows.length - 1] : null;
  const segments = [`M ${x} 0 L ${x} ${h}`];
  for (const y of rows) {
    if (y === last && r > 0 && Math.abs(y - h) < 0.5) {
      segments.push(`M ${x} ${y - r} Q ${x} ${y} ${x + r} ${y} L ${x + stubWidth} ${y}`);
    } else {
      segments.push(`M ${x} ${y} L ${x + stubWidth} ${y}`);
    }
  }
  const d = segments.join(' ');
  const ink = spec.gradient ? `url(#${gradId})` : spec.ink;
  const badgeY = badgeAt ?? (rows.length ? rows[0] : 0);

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', width: stubWidth + w, height: h, ...style }}
    >
      <svg
        width={stubWidth + w}
        height={h + w}
        viewBox={`0 0 ${stubWidth + w} ${h + w}`}
        fill="none"
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={GRADIENT_START} />
            <stop offset="1" stopColor={AI.color.brand} />
          </linearGradient>
        </defs>

        <path
          d={d}
          fill="none"
          stroke={ink}
          strokeWidth={w}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash ? `${w * 2} ${w * 2.4}` : undefined}
        />

        {flow && (
          <path
            className="ai-conn-flow"
            d={`M ${x} 0 L ${x} ${h}`}
            pathLength={100}
            fill="none"
            stroke={ZDS.textInverse}
            strokeWidth={Math.max(1.5, w - 0.75)}
            strokeLinecap="round"
            strokeDasharray="7 100"
            opacity={0.9}
          />
        )}
      </svg>

      {flow && (
        <style>{`
          @keyframes ai-conn-flow-run { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -7; } }
          .ai-conn-flow { animation: ai-conn-flow-run 1.8s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .ai-conn-flow { animation: none; opacity: 0; } }
        `}</style>
      )}

      {badge !== 'none' && (
        <span
          style={{
            position: 'absolute', left: x, top: badgeY,
            transform: 'translate(-50%, -50%)', display: 'inline-flex', borderRadius: '50%',
            zIndex: 1,
          }}
        >
          {onBadgeClick ? (
            <button
              type="button"
              onClick={onBadgeClick}
              aria-label={badgeLabel ?? (badge === 'expand' ? 'Expand branch' : 'Collapse branch')}
              style={{
                display: 'inline-flex', padding: 0, border: 'none',
                background: 'transparent', borderRadius: '50%', cursor: 'pointer',
              }}
            >
              <AINodeConnectorBadge badge={badge} intent={intent} />
            </button>
          ) : (
            <AINodeConnectorBadge badge={badge} intent={intent} />
          )}
        </span>
      )}

      {label && (
        <span
          style={{
            position: 'absolute',
            left: x + stubWidth,
            top: rows.length ? rows[0] : 0,
            transform: 'translate(-2px, -50%)',
            zIndex: 1,
            padding: '2px 10px',
            borderRadius: AI.radius.full,
            border: `1px solid ${spec.ink}`,
            background: pillBg(intent),
            color: spec.ink,
            fontFamily: F,
            fontSize: 11,
            fontWeight: 600,
            lineHeight: '15px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

export default AINodeConnector;
