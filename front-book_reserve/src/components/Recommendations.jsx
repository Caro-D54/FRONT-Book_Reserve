import React from "react";
import "./Library.css";

const Recommendations = () => {
  const items = [
    { icon: "fas fa-search", title: "Búsqueda Avanzada", description: "Encuentra títulos por autor, género o palabra clave de manera rápida." },
    { icon: "fas fa-file-pdf", title: "Solicitud de Acceso", description: "Pide permisos para leer los archivos PDF directamente en la plataforma." },
    { icon: "fas fa-tasks", title: "Gestión de Solicitudes", description: "Revisa y administra todos los libros que has solicitado en tu perfil personal." },
    { icon: "fas fa-star", title: "Recomendaciones", description: "Descubre nuevas lecturas según tus intereses y hábitos de lectura." },
  ];

  return (
    <section className="features py-5">
      <div className="container">
        <div className="section-title">
          <h2>Funciones Principales</h2>
          <p className="text-muted">Descubre todo lo que nuestra biblioteca virtual tiene para ofrecerte</p>
        </div>

        <div className="row g-4 features-grid">
          {items.map((it, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={i}>
              <div className="card h-100 feature-card">
                <div className="card-body">
                  <div className="feature-icon mb-2"><i className={it.icon} aria-hidden="true" /></div>
                  <h3 className="h6">{it.title}</h3>
                  <p className="text-muted small mb-0">{it.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;