import { useState } from 'react';

interface SearchBarProps {
  onCommand: (command: string) => boolean;
}

const SearchBar = ({ onCommand }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if it's a command
    if (onCommand(query.toLowerCase().trim())) {
      setQuery('');
      return;
    }

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 divide-y divide-zinc-100 dark:divide-zinc-800 mb-12 transition-colors">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or enter command..."
          className="w-full py-4 pl-12 pr-4 bg-transparent border-0 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-0 focus:outline-none text-base"
          autoFocus
          autoComplete="off"
          data-1p-ignore
        />
      </div>
      
      <div className="bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 flex items-center justify-end gap-x-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">Alt</kbd>
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">B</kbd>
          </div>
          <span>Bookmarks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">Alt</kbd>
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">T</kbd>
          </div>
          <span>Todo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">Alt</kbd>
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">N</kbd>
          </div>
          <span>Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">Alt</kbd>
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">P</kbd>
          </div>
          <span>Timer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">Alt</kbd>
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-sans text-xs text-zinc-400 dark:text-zinc-500">S</kbd>
          </div>
          <span>Settings</span>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
