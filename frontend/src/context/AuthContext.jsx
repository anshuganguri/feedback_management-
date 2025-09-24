
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fm_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('fm_token'));

  useEffect(() => {
    if (user) localStorage.setItem('fm_user', JSON.stringify(user));
    else localStorage.removeItem('fm_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('fm_token', token);
    else localStorage.removeItem('fm_token');
  }, [token]);

  const isAuthenticated = !!token;

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    setUser(res.data.user || res.data);
    setToken(res.data.token);
  };

  const signup = async (data) => {
    const res = await api.post('/auth/signup', data);
    setUser(res.data.user || res.data);
    setToken(res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fm_token');
    localStorage.removeItem('fm_user');
  };

  const value = useMemo(() => ({ user, token, isAuthenticated, login, signup, logout }), [user, token, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


