/**
 * api.js
 * Axios instance pre-configured for HunarHub backend API calls.
 * All components and services should import this instance, not raw axios.
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/* ── Request interceptor ─────────────────────────────────── */
api.interceptors.request.use(
  (config) => {
    // Phase 1: attach JWT from localStorage/cookie
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Response interceptor ───────────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred.';

    // Phase 1: redirect to /login on 401
    // if (error.response?.status === 401) window.location.href = '/login';

    return Promise.reject(new Error(message));
  }
);

export default api;
