import React from "react";
import PropTypes from "prop-types";
import "./Library.css";

const BookCard = ({ book = {}, onRequest = () => {}, onView = () => {} }) => {
    const {
        id = "unknown",
        title = "Título desconocido",
        author = "Autor desconocido",
        cover = "null",
        genre = "",
        year = "",
        description = "",
    } = book;

    const labelledBy = `title-${id}`;
    const isImageUrl = 
    typeof cover === "string" && /^(https?:\/\/|data:|\/)/i.test(cover);

    return (
        <article className="card h-100 book-card" aria-labelledby={labelledBy}>
            <div className="card-body d-flex flex-column">
                <div className="d-flex gap-3">
                    <div
                    className="book-cover flex-shrink-0"
                    aria-hidden={!cover ? "false" : "true"}
                    style={{width: 96, height: 128}}
                    >
                        {cover ? (
                            isImageUrl ? (
                                <img
                                src={cover}
                                alt={'Portada de ${title}'}
                                className="img-fluid rounded"
                                loading="lazy"
                                style={{width: "100%", height: "100%", objectFit: "cover"}}
                            /> 
                            ) : (
                                <span className="book-cover-fallback fs-1" aria-hidden="true">
                                    {cover}
                                </span>
                            )
                            ) : (
                                <span className="book-cover-fallback fs-1" aria-hidden="true">
                                    📖
                                </span>
                            )}
                        </div>
                        <div className="book-meta" style={{minWidth: 0}}>
                            <h3 id={labelledBy} className="card-title h6 text-truncate">
                                {title}
                            </h3>
                            <p className="card-text text-muted mb-1 small">
                                {author}
                            </p>
                            {(genre || year) && (
                                <p className="text-warning small mb-2">
                                    {genre}
                                    {genre && year ? " · " : ""}
                                    {year}
                                </p>
                            )}
                            {description && (
                                <p className="text-secondary small mb-0" style={{WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden"}}>
                                {description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-auto d-flex gap-2">
                        <button
                        type="button"
                        className="btn btn-outline-secondary flex-grow-1"
                        aria-label={'Ver detalles de ${title}'}
                        onClick={() => onView(book)}
                        >
                            Ver Detalles
                        </button>
                        <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        aria-label={'Solicitar acceso a ${title}'}
                        onClick={() => onRequest(book)}
                        >
                            Solicitar Acceso
                        </button>
                    </div>
            </div>
        </article>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        author: PropTypes.string,
        cover: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
    }),
    onRequest: PropTypes.func,
    onView: PropTypes.func,
};

export default BookCard;