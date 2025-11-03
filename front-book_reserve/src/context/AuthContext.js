import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('biblioteca_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      }
    } catch (err) {
      console.error('Error leyendo usuario desde localStorage', err);
      localStorage.removeItem('biblioteca_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      // validación básica
      if (!email || !password) {
        reject(new Error('Credenciales inválidas'));
        return;
      }

      setLoading(true);
      setTimeout(() => {
        try {
          const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString(),
          };
          setUser(userData);
          try {
            localStorage.setItem('biblioteca_user', JSON.stringify(userData));
          } catch (err) {
            console.warn('No se pudo guardar en localStorage', err);
          }
          resolve(userData);
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    });
  }, []);

  const register = useCallback((name, email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      // validaciones síncronas
      if (password !== confirmPassword) {
        reject(new Error('Las contraseñas no coinciden'));
        return;
      }
      if (typeof password !== 'string' || password.length < 6) {
        reject(new Error('La contraseña debe tener al menos 6 caracteres'));
        return;
      }
      if (!email || !name) {
        reject(new Error('Nombre y email requeridos'));
        return;
      }

      setLoading(true);
      setTimeout(() => {
        try {
          const userData = {
            id: Date.now(),
            name,
            email,
            createdAt: new Date().toISOString(),
          };
          setUser(userData);
          try {
            localStorage.setItem('biblioteca_user', JSON.stringify(userData));
          } catch (err) {
            console.warn('No se pudo guardar en localStorage', err);
          }
          resolve(userData);
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('biblioteca_user');
    } catch (err) {
      console.warn('Error al limpiar localStorage', err);
    }
  }, []);

  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({ user, isAuthenticated, login, register, logout, loading }),
    [user, isAuthenticated, login, register, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
