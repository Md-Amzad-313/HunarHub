import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CategoryCard from '../components/cards/CategoryCard';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import EntrepreneurCard from '../components/cards/EntrepreneurCard';
import SearchBar from '../components/common/SearchBar';

import { CATEGORIES } from '../data/categories';
import { useMarketplace } from '../context/MarketplaceContext';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { products, services, entrepreneurs } = useMarketplace();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ── 1. HERO SECTION ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-20 sm:py-28">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-500 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-primary-500/20 text-primary-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-primary-500/30">
              🌾 Digital Marketplace for Local Micro-Entrepreneurs
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Discover Local Skills.{' '}
              <span className="text-gradient">Support Local Talent.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              HunarHub empowers potters, tailors, cobblers, traditional artisans, handicraft makers, and small vendors with a direct digital storefront to reach customers across your city.
            </p>

            {/* Hero Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search pottery, tailoring, leather, handicrafts, spices..."
                buttonLabel="Discover Talent"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/explore" className="btn-primary text-sm px-6 py-3 no-underline">
                Explore Marketplace
              </Link>
              <Link to="/entrepreneur" className="btn-outline border-white text-white hover:bg-white/10 text-sm px-6 py-3 no-underline">
                Entrepreneur Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED CATEGORIES ───────────────────────────── */}
      <section className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="section-title">Explore Core Categories</h2>
            <p className="section-subtitle">Find traditional artisanal crafts, cobbler repairs, and bespoke stitching in your city.</p>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED ENTREPRENEURS ──────────────────────────── */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="section-title">Featured Local Micro-Entrepreneurs</h2>
              <p className="section-subtitle">Meet verified local craftspeople, master cobblers, potters, and technicians.</p>
            </div>
            <Link to="/entrepreneurs" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
              View All Entrepreneurs ({entrepreneurs.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entrepreneurs.slice(0, 6).map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR HANDCRAFTED PRODUCTS ────────────────────── */}
      <section className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="section-title">Handcrafted Products</h2>
            <p className="section-subtitle">Authentic terracotta pots, hand-stitched mojaris, zardozi dupattas, and organic pantry items.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
            View All Products ({products.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── 5. POPULAR LOCAL SERVICES ──────────────────────────── */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="section-title">Book Skilled Local Services</h2>
              <p className="section-subtitle">Schedule doorstep sole repairs, bridal tailoring, antique wood restoration, and live catering.</p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-secondary-600 hover:text-secondary-700 no-underline flex items-center gap-1">
              View All Services ({services.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
