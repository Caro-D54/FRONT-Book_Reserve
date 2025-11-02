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
      description: "Novela que revolucionó la narrativa hispanoamericana con su estructura no lineal y múltiples finales.",
      reason: "Basado en tu interés por la literatura innovadora",
      match: 95
    },
    {
      id: 2,
      title: "Crónica de una Muerte Anunciada",
      author: "Gabriel García Márquez",
      genre: "Realismo Mágico",
      cover: "⚰️",
      description: "Novela basada en un hecho real que relata el asesinato de Santiago Nasar desde múltiples perspectivas.",
      reason: "Porque disfrutaste 'Cien Años de Soledad'",
      match: 88
    },
    {
      id: 3,
      title: "El Túnel",
      author: "Ernesto Sabato",
      genre: "Novela Psicológica",
      cover: "🚇",
      description: "Profundo análisis psicológico de un pintor obsesionado con una mujer que culmina en tragedia.",
      reason: "Para explorar narrativas psicológicas intensas",
      match: 82
    },
    {
      id: 4,
      title: "Los Detectives Salvajes",
      author: "Roberto Bolaño",
      genre: "Literatura Contemporánea",
      cover: "🕵️",
      description: "Episodios de la vida de dos poetas que buscan a una misteriosa escritora desaparecida.",
      reason: "Amplía tu conocimiento de autores latinoamericanos",
      match: 79
    },
    {
      id: 5,
      title: "La Casa de los Espíritus",
      author: "Isabel Allende",
      genre: "Realismo Mágico",
      cover: "🏠",
      description: "Saga familiar que abarca cuatro generaciones en un país latinoamericano sin nombre.",
      reason: "Similar al realismo mágico que prefieres",
      match: 76
    },
    {
      id: 6,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Ciencia Ficción",
      cover: "🔥",
      description: "Distopía sobre una sociedad futura donde los libros están prohibidos y son quemados.",
      reason: "Complementa tu lectura de '1984'",
      match: 85
    }
  ];

  const sampleGenres = [
    { name: "Realismo Mágico", count: 24, trend: "up" },
    { name: "Ciencia Ficción", count: 18, trend: "up" },
    { name: "Literatura Contemporánea", count: 15, trend: "stable" },
    { name: "Novela Psicológica", count: 12, trend: "up" },
    { name: "Distopía", count: 10, trend: "stable" },
    { name: "Romance", count: 8, trend: "down" }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setRecommendations(sampleRecommendations);
      setPopularGenres(sampleGenres);
      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'fas fa-arrow-up trend-up';
      case 'down':
        return 'fas fa-arrow-down trend-down';
      default:
        return 'fas fa-minus trend-stable';
    }
  };

  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="container">
          <div className="loading">
            <i className="fas fa-book-open fa-spin"></i>
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
          <div className="recommendations-main">
            <h2>
              <i className="fas fa-star"></i>
              Libros Recomendados
            </h2>
            
            <div className="recommendations-grid">
              {recommendations.map(book => (
                <div key={book.id} className="recommendation-card">
                  <div className="recommendation-badge">
                    <span className="match-score">{book.match}%</span>
                    <span className="match-text">de coincidencia</span>
                  </div>
                  
                  <div className="book-content">
                    <div className="book-cover">{book.cover}</div>
                    <div className="book-details">
                      <h3>{book.title}</h3>
                      <p className="book-author">{book.author}</p>
                      <p className="book-genre">{book.genre}</p>
                      <p className="book-description">{book.description}</p>
                      <p className="recommendation-reason">
                        <i className="fas fa-lightbulb"></i>
                        {book.reason}
                      </p>
                    </div>
                  </div>
                  
                  <div className="book-actions">
                    <button className="btn btn-primary">
                      <i className="fas fa-file-pdf"></i>
                      Solicitar Acceso
                    </button>
                    <button className="btn btn-outline">
                      <i className="fas fa-bookmark"></i>
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Géneros populares */}
          <div className="recommendations-sidebar">
            <div className="sidebar-section">
              <h3>
                <i className="fas fa-chart-line"></i>
                Géneros Populares
              </h3>
              <div className="genres-list">
                {popularGenres.map((genre, index) => (
                  <div key={genre.name} className="genre-item">
                    <div className="genre-info">
                      <span className="genre-rank">#{index + 1}</span>
                      <span className="genre-name">{genre.name}</span>
                      <i className={getTrendIcon(genre.trend)}></i>
                    </div>
                    <span className="genre-count">{genre.count} libros</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>
                <i className="fas fa-trophy"></i>
                Tus Estadísticas
              </h3>
              <div className="user-stats">
                <div className="stat-item">
                  <i className="fas fa-book"></i>
                  <div>
                    <strong>5</strong>
                    <span>Libros leídos este mes</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>12h</strong>
                    <span>Tiempo de lectura</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>3</strong>
                    <span>Géneros favoritos</span>
                  </div>
                </div>
              </div>
            </div>

            {!user && (
              <div className="sidebar-section login-prompt">
                <i className="fas fa-user-plus"></i>
                <h4>¿Aún no tienes cuenta?</h4>
                <p>Regístrate para recibir recomendaciones personalizadas basadas en tus lecturas.</p>
                <button className="btn btn-primary">
                  Crear Cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;