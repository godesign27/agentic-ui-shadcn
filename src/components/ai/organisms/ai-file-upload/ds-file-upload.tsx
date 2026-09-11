import React from 'react';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AIProgress } from '../../atomic/ai-progress/AIProgress';

/**
 * DS File Upload
 * ===============
 * Standard-library organism: a drag-and-drop / browse upload control assembled
 * vertically from atomic sub-parts — a drop-zone container (leading icon + text
 * block + "Select File" button) and an "Uploaded files" list of file rows, each
 * with per-file state (in progress → progress bar, success, error → message).
 *
 * Variant matrix (per the deterministic spec):
 *   State  — 'in-progress' | 'completed' | 'success' | 'error'
 *   Single — true (one file row) | false (multiple file rows)
 *   Size   — 'normal' (16px) | 'small' (14px) | 'xsmall' (12px)
 *   Container state — 'default' | 'active' (drag-over) | 'disabled'
 *
 * Every color and dimension reads the design-system CSS variables from
 * globals.css so the whole control restyles when those tokens change; typography
 * uses only the "Open Sans" face. No raw hex in component logic.
 */

const F = '"Open Sans", system-ui, sans-serif';

/**
 * Theme layer. The standard 'standard' theme keeps the DS primary teal
 * (var(--primary) #2F6F7B) as the brand accent and renders the hardcoded square
 * DS button + teal progress bar. The 'ai' theme is the AI Surface Theme applied
 * to this same organism: the *only* thing that swaps is the teal primary → the AI
 * brand color (var(--color-ai-brand) #4D60E6); every neutral and semantic color
 * (foreground, helper, error, success, disabled, borders) stays identical. On the
 * AI surface the drop-zone CTA renders the real AIButton (primary-solid) and each
 * in-progress row renders the real AIProgress — never a hardcoded copy. Both
 * themes use the same inline-SVG DS iconography below.
 */
export type DSFileUploadTheme = 'standard' | 'ai';

export type DSFileUploadSize = 'normal' | 'small' | 'xsmall';
export type DSFileUploadState = 'in-progress' | 'completed' | 'success' | 'error';
export type DSUploadedFileState = 'in-progress' | 'default' | 'success' | 'error';
export type DSUploadContainerState = 'default' | 'active' | 'disabled';

export interface DSUploadedFile {
  id: string;
  name: string;
  size: string;
  state?: DSUploadedFileState;
  /** 0–100. Only used when state === 'in-progress'. */
  progress?: number;
  /** Shown below an error row when provided. */
  errorMessage?: string;
}

// Per-size geometry & type scale — body text 16 / 14 / 12 per spec.
const SIZES = {
  normal: { bodyFs: 16, helperFs: 16, labelFs: 12, errFs: 12, btnFs: 14, uploadIcon: 24, fileIcon: 20, actionIcon: 20, barH: 4 },
  small:  { bodyFs: 14, helperFs: 14, labelFs: 11, errFs: 12, btnFs: 13, uploadIcon: 20, fileIcon: 18, actionIcon: 18, barH: 4 },
  xsmall: { bodyFs: 12, helperFs: 12, labelFs: 10, errFs: 11, btnFs: 12, uploadIcon: 18, fileIcon: 16, actionIcon: 16, barH: 3 },
} as const;

// ── Tokens (globals.css) ──────────────────────────────────────────────────────
// Only the brand accent differs by theme — standard = DS primary teal
// (var(--primary)); AI = the AI brand color (var(--color-ai-brand)). Every neutral
// and semantic token is shared, so a theme switch swaps the accent and nothing
// else. Both read design-system CSS variables from globals.css (no raw hex).
function tokensFor(theme: DSFileUploadTheme) {
  const brand = theme === 'ai' ? 'var(--color-ai-brand)' : 'var(--primary)';
  return {
    text:        'var(--foreground)',              // #2F2C3C — body / file names
    helper:      'var(--helper-text-color)',       // #5B5864 — helper text, icons, default border
    brand,                                          // teal (standard) / AI brand (ai) — button/border/progress accent
    surface:     'var(--background)',              // #FFFFFF — container background
    onBrand:     'var(--inverse-text-color)',      // #FAFAFA — button text on accent
    error:       'var(--error-color)',             // #B21111 — error text/icons (semantic — shared)
    success:     'var(--success-color)',           // #0A6E5E — success icon (semantic — shared)
    disabled:    'var(--disabled-text-color)',     // #716E79 — disabled text/border/icons
    disabledBg:  'var(--surface-color-2)',         // #F4F3F3 — disabled button fill
    track:       'var(--border-light-color, #DEDCDE)', // progress bar unfilled track
    activeTint:  `color-mix(in srgb, ${brand} 10%, transparent)`, // drag-over bg
  };
}

// ── Icons ─────────────────────────────────────────────────────────────────────
// Canonical DS iconography rendered as inline SVG. The icon-font web-font shipped
// in this environment has NO glyph mappings (the @font-face embeds no glyphs, so
// <i class="zs-icon zs-icon-…"> falls back to garbled characters), therefore we
// mirror the exact vector paths from the design-system source of truth:
//   upstream AI component source · src/core/SVGs/…
// Every glyph is authored in a 24×24 viewBox; `color` binds to the passed
// CSS-variable value via `fill`, so the design system stays the single source
// for both shape and color.
function SvgIcon({ size, color, path }: { size: number; color: string; path: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'inline-flex' }}
    >
      <path d={path} fill={color} />
    </svg>
  );
}

// Vector paths — verbatim from the canonical SVG source (see note above).
const AI_ICON_PATHS = {
  'upload-file-fill': 'M16 2L21 7V21.008C20.9997 21.2712 20.895 21.5235 20.7088 21.7095C20.5226 21.8955 20.2702 22 20.007 22H3.993C3.73038 21.9982 3.47902 21.8931 3.29322 21.7075C3.10742 21.5219 3.00209 21.2706 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16ZM13 12H16L12 8L8 12H11V16H13V12Z',
  'doc-generic': 'M21 8V20.993C21.0009 21.1243 20.976 21.2545 20.9266 21.3762C20.8772 21.4979 20.8043 21.6087 20.7121 21.7022C20.6199 21.7957 20.5101 21.8701 20.3892 21.9212C20.2682 21.9723 20.1383 21.9991 20.007 22H3.993C3.72981 22 3.47739 21.8955 3.2912 21.7095C3.105 21.5235 3.00027 21.2712 3 21.008V2.992C3 2.455 3.449 2 4.002 2H14.997L21 8ZM19 9H14V4H5V20H19V9ZM8 7H11V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z',
  'check-circle-fill': 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.659 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z',
  'error-hexagon-fill': 'M17.5 2.5L23 12L17.5 21.5H6.5L1 12L6.5 2.5H17.5ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z',
  'delete': 'M7 4V2H17V4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z',
} as const;

const UploadFileIcon   = ({ size, color }: { size: number; color: string }) => <SvgIcon size={size} color={color} path={AI_ICON_PATHS['upload-file-fill']} />;
const DocIcon          = ({ size, color }: { size: number; color: string }) => <SvgIcon size={size} color={color} path={AI_ICON_PATHS['doc-generic']} />;
const CheckCircleIcon  = ({ size, color }: { size: number; color: string }) => <SvgIcon size={size} color={color} path={AI_ICON_PATHS['check-circle-fill']} />;
const ErrorHexagonIcon = ({ size, color }: { size: number; color: string }) => <SvgIcon size={size} color={color} path={AI_ICON_PATHS['error-hexagon-fill']} />;
const DeleteIcon       = ({ size, color }: { size: number; color: string }) => <SvgIcon size={size} color={color} path={AI_ICON_PATHS['delete']} />;

// ── Progress bar ──────────────────────────────────────────────────────────────
// Standard theme: filled teal fill + 70%-opacity neutral track (the DS spec).
// AI theme: the real AIProgress atom (never a hardcoded copy) — brand-blue fill,
// rounded track — sized to match the row's bar height.
function UploadProgressBar({
  value, height, label, theme,
}: { value: number; height: number; label?: string; theme: DSFileUploadTheme }) {
  const pct = Math.max(0, Math.min(100, value));

  if (theme === 'ai') {
    // size 'sm' → 4px, 'thin' → 2px; matches the standard barH (4 / 4 / 3).
    return (
      <div style={{ marginTop: 8 }}>
        <AIProgress value={pct} status="running" size={height <= 3 ? 'thin' : 'sm'} showLabel={false} ariaLabel={label} />
      </div>
    );
  }

  const C = tokensFor(theme);
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      style={{ position: 'relative', width: '100%', height, marginTop: 8 }}
    >
      <div style={{ position: 'absolute', inset: 0, background: C.track, opacity: 0.7 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`, background: C.brand }} />
    </div>
  );
}

// ── Select File button ────────────────────────────────────────────────────────
// Standard theme: the square DS button (0 radius per spec). AI theme: the real
// AIButton atom (primary-solid = flat AI brand color) — never a hardcoded copy.
const AI_BTN_SIZE: Record<DSFileUploadSize, 'sm' | 'md'> = { normal: 'md', small: 'sm', xsmall: 'sm' };

function SelectFileButton({
  label, size, disabled, onClick, theme,
}: { label: string; size: DSFileUploadSize; disabled?: boolean; onClick?: () => void; theme: DSFileUploadTheme }) {
  if (theme === 'ai') {
    return (
      <div style={{ flexShrink: 0 }}>
        <AIButton variant="primary-solid" radius="md" size={AI_BTN_SIZE[size]} label={label} disabled={disabled} onClick={onClick} />
      </div>
    );
  }

  const C = tokensFor(theme);
  const S = SIZES[size];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        flexShrink: 0,
        padding: 10.5,
        borderRadius: 0, // square per spec
        background: disabled ? C.disabledBg : C.brand,
        border: `1px solid ${disabled ? C.disabledBg : C.brand}`,
        color: disabled ? C.disabled : C.onBrand,
        fontFamily: F, fontSize: S.btnFs, fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.15px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ── Drop-zone container ───────────────────────────────────────────────────────
export interface DSFileUploadContainerProps {
  size?: DSFileUploadSize;
  state?: DSUploadContainerState;
  helperText?: boolean;
  primaryText?: string;
  helper?: string;
  buttonLabel?: string;
  onSelect?: () => void;
  theme?: DSFileUploadTheme;
}

export function DSFileUploadContainer({
  size = 'normal',
  state = 'default',
  helperText = true,
  primaryText = 'Select a file or drag and drop here',
  helper = 'JPG, PNG or PDF, file size no more than XMB',
  buttonLabel = 'Select File',
  onSelect,
  theme = 'standard',
}: DSFileUploadContainerProps) {
  const C = tokensFor(theme);
  const S = SIZES[size];
  const disabled = state === 'disabled';
  const active = state === 'active';

  const borderColor = disabled ? C.disabled : active ? C.brand : C.helper;
  const iconColor = disabled ? C.disabled : C.helper;
  const textColor = disabled ? C.disabled : C.text;

  return (
    <div
      role="group"
      aria-label="File upload"
      aria-disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '12px 24px',
        background: active ? C.activeTint : C.surface,
        border: `1px dashed ${borderColor}`, // uniform dashed drop-zone edge (spec dashPattern [3,3])
        borderRadius: 4,
        fontFamily: F,
      }}
    >
      <UploadFileIcon size={S.uploadIcon} color={iconColor} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: F, fontSize: S.bodyFs, fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.144px', color: textColor }}>
          {primaryText}
        </span>
        {helperText && (
          <span style={{ fontFamily: F, fontSize: S.helperFs, fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.144px', color: disabled ? C.disabled : C.helper }}>
            {helper}
          </span>
        )}
      </div>
      <SelectFileButton label={buttonLabel} size={size} disabled={disabled} onClick={onSelect} theme={theme} />
    </div>
  );
}

// ── Uploaded file row ─────────────────────────────────────────────────────────
export interface DSUploadedFileRowProps {
  file: DSUploadedFile;
  size?: DSFileUploadSize;
  onRemove?: (id: string) => void;
  theme?: DSFileUploadTheme;
}

export function DSUploadedFileRow({ file, size = 'normal', onRemove, theme = 'standard' }: DSUploadedFileRowProps) {
  const C = tokensFor(theme);
  const S = SIZES[size];
  const rowState = file.state ?? 'default';
  const isError = rowState === 'error';
  const isSuccess = rowState === 'success';
  const isProgress = rowState === 'in-progress';

  const nameColor = isError ? C.error : C.text;
  const leadingIcon = isSuccess
    ? <CheckCircleIcon size={S.fileIcon} color={C.success} />
    : isError
      ? <ErrorHexagonIcon size={S.fileIcon} color={C.error} />
      : <DocIcon size={S.fileIcon} color={C.helper} />;
  const deleteColor = isError ? C.error : C.helper;

  return (
    <li style={{ listStyle: 'none', fontFamily: F }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Left group: file icon + name (gap 16) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
          {leadingIcon}
          <span style={{
            fontFamily: F, fontSize: S.bodyFs, fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.144px',
            color: nameColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {file.name}
          </span>
        </div>
        {/* Right group: file size + delete (gap 8) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontFamily: F, fontSize: S.bodyFs, fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.144px', color: isError ? C.error : C.text }}>
            {file.size}
          </span>
          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            onClick={() => onRemove?.(file.id)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: 0, display: 'inline-flex' }}
          >
            <DeleteIcon size={S.actionIcon} color={deleteColor} />
          </button>
        </div>
      </div>

      {isProgress && <UploadProgressBar value={file.progress ?? 0} height={S.barH} label={`Uploading ${file.name}`} theme={theme} />}

      {isError && file.errorMessage && (
        <div role="alert" style={{ fontFamily: F, fontSize: S.errFs, fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.144px', color: C.error, marginTop: 6 }}>
          {file.errorMessage}
        </div>
      )}
    </li>
  );
}

// ── Full assembly ─────────────────────────────────────────────────────────────
export interface DSFileUploadProps {
  /** Overall variant; when `files` is omitted this seeds a representative list. */
  state?: DSFileUploadState;
  single?: boolean;
  size?: DSFileUploadSize;
  containerState?: DSUploadContainerState;
  helperText?: boolean;
  primaryText?: string;
  helper?: string;
  buttonLabel?: string;
  sectionLabel?: string;
  /** Provide real files; otherwise a demo list is derived from `state`/`single`. */
  files?: DSUploadedFile[];
  width?: number | string;
  onSelect?: () => void;
  onRemove?: (id: string) => void;
  /** 'standard' = DS primary teal + square button; 'ai' = AI brand + AIButton/AIProgress. */
  theme?: DSFileUploadTheme;
}

// Map the full-component State to the per-row state and seed demo rows.
function seedFiles(state: DSFileUploadState, single: boolean): DSUploadedFile[] {
  const rowState: DSUploadedFileState =
    state === 'in-progress' ? 'in-progress'
    : state === 'success'   ? 'success'
    : state === 'error'     ? 'error'
    :                         'default';
  const count = single ? 1 : 4;
  return Array.from({ length: count }, (_, i) => ({
    id: `file-${i}`,
    name: 'Uploaded_file_name.pdf',
    size: 'XX.XMB',
    state: rowState,
    progress: rowState === 'in-progress' ? [40, 65, 80, 55][i % 4] : undefined,
    errorMessage: rowState === 'error' && i === count - 1 ? 'Please try uploading the files again.' : undefined,
  }));
}

export function DSFileUpload({
  state = 'completed',
  single = true,
  size = 'normal',
  containerState = 'default',
  helperText = true,
  primaryText = 'Select a file or drag and drop here',
  helper = 'JPG, PNG or PDF, file size no more than XMB',
  buttonLabel = 'Select File',
  sectionLabel = 'Uploaded files',
  files,
  width = 552,
  onSelect,
  onRemove,
  theme = 'standard',
}: DSFileUploadProps) {
  const C = tokensFor(theme);
  const rows = files ?? seedFiles(state, single);
  const S = SIZES[size];

  return (
    <div style={{ width, fontFamily: F, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DSFileUploadContainer
        size={size}
        state={containerState}
        helperText={helperText}
        primaryText={primaryText}
        helper={helper}
        buttonLabel={buttonLabel}
        onSelect={onSelect}
        theme={theme}
      />

      {rows.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: F, fontSize: S.labelFs, fontWeight: 700, lineHeight: 1.5, letterSpacing: '-0.144px', color: C.text }}>
            {sectionLabel}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {rows.map((f) => (
              <DSUploadedFileRow key={f.id} file={f} size={size} onRemove={onRemove} theme={theme} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DSFileUpload;
