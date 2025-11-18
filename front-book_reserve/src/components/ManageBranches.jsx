import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ManageBranches() {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ nombre: "", direccion: "" });

  const fetchBranches = () => {
    axiosInstance.get("/api/sucursales/")
      .then((res) => setBranches(res.data))
      .catch((err) => console.error("Error al cargar sucursales", err));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/api/sucursales/", form)
      .then(() => {
        setForm({ nombre: "", direccion: "" });
        fetchBranches();
      })
      .catch((err) => console.error("Error al crear sucursal", err));
  };

  const handleUpdate = (branch) => {
    const nuevoNombre = prompt("Nuevo nombre:", branch.nombre);
    const nuevaDireccion = prompt("Nueva dirección:", branch.direccion);
    if (nuevoNombre && nuevaDireccion) {
      axiosInstance.put(`/api/sucursales/${branch.id}/`, {
        nombre: nuevoNombre,
        direccion: nuevaDireccion,
      })
        .then(fetchBranches)
        .catch((err) => console.error("Error al actualizar sucursal", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar esta sucursal?")) {
      axiosInstance.delete(`/api/sucursales/${id}/`)
        .then(fetchBranches)
        .catch((err) => console.error("Error al eliminar sucursal", err));
    }
  };

  return (
    <div className="container py-4">
      <h2>Gestión de Sucursales</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Agregar sucursal</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Dirección</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td>{branch.id}</td>
              <td>{branch.nombre}</td>
              <td>{branch.direccion}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(branch)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(branch.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
