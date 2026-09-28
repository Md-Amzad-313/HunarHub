import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import ProductCard from '../components/cards/ProductCard';
import ServiceCard from '../components/cards/ServiceCard';
import ServiceBookingModal from '../components/modals/ServiceBookingModal';
import { useMarketplace } from '../context/MarketplaceContext';

function EntrepreneurDetailPage() {
  const { id } = useParams();
  const { entrepreneurs, products, services, reviews } = useMarketplace();

  const entrepreneur = entrepreneurs.find((e) => e.id === id) || entrepreneurs[0];

  const entrepreneurProducts = products.filter((p) => p.entrepreneurId === entrepreneur.id);
  const entrepreneurServices = services.filter((s) => s.entrepreneurId === entrepreneur.id);

  // Similar entrepreneurs in the same category or city
  const similarEntrepreneurs = entrepreneurs
    .filter((e) => e.id !== entrepreneur.id && (e.category === entrepreneur.category || e.city === entrepreneur.city))
    .slice(0, 3);

  // Reviews matching this entrepreneur
  const entrepreneurReviews = reviews.filter((r) => r.targetId === entrepreneur.id);

  // Quick service booking state if entrepreneur offers services
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);

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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={entrepreneur.avatar}
              alt={entrepreneur.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-primary-500 shadow-md flex-shrink-0"
            />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-heading font-bold text-neutral-900">{entrepreneur.businessName}</h1>
                <Badge variant="primary">{entrepreneur.category}</Badge>
                {entrepreneur.badge && <Badge variant="warning">{entrepreneur.badge}</Badge>}
                {entrepreneur.verified && (
                  <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                    ✓ Verified Artisan
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-neutral-600">
                Craftsperson: <strong className="text-neutral-900">{entrepreneur.name}</strong> • {entrepreneur.experience || '10+ years experience'} • Member since {entrepreneur.joinedDate || '2024'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                <Rating value={entrepreneur.rating} count={entrepreneur.reviewCount} size="md" />
                <span>📍 {entrepreneur.location}</span>
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {entrepreneur.availability}
                </span>
                <span>📦 {entrepreneur.completedOrders || 50}+ jobs completed</span>
              </div>
            </div>
          </div>

          {/* Quick Contact / Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
            {entrepreneur.phoneDisplay && (
              <a
                href={`tel:${entrepreneur.phoneDisplay}`}
                className="btn-outline text-xs px-4 py-2.5 text-center no-underline flex items-center justify-center gap-1.5"
              >
                📞 Contact: {entrepreneur.phoneDisplay}
              </a>
            )}
            {entrepreneurServices.length > 0 && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedServiceForBooking(entrepreneurServices[0])}
                className="w-full text-xs font-semibold"
              >
                🛠️ Book Service
              </Button>
            )}
          </div>
        </div>

        {/* About & Skills Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-bold text-neutral-900">About the Craft & Workshop</h2>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {entrepreneur.about || entrepreneur.description}
            </p>
          </div>

          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-bold text-neutral-900">Master Skills & Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {(entrepreneur.skills || []).map((skill) => (
                <span key={skill} className="bg-primary-50 text-primary-800 text-xs font-medium px-3 py-1.5 rounded-xl border border-primary-200">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Offered Products */}
        {entrepreneurProducts.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                Handcrafted Products by {entrepreneur.name} ({entrepreneurProducts.length})
              </h2>
            </div>
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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                Services & Custom Commissions ({entrepreneurServices.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entrepreneurServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">
            Customer Ratings & Feedback ({entrepreneurReviews.length})
          </h2>
          {entrepreneurReviews.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4">No reviews submitted yet for this entrepreneur.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entrepreneurReviews.map((rev) => (
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
          )}
        </div>

        {/* Similar Artisans */}
        {similarEntrepreneurs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">
              Other {entrepreneur.category} Micro-Entrepreneurs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEntrepreneurs.map((ent) => (
                <div key={ent.id} className="p-4 bg-white rounded-3xl border border-neutral-200 flex items-center gap-4">
                  <img src={ent.avatar} alt={ent.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-grow">
                    <h4 className="font-heading font-semibold text-sm text-neutral-900 truncate">{ent.businessName}</h4>
                    <p className="text-xs text-neutral-500 truncate">📍 {ent.location}</p>
                    <Rating value={ent.rating} count={ent.reviewCount} size="sm" />
                  </div>
                  <Link to={`/entrepreneurs/${ent.id}`} className="btn-outline text-xs px-3 py-1.5 no-underline flex-shrink-0">
                    Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal for Entrepreneur Services */}
      {selectedServiceForBooking && (
        <ServiceBookingModal
          isOpen={Boolean(selectedServiceForBooking)}
          onClose={() => setSelectedServiceForBooking(null)}
          service={selectedServiceForBooking}
        />
      )}
    </div>
  );
}

export default EntrepreneurDetailPage;
