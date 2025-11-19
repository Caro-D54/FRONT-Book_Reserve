// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false, redirectToLogin = false }) => {
  const { user, loading } = useAuth();

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

  // No authenticated user
  if (!user) {
    // Opción A: redirigir a /login (establece redirectToLogin a true al usar el componente)
    if (redirectToLogin) return <Navigate to="/login" replace />;

    // Opción B: mostrar UI de acceso denegado (comportamiento por defecto)
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Acceso Denegado</h2>
          <p>Debes iniciar sesión para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  // Si la ruta requiere permisos de administrador, comprobamos el rol
  if (requireAdmin) {
    // Soportamos distintos nombres de flag de rol que podrías usar en tu user object
    const isAdmin =
      user.is_staff === true ||
      user.is_admin === true ||
      user.role === "admin" ||
      user.role === "staff";

    if (!isAdmin) {
      // puedes redirigir a home o mostrar un mensaje — aquí mostramos el mensaje de acceso denegado
      return (
        <div className="access-denied">
          <div className="access-denied-content">
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Acceso Restringido</h2>
            <p>No tienes permisos para ver esta sección.</p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;