import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css"; // optional local overrides (keep minimal)

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    handleNavigate("profile");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    handleNavigate("profile");
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate("home");
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

export default App;