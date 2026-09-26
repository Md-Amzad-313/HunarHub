import React from 'react';

/**
 * Metric summary card for Dashboard views.
 */
function DashboardCard({ title, value, change, icon, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{title}</p>
        <h3 className="mt-1 text-2xl font-heading font-bold text-neutral-900">{value}</h3>
        {change && (
          <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span>↑ {change}</span> <span className="text-neutral-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border ${colorMap[color] || colorMap.primary}`}>
        {icon}
      </div>
    </div>
  );
}

export default DashboardCard;
