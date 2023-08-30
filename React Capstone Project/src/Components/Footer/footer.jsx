import React, { Component } from "react";

class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer-left-side">
          <div className="footer-logo">
            <a href="#">
              <h1>Ekaitz's eCommerce</h1>
            </a>
          </div>

          <div className="footer-links-wrapper">
            <div className="footer-link">
              <a href="#">Home</a>
            </div>

            <div className="footer-link">
              <a href="#">Productos</a>
            </div>

            <div className="footer-link">
              <a href="#">Blog</a>
            </div>

            <div className="footer-link">
              <a href="#">Sobre Nosotros</a>
            </div>
          </div>
        </div>
        <div className="footer-right-side">
          <div className="footer-copyright">
            <span>© Copyright Ekaitz's eCommerce 2023</span>
            <span>
              Reservados todos los derechos. No se permite la reproducción total
              o parcial de esta obra, ni su incorporación a un sistema
              informático, ni su transmisión en cualquier forma o por cualquier
              medio (electrónico, mecánico, fotocopia, grabación u otros) sin
              autorización previa y por escrito de los titulares del copyright.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
