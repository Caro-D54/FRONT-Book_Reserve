import React from "react";

const Header =({user, onNavigate, searchQuery = '', setsearchQuery = () => {}, onLogout = () => {}}) => {
    const handleNav = (e, view) => {
        e.preventDefault();
        if (typeof onNavigate === 'function') onNavigate(view);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onNavigate === 'function') onNavigate('catalog');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark"
            style={{ background: 'linear-gradient(135deg, #0A1931, #1A3C6E)'}}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container">
                <a className="navbar-brand"
                    href="#"
                    onClick={(e) => handleNav(e, 'home')}
                >
                    Nexus Literario
                </a>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target='#navMenu'
                    aria-controls="navMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link"
                                href="#"
                                onClick={(e) => handleNav(e, 'catalog')}
                            >
                                Catálogo
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="#"
                                onClick={(e) => handleNav(e, 'recommendations')}
                            >
                                Recomendaciones
                            </a>
                        </li>
                    </ul>
                    <form className="d-flex me-3" 
                    onSubmit={handleSubmit}
                    role="search"
                    aria-label="Buscar libros">
                        <input className="form-control me-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Buscar libros"
                            value={searchQuery}
                            onChange={(e) => typeof setsearchQuery === 'function' && setsearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-light"
                            type="submit"
                        >
                            Buscar
                        </button>
                    </form>
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                            <span className="text-light me-3"
                                aria-live="polite"
                            >
                                Hola, {user.name}
                            </span>
                            <button className="btn btn-outline-light"
                                type="button"
                                onClick={() => {
                                    if (typeof onLogout === 'function') onLogout();
                                    if (typeof onNavigate === 'function') onNavigate('home');
                                }}
                            >
                                Cerrar sesión
                            </button>
                            </>
                        ) : (
                            <>
                            <button 
                            type="button"
                            className="btn btn-outline-light me-2"
                            onClick={() => typeof onNavigate === 'function' && onNavigate('login')}
                            >
                                Iniciar sesión
                            </button>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => typeof onNavigate === 'function' && onNavigate('register')}
                            >
                                Registrarse
                            </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;