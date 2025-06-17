import React from "react";
import "./Home.css"; // Archivo de estilos

const Home = () => {
  return (
    <div className="home-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Busca tus títulos..." />
      </div>

      {/* Título */}
      <h1 className="title">NEXUS LITERARIO</h1>

      {/* Secciones */}
      <div className="sections">
        <div className="section tus-libros">Tus Libros</div>
        <div className="section historial-lecturas">Historial de Lecturas</div>
        <div className="section-group">
          <div className="section recomendaciones">Recomendaciones</div>
          <div className="section generos-mas-leidos">Géneros Más Leídos</div>
        </div>
      </div>
    </div>
  );
};

export default Home;