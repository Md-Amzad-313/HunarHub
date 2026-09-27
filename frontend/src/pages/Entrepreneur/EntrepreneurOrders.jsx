import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { MOCK_ORDERS } from '../../data/orders';

function EntrepreneurOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('In Progress');

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    setOrders(
      orders.map((o) => {
        if (o.id === selectedOrder.id) {
          let color = 'bg-amber-100 text-amber-800';
          if (newStatus === 'Completed' || newStatus === 'Delivered') color = 'bg-emerald-100 text-emerald-800';
          if (newStatus === 'Cancelled') color = 'bg-red-100 text-red-800';
          return { ...o, status: newStatus, statusColor: color };
        }
        return o;
      })
    );
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Incoming Orders</h1>
        <p className="text-xs text-neutral-500 mt-1">Fulfill customer purchases, manage stock allocation, and update dispatch status.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{order.id}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-neutral-700">{order.productName}</td>
                  <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{order.amount} PKR</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setNewStatus(order.status);
                      }}
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Order Status Modal */}
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
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
              <p className="font-semibold text-neutral-900">{selectedOrder.productName}</p>
              <p className="text-neutral-500">Customer: {selectedOrder.customerName} • {selectedOrder.amount} PKR</p>
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-700">Order Progress Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="Pending">Pending Confirmation</option>
                <option value="In Progress">In Progress (Crafting)</option>
                <option value="Shipped">Shipped / Dispatched</option>
                <option value="Completed">Completed / Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EntrepreneurOrders;
