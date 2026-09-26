import React from 'react';
import { CATEGORIES } from '../../data/categories';

function AdminCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Category Management</h1>
        <p className="text-xs text-neutral-500 mt-1">Configure marketplace taxonomy and active categories.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Listings Count</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {CATEGORIES.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{cat.name}</td>
                  <td className="px-6 py-4 text-neutral-400 font-mono">{cat.slug}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-800">{cat.itemCount} items</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 font-semibold hover:underline">Edit</button>
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

export default AdminCategories;
