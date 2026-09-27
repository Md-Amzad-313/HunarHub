import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from './common/Modal';
import Button from './common/Button';

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
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'register' | null

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
            {/* Quick Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                aria-expanded={portalMenuOpen}
                aria-label="Toggle portal menus"
              >
                <span>Portals</span>
                <span className="text-[10px]">▼</span>
              </button>

              {portalMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-2xl shadow-lg py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setPortalMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Switch Dashboards
                  </div>
                  <Link
                    to="/customer"
                    onClick={() => setPortalMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-primary-50 hover:text-primary-600 no-underline"
                  >
                    👤 Customer Portal
                  </Link>
                  <Link
                    to="/entrepreneur"
                    onClick={() => setPortalMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-primary-50 hover:text-primary-600 no-underline"
                  >
                    🏪 Entrepreneur Studio
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setPortalMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-primary-50 hover:text-primary-600 no-underline"
                  >
                    ⚙️ Admin Control Center
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setAuthModal('signin')}
              className="btn-outline text-xs px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModal('register')}
              className="btn-primary text-xs px-4 py-2"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
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
              <span className="text-[11px] font-bold uppercase text-neutral-400 px-3">Quick Dashboards</span>
              <div className="grid grid-cols-3 gap-2 px-2">
                <Link
                  to="/customer"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-[11px] font-semibold text-neutral-700 py-2 bg-neutral-100 rounded-xl no-underline hover:bg-primary-50"
                >
                  Customer
                </Link>
                <Link
                  to="/entrepreneur"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-[11px] font-semibold text-neutral-700 py-2 bg-neutral-100 rounded-xl no-underline hover:bg-primary-50"
                >
                  Entrepreneur
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-[11px] font-semibold text-neutral-700 py-2 bg-neutral-100 rounded-xl no-underline hover:bg-primary-50"
                >
                  Admin
                </Link>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModal('signin');
                  }}
                  className="btn-outline text-xs flex-1 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModal('register');
                  }}
                  className="btn-primary text-xs flex-1 py-2"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Authentication Modal */}
      <Modal
        isOpen={Boolean(authModal)}
        onClose={() => setAuthModal(null)}
        title={authModal === 'signin' ? 'Sign In to HunarHub' : 'Create HunarHub Account'}
        footer={
          <Button variant="primary" size="sm" onClick={() => setAuthModal(null)}>
            Close Demo Preview
          </Button>
        }
      >
        <div className="space-y-4 text-center py-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto text-xl">
            🔒
          </div>
          <h3 className="text-base font-heading font-bold text-neutral-900">
            {authModal === 'signin' ? 'Account Authentication (Phase 1+ Preview)' : 'Registration Portal (Phase 1+ Preview)'}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
            JWT authentication endpoints, MongoDB password hashing, and user role creation (Customer vs. Micro-Entrepreneur) will be wired during Phase 1 backend integration.
          </p>
          <div className="pt-2 text-left bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs space-y-1 text-neutral-700">
            <p className="font-semibold text-neutral-900 mb-1">Quick Links to Explore Portals Now:</p>
            <p>• <Link to="/customer" onClick={() => setAuthModal(null)} className="text-primary-600 hover:underline">Customer Dashboard</Link></p>
            <p>• <Link to="/entrepreneur" onClick={() => setAuthModal(null)} className="text-primary-600 hover:underline">Entrepreneur Studio</Link></p>
            <p>• <Link to="/admin" onClick={() => setAuthModal(null)} className="text-primary-600 hover:underline">Admin Control Center</Link></p>
          </div>
        </div>
      </Modal>
    </header>
  );
}

export default Navbar;
