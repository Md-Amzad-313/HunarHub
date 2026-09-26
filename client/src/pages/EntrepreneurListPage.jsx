import React, { useState, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import EntrepreneurCard from '../components/cards/EntrepreneurCard';
import { EmptyState } from '../components/common/States';
import { ENTREPRENEURS } from '../data/entrepreneurs';
import { CATEGORIES } from '../data/categories';

function EntrepreneurListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEntrepreneurs = useMemo(() => {
    return ENTREPRENEURS.filter((e) => {
      const matchesCategory =
        selectedCategory === 'all' || e.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.about.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Local Micro-Entrepreneurs"
        subtitle="Discover verified artisans, local craftspeople, and skilled technicians."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Entrepreneurs' }]}
      />

      <div className="container-custom">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, business, or skill..."
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
