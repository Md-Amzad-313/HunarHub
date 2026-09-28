import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';
import { CATEGORIES } from '../../data/categories';

function EntrepreneurServices() {
  const { services, addService, deleteService } = useMarketplace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    category: 'Cobbler',
    description: '',
    duration: '1 - 2 days',
  });

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.price) return;

    const matchedCat = CATEGORIES.find((c) => c.name === newService.category);

    addService({
      name: newService.name,
      price: Number(newService.price),
      category: newService.category,
      categoryId: matchedCat?.id || 'cat-3',
      description:
        newService.description || 'Professional craftsmanship and doorstep service by local artisan.',
      duration: newService.duration || '1 - 2 days',
      availability: 'Available Today',
    });

    setIsModalOpen(false);
    setNewService({
      name: '',
      price: '',
      category: 'Cobbler',
      description: '',
      duration: '1 - 2 days',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">My Service Offerings</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage doorstep services, repair appointments, and custom work rates.</p>
        </div>
        <Button variant="secondary" size="md" onClick={() => setIsModalOpen(true)}>
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
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {services.map((serv) => (
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
                  <td className="px-6 py-4 text-right space-x-3">
                    <a
                      href={`/services/${serv.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondary-600 font-semibold hover:underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove service "${serv.name}"?`)) {
                          deleteService(serv.id);
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

      {/* Offer Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Offer New Service"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="secondary" size="sm" onClick={handleAddService}>Publish Service</Button>
          </>
        }
      >
        <form onSubmit={handleAddService} className="space-y-4">
          <Input
            label="Service Title"
            placeholder="e.g. Traditional Blue Pottery Glazing"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            required
          />
          <Input
            label="Service Fee (₹)"
            type="number"
            placeholder="1500"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            required
          />
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Service Category</label>
            <select
              value={newService.category}
              onChange={(e) => setNewService({ ...newService, category: e.target.value })}
              className="w-full rounded-xl border border-neutral-300 p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary-200"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Service Description</label>
            <textarea
              rows={3}
              placeholder="Describe scope, materials included, and home visit details..."
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-200"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EntrepreneurServices;

