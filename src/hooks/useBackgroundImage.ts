import { useState, useEffect } from 'react';
import { getCachedOrFetchImage, preloadImage } from '../services/unsplashService';

/**
 * Custom hook for managing background image from Unsplash with caching
 * @param query - Search query for images
 * @param apiKey - Unsplash API key
 * @returns Image URL and loading state
 */
export function useBackgroundImage(query: string, apiKey?: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      if (!apiKey) {
        setImageUrl(null);
        setIsLoading(false);
        return;
      }

      if (!query) {
        setImageUrl(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const url = await getCachedOrFetchImage(query, apiKey);

        if (!isMounted) return;

        if (url) {
          await preloadImage(url);
          if (isMounted) {
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error('Failed to load background image:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [query, apiKey]);

  return { imageUrl, isLoading };
}
