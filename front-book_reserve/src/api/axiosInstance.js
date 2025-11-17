// src/api/axiosInstance.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Interceptor de request: añade el access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: maneja expiración del access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos reintentado aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Pedimos nuevo access usando el refresh
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("No hay refresh token");

        const res = await axios.post(`${API_BASE}/users/token/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;
        sessionStorage.setItem("access_token", newAccess);

        // Actualizamos el header y repetimos la petición original
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Si falla el refresh → forzar logout
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
