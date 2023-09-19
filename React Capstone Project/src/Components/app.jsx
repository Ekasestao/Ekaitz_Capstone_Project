import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navigation/navbar";
import Home from "./Pages/home";
import Products from "./Pages/products";
import ProductDetail from "./Pages/product-detail";
import Blog from "./Pages/blog";
import AboutUs from "./Pages/about-us";
import ProductManager from "./Pages/product-manager";
import Carro from "./Pages/carro";
import Auth from "./Pages/auth";
import NoMatch from "./Pages/no-match";
import Footer from "./Footer/footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      loggedInStatus: "NOT_LOGGED_IN",
      loggedUser: {},
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.notLoggedPages = this.notLoggedPages.bind(this);
    this.adminPages = this.adminPages.bind(this);
    this.connectApi = this.connectApi.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  deleteCart(product) {
    try {
      const index = this.state.cartItems.findIndex(
        (item) => item.products_name === product.products_name
      );
      if (index > -1) {
        const updatedCart = [...this.state.cartItems];

        updatedCart.splice(index, 1);

        this.setState({ cartItems: updatedCart }, () => {
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addCart(product) {
    this.setState({
      cartItems: this.state.cartItems.concat(product),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(this.state.cartItems.concat(product))
    );
  }

  handleSuccessfulLogin(user) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedInStatus", JSON.stringify(true));
    this.setState({
      loggedInStatus: "LOGGED_IN",
      loggedUser: JSON.parse(localStorage.getItem("user")),
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleSuccessfulLogout(user) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedInStatus", JSON.stringify(false));
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
    window.location.reload();
  }

  connectApi() {
    axios
      .get("http://ekasestao.pythonanywhere.com/")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Connecting API Error", error);
      });
  }

  checkLoginStatus() {
    const loggedIn = JSON.parse(localStorage.getItem("user")).logged_in;
    const loggedInStatus = this.state.loggedInStatus;
    loggedIn && loggedInStatus === "LOGGED_IN"
      ? this.setState({
          loggedUser: JSON.parse(localStorage.getItem("user")),
        })
      : loggedIn && loggedInStatus === "NOT_LOGGED_IN"
      ? this.setState({
          loggedInStatus: "LOGGED_IN",
          loggedUser: JSON.parse(localStorage.getItem("user")),
        })
      : !loggedIn && loggedInStatus === "LOGGED_IN"
      ? this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          loggedUser: {},
        })
      : null;
  }

  componentDidMount() {
    this.connectApi();
    this.checkLoginStatus();
    JSON.parse(localStorage.getItem("loggedInStatus")) === true
      ? this.setState({
          cartItems: JSON.parse(localStorage.getItem("cartItems")),
        })
      : this.setState({
          cartItems: [],
        });
  }

  notLoggedPages() {
    return [
      <Route
        key="auth"
        path="/auth"
        element={
          <Auth
            handleSuccessfulLogin={this.handleSuccessfulLogin}
            handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
          />
        }
      />,
    ];
  }

  adminPages() {
    return [
      <Route
        key="product-manager"
        path="/product-manager"
        element={
          <ProductManager
            admin={JSON.parse(localStorage.getItem("user")).admin}
          />
        }
      />,
    ];
  }

  render() {
    return (
      <div className="app-wrapper">
        <Router>
          <Navbar
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            username={this.state.loggedUser.username}
            cartItems={this.state.cartItems}
          />

          <Routes>
            <Route exact="true" path="/" element={<Home />} />
            {this.state.loggedInStatus === "NOT_LOGGED_IN"
              ? this.notLoggedPages()
              : null}
            <Route
              path="/productos"
              element={
                <Products
                  addCart={this.addCart}
                  deleteCart={this.deleteCart}
                  cartItems={this.state.cartItems}
                />
              }
            />
            <Route
              path="/products/:slug"
              element={
                <ProductDetail
                  addCart={this.addCart}
                  deleteCart={this.deleteCart}
                  cartItems={this.state.cartItems}
                />
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about-us" element={<AboutUs />} />
            {this.state.loggedUser.admin ? this.adminPages() : null}
            <Route
              path="/carro"
              element={
                <Carro
                  cartItems={this.state.cartItems}
                  deleteCart={this.deleteCart}
                />
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
