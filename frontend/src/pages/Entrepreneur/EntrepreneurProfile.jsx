import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useMarketplace } from '../../context/MarketplaceContext';

function EntrepreneurProfile() {
  const { currentEntrepreneurId, getEntrepreneurById, setCurrentEntrepreneurId, entrepreneurs } = useMarketplace();
  const current = getEntrepreneurById(currentEntrepreneurId) || entrepreneurs[0];

  const [formData, setFormData] = useState({
    name: current?.name || '',
    businessName: current?.businessName || '',
    category: current?.category || 'Potter',
    location: current?.location || 'Jaipur',
    phone: current?.phoneDisplay || '+91 94140 11223',
    email: current?.email || 'artisan@hunarhub.local',
    about: current?.about || current?.description || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Storefront & Profile Settings</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Update public business description, contact information, and service area.
          </p>
        </div>

        {/* Switch Active Entrepreneur for Demo */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-neutral-600 whitespace-nowrap">Active Artisan:</label>
          <select
            value={currentEntrepreneurId}
            onChange={(e) => {
              setCurrentEntrepreneurId(e.target.value);
              const ent = getEntrepreneurById(e.target.value);
              if (ent) {
                setFormData({
                  name: ent.name,
                  businessName: ent.businessName,
                  category: ent.category,
                  location: ent.location,
                  phone: ent.phoneDisplay || '+91 98000 11223',
                  email: ent.email || 'artisan@hunarhub.local',
                  about: ent.about || ent.description,
                });
              }
            }}
            className="py-1.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            {entrepreneurs.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          ✓ Storefront profile updated successfully in prototype session.
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
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Craft Category</label>
            <input
              type="text"
              value={formData.category}
              disabled
              className="w-full py-2.5 px-3 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Storefront Bio & Traditional Craft Story
          </label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
            placeholder="Tell customers about your craftsmanship history and techniques..."
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="md" type="submit">
            Save Storefront Details
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EntrepreneurProfile;
