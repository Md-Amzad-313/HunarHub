import React from 'react';
import { MOCK_ORDERS } from '../../data/orders';

function CustomerOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">My Product Orders</h1>
        <p className="text-xs text-neutral-500 mt-1">Track history and status of product orders placed with local entrepreneurs.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Entrepreneur</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{order.id}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{order.productName}</td>
                  <td className="px-6 py-4">{order.entrepreneurName}</td>
                  <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{order.amount} PKR</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
