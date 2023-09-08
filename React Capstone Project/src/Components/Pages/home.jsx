import React, { Component } from "react";

import home from "../../Images/Home/home.jpg";
import home2 from "../../Images/Home/home2.jpg";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="home-content-wrapper">
          <img src={home} alt="Home" />
          <img src={home2} alt="Home2" />
        </div>
      </div>
    );
  }
}

export default Home;
