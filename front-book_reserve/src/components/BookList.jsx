import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";           // Asegúrate que existe en ./BookCard.jsx
import LibraryHero from "./LibraryHero";     // Opcional: si no lo usas, reemplaza por un <div>
import "./Library.css";

const BookList = ({ user, searchQuery = "" }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [requestReason, setRequestReason] = useState("");

  const sampleBooks = [
    {
      id: 1,
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      cover: "📖",
      description:
        "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
      generos: "Ficción",
      year: 1967,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "👁️",
      description:
        "Una distopía que presenta un futuro totalitario donde el gobierno controla todo.",
      generos: "Ciencia Ficción",
      year: 1949,
    },
  ];

  const generos = [
    "Todos",
    "Ficción",
    "Historia",
    "Ciencia Ficción",
    "Fantasía",
    "Romance",
    "Suspenso",
    "Terror",
    "Drama",
    "Comédia",
    "Economía",
    "Psicología",
    "Deportes",
    "Humor",
    "Vida Cotidiana",
    "Vida Escolar",
    "Vida Personal",
  ];

  useEffect(() => {
    // carga inicial (simulada)
    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
  }, []);

  useEffect(() => {
    // recalcular filtrado cuando cambian searchQuery, selectedGenre o books
    const q = (searchQuery || "").trim().toLowerCase();
    let filtered = Array.isArray(books) ? books.slice() : [];

    if (q) {
      filtered = filtered.filter((b) => {
        const title = (b.title || "").toLowerCase();
        const author = (b.author || "").toLowerCase();
        const gen = (b.generos || "").toLowerCase();
        return title.includes(q) || author.includes(q) || gen.includes(q);
      });
    }

    if (selectedGenre && selectedGenre !== "Todos") {
      filtered = filtered.filter((book) =>
        (book.generos || "").includes(selectedGenre)
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedGenre, books]);

  const handleRequestAccess = (book) => {
    if (!user) {
      alert("Debes iniciar sesión para solicitar acceso a un libro");
      return;
    }
    setSelectedBook(book);
    setShowRequestModal(true);
  };

  const submitRequest = () => {
    if (!selectedBook) {
      alert("No hay libro seleccionado");
      return;
    }
    if (!requestReason.trim()) {
      alert("Debes indicar un motivo para solicitar el acceso");
      return;
    }

    // Simulación: aquí se integraría la llamada a la API
    alert(
      `Solicitud enviada para "${selectedBook.title}".\nMotivo: ${requestReason}\nTe notificaremos cuando sea procesada`
    );

    setShowRequestModal(false);
    setRequestReason("");
    setSelectedBook(null);
  };

  const resultsLabel = `${filteredBooks.length} libro${filteredBooks.length !== 1 ? "s" : ""} encontrado${filteredBooks.length !== 1 ? "s" : ""}`;

  return (
    <>
      <div className="container py-4">
        <div className="section-title">
          <h2 className="Catálogo de libros"></h2>
          <p>Explora nuestra colección de libros disponibles</p>
        </div>
        <div className="filter-bar mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex gap-2">
            <select className="form-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} aria-label="Seleccionar género" style={{maxWidth: 220}}>
              {generos.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="results-count text-muted" aria-live="polite">
            {filteredBooks.length} libro{filteredBooks.length !== 1 ? "s" : ""} encontrado{filteredBooks.length !== 1 ? "s" : ""}
          </div>
          <div className="row g-4 books-grid" role="list">
            {filteredBooks.map((book) => (
              <div key={book.id} className="col-12 col-sm-6 col-md-4" role="listitem">
                <BookCard book={book} onRequest={handleRequestAccess} onView={() => {}}/>
              </div>
            ))}
          </div>
          {filteredBooks.length === 0 && (
            <div className="no-results mt-4" role="status">
              <h3>No se encontraron libros</h3>
              <p>Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>
        {showRequestModal && (
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h3 id="modal-title">Solicitar Acceso</h3>
                <button className="btn-close" onClick={() => setShowRequestModal(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <p>Estás solicitando acceso para leer:</p>
                <div className="d-flex gap-3 align-items-center">
                  <div className="book-cover-small" aria-hidden>{selectedBook?.cover}</div>
                  <div><strong>{selectedBook?.title}</strong>
                    <br />
                    <em>{selectedBook?.author}</em>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="request-reason">Motivo de solicitud:</label>
                  <textarea
                    id="request-reason"
                    className="form-control"
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer d-flex gap-2 justify-content-end mt3">
                <button className="btn btn-outline-secondary" onClick={() => setShowRequestModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={submitRequest}>Enviar Solicitud</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookList;