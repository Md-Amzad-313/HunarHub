import React from 'react';

export function LoadingState({ message = 'Loading marketplace items...' }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-neutral-600">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search criteria or clear your filters to view more listings.',
  icon = '🔍',
  actionLabel,
  onAction,
}) {
  return (
    <div className="py-16 px-4 bg-white rounded-2xl border border-neutral-200 text-center max-w-md mx-auto my-8">
      <span className="text-5xl">{icon}</span>
      <h3 className="mt-4 text-lg font-heading font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 btn-primary text-sm px-5 py-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ message = 'An error occurred while fetching listings.', onRetry }) {
  return (
    <div className="py-12 px-6 bg-red-50 border border-red-200 rounded-2xl text-center max-w-lg mx-auto my-6">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 text-xl">
        ⚠️
      </div>
      <h3 className="text-base font-heading font-semibold text-red-900">Something went wrong</h3>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 btn bg-red-600 text-white hover:bg-red-700 text-xs px-4 py-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
