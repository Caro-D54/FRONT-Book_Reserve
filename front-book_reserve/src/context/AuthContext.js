import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthHeader = (access) => {
    if (access) {
      sessionStorage.setItem('access_token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    } else {
      sessionStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const getProfile = async () => {
    const res = await axios.get('/users/me/');
    setUser(res.data);
    return res.data;
  };

  useEffect(() => {
    const init = async () => {
      const access = sessionStorage.getItem('access_token');
      if (!access) {
        setLoading(false);
        return;
      }
      setAuthHeader(access);
      try {
        await getProfile();
      } catch (err) {
        console.error('Error cargando perfil inicial:', err);
        setAuthHeader(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async ({ mail, password }) => {
    const resp = await axios.post('/users/token/', { mail, password });
    const { access, refresh } = resp.data;
    // guardar tokens y setear header global
    setAuthHeader(access);
    localStorage.setItem('refresh_token', refresh || '');
    // cargar perfil y actualizar estado
    return await getProfile();
  };

  const register = async ({ name, mail, password }) => {
    const resp = await axios.post('/users/register/', { name, mail, password });
    if (resp.data?.access && resp.data?.refresh) {
      setAuthHeader(resp.data.access);
      localStorage.setItem('refresh_token', resp.data.refresh);
      return await getProfile();
    }
    // fallback: intentar login si no vienen tokens
    return await login({ mail, password });
  };

  const logout = async () => {
    setAuthHeader(null);
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token');
    const resp = await axios.post('/users/token/refresh/', { refresh });
    const { access } = resp.data;
    setAuthHeader(access);
    return access;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshAccessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;