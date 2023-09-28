import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navigation/navbar";
import Home from "./Pages/home";
import Products from "./Pages/products";
import ProductDetail from "./Pages/product-detail";
import Blog from "./Pages/blog";
import BlogDetail from "./Pages/blog-detail";
import AboutUs from "./Pages/about-us";
import ProductManager from "./Pages/product-manager";
import Cart from "./Pages/cart";
import Auth from "./Pages/auth";
import PaymentDetails from "./Payment/payment-details";
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
    this.loggedPages = this.loggedPages.bind(this);
    this.adminPages = this.adminPages.bind(this);
    this.connectApi = this.connectApi.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  deleteCart(product) {
    const index = this.state.cartItems.findIndex(
      (item) => item.products_name === product.products_name
    );
    if (index > -1) {
      const updatedCart = [...this.state.cartItems];

      updatedCart.splice(index, 1);

      this.setState({ cartItems: updatedCart }, () => {
        localStorage.setItem(
          `userCart_${this.state.loggedUser.id}`,
          JSON.stringify(updatedCart)
        );
      });
    }
  }

  addCart(product) {
    this.setState({
      cartItems: this.state.cartItems.concat(product),
    });
    localStorage.setItem(
      `userCart_${this.state.loggedUser.id}`,
      JSON.stringify(this.state.cartItems.concat(product))
    );
  }

  handleSuccessfulLogin(user) {
    let userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`));

    if (!userCart) {
      userCart = [];
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedInStatus", JSON.stringify(true));
    localStorage.setItem(`userCart_${user.id}`, JSON.stringify(userCart));
    this.setState({
      loggedInStatus: "LOGGED_IN",
      loggedUser: JSON.parse(localStorage.getItem("user")),
      cartItems: userCart,
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
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedInStatus"));
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInStatus === true && loggedUser) {
      const userCart = JSON.parse(
        localStorage.getItem(`userCart_${loggedUser.id}`)
      );
      this.setState({
        loggedInStatus: "LOGGED_IN",
        loggedUser: loggedUser,
        cartItems: userCart || [],
      });
    } else {
      this.setState({
        cartItems: [],
      });
    }

    console.log(localStorage);
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

  loggedPages() {
    return [
      <Route
        key="payment-details"
        path="/payment-details"
        element={<PaymentDetails />}
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
              : this.loggedPages()}
            <Route
              path="/productos"
              element={
                <Products
                  addCart={this.addCart}
                  deleteCart={this.deleteCart}
                  cartItems={this.state.cartItems}
                  loggedInStatus={this.state.loggedInStatus}
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
                  loggedInStatus={this.state.loggedInStatus}
                />
              }
            />
            <Route
              path="/blog"
              element={<Blog loggedInStatus={this.state.loggedInStatus} />}
            />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            {this.state.loggedUser.admin ? this.adminPages() : null}
            <Route
              path="/carro"
              element={
                <Cart
                  cartItems={this.state.cartItems}
                  deleteCart={this.deleteCart}
                  loggedInStatus={this.state.loggedInStatus}
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
