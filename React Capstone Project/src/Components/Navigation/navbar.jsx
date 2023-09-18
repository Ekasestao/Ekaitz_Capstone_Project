import React, { Component } from "react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

import navigateHook from "../Hooks/navigate";
import SearchBar from "../SearchBar/search-bar";
import SearchResults from "../SearchBar/search-results";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  setResults(result) {
    this.setState({
      results: result,
    });
  }

  dynamicLink(route, linkText) {
    return (
      <div className="nav-link">
        <NavLink to={route} className="nav-link">
          {linkText}
        </NavLink>
      </div>
    );
  }

  handleSignOut() {
    axios
      .get("http://ekasestao.pythonanywhere.com/logout")
      .then((response) => {
        if (response.data.status === 200) {
          this.props.navigate("/");
          this.props.handleSuccessfulLogout(response.data.user);
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-top-wrapper">
          <div className="nav-left-side">
            <div className="search-wrapper">
              <SearchBar setResults={this.setResults} />
              <SearchResults results={this.state.results} />
            </div>
          </div>

          <div className="nav-right-side">
            {this.props.loggedInStatus === "LOGGED_IN" ? (
              <div className="logged-in">
                <div>{this.props.username}</div>
                <NavLink onClick={this.handleSignOut}>
                  <FaSignOutAlt />
                </NavLink>
              </div>
            ) : this.props.loggedInStatus === "NOT_LOGGED_IN" ? (
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
                <span className="nav-cart-items">
                  ({this.props.cartItems.length})
                </span>
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
            <div className="nav-links-wrapper">
              {this.dynamicLink("/", "home")}
            </div>

            <div className="nav-links-wrapper">
              {this.dynamicLink("/productos", "productos")}
            </div>
            <div className="nav-links-wrapper">
              {this.dynamicLink("/blog", "blog")}
            </div>

            <div className="nav-links-wrapper">
              {this.dynamicLink("/about-us", "sobre nosotros")}
            </div>

            {JSON.parse(localStorage.getItem("user")).admin ? (
              <div className="nav-links-wrapper">
                {this.dynamicLink("/product-manager", "product manager")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default navigateHook(Navbar);
