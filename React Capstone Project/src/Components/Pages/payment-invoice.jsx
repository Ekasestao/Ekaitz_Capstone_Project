import React, { Component } from "react";
import axios from "axios";

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

    this.getInvoice = this.getInvoice.bind(this);
  }

  getInvoice() {
    axios
      .get(
        `http://ekasestao.pythonanywhere.com/invoice/${JSON.parse(
          localStorage.getItem("invoiceId")
        )}`,
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 404) {
          window.location.reload();
        } else {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            lastname: response.data.lastname,
            date: response.data.date,
          });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log("Error getInvoice", error);
      });
  }

  componentDidMount() {
    this.getInvoice();
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="invoice-wrapper">
          <div className="invoice">
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
