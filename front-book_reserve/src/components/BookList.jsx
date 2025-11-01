import React, {useState, useEffect, use} from "react";
import "./BookList.css";

const BookList = ({user, searchQuery}) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [requestReason, setRequestReason] = useState("");

    const sampleBooks = [
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

    const generos = ["Todos", "Ficción", "Historia", "Ciencia Ficción", "Fantasía", "Romance", "Suspenso", "Terror", "Drama", "Comédia", "Economía", "Psicología", "Deportes", "Humor", "Vida Cotidiana", "Vida Escolar", "Vida Personal"];

    useEffect(() => {
        setBooks(sampleBooks);
        setFilteredBooks(sampleBooks);
    }, []);

    useEffect(() => {
        filteredBooks();
    }, [searchQuery, selectedGenre]);

    const filterBooks = () => {
        let filtered = books;

        if (searchQuery) {
            filtered = filtered.filter(books =>
                books.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                books.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                books.generos.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedGenre && selectedGenre !== 'Todos') {
            filtered = filtered.filter(book => book.generos.includes(selectedGenre));
        }

        setFilteredBooks(filtered);
    };

    const handleRequestAccess = (book) => {
        if (!user) {
            alert('Debes iniciar sesión para solicitar acceso a un libro');
            return;
        }
        setSelectedBook(book);
        setShowRequestModal(true);
    };

    const submitRequest = () => {
        if (!requestReason.trim()) {
            alert('Debes indicar un motivo para solicitar el acceso');
            return;
        }

        alert('Solicitud enviada para "${selectedBook.title}".\nMotivo: ${requestReason}\nTe notificaremos cuando sea procesada');

        setShowRequestModal(false);
        setRequestReason('');
        setSelectedBook(null);
    };
    

    return (
        <div className="book-list-container">
            <div className="container">
                <h2>Catálogo de Libros</h2>

                <div className="filters">
                    <div className="filter-group">
                        <label>Filtrar por género:</label>
                        <select value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            {generos.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="results-count">
                        {filteredBooks.length} Libros{filteredBooks.length !== 1 ? 's' : ''} 
                        encontrado{filteredBooks.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="books-grid">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover">{book.cover}</div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                                <p className="book-genre">{book.generos}.{book.year}</p>
                                <p className="book-description">{book.description}</p>
                                <button
                                className="btn btn-primary"
                                onClick={() => handleRequestAccess(book)}
                                >
                                    <i className="fas fa-file-pdf"></i> Solicitar Acceso
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filterBooks.length === 0 && (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        <h3>No se encontraron libros</h3>
                        <p>Intenta con otro término de búsqueda</p>
                    </div>
                )}

                {showRequestModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Solicitar Acceso</h3>
                                <button 
                                className="close-btn"
                                onClick={() => setShowRequestModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Estas solicitando acceso para leer:</p>
                                <div className="book-preview">
                                    <span className="book-cover-small">{selectedBook?.cover}</span>
                                    <div>
                                        <strong>{selectedBook?.title}</strong>
                                        <br />
                                        <em>{selectedBook?.author}</em>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Motivo de solicitud:</label>
                                    <textarea
                                    value={requestReason}
                                    onChange={(e) => setRequestReason(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                className="btn btn-outline"
                                onClick={() => setShowRequestModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                className="btn btn-primary"
                                onClick={submitRequest}
                                >
                                    Enviar Solicitud
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;