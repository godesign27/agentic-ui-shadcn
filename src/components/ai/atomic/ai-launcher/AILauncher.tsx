/**
 * AILauncher — preferred AI Assisted entry point.
 *
 * Two forms:
 *   - 'avatar-chat'  (default): pill with ZAIDYN avatar + "Chat" label
 *   - 'avatar-only'           : compact circular button, avatar only
 */

import React, { useRef, useState } from 'react';
import { F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar } from '../ai-avatar/AIAvatar';

export type LauncherVariant = 'avatar-chat' | 'avatar-only';
export type LauncherSurface = 'dark' | 'light' | 'brand';
export type AILauncherVariant = LauncherVariant;
export type AILauncherSurface = LauncherSurface;

export interface AILauncherProps {
  variant?: LauncherVariant;
  /** Surface tone. `dark` = near-black pill (default). `light` = white pill. `brand` = ZSAI blue. */
  surface?: LauncherSurface;
  active?: boolean;
  unread?: boolean;
  unreadCount?: number;
  loading?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  highContrast?: boolean;
  tooltipLabel?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const T_DARK = {
  surface: '#1A1628',
  surfaceHover: '#2F2C3C',
  surfacePressed: '#0E0B1C',
  surfaceActive: '#2F2C3C',
  surfaceDisabled: 'rgba(26,22,40,0.30)',
  border: 'transparent',
  borderActive: 'rgba(255,255,255,0.18)',
  label: '#FFFFFF',
  labelDisabled: 'rgba(255,255,255,0.55)',
  spinnerTrack: 'rgba(255,255,255,0.25)',
  spinnerBar: '#FFFFFF',
  badgeRing: '#FFFFFF',
  ring: '#4D60E6',
  badge: '#4D60E6',
  shadowRest: '0 1px 2px rgba(26,22,40,0.18), 0 2px 8px rgba(26,22,40,0.10)',
  shadowHover: '0 2px 4px rgba(26,22,40,0.22), 0 6px 16px rgba(26,22,40,0.14)',
  radius: { pill: 100, circle: '50%' },
} as const;

const T_LIGHT = {
  surface: '#FFFFFF',
  surfaceHover: '#F4F3F3',
  surfacePressed: '#ECEBED',
  surfaceActive: '#F4F3F3',
  surfaceDisabled: 'rgba(255,255,255,0.55)',
  border: 'rgba(26,22,40,0.16)',
  borderActive: 'rgba(77, 96, 230,0.45)',
  label: '#1A1628',
  labelDisabled: 'rgba(26,22,40,0.40)',
  spinnerTrack: 'rgba(26,22,40,0.15)',
  spinnerBar: '#4D60E6',
  badgeRing: '#FFFFFF',
  ring: '#4D60E6',
  badge: '#4D60E6',
  shadowRest: '0 1px 2px rgba(26,22,40,0.06), 0 2px 8px rgba(26,22,40,0.06)',
  shadowHover: '0 2px 4px rgba(26,22,40,0.10), 0 6px 16px rgba(26,22,40,0.08)',
  radius: { pill: 100, circle: '50%' },
} as const;

const T_BRAND = {
  surface: '#4D60E6',
  surfaceHover: '#4456E6',
  surfacePressed: '#3A4ACF',
  surfaceActive: '#4456E6',
  surfaceDisabled: 'rgba(77, 96, 230,0.45)',
  border: 'transparent',
  borderActive: 'rgba(255,255,255,0.32)',
  label: '#FFFFFF',
  labelDisabled: 'rgba(255,255,255,0.65)',
  spinnerTrack: 'rgba(255,255,255,0.30)',
  spinnerBar: '#FFFFFF',
  badgeRing: '#FFFFFF',
  ring: '#FFFFFF',
  badge: '#FFC657',
  shadowRest: '0 2px 6px rgba(77, 96, 230,0.30), 0 4px 14px rgba(77, 96, 230,0.22)',
  shadowHover: '0 3px 8px rgba(77, 96, 230,0.38), 0 8px 22px rgba(77, 96, 230,0.28)',
  radius: { pill: 100, circle: '50%' },
} as const;

function LoadingRing({
  size = 14,
  trackColor = 'rgba(255,255,255,0.25)',
  barColor = '#FFFFFF',
}: {
  size?: number;
  trackColor?: string;
  barColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      aria-hidden="true"
      data-ai-launcher-spin
      style={{ display: 'inline-block', animation: 'ai-launcher-spin 0.9s linear infinite' }}
    >
      <circle cx="7" cy="7" r="5.5" stroke={trackColor} strokeWidth="1.5" fill="none" />
      <path d="M7 1.5 A 5.5 5.5 0 0 1 12.5 7" stroke={barColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LauncherStyles() {
  return (
    <style>{`
      @keyframes ai-launcher-spin { to { transform: rotate(360deg); } }
      @keyframes ai-launcher-tooltip-in { from { opacity: 0; transform: translate(-50%, -2px); } to { opacity: 1; transform: translate(-50%, 0); } }
      @media (prefers-reduced-motion: reduce) {
        [data-ai-launcher] { transition: none !important; }
        [data-ai-launcher-spin] { animation: none !important; }
      }
    `}</style>
  );
}

export function AILauncher({
  variant = 'avatar-chat',
  surface: surfaceTone = 'dark',
  active = false,
  unread = false,
  unreadCount,
  loading = false,
  disabled = false,
  disabledReason,
  tooltipLabel = 'Open ZAIDYN Agent',
  ariaLabel = 'Open ZAIDYN Agent chat',
  onClick,
}: AILauncherProps) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const isOnly = variant === 'avatar-only';
  const showTip = isOnly || focus;
  const T = surfaceTone === 'light' ? T_LIGHT : surfaceTone === 'brand' ? T_BRAND : T_DARK;

  const surface = disabled
    ? T.surfaceDisabled
    : pressed
      ? T.surfacePressed
      : hover
        ? T.surfaceHover
        : active
          ? T.surfaceActive
          : T.surface;

  const labelColor = disabled ? T.labelDisabled : T.label;

  const base: React.CSSProperties = {
    fontFamily: F,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isOnly ? 0 : 8,
    padding: isOnly ? 0 : '6px 14px 6px 6px',
    width: isOnly ? 36 : undefined,
    height: 36,
    background: surface,
    color: labelColor,
    border: active ? `1px solid ${T.borderActive}` : `1px solid ${T.border}`,
    borderRadius: isOnly ? T.radius.circle : T.radius.pill,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: hover && !disabled ? T.shadowHover : T.shadowRest,
    outline: focus ? `2px solid ${T.ring}` : 'none',
    outlineOffset: focus ? 2 : 0,
    position: 'relative',
    transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.08s ease',
    transform: pressed && !disabled ? 'translateY(0.5px)' : 'none',
    userSelect: 'none',
    ...AI_TYPOGRAPHY['@zsai-button-label'],
    letterSpacing: '-0.1px',
    WebkitFontSmoothing: 'antialiased',
  };

  return (
    <>
      <LauncherStyles />
      <button
        ref={ref}
        type="button"
        data-ai-launcher
        aria-label={ariaLabel}
        aria-pressed={active || undefined}
        aria-busy={loading || undefined}
        aria-disabled={disabled || undefined}
        title={isOnly ? tooltipLabel : undefined}
        disabled={disabled}
        style={base}
        onMouseEnter={() => {
          setHover(true);
          setTipOpen(true);
        }}
        onMouseLeave={() => {
          setHover(false);
          setPressed(false);
          setTipOpen(false);
        }}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onFocus={() => {
          setFocus(true);
          setTipOpen(true);
        }}
        onBlur={() => {
          setFocus(false);
          setTipOpen(false);
        }}
        onClick={() => {
          if (!disabled && !loading) onClick?.();
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            flexShrink: 0,
            opacity: disabled ? 0.55 : 1,
          }}
        >
          {loading ? <LoadingRing trackColor={T.spinnerTrack} barColor={T.spinnerBar} /> : <AIAvatar size={28} />}
        </span>

        {!isOnly && <span style={{ lineHeight: 1, paddingRight: 2 }}>Chat</span>}

        {unread && !disabled && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              minWidth: typeof unreadCount === 'number' && unreadCount > 0 ? 16 : 10,
              height: typeof unreadCount === 'number' && unreadCount > 0 ? 16 : 10,
              padding: typeof unreadCount === 'number' && unreadCount > 0 ? '0 4px' : 0,
              borderRadius: 100,
              background: T.badge,
              border: `2px solid ${T.badgeRing}`,
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            {typeof unreadCount === 'number' && unreadCount > 0 ? unreadCount : ''}
          </span>
        )}
      </button>

      {showTip && tipOpen && !disabled && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            background: '#1A1628',
            color: '#FAFAFA',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12,
            fontFamily: F,
            pointerEvents: 'none',
            transform: 'translate(8px, -34px)',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(26,22,40,0.18)',
            animation: 'ai-launcher-tooltip-in 0.12s ease',
          }}
        >
          {disabled && disabledReason ? disabledReason : tooltipLabel}
        </span>
      )}
    </>
  );
}

export default AILauncher;
