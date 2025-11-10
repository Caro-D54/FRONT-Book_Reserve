import React from "react";
import "./Library.css";
import iconSearch from "../assets/buscar.png";
import iconPdf from "../assets/documento.png";
import iconTasks from "../assets/gestion-de-proyectos.png";
import iconStar from "../assets/estrella.png";

const items = [
  { icon: iconSearch, title: "Búsqueda Avanzada", description: "Encuentra títulos por autor, género o palabra clave de manera rápida." },
  { icon: iconPdf, title: "Solicitud de Acceso", description: "Pide permisos para leer los archivos PDF directamente en la plataforma." },
  { icon: iconTasks, title: "Gestión de Solicitudes", description: "Revisa y administra todos los libros que has solicitado en tu perfil personal." },
  { icon: iconStar, title: "Recomendaciones", description: "Descubre nuevas lecturas según tus intereses y hábitos de lectura." },
];
const Recommendations = () => {
  return (
    <section className="features py-5" aria-labelledby="features-heading">
      <div className="container">
        <div className="section-title">
          <h2 id="features-heading">Funciones Principales</h2>
          <p className="text-muted">Descubre todo lo que nuestra biblioteca virtual tiene para ofrecerte</p>
        </div>

        <div className="features-list">
          {items.map((it, i) => (
            <article className="feature-item" key={i} role="listitem" aria-label={it.title}>
              <div className="feature-icon-wrap" aria-hidden>
                <img src={it.icon} alt="" className="feature-img" draggable="false"/>
              </div>
              <div className="feature-body">
                <h3 className="feature-title">
                  {it.title}
                </h3>
                <p className="feature-desc text-muted">
                  {it.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;