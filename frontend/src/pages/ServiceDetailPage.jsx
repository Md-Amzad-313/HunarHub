import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import ServiceCard from '../components/cards/ServiceCard';
import ServiceBookingModal from '../components/modals/ServiceBookingModal';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/helpers';

function ServiceDetailPage() {
  const { id } = useParams();
  const { services, getEntrepreneurById, reviews } = useMarketplace();

  const service = services.find((s) => s.id === id) || services[0];
  const entrepreneur = getEntrepreneurById(service?.entrepreneurId) || {
    id: 'ent-1',
    name: service?.entrepreneurName || 'Master Provider',
    businessName: service?.businessName || 'Skill Workshop',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    location: service?.location || 'India',
  };

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Reviews matching this service or entrepreneur
  const serviceReviews = reviews.filter(
    (r) => r.targetId === service.id || r.targetId === entrepreneur.id
  );

  // More services from the same entrepreneur
  const sameEntrepreneurServices = services
    .filter((s) => s.id !== service.id && s.entrepreneurId === service.entrepreneurId)
    .slice(0, 3);

  // Similar services in the same category
  const similarServices = services
    .filter(
      (s) =>
        s.id !== service.id &&
        s.entrepreneurId !== service.entrepreneurId &&
        (s.categoryId === service.categoryId || s.category === service.category)
    )
    .slice(0, 3);

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={service.name}
        subtitle={`${service.category} • Offered in ${entrepreneur.location || service.location}`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.name },
        ]}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm relative group">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
                🛠️ Verified Local Artisan / Technician
              </div>
            </div>
          </div>

          {/* Right Column: Service details & Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{service.category}</Badge>
                <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  ⚡ {service.availability || 'Available for Bookings'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">
                {service.name}
              </h1>

              <div className="flex items-center gap-3">
                <Rating value={service.rating} count={service.reviewCount} size="md" />
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-neutral-500">📍 {entrepreneur.location || service.location}</span>
              </div>

              <div className="py-4 border-y border-neutral-200">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">Service Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-bold text-neutral-900">
                    {formatCurrency(service.price)}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">({service.pricingType || service.priceUnit || 'standard rate'})</span>
                </div>
                {service.duration && (
                  <p className="text-xs text-emerald-600 mt-1 font-medium">
                    ⏱️ Turnaround time: {service.duration}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Service Scope & Description</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Skills / Inclusions */}
              {service.skills && service.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Included Skills & Service Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-secondary-50 text-secondary-800 border border-secondary-200 px-2.5 py-0.5 rounded-lg font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Provider Profile Card */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={entrepreneur.avatar}
                    alt={entrepreneur.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-neutral-900">
                      {entrepreneur.businessName}
                    </h4>
                    <p className="text-xs text-neutral-500">By {entrepreneur.name} • {entrepreneur.rating}★</p>
                  </div>
                </div>
                <Link
                  to={`/entrepreneurs/${entrepreneur.id}`}
                  className="text-xs font-semibold text-secondary-600 hover:underline no-underline"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <Button
                variant="secondary"
                size="lg"
                className="w-full shadow-lg text-sm font-bold flex items-center justify-center gap-2"
                onClick={() => setIsBookingModalOpen(true)}
              >
                🗓️ Request Service Appointment
              </Button>
              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500">
                <span>🛡️ Verified Local Skill Provider</span>
                <span>•</span>
                <span>📞 Direct Phone Coordination</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-neutral-900">
              Client Reviews ({serviceReviews.length})
            </h2>
            <span className="text-xs text-neutral-500">
              Verified feedback from completed appointments
            </span>
          </div>
          {serviceReviews.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4">No reviews submitted yet for this service.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceReviews.map((rev) => (
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

        {/* More services from same entrepreneur */}
        {sameEntrepreneurServices.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                Other Services by {entrepreneur.name}
              </h2>
              <Link
                to={`/entrepreneurs/${entrepreneur.id}`}
                className="text-xs font-semibold text-secondary-600 hover:underline no-underline"
              >
                View Full Studio ({sameEntrepreneurServices.length}) →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sameEntrepreneurServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Services in Category */}
        {similarServices.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                Similar Services in {service.category}
              </h2>
              <Link
                to={`/explore?category=${service.category.toLowerCase()}`}
                className="text-xs font-semibold text-secondary-600 hover:underline no-underline"
              >
                Explore Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Service Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
      />
    </div>
  );
}

export default ServiceDetailPage;
