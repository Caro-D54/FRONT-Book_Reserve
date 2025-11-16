import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inicializa sesión si existe access token
  useEffect(() => {
    const init = async () => {
      const access = sessionStorage.getItem('access_token');
      if (!access) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/users/me/');
        setUser(res.data);
      } catch (err) {
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Login: obtiene access + refresh, guarda tokens y carga perfil
  const login = async ({ mail, password }) => {
    const resp = await axios.post('/users/token/', { mail, password });
    const { access, refresh } = resp.data;
    sessionStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh); // en producción: preferir cookie httpOnly
    const me = await axios.get('/users/me/');
    setUser(me.data);
    return me.data;
  };

  // Registro: POST a endpoint de registro (ajusta ruta y campos si tu backend difiere)
  const register = async ({ name, mail, password }) => {
    const resp = await axios.post('/users/register/', { name, mail, password });
    // si backend devuelve tokens tras registro, los guardamos
    if (resp.data.access && resp.data.refresh) {
      sessionStorage.setItem('access_token', resp.data.access);
      localStorage.setItem('refresh_token', resp.data.refresh);
      const me = await axios.get('/users/me/');
      setUser(me.data);
      return me.data;
    }
    // si no devuelve tokens, intentar login inmediato
    return await login({ mail, password });
  };

  // Logout: limpiar tokens y estado (si tienes endpoint de logout, llamarlo aquí)
  const logout = async () => {
    // opcional: await axios.post('/users/logout/'); // si implementas invalidación en backend
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  // Refrescar access token usando refresh del localStorage (dev/testing)
  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token');
    const resp = await axios.post('/users/token/refresh/', { refresh });
    const { access } = resp.data;
    sessionStorage.setItem('access_token', access);
    return access;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        refreshAccessToken,
        setUser, // expositor útil para tests o actualizaciones específicas
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;