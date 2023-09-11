import React from "react";

function AboutUs() {
  return (
    <div className="content-wrapper">
      <div class="aboutus-content-wrapper">
        <p>
          <ul>
            <h3>
              En esta eCommerce he implementado muchas cosas aprendidas en el
              curso, como por ejemplo:
            </h3>
            <li>
              Hacer peticiones a una API y poder devolver información de una
              base de datos
            </li>
            <li>Recrear un "scroll infinito"</li>
            <li>Crear un apartado "Blog" en el que se podrán subir posts</li>
            <li>
              Crear un apartado "Product Manager" donde, si eres usuario admin,
              podrás crear productos, editarlos y eliminarlos de la base de
              datos
            </li>
          </ul>

          <ul>
            <h3>
              Además de otras cosas que no hemos aprendido en el curso, como por
              ejemplo:
            </h3>
            <li>Crear una barra de navegación con sugerencias</li>
            <li>Poder completar transacciones</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
