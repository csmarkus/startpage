import { useState, useEffect, useRef } from 'react';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

/**
 * Custom hook for managing Pomodoro timer logic
 * @param settings - Duration settings for each mode in minutes
 * @param onTimerComplete - Callback when timer reaches zero
 * @returns Timer state and control functions
 */
export function usePomodoro(
  settings: PomodoroSettings = DEFAULT_SETTINGS,
  onTimerComplete?: () => void
) {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.work * 60);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Calculate progress percentage
  const totalTime = settings[mode] * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Timer countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      onTimerComplete?.();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, onTimerComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings[mode] * 60);
  };

  const changeMode = (newMode: PomodoroMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(settings[newMode] * 60);
  };

  return {
    mode,
    timeLeft,
    isActive,
    progress,
    toggleTimer,
    resetTimer,
    changeMode,
  };
}
