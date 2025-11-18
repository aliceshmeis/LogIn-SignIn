import api from './axiosInstance'; // Import the axios instance

// Login
export const login = async (credentials) => {
  const response = await api.post('/Auth/login', credentials);
  return response.data; // Returns: { data: { token, user }, message, errorCode }
};

// Sign Up
export const signup = async (userData) => {
  const response = await api.post('/Auth/signup', {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword
  });
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.isAdmin === true;
};