import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';
import Settings from '../components/Settings';
import Button from '../components/ui/Button';

const BookmarkletPage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const bookmarkletRef = useRef<HTMLAnchorElement>(null);

  // The code for the bookmarklet, formatted for readability
  const bookmarkletCode = `javascript:(function(){
    let currentUrl = document.location.href;
    currentUrl = currentUrl.split('?')[0].split('#')[0];
    if (currentUrl.endsWith('/'))
      currentUrl = currentUrl.substring(0, currentUrl.length-1);
    const encodedUrl = encodeURIComponent(currentUrl);
    window.open('${window.location.origin}?url='+encodedUrl,'_blank');
  })();`;

  // Initialize the bookmarklet after component mounts
  useEffect(() => {
    if (bookmarkletRef.current) {
      // Set the href directly via DOM manipulation to bypass React's security
      bookmarkletRef.current.setAttribute('href', bookmarkletCode);
    }
  }, [bookmarkletCode]);

  // Copy bookmarklet code to clipboard
  const handleCopyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header onShowSettings={() => setShowSettings(true)} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary-light p-6 rounded-lg shadow-lg border border-indigo-900/30 mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">Vibe Checker Bookmarklet</h1>
            
            <p className="text-gray-300 mb-4">
              Drag the button below to your bookmarks bar to install the Vibe Checker bookmarklet:
            </p>
            
            <div className="flex flex-col items-center gap-4 my-6">
              <a 
                ref={bookmarkletRef}
                className="px-4 py-2 bg-accent hover:bg-accent-glow text-white font-medium rounded-md shadow-md transition-all"
                draggable="true"
              >
                <span className="mr-1">🔍</span> Get Vibe Recommendation
              </a>
              
              <div className="text-center mt-2">
                <p className="text-gray-400 text-sm mb-2">Having trouble with drag and drop?</p>
                <Button 
                  onClick={handleCopyBookmarklet} 
                  size="sm"
                >
                  <span className="mr-1">📋</span> Copy Bookmarklet Code
                </Button>
                {showSuccess && (
                  <p className="text-green-400 text-xs mt-2 animate-pulse">
                    Copied! Now create a new bookmark and paste as the URL.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/30 p-6 rounded-lg shadow-lg border border-indigo-600 mb-6">
            <h2 className="text-xl font-medium text-white mb-3">Installation Instructions</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong>Method 1:</strong> Drag and drop the "Get Vibe Recommendation" button to your bookmarks bar.
              </p>
              <p>
                <strong>Method 2:</strong> If drag and drop doesn't work:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click "Copy Bookmarklet Code"</li>
                <li>Right-click on your bookmarks bar and select "Add page..." or "Add bookmark..."</li>
                <li>Enter "Get Vibe Recommendation" as the name</li>
                <li>Paste the copied code into the URL/location field</li>
                <li>Save the bookmark</li>
              </ol>
              <p className="pt-2">
                <strong>Tip:</strong> The shortcut for toggling the display of the bookmarks toolbar in 
                Chrome, Firefox and Safari is <code className="bg-gray-800 px-1 rounded">Shift + Ctrl/Cmd + B</code>.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-light p-6 rounded-lg shadow-lg border border-indigo-900/30 mb-6">
            <h2 className="text-xl font-medium text-white mb-3">How to Use</h2>
            <ol className="text-gray-300 list-decimal pl-5 space-y-2">
              <li>Navigate to any webpage you want to check the vibe of.</li>
              <li>Click the "Get Vibe Recommendation" bookmarklet in your bookmarks bar.</li>
              <li>A new tab will open with the vibe analysis of the current page.</li>
              <li>The URL will be automatically cleaned of query parameters and fragments for a more accurate vibe check.</li>
            </ol>
          </div>
          
          <div className="bg-primary-light p-6 rounded-lg shadow-lg border border-indigo-900/30">
            <h2 className="text-xl font-medium text-white mb-3">What This Bookmarklet Does</h2>
            <p className="text-gray-300 mb-3">This bookmarklet does the following:</p>
            <ul className="text-gray-300 list-disc pl-5 space-y-2">
              <li>Gets the current URL from your browser</li>
              <li>Removes any query parameters (everything after '?')</li>
              <li>Removes any fragments (everything after '#')</li>
              <li>Removes trailing slashes</li>
              <li>Encodes the URL properly for passing as a parameter</li>
              <li>Opens the Vibe Checker website with your URL as a parameter</li>
            </ul>
            
            <p className="text-gray-300 mt-6 font-medium">
              Enjoy checking the vibes of your favorite websites! ✨
            </p>
          </div>
        </div>
      </main>
      
      <Footer />

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};

export default BookmarkletPage; 