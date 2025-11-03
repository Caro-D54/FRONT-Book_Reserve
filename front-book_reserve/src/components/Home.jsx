import React from "react";
import { AuthContext} from "../context/AuthContext";
import "./Home.css"; // Archivo de estilos

const Home = ({setCurrentView}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const safeSetView = (v) => typeof setCurrentView === 'function' && setCurrentView(v);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      safeSetView('catalog');
    }
  };

  return (
    <div className="home-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" 
        aria-label="Buscar títulos, autores o géneros"
        placeholder="Busca tus títulos..." 
        value={query}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKey}
        onClick={() => safeSetView('catalog')}
        />
      </div>

      {/* Título */}
      <h1 className="title">NEXUS LITERARIO</h1>

      {/* Mensaje de bienvenida */}
      <div className="Bienvenido/a">
        <p>Bienvenido/a {user?.name ? `, ${user.name}` : ''}</p>
      </div>

      {/* Secciones */}
      <div className="sections">
        <button
          type="button"
          className="section tus-libros"
          onClick={() => safeSetView('catalog')}
        >
          Tus Libros
        </button>
        <button
          type="button"
          className="section historial-lecturas"
          onClick={() => safeSetView('profile')}
        >
          Historial de Lecturas
        </button>

        <div className="section-group">
          <button
            type="button"
            className="section recomendaciones"
            onClick={() => safeSetView('recommendations')}
          >
            Recomendaciones
          </button>
          <button
            type="button"
            className="section generos-mas-leidos"
            onClick={() => safeSetView('genres')}
          >
            Géneros Más leídos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;