import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Settings from '../components/Settings';
import RecommendationList from '../components/recommendations/RecommendationList';
import { useRecommendations } from '../hooks/useRecommendations';
import { storage } from '../services/storage';

const Home: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [url, setUrl] = useState('');
  const [sameDomain, setSameDomain] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  
  const { 
    recommendations, 
    loading, 
    error, 
    fetchRecommendations, 
    hadRecommendations 
  } = useRecommendations();

  // Check URL parameters and API key on mount
  useEffect(() => {
    const checkApiKey = async () => {
      const settings = await storage.getSettings();
      setHasApiKey(!!settings.exaApiKey);
    };

    // Parse URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const urlParam = queryParams.get('url');
    const sameDomainParam = queryParams.get('sameDomain');
    
    // Set values from URL parameters
    if (urlParam) {
      setUrl(urlParam);
      
      if (sameDomainParam === 'true') {
        setSameDomain(true);
      }
    }

    checkApiKey();
  }, []);

  // Check API key after settings modal closes
  useEffect(() => {
    if (!showSettings) {
      const checkApiKey = async () => {
        const settings = await storage.getSettings();
        setHasApiKey(!!settings.exaApiKey);
      };
      checkApiKey();
    }
  }, [showSettings]);

  // Auto-search if URL is provided and API key exists
  useEffect(() => {
    const autoSearch = async () => {
      if (url && hasApiKey && !loading && recommendations.length === 0 && !hadRecommendations) {
        await fetchRecommendations(url, sameDomain);
      }
    };
    
    autoSearch();
  }, [url, hasApiKey, fetchRecommendations, sameDomain, loading, recommendations.length, hadRecommendations]);

  // Update URL parameters when input changes
  const updateUrlParams = (newUrl: string, newSameDomain: boolean) => {
    if (newUrl) {
      const queryParams = new URLSearchParams();
      queryParams.set('url', newUrl);
      
      if (newSameDomain) {
        queryParams.set('sameDomain', 'true');
      }
      
      const browserUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState({ path: browserUrl }, '', browserUrl);
    }
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Update URL parameters immediately
    updateUrlParams(newUrl, sameDomain);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      // Update URL parameters
      updateUrlParams(url, sameDomain);
      
      fetchRecommendations(url, sameDomain);
    }
  };

  // Handler for same domain checkbox toggle
  const handleSameDomainToggle = () => {
    const newValue = !sameDomain;
    setSameDomain(newValue);
    
    // Update URL parameters if we already have a URL
    updateUrlParams(url, newValue);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header onShowSettings={() => setShowSettings(true)} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {hasApiKey === false && (
            <div className="mb-6 bg-indigo-900/30 p-6 rounded-lg shadow-lg border border-indigo-600 animate-pulse">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-indigo-300">Welcome to Vibe!</h3>
                  <div className="mt-2 text-sm text-gray-300">
                    <p>To use this app, you'll need to set up your Exa API key first.</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      size="sm"
                      onClick={() => setShowSettings(true)}
                    >
                      Set Up API Key
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 bg-primary-light p-6 rounded-lg shadow-lg border border-indigo-900/30">
            <h2 className="text-lg font-medium text-white mb-4">Get Website Recommendations</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                label="Website URL"
                placeholder="Enter a URL (e.g., https://example.com)"
                value={url}
                onChange={handleUrlChange}
                type="url"
              />
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameDomain}
                    onChange={handleSameDomainToggle}
                    className="sr-only"
                  />
                  <span 
                    className={`filter-pill ${sameDomain ? 'filter-pill-active' : ''}`}
                  >
                    {sameDomain ? '✓ Same Domain Only' : 'Same Domain Only'}
                  </span>
                </label>
                <div className="ml-auto">
                  <Button type="submit" disabled={loading || !url || hasApiKey === false}>
                    {loading ? 'Searching...' : 'Get Recommendations'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          {(recommendations.length > 0 || loading || error) && (
            <div className="bg-primary-light p-6 rounded-lg shadow-lg border border-indigo-900/30">
              <RecommendationList
                recommendations={recommendations}
                loading={loading}
                error={error}
              />
            </div>
          )}
          
          {!hadRecommendations && !loading && !error && hasApiKey !== false && (
            <div className="text-center p-8 bg-primary-light rounded-lg shadow-lg border border-indigo-900/30">
              <h3 className="text-lg font-medium text-white mb-2">Enter a URL to get started</h3>
              <p className="text-gray-400">
                Enter any website URL above to discover related content recommendations.
              </p>
              <p className="text-gray-400 mt-2 text-xs">
                Share your recommendations by copying the URL after search.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};

export default Home; 