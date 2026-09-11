import React, { useState } from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AIChip } from '../../atomic/ai-chip/AIChip';

// ─────────────────────────────────────────────────────────────────────────────
// AIInsightList — reusable list of AI-generated findings (risks, positive
// signals, warnings, observations, recommendations) used inside analysis
// cards, response bubbles, side drawers and dashboards.
//
// NOT the same as ai-notification — notifications are one-shot alerts /
// banners / toasts. AIInsightList groups *multiple* findings inside a larger
// analysis surface.
// ─────────────────────────────────────────────────────────────────────────────

export type AIInsightType =
  | 'positive'
  | 'risk'
  | 'warning'
  | 'observation'
  | 'recommendation'
  | 'opportunity'
  | 'anomaly'
  | 'dataQuality'
  | 'reviewNeeded';

export type AIInsightSeverity =
  | 'positive'
  | 'neutral'
  | 'warning'
  | 'critical'
  | 'info'
  | 'needsReview';

export type AIInsightDensity = 'compact' | 'comfortable' | 'spacious';

export interface AIInsightItem {
  id:           string;
  text:         string;
  type?:        AIInsightType;
  severity?:    AIInsightSeverity;
  statusLabel?: string;                                           // optional explicit label, e.g. 'Risk'
  source?:      { label: string; icon?: string };
  freshness?:   string;
  confidence?:  number;                                           // 0–100 — small inline pill
  action?:      { label: string; href?: string; onClick?: () => void };
}

export interface AIInsightListProps {
  title?:         string;
  items:          AIInsightItem[];
  density?:       AIInsightDensity;
  maxVisible?:    number;                                          // truncate after N; shows "Show more" link
  showSources?:   boolean;                                         // gate source / freshness chips per item
  showActions?:   boolean;                                         // gate per-item action link
  onItemAction?:  (item: AIInsightItem) => void;
  onShowMore?:    () => void;
}

// ── Severity tone table ──────────────────────────────────────────────────────
// Each severity gets a dot color + accessible label (for sr-only readout) +
// an optional darker text tone if the entire row needs to read as the same
// status (we keep the body text neutral by default so the dot stays the only
// signal — color is not the sole signal because the dot has an aria-label).

interface SeverityTone {
  dot:     string;
  label:   string;
  /** zsIcons class name (from /styles/icons.css) — the canonical ZDS icon. */
  icon:    string;
}

// Severity → canonical ZDS icon (zsIcons font). Mirrors the ZDS status icon
// conventions documented in Agent_Instructions.md §11 (check-circle-fill /
// error-triangle-fill / info-fill …) instead of hand-drawn SVG glyphs.
const TONE: Record<AIInsightSeverity, SeverityTone> = {
  positive:    { dot: '#1F6B40',                             label: 'Positive',     icon: 'zs-icon-check-circle-fill'   },
  neutral:     { dot: 'var(--ai-zds-helper, #6B6876)',       label: 'Neutral',      icon: 'zs-icon-circle-fill'         },
  warning:     { dot: '#B45309',                             label: 'Warning',      icon: 'zs-icon-error-triangle-fill' },
  critical:    { dot: 'var(--ai-status-error-text, #C0392B)', label: 'Critical',    icon: 'zs-icon-error-circle-fill'   },
  info:        { dot: AI.color.brand,                        label: 'Information',  icon: 'zs-icon-info-fill'           },
  needsReview: { dot: '#B45309',                             label: 'Needs review', icon: 'zs-icon-clock-pending'       },
};

// Renders a ZDS icon-font glyph. The `content:"\eaXX"` rules in icons.css are
// scoped under `.zs-master-style`, so the glyph only resolves inside that
// wrapper — we scope locally here (same pattern as AIChip's brief icon).
function ZsIcon({ name, size = 14 }: { name: string; size?: number }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0, color: 'inherit' }}
    >
      <i className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1, color: 'inherit' }} />
    </span>
  );
}

// Subtle inline confidence pill (XX% confidence) — green/amber/red tone.
function InlineConfidence({ pct }: { pct: number }) {
  const tone =
    pct >= 80 ? { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40' }
  : pct >= 60 ? { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E' }
  :             { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
      borderRadius: AI.radius.full,
      background: tone.bg, border: `1px solid ${tone.border}`, color: tone.text,
      fontFamily: F, fontSize: 12, fontWeight: 600, lineHeight: 1.4,
      whiteSpace: 'nowrap' as const,
    }}>
      {pct}% confidence
    </span>
  );
}

// Right-chevron used on per-item action links.
function RightChevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 3 L7.5 6 L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Per-density spacing scale.
const DENSITY_GAP: Record<AIInsightDensity, number>     = { compact: 6,  comfortable: 10, spacious: 14 };
const DENSITY_VPAD: Record<AIInsightDensity, number>    = { compact: 2,  comfortable: 4,  spacious: 6  };

export function AIInsightList({
  title,
  items,
  density       = 'comfortable',
  maxVisible,
  showSources,
  showActions,
  onItemAction,
  onShowMore,
}: AIInsightListProps) {
  const [expanded, setExpanded] = useState(false);
  const cap     = maxVisible && !expanded ? items.slice(0, maxVisible) : items;
  const hidden  = items.length - cap.length;
  const gap     = DENSITY_GAP[density];
  const vpad    = DENSITY_VPAD[density];

  if (items.length === 0) {
    return (
      <div role="status" style={{
        fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)',
        padding: '12px 14px', borderRadius: AI.radius.md,
        border: '1px dashed var(--ai-card-border, #D5D3DA)',
        textAlign: 'center' as const,
      }}>
        No insights yet.
      </div>
    );
  }

  return (
    <section aria-label={title ?? 'AI insights'} style={{ fontFamily: F }}>
      {title && (
        <div style={{
          fontFamily: F, fontSize: 12, fontWeight: 700,
          color: 'var(--ai-zds-helper, #6B6876)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          marginBottom: 8,
        }}>
          {title}
        </div>
      )}

      <ul role="list" style={{
        margin: 0, padding: 0, listStyle: 'none',
        display: 'flex', flexDirection: 'column', gap,
      }}>
        {cap.map((item) => {
          const sev   = item.severity ?? 'neutral';
          const tone  = TONE[sev];
          const label = item.statusLabel ?? tone.label;
          return (
            <li
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '16px 1fr',
                columnGap: 8,
                rowGap: 4,
                paddingTop: vpad,
                paddingBottom: vpad,
              }}
            >
              {/* Severity marker — has aria-label so colour isn't the only signal */}
              <span
                role="img"
                aria-label={label}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 16, height: 16, color: tone.dot,
                  marginTop: 2,
                }}
              >
                <ZsIcon name={tone.icon} />
              </span>

              {/* Insight body */}
              <div style={{ minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontFamily: F, fontSize: 13, lineHeight: 1.55,
                  color: 'var(--ai-zds-text, #2F2C3C)',
                }}>
                  {item.text}
                </p>

                {/* Metadata row — source / freshness / confidence / action */}
                {(showSources && (item.source || item.freshness)) ||
                 item.confidence != null ||
                 (showActions && item.action) ? (
                  <div style={{
                    marginTop: 6,
                    display: 'flex', alignItems: 'center', gap: 6,
                    flexWrap: 'wrap',
                  }}>
                    {showSources && item.source && (
                      <AIChip kind="brief"
                        label={item.source.label}
                        size="sm"
                        noDot
                        icon={item.source.icon ?? 'zs-icon-data-table'}
                        accentColor="var(--ai-zds-helper, #6B6876)"
                        accentBg="var(--ai-card-bg-raised, #F5F4F7)"
                      />
                    )}
                    {showSources && item.freshness && (
                      <AIChip kind="brief"
                        label={item.freshness}
                        size="sm"
                        noDot
                        icon="zs-icon-clock-pending"
                        accentColor="var(--ai-zds-helper, #6B6876)"
                        accentBg="var(--ai-card-bg-raised, #F5F4F7)"
                      />
                    )}
                    {item.confidence != null && (
                      <InlineConfidence pct={item.confidence} />
                    )}
                    {showActions && item.action && (
                      item.action.href ? (
                        <a
                          href={item.action.href}
                          onClick={() => onItemAction?.(item)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            marginLeft: 'auto',
                            fontFamily: F, fontSize: 12, fontWeight: 600,
                            color: AI.color.brand,
                            textDecoration: 'none',
                          }}
                        >
                          {item.action.label}
                          <RightChevron />
                        </a>
                      ) : (
                        <button
                          onClick={() => { item.action?.onClick?.(); onItemAction?.(item); }}
                          style={{
                            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            marginLeft: 'auto',
                            fontFamily: F, fontSize: 12, fontWeight: 600,
                            color: AI.color.brand,
                          }}
                        >
                          {item.action.label}
                          <RightChevron />
                        </button>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Show more / show less when items are truncated */}
      {maxVisible && hidden > 0 && (
        <button
          onClick={() => { setExpanded(true); onShowMore?.(); }}
          style={{
            marginTop: 10,
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: F, fontSize: 12, fontWeight: 600,
            color: AI.color.brand,
          }}
          aria-label={`Show ${hidden} more insight${hidden === 1 ? '' : 's'}`}
        >
          Show {hidden} more
        </button>
      )}
      {maxVisible && expanded && hidden === 0 && items.length > maxVisible && (
        <button
          onClick={() => setExpanded(false)}
          style={{
            marginTop: 10,
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: F, fontSize: 12, fontWeight: 600,
            color: AI.color.brand,
          }}
        >
          Show less
        </button>
      )}
    </section>
  );
}

export default AIInsightList;
