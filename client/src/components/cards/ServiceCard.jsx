import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/helpers';

function ServiceCard({ service }) {
  const {
    id,
    name,
    category,
    price,
    priceUnit = 'starting price',
    rating,
    reviewCount,
    location,
    image,
    businessName,
    entrepreneurName,
    availability,
  } = service;

  return (
    <div className="group card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden border border-neutral-100">
      <Link to={`/services/${id}`} className="no-underline text-inherit">
        {/* Service Image */}
        <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary">{category}</Badge>
          </div>
          {availability && (
            <div className="absolute bottom-2 left-3 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm">
              ⚡ {availability}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1">
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>

          <h3 className="text-base font-heading font-semibold text-neutral-900 group-hover:text-secondary-600 transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="mt-1 text-xs text-neutral-500">
            By <span className="font-medium text-neutral-700">{businessName || entrepreneurName}</span>
          </p>

          <div className="mt-2.5">
            <Rating value={rating} count={reviewCount} />
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-neutral-400 block">{priceUnit}</span>
          <span className="text-base font-heading font-bold text-neutral-900">
            {formatCurrency(price)}
          </span>
        </div>
        <Link
          to={`/services/${id}`}
          className="btn-secondary text-xs px-3.5 py-1.5 no-underline"
        >
          Book Service
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
