import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';

function ToastContainer() {
  const { toasts, removeToast } = useMarketplace();

  if (!toasts || toasts.length === 0) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getToastColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-emerald-100';
      case 'error':
        return 'bg-red-50 border-red-300 text-red-900 shadow-red-100';
      case 'warning':
        return 'bg-amber-50 border-amber-300 text-amber-900 shadow-amber-100';
      case 'info':
      default:
        return 'bg-primary-50 border-primary-300 text-primary-900 shadow-primary-100';
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-amber-600 text-white';
      case 'info':
      default:
        return 'bg-primary-600 text-white';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto border rounded-2xl p-4 shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 flex items-start gap-3 backdrop-blur-sm ${getToastColors(
            toast.type
          )}`}
          role="alert"
        >
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${getBadgeColor(
              toast.type
            )}`}
          >
            {getToastIcon(toast.type)}
          </div>

          <div className="flex-grow min-w-0 pr-2">
            <h4 className="font-heading font-bold text-xs">{toast.title}</h4>
            {toast.message && <p className="text-[11px] opacity-90 mt-0.5 leading-snug">{toast.message}</p>}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-700 text-sm font-bold p-1 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
