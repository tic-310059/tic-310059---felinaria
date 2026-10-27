import React, { useState } from "react";
import "./App.css";

const recetas = [
  {
    id: 1,
    nombre: "Pasta cremosa con pollo",
    categoria: "Comida",
    tiempo: 30,
    dificultad: "Fácil",
    porciones: 2,
    imagen:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
    descripcion:
      "Una pasta deliciosa con pollo dorado, salsa cremosa y un toque de parmesano.",
    ingredientes: [
      "200 g de pasta",
      "250 g de pechuga de pollo",
      "150 ml de crema de leche",
      "2 dientes de ajo",
      "40 g de queso parmesano",
      "1 cucharada de aceite de oliva",
      "Sal y pimienta al gusto",
    ],
    pasos: [
      "Pon agua con sal a hervir y cocina la pasta siguiendo las instrucciones del paquete.",
      "Corta el pollo en cubos pequeños y sazona con sal y pimienta.",
      "Calienta el aceite en una sartén y cocina el pollo hasta que esté bien cocido.",
      "Agrega el ajo picado y cocina durante un minuto.",
      "Incorpora la crema de leche y el queso parmesano. Mezcla hasta obtener una salsa cremosa.",
      "Añade la pasta escurrida, mezcla bien y sirve caliente.",
    ],
  },
  {
    id: 2,
    nombre: "Tacos de pollo y aguacate",
    categoria: "Mexicana",
    tiempo: 25,
    dificultad: "Fácil",
    porciones: 2,
    imagen:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
    descripcion:
      "Tacos frescos con pollo sazonado, aguacate, cilantro y un toque de limón.",
    ingredientes: [
      "250 g de pechuga de pollo",
      "6 tortillas pequeñas de maíz",
      "1 aguacate maduro",
      "1 tomate",
      "1/4 de cebolla",
      "1 limón",
      "Cilantro fresco al gusto",
      "1 cucharadita de aceite",
      "Sal, pimienta y paprika al gusto",
    ],
    pasos: [
      "Corta el pollo en tiras pequeñas y sazona con sal, pimienta y paprika.",
      "Calienta el aceite en una sartén y cocina el pollo hasta que esté completamente cocido.",
      "Pica el tomate, la cebolla y el cilantro.",
      "Corta el aguacate en rebanadas y añade unas gotas de limón.",
      "Calienta las tortillas en una sartén durante unos segundos por cada lado.",
      "Rellena las tortillas con pollo, aguacate, tomate, cebolla y cilantro. Sirve con limón.",
    ],
  },
];

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [guardadas, setGuardadas] = useState([]);
  const [soloGuardadas, setSoloGuardadas] = useState(false);

  const recetasFiltradas = recetas.filter((receta) => {
    const coincideNombre = receta.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideGuardada =
      !soloGuardadas || guardadas.includes(receta.id);

    return coincideNombre && coincideGuardada;
  });

  function alternarGuardada(id) {
    setGuardadas((actuales) =>
      actuales.includes(id)
        ? actuales.filter((guardada) => guardada !== id)
        : [...actuales, id]
    );
  }

  // PANTALLA DE DETALLES
  if (recetaSeleccionada) {
    const receta = recetaSeleccionada;

    return (
      <div className="app">
        <header className="navbar">
          <button
            className="logo logo-button"
            onClick={() => setRecetaSeleccionada(null)}
          >
            <span className="logo-icon">✳</span>
            sabor<span>casero</span>
          </button>

          <button
            className="saved-nav"
            onClick={() => {
              setRecetaSeleccionada(null);
              setSoloGuardadas(true);
            }}
          >
            ♡ Favoritas ({guardadas.length})
          </button>
        </header>

        <main className="detail-page">
          <button
            className="back-button"
            onClick={() => setRecetaSeleccionada(null)}
          >
            ← Volver a las recetas
          </button>

          <section className="detail-hero">
            <img
              className="detail-image"
              src={receta.imagen}
              alt={receta.nombre}
            />

            <div className="detail-intro">
              <span className="eyebrow">{receta.categoria}</span>
              <h1>{receta.nombre}</h1>
              <p>{receta.descripcion}</p>

              <div className="detail-stats">
                <span>⏱ {receta.tiempo} minutos</span>
                <span>👨‍🍳 {receta.dificultad}</span>
                <span>🍽 {receta.porciones} porciones</span>
              </div>

              <button
                className="favorite-detail"
                onClick={() => alternarGuardada(receta.id)}
              >
                {guardadas.includes(receta.id) ? "♥ Guardada" : "♡ Guardar receta"}
              </button>
            </div>
          </section>

          <section className="detail-body">
            <div className="ingredients-panel">
              <h2>Ingredientes</h2>
              <p>Todo lo que necesitas</p>
              <ul>
                {receta.ingredientes.map((ingrediente, index) => (
                  <li key={index}>
                    <label>
                      <input type="checkbox" />
                      <span>{ingrediente}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="preparation-panel">
              <h2>Preparación</h2>
              <p>Sigue estos pasos</p>
              <ol>
                {receta.pasos.map((paso, index) => (
                  <li key={index}>
                    <span className="step-number">{index + 1}</span>
                    <p>{paso}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <button
            className="primary-button back-bottom"
            onClick={() => setRecetaSeleccionada(null)}
          >
            ← Volver a todas las recetas
          </button>
        </main>

        <footer className="footer">
          <p>Hecho con cariño, para los amantes de la cocina.</p>
          <span>© 2026 Sabor Casero</span>
        </footer>
      </div>
    );
  }

  // PANTALLA DE INICIO
  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#inicio">
          <span className="logo-icon">✳</span>
          sabor<span>casero</span>
        </a>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#recetas">Explorar recetas</a>
        </nav>

        <button
          className={`saved-nav ${soloGuardadas ? "active" : ""}`}
          onClick={() => setSoloGuardadas(!soloGuardadas)}
        >
          ♡ Favoritas ({guardadas.length})
        </button>
      </header>

      <main className="home-page" id="inicio">
        <section className="welcome">
          <div className="welcome-copy">
            <span className="eyebrow">RECETAS PARA CADA DÍA</span>
            <h1>
              Hoy se cocina
              <br />
              <span>algo delicioso.</span>
            </h1>
            <p>
              Ideas sencillas, ingredientes cotidianos y mucho sabor.
              Encuentra tu próxima receta favorita.
            </p>
            <a className="primary-button" href="#recetas">
              Descubrir recetas <span>→</span>
            </a>
          </div>

          <div className="welcome-photo">
            <img src={recetas[1].imagen} alt="Tacos recién preparados" />
            <div className="photo-label">
              <span>✳</span>
              <div>
                <strong>Hecho con cariño</strong>
                <p>Directo a tu mesa</p>
              </div>
            </div>
          </div>
        </section>

        <section className="recipes-section home-recipes" id="recetas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">INSPIRACIÓN PARA TU COCINA</span>
              <h2>
                {soloGuardadas
                  ? "Tus recetas favoritas"
                  : "¿Qué vamos a cocinar?"}
              </h2>
              <p>
                {soloGuardadas
                  ? "Tus recetas preferidas, siempre a mano."
                  : "Elige una receta y comienza a disfrutar."}
              </p>
            </div>
            <span className="recipe-count">
              {recetasFiltradas.length} recetas
            </span>
          </div>

          <div className="search-bar">
            <span aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Busca una receta por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar recetas"
            />
            {busqueda && (
              <button onClick={() => setBusqueda("")} aria-label="Limpiar búsqueda">
                ✕
              </button>
            )}
          </div>

          <div className="recipe-grid">
            {recetasFiltradas.map((receta) => (
              <article className="recipe-card" key={receta.id}>
                <div className="card-image">
                  <img src={receta.imagen} alt={receta.nombre} />
                  <span className="category-tag">{receta.categoria}</span>
                  <button
                    className={`favorite-button ${
                      guardadas.includes(receta.id) ? "is-favorite" : ""
                    }`}
                    onClick={() => alternarGuardada(receta.id)}
                    aria-label="Cambiar favorito"
                  >
                    {guardadas.includes(receta.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="card-content">
                  <div className="recipe-meta">
                    <span>⏱ {receta.tiempo} min</span>
                    <span>👨‍🍳 {receta.dificultad}</span>
                  </div>
                  <h3>{receta.nombre}</h3>
                  <p>{receta.descripcion}</p>
                  <button
                    className="details-button"
                    onClick={() => setRecetaSeleccionada(receta)}
                  >
                    Ver receta completa <span>→</span>
                  </button>
                </div>
              </article>
            ))}

            {recetasFiltradas.length === 0 && (
              <div className="empty-state">
                <span>🔍</span>
                <h3>No encontramos recetas</h3>
                <p>Prueba con otra búsqueda o revisa tus favoritas.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setBusqueda("");
                    setSoloGuardadas(false);
                  }}
                >
                  Ver todas las recetas
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="home-note">
          <span className="home-note-icon">♡</span>
          <div>
            <h3>Las mejores recetas son las que compartimos.</h3>
            <p>Unos buenos ingredientes, un poco de creatividad y listo.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#inicio">
          <span className="logo-icon">✳</span>
          sabor<span>casero</span>
        </a>
        <p>Hecho con cariño, para los amantes de la cocina.</p>
        <span>© 2026 Sabor Casero</span>
      </footer>
    </div>
  );
}

export default App;