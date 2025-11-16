import axios from "axios";

const axiosInstance = axios.create({
    baseURL: ProcessingInstruction.env.REACT_APP_API_URL || 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    }
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
