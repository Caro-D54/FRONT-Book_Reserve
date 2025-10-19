import React from "react";
import SearchBar from "./SearchBar";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <h2>Biblioteca Virtual Nexus Literario</h2>
                <p>Conecta con el conocimiento y tus historias favoritas desde cualquier lugar</p>
                <SearchBar />
            </div>
        </section>
    );
};

export default Hero;
