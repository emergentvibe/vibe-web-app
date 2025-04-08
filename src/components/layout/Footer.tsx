import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-light shadow-inner border-t border-indigo-900/30 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-xs text-gray-400">
          <p>Powered by <a href="https://exa.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Exa AI</a></p>
          <p className="mt-1">© {new Date().getFullYear()} Vibe Recommendations</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 