import React, { useState } from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type FeedbackSentiment = 'positive' | 'negative' | 'neutral';

export interface AICardLearningFeedbackProps {
  feedback?: FeedbackSentiment;
  preference?: string;
  appliedAreas?: string[];
  timestamp?: string;
  onUndo?: () => void;
  onViewHistory?: () => void;
  onEditPreferences?: () => void;
}

/** Demo learning-feedback props for bare mounts / galleries. */
export const SAMPLE_LEARNING_FEEDBACK = {
  feedback:     'positive' as FeedbackSentiment,
  preference:   'Prefer concise executive summaries with cited sources',
  appliedAreas: ['Brief generation', 'Weekly digests', 'Call notes'],
  timestamp:    'Applied today at 9:42 AM',
};

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
};

const SENTIMENT_CONFIG: Record<FeedbackSentiment, { icon: string; label: string; color: string; bg: string }> = {
  positive: { icon: '👍', label: 'Positive feedback received', color: '#27AE60', bg: 'var(--ai-feedback-active-helpful)' },
  negative: { icon: '👎', label: 'Negative feedback received', color: '#E74C3C', bg: 'var(--ai-feedback-active-not)' },
  neutral:  { icon: '➡️',  label: 'Neutral feedback received', color: 'var(--ai-ds-helper)', bg: 'var(--ai-confidence-track)' },
};

export function AICardLearningFeedback({
  feedback            = SAMPLE_LEARNING_FEEDBACK.feedback,
  preference          = SAMPLE_LEARNING_FEEDBACK.preference,
  appliedAreas        = SAMPLE_LEARNING_FEEDBACK.appliedAreas,
  timestamp           = SAMPLE_LEARNING_FEEDBACK.timestamp,
  onUndo              = () => undefined,
  onViewHistory       = () => undefined,
  onEditPreferences   = () => undefined,
}: AICardLearningFeedbackProps) {
  const [undone, setUndone] = useState(false);
  const cfg = SENTIMENT_CONFIG[feedback];

  const handleUndo = () => {
    setUndone(true);
    onUndo?.();
  };

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: `1px solid ${undone ? AI.color.border.default : cfg.color + '44'}`,
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 300,
      opacity: undone ? 0.6 : 1,
      transition: 'opacity 0.3s, border-color 0.3s',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: undone ? 'var(--ai-confidence-track)' : cfg.bg,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 22 }}>{cfg.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: undone ? 'var(--ai-btn-disabled-text)' : cfg.color }}>
            {undone ? 'Feedback undone' : cfg.label}
          </div>
          <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)', marginTop: 2 }}>{timestamp}</div>
        </div>
      </div>

      {!undone && (
        <>
          {/* Inferred preference */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--ai-card-border)' }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-caption-2'], color: 'var(--ai-ds-helper)', marginBottom: 6 }}>
              INFERRED PREFERENCE
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 20,
              background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`,
              fontSize: 12, color: AI.color.brand,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1c2.2 0 4 1.8 4 4S7.2 9 5 9 1 7.2 1 5s1.8-4 4-4zm0 2v2l1.5 1.5"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {preference}
            </div>
          </div>

          {/* Applied areas */}
          <div style={{ padding: '14px 18px' }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-caption-2'], color: 'var(--ai-ds-helper)', marginBottom: 8 }}>
              APPLIED TO
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {appliedAreas.map((area, i) => (
                <span key={i} style={{
                  ...AI_TYPOGRAPHY['@ai-meta-label'],
                  padding: '3px 9px', borderRadius: 4,
                  background: 'var(--ai-card-bg-raised)',
                  border: '1px solid var(--ai-card-border)',
                  color: 'var(--ai-ds-text)',
                }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid var(--ai-card-border)',
        display: 'flex', gap: 8,
        background: 'var(--ai-card-bg-raised)',
      }}>
        {!undone && (
          <button onClick={handleUndo} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
            ↩ Undo
          </button>
        )}
        <button onClick={onViewHistory} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
          View RiHistoryLine
        </button>
        <button onClick={onEditPreferences} style={{ ...BTN_BASE, background: 'transparent', color: AI.color.brand, border: 'none' }}>
          Edit Preferences →
        </button>
      </div>
    </div>
  );
}

export default AICardLearningFeedback;
