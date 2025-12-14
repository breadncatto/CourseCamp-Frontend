
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role ? user.role.toLowerCase() : ''; 
  console.log(userRole);

  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'student') {
      return <Navigate to="/student/courses" replace />;
    } else if (userRole === 'instructor') {
      return <Navigate to="/tutor/dashboard" replace />;
    } else if (userRole === 'admin'){
      return <Navigate to="/admin/approval" replace />; 
    } else {
      return <Navigate to="/" replace />
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;