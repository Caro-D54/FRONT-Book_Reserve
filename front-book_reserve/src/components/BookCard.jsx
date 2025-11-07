import React from "react";

const BookCard = ({ book, onRequest }) => (
    <article className="book-card" aria-labelledby={'title-${book.id}'}>
        <div className="book-cover" aria-hidden>
            {book.cover || "📙"}
        </div>
        <div className="book-body">
            <h3 id={`title-${book.id}`}>{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-meta">{book.genre}. {book.year}</p>
            <p className="book-description">{book.description}</p>
            <div className="book-actions">
                <button
                className="btn btn-ghost"
                type="button">
                    Ver detalles
                </button>
                <button
                className="btn btn-primary-elegant"
                type="button"
                onClick={() => onRequest(book)}>
                    Solicitar acceso
                </button>
            </div>
        </div>
    </article>
);

export default BookCard;