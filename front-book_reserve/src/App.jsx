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
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'catalog' && (
          <BookList 
          user={user}
          searchQuery={searchQuery}
        />)}
        {currentView === 'profile' && <Profile user={user} />}
        {currentView === 'recommendations' && <Recommendations user={user} />}
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
