import React, { useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
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
      case 'profile':
        return <Profile user={user} />;
      case 'recommendations':
        return <Recommendations user={user} />;
      default:
        return (
          <div className="fallback-view">
            <h2>Vista no encontrada</h2>
            <p>La vista <strong>{currentView}</strong> no existe</p>
          </div>
        );
      }
  };

  return (
    <div className="App">
      <Header 
        user={user}
        setUser={setUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="main-content">
        {renderView()}
      </main>
        
      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 Biblioteca Virtual Nexus Literario</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
