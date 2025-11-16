import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, // pon true si usas cookies httpOnly desde el backend
});

// Añade Authorization header desde sessionStorage antes de cada request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;