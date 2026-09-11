/**
 * Tier 1 palette override types for ZSAI surface themes.
 * Theme files override palette steps only; semantic names stay fixed.
 */

export type PaletteStep = '100' | '90' | '80' | '70' | '60' | '50' | '40' | '30' | '20' | '10' | '00';

export type PaletteRamp = Record<PaletteStep, string>;

export type PaletteOverrides = {
  ZSAI?: Partial<PaletteRamp>;
  ZS_ORANGE?: Partial<PaletteRamp>;
  ZSAI_TAN?: Partial<PaletteRamp>;
};

/** Direct Tier 3 CSS variable overrides (used when a theme inverts semantics). */
export type SurfaceCssOverrides = Record<string, string>;

export type SurfaceThemeDefinition = {
  id: string;
  label: string;
  description: string;
  palette?: PaletteOverrides;
  cssOverrides?: SurfaceCssOverrides;
  gradientOverrides?: {
    'gradient.surface.idle'?: string;
    'gradient.surface.active'?: string;
  };
};

export type SurfaceThemeId = 'ai-default' | 'ai-bold' | 'ai-companion' | 'ai-aqua';
