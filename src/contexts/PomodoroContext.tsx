import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { useAudioNotification } from '../hooks/useAudioNotification';
import { formatTime } from '../utils/timeFormatter';

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

interface PomodoroContextType {
  mode: PomodoroMode;
  timeLeft: number;
  isActive: boolean;
  progress: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  changeMode: (mode: PomodoroMode) => void;
}

const PomodoroContext = createContext<PomodoroContextType | null>(null);

const DEFAULT_TITLE = 'Startpage';

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const settings = DEFAULT_SETTINGS;
  const { playSound } = useAudioNotification();

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
      playSound();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, playSound]);

  // Update document title when timer is active
  useEffect(() => {
    if (isActive) {
      const modeLabel = mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Break' : 'Long Break';
      document.title = `${formatTime(timeLeft)} - ${modeLabel}`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [isActive, timeLeft, mode]);

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

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        timeLeft,
        isActive,
        progress,
        toggleTimer,
        resetTimer,
        changeMode
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoroContext() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoroContext must be used within a PomodoroProvider');
  }
  return context;
}
