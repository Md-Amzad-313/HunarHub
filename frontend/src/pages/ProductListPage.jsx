import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ProductCard from '../components/cards/ProductCard';
import { EmptyState } from '../components/common/States';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES } from '../data/categories';

function ProductListPage() {
  const [searchParams] = useSearchParams();
  const { products } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === 'all' ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.categoryId === selectedCategory;

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.businessName && p.businessName.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Handcrafted Products"
        subtitle="Buy direct from verified home-based creators, traditional artisans, and local craftsmen."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />

      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products by craft, material, or keyword..."
                buttonLabel=""
              />
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">All Categories ({products.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="We couldn't find any products matching your search terms."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;
