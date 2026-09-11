/**
 * AIRadio — Guild Agentic AI Atom
 *
 * The standard DS Radio re-skinned with the AI design language. It does NOT
 * reimplement the control — it wraps the canonical `DSRadio`
 * (src/app/components/ds/ds-radio.tsx, mirror src/radio/) and re-anchors the
 * DS selection / focus / text CSS variables to their AI equivalents inside a
 * scoped wrapper. This keeps all of DS's a11y, sizing, error, and disabled
 * behavior while presenting AI brand indigo (#4D60E6) instead of DS teal.
 *
 * Mirrors the AICheckbox re-skin pattern exactly — see [[ai-reskin-ds-atom-via-css-vars]].
 *
 * AI re-skin
 *   - Checked border + center dot:  AI.color.brand          (#4D60E6)  ← was DS teal
 *   - Hover border:                 AI.color.action.primary (#4D60E6)
 *   - Checked-hover surface:        AI.color.surface.default (#F5F6FF, brand tint)
 *   - Focus ring:                   AI.color.border.focus   (#4D60E6)
 *   - Label text:                   var(--ai-ds-text)
 *
 * Everything else (error mode, disabled, keyboard, grouping via name/value) is
 * inherited unchanged from DSRadio.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { DSRadio, type DSRadioProps } from './ds-radio';

export interface AIRadioProps extends DSRadioProps {}

export function AIRadio({ style, ...props }: AIRadioProps) {
  return (
    <span
      style={{
        // Re-anchor the DS radio tokens to AI values. DSRadio reads these via
        // var(--token, fallback), so redefining them here re-skins it. The radio
        // is circular already, so no radius override is needed (unlike AICheckbox).
        ['--zs-selection-primary-default' as string]: AI.color.brand,
        ['--zs-border-primary-hover' as string]:      AI.color.action.primary,
        ['--zs-background-primary-subtle' as string]: AI.color.surface.default,
        ['--zs-border-focus' as string]:              AI.color.border.focus,
        ['--zs-text-default' as string]:              'var(--ai-ds-text, #2f2c3c)',
        display: 'inline-flex',
        fontFamily: F,
      } as React.CSSProperties}
    >
      <DSRadio {...props} style={style} />
    </span>
  );
}

export default AIRadio;
