import React, { Component } from "react";

import home from "../../Images/home.jpg";
import home2 from "../../Images/home2.jpg";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="content-wrapper">
        <img src={home} alt="Home" />
        <img src={home2} alt="Home2" />
      </div>
    );
  }
}

export default Home;
