/**
 * App.jsx
 * Root application component.
 * Sets up React Router and the top-level route tree.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '@layouts/MainLayout';

// Pages
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes inside the main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Phase 1+ routes will be added here:
              <Route path="/login"     element={<LoginPage />} />
              <Route path="/register"  element={<RegisterPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
          */}
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
