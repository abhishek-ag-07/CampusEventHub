import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../utils/api";   // ✅ IMPORTANT

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error('not auth');
          return res.json();
        })
        .then(data => {
          setUser(data);
          setIsLoading(false);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw res;

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);

    if (data.user.role === 'super_admin') navigate('/super-admin');
    else if (data.user.role === 'admin') navigate('/admin');
    else navigate('/student');
  };

  const loginWithToken = async (incomingToken) => {
    setToken(incomingToken);
    localStorage.setItem('token', incomingToken);

    try {
      const res = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${incomingToken}` },
      });

      if (!res.ok) throw new Error('Failed to fetch user');

      const data = await res.json();
      setUser(data);

      if (data.role === 'super_admin') navigate('/super-admin');
      else if (data.role === 'admin') navigate('/admin');
      else navigate('/student');

    } catch (err) {
      console.error('Token login error', err);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const register = async (payload) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw res;

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);

    if (data.user.role === 'super_admin') navigate('/super-admin');
    else if (data.user.role === 'admin') navigate('/admin');
    else navigate('/student');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithToken, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}