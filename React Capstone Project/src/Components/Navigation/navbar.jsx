import React, { Component } from "react";
import { FaShoppingCart } from "react-icons/fa";

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
            <div className="nav-login">
              <a href="#">Iniciar Sesión</a>
            </div>

            <div className="nav-cart">
              <a href="#">
                <span>
                  <FaShoppingCart style={{ fontSize: "0.9em" }} />
                </span>
                Carro
                <span>({this.props.itemsQty})</span>
              </a>
            </div>
          </div>
        </div>
        <div className="nav-content-wrapper">
          <div className="nav-logo">
            <a href="#">
              <h1>Ekaitz's eCommerce</h1>
            </a>
          </div>

          <div className="nav-links-wrapper">
            <div className="nav-link">
              <a href="#">Home</a>
            </div>

            <div className="nav-link">
              <a href="#">Productos</a>
            </div>

            <div className="nav-link">
              <a href="#">Blog</a>
            </div>

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
