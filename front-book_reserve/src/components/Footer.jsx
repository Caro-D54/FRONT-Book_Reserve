import React from "react";
import './Library.css';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>
                        Nexus Literario
                    </h3>
                    <ul>
                        <li>
                            <a href="/about">
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a href="/contact">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>
                        Recursos
                    </h3>
                    <ul>
                        <li>
                            <a href="/catalog">
                                Catálogo Completo
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Ayuda</h3>
                    <ul>
                        <li>
                            <a href="/faq">Preguntas Frecuentes</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>
                        Síguenos
                    </h3>
                    <ul>
                        <li>
                            <a href="https://facebook.com" target="_blanck" rel="noreferrer">
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>
                    &copy; {new Date().getFullYear()} Biblioteca Virtual Nexus Literario. Todos los derechos reservados
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;