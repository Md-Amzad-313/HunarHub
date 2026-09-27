import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import { SERVICES } from '../data/services';
import { ENTREPRENEURS } from '../data/entrepreneurs';
import { MOCK_REVIEWS } from '../data/reviews';
import { formatCurrency } from '../utils/helpers';

function ServiceDetailPage() {
  const { id } = useParams();
  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];
  const entrepreneur = ENTREPRENEURS.find((e) => e.id === service.entrepreneurId) || ENTREPRENEURS[0];
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleRequest = () => {
    setRequestSubmitted(true);
    setTimeout(() => setRequestSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={service.name}
        subtitle={`${service.category} • Offered in ${service.location}`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.name },
        ]}
      />

      <div className="container-custom">
        {requestSubmitted && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xl">🛠️</span>
              <div>
                <p className="font-semibold text-sm">Service Request Submitted (Demo UI Only)</p>
                <p className="text-xs text-emerald-700">In Phase 2, this will notify {entrepreneur.name} to confirm your appointment.</p>
              </div>
            </div>
            <button onClick={() => setRequestSubmitted(false)} className="text-emerald-700 font-bold text-sm">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
            </div>
          </div>

          {/* Right Column: Service details & Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{service.category}</Badge>
                <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  ⚡ {service.availability}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">
                {service.name}
              </h1>

              <div className="flex items-center gap-3">
                <Rating value={service.rating} count={service.reviewCount} size="md" />
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-neutral-500">📍 {service.location}</span>
              </div>

              <div className="py-4 border-y border-neutral-200">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">Service Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-bold text-neutral-900">
                    {formatCurrency(service.price)}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">({service.priceUnit})</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Service Details</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Service Provider Profile Card */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={entrepreneur.avatar}
                    alt={entrepreneur.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-neutral-900">{entrepreneur.businessName}</h4>
                    <p className="text-xs text-neutral-500">By {entrepreneur.name} • {entrepreneur.rating}★</p>
                  </div>
                </div>
                <Link
                  to={`/entrepreneurs/${entrepreneur.id}`}
                  className="text-xs font-semibold text-secondary-600 hover:underline no-underline"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <Button
                variant="secondary"
                size="lg"
                className="w-full shadow-lg"
                onClick={handleRequest}
              >
                📝 Request Service Appointment
              </Button>
              <p className="text-[11px] text-center text-neutral-400">
                UI-Only: Service booking is simulated in Phase 1. Backend REST APIs connect in Phase 2+.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Service Feedback</h2>
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

export default ServiceDetailPage;
