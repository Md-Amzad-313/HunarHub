import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/cards/DashboardCard';
import ProductCard from '../../components/cards/ProductCard';
import { MOCK_ORDERS } from '../../data/orders';
import { MOCK_SERVICE_REQUESTS } from '../../data/requests';
import { PRODUCTS } from '../../data/products';

function CustomerOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mt-1">Welcome back, Fatima! 👋</h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">Track your active orders, booked services, and saved local artisans.</p>
        </div>
        <Link to="/explore" className="btn-primary text-xs px-5 py-2.5 no-underline flex-shrink-0">
          Browse Marketplace
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Orders" value="4" icon="📦" color="primary" />
        <DashboardCard title="Service Requests" value="3" icon="🛠️" color="secondary" />
        <DashboardCard title="Saved Artisans" value="5" icon="⭐" color="amber" />
        <DashboardCard title="Spent (PKR)" value="13,100" icon="💳" color="emerald" />
      </div>

      {/* AI Recommendation Placeholder Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
            ✨
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-purple-900">AI Recommendation Engine</h3>
            <p className="text-xs text-purple-700 mt-1 leading-relaxed">
              Personalized recommendations will appear here. Our Scikit-learn model will recommend local products and services based on your preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders & Service Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Recent Orders</h2>
            <Link to="/customer/orders" className="text-xs font-semibold text-primary-600 hover:underline no-underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <div key={order.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{order.productName}</p>
                  <p className="text-neutral-500 text-[11px]">{order.id} • {order.date} • By {order.entrepreneurName}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>{order.status}</span>
                  <p className="font-bold text-neutral-900 mt-1">{order.amount} PKR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Service Requests */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Recent Service Requests</h2>
            <Link to="/customer/requests" className="text-xs font-semibold text-secondary-600 hover:underline no-underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {MOCK_SERVICE_REQUESTS.slice(0, 3).map((req) => (
              <div key={req.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{req.serviceName}</p>
                  <p className="text-neutral-500 text-[11px]">{req.id} • {req.requestedDate} • Provider: {req.entrepreneurName}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${req.statusColor}`}>{req.status}</span>
                  <p className="font-bold text-neutral-900 mt-1">{req.estimatedCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved/Favorite Items Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-neutral-900">Saved Marketplace Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerOverview;
