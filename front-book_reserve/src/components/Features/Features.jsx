import React from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import "./Features.css";

const Features = () => {
    const features = [
        {
            icon: "fas fa-search",
            title: "Búsqueda rápida",
            description: 'Encuentra libros por género, autor o palabras clave de forma rápida'},
            {
                icon: 'fas fa-file-pdf',
                title: 'Solicitud de acceso',
                description: 'Pide permiso para leer los archivos PDF directamente en la plataforma'},
                {
                    icon: 'fas fa-tasks',
                    title: 'Gestión de solicitudes',
                    description: 'Revisa y administra todas tus solicitudes de acceso en un solo lugar'},
                    {
                        icon: 'fas fa-star',
                        title: 'Recomendaciones',
                        description: 'Obtén recomendaciones de libros para tus próximas lecturas basadas en tus intereses'},
    ];
    return (
        <section className="features">
            <div className="container">
                <div className="section-title">
                    <h2>Funcionalidades Principales</h2>
                    <p>Descubre las características que hacen que nuestra plataforma sea única</p>
                    </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;