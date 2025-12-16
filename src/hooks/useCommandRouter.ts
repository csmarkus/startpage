import { useCallback } from 'react';

type View = 'bookmarks' | 'todo' | 'notes' | 'pomodoro' | 'settings' | null;

interface CommandRoute {
  aliases: string[];
  view: Exclude<View, null>;
}

const COMMAND_ROUTES: CommandRoute[] = [
  { aliases: ['bookmarks', 'bookmark', 'b'], view: 'bookmarks' },
  { aliases: ['todo', 'todos', 't'], view: 'todo' },
  { aliases: ['notes', 'note', 'n'], view: 'notes' },
  { aliases: ['pomodoro', 'timer', 'p'], view: 'pomodoro' },
  { aliases: ['settings', 'config', 's'], view: 'settings' },
];

/**
 * Custom hook for routing text commands to views
 * @param setActiveView - Function to update active view
 * @returns Command handler function
 */
export function useCommandRouter(setActiveView: (view: View) => void) {
  const handleCommand = useCallback((cmd: string): boolean => {
    const command = cmd.replace(/^\//, '').toLowerCase();

    const route = COMMAND_ROUTES.find(r =>
      r.aliases.includes(command)
    );

    if (route) {
      setActiveView(route.view);
      return true;
    }

    return false;
  }, [setActiveView]);

  return { handleCommand };
}
