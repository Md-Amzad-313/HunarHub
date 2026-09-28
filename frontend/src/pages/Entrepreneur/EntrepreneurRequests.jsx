import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import RequestDetailsModal from '../../components/modals/RequestDetailsModal';
import { EmptyState } from '../../components/common/States';

function EntrepreneurRequests() {
  const { requests, updateRequestStatus } = useMarketplace();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'pending' && (req.status === 'Pending' || req.status === 'Pending Confirmation')) ||
        (activeTab === 'confirmed' && (req.status === 'Accepted' || req.status === 'Confirmed' || req.status === 'Scheduled' || req.status === 'In Progress')) ||
        (activeTab === 'completed' && req.status === 'Completed');

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.id.toLowerCase().includes(q) ||
        req.serviceName?.toLowerCase().includes(q) ||
        req.customerName?.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [requests, activeTab, searchQuery]);

  const handleStatusChange = (id, status) => {
    updateRequestStatus(id, status);
  };

  const pendingCount = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Pending Confirmation'
  ).length;
  const activeCount = requests.filter(
    (r) => r.status === 'Accepted' || r.status === 'Confirmed' || r.status === 'Scheduled' || r.status === 'In Progress'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Service Requests Queue</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Review incoming appointment requests, confirm schedule availability, and coordinate service visits.
          </p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Requests', count: requests.length },
            {
              id: 'pending',
              label: 'Action Required',
              count: pendingCount,
            },
            {
              id: 'confirmed',
              label: 'Confirmed / Active',
              count: activeCount,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: requests.filter((r) => r.status === 'Completed').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-secondary-600 text-white shadow-sm'
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
            placeholder="Search client, service, ID..."
            className="w-full py-2 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-200"
          />
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No service requests found"
          description={
            searchQuery ? `No requests match "${searchQuery}".` : 'No incoming requests under this category.'
          }
        />
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Requested Service</th>
                  <th className="px-6 py-4">Requested Date</th>
                  <th className="px-6 py-4">Est. Cost</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-neutral-900">{req.id}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      <div>{req.customerName}</div>
                      {req.customerPhone && (
                        <div className="text-[10px] text-neutral-400 font-normal">{req.customerPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-700 font-medium">{req.serviceName}</td>
                    <td className="px-6 py-4 text-neutral-500">
                      <div>{req.requestedDate}</div>
                      {req.timeSlot && <div className="text-[10px] text-neutral-400">{req.timeSlot.split(' ')[0]}</div>}
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-900">{req.estimatedCost}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${req.statusColor}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="text-neutral-600 hover:text-neutral-900 font-medium hover:underline text-[11px]"
                      >
                        View
                      </button>

                      {(req.status === 'Pending' || req.status === 'Pending Confirmation') && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req.id, 'Accepted')}
                            className="text-emerald-600 font-semibold hover:underline"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(req.id, 'Declined')}
                            className="text-red-600 font-semibold hover:underline"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {(req.status === 'Accepted' || req.status === 'Confirmed' || req.status === 'Scheduled') && (
                        <button
                          onClick={() => handleStatusChange(req.id, 'In Progress')}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Start Service
                        </button>
                      )}

                      {req.status === 'In Progress' && (
                        <button
                          onClick={() => handleStatusChange(req.id, 'Completed')}
                          className="text-primary-600 font-semibold hover:underline"
                        >
                          Mark Complete
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
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={Boolean(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          isEntrepreneur={true}
        />
      )}
    </div>
  );
}

export default EntrepreneurRequests;
