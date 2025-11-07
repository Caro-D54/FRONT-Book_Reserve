import React, { useState, useEffect } from "react";
import "./Recommendations.css";

const Recommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [popularGenres, setPopularGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para recomendaciones
  const sampleRecommendations = [
    {
      id: 1,
      title: "Rayuela",
      author: "Julio Cortázar",
      genre: "Literatura Contemporánea",
      cover: "🔀",
      description:
        "Novela que revolucionó la narrativa hispanoamericana con su estructura no lineal y múltiples finales.",
      reason: "Basado en tu interés por la literatura innovadora",
      match: 95,
    },
    {
      id: 2,
      title: "Crónica de una Muerte Anunciada",
      author: "Gabriel García Márquez",
      genre: "Realismo Mágico",
      cover: "⚰️",
      description:
        "Novela basada en un hecho real que relata el asesinato de Santiago Nasar desde múltiples perspectivas.",
      reason: "Porque disfrutaste 'Cien Años de Soledad'",
      match: 88,
    },
    {
      id: 3,
      title: "El Túnel",
      author: "Ernesto Sabato",
      genre: "Novela Psicológica",
      cover: "🚇",
      description:
        "Profundo análisis psicológico de un pintor obsesionado con una mujer que culmina en tragedia.",
      reason: "Para explorar narrativas psicológicas intensas",
      match: 82,
    },
    {
      id: 4,
      title: "Los Detectives Salvajes",
      author: "Roberto Bolaño",
      genre: "Literatura Contemporánea",
      cover: "🕵️",
      description:
        "Episodios de la vida de dos poetas que buscan a una misteriosa escritora desaparecida.",
      reason: "Amplía tu conocimiento de autores latinoamericanos",
      match: 79,
    },
    {
      id: 5,
      title: "La Casa de los Espíritus",
      author: "Isabel Allende",
      genre: "Realismo Mágico",
      cover: "🏠",
      description:
        "Saga familiar que abarca cuatro generaciones en un país latinoamericano sin nombre.",
      reason: "Similar al realismo mágico que prefieres",
      match: 76,
    },
    {
      id: 6,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Ciencia Ficción",
      cover: "🔥",
      description:
        "Distopía sobre una sociedad futura donde los libros están prohibidos y son quemados.",
      reason: "Complementa tu lectura de '1984'",
      match: 85,
    },
  ];

  const sampleGenres = [
    { name: "Realismo Mágico", count: 24, trend: "up" },
    { name: "Ciencia Ficción", count: 18, trend: "up" },
    { name: "Literatura Contemporánea", count: 15, trend: "stable" },
    { name: "Novela Psicológica", count: 12, trend: "up" },
    { name: "Distopía", count: 10, trend: "stable" },
    { name: "Romance", count: 8, trend: "down" },
  ];

  useEffect(() => {
    // Simular carga de datos; guardamos el id del timeout para limpiarlo si se desmonta
    const t = setTimeout(() => {
      setRecommendations(sampleRecommendations);
      setPopularGenres(sampleGenres);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  const getTrendIcon = (trend) => {
    // Devuelve objeto con clase y texto para accesibilidad
    switch (trend) {
      case "up":
        return { className: "fas fa-arrow-up trend-up", title: "tendencia en alza" };
      case "down":
        return { className: "fas fa-arrow-down trend-down", title: "tendencia a la baja" };
      default:
        return { className: "fas fa-minus trend-stable", title: "tendencia estable" };
    }
  };

  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="container">
          <div className="loading" role="status" aria-live="polite">
            <i className="fas fa-book-open fa-spin" aria-hidden="true"></i>
            <h3>Buscando recomendaciones para ti...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="container">
        <div className="recommendations-header">
          <h1>Recomendaciones para Ti</h1>
          <p>Descubre libros seleccionados especialmente según tus intereses y lecturas anteriores</p>
        </div>

        <div className="recommendations-layout">
          {/* Columna principal - Recomendaciones */}
          <main className="recommendations-main" role="main">
            <h2>
              <i className="fas fa-star" aria-hidden="true"></i> Libros Recomendados
            </h2>

            <div className="recommendations-grid" role="list">
              {(recommendations || []).map((book) => (
                <article key={book.id} className="recommendation-card" role="listitem" aria-labelledby={`rec-title-${book.id}`}>
                  <div className="recommendation-badge" aria-hidden>
                    <span className="match-score">{book.match}%</span>
                    <span className="match-text">de coincidencia</span>
                  </div>

                  <div className="book-content">
                    <div className="book-cover" aria-hidden>
                      {book.cover}
                    </div>

                    <div className="book-details">
                      <h3 id={`rec-title-${book.id}`}>{book.title}</h3>
                      <p className="book-author">{book.author}</p>
                      <p className="book-genre">{book.genre}</p>
                      <p className="book-description">{book.description}</p>
                      <p className="recommendation-reason">
                        <i className="fas fa-lightbulb" aria-hidden="true"></i> {book.reason}
                      </p>
                    </div>
                  </div>

                  <div className="book-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (!user) {
                          // Mejor reemplazar por un modal o toast en producción
                          alert("Inicia sesión para solicitar acceso");
                          return;
                        }
                        alert(`Solicitud enviada para "${book.title}" (simulado).`);
                      }}
                      disabled={!user}
                      aria-label={user ? `Solicitar acceso a ${book.title}` : "Inicia sesión para solicitar acceso"}
                      title={user ? `Solicitar acceso a ${book.title}` : "Inicia sesión para solicitar acceso"}
                    >
                      <i className="fas fa-file-pdf" aria-hidden="true"></i> Solicitar Acceso
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => alert(`Guardado "${book.title}" (simulado).`)}
                      aria-label={`Guardar ${book.title}`}
                      title="Guardar"
                    >
                      <i className="fas fa-bookmark" aria-hidden="true"></i> Guardar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {/* Sidebar - Géneros populares */}
          <aside className="recommendations-sidebar" aria-labelledby="sidebar-title">
            <div className="sidebar-section">
              <h3 id="sidebar-title">
                <i className="fas fa-chart-line" aria-hidden="true"></i> Géneros Populares
              </h3>

              <div className="genres-list" role="list">
                {(popularGenres || []).map((genre, index) => {
                  const icon = getTrendIcon(genre.trend);
                  return (
                    <div key={genre.name} className="genre-item" role="listitem" aria-label={`${genre.name}, ${genre.count} libros, ${icon.title}`}>
                      <div className="genre-info">
                        <span className="genre-rank">#{index + 1}</span>
                        <span className="genre-name">{genre.name}</span>
                        <i className={icon.className} title={icon.title} aria-hidden="true"></i>
                      </div>
                      <span className="genre-count">{genre.count} libros</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>
                <i className="fas fa-trophy" aria-hidden="true"></i> Tus Estadísticas
              </h3>
              <div className="user-stats" role="group" aria-label="Estadísticas de usuario">
                <div className="stat-item">
                  <i className="fas fa-book" aria-hidden="true"></i>
                  <div>
                    <strong>5</strong>
                    <span>Libros leídos este mes</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-clock" aria-hidden="true"></i>
                  <div>
                    <strong>12h</strong>
                    <span>Tiempo de lectura</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-star" aria-hidden="true"></i>
                  <div>
                    <strong>3</strong>
                    <span>Géneros favoritos</span>
                  </div>
                </div>
              </div>
            </div>

            {!user && (
              <div className="sidebar-section login-prompt" role="region" aria-live="polite">
                <i className="fas fa-user-plus" aria-hidden="true"></i>
                <h4>¿Aún no tienes cuenta?</h4>
                <p>Regístrate para recibir recomendaciones personalizadas basadas en tus lecturas.</p>
                <button type="button" className="btn btn-primary" onClick={() => alert("Ir a registro (simulado)")}>
                  Crear Cuenta
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;