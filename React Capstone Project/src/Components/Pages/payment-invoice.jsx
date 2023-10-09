import React, { Component } from "react";

import NavigateHook from "../Hooks/navigate";

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      lastname: "",
      products: [],
      date: "",
    };
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="invoice-wrapper">
          <div className="invoice">
            {this.props.invoice}
            {this.state.id}
            {this.state.name}
            {this.state.lastname}
            {this.state.products}
            {this.state.date}
          </div>
          <button className="btn" onClick={() => this.props.navigate("/")}>
            Volver a la página principal
          </button>
        </div>
      </div>
    );
  }
}

export default NavigateHook(Invoice);
