import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useMarketplace } from '../../context/MarketplaceContext';
import ReviewModal from './ReviewModal';

function RequestDetailsModal({ isOpen, onClose, request, isEntrepreneur = false }) {
  const { updateRequestStatus, cancelRequest } = useMarketplace();
  const [selectedStatus, setSelectedStatus] = useState(request?.status || 'Pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (!request) return null;

  const handleStatusSave = () => {
    updateRequestStatus(request.id, selectedStatus);
    setIsUpdating(false);
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel request ${request.id}?`)) {
      cancelRequest(request.id);
      onClose();
    }
  };

  const isCancellable = request.status === 'Pending' || request.status === 'Accepted';
  const isCompleted = request.status === 'Completed';

  const statuses = ['Pending', 'Accepted', 'In Progress', 'Completed'];
  const currentIndex = statuses.indexOf(request.status);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Service Request: ${request.id}`}
        footer={
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isEntrepreneur && isCancellable && (
                <button
                  onClick={handleCancel}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  Cancel Request
                </button>
              )}
              {!isEntrepreneur && isCompleted && (
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="text-xs text-secondary-600 hover:text-secondary-700 font-bold hover:underline"
                >
                  ⭐ Rate & Review Service
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
              {isEntrepreneur && isUpdating && (
                <Button variant="secondary" size="sm" onClick={handleStatusSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-5 text-xs">
          {/* Stepper Timeline */}
          {request.status !== 'Declined' && request.status !== 'Cancelled' && (
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider mb-3">
                Appointment Progress
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
                            ? 'bg-secondary-600 text-white ring-4 ring-secondary-100 shadow'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                          isCurrent ? 'text-secondary-600 font-bold' : isDone ? 'text-neutral-800' : 'text-neutral-400'
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
                Status
              </span>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${request.statusColor}`}>
                {request.status}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Scheduled Date</span>
              <span className="font-semibold text-neutral-800">{request.requestedDate}</span>
            </div>
          </div>

          {/* Entrepreneur Status Changer */}
          {isEntrepreneur && (
            <div className="p-3 bg-secondary-50/50 rounded-2xl border border-secondary-200 space-y-2">
              <span className="font-semibold text-secondary-900 block">Manage Request Status:</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setIsUpdating(true);
                  }}
                  className="py-1.5 px-3 bg-white border border-secondary-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary-300 font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Declined">Declined</option>
                </select>
                {isUpdating && (
                  <span className="text-[11px] text-secondary-600 font-medium animate-pulse">Unsaved change</span>
                )}
              </div>
            </div>
          )}

          {/* Service Details */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-neutral-900 text-xs uppercase tracking-wider">Service Overview</h4>
            <div className="p-3 bg-white rounded-2xl border border-neutral-200 space-y-1.5 text-neutral-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-900 text-sm">{request.serviceName}</span>
                <span className="font-bold text-neutral-900">{request.estimatedCost}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Provider:</span>
                <span className="font-semibold text-neutral-800">
                  {request.businessName || request.entrepreneurName}
                </span>
              </div>
              {request.timeSlot && (
                <div className="flex justify-between text-neutral-600">
                  <span>Preferred Slot:</span>
                  <span className="font-medium text-neutral-900">{request.timeSlot}</span>
                </div>
              )}
              {request.locationType && (
                <div className="flex justify-between text-neutral-600">
                  <span>Location Mode:</span>
                  <span className="font-medium text-neutral-900">{request.locationType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer & Location Information */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Client & Contact Info
            </h4>
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-500">Client:</span>
                <span className="font-semibold text-neutral-900">{request.customerName}</span>
              </div>
              {request.customerPhone && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span className="font-mono text-neutral-900">{request.customerPhone}</span>
                </div>
              )}
              {request.address && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Address:</span>
                  <span className="font-medium text-neutral-900 text-right truncate max-w-[200px]">
                    {request.address}, {request.city}
                  </span>
                </div>
              )}
              {request.notes && (
                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-neutral-500 block mb-0.5">Client Note / Scope:</span>
                  <p className="bg-white p-2 rounded-xl border border-neutral-200 text-neutral-800 italic">
                    "{request.notes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Review Modal for Completed Service */}
      {isReviewOpen && (
        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          target={{
            id: request.entrepreneurId || 'ent-1',
            businessName: request.businessName || request.entrepreneurName || 'Service Provider',
          }}
          targetType="entrepreneur"
          requestId={request.id}
        />
      )}
    </>
  );
}

export default RequestDetailsModal;
