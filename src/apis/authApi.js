import api from './axiosInstance';

// Login
export const login = async (credentials) => {
  const response = await api.post('/gateway/auth/login', credentials);
  return response.data;
};

// Sign Up
export const signup = async (userData) => {
  const response = await api.post('/gateway/auth/signup', {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword
  });
  return response.data;
};

// Get current user from backend (using JWT token)
export const getCurrentUserFromBackend = async () => {
  const response = await api.get('/gateway/auth/me');
  return response.data;
};

// Get All Users (Admin only)
export const getAllUsers = async () => {
  const response = await api.get('/gateway/auth/users');
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // Keep for now for UI display
  localStorage.removeItem('cart');
};

// Get current user from localStorage (for UI display only)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Check if user is admin (from localStorage for UI)
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.isAdmin === true;
};