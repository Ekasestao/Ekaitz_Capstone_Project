import React, { Component } from "react";
import axios from "axios";

import Home from "./Pages/home";
import Navbar from "./Navigation/navbar";
import Footer from "./Footer/footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      users: [],
      itemsQty: 1,
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
        <Navbar username={this.state.username} itemsQty={this.state.itemsQty} />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
