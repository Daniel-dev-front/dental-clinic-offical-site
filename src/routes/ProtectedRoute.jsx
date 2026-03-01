import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const ProtectedRoute = ({ children, roles, redirectTo = "/" }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  
  if (roles && roles.length > 0) {
    const hasRole = roles.some((role) => {
      if (role === "admin") return isAdmin;
      
      return false;
    });

    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
