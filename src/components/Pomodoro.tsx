import { usePomodoroContext } from '../contexts/PomodoroContext';
import { formatTime } from '../utils/timeFormatter';
import ProgressRing from './Pomodoro/ProgressRing';

const Pomodoro = () => {
  const {
    mode,
    timeLeft,
    isActive,
    progress,
    toggleTimer,
    resetTimer,
    changeMode,
  } = usePomodoroContext();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Focus Timer</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex gap-2 mb-8 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl transition-colors">
          {(['work', 'shortBreak', 'longBreak'] as const).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m 
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {m === 'work' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>

        <div className="relative mb-8">
          <ProgressRing progress={progress} mode={mode} />

          {/* Time Display */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-6xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tighter transition-colors">
              {formatTime(timeLeft)}
            </div>
            <div className="text-zinc-400 dark:text-zinc-500 font-medium mt-2 transition-colors">
              {isActive ? 'Running' : 'Paused'}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-xl font-medium text-white transition-all transform active:scale-95 ${
              isActive 
                ? 'bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'
            }`}
          >
            {isActive ? 'Pause' : 'Start Timer'}
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-3 rounded-xl font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;