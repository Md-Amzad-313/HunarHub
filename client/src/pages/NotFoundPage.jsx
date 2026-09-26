/**
 * NotFoundPage.jsx
 * Rendered for any unmatched route (404).
 */

import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4 text-center">
      <p className="text-8xl font-heading font-bold text-primary-500 select-none">404</p>
      <h1 className="mt-4 text-2xl font-heading font-semibold text-neutral-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-neutral-600 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 btn-primary text-sm no-underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
