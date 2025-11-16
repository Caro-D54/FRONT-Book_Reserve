import axios from "axios";

const getApiBase = () => {
    try {
        const env = typeof process !== 'undefined' ? process.env.REACT_APP_API_URL : {};
        return env?.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/';
    } catch {
        return 'http://127.0.0.1:8000/api/';
    }
}; 
const axiosInstance = axios.create({
    baseURL: ProcessingInstruction.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('access_token');
        if (token) config.headers['Authorization'] = 'Bearer ${token}';
        else delete config.headers['Authorization'];
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
