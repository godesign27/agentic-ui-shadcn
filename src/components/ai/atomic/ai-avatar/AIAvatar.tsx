import React, { useId } from 'react';
import { AI } from '../../tokens/ai-tokens';

// Hard rule: three concentric AI_RAMP blue circles + white cross-star.
// Fills: decorative.wash (#A6B4FC) / brand (#4D60E6) / brandInk (#1F2A66).
// No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.

const OUTER = AI.color.decorative.wash; // #A6B4FC
const MID   = AI.color.brand;           // #4D60E6
const CORE  = AI.color.brandInk;        // #1F2A66

const STAR =
  'M12.4645 21C17.8898 21 21 17.8898 21 12.4645C21 17.8898 24.1102 21 29.5355 21C24.1102 21 21 24.1102 21 29.5355C21 24.1102 17.8898 21 12.4645 21Z';

// ── Large hero avatar — flat blue variant ─────────────────────────────────────
export function AIAvatar({ size = 34 }: { size?: number }) {
  useId(); // keep hook slot stable if callers rely on React tree shape
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 42 42"
      aria-label="Guild Agent"
      style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 14px rgba(77,96,230,0.35))' }}
    >
      <circle cx="21" cy="21" r="21" fill={OUTER} />
      <circle cx="21" cy="21" r="16.3936" fill={MID} />
      <circle cx="21" cy="21" r="11.7871" fill={CORE} />
      <path clipRule="evenodd" d={STAR} fill="white" fillRule="evenodd" />
    </svg>
  );
}

// ── Large hero avatar — soft 3D brand-blue (no orange ring) ───────────────────
export function AIAvatar3D() {
  const uid = useId().replace(/:/g, '');
  const outer = `av3d-outer-${uid}`;
  const mid = `av3d-mid-${uid}`;
  const core = `av3d-core-${uid}`;
  const shine = `av3d-shine-${uid}`;
  const shadow = `av3d-shadow-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" aria-label="Guild Agent" style={{ flexShrink: 0 }}>
      <defs>
        <radialGradient id={outer} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 11) rotate(45) scale(32)">
          <stop offset="0%" stopColor="#D2DBFF" />
          <stop offset="55%" stopColor={OUTER} />
          <stop offset="100%" stopColor={MID} />
        </radialGradient>
        <linearGradient id={mid} x1="9" y1="8" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={MID} />
          <stop offset="55%" stopColor="#3544A4" />
          <stop offset="100%" stopColor={CORE} />
        </linearGradient>
        <radialGradient id={core} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 13) rotate(45) scale(22)">
          <stop offset="0%" stopColor="#3544A4" />
          <stop offset="55%" stopColor={CORE} />
          <stop offset="100%" stopColor="#141B4D" />
        </radialGradient>
        <radialGradient id={shine} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 13) rotate(35) scale(18)">
          <stop offset="0%" stopColor="white" stopOpacity="0.75" />
          <stop offset="45%" stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#0D1040" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter={`url(#${shadow})`}>
        <circle cx="21" cy="21" r="21" fill={`url(#${outer})`} />
        <circle cx="21" cy="21" r="16.3936" fill={`url(#${mid})`} />
        <circle cx="21" cy="21" r="11.7871" fill={`url(#${core})`} />
        <circle cx="21" cy="21" r="11.7871" fill={`url(#${shine})`} />
        <circle cx="21" cy="21" r="20" fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="0.8" />
        <path d={STAR} fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="21" cy="21" r="1.2" fill="#E6E9FF" opacity="0.9" />
      </g>
    </svg>
  );
}

// ── Small inline bot avatar — used as AI message attribution ──────────────────
export function BotAvatar({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="21" cy="21" r="21" fill={OUTER} />
      <circle cx="21" cy="21" r="16.3936" fill={MID} />
      <circle cx="21" cy="21" r="11.7871" fill={CORE} />
      <path clipRule="evenodd" d={STAR} fill="white" fillRule="evenodd" />
    </svg>
  );
}

export default AIAvatar;
