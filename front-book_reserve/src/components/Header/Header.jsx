import React from "react";
import { useAuth} from "../../context/AuthContext";
import './Header.css';

const Header = () => {
    const { isAuthenticated, user, login,logout } = useAuth();

    const handleLogin = () => {
        login({ username: "admin", password: "1234" });
    };


    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-book-open"></i>
                        <h1>Nexus Literario</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="#inicio" className="active">Inicio</a></li>
                            <li><a href="#catalogo">Catálogo</a></li>
                            <li><a href="#perfil">Mi Perfil</a></li>
                        </ul>
                    </nav>
                    <div className="user-actions">
                        {isAuthenticated ? (
                            <>
                             <span>Hola, {user?.name}</span>
                             <button className="btn btn-outline" onClick={logout}>
                                Cerrar Sesión
                             </button>
                            </>
                        ) : (
                          <>
                            <button className="btn btn-outline" onClick={handleLogin}>
                                Iniciar Sesión
                            </button>
                            <button className="btn btn-primary">
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
