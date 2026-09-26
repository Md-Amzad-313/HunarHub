import React from 'react';
import { Link } from 'react-router-dom';

function DashboardHeader({ onToggleSidebar, role = 'Customer', userName = 'User' }) {
  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-neutral-800 hidden sm:inline-block">
          HunarHub Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher Links (Convenience for testing Phase 1 UI) */}
        <div className="hidden md:flex items-center gap-2 bg-neutral-100 p-1 rounded-xl text-xs font-medium">
          <Link
            to="/customer"
            className={`px-3 py-1.5 rounded-lg no-underline transition-all ${
              role === 'Customer' ? 'bg-white shadow text-neutral-900 font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Customer
          </Link>
          <Link
            to="/entrepreneur"
            className={`px-3 py-1.5 rounded-lg no-underline transition-all ${
              role === 'Entrepreneur' ? 'bg-white shadow text-neutral-900 font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Entrepreneur
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-1.5 rounded-lg no-underline transition-all ${
              role === 'Admin' ? 'bg-white shadow text-neutral-900 font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Admin
          </Link>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-3 border-l border-neutral-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-primary-500 text-white font-heading font-bold text-xs flex items-center justify-center">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <p className="font-semibold text-neutral-900 leading-tight">{userName}</p>
            <p className="text-neutral-500">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
