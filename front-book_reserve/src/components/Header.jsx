import React from 'react';
import './Library.css';

const Header = (
  {user, onNavigate = () => {}, 
  onLogout = () => {}, 
  searchQuery = '', setsearchQuery = () => {}}) => {
    return (
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo" role='banner'>
              <i className="fas fa-book-open" aria-hidden="true"/>
              <h1 className='mb-0'>Nexus Literario</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <button className="btn btn-link text-decoration-none text-reset" onClick={() => onNavigate('home')}>
                    Inicio
                  </button>
                </li>
                <li>
                  <button className='btn btn-link text-decoration-none text-reset' onClick={() => onNavigate('catalog')}>
                    Catálogo
                  </button>
                </li>
                <li>
                  <button className='btn btn-link text-decoration-none text-reset' onClick={() => onNavigate('profile')}>
                    Mi Perfil
                  </button>
                </li>
                <li>
                  <button className='btn btn-link text-decoration-none text-reset' onClick={() => onNavigate('recommendations')}>
                    Ayuda
                  </button>
                </li>
              </ul>
            </nav>
            <div className="user-actions">
              <input 
              value={searchQuery} 
              onChange={(e) => setsearchQuery(e.target.value)} 
              className='form-control me-2' 
              style={{maxWidth: 220}}
              placeholder='Buscar...'
              />
              {user ? (
                <>
                  <span className='text-light me-2'>
                    {user.name}
                  </span>
                </>
              ) : (
                <>
                  <button 
                    className='btn btn-outline'
                    onClick={() => onNavigate('login')}>
                      Iniciar Sesión
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => onNavigate('register')}>
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