import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ControllerPage from './pages/ControllerPage';
import ManufacturerPage from './pages/ManufacturerPage';
import ComparePage from './pages/ComparePage';
import TimelinePage from './pages/TimelinePage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SubmitPage from './pages/SubmitPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/controller/:slug" element={<ControllerPage />} />
              <Route path="/manufacturer/:name" element={<ManufacturerPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsArticlePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
