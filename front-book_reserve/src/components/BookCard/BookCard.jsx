import React from "react";
import "./BookCard.css";

const BookCard =  ({title}) => {
    const handleRequestAccess = () => {
        console.log("Solicitando acceso al libro:", title);
    }
}

return (
    <div className="book-card">
        <div className="book-card-image">
            <i className={"`${cover} fa-3x"}></i>
        </div>
        <div className="book-info">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">{author}</p>
            <div className="book-actions">
                <button className="btn btn-primary btn-small request-btn" onClick={handleRequestAccess}>
                    Solicitar Acceso
                </button>
                <button className="btn btn-outline btn-small">
                    Detalles
                </button>
            </div>
        </div>
    </div>
    );
export default BookCard;