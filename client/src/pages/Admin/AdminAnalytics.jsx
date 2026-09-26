import React from 'react';
import DashboardCard from '../../components/cards/DashboardCard';

function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Platform Growth & Analytics</h1>
        <p className="text-xs text-neutral-500 mt-1">Key performance metrics and marketplace volume distribution.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Monthly GMV" value="482,000 PKR" change="28%" icon="📈" color="emerald" />
        <DashboardCard title="New Signups (30d)" value="+142" change="15%" icon="👤" color="primary" />
        <DashboardCard title="Avg Rating" value="4.85 ★" icon="⭐" color="amber" />
        <DashboardCard title="Order Completion Rate" value="98.2%" icon="🎯" color="secondary" />
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
        <h2 className="text-base font-heading font-bold text-neutral-900">Top Performing Categories (GMV Share)</h2>
        <div className="space-y-3 pt-2">
          {[
            { category: 'Tailoring & Stitching', share: '38%', count: '142 orders', color: 'bg-primary-500' },
            { category: 'Pottery & Ceramics', share: '24%', count: '98 orders', color: 'bg-secondary-500' },
            { category: 'Catering & Baking', share: '20%', count: '76 orders', color: 'bg-emerald-500' },
            { category: 'Repair Services', share: '18%', count: '64 orders', color: 'bg-amber-500' },
          ].map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-900">{item.category}</span>
                <span className="text-neutral-600">{item.share} ({item.count})</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                <div className={`${item.color} h-2.5 rounded-full`} style={{ width: item.share }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
