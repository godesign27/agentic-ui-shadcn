import React, { useState } from 'react';
import { RiArrowRightSLine, RiPulseLine, RiFileTextLine, RiSparklingLine, RiBarChart2Line, RiErrorWarningLine } from '@remixicon/react';
import { F, AI, ZS_ORANGE } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIListItemVariant =
  | 'signal'        // monitored territory/account/market signal
  | 'stable'        // positive / balanced
  | 'impact'        // recent AI impact / outcome
  | 'assessment'    // suggested next assessment / action
  | 'change'        // what changed since last looked
  | 'dataUpdate'    // new data ingested
  | 'recommendation'
  | 'alert';

export type AIListItemStatus =
  | 'needsReview'
  | 'balanced'
  | 'recommended'
  | 'ready'
  | 'optional'
  | 'active'
  | 'critical'
  | 'dataStale';

export type AIListItemTone = 'ai' | 'tan' | 'neutral';

export interface AIListItemProps {
  variant?:    AIListItemVariant;
  title:       string;
  label?:      string;
  status?:     AIListItemStatus;
  body?:       string;
  type?:       string;          // small mono "Request" / "Data Update" tag
  icon?:       React.ReactNode; // overrides variant default
  metric?:     string;
  source?:     string;
  freshness?:  string;
  confidence?: 'high' | 'medium' | 'low';
  actionLabel?: string;
  onClick?:    () => void;
  /** Force interactivity off even when an onClick is provided. */
  interactive?: boolean;
  tone?:       AIListItemTone;
  selected?:   boolean;
  loading?:    boolean;
}

// ── Visual maps ──────────────────────────────────────────────────────────────

const STATUS_META: Record<AIListItemStatus, { label: string; color: string; bg: string; border: string }> = {
  needsReview:  { label: 'Needs Review', color: ZS_ORANGE[70],                          bg: ZS_ORANGE['00'],                          border: ZS_ORANGE[40] },
  balanced:     { label: 'Balanced',     color: 'var(--ai-status-success-text)',        bg: 'var(--ai-status-success-bg)',            border: 'var(--ai-status-success-border)' },
  recommended:  { label: 'Recommended',  color: 'var(--ai-status-info-text)',           bg: 'var(--ai-status-info-bg)',               border: 'var(--ai-status-info-border)' },
  ready:        { label: 'Ready',        color: 'var(--ai-status-success-text)',        bg: 'var(--ai-status-success-bg)',            border: 'var(--ai-status-success-border)' },
  optional:     { label: 'Optional',     color: 'var(--ai-zds-helper)',                 bg: 'var(--ai-card-bg-raised)',               border: 'var(--ai-card-border)' },
  active:       { label: 'Active',       color: 'var(--ai-status-info-text)',           bg: 'var(--ai-status-info-bg)',               border: 'var(--ai-status-info-border)' },
  critical:     { label: 'Critical',     color: 'var(--ai-status-error-text)',          bg: 'var(--ai-status-error-bg)',              border: 'var(--ai-status-error-border)' },
  dataStale:    { label: 'Data Stale',   color: ZS_ORANGE[70],                          bg: ZS_ORANGE['00'],                          border: ZS_ORANGE[40] },
};

const VARIANT_ICON: Record<AIListItemVariant, React.ReactNode> = {
  signal:         <RiPulseLine size={16} />,
  stable:         <RiPulseLine size={16} />,
  impact:         <RiSparklingLine size={16} />,
  assessment:     <RiBarChart2Line size={16} />,
  change:         <RiFileTextLine size={16} />,
  dataUpdate:     <RiFileTextLine size={16} />,
  recommendation: <RiSparklingLine size={16} />,
  alert:          <RiErrorWarningLine size={16} />,
};

const TONE_SURFACE: Record<AIListItemTone, { bg: string; border: string }> = {
  ai:      { bg: 'var(--ai-card-bg)',                                 border: 'var(--ai-card-border)' },
  tan:     { bg: 'rgba(255,255,255,0.78)',                            border: 'rgba(60,42,29,0.10)' },
  neutral: { bg: '#FFFFFF',                                           border: 'var(--ai-card-border)' },
};

// ── Component ────────────────────────────────────────────────────────────────

export function AIListItem({
  variant = 'signal',
  title,
  label,
  status,
  body,
  type,
  icon,
  metric,
  source,
  freshness,
  confidence,
  actionLabel,
  onClick,
  interactive,
  tone = 'ai',
  selected = false,
  loading = false,
}: AIListItemProps) {
  const isInteractive = interactive ?? Boolean(onClick);
  const [hov, setHov] = useState(false);

  const surface = TONE_SURFACE[tone];
  const statusMeta = status ? STATUS_META[status] : null;
  const leadingIcon = icon ?? VARIANT_ICON[variant];

  const handleKey = (e: React.KeyboardEvent) => {
    if (!isInteractive || !onClick) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
  };

  return (
    <div
      role={isInteractive ? 'button' : 'group'}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={`${title}${statusMeta ? ' — ' + statusMeta.label : ''}`}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={handleKey}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        gap: 12,
        padding: '14px 16px',
        background: surface.bg,
        border: `1px solid ${selected ? AI.color.action.primary : surface.border}`,
        borderRadius: AI.radius.sm,
        boxShadow: selected ? `0 0 0 3px ${AI.color.action.primary}22` : (hov && isInteractive ? '0 2px 6px rgba(26,22,40,0.06)' : 'none'),
        cursor: isInteractive ? 'pointer' : 'default',
        transform: hov && isInteractive ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.12s ease',
        opacity: loading ? 0.6 : 1,
        boxSizing: 'border-box',
        fontFamily: F,
      }}
    >
      {/* Leading icon */}
      {leadingIcon && (
        <div style={{
          flexShrink: 0,
          width: 32, height: 32, borderRadius: AI.radius.xs,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: tone === 'tan' ? 'rgba(60,42,29,0.06)' : 'var(--ai-card-bg-raised)',
          color: AI.color.action.primary,
        }}>
          {leadingIcon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Eyebrow row: type + label + status */}
        {(type || label || statusMeta) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 4,
          }}>
            {type && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'],
                textTransform: 'uppercase' as const,
                color: 'var(--ai-zds-helper)',
              }}>{type}</span>
            )}
            {label && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-meta-label'],
                color: 'var(--ai-zds-helper)',
              }}>{label}</span>
            )}
            {statusMeta && (
              <span
                aria-label={statusMeta.label}
                style={{
                  ...AI_TYPOGRAPHY['@zsai-action-link'],
                  color: statusMeta.color,
                  background: statusMeta.bg,
                  border: `1px solid ${statusMeta.border}`,
                  borderRadius: AI.radius.full,
                  padding: '3px 9px',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                <span aria-hidden="true" style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'currentColor',
                }} />
                {statusMeta.label}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <div style={{
          ...AI_TYPOGRAPHY['@zsai-h5'],
          color: 'var(--ai-zds-text)',
          marginBottom: body ? 4 : 0,
        }}>
          {title}
        </div>

        {/* Body */}
        {body && (
          <p style={{
            margin: 0,
            ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
            color: 'var(--ai-zds-helper)',
          }}>
            {body}
          </p>
        )}

        {/* Footer chips: metric · source · freshness · confidence */}
        {(metric || source || freshness || confidence) && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            flexWrap: 'wrap',
            marginTop: 8,
          }}>
            {metric && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-table-cell'],
                padding: '3px 8px', borderRadius: AI.radius.xs,
                background: `${AI.color.action.primary}14`,
                color: AI.color.action.primaryActive,
              }}>{metric}</span>
            )}
            {source && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-meta-label'],
                color: 'var(--ai-zds-helper)',
              }}>Source: {source}</span>
            )}
            {freshness && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-meta-label'],
                color: 'var(--ai-zds-helper)',
              }}>{freshness}</span>
            )}
            {confidence && (
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-action-link'],
                color: confidence === 'high' ? 'var(--ai-status-info-text)' :
                       confidence === 'low'  ? 'var(--ai-status-error-text)' :
                                               'var(--ai-status-warning-text)',
                padding: '2px 8px',
                background: confidence === 'high' ? 'var(--ai-status-info-bg)' :
                            confidence === 'low'  ? 'var(--ai-status-error-bg)' :
                                                    'var(--ai-status-warning-bg)',
                border: `1px solid ${confidence === 'high' ? 'var(--ai-status-info-border)' :
                                     confidence === 'low'  ? 'var(--ai-status-error-border)' :
                                                             'var(--ai-status-warning-border)'}`,
                borderRadius: AI.radius.full,
              }}>{confidence[0].toUpperCase() + confidence.slice(1)} confidence</span>
            )}
          </div>
        )}

        {actionLabel && isInteractive && (
          <div style={{
            ...AI_TYPOGRAPHY['@zsai-button-label'],
            color: AI.color.action.primary,
            marginTop: 8,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            {actionLabel} <RiArrowRightSLine size={13} />
          </div>
        )}
      </div>

      {/* Trailing arrow */}
      {isInteractive && !actionLabel && (
        <div style={{
          flexShrink: 0,
          alignSelf: 'center',
          color: hov ? AI.color.action.primary : 'var(--ai-zds-helper)',
          transition: 'color 0.12s, transform 0.15s',
          transform: hov ? 'translateX(2px)' : 'translateX(0)',
        }}>
          <RiArrowRightSLine size={18} />
        </div>
      )}
    </div>
  );
}

export default AIListItem;
