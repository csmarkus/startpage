import { useState } from 'react';
import { useBookmarksContext } from '../contexts/BookmarksContext';

const Bookmarks = () => {
  const { bookmarks, addBookmark, deleteBookmark, isLoading } = useBookmarksContext();
  const [url, setUrl] = useState('');
  const [autoFetchTitle, setAutoFetchTitle] = useState(true);
  const [manualTitle, setManualTitle] = useState('');

  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBookmark(url, autoFetchTitle ? undefined : manualTitle);
    setUrl('');
    setManualTitle('');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-6 transition-colors">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Bookmarks</h2>
      <div className="flex flex-col gap-2">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-100 dark:border-zinc-700/50">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-700 dark:text-zinc-300">
              {bookmark.name}
            </a>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-400 hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddBookmark} className="mt-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            autoComplete="off"
            data-1p-ignore
            disabled={isLoading}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 p-2 rounded w-full focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px] flex items-center justify-center text-white"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Add'
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={autoFetchTitle}
              onChange={(e) => setAutoFetchTitle(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            Auto-fetch title
          </label>
        </div>
        {!autoFetchTitle && (
          <input
            type="text"
            value={manualTitle}
            onChange={(e) => setManualTitle(e.target.value)}
            placeholder="Title"
            autoComplete="off"
            data-1p-ignore
            disabled={isLoading}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 p-2 rounded w-full focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
        )}
      </form>
    </div>
  );
};

export default Bookmarks;