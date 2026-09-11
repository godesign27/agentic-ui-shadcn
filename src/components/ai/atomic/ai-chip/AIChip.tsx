import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// AIChip — the unified "chip" atom for the AI design system.
//
// Consolidates four formerly separate chip atoms into a single component,
// discriminated on `kind`. Each former component's sub-taxonomy is preserved
// verbatim so output stays pixel-identical:
//
//   kind="memory"  — memory-state pill (was AIChipMemory).  variant: MemoryVariant
//   kind="brief"   — brief-status pill (was AIChipBrief).   status:  BriefChipStatus
//   kind="status"  — outcome status pill (was AIStatusPill). tone:   AIStatusPillTone
//   kind="handoff" — agent handoff pill (was AIChipHandoff). direction: HandoffDirection
//                    (structurally unique: two labels + inline arrow)
//
// The four sub-variant types are re-exported from this module.

// ---------------------------------------------------------------------------
// Sub-variant types
// ---------------------------------------------------------------------------

export type MemoryVariant = 'using-memory' | 'previous-context' | 'memory-available' | 'memory-ignored' | 'memory-removed';
export type BriefChipStatus = 'default' | 'ready' | 'missing' | 'edited' | 'waiting-approval' | 'running';
export type AIStatusPillTone = 'success' | 'warning' | 'critical' | 'neutral' | 'info';
export type HandoffDirection = 'agent-to-agent' | 'agent-to-human' | 'human-to-agent' | 'system-to-agent' | 'failed';

// kind="tag" — the AI-branded counterpart of the standard DS Flat/Rounded Tag.
// Mirrors the DS Tag's full variant model (semantic state, size, interaction
// state, dismissible, leading icon, flat/rounded shape) so the two components
// reach variant parity. The NEUTRAL state is re-skinned in the AI brand surface
// theme (AI_RAMP blue/purple ramp); the four semantic states (info/error/success/
// warning) keep the DS semantic hues so meaning stays consistent across systems.
export type TagChipState = 'neutral' | 'info' | 'error' | 'success' | 'warning' | 'disabled';
export type TagChipSize = 'normal' | 'small' | 'x-small';
export type TagChipInteraction = 'default' | 'hover' | 'focus' | 'active' | 'active-hover' | 'active-focus';
export type TagChipShape = 'flat' | 'rounded';

// ---------------------------------------------------------------------------
// Props — discriminated union on `kind`
// ---------------------------------------------------------------------------

type ChipBase = { size?: 'sm' | 'md' };

// Shared glyph-size scale for the sm/md chips (memory, brief, status, handoff).
// Kept consistent across all four kinds so leading icons read at the same size;
// aligns with the tag kind's small/x-small icon boxes (14 / 12) for cross-kind
// cohesion. Indicator DOTS are intentionally excluded — they stay dot-sized.
const CHIP_ICON_PX: Record<'sm' | 'md', number> = { sm: 12, md: 14 };

export type AIChipProps =
  | (ChipBase & { kind: 'memory'; variant: MemoryVariant; label: string })
  | (ChipBase & {
      kind: 'brief';
      status?: BriefChipStatus;
      label: string;
      accentColor?: string;
      accentBg?: string;
      noDot?: boolean;
      icon?: string | React.ReactNode;
    })
  | (ChipBase & { kind: 'status'; label: string; tone?: AIStatusPillTone; showIndicator?: boolean; onDark?: boolean })
  | (ChipBase & { kind: 'handoff'; direction: HandoffDirection; fromLabel: string; toLabel: string })
  | {
      kind: 'tag';
      label?: string;
      state?: TagChipState;
      tagSize?: TagChipSize;
      interaction?: TagChipInteraction;
      dismissible?: boolean;
      leftIcon?: boolean;
      shape?: TagChipShape;
      // Custom data-viz color (parity with the DS "Custom data color" tag).
      // When set, the tag renders a tinted fill with a coloured border/label and
      // a filled-circle dismiss — overriding the semantic `state` palette.
      dataColor?: string;
      dataTint?: string;
    };

// ---------------------------------------------------------------------------
// kind="memory"
// ---------------------------------------------------------------------------

const MEMORY_CONFIG: Record<MemoryVariant, { bg: string; border: string; text: string; strikethrough: boolean; opacity: number }> = {
  'using-memory':     { bg: 'var(--ai-card-bg-raised)',   border: 'var(--ai-card-border)',     text: 'var(--ai-ds-text)',  strikethrough: false, opacity: 1    },
  'previous-context': { bg: 'var(--ai-card-bg-raised)',   border: 'var(--ai-card-border)',     text: 'var(--ai-ds-text)', strikethrough: false, opacity: 1    },
  'memory-available': { bg: 'var(--ai-brand-surface)',    border: 'var(--ai-brand-border)',    text: 'var(--ai-brand-text)', strikethrough: false, opacity: 1   },
  'memory-ignored':   { bg: 'var(--ai-confidence-track)', border: 'var(--ai-card-border)',    text: 'var(--ai-ds-helper)', strikethrough: false, opacity: 0.7 },
  'memory-removed':   { bg: 'rgba(231,76,60,0.08)',       border: 'rgba(231,76,60,0.25)',      text: '#E74C3C',             strikethrough: true,  opacity: 0.7  },
};

function MemoryIcon({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1.2"/>
      <path d="M4 3V2a2 2 0 0 1 4 0v1" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="4.5" cy="6.5" r="0.9" fill={color}/>
      <circle cx="7.5" cy="6.5" r="0.9" fill={color}/>
    </svg>
  );
}

function MemoryChip({ variant, label, size = 'md' }: { variant: MemoryVariant; label: string; size?: 'sm' | 'md' }) {
  const cfg = MEMORY_CONFIG[variant];
  const sm = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sm ? 4 : 5,
        padding: sm ? '2px 8px' : '3px 10px',
        borderRadius: AI.radius.full,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        fontFamily: '"Open Sans", sans-serif',
        ...(sm ? { fontSize: 12, fontWeight: 500 as const, lineHeight: 1.4 } : AI_TYPOGRAPHY['@ai-caption-1']),
        color: cfg.text,
        opacity: cfg.opacity,
        whiteSpace: 'nowrap' as const,
      }}
    >
      <MemoryIcon color={cfg.text} size={CHIP_ICON_PX[size]} />
      <span style={{ textDecoration: cfg.strikethrough ? 'line-through' : 'none' }}>
        {label}
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// kind="brief"
// ---------------------------------------------------------------------------

// Tone-on-tone palette per status. The dot, text, and border all sit in the
// SAME hue family — only the value (lightness) varies. All six statuses use
// explicit light tone-on-tone hex (NOT theme CSS variables) so color stays
// consistent across statuses and doesn't flip between light/dark surfaces.
const STATUS_CONFIG: Record<BriefChipStatus, { dot: string; text: string; bg: string; border: string; label: string }> = {
  'default':          { dot: '#57545E', text: '#57545E', bg: '#F2F1F4', border: '#E0DEE6', label: 'Default'          },
  'ready':            { dot: '#1F6B40', text: '#1F6B40', bg: '#EAF4EE', border: '#CDE3D5', label: 'Ready'            },
  'missing':          { dot: '#9A3412', text: '#9A3412', bg: '#FBEBDE', border: '#EFD1B7', label: 'Missing'          },
  'edited':           { dot: '#5B4BC4', text: '#5B4BC4', bg: '#EFEDFB', border: '#D9D3F3', label: 'Edited'           },
  'waiting-approval': { dot: '#854D0E', text: '#854D0E', bg: '#FBF1DA', border: '#EAD5A6', label: 'Waiting Approval' },
  'running':          { dot: '#2F5AD0', text: '#2F5AD0', bg: '#E9EFFC', border: '#CCD9F5', label: 'Running'          },
};

function BriefChip({ status = 'default', label, size = 'md', accentColor, accentBg, noDot = false, icon }: {
  status?: BriefChipStatus; label: string; size?: 'sm' | 'md'; accentColor?: string; accentBg?: string; noDot?: boolean; icon?: string | React.ReactNode;
}) {
  const cfg = STATUS_CONFIG[status];
  const isRunning = status === 'running';
  const sm = size === 'sm';

  const textColor  = accentColor ?? cfg.text;
  const bgColor    = accentBg    ?? cfg.bg;
  const dotColor   = accentColor ?? cfg.dot;
  const borderColor = accentColor ? `${accentColor}33` : cfg.border;

  const hasIcon = icon !== undefined && icon !== null;
  const iconPx  = CHIP_ICON_PX[size];
  function renderIcon() {
    if (typeof icon === 'string') {
      const className = icon.startsWith('zs-icon-') ? `zs-icon ${icon}` : icon;
      return (
        <span
          className="zs-master-style"
          aria-hidden="true"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: iconPx, height: iconPx, flexShrink: 0, lineHeight: 0,
            color: 'inherit',
          }}
        >
          <i className={className} style={{ fontSize: iconPx, lineHeight: 1, color: 'inherit' }} />
        </span>
      );
    }
    return (
      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: iconPx, height: iconPx, flexShrink: 0, lineHeight: 0 }}>
        {icon}
      </span>
    );
  }

  return (
    <>
      {isRunning && (
        <style>{`
          @keyframes ai-brief-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.85); }
          }
          @media (prefers-reduced-motion: reduce) {
            .ai-brief-pulse { animation: none !important; }
          }
        `}</style>
      )}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: sm ? 6 : 8,
          padding: sm ? '4px 10px' : '5px 12px',
          borderRadius: AI.radius.full,
          background: bgColor,
          border: `1px solid ${borderColor}`,
          fontFamily: '"Open Sans", sans-serif',
          ...(sm ? { fontSize: 12, fontWeight: 500 as const, lineHeight: 1.4 } : AI_TYPOGRAPHY['@ai-caption-1']),
          color: textColor,
          whiteSpace: 'nowrap' as const,
        }}
      >
        {hasIcon
          ? renderIcon()
          : !noDot && (
              <span
                className={isRunning ? 'ai-brief-pulse' : undefined}
                style={{
                  width: sm ? 6 : 7,
                  height: sm ? 6 : 7,
                  borderRadius: '50%',
                  background: dotColor,
                  flexShrink: 0,
                  animation: isRunning ? 'ai-brief-pulse 1.4s ease-in-out infinite' : undefined,
                }}
              />
            )}
        {label}
      </span>
    </>
  );
}

// ---------------------------------------------------------------------------
// kind="status"
// ---------------------------------------------------------------------------

function CheckGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3.5 6 L5.3 7.8 L8.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 1.5 L11 10.5 H1 Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M6 5 V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="9" r="0.6" fill="currentColor" />
    </svg>
  );
}

function DotGlyph() {
  return (
    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0, display: 'inline-block' }} />
  );
}

// Per-tone glyph type; rendered size-aware inside StatusPill so the icon scales
// consistently with the other chip kinds (dots stay dot-sized).
const TONE_GLYPH: Record<AIStatusPillTone, 'check' | 'alert' | 'dot'> = {
  success: 'check', warning: 'alert', critical: 'alert', neutral: 'dot', info: 'dot',
};

const TONE: Record<AIStatusPillTone, { bg: string; border: string; text: string }> = {
  success:  { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40' },
  warning:  { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E' },
  critical: { bg: 'var(--ai-status-error-bg)', border: 'var(--ai-status-error-border)', text: 'var(--ai-status-error-text)' },
  neutral:  { bg: 'var(--ai-card-bg-raised)', border: 'var(--ai-card-border)', text: 'var(--ai-ds-helper)' },
  info:     { bg: 'var(--ai-brand-surface)', border: 'var(--ai-brand-border)', text: 'var(--ai-brand-text)' },
};

const TONE_DARK: Record<AIStatusPillTone, { bg: string; border: string; text: string }> = {
  success:  { bg: 'rgba(74,222,128,0.14)',  border: 'rgba(74,222,128,0.40)',  text: '#4ADE80'                },
  warning:  { bg: 'rgba(250,204,21,0.14)',  border: 'rgba(250,204,21,0.40)',  text: '#FACC15'                },
  critical: { bg: 'rgba(248,113,113,0.16)', border: 'rgba(248,113,113,0.42)', text: '#F87171'                },
  neutral:  { bg: 'rgba(255,255,255,0.10)', border: 'rgba(255,255,255,0.22)', text: 'rgba(255,255,255,0.85)' },
  info:     { bg: 'rgba(120,140,255,0.16)', border: 'rgba(120,140,255,0.42)', text: '#A5B4FF'                },
};

function ToneGlyph({ tone, size }: { tone: AIStatusPillTone; size: number }) {
  const g = TONE_GLYPH[tone];
  if (g === 'check') return <CheckGlyph size={size} />;
  if (g === 'alert') return <AlertGlyph size={size} />;
  return <DotGlyph />;
}

function StatusPill({ label, tone = 'neutral', size = 'md', showIndicator = true, onDark = false }: {
  label: string; tone?: AIStatusPillTone; size?: 'sm' | 'md'; showIndicator?: boolean; onDark?: boolean;
}) {
  const cfg = (onDark ? TONE_DARK : TONE)[tone];
  const sm = size === 'sm';
  const iconPx = CHIP_ICON_PX[size];
  return (
    <span
      role="status"
      aria-label={`${tone}: ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showIndicator ? 4 : 0,
        padding: sm ? '2px 10px' : '4px 12px',
        borderRadius: 999,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        fontFamily: F,
        fontSize: sm ? 12 : 14,
        fontWeight: 600,
        lineHeight: 1.3,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {showIndicator && <ToneGlyph tone={tone} size={iconPx} />}
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// kind="handoff"
// ---------------------------------------------------------------------------

const DIR_CONFIG: Record<HandoffDirection, { bg: string; border: string; text: string; arrowColor: string; fromIcon: string; toIcon: string }> = {
  'agent-to-agent':  { bg: 'var(--ai-brand-surface)',      border: 'var(--ai-brand-border)',     text: 'var(--ai-brand-text)',         arrowColor: AI.color.brand,           fromIcon: '⬡', toIcon: '⬡' },
  'agent-to-human':  { bg: 'var(--ai-signal-surface)',     border: 'var(--ai-signal-border)',    text: AI.color.signal.strong,         arrowColor: AI.color.signal.default,  fromIcon: '⬡', toIcon: '◉' },
  'human-to-agent':  { bg: 'var(--ai-status-success-bg)',  border: 'var(--ai-status-success-border)', text: 'var(--ai-status-success-text, #1A8744)', arrowColor: 'var(--ai-status-success-text, #1A8744)', fromIcon: '◉', toIcon: '⬡' },
  'system-to-agent': { bg: 'var(--ai-status-purple-bg)',   border: 'var(--ai-status-purple-border)',  text: 'var(--ai-status-purple-text, #6A1B9A)',  arrowColor: 'var(--ai-status-purple-text, #6A1B9A)',  fromIcon: '⊞', toIcon: '⬡' },
  'failed':          { bg: 'var(--ai-status-error-bg)',    border: 'var(--ai-status-error-border)',   text: 'var(--ai-status-error-text, #C0392B)',   arrowColor: 'var(--ai-status-error-text, #C0392B)',   fromIcon: '⬡', toIcon: '⬡' },
};

function HandoffChip({ direction, fromLabel, toLabel, size = 'md' }: {
  direction: HandoffDirection; fromLabel: string; toLabel: string; size?: 'sm' | 'md';
}) {
  const cfg = DIR_CONFIG[direction];
  const sm = size === 'sm';
  const isFailed = direction === 'failed';

  return (
    <span
      role="status"
      aria-label={`Handoff from ${fromLabel} to ${toLabel}${isFailed ? ' (failed)' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sm ? 4 : 6,
        padding: sm ? '4px 8px' : '7px 10px',
        borderRadius: AI.radius.full,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        fontFamily: '"Open Sans", sans-serif',
        ...(sm ? { fontSize: 12, fontWeight: 500 as const, lineHeight: 1.4 } : AI_TYPOGRAPHY['@ai-caption-1']),
        color: cfg.text,
        whiteSpace: 'nowrap' as const,
      }}
    >
      <span style={{ fontSize: CHIP_ICON_PX[size], lineHeight: 1, opacity: 0.7 }}>{cfg.fromIcon}</span>
      <span>{fromLabel}</span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: isFailed ? 'var(--ai-status-error-text, #C0392B)' : cfg.arrowColor,
        }}
      >
        {isFailed ? (
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2"/>
            <path d="M9 2L12 5L9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M9 2L12 5L9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span>{toLabel}</span>
      <span style={{ fontSize: CHIP_ICON_PX[size], lineHeight: 1, opacity: 0.7 }}>{cfg.toIcon}</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// kind="tag" — AI-branded DS Tag
// ---------------------------------------------------------------------------

// Per-state color contract. NEUTRAL is re-anchored on the AI brand ramp
// (AI.color.*), so the default tag reads as an AI surface. The four semantic
// states reuse the DS Tag semantic hues verbatim so meaning is consistent
// across the standard and AI systems. Disabled matches the DS faint treatment.
const AI_TAG_COLOR: Record<TagChipState, {
  border: string; hoverBorder: string; restBg: string; hoverBg: string; activeBg: string; activeHoverBg: string; text: string;
}> = {
  neutral:  { border: AI.color.border.default, hoverBorder: AI.color.border.strong, restBg: AI.color.brandSurface, hoverBg: AI.color.brandSubtle, activeBg: AI.color.action.primary, activeHoverBg: AI.color.action.primaryActive, text: AI.color.text.primary },
  info:     { border: '#1b24aa', hoverBorder: '#1b24aa', restBg: '#ffffff', hoverBg: '#eeeeff', activeBg: '#1b24aa', activeHoverBg: '#1b24aa', text: '#2f2c3c' },
  error:    { border: '#b21111', hoverBorder: '#b21111', restBg: '#ffffff', hoverBg: '#ffede9', activeBg: '#b21111', activeHoverBg: '#b21111', text: '#2f2c3c' },
  success:  { border: '#0a6e5e', hoverBorder: '#0a6e5e', restBg: '#ffffff', hoverBg: '#f1feff', activeBg: '#0a6e5e', activeHoverBg: '#0a6e5e', text: '#2f2c3c' },
  warning:  { border: '#8a640c', hoverBorder: '#8a640c', restBg: '#ffffff', hoverBg: '#fff9f1', activeBg: '#8a640c', activeHoverBg: '#8a640c', text: '#2f2c3c' },
  disabled: { border: '#dedcde', hoverBorder: '#dedcde', restBg: '#f4f3f3', hoverBg: '#f4f3f3', activeBg: '#f4f3f3', activeHoverBg: '#f4f3f3', text: '#716e79' },
};

const AI_TAG_TEXT_INVERSE = '#ffffff';
const AI_TAG_TEXT_DISABLED = '#716e79';
const AI_TAG_FOCUS = AI.color.border.focus; // #4D60E6 — AI brand focus ring

const AI_TAG_SIZE: Record<TagChipSize, { height: number; font: number; lineHeight: number; letterSpacing: number; icon: number }> = {
  normal:    { height: 40, font: 16, lineHeight: 1.5, letterSpacing: -0.144, icon: 16 },
  small:     { height: 32, font: 14, lineHeight: 1.4, letterSpacing: -0.176, icon: 14 },
  'x-small': { height: 24, font: 12, lineHeight: 1.5, letterSpacing: -0.144, icon: 12 },
};

// Canonical icon-font vectors (src/core/SVGs), inlined as 24-viewBox paths and
// scaled to the icon box — identical glyphs to the standard DS Tag.
const AI_TAG_GLOBE = 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.0043 12.8777C15.6589 12.3533 15.4097 11.9746 14.4622 12.1248C12.6717 12.409 12.4732 12.7224 12.3877 13.2375L12.3636 13.3943L12.3393 13.5597C12.2416 14.2428 12.2453 14.5012 12.5589 14.8308C13.8241 16.1582 14.582 17.115 14.8116 17.6746C14.9237 17.9484 15.2119 18.7751 15.0136 19.5927C16.2372 19.1066 17.3156 18.3332 18.1653 17.3559C18.2755 16.9821 18.3551 16.5166 18.3551 15.9518V15.8472C18.3551 14.9247 18.3551 14.504 17.7031 14.1314C17.428 13.9751 17.2227 13.881 17.0582 13.8064C16.691 13.6394 16.4479 13.5297 16.1198 13.0499C16.0807 12.9928 16.0425 12.9358 16.0043 12.8777ZM12 3.83333C9.68259 3.83333 7.59062 4.79858 6.1042 6.34896C6.28116 6.47186 6.43537 6.64453 6.54129 6.88256C6.74529 7.34029 6.74529 7.8112 6.74529 8.22764C6.74488 8.55621 6.74442 8.8672 6.84992 9.09302C6.99443 9.40134 7.6164 9.53227 8.16548 9.64736C8.36166 9.68867 8.56395 9.73083 8.74797 9.78176C9.25405 9.92233 9.64554 10.3765 9.95938 10.7412C10.0896 10.8931 10.2819 11.1163 10.3783 11.1717C10.4286 11.1356 10.59 10.9608 10.6699 10.6735C10.7307 10.4547 10.7134 10.2597 10.6239 10.1543C10.0648 9.49445 10.0952 8.2232 10.268 7.75495C10.5402 7.01606 11.3905 7.07058 12.012 7.11097C12.2438 7.12589 12.4626 7.14023 12.6257 7.11976C13.2482 7.04166 13.4396 6.09538 13.575 5.91C13.8671 5.50981 14.7607 4.9071 15.3158 4.53454C14.3025 4.08382 13.1805 3.83333 12 3.83333Z';
const AI_TAG_CLOSE = 'M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z';

function TagChipGlyph({ path, size, color }: { path: string; size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path d={path} fill={color} />
    </svg>
  );
}

// Custom Data-Color tag — parity with the DS "Custom data color" tag. Light
// tinted fill, coloured border + label, and a filled-circle dismiss button.
// Rounded (pill) shape, matching the standard DS data-color tag.
function DataColorTagChip({ label = 'Tag', color, tint, tagSize = 'normal', dismissible = true, leftIcon = false }: {
  label?: string; color: string; tint: string; tagSize?: TagChipSize; dismissible?: boolean; leftIcon?: boolean;
}) {
  const sz = AI_TAG_SIZE[tagSize];
  return (
    <span
      role="button"
      tabIndex={0}
      style={{
        boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 6,
        height: sz.height, padding: '4px 8px', maxWidth: 296, borderRadius: 100,
        background: tint, color, border: `1px solid ${color}`,
        fontFamily: F, fontSize: sz.font, fontWeight: 400, lineHeight: sz.lineHeight, letterSpacing: sz.letterSpacing,
        cursor: 'pointer', outline: 'none',
      }}>
      {leftIcon && <TagChipGlyph path={AI_TAG_GLOBE} size={sz.icon} color={color} />}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {dismissible && (
        <button aria-label={`Remove ${label} tag`} tabIndex={-1} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: sz.icon, height: sz.icon, flexShrink: 0,
          background: color, border: 'none', color: tint, borderRadius: '50%',
          cursor: 'pointer', padding: 0, outline: 'none',
        }}>
          <TagChipGlyph path={AI_TAG_CLOSE} size={sz.icon - 2} color={tint} />
        </button>
      )}
    </span>
  );
}

function TagChip({ label = 'Tag', state = 'neutral', tagSize = 'normal', interaction = 'default', dismissible = true, leftIcon = false, shape = 'flat', dataColor, dataTint }: {
  label?: string; state?: TagChipState; tagSize?: TagChipSize; interaction?: TagChipInteraction; dismissible?: boolean; leftIcon?: boolean; shape?: TagChipShape; dataColor?: string; dataTint?: string;
}) {
  // Data-color variant overrides the semantic palette entirely.
  if (dataColor) {
    return <DataColorTagChip label={label} color={dataColor} tint={dataTint ?? `${dataColor}1a`} tagSize={tagSize} dismissible={dismissible} leftIcon={leftIcon} />;
  }
  const c = AI_TAG_COLOR[state];
  const sz = AI_TAG_SIZE[tagSize];
  // Flat = AI xs radius (soft AI-brand corners); Rounded = full pill.
  const cornerRadius = shape === 'rounded' ? 100 : 6;
  const isDisabled = state === 'disabled';
  const isActive = interaction === 'active' || interaction === 'active-hover' || interaction === 'active-focus';
  const isHover = interaction === 'hover' || interaction === 'active-hover';
  const isFocus = interaction === 'focus' || interaction === 'active-focus';

  const bg = isDisabled ? c.restBg
    : isActive ? (isHover ? c.activeHoverBg : c.activeBg)
    : isHover ? c.hoverBg : c.restBg;
  const color = isDisabled ? AI_TAG_TEXT_DISABLED : isActive ? AI_TAG_TEXT_INVERSE : c.text;
  const iconColor = isDisabled ? AI_TAG_TEXT_DISABLED : isActive ? AI_TAG_TEXT_INVERSE : c.border;
  const border = isActive ? '1px solid transparent'
    : `1px solid ${isDisabled ? c.border : isHover ? c.hoverBorder : c.border}`;
  const showClose = dismissible && !isActive && !isDisabled;
  const wholeRing = interaction === 'active-focus' ? `0 0 0 2px ${AI_TAG_FOCUS}` : undefined;

  return (
    <span
      role={isDisabled ? undefined : 'button'}
      tabIndex={isDisabled ? undefined : 0}
      aria-pressed={isActive || undefined}
      aria-disabled={isDisabled || undefined}
      style={{
        position: 'relative', boxSizing: 'border-box',
        display: 'inline-flex', alignItems: 'center', gap: 4,
        height: sz.height, padding: '4px 8px', maxWidth: 296, borderRadius: cornerRadius,
        background: bg, color, border,
        fontFamily: F, fontSize: sz.font, fontWeight: 400, lineHeight: sz.lineHeight, letterSpacing: sz.letterSpacing,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: wholeRing, outline: 'none',
      }}>
      {leftIcon && <TagChipGlyph path={AI_TAG_GLOBE} size={sz.icon} color={iconColor} />}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {showClose && (
        <button aria-label={`Remove ${label} tag`} tabIndex={-1} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: sz.icon, height: sz.icon, flexShrink: 0,
          background: 'transparent', border: 'none', color: 'inherit',
          cursor: 'pointer', padding: 0, borderRadius: 2,
          boxShadow: isFocus ? `0 0 0 2px ${AI_TAG_FOCUS}` : undefined, outline: 'none',
        }}>
          <TagChipGlyph path={AI_TAG_CLOSE} size={sz.icon} color={iconColor} />
        </button>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// AIChip — dispatcher
// ---------------------------------------------------------------------------

export function AIChip(props: AIChipProps) {
  switch (props.kind) {
    case 'memory':
      return <MemoryChip variant={props.variant} label={props.label} size={props.size} />;
    case 'brief':
      return (
        <BriefChip
          status={props.status}
          label={props.label}
          size={props.size}
          accentColor={props.accentColor}
          accentBg={props.accentBg}
          noDot={props.noDot}
          icon={props.icon}
        />
      );
    case 'status':
      return <StatusPill label={props.label} tone={props.tone} size={props.size} showIndicator={props.showIndicator} onDark={props.onDark} />;
    case 'handoff':
      return <HandoffChip direction={props.direction} fromLabel={props.fromLabel} toLabel={props.toLabel} size={props.size} />;
    case 'tag':
      return (
        <TagChip
          label={props.label}
          state={props.state}
          tagSize={props.tagSize}
          interaction={props.interaction}
          dismissible={props.dismissible}
          leftIcon={props.leftIcon}
          shape={props.shape}
          dataColor={props.dataColor}
          dataTint={props.dataTint}
        />
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// AIChipTagLive — canonical tag state-variation renderer
// ---------------------------------------------------------------------------
// Mirrors the standard DS Tag's DSTagLive switch 1:1 so the AI Chip's tag
// kind reaches full state-variation parity. Each case returns a row of chips;
// callers supply the surrounding frame/label. Shared by the AI Library live
// preview and the State Variations tab.

export const AI_CHIP_TAG_STATES = [
  'Semantic states',
  'Sizes',
  'Interaction states',
  'Active (filled)',
  'Dismissible',
  'Left icon',
  'Left icon — sizes',
  'Disabled',
  'Filter group',
  'Rounded — semantic',
  'Rounded — sizes',
  'Rounded — active & dismissible',
  'Rounded — with icons',
  'Custom data color',
] as const;

function TagLiveRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>;
}

export function AIChipTagLive({ state }: { state: string }) {
  switch (state) {
    case 'Semantic states':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Neutral" state="neutral" dismissible={false} />
          <AIChip kind="tag" label="Info" state="info" dismissible={false} />
          <AIChip kind="tag" label="Error" state="error" dismissible={false} />
          <AIChip kind="tag" label="Success" state="success" dismissible={false} />
          <AIChip kind="tag" label="Warning" state="warning" dismissible={false} />
        </TagLiveRow>
      );
    case 'Sizes':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Normal" tagSize="normal" dismissible={false} />
          <AIChip kind="tag" label="Small" tagSize="small" dismissible={false} />
          <AIChip kind="tag" label="X-Small" tagSize="x-small" dismissible={false} />
        </TagLiveRow>
      );
    case 'Interaction states':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Default" interaction="default" dismissible={false} />
          <AIChip kind="tag" label="Hover" interaction="hover" dismissible={false} />
          <AIChip kind="tag" label="Focus" interaction="focus" />
          <AIChip kind="tag" label="Active" interaction="active" />
          <AIChip kind="tag" label="Active Hover" interaction="active-hover" />
          <AIChip kind="tag" label="Active Focus" interaction="active-focus" />
        </TagLiveRow>
      );
    case 'Active (filled)':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Neutral" state="neutral" interaction="active" />
          <AIChip kind="tag" label="Info" state="info" interaction="active" />
          <AIChip kind="tag" label="Error" state="error" interaction="active" />
          <AIChip kind="tag" label="Success" state="success" interaction="active" />
          <AIChip kind="tag" label="Warning" state="warning" interaction="active" />
        </TagLiveRow>
      );
    case 'Dismissible':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Category" state="neutral" dismissible />
          <AIChip kind="tag" label="Info" state="info" dismissible />
          <AIChip kind="tag" label="Warning" state="warning" dismissible />
        </TagLiveRow>
      );
    case 'Left icon':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Neutral" state="neutral" leftIcon dismissible={false} />
          <AIChip kind="tag" label="Info" state="info" leftIcon />
          <AIChip kind="tag" label="Success" state="success" leftIcon interaction="active" />
          <AIChip kind="tag" label="Warning" state="warning" leftIcon />
          <AIChip kind="tag" label="Disabled" state="disabled" leftIcon dismissible={false} />
        </TagLiveRow>
      );
    case 'Left icon — sizes':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Basic Tag" tagSize="normal" leftIcon />
          <AIChip kind="tag" label="Basic Tag" tagSize="small" leftIcon />
          <AIChip kind="tag" label="Basic Tag" tagSize="x-small" leftIcon />
        </TagLiveRow>
      );
    case 'Disabled':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Disabled" state="disabled" dismissible={false} />
          <AIChip kind="tag" label="Disabled" state="disabled" tagSize="small" dismissible={false} />
        </TagLiveRow>
      );
    case 'Filter group':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Active" state="info" interaction="active" dismissible={false} />
          <AIChip kind="tag" label="Inactive" state="neutral" dismissible={false} />
          <AIChip kind="tag" label="Archived" state="warning" dismissible />
          <AIChip kind="tag" label="Deleted" state="error" dismissible />
        </TagLiveRow>
      );
    case 'Rounded — semantic':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Neutral" state="neutral" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Info" state="info" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Error" state="error" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Success" state="success" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Warning" state="warning" shape="rounded" dismissible={false} />
        </TagLiveRow>
      );
    case 'Rounded — sizes':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Normal" tagSize="normal" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Small" tagSize="small" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="X-Small" tagSize="x-small" shape="rounded" dismissible={false} />
        </TagLiveRow>
      );
    case 'Rounded — active & dismissible':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Non dismissable" state="neutral" shape="rounded" dismissible={false} />
          <AIChip kind="tag" label="Category" state="neutral" shape="rounded" dismissible />
          <AIChip kind="tag" label="Info" state="info" shape="rounded" dismissible />
          <AIChip kind="tag" label="Selected" state="success" shape="rounded" interaction="active" />
        </TagLiveRow>
      );
    case 'Rounded — with icons':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Neutral" state="neutral" shape="rounded" leftIcon dismissible />
          <AIChip kind="tag" label="Info" state="info" shape="rounded" leftIcon dismissible />
          <AIChip kind="tag" label="Success" state="success" shape="rounded" leftIcon interaction="active" />
          <AIChip kind="tag" label="Small" state="warning" shape="rounded" tagSize="small" leftIcon dismissible />
          <AIChip kind="tag" label="X-Small" state="error" shape="rounded" tagSize="x-small" leftIcon dismissible />
        </TagLiveRow>
      );
    case 'Custom data color':
      return (
        <TagLiveRow>
          <AIChip kind="tag" label="Iris" dataColor="#686EFF" dataTint="#EDEEFF" />
          <AIChip kind="tag" label="Magenta" dataColor="#ED39DB" dataTint="#FDEBFB" />
          <AIChip kind="tag" label="Green" dataColor="#2DA40C" dataTint="#EAF6E6" />
          <AIChip kind="tag" label="Small" dataColor="#3287C4" dataTint="#E7F1F9" tagSize="small" />
        </TagLiveRow>
      );
    default:
      return <AIChip kind="tag" label="Tag" state="neutral" dismissible={false} />;
  }
}

export default AIChip;
