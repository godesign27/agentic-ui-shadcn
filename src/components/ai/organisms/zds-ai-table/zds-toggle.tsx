import React from 'react';

/**
 * ZDS Toggle Component
 * =====================
 * Source of Truth: zsainc/9904PD0068_zds-ai-mirror → src/toggle/
 *
 * Binary on/off pill switch — semantically a checkbox, visually a sliding
 * handle in a rounded track. Normal (40×20px) and Small (32×16px) tracks.
 * Presentational: pass `active` to drive the ON visual; the host wires up
 * change handling. Error message is only shown on the disabled state (v6.8).
 *
 * Extracted from standardEntries/phaseF so both the standard-library staging
 * preview and the Theme Comparison page share one source of truth.
 */

const F = '"Open Sans", system-ui, sans-serif';

// Semantic token values mirrored from ZDS (--zs-*).
const TRACK_OFF = '#5b5864'; // --zs-border-neutral-functional
const TRACK_ON = '#2f6f7b'; // --zs-bg-btn-default (teal)
const BORDER_FOCUS = '#027aff'; // --zs-border-focus
const TEXT_DEFAULT = '#2f2c3c'; // --zs-text-default
const TEXT_DISABLED = '#716e79'; // --zs-text-disabled
const ICON_ERROR = '#b21111'; // --zs-icon-error

export interface ZdsToggleProps {
  active?: boolean;
  size?: 'normal' | 'small';
  disabled?: boolean;
  focused?: boolean;
  label?: string;
  errorMsg?: string;
}

export function ZdsToggle({
  active = false,
  size = 'normal',
  disabled = false,
  focused = false,
  label,
  errorMsg,
}: ZdsToggleProps) {
  const w = size === 'normal' ? 40 : 32;
  const h = size === 'normal' ? 20 : 16;
  const handle = h - 4;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, fontFamily: F }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1 }}>
        <button type="button" role="switch" aria-checked={active} disabled={disabled}
          style={{
            position: 'relative', width: w, height: h, padding: 0, border: 'none',
            background: active ? TRACK_ON : TRACK_OFF, borderRadius: h / 2,
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: focused ? `0 0 0 2px #fff, 0 0 0 4px ${BORDER_FOCUS}` : undefined,
            transition: 'background .2s',
          }}>
          <span aria-hidden="true" style={{
            position: 'absolute', top: 2,
            left: active ? w - handle - 2 : 2,
            width: handle, height: handle, background: '#fff', borderRadius: '50%',
            transition: 'left .2s ease-in-out',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }} />
        </button>
        {label && <span style={{ fontSize: 14, color: disabled ? TEXT_DISABLED : TEXT_DEFAULT }}>{label}</span>}
      </label>
      {errorMsg && disabled && (
        <span role="alert" style={{ fontSize: 11, color: ICON_ERROR }}>{errorMsg}</span>
      )}
    </div>
  );
}

export default ZdsToggle;
