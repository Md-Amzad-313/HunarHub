import React, { useState, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ServiceCard from '../components/cards/ServiceCard';
import { EmptyState } from '../components/common/States';
import { SERVICES } from '../data/services';
import { CATEGORIES } from '../data/categories';

function ServiceListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCategory =
        selectedCategory === 'all' || s.categoryId === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Local Services"
        subtitle="Book doorstep repairs, custom tailoring, catering, and artisan consultations."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <div className="container-custom">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search services..."
                buttonLabel=""
              />
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <EmptyState
            title="No services found"
            description="We couldn't find any services matching your search parameters."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceListPage;
