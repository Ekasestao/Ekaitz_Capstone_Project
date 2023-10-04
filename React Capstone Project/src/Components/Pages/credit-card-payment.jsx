import React, { Component } from "react";

class CreditCardPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardBackground: Math.floor(Math.random() * 25 + 1),
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
    };

    this.cardNumberRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ cardNumberTemp: this.state.otherCardMask });
    document.getElementById("cardNumber").focus();
    if (this.cardNumberRef.current) {
      this.cardNumberRef.current.focus();
    }
  }

  getCardType = () => {
    let number = this.state.cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) !== null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) !== null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) !== null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) !== null) return "discover";

    re = new RegExp("^9792");
    if (number.match(re) !== null) return "troy";

    return "visa";
  };

  generateCardNumberMask = () => {
    return this.getCardType() === "amex"
      ? this.state.amexCardMask
      : this.state.otherCardMask;
  };

  minCardMonth = () => {
    if (this.state.cardYear === this.state.minCardYear)
      return new Date().getMonth() + 1;
    return 1;
  };

  componentDidUpdate(_, prevState) {
    if (prevState.cardYear !== this.state.cardYear) {
      if (this.state.cardMonth < this.minCardMonth()) {
        this.setState({ cardMonth: "" });
      }
    }
  }

  flipCard = (status) => {
    this.setState({ isCardFlipped: status });
  };

  focusInput = (e) => {
    let targetRef = e.target.dataset.ref;
    let targetInput = this[targetRef];
    if (targetInput) {
      targetInput.focus();
      this.setState({
        isInputFocused: true,
        focusElementStyle: {
          width: `${targetInput.offsetWidth}px`,
          height: `${targetInput.offsetHeight}px`,
          transform: `translateX(${targetInput.offsetLeft}px) translateY(${targetInput.offsetTop}px)`,
        },
      });
    }
  };

  blurInput = () => {
    setTimeout(() => {
      if (!this.state.isInputFocused) {
        this.setState({ focusElementStyle: null });
      }
    }, 300);
    this.setState({ isInputFocused: false });
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="credit-cart-wrapper"></div>
      </div>
    );
  }
}

export default CreditCardPayment;
