/**
 * AIFileAttachment — compact atom for displaying user-attached files in
 * AI input surfaces (ai-dialog, AI Command Center composer, AI Side Drawer
 * composer, etc.).
 *
 * Does NOT own the file picker, drag-and-drop, upload API, or validation.
 * It only represents an already-selected file's state (default, uploading,
 * processing, unsupported, error, disabled, removing, file-too-large,
 * permission-restricted, virus-scan-pending, virus-scan-failed) and renders
 * a remove control so the user can clear it before submitting the prompt.
 *
 * Icon mapping priority (per spec):
 *   1. Guild icon when a matching name exists in AIIcon's registry
 *   2. Lucide React fallback
 *   3. Generic `file` icon
 */

import React, { useState } from 'react';
import { RiFileTextLine, RiFileCodeLine, RiFileZipLine, RiAlertLine, RiCloseLine, RiLoader4Line } from '@remixicon/react'
import { RiFileLine, RiFileExcel2Line, RiFileImageLine, RiPresentationLine, RiRefreshLine } from '@remixicon/react';
import { F, AI, DS, SIGNAL_ORANGE } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Public types ────────────────────────────────────────────────────────────

export type AIFileCategory =
  | 'document'
  | 'spreadsheet'
  | 'presentation'
  | 'image'
  | 'code'
  | 'archive'
  | 'generic'
  | 'unsupported';

export type AIFileAttachmentStatus =
  | 'default'
  | 'uploading'
  | 'processing'
  | 'unsupported'
  | 'error'
  | 'disabled'
  | 'removing'
  | 'fileTooLarge'
  | 'permissionRestricted'
  | 'virusScanPending'
  | 'virusScanFailed';

export type AIFileAttachmentSize = 'compact' | 'standard';

export interface AIFileAttachmentProps {
  /** REQUIRED. Visible file name including extension when possible. */
  fileName:           string;
  /** Explicit file type label (e.g. "DOCX"). Wins over extension inference. */
  fileType?:          string;
  /** Formatted size string (e.g. "2.3 MB"). Atom does not format. */
  fileSize?:          string;
  /** Explicit category. Inferred from fileType/extension when omitted. */
  fileCategory?:      AIFileCategory;
  /** State of the attachment — drives status text, icon treatment, controls. */
  status?:            AIFileAttachmentStatus;
  /** Size variant. compact = inline chip; standard = roomy chip with status line. */
  size?:              AIFileAttachmentSize;
  /** 0–100. Renders a thin progress bar when status === 'uploading' | 'processing'. */
  progress?:          number;
  /** Custom error copy (overrides the default per status). */
  errorMessage?:      string;
  /** Optional helper text (e.g. "Try PDF, DOCX, XLSX, CSV, TXT, PNG, or JPG."). */
  helperText?:        string;
  /** When status === 'disabled', shown as accessible reason on the remove button. */
  disabledReason?:    string;
  /** Show file size in metadata row. Defaults to true if fileSize is provided. */
  showFileSize?:      boolean;
  /** Show file type badge. Defaults to true. */
  showFileType?:      boolean;
  /** Click handler for the remove / cancel control. Required for the button to render. */
  onRemove?:          () => void;
  /** Click handler for Retry — only renders when status === 'error'. */
  onRetry?:           () => void;
}

// ── RiFileLine-type inference ─────────────────────────────────────────────────────

const EXT_TO_CATEGORY: Record<string, AIFileCategory> = {
  // Documents
  pdf: 'document', doc: 'document', docx: 'document', txt: 'document', rtf: 'document',
  // Spreadsheets
  xls: 'spreadsheet', xlsx: 'spreadsheet', csv: 'spreadsheet',
  // Presentations
  ppt: 'presentation', pptx: 'presentation',
  // Images
  png: 'image', jpg: 'image', jpeg: 'image', webp: 'image', svg: 'image', gif: 'image',
  // Web / code
  html: 'code', css: 'code', js: 'code', json: 'code', xml: 'code', md: 'code',
  // Archives
  zip: 'archive', rar: 'archive', '7z': 'archive',
};

/** Extracts the lowercase extension after the LAST dot, or '' when missing. */
export function getFileExtension(name: string): string {
  if (!name) return '';
  const dot = name.lastIndexOf('.');
  if (dot <= 0 || dot === name.length - 1) return '';
  return name.slice(dot + 1).toLowerCase();
}

/** Resolves the category given an explicit fileType, fileCategory, or filename. */
export function getFileAttachmentCategory(
  fileName: string,
  fileType?: string,
  fileCategory?: AIFileCategory,
): AIFileCategory {
  if (fileCategory) return fileCategory;
  const probe = (fileType ?? '').toLowerCase().replace(/^\./, '');
  if (probe && EXT_TO_CATEGORY[probe]) return EXT_TO_CATEGORY[probe];
  const ext = getFileExtension(fileName);
  if (ext && EXT_TO_CATEGORY[ext]) return EXT_TO_CATEGORY[ext];
  return 'generic';
}

/** Lucide icon component for a category. Guild icons would be preferred when
    they exist in AIIcon's registry — none of the file-* names exist there
    today, so the spec's documented Lucide fallback is the actual rendering. */
function iconForCategory(category: AIFileCategory) {
  switch (category) {
    case 'document':     return RiFileTextLine;
    case 'spreadsheet':  return RiFileExcel2Line;
    case 'presentation': return RiPresentationLine;
    case 'image':        return RiFileImageLine;
    case 'code':         return RiFileCodeLine;
    case 'archive':      return RiFileZipLine;
    case 'unsupported':  return RiAlertLine;
    case 'generic':
    default:             return RiFileLine;
  }
}

// ── Status meta ─────────────────────────────────────────────────────────────

type StatusMeta = {
  text:        string | null;
  tone:        'neutral' | 'progress' | 'warning' | 'error';
  showSpinner: boolean;
  showProgress: boolean;
  iconKind:    'category' | 'warning';
};

const DEFAULT_STATUS_TEXT: Record<AIFileAttachmentStatus, string | null> = {
  default:              null,
  uploading:            'Uploading…',
  processing:           'Processing…',
  unsupported:          'File type not supported',
  error:                'Upload failed',
  disabled:             null,
  removing:             'Removing…',
  fileTooLarge:         'File is too large',
  permissionRestricted: 'File access restricted',
  virusScanPending:     'Scanning…',
  virusScanFailed:      'File failed security scan',
};

function statusMeta(status: AIFileAttachmentStatus, custom?: string): StatusMeta {
  const text = custom ?? DEFAULT_STATUS_TEXT[status];
  switch (status) {
    case 'uploading':            return { text, tone: 'progress', showSpinner: true,  showProgress: true,  iconKind: 'category' };
    case 'processing':
    case 'virusScanPending':     return { text, tone: 'progress', showSpinner: true,  showProgress: true,  iconKind: 'category' };
    case 'unsupported':
    case 'fileTooLarge':
    case 'permissionRestricted': return { text, tone: 'warning',  showSpinner: false, showProgress: false, iconKind: 'warning'  };
    case 'error':
    case 'virusScanFailed':      return { text, tone: 'error',    showSpinner: false, showProgress: false, iconKind: 'warning'  };
    case 'removing':             return { text, tone: 'neutral',  showSpinner: true,  showProgress: false, iconKind: 'category' };
    case 'disabled':
    case 'default':
    default:                     return { text, tone: 'neutral',  showSpinner: false, showProgress: false, iconKind: 'category' };
  }
}

const TONE_COLORS = {
  neutral:  { fg: DS.textHelper,      bg: 'transparent',                     border: 'var(--ai-card-border)' },
  progress: { fg: AI.color.action.primary, bg: 'var(--ai-brand-surface)',     border: 'var(--ai-brand-border)' },
  warning:  { fg: SIGNAL_ORANGE[80],       bg: SIGNAL_ORANGE['00'] as string,         border: SIGNAL_ORANGE[30] as string },
  error:    { fg: 'var(--ai-status-error-text, #B21111)', bg: 'var(--ai-status-error-bg, #FFEDE9)', border: 'var(--ai-status-error-border, #F5C6C6)' },
} as const;

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Truncate the middle of long names but keep extension visible. */
function truncateName(name: string, max: number): string {
  if (name.length <= max) return name;
  const ext  = getFileExtension(name);
  if (!ext) return name.slice(0, max - 1) + '…';
  const keepEnd  = ext.length + 1;            // ".docx"
  const keepHead = Math.max(1, max - keepEnd - 1);
  return name.slice(0, keepHead) + '…' + name.slice(-keepEnd);
}

// ── Component ───────────────────────────────────────────────────────────────

export function AIFileAttachment({
  fileName,
  fileType,
  fileSize,
  fileCategory,
  status        = 'default',
  size          = 'standard',
  progress,
  errorMessage,
  helperText,
  disabledReason,
  showFileSize,
  showFileType  = true,
  onRemove,
  onRetry,
}: AIFileAttachmentProps) {
  const [hovRemove, setHovRemove] = useState(false);
  const [hovRetry,  setHovRetry]  = useState(false);

  // Resolve presentation.
  const isUnsupported = status === 'unsupported';
  const category      = isUnsupported
    ? 'unsupported'
    : getFileAttachmentCategory(fileName, fileType, fileCategory);
  const Icon          = iconForCategory(category);
  const meta          = statusMeta(status, status === 'error' ? errorMessage : undefined);
  const tone          = TONE_COLORS[meta.tone];
  const ext           = getFileExtension(fileName);
  const typeLabel     = (fileType ?? ext ?? '').toUpperCase() || 'FILE';

  // Sizing tokens.
  const iconPx        = size === 'compact' ? 20 : 24;
  const padY          = size === 'compact' ? 6 : 8;
  const padX          = size === 'compact' ? 8 : 12;
  const nameFs        = size === 'compact' ? 12 : 13;
  const metaFs        = size === 'compact' ? 10 : 11;
  const maxNameChars  = size === 'compact' ? 22 : 38;

  const visibleName   = truncateName(fileName, maxNameChars);
  const isTruncated   = visibleName !== fileName;

  // Accessibility label — full file name + type + status.
  const ariaParts = [
    isUnsupported ? `Unsupported attached file: ${fileName}, file type not supported`
                  : `Attached file: ${fileName}${typeLabel ? `, ${typeLabel}` : ''}`,
    meta.text && status !== 'default' && status !== 'disabled' ? meta.text : null,
  ].filter(Boolean);

  const removeDisabled = status === 'removing' || status === 'disabled';
  const removeLabel    = status === 'uploading'  ? `Cancel upload of ${fileName}`
                      : status === 'processing' ? `Cancel processing of ${fileName}`
                      : `Remove ${fileName}`;

  const containerBorder = (status === 'default' || status === 'disabled' || status === 'removing')
    ? 'var(--ai-card-border)'
    : tone.border;
  const containerBg = (status === 'default' || status === 'disabled' || status === 'removing')
    ? 'var(--ai-card-bg)'
    : tone.bg;

  return (
    <div
      role="group"
      aria-label={ariaParts.join(' — ')}
      title={isTruncated ? fileName : undefined}
      style={{
        display:        'inline-flex',
        alignItems:     size === 'compact' ? 'center' : 'flex-start',
        gap:            10,
        padding:        `${padY}px ${padX}px`,
        background:     containerBg,
        border:         `1px solid ${containerBorder}`,
        borderRadius:   AI.radius.xs,
        fontFamily:     F,
        maxWidth:       size === 'compact' ? 280 : 380,
        boxSizing:      'border-box',
        opacity:        status === 'disabled' ? 0.6 : 1,
      }}
    >
      {/* ── Icon column ────────────────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        style={{
          flexShrink:    0,
          width:         iconPx,
          height:        iconPx,
          display:       'inline-flex',
          alignItems:    'center',
          justifyContent: 'center',
          color:         meta.iconKind === 'warning' ? tone.fg : DS.textDefault,
        }}
      >
        {meta.showSpinner ? (
          <RiLoader4Line
            size={iconPx}
            style={{
              animation: 'aiFileAttachmentSpin 1.2s linear infinite',
            }}
          />
        ) : (
          <Icon size={iconPx} strokeWidth={1.5} />
        )}
        <style>{`
          @keyframes aiFileAttachmentSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) { svg[style*="aiFileAttachmentSpin"] { animation: none !important; } }
        `}</style>
      </span>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 0,
        flex: 1,
      }}>
        {/* Name + type/size on one row */}
        <span style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           6,
          minWidth:      0,
        }}>
          <span style={{
            fontSize:    nameFs,
            fontWeight:  600,
            color:       DS.textDefault,
            whiteSpace:  'nowrap',
            overflow:    'hidden',
            textOverflow: 'ellipsis',
            minWidth:    0,
          }}>
            {visibleName}
          </span>
          {showFileType && typeLabel && (
            <span style={{
              ...AI_TYPOGRAPHY['@ai-meta-label'],
              fontFamily: F,
              fontSize:    metaFs,
              padding:     '1px 6px',
              background:  'var(--ai-track-bg)',
              border:      '1px solid var(--ai-card-border)',
              borderRadius: AI.radius.xs,
              color:       DS.textHelper,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              whiteSpace:  'nowrap',
              flexShrink:  0,
            }}>
              {typeLabel}
            </span>
          )}
          {(showFileSize ?? !!fileSize) && fileSize && (
            <span style={{
              fontSize: metaFs,
              color:    DS.textHelper,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              · {fileSize}
            </span>
          )}
        </span>

        {/* Status line (text + optional progress) */}
        {(meta.text || meta.showProgress) && (
          <span style={{
            display:    'flex',
            flexDirection: 'column',
            gap:        4,
            marginTop:  size === 'compact' ? 0 : 2,
          }}>
            {meta.text && (
              <span
                role={meta.tone === 'error' || meta.tone === 'warning' ? 'status' : undefined}
                aria-live={meta.tone === 'error' || meta.tone === 'warning' ? 'polite' : undefined}
                style={{
                  fontSize: metaFs,
                  color:    tone.fg,
                  fontWeight: meta.tone === 'neutral' ? 400 : 600,
                }}
              >
                {meta.text}
              </span>
            )}
            {meta.showProgress && typeof progress === 'number' && (
              <span
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.max(0, Math.min(100, Math.round(progress)))}
                style={{
                  display:   'block',
                  height:    3,
                  width:     '100%',
                  maxWidth:  140,
                  background: 'var(--ai-track-bg)',
                  borderRadius: AI.radius.xs,
                  overflow:  'hidden',
                }}
              >
                <span style={{
                  display:    'block',
                  height:     '100%',
                  width:      `${Math.max(0, Math.min(100, progress))}%`,
                  background: AI.color.action.primary,
                  transition: 'width 0.2s ease',
                }} />
              </span>
            )}
            {helperText && (
              <span style={{
                fontSize: metaFs,
                color:    DS.textHelper,
              }}>
                {helperText}
              </span>
            )}
          </span>
        )}
      </span>

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      {status === 'error' && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          onMouseEnter={() => setHovRetry(true)}
          onMouseLeave={() => setHovRetry(false)}
          aria-label={`Retry uploading ${fileName}`}
          style={{
            flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', gap: 4,
            height:  28, padding: '0 8px',
            background: hovRetry ? 'var(--ai-brand-surface)' : 'transparent',
            border:    `1px solid ${AI.color.action.primary}`,
            borderRadius: AI.radius.xs,
            color:     AI.color.action.primary,
            fontFamily: F, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            transition: 'background 0.12s ease',
          }}
        >
          <RiRefreshLine size={12} strokeWidth={2} />
          <span>Retry</span>
        </button>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={removeDisabled ? undefined : onRemove}
          disabled={removeDisabled}
          aria-label={removeLabel}
          aria-disabled={removeDisabled || undefined}
          title={removeDisabled && disabledReason ? disabledReason : undefined}
          onMouseEnter={() => setHovRemove(true)}
          onMouseLeave={() => setHovRemove(false)}
          style={{
            flexShrink: 0,
            width:  28, height: 28,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background:   hovRemove && !removeDisabled ? 'var(--ai-track-bg)' : 'transparent',
            border:       '1px solid transparent',
            borderRadius: AI.radius.xs,
            color:        removeDisabled ? DS.textDisabled : DS.textHelper,
            cursor:       removeDisabled ? 'not-allowed' : 'pointer',
            transition:   'background 0.12s ease, color 0.12s ease',
          }}
        >
          <RiCloseLine size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export default AIFileAttachment;
