/**
 * Optional codegen helper — emits a CSS block for a surface theme.
 * Run manually when palette values change; committed CSS in css/ is the runtime source.
 */

import { resolveAICssVars } from '../maps/ai-css-vars';
import type { SurfaceThemeId } from '../themes';

export function emitSurfaceThemeBlock(themeId: SurfaceThemeId, selector?: string): string {
  const vars = resolveAICssVars(themeId);
  const target = selector ?? (themeId === 'ai-default' ? ':root,\n[data-theme="ai-default"]' : `[data-theme="${themeId}"]`);
  const lines = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `${target} {\n${lines}\n}`;
}

export function emitAllSurfaceThemes(): string {
  const themes: SurfaceThemeId[] = ['ai-default', 'ai-bold', 'ai-companion', 'ai-aqua'];
  return themes.map((id) => emitSurfaceThemeBlock(id)).join('\n\n');
}
