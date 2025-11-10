import React, { useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";


function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const[searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (view) => {
    setCurrentView((p) => (p === view ? p : view));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    handleNavigate('profile');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  }

  const handleRegister = (userData) => {
    setUser(userData);
    handleNavigate('profile');  
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
        <Home
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setsearchQuery={setSearchQuery}
        />
        );
      case 'catalog':
        return <BookList user={user} searchQuery={searchQuery} />;
      case 'login':
        return 
        <Login onLogin={handleLogin} onNavigate={handleNavigate} />;

      case 'register':
        return <Register onRegister={handleRegister} onNavigate={handleNavigate} />;
        
      case 'profile':
        return <Profile user={user} requests={user?.requests || []} onNavigate={handleNavigate}/>;
      case 'recommendations':
        return <Recommendations/>;
      default:
        return (
          <div className="container py-5">
            <h2>Vista no encontrada</h2>
            <p>La vista <strong>{currentView}</strong> no existe</p>
          </div>
        );
      }
  };

  return (
    <div className="nexus d-flex flex-column min-vh-100">
      <Header 
        user={user}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={handleLogout}
      />
      <main className="flex-grow-1">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
