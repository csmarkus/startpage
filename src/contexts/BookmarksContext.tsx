import { createContext, useContext, useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Bookmark } from '../types/bookmark';
import { fetchUrlMetadata } from '../services/microlinkService';
import { extractHostname } from '../utils/urlValidator';

const DEFAULT_BOOKMARKS: Bookmark[] = [
  { id: 1, name: 'Google', url: 'https://google.com' },
  { id: 2, name: 'React Docs', url: 'https://react.dev' },
];

interface BookmarksContextType {
  bookmarks: Bookmark[];
  addBookmark: (url: string) => Promise<void>;
  deleteBookmark: (id: number) => void;
  isLoading: boolean;
}

const BookmarksContext = createContext<BookmarksContextType | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', DEFAULT_BOOKMARKS);
  const [isLoading, setIsLoading] = useState(false);

  const addBookmark = async (url: string) => {
    if (!url.trim()) return;

    setIsLoading(true);

    let title = extractHostname(url);

    try {
      const metadata = await fetchUrlMetadata(url);
      if (metadata?.title) {
        title = metadata.title;
      }
    } catch (error) {
      console.error('Failed to fetch title:', error);
    }

    const newBookmark: Bookmark = {
      id: Date.now(),
      name: title,
      url: url.trim(),
    };

    setBookmarks([...bookmarks, newBookmark]);
    setIsLoading(false);
  };

  const deleteBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, deleteBookmark, isLoading }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarksContext must be used within a BookmarksProvider');
  }
  return context;
}
