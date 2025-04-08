/**
 * Exa API Service
 * Handles direct API calls to Exa for recommendations
 */

import { storage } from './storage';

// Define the shape of a recommendation
export interface Recommendation {
  title: string | null;
  url: string;
  id: string;
  score?: number;
  publishedDate?: string;
  author?: string | null;
  summary?: string;
  highlights?: string[];
  highlightScores?: number[];
}

// Response type for the API
interface ApiResponse {
  results: Recommendation[];
}

// Error type
export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Get recommendations based on a URL
 */
export async function getRecommendations(url: string, sameDomain: boolean = false): Promise<Recommendation[]> {
  try {
    // Get API key from storage
    const settings = await storage.getSettings();
    if (!settings.exaApiKey) {
      throw new Error('API key not configured');
    }

    // Prepare request options
    let requestOptions = {};
    
    if (sameDomain) {
      try {
        const domain = new URL(url).hostname;
        requestOptions = {
          includeDomains: [domain],
          excludeSourceDomain: false
        };
      } catch (error) {
        console.error('[ExaAPI] Error parsing URL for domain filtering:', error);
      }
    }

    // Make the API request
    const response = await fetch('https://api.exa.ai/findSimilar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.exaApiKey}`,
        'X-Exa-Client': 'vibe-web-app',
        'X-Exa-Client-Version': '1.0.0'
      },
      body: JSON.stringify({
        url: url,
        numResults: 10,
        contents: {
          text: false,
          highlights: {
            numSentences: 2,
            highlightsPerUrl: 3,
            query: "Main points"
          },
          summary: {
            query: "Content Summary"
          }
        },
        ...requestOptions
      })
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data: ApiResponse = await response.json();
    console.log('[ExaAPI] Received recommendations:', data.results?.length || 0);
    
    return data.results || [];
  } catch (error) {
    console.error('[ExaAPI] Error fetching recommendations:', error);
    throw error;
  }
} 