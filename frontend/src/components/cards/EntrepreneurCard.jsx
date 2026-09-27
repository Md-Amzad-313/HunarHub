import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import Badge from '../common/Badge';

const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

function EntrepreneurCard({ entrepreneur }) {
  const [avatarSrc, setAvatarSrc] = useState(entrepreneur?.avatar || FALLBACK_AVATAR);

  const {
    id,
    name,
    businessName,
    category,
    location,
    rating,
    reviewCount,
    about,
    skills = [],
    badge,
  } = entrepreneur;

  return (
    <div className="group card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between border border-neutral-200 hover:border-primary-300 relative">
      <div>
        {/* Header Avatar & Info */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={avatarSrc}
              alt={name}
              onError={() => setAvatarSrc(FALLBACK_AVATAR)}
              className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-neutral-200 group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            {badge && (
              <span className="absolute -bottom-2 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow">
                {badge}
              </span>
            )}
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-base font-heading font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors truncate">
              {businessName || name}
            </h3>
            <p className="text-xs text-neutral-500 font-medium truncate">{name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="neutral">{category}</Badge>
            </div>
          </div>
        </div>

        {/* Rating & Location */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 border-t border-b border-neutral-100 py-2">
          <Rating value={rating} count={reviewCount} />
          <span className="flex items-center gap-1 text-neutral-500 truncate ml-2">
            📍 {location}
          </span>
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {about}
        </p>

        {/* Skills Chips */}
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="bg-neutral-100 text-neutral-600 text-[10px] px-2 py-0.5 rounded-md font-medium"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="text-[10px] text-neutral-400 self-center font-medium">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action */}
      <div className="mt-5 pt-3 border-t border-neutral-100">
        <Link
          to={`/entrepreneurs/${id}`}
          className="btn-outline text-xs w-full py-2 no-underline text-center block"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}

export default EntrepreneurCard;
