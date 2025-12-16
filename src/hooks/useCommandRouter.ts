import { useCallback } from 'react';

type View = 'bookmarks' | 'todo' | 'notes' | 'pomodoro' | 'settings' | null;

interface CommandRoute {
  aliases: string[];
  view: Exclude<View, null>;
}

interface ActionHandlers {
  addBookmark?: (url: string) => void;
}

const COMMAND_ROUTES: CommandRoute[] = [
  { aliases: ['bookmarks', 'bookmark', 'b'], view: 'bookmarks' },
  { aliases: ['todo', 'todos', 't'], view: 'todo' },
  { aliases: ['notes', 'note', 'n'], view: 'notes' },
  { aliases: ['pomodoro', 'timer', 'p'], view: 'pomodoro' },
  { aliases: ['settings', 'config', 's'], view: 'settings' },
];

// Action command shortcuts: +<shortcut> <argument>
const ACTION_SHORTCUTS: Record<string, keyof ActionHandlers> = {
  'b': 'addBookmark',
};

/**
 * Custom hook for routing text commands to views
 * @param setActiveView - Function to update active view
 * @param actionHandlers - Optional handlers for action commands
 * @returns Command handler function
 */
export function useCommandRouter(
  setActiveView: (view: View) => void,
  actionHandlers?: ActionHandlers
) {
  const handleCommand = useCallback((cmd: string): boolean => {
    // Check for action commands (+b URL, etc.)
    const actionMatch = cmd.match(/^\+(\w+)\s+(.+)$/);
    if (actionMatch) {
      const [, shortcut, argument] = actionMatch;
      const handlerKey = ACTION_SHORTCUTS[shortcut.toLowerCase()];

      if (handlerKey && actionHandlers?.[handlerKey]) {
        actionHandlers[handlerKey]!(argument.trim());
        return true;
      }
    }

    // Check for view navigation commands
    const command = cmd.replace(/^\//, '').toLowerCase();

    const route = COMMAND_ROUTES.find(r =>
      r.aliases.includes(command)
    );

    if (route) {
      setActiveView(route.view);
      return true;
    }

    return false;
  }, [setActiveView, actionHandlers]);

  return { handleCommand };
}
