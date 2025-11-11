import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "./Library.css";

const sample = [
  { id: 1, title: "Cien Años de Soledad", author: "Gabriel García Márquez", generos: "Ficción", year: 1967, cover: null },
  { id: 2, title: "1984", author: "George Orwell", generos: "Ciencia Ficción", year: 1949, cover: null },
  { id: 3, title: "El Quijote", author: "Miguel de Cervantes", generos: "Clásicos", year: 1605, cover: null },
  { id: 4, title: "Crimen y Castigo", author: "Fiódor Dostoyevski", generos: "Clásicos", year: 1866, cover: null },
];

const sortFunctions = {
  relevancia: (a, b) => a.id - b.id,
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

  // Calcula aquí las variables que usarás en el JSX
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(page * perPage, total);
  const visibleItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleRequest = (book) => {
    if (!user) {
      alert("Debes iniciar sesión para solicitar acceso.");
      return;
    }
    alert(`Solicitud enviada para "${book.title}"`);
  };

  const handleView = (book) => {
    alert(`${book.title} — ${book.author}`);
  };

  return (
    <section className="books py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-start gap-3 justify-content-between mb-3">
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <label className="form-label mb-0 me-2 text-muted">Género</label>
            <select className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)} style={{ minWidth: 180 }}>
              <option>Todos los géneros</option>
              <option>Ficción</option>
              <option>Ciencia Ficción</option>
              <option>Clásicos</option>
              <option>Infantil</option>
            </select>

            <label className="form-label mb-0 ms-3 me-2 text-muted">Ordenar por</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ minWidth: 180 }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="tituloAsc">Título, A→Z</option>
              <option value="tituloDesc">Título, Z→A</option>
              <option value="annoDesc">Año (desc)</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-muted small">
              Mostrando <strong>{start}-{end}</strong> de <strong>{total}</strong>
            </div>

            <select className="form-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} style={{ width: 120 }}>
              <option value={6}>6 por página</option>
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
            </select>
          </div>
        </div>

        <div className="row g-4 books-grid">
          {visibleItems.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">
              <h4>No se encontraron libros</h4>
              <p>Prueba otra búsqueda o género</p>
            </div>
          ) : (
            visibleItems.map((b) => (
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
            <button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>
            <button className="btn btn-outline-secondary" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Siguiente</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookList;