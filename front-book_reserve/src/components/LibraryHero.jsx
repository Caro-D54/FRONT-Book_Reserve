import React from "react";
import bg from "../assets/Library_books.jpg";
import "./Library.css";

const LibraryHero = ({ searchQuery = "", setSearchQuery = () => {}, onSearch = null }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") onSearch(searchQuery);
    // otherwise parent uses searchQuery directly
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(5,10,48,0.85), rgba(5,10,48,0.9)), url(${bg})`,
    }}
    >
      <div className="container">
        <h2>Biblioteca Virtual Nexus Literario</h2>
        <p>Conéctate con el conocimiento y disfruta de la lectura desde cualquier lugar.</p>

        <form className="search-bar" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por título, autor o género..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar libros"
          />
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>
    </section>
  );
};

export default LibraryHero;