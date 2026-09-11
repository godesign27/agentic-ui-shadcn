/**
 * AIRadio — ZAIDYN Agentic AI Atom
 *
 * The standard ZDS Radio re-skinned with the AI design language. It does NOT
 * reimplement the control — it wraps the canonical `ZdsRadio`
 * (src/app/components/zds/zds-radio.tsx, mirror src/radio/) and re-anchors the
 * ZDS selection / focus / text CSS variables to their AI equivalents inside a
 * scoped wrapper. This keeps all of ZDS's a11y, sizing, error, and disabled
 * behavior while presenting AI brand indigo (#4D60E6) instead of ZDS teal.
 *
 * Mirrors the AICheckbox re-skin pattern exactly — see [[ai-reskin-zds-atom-via-css-vars]].
 *
 * AI re-skin
 *   - Checked border + center dot:  AI.color.brand          (#4D60E6)  ← was ZDS teal
 *   - Hover border:                 AI.color.action.primary (#4D60E6)
 *   - Checked-hover surface:        AI.color.surface.default (#F5F6FF, brand tint)
 *   - Focus ring:                   AI.color.border.focus   (#4D60E6)
 *   - Label text:                   var(--ai-zds-text)
 *
 * Everything else (error mode, disabled, keyboard, grouping via name/value) is
 * inherited unchanged from ZdsRadio.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { ZdsRadio, type ZdsRadioProps } from './zds-radio';

export interface AIRadioProps extends ZdsRadioProps {}

export function AIRadio({ style, ...props }: AIRadioProps) {
  return (
    <span
      style={{
        // Re-anchor the ZDS radio tokens to AI values. ZdsRadio reads these via
        // var(--token, fallback), so redefining them here re-skins it. The radio
        // is circular already, so no radius override is needed (unlike AICheckbox).
        ['--zs-selection-primary-default' as string]: AI.color.brand,
        ['--zs-border-primary-hover' as string]:      AI.color.action.primary,
        ['--zs-background-primary-subtle' as string]: AI.color.surface.default,
        ['--zs-border-focus' as string]:              AI.color.border.focus,
        ['--zs-text-default' as string]:              'var(--ai-zds-text, #2f2c3c)',
        display: 'inline-flex',
        fontFamily: F,
      } as React.CSSProperties}
    >
      <ZdsRadio {...props} style={style} />
    </span>
  );
}

export default AIRadio;
