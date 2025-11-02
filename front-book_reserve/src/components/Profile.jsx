import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  const [userRequests, setUserRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("requests");

  // Datos de ejemplo para solicitudes
  const sampleRequests = [
    {
      id: 1,
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      cover: "📖",
      description:
        "Una obra maestra del realismo mágico que relata la historia de la familia Buendía.",
      status: "approved",
      authorId: 1,
      createdAt: "2023-03-01T00:00:00.000Z",
      updatedAt: "2023-03-01T00:00:00.000Z",
      reason: "Interés personal",
      approvedDate: "2023-03-02T00:00:00.000Z"
    }
  ];

  useEffect(() => {
    if (user) {
      setUserRequests(sampleRequests);
    } else {
      setUserRequests([]);
    }
  }, [user]);

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Aprobado";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazado";
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  // Si la pestaña es 'requests' mostramos todas; si es 'approved'/'pending'/'rejected' filtramos
  const filteredRequests = userRequests.filter((request) => {
    if (activeTab === "requests") return true;
    return request.status === activeTab;
  });

  if (!user) {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="not-logged-in">
            <i className="fas fa-user-lock" aria-hidden="true"></i>
            <h2>Acceso Requerido</h2>
            <p>Por favor inicia sesión para acceder a tu perfil</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container">
        {/* Header del perfil */}
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user" aria-hidden="true"></i>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">
                  {userRequests.filter((r) => r.status === "approved").length}
                </span>
                <span className="stat-label">Libros Aprobados</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {userRequests.filter((r) => r.status === "pending").length}
                </span>
                <span className="stat-label">Solicitudes Pendientes</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userRequests.length}</span>
                <span className="stat-label">Total de Solicitudes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
            aria-pressed={activeTab === "requests"}
          >
            <i className="fas fa-list" aria-hidden="true"></i>
            Todas las Solicitudes
          </button>
          <button
            className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
            aria-pressed={activeTab === "approved"}
          >
            <i className="fas fa-check-circle" aria-hidden="true"></i>
            Aprobadas
          </button>
          <button
            className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
            aria-pressed={activeTab === "pending"}
          >
            <i className="fas fa-clock" aria-hidden="true"></i>
            Pendientes
          </button>
          <button
            className={`tab-btn ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => setActiveTab("rejected")}
            aria-pressed={activeTab === "rejected"}
          >
            <i className="fas fa-times-circle" aria-hidden="true"></i>
            Rechazadas
          </button>
        </div>

        {/* Lista de solicitudes */}
        <div className="requests-section">
          <h2>Mis Solicitudes de Lectura</h2>
          {filteredRequests.length === 0 ? (
            <div className="no-requests">
              <i className="fas fa-inbox" aria-hidden="true"></i>
              <h3>
                No hay solicitudes{" "}
                {activeTab !== "requests"
                  ? `${getStatusText(activeTab).toLowerCase()}s`
                  : ""}
              </h3>
              <p>
                {activeTab === "requests"
                  ? "Aún no has realizado ninguna solicitud de lectura"
                  : `No tienes solicitudes ${getStatusText(activeTab).toLowerCase()}s en este momento`}
              </p>
            </div>
          ) : (
            <div className="requests-grid">
              {filteredRequests.map((request) => {
                const requestedDate =
                  request.date || request.createdAt || request.created_at;
                const approvedDate =
                  request.approvedDate || request.approveDate || request.updatedAt;

                return (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.title}</h3>
                      <span className={`status-badge ${getStatusClass(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>

                    <p className="request-author">{request.author}</p>

                    <div className="request-details">
                      <div className="detail">
                        <strong>Solicitado:</strong>
                        <span>
                          {requestedDate
                            ? new Date(requestedDate).toLocaleDateString("es-ES")
                            : "—"}
                        </span>
                      </div>

                      {approvedDate && (
                        <div className="detail">
                          <strong>Aprobado:</strong>
                          <span>{new Date(approvedDate).toLocaleDateString("es-ES")}</span>
                        </div>
                      )}

                      <div className="detail">
                        <strong>Motivo:</strong>
                        <span>{request.reason || request.description || "—"}</span>
                      </div>

                      {request.rejectionReason && (
                        <div className="detail">
                          <strong>Razón de Rechazo:</strong>
                          <span className="rejection-reason">{request.rejectionReason}</span>
                        </div>
                      )}
                    </div>

                    {request.status === "approved" && (
                      <button className="btn btn-primary read-btn" aria-label="Leer libro">
                        <i className="fas fa-book-open" aria-hidden="true"></i>
                        Leer Libro
                      </button>
                    )}

                    {request.status === "pending" && (
                      <button className="btn btn-outline" disabled aria-label="En revisión">
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        En Revisión
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;