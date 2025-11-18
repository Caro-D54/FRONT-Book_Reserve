import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function LibrarianProfile() {
  const { user } = useAuth();
  const [libros, setLibros] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access_token");
      try {
        const librosRes = await axiosInstance.get("/library/libros/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLibros(librosRes.data);

        const sucRes = await axiosInstance.get("/library/sucursales/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSucursales(sucRes.data);

        const solRes = await axiosInstance.get("/library/solicitudes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolicitudes(solRes.data);
      } catch (err) {
        console.error("Error cargando datos del admin:", err);
      }
    }
    if (user?.is_staff || user?.is_superuser) {
      fetchData();
    }
  }, [user]);

  if (!(user?.is_staff || user?.is_superuser)) {
    return <p>No tienes permisos para ver este panel.</p>;
  }

  return (
    <div className="container py-4">
      <h1>Panel del Bibliotecario</h1>
      <p>Bienvenido {user.name || user.mail}</p>

      <section>
        <h2>Gestionar Libros</h2>
        <ul>
          {libros.map((l) => (
            <li key={l.id}>{l.titulo}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Gestionar Sucursales</h2>
        <ul>
          {sucursales.map((s) => (
            <li key={s.id}>{s.nombre}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Solicitudes</h2>
        <ul>
          {solicitudes.map((sol) => (
            <li key={sol.id}>
              {sol.book_title} — Estado: {sol.status}
              <button
                onClick={async () => {
                  await axiosInstance.patch(`/library/solicitudes/${sol.id}/`, { status: "aprobada" });
                  setSolicitudes((prev) =>
                    prev.map((s) => (s.id === sol.id ? { ...s, status: "aprobada" } : s))
                  );
                }}
              >
                Aprobar
              </button>
              <button
                onClick={async () => {
                  await axiosInstance.patch(`/library/solicitudes/${sol.id}/`, { status: "rechazada" });
                  setSolicitudes((prev) =>
                    prev.map((s) => (s.id === sol.id ? { ...s, status: "rechazada" } : s))
                  );
                }}
              >
                Rechazar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
