import { useEffect } from 'react';

type View = 'bookmarks' | 'todo' | 'notes' | 'pomodoro' | 'settings' | null;

interface ShortcutMap {
  key: string;
  view: Exclude<View, null>;
  altKey?: boolean;
}

const SHORTCUTS: ShortcutMap[] = [
  { key: 'b', view: 'bookmarks', altKey: true },
  { key: 't', view: 'todo', altKey: true },
  { key: 'n', view: 'notes', altKey: true },
  { key: 'p', view: 'pomodoro', altKey: true },
  { key: 's', view: 'settings', altKey: true },
];

/**
 * Custom hook for managing global keyboard shortcuts
 * @param activeView - Currently active view
 * @param setActiveView - Function to update active view
 */
export function useKeyboardShortcuts(
  activeView: View,
  setActiveView: (view: View) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        setActiveView(null);
        return;
      }

      // Alt + key shortcuts
      if (e.altKey) {
        const shortcut = SHORTCUTS.find(
          s => s.key === e.key.toLowerCase() && s.altKey
        );

        if (shortcut) {
          e.preventDefault();
          setActiveView(activeView === shortcut.view ? null : shortcut.view);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, setActiveView]);
}
