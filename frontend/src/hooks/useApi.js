/**
 * useApi.js
 * Generic data-fetching hook that wraps async service calls
 * with loading, data, and error state.
 */

import { useState, useCallback } from 'react';

/**
 * @param {Function} serviceFunction - An async function returning data.
 * @returns {{ data, loading, error, execute }}
 */
function useApi(serviceFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await serviceFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || 'Something went wrong.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [serviceFunction]
  );

  return { data, loading, error, execute };
}

export default useApi;
