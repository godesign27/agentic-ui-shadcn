import React, { useState } from 'react';
import { F, AI, ZDS, ZS_ORANGE } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIMessageHeader } from '../../atomic/ai-message-header/AIMessageHeader';
import { AIMessageBody } from '../../atomic/ai-message-body/AIMessageBody';
import { AIResponseFooter, AISource } from '../../molecules/ai-response-footer/AIResponseFooter';
import { AIAnalysisInsight, InsightType, ConfidenceVariant, InsightStatus, AccentLineStyle } from '../../molecules/ai-analysis-insight/AIAnalysisInsight';
import { ACCENT_LINE_STYLES } from '../../atomic/ai-accent-line/AIAccentLine';

// ── Types ─────────────────────────────────────────────────────────────────────

export type MessageStatus =
  | 'default'
  | 'loading'
  | 'complete'
  | 'expanded'
  | 'collapsed'
  | 'error'
  | 'empty';

export interface AIInsightItem {
  type:            InsightType;
  body:            string;
  title?:          string;
  confidence?:     ConfidenceVariant;
  metric?:         string;
  sources?:        string[];
  action?:         { label: string; onClick?: () => void };
  status?:         InsightStatus;
  showRationale?:  boolean;
  showSources?:    boolean;
  onViewRationale?: () => void;
  onViewSources?:  () => void;
}

export interface AIAnalysisMessageProps {
  attribution?:      string;
  timestamp?:        string;
  intro?:            string;
  insights?:         AIInsightItem[];
  sources?:          AISource[];
  showFooter?:       boolean;
  showFeedback?:     boolean;
  status?:           MessageStatus;
  loading?:          boolean;
  collapsed?:        boolean;
  actions?:          { label: string; onClick?: () => void }[];
  /** Initial accent style for insight cards. RiUserLine can override via the picker. */
  accentStyle?:      AccentLineStyle;
  /** Whether to show the accent style picker in the header. Defaults to true. */
  showAccentPicker?: boolean;
  onFeedback?:       (v: 'up' | 'down') => void;
  onViewSources?:    () => void;
  onViewRationale?:  () => void;
  onCopy?:           () => void;
  onShare?:          () => void;
}

// ── Skeleton loading bars ─────────────────────────────────────────────────────

function SkeletonBar({ width, delay }: { width: string; delay: string }) {
  return (
    <div style={{
      height: '14px',
      width,
      borderRadius: '4px',
      background: 'var(--ai-track-bg)',
      animation: `ai-msg-pulse 900ms ease-in-out ${delay} infinite alternate`,
    }} />
  );
}

function SkeletonInsight({ delay }: { delay: string }) {
  return (
    <div style={{
      background: 'var(--ai-brand-surface)',
      borderLeft: `3px solid var(--ai-brand-border)`,
      borderRadius: AI.radius.xs,
      padding: '10px 14px',
      animation: `ai-msg-pulse 900ms ease-in-out ${delay} infinite alternate`,
    }}>
      <div style={{ height: '10px', width: '60px', borderRadius: '3px', background: 'var(--ai-track-bg)', marginBottom: '8px' }} />
      <div style={{ height: '13px', width: '90%', borderRadius: '3px', background: 'var(--ai-track-bg)', marginBottom: '5px' }} />
      <div style={{ height: '13px', width: '70%', borderRadius: '3px', background: 'var(--ai-track-bg)' }} />
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorState() {
  return (
    <div style={{
      padding: '12px 14px',
      background: 'var(--ai-status-error-bg)',
      borderLeft: `3px solid var(--ai-status-error-border)`,
      borderRadius: AI.radius.xs,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <span style={{ ...AI_TYPOGRAPHY['@zsai-overline'], fontFamily: F, color: 'var(--ai-status-error-text)' }}>
        Analysis Unavailable
      </span>
      <span style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], fontFamily: F, color: 'var(--ai-zds-text)' }}>
        The analysis could not be completed. Please try again or check your data sources.
      </span>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div style={{
      padding: '16px 14px',
      textAlign: 'center',
    }}>
      <span style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], fontFamily: F, color: 'var(--ai-zds-helper)' }}>
        No insights found for this query. Try adjusting the filters or data range.
      </span>
    </div>
  );
}

// ── Follow-up action buttons ──────────────────────────────────────────────────

function FollowUpActions({ actions }: { actions: { label: string; onClick?: () => void }[] }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      paddingTop: '4px',
    }}>
      {actions.map((a, i) => (
        <button
          key={i}
          onClick={a.onClick}
          style={{
            background: 'var(--ai-card-bg-raised)',
            border: '1px solid var(--ai-card-border)',
            borderRadius: AI.radius.xs,
            padding: '5px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: F,
            fontWeight: 500,
            color: AI.color.action.primary,
          }}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AIAnalysisMessage({
  attribution      = 'AI Analysis',
  timestamp        = 'Just now',
  intro,
  insights         = [],
  sources          = [],
  showFooter       = true,
  showFeedback     = true,
  status           = 'default',
  loading          = false,
  collapsed        = false,
  actions,
  accentStyle:     accentStyleProp = 'gradient',
  showAccentPicker = true,
  onFeedback,
  onViewSources,
  onViewRationale,
  onCopy,
  onShare,
}: AIAnalysisMessageProps) {
  const [isCollapsed, setIsCollapsed]   = useState(collapsed);
  const [accentStyle, setAccentStyle]   = useState<AccentLineStyle>(accentStyleProp);
  const [pickerOpen, setPickerOpen]     = useState(false);

  const isLoading = loading || status === 'loading';
  const isError   = status === 'error';
  const isEmpty   = !isLoading && !isError && insights.length === 0;
  const isComplete = status === 'complete' || (!isLoading && !isError && insights.length > 0);

  return (
    <>
      <style>{`
        @keyframes ai-msg-pulse {
          from { opacity: 0.35; }
          to   { opacity: 1; }
        }
        @keyframes ai-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        role="region"
        aria-label={`${attribution} analysis message`}
        aria-busy={isLoading}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          animation: 'ai-msg-in 0.25s ease both',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {/* ── Attribution row ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <AIMessageHeader agentLabel={attribution} timestamp={timestamp} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
            {/* Accent style picker — shown when there are insights to style */}
            {showAccentPicker && isComplete && insights.length > 0 && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setPickerOpen(o => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={pickerOpen}
                  aria-label="Change accent style"
                  title="Change accent style"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: pickerOpen ? 'var(--ai-brand-surface)' : 'none',
                    border: `1px solid ${pickerOpen ? AI.color.action.primary : 'var(--ai-card-border)'}`,
                    borderRadius: AI.radius.xs,
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontFamily: F,
                    fontWeight: 500,
                    color: pickerOpen ? AI.color.action.primary : 'var(--ai-zds-helper)',
                    padding: '3px 8px',
                    transition: 'all 0.12s',
                  }}
                >
                  {/* Mini accent preview */}
                  <span style={{
                    width: '3px',
                    height: '12px',
                    borderRadius: '2px',
                    background: accentStyle === 'gradient'
                      ? `linear-gradient(to bottom, ${AI.color.action.primary}, transparent)`
                      : accentStyle === 'top-bar'
                      ? AI.color.action.primary
                      : accentStyle === 'none'
                      ? 'var(--ai-card-border)'
                      : AI.color.action.primary,
                    opacity: accentStyle === 'none' ? 0.3 : 1,
                    display: 'inline-block',
                    flexShrink: 0,
                  }} />
                  Accent
                  <span aria-hidden="true" style={{ fontSize: '8px', opacity: 0.6 }}>▾</span>
                </button>

                {/* Dropdown */}
                {pickerOpen && (
                  <div
                    role="listbox"
                    aria-label="Accent style options"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      right: 0,
                      zIndex: 50,
                      background: 'var(--ai-card-bg-raised)',
                      border: '1px solid var(--ai-card-border)',
                      borderRadius: AI.radius.sm,
                      boxShadow: '0 8px 24px -4px rgba(26,22,40,0.18)',
                      minWidth: '160px',
                      overflow: 'hidden',
                      padding: '4px',
                    }}
                  >
                    {ACCENT_LINE_STYLES.map(({ value, label }) => {
                      const isActive = accentStyle === value;
                      return (
                        <button
                          key={value}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => { setAccentStyle(value); setPickerOpen(false); }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 10px',
                            background: isActive ? 'var(--ai-brand-surface)' : 'transparent',
                            border: 'none',
                            borderRadius: AI.radius.xs,
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontFamily: F,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? AI.color.action.primary : 'var(--ai-zds-text)',
                            textAlign: 'left',
                            transition: 'background 0.1s',
                          }}
                          onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--ai-track-bg)'; }}
                          onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        >
                          {/* Micro accent preview */}
                          <span style={{
                            width: '3px',
                            height: '16px',
                            borderRadius: '2px',
                            flexShrink: 0,
                            background: value === 'gradient'
                              ? `linear-gradient(to bottom, ${AI.color.action.primary}, transparent)`
                              : value === 'none'
                              ? 'var(--ai-card-border)'
                              : AI.color.action.primary,
                            opacity: value === 'none' ? 0.3 : 1,
                          }} />
                          {label}
                          {isActive && <span style={{ marginLeft: 'auto', fontSize: '10px' }}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Collapse / expand toggle */}
            {isComplete && insights.length > 0 && (
              <button
                onClick={() => setIsCollapsed(c => !c)}
                aria-expanded={!isCollapsed}
                aria-label={isCollapsed ? 'Expand analysis' : 'Collapse analysis'}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontFamily: F,
                  color: AI.color.text.secondary,
                  padding: '2px 6px',
                }}
              >
                {isCollapsed ? '▸ Show' : '▾ Hide'}
              </button>
            )}
          </div>
        </div>

        {/* ── Intro text ───────────────────────────────────────────────────── */}
        {intro && !isCollapsed && (
          <div style={{ padding: '2px 0 6px' }}>
            <AIMessageBody>{intro}</AIMessageBody>
          </div>
        )}

        {/* ── Content area ─────────────────────────────────────────────────── */}
        {!isCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

            {isLoading && (
              <>
                <SkeletonInsight delay="0ms" />
                <SkeletonInsight delay="200ms" />
                <div style={{ paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <SkeletonBar width="70%" delay="400ms" />
                  <SkeletonBar width="50%" delay="550ms" />
                </div>
              </>
            )}

            {isError && <ErrorState />}

            {isEmpty && <EmptyState />}

            {!isLoading && !isError && !isEmpty && insights.map((insight, i) => (
              <AIAnalysisInsight
                key={i}
                type={insight.type}
                body={insight.body}
                title={insight.title}
                confidence={insight.confidence}
                metric={insight.metric}
                sources={insight.sources}
                action={insight.action}
                status={insight.status}
                showRationale={insight.showRationale}
                showSources={insight.showSources}
                onViewRationale={insight.onViewRationale}
                onViewSources={insight.onViewSources}
                accentStyle={accentStyle}
              />
            ))}

            {/* ── Follow-up actions ─────────────────────────────────────── */}
            {actions && actions.length > 0 && !isLoading && (
              <FollowUpActions actions={actions} />
            )}

          </div>
        )}

        {/* ── Response footer ──────────────────────────────────────────────── */}
        {showFooter && !isLoading && !isCollapsed && (
          <AIResponseFooter
            sources={sources}
            showFeedback={showFeedback}
            showRationale={!!onViewRationale}
            onFeedback={onFeedback}
            onViewRationale={onViewRationale}
            onCopy={onCopy}
            onShare={onShare}
          />
        )}
      </div>
    </>
  );
}

export default AIAnalysisMessage;
