import React from 'react';
import { Recommendation } from '../../services/exaApi';
import { formatDate, formatScore, getBaseUrl } from '../../utils/formatters';
import ExpandableSection from './ExpandableSection';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { title, url, score, publishedDate, summary, highlights, highlightScores } = recommendation;

  return (
    <div className="result-card block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm line-clamp-2 text-white flex-1 pr-3">
            {title || 'Untitled'}
          </h3>
          {score !== undefined && (
            <span className="badge ml-2">
              {formatScore(score)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400 truncate">{getBaseUrl(url)}</span>
          {publishedDate && (
            <span className="text-xs text-gray-500">{formatDate(publishedDate)}</span>
          )}
        </div>
        
        {summary ? (
          <p className="text-xs text-gray-300 mt-2 line-clamp-3">
            {summary}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-2 italic">
            No summary provided
          </p>
        )}
      </a>

      <ExpandableSection title="Content Highlights">
        {highlights && highlights.length > 0 ? (
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li 
                key={index}
                className="p-2 bg-gray-800/50 rounded border border-indigo-900/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-indigo-400">Highlight {index + 1}</span>
                  {highlightScores && highlightScores[index] !== undefined && (
                    <span className="text-xs text-gray-500">
                      {formatScore(highlightScores[index])}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300">{highlight}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500 italic">
            No highlights available
          </p>
        )}
      </ExpandableSection>
    </div>
  );
};

export default RecommendationCard; 