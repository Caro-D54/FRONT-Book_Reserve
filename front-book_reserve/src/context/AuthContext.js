// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configurar header de autorización
  const setAuthHeader = (access) => {
    if (access) {
      sessionStorage.setItem("access_token", access);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } else {
      sessionStorage.removeItem("access_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  };

  // Obtener perfil del usuario autenticado
  const getProfile = async () => {
    const res = await axiosInstance.get("/users/me/");
    setUser(res.data);
    return res.data;
  };

  // Inicializar sesión si hay token guardado
  useEffect(() => {
    const init = async () => {
      const access = sessionStorage.getItem("access_token");
      if (!access) {
        setLoading(false);
        return;
      }
      setAuthHeader(access);
      try {
        await getProfile();
      } catch (e) {
        setAuthHeader(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Login con email y password
  const login = async (email, password) => {
    const resp = await axiosInstance.post("/users/token/", { email, password });
    const { access, refresh } = resp.data;
    setAuthHeader(access);
    localStorage.setItem("refresh_token", refresh || "");
    return await getProfile();
  };

  // Registro de usuario
  const register = async (name, email, password) => {
    const resp = await axiosInstance.post("/users/register/", {
      name,
      email,
      password,
    });
    if (resp.data?.access && resp.data?.refresh) {
      setAuthHeader(resp.data.access);
      localStorage.setItem("refresh_token", resp.data.refresh);
      return await getProfile();
    }
    // Si no devuelve tokens, hacer login manual
    return await login(email, password);
  };

  // Logout (invalidar refresh en backend y limpiar frontend)
  const logout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (refresh) {
      try {
        await axiosInstance.post("/users/logout/", { refresh });
      } catch (e) {
        console.error("Error cerrando sesión en backend", e);
      }
    }
    setAuthHeader(null);
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
