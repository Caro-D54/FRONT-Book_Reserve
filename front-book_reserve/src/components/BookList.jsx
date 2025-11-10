import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "./Library.css";

const BookList = ({ user = null, searchQuery = "" }) => {
  const sample = [
    { id: 1, title: "Cien Años de Soledad", author: "Gabriel García Márquez", generos: "Ficción", year: 1967 },
    { id: 2, title: "1984", author: "George Orwell", generos: "Ciencia Ficción", year: 1949 },
    { id: 3, title: "El Principito", author: "Antoine de Saint-Exupéry", generos: "Infantil", year: 1943 },
  ];

  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState("Todos");

  useEffect(() => {
    // Carga inicial (reemplaza por fetch real)
    setBooks(sample);
  }, []);

  useEffect(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    let res = books.slice();

    if (q) {
      res = res.filter((b) => (b.title || "").toLowerCase().includes(q) || (b.author || "").toLowerCase().includes(q) || (b.generos || "").toLowerCase().includes(q));
    }

    if (genre && genre !== "Todos") {
      res = res.filter((b) => (b.generos || "") === genre);
    }

    setFiltered(res);
  }, [books, searchQuery, genre]);

  const handleRequest = (book) => {
    if (!user) {
      alert("Debes iniciar sesión para solicitar acceso.");
      return;
    }
    alert(`Solicitud enviada para "${book.title}"`);
  };

  return (
    <section className="books py-4">
      <div className="container">
        <div className="section-title mb-3">
          <h2>Catálogo de Libros</h2>
          <p>Explora nuestra colección</p>
        </div>

        <div className="filter-bar mb-3 d-flex justify-content-between align-items-center">
          <div className="filter-options d-flex align-items-center">
            <select className="form-select filter-select" value={genre} onChange={(e) => setGenre(e.target.value)} style={{ maxWidth: 220 }}>
              <option>Todos</option>
              <option>Ficción</option>
              <option>Ciencia Ficción</option>
              <option>Infantil</option>
            </select>
          </div>

          <div className="results-count text-muted">
            {filtered.length} libro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="row g-4 books-grid">
          {filtered.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">
              <h4>No se encontraron libros</h4>
              <p>Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            filtered.map((b) => (
              <div className="col-12 col-sm-6 col-md-4" key={b.id}>
                <BookCard book={b} onRequest={handleRequest} onView={() => {}} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BookList;