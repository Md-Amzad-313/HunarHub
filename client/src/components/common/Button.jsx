import React from 'react';

/**
 * Reusable Button component with multiple variants & sizes.
 */
function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon = null,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400 shadow-sm',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400 shadow-sm',
    outline: 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
