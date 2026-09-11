import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from 'react';
import { DEFAULT_SURFACE_THEME, isSurfaceThemeId, type SurfaceThemeId } from '../themes';

type SurfaceThemeContextValue = {
  theme: SurfaceThemeId;
};

const SurfaceThemeContext = createContext<SurfaceThemeContextValue>({
  theme: DEFAULT_SURFACE_THEME,
});

export type SurfaceThemeProviderProps = {
  theme?: SurfaceThemeId;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Applies data-theme to a container so all descendant components
 * reading --ai-*, --zs-*, or shadcn vars inherit the active surface theme.
 */
export function SurfaceThemeProvider({
  theme = DEFAULT_SURFACE_THEME,
  className,
  style,
  children,
}: SurfaceThemeProviderProps) {
  const resolvedTheme = isSurfaceThemeId(theme) ? theme : DEFAULT_SURFACE_THEME;
  const value = useMemo(() => ({ theme: resolvedTheme }), [resolvedTheme]);

  return (
    <SurfaceThemeContext.Provider value={value}>
      <div
        data-theme={resolvedTheme}
        className={className}
        style={style}
      >
        {children}
      </div>
    </SurfaceThemeContext.Provider>
  );
}

export function useSurfaceTheme(): SurfaceThemeContextValue {
  return useContext(SurfaceThemeContext);
}
