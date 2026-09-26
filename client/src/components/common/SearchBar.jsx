import React from 'react';
import Button from './Button';

/**
 * Reusable SearchBar component with search icon and submit action.
 */
function SearchBar({
  placeholder = 'Search products, services, or local skills...',
  value,
  onChange,
  onSearch,
  className = '',
  buttonLabel = 'Search',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full flex flex-col sm:flex-row gap-2 ${className}`}>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 shadow-sm"
        />
      </div>
      {buttonLabel && (
        <Button type="submit" variant="primary" size="md" className="py-3 px-6 sm:w-auto">
          {buttonLabel}
        </Button>
      )}
    </form>
  );
}

export default SearchBar;
