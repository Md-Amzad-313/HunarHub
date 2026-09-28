import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import EntrepreneurCard from '../components/cards/EntrepreneurCard';
import { EmptyState } from '../components/common/States';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/categories';

function EntrepreneurListPage() {
  const [searchParams] = useSearchParams();
  const { entrepreneurs } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const filteredEntrepreneurs = useMemo(() => {
    return entrepreneurs.filter((e) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === 'all' ||
        e.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.businessName.toLowerCase().includes(q) ||
        (e.about && e.about.toLowerCase().includes(q)) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.skills && e.skills.some((sk) => sk.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [entrepreneurs, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Local Micro-Entrepreneurs"
        subtitle="Discover verified cobblers, potters, tailors, artisans, handicraft makers, and small vendors."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Entrepreneurs' }]}
      />

      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by artisan name, trade, location, or skill..."
                buttonLabel=""
              />
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Crafts ({entrepreneurs.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredEntrepreneurs.length === 0 ? (
          <EmptyState
            title="No entrepreneurs found"
            description="We couldn't find any entrepreneurs matching your search filters."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntrepreneurs.map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EntrepreneurListPage;
