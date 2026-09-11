/**
 * ZdsSpinner
 *
 * Canonical animated loading spinner translated from the ZDS source.
 *
 * Source files (zsainc/9904PD0068_zds-ai-mirror):
 *   src/spinner/spinner.less
 *   src/spinner/spinner.createSpinner.m.js
 *   src/spinner/ZDS-SPINNER.agent.md
 */

import React from 'react';

export const ZDS_ZdsSpinner_SOURCE = {
  githubFiles: [
    'src/spinner/spinner.less',
    'src/spinner/spinner.createSpinner.m.js',
    'src/spinner/ZDS-SPINNER.agent.md',
  ],
  lessVariableMappings: {
    '--zs-background-neutral-extrabold': 'var(--headline-text-color)',
    '--zs-background-default':           'var(--background)',
    '--zs-icon-primary-default':         'var(--primary)',
    '@zs-interactive-primary-color':     'var(--primary)',
  },
} as const;

const VALID_SIZES = ['48px', '32px', '24px', '20px', '16px', '14px', '12px', '8px'] as const;
type SpinnerSize = typeof VALID_SIZES[number];

export interface ZdsSpinnerProps {
  size?: SpinnerSize;
  light?: boolean;
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

const SIZE_PX: Record<SpinnerSize, number> = {
  '48px': 48, '32px': 32, '24px': 24, '20px': 20,
  '16px': 16, '14px': 14, '12px': 12, '8px':  8,
};

const KEYFRAME_ID = 'zds-spinner-keyframes';
const KEYFRAME_CSS = `
@keyframes zds-spinner-rotate {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .zds-spinner__arc-animated {
    animation: none !important;
  }
}
`;

function useSpinnerStyles() {
  React.useEffect(() => {
    if (document.getElementById(KEYFRAME_ID)) return;
    const style = document.createElement('style');
    style.id = KEYFRAME_ID;
    style.textContent = KEYFRAME_CSS;
    document.head.appendChild(style);
  }, []);
}

export function ZdsSpinner({
  size  = '24px',
  light = false,
  label = 'Loading',
  style,
  className,
}: ZdsSpinnerProps) {
  useSpinnerStyles();
  const px = SIZE_PX[size];
  const ringColor = light ? 'var(--background)' : 'var(--headline-text-color)';

  return (
    <div
      role="status"
      aria-label={label}
      className={className}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: `${px}px`, height: `${px}px`, flexShrink: 0, ...style }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: ringColor, opacity: 0.5, pointerEvents: 'none' }}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
      <div aria-hidden="true" className="zds-spinner__arc-animated" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--primary)', animation: 'zds-spinner-rotate 1s linear infinite', transformOrigin: '50% 50%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
          <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M16 2 A14 14 0 0 1 30 16" />
        </svg>
      </div>
    </div>
  );
}
