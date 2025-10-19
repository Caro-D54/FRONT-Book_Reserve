import React from "react";
import "./FilterBar.css";

const FilterBar = () => {
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');

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
                    <option value="relevancia">Relevancia</option>
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                    <option value="fecha">Fecha</option>
                </select>
            </div>
            <div>
                <span>Mostrando 12 de 345 libros</span>
            </div>
        </div>
    );
};
export default FilterBar;