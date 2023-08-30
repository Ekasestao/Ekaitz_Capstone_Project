import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-left-side">
          <h1>Ee</h1>
          <div className="links-wrapper">
            <div className="link">Home</div>
            <div className="link">Productos</div>
            <div className="link">Blogs</div>
            <div className="link">Sobre Nosotros</div>
          </div>
        </div>
        <div className="nav-right-side">Icono Carro {this.props.username}</div>
      </div>
    );
  }
}

export default Navbar;
