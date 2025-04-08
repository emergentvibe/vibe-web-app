import React, { useState } from 'react';
import { Recommendation } from '../../services/exaApi';
import RecommendationCard from './RecommendationCard';

// Define sorting options
type SortOption = 'relevance' | 'date';
type SortDirection = 'asc' | 'desc';

interface RecommendationListProps {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ 
  recommendations, 
  loading, 
  error 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Get sorted recommendations
  const sortedRecommendations = () => {
    return [...recommendations].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'relevance') {
        // Sort by score (higher score first)
        comparison = (b.score ?? 0) - (a.score ?? 0);
      } else if (sortBy === 'date') {
        // Sort by date (newer first)
        const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
        const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
        comparison = dateB - dateA;
      }
      
      // Reverse the order if ascending
      return sortDirection === 'desc' ? comparison : -comparison;
    });
  };

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-400">Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 text-red-300 p-4 rounded-md shadow-md border border-red-900/30">
        {error}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-indigo-900/20 text-indigo-300 p-4 rounded-md shadow-md border border-indigo-900/30">
        No recommendations found for this URL. Try searching for a different website.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center p-3 bg-indigo-900/30 rounded-lg border border-indigo-900/30 shadow-md">
        <div className="text-xs text-gray-300 font-medium">
          {recommendations.length} {recommendations.length === 1 ? 'result' : 'results'} found
        </div>
            
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 mr-1">Sort by:</span>
          <div className="flex bg-gray-800 rounded-md overflow-hidden shadow-sm border border-indigo-900/40">
            <button
              onClick={() => handleSortChange('relevance')}
              className={`text-xs px-3 py-1.5 transition-all ${
                sortBy === 'relevance' 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Match %
            </button>
            <button
              onClick={() => handleSortChange('date')}
              className={`text-xs px-3 py-1.5 transition-all ${
                sortBy === 'date' 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Date
            </button>
          </div>
          <button
            onClick={toggleSortDirection}
            title={sortDirection === 'desc' ? "Descending (highest first)" : "Ascending (lowest first)"}
            className="px-2 py-1.5 bg-gray-800 rounded-md hover:bg-gray-700 transition-all border border-indigo-900/40 flex items-center"
          >
            <span className="text-xs text-gray-300 mr-1">Order:</span>
            <span className="text-lg text-indigo-600 font-bold">
              {sortDirection === 'desc' ? '↓' : '↑'}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto">
        {sortedRecommendations().map((recommendation) => (
          <RecommendationCard 
            key={recommendation.id} 
            recommendation={recommendation} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList; 