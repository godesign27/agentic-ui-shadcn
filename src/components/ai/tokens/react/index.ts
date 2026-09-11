export { SurfaceThemeProvider, useSurfaceTheme } from './SurfaceThemeProvider';
export type { SurfaceThemeProviderProps } from './SurfaceThemeProvider';

export {
  SURFACE_THEMES,
  SURFACE_THEME_IDS,
  DEFAULT_SURFACE_THEME,
  getSurfaceTheme,
  isSurfaceThemeId,
} from '../themes';

export type { SurfaceThemeId } from '../themes';

export { resolveAICssVars, applySurfaceThemeToElement } from '../maps/ai-css-vars';
