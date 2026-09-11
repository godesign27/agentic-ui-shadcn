/**
 * Builds a resolved AI semantic color map from optional Tier 1 palette overrides.
 * Imports base palettes from ai-tokens.ts — does not modify that file.
 */

import { AI, ZSAI, ZSAI_TAN, ZS_ORANGE } from '../ai-tokens';
import type { PaletteOverrides, SurfaceCssOverrides } from '../themes/palette-types';

type PaletteRamp = typeof ZSAI;

function mergeRamp(base: PaletteRamp, overrides?: Partial<PaletteRamp>): PaletteRamp {
  return { ...base, ...overrides } as PaletteRamp;
}

export type ResolvedAISemantics = {
  action: { primary: string; primaryHover: string; primaryActive: string };
  surface: { default: string; subtle: string; emphasis: string };
  border: { default: string; strong: string; focus: string };
  text: { primary: string; secondary: string; onAction: string };
  brand: string;
  brandSubtle: string;
  brandSurface: string;
  brandBorder: string;
  brandStrong: string;
  brandInk: string;
  signal: { default: string; hover: string; strong: string; subtle: string; surface: string };
  companion: { paper: string; surface: string; highlight: string; border: string; ink: string };
  gradient: {
    actionFull: string;
    actionSecondary: string;
    surfaceIdle: string;
    surfaceActive: string;
    surfaceSubtle: string;
  };
  shadow: {
    actionDefault: string;
    actionEmphasis: string;
    inputDefault: string;
    inputFocus: string;
  };
  radius: typeof AI.radius;
};

export function createAISemantics(palette?: PaletteOverrides): ResolvedAISemantics {
  const zsai = mergeRamp(ZSAI, palette?.ZSAI);
  const zsOrange = mergeRamp(ZS_ORANGE, palette?.ZS_ORANGE);
  const zsaiTan = mergeRamp(ZSAI_TAN, palette?.ZSAI_TAN);

  return {
    action: {
      primary: zsai[60],
      primaryHover: zsai[70],
      primaryActive: zsai[80],
    },
    surface: {
      default: zsai['00'],
      subtle: zsai[10],
      emphasis: zsai[20],
    },
    border: {
      default: zsai[20],
      strong: zsai[40],
      focus: zsai[50],
    },
    text: {
      primary: zsai[90],
      secondary: zsai[70],
      onAction: '#FFFFFF',
    },
    brand: zsai[60],
    brandSubtle: zsai[10],
    brandSurface: zsai['00'],
    brandBorder: zsai[20],
    brandStrong: zsai[90],
    brandInk: zsai[100],
    signal: {
      default: zsOrange[60],
      hover: zsOrange[70],
      strong: zsOrange[80],
      subtle: zsOrange[10],
      surface: zsOrange['00'],
    },
    companion: {
      paper: zsaiTan['00'],
      surface: zsaiTan[10],
      highlight: zsaiTan[20],
      border: zsaiTan[30],
      ink: zsaiTan[100],
    },
    gradient: {
      actionFull: `linear-gradient(135deg, ${zsai[50]} 0%, ${zsai[60]} 100%)`,
      actionSecondary: `linear-gradient(135deg, ${zsai[40]} 0%, ${zsai[50]} 50%, ${zsai[60]} 100%)`,
      surfaceIdle: AI.gradient.surface.idle,
      surfaceActive: AI.gradient.surface.active,
      surfaceSubtle: AI.gradient.surface.subtle,
    },
    shadow: {
      actionDefault: AI.shadow.action.default,
      actionEmphasis: AI.shadow.action.emphasis,
      inputDefault: AI.shadow.input.default,
      inputFocus: AI.shadow.input.focus,
    },
    radius: AI.radius,
  };
}

/** Maps resolved semantics to Tier 3 --ai-* CSS custom properties. */
export function semanticsToCssVars(semantics: ResolvedAISemantics): Record<string, string> {
  return {
    '--ai-action-primary': semantics.action.primary,
    '--ai-action-primary-hover': semantics.action.primaryHover,
    '--ai-action-primary-active': semantics.action.primaryActive,
    '--ai-surface-default': semantics.surface.default,
    '--ai-surface-subtle': semantics.surface.subtle,
    '--ai-surface-emphasis': semantics.surface.emphasis,
    '--ai-border-default': semantics.border.default,
    '--ai-border-strong': semantics.border.strong,
    '--ai-border-focus': semantics.border.focus,
    '--ai-text-primary': semantics.text.primary,
    '--ai-text-secondary': semantics.text.secondary,
    '--ai-text-on-action': semantics.text.onAction,
    '--ai-brand': semantics.brand,
    '--ai-brand-subtle': semantics.brandSubtle,
    '--ai-brand-surface': semantics.brandSurface,
    '--ai-brand-border': semantics.brandBorder,
    '--ai-brand-strong': semantics.brandStrong,
    '--ai-brand-ink': semantics.brandInk,
    '--ai-signal': semantics.signal.default,
    '--ai-signal-hover': semantics.signal.hover,
    '--ai-signal-strong': semantics.signal.strong,
    '--ai-signal-subtle': semantics.signal.subtle,
    '--ai-signal-surface': semantics.signal.surface,
    '--ai-companion-paper': semantics.companion.paper,
    '--ai-companion-surface': semantics.companion.surface,
    '--ai-companion-highlight': semantics.companion.highlight,
    '--ai-companion-border': semantics.companion.border,
    '--ai-companion-ink': semantics.companion.ink,
    '--ai-gradient-action-full': semantics.gradient.actionFull,
    '--ai-gradient-action-secondary': semantics.gradient.actionSecondary,
    '--ai-gradient-surface-idle': semantics.gradient.surfaceIdle,
    '--ai-gradient-surface-active': semantics.gradient.surfaceActive,
    '--ai-gradient-surface-subtle': semantics.gradient.surfaceSubtle,
    '--ai-shadow-action-default': semantics.shadow.actionDefault,
    '--ai-shadow-action-emphasis': semantics.shadow.actionEmphasis,
    '--ai-shadow-input-default': semantics.shadow.inputDefault,
    '--ai-shadow-input-focus': semantics.shadow.inputFocus,
    '--ai-radius-xs': semantics.radius.xs,
    '--ai-radius-sm': semantics.radius.sm,
    '--ai-radius-md': semantics.radius.md,
    '--ai-radius-lg': semantics.radius.lg,
    '--ai-radius-full': semantics.radius.full,
    '--ai-card-bg': semantics.surface.subtle,
    '--ai-zds-text': '#2f2c3c',
    '--ai-zds-text-helper': '#5b5864',
    '--ai-font-family': '"Open Sans", sans-serif',
  };
}

export function createSurfaceCssVars(
  palette?: PaletteOverrides,
  cssOverrides?: SurfaceCssOverrides,
): Record<string, string> {
  const semantics = createAISemantics(palette);
  return { ...semanticsToCssVars(semantics), ...cssOverrides };
}
