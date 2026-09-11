import React, { useState } from 'react';
import { AI, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type ControlBarState = 'running' | 'paused' | 'redirect-available' | 'cancel-confirm' | 'saved-progress';

export interface AIControlBarProps {
  state: ControlBarState;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onRedirect?: () => void;
  onCancelConfirm?: () => void;
  label?: string;
}

const BASE_BTN: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '5px 12px',
  borderRadius: AI.radius.sm,
  border: '1px solid transparent',
  fontFamily: '"Open Sans", sans-serif',
  ...AI_TYPOGRAPHY['@zsai-caption-1'],
  cursor: 'pointer',
};

const PRIMARY_BTN: React.CSSProperties = {
  ...BASE_BTN,
  background: AI.color.brand,
  color: '#fff',
  border: `1px solid ${AI.color.brand}`,
};

const GHOST_BTN: React.CSSProperties = {
  ...BASE_BTN,
  background: 'transparent',
  color: 'var(--ai-zds-helper)',
  border: '1px solid var(--ai-btn-outline-border)',
};

const DANGER_BTN: React.CSSProperties = {
  ...BASE_BTN,
  background: 'var(--ai-status-error-bg)',
  color: 'var(--ai-status-error-text)',
  border: '1px solid var(--ai-status-error-border)',
};

const SIGNAL_BTN: React.CSSProperties = {
  ...BASE_BTN,
  background: AI.color.signal.surface,
  color: AI.color.signal.strong,
  border: `1px solid ${AI.color.signal.default}`,
};

function PauseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <rect x="1.5" y="1" width="2.5" height="8" rx="0.5"/>
      <rect x="6" y="1" width="2.5" height="8" rx="0.5"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <path d="M2 1.5L8.5 5L2 8.5V1.5Z"/>
    </svg>
  );
}

function RedirectIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M1 5h6M5 2.5L7.5 5 5 7.5"/>
      <path d="M7.5 2V1h1.5v8H7.5V9" strokeDasharray="2 1.5"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function AIControlBar({ state, onPause, onResume, onCancel, onRedirect, onCancelConfirm, label }: AIControlBarProps) {
  const [hoverPrimary, setHoverPrimary] = useState(false);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: AI.radius.md,
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: 12,
            color: 'var(--ai-zds-helper)',
            marginRight: 4,
          }}
        >
          {label}
        </span>
      )}

      {state === 'running' && (
        <>
          <button
            style={{
              ...PRIMARY_BTN,
              background: hoverPrimary ? AI.color.action.primaryHover : AI.color.brand,
            }}
            onMouseEnter={() => setHoverPrimary(true)}
            onMouseLeave={() => setHoverPrimary(false)}
            onClick={onPause}
          >
            <PauseIcon /> Pause
          </button>
          <button style={GHOST_BTN} onClick={onCancel}>Cancel</button>
        </>
      )}

      {state === 'paused' && (
        <>
          <button
            style={{
              ...PRIMARY_BTN,
              background: hoverPrimary ? AI.color.action.primaryHover : AI.color.brand,
            }}
            onMouseEnter={() => setHoverPrimary(true)}
            onMouseLeave={() => setHoverPrimary(false)}
            onClick={onResume}
          >
            <PlayIcon /> Resume
          </button>
          <button style={GHOST_BTN} onClick={onCancel}>Cancel</button>
        </>
      )}

      {state === 'redirect-available' && (
        <>
          <button style={SIGNAL_BTN} onClick={onRedirect}>
            <RedirectIcon /> Redirect
          </button>
          <button
            style={{
              ...PRIMARY_BTN,
              background: hoverPrimary ? AI.color.action.primaryHover : AI.color.brand,
            }}
            onMouseEnter={() => setHoverPrimary(true)}
            onMouseLeave={() => setHoverPrimary(false)}
            onClick={onResume}
          >
            Continue
          </button>
          <button style={GHOST_BTN} onClick={onCancel}>Cancel</button>
        </>
      )}

      {state === 'cancel-confirm' && (
        <>
          <span style={{ fontFamily: '"Open Sans", sans-serif', fontSize: 12, color: 'var(--ai-zds-text)' }}>
            Confirm cancel?
          </span>
          <button style={DANGER_BTN} onClick={onCancelConfirm}>Yes, cancel</button>
          <button style={GHOST_BTN} onClick={onResume}>Keep running</button>
        </>
      )}

      {state === 'saved-progress' && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: '"Open Sans", sans-serif',
            fontSize: 12,
            color: '#2E7D32',
          }}
        >
          <CheckIcon />
          Progress saved
        </span>
      )}
    </div>
  );
}

export default AIControlBar;
