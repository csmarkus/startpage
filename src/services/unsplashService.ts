interface CachedImage {
  url: string;
  date: string;
  storedQuery: string;
}

const CACHE_KEY = 'backgroundImage';

/**
 * Fetches a random image from Unsplash API
 * @param query - Search query for images
 * @param apiKey - Unsplash API key
 * @returns Image URL or null if failed
 */
export async function fetchUnsplashImage(
  query: string,
  apiKey?: string
): Promise<string | null> {
  if (!apiKey) {
    console.warn('Unsplash API key not provided');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.urls?.full || null;
  } catch (error) {
    console.error('Failed to fetch Unsplash image:', error);
    return null;
  }
}

/**
 * Gets cached image or fetches new one if cache expired (daily) and query matches
 * @param query - Search query
 * @param apiKey - Unsplash API key
 * @returns Cached or fresh image URL
 */
export async function getCachedOrFetchImage(
  query: string,
  apiKey?: string
): Promise<string | null> {
  const cached = localStorage.getItem(CACHE_KEY);
  const today = new Date().toDateString();

  if (cached) {
    try {
      const { url, date, storedQuery }: CachedImage = JSON.parse(cached);

      // Return cached image if it's from today AND the query matches
      if (date === today && storedQuery === query) {
        return url;
      }
    } catch (error) {
      console.error('Error reading cache:', error);
    }
  }

  const url = await fetchUnsplashImage(query, apiKey);

  if (url) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ url, date: today, storedQuery: query }));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  return url;
}

/**
 * Preloads an image to ensure it's ready before displaying
 * @param url - Image URL to preload
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}
