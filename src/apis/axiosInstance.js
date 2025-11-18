import axios from 'axios';

// Your backend URL
const API_URL = 'https://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // Always sends JSON data
  },
});

// Add token to requests automatically (Interceptor)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle response errors globally (auto-logout on 401)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token expired or unauthorized
    if (error.response?.status === 401) {
      // Remove invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login (only if not already on login page)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;