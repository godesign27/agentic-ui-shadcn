import React from 'react';

/**
 * DS Radio Button Component
 * ==========================
 * Source of Truth: upstream AI component source → src/radio/ (radio.less)
 *
 * Circular selection control for mutually-exclusive choices. Structurally a
 * sibling of DSCheckbox — same token names, sizing, focus ring, error and
 * disabled treatment — but round with a filled center dot when selected.
 */

export const DS_RADIO_SOURCE = {
  github: 'src/radio/',
  mappings: {
    '--zs-selection-primary-default': 'Checked border + center dot',
    '--zs-selection-error-default': 'Error mode border',
    '--zs-border-neutral-functional': 'Unchecked border',
    '--zs-border-primary-hover': 'Hover border',
    '--zs-border-error-hover': 'Error hover border',
    '--zs-border-focus': 'Focus ring',
    '--zs-border-disabled': 'Disabled border',
    '--zs-icon-neutral-disabled': 'Disabled center dot',
    '--zs-background-default': 'Unchecked background',
    '--zs-background-primary-subtle': 'Checked hover background',
    '--zs-background-neutral-10': 'Disabled background',
    '--zs-background-error-subtle': 'Error subtle background',
    '--zs-text-default': 'Label text',
    '--zs-text-disabled': 'Disabled label text',
  },
};

export type DSRadioSize = '14px' | '16px' | '18px' | '20px';
export type DSRadioMode = 'default' | 'error';

export interface DSRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: DSRadioSize;
  mode?: DSRadioMode;
  label?: React.ReactNode;
}

export function DSRadio({
  size = '16px',
  checked = false,
  disabled = false,
  mode = 'default',
  label,
  onChange,
  style,
  className,
  ...props
}: DSRadioProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const isError = mode === 'error';

  const getBorderColor = () => {
    if (disabled) return 'var(--zs-border-disabled, #716e79)';
    if (isError) return isHovered ? 'var(--zs-border-error-hover, #9f0000)' : 'var(--zs-selection-error-default, #b21111)';
    if (checked) return 'var(--zs-selection-primary-default, #2f6f7b)';
    return isHovered ? 'var(--zs-border-primary-hover, #2d535f)' : 'var(--zs-border-neutral-functional, #5b5864)';
  };

  const getBackgroundColor = () => {
    if (disabled) return 'var(--zs-background-neutral-10, #f4f3f3)';
    if (isError && isHovered) return 'var(--zs-background-error-subtle, #ffede9)';
    if (checked && isHovered) return 'var(--zs-background-primary-subtle, #f3fcfe)';
    return 'var(--zs-background-default, #ffffff)';
  };

  const getDotColor = () => {
    if (disabled) return 'var(--zs-icon-neutral-disabled, #b2b0b6)';
    return 'var(--zs-selection-primary-default, #2f6f7b)';
  };

  const labelFontSize = size === '14px' ? '14px' : '16px';
  const boxDim = size;
  // Fixed-pixel dot (half the box) centered by absolute positioning — avoids the
  // subpixel rounding that a 50% flex child incurs against the border-box content.
  const dotDim = Math.round(parseInt(size, 10) / 2);

  const radioBox = (
    <div
      style={{
        position: 'relative',
        width: boxDim,
        height: boxDim,
        borderRadius: '50%',
        border: `1px solid ${getBorderColor()}`,
        backgroundColor: getBackgroundColor(),
        flexShrink: 0,
        transition: 'all 0.15s ease',
        boxSizing: 'border-box',
      }}
    >
      {checked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: dotDim,
            height: dotDim,
            borderRadius: '50%',
            backgroundColor: getDotColor(),
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );

  return (
    <label
      className={(className ? className + ' ' : '') + 'ds-radio-wrapper'}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: '"Open Sans", sans-serif',
        ...style,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ds-radio-wrapper input:focus-visible + div {
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--zs-border-focus, #027aff) !important;
        }
      ` }} />

      <div style={{ position: 'relative', display: 'flex' }}>
        <input
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...props}
        />
        {radioBox}
      </div>

      {label && (
        <span style={{
          fontSize: labelFontSize,
          color: disabled ? 'var(--zs-text-disabled, #716e79)' : 'var(--zs-text-default, #2f2c3c)',
          lineHeight: 1.5,
        }}>
          {label}
        </span>
      )}
    </label>
  );
}
