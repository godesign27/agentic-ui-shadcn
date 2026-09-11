import React, { useEffect, useRef } from 'react';
import { DSButton } from './ds-button';

/**
 * DS Dialog Component
 * =====================
 * Source of Truth: upstream AI component source → src/dialog/
 * (dialog.less, dialog.stories.js, DS-DIALOG.agent.md).
 * Governance: when the mirror spec and src disagree, src wins.
 *
 * Deterministic contract (from dialog.less + dialog.stories.js):
 *  - border-radius: 0; border: none; background: #ffffff.
 *  - shadow blur-3: 0 0 1px rgba(0,0,0,.04), 0 2px 6px rgba(26,22,40,.12),
 *                   0 10px 20px rgba(26,22,40,.18).
 *  - min-width 384px, min-height 152px.
 *  - default overlay rgba(255,255,255,0.9); inverse = dark; opacity 90/60/40/20%.
 *  - There is NO whole-dialog dark mode. The only dark treatment is the
 *    "Dark Header Modal": header bar only is darkened, body/footer stay light.
 *  - default footer: "Optional footer text" (left) + external-link icon (right).
 */

export const DS_DIALOG_SOURCE = {
  github: 'src/dialog/',
  mappings: {
    '--zs-text-default': 'Body/title text',
    '--zs-text-inverse': 'Title text on dark header',
    '--zs-text-helper': 'Helper text',
    '--zs-icon-neutral-default': 'Close / external-link icon',
    '--zs-icon-neutral-inverse': 'Close icon on dark header',
    '--zs-background-default': 'Dialog surface (#ffffff)',
    '--zs-background-extra-bold': 'Dark Header Modal header bar (zs-bg-surface-5)',
    '--zs-background-neutral-10': 'Subtle footer bg',
    '--zs-background-button-default': 'Primary/action button bg (teal #2f6f7b)',
    '--zs-background-button-white': 'Secondary button bg',
    '--zs-separator-default': 'Header/footer dividers',
    '--zs-scrollbar-background': 'Scrollbar track',
    '--zs-scrollbar-default': 'Scrollbar thumb',
    '--zs-border-focus': 'Close-button focus ring',
    'overlay-default': 'rgba(255,255,255,0.9) — white 90% backdrop',
    'overlay-inverse': 'rgba(26,22,40,0.9) — dark backdrop',
    'overlay-opacity': 'zs-bg-overlay-90/60/40/20 → .9/.6/.4/.2',
    '--zs-shadow-blur-3': 'Dialog elevation',
  },
};

export type DSDialogHeaderStyle = 'default' | 'dark';
export type DSDialogSize = 'small' | 'medium' | 'large';
export type DSDialogAlignment = 'left' | 'center';
export type DSDialogOverlayColor = 'default' | 'inverse';
export type DSDialogOverlayOpacity = 90 | 60 | 40 | 20;
export type DSDialogFooterButtons = 'one' | 'two';

export interface DSDialogProps {
  isOpen: boolean;
  /** Header treatment. `dark` darkens ONLY the header bar (Dark Header Modal). */
  header?: DSDialogHeaderStyle;
  size?: DSDialogSize;
  alignment?: DSDialogAlignment;
  hasFooter?: boolean;
  hasHelperText?: boolean;
  /** Backdrop color: white 90% (default) or dark (inverse). */
  overlayColor?: DSDialogOverlayColor;
  /** Backdrop opacity variant. */
  overlayOpacity?: DSDialogOverlayOpacity;
  /**
   * Convenience footer for the "Modal With Button" variant: one centered teal
   * action button, or two buttons (default + action). Overridden by `actions`.
   */
  footerButtons?: DSDialogFooterButtons;
  title: string;
  helperText?: string;
  body: React.ReactNode;
  onClose: () => void;
  /** Custom footer content. Overrides the default footer + footerButtons. */
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// blur-3 elevation, verbatim from dialog.less.
const SHADOW_BLUR_3 =
  '0px 0px 1px rgba(0,0,0,0.04), 0px 2px 6px rgba(26,22,40,0.12), 0px 10px 20px rgba(26,22,40,0.18)';

// External-link (frame-expand) glyph used in the default footer.
function ExternalLinkIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function DSDialog({
  isOpen,
  header = 'default',
  size = 'small',
  alignment = 'left',
  hasFooter = true,
  hasHelperText = false,
  overlayColor = 'default',
  overlayOpacity = 90,
  footerButtons,
  title,
  helperText,
  body,
  onClose,
  actions,
  className,
  style,
}: DSDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const scopeId = useRef(`ds-dialog-${Math.random().toString(36).slice(2, 9)}`).current;

  // Open/close the native dialog, capturing/returning focus to the trigger.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (isOpen && !node.open) {
      triggerRef.current = document.activeElement;
      node.showModal();
    } else if (!isOpen && node.open) {
      node.close();
      // Return focus to whatever opened the dialog.
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    }
  }, [isOpen]);

  // ESC (`cancel`) routes through onClose so parent state stays in sync.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    node.addEventListener('cancel', handleCancel);
    return () => node.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const isDarkHeader = header === 'dark';

  const surface = 'var(--zs-background-default, #ffffff)';
  const textColor = 'var(--zs-text-default, #2f2c3c)';
  const headerBg = isDarkHeader ? 'var(--zs-background-extra-bold, #1a1628)' : surface;
  const headerText = isDarkHeader ? 'var(--zs-text-inverse, #fafafa)' : textColor;
  const headerIcon = isDarkHeader
    ? 'var(--zs-icon-neutral-inverse, #ffffff)'
    : 'var(--zs-icon-neutral-default, #5b5864)';
  const separator = 'var(--zs-separator-default, #b2b0b6)';
  const teal = 'var(--zs-background-button-default, #2f6f7b)';

  // Size → width contract (Small 384 / 483 with footer, Medium 576, Large 1084).
  const width =
    size === 'small' ? (hasFooter ? 483 : 384) : size === 'medium' ? 576 : 1084;

  // Overlay color + opacity (default white / inverse dark).
  const overlayRGB = overlayColor === 'inverse' ? '26, 22, 40' : '255, 255, 255';
  const overlayAlpha = overlayOpacity / 100;

  const centered = alignment === 'center';

  // Modal-With-Button footer (centered action button(s)).
  const buttonFooter =
    footerButtons === 'two' ? (
      <>
        <DSButton type="outline" size="normal" onClick={onClose} label="Option1" />
        <DSButton type="solid" size="normal" onClick={onClose} label="Option2" />
      </>
    ) : footerButtons === 'one' ? (
      <DSButton type="solid" size="normal" onClick={onClose} label="Button" />
    ) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #${scopeId}::backdrop {
          background: rgba(${overlayRGB}, ${overlayAlpha});
        }
        #${scopeId} .ds-dialog-close:focus-visible {
          box-shadow: 0 0 0 2px ${headerBg}, 0 0 0 4px var(--zs-border-focus, #4d60e6) !important;
          outline: none;
        }
        #${scopeId} .ds-dialog-body::-webkit-scrollbar {
          width: 8px;
          background: var(--zs-scrollbar-background, #dedcde);
        }
        #${scopeId} .ds-dialog-body::-webkit-scrollbar-thumb {
          background: var(--zs-scrollbar-default, #716e79);
          border-radius: 0;
        }
      ` }} />
      <dialog
        id={scopeId}
        ref={dialogRef}
        className={`ds-dialog ${className || ''}`}
        aria-modal="true"
        aria-labelledby={`${scopeId}-title`}
        style={{
          width,
          minWidth: 384,
          minHeight: 152,
          maxWidth: '90vw',
          maxHeight: '90vh',
          padding: 0,
          border: 'none',
          borderRadius: 0,
          background: surface,
          color: textColor,
          boxShadow: SHADOW_BLUR_3,
          fontFamily: '"Open Sans", sans-serif',
          flexDirection: 'column',
          ...(isOpen ? { display: 'flex' } : {}),
          ...style,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: 16,
          background: headerBg,
          color: headerText,
          borderBottom: isDarkHeader ? 'none' : `1px solid ${separator}`,
        }}>
          <h4 id={`${scopeId}-title`} style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            color: headerText,
            flex: 1,
            textAlign: centered ? 'center' : 'left',
          }}>{title}</h4>
          <button
            className="ds-dialog-close"
            onClick={onClose}
            aria-label={`Close the ${title} overlay`}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: headerIcon,
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="ds-dialog-body" style={{
          padding: '16px',
          overflowY: 'auto',
          flex: 1,
          textAlign: centered ? 'center' : 'left',
          fontSize: 16,
          lineHeight: 1.5,
        }}>
          {body}
          {hasHelperText && helperText && (
            <div style={{ marginTop: 16, color: 'var(--zs-text-helper, #5b5864)', fontSize: 14 }}>
              {helperText}
            </div>
          )}
        </div>

        {/* Footer */}
        {hasFooter && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: actions || buttonFooter
              ? 'center'
              : 'space-between',
            gap: 12,
            padding: 16,
          }}>
            {actions || buttonFooter || (
              <>
                <span style={{ fontSize: 13, color: 'var(--zs-text-helper, #5b5864)' }}>
                  Optional footer text
                </span>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  role="link"
                  aria-label="Open in a new window"
                  style={{ display: 'inline-flex', color: teal, cursor: 'pointer' }}
                >
                  <ExternalLinkIcon color={teal} />
                </a>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
