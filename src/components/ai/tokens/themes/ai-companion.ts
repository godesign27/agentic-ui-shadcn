import type { SurfaceThemeDefinition } from './palette-types';

/** Warm tan companion surface — surfaces and borders from ZSAI_TAN, ink from companion. */
export const aiCompanionTheme: SurfaceThemeDefinition = {
  id: 'ai-companion',
  label: 'ZSAI Companion',
  description: 'Warm tan companion surface — paper backgrounds with warm dark ink.',
  cssOverrides: {
    '--ai-surface-default': '#F6F2EB',
    '--ai-surface-subtle': '#ECE6DD',
    '--ai-surface-emphasis': '#F1E4D0',
    '--ai-border-default': '#E8D6BF',
    '--ai-border-strong': '#CDB39C',
    '--ai-text-primary': '#3C2A1D',
    '--ai-text-secondary': '#7A5944',
    '--ai-brand-surface': '#F6F2EB',
    '--ai-card-bg': '#ECE6DD',
    '--ai-companion-paper': '#F6F2EB',
    '--ai-zds-text': '#3C2A1D',
    '--ai-zds-text-helper': '#7A5944',
  },
};
