import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Library.css";

/* Helpers */
const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d) ? String(value) : d.toLocaleDateString("es-ES");
};

const normalizeRequests = (requests = []) =>
  (requests || []).map((r, i) => ({
    id: r.id ?? `${r.title ?? "unknown"}-${i}`,
    title: r.title ?? "Título desconocido",
    author: r.author ?? "Autor desconocido",
    status: (r.status || r.state || "").toString().toLowerCase(),
    createdAt: r.createdAt ?? r.created_at ?? r.date ?? null,
    updatedAt: r.updatedAt ?? r.approvedDate ?? r.approveDate ?? null,
    reason: r.reason ?? r.description ?? "—",
    rejectionReason: r.rejectionReason ?? r.rejection_reason ?? null,
  }));

const readableStatus = (s) =>
  (s || "")
    .toString()
    .toLowerCase() === "approved"
    ? "Aprobado"
    : (s || "").toString().toLowerCase() === "pending"
    ? "Pendiente"
    : (s || "").toString().toLowerCase() === "rejected"
    ? "Rechazado"
    : (s || "") || "—";

const statusClass = (s) =>
  (s || "").toString().toLowerCase() === "approved"
    ? "badge bg-success"
    : (s || "").toString().toLowerCase() === "pending"
    ? "badge bg-warning text-dark"
    : (s || "").toString().toLowerCase() === "rejected"
    ? "badge bg-danger"
    : "badge bg-secondary";

const pluralizeStatus = (s) => {
  if (!s) return "";
  const lower = s.toString().toLowerCase();
  if (lower === "pendiente" || lower === "pending") return "pendientes";
  if (lower === "aprobado" || lower === "approved") return "aprobadas";
  if (lower === "rechazado" || lower === "rejected") return "rechazadas";
  return lower + "s";
};

const Profile = ({ user, requests = [], onNavigate = () => {}, onRead = () => {}, onRetry = () => {} }) => {
  const [userRequests, setUserRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'approved' | 'pending' | 'rejected'

  useEffect(() => {
    setUserRequests(user ? normalizeRequests(requests) : []);
  }, [user, requests]);

  if (!user) {
    return (
      <section className="profile py-5">
        <div className="container">
          <div className="alert alert-info" role="alert">
            <h4>Acceso requerido</h4>
            <p>Por favor inicia sesión para acceder a tu perfil</p>
            <button className="btn btn-primary" onClick={() => onNavigate('login')}>Iniciar Sesión</button>
          </div>
        </div>
      </section>
    );
  }

  const filtered = userRequests.filter((r) => (activeTab === 'all' ? true : r.status === activeTab));
  return (
    <section className="profile py-4">
      <div className="container">
        <header className="d-flex gap-4 align-items-center mb-4">
          <div className="profile-avatar rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: 72, height: 72}}>
            <i className="fas fa-user text-white" aria-hidden="true" />
          </div>
          <div className="flex-grow-1">
            <h1 className="h4 mb-1">
              {user.name}
            </h1>
            <p className="text-muted mb-2">{user.email}</p>
            <div className="d-flex gap-4">
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.filter(r => r.status === 'aproved').length}</div>
                <small className="text-muted">Libros Aprobados</small>
              </div>
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.filter(r => r.status === 'pending').length}</div>
                <small className="text-muted">Solicitudes Pendientes</small>
              </div>
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.length}</div>
                <small className="text-muted">Total de Solicitudes</small>
              </div>
            </div>
          </div>
        </header>
        <nav className="mb-3" role="tablist">
          <div className="nav nav-tabs">
            <button 
              className={"nav-link ${activeTab === 'all' ? 'active' : ''}"}
              onClick={() => setActiveTab('all')}>
                Todas
            </button>
            <button 
              className={"nav-link ${activeTab === 'approved' ? 'active' : ''}"} 
              onClick={() => setActiveTab('approved')}>
                Aprobados
            </button>
            <button 
              className={"nav-link ${activeTab === 'pending' ? 'active' : ''}"} 
              onClick={() => setActiveTab('pending')}>
                Pendientes
            </button>
            <button
              className={"nav-link ${activeTab === 'rejected' ? 'active' : ''}"}
              onClick={() => setActiveTab('rejected')}>
                Rechazadas
            </button>
          </div>
        </nav>
        <main aria-live="polite">
          <h2 className="h5 mb-3">
            Mis Solicitudes de Lectura
          </h2>
          {filtered.length === 0 ? (
            <div className="card p-4 text-center">
              <div className="mb-3 text-muted">
                <i className="fas fa-inbox fa-2x" />
              </div>
                <h3> className="h6"
                  No hay solicitudes {activeTab !== 'all' ? activeTab : ''}
                </h3>
                <p className="text-muted">
                  {activeTab === 'all' ? 'Aún no has realizado ninguna solicitud de lectura.' : `No tienes solicitudes ${activeTab} en este momento.`}
                </p>
                <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
                  Ir al catálogo
                </button>
            </div>
          ) : (
            <div className="row g-3">
              {filtered.map((req) => (
                <article key={req.id} className="col-12">
                  <div className="card">
                    <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
                      <div style={{minWidth: 0}}>
                        <h3 
                          id={'req-title-${req.id}'}
                          className="h6 mb-0 text-truncate">
                            {req.title}
                        </h3>
                        <div className="text-muted small">
                          {req.author}
                        </div>
                        <div className="d-flex flex-wrap gap-3 text-muted small mt-2">
                          <div>
                            <strong>Solicitado:</strong>
                            {formatDate(req.createdAt)}
                          </div>
                          {req.updatedAt && <div>
                            <strong>Aprobado:</strong>
                            {formatDate(req.updatedAt)}
                          </div>}
                        </div>
                        <div className="mt-2">
                          <strong>Motivo:</strong>
                          <div className="text-secondary small">
                            {req.reason}
                          </div>
                        </div>
                        {req.rejectionReason && 
                          <div className="mt-2">
                            <strong>Razón de Rechazo:</strong>
                            <div className="text-danger small">
                              {req.rejectionReason}
                            </div>
                          </div>
                        }
                      </div>
                      <div className="d-flex flex-column align-items-md-end align-items-start gap-2">
                        <span className={statusClass(req.status)}>
                          {readableStatus(req.status)}
                        </span>
                        {req.status === 'approved' && 
                        <button className="btn btn-primary" onClick={() => onRead(req)}>
                          Leer Libro
                        </button>}
                        {req.status === 'pending' &&
                        <button className="btn btn-outline-secondary" disabled>
                          En revisión
                        </button>}
                        {req.status === 'rejected' &&
                        <button className="btn btn-outline-secondary" onClick={() => onRetry(req)}>
                          Solicitar nuevamente
                        </button>}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  requests: PropTypes.array,
  onNavigate: PropTypes.func,
  onRead: PropTypes.func,
  onRetry: PropTypes.func,
};

export default Profile;