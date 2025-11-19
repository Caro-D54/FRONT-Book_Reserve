// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard"; 
import "./App.css";

function App() {
  // Aquí mantienes tu estado local. Si tienes AuthContext, puedes reemplazarlo fácilmente.
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  // Si más adelante usas AuthContext o lees el user desde localStorage / token,
  // usa useEffect para inicializar el estado user al montar la app.
  useEffect(() => {
    // ejemplo: const stored = JSON.parse(localStorage.getItem("user"));
    // if (stored) setUser(stored);
  }, []);

  const handleNavigate = (view) => {
    // Protección básica: impedir navegación al admin si no tiene permisos
    if (view === "admin" && !isUserAdmin(user)) {
      // mostramos la vista "access-denied-admin" para mantener la UX
      setCurrentView("access-denied-admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userData) => {
    // Aquí puedes persistir usuario/token si lo deseas
    setUser(userData);
    // ejemplo opcional: localStorage.setItem("user", JSON.stringify(userData));
    setCurrentView("profile");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView("profile");
  };

  const handleLogout = () => {
    setUser(null);
    // ejemplo: localStorage.removeItem("user");
    setCurrentView("home");
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home onNavigate={handleNavigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case "catalog":
        return <BookList user={user} searchQuery={searchQuery} />;
      case "login":
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case "register":
        return <Register onRegister={handleRegister} onNavigate={handleNavigate} />;
      case "profile":
        return <Profile user={user} onNavigate={handleNavigate} />;
      case "recommendations":
        return <Recommendations />;
      case "admin":
        // La navegación ya protege este caso, pero por seguridad comprobamos el rol otra vez
        if (!isUserAdmin(user)) {
          return (
            <div className="container py-5">
              <h2>Acceso Restringido</h2>
              <p>No tienes permisos para ver esta sección. Necesitas una cuenta con rol administrador.</p>
            </div>
          );
        }
        return <AdminDashboard user={user} />;
      case "access-denied-admin":
        return (
          <div className="container py-5">
            <h2>Acceso Restringido</h2>
            <p>No tienes permisos para ver la sección de administración. Inicia sesión como administrador.</p>
          </div>
        );
      default:
        return (
          <div className="container py-5">
            <h2>Vista no encontrada</h2>
            <p>La vista <strong>{currentView}</strong> no existe.</p>
          </div>
        );
    }
  };

  return (
    <div className="nexus d-flex flex-column min-vh-100">
      <Header
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-grow-1">{renderView()}</main>
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

export default App;