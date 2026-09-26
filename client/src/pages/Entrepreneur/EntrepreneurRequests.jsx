import React from 'react';
import { MOCK_SERVICE_REQUESTS } from '../../data/requests';

function EntrepreneurRequests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Service Requests Queue</h1>
        <p className="text-xs text-neutral-500 mt-1">Review incoming appointment requests and confirm availability.</p>
      </div>

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
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_SERVICE_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{req.id}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{req.customerName}</td>
                  <td className="px-6 py-4 text-neutral-700">{req.serviceName}</td>
                  <td className="px-6 py-4 text-neutral-500">{req.requestedDate}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{req.estimatedCost}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${req.statusColor}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-secondary-600 font-semibold hover:underline">Accept Booking</button>
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

export default EntrepreneurRequests;
