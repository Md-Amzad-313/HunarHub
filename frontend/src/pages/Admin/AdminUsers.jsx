import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 'USR-101', name: 'Fatima Ahmed', email: 'fatima@example.com', role: 'Customer', status: 'Active', joined: '2026-08-12' },
    { id: 'USR-102', name: 'Tariq Mehmood', email: 'tariq@example.com', role: 'Entrepreneur', status: 'Active', joined: '2026-08-14' },
    { id: 'USR-103', name: 'Amina Bibi', email: 'amina@example.com', role: 'Entrepreneur', status: 'Active', joined: '2026-08-20' },
    { id: 'USR-104', name: 'Usman Farooq', email: 'usman@example.com', role: 'Customer', status: 'Active', joined: '2026-09-01' },
    { id: 'USR-105', name: 'Saman Tariq', email: 'saman@example.com', role: 'Customer', status: 'Suspended', joined: '2026-09-10' },
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
        }
        return u;
      })
    );
  };

  const handleSaveRole = () => {
    if (!editingUser) return;
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Platform Users Directory</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage customer accounts, roles, permissions, and account status.</p>
        </div>
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
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      Edit Role
                    </button>
                    <button
                      onClick={() => handleStatusToggle(u.id)}
                      className="text-neutral-600 hover:text-neutral-900 font-semibold underline"
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <Modal
          isOpen={Boolean(editingUser)}
          onClose={() => setEditingUser(null)}
          title={`Edit Role for ${editingUser.name}`}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveRole}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-700">Account Access Role</label>
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="Customer">Customer</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Admin">System Admin</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminUsers;
