import React from 'react';

/**
 * DS Badge Component
 * =====================
 * Source of Truth: upstream AI component source → src/badge/
 *
 * Badge is a compact numeric or label indicator used to display counts,
 * statuses, or short metadata. It supports semantic color variants and sizes.
 *
 * DSBadgeText implements the `zs-badge-text` variant from badge.less —
 * a pill label badge used for metadata/type tags (non-interactive).
 * Gray/neutral variant maps zs-badge-text.zs-neutral tokens.
 */

export const DS_BADGE_SOURCE = {
  github: 'src/badge/',
  files: ['badge.less', 'badge.html', 'badge.index.m.js'],
  mappings: {
    // Counter badge
    '--color-text-inverse':               'Badge label text',
    '--color-background-extra-bold':       'Neutral counter badge bg',
    '--color-background-info-bold':        'Info badge bg',
    '--color-background-error-bold':       'Error badge bg',
    '--color-background-success-bold':     'Success badge bg',
    '--color-background-warning-bold':     'Warning badge bg',
    // Text badge (zs-badge-text)
    '--surface-color-2':                  'Neutral text-badge bg  (zs-neutral-background-color)',
    '--helper-text-color':                'Neutral text-badge text (zs-neutral-color)',
  }
};

export type DSBadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type DSBadgeSize = 'default' | 'small';

// ── Counter badge (circular pill, numeric) ────────────────────────────────────
export interface DSBadgeProps {
  variant?: DSBadgeVariant;
  size?: DSBadgeSize;
  label: string | number;
  maxCount?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function DSBadge({
  variant = 'neutral',
  size = 'default',
  label,
  maxCount = 99,
  style,
  className,
}: DSBadgeProps) {
  // Determine display label based on maxCount
  let displayLabel = String(label);
  if (typeof label === 'number' && label > maxCount) {
    displayLabel = `${maxCount}+`;
  }

  // Map variant to background token
  const bgMap: Record<DSBadgeVariant, string> = {
    neutral: 'var(--color-background-extra-bold, var(--background-extra-bold, #1a1628))',
    info: 'var(--color-background-info-bold, var(--info-bold, #1b24aa))',
    success: 'var(--color-background-success-bold, var(--success-bold, #0a6e5e))',
    warning: 'var(--color-background-warning-bold, var(--warning-bold, #8a640c))',
    error: 'var(--color-background-error-bold, var(--error-bold, #b21111))',
  };

  // Map size to styling
  const isSmall = size === 'small';
  const sizeStyles: React.CSSProperties = {
    height: isSmall ? '16px' : '20px',
    minWidth: isSmall ? '16px' : '20px',
    fontSize: isSmall ? '10px' : '12px',
    borderRadius: isSmall ? '8px' : '10px',
    padding: isSmall ? '0 4px' : '0 6px',
  };

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgMap[variant],
        color: 'var(--color-text-inverse, var(--text-inverse, #fafafa))',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1,
        ...sizeStyles,
        ...style,
      }}
    >
      {displayLabel}
    </span>
  );
}

// ── Text badge (zs-badge-text) ────────────────────────────────────────────────
// Pill label badge for metadata/type tags. Non-interactive.
// Neutral (gray) variant: background = --surface-color-2, text = --helper-text-color
// Source: badge.less .zs-badge-text + .zs-neutral modifier
export interface DSBadgeTextProps {
  label: string;
  variant?: DSBadgeVariant;
  size?: DSBadgeSize;
  style?: React.CSSProperties;
}

export function DSBadgeText({
  label,
  variant = 'neutral',
  size = 'default',
  style,
}: DSBadgeTextProps) {
  const isSmall = size === 'small';

  // Color pairs per variant — mapped from badge.less token names → CSS vars
  const colorMap: Record<DSBadgeVariant, { bg: string; color: string }> = {
    // zs-badge-text.zs-neutral → @zs-neutral-background-color / @zs-neutral-color
    neutral: {
      bg:    'var(--surface-color-2, #F4F3F3)',
      color: 'var(--helper-text-color)',
    },
    info: {
      bg:    'var(--color-background-info-bold, #1b24aa)',
      color: 'var(--color-text-inverse, #fafafa)',
    },
    success: {
      bg:    'var(--color-background-success-bold, #0a6e5e)',
      color: 'var(--color-text-inverse, #fafafa)',
    },
    warning: {
      bg:    'var(--color-background-warning-bold, #8a640c)',
      color: 'var(--color-text-inverse, #fafafa)',
    },
    error: {
      bg:    'var(--color-background-error-bold, #b21111)',
      color: 'var(--color-text-inverse, #fafafa)',
    },
  };

  const { bg, color } = colorMap[variant];

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 'var(--font-weight-semi-bold)',
        fontSize: isSmall ? '9px' : '10px',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        lineHeight: '1.35',
        whiteSpace: 'nowrap',
        borderRadius: '20px',
        padding: isSmall ? '2px 7px' : '3px 8px',
        background: bg,
        color: color,
        ...style,
      }}
    >
      {label}
    </span>
  );
}
