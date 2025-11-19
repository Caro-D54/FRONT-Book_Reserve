// src/admin/RequestsTable.jsx
import React, { useEffect, useState } from "react";
import { apiAdmin } from "./apiAdmin";
import ConfirmDialog from "./ConfirmDialog";

export default function RequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => { fetchRequests(); }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      const data = await apiAdmin.listRequests({ ordering: "-created_at", page_size: 200 });
      setRequests(data.results || data);
    } catch (e) {
      console.error(e);
      alert("Error cargando solicitudes");
    } finally {
      setLoading(false);
    }
  }

  function openConfirm(req, type) {
    setSelected(req);
    setAction(type);
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    if (!selected) return;
    const status = action === "approve" ? "approved" : "rejected";
    try {
      await apiAdmin.updateRequest(selected.id, { status });
      setRequests(prev => prev.map(r => r.id === selected.id ? { ...r, status } : r));
      setConfirmOpen(false);
      setSelected(null);
    } catch (e) {
      console.error(e);
      alert("Error actualizando solicitud");
    }
  }

  return (
    <div>
      <h4>Solicitudes de lectura</h4>
      {loading && <div>Cargando...</div>}
      {!loading && requests.length === 0 && <div>No hay solicitudes</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: 8 }}>Usuario</th>
            <th>Libro</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
              <td style={{ padding: 8 }}>{r.user_email || r.user?.username}</td>
              <td>{r.book_title || r.book?.title}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td><StatusBadge status={r.status} /></td>
              <td>
                <button onClick={() => openConfirm(r, "approve")} style={btnSmall}>Aprobar</button>
                <button onClick={() => openConfirm(r, "reject")} style={{ ...btnSmall, marginLeft: 8, background: "#d32f2f" }}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={confirmOpen}
        title={action === "approve" ? "Aprobar solicitud" : "Rechazar solicitud"}
        message={`¿Deseas ${action === "approve" ? "aprobar" : "rechazar"} la solicitud: "${selected?.book_title || selected?.book?.title}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel={action === "approve" ? "Aprobar" : "Rechazar"}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { pending: { label: "Pendiente", bg: "#ffecb3" }, approved: { label: "Aprobado", bg: "#c8e6c9" }, rejected: { label: "Rechazado", bg: "#ffcdd2" } };
  const cfg = map[status] || { label: status, bg: "#eee" };
  return <span style={{ padding: "6px 8px", background: cfg.bg, borderRadius: 6 }}>{cfg.label}</span>;
}

const btnSmall = { background: "#1976d2", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6 };