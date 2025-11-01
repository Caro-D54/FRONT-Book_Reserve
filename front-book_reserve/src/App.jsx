import React, { useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import BookList from "./components/BookList";
import "./components/Globals.css";


function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="App">
      <Header 
        user={user}
        setUser={setUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="main-content">
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'catalog' && <BookList user={user}/>}
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
