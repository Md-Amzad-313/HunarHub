/**
 * AuthContext.jsx
 * React context for authentication state.
 * Phase 0 – scaffold only. Actual auth logic is implemented in Phase 1.
 */

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Phase 1: replace with real auth state management
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (/* credentials */) => {
    // Phase 1: call authService.login(credentials)
    throw new Error('Authentication not yet implemented. Coming in Phase 1.');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (/* userData */) => {
    // Phase 1: call authService.register(userData)
    throw new Error('Registration not yet implemented. Coming in Phase 1.');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook for consuming AuthContext.
 * @returns {{ user, isAuthenticated, login, logout, register }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>.');
  }
  return context;
}

export default AuthContext;
