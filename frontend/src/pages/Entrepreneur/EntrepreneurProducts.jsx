import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';

function EntrepreneurProducts() {
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Pottery & Ceramics', description: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      price: Number(newProduct.price) || 1000,
      category: newProduct.category,
      rating: 5.0,
      reviewCount: 0,
      location: 'Multan, Punjab',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      description: newProduct.description,
      availability: 'In Stock',
      businessName: 'Clay Craft Pottery Studio',
    };
    setProductsList([created, ...productsList]);
    setIsModalOpen(false);
    setNewProduct({ name: '', price: '', category: 'Pottery & Ceramics', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Product Inventory</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage listings, prices, and stock availability for your storefront.</p>
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
              {productsList.map((prod) => (
                <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-neutral-900 flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-9 h-9 rounded-xl object-cover" />
                    <span>{prod.name}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{prod.category}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">{formatCurrency(prod.price)}</td>
                  <td className="px-6 py-4 font-semibold text-amber-600">{prod.rating} ★</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {prod.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 font-semibold hover:underline mr-3">Edit</button>
                    <button
                      onClick={() => setProductsList(productsList.filter((p) => p.id !== prod.id))}
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

      {/* Add Product Modal (UI Mockup) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Product Listing"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAddProduct}>Save Listing</Button>
          </>
        }
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input
            label="Product Title"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="e.g. Handcrafted Clay Vase"
            required
          />
          <Input
            label="Price (PKR)"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="2500"
            required
          />
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Description</label>
            <textarea
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Describe craftsmanship details..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EntrepreneurProducts;
