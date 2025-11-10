import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "./Library.css";

const sample = [
  { id: 1, title: "Cien Años de Soledad", author: "Gabriel García Márquez", generos: "Ficción", year: 1967 },
  { id: 2, title: "1984", author: "George Orwell", generos: "Ciencia Ficción", year: 1949 },
  { id: 3, title: "El Principito", author: "Antoine de Saint-Exupéry", generos: "Infantil", year: 1943 },
];

const sortFunctions = {
  relevancia: (a, b) => (a.id - b.id),
  tituloAsc: (a, b) => a.title.localeCompare(b.title),
  tituloDesc: (a, b) => b.title.localeCompare(a.title),
  annoDesc: (a, b) => (b.year || 0) - (a.year || 0),
};

const BookList = ({ user = null, searchQuery = "" }) => {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState("Todos los géneros");
  const [sortBy, setSortBy] = useState("relevancia");
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setBooks(sample);
  }, []);

  useEffect(() => {
    let res = books.slice();

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      res = res.filter((b) =>
      (b.title || "").toLowerCase().includes(q) ||
      (b.author || "").toLowerCase().includes(q) ||
      (b.generos || "").toLowerCase().includes(q)
      );
  }
  if (genre && genre !== "Todos los géneros") {
    res = res.filter((b) => (b.generos || "") === genre);
  }

  const sorter = sortFunctions[sortBy] || sortFunctions.relevancia;
  res = res.sort(sorter);

  setFiltered(res);
  setPage(1);
  }, [books, searchQuery, genre, sortBy]);

  const handleRequest = (book) => {
    if (!user) {
      alert("Debes iniciar sesión para solicitar acceso.");
      return;
    }
    alert(`Solicitud enviada para "${book.title}"`);
  };

  const handleView = (book) => {
    alert('${book.title} - ${book.author}');
  };

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <section className="books py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-start gap-3 justify-content-between mb-3">
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <label className="form-label mb-0 me-2 text-muted">
              Género
            </label>
            <select className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)} style={{minWidth: 180}}>
              <option>Todos los géneros</option>
              <option>Ficción</option>
              <option>Ciencia Ficción</option>
              <option>Infantil</option>
              <option>Historia</option>
              <option>Clásicos</option>
            </select>
            <label className="form-label mb-0 ms-3 me-2 text-muted">
              Ordenar por
            </label>
            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{minWidth: }}>
              <option value="relevancia">Relevancia</option>
              <option value="tituloAsc">Título (A-Z)</option>
              <option value="tituloDesc">Título (Z-A)</option>
              <option value="annoDesc">Año (Descendiente)</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="text-muted-small">
              Mostrando <strong>{start}-{end}</strong> de <strong>{total}</strong>
            </div>
            <select className="form-select" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={{width: 120}}>
              <option value={6}>6 por página</option>
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
            </select>
          </div>
        </div>
        <div className="row g-4 books-grid">
          {filtered.slice((page - 1) * perPage, page * perPage).length === 0 ? (
            <div className="col-12 text-center text-muted py-4">
              <h4>No se encontraron libros</h4>
              <p>Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            filtered.slice((page - 1) * perPage, page * perPage).map((b) => (
              <div className="col-12" key={b.id}>
                <BookCard book={b} onRequest={handleRequest} onView={handleView} />
              </div>
            ))
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted small">
            Página {page} de {totalPages}
          </div>
          <div className="btn-group">
            <button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Anterior
            </button>
            <button className="btn btn-outline-secondary" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/*
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
*/
export default BookList;