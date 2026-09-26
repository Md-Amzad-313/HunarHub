import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Categories', to: '/categories' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Entrepreneurs', to: '/entrepreneurs' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-heading font-bold text-primary-500">
              Hunar<span className="text-secondary-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 no-underline ${
                    isActive
                      ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1'
                      : 'text-neutral-700 hover:text-primary-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/customer" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 no-underline px-2">
              Dashboards
            </Link>
            <button
              onClick={() => alert('Login modal / flow will be enabled in Phase 1+ backend integration.')}
              className="btn-outline text-xs px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => alert('Registration modal / flow will be enabled in Phase 1+ backend integration.')}
              className="btn-primary text-xs px-4 py-2"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
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

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-4 flex flex-col gap-2 bg-white">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-xl transition-colors no-underline ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 font-semibold'
                      : 'text-neutral-700 hover:text-primary-500 hover:bg-neutral-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-neutral-100 flex flex-col gap-2">
              <Link
                to="/customer"
                onClick={() => setMobileOpen(false)}
                className="text-xs text-center font-semibold text-neutral-600 py-2 bg-neutral-100 rounded-xl no-underline"
              >
                View Dashboards (Portal)
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  alert('Login flow will be enabled in Phase 1+ backend integration.');
                }}
                className="btn-outline text-xs w-full py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  alert('Registration flow will be enabled in Phase 1+ backend integration.');
                }}
                className="btn-primary text-xs w-full py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
