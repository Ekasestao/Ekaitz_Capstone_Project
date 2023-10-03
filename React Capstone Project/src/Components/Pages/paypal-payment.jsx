import React, { Component } from "react";

import PaypalLogin from "../PayPal/paypal-login";
import PaypalResume from "../PayPal/paypal-resume";

class PaypalPayment extends Component {
  constructor() {
    super();

    this.state = {
      page: "login",
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    if (this.state.page === "login") {
      this.setState({ page: "resume" });
      localStorage.setItem("paypal-page", JSON.stringify("resume"));
    } else {
      this.setState({ page: "login" });
      localStorage.setItem("paypal-page", JSON.stringify("login"));
    }
  }

  componentDidMount() {
    this.setState({ page: JSON.parse(localStorage.getItem("paypal-page")) });
  }

  render() {
    return (
      <div className="content-wrapper">
        {this.state.page === "login" ? (
          <PaypalLogin changePage={this.changePage} />
        ) : (
          <PaypalResume changePage={this.changePage} />
        )}
      </div>
    );
  }
}

export default PaypalPayment;
