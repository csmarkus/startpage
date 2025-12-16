import { useState, useEffect } from 'react';
import type { Settings } from '../types/settings';

/**
 * Custom hook for managing local settings state with save confirmation
 * @param settings - Parent settings state
 * @param onSave - Callback to persist settings to parent
 * @returns Local settings state and handlers
 */
export function useLocalSettings(
  settings: Settings,
  onSave: (newSettings: Settings) => void
) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  // Sync with parent settings when they change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key: keyof Settings, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return {
    localSettings,
    handleChange,
    handleSave,
    isSaved,
  };
}
