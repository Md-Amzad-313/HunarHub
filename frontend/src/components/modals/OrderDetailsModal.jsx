import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';
import ReviewModal from './ReviewModal';

function OrderDetailsModal({ isOpen, onClose, order, isEntrepreneur = false }) {
  const { updateOrderStatus, cancelOrder } = useMarketplace();
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'Pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (!order) return null;

  const handleStatusSave = () => {
    updateOrderStatus(order.id, selectedStatus);
    setIsUpdating(false);
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel Order ${order.id}?`)) {
      cancelOrder(order.id);
      onClose();
    }
  };

  const isCancellable = order.status === 'Pending' || order.status === 'Accepted';
  const isCompleted = order.status === 'Completed';

  // Stepper timeline
  const statuses = ['Pending', 'Accepted', 'In Progress', 'Completed'];
  const currentIndex = statuses.indexOf(order.status);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Order Details: ${order.id}`}
        footer={
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isEntrepreneur && isCancellable && (
                <button
                  onClick={handleCancel}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  Cancel Order
                </button>
              )}
              {!isEntrepreneur && isCompleted && (
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="text-xs text-primary-600 hover:text-primary-700 font-bold hover:underline"
                >
                  ⭐ Rate & Review Order
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
              {isEntrepreneur && isUpdating && (
                <Button variant="primary" size="sm" onClick={handleStatusSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-5 text-xs">
          {/* Visual Order Progress Stepper */}
          {order.status !== 'Cancelled' && (
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider mb-3">
                Fulfillment Timeline
              </span>
              <div className="flex items-center justify-between relative">
                {statuses.map((st, idx) => {
                  const isDone = currentIndex >= idx;
                  const isCurrent = currentIndex === idx;
                  return (
                    <div key={st} className="flex flex-col items-center z-10">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                          isCurrent
                            ? 'bg-primary-600 text-white ring-4 ring-primary-100 shadow'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                          isCurrent ? 'text-primary-600 font-bold' : isDone ? 'text-neutral-800' : 'text-neutral-400'
                        }`}
                      >
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Status Header */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Current Status
              </span>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Order Date</span>
              <span className="font-semibold text-neutral-800">{order.date || 'Recent'}</span>
            </div>
          </div>

          {/* Entrepreneur Status Changer */}
          {isEntrepreneur && (
            <div className="p-3 bg-primary-50/50 rounded-2xl border border-primary-200 space-y-2">
              <span className="font-semibold text-primary-900 block">Manage Order Fulfillment:</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setIsUpdating(true);
                  }}
                  className="py-1.5 px-3 bg-white border border-primary-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-300 font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {isUpdating && (
                  <span className="text-[11px] text-primary-600 font-medium animate-pulse">Unsaved change</span>
                )}
              </div>
            </div>
          )}

          {/* Order Items Table */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-neutral-900 text-xs uppercase tracking-wider">Purchased Items</h4>
            <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
              {(order.items && order.items.length > 0
                ? order.items
                : [
                    {
                      id: order.productId,
                      name: order.productName,
                      quantity: order.quantity || 1,
                      price: order.unitPrice || order.amount,
                      image: order.productImage,
                    },
                  ]
              ).map((it, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    {it.image && (
                      <img src={it.image} alt={it.name} className="w-10 h-10 rounded-xl object-cover" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">{it.name}</p>
                      <p className="text-[11px] text-neutral-500">Qty: {it.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900 flex-shrink-0">
                    {formatCurrency((it.price || 0) * (it.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 text-neutral-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-neutral-900">{formatCurrency(order.subtotal || order.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-medium text-neutral-900">
                {order.deliveryFee === 0 ? 'FREE' : formatCurrency(order.deliveryFee || 0)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 border-t border-neutral-200 pt-1.5 text-sm">
              <span>Total Paid:</span>
              <span className="text-primary-600">{formatCurrency(order.amount)}</span>
            </div>
          </div>

          {/* Shipping & Contact Destination */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Shipping & Recipient Details
            </h4>
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1 text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-500">Recipient:</span>
                <span className="font-semibold text-neutral-900">{order.customerName}</span>
              </div>
              {order.customerPhone && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span className="font-mono text-neutral-900">{order.customerPhone}</span>
                </div>
              )}
              {order.shippingAddress && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="font-medium text-neutral-900 text-right truncate max-w-[200px]">
                    {order.shippingAddress}, {order.city}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-medium text-neutral-900">{order.paymentMethod || 'Cash on Delivery'}</span>
              </div>
              {order.notes && (
                <div className="pt-1.5 border-t border-neutral-200">
                  <span className="text-neutral-500">Customer Note:</span>
                  <p className="italic text-neutral-800 mt-0.5">"{order.notes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Review Modal for Completed Order */}
      {isReviewOpen && (
        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          target={{
            id: order.entrepreneurId || 'ent-1',
            businessName: order.businessName || order.entrepreneurName || 'Artisan Store',
          }}
          targetType="entrepreneur"
          orderId={order.id}
        />
      )}
    </>
  );
}

export default OrderDetailsModal;
