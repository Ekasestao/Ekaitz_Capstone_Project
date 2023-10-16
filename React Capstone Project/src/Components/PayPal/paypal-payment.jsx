import React, { Component } from "react";

import PaypalLogin from "./paypal-login";
import PaypalResume from "./paypal-resume";

class PaypalPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "login",
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    if (this.state.page === "login") {
      this.setState({ page: "resume" });
      localStorage.setItem("paypalPage", JSON.stringify("resume"));
    } else {
      this.setState({ page: "login" });
      localStorage.setItem("paypalPage", JSON.stringify("login"));
    }
  }

  componentDidMount() {
    this.setState({
      page: JSON.parse(localStorage.getItem("paypalPage")) || "login",
    });
  }

  render() {
    return (
      <div className="paypal-wrapper">
        {this.state.page === "login" ? (
          <PaypalLogin changePagePaypal={this.changePage} />
        ) : (
          <PaypalResume
            changePagePaypal={this.changePage}
            products={this.props.products}
            createInvoice={this.props.createInvoice}
          />
        )}
      </div>
    );
  }
}

export default PaypalPayment;
