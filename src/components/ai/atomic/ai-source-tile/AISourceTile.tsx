/**
 * AISourceTile — Guild Agentic AI Atom
 *
 * Compact list tile for surfacing a single knowledge input, data source,
 * citation, attached file, or capability dependency. Pairs a tinted icon
 * square with a bold title and an uppercase eyebrow caption.
 *
 * Tones (semantic, aligned with the DS Color atom):
 *   'ai'       — AI_RAMP (Indigo brand) ramp — default
 *   'warning'  — Dark Yellow ramp (--zs-border-warning-default #8A640C)
 *   'error'    — Red ramp (--zs-border-error-default #B21111)
 *   'success'  — Green ramp (--zs-border-success-default #0A6E5E)
 *   'neutral'  — Brand Gray ramp
 *
 * Non-`ai` tones paint their 0-step background at rest so the semantic
 * state is visible without any interaction.
 *
 * Variants
 *   chevron    — right-facing arrow affordance on hover. Auto-on with onClick.
 *   selectable — leading icon square becomes a checkbox tile
 *   rank       — small numeric badge in the trailing slot (1, 2, 99+)
 *
 * Icon rendering uses the canonical Guild `.zs-master-style` wrapper
 * cascade — the parent span carries `zs-master-style` and the child
 * carries `zs-icon zs-icon-{name}`. This is the same pattern AIButton
 * uses for string icons.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type AISourceTileTone = 'ai' | 'warning' | 'error' | 'success' | 'neutral';

export interface AISourceTileProps {
  title:        React.ReactNode;
  source?:      string;
  /** Second line under the title (mixed-case, body-compact). When both
      `subtitle` and `source` are set, `subtitle` wins and `source` is
      suppressed. */
  subtitle?:    React.ReactNode;
  iconName?:    string;
  tone?:        AISourceTileTone;
  trailing?:    React.ReactNode;
  /** Render a right-pointing chevron on the right side. Auto-on when onClick is set. */
  chevron?:     boolean;
  /** Small circular numeric badge in the trailing slot (1, 2, 3, 99+). When
      set, renders instead of the chevron. */
  rank?:        number | string;
  onClick?:     () => void;
  /** Turn the leading icon square into a checkbox tile. Selected rows carry
      a brand-tinted background + border. When both `selectable` and
      `iconName` are set, the checkbox wins. */
  selectable?:  boolean;
  selected?:    boolean;
  onSelect?:    (next: boolean) => void;
  ariaLabel?:   string;
  /** Internal — set by AISourceTileList when variant="grouped" so the tile
      suppresses its own border + radius and lets the group container own
      the chrome. Not part of the public API. */
  grouped?:     boolean;
}

interface ToneCfg {
  iconBg:       string;
  iconBorder:   string;
  iconColor:    string;
  hoverBorder:  string;
  hoverShadow:  string;
  cardBorder:   string;
  /** Card body background at rest — tinted with the tone's 00-step so the
      semantic state is visible without any interaction. `ai` keeps the
      neutral raised surface so it doesn't compete with brand-forward
      surfaces around it. */
  cardBg:       string;
}

// Tone palette aligned with the DS Color atom's canonical semantic tokens
// (see src/app/components/ai-library/standardEntries/phaseE.tsx :: COLOR_ENTRY
// and /src/imports/Guild.tokens.json). Warning uses Dark Yellow (--zs-border-
// warning-default #8a640c), NOT Orange — Orange is a brand accent, not a
// semantic warning. Error uses Red 60/80; Success uses Green 60/80; Neutral
// uses Brand Gray. AI stays on the AI_RAMP (Indigo brand family) ramp.
const TONE_CFG: Record<AISourceTileTone, ToneCfg> = {
  'ai': {
    iconBg:       AI.color.brandSubtle,
    iconBorder:   AI.color.brandBorder,
    iconColor:    AI.color.text.secondary,
    hoverBorder:  AI.color.brand,
    hoverShadow:  '0 6px 16px -8px rgba(77, 96, 230, 0.35)',
    cardBorder:   'var(--ai-card-border)',
    cardBg:       'var(--ai-card-bg-raised)',
  },
  // DS Semantic / Dark Yellow — the canonical warning ramp.
  'warning': {
    iconBg:       '#FFF4DB',    // Dark Yellow 10
    iconBorder:   '#FFDB93',    // Dark Yellow 30
    iconColor:    '#8A640C',    // Dark Yellow 80 (matches --zs-border-warning-default)
    hoverBorder:  '#E3A900',    // Dark Yellow 60
    hoverShadow:  '0 6px 16px -8px rgba(138, 100, 12, 0.32)',
    cardBorder:   '#FFDB93',    // Dark Yellow 30 for a visible tinted border
    cardBg:       '#FFF9F1',    // Dark Yellow 0 — background at rest
  },
  // DS Semantic / Red — the canonical error ramp.
  'error': {
    iconBg:       '#FFCDC2',    // Red 10
    iconBorder:   '#FA9980',    // Red 30
    iconColor:    '#B21111',    // Red 60 (matches --zs-border-error-default)
    hoverBorder:  '#892208',    // Red 80
    hoverShadow:  '0 6px 16px -8px rgba(178, 17, 17, 0.32)',
    cardBorder:   '#FFCDC2',    // Red 10
    cardBg:       '#FFEDE9',    // Red 0
  },
  // DS Semantic / Green — the canonical success ramp.
  'success': {
    iconBg:       '#D2FAF7',    // Green 10
    iconBorder:   '#82E6CF',    // Green 30
    iconColor:    '#0A6E5E',    // Green 80 (matches --zs-border-success-default)
    hoverBorder:  '#058F69',    // Green 70
    hoverShadow:  '0 6px 16px -8px rgba(10, 110, 94, 0.32)',
    cardBorder:   '#82E6CF',    // Green 30
    cardBg:       '#F1FEFF',    // Green 0
  },
  // DS Brand / Gray — the canonical neutral ramp.
  'neutral': {
    iconBg:       '#F4F3F3',    // Gray 10
    iconBorder:   '#DEDCDE',    // Gray 20
    iconColor:    '#716E79',    // Gray 60
    hoverBorder:  '#5B5864',    // Gray 70
    hoverShadow:  '0 6px 16px -8px rgba(91, 88, 100, 0.24)',
    cardBorder:   '#DEDCDE',    // Gray 20
    cardBg:       '#FAFAFA',    // Gray 0
  },
};

function Glyph({ name, size, color }: { name: string; size: number; color?: string }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
        color: color ?? 'inherit',
        flexShrink: 0, lineHeight: 0,
      }}
    >
      <i className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1, color: 'inherit' }} />
    </span>
  );
}

export function AISourceTile({
  title,
  source,
  subtitle,
  iconName  = 'zs-icon-layers',
  tone      = 'ai',
  trailing,
  chevron,
  rank,
  onClick,
  selectable = false,
  selected   = false,
  onSelect,
  ariaLabel,
  grouped   = false,
}: AISourceTileProps) {
  const cfg = TONE_CFG[tone];
  const selectClickable = selectable && !!onSelect;
  const activatable = selectClickable || !!onClick;
  const showChevron = !rank && (chevron ?? (!!onClick && !selectable));

  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const elevated = (hover || focus) && activatable;

  const handleActivate = () => {
    if (selectClickable) { onSelect!(!selected); return; }
    if (onClick) onClick();
  };

  // Selectable selected state: brand-tinted background + brand border.
  // Selectable hover (not selected): faint brandSurface tint so the row
  // reads as a target. Non-selectable behavior unchanged.
  const selectedBg     = 'var(--ai-brand-surface, ' + AI.color.brandSubtle + ')';
  const selectedBorder = AI.color.brand;
  const background =
    selectable && selected
      ? selectedBg
      : grouped
        // In a grouped list the outer container paints the surface; each
        // row stays transparent so tone tinting reads through consistently.
        ? (elevated ? 'var(--ai-card-bg)' : 'transparent')
        // Standalone tiles paint the tone's 00-step bg so the semantic
        // state (warning / error / success / neutral) is visible at rest.
        : (elevated ? 'var(--ai-card-bg)' : cfg.cardBg);
  const borderColor =
    selectable && selected ? selectedBorder :
    elevated ? cfg.hoverBorder : cfg.cardBorder;

  const role = selectClickable ? 'checkbox' : activatable ? 'button' : 'group';

  return (
    <div
      role={role}
      tabIndex={activatable ? 0 : undefined}
      aria-checked={selectClickable ? selected : undefined}
      onClick={activatable ? handleActivate : undefined}
      onKeyDown={activatable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); }
      } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      aria-label={ariaLabel ?? (typeof title === 'string' ? title : undefined)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px',
        background,
        // In a grouped list, the parent container owns the border + radius.
        // Never add a per-row border here — it would stack on top of the
        // wrapper's dividers/rounded corners and produce a double-line seam
        // + break the top/bottom rounded corners of the outer container.
        // Selected state is signaled by background + a brand-blue inset
        // left rail (boxShadow) that doesn't affect layout.
        border: grouped ? 'none' : `1px solid ${borderColor}`,
        borderRadius: grouped ? 0 : 10,
        cursor: activatable ? 'pointer' : 'default',
        fontFamily: F,
        outline: 'none',
        boxShadow:
          selectable && selected && grouped
            ? 'none'
            : selectable && selected
              ? '0 6px 16px -8px rgba(77, 96, 230, 0.25)'
              : grouped
                ? 'none'
                : (elevated ? cfg.hoverShadow : '0 1px 2px rgba(15, 22, 60, 0.03)'),
        transform: !grouped && elevated && !selectable ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.18s ease, transform 0.18s ease',
        minWidth: 0,
      }}
    >
      {/* Leading tile — checkbox variant OR tinted icon square */}
      {selectable ? (
        <span
          aria-hidden="true"
          style={{
            width: 24, height: 24, borderRadius: 6,
            background: selected ? AI.color.brand : '#FFFFFF',
            border: `1.5px solid ${selected ? AI.color.brand : AI.color.brandBorder}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
        >
          {selected && <Glyph name="zs-icon-check" size={14} color="#FFFFFF" />}
        </span>
      ) : (
        <span
          aria-hidden="true"
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: cfg.iconBg, border: `1px solid ${cfg.iconBorder}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Glyph name={iconName} size={14} color={cfg.iconColor} />
        </span>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: F,
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--ai-ds-text)',
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'left' as const,
        }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{
            ...AI_TYPOGRAPHY['@ai-caption-1'],
            color: 'var(--ai-ds-helper)',
            marginTop: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            textAlign: 'left' as const,
          }}>
            {subtitle}
          </div>
        ) : source ? (
          <div style={{
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: 'var(--ai-ds-helper)',
            letterSpacing: '0.06em',
            marginTop: 2,
            textTransform: 'uppercase' as const,
          }}>
            {source}
          </div>
        ) : null}
      </div>

      {trailing && (
        <div style={{ flexShrink: 0, fontFamily: F, fontSize: 12, color: 'var(--ai-ds-helper)' }}>
          {trailing}
        </div>
      )}

      {rank !== undefined && rank !== null && (
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 24, height: 24, padding: '0 6px',
            borderRadius: 999,
            background: selectable && selected ? AI.color.brand : 'var(--ai-card-bg)',
            border: `1px solid ${selectable && selected ? AI.color.brand : 'var(--ai-card-border)'}`,
            color: selectable && selected ? '#FFFFFF' : 'var(--ai-ds-helper)',
            fontFamily: F, fontSize: 12, fontWeight: 600,
          }}
        >
          {rank}
        </span>
      )}

      {showChevron && (
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20,
            color: elevated ? cfg.hoverBorder : 'var(--ai-ds-helper)',
            transform: elevated ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.18s ease, color 0.15s ease',
          }}
        >
          <Glyph name="zs-icon-arrow-right" size={14} color="currentColor" />
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AISourceTileList — layout wrapper
//
// Renders multiple AISourceTile children with two layout variants:
//   variant="stacked" — items separated by 8px gap (default list usage).
//   variant="grouped" — items share borders with zero gap; first/last items
//                       round outer corners. Inner items drop their top
//                       borders so the seam reads as a single divider.
// Pass children directly: <AISourceTileList variant="grouped">
//                          <AISourceTile … />
//                          <AISourceTile … />
//                        </AISourceTileList>
// ─────────────────────────────────────────────────────────────────────────────

export type AISourceTileListVariant = 'stacked' | 'grouped';

export interface AISourceTileListProps {
  variant?:    AISourceTileListVariant;
  children:    React.ReactNode;
  ariaLabel?: string;
}

export function AISourceTileList({
  variant   = 'stacked',
  children,
  ariaLabel,
}: AISourceTileListProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement);

  if (variant === 'stacked') {
    return (
      <div
        role="list"
        aria-label={ariaLabel}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {items.map((child, i) => (
          // Stable synthetic key — index-based so multiple children without
          // their own keys (or with colliding null keys after cloneElement)
          // never trigger React's duplicate-key warning.
          <React.Fragment key={`ai-src-tile-${i}`}>{child}</React.Fragment>
        ))}
      </div>
    );
  }

  // grouped — share borders, round outer corners only.
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      style={{
        display: 'flex', flexDirection: 'column', gap: 0,
        border: '1px solid var(--ai-card-border)',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'var(--ai-card-bg-raised)',
      }}
    >
      {items.map((child, i) => {
        const isFirst = i === 0;
        return (
          <div
            key={`ai-src-tile-item-${i}`}
            role="listitem"
            style={{
              borderTop: isFirst ? 'none' : '1px solid var(--ai-card-border)',
            }}
          >
            {React.cloneElement(child as React.ReactElement<AISourceTileProps>, {
              grouped: true,
            })}
          </div>
        );
      })}
    </div>
  );
}
