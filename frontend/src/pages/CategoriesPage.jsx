import React from 'react';
import PageHeader from '../components/common/PageHeader';
import CategoryCard from '../components/cards/CategoryCard';
import { CATEGORIES } from '../data/categories';
import { useMarketplace } from '../context/MarketplaceContext';

function CategoriesPage() {
  const { products, services, entrepreneurs } = useMarketplace();

  // Dynamically compute item count for each category from context
  const enrichedCategories = CATEGORIES.map((cat) => {
    const prodCount = products.filter(
      (p) =>
        p.category?.toLowerCase() === cat.name.toLowerCase() ||
        p.categoryId === cat.id ||
        p.category?.toLowerCase() === cat.slug
    ).length;

    const servCount = services.filter(
      (s) =>
        s.category?.toLowerCase() === cat.name.toLowerCase() ||
        s.categoryId === cat.id ||
        s.category?.toLowerCase() === cat.slug
    ).length;

    const entCount = entrepreneurs.filter(
      (e) =>
        e.category?.toLowerCase() === cat.name.toLowerCase() ||
        e.category?.toLowerCase() === cat.slug
    ).length;

    return {
      ...cat,
      itemCount: prodCount + servCount + entCount,
      prodCount,
      servCount,
      entCount,
    };
  });

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Marketplace Categories"
        subtitle="Explore HunarHub listings organized by traditional crafts, skilled trades, and local products."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Categories' }]}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrichedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
