import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h2>No hemos encontrado la pagina</h2>
      <Link to="/">Volver a la pagina principal</Link>
    </div>
  );
}

export default NoMatch;
