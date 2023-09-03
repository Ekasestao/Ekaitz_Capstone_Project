import React from "react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import navigateHook from "./navigate";
import axios from "axios";

const Navbar = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link">
        <NavLink to={route}>{linkText}</NavLink>
      </div>
    );
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-top-wrapper">
        <div className="nav-left-side">
          <input type="text" placeholder={"Buscar..."} />
        </div>

        <div className="nav-right-side">
          {props.loggedInStatus === "LOGGED_IN" ? (
            <div className="logged-in">
              <div>{props.username}</div>
              <a>
                <FaSignOutAlt />
              </a>
            </div>
          ) : (
            <div className="nav-login">
              <NavLink to="/login">
                <span>Iniciar Sesión</span>
              </NavLink>
            </div>
          )}

          <div className="nav-cart">
            <NavLink to="/carro">
              <span className="nav-cart-icon">
                <FaShoppingCart style={{ fontSize: "0.9em" }} />
              </span>
              Carro
              <span className="nav-cart-items">({props.cartItemsQty})</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="nav-content-wrapper">
        <div className="nav-logo">
          <NavLink to="/">
            <h1>Ekaitz's eCommerce</h1>
          </NavLink>
        </div>

        <div className="nav-links-wrapper">
          {dynamicLink("/", "Home")}

          {dynamicLink("/productos", "Productos")}

          {dynamicLink("/blog", "Blog")}

          {dynamicLink("/about-us", "Sobre Nosotros")}
        </div>
      </div>
    </div>
  );
};

export default navigateHook(Navbar);
