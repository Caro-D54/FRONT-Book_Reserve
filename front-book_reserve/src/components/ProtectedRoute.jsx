// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  // Mientras carga la sesión
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-book-open fa-spin"></i>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario → redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere rol admin y el usuario no lo es → acceso denegado
  if (requireAdmin && !(user.is_staff || user.is_superuser)) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos de bibliotecario.</p>
        </div>
      </div>
    );
  }

  // Si pasa todas las validaciones → renderizar hijos
  return children;
};

export default ProtectedRoute;