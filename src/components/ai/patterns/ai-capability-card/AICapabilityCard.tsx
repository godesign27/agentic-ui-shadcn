/**
 * AICapabilityCard — ZAIDYN Agentic AI Group
 *
 * Compact reusable card that surfaces a single AI capability, model skill, or
 * agent behavior. Default click behavior opens a detail drawer with the
 * capability's reasoning summary, confidence, autonomy boundaries, and
 * knowledge inputs. A "View full page" affordance can be enabled to deep-link
 * into a standalone capability page.
 *
 * Brand discipline:
 *   - AI emphasis uses ZSAI brand blue / purple — no teal.
 *   - Origin chips use neutral / brand-tinted treatment.
 *   - ZS orange is reserved for the needs-review status.
 *   - Color always pairs with text so meaning isn't color-dependent.
 */

import React from 'react';
import { AI, ZS_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AITextLink } from '../../molecules/ai-text-link/AITextLink';
import { AIReasoningQuote } from '../../atomic/ai-reasoning-quote/AIReasoningQuote';
import { AIMetricTile } from '../../atomic/ai-metric-tile/AIMetricTile';
import { AISourceTile } from '../../atomic/ai-source-tile/AISourceTile';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AIIcon } from '../../atomic/ai-icon/AIIcon';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AICapabilityOrigin =
  | 'system-defined'
  | 'client-extended'
  | 'user-configured'
  | 'experimental';

export type AICapabilityStatus =
  | 'active'
  | 'disabled'
  | 'needs-review';

export interface AICapabilityKnowledgeInput {
  label:   string;
  source?: string;
  icon?:   string;
}

export interface AICapabilityAutonomy {
  /** Short label like "Acts Silently On" or "Requires Confirmation For" */
  label: string;
  /** Comma-separated or short phrase scope */
  scope: string;
  /** Tone — silent = AI green/teal-free brand blue, confirm = ZSAI purple */
  tone?: 'silent' | 'confirm';
}

export interface AICapabilityDetail {
  /** Italicized first-person reasoning summary, shown in REASONING SUMMARY block. */
  reasoningSummary?: string;
  /** Confidence percentage (0–100). */
  confidence?:       number;
  /** Plain-language confidence qualifier — "High", "Medium", "Low". */
  confidenceLabel?:  string;
  /** Trend qualifier — "Stable", "Improving", "Drifting". */
  trend?:            string;
  /** Autonomy boundaries shown as a bulleted list with tinted dots. */
  autonomy?:         AICapabilityAutonomy[];
  /** Knowledge sources the capability draws on. */
  knowledgeInputs?:  AICapabilityKnowledgeInput[];
}

export interface AICapabilityCardProps {
  title?:           string;
  description?:     string;
  origin?:          AICapabilityOrigin;
  status?:          AICapabilityStatus;
  iconName?:        string;
  /** Footnote shown under the description, with a layers glyph. */
  supportingNote?:  React.ReactNode;
  /** Override the right-side action label. Defaults from status. */
  actionLabel?:     string;
  /** Override the default drawer behavior — receives the same capability. */
  onInspect?:       () => void;
  /** When set, renders a secondary "View full page" link in the drawer footer. */
  onViewFullPage?:  () => void;
  /** Detail content surfaced when the drawer opens. */
  detail?:          AICapabilityDetail;
  /** When set, the card is rendered disabled with a tooltip. */
  disabledReason?:  string;
  /** Open the drawer programmatically. Defaults to internal state. */
  open?:            boolean;
  /** Notify parent that the drawer wants to close. */
  onClose?:         () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Origin / status tokens
// ─────────────────────────────────────────────────────────────────────────────

interface ChipCfg {
  label:  string;
  bg:     string;
  border: string;
  text:   string;
}

const ORIGIN_CFG: Record<AICapabilityOrigin, ChipCfg> = {
  'system-defined':  { label: 'SYSTEM DEFINED',  bg: AI.color.brandSubtle,           border: AI.color.brandBorder,           text: AI.color.text.secondary              },
  'client-extended': { label: 'CLIENT EXTENDED', bg: 'rgba(67,190,190,0.12)',        border: 'rgba(67,190,190,0.30)',        text: '#0F6E72'             },
  'user-configured': { label: 'USER CONFIGURED', bg: 'var(--ai-card-bg-raised)',     border: 'var(--ai-card-border)',        text: 'var(--ai-zds-text)'  },
  'experimental':    { label: 'EXPERIMENTAL',    bg: 'rgba(178,170,255,0.18)',       border: 'rgba(178,170,255,0.40)',       text: AI.color.text.primary  },
};

const STATUS_CFG: Record<AICapabilityStatus, { label: string; dot: string; text: string }> = {
  'active':       { label: 'Inspect',     dot: AI.color.brand,            text: 'var(--ai-zds-helper)' },
  'disabled':     { label: 'Disabled',    dot: 'var(--ai-card-border)',   text: 'var(--ai-zds-helper)' },
  'needs-review': { label: 'Needs review',dot: ZS_ORANGE[60],             text: ZS_ORANGE[80] },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function Glyph({ name, size = 14, color }: { name: string; size?: number; color?: string }) {
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

function OriginChip({ origin }: { origin: AICapabilityOrigin }) {
  const cfg = ORIGIN_CFG[origin];
  return (
    <span
      role="status"
      aria-label={`Capability origin: ${cfg.label.toLowerCase()}`}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '4px 11px', borderRadius: 999,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        fontFamily: F, fontSize: 12, fontWeight: 700,
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {cfg.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card (root)
// ─────────────────────────────────────────────────────────────────────────────


/** Demo capability card props for bare mounts / galleries. */
export const SAMPLE_CAPABILITY_TITLE = 'Territory rebalance scoring';
export const SAMPLE_CAPABILITY_DESCRIPTION =
  'Ranks Mid-Atlantic territories by coverage gap and recommends FTE shifts.';

export function AICapabilityCard(props: AICapabilityCardProps) {
  const {
    title = SAMPLE_CAPABILITY_TITLE,
    description = SAMPLE_CAPABILITY_DESCRIPTION,
    origin   = 'system-defined',
    status   = 'active',
    iconName = 'zs-icon-ai-assist',
    supportingNote,
    actionLabel,
    onInspect,
    onViewFullPage,
    detail,
    disabledReason,
    open,
    onClose,
  } = props;

  const isDisabled    = !!disabledReason || status === 'disabled';
  const isNeedsReview = status === 'needs-review';
  const statusCfg     = STATUS_CFG[status];
  const inspectLabel  = actionLabel ?? statusCfg.label;
  const interactive   = !isDisabled;

  // Drawer is controlled if `open` is provided, otherwise internal state.
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen   = open !== undefined ? open : internalOpen;
  const closeDrawer = React.useCallback(() => {
    setInternalOpen(false);
    onClose?.();
  }, [onClose]);

  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const elevated = (hover || focus) && interactive;

  const handleActivate = React.useCallback(() => {
    if (!interactive) return;
    if (onInspect) { onInspect(); return; }
    setInternalOpen(true);
  }, [interactive, onInspect]);

  return (
    <>
      <div
        role={interactive ? 'button' : 'group'}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${title} — ${ORIGIN_CFG[origin].label.toLowerCase()}`}
        aria-disabled={isDisabled || undefined}
        title={disabledReason}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onClick={interactive ? handleActivate : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); } } : undefined}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          padding: '18px 20px 16px',
          background: 'var(--ai-card-bg)',
          border: `1px solid ${
            elevated ? AI.color.brand :
            isNeedsReview ? ZS_ORANGE[30] :
            'var(--ai-card-border)'
          }`,
          borderRadius: AI.radius.md,
          boxShadow: elevated
            ? `0 8px 24px -10px rgba(77, 96, 230, 0.30), 0 2px 4px rgba(15, 22, 60, 0.05)`
            : '0 1px 2px rgba(15, 22, 60, 0.04)',
          transform: elevated ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease',
          opacity: isDisabled ? 0.6 : 1,
          cursor: interactive ? 'pointer' : (isDisabled ? 'not-allowed' : 'default'),
          outline: 'none',
          fontFamily: F,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}
      >
        {/* Header — origin chip · status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <OriginChip origin={origin} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true" style={{
              width: 6, height: 6, borderRadius: '50%',
              background: statusCfg.dot,
              flexShrink: 0,
            }} />
            <span style={{
              ...AI_TYPOGRAPHY['@zsai-meta-label'],
              color: statusCfg.text,
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
            }}>
              {inspectLabel}
            </span>
          </span>
        </div>

        {/* Title — bold, one size larger than card title */}
        <div style={{
          fontFamily: F,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--ai-zds-text)',
          letterSpacing: '-0.005em',
        }}>
          {title}
        </div>

        {/* Description */}
        {description && (
          <p style={{
            margin: 0,
            ...AI_TYPOGRAPHY['@zsai-body-small'],
            color: 'var(--ai-zds-helper)',
            lineHeight: 1.5,
          }}>
            {description}
          </p>
        )}

        {/* Supporting note */}
        {supportingNote && (
          <div style={{
            paddingTop: 10,
            borderTop: '1px dashed var(--ai-card-border)',
            display: 'flex', alignItems: 'center', gap: 6,
            ...AI_TYPOGRAPHY['@zsai-meta-label'],
            color: 'var(--ai-zds-helper)',
          }}>
            <Glyph name="zs-icon-layers" size={12} color="var(--ai-zds-helper)" />
            <span>{supportingNote}</span>
          </div>
        )}
      </div>

      {/* Detail drawer — opens on click when no onInspect override is set */}
      {isOpen && (
        <AICapabilityCardDrawer
          title={title}
          origin={origin}
          iconName={iconName}
          description={description}
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
  title:           string;
  origin:          AICapabilityOrigin;
  iconName:        string;
  description?:    string;
  detail?:         AICapabilityDetail;
  onClose:         () => void;
  onViewFullPage?: () => void;
}

function AICapabilityCardDrawer({
  title, origin, iconName, description, detail, onClose, onViewFullPage,
}: DrawerProps) {
  const cfg = ORIGIN_CFG[origin];
  const conf = detail?.confidence;
  const confLabel = detail?.confidenceLabel ??
    (conf === undefined ? undefined : conf >= 80 ? 'High' : conf >= 60 ? 'Medium' : 'Low');
  const confTone = confLabel === 'High' ? AI.color.brand
                 : confLabel === 'Medium' ? ZS_ORANGE[60]
                 : confLabel === 'Low' ? ZS_ORANGE[80]
                 : 'var(--ai-zds-helper)';

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15, 22, 60, 0.45)',
        display: 'flex', justifyContent: 'flex-end',
        animation: 'aiCapDrawerBackdropIn 180ms ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — capability details`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(460px, 92vw)',
          height: '100%',
          background: 'var(--ai-card-bg)',
          borderLeft: '1px solid var(--ai-card-border)',
          boxShadow: '-24px 0 60px -20px rgba(15, 22, 60, 0.35)',
          display: 'flex', flexDirection: 'column',
          fontFamily: F,
          animation: 'aiCapDrawerSlideIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
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
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Glyph name={iconName} size={20} color={cfg.text} />
          </span>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              fontFamily: F, fontSize: 18, fontWeight: 700,
              color: 'var(--ai-zds-text)', lineHeight: 1.25,
            }}>
              {title}
            </div>
            <div style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: cfg.text, fontWeight: 700, letterSpacing: '0.08em' }}>
              {cfg.label}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close capability details"
            style={{
              width: 32, height: 32, borderRadius: 8, background: 'transparent',
              border: 'none', cursor: 'pointer', color: 'var(--ai-zds-helper)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Glyph name="zs-icon-close" size={16} color="currentColor" />
          </button>
        </div>

        {/* Scroll body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Reasoning summary — composed AIReasoningQuote atom */}
          {(detail?.reasoningSummary || description) && (
            <AIReasoningQuote
              quote={detail?.reasoningSummary ?? <>&ldquo;{description}&rdquo;</>}
            />
          )}

          {/* Confidence + trend */}
          {(confLabel !== undefined || detail?.trend) && (
            <Section eyebrow="EVOLUTION & CONFIDENCE" eyebrowIcon="zs-icon-trending-up" eyebrowTone="var(--ai-zds-helper)">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <AIMetricTile
                  label="CONFIDENCE"
                  value={conf !== undefined ? `${conf}%` : '—'}
                  qualifier={confLabel}
                  qualifierTone={
                    confLabel === 'High'   ? 'positive' :
                    confLabel === 'Medium' ? 'attention' :
                    confLabel === 'Low'    ? 'critical'  :
                    'neutral'
                  }
                />
                <AIMetricTile
                  label="TREND"
                  value={detail?.trend ?? 'Stable'}
                />
              </div>
            </Section>
          )}

          {/* Autonomy boundaries */}
          {detail?.autonomy && detail.autonomy.length > 0 && (
            <Section eyebrow="AUTONOMY BOUNDARIES" eyebrowIcon="zs-icon-shield" eyebrowTone="var(--ai-zds-helper)">
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {detail.autonomy.map((a, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span aria-hidden="true" style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: a.tone === 'confirm' ? AI.color.action.primaryHover : AI.color.brand,
                      marginTop: 6, flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: 'var(--ai-zds-text)', lineHeight: 1.35 }}>
                        {a.label}
                      </div>
                      <div style={{ fontFamily: F, fontSize: 13, color: 'var(--ai-zds-helper)', lineHeight: 1.4, marginTop: 2 }}>
                        {a.scope}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Knowledge inputs — composed AISourceTile atoms */}
          {detail?.knowledgeInputs && detail.knowledgeInputs.length > 0 && (
            <Section eyebrow="KNOWLEDGE INPUTS" eyebrowIcon="zs-icon-data" eyebrowTone="var(--ai-zds-helper)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {detail.knowledgeInputs.map((k, i) => (
                  <AISourceTile
                    key={i}
                    title={k.label}
                    source={k.source}
                    iconName={k.icon}
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky footer — View Full Details (AIButton primary-solid variant) */}
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

      {/* keyframes */}
      <style>{`
        @keyframes aiCapDrawerBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes aiCapDrawerSlideIn    { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer sub-helpers
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
          ...AI_TYPOGRAPHY['@zsai-meta-label'],
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

export default AICapabilityCard;
