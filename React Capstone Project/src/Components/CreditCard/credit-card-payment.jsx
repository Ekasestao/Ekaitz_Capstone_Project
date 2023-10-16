import React, { Component } from "react";

import CreditCardAdd from "./credit-card-add";
import CreditCardResume from "./credit-card-resume";

class CreditCardPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "add",
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    if (this.state.page === "add") {
      this.setState({ page: "resume" });
      localStorage.setItem("creditCardPage", JSON.stringify("resume"));
    } else {
      this.setState({ page: "add" });
      localStorage.setItem("creditCardPage", JSON.stringify("add"));
    }
  }

  componentDidMount() {
    this.setState({
      page: JSON.parse(localStorage.getItem("creditCardPage")) || "add",
    });
  }

  render() {
    return (
      <div className="credit-card-wrapper">
        {this.state.page === "add" ? (
          <CreditCardAdd changePageCreditCard={this.changePage} />
        ) : (
          <CreditCardResume
            changePageCreditCard={this.changePage}
            products={this.props.products}
            createInvoice={this.props.createInvoice}
          />
        )}
      </div>
    );
  }
}

export default CreditCardPayment;
