import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="content-wrapper">
      <div className="no-match-wrapper">
        <h2>Lo sentimos, no hemos encontrado lo que buscas</h2>
        <Link to="/">Volver a la página principal</Link>
      </div>
    </div>
  );
}

export default NoMatch;
