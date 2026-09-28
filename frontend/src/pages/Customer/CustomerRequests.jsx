import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import RequestDetailsModal from '../../components/modals/RequestDetailsModal';
import { EmptyState } from '../../components/common/States';

function CustomerRequests() {
  const { requests, cancelRequest } = useMarketplace();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Tab filter
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'pending' && (req.status === 'Pending' || req.status === 'Pending Confirmation')) ||
        (activeTab === 'scheduled' && (req.status === 'Accepted' || req.status === 'Scheduled' || req.status === 'Confirmed' || req.status === 'In Progress')) ||
        (activeTab === 'completed' && req.status === 'Completed') ||
        (activeTab === 'declined' && (req.status === 'Declined' || req.status === 'Rejected' || req.status === 'Cancelled'));

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.id.toLowerCase().includes(q) ||
        req.serviceName?.toLowerCase().includes(q) ||
        req.entrepreneurName?.toLowerCase().includes(q) ||
        req.businessName?.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [requests, activeTab, searchQuery]);

  const pendingCount = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Pending Confirmation'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Service Requests</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage scheduled service appointments, home visits, and artisan communications.
          </p>
        </div>
        <Link to="/services" className="btn-secondary text-xs px-4 py-2 no-underline flex-shrink-0">
          + Book Another Service
        </Link>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Requests', count: requests.length },
            { id: 'pending', label: 'Pending', count: pendingCount },
            {
              id: 'scheduled',
              label: 'Scheduled / In Progress',
              count: requests.filter((r) => r.status === 'Scheduled' || r.status === 'Confirmed' || r.status === 'In Progress').length,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: requests.filter((r) => r.status === 'Completed').length,
            },
            {
              id: 'declined',
              label: 'Declined',
              count: requests.filter((r) => r.status === 'Declined').length,
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

        {/* Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search request ID or service..."
            className="w-full py-2 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-200"
          />
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No service requests found"
          description={
            searchQuery
              ? `No requests match "${searchQuery}".`
              : 'You have no service appointment bookings in this category.'
          }
          actionLabel="Find Local Services"
          onAction={() => window.location.assign('/services')}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Service & Provider</th>
                  <th className="px-6 py-4">Scheduled Date</th>
                  <th className="px-6 py-4">Estimated Rate</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-neutral-900">{req.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {req.serviceImage ? (
                          <img
                            src={req.serviceImage}
                            alt={req.serviceName}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-base">
                            🔧
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-neutral-900 line-clamp-1">{req.serviceName}</p>
                          <p className="text-neutral-500 text-[11px]">
                            Provider: {req.businessName || req.entrepreneurName}
                            {req.timeSlot ? ` • ${req.timeSlot.split(' ')[0]}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{req.requestedDate}</td>
                    <td className="px-6 py-4 font-bold text-neutral-900">{req.estimatedCost}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${req.statusColor}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="text-secondary-600 font-semibold hover:underline"
                      >
                        Details
                      </button>
                      {(req.status === 'Pending Confirmation' || req.status === 'Scheduled') && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel service request ${req.id}?`)) {
                              cancelRequest(req.id);
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
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={Boolean(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          isEntrepreneur={false}
        />
      )}
    </div>
  );
}

export default CustomerRequests;
