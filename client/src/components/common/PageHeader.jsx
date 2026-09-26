import React from 'react';

/**
 * Standard page banner header.
 */
function PageHeader({ title, subtitle, children, breadcrumbs = [] }) {
  return (
    <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white py-10 sm:py-14">
      <div className="container-custom">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && <span>/</span>}
                {crumb.to ? (
                  <a href={crumb.to} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold">{title}</h1>
            {subtitle && <p className="mt-2 text-neutral-300 text-sm sm:text-base max-w-2xl">{subtitle}</p>}
          </div>
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
