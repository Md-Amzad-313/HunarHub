import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import OrderDetailsModal from '../../components/modals/OrderDetailsModal';
import { EmptyState } from '../../components/common/States';
import { formatCurrency } from '../../utils/helpers';

function CustomerOrders() {
  const { orders, cancelOrder } = useMarketplace();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tab filter
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && (order.status === 'Pending' || order.status === 'Accepted' || order.status === 'In Progress' || order.status === 'Processing' || order.status === 'In Transit')) ||
        (activeTab === 'completed' && (order.status === 'Completed' || order.status === 'Delivered')) ||
        (activeTab === 'cancelled' && order.status === 'Cancelled');

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.productName?.toLowerCase().includes(q) ||
        order.entrepreneurName?.toLowerCase().includes(q) ||
        order.businessName?.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const activeCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Accepted' || o.status === 'In Progress' || o.status === 'Processing' || o.status === 'In Transit'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Product Orders</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track purchases, shipping updates, and direct orders from local micro-entrepreneurs.
          </p>
        </div>
        <Link to="/products" className="btn-primary text-xs px-4 py-2 no-underline flex-shrink-0">
          + Explore More Products
        </Link>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'active', label: 'Active / In Progress', count: activeCount },
            {
              id: 'completed',
              label: 'Completed',
              count: orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered').length,
            },
            {
              id: 'cancelled',
              label: 'Cancelled',
              count: orders.filter((o) => o.status === 'Cancelled').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID or item..."
            className="w-full py-2 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description={
            searchQuery
              ? `No orders match "${searchQuery}".`
              : 'You have not placed any orders under this category yet.'
          }
          actionLabel="Browse Marketplace"
          onAction={() => window.location.assign('/products')}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Item & Artisan</th>
                  <th className="px-6 py-4">Date Placed</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-neutral-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {order.productImage ? (
                          <img
                            src={order.productImage}
                            alt={order.productName}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-base">
                            🛍️
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-neutral-900 line-clamp-1">{order.productName}</p>
                          <p className="text-neutral-500 text-[11px]">
                            By {order.businessName || order.entrepreneurName}
                            {order.quantity ? ` • Qty: ${order.quantity}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-neutral-900">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary-600 font-semibold hover:underline"
                      >
                        Details
                      </button>
                      {(order.status === 'Processing' || order.status === 'Pending') && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel order ${order.id}?`)) {
                              cancelOrder(order.id);
                            }
                          }}
                          className="text-red-500 font-medium hover:underline text-[11px]"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          isEntrepreneur={false}
        />
      )}
    </div>
  );
}

export default CustomerOrders;
