import axios from 'axios';
import TokenService from './TokenService';

const ApiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

ApiClient.interceptors.request.use(async (config) => {
    const token = await TokenService.getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

ApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await TokenService.refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return ApiClient(originalRequest);
            } catch (refreshError) {
                TokenService.clearTokens();
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default ApiClient;