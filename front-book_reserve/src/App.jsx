// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";

import Login from "./components/Login";
import Register from "./components/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import "./App.css";

function AppShell({ isUserAdmin }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="nexus d-flex flex-column min-vh-100">
      <Header
        user={user}
        onNavigate={(view) => {
          if (view === "home") navigate("/");
          if (view === "catalog") navigate("/catalog");
          if (view === "profile") navigate("/profile");
          if (view === "recommendations") navigate("/recommendations");
          if (view === "admin") navigate("/admin");
        }}
        onLogout={async () => {
          await logout();
          navigate("/login");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={<Home onNavigate={() => {}} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />

          <Route path="/catalog" element={<BookList user={user} searchQuery={searchQuery} />} />

          <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />

          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute redirectToLogin={true} />}>
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true} redirectToLogin={true}>
                <AdminDashboard user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="container py-5">
                <h2>Ruta no encontrada</h2>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

/* Utilidad local para detectar admin; comprueba varias convenciones de backend */
function isUserAdmin(user) {
  if (!user) return false;
  return (
    user.is_staff === true ||
    user.is_admin === true ||
    user.role === "admin" ||
    user.role === "staff" ||
    (user.permissions && user.permissions.includes && user.permissions.includes("admin"))
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell isUserAdmin={isUserAdmin} />
      </BrowserRouter>
    </AuthProvider>
  );
}