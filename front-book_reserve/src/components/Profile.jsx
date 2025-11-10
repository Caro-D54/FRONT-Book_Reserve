import React from "react";
import "./Library.css";

const Profile = ({ user = null, onNavigate = () => {} }) => {
  if (!user) {
    return (
      <section className="profile py-5">
        <div className="container">
          <div className="alert alert-info">
            <h4>Acceso requerido</h4>
            <p>Por favor inicia sesión para ver tu perfil.</p>
            <button className="btn btn-primary" onClick={() => onNavigate("login")}>Iniciar sesión</button>
          </div>
        </div>
      </section>
    );
  }

  // ejemplo de solicitudes ficticias
  const requests = [
    { id: "r1", title: "Cien Años de Soledad", status: "approved", createdAt: new Date().toISOString() },
    { id: "r2", title: "1984", status: "pending", createdAt: new Date().toISOString() },
  ];

  return (
    <section className="profile py-4">
      <div className="container">
        <div className="profile-container">
          <aside className="profile-sidebar">
            <div className="user-info text-center">
              <div className="user-avatar"> {user.name ? user.name.charAt(0).toUpperCase() : "U"} </div>
              <h5 className="mt-2">{user.name}</h5>
              <p className="text-muted">{user.email}</p>
            </div>

            <nav className="profile-nav">
              <ul>
                <li><button className="btn btn-link" onClick={() => onNavigate("profile")}>Mis Solicitudes</button></li>
                <li><button className="btn btn-link" onClick={() => onNavigate("catalog")}>Ir al Catálogo</button></li>
              </ul>
            </nav>
          </aside>

          <div className="profile-content">
            <h4>Mis Solicitudes</h4>
            <div className="mt-3">
              {requests.map((r) => (
                <div key={r.id} className="card request-card mb-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{r.title}</strong>
                      <div className="text-muted small">Solicitado: {new Date(r.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className={`status ${r.status === "pending" ? "status-pending" : r.status === "approved" ? "status-approved" : "status-rejected"}`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;