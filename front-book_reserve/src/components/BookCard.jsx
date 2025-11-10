import React from "react";
import "./Library.css";

const BookCard = ({ book = {}, onRequest = () => {}, onView = () => {} }) => {
  const { title = "Sin título", author = "Desconocido", cover = null, year = "" } = book;
  const isImg = typeof cover === "string" && (cover.startsWith("http") || cover.startsWith("/"));

  return (
    <article className="card h-100 book-card" aria-labelledby={`title-${book.id || title}`}>
      <div className="book-cover" aria-hidden>
        {isImg ? (
          <img src={cover} alt={`Portada de ${title}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ padding: 16, fontSize: 40 }}>📚</div>
        )}
      </div>

      <div className="book-info">
        <h3 className="book-title" id={`title-${book.id || title}`}>{title}</h3>
        <div className="book-author">{author} {year ? `· ${year}` : ""}</div>

        <div className="book-actions mt-3 d-flex">
          <button className="btn btn-outline-secondary me-2 flex-fill" onClick={() => onView(book)}>Ver detalles</button>
          <button className="btn btn-primary flex-fill" onClick={() => onRequest(book)}>Solicitar acceso</button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;