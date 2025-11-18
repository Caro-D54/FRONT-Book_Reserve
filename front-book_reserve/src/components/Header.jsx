// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Library.css";
import logo from "../assets/Logo_3d.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
              <li>
                <button className="btn btn-link text-decoration-none text-reset" onClick={() => navigate("/")}>
                  Inicio
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none text-reset" onClick={() => navigate("/catalog")}>
                  Catálogo
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none text-reset" onClick={() => navigate("/profile")}>
                  Mi Perfil
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none text-reset" onClick={() => navigate("/recommendations")}>
                  Ayuda
                </button>
              </li>
            </ul>
          </nav>

          <div className="user-actions">
            {user ? (
              <>
                <span className="text-muted ms-2">{user.name}</span>
                <button className="btn btn-outline ms-2" onClick={logout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => navigate("/login")}>
                  Iniciar Sesión
                </button>
                <button className="btn btn-primary" onClick={() => navigate("/register")}>
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
