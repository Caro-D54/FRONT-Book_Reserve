// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Library.css";

/* Pequeñas UIs reutilizables */
const AccessDeniedUI = ({ title = "Acceso Denegado", message = "Debes iniciar sesión para acceder a esta página." }) => (
  <div className="access-denied" role="alert" aria-live="polite">
    <div className="access-denied-content">
      <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  </div>
);

const LoadingUI = () => (
  <div className="loading-container" role="status" aria-live="polite">
    <div className="loading-spinner">
      <i className="fas fa-book-open fa-spin" aria-hidden="true"></i>
      <p>Cargando...</p>
    </div>
  </div>
);

/**
 * ProtectedRoute
 * Props:
 *  - children: optional React node(s). If provided, returns children when authorized.
 *  - requireAdmin: boolean (default false). If true, blocks non-admin users.
 *  - redirectToLogin: boolean (default false). If true, unauthenticated users are redirected to /login.
 *  - redirectWhenUnauthorized: alias for redirectToLogin accepted for compatibility.
 *
 * Usage:
 * 1) Wrapper: <ProtectedRoute requireAdmin><Page/></ProtectedRoute>
 * 2) Nested route: <Route element={<ProtectedRoute redirectWhenUnauthorized />}> <Route path="..." element={<Page/>} /> </Route>
 */
const ProtectedRoute = ({
  children = null,
  requireAdmin = false,
  redirectToLogin = false,
  redirectWhenUnauthorized = false,
}) => {
  // permitir cualquiera de los alias para compatibilidad
  const shouldRedirect = redirectToLogin || redirectWhenUnauthorized;

  const { user, loading } = useAuth();

  if (loading) return <LoadingUI />;

  // no autenticado
  if (!user) {
    if (shouldRedirect) return <Navigate to="/login" replace />;
    return <AccessDeniedUI />;
  }

  // comprobar rol admin si se requiere
  if (requireAdmin) {
    const isAdmin =
      user.is_staff === true ||
      user.is_admin === true ||
      user.role === "admin" ||
      user.role === "staff" ||
      (user.permissions && typeof user.permissions.includes === "function" && user.permissions.includes("admin"));

    if (!isAdmin) {
      // si queremos redirigir en vez de mostrar mensaje, cambiar aquí
      return <AccessDeniedUI title="Acceso Restringido" message="No tienes permisos para ver esta sección." />;
    }
  }

  // autorizado: devolvemos children (modo wrapper) o Outlet (modo nesting)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;