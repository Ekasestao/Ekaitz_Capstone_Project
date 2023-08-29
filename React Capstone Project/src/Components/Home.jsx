import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
        console.log(response.data.users);
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
    this.getUsers();
    this.getUser();
  }

  render() {
    return <div>Homepage</div>;
  }
}

export default Home;
