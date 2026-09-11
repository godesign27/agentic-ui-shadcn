import React, { useState } from 'react';
import { AI, F, ZSAI } from '../../tokens/ai-tokens';

/**
 * AI Input Field
 * =====================
 * The AI-surface counterpart to the ZDS Field atom (src/field/). Mirrors ZDS
 * Field's scope — a label + text input + helper/validation slot — but restyled
 * onto the ZAIDYN AI brand surface: a fully-rounded outline (ai.radius.md),
 * brand-blue border (ai.color.border.default), and the tokenized form-field
 * rings (ai.shadow.field.default / .focus / .error) for its state treatment.
 *
 * Unlike the ZDS documentation primitive (whose value is a static span), this
 * atom wraps a REAL <input>, so it is usable directly inside an app.
 */

const STATUS = AI.color.status;

export type AIInputFieldSize = 'normal' | 'small';
export type AIInputFieldMode = 'default' | 'warning' | 'error';

export interface AIInputFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  size?: AIInputFieldSize;
  mode?: AIInputFieldMode;
  disabled?: boolean;
  /** Force the focused visual (docs/preview). When omitted, focus is live. */
  state?: 'default' | 'focused';
  onChange?: (next: string) => void;
  width?: number | string;
  id?: string;
  /** Trailing affordance (e.g. a calendar icon) rendered inside the field box. */
  trailingIcon?: React.ReactNode;
  /**
   * Trigger mode: renders the value as a read-only, clickable field instead of
   * a text input. Used by composed pickers (AI Date Picker) where typing is
   * replaced by opening a popover. `aria-expanded` reflects the popover state.
   */
  asTrigger?: boolean;
  onClick?: () => void;
  expanded?: boolean;
}

export function AIInputField({
  label = 'Label',
  value,
  placeholder = 'Placeholder text…',
  helper = 'Helper text',
  size = 'normal',
  mode = 'default',
  disabled = false,
  state,
  onChange,
  width = 280,
  id,
  trailingIcon,
  asTrigger = false,
  onClick,
  expanded,
}: AIInputFieldProps) {
  const [liveFocused, setLiveFocused] = useState(false);
  const focused = state === 'focused' || liveFocused;

  const h = size === 'normal' ? 48 : 40;
  const fontSize = size === 'normal' ? 15 : 13;

  const borderColor =
    mode === 'error' ? STATUS.error
    : mode === 'warning' ? STATUS.warning
    : disabled ? AI.color.brand /* dimmed via opacity below */
    // Default rest border steps one shade down from the shared border token
    // (ZSAI[80] #4D60E6 → ZSAI[70] #657CEC) for a softer input outline. Scoped
    // to this atom only; the shared AI.color.border.default stays at [80] for AA.
    : ZSAI[70];

  const helperColor =
    mode === 'error' ? STATUS.error
    : mode === 'warning' ? STATUS.warning
    : AI.color.text.secondary;

  // Ring states come from AI.shadow.field.* — the tokenized form-field rings.
  // (Previously this atom borrowed AI.shadow.input.*, which is the composite
  // shadow for the chat composer card, not a form field.)
  const boxShadow =
    disabled ? 'none'
    : focused ? AI.shadow.field.focus
    : mode === 'error' ? AI.shadow.field.error
    : mode === 'warning' ? AI.shadow.field.warning
    : AI.shadow.field.default;

  return (
    <div style={{ width, fontFamily: F, opacity: disabled ? 0.55 : 1 }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block', fontSize: 12, fontWeight: 600,
            color: AI.color.text.primary, marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {asTrigger ? (
          <div
            id={id}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-haspopup="dialog"
            aria-expanded={expanded ?? false}
            aria-disabled={disabled}
            onClick={disabled ? undefined : onClick}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
            }}
            onFocus={() => setLiveFocused(true)}
            onBlur={() => setLiveFocused(false)}
            style={{
              width: '100%', height: h, padding: trailingIcon ? '0 44px 0 16px' : '0 16px',
              display: 'flex', alignItems: 'center',
              fontFamily: F, fontSize,
              color: value ? AI.color.text.primary : AI.color.text.secondary,
              background: '#FFFFFF',
              border: `1.5px solid ${focused ? AI.color.border.focus : borderColor}`,
              borderRadius: AI.radius.md,
              boxShadow,
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'border-color .15s, box-shadow .15s',
            }}
          >
            {value || placeholder}
          </div>
        ) : (
          <input
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setLiveFocused(true)}
            onBlur={() => setLiveFocused(false)}
            style={{
              width: '100%', height: h, padding: trailingIcon ? '0 44px 0 16px' : '0 16px',
              fontFamily: F, fontSize, color: AI.color.text.primary,
              background: '#FFFFFF',
              border: `1.5px solid ${focused ? AI.color.border.focus : borderColor}`,
              borderRadius: AI.radius.md,
              boxShadow,
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'text',
              transition: 'border-color .15s, box-shadow .15s',
            }}
          />
        )}
        {trailingIcon && (
          <span style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: AI.color.brand, pointerEvents: 'none',
          }}>
            {trailingIcon}
          </span>
        )}
      </div>
      {helper && (
        <div style={{ fontSize: 11, color: helperColor, marginTop: 6 }}>{helper}</div>
      )}
    </div>
  );
}

export default AIInputField;
