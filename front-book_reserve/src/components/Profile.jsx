import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Library.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 🔹 Al montar, obtener perfil y datos asociados
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Perfil del usuario
        const meRes = await axiosInstance.get("/users_management/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(meRes.data);

        // Solicitudes
        const solRes = await axiosInstance.get("/library/solicitudes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolicitudes(solRes.data);

        // Favoritos
        const favRes = await axiosInstance.get("/library/favoritos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos(favRes.data);

        // Historial
        const histRes = await axiosInstance.get("/library/historial/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorial(histRes.data);

        setLoading(false);
      } catch (err) {
        setError("Error al cargar datos del perfil");
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  // 🔹 Aprobar/Rechazar solicitud
  const updateSolicitudStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("access_token");
      await axiosInstance.patch(`/library/solicitudes/${id}/`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSolicitudes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    } catch {
      setError("No se pudo actualizar la solicitud");
    }
  };

  // 🔹 Añadir/Quitar favoritos
  const toggleFavorito = async (bookId) => {
    try {
      const token = localStorage.getItem("access_token");
      const exists = favoritos.find((f) => f.id === bookId);
      if (exists) {
        await axiosInstance.delete(`/library/favoritos/${bookId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos((prev) => prev.filter((f) => f.id !== bookId));
      } else {
        const res = await axiosInstance.post(`/library/favoritos/`, { book: bookId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos((prev) => [...prev, res.data]);
      }
    } catch {
      setError("Error al actualizar favoritos");
    }
  };

  // 🔹 Actualizar perfil
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axiosInstance.patch("/users_management/me/", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      setError("Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <main className="profile-page nexus">
      <h1>Perfil de Usuario</h1>

      {user && (
        <section className="profile-info">
          <p><strong>Correo:</strong> {user.mail}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Rol:</strong> {user.is_staff || user.is_superuser ? "Administrador" : "Usuario"}</p>
        </section>
      )}

      <section className="profile-section">
        <h2>Solicitudes</h2>
        {solicitudes.length === 0 ? (
          <p>No hay solicitudes</p>
        ) : (
          <ul>
            {solicitudes.map((s) => (
              <li key={s.id}>
                {s.book_title} — Estado: {s.status}
                <button onClick={() => updateSolicitudStatus(s.id, "aprobada")}>Aprobar</button>
                <button onClick={() => updateSolicitudStatus(s.id, "rechazada")}>Rechazar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="profile-section">
        <h2>Favoritos</h2>
        {favoritos.length === 0 ? (
          <p>No tienes favoritos</p>
        ) : (
          <ul>
            {favoritos.map((f) => (
              <li key={f.id}>
                {f.book_title}
                <button onClick={() => toggleFavorito(f.id)}>Quitar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="profile-section">
        <h2>Historial</h2>
        {historial.length === 0 ? (
          <p>No hay historial</p>
        ) : (
          <ul>
            {historial.map((h) => (
              <li key={h.id}>
                {h.book_title} — leído el {new Date(h.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="profile-section">
        <h2>Configuración</h2>
        <button onClick={() => updateProfile({ name: "Nuevo Nombre" })}>
          Cambiar nombre
        </button>
      </section>
    </main>
  );
}
