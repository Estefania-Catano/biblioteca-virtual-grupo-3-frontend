import React from "react";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <h1> Biblioteca Virtual</h1>
        <p>Bienvenido a nuestra plataforma de gestión de libros.</p>
        <button>Explorar libros</button>
      </section>

      <section className="features">
        <h2>¿Qué puedes hacer?</h2>
        <ul>
          <li> Ver catálogo de libros</li>
          <li> Agregar nuevos libros</li>
          <li> Editar información</li>
          <li> Eliminar libros</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;