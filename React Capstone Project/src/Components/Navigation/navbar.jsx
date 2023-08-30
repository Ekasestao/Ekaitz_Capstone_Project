import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-top-wrapper">
          <div className="nav-left-side">
            <input type="text" placeholder={"Buscar..."} />
          </div>

          <div className="nav-right-side">
            <div className="nav-login">Iniciar Sesión</div>

            <div className="nav-cart">i Carro (0)</div>
          </div>
        </div>
        <div className="nav-content-wrapper">
          <div className="nav-logo">
            <h1>Ekaitz's eCommerce</h1>
          </div>

          <div className="nav-links-wrapper">
            <div className="nav-link">Home</div>

            <div className="nav-link">Productos</div>

            <div className="nav-link">Blog</div>

            <div className="nav-link">
              <a href="#">Sobre Nosotros</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
