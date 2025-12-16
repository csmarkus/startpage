import { useState } from 'react';
import Background from './components/Background';
import Bookmarks from './components/Bookmarks';
import TodoList from './components/TodoList';
import Notes from './components/Notes';
import Pomodoro from './components/Pomodoro';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useCommandRouter } from './hooks/useCommandRouter';
import { BookmarksProvider, useBookmarksContext } from './contexts/BookmarksContext';

type View = 'bookmarks' | 'todo' | 'notes' | 'pomodoro' | 'settings' | null;

function AppContent() {
  const [activeView, setActiveView] = useState<View>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { settings, updateSettings } = useSettings();
  const { addBookmark } = useBookmarksContext();

  useTheme(settings.theme);
  useKeyboardShortcuts(activeView, setActiveView);

  const { handleCommand } = useCommandRouter(setActiveView, { addBookmark });

  return (
    <div className="relative h-full w-full text-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center transition-opacity duration-500">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400 rounded-full animate-spin"></div>
        </div>
      )}
      <Background 
        query={settings.backgroundQuery} 
        apiKey={settings.unsplashApiKey} 
        onLoad={() => setIsLoading(false)}
      />
      <div className={`relative z-10 h-full w-full overflow-y-auto overflow-x-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex min-h-full flex-col items-center justify-start pt-[20vh] p-4">
          <div className={`transition-all duration-500 ease-in-out w-full flex justify-center ${activeView ? '-translate-y-8' : 'translate-y-0'}`}>
            <SearchBar onCommand={handleCommand} />
          </div>

          {/* Active View Content */}
          {activeView && (
            <div className="w-full max-w-3xl animate-in fade-in slide-in-from-top-4 duration-300 pb-20">
              {activeView === 'bookmarks' && <Bookmarks />}
              {activeView === 'todo' && <TodoList />}
              {activeView === 'notes' && <Notes />}
              {activeView === 'pomodoro' && <Pomodoro />}
              {activeView === 'settings' && <Settings settings={settings} onSave={updateSettings} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BookmarksProvider>
      <AppContent />
    </BookmarksProvider>
  );
}

export default App;
