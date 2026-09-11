import React from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIControlBar, ControlBarState } from '../../atomic/ai-control-bar/AIControlBar';

export interface WorkstreamStep {
  label: string;
  complete: boolean;
}

export interface AIWorkstreamControlPanelProps {
  steps?: WorkstreamStep[];
  currentStep?: number;
  progress?: number;
  controlState?: ControlBarState;
  checkpointNote?: string;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onRedirect?: () => void;
  onCancelConfirm?: (confirmed: boolean) => void;
  onRollback?: () => void;
  onEscalate?: () => void;
}

/** Demo workstream-control props for bare mounts / galleries. */
export const SAMPLE_WORKSTREAM_STEPS: WorkstreamStep[] = [
  { label: 'Scope', complete: true },
  { label: 'Analyze', complete: true },
  { label: 'Recommend', complete: false },
  { label: 'Approve', complete: false },
];
export const SAMPLE_WORKSTREAM_CONTROL = {
  steps: SAMPLE_WORKSTREAM_STEPS,
  currentStep: 2,
  progress: 55,
  controlState: 'running' as ControlBarState,
  checkpointNote: 'Checkpoint saved after analysis · ready for recommendation draft.',
};

const BTN_SM: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '4px 10px', borderRadius: AI.radius.sm,
  border: '1px solid var(--ai-btn-outline-border)', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-meta-label'],
  background: 'transparent', color: 'var(--ai-ds-helper)',
};

export function AIWorkstreamControlPanel({
  steps           = SAMPLE_WORKSTREAM_CONTROL.steps,
  currentStep     = SAMPLE_WORKSTREAM_CONTROL.currentStep,
  progress        = SAMPLE_WORKSTREAM_CONTROL.progress,
  controlState    = SAMPLE_WORKSTREAM_CONTROL.controlState,
  checkpointNote  = SAMPLE_WORKSTREAM_CONTROL.checkpointNote,
  onPause         = () => undefined,
  onResume        = () => undefined,
  onCancel        = () => undefined,
  onRedirect      = () => undefined,
  onCancelConfirm = () => undefined,
  onRollback      = () => undefined,
  onEscalate      = () => undefined,
}: AIWorkstreamControlPanelProps) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 340,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: 'var(--ai-card-bg-raised)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ ...AI_TYPOGRAPHY['@ai-card-title'], color: 'var(--ai-ds-text)' }}>Workstream Control</span>
        <span style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)' }}>{pct}% complete</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--ai-track-bg)' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: AI.color.brand, transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Step stepper */}
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
          {steps.map((step, i) => {
            const isCurrent = i === currentStep;
            const isDone = step.complete;
            const isFuture = !isDone && !isCurrent;

            return (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  {/* Circle */}
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isDone ? AI.color.brand : isCurrent ? 'var(--ai-brand-surface)' : 'transparent',
                    border: `2px solid ${isDone ? AI.color.brand : isCurrent ? AI.color.brand : AI.color.border.default}`,
                    fontSize: 12,
                    color: isDone ? '#fff' : isCurrent ? AI.color.brand : 'var(--ai-btn-disabled-text)',
                    fontWeight: 600,
                  }}>
                    {isDone ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {/* Label */}
                  <span style={{
                    fontSize: 12, color: isFuture ? 'var(--ai-btn-disabled-text)' : 'var(--ai-ds-text)',
                    maxWidth: 60, textAlign: 'center', lineHeight: 1.3,
                    fontWeight: isCurrent ? 600 : 400,
                  }}>
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div style={{
                    height: 2, flex: 1, minWidth: 16,
                    background: steps[i + 1].complete || i < currentStep ? AI.color.brand : AI.color.border.default,
                    margin: '0 4px', marginBottom: 18, transition: 'background 0.3s',
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Checkpoint note */}
      {checkpointNote && (
        <div style={{
          margin: '0 18px 14px',
          padding: '8px 12px',
          background: 'var(--ai-card-bg-raised)',
          border: '1px solid var(--ai-card-border)',
          borderRadius: AI.radius.xs,
          ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-text)',
          display: 'flex', alignItems: 'flex-start', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
            <circle cx="6" cy="6" r="5" stroke={AI.color.brand} strokeWidth="1.2" fill="none"/>
            <path d="M6 4v3M6 8.5v.5" stroke={AI.color.brand} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {checkpointNote}
        </div>
      )}

      {/* AIControlBar */}
      <div style={{ padding: '0 18px 14px' }}>
        <AIControlBar
          state={controlState}
          onPause={onPause}
          onResume={onResume}
          onCancel={onCancel}
          onRedirect={onRedirect}
          onCancelConfirm={onCancelConfirm}
        />
      </div>

      {/* Extra actions */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid var(--ai-card-border)',
        display: 'flex', gap: 8,
        background: 'var(--ai-card-bg-raised)',
      }}>
        <button onClick={onRollback} style={BTN_SM}>↩ Rollback</button>
        <button onClick={onEscalate} style={{
          ...BTN_SM,
          color: AI.color.signal.strong, borderColor: AI.color.signal.default,
          background: AI.color.signal.subtle,
        }}>
          Escalate
        </button>
      </div>
    </div>
  );
}

export default AIWorkstreamControlPanel;
