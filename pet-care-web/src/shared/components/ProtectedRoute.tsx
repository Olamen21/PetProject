
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(userRole || "")) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;