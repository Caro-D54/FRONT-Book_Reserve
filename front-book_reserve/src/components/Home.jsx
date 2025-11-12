import React from "react";
import LibraryHero from "./LibraryHero";
import Recommendations from "./Recommendations";
import "./Library.css";

const Home = ({ onNavigate = () => {}, searchQuery = "", setSearchQuery = () => {} }) => {
  return (
    <>
      <LibraryHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => onNavigate("catalog")} />
      <Recommendations />
      <section className="container py-4">
        <div className="section-title">
          <h2>Explora nuestra colección de libros disponibles</h2>
          <p className="text-muted">Encuentra lecturas que te inspiren</p>
        </div>
      </section>
    </>
  );
};

export default Home;