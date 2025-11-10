import React from "react";
import "./Library.css";
import logo from "../assets/Logo_3d.png";

const Header = ({ user, onNavigate = () => {}, onLogout = () => {}, searchQuery = "", setSearchQuery = () => {} }) => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo" role="banner">
            <i className="fas fa-book-open" aria-hidden="true" />
            <img src={logo} alt="Logo de Nexus Literario" style={{ width: "50px" }} />
            <h1 className="mb-0">Nexus Literario</h1>
          </div>

          <nav aria-label="Main navigation">
            <ul>
              <li><button className="btn btn-link text-decoration-none text-reset" onClick={() => onNavigate("home")}>Inicio</button></li>
              <li><button className="btn btn-link text-decoration-none text-reset" onClick={() => onNavigate("catalog")}>Catálogo</button></li>
              <li><button className="btn btn-link text-decoration-none text-reset" onClick={() => onNavigate("profile")}>Mi Perfil</button></li>
              <li><button className="btn btn-link text-decoration-none text-reset" onClick={() => onNavigate("help")}>Ayuda</button></li>
            </ul>
          </nav>

          <div className="user-actions">
            {/*<input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              placeholder="Buscar por título, autor o género..."
              aria-label="Buscar"
            />*/}
            {user ? (
              <>
                <span className="text-muted ms-2">{user.name}</span>
                <button className="btn btn-outline ms-2" onClick={() => { onLogout(); }}>Salir</button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => onNavigate("login")}>Iniciar Sesión</button>
                <button className="btn btn-primary" onClick={() => onNavigate("register")}>Registrarse</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;