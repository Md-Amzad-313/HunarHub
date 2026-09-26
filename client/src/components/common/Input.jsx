import React from 'react';

/**
 * Reusable Input component supporting labels, icons, error states, and helpers.
 */
function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border bg-white py-2.5 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
