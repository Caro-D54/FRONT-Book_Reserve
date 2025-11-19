// src/admin/AdminDashboard.jsx
import React from "react";
import RequestsTable from "./RequestsTable";
import BooksManager from "./BooksManager";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0 }}>Panel Admin — Nexus Literario</h2>
          <div style={{ color: "#666" }}>Gestiona solicitudes, libros y usuarios</div>
        </div>
      </header>

      <main style={{ display: "grid", gap: 24 }}>
        <section style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
          <RequestsTable />
        </section>

        <section style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
          <BooksManager />
        </section>
      </main>
    </div>
  );
}
