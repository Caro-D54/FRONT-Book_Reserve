import React, {useState}  from "react";
import "./FilterBar.css";

const FilterBar = ({totalBooks}) => {
    const [genre, setGenre] = useState('');
    const [sortBy, setSortBy] = useState('');

    return (
        <div className="filter-bar">
            <div className="filter-options">
                <select
                    className="filter-select"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">Todos los géneros</option>
                    <option value="fiction">Ficción</option>
                    <option value="no-fiction">No ficción</option>
                    <option value="cienia-ficcion">Ciencia ficción</option>
                    <option value="fantasia">Fantasía</option>
                    <option value="romance">Romance</option>
                    <option value="misterio">Misterio</option>
                </select>
                <select
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="relevancia">Ordenar por: Relevancia</option>
                    <option value="titulo">Ordenar por: Título A-Z</option>
                    <option value="autor">Ordenar por: Autor A-Z</option>
                    <option value="fecha">Ordenar por: Fecha</option>
                </select>
            </div>
            <div className="book-count">
                <span>Mostrando {totalBooks} libros</span>
            </div>
        </div>
    );
};
export default FilterBar;