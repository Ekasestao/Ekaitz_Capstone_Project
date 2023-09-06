import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="footer-link">
        <NavLink to={route} className="footer-link">
          {linkText}
        </NavLink>
      </div>
    );
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-left-side">
        <div className="footer-logo">
          <NavLink to="/">
            <h1>Ekaitz's eCommerce</h1>
          </NavLink>
        </div>

        <div className="footer-links-wrapper">
          <div className="footer-links-wrapper">{dynamicLink("/", "Home")}</div>
          <div className="footer-links-wrapper">
            {dynamicLink("/productos", "Productos")}
          </div>
          <div className="footer-links-wrapper">
            {dynamicLink("/blog", "Blog")}
          </div>
          <div className="footer-links-wrapper">
            {dynamicLink("/about-us", "Sobre Nosotros")}
          </div>
        </div>
      </div>
      <div className="footer-right-side">
        <div className="footer-copyright">
          <span>© Copyright Ekaitz's eCommerce 2023</span>
          <span>
            Reservados todos los derechos. No se permite la reproducción total o
            parcial de esta obra, ni su incorporación a un sistema informático,
            ni su transmisión en cualquier forma o por cualquier medio
            (electrónico, mecánico, fotocopia, grabación u otros) sin
            autorización previa y por escrito de los titulares del copyright.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
