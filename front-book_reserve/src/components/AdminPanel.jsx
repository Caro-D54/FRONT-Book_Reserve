// src/components/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consumir el endpoint /users/me/
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/me/");
        setUser(res.data);
      } catch (err) {
        console.error("Error obteniendo perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No autenticado</p>;

  // Verificar si es admin (bibliotecario)
  const isAdmin = user.is_staff || user.is_superuser;

  return (
    <div className="admin-panel">
      <h2>Bienvenido, {user.username}</h2>
      <p>Correo: {user.email}</p>

      {isAdmin ? (
        <div className="admin-section">
          <h3>Panel de Administración (Bibliotecarios)</h3>
          <ul>
            <li><button onClick={() => alert("Gestionar libros")}>Gestionar Libros</button></li>
            <li><button onClick={() => alert("Gestionar sucursales")}>Gestionar Sucursales</button></li>
            <li><button onClick={() => alert("Aprobar/Rechazar solicitudes")}>Solicitudes</button></li>
          </ul>
        </div>
      ) : (
        <p>No tienes permisos de administrador.</p>
      )}
    </div>
  );
};

export default AdminPanel;
