import React from 'react';

function AdminComplaints() {
  const complaints = [
    { id: 'CMP-701', user: 'Usman Ali', topic: 'Delayed Delivery for ORD-8904', date: '2026-09-23', status: 'In Review', priority: 'Medium' },
    { id: 'CMP-698', user: 'Saman Tariq', topic: 'Damaged packaging during transit', date: '2026-09-21', status: 'Resolved', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Complaints & Customer Support</h1>
        <p className="text-xs text-neutral-500 mt-1">Review customer disputes and marketplace feedback.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Complainant</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{c.id}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{c.user}</td>
                  <td className="px-6 py-4 font-medium text-neutral-800">{c.topic}</td>
                  <td className="px-6 py-4 text-neutral-500">{c.date}</td>
                  <td className="px-6 py-4 font-semibold text-amber-600">{c.priority}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {c.status}
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

export default AdminComplaints;
