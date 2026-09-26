import React from 'react';
import { ENTREPRENEURS } from '../../data/entrepreneurs';

function AdminEntrepreneurs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Registered Micro-Entrepreneurs</h1>
        <p className="text-xs text-neutral-500 mt-1">Verify credentials and manage storefront approvals.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Entrepreneur</th>
                <th className="px-6 py-4">Business Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ENTREPRENEURS.map((ent) => (
                <tr key={ent.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-neutral-900 flex items-center gap-3">
                    <img src={ent.avatar} alt={ent.name} className="w-8 h-8 rounded-full object-cover" />
                    <span>{ent.name}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{ent.businessName}</td>
                  <td className="px-6 py-4 text-neutral-500">{ent.category}</td>
                  <td className="px-6 py-4 text-neutral-500">{ent.location}</td>
                  <td className="px-6 py-4 font-semibold text-amber-600">{ent.rating} ★</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      Verified
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

export default AdminEntrepreneurs;
