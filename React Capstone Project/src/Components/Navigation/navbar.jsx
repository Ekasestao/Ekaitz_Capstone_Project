import React from "react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

import navigateHook from "./navigate";

const Navbar = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link">
        <NavLink to={route} className="nav-link">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .get("http://ekasestao.pythonanywhere.com/logout")
      .then((response) => {
        if (response.data.status === 200) {
          props.navigate("/");
          props.handleSuccessfulLogout(response.data.user);
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
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
              <a onClick={handleSignOut}>
                <FaSignOutAlt />
              </a>
            </div>
          ) : props.loggedInStatus === "NOT_LOGGED_IN" ? (
            <div className="nav-login">
              <NavLink to="/auth">
                <span>Iniciar Sesión</span>
              </NavLink>
            </div>
          ) : null}

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
          <div className="nav-links-wrapper">{dynamicLink("/", "Home")}</div>

          <div className="nav-links-wrapper">
            {dynamicLink("/productos", "Productos")}
          </div>
          <div className="nav-links-wrapper">
            {dynamicLink("/blog", "Blog")}
          </div>

          <div className="nav-links-wrapper">
            {dynamicLink("/about-us", "Sobre Nosotros")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default navigateHook(Navbar);
