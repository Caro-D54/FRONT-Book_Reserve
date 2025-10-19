import React from "react";
import { useAuth}  from "../../context/AuthContext";
import "./BookCard.css";

const BookCard =  ({title, author, genre, cover}) => {
   const { isAuthenticated } = useAuth();


   const handleRequestAccess = () => {
    if (!isAuthenticated) {
        alert('Por favor, inicia sesión para solicitar acceso a este libro.');
        return;
    } 
    console.log("Solicitando acceso al libro:", title);

    };
    return (
        <div className="book-card">
            <div className="book-cover">
                <i className={"fas fa-book fa-3x"}></i>
            </div>
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">{author}</p>
                <span className="book-genre">{genre}</span>
                <div className="book-actions">
                    <button className="btn btn-primary btn-small" 
                    onClick={handleRequestAccess}>
                        Solicitar Acceso
                    </button>
                    <button className="btn btn-outline btn-small">
                        Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BookCard;