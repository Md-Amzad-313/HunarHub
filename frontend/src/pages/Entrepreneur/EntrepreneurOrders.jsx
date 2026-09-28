import React, { useState, useMemo } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import OrderDetailsModal from '../../components/modals/OrderDetailsModal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';
import { EmptyState } from '../../components/common/States';

function EntrepreneurOrders() {
  const { orders, updateOrderStatus } = useMarketplace();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('In Transit');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'pending' && order.status === 'Pending') ||
        (activeTab === 'active' && (order.status === 'Accepted' || order.status === 'In Progress' || order.status === 'Processing' || order.status === 'In Transit')) ||
        (activeTab === 'completed' && (order.status === 'Completed' || order.status === 'Delivered')) ||
        (activeTab === 'cancelled' && order.status === 'Cancelled');

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.productName?.toLowerCase().includes(q) ||
        order.customerName?.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, newStatus);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Incoming Orders</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Fulfill customer purchases, coordinate doorstep delivery, and update dispatch status.
          </p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            {
              id: 'pending',
              label: 'Pending',
              count: orders.filter((o) => o.status === 'Pending').length,
            },
            {
              id: 'active',
              label: 'Active / In Progress',
              count: orders.filter(
                (o) => o.status === 'Accepted' || o.status === 'In Progress' || o.status === 'Processing' || o.status === 'In Transit'
              ).length,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered').length,
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

        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search buyer, item, or ID..."
            className="w-full py-2 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No incoming orders"
          description={
            searchQuery ? `No orders match "${searchQuery}".` : 'No orders found matching this filter.'
          }
        />
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Item & Qty</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-neutral-900">{order.id}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      <div>{order.customerName}</div>
                      {order.customerPhone && (
                        <div className="text-[10px] text-neutral-400 font-normal">{order.customerPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      <div className="font-medium line-clamp-1">{order.productName}</div>
                      <div className="text-[11px] text-neutral-400">Qty: {order.quantity || 1}</div>
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
                        onClick={() => setDetailsOrder(order)}
                        className="text-neutral-600 hover:text-neutral-900 font-medium hover:underline text-[11px]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status === 'Pending' ? 'Accepted' : order.status);
                        }}
                        className="text-primary-600 font-semibold hover:underline"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Status Update Modal */}
      {selectedOrder && (
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Update Order ${selectedOrder.id}`}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleUpdateStatus}>
                Save Order Status
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-1">
              <p className="font-semibold text-neutral-900">{selectedOrder.productName}</p>
              <p className="text-neutral-500">
                Customer: <span className="font-medium text-neutral-800">{selectedOrder.customerName}</span> •{' '}
                {formatCurrency(selectedOrder.amount)}
              </p>
              {selectedOrder.shippingAddress && (
                <p className="text-neutral-500">
                  Address: {selectedOrder.shippingAddress}, {selectedOrder.city}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Select New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 font-medium"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <p className="text-[11px] text-neutral-400 mt-1">
                Updating the status notifies the customer in their portal immediately.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Full Order Details Modal */}
      {detailsOrder && (
        <OrderDetailsModal
          isOpen={Boolean(detailsOrder)}
          onClose={() => setDetailsOrder(null)}
          order={detailsOrder}
          isEntrepreneur={true}
        />
      )}
    </div>
  );
}

export default EntrepreneurOrders;
