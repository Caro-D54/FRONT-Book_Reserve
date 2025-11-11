import React from "react";
import "./Library.css";

const BookCard = ({ book = {}, onRequest = () => {}, onView = () => {} }) => {
  const { id, title = "Sin título", author = "Desconocido", cover = null, year = null } = book;
  const isImg = typeof cover === "string" && (cover.startsWith("http") || cover.startsWith("/"));

  return (
    <article className="card book-card h-100" aria-labelledby={`book-title-${id || title}`}>
      <div className="row g-0 h-100 align-items-stretch">
        <div className="col-auto book-thumb-wrap">
          {isImg ? (
            <img src={cover} alt={`Portada de ${title}`} className="book-thumb" />
          ) : (
            <div className="book-thumb placeholder" aria-hidden>📚</div>
          )}
        </div>

        <div className="col book-body d-flex flex-column">
          <div>
            <h3 id={`book-title-${id || title}`} className="book-title">{title}</h3>
            <div className="book-author text-muted">
              {author}{year ? ` - ${year}` : ""}
            </div>
            <p className="book-meta text-muted small mt-2">Género: {book.generos || "—"}</p>
          </div>

          <div className="mt-auto d-flex gap-2 book-actions">
            <button className="btn btn-outline-secondary flex-fill" onClick={() => onRequest(book)}>Solicitar Acceso</button>
            <button className="btn btn-primary flex-fill" onClick={() => onView(book)}>Ver Detalles</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;