/**
 * Navbar.jsx
 * Responsive top navigation bar for HunarHub.
 * Phase 0 – static links only. Auth-aware links come in Phase 1.
 */

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  // Phase 1+ links (uncomment as implemented):
  // { label: 'Marketplace', to: '/marketplace' },
  // { label: 'About',       to: '/about' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-heading font-bold text-primary-500">
              Hunar<span className="text-secondary-500">Hub</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 no-underline ${
                    isActive
                      ? 'text-primary-500'
                      : 'text-neutral-700 hover:text-primary-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phase 1: replace with auth-aware component */}
            <button className="btn-outline text-sm">Sign In</button>
            <button className="btn-primary text-sm">Get Started</button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-100 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium px-2 py-1 rounded-lg transition-colors no-underline ${
                    isActive
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-500 hover:bg-neutral-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <button className="btn-outline text-sm w-full">Sign In</button>
              <button className="btn-primary text-sm w-full">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
