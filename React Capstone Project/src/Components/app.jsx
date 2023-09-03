import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navigation/navbar";
import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Blog from "./Pages/blog";
import AboutUs from "./Pages/about-us";
import Carro from "./Pages/carro";
import Auth from "./Pages/auth";
import Register from "./Auth/register";
import NoMatch from "./Pages/no-match";
import Footer from "./Footer/footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      cartItemsQty: 0,
      loggedInStatus: "NOT_LOGGED_IN",
      loggedUser: {},
      username: "",
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.authorizedPages = this.authorizedPages.bind(this);
    this.connectApi = this.connectApi.bind(this);
    this.createUser = this.createUser.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.sessionPost = this.sessionPost.bind(this);
  }

  sessionPost(user) {
    axios
      .post("http://ekasestao.pythonanywhere.com/sessions", {
        sessions_admin: user.users_admin,
        sessions_username: user.users_username,
        sessions_email: user.users_email,
        sessions_password: user.users_password,
        sessions_name: user.users_name,
        sessions_lastname: user.users_lastname,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Session Post Error", error);
      });
  }

  handleSuccessfulLogin(user) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      loggedUser: user,
      username: user.users_username,
    });
    this.sessionPost(user);
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      loggedUser: {},
      username: "",
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      loggedUser: {},
      username: "",
    });
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

  createUser() {
    axios
      .post("http://ekasestao.pythonanywhere.com/users")
      .then((response) => {})
      .catch((error) => {
        console.log("Creating User Error", error);
      });
  }

  async checkLoginStatus(username) {
    try {
      const response = await axios.get(
        `http://ekasestao.pythonanywhere.com/sessions/${{ username }}`
      );
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      {
        console.log(loggedIn);
        loggedIn && loggedInStatus === "LOGGED_IN"
          ? loggedIn
          : loggedIn && loggedInStatus === "NOT_LOGGED_IN"
          ? this.setState({
              loggedInStatus: "LOGGED_IN",
            })
          : !loggedIn && loggedInStatus === "LOGGED_IN"
          ? this.setState({
              loggedInStatus: "NOT_LOGGED_IN",
            })
          : null;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  componentDidMount() {
    this.connectApi();
    this.checkLoginStatus(this.state.loggedUser.users_username);
  }

  authorizedPages() {
    return [
      <Route key="login" path="/login" element={<Login />} />,
      <Route key="register" path="register" element={<Register />} />,
    ];
  }

  render() {
    return (
      <div className="app-wrapper">
        <Router>
          <Navbar
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            cartItemsQty={this.state.cartItemsQty}
            username={this.state.loggedUser.users_username}
          />

          <Routes>
            <Route exact="true" path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Auth
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  setUser={this.setUser}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Auth
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  loggedUser={this.setUser}
                />
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/carro" element={<Carro />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
