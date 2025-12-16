import { useLocalStorage } from './useLocalStorage';
import type { Settings } from '../types/settings';

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  backgroundQuery: 'mountains',
  unsplashApiKey: '',
};

/**
 * Custom hook for managing application settings with localStorage persistence
 * @returns Settings state and update function
 */
export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>('appSettings', DEFAULT_SETTINGS);

  return {
    settings,
    updateSettings: setSettings,
  };
}
