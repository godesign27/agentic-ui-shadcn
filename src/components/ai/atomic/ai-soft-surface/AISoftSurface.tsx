import React from 'react';
import { AI, COMPANION_TAN, SIGNAL_ORANGE } from '../../tokens/ai-tokens';

/**
 * AISoftSurface — visual surface primitive for AI companion contexts.
 *
 * This is NOT a content component. It's a background canvas that signals
 * "AI-led" or "companion-warm" context.
 */

export type AISoftSurfaceTone =
  | 'dialog'
  | 'ai'
  | 'tan'
  | 'neutral'
  | 'mixed'
  | 'ambient'
  | 'flat-ai'
  | 'flat-neutral'
  | 'flat-tan';
export type AISoftSurfaceIntensity = 'subtle' | 'medium' | 'expressive';

export interface AISoftSurfaceProps {
  tone?: AISoftSurfaceTone;
  intensity?: AISoftSurfaceIntensity;
  radius?: React.CSSProperties['borderRadius'];
  elevation?: 'flat' | 'soft';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const SURFACE: Record<
  Exclude<AISoftSurfaceTone, 'ambient' | 'dialog'>,
  Record<AISoftSurfaceIntensity, string>
> = {
  ai: {
    subtle: `linear-gradient(160deg, ${AI.color.surface.default} 0%, ${AI.color.surface.subtle} 100%)`,
    medium: `linear-gradient(160deg, ${AI.color.surface.subtle} 0%, ${AI.color.surface.emphasis} 60%, ${AI.color.surface.subtle} 100%)`,
    expressive: `radial-gradient(ellipse 80% 60% at 20% 0%, ${AI.color.decorative.wash} 0%, transparent 60%), linear-gradient(160deg, ${AI.color.surface.subtle} 0%, ${AI.color.surface.emphasis} 100%)`,
  },
  tan: {
    subtle: `linear-gradient(160deg, ${COMPANION_TAN['00']} 0%, ${SIGNAL_ORANGE['00']} 55%, ${COMPANION_TAN[10]} 100%)`,
    medium: `linear-gradient(160deg, ${COMPANION_TAN['00']} 0%, ${SIGNAL_ORANGE[10]} 50%, ${COMPANION_TAN[20]} 100%)`,
    expressive: `radial-gradient(ellipse 70% 55% at 80% 0%, ${SIGNAL_ORANGE[20]} 0%, transparent 60%), linear-gradient(160deg, ${COMPANION_TAN['00']} 0%, ${SIGNAL_ORANGE[10]} 55%, ${COMPANION_TAN[20]} 100%)`,
  },
  neutral: {
    subtle: 'linear-gradient(160deg, #FBFBFD 0%, #F4F4F6 100%)',
    medium: 'linear-gradient(160deg, #F7F7F9 0%, #EDEDF1 100%)',
    expressive: 'linear-gradient(160deg, #F4F4F6 0%, #E5E5EA 100%)',
  },
  mixed: {
    subtle: `linear-gradient(135deg, ${AI.color.surface.emphasis} 0%, #DDD6FE 50%, ${COMPANION_TAN[20]} 100%)`,
    medium: `linear-gradient(135deg, ${AI.color.decorative.wash} 0%, #C4B5FD 50%, ${COMPANION_TAN[30]} 100%)`,
    expressive: `radial-gradient(ellipse 60% 50% at 0% 0%, ${AI.color.decorative.washStrong} 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, ${COMPANION_TAN[40]} 0%, transparent 60%), linear-gradient(135deg, ${AI.color.decorative.wash} 0%, #C4B5FD 50%, ${COMPANION_TAN[30]} 100%)`,
  },
  'flat-ai': {
    subtle: AI.color.surface.subtle,
    medium: AI.color.surface.subtle,
    expressive: AI.color.surface.subtle,
  },
  'flat-neutral': {
    subtle: '#F4F3F3',
    medium: '#F4F3F3',
    expressive: '#F4F3F3',
  },
  'flat-tan': {
    subtle: COMPANION_TAN[10],
    medium: COMPANION_TAN[10],
    expressive: COMPANION_TAN[10],
  },
};

export function AISoftSurface({
  tone = 'dialog',
  intensity = 'subtle',
  radius = AI.radius.lg,
  elevation = 'flat',
  className,
  style,
  children,
}: AISoftSurfaceProps) {
  const isAmbient = tone === 'ambient';
  const isDialog = tone === 'dialog';

  const background = isAmbient
    ? '#FFFFFF'
    : isDialog
      ? 'linear-gradient(to bottom, #F3FCFE 0%, #F9FAFB 50%, #FFFFFF 100%)'
      : SURFACE[tone as Exclude<AISoftSurfaceTone, 'ambient' | 'dialog'>][intensity];

  return (
    <div
      data-ai-soft-surface
      data-tone={tone}
      data-intensity={intensity}
      className={className}
      style={{
        position: 'relative',
        background,
        borderRadius: radius,
        boxShadow:
          elevation === 'soft' ? '0 1px 2px rgba(26,22,40,0.04), 0 8px 24px rgba(26,22,40,0.04)' : 'none',
        overflow: isAmbient || isDialog ? 'hidden' : undefined,
        ...style,
      }}
    >
      {isAmbient && <AmbientOrbs />}
      {isDialog && <DialogBlobs />}
      {children}
    </div>
  );
}

function DialogBlobs() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: '-22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110%',
          height: '85%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(199,210,254,0.50) 0%, rgba(165,236,243,0.32) 42%, transparent 68%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-12%',
          right: '-12%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(165,236,243,0.28) 0%, rgba(39,166,164,0.10) 52%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-18%',
          right: '-12%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,176,182,0.18) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-14%',
          left: '10%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,176,182,0.13) 0%, transparent 65%)',
        }}
      />
    </div>
  );
}

function AmbientOrbs() {
  return (
    <>
      <style>{AMBIENT_CSS}</style>
      <div aria-hidden="true" className="ai-soft-ambient" data-ai-soft-ambient>
        <span className="ai-soft-orb ai-soft-orb-1" />
        <span className="ai-soft-orb ai-soft-orb-2" />
        <span className="ai-soft-orb ai-soft-orb-3" />
      </div>
    </>
  );
}

const AMBIENT_CSS = `
.ai-soft-ambient {
  position: absolute; inset: 0; overflow: hidden; pointer-events: none;
}
.ai-soft-orb {
  position: absolute;
  width: 70%; height: 70%;
  border-radius: 9999px;
  filter: blur(80px);
  mix-blend-mode: multiply;
  will-change: transform;
}
.ai-soft-orb-1 {
  top: -15%; left: -15%;
  background: rgba(96, 165, 250, 0.55);
  animation: ai-soft-orb-1 22s ease-in-out infinite alternate;
}
.ai-soft-orb-2 {
  top: -15%; right: -15%;
  background: rgba(192, 132, 252, 0.55);
  animation: ai-soft-orb-2 24s ease-in-out infinite alternate;
}
.ai-soft-orb-3 {
  bottom: -20%; left: 15%;
  background: rgba(20, 184, 166, 0.55);
  animation: ai-soft-orb-3 20s ease-in-out infinite alternate;
}
@keyframes ai-soft-orb-1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(8%, 6%) scale(1.2); }
}
@keyframes ai-soft-orb-2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-8%, 6%) scale(1.15); }
}
@keyframes ai-soft-orb-3 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(6%, -6%) scale(1.2); }
}
[data-dark="true"] .ai-soft-ambient { mix-blend-mode: normal; }
[data-dark="true"] .ai-soft-orb     { mix-blend-mode: screen; }
[data-dark="true"] .ai-soft-orb-1   { background: rgba(30, 58, 138, 0.35); }
[data-dark="true"] .ai-soft-orb-2   { background: rgba(88, 28, 135, 0.35); }
[data-dark="true"] .ai-soft-orb-3   { background: rgba(19, 78, 74, 0.35); }
@media (prefers-reduced-motion: reduce) {
  .ai-soft-orb-1, .ai-soft-orb-2, .ai-soft-orb-3 { animation: none !important; }
}
`;

export default AISoftSurface;
