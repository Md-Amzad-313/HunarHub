import React from 'react';

function AdminUsers() {
  const users = [
    { id: 'USR-101', name: 'Fatima Ahmed', email: 'fatima@example.com', role: 'Customer', status: 'Active', joined: '2026-08-12' },
    { id: 'USR-102', name: 'Tariq Mehmood', email: 'tariq@example.com', role: 'Entrepreneur', status: 'Active', joined: '2026-08-14' },
    { id: 'USR-103', name: 'Amina Bibi', email: 'amina@example.com', role: 'Entrepreneur', status: 'Active', joined: '2026-08-20' },
    { id: 'USR-104', name: 'Usman Farooq', email: 'usman@example.com', role: 'Customer', status: 'Active', joined: '2026-09-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Platform Users Directory</h1>
        <p className="text-xs text-neutral-500 mt-1">Manage customer accounts, roles, and status.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{u.id}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{u.name}</td>
                  <td className="px-6 py-4 text-neutral-500">{u.email}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-800">{u.role}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 font-semibold hover:underline">Edit Role</button>
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

export default AdminUsers;
