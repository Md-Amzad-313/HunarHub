import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Sidebar({ role = 'customer', isOpen, onClose }) {
  const menus = {
    customer: [
      { label: 'Overview', to: '/customer', icon: '📊', exact: true },
      { label: 'My Orders', to: '/customer/orders', icon: '📦' },
      { label: 'Service Requests', to: '/customer/requests', icon: '🛠️' },
      { label: 'Recommendations', to: '/customer/recommendations', icon: '✨' },
      { label: 'Profile Settings', to: '/customer/profile', icon: '👤' },
    ],
    entrepreneur: [
      { label: 'Overview', to: '/entrepreneur', icon: '📈', exact: true },
      { label: 'My Products', to: '/entrepreneur/products', icon: '🛍️' },
      { label: 'My Services', to: '/entrepreneur/services', icon: '🔧' },
      { label: 'Incoming Orders', to: '/entrepreneur/orders', icon: '📥' },
      { label: 'Service Requests', to: '/entrepreneur/requests', icon: '📝' },
      { label: 'Storefront Profile', to: '/entrepreneur/profile', icon: '🏪' },
    ],
    admin: [
      { label: 'Overview', to: '/admin', icon: '⚙️', exact: true },
      { label: 'Users', to: '/admin/users', icon: '👥' },
      { label: 'Entrepreneurs', to: '/admin/entrepreneurs', icon: '🏬' },
      { label: 'Categories', to: '/admin/categories', icon: '🏷️' },
      { label: 'Orders', to: '/admin/orders', icon: '📦' },
      { label: 'Complaints & Support', to: '/admin/complaints', icon: '💬' },
      { label: 'Analytics', to: '/admin/analytics', icon: '📊' },
    ],
  };

  const navItems = menus[role] || menus.customer;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-neutral-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-neutral-800">
          <Link to="/" className="text-xl font-heading font-bold text-white no-underline flex items-center gap-2">
            Hunar<span className="text-primary-400">Hub</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
              {role}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-neutral-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md font-semibold'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer info / Back to main site */}
        <div className="p-4 border-t border-neutral-800">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium rounded-xl transition-colors no-underline"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
