import React from 'react';
import { F, AI } from '../../tokens/ai-tokens';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ─────────────────────────────────────────────────────────────────────────────
// AITooltip — the AI-brand counterpart of the ZDS Tooltip (src/tooltip/).
//
// This is a re-skin, not a re-implementation: the geometry, arrow math, prop
// surface, and section structure are ported verbatim from the ZDS tooltip
// building blocks (phaseA.tsx: TooltipFull / TooltipGrid / PopoverBody /
// PopoverFull / PopoverConfBody / PopoverConfFull). Only three things change on
// the AI brand ramp:
//   1. Typography — every text node uses the AI font token `F` (Open Sans).
//   2. Accent → AI brand — the hand-rolled teal PopoverBtn is removed; the
//      footer / confirmation buttons render the AIButton atom instead
//      (variant="primary" for Apply/Yes, variant="secondary" for Cancel/No,
//      size="sm"), which carries the AI brand indigo (#4D60E6).
//   3. Radii — hover tooltip bubbles get the SMALL radius (AI.radius.xs = 6px);
//      the popover + confirmation cards get the MEDIUM radius (AI.radius.md =
//      16px) with overflow:hidden so the inner sections clip to the corner.
//
// Neutral surfaces (dark body #1a1628, white/subtle light surfaces) are
// brand-neutral and stay exactly as the ZDS version has them.
// ─────────────────────────────────────────────────────────────────────────────

// ── Tier 3 tooltip tokens — AITT.* ───────────────────────────────────────────
// Mirrors the ZDS `TT` token object. Surface + text values are the same neutral
// var(--…, #hex) tokens the ZDS tooltip uses (brand-neutral by design); the
// teal accent members are intentionally dropped because the footer buttons are
// now the AIButton atom. Shadow values reuse the ZDS elevation stack verbatim.
const AITT = {
  // Surface
  bgDark:     'var(--headline-text-color, #1a1628)',  // surface/dark
  bgWhite:    'var(--background, #ffffff)',            // surface/white
  bgSubtle:   'var(--surface-color-2, #f4f3f3)',      // surface/subtle (arrow fill on Inverse)
  // Text
  textLight:  'var(--inverse-text-color, #fafafa)',   // text/primary-light
  textDark:   'var(--text-color, #2f2c3c)',            // text/primary-dark
  textHelper: 'var(--helper-text-color, #5b5864)',    // text/secondary
  // Strokes
  divider:    'var(--border, #b2b0b6)',               // stroke/divider
  // Shadows (same elevation tokens as TT.shadowTip / TT.shadowPop)
  shadowTip:  '0 0 1px rgba(0,0,0,0.04), 0 0 2px rgba(26,22,40,0.12), 0 2px 4px rgba(26,22,40,0.12)',
  shadowPop:  '0 0 1px rgba(0,0,0,0.04), 0 0 2px rgba(26,22,40,0.12), 0 4px 8px rgba(26,22,40,0.18)',
  // AI additions
  radiusTip:  AI.radius.xs,   // 6px — hover tooltip bubble corner
  radiusCard: AI.radius.md,   // 16px — popover / confirmation card corner
} as const;

// ── Single assembled tooltip — body + directional arrow. ─────────────────────
// arrowDir = which side the arrow extends FROM the body toward the anchor.
// arrowPos = where along that edge the arrow sits (start/center/end).
export function AITooltip({
  text = 'Tooltip text',
  mode = 'default',
  size = 'normal',
  arrowDir = 'bottom',
  arrowPos = 'center',
}: {
  text?: string;
  mode?: 'default' | 'inverse';
  size?: 'normal' | 'small';
  arrowDir?: 'top' | 'bottom' | 'left' | 'right';
  arrowPos?: 'start' | 'center' | 'end';
}) {
  const bg   = mode === 'inverse' ? AITT.bgWhite   : AITT.bgDark;
  const fg   = mode === 'inverse' ? AITT.textDark  : AITT.textLight;
  // Inverse arrow fill is surface/subtle (#f4f3f3); Default is same as body
  const arrBg = mode === 'inverse' ? AITT.bgSubtle : AITT.bgDark;

  const fs      = size === 'small' ? 14  : 16;
  const ls      = size === 'small' ? '-0.176px' : '-0.144px';
  const lh      = size === 'small' ? 1.4 : 1.5;
  const padY    = size === 'small' ? 3.5 : 4;
  const padX    = size === 'small' ? 7   : 8;

  // Arrow dimensions per spec: Normal T/B = 12×6, L/R = 6×12; Small T/B = 10×5, L/R = 5×10
  const isLR   = arrowDir === 'left' || arrowDir === 'right';
  const [arrW, arrH] = size === 'small'
    ? (isLR ? [5, 10] : [10, 5])
    : (isLR ? [6, 12] : [12, 6]);

  // Compute arrow CSS-border-triangle style
  const arrStyle = ((): React.CSSProperties => {
    const base: React.CSSProperties = { position: 'absolute', width: 0, height: 0, borderStyle: 'solid' };
    const posOffset = (axis: 'left' | 'top'): React.CSSProperties =>
      arrowPos === 'start'  ? { [axis]: 8 }
      : arrowPos === 'end'  ? { [axis === 'left' ? 'right' : 'bottom']: 8 }
      : axis === 'left'     ? { left: '50%', transform: 'translateX(-50%)' }
      :                       { top: '50%',  transform: 'translateY(-50%)' };

    if (arrowDir === 'bottom') return { ...base, top: '100%', borderWidth: `${arrH}px ${arrW/2}px 0`, borderColor: `${arrBg} transparent transparent transparent`, ...posOffset('left') };
    if (arrowDir === 'top')    return { ...base, bottom: '100%', borderWidth: `0 ${arrW/2}px ${arrH}px`, borderColor: `transparent transparent ${arrBg} transparent`, ...posOffset('left') };
    if (arrowDir === 'right')  return { ...base, left: '100%', borderWidth: `${arrH/2}px 0 ${arrH/2}px ${arrW}px`, borderColor: `transparent transparent transparent ${arrBg}`, ...posOffset('top') };
    /* left */                 return { ...base, right: '100%', borderWidth: `${arrH/2}px ${arrW}px ${arrH/2}px 0`, borderColor: `transparent ${arrBg} transparent transparent`, ...posOffset('top') };
  })();

  return (
    <div role="tooltip" style={{
      position: 'relative', display: 'inline-block',
      background: bg, color: fg,
      padding: `${padY}px ${padX}px`,
      borderRadius: AITT.radiusTip,   // AI: small radius (6px) on hover tooltip bubble
      fontFamily: F, fontSize: fs, fontWeight: 400, lineHeight: lh, letterSpacing: ls,
      whiteSpace: 'nowrap', boxShadow: AITT.shadowTip,
    }}>
      {text}
      <span aria-hidden="true" style={arrStyle} />
    </div>
  );
}

// Grid displaying all 12 tooltip positions for one size × mode combination.
// arrowDir = Left | Right | Top | Bottom (4 cols); arrowPos = 3 rows each.
export function AITooltipGrid({ mode, size }: { mode: 'default' | 'inverse'; size: 'normal' | 'small' }) {
  const bg    = mode === 'inverse' ? AITT.bgDark   : AITT.bgSubtle;
  const label = (s: string) => (
    <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: AITT.textHelper, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{s}</span>
  );
  const cell = (dir: 'top' | 'bottom' | 'left' | 'right', pos: 'start' | 'center' | 'end') => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
      <AITooltip text="Tooltip text" mode={mode} size={size} arrowDir={dir} arrowPos={pos} />
    </div>
  );
  const posLabel = (p: string) => (
    <span style={{ fontFamily: F, fontSize: 10, color: AITT.textHelper, width: 42, flexShrink: 0 }}>{p}</span>
  );
  return (
    <div style={{ background: bg, borderRadius: AI.radius.sm, padding: 16, display: 'inline-flex', flexDirection: 'column', gap: 0 }}>
      {/* column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '42px 1fr 1fr 1fr 1fr', gap: 0, marginBottom: 4 }}>
        <span />
        {['Left', 'Right', 'Top', 'Bottom'].map(d => (
          <div key={d} style={{ display: 'flex', justifyContent: 'center' }}>{label(d)}</div>
        ))}
      </div>
      {(['start', 'center', 'end'] as const).map(pos => (
        <div key={pos} style={{ display: 'grid', gridTemplateColumns: '42px 1fr 1fr 1fr 1fr', alignItems: 'center' }}>
          {posLabel(pos.charAt(0).toUpperCase() + pos.slice(1))}
          {cell('left',   pos)}
          {cell('right',  pos)}
          {cell('top',    pos)}
          {cell('bottom', pos)}
        </div>
      ))}
    </div>
  );
}

// Popover/Inverse body — always a LIGHT surface (Component Set 2).
// 224px wide. Three distinct sections in strict vertical order, zero gap between them.
// ─── Section 1: Title bar ─── fill surface/subtle (#F4F3F3), padding 8×12px, Bold 14px
// ─── Section 2: Content ────── fill white, padding 8×12px, Regular 12px
// ─── Section 3: Footer ──────  padding 8×16×16×0, right-aligned, gap 8px —
//                                AIButton secondary (Cancel) + AIButton primary (Apply)
// AI restyle: medium radius (16px) + overflow:hidden so the title bar / content
// clip to the rounded corners.
export function AIPopover() {
  return (
    <div style={{
      width: 224,
      background: AITT.bgWhite,
      boxShadow: AITT.shadowPop,
      borderRadius: AITT.radiusCard,   // AI: medium radius (16px) on popover card
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',              // AI: clip inner sections to rounded corners
    }}>

      {/* ── 1. Title bar — surface/subtle fill, Bold 14px / −0.176px / lh 1.5 ── */}
      <div style={{ background: AITT.bgSubtle, padding: '8px 12px', flexShrink: 0 }}>
        <span style={{
          fontFamily: F, fontSize: 14, fontWeight: 700,
          color: AITT.textDark, lineHeight: 1.5, letterSpacing: '-0.176px',
          display: 'block',
        }}>
          Popover title
        </span>
      </div>

      {/* ── 2. Content — white fill, Regular 12px / −0.144px / lh 1.5 ── */}
      <div style={{ background: AITT.bgWhite, padding: '8px 12px', flexShrink: 0 }}>
        <span style={{
          fontFamily: F, fontSize: 12, fontWeight: 400,
          color: AITT.textDark, lineHeight: 1.5, letterSpacing: '-0.144px',
          display: 'block',
        }}>
          Popover content goes here and here and here
        </span>
      </div>

      {/* ── 3. Footer — padding 8×16×16×0, right-aligned, gap 8px ── */}
      {/* AI: secondary (Cancel) + primary (Apply) AIButton atoms carry the brand accent */}
      <div style={{
        padding: '8px 16px 16px 0', flexShrink: 0,
        display: 'flex', justifyContent: 'flex-end', gap: 8,
      }}>
        <AIButton variant="secondary" size="sm" label="Cancel" />
        <AIButton variant="primary"   size="sm" label="Apply" />
      </div>

    </div>
  );
}

// Assembled popover with directional arrow (Inverse / light mode only).
export function AIPopoverFull({
  arrowDir = 'right',
  arrowPos = 'center',
}: {
  arrowDir?: 'top' | 'bottom' | 'left' | 'right';
  arrowPos?: 'start' | 'center' | 'end';
}) {
  // AI: arrow fill matches the card surface (white) so the caret reads as
  // connected to the popover shape rather than a detached gray triangle.
  const arrBg = AITT.bgWhite;
  const isLR  = arrowDir === 'left' || arrowDir === 'right';
  const [arrW, arrH] = isLR ? [6, 12] : [12, 6];

  const isRow = arrowDir === 'left' || arrowDir === 'right';
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: isRow ? 'row' : 'column', alignItems: isRow ? 'flex-start' : 'stretch', gap: 0 }}>
      {(arrowDir === 'left' || arrowDir === 'top') && (
        <div style={{ position: 'relative', width: isRow ? arrW : undefined, height: isRow ? undefined : arrH, flexShrink: 0, display: 'flex', alignItems: arrowPos === 'start' ? 'flex-start' : arrowPos === 'end' ? 'flex-end' : 'center', justifyContent: arrowPos === 'start' ? 'flex-start' : arrowPos === 'end' ? 'flex-end' : 'center' }}>
          <span aria-hidden="true" style={{ width: 0, height: 0, borderStyle: 'solid',
            ...(arrowDir === 'left' ? { borderWidth: `${arrH/2}px ${arrW}px ${arrH/2}px 0`, borderColor: `transparent ${arrBg} transparent transparent` }
              : { borderWidth: `0 ${arrW/2}px ${arrH}px`, borderColor: `transparent transparent ${arrBg} transparent` })
          }} />
        </div>
      )}
      <AIPopover />
      {(arrowDir === 'right' || arrowDir === 'bottom') && (
        <div style={{ position: 'relative', width: isRow ? arrW : undefined, height: isRow ? undefined : arrH, flexShrink: 0, display: 'flex', alignItems: arrowPos === 'start' ? 'flex-start' : arrowPos === 'end' ? 'flex-end' : 'center', justifyContent: arrowPos === 'start' ? 'flex-start' : arrowPos === 'end' ? 'flex-end' : 'center' }}>
          <span aria-hidden="true" style={{ width: 0, height: 0, borderStyle: 'solid',
            ...(arrowDir === 'right' ? { borderWidth: `${arrH/2}px 0 ${arrH/2}px ${arrW}px`, borderColor: `transparent transparent transparent ${arrBg}` }
              : { borderWidth: `${arrH}px ${arrW/2}px 0`, borderColor: `${arrBg} transparent transparent transparent` })
          }} />
        </div>
      )}
    </div>
  );
}

// Popover Confirmation body — Component Set 3, 2 variants.
//
// Structure: Vertical auto-layout, padding 16px uniform, gap 16px, 244px wide.
//   content frame: Horizontal, gap 8px — zs-icon-error-circle (20×20) + Regular 14px text
//   buttons frame: Horizontal, gap 8px, right-aligned — "No" (secondary) + "Yes" (primary)
//
// Mode=Default (dark surface):  bg surface/dark (#1A1628), text #FAFAFA, white icon.
// Mode=Inverse (light surface): bg surface/white (#FFFFFF), text #2F2C3C, helper icon.
//
// AI restyle: the teal Yes / No buttons become AIButton (primary / secondary,
// size sm); the card gets the medium radius (16px) + overflow:hidden. On the
// dark (Default) card the secondary button is placed on a dark surface, so it
// gets `onDark` so its label/border read correctly.
export function AIPopoverConfBody({ mode = 'inverse' }: { mode?: 'default' | 'inverse' }) {
  const isDark = mode === 'default';

  // Surface
  const bg      = isDark ? AITT.bgDark  : AITT.bgWhite;
  // Text on body
  const fg      = isDark ? AITT.textLight : AITT.textDark;
  // Icon: white on dark surface, helper-color on light surface
  const iconClr = isDark ? 'var(--inverse-text-color, #ffffff)' : AITT.textHelper;

  return (
    <div style={{
      width: 244,
      background: bg,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      borderRadius: AITT.radiusCard,   // AI: medium radius (16px) on confirmation card
      overflow: 'hidden',              // AI: clip to rounded corners
      boxShadow: AITT.shadowPop,
    }}>

      {/* ── Content row: icon (20×20) + confirmation text (Regular 14px / −0.176px / lh 1.4) ── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <span
          aria-hidden="true"
          className="zs-icon zs-icon-error-circle"
          style={{ fontSize: 20, lineHeight: 1, color: iconClr, flexShrink: 0 }}
        />
        <span style={{
          fontFamily: F, fontSize: 14, fontWeight: 400,
          color: fg, lineHeight: 1.4, letterSpacing: '-0.176px',
        }}>
          Are you sure want to delete this item?
        </span>
      </div>

      {/* ── Button row: right-aligned, gap 8px — No (secondary) + Yes (primary) ── */}
      {/* AI: AIButton atoms carry the brand accent; onDark corrects the secondary
          label/border when the card surface is dark. */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <AIButton variant="secondary" size="sm" label="No" onDark={isDark} />
        <AIButton variant="primary"   size="sm" label="Yes" />
      </div>

    </div>
  );
}

// Assembled popover confirmation with directional arrow.
export function AIPopoverConfFull({
  mode = 'inverse',
  arrowDir = 'right',
  arrowPos = 'center',
}: {
  mode?: 'default' | 'inverse';
  arrowDir?: 'top' | 'bottom' | 'left' | 'right';
  arrowPos?: 'start' | 'center' | 'end';
}) {
  // AI: caret fill matches the card surface — white on the inverse (light) card,
  // dark on the Default (dark) card — so it stays connected to the shape.
  const arrBg = mode === 'default' ? AITT.bgDark : AITT.bgWhite;
  const isLR  = arrowDir === 'left' || arrowDir === 'right';
  const [arrW, arrH] = isLR ? [6, 12] : [12, 6];
  const arrowEl = (dir: 'left' | 'right' | 'top' | 'bottom') => (
    <span aria-hidden="true" style={{ width: 0, height: 0, borderStyle: 'solid',
      ...(dir === 'left'   ? { borderWidth: `${arrH/2}px ${arrW}px ${arrH/2}px 0`, borderColor: `transparent ${arrBg} transparent transparent` }
        : dir === 'right'  ? { borderWidth: `${arrH/2}px 0 ${arrH/2}px ${arrW}px`, borderColor: `transparent transparent transparent ${arrBg}` }
        : dir === 'top'    ? { borderWidth: `0 ${arrW/2}px ${arrH}px`,              borderColor: `transparent transparent ${arrBg} transparent` }
        :                    { borderWidth: `${arrH}px ${arrW/2}px 0`,              borderColor: `${arrBg} transparent transparent transparent` })
    }} />
  );
  const alignVal = arrowPos === 'start' ? 'flex-start' : arrowPos === 'end' ? 'flex-end' : 'center';
  const isRow = isLR;
  return (
    <div style={{ display: 'inline-flex', flexDirection: isRow ? 'row' : 'column', alignItems: isRow ? alignVal : 'stretch' }}>
      {(arrowDir === 'left' || arrowDir === 'top') && (
        <div style={{ display: 'flex', alignItems: alignVal, justifyContent: alignVal, width: isRow ? arrW : undefined, height: isRow ? undefined : arrH, flexShrink: 0 }}>
          {arrowEl(arrowDir)}
        </div>
      )}
      <AIPopoverConfBody mode={mode} />
      {(arrowDir === 'right' || arrowDir === 'bottom') && (
        <div style={{ display: 'flex', alignItems: alignVal, justifyContent: alignVal, width: isRow ? arrW : undefined, height: isRow ? undefined : arrH, flexShrink: 0 }}>
          {arrowEl(arrowDir)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AITooltipLivePreview — ported from ZdsTooltipLivePreview, using the AI blocks.
// Keeps the same state labels so the AI entry's state tabs line up 1:1.
// Light containers stay WHITE, dark/inverse containers stay dark — matching the
// recent ZDS fix.
// ─────────────────────────────────────────────────────────────────────────────
export function AITooltipLivePreview({ state }: { state: string }) {
  const wrap = (node: React.ReactNode, bg?: string) => (
    <div style={{ width: '100%', padding: '28px', background: bg ?? AITT.bgWhite, border: '1px solid #E5E4E8', borderRadius: AI.radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      {node}
    </div>
  );

  switch (state) {
    case 'Normal Default (16px)':
      return wrap(<AITooltipGrid mode="default" size="normal" />);
    case 'Small Default (14px)':
      return wrap(<AITooltipGrid mode="default" size="small" />);
    case 'Normal Inverse (16px)':
      return wrap(<AITooltipGrid mode="inverse" size="normal" />, AITT.bgDark);
    case 'Small Inverse (14px)':
      return wrap(<AITooltipGrid mode="inverse" size="small" />, AITT.bgDark);
    case 'Default dark · atoms': return wrap(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <AITooltip text="Tooltip text" mode="default" size="normal" arrowDir="bottom" />
          <AITooltip text="Tooltip text" mode="default" size="small" arrowDir="bottom" />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['top','bottom','left','right'] as const).map(d => (
            <AITooltip key={d} text="Tooltip text" mode="default" size="normal" arrowDir={d} arrowPos="center" />
          ))}
        </div>
      </div>
    );
    case 'Inverse light · atoms': return wrap(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <AITooltip text="Tooltip text" mode="inverse" size="normal" arrowDir="bottom" />
          <AITooltip text="Tooltip text" mode="inverse" size="small" arrowDir="bottom" />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['top','bottom','left','right'] as const).map(d => (
            <AITooltip key={d} text="Tooltip text" mode="inverse" size="normal" arrowDir={d} arrowPos="center" />
          ))}
        </div>
      </div>
    , AITT.bgDark);
    case 'Popover · Inverse':
      return wrap(
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          <AIPopoverFull arrowDir="left"  arrowPos="center" />
          <AIPopoverFull arrowDir="right" arrowPos="center" />
          <AIPopoverFull arrowDir="top"   arrowPos="center" />
          <AIPopoverFull arrowDir="bottom" arrowPos="center" />
        </div>
      );
    case 'Popover · master':
      return wrap(<AIPopover />, AITT.bgWhite);
    case 'Confirmation · Inverse':
      return wrap(
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          <AIPopoverConfFull mode="inverse" arrowDir="left"  arrowPos="center" />
          <AIPopoverConfFull mode="inverse" arrowDir="right" arrowPos="center" />
          <AIPopoverConfFull mode="inverse" arrowDir="top"   arrowPos="center" />
          <AIPopoverConfFull mode="inverse" arrowDir="bottom" arrowPos="center" />
        </div>
      );
    case 'Confirmation · Default':
      return wrap(
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          <AIPopoverConfFull mode="default" arrowDir="left"  arrowPos="center" />
          <AIPopoverConfFull mode="default" arrowDir="right" arrowPos="center" />
          <AIPopoverConfFull mode="default" arrowDir="top"   arrowPos="center" />
          <AIPopoverConfFull mode="default" arrowDir="bottom" arrowPos="center" />
        </div>
      , AITT.bgWhite);
    case 'Confirmation · master':
      return wrap(
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: AITT.textHelper, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Inverse (light)</span>
            <AIPopoverConfBody mode="inverse" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: AITT.textHelper, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Default (dark)</span>
            <AIPopoverConfBody mode="default" />
          </div>
        </div>
      );
    default:
      return wrap(
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <AITooltip text="Default (dark)" mode="default" size="normal" arrowDir="bottom" arrowPos="center" />
          <AITooltip text="Inverse (light)" mode="inverse" size="normal" arrowDir="bottom" arrowPos="center" />
          <AITooltip text="Small default" mode="default" size="small" arrowDir="bottom" arrowPos="center" />
          <AITooltip text="Small inverse" mode="inverse" size="small" arrowDir="bottom" arrowPos="center" />
        </div>
      );
  }
}

export default AITooltip;
