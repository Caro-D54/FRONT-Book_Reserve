import React from "react";
import { useAuth} from "../context/AuthContext";
import "./Home.css"; // Archivo de estilos

const Home = ({setCurrentView, searchQuery, setSearchQuery}) => {
  const { user } = useAuth();
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCurrentView('catalog');
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Bienvenido a Nexus Literario</h1>
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Buscar por título, autor o género"
        aria-label="Campo de búsqueda de libros"
        />
      </div>

      {/* Secciones */}
      <div className="sections">
        <div
          className="section tus-libros"
          onClick={() => setCurrentView('profile')}
          aria-label="Ver tus libros"
        >
          <i className="fas fa-book"></i>
          <h3>Tus libros</h3>
        </div>
        <div
        className="section recomendaciones"
        onClick={() => setCurrentView('recommendations')}
        aria-label="Ver recomendaciones"
          >
            <i className="fas fa-star"></i>
            <h3>Recomendaciones</h3>
          </div>
          <div
          className="section generos-mas-leidos"
          onClick={() => setCurrentView('catalog')}
          aria-label="Ver géneros más leídos"
          >
            <h3>Géneros más leídos</h3>
          </div>
        </div>
      </div> 
  );
};

export default Home;