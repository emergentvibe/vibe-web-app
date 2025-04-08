/**
 * Custom hook for fetching recommendations
 */

import { useState, useCallback } from 'react';
import { getRecommendations, Recommendation } from '../services/exaApi';
import { storage } from '../services/storage';

interface UseRecommendationsResult {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  fetchRecommendations: (url: string, sameDomain: boolean) => Promise<void>;
  hadRecommendations: boolean;
}

export function useRecommendations(): UseRecommendationsResult {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hadRecommendations, setHadRecommendations] = useState(false);

  const fetchRecommendations = useCallback(async (url: string, sameDomain: boolean) => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if API key exists
      const settings = await storage.getSettings();
      if (!settings.exaApiKey) {
        setLoading(false);
        setError('Please set up your API key in settings');
        return;
      }

      // Fetch recommendations
      const results = await getRecommendations(url, sameDomain);
      
      setRecommendations(results);
      if (results.length > 0) {
        setHadRecommendations(true);
      }
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, []);

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
    hadRecommendations
  };
} 