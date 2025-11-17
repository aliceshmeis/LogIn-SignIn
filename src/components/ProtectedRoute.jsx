import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../apis/authApi';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route but user is not admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/user" replace />;
  }

  // All good, show the page
  return children;
};

export default ProtectedRoute;