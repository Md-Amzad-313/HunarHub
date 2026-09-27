import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { CATEGORIES } from '../../data/categories';

function AdminCategories() {
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '', icon: '🎨', description: '' });

  const handleAddCategory = (e) => {
    e.preventDefault();
    const created = {
      id: `cat-${Date.now()}`,
      name: newCat.name || 'New Category',
      slug: newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-'),
      icon: newCat.icon || '🏷️',
      description: newCat.description || 'Custom category description for local talent.',
      itemCount: 0,
    };
    setCategoriesList([...categoriesList, created]);
    setIsModalOpen(false);
    setNewCat({ name: '', slug: '', icon: '🎨', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Category Management</h1>
          <p className="text-xs text-neutral-500 mt-1">Configure marketplace taxonomy and active category listings.</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
          + Create New Category
        </Button>
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
              {categoriesList.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{cat.name}</td>
                  <td className="px-6 py-4 text-neutral-400 font-mono">{cat.slug}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-800">{cat.itemCount} items</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-primary-600 font-semibold hover:underline">Edit</button>
                    <button
                      onClick={() => setCategoriesList(categoriesList.filter((c) => c.id !== cat.id))}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Marketplace Category"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAddCategory}>Save Category</Button>
          </>
        }
      >
        <form onSubmit={handleAddCategory} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g. Leather & Footwear"
            value={newCat.name}
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            required
          />
          <Input
            label="Category Slug"
            placeholder="e.g. leather-footwear"
            value={newCat.slug}
            onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
          />
          <Input
            label="Emoji Icon"
            placeholder="👟"
            value={newCat.icon}
            onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
          />
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Description</label>
            <textarea
              rows={3}
              placeholder="Short description of products/services under this category..."
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminCategories;
