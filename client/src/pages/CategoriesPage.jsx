import React from 'react';
import PageHeader from '../components/common/PageHeader';
import CategoryCard from '../components/cards/CategoryCard';
import { CATEGORIES } from '../data/categories';

function CategoriesPage() {
  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Marketplace Categories"
        subtitle="Explore HunarHub listings organized by traditional crafts, skilled labor, and local services."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Categories' }]}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
