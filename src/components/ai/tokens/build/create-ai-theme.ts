/**
 * Builds a resolved AI semantic color map from optional Tier 1 palette overrides.
 * Imports base palettes from ai-tokens.ts — does not modify that file.
 */

import { AI, AI_RAMP, COMPANION_TAN, SIGNAL_ORANGE } from '../ai-tokens';
import type { PaletteOverrides, SurfaceCssOverrides } from '../themes/palette-types';

type PaletteRamp = typeof AI_RAMP;

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
  const ramp = mergeRamp(AI_RAMP, palette?.AI_RAMP);
  const signal = mergeRamp(SIGNAL_ORANGE, palette?.SIGNAL_ORANGE);
  const companion = mergeRamp(COMPANION_TAN, palette?.COMPANION_TAN);

  return {
    action: {
      primary: ramp[60],
      primaryHover: ramp[70],
      primaryActive: ramp[80],
    },
    surface: {
      default: ramp['00'],
      subtle: ramp[10],
      emphasis: ramp[20],
    },
    border: {
      default: ramp[20],
      strong: ramp[40],
      focus: ramp[50],
    },
    text: {
      primary: ramp[90],
      secondary: ramp[70],
      onAction: '#FFFFFF',
    },
    brand: ramp[60],
    brandSubtle: ramp[10],
    brandSurface: ramp['00'],
    brandBorder: ramp[20],
    brandStrong: ramp[90],
    brandInk: ramp[100],
    signal: {
      default: signal[60],
      hover: signal[70],
      strong: signal[80],
      subtle: signal[10],
      surface: signal['00'],
    },
    companion: {
      paper: companion['00'],
      surface: companion[10],
      highlight: companion[20],
      border: companion[30],
      ink: companion[100],
    },
    gradient: {
      actionFull: `linear-gradient(135deg, ${ramp[50]} 0%, ${ramp[60]} 100%)`,
      actionSecondary: `linear-gradient(135deg, ${ramp[40]} 0%, ${ramp[50]} 50%, ${ramp[60]} 100%)`,
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
    '--ai-ds-text': '#2f2c3c',
    '--ai-ds-text-helper': '#5b5864',
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
