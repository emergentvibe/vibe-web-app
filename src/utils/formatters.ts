/**
 * Formatter utilities
 */

/**
 * Extracts the base domain from a URL
 */
export const getBaseUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    return '';
  }
};

/**
 * Truncates text to a specified length
 */
export const truncateText = (text?: string, limit = 120): string => {
  if (!text) return '';
  
  if (text.length <= limit) return text;
  return text.substring(0, limit).trim() + '...';
};

/**
 * Formats a score (0-1) as a percentage
 */
export const formatScore = (score?: number): string => {
  if (score === undefined) return '';
  return `${Math.round(score * 100)}%`;
}; 