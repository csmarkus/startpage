import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Bookmark } from '../types/bookmark';
import { fetchUrlMetadata } from '../services/microlinkService';
import { extractHostname } from '../utils/urlValidator';

const DEFAULT_BOOKMARKS: Bookmark[] = [
  { id: 1, name: 'Google', url: 'https://google.com' },
  { id: 2, name: 'React Docs', url: 'https://react.dev' },
];

/**
 * Custom hook for managing bookmarks with localStorage persistence
 * @returns Bookmarks state, CRUD operations, and loading state
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', DEFAULT_BOOKMARKS);
  const [isLoading, setIsLoading] = useState(false);

  const addBookmark = async (url: string, manualTitle?: string) => {
    if (!url.trim()) return;

    setIsLoading(true);

    let title: string;

    if (manualTitle?.trim()) {
      title = manualTitle.trim();
    } else {
      // Default to hostname
      title = extractHostname(url);

      // Try to fetch actual title
      try {
        const metadata = await fetchUrlMetadata(url);
        if (metadata?.title) {
          title = metadata.title;
        }
      } catch (error) {
        console.error('Failed to fetch title:', error);
      }
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

  return {
    bookmarks,
    addBookmark,
    deleteBookmark,
    isLoading,
  };
}
