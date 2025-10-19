import React, {useState}  from "react";
import './SearchBar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Lógica de búsqueda aquí
        console.log("Buscando: ", searchTerm);
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Buscar por título, autor o género"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
};
export default SearchBar;
