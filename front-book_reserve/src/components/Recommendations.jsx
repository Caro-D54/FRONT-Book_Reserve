import React from "react";
import './Library.css'; // opcional: overrides

const Recommendations = ({ features = null }) => {
  const defaultFeatures = [
    {
      icon: "fas fa-search",
      title: "Búsqueda Avanzada",
      description: "Encuentra títulos por género, autor o palabras clave de manera rápida.",
    },
    {
      icon: "fas fa-file-pdf",
      title: "Solicitud de Acceso",
      description: "Pide permiso para leer los archivos PDF directamente en nuestra plataforma.",
    },
    {
      icon: "fas fa-tasks",
      title: "Gestión de Solicitudes",
      description: "Revisa y administra todos los libros que has solicitado en tu perfil personal.",
    },
    {
      icon: "fas fa-star",
      title: "Recomendaciones",
      description: "Descubre nuevas lecturas según tus intereses y hábitos de lectura.",
    },
  ];

  const list = Array.isArray(features) && features.length ? features : defaultFeatures;

  return (
    <section className="features py-5">
      <div className="container">
        <div className="section-title text-center mb-4">
          <h2>Funciones Principales</h2>
          <p className="text-muted">Descubre todo lo que nuestra biblioteca virtual tiene para ofrecerte</p>
        </div>

        <div className="row g-4 features-grid">
          {list.map((f, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 feature-card">
                <div className="card-body d-flex flex-column align-items-start">
                  <div className="feature-icon mb-3">
                    <i className={`${f.icon} fa-2x text-primary`} aria-hidden="true"/>
                  </div>
                  <h3 className="h6">{f.title}</h3>
                  <p className="card-text text-muted mb-0">{f.description}</p>
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