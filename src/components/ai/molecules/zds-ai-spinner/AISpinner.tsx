/**
 * ZdsAiSpinner
 *
 * The canonical ZDS spinner (../zds/zds-spinner) re-skinned with the AI brand
 * surface. This does NOT fork the SVG — it wraps <ZdsSpinner /> and re-anchors
 * the CSS custom properties the base reads (`--primary` for the rotating arc,
 * `--headline-text-color` for the track ring) to AI token values, so the AI look
 * is applied purely as a surface on top of the standard component. Geometry,
 * size contract, a11y (role="status"), keyframes and the reduced-motion guard
 * are all inherited from the base.
 *
 * Molecule — meant to be composed inside other AI molecules and organisms.
 * It is separate from, and does not replace, the AI loading indicator
 * (components/ai/atomic/loading-indicator/AILoadingIndicators).
 *
 * Supports light mode, dark mode, and an inverse variant for filled AI surfaces.
 */

import React from 'react';
import { ZdsSpinner, type ZdsSpinnerProps } from './zds-spinner';
import { AI, ZSAI } from '../../tokens/ai-tokens';

export interface AISpinnerProps extends ZdsSpinnerProps {
  /** Render for dark surfaces (light ring + light-indigo arc). */
  dark?: boolean;
  /** Render on a filled AI surface (e.g. a primary button): white-based ring + white arc. */
  inverse?: boolean;
}

export function AISpinner({ dark = false, inverse = false, ...rest }: AISpinnerProps) {
  // Re-anchor the two CSS vars the base spinner consumes.
  //   arc   → `--primary`               (rotating segment)
  //   track → `--headline-text-color`   (static ring; base dims it to ~0.5)
  // When `inverse`, the base's `light` flag switches the ring to `--background`
  // for a white-based ring on filled AI surfaces.
  let arc: string;
  let track: string;

  if (inverse) {
    arc = '#FFFFFF';
    track = '#FFFFFF';
  } else if (dark) {
    // Deliberate Tier-1 exception. One ramp up from surface.emphasis (ZSAI[30]) →
    // a more saturated indigo that clears AA contrast against the dark surface and
    // the near-transparent ring. No Tier-2 alias fits: AI.color.* is a light-surface
    // palette with no dark-mode counterpart, and decorative.wash carries the same
    // value but the wrong meaning (a spinner arc is functional, not ornamental).
    // Revisit if a dark Tier-2 layer is ever added.
    arc = ZSAI[40];                        // #A6B4FC
    // White ring at 80% transparency. The base spinner dims the track by ×0.5,
    // so bake the alpha to 0.4 → effective white @ 0.2 (20% opacity).
    track = 'rgba(255, 255, 255, 0.4)';
  } else {
    arc = AI.color.action.primary;     // #4D60E6 — AI indigo
    track = AI.color.surface.emphasis; // #BECAFE — soft light-indigo ring
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        ['--primary' as any]: arc,
        ['--headline-text-color' as any]: track,
      }}
    >
      <ZdsSpinner {...rest} light={inverse} />
    </span>
  );
}

export default AISpinner;

export { AISpinner as ZdsAiSpinner };
export type { AISpinnerProps as ZdsAiSpinnerProps };
