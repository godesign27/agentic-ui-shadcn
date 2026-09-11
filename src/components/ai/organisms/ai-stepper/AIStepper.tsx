import React from 'react';
import { AI, DS, F } from '../../tokens/ai-tokens';
import { AI_ICON_PATHS } from '../../atomic/ai-icon/AIIcon';

/**
 * AIStepper — the DS Compact Stepper, re-imagined in the Guild AI brand.
 *
 * This is the AI-surface sibling of the standard DS Stepper
 * (src/app/components/ai-library/standardEntries/phaseH.tsx → CompactStepper,
 * itself a 1:1 port of the canonical `ds-stepper ds-compact-stepper` markup).
 * It keeps the exact same information architecture — a linear sequence of
 * milestone circles joined by connector tracks, each with a label, optional
 * sub-line, and an italic status badge; horizontal + vertical orientations at
 * two sizes — but re-anchors every visual token to the AI system:
 *
 *   - completed milestone   AI.gradient.action.full   (brand gradient, was flat green)
 *   - completed / done track AI.color.brand           #4D60E6  (was #0A6E5E)
 *   - pending track          AI.color.brandSubtle     #D2DBFF  (was #DEDCDE)
 *   - current ring           AI.color.brand           #4D60E6  (was #5B5864)
 *   - current number         AI.color.text.primary    #1F2A66  (was #2F2C3C)
 *   - pending ring           AI.color.brandBorder     #BECAFE  (was #B2B0B6)
 *   - milestone glow         AI.shadow.action.default  brand drop shadow
 *   - current badge          AI.color.surface.subtle  #D2DBFF brand tint
 *   - radius / typography     AI.radius.* / F
 *
 * Status badges keep the DS semantic meaning but pull their color from the AI
 * status set (success / warning / error) and the AI brand for info / current.
 *
 * Consumes AI tokens only (ai-tokens.ts) plus the shared DS neutral aliases for
 * muted/disabled text — no fork of the standard component, no raw hex outside
 * this token layer. Completed/pending glyphs render as inline SVG drawn from the
 * shared AI_ICON_PATHS registry (the icon-font *font* only resolves in Angular,
 * not React), so milestone icons always paint.
 */

// ── Milestone + track tokens (AI Tier 2) ─────────────────────────────────────
const TRACK_DONE     = AI.color.brand;         // #4D60E6 — completed connector
const TRACK_PENDING  = AI.color.brandSubtle;   // #D2DBFF — after-current connector
const CURRENT_RING   = AI.color.brand;         // #4D60E6 — current milestone ring
const CURRENT_NUM    = AI.color.text.primary;  // #1F2A66 — current / default number
const PENDING_RING   = AI.color.brandBorder;   // #BECAFE — pending milestone ring
const PENDING_NUM    = DS.textDisabled;       // #716e79 — pending number text
const PENDING_DOT    = AI.color.brandBorder;   // #BECAFE — pending dot fill
const MUTED_TEXT     = DS.textDisabled;       // #716e79 — muted label after current
const HELP_TEXT      = DS.textHelper;         // #5b5864 — sub-line
const COMPLETE_GLOW  = AI.shadow.action.default;// brand drop shadow on filled circles

export type AIStepBadgeTone = 'success' | 'info' | 'warning' | 'error' | 'neutral' | 'disabled';
export type AIStepMode = 'complete' | 'current-complete' | 'current' | 'pending';

export interface AIStepDef {
  label: string;
  /** Optional secondary line beneath the label (e.g. a date). */
  sub?: string;
  /** Italic status badge (Approved / Current Step / Pending Approval …). */
  badge?: { text: string; tone: AIStepBadgeTone };
  mode: AIStepMode;
  /** Glyph for completed milestones — defaults to check-circle-fill. */
  icon?: 'doc' | 'check-circle-fill';
  /** Number rendered inside current / pending number circles. */
  num?: number;
  /** Pending steps render a filled soft-brand dot instead of a number circle. */
  dot?: boolean;
}

export interface AIStepperProps {
  steps: AIStepDef[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'normal' | 'small';
  /**
   * Label placement.
   *   'stacked' (default) — label sits beneath each milestone circle.
   *   'inline'            — label sits inside the stepper next to the number;
   *                         the active step is wrapped in a rounded brand pill.
   *                         Always horizontal.
   */
  layout?: 'stacked' | 'inline';
  /**
   * Color tone for the inline / pill layout.
   *   'brand' (default) — active pill + filled circles use the AI brand gradient.
   *   'neutral'         — active pill + filled circles use DS neutral greys.
   * Ignored for the stacked layout.
   */
  tone?: 'brand' | 'neutral';
  className?: string;
  style?: React.CSSProperties;
}

// Per-tone palette for the inline / pill variant. Brand pulls the AI accent;
// neutral pulls the shared DS neutral tokens (no brand hue).
interface InlinePalette {
  fill:       string; // active / done circle fill
  fillText:   string; // number/glyph color on the filled circle
  restFill:   string; // pending circle fill
  restText:   string; // pending number color
  pillBorder: string; // active pill border
  pillGlow?:  string; // active pill / circle shadow color
  track:      string; // connector between pills
}
const INLINE_TONES: Record<'brand' | 'neutral', InlinePalette> = {
  brand: {
    fill:       AI.gradient.action.full,
    fillText:   '#fff',
    restFill:   AI.color.brandSubtle,
    restText:   PENDING_NUM,
    pillBorder: AI.color.brandBorder,
    pillGlow:   COMPLETE_GLOW,
    track:      TRACK_PENDING,
  },
  neutral: {
    fill:       DS.textDefault,      // #2f2c3c — solid neutral disc
    fillText:   DS.textInverse,      // #ffffff — knocked-out number/glyph
    restFill:   DS.borderSubtle,     // #d5d3d8 — pending disc
    restText:   DS.textDisabled,     // #716e79 — pending number
    pillBorder: DS.border,           // #B2B0B6 — neutral pill outline
    pillGlow:   undefined,            // no coloured glow in neutral tone
    track:      DS.borderSubtle,     // #d5d3d8 — neutral connector
  },
};

// Append an alpha channel to a #rrggbb hex (0–100 → 00–FF).
function withAlpha(hex: string, pct: number): string {
  const a = Math.round((Math.max(0, Math.min(100, pct)) / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

// Status-badge palette — AI status set + brand for info/current; soft tint bg.
const BADGE_COLORS: Record<AIStepBadgeTone, { bg: string; fg: string }> = {
  success:  { fg: AI.color.status.success, bg: withAlpha(AI.color.status.success, 12) },
  info:     { fg: AI.color.brand,          bg: withAlpha(AI.color.brand, 12)          },
  warning:  { fg: AI.color.status.warning, bg: withAlpha(AI.color.status.warning, 12) },
  error:    { fg: AI.color.status.error,   bg: withAlpha(AI.color.status.error, 12)   },
  neutral:  { fg: AI.color.text.secondary, bg: AI.color.surface.subtle                 },
  disabled: { fg: MUTED_TEXT,              bg: withAlpha(MUTED_TEXT, 10)               },
};

// Render DS glyphs as inline SVG (24×24, currentColor). The icon-font *font*
// (zs-icon-* classes) only resolves in Angular; in React we draw the path data
// directly from the shared AI_ICON_PATHS registry so glyphs always render.
function Icon({ name, size, color }: { name: string; size: number; color?: string }) {
  const glyph = AI_ICON_PATHS[name];
  if (!glyph) {
    return <span aria-hidden="true" style={{ width: size, height: size, display: 'inline-block', flexShrink: 0 }} />;
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: 'block', flexShrink: 0, color: color ?? 'inherit' }}
    >
      <path d={glyph.d} opacity={glyph.opacity} />
      {glyph.extra?.map((p, i) => <path key={i} d={p.d} opacity={p.opacity} />)}
    </svg>
  );
}

function StepBadge({ text, tone, size }: { text: string; tone: AIStepBadgeTone; size: number }) {
  const c = BADGE_COLORS[tone];
  return (
    <span style={{
      display: 'inline-block', fontStyle: 'italic', fontSize: size, lineHeight: 1.4,
      color: c.fg, background: c.bg, borderRadius: AI.radius.sm, padding: '0 12px',
    }}>{text}</span>
  );
}

function Milestone({ step, circle, iconSize }: { step: AIStepDef; circle: number; iconSize: number }) {
  const base: React.CSSProperties = {
    width: circle, height: circle, borderRadius: '50%', flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
  };
  // Completed / current-complete — brand gradient fill + white glyph + brand glow.
  if (step.mode === 'complete' || step.mode === 'current-complete') {
    return (
      <span style={{ ...base, background: AI.gradient.action.full, color: '#fff', boxShadow: `0 2px 8px ${COMPLETE_GLOW}` }}>
        <Icon name={step.icon ?? 'check-circle-fill'} size={iconSize} color="#fff" />
      </span>
    );
  }
  // Pending dot — filled soft-brand circle, no number.
  if (step.mode === 'pending' && step.dot) {
    return <span style={{ ...base, background: PENDING_DOT, color: PENDING_DOT }}><Icon name="circle-fill" size={iconSize} color={PENDING_DOT} /></span>;
  }
  // Number circle — current (brand ring + glow) or pending (soft-brand ring).
  const isCurrent = step.mode === 'current';
  const ring = isCurrent ? CURRENT_RING : PENDING_RING;
  const numColor = isCurrent ? CURRENT_NUM : PENDING_NUM;
  return (
    <span style={{
      ...base, background: '#fff', outline: `2px solid ${ring}`, outlineOffset: -2,
      boxShadow: isCurrent ? `0 2px 8px ${COMPLETE_GLOW}` : undefined,
    }}>
      <span style={{ fontWeight: 700, fontSize: Math.round(circle * 0.4), color: numColor }}>{step.num}</span>
    </span>
  );
}

// ── Inline (pill) variant ─────────────────────────────────────────────────────
// Label rides inside the stepper next to the number circle; the active step is
// wrapped in a rounded brand pill (white surface + brand border + soft glow).
function InlinePill({ step, active, circle, iconSize, labelSize, pal }: {
  step: AIStepDef; active: boolean; circle: number; iconSize: number; labelSize: number; pal: InlinePalette;
}) {
  const done = step.mode === 'complete' || step.mode === 'current-complete';
  const isCurrent = step.mode === 'current' || step.mode === 'current-complete';
  const muted = !active && !done && !isCurrent;

  // Circle: filled tone accent for active/done, soft fill otherwise.
  const circleStyle: React.CSSProperties = {
    width: circle, height: circle, borderRadius: '50%', flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
    background: (active || done) ? pal.fill : pal.restFill,
    color: (active || done) ? pal.fillText : pal.restText,
    boxShadow: active && pal.pillGlow ? `0 2px 8px ${pal.pillGlow}` : undefined,
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
      padding: active ? '5px 16px 5px 5px' : '5px 4px',
      borderRadius: 999,
      background: active ? '#fff' : 'transparent',
      border: `1.5px solid ${active ? pal.pillBorder : 'transparent'}`,
      boxShadow: active && pal.pillGlow ? `0 2px 10px ${pal.pillGlow}` : undefined,
    }}>
      <span style={circleStyle}>
        {done
          ? <Icon name={step.icon ?? 'check-circle-fill'} size={iconSize} color={pal.fillText} />
          : <span style={{ fontWeight: 700, fontSize: Math.round(circle * 0.42) }}>{step.num}</span>}
      </span>
      <span style={{
        fontSize: labelSize,
        fontWeight: active ? 700 : 400,
        color: muted ? MUTED_TEXT : AI.color.text.primary,
        whiteSpace: 'nowrap',
      }}>{step.label}</span>
    </span>
  );
}

export function AIStepper({
  steps, orientation = 'horizontal', size = 'normal', layout = 'stacked', tone = 'brand', className, style,
}: AIStepperProps) {
  const small = size === 'small';

  // Inline / pill layout — horizontal only, label beside the number.
  if (layout === 'inline') {
    const circle = small ? 26 : 32;
    const iconSize = small ? 16 : 20;
    const labelSize = small ? 14 : 16;
    const track = small ? 2 : 2;
    const pal = INLINE_TONES[tone];
    const isActive = (s: AIStepDef) => s.mode === 'current' || s.mode === 'current-complete';
    return (
      <div
        className={`zs-master-style ai-stepper${className ? ` ${className}` : ''}`}
        style={{ display: 'flex', alignItems: 'center', fontFamily: F, width: '100%', maxWidth: 720, ...style }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <div style={{ flex: 1, height: track, borderRadius: track, background: pal.track, margin: '0 8px' }} />
            )}
            <div aria-current={isActive(s) ? 'step' : undefined}>
              <InlinePill step={s} active={isActive(s)} circle={circle} iconSize={iconSize} labelSize={labelSize} pal={pal} />
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  const circle = small ? 28 : 40;
  const iconSize = small ? 16 : 24;
  const labelSize = small ? 14 : 16;
  const badgeSize = small ? 13 : 14;
  const track = small ? 3 : 4;
  const isActive = (s: AIStepDef) => s.mode === 'current' || s.mode === 'current-complete';
  // Left/top segment is done up to & including the current step; right/bottom
  // segment is done only for steps strictly before the current step.
  const currentIndex = steps.findIndex(isActive);
  const cut = currentIndex === -1 ? steps.length : currentIndex;

  if (orientation === 'vertical') {
    return (
      <div
        className={`zs-master-style ai-stepper${className ? ` ${className}` : ''}`}
        style={{ display: 'flex', flexDirection: 'column', fontFamily: F, width: 320, ...style }}
      >
        {steps.map((s, i) => {
          const muted = i > cut;
          const topDone = i <= cut && i > 0;
          const botDone = i < cut;
          return (
            <div key={s.label} aria-current={isActive(s) ? 'step' : undefined} style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: circle }}>
                <div style={{ width: track, borderRadius: track, flex: i === 0 ? '0 0 0' : '0 0 8px', background: i === 0 ? 'transparent' : (topDone ? TRACK_DONE : TRACK_PENDING) }} />
                <Milestone step={s} circle={circle} iconSize={iconSize} />
                <div style={{ width: track, borderRadius: track, flex: i === steps.length - 1 ? '0 0 0' : '1 1 auto', minHeight: i === steps.length - 1 ? 0 : 24, background: i === steps.length - 1 ? 'transparent' : (botDone ? TRACK_DONE : TRACK_PENDING) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: i === 0 ? 6 : 0, paddingBottom: 16, textAlign: 'left' }}>
                <span style={{ fontSize: labelSize, fontWeight: isActive(s) ? 700 : 400, color: muted ? MUTED_TEXT : AI.color.text.primary }}>{s.label}</span>
                {s.sub && <span style={{ fontSize: badgeSize, color: muted ? MUTED_TEXT : HELP_TEXT }}>{s.sub}</span>}
                {s.badge && <StepBadge text={s.badge.text} tone={s.badge.tone} size={badgeSize} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`zs-master-style ai-stepper${className ? ` ${className}` : ''}`}
      style={{ display: 'flex', fontFamily: F, width: '100%', maxWidth: 720, ...style }}
    >
      {steps.map((s, i) => {
        const muted = i > cut;
        const leftDone = i <= cut && i > 0;
        const rightDone = i < cut;
        return (
          <div key={s.label} aria-current={isActive(s) ? 'step' : undefined} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flex: 1, height: track, borderRadius: track, background: i === 0 ? 'transparent' : (leftDone ? TRACK_DONE : TRACK_PENDING) }} />
              <Milestone step={s} circle={circle} iconSize={iconSize} />
              <div style={{ flex: 1, height: track, borderRadius: track, background: i === steps.length - 1 ? 'transparent' : (rightDone ? TRACK_DONE : TRACK_PENDING) }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 8, textAlign: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: labelSize, fontWeight: isActive(s) ? 700 : 400, color: muted ? MUTED_TEXT : AI.color.text.primary }}>{s.label}</span>
              {s.sub && <span style={{ fontSize: badgeSize, color: muted ? MUTED_TEXT : HELP_TEXT }}>{s.sub}</span>}
              {s.badge && <StepBadge text={s.badge.text} tone={s.badge.tone} size={badgeSize} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Canonical approval example (Draft → Round 1 → Round 2 → Round 3 → Final).
export const AI_STEPPER_EXAMPLE: AIStepDef[] = [
  { label: 'Draft Created', sub: 'Sept 6, 2020', mode: 'complete', icon: 'doc' },
  { label: 'Round 1', badge: { text: 'Approved', tone: 'success' }, mode: 'complete', icon: 'check-circle-fill' },
  { label: 'Round 2', badge: { text: 'Approved', tone: 'success' }, mode: 'complete', icon: 'check-circle-fill' },
  { label: 'Round 3', badge: { text: 'Current Step', tone: 'neutral' }, mode: 'current', num: 3 },
  { label: 'Final', badge: { text: 'Pending Approval', tone: 'disabled' }, mode: 'pending', num: 4 },
];

// Inline / pill example — labels ride inside the stepper next to each number,
// active step wrapped in a rounded brand pill (Countries → Sites → PI).
export const AI_STEPPER_INLINE: AIStepDef[] = [
  { label: 'Countries', mode: 'current', num: 1 },
  { label: 'Sites', mode: 'pending', num: 2 },
  { label: 'PI', mode: 'pending', num: 3 },
];

/**
 * AIStepperInlineNeutral — standalone convenience wrapper for the inline pill
 * stepper in the DS neutral tone. Copy/paste this alongside AIStepper to drop
 * a neutral inline stepper anywhere without wiring up the `layout` / `tone` /
 * `size` props by hand. Defaults to the Countries → Sites → PI example steps.
 */
export function AIStepperInlineNeutral({
  steps = AI_STEPPER_INLINE, size = 'small', className, style,
}: {
  steps?: AIStepDef[];
  size?: 'normal' | 'small';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <AIStepper
      steps={steps}
      layout="inline"
      tone="neutral"
      size={size}
      className={className}
      style={style}
    />
  );
}

// "Modes" example — pending steps render as filled soft-brand dots (no numbers).
export const AI_STEPPER_MODES: AIStepDef[] = [
  { label: 'Draft Created', sub: 'Sept 6, 2020', mode: 'complete', icon: 'doc' },
  { label: 'Round 1', badge: { text: 'Approved', tone: 'success' }, mode: 'complete', icon: 'check-circle-fill' },
  { label: 'Round 2', badge: { text: 'Approved', tone: 'success' }, mode: 'current-complete', icon: 'check-circle-fill' },
  { label: 'Round 3', badge: { text: 'Pending Approval', tone: 'disabled' }, mode: 'pending', dot: true },
  { label: 'Final', badge: { text: 'Pending Approval', tone: 'disabled' }, mode: 'pending', dot: true },
];

export default AIStepper;
