import React from "react";
import './Header.css';

const Header = () => {
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
                            <li><a href="#" className="active">Inicio</a></li>
                            <li><a href="#catalogo">Catálogo</a></li>
                            <li><a href="#perfil">Mi Perfil</a></li>
                            <li><a href="#ayuda">Ayuda</a></li>
                        </ul>
                    </nav>
                    <div className="user-actions">
                        <button className="btn btn-outline" id="loginBtn">Iniciar Sesió</button>
                        <button className="btn btn-primary" id="registerBtn">Registrarse</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
