import React from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  onShowSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowSettings }) => {
  return (
    <header className="bg-primary-light shadow-md border-b border-indigo-900/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Vibe Logo" 
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-xl font-bold text-white">Vibe</h1>
          <span className="ml-2 text-sm text-indigo-400">Your guide to the Semantic Web</span>
        </div>
        
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
    </header>
  );
};

export default Header; 