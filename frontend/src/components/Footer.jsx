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
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Empowering local micro-entrepreneurs with an accessible digital marketplace to reach
              neighborhood customers and grow sustainable livelihoods.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              Marketplace
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors no-underline">Home</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors no-underline">Explore Marketplace</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors no-underline">Browse Categories</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors no-underline">Handcrafted Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors no-underline">Local Services</Link></li>
            </ul>
          </div>

          {/* For Entrepreneurs */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              Portals & Roles
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/entrepreneurs" className="hover:text-white transition-colors no-underline">Discover Artisans</Link></li>
              <li><Link to="/customer" className="hover:text-white transition-colors no-underline">Customer Dashboard</Link></li>
              <li><Link to="/entrepreneur" className="hover:text-white transition-colors no-underline">Entrepreneur Studio</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors no-underline">Admin Control Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              About HunarHub
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              A digital marketplace built to bridge the gap for local craftspeople, tailors, bakers, and home service providers.
            </p>
            <span className="inline-block bg-neutral-800 text-primary-400 text-[10px] font-mono px-2.5 py-1 rounded-full border border-neutral-700">
              Phase 0 • Frontend Complete
            </span>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {CURRENT_YEAR} HunarHub. All rights reserved.</p>
          <p>Built with ❤️ for local micro-entrepreneurs.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
