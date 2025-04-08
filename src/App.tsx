import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookmarkletPage from './pages/Bookmarklet';
import './index.css';

function App() {
  // For custom domain deployments, we should use empty basename
  // Only use PUBLIC_URL for subdirectory deployments like GitHub Pages
  const basename = '';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarklet" element={<BookmarkletPage />} />
      </Routes>
    </Router>
  );
}

export default App;
