import React, { Component } from "react";

class AddCreditCard extends Component {
  constructor() {
    super();

    this.state = {
      currentCardBackground: Math.floor(Math.random() * 25 + 1),
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      cardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
    };

    this.cardNumberRef = React.createRef();
    this.cardNameRef = React.createRef();
    this.cardDateRef = React.createRef();
    this.cardCvvRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  handleSubmit() {}

  getCardType() {
    let number = this.state.cardNumber;

    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    return "visa";
  }

  minCardMonth() {
    if (this.state.cardYear === this.state.minCardYear) {
      return new Date().getMonth() + 1;
    }
    return 1;
  }

  flipCard(status) {
    this.setState({ isCardFlipped: status });
  }

  focusInput(inputRef) {
    this.setState({ isInputFocused: true });
    const target = inputRef.current;
    if (target) {
      this.setState({
        focusElementStyle: {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
        },
      });
    }
  }

  blurInput() {
    setTimeout(() => {
      if (!this.state.isInputFocused) {
        this.setState({ focusElementStyle: null });
      }
    }, 300);
    this.setState({ isInputFocused: false });
  }

  componentDidUpdate(prevState) {
    if (
      this.state.cardYear !== prevState.cardYear &&
      parseInt(this.state.cardYear, 10) === this.state.minCardYear
    ) {
      if (parseInt(this.state.cardMonth, 10) < this.minCardMonth()) {
        this.setState({ cardMonth: "" });
      }
    }
  }

  componentDidMount() {
    this.setState({ cardNumberTemp: this.cardMask }, () => {
      const cardNumberInput = document.getElementById("cardNumber");
      if (cardNumberInput) {
        cardNumberInput.focus();
      }
    });
  }

  render() {
    return (
      <div className="add-credit-card">
        <div className="wrapper" id="app">
          <div className="card-form">
            <div className="card-list">
              <div
                className={`card-item ${
                  this.state.isCardFlipped ? "-active" : ""
                }`}
              >
                <div className="card-item__side -front">
                  <div
                    className={`card-item__focus ${
                      this.state.focusElementStyle ? "-active" : ""
                    }`}
                    style={this.state.focusElementStyle}
                    ref="focusElement"
                  ></div>
                  <div className="card-item__cover">
                    <img
                      src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.state.currentCardBackground}.jpeg`}
                      className="card-item__bg"
                    />
                  </div>
                </div>
                <div className="card-item__side -back"></div>
              </div>
            </div>
            <div className="card-form__inner">
              <form onSubmit={this.handleSubmit}>
                <div className="card-input">
                  <label htmlFor="cardNumber" className="card-input__label">
                    Número de la Tarjeta
                  </label>
                  <input
                    type="text"
                    className="card-input__input"
                    id="cardNumber"
                    ref={this.cardNumberRef}
                    value={this.state.cardNumber}
                    onInput={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const formattedValue = value.replace(/(\d{4})/g, "$1 ");
                      const newValue = formattedValue.trim().slice(0, 14);
                      this.setState({ cardNumber: newValue });
                    }}
                    onFocus={() => this.focusInput(this.cardNumberRef)}
                    onBlur={this.blurInput}
                    autoComplete="off"
                  />
                </div>
                <div className="card-input">
                  <label htmlFor="cardName" className="card-input__label">
                    Titular de la Tarjeta
                  </label>
                  <input
                    type="text"
                    className="card-input__input"
                    id="cardName"
                    ref={this.cardNameRef}
                    value={this.state.cardName}
                    onInput={(e) => {
                      const newValue = e.target.value
                        .replace(/[^a-zA-Z ]/g, "")
                        .slice(0, 30);
                      this.setState({ cardName: newValue });
                    }}
                    onFocus={() => this.focusInput(this.cardNameRef)}
                    onBlur={this.blurInput}
                    autoComplete="off"
                  />
                </div>
                <div className="card-form__row">
                  <div className="card-form__col">
                    <div className="card-form__group">
                      <label htmlFor="cardMonth" className="card-input__label">
                        Válido Hasta
                      </label>
                      <select
                        className="card-input__input -select"
                        id="cardYear"
                        ref={this.cardDate}
                        value={this.state.cardYear}
                        onChange={(e) => {
                          const selectedYear = parseInt(e.target.value);
                          this.setState({ cardYear: selectedYear });
                        }}
                        onFocus={() => this.focusInput(this.cardDateRef)}
                        onBlur={this.blurInput}
                      >
                        <option value="" disabled>
                          Año
                        </option>
                        {Array.from({ length: 12 }, (_, index) => {
                          const yearValue = this.state.minCardYear + index;
                          return (
                            <option value={yearValue} key={yearValue}>
                              {yearValue}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        className="card-input__input -select"
                        id="cardMonth"
                        ref={this.cardDate}
                        value={this.state.cardMonth}
                        onChange={(e) =>
                          this.setState({ cardMonth: e.target.value })
                        }
                        onFocus={() => this.focusInput(this.cardDateRef)}
                        onBlur={this.blurInput}
                      >
                        <option value="" disabled>
                          Mes
                        </option>
                        {Array.from({ length: 12 }, (_, index) => {
                          const monthValue = index + 1;
                          const isDisabled =
                            this.state.cardYear === this.state.minCardYear &&
                            monthValue < this.minCardMonth();
                          return (
                            <option
                              value={
                                monthValue < 10
                                  ? `0${monthValue}`
                                  : `${monthValue}`
                              }
                              disabled={isDisabled}
                              key={monthValue}
                            >
                              {monthValue < 10
                                ? `0${monthValue}`
                                : `${monthValue}`}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="card-form__col -cvv">
                    <div className="card-input">
                      <label htmlFor="cardCvv" className="card-input__label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="card-input__input"
                        id="cardCvv"
                        ref={this.cardCvvRef}
                        value={this.state.cardCvv}
                        onFocus={() => {
                          this.flipCard(true), this.focusInput(this.cardCvvRef);
                        }}
                        onBlur={() => this.flipCard(false)}
                        autoComplete="off"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={(e) => {
                          const newValue = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3);
                          this.setState({ cardCvv: newValue });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button className="card-form__button" type="submit">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCreditCard;
