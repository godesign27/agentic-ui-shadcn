/**
 * Resolves --ai-* CSS variables for a named surface theme.
 * Reads theme definitions from themes/ — does not modify ai-tokens.ts.
 */

import { createSurfaceCssVars } from '../build/create-ai-theme';
import { getSurfaceTheme, type SurfaceThemeId } from '../themes';

export function resolveAICssVars(themeId: SurfaceThemeId = 'ai-default'): Record<string, string> {
  const theme = getSurfaceTheme(themeId);
  const base = createSurfaceCssVars(theme.palette, theme.cssOverrides);

  if (theme.gradientOverrides) {
    if (theme.gradientOverrides['gradient.surface.idle']) {
      base['--ai-gradient-surface-idle'] = theme.gradientOverrides['gradient.surface.idle'];
    }
    if (theme.gradientOverrides['gradient.surface.active']) {
      base['--ai-gradient-surface-active'] = theme.gradientOverrides['gradient.surface.active'];
    }
  }

  return base;
}

export function applySurfaceThemeToElement(
  element: HTMLElement,
  themeId: SurfaceThemeId = 'ai-default',
): void {
  element.setAttribute('data-theme', themeId);
}

export function cssVarsToInlineStyle(vars: Record<string, string>): Record<string, string> {
  return vars;
}
