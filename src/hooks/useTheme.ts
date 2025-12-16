import { useLayoutEffect } from 'react';
import type { Settings } from '../types/settings';

/**
 * Custom hook for managing theme application to the DOM
 * Handles system theme detection and applies theme class to document root
 * @param theme - Current theme setting ('light' | 'dark' | 'system')
 */
export function useTheme(theme: Settings['theme']) {
  useLayoutEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [theme]);
}
