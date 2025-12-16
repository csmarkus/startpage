interface MicrolinkResponse {
  status: string;
  data: {
    title?: string;
  };
}

/**
 * Fetches metadata for a URL using Microlink API
 * @param url - URL to fetch metadata for
 * @returns Object with title or null if failed
 */
export async function fetchUrlMetadata(url: string): Promise<{ title: string } | null> {
  try {
    const response = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error(`Microlink API error: ${response.status}`);
    }

    const data: MicrolinkResponse = await response.json();

    if (data.status === 'success' && data.data.title) {
      return { title: data.data.title };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch URL metadata:', error);
    return null;
  }
}
