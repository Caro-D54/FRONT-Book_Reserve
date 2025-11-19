// src/admin/BooksManager.jsx
import React, { useEffect, useState } from "react";
import { apiAdmin } from "./apiAdmin";
import ConfirmDialog from "./ConfirmDialog";

const empty = { title: "", author: "", genre: "", description: "", pdf_url: "" };

export default function BooksManager() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState({ open: false, id: null });

  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    setLoading(true);
    try {
      const data = await apiAdmin.listBooks({ ordering: "title", page_size: 500 });
      setBooks(data.results || data);
    } catch (e) {
      console.error(e);
      alert("Error cargando libros");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(book = null) {
    setEditing(book);
    setForm(book ? { title: book.title || "", author: book.author || "", genre: book.genre || "", description: book.description || "", pdf_url: book.pdf_url || "" } : empty);
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editing) {
        const updated = await apiAdmin.updateBook(editing.id, form);
        setBooks(prev => prev.map(b => b.id === editing.id ? updated : b));
      } else {
        const created = await apiAdmin.createBook(form);
        setBooks(prev => [created, ...prev]);
      }
      startEdit(null);
    } catch (err) {
      console.error(err);
      alert("Error guardando libro");
    }
  }

  async function handleDelete(id) {
    try {
      await apiAdmin.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (e) {
      console.error(e);
      alert("Error eliminando libro");
    } finally {
      setConfirm({ open: false, id: null });
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Gestión de libros</h4>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Catálogo ({books.length})</strong>
            <button onClick={() => startEdit(null)} style={{ ...btnSmall, background: "#2e7d32" }}>Nuevo libro</button>
          </div>

          {loading && <div>Cargando libros...</div>}
          <ul style={{ padding: 0, marginTop: 12 }}>
            {books.map(b => (
              <li key={b.id} style={{ listStyle: "none", padding: 10, borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{b.author} — {b.genre}</div>
                </div>
                <div>
                  <button onClick={() => startEdit(b)} style={btnSmall}>Editar</button>
                  <button onClick={() => setConfirm({ open: true, id: b.id })} style={{ ...btnSmall, marginLeft: 8, background: "#d32f2f" }}>Borrar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: 420 }}>
          <h5>{editing ? "Editar libro" : "Crear libro"}</h5>
          <form onSubmit={handleSave} style={{ display: "grid", gap: 8 }}>
            <input required placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Autor" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
            <input placeholder="Género" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
            <input placeholder="URL PDF (opcional)" value={form.pdf_url} onChange={e => setForm({ ...form, pdf_url: e.target.value })} />
            <textarea placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={6} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              {editing && <button type="button" onClick={() => startEdit(null)} style={{ padding: "8px 12px", borderRadius: 6, background: "#e0e0e0", border: "none" }}>Cancelar</button>}
              <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, background: "#0b5cff", color: "#fff", border: "none" }}>{editing ? "Guardar" : "Crear"}</button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={confirm.open}
        title="Eliminar libro"
        message="¿Estás seguro? Esta acción es irreversible."
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(confirm.id)}
        confirmLabel="Eliminar"
      />
    </div>
  );
}

const btnSmall = { background: "#1976d2", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6 };