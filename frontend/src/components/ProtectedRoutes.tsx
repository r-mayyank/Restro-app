import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { routePermissions } from '../config/routePermissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const userRole = getUserRole();

  if (!userRole) {
    // Redirect to signin if there's no user role (user is not logged in)
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  const allowedRoles = routePermissions[location.pathname];

  if (!allowedRoles || !allowedRoles.includes(userRole)) {
    // Redirect to home if user doesn't have permission
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

