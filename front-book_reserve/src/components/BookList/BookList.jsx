import React, { useState } from 'react';
import BookCard from '../BookCard/BookCard';
import FilterBar from '../FilterBar/FilterBar';
import './BookCatalog.css';

const BookList = () => {
  const [books] = useState([
    {
      id: 1,
      title: 'Cien Años de Soledad',
      author: 'Gabriel García Márquez',
      cover: 'fas fa-book'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      cover: 'fas fa-book'
    },
    {
      id: 3,
      title: 'El Quijote',
      author: 'Miguel de Cervantes',
      cover: 'fas fa-book'
    },
    {
      id: 4,
      title: 'Crimen y Castigo',
      author: 'Fiódor Dostoyevski',
      cover: 'fas fa-book'
    },
    {
      id: 5,
      title: 'Orgullo y Prejuicio',
      author: 'Jane Austen',
      cover: 'fas fa-book'
    },
    {
      id: 6,
      title: 'Rayuela',
      author: 'Julio Cortázar',
      cover: 'fas fa-book'
    }
  ]);

  return (
    <section className="books-list" id="catalogo">
      <div className="container">
        <div className="section-title">
          <h2>Catálogo de Libros</h2>
          <p>Explora nuestra amplia colección de libros disponibles</p>
        </div>
        <FilterBar totalBooks={books.length} />
        <div className="books-grid">
          {books.map(book => (
            <BookCard 
              key={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;