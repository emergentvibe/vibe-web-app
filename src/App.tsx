import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookmarkletPage from './pages/Bookmarklet';
import './index.css';

function App() {
  // Get the basename from PUBLIC_URL for GitHub Pages support
  const basename = process.env.PUBLIC_URL || '';

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
