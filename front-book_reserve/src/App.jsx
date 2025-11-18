// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import LibrarianProfile from "./components/LibrarianProfile";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register"; // TODO: cambiar nombre

import "./App.css"; // estilos opcionales

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="nexus d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              {/* Vista pública */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<BookList />} />
              <Route path="/recommendations" element={<Recommendations />} />

              {/* Autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas protegidas */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/librarian"
                element={
                  <ProtectedRoute requireAdmin>
                    <LibrarianProfile />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route
                path="*"
                element={
                  <div className="container py-5">
                    <h2>Vista no encontrada</h2>
                    <p>La ruta solicitada no existe.</p>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;