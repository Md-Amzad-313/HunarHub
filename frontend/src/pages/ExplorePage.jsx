import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import EntrepreneurCard from '../components/cards/EntrepreneurCard';
import { EmptyState } from '../components/common/States';

import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/categories';

function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, services, entrepreneurs } = useMarketplace();

  // Filter states from URL query or defaults
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'products' | 'services' | 'entrepreneurs'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [locationFilter, setLocationFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-low' | 'price-high'

  // Extract unique locations from live context data
  const locations = useMemo(() => {
    const allLocs = [
      ...products.map((p) => p.location),
      ...services.map((s) => s.location),
      ...entrepreneurs.map((e) => e.location),
    ].filter(Boolean);
    return Array.from(new Set(allLocs));
  }, [products, services, entrepreneurs]);

  // Match category helper (handles slug, name, or category string)
  const isCategoryMatch = (entityCategory, targetCategory) => {
    if (targetCategory === 'all') return true;
    const normTarget = targetCategory.toLowerCase().replace(/[-_&]/g, ' ');
    const normEntity = (entityCategory || '').toLowerCase().replace(/[-_&]/g, ' ');
    return (
      normEntity.includes(normTarget) ||
      normTarget.includes(normEntity) ||
      (targetCategory === 'tailor' && normEntity.includes('tailor')) ||
      (targetCategory === 'potter' && (normEntity.includes('potter') || normEntity.includes('ceramic'))) ||
      (targetCategory === 'cobbler' && (normEntity.includes('cobbler') || normEntity.includes('leather'))) ||
      (targetCategory === 'artisan' && normEntity.includes('artisan')) ||
      (targetCategory === 'handicraft-maker' && (normEntity.includes('handicraft') || normEntity.includes('maker'))) ||
      (targetCategory === 'small-vendor' && (normEntity.includes('vendor') || normEntity.includes('bakes') || normEntity.includes('spices')))
    );
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = isCategoryMatch(p.category, selectedCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.businessName && p.businessName.toLowerCase().includes(q));
        const matchesLocation = locationFilter === 'all' || p.location === locationFilter;
        const matchesRating = p.rating >= minRating;
        return matchesCategory && matchesSearch && matchesLocation && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.rating - a.rating;
      });
  }, [products, selectedCategory, searchQuery, locationFilter, minRating, sortBy]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesCategory = isCategoryMatch(s.category, selectedCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.skills && s.skills.some((sk) => sk.toLowerCase().includes(q))) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(q))) ||
          (s.businessName && s.businessName.toLowerCase().includes(q));
        const matchesLocation = locationFilter === 'all' || s.location === locationFilter;
        const matchesRating = s.rating >= minRating;
        return matchesCategory && matchesSearch && matchesLocation && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.rating - a.rating;
      });
  }, [services, selectedCategory, searchQuery, locationFilter, minRating, sortBy]);

  // Filtered entrepreneurs
  const filteredEntrepreneurs = useMemo(() => {
    return entrepreneurs
      .filter((e) => {
        const matchesCategory = isCategoryMatch(e.category, selectedCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.businessName.toLowerCase().includes(q) ||
          (e.skills && e.skills.some((sk) => sk.toLowerCase().includes(q))) ||
          (e.about && e.about.toLowerCase().includes(q)) ||
          (e.location && e.location.toLowerCase().includes(q));
        const matchesLocation = locationFilter === 'all' || e.location === locationFilter;
        const matchesRating = e.rating >= minRating;
        return matchesCategory && matchesSearch && matchesLocation && matchesRating;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [entrepreneurs, selectedCategory, searchQuery, locationFilter, minRating]);

  const totalResults =
    (activeTab === 'all' || activeTab === 'products' ? filteredProducts.length : 0) +
    (activeTab === 'all' || activeTab === 'services' ? filteredServices.length : 0) +
    (activeTab === 'all' || activeTab === 'entrepreneurs' ? filteredEntrepreneurs.length : 0);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setLocationFilter('all');
    setMinRating(0);
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Marketplace Discovery"
        subtitle="Search and filter through products, services, and local artisans in one place."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Explore' }]}
      />

      <div className="container-custom">
        {/* Top Search & Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by product name, service, skill, or artisan..."
            buttonLabel="Search"
          />

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Category Filter */}
            <div>
              <label className="text-xs font-semibold text-neutral-600 mb-1 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-xs font-semibold text-neutral-600 mb-1 block">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-xs font-semibold text-neutral-600 mb-1 block">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full text-xs py-2 px-3 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5★ & above</option>
                <option value={4.8}>4.8★ & above</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="text-xs font-semibold text-neutral-600 mb-1 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab & Results Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Listings (${filteredProducts.length + filteredServices.length + filteredEntrepreneurs.length})` },
              { id: 'products', label: `Products (${filteredProducts.length})` },
              { id: 'services', label: `Services (${filteredServices.length})` },
              { id: 'entrepreneurs', label: `Entrepreneurs (${filteredEntrepreneurs.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-neutral-500">
            <span>Showing <strong>{totalResults}</strong> matching results</span>
            {(selectedCategory !== 'all' || searchQuery || locationFilter !== 'all' || minRating > 0) && (
              <button
                onClick={clearFilters}
                className="text-primary-600 font-semibold hover:underline"
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {totalResults === 0 ? (
          <EmptyState
            title="No marketplace listings match your query"
            description="Try changing your search keywords or resetting filters to discover local talent."
            actionLabel="Reset All Filters"
            onAction={clearFilters}
          />
        ) : (
          <div className="space-y-12 mt-8">
            {/* Products Section */}
            {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
              <div>
                {activeTab === 'all' && (
                  <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    🛍️ Products ({filteredProducts.length})
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Services Section */}
            {(activeTab === 'all' || activeTab === 'services') && filteredServices.length > 0 && (
              <div>
                {activeTab === 'all' && (
                  <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    🛠️ Services ({filteredServices.length})
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Entrepreneurs Section */}
            {(activeTab === 'all' || activeTab === 'entrepreneurs') && filteredEntrepreneurs.length > 0 && (
              <div>
                {activeTab === 'all' && (
                  <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    👥 Local Micro-Entrepreneurs ({filteredEntrepreneurs.length})
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEntrepreneurs.map((entrepreneur) => (
                    <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
