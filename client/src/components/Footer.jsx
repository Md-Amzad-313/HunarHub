/**
 * Footer.jsx
 * Site-wide footer for HunarHub.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="no-underline">
              <span className="text-xl font-heading font-bold text-white">
                Hunar<span className="text-primary-400">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Empowering local micro-entrepreneurs with a digital marketplace to reach
              more customers and grow their businesses.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors no-underline">Home</Link></li>
              {/* Phase 1+ links */}
              <li className="text-neutral-500">Marketplace <span className="text-xs">(coming soon)</span></li>
              <li className="text-neutral-500">Services <span className="text-xs">(coming soon)</span></li>
            </ul>
          </div>

          {/* For Entrepreneurs */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Entrepreneurs
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-neutral-500">Sell Products <span className="text-xs">(coming soon)</span></li>
              <li className="text-neutral-500">Offer Services <span className="text-xs">(coming soon)</span></li>
              <li className="text-neutral-500">Dashboard <span className="text-xs">(coming soon)</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-neutral-500">About Us</li>
              <li className="text-neutral-500">Contact</li>
              <li className="text-neutral-500">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500">
          <p>© {CURRENT_YEAR} HunarHub. All rights reserved.</p>
          <p>Built with ❤️ for local entrepreneurs.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
