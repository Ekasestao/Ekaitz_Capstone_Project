import React, { Component } from "react";
import axios from "axios";

import Home from "./Home";

class App extends Component {
  constructor() {
    super();

    this.connectApi = this.connectApi.bind(this);
  }

  connectApi() {
    axios
      .get("http://ekasestao.pythonanywhere.com/users")
      .then((response) => {
        console.log("Connecting Api Response", response);
      })
      .catch((error) => {
        console.log("Connecting Api Error", error);
      });
  }

  componentDidMount() {
    this.connectApi();
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
