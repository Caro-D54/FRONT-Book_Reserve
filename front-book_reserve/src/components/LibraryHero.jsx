// src/components/LibraryHero.jsx
import React from "react";
import "./Library.css";
import booksBg from "../assets/Library_books.jpg";

const LibraryHero = ({ children }) => (
  <section className="library-hero" style={{ ["--bg-url"]: `url(${booksBg})` }}>
    <div className="library-inner container">
      <header className="library-header">
        <h1 className="brand">Biblioteca Virtual Nexus Literario</h1>
        <p className="tagline">Conéctate con el conocimiento y disfruta de la lectura desde cualquier lugar</p>
      </header>

      <div className="hero-search">
        <input className="form-control search-input" placeholder="Buscar por título, autor o género..." aria-label="Buscar libros"/>
        <button className="btn btn-primary search-btn">Buscar</button>
      </div>

      <div className="library-content">{children}</div>
    </div>
  </section>
);

export default LibraryHero;