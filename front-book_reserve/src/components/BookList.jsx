import React from "react";
import "./BookList.css";

const BookList = () => {
    const books = [
        {
            id: 1,
            title: "Cien Años de Soledad",
            author: "Gabriel García Márquez",
            cover: "📖",
            description: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía."
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell", 
            cover: "👁️",
            description: "Una distopía que presenta un futuro totalitario donde el gobierno controla todo."
        }
    ];

    return (
        <div className="book-list-container">
            <div className="container"></div>
                <h2> Catálogo de Libros</h2>
                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover">{book.cover}</div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                                <p className="book-description">{book.description}</p>
                                <button className="btn btn-primary">
                                    <i className="fas fa-file-pdf"></i> Solicitar Acceso
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
};

export default BookList;