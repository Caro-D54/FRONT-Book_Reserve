import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ title: "" });

  const fetchRequests = () => {
    axiosInstance.get("/api/requests/")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error al cargar solicitudes", err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/api/requests/", form)
      .then(() => {
        setForm({ title: "" });
        fetchRequests();
      })
      .catch((err) => console.error("Error al crear solicitud", err));
  };

  const handleApprove = (id) => {
    axiosInstance.post(`/api/requests/${id}/approve/`)
      .then(() => fetchRequests())
      .catch((err) => console.error("Error al aprobar solicitud", err));
  };

  const handleReject = (id) => {
    axiosInstance.post(`/api/requests/${id}/reject/`)
      .then(() => fetchRequests())
      .catch((err) => console.error("Error al rechazar solicitud", err));
  };

  const handleUpdate = (req) => {
    const nuevoTitulo = prompt("Nuevo título:", req.title);
    if (nuevoTitulo) {
      axiosInstance.put(`/api/requests/${req.id}/`, { title: nuevoTitulo })
        .then(() => fetchRequests())
        .catch((err) => console.error("Error al actualizar solicitud", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar esta solicitud?")) {
      axiosInstance.delete(`/api/requests/${id}/`)
        .then(() => fetchRequests())
        .catch((err) => console.error("Error al eliminar solicitud", err));
    }
  };

  return (
    <div className="container py-4">
      <h2>Solicitudes de Usuarios</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Título de la solicitud"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Crear solicitud</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr><th>ID</th><th>Título</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.title}</td>
              <td>{req.status}</td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(req.id)}>Aprobar</button>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleReject(req.id)}>Rechazar</button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(req)}>Editar</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(req.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
