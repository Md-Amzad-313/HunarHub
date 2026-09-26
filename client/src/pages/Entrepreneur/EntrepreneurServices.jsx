import React from 'react';
import Button from '../../components/common/Button';
import { SERVICES } from '../../data/services';
import { formatCurrency } from '../../utils/helpers';

function EntrepreneurServices() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Service Offerings</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage door-step services, repair appointments, and custom work rates.</p>
        </div>
        <Button variant="secondary" size="md">
          + Offer New Service
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Rate</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Turnaround / Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {SERVICES.slice(0, 3).map((serv) => (
                <tr key={serv.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-neutral-900 flex items-center gap-3">
                    <img src={serv.image} alt={serv.name} className="w-9 h-9 rounded-xl object-cover" />
                    <span>{serv.name}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{serv.category}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{formatCurrency(serv.price)}</td>
                  <td className="px-6 py-4 font-semibold text-amber-600">{serv.rating} ★</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                      {serv.availability}
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

export default EntrepreneurServices;
