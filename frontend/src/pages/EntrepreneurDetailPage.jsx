import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import PageHeader from '../components/common/PageHeader';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import { ENTREPRENEURS } from '../data/entrepreneurs';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { MOCK_REVIEWS } from '../data/reviews';

function EntrepreneurDetailPage() {
  const { id } = useParams();
  const entrepreneur = ENTREPRENEURS.find((e) => e.id === id) || ENTREPRENEURS[0];

  const entrepreneurProducts = PRODUCTS.filter((p) => p.entrepreneurId === entrepreneur.id);
  const entrepreneurServices = SERVICES.filter((s) => s.entrepreneurId === entrepreneur.id);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={entrepreneur.businessName}
        subtitle={`Owned & Operated by ${entrepreneur.name} • ${entrepreneur.location}`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Entrepreneurs', to: '/entrepreneurs' },
          { label: entrepreneur.businessName },
        ]}
      />

      <div className="container-custom">
        {/* Profile Card Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={entrepreneur.avatar}
            alt={entrepreneur.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-primary-500 shadow-md flex-shrink-0"
          />

          <div className="flex-grow space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-heading font-bold text-neutral-900">{entrepreneur.businessName}</h1>
              <Badge variant="primary">{entrepreneur.category}</Badge>
              {entrepreneur.badge && <Badge variant="warning">{entrepreneur.badge}</Badge>}
            </div>

            <p className="text-sm font-medium text-neutral-600">Entrepreneur: {entrepreneur.name} • Member since {entrepreneur.joinedDate}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
              <Rating value={entrepreneur.rating} count={entrepreneur.reviewCount} size="md" />
              <span>📍 {entrepreneur.location}</span>
              <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {entrepreneur.availability}
              </span>
            </div>
          </div>
        </div>

        {/* About & Skills Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-bold text-neutral-900">About the Business</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">{entrepreneur.about}</p>
          </div>

          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-bold text-neutral-900">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {entrepreneur.skills.map((skill) => (
                <span key={skill} className="bg-primary-50 text-primary-800 text-xs font-medium px-3 py-1 rounded-xl border border-primary-200">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Offered Products */}
        {entrepreneurProducts.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-heading font-bold text-neutral-900">Products by {entrepreneur.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entrepreneurProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Offered Services */}
        {entrepreneurServices.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-heading font-bold text-neutral-900">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entrepreneurServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Customer Ratings & Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="card bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-neutral-900">{rev.author}</span>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>
                <Rating value={rev.rating} showCount={false} />
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntrepreneurDetailPage;
