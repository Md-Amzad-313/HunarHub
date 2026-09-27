import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CategoryCard from '../components/cards/CategoryCard';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import EntrepreneurCard from '../components/cards/EntrepreneurCard';
import SearchBar from '../components/common/SearchBar';

import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { ENTREPRENEURS } from '../data/entrepreneurs';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
              HunarHub empowers artisans, tailors, bakers, and local service providers by providing a direct digital storefront to reach customers across your city.
            </p>

            {/* Hero Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search pottery, tailoring, baking, repairs..."
                buttonLabel="Discover Talent"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/explore" className="btn-primary text-sm px-6 py-3 no-underline">
                Explore Marketplace
              </Link>
              <Link to="/entrepreneur" className="btn-outline border-white text-white hover:bg-white/10 text-sm px-6 py-3 no-underline">
                Become an Entrepreneur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED CATEGORIES ───────────────────────────── */}
      <section className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="section-title">Explore Categories</h2>
            <p className="section-subtitle">Find traditional skills and daily services right in your neighborhood.</p>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED ENTREPRENEURS ──────────────────────────── */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="section-title">Featured Local Entrepreneurs</h2>
              <p className="section-subtitle">Meet verified local craftspeople, master artisans, and technicians.</p>
            </div>
            <Link to="/entrepreneurs" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
              View All Entrepreneurs →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENTREPRENEURS.slice(0, 3).map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR PRODUCTS ─────────────────────────────── */}
      <section className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="section-title">Handcrafted Products</h2>
            <p className="section-subtitle">Directly buy authentic handmade goods from home creators.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1">
            Browse Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── 5. POPULAR SERVICES ─────────────────────────────── */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="section-title">Popular Local Services</h2>
              <p className="section-subtitle">Book reliable doorstep repair, tailoring, and catering experts.</p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-secondary-600 hover:text-secondary-700 no-underline flex items-center gap-1">
              Browse Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HOW HUNARHUB WORKS ───────────────────────────── */}
      <section className="container-custom py-8">
        <div className="text-center mb-14">
          <h2 className="section-title">How HunarHub Works</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A seamless journey to empower micro-entrepreneurs and connect customers with verified local talent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: '1. Discover',
              desc: 'Browse categories or search for specific local products, handcrafts, or home services.',
              icon: '🔍',
            },
            {
              step: '02',
              title: '2. Explore',
              desc: 'Inspect entrepreneur profiles, customer ratings, portfolios, and price listings.',
              icon: '📄',
            },
            {
              step: '03',
              title: '3. Order / Request',
              desc: 'Place direct orders for products or schedule service visits with local artisans.',
              icon: '🤝',
            },
            {
              step: '04',
              title: '4. Review & Support',
              desc: 'Leave honest ratings and reviews to help build trust for micro-entrepreneurs.',
              icon: '⭐',
            },
          ].map((item) => (
            <div key={item.step} className="card text-center flex flex-col items-center hover:shadow-card-hover transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 font-heading font-bold text-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-heading font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CALL TO ACTION FOR ENTREPRENEURS ──────────────── */}
      <section className="container-custom">
        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="bg-white/20 text-white text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
              For Artisans & Technicians
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-4">
              Are you a local craftsperson or service provider?
            </h2>
            <p className="mt-3 text-neutral-100 text-sm sm:text-base leading-relaxed">
              Join hundreds of local entrepreneurs on HunarHub. Create your digital storefront, get discovered by neighborhood customers, and manage your orders effortlessly.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/entrepreneur" className="btn bg-white text-primary-600 hover:bg-neutral-100 text-sm font-semibold px-8 py-3.5 text-center no-underline">
              Open Your Storefront
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
