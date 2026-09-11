/**
 * AICheckbox — Guild Agentic AI Atom
 *
 * The standard DS Checkbox re-skinned with the AI design language. It does NOT
 * reimplement the control — it wraps the canonical `DSCheckbox`
 * (src/app/components/ds/ds-checkbox.tsx, mirror src/checkbox/) and re-anchors
 * the DS selection / focus / text CSS variables to their AI equivalents inside a
 * scoped wrapper. This keeps all of DS's a11y, indeterminate handling, sizing,
 * and error mode while presenting AI brand indigo (#4D60E6) instead of DS teal.
 *
 * AI re-skin
 *   - Checked fill + border:  AI.color.brand        (#4D60E6)  ← was DS teal
 *   - Hover border:           AI.color.action.primary (#4D60E6)
 *   - Checked-hover surface:  AI.color.surface.default (#F5F6FF, brand tint)
 *   - Focus ring:             AI.color.border.focus  (#4D60E6)
 *   - Label text:             var(--ai-ds-text)
 *   - Box radius:             softened to 4px to match the AI card family
 *
 * Everything else (indeterminate dash, error mode, disabled, keyboard) is
 * inherited unchanged from DSCheckbox.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { DSCheckbox, type DSCheckboxProps } from './ds-checkbox';

export interface AICheckboxProps extends DSCheckboxProps {}

export function AICheckbox({ style, ...props }: AICheckboxProps) {
  // Scope id keeps the box-radius / focus-ring overrides from leaking to any
  // sibling DSCheckbox on the page.
  const scopeId = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const scopeClass = `ai-checkbox-${scopeId}`;

  return (
    <span
      className={scopeClass}
      style={{
        // Re-anchor the DS checkbox tokens to AI values. DSCheckbox reads these
        // via var(--token, fallback), so redefining them here re-skins it.
        ['--zs-selection-primary-default' as string]: AI.color.brand,
        ['--zs-border-primary-hover' as string]:      AI.color.action.primary,
        ['--zs-background-primary-subtle' as string]: AI.color.surface.default,
        ['--zs-border-focus' as string]:              AI.color.border.focus,
        ['--zs-text-default' as string]:              'var(--ai-ds-text, #2f2c3c)',
        display: 'inline-flex',
        fontFamily: F,
      } as React.CSSProperties}
    >
      {/* Soften the box corners to match the AI card family (DS ships 2px). */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.${scopeClass} .ds-checkbox-wrapper input + div { border-radius: 4px; }`,
        }}
      />
      <DSCheckbox {...props} style={style} />
    </span>
  );
}

export default AICheckbox;
