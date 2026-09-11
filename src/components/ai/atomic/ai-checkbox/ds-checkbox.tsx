import React from 'react';

/**
 * DS Checkbox Component
 * =====================
 * Source of Truth: upstream AI component source → src/checkbox/
 */

export const DS_CHECKBOX_SOURCE = {
  github: 'src/checkbox/',
  mappings: {
    '--zs-selection-primary-default': 'Checked fill / border',
    '--zs-selection-error-default': 'Error mode border / fill',
    '--zs-border-neutral-functional': 'Unchecked border',
    '--zs-border-primary-hover': 'Hover border',
    '--zs-border-error-hover': 'Error hover border',
    '--zs-border-focus': 'Focus ring',
    '--zs-border-disabled': 'Disabled border',
    '--zs-icon-neutral-inverse': 'Checkmark / dash color',
    '--zs-icon-neutral-disabled': 'Disabled icon',
    '--zs-icon-neutral-default': 'Default icon color',
    '--zs-background-default': 'Unchecked background',
    '--zs-background-primary-subtle': 'Checked hover background',
    '--zs-background-neutral-10': 'Disabled background',
    '--zs-background-error-subtle': 'Error subtle background',
    '--zs-text-default': 'Label text',
    '--zs-text-disabled': 'Disabled label text',
    '--zs-separator-default': 'Divider',
  }
};

export type DSCheckboxSize = '14px' | '16px' | '18px' | '20px';
export type DSCheckboxMode = 'default' | 'error';

export interface DSCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: DSCheckboxSize;
  indeterminate?: boolean;
  mode?: DSCheckboxMode;
  label?: React.ReactNode;
}

export function DSCheckbox({
  size = '16px',
  checked = false,
  indeterminate = false,
  disabled = false,
  mode = 'default',
  label,
  onChange,
  style,
  className,
  ...props
}: DSCheckboxProps) {
  
  const [isHovered, setIsHovered] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isError = mode === 'error';
  const isSelected = checked || indeterminate;

  const getBorderColor = () => {
    if (disabled) return 'var(--zs-border-disabled, #716e79)';
    if (isError) return isHovered ? 'var(--zs-border-error-hover, #9f0000)' : 'var(--zs-selection-error-default, #b21111)';
    if (isSelected) return 'var(--zs-selection-primary-default, #2f6f7b)';
    return isHovered ? 'var(--zs-border-primary-hover, #2d535f)' : 'var(--zs-border-neutral-functional, #5b5864)';
  };

  const getBackgroundColor = () => {
    if (disabled) return 'var(--zs-background-neutral-10, #f4f3f3)';
    if (isSelected) {
      if (isError) return 'var(--zs-selection-error-default, #b21111)';
      return 'var(--zs-selection-primary-default, #2f6f7b)';
    }
    // unchecked
    if (isError && isHovered) return 'var(--zs-background-error-subtle, #ffede9)';
    if (isHovered) return 'var(--zs-background-primary-subtle, #f3fcfe)';
    return 'var(--zs-background-default, #ffffff)';
  };

  const getIconColor = () => {
    if (disabled) return 'var(--zs-icon-neutral-disabled, #716e79)';
    if (isSelected) return 'var(--zs-icon-neutral-inverse, #ffffff)';
    return 'var(--zs-icon-neutral-default, #5b5864)';
  };

  const labelFontSize = size === '14px' ? '14px' : '16px';
  const boxDim = size;

  const checkboxBox = (
    <div
      style={{
        width: boxDim,
        height: boxDim,
        borderRadius: '2px',
        border: `1px solid ${getBorderColor()}`,
        backgroundColor: getBackgroundColor(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.15s ease',
        boxSizing: 'border-box'
      }}
    >
      {checked && !indeterminate && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ color: getIconColor() }}>
          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {indeterminate && (
        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" style={{ color: getIconColor() }}>
          <path d="M1 1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );

  return (
    <label
      className={className + " ds-checkbox-wrapper"}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: '"Open Sans", sans-serif',
        ...style
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .ds-checkbox-wrapper input:focus-visible + div {
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--zs-border-focus, #027aff) !important;
        }
      `}} />
      
      <div style={{ position: 'relative', display: 'flex' }}>
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          {...props}
        />
        {checkboxBox}
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
