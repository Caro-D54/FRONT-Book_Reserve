import React from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Features from "../Features/Features";
import BookList from "../BookList/BookList";
import "./Home.css"; 
// Archivo de estilos

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main>     
        <Hero />
        <Features />
        <BookList />
      </main>
    </div>
  );
};

export default Home;