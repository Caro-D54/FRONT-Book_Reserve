import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Library.css';

const AccessDeniedUI = () => (
  <div className="access-denied" role="alert" aria-live="polite">
    <div className="access-denied-content">
      <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
      <h2>Acceso Denegado</h2>
      <p>Debes iniciar sesión para acceder a esta página.</p>
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
 *  - children: node(s). If provided, the component will return children when authenticated.
 *  - redirectWhenUnauthorized: boolean (default false). If true, unauthenticated users are redirected to /login.
 *
 * Usage patterns:
 * 1) As wrapper: <ProtectedRoute><MyComponent/></ProtectedRoute>
 * 2) With react-router nesting: <Route element={<ProtectedRoute redirectWhenUnauthorized />}> <Route path="..." element={<Page/>} /> </Route>
 */
const ProtectedRoute = ({ children = null, redirectWhenUnauthorized = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingUI />;
  }

  if (!user) {
    if (redirectWhenUnauthorized) {
      return <Navigate to="/login" replace />;
    }
    return <AccessDeniedUI />;
  }

  // If children were provided, render them (wrapper usage). Otherwise render nested routes (Outlet).
  return children ? children : <Outlet />;
};

export default ProtectedRoute;