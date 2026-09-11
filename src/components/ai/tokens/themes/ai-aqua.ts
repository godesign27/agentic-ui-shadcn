import type { SurfaceThemeDefinition } from './palette-types';

/** Aqua ambient surface — gradient overrides with ZDS-teal influence (extends AI_THEME.aqua). */
export const aiAquaTheme: SurfaceThemeDefinition = {
  id: 'ai-aqua',
  label: 'ZSAI Aqua',
  description: 'Teal-influenced page gradients — color tokens match ai-default.',
  gradientOverrides: {
    'gradient.surface.idle':
      'linear-gradient(to bottom, #F3FCFE 0%, #F8FAFB 35%, #F4F3F3 70%, #FAFAFA 100%)',
    'gradient.surface.active':
      'linear-gradient(to bottom, #FFFFFF 0%, #F4F3F3 40%, #EDF8FA 100%)',
  },
  cssOverrides: {
    '--ai-gradient-surface-idle':
      'linear-gradient(to bottom, #F3FCFE 0%, #F8FAFB 35%, #F4F3F3 70%, #FAFAFA 100%)',
    '--ai-gradient-surface-active':
      'linear-gradient(to bottom, #FFFFFF 0%, #F4F3F3 40%, #EDF8FA 100%)',
  },
};
