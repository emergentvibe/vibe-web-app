import React, { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mt-2 border-t border-indigo-900/30 pt-2">
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-indigo-600"
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        <span className="border border-indigo-900/40 rounded px-2 py-1 bg-gray-800 ml-2 hover:bg-gray-700 transition-all">
          <span className="text-base font-bold">{isExpanded ? '▲' : '▼'}</span>
        </span>
      </button>
      {isExpanded && (
        <div className="mt-2 text-xs bg-indigo-900/20 p-2 rounded border border-indigo-900/30">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection; 