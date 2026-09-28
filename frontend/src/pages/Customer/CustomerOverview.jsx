import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/cards/DashboardCard';
import ProductCard from '../../components/cards/ProductCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';

function CustomerOverview() {
  const { orders, requests, products, customerProfile } = useMarketplace();

  // Dynamic calculations from localStorage state
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Accepted' || o.status === 'In Progress'
  ).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;

  const totalRequestsCount = requests.length;
  const activeRequestsCount = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Accepted' || r.status === 'In Progress'
  ).length;
  const completedRequestsCount = requests.filter((r) => r.status === 'Completed').length;

  const totalSpent = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mt-1">
            Welcome back, {customerProfile.name || 'Fatima'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Track active orders, view booked services, and support local micro-entrepreneurs.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link to="/explore" className="btn-primary text-xs px-5 py-2.5 no-underline">
            Browse Marketplace
          </Link>
          <Link to="/cart" className="btn bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2.5 no-underline">
            View Cart
          </Link>
        </div>
      </div>

      {/* Dynamic Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard title="Total Orders" value={String(totalOrdersCount)} icon="📦" color="primary" />
        <DashboardCard title="Active Orders" value={String(activeOrdersCount)} icon="⏳" color="indigo" />
        <DashboardCard title="Completed Orders" value={String(completedOrdersCount)} icon="✓" color="emerald" />
        <DashboardCard title="Service Requests" value={String(totalRequestsCount)} icon="🛠️" color="secondary" />
        <DashboardCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          icon="💳"
          color="emerald"
        />
      </div>

      {/* Recent Orders & Service Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Recent Product Orders</h2>
            <Link to="/customer/orders" className="text-xs font-semibold text-primary-600 hover:underline no-underline">
              View All ({totalOrdersCount}) →
            </Link>
          </div>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">No orders placed yet.</p>
            ) : (
              orders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-bold text-neutral-900 truncate">{order.productName}</p>
                    <p className="text-neutral-500 text-[11px] truncate">
                      {order.id} • {order.date} • By {order.businessName || order.entrepreneurName}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-neutral-900 mt-1">{formatCurrency(order.amount)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Service Requests */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Recent Service Requests</h2>
            <Link
              to="/customer/requests"
              className="text-xs font-semibold text-secondary-600 hover:underline no-underline"
            >
              View All ({totalRequestsCount}) →
            </Link>
          </div>

          <div className="space-y-3">
            {requests.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">No service requests booked yet.</p>
            ) : (
              requests.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-bold text-neutral-900 truncate">{req.serviceName}</p>
                    <p className="text-neutral-500 text-[11px] truncate">
                      {req.id} • {req.requestedDate} • Provider: {req.businessName || req.entrepreneurName}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${req.statusColor}`}>
                      {req.status}
                    </span>
                    <p className="font-bold text-neutral-900 mt-1">{req.estimatedCost}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Handcrafted Picks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-neutral-900">Handcrafted Picks for You</h2>
          <Link to="/products" className="text-xs font-semibold text-primary-600 hover:underline no-underline">
            Explore All Products →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerOverview;
