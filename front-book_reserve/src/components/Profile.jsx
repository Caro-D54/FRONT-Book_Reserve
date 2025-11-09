import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Profile.css";

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
      <section className="profile-container py-5">
        <div className="container">
          <div className="alert alert-info d-flex align-items-center" role="alert" aria-live="polite">
            <i className="fas fa-user-lock me-3" aria-hidden="true" />
            <div>
              <h4 className="mb-1">Acceso requerido</h4>
              <p className="mb-2">Por favor inicia sesión para acceder a tu perfil</p>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate("login")}>
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const filtered = userRequests.filter((r) => (activeTab === "all" ? true : r.status === activeTab));

  return (
    <section className="profile-container py-4" aria-labelledby="profile-title">
      <div className="container">
        <header className="d-flex gap-4 align-items-center mb-4">
          <div className="profile-avatar rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: 72, height: 72 }}>
            <i className="fas fa-user text-white" aria-hidden="true" />
          </div>

          <div className="flex-grow-1">
            <h1 id="profile-title" className="h4 mb-1">{user.name}</h1>
            <p className="text-muted mb-2">{user.email}</p>

            <div className="d-flex gap-4">
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.filter((r) => r.status === "approved").length}</div>
                <small className="text-muted">Libros Aprobados</small>
              </div>
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.filter((r) => r.status === "pending").length}</div>
                <small className="text-muted">Solicitudes Pendientes</small>
              </div>
              <div className="text-center">
                <div className="h5 mb-0">{userRequests.length}</div>
                <small className="text-muted">Total de Solicitudes</small>
              </div>
            </div>
          </div>
        </header>

        <nav className="mb-3" role="tablist" aria-label="Pestañas de perfil">
          <div className="nav nav-tabs">
            <button className={`nav-link ${activeTab === "all" ? "active" : ""}`} id="tab-all" role="tab" aria-selected={activeTab === "all"} onClick={() => setActiveTab("all")}>
              <i className="fas fa-list me-1" aria-hidden="true" /> Todas
            </button>
            <button className={`nav-link ${activeTab === "approved" ? "active" : ""}`} id="tab-approved" role="tab" aria-selected={activeTab === "approved"} onClick={() => setActiveTab("approved")}>
              <i className="fas fa-check-circle me-1" aria-hidden="true" /> Aprobadas
            </button>
            <button className={`nav-link ${activeTab === "pending" ? "active" : ""}`} id="tab-pending" role="tab" aria-selected={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
              <i className="fas fa-clock me-1" aria-hidden="true" /> Pendientes
            </button>
            <button className={`nav-link ${activeTab === "rejected" ? "active" : ""}`} id="tab-rejected" role="tab" aria-selected={activeTab === "rejected"} onClick={() => setActiveTab("rejected")}>
              <i className="fas fa-times-circle me-1" aria-hidden="true" /> Rechazadas
            </button>
          </div>
        </nav>

        <main className="requests-section" aria-live="polite">
          <h2 className="h5 mb-3">Mis Solicitudes de Lectura</h2>

          {filtered.length === 0 ? (
            <div className="card p-4 text-center">
              <div className="mb-3 text-muted">
                <i className="fas fa-inbox fa-2x" aria-hidden="true"></i>
              </div>
              <h3 className="h6">
                No hay solicitudes {activeTab !== "all" ? pluralizeStatus(readableStatus(activeTab)) : ""}
              </h3>
              <p className="text-muted">
                {activeTab === "all" ? "Aún no has realizado ninguna solicitud de lectura." : `No tienes solicitudes ${pluralizeStatus(readableStatus(activeTab))} en este momento.`}
              </p>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate("catalog")}>Ir al catálogo</button>
            </div>
          ) : (
            <div className="row g-3">
              {filtered.map((req) => (
                <article key={req.id} className="col-12" role="listitem" aria-labelledby={`req-title-${req.id}`}>
                  <div className="card">
                    <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
                      <div style={{ minWidth: 0 }}>
                        <header className="d-flex align-items-start gap-3 mb-2">
                          <div>
                            <h3 id={`req-title-${req.id}`} className="h6 mb-0 text-truncate">{req.title}</h3>
                            <div className="text-muted small">{req.author}</div>
                          </div>
                        </header>

                        <div className="d-flex flex-wrap gap-3 text-muted small">
                          <div><strong>Solicitado:</strong> <span>{formatDate(req.createdAt)}</span></div>
                          {req.updatedAt && <div><strong>Aprobado:</strong> <span>{formatDate(req.updatedAt)}</span></div>}
                        </div>

                        <div className="mt-2">
                          <strong>Motivo:</strong>
                          <div className="text-secondary small">{req.reason}</div>
                        </div>

                        {req.rejectionReason && (
                          <div className="mt-2">
                            <strong>Razón de Rechazo:</strong>
                            <div className="text-danger small">{req.rejectionReason}</div>
                          </div>
                        )}
                      </div>

                      <div className="d-flex flex-column align-items-md-end align-items-start gap-2">
                        <span className={statusClass(req.status)} aria-label={`Estado: ${readableStatus(req.status)}`}>
                          {readableStatus(req.status)}
                        </span>

                        {req.status === "approved" && (
                          <button type="button" className="btn btn-primary" onClick={() => onRead(req)}>
                            <i className="fas fa-book-open me-1" aria-hidden="true" /> Leer Libro
                          </button>
                        )}

                        {req.status === "pending" && (
                          <button type="button" className="btn btn-outline-secondary" disabled>
                            <i className="fas fa-clock me-1" aria-hidden="true" /> En revisión
                          </button>
                        )}

                        {req.status === "rejected" && (
                          <button type="button" className="btn btn-outline-secondary" onClick={() => onRetry(req)}>
                            <i className="fas fa-redo me-1" aria-hidden="true" /> Solicitar nuevamente
                          </button>
                        )}
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
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  requests: PropTypes.arrayOf(PropTypes.object),
  onNavigate: PropTypes.func,
  onRead: PropTypes.func,
  onRetry: PropTypes.func,
};

Profile.defaultProps = {
  user: null,
  requests: [],
  onNavigate: () => {},
  onRead: () => {},
  onRetry: () => {},
};

export default Profile;