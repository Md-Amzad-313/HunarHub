import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { SERVICES } from '../../data/services';
import { formatCurrency } from '../../utils/helpers';

function EntrepreneurServices() {
  const [servicesList, setServicesList] = useState(SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', category: 'Doorstep Repair & Fitting', description: '' });

  const handleAddService = (e) => {
    e.preventDefault();
    const created = {
      id: `serv-${Date.now()}`,
      name: newService.name || 'Custom Home Fitting Service',
      price: Number(newService.price) || 1500,
      category: newService.category,
      rating: 5.0,
      reviewCount: 0,
      location: 'Multan, Punjab',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      description: newService.description || 'Professional home doorstep service by verified local technician.',
      availability: 'Available Today',
      businessName: 'Tariq Craft & Repair Studio',
    };
    setServicesList([created, ...servicesList]);
    setIsModalOpen(false);
    setNewService({ name: '', price: '', category: 'Doorstep Repair & Fitting', description: '' });
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
              {servicesList.map((serv) => (
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
                  <td className="px-6 py-4 text-right">
                    <button className="text-secondary-600 font-semibold hover:underline mr-3">Edit</button>
                    <button
                      onClick={() => setServicesList(servicesList.filter((s) => s.id !== serv.id))}
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
            label="Service Fee (PKR)"
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
              <option value="Doorstep Repair & Fitting">Doorstep Repair & Fitting</option>
              <option value="Tailoring & Alterations">Tailoring & Alterations</option>
              <option value="Craft Lessons & Workshops">Craft Lessons & Workshops</option>
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
