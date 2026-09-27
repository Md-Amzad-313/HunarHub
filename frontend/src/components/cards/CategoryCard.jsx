import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  const { slug, name, icon, description, itemCount, image } = category;
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/explore?category=${slug}`}
      className="group card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between no-underline overflow-hidden border border-neutral-200 hover:border-primary-300"
    >
      <div className="relative h-36 -mx-6 -mt-6 mb-4 overflow-hidden bg-neutral-100">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-primary-50">
            {icon}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
          <span className="text-3xl filter drop-shadow">{icon}</span>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-base font-heading font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-neutral-500">{itemCount} Listings</span>
        <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Browse →
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
