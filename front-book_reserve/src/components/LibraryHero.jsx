import React, { useState } from 'react';
import "./LibraryHero.css";

const LibraryHero = ({onSearch = () => {}}) => {
  const [searchTerm, setsearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    console.log('Buscando:', searchTerm);
  };

  return (
    <section className="library-hero py-5">
      <div className="container">
        <div className='row align-items-center'>
          <div className='col-lg-7 text-lg-start text-center mb-4 mb-lg-0'>
            <h1 className='display-5 fw-bold text-white'>
              Biblioteca Virtual Nexus Literario
            </h1>
            <p className='lead text-white-50'>
              Disfruta de tu lectura en cualquier lugar.
            </p>
          </div>
          <div className='col-lg-5'>
            <form className='input-group shadow-sm' role='search' onSubmit={handleSubmit}>
              <input
              type='search'
              className='form-control form-control-lg'
              placeholder='Buscar por título, autor o género...'
              aria-label='Buscar libros por título, autor o género'
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              />
              <button 
              className='btn btn-primary btn-lg'
              type='submit'
              aria-label='Buscar libros'
              >
                Buscar
              </button>
            </form>
            <div className='d-flex gap-2 mt-3 justify-content-center justify-content-lg-start'>
              <button type='button' className='btn btn-outline-light'>
                Iniciar Sesión
              </button>
              <button type='button' className='btn btn-light text-dark'>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibraryHero;