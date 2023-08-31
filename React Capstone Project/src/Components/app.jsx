import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Blog from "./Pages/blog";
import AboutUs from "./Pages/about-us";
import Carro from "./Pages/carro";
import Auth from "./Auth/auth";
import Register from "./Auth/register";
import NoMatch from "./Pages/no-match";
import Navbar from "./Navigation/navbar";
import Footer from "./Footer/footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      users: [],
      cartItemsQty: 0,
    };

    this.connectApi = this.connectApi.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.createUser = this.createUser.bind(this);
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

  getUsers() {
    axios
      .get("http://ekasestao.pythonanywhere.com/users")
      .then((response) => {
        this.setState({
          users: response.data.users,
        });
      })
      .catch((error) => {
        console.log("Getting Users Error", error);
      });
  }

  getUser(users_id = 1) {
    axios
      .get(`http://ekasestao.pythonanywhere.com/users/${users_id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          username: response.data.users_username,
        });
      })
      .catch((error) => {
        console.log("Getting User Error", error);
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

  componentDidMount() {
    this.connectApi();
  }

  render() {
    return (
      <div className="app-wrapper">
        <Router>
          <Navbar
            username={this.state.username}
            cartItemsQty={this.state.cartItemsQty}
          />

          <Routes>
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/carro" element={<Carro />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
