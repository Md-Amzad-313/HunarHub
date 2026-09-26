import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/cards/DashboardCard';

function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs text-secondary-400 font-bold uppercase tracking-wider">HunarHub System Administration</span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mt-1">Platform Control Center</h1>
          <p className="text-xs text-neutral-300 mt-1">Monitor marketplace activity, onboard local micro-entrepreneurs, and review platform metrics.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Registered Users" value="1,248" change="14%" icon="👥" color="primary" />
        <DashboardCard title="Active Entrepreneurs" value="184" change="9%" icon="🏬" color="secondary" />
        <DashboardCard title="Total Listings (Prod/Serv)" value="650" icon="🛍️" color="emerald" />
        <DashboardCard title="Platform Orders" value="3,410" change="22%" icon="📦" color="amber" />
      </div>

      {/* Analytics Cards Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashboardCard title="Open Support Complaints" value="3" icon="💬" color="purple" />
        <DashboardCard title="Total Categories" value="8" icon="🏷️" color="secondary" />
        <DashboardCard title="System Health" value="100% Operational" icon="✅" color="emerald" />
      </div>

      {/* Recent Platform Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">Recent Entrepreneur Approvals</h2>
            <Link to="/admin/entrepreneurs" className="text-xs font-semibold text-primary-600 hover:underline no-underline">View All →</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Tariq Mehmood', business: 'Clay Craft Pottery Studio', city: 'Multan', status: 'Approved' },
              { name: 'Amina Bibi', business: 'Amina Custom Tailoring', city: 'Lahore', status: 'Approved' },
              { name: 'Rashida Khan', business: 'Khan Home Bakes', city: 'Rawalpindi', status: 'Pending Review' },
            ].map((ent, idx) => (
              <div key={idx} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{ent.business}</p>
                  <p className="text-neutral-500 text-[11px]">Owner: {ent.name} • {ent.city}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-semibold ${ent.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {ent.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-neutral-900">System Logs & Audit Trail</h2>
            <Link to="/admin/analytics" className="text-xs font-semibold text-secondary-600 hover:underline no-underline">Full Audit Log →</Link>
          </div>
          <div className="space-y-3">
            {[
              { log: 'Database backup synchronized successfully', time: '10 mins ago', type: 'System' },
              { log: 'GET /api/health check executed - 200 OK', time: '25 mins ago', type: 'API' },
              { log: 'New category "Catering & Baking" created', time: '2 hours ago', type: 'Admin' },
            ].map((activity, idx) => (
              <div key={idx} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-neutral-800">{activity.log}</p>
                  <p className="text-neutral-400 text-[10px]">{activity.time}</p>
                </div>
                <span className="bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded text-[10px] font-mono">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
