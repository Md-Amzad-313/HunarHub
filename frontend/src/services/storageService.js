/**
 * src/services/storageService.js
 * Centralized, safe localStorage helpers for HunarHub.
 * Handles JSON parsing errors, corrupted entries, and standard keys.
 */

export const STORAGE_KEYS = {
  CART: 'hunarhub_cart',
  ORDERS: 'hunarhub_orders',
  SERVICE_REQUESTS: 'hunarhub_service_requests',
  REVIEWS: 'hunarhub_reviews',
  ENTREPRENEURS: 'hunarhub_entrepreneurs',
  PRODUCTS: 'hunarhub_products',
  SERVICES: 'hunarhub_services',
  CUSTOMER_PROFILE: 'hunarhub_customer_profile',
};

/**
 * Safely retrieve and parse item from localStorage with a fallback
 */
export function getStorageItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (error) {
    console.warn(`[storageService] Error parsing item for key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely serialize and save item into localStorage
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[storageService] Error saving key "${key}" to localStorage:`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[storageService] Error removing key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all HunarHub specific keys
 */
export function clearHunarHubStorage() {
  Object.values(STORAGE_KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      // ignore
    }
  });
}
