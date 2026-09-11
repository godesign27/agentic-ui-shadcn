/**
 * AI Search
 * =========
 * The AI-surface counterpart to `DSSearch`. Same two component sets, same size
 * ladder, same composition over one shared field — restyled onto the Guild AI brand.
 *
 *   Search          (Size × Condensed)   → AISearch
 *   Dropdown Filter (Orientation × Size) → AIDropdownFilter
 */

import React, { useState } from 'react';
import { AI, AI_RAMP } from '../../tokens/ai-tokens';
import { AIProgressBar } from '../ai-progress/AIProgress';

const FONT = 'var(--zs-font-family, "Open Sans", system-ui, sans-serif)';

const TOKEN = {
  fieldBg: 'var(--zs-background-default, #ffffff)',
  /** One step softer than AI.color.border.default, matching AIInputField. */
  fieldBorder: AI_RAMP[70],
  caret: 'var(--zs-icon-neutral-default, #5b5864)',
  helper: 'var(--zs-text-helper, #5b5864)',
  text: 'var(--zs-text-default, #2f2c3c)',
  buttonBg: AI.color.action.primary,
  buttonHover: AI.color.action.primaryHover,
  buttonInk: 'var(--zs-text-inverse, #fafafa)',
  error: 'var(--zs-background-error-bold, #b21111)',
} as const;

export type AISearchSize = 'normal' | 'small' | 'x-small';

export interface AISearchSizeSpec {
  height: number;
  padding: number;
  icon: number;
  font: number;
  gap: number;
  buttonPadding: number;
  radius: string;
  label: string;
}

export const AI_SEARCH_SIZES: Record<AISearchSize, AISearchSizeSpec> = {
  normal: { height: 50, padding: 14, icon: 24, font: 16, gap: 12, buttonPadding: 13, radius: AI.radius.md, label: 'Normal' },
  small: { height: 44, padding: 12, icon: 20, font: 14, gap: 10, buttonPadding: 11.5, radius: AI.radius.md, label: 'Small' },
  'x-small': { height: 38, padding: 11, icon: 18, font: 12, gap: 9, buttonPadding: 10, radius: AI.radius.sm, label: 'X-Small' },
};

export const AI_SEARCH_SIZE_ORDER: AISearchSize[] = ['normal', 'small', 'x-small'];
export const AI_SEARCH_NOT_RECOMMENDED: AISearchSize[] = ['x-small'];
export const AI_SEARCH_FIELD_WIDTH = 332;

const TRACKING: Record<AISearchSize, string> = {
  normal: '-0.144px',
  small: '-0.176px',
  'x-small': '-0.144px',
};
const LINE_HEIGHT: Record<AISearchSize, number> = {
  normal: 1.5,
  small: 1.4,
  'x-small': 1.5,
};

const SEARCH_PATH: Record<AISearchSize, { d: string; box: number }> = {
  normal: {
    box: 20.314,
    d: 'M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875V13.875Z',
  },
  small: {
    box: 16.9283,
    d: 'M13.3592 12.1808L16.9283 15.7492L15.7492 16.9283L12.1808 13.3592C10.8531 14.4235 9.20167 15.0024 7.5 15C3.36 15 0 11.64 0 7.5C0 3.36 3.36 0 7.5 0C11.64 0 15 3.36 15 7.5C15.0024 9.20167 14.4235 10.8531 13.3592 12.1808ZM11.6875 11.5625C12.7451 10.4749 13.3357 9.01702 13.3333 7.5C13.3333 4.27667 10.7225 1.66667 7.5 1.66667C4.27667 1.66667 1.66667 4.27667 1.66667 7.5C1.66667 10.7225 4.27667 13.3333 7.5 13.3333C9.01702 13.3357 10.4749 12.7451 11.5625 11.6875L11.6875 11.5625V11.5625Z',
  },
  'x-small': {
    box: 15.2355,
    d: 'M12.0233 10.9628L15.2355 14.1743L14.1743 15.2355L10.9628 12.0233C9.7678 12.9812 8.2815 13.5022 6.75 13.5C3.024 13.5 0 10.476 0 6.75C0 3.024 3.024 0 6.75 0C10.476 0 13.5 3.024 13.5 6.75C13.5022 8.2815 12.9812 9.7678 12.0233 10.9628ZM10.5187 10.4062C11.4706 9.42741 12.0022 8.11532 12 6.75C12 3.849 9.65025 1.5 6.75 1.5C3.849 1.5 1.5 3.849 1.5 6.75C1.5 9.65025 3.849 12 6.75 12C8.11532 12.0022 9.42741 11.4706 10.4062 10.5187L10.5187 10.4062V10.4062Z',
  },
};

const CARET_PATH: Record<AISearchSize, { d: string; w: number; h: number }> = {
  normal: { w: 12, h: 5.72727, d: 'M6 5.72727L0 0H12L6 5.72727Z' },
  small: { w: 10, h: 4.77273, d: 'M5 4.77273L0 0H10L5 4.77273Z' },
  'x-small': { w: 8.52632, h: 4.5, d: 'M4.26316 4.5L0 0H8.52632L4.26316 4.5Z' },
};

export function AISearchIcon({ size = 'normal', color = AI.color.brand }: { size?: AISearchSize; color?: string }) {
  const frame = AI_SEARCH_SIZES[size].icon;
  const { d, box } = SEARCH_PATH[size];
  return (
    <span
      aria-hidden="true"
      style={{ width: frame, height: frame, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} fill="none" focusable="false">
        <path d={d} fill={color} />
      </svg>
    </span>
  );
}

export function AICaretDownIcon({ size = 'normal' }: { size?: AISearchSize }) {
  const frame = AI_SEARCH_SIZES[size].icon;
  const { d, w, h } = CARET_PATH[size];
  return (
    <span
      aria-hidden="true"
      style={{ width: frame, height: frame, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" focusable="false">
        <path d={d} fill={TOKEN.caret} />
      </svg>
    </span>
  );
}

export interface AISearchFieldProps {
  size?: AISearchSize;
  leftIcon?: boolean;
  caret?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  'aria-label'?: string;
  width?: number | 'fill';
  asSelect?: boolean;
  disabled?: boolean;
  focusState?: boolean;
  style?: React.CSSProperties;
}

export function AISearchField({
  size = 'normal',
  leftIcon = true,
  caret = false,
  placeholder = 'Search...',
  value = '',
  onChange,
  ariaLabel,
  'aria-label': ariaLabelAttr,
  width = 'fill',
  asSelect = false,
  disabled = false,
  focusState,
  style,
}: AISearchFieldProps) {
  const spec = AI_SEARCH_SIZES[size];
  const [liveFocus, setLiveFocus] = useState(false);
  const focused = focusState ?? liveFocus;
  const filled = value.length > 0;
  const resolvedLabel = ariaLabel ?? ariaLabelAttr ?? placeholder;

  const boxStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    height: spec.height,
    padding: `0 ${spec.padding}px`,
    display: 'flex',
    alignItems: 'center',
    gap: spec.gap,
    background: TOKEN.fieldBg,
    border: `1px solid ${focused ? AI.color.border.focus : TOKEN.fieldBorder}`,
    borderRadius: spec.radius,
    boxShadow: disabled ? 'none' : focused ? AI.shadow.field.focus : AI.shadow.field.default,
    transition: 'box-shadow .15s ease, border-color .15s ease',
    width: width === 'fill' ? '100%' : width,
    flex: width === 'fill' ? '1 1 auto' : '0 0 auto',
    minWidth: 0,
    opacity: disabled ? 0.55 : 1,
    ...style,
  };

  const textStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: 0,
    fontFamily: FONT,
    fontSize: spec.font,
    fontWeight: 400,
    fontStyle: filled ? 'normal' : 'italic',
    letterSpacing: TRACKING[size],
    lineHeight: LINE_HEIGHT[size],
    color: filled ? TOKEN.text : TOKEN.helper,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: disabled ? 'not-allowed' : asSelect ? 'pointer' : 'text',
  };

  return (
    <div style={boxStyle}>
      {leftIcon && <AISearchIcon size={size} />}
      {asSelect ? (
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-label={resolvedLabel}
          onFocus={() => setLiveFocus(true)}
          onBlur={() => setLiveFocus(false)}
          style={textStyle}
        >
          {filled ? value : placeholder}
        </button>
      ) : (
        <input
          type="search"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          aria-label={resolvedLabel}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setLiveFocus(true)}
          onBlur={() => setLiveFocus(false)}
          style={textStyle}
        />
      )}
      {caret && <AICaretDownIcon size={size} />}
    </div>
  );
}

export interface AISearchProps {
  size?: AISearchSize;
  condensed?: boolean;
  button?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  buttonLabel?: string;
  fieldWidth?: number | 'fill';
  disabled?: boolean;
  busy?: boolean;
  focusState?: boolean;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

export function AISearch({
  size = 'normal',
  condensed = false,
  button = true,
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  buttonLabel = 'Search',
  fieldWidth = AI_SEARCH_FIELD_WIDTH,
  disabled = false,
  busy = false,
  focusState,
  'aria-label': ariaLabel,
  style,
}: AISearchProps) {
  const spec = AI_SEARCH_SIZES[size];
  const [hover, setHover] = useState(false);

  if (condensed) {
    return (
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel ?? buttonLabel}
        onClick={() => onSearch?.(value)}
        style={{
          boxSizing: 'border-box',
          width: spec.height,
          height: spec.height,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: TOKEN.fieldBg,
          border: `1px solid ${TOKEN.fieldBorder}`,
          borderRadius: AI.radius.full,
          boxShadow: disabled ? 'none' : AI.shadow.field.default,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.55 : 1,
          padding: 0,
          ...style,
        }}
      >
        <AISearchIcon size={size} />
      </button>
    );
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, ...style }}>
      <form
        role="search"
        aria-busy={busy || undefined}
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(value);
        }}
        style={{ display: 'flex', alignItems: 'stretch', gap: 8, fontFamily: FONT }}
      >
        <AISearchField
          size={size}
          leftIcon
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={fieldWidth}
          disabled={disabled}
          focusState={focusState}
          ariaLabel={ariaLabel ?? placeholder}
        />
        {button && (
          <button
            type="submit"
            disabled={disabled}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              boxSizing: 'border-box',
              padding: `${spec.buttonPadding}px 18px`,
              background: hover && !disabled ? TOKEN.buttonHover : TOKEN.buttonBg,
              border: `1px solid ${hover && !disabled ? TOKEN.buttonHover : TOKEN.buttonBg}`,
              borderRadius: spec.radius,
              color: TOKEN.buttonInk,
              fontFamily: FONT,
              fontSize: spec.font,
              fontWeight: 600,
              letterSpacing: '0.15px',
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1,
              transition: 'background .15s ease',
            }}
          >
            {buttonLabel}
          </button>
        )}
      </form>
      {busy && <AIProgressBar value={0} indeterminate size="hairline" label="Searching" width="100%" />}
    </div>
  );
}

export type AIDropdownFilterOrientation = 'horizontal' | 'vertical';

export interface AIDropdownFilterProps {
  size?: AISearchSize;
  orientation?: AIDropdownFilterOrientation;
  filterPlaceholder?: string;
  searchPlaceholder?: string;
  filterValue?: string;
  searchValue?: string;
  onFilterChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  disabled?: boolean;
  busy?: boolean;
  style?: React.CSSProperties;
}

export function AIDropdownFilter({
  size = 'normal',
  orientation = 'horizontal',
  filterPlaceholder = 'Select an option',
  searchPlaceholder = 'Search...',
  filterValue = '',
  searchValue = '',
  onFilterChange,
  onSearchChange,
  disabled = false,
  busy = false,
  style,
}: AIDropdownFilterProps) {
  const vertical = orientation === 'vertical';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: vertical ? AI_SEARCH_FIELD_WIDTH : AI_SEARCH_FIELD_WIDTH * 2 + 8,
        maxWidth: '100%',
        ...style,
      }}
    >
      <div
        role="search"
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          alignItems: vertical ? 'stretch' : 'center',
          gap: 8,
          fontFamily: FONT,
        }}
      >
        <AISearchField
          size={size}
          leftIcon={false}
          caret
          asSelect
          placeholder={filterPlaceholder}
          value={filterValue}
          onChange={onFilterChange}
          disabled={disabled}
        />
        <AISearchField
          size={size}
          leftIcon
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          disabled={disabled}
        />
      </div>
      {busy && <AIProgressBar value={0} indeterminate size="hairline" label="Filtering" width="100%" />}
    </div>
  );
}

export function AISearchNotRecommendedNote({
  children = 'X-SMALL IS NOT RECOMMENDED FOR USE',
}: {
  children?: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, letterSpacing: '0.4px', color: TOKEN.error }}>
      {children}
    </div>
  );
}

export default AISearch;
