/**
 * HomePage.jsx
 * HunarHub landing page – Phase 0 foundation.
 * Contains: Hero, Features, How-It-Works, CTA sections.
 * Marketplace/product listings will be added in Phase 1.
 */

import React from 'react';

/* ── Data ────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🏪',
    title: 'Digital Storefront',
    description:
      'Micro-entrepreneurs can showcase their products and services with a professional online presence.',
  },
  {
    icon: '🤝',
    title: 'Direct Connection',
    description:
      'Customers connect directly with local artisans, craftsmen, and service providers in their community.',
  },
  {
    icon: '📱',
    title: 'Mobile-First',
    description:
      'Optimised for smartphones so entrepreneurs can manage their business on the go.',
  },
  {
    icon: '🤖',
    title: 'AI Recommendations',
    description:
      'Smart product and service recommendations powered by machine learning. (Coming soon)',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description:
      'Transactions secured with industry-standard encryption and authentication.',
  },
  {
    icon: '⭐',
    title: 'Reviews & Ratings',
    description:
      'Build trust through transparent customer reviews and a star-rating system.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    role: 'Entrepreneurs',
    title: 'Create Your Profile',
    description: 'Register as a micro-entrepreneur and set up your digital storefront in minutes.',
  },
  {
    step: '02',
    role: 'Entrepreneurs',
    title: 'List Products & Services',
    description: 'Add your offerings with photos, descriptions, and pricing.',
  },
  {
    step: '03',
    role: 'Customers',
    title: 'Discover & Order',
    description: 'Browse the marketplace and place orders directly from local entrepreneurs.',
  },
  {
    step: '04',
    role: 'Both',
    title: 'Grow Together',
    description: 'Track orders, manage requests, and build lasting customer relationships.',
  },
];

/* ── Sub-components ──────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 text-white">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container-custom relative py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            🚀 Phase 0 – Foundation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
            Empowering Local{' '}
            <span className="underline decoration-white/60 decoration-4">
              Micro-Entrepreneurs
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            HunarHub is a digital marketplace connecting skilled local entrepreneurs
            with customers — helping traditional crafts and services thrive in the
            digital economy.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-600 hover:bg-neutral-100 focus:ring-white text-base px-8 py-3">
              Start Selling
            </button>
            <button className="btn border border-white/60 text-white hover:bg-white/10 text-base px-8 py-3">
              Explore Marketplace
            </button>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Full marketplace launching soon — marketplace features are in development.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">Why HunarHub?</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A purpose-built platform that makes it easy for local entrepreneurs to
            grow their business and for customers to discover unique local talent.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, description }) => (
            <div key={title} className="card hover:shadow-card-hover transition-shadow duration-300">
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 text-lg font-heading font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Simple steps to get started — whether you're an entrepreneur or a customer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map(({ step, role, title, description }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white text-2xl font-heading font-bold shadow-md">
                {step}
              </div>
              <span className="mt-4 text-xs font-semibold text-primary-500 uppercase tracking-wider">
                {role}
              </span>
              <h3 className="mt-1 text-base font-heading font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 bg-primary-500 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '—', label: 'Entrepreneurs' },
            { value: '—', label: 'Products Listed' },
            { value: '—', label: 'Happy Customers' },
            { value: '—', label: 'Cities Covered' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-heading font-bold">{value}</p>
              <p className="mt-1 text-sm text-white/80">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/60 text-xs mt-6">
          Live statistics will be displayed once the marketplace launches.
        </p>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Join HunarHub and be part of the movement to empower local micro-entrepreneurs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-base px-8 py-3">
              Join as Entrepreneur
            </button>
            <button className="btn-outline text-base px-8 py-3">
              Shop as Customer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}

export default HomePage;
