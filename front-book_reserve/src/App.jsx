import React, { useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./components/Globals.css";


function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const[searchQuery, setSearchQuery] = useState("");

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
        <Home
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
        />
        );
      case 'catalog':
        return <BookList user={user} searchQuery={searchQuery} />;
      case 'login':
        return (
        <Login 
        onLogin={(u) => { 
          setUser(u); 
          setCurrentView('profile'); 
        }} 
        />
      );
      case 'register':
        return (
        <Register 
        onRegister={(u) => { 
          setUser(u); 
          setCurrentView('profile'); 
        }} 
        />
      );
      case 'profile':
        return <Profile user={user} />;
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
    <div className="d-flex flex-column min-vh-100">
      <Header 
        user={user}
        setUser={setUser}
        onNavigate={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={() => {
          setUser(null);
        setCurrentView('home');
        }}
      />
      <main className="flex-grow-1">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
