import { aiAquaTheme } from './ai-aqua';
import { aiBoldTheme } from './ai-bold';
import { aiCompanionTheme } from './ai-companion';
import { aiDefaultTheme } from './ai-default';
import type { SurfaceThemeDefinition, SurfaceThemeId } from './palette-types';

export type { PaletteOverrides, PaletteRamp, SurfaceCssOverrides, SurfaceThemeDefinition, SurfaceThemeId } from './palette-types';

export { aiDefaultTheme, aiBoldTheme, aiCompanionTheme, aiAquaTheme };

export const SURFACE_THEMES: Record<SurfaceThemeId, SurfaceThemeDefinition> = {
  'ai-default': aiDefaultTheme,
  'ai-bold': aiBoldTheme,
  'ai-companion': aiCompanionTheme,
  'ai-aqua': aiAquaTheme,
};

export const SURFACE_THEME_IDS = Object.keys(SURFACE_THEMES) as SurfaceThemeId[];

export const DEFAULT_SURFACE_THEME: SurfaceThemeId = 'ai-default';

export function getSurfaceTheme(id: SurfaceThemeId): SurfaceThemeDefinition {
  return SURFACE_THEMES[id];
}

export function isSurfaceThemeId(value: string): value is SurfaceThemeId {
  return value in SURFACE_THEMES;
}
