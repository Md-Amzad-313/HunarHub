import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { ENTREPRENEURS } from '../../data/entrepreneurs';

function EntrepreneurProfile() {
  const current = ENTREPRENEURS[1];
  const [formData, setFormData] = useState({
    name: current.name,
    businessName: current.businessName,
    category: current.category,
    location: current.location,
    phone: current.phone,
    email: current.email,
    about: current.about,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Storefront & Profile Settings</h1>
        <p className="text-xs text-neutral-500 mt-1">Update public business description, contact information, and service area.</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          ✓ Storefront profile updated successfully (UI Mockup).
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Owner Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Business / Store Title"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
          />
          <Input
            label="Phone Contact"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Business Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Location / City"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            label="Primary Skill Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-700">Storefront Bio & Craft Story</label>
          <textarea
            rows={4}
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Storefront Profile
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EntrepreneurProfile;
