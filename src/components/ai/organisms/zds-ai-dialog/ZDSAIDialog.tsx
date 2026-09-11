import React, { useRef } from 'react';
import { ZdsDialog, type ZdsDialogProps } from './zds-dialog';
import { AI } from '../../tokens/ai-tokens';

/**
 * ZDS AI Dialog
 * =============
 * The canonical ZDS Dialog, re-skinned in the ZAIDYN AI brand.
 *
 * Design principle (repo memory: ai-reskin-zds-atom-via-css-vars):
 *   Do NOT fork ZdsDialog. Wrap it and re-anchor the `--zs-*` custom properties
 *   it reads to AI token values. All geometry, focus-trap, ESC handling,
 *   native `<dialog>`/`showModal()` mechanics, and a11y are inherited from the
 *   canonical component — only the brand skin changes.
 *
 * What the AI skin re-anchors (via the merged `style` prop → wins over base):
 *   --zs-background-button-default  → AI action primary (#4D60E6)  (footer button,
 *                                      external-link icon, "Modal With Button" CTAs)
 *   --zs-background-extra-bold      → AI navy ZSAI[100] (dark-header bar)
 *   --zs-separator-default          → AI brand border (#BECAFE, soft brand divider)
 *   --zs-icon-neutral-default       → AI brand (#4D60E6, close icon)
 *   --zs-text-helper                → AI text secondary (#3544A4, footer/helper)
 *   --zs-border-focus               → AI focus ring (#4D60E6)
 * Plus AI shape: rounded corners (radius lg), AI-tinted elevation, clipped header,
 * and a frosted AI backdrop (light indigo / dark navy) via a scoped `::backdrop`.
 *
 * Body copy stays on the neutral ink for AA legibility; the brand reads through
 * the header, actions, dividers, corners, and overlay.
 */

export type { ZdsDialogSize, ZdsDialogAlignment, ZdsDialogHeaderStyle, ZdsDialogOverlayColor, ZdsDialogOverlayOpacity, ZdsDialogFooterButtons } from './zds-dialog';

export interface ZDSAIDialogProps extends Omit<ZdsDialogProps, 'isOpen' | 'title' | 'body' | 'onClose'> {
  /** Corner radius scale. Defaults to the AI panel radius (lg = 20px). */
  radius?: keyof typeof AI.radius;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactNode;
  onClose?: () => void;
}

/** Demo dialog content for bare mounts / galleries. */
export const SAMPLE_ZDS_DIALOG = {
  isOpen: true,
  title: 'Confirm recommendation',
  body: 'Apply the Mid-Atlantic territory rebalance? Two FTEs will shift toward PA-07 and NJ-03.',
  onClose: () => undefined as void,
};

// AI-tinted elevation: a hairline brand ring + soft navy depth.
const AI_SHADOW =
  '0 0 0 1px rgba(77,96,230,0.10), 0px 12px 40px rgba(31,42,102,0.20), 0px 2px 8px rgba(26,22,40,0.12)';

export function ZDSAIDialog({
  radius = 'lg',
  overlayColor = 'default',
  overlayOpacity = 90,
  className,
  style,
  isOpen = SAMPLE_ZDS_DIALOG.isOpen,
  title = SAMPLE_ZDS_DIALOG.title,
  body = SAMPLE_ZDS_DIALOG.body,
  onClose = SAMPLE_ZDS_DIALOG.onClose,
  ...rest
}: ZDSAIDialogProps) {
  // Stable scope class so our ::backdrop override wins deterministically.
  const scopeClass = useRef(`zds-ai-dialog-${Math.random().toString(36).slice(2, 9)}`).current;

  const alpha = overlayOpacity / 100;
  // Frosted AI backdrop: light indigo wash (default) or deep navy (inverse).
  const backdrop =
    overlayColor === 'inverse'
      ? `rgba(31, 42, 102, ${alpha})` // ZSAI[100] navy
      : `rgba(213, 222, 253, ${Math.min(alpha, 0.85)})`; // ZSAI[20] brand-subtle frost

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        dialog.${scopeClass}::backdrop {
          background: ${backdrop} !important;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      ` }} />
      <ZdsDialog
        {...rest}
        isOpen={isOpen}
        title={title}
        body={body}
        onClose={onClose}
        overlayColor={overlayColor}
        overlayOpacity={overlayOpacity}
        className={`${scopeClass} ${className || ''}`}
        style={{
          borderRadius: AI.radius[radius],
          boxShadow: AI_SHADOW,
          overflow: 'hidden', // clip the header skin to the rounded top corners
          // ── AI brand re-anchors (cascade to header, footer button, close icon,
          //    dividers, focus ring, and the ZdsButton in "Modal With Button") ──
          ['--zs-background-button-default' as any]: AI.color.action.primary,
          ['--zs-background-extra-bold' as any]: AI.color.brandInk,
          ['--zs-separator-default' as any]: AI.color.brandBorder,
          ['--zs-icon-neutral-default' as any]: AI.color.brand,
          ['--zs-text-helper' as any]: AI.color.text.secondary,
          ['--zs-border-focus' as any]: AI.color.border.focus,
          ...style,
        }}
      />
    </>
  );
}

export { ZDSAIDialog as ZdsAiDialog };

export default ZDSAIDialog;

