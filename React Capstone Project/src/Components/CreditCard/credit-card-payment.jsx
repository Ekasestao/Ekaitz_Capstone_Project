import React, { Component } from "react";

import AddCreditCard from "./add-credit-card";
import CreditCardResume from "./credit-card-resume";

class CreditCardPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "add",
    };
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
      page: JSON.parse(localStorage.getItem("creditCardPage")),
    });
  }

  render() {
    return (
      <div className="credit-cart-wrapper">
        {this.state.page === "add" ? (
          <AddCreditCard changePage={this.changePage} />
        ) : (
          <CreditCardResume
            changePage={this.changePage}
            products={this.props.products}
          />
        )}
      </div>
    );
  }
}

export default CreditCardPayment;
