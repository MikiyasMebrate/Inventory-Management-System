import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response, // Pass successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token and the request hasn't been retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const refreshToken = getRefreshToken();
                const { data } = await axios.post('https://your-api-url.com/refresh-token', { refreshToken });

                // Update tokens and retry the failed request
                setAccessToken(data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest); // Retry the original request with the new token
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                console.error('Refresh token failed', refreshError);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Reject other errors
    }
);


export default api;