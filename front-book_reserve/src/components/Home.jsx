import React from "react";

const Home = ({ setCurrentView = () => {}, searchQuery = "", setSearchQuery = () => {} }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (typeof setCurrentView === "function") setCurrentView("catalog");
    }
  };

  return (
    <div className="container py-5">
      <section className="bg-dark text-light rounded-3 p-5 mb-4 text-center">
        <h1 className="display-5">Nexus Literario</h1>
        <p className="lead">Explora, solicita y gestiona tus lecturas.</p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <form
              className="input-group"
              onSubmit={(e) => {
                e.preventDefault();
                if (typeof setCurrentView === "function") setCurrentView("catalog");
              }}
              role="search"
              aria-label="Buscar libros"
            >
              <input
                className="form-control"
                placeholder="Buscar por título, autor o género"
                value={searchQuery}
                onChange={(e) => typeof setSearchQuery === "function" && setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Campo de búsqueda de libros"
              />
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Tus libros</h5>
              <p className="card-text">Revisa tu biblioteca y solicitudes en tu perfil.</p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => typeof setCurrentView === "function" && setCurrentView("profile")}
              >
                Ir a perfil
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Recomendaciones</h5>
              <p className="card-text">Descubre nuevas lecturas adaptadas a tus intereses.</p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => typeof setCurrentView === "function" && setCurrentView("recommendations")}
              >
                Ver recomendaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;