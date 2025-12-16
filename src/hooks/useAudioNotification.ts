import { useCallback } from 'react';
import { playNotificationSound } from '../utils/audioNotification';

/**
 * Custom hook for playing audio notifications
 * @returns Object with playSound function
 */
export function useAudioNotification() {
  const playSound = useCallback(() => {
    playNotificationSound();
  }, []);

  return { playSound };
}
