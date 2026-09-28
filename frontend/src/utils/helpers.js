/**
 * helpers.js
 * General-purpose utility functions shared across the frontend.
 */

/**
 * Format a number as a localised currency string.
 * @param {number} amount
 * @param {string} currency - ISO 4217 code, default 'INR'
 * @param {string} locale   - BCP 47 locale, default 'en-IN'
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  const num = Number(amount) || 0;
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(num);
  } catch (e) {
    return `₹${num.toLocaleString()}`;
  }
};

/**
 * Truncate a string to a maximum length and append ellipsis.
 * @param {string} text
 * @param {number} maxLength
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

/**
 * Format a date string to a human-readable format.
 * @param {string|Date} date
 * @param {string}      locale
 */
export const formatDate = (date, locale = 'en-IN') => {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  } catch {
    return String(date);
  }
};

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 */
export const capitalise = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

/**
 * Safely parse JSON, returning null on failure.
 * @param {string} jsonString
 */
export const safeParseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};
