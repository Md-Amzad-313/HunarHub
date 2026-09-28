import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ServiceCard from '../components/cards/ServiceCard';
import { EmptyState } from '../components/common/States';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/categories';

function ServiceListPage() {
  const [searchParams] = useSearchParams();
  const { services } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === 'all' ||
        s.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        s.categoryId === selectedCategory;

      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.skills && s.skills.some((sk) => sk.toLowerCase().includes(q))) ||
        (s.tags && s.tags.some((t) => t.toLowerCase().includes(q))) ||
        (s.businessName && s.businessName.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [services, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Local Skilled Services"
        subtitle="Book doorstep repairs, bespoke tailoring, catering, and artisan consultations directly."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search services by skill, trade, or problem..."
                buttonLabel=""
              />
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Categories ({services.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
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
