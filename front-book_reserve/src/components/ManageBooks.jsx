import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "" });

  const fetchBooks = () => {
    axiosInstance.get("/api/libros/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error al cargar libros", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/api/libros/", form)
      .then(() => {
        setForm({ titulo: "", autor: "" });
        fetchBooks();
      })
      .catch((err) => console.error("Error al crear libro", err));
  };

  const handleUpdate = (book) => {
    const nuevoTitulo = prompt("Nuevo título: ", book.titulo);
    const nuevoAutor = prompt("Nuevo autor: ", book.autor);
    if (nuevoTitulo && nuevoAutor) {
        axiosInstance.put(`/api/libros/${book.id}/`, { 
            titulo: nuevoTitulo, 
            autor: nuevoAutor 
        }).then(fetchBooks)
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
        axiosInstance.delete(`/api/libros/${id}/`).then(fetchBooks);
        alert("Libro eliminado con éxito.");
    }
  };

  return (
    <div className="container py-4">
      <h2>Gestión de Libros</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Autor"
          value={form.autor}
          onChange={(e) => setForm({ ...form, autor: e.target.value })}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Agregar libro</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr><th>ID</th><th>Título</th><th>Autor</th></tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
                <td>
                    <button className= "btn btn-sm btn-warning me-2" onClick={() => handleUpdate(book)}>Editar</button>
                    <button className="btn btn-sm btn-danger"onClick={() => handleDelete(book.id)}>Eliminar</button>
                </td>
              <td>{book.id}</td>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
