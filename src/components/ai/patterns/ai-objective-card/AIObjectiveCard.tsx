/**
 * AIObjectiveCard — Guild Agentic AI Group
 *
 * Compact reusable card that surfaces a goal, constraint, operating mode,
 * autonomy boundary, review requirement, optimization target, risk guardrail,
 * knowledge input, or assumption that governs how an agent should behave.
 *
 * Layout:
 *   - Top row:    leading icon (no tile) · type chip (right)
 *   - Title:      bold, left-aligned, full width
 *   - Body:       bulleted list — round dots tinted to the type
 *   - Footer:     "View details ›" link — opens the detail drawer by default
 *
 * The card mirrors AICapabilityCard:
 *   - Click anywhere on the card (or the View details link) opens a drawer.
 *   - Pass `onViewFullPage` to render a "View Full Details" deep-link CTA in
 *     the drawer footer.
 *   - Pass `onInspect` to override the default drawer behavior entirely.
 *
 * Brand discipline:
 *   - AI emphasis uses AI_RAMP brand blue / purple — no teal.
 *   - Guild orange is reserved for risk-guardrail / autonomy-boundary types.
 *   - Color always pairs with text so meaning isn't color-dependent.
 */

import React from 'react';
import { AI, SIGNAL_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIReasoningQuote } from '../../atomic/ai-reasoning-quote/AIReasoningQuote';
import { AIMetricTile } from '../../atomic/ai-metric-tile/AIMetricTile';
import { AISourceTile } from '../../atomic/ai-source-tile/AISourceTile';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AIIcon } from '../../atomic/ai-icon/AIIcon';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AIObjectiveType =
  | 'primary-goal'
  | 'constraint'
  | 'operating-mode'
  | 'autonomy-boundary'
  | 'review-requirement'
  | 'optimization-target'
  | 'risk-guardrail'
  | 'knowledge-input'
  | 'assumption';

export interface AIObjectiveItem {
  text: React.ReactNode;
}

export interface AIObjectiveTarget {
  label:  string;
  value:  string;
  suffix?: string;
}

export interface AIObjectiveSource {
  label:  string;
  source?: string;
  icon?:   string;
}

export interface AIObjectiveDetail {
  /** Italic rationale shown in the RATIONALE section. */
  rationale?:        string;
  /** Measurable targets shown as two-up metric tiles. */
  targets?:          AIObjectiveTarget[];
  /** Related items shown as a bulleted list with tinted dots. */
  related?:          { label: string; scope: string; tone?: 'silent' | 'confirm' }[];
  /** Source / configuration inputs shown as tinted tiles. */
  sources?:          AIObjectiveSource[];
}

export interface AIObjectiveCardProps {
  type?:           AIObjectiveType;
  title?:          string;
  items?:          AIObjectiveItem[];
  iconName?:       string;
  typeLabel?:      string;
  actionLabel?:    string;
  /** Override default drawer behavior. */
  onInspect?:      () => void;
  /** When set, the drawer footer renders a "View Full Details" CTA. */
  onViewFullPage?: () => void;
  detail?:         AIObjectiveDetail;
  /** Controlled drawer open state. */
  open?:           boolean;
  onClose?:        () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// RiFontSize2 → tokens
// ─────────────────────────────────────────────────────────────────────────────

interface TypeCfg {
  label:      string;
  icon:       string;
  tintBg:     string;
  tintBorder: string;
  tintText:   string;
  dot:        string;
  warning?:   boolean;
}

const TYPE_CFG: Record<AIObjectiveType, TypeCfg> = {
  'primary-goal':        { label: 'PRIMARY GOAL',        icon: 'zs-icon-goal',         tintBg: AI.color.brandSubtle,     tintBorder: AI.color.brandBorder,     tintText: AI.color.text.primary, dot: AI.color.brand  },
  'constraint':          { label: 'CONSTRAINT',          icon: 'zs-icon-lock',         tintBg: 'var(--ai-card-bg-raised)', tintBorder: 'var(--ai-card-border)', tintText: 'var(--ai-ds-text)', dot: AI.color.brand },
  'operating-mode':      { label: 'OPERATING MODE',      icon: 'zs-icon-settings',     tintBg: AI.color.brandSubtle,     tintBorder: AI.color.brandBorder,     tintText: AI.color.text.secondary, dot: AI.color.brand  },
  'autonomy-boundary':   { label: 'AUTONOMY BOUNDARY',   icon: 'zs-icon-stop-circle',  tintBg: SIGNAL_ORANGE[10],            tintBorder: SIGNAL_ORANGE[30],            tintText: SIGNAL_ORANGE[80], dot: SIGNAL_ORANGE[60], warning: true },
  'review-requirement':  { label: 'REVIEW REQUIREMENT',  icon: 'zs-icon-check-circle', tintBg: AI.color.brandSubtle,     tintBorder: AI.color.brandBorder,     tintText: AI.color.text.primary, dot: AI.color.brand  },
  'optimization-target': { label: 'OPTIMIZATION TARGET', icon: 'zs-icon-data-arrow-up', tintBg: AI.color.brandSubtle,    tintBorder: AI.color.brandBorder,     tintText: AI.color.text.secondary, dot: AI.color.brand  },
  'risk-guardrail':      { label: 'RISK GUARDRAIL',      icon: 'zs-icon-error-triangle',        tintBg: SIGNAL_ORANGE[10],            tintBorder: SIGNAL_ORANGE[30],            tintText: SIGNAL_ORANGE[80], dot: SIGNAL_ORANGE[60], warning: true },
  'knowledge-input':     { label: 'KNOWLEDGE INPUT',     icon: 'zs-icon-bookmark',     tintBg: AI.color.brandSubtle,     tintBorder: AI.color.brandBorder,     tintText: AI.color.text.secondary, dot: AI.color.brand  },
  'assumption':          { label: 'ASSUMPTION',          icon: 'zs-icon-help',         tintBg: 'rgba(178,170,255,0.18)', tintBorder: 'rgba(178,170,255,0.40)', tintText: AI.color.text.primary, dot: AI.color.brand  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function Glyph({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
        color: color ?? 'inherit',
        flexShrink: 0,
      }}
    >
      <span className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1 }} />
    </span>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Card (root)
// ─────────────────────────────────────────────────────────────────────────────


/** Demo objective card props for bare mounts / galleries. */
export const SAMPLE_OBJECTIVE_TYPE: AIObjectiveType = 'primary-goal';
export const SAMPLE_OBJECTIVE_TITLE = 'Recover Mid-Atlantic reach by Q3';
export const SAMPLE_OBJECTIVE_ITEMS: AIObjectiveItem[] = [
  { text: 'Rebalance PA-07 and NJ-03 coverage' },
  { text: 'Confirm FTE shift with field leads' },
  { text: 'Publish updated targeting brief' },
];

export function AIObjectiveCard(props: AIObjectiveCardProps) {
  const {
    type      = SAMPLE_OBJECTIVE_TYPE,
    title     = SAMPLE_OBJECTIVE_TITLE,
    items     = SAMPLE_OBJECTIVE_ITEMS,
    iconName,
    typeLabel,
    actionLabel = 'View details',
    onInspect,
    onViewFullPage,
    detail,
    open,
    onClose,
  } = props;

  const baseCfg = TYPE_CFG[type];
  const cfg: TypeCfg = {
    ...baseCfg,
    icon:  iconName  ?? baseCfg.icon,
    label: typeLabel ?? baseCfg.label,
  };

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const closeDrawer = React.useCallback(() => {
    setInternalOpen(false);
    onClose?.();
  }, [onClose]);

  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const elevated = hover || focus;

  const handleActivate = React.useCallback(() => {
    if (onInspect) { onInspect(); return; }
    setInternalOpen(true);
  }, [onInspect]);

  const accentColor = cfg.warning ? SIGNAL_ORANGE[80] : AI.color.text.secondary;
  const accentHover = cfg.warning ? SIGNAL_ORANGE[60] : AI.color.brand;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${cfg.label.toLowerCase()}: ${title}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onClick={handleActivate}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); } }}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          padding: '18px 20px 16px',
          background: 'var(--ai-card-bg)',
          border: `1px solid ${
            elevated ? accentHover :
            cfg.warning ? SIGNAL_ORANGE[30] :
            'var(--ai-card-border)'
          }`,
          borderRadius: AI.radius.md,
          boxShadow: elevated
            ? `0 8px 24px -10px ${cfg.warning ? 'rgba(255, 138, 50, 0.30)' : 'rgba(77, 96, 230, 0.30)'}, 0 2px 4px rgba(15, 22, 60, 0.05)`
            : '0 1px 2px rgba(15, 22, 60, 0.04)',
          transform: elevated ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: F,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}
      >
        {/* Title row — small inline icon (no tile) + bold left-aligned title.
            The type chip was dropped: title copy already names the type
            (Primary Goal · Constraints · Risk Guardrail), and the title now
            carries the type tint so category is signaled by color. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Glyph name={cfg.icon} size={18} color={accentColor} />
          <div style={{
            flex: 1, minWidth: 0,
            fontFamily: F,
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.3,
            color: cfg.tintText,
            letterSpacing: '-0.005em',
            textAlign: 'left' as const,
          }}>
            {title}
          </div>
        </div>

        {/* Bulleted items — round dots tinted to the type */}
        {items.length > 0 && (
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {items.map((it, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span aria-hidden="true" style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: cfg.dot,
                  flexShrink: 0,
                  marginTop: 8,
                }} />
                <span style={{
                  flex: 1, minWidth: 0,
                  ...AI_TYPOGRAPHY['@ai-body-small'],
                  color: 'var(--ai-ds-text)',
                  lineHeight: 1.5,
                  textAlign: 'left' as const,
                }}>
                  {it.text}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* Detail drawer */}
      {isOpen && (
        <AIObjectiveCardDrawer
          cfg={cfg}
          title={title}
          items={items}
          detail={detail}
          onClose={closeDrawer}
          onViewFullPage={onViewFullPage}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer
// ─────────────────────────────────────────────────────────────────────────────

interface DrawerProps {
  cfg:             TypeCfg;
  title:           string;
  items:           AIObjectiveItem[];
  detail?:         AIObjectiveDetail;
  onClose:         () => void;
  onViewFullPage?: () => void;
}

function AIObjectiveCardDrawer({
  cfg, title, items, detail, onClose, onViewFullPage,
}: DrawerProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const accentColor = cfg.warning ? SIGNAL_ORANGE[80] : AI.color.text.secondary;

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="ai-obj-anim"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15, 22, 60, 0.45)',
        display: 'flex', justifyContent: 'flex-end',
        animation: 'aiObjDrawerBackdropIn 180ms ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — objective details`}
        onClick={(e) => e.stopPropagation()}
        className="ai-obj-anim"
        style={{
          width: 'min(460px, 92vw)',
          height: '100%',
          background: 'var(--ai-card-bg)',
          borderLeft: '1px solid var(--ai-card-border)',
          boxShadow: '-24px 0 60px -20px rgba(15, 22, 60, 0.35)',
          display: 'flex', flexDirection: 'column',
          fontFamily: F,
          animation: 'aiObjDrawerSlideIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '20px 22px 18px',
          borderBottom: '1px solid var(--ai-card-border)',
        }}>
          <span aria-hidden="true" style={{
            width: 40, height: 40, borderRadius: 10,
            background: cfg.tintBg,
            border: `1px solid ${cfg.tintBorder}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Glyph name={cfg.icon} size={20} color={accentColor} />
          </span>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              fontFamily: F, fontSize: 18, fontWeight: 700,
              color: 'var(--ai-ds-text)', lineHeight: 1.25,
              textAlign: 'left' as const,
            }}>
              {title}
            </div>
            <div style={{
              ...AI_TYPOGRAPHY['@ai-meta-label'],
              color: cfg.tintText, fontWeight: 700, letterSpacing: '0.08em',
            }}>
              {cfg.label}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close objective details"
            style={{
              width: 32, height: 32, borderRadius: 8, background: 'transparent',
              border: 'none', cursor: 'pointer', color: 'var(--ai-ds-helper)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Glyph name="zs-icon-close" size={16} color="currentColor" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Rationale — composed AIReasoningQuote atom */}
          {detail?.rationale && (
            <AIReasoningQuote
              eyebrow="RATIONALE"
              tone={cfg.warning ? 'warning' : 'ai'}
              quote={detail.rationale}
            />
          )}

          {/* Targets / Measures */}
          {detail?.targets && detail.targets.length > 0 && (
            <Section eyebrow="TARGETS & MEASURES" eyebrowIcon="zs-icon-data-arrow-up" eyebrowTone="var(--ai-ds-helper)">
              <div style={{
                display: 'grid',
                gridTemplateColumns: detail.targets.length === 1 ? '1fr' : '1fr 1fr',
                gap: 10,
              }}>
                {detail.targets.map((t, i) => (
                  <AIMetricTile
                    key={i}
                    label={t.label}
                    value={t.value}
                    qualifier={t.suffix}
                    qualifierTone={cfg.warning ? 'attention' : 'positive'}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Conditions — surfaces the same bullets the card showed */}
          {items.length > 0 && (
            <Section
              eyebrow={cfg.warning ? 'GUARDRAILS' : 'CONDITIONS'}
              eyebrowIcon={cfg.warning ? 'zs-icon-error-triangle' : 'zs-icon-check-circle'}
              eyebrowTone="var(--ai-ds-helper)"
            >
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((it, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span aria-hidden="true" style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: cfg.dot, flexShrink: 0, marginTop: 8,
                    }} />
                    <span style={{
                      flex: 1, minWidth: 0,
                      ...AI_TYPOGRAPHY['@ai-body-small'],
                      color: 'var(--ai-ds-text)',
                      lineHeight: 1.5,
                      textAlign: 'left' as const,
                    }}>
                      {it.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Related (autonomy-style bullets) */}
          {detail?.related && detail.related.length > 0 && (
            <Section eyebrow="RELATED" eyebrowIcon="zs-icon-layers" eyebrowTone="var(--ai-ds-helper)">
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {detail.related.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span aria-hidden="true" style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: r.tone === 'confirm' ? AI.color.action.primaryHover : AI.color.brand,
                      marginTop: 6, flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: 'var(--ai-ds-text)', lineHeight: 1.35, textAlign: 'left' as const }}>
                        {r.label}
                      </div>
                      <div style={{ fontFamily: F, fontSize: 13, color: 'var(--ai-ds-helper)', lineHeight: 1.4, marginTop: 2, textAlign: 'left' as const }}>
                        {r.scope}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Sources — composed AISourceTile atoms */}
          {detail?.sources && detail.sources.length > 0 && (
            <Section eyebrow="SOURCES" eyebrowIcon="zs-icon-data" eyebrowTone="var(--ai-ds-helper)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {detail.sources.map((s, i) => (
                  <AISourceTile
                    key={i}
                    title={s.label}
                    source={s.source}
                    iconName={s.icon}
                    tone={cfg.warning ? 'warning' : 'ai'}
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky footer — AIButton primary-solid variant */}
        {onViewFullPage && (
          <div style={{
            borderTop: '1px solid var(--ai-card-border)',
            padding: 14,
            background: 'var(--ai-card-bg)',
            display: 'grid',
          }}>
            <AIButton
              variant="primary-solid"
              size="lg"
              radius="md"
              label="View Full Details"
              trailingIcon="zs-icon-arrow-right"
              onClick={() => { onViewFullPage(); onClose(); }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes aiObjDrawerBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes aiObjDrawerSlideIn    { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .ai-obj-anim { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer Section helper
// ─────────────────────────────────────────────────────────────────────────────

function Section({
  eyebrow, eyebrowIcon, eyebrowTone, children,
}: {
  eyebrow:     string;
  eyebrowIcon: string;
  eyebrowTone: string;
  children:    React.ReactNode;
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Glyph name={eyebrowIcon} size={14} color={eyebrowTone} />
        <span style={{
          ...AI_TYPOGRAPHY['@ai-meta-label'],
          color: eyebrowTone,
          fontWeight: 700, letterSpacing: '0.10em',
        }}>
          {eyebrow}
        </span>
      </div>
      {children}
    </section>
  );
}

export default AIObjectiveCard;
