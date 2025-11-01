import React from "react";
import "./Header.css";

const Header =({user, setUser, currentView, setCurrentView}) => {
    const handleLogin = () => {
        setUser({
            name: "Usuario Demo",
            email: "usuario@demo.com"
        });
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-book-open"></i>
                        <h1>Nexus Literario</h1>
                    </div>

                    <nav className="nav">
                        <button
                        className={"nav-btn ${currentView === 'home' ? 'active' : ''}"}
                        onClick={() => setCurrentView('home')}
                        >Inicio</button>
                        <button
                        className={"nav-btn ${currentView === 'catalog' ? 'active' : ''}"}
                        onClick={() => setCurrentView('catalog')}
                        >Catálogo</button>
                        </nav>

                        <div className="auth-buttons">
                            {user ? (
                                <div className="user-menu">
                                    <span>Hola, {user.name}</span>
                                    <button className="btn btn-outline" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </div>
                                ) : (
                                <button className="btn btn-primary" onClick={handleLogin}>
                                    <i className="fas fa-user"></i> Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    };

export default Header;
            
                            