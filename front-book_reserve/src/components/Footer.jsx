import React from "react";
import "./Library.css";

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Nexus Literario</h3>
          <ul>
            <li><a href="/about">Sobre Nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Recursos</h3>
          <ul>
            <li><a href="/catalog">Catálogo Completo</a></li>
            <li><a href="/authors">Autores</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Ayuda</h3>
          <ul>
            <li><a href="/faq">Preguntas Frecuentes</a></li>
            <li><a href="/guide">Guía de Uso</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Síguenos</h3>
          <ul>
            <li><a href="https://facebook.com" rel="noreferrer" target="_blank">Facebook</a></li>
            <li><a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Biblioteca Virtual Nexus Literario. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;