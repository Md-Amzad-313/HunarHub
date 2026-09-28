import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';
import { CATEGORIES } from '../../data/categories';

function EntrepreneurProducts() {
  const { products, addProduct, deleteProduct } = useMarketplace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Potter',
    description: '',
    image: '',
    location: 'Jaipur, Rajasthan',
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const matchedCategory = CATEGORIES.find((c) => c.name === newProduct.category);

    addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      categoryId: matchedCategory?.id || 'cat-2',
      description:
        newProduct.description ||
        'Handcrafted artisanal item made using traditional techniques by local micro-entrepreneurs.',
      image:
        newProduct.image ||
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      location: newProduct.location || 'Jaipur, Rajasthan',
    });

    setIsModalOpen(false);
    setNewProduct({
      name: '',
      price: '',
      category: 'Potter',
      description: '',
      image: '',
      location: 'Jaipur, Rajasthan',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Product Inventory</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage listings, prices, and stock availability for your storefront ({products.length} listed).
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
          + Add New Product
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200 font-heading font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-neutral-900 flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-9 h-9 rounded-xl object-cover" />
                    <span className="line-clamp-1">{prod.name}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{prod.category}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{formatCurrency(prod.price)}</td>
                  <td className="px-6 py-4 font-semibold text-amber-600">{prod.rating} ★</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {prod.availability || 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <a
                      href={`/products/${prod.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete product "${prod.name}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
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

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product to Store"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddProduct}>
              Publish Product
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input
            label="Product Title"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="e.g. Handmade Terracotta Planter"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="e.g. 2500"
              required
            />
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Category</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full py-2.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Image URL (Optional)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />

          <Input
            label="Crafting Location"
            value={newProduct.location}
            onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
            placeholder="e.g. Multan, Punjab"
          />

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Description & Crafting Details</label>
            <textarea
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Describe materials used, dimensions, and artisan backstory..."
              className="w-full p-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EntrepreneurProducts;
