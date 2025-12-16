interface ProgressRingProps {
  progress: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  radius?: number;
}

/**
 * SVG progress ring component for Pomodoro timer
 * @param progress - Progress percentage (0-100)
 * @param mode - Current timer mode (affects color)
 * @param radius - Ring radius in pixels
 */
const ProgressRing = ({ progress, mode, radius = 120 }: ProgressRingProps) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="transform -rotate-90 w-72 h-72">
      {/* Background circle */}
      <circle
        cx="144"
        cy="144"
        r={radius}
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        className="text-zinc-100 dark:text-zinc-800 transition-colors"
      />
      {/* Progress circle */}
      <circle
        cx="144"
        cy="144"
        r={radius}
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className={`transition-all duration-1000 ease-linear ${
          mode === 'work' ? 'text-indigo-500' : 'text-emerald-500'
        }`}
      />
    </svg>
  );
};

export default ProgressRing;
