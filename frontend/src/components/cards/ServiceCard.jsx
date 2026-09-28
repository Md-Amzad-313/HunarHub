import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/helpers';
import ServiceBookingModal from '../modals/ServiceBookingModal';

const FALLBACK_SERVICE_IMG = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';

function ServiceCard({ service }) {
  const [imgSrc, setImgSrc] = useState(service?.image || FALLBACK_SERVICE_IMG);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const {
    id,
    name,
    category,
    price,
    priceUnit = 'starting price',
    rating,
    reviewCount,
    location,
    businessName,
    entrepreneurName,
    availability,
  } = service;

  return (
    <>
      <div className="group card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden border border-neutral-200 hover:border-secondary-300">
        <Link to={`/services/${id}`} className="no-underline text-inherit flex-grow flex flex-col">
          {/* Service Image */}
          <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-neutral-100">
            <img
              src={imgSrc}
              alt={name}
              onError={() => setImgSrc(FALLBACK_SERVICE_IMG)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 right-3">
              <Badge variant="secondary">{category}</Badge>
            </div>
            {availability && (
              <div className="absolute bottom-2 left-3 bg-neutral-900/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                ⚡ {availability}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1">
                <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{location}</span>
              </div>

              <h3 className="text-base font-heading font-semibold text-neutral-900 group-hover:text-secondary-600 transition-colors line-clamp-1">
                {name}
              </h3>

              <p className="mt-1 text-xs text-neutral-500 truncate">
                By <span className="font-medium text-neutral-700">{businessName || entrepreneurName}</span>
              </p>
            </div>

            <div className="mt-3">
              <Rating value={rating} count={reviewCount} />
            </div>
          </div>
        </Link>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">{priceUnit}</span>
            <span className="text-base font-heading font-bold text-neutral-900">
              {formatCurrency(price)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              to={`/services/${id}`}
              className="btn-outline text-xs px-2.5 py-1.5 no-underline"
            >
              Details
            </Link>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-secondary text-xs px-3 py-1.5 no-underline font-semibold shadow-sm"
            >
              Book
            </button>
          </div>
        </div>
      </div>

      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={service}
      />
    </>
  );
}

export default ServiceCard;
