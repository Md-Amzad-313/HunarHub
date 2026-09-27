import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/cards/DashboardCard';
import { ENTREPRENEURS } from '../../data/entrepreneurs';
import { MOCK_ORDERS } from '../../data/orders';
import { MOCK_SERVICE_REQUESTS } from '../../data/requests';

function EntrepreneurOverview() {
  const currentEntrepreneur = ENTREPRENEURS[1]; // Tariq Mehmood (Clay Craft Pottery)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentEntrepreneur.avatar}
            alt={currentEntrepreneur.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-sm"
          />
          <div>
            <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              {currentEntrepreneur.businessName}
            </span>
            <h1 className="text-2xl font-heading font-bold mt-1">Hello, {currentEntrepreneur.name}! 🏪</h1>
            <p className="text-xs text-primary-100 mt-0.5">{currentEntrepreneur.category} • {currentEntrepreneur.location}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Link to="/entrepreneur/products" className="btn bg-white text-primary-600 hover:bg-neutral-100 text-xs px-4 py-2 no-underline font-semibold">
            + Add Product
          </Link>
          <Link to={`/entrepreneurs/${currentEntrepreneur.id}`} className="btn border border-white text-white hover:bg-white/10 text-xs px-4 py-2 no-underline">
            View Public Store
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Active Products" value="5" change="12%" icon="🛍️" color="primary" />
        <DashboardCard title="Services Offered" value="2" icon="🔧" color="secondary" />
        <DashboardCard title="Total Revenue" value="38,400 PKR" change="18%" icon="💰" color="emerald" />
        <DashboardCard title="Store Rating" value="4.8 ★" icon="⭐" color="amber" />
      </div>

      {/* Recent Activity & Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Incoming Customer Orders */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Incoming Product Orders</h2>
            <Link to="/entrepreneur/orders" className="text-xs font-semibold text-primary-600 hover:underline no-underline">Manage All →</Link>
          </div>

          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <div key={order.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{order.productName}</p>
                  <p className="text-neutral-500 text-[11px]">{order.id} • Customer: {order.customerName}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>{order.status}</span>
                  <p className="font-bold text-neutral-900 mt-1">{order.amount} PKR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Service Requests */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Incoming Service Requests</h2>
            <Link to="/entrepreneur/requests" className="text-xs font-semibold text-secondary-600 hover:underline no-underline">Manage All →</Link>
          </div>

          <div className="space-y-3">
            {MOCK_SERVICE_REQUESTS.slice(0, 3).map((req) => (
              <div key={req.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{req.serviceName}</p>
                  <p className="text-neutral-500 text-[11px]">{req.id} • Client: {req.customerName}</p>
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
    </div>
  );
}

export default EntrepreneurOverview;
