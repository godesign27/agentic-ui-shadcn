import React from 'react';

/**
 * ZDS Button Component
 * =====================
 * Source of Truth: zsainc/9904PD0068_zds-ai-mirror → src/button/
 */

export const ZDS_BUTTON_SOURCE = {
  github: 'src/button/',
  mappings: {
    '--zs-bg-btn-default': 'Solid bg: Default + Focus',
    '--zs-bg-btn-hover': 'Solid bg: Hover',
    '--zs-bg-btn-pressed': 'Solid + Outline bg: Pressed',
    '--zs-bg-btn-disabled': 'All types: Disabled bg',
    '--zs-bg-btn-white': 'Outline bg: Default',
    '--zs-border-neutral-functional': 'Outline border: Default',
    '--zs-border-focus': 'Focus ring',
    '--zs-border-pressed': 'Outline border: Pressed',
    '--zs-border-disabled': 'All: Disabled border',
    '--zs-text-inverse': 'Solid label',
    '--zs-text-default': 'Outline label',
    '--zs-text-disabled': 'All: Disabled label',
    '--zs-text-pressed': 'Outline: Pressed label',
    '--zs-icon-inverse': 'Solid: icon color',
    '--zs-icon-primary-default': 'Outline / Link: default icon',
    '--zs-icon-neutral-default': 'Outline: icon',
    '--zs-icon-neutral-disabled': 'All: disabled icon',
    '--zs-icon-primary-pressed': 'Outline / Link: pressed icon',
  }
};

export type ZdsButtonType = 'solid' | 'outline' | 'link';
export type ZdsButtonSize = 'normal' | 'small' | 'xsmall';
export type ZdsButtonStyle = 'icon-left' | 'text-only' | 'circle' | 'square' | 'icon-only';

export interface ZdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ZdsButtonType;
  size?: ZdsButtonSize;
  btnStyle?: ZdsButtonStyle; // avoiding `style` conflict with React.CSSProperties
  label?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function ZdsButton({
  type = 'solid',
  size = 'normal',
  btnStyle = 'text-only',
  label,
  icon,
  fullWidth,
  className,
  disabled,
  ...props
}: ZdsButtonProps) {
  
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  // Size mapping
  const sizeStyles = {
    normal: { minHeight: '50px', fontSize: '16px', padding: btnStyle === 'icon-only' || btnStyle === 'circle' || btnStyle === 'square' ? '13px' : '13px' },
    small: { minHeight: '44px', fontSize: '14px', padding: btnStyle === 'icon-only' || btnStyle === 'circle' || btnStyle === 'square' ? '11px' : '11px 13px' },
    xsmall: { minHeight: '38px', fontSize: '12px', padding: btnStyle === 'icon-only' || btnStyle === 'circle' || btnStyle === 'square' ? '9px' : '9px 13px' },
  };

  const getBackgroundColor = () => {
    if (disabled) return type === 'link' ? 'transparent' : 'var(--zs-bg-btn-disabled, #f4f3f3)';
    if (type === 'link') return 'transparent';
    if (type === 'outline') {
      return isPressed ? 'var(--zs-bg-btn-pressed, #022d42)' : 'var(--zs-bg-btn-white, #ffffff)';
    }
    // solid
    if (isPressed) return 'var(--zs-bg-btn-pressed, #022d42)';
    if (isHovered) return 'var(--zs-bg-btn-hover, #2d535f)';
    return 'var(--zs-bg-btn-default, #2f6f7b)';
  };

  const getBorder = () => {
    if (type === 'link') return 'none';
    if (type === 'solid') return '1px solid transparent';
    // outline
    if (disabled) return '1px solid var(--zs-border-disabled, #716e79)';
    if (isPressed) return '1px solid var(--zs-border-pressed, #022d42)';
    return '1px solid var(--zs-border-neutral-functional, #5b5864)';
  };

  const getTextColor = () => {
    if (disabled) return 'var(--zs-text-disabled, #716e79)';
    if (type === 'solid') return 'var(--zs-text-inverse, #fafafa)';
    // outline or link
    if (isPressed && type === 'outline') return 'var(--zs-text-inverse, #fafafa)';
    if (isPressed) return 'var(--zs-text-pressed, #022d42)';
    return 'var(--zs-text-default, #2f2c3c)';
  };

  const getIconColor = () => {
    if (disabled) return 'var(--zs-icon-neutral-disabled, #716e79)';
    if (type === 'solid') return 'var(--zs-icon-inverse, #ffffff)';
    if (isPressed) return 'var(--zs-icon-primary-pressed, #022d42)';
    if (type === 'link') return 'var(--zs-icon-primary-default, #2f6f7b)';
    // outline default
    return 'var(--zs-icon-neutral-default, #5b5864)';
  };

  return (
    <button
      className={className}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.15px',
        lineHeight: 1.5,
        width: fullWidth ? '100%' : 'auto',
        borderRadius: btnStyle === 'circle' ? '50%' : '0',
        backgroundColor: getBackgroundColor(),
        border: getBorder(),
        color: getTextColor(),
        transition: 'all 0.15s ease',
        outline: 'none',
        ...sizeStyles[size],
        ...props.style,
      }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .zds-btn-focus:focus-visible {
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--zs-border-focus, #027aff) !important;
        }
      `}} />
      
      {icon && (
        <span style={{ color: getIconColor(), display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      {(btnStyle === 'text-only' || btnStyle === 'icon-left') && label && (
        <span>{label}</span>
      )}
    </button>
  );
}
