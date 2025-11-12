import React from 'react'
import { useAuth } from '../../context/AuthContext'
import './ProtectedRoute.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-book-open fa-spin"></i>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Acceso Denegado</h2>
          <p>Debes iniciar sesión para acceder a esta página.</p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute