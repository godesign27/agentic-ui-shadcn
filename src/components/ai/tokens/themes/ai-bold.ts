import type { SurfaceThemeDefinition } from './palette-types';

/**
 * Dark brand surface — inverts the AI_RAMP so lightest steps become surfaces
 * and text flips to ghost tints for contrast on deep navy.
 */
export const aiBoldTheme: SurfaceThemeDefinition = {
  id: 'ai-bold',
  label: 'AI_RAMP Bold',
  description: 'Dark brand surface — deep navy panels with lighter action accents.',
  palette: {
    AI_RAMP: {
      100: '#D6DEFD',
      90:  '#9BAEF7',
      80:  '#7F95F2',
      70:  '#657CEC',
      60:  '#657CEC',
      50:  '#4D60E6',
      40:  '#4152C4',
      30:  '#3544A4',
      20:  '#2A3784',
      10:  '#1F2A66',
      '00': '#1F2A66',
    },
  },
  cssOverrides: {
    '--ai-border-default': 'rgba(255, 255, 255, 0.12)',
    '--ai-ds-text': '#F5F6FF',
    '--ai-ds-text-helper': '#9BAEF7',
  },
};
