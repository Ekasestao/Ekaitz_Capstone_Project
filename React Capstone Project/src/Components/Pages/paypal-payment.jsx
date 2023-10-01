import React, { Component } from "react";
import { RiAlertLine } from "react-icons/ri";

import PayPal from "../../Images/Payment/logo-paypal.png";

class PaypalPayment extends Component {
  constructor() {
    super();

    this.state = {
      loginCredential: "",
      password: "",
      showError: false,
      loginCredentialMandatory: false,
      passwordMandatory: false,
      showPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  togglePasswordVisibility() {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  }

  handleSubmit() {
    event.preventDefault();

    if (this.state.loginCredential.length === 0) {
      this.setState({
        loginCredentialMandatory: true,
      });
    }

    if (this.state.password.length === 0) {
      this.setState({
        passwordMandatory: true,
      });
    }

    if (
      this.state.loginCredential.length != 0 &&
      this.state.password.length != 0
    ) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const numRegex = /^\d{9}$/;

      if (
        emailRegex.test(this.state.loginCredential) ||
        numRegex.test(this.state.loginCredential)
      ) {
        this.setState({ showError: false });
      } else {
        this.setState({ showError: true });
      }
    } else {
      this.setState({ showError: false });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}Mandatory`]: false,
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="paypal-wrapper">
          <div className="paypal-login-wrapper">
            <div className="paypal-logo">
              <img src={PayPal} alt="PayPal" />
            </div>

            {this.state.showError ? (
              <div className="error-text">
                <div className="error-icon">
                  <RiAlertLine />
                </div>
                <span>
                  Alguno de tus datos no es correcto. Inténtalo de nuevo.
                </span>
              </div>
            ) : null}

            <form onSubmit={this.handleSubmit} className="login-form-wrapper">
              <div className="form-group">
                <input
                  type="text"
                  name="loginCredential"
                  placeholder="Email o número de movil"
                  value={this.state.loginCredential}
                  onChange={this.handleChange}
                  maxLength="60"
                />
              </div>

              {this.state.loginCredentialMandatory ? (
                <div className="paypal-mandatory">
                  <div className="error-icon">
                    <RiAlertLine />
                  </div>
                  <span>Obligatorio</span>
                </div>
              ) : null}

              <div className="form-group">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.handleChange}
                  maxLength="100"
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={this.togglePasswordVisibility}
                >
                  {this.state.showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              {this.state.passwordMandatory ? (
                <div className="paypal-mandatory">
                  <div className="error-icon">
                    <RiAlertLine />
                  </div>
                  <span>Obligatorio</span>
                </div>
              ) : null}

              <button className="paypal-btn" type="submit">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PaypalPayment;
