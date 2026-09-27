/**
 * healthService.js
 * Service for the backend health-check endpoint.
 * Used by components/diagnostics that need to verify API connectivity.
 */

import api from './api';

/**
 * Ping the backend health endpoint.
 * @returns {Promise<object>} Health response payload.
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
