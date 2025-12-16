/**
 * Extracts hostname from a URL string
 * @param url - URL string to parse
 * @returns Hostname or original string if invalid
 */
export function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Validates if a string is a valid URL
 * @param url - String to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
