import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useMarketplace } from '../../context/MarketplaceContext';

function CustomerProfile() {
  const { customerProfile, updateCustomerProfile } = useMarketplace();
  const [formData, setFormData] = useState(customerProfile);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomerProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Customer Profile & Settings</h1>
        <p className="text-xs text-neutral-500 mt-1">Manage your contact details and default delivery address across HunarHub.</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between">
          <span>✓ Profile settings updated and stored to your browser profile.</span>
          <button onClick={() => setSaved(false)} className="text-emerald-700 font-bold ml-2">✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="City"
            value={formData.city || ''}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Default Delivery Address
          </label>
          <textarea
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
            placeholder="Complete street address..."
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="md" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CustomerProfile;
