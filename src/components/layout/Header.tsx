import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

interface HeaderProps {
  onShowSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowSettings }) => {
  const location = useLocation();
  const isBookmarkletPage = location.pathname === '/bookmarklet';

  return (
    <header className="bg-primary-light shadow-md border-b border-indigo-900/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Vibe Logo" 
              className="w-8 h-8 mr-2"
            />
            <h1 className="text-xl font-bold text-white">Vibe</h1>
          </Link>
          <span className="ml-2 text-sm text-indigo-400">Website Recommendations</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {!isBookmarkletPage ? (
            <Link 
              to="/bookmarklet" 
              className="px-3 py-1 bg-accent hover:bg-accent-glow text-white rounded-md flex items-center transition-colors text-sm font-medium"
            >
              <span className="mr-1">📎</span> Get the bookmarklet
            </Link>
          ) : (
            <Link 
              to="/" 
              className="px-3 py-1 bg-accent hover:bg-accent-glow text-white rounded-md flex items-center transition-colors text-sm font-medium"
            >
              <span className="mr-1">🏠</span> Home
            </Link>
          )}
          
          <Button
            onClick={onShowSettings}
            variant="secondary"
            size="sm"
            className="flex items-center"
          >
            <span className="mr-1">Settings</span>
            <span>⚙️</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header; 