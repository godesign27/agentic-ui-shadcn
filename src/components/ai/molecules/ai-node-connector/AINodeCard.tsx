import React from 'react';
import { AI, DS, F } from '../../tokens/ai-tokens';

/**
 * AI Node Card
 * ============
 * A 1:1 port of the roster TreeCard that the DS Node Connector wires together
 * (standardEntries/phaseNodeConnector.tsx). Same props, same six states, same
 * counts, same six type icons, same 242px width / 3px accent bar / 50% defocus.
 *
 * The AI treatment is **theme only**, and narrowly so: the DS *accent* — teal
 * #2f6f7b, and its subtle fill #eaf4f6 — becomes AI brand. Everything
 * structural stays on the DS neutrals, read through the `DS` namespace in
 * ai-tokens.ts. That is what makes this a theme rather than a redesign — the
 * two cards are interchangeable inside the same tree, and a reviewer can diff
 * them line for line.
 *
 * One geometric departure: AI surfaces are rounded, so the card takes
 * `AI.radius.md` where the DS card takes 2px.
 *
 * Two props are additive, both default-off, both AI-only:
 *
 *   - `attention` — a badge pinned to the card corner marking a node the model
 *     has surfaced. This is the one thing an AI tree needs that a roster tree
 *     does not: somewhere for the system to raise its hand.
 *   - `confidence` — a thin rule under the counts.
 *
 * With both omitted the card renders the standard card, re-accented.
 */

// ── Palette — the DS reads, one for one ─────────────────────────────────────
// Only the two teal reads move. Everything else is neutral and stays neutral.
const BRAND    = AI.color.brand;         // was --zs-text-primary / --zs-border-primary (#2f6f7b)
const SEL_BG   = AI.color.brandSurface;  // was --zs-background-primary-subtle (#eaf4f6)
const SURFACE  = DS.surface;            // --zs-background-default
const BORDER   = DS.borderSubtle;       // --zs-border-neutral-subtle
const TEXT     = DS.textDefault;        // --zs-text-default
const HELPER   = DS.textHelper;         // --zs-text-helper
const DISABLED = DS.iconDisabled;       // --zs-icon-neutral-disabled
const ON_DARK  = DS.textInverse;        // --zs-text-inverse

export type AINodeCardState = 'base' | 'active' | 'selected' | 'hover' | 'defocused' | 'disabled';
export type AINodeAttention = 'none' | 'spark' | 'review' | 'new';

// Card type icons — the same six from the "Roster : New Icongraphy" sheet.
const svg = (d: React.ReactNode) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const ICONS = {
  localTeam:  svg(<><path d="M3 11 9 6l6 5" /><rect x="5" y="11" width="8" height="8" /><rect x="15" y="9" width="6" height="10" /><path d="M17 12h2M17 15h2" /></>),
  fieldUnit:  svg(<><rect x="5" y="4" width="14" height="16" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" /></>),
  homeOffice: svg(<><rect x="4" y="7" width="16" height="13" /><path d="M8 11h2M14 11h2M8 15h2M14 15h2M4 7l8-3 8 3" /></>),
  userRole:   svg(<><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="12" cy="10" r="2.4" /><path d="M8 17a4 4 0 0 1 8 0" /></>),
  diagram:    svg(<><rect x="3" y="3" width="7" height="6" /><rect x="14" y="15" width="7" height="6" /><path d="M6.5 9v8h7.5M6.5 13h4" /></>),
  people:     svg(<><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>),
} as const;

const CountPair = ({ icon, value }: { icon: React.ReactNode; value: number | string }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: HELPER }}>
    <span style={{ display: 'inline-flex', width: 15, height: 15 }}>{icon}</span>
    <strong style={{ color: TEXT, fontSize: 13 }}>{value}</strong>
  </span>
);

// ── Attention badge (AI-only) ────────────────────────────────────────────────
// Pinned to the top-right corner, half off the card, so it reads as the system
// tagging the node rather than as card content. Gradient disc for a model
// action, signal fill when the node is waiting on a person.

const ATTENTION: Record<Exclude<AINodeAttention, 'none'>, { fill: string; title: string }> = {
  spark:  { fill: AI.gradient.action.full,  title: 'Surfaced by the assistant' },
  review: { fill: AI.color.signal.default,  title: 'Needs review' },
  new:    { fill: AI.color.status.success,  title: 'New since your last visit' },
};

function AttentionBadge({ kind }: { kind: Exclude<AINodeAttention, 'none'> }) {
  const { fill, title } = ATTENTION[kind];
  return (
    <span
      title={title}
      style={{
        position: 'absolute', top: -9, right: -9,
        width: 22, height: 22, borderRadius: '50%',
        background: fill,
        border: `2px solid ${SURFACE}`,
        boxShadow: `0 2px 6px ${AI.shadow.action.default}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 18 18" fill={ON_DARK} aria-hidden="true">
        {kind === 'spark'  && <path d="M9 2.6 10.6 7.4 15.4 9 10.6 10.6 9 15.4 7.4 10.6 2.6 9 7.4 7.4 Z" />}
        {kind === 'review' && <path d="M8 3.4h2v7.2H8V3.4Zm0 8.8h2v2.4H8v-2.4Z" />}
        {kind === 'new'    && <path d="M3.6 9.4 7.2 13 14.4 5.6l-1.4-1.4-5.8 5.8-2.2-2.2Z" />}
      </svg>
    </span>
  );
}

export interface AINodeCardProps {
  title: string;
  subtitle?: string;
  /** The unsaved / changed dot beside the title. */
  dot?: boolean;
  type?: keyof typeof ICONS;
  teams?: number;
  people?: number;
  /** Right-aligned single count — the "Reduced Height" card. */
  trailingCount?: number;
  state?: AINodeCardState;
  action?: string;
  width?: number;
  /** Hover is a real interaction here rather than a pinned state. */
  interactive?: boolean;
  /** AI-only. Corner badge marking a node the model has surfaced. */
  attention?: AINodeAttention;
  /** AI-only. 0–1; renders a thin rule under the counts. */
  confidence?: number;
  style?: React.CSSProperties;
}

export function AINodeCard({
  title, subtitle, dot, type = 'localTeam', teams, people, trailingCount,
  state = 'base', action, width = 242, interactive,
  attention = 'none', confidence,
  style, ...rest
}: AINodeCardProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'style'>) {
  const [hovering, setHovering] = React.useState(false);
  const hovered = state === 'hover' || (interactive && hovering && state !== 'disabled');
  const disabled = state === 'disabled';
  const selected = state === 'selected';
  const barred = selected || state === 'active' || state === 'defocused';

  return (
    <div
      {...rest}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        width,
        boxSizing: 'border-box',
        fontFamily: F,
        position: 'relative',
        background: selected ? SEL_BG : SURFACE,
        // Longhand per side: mixing `border` with `borderBottom` makes React
        // warn, because the shorthand can clobber the specific side on rerender.
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: barred ? 3 : 1,
        borderTopColor: hovered ? BRAND : BORDER,
        borderRightColor: hovered ? BRAND : BORDER,
        borderLeftColor: hovered ? BRAND : BORDER,
        borderBottomColor: barred || hovered ? BRAND : BORDER,
        // The one geometric departure from the DS card (2px) — AI surfaces are
        // rounded. Everything else about the box is 1:1.
        borderRadius: AI.radius.md,
        boxShadow: hovered ? AI.shadow.card.raised : AI.shadow.card.default,
        transition: 'box-shadow .15s ease, border-color .15s ease',
        opacity: state === 'defocused' ? 0.5 : 1,
        padding: '10px 14px',
        display: 'flex',
        gap: 10,
        alignItems: trailingCount !== undefined ? 'center' : 'flex-start',
        cursor: disabled ? 'not-allowed' : interactive ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: disabled ? DISABLED : BRAND, fontWeight: 700, fontSize: 14 }}>{title}</span>
          {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: disabled ? DISABLED : BRAND }} />}
        </div>
        {subtitle && (
          <div style={{ color: disabled ? DISABLED : TEXT, fontSize: 13, marginTop: 1 }}>{subtitle}</div>
        )}
        {(teams !== undefined || people !== undefined) && (
          <div style={{ display: 'flex', gap: 16, marginTop: 7, opacity: disabled ? 0.45 : 1 }}>
            {teams !== undefined && <CountPair icon={ICONS.diagram} value={teams} />}
            {people !== undefined && <CountPair icon={ICONS.people} value={people} />}
          </div>
        )}
        {confidence !== undefined && (
          <div style={{ marginTop: 8 }} title={`Confidence ${Math.round(confidence * 100)}%`}>
            <div style={{ height: 3, background: BORDER, borderRadius: AI.radius.full, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.max(0, Math.min(1, confidence)) * 100}%`,
                  height: '100%',
                  borderRadius: AI.radius.full,
                  background: AI.gradient.action.full,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {trailingCount !== undefined && (
        <strong style={{ color: BRAND, fontSize: 13 }}>{trailingCount}</strong>
      )}

      {action ? (
        <button
          type="button"
          disabled={disabled}
          style={{
            border: 'none', background: disabled ? DISABLED : BRAND, color: ON_DARK, fontFamily: F,
            fontSize: 13, padding: '6px 14px', borderRadius: AI.radius.md,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {action}
        </button>
      ) : (
        trailingCount === undefined && (
          <span style={{ color: disabled ? DISABLED : BRAND, display: 'inline-flex' }}>{ICONS[type]}</span>
        )
      )}

      {attention !== 'none' && !disabled && <AttentionBadge kind={attention} />}
    </div>
  );
}

export default AINodeCard;
