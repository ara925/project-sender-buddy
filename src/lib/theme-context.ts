import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light' | 'purple' | 'midnight' | 'system' | 'executive' | 'slate-dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light' | 'purple' | 'midnight';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
