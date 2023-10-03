import React, { Component } from "react";
import { RiAlertFill } from "react-icons/ri";

import PayPal from "../../Images/Payment/logo-paypal.png";

class PaypalLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginCredential: "",
      password: "",
      showError: false,
      loginCredentialMandatory: false,
      passwordMandatory: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.state.loginCredential.trim() !== "" &&
      this.state.password.trim() !== ""
    ) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const numRegex = /^\d{9}$/;

      if (
        emailRegex.test(this.state.loginCredential) ||
        numRegex.test(this.state.loginCredential)
      ) {
        this.setState({ showError: false });
        this.props.changePage();
      } else {
        this.setState({ showError: true, password: "" });
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

            <form onSubmit={this.handleSubmit} className="login-form-wrapper">
              <div className="input-wrapper">
                {this.state.showError ? (
                  <div className="error-text">
                    <RiAlertFill style={{ color: "#C72E2E" }} />
                    <span>
                      Alguno de tus datos no es correcto. Inténtalo de nuevo.
                    </span>
                  </div>
                ) : null}

                <div className="form-group">
                  <input
                    id="loginCredential"
                    type="text"
                    name="loginCredential"
                    placeholder=" "
                    value={this.state.loginCredential}
                    onChange={this.handleChange}
                    maxLength="60"
                    className={
                      this.state.loginCredentialMandatory
                        ? "input-error"
                        : "input-ok"
                    }
                  />
                  <label htmlFor="loginCredential">
                    Correo electrónico o número de móvil
                  </label>
                </div>

                {this.state.loginCredentialMandatory ? (
                  <div className="paypal-mandatory">
                    <RiAlertFill
                      style={{ color: "#C72E2E", fontSize: "1.6em" }}
                    />

                    <span>Obligatorio</span>
                  </div>
                ) : null}

                <div className="form-group">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder=" "
                    value={this.state.password}
                    onChange={this.handleChange}
                    maxLength="100"
                    autoComplete="new-password"
                    className={
                      this.state.passwordMandatory ? "input-error" : "input-ok"
                    }
                  />

                  <label htmlFor="password">Contraseña</label>
                </div>

                {this.state.passwordMandatory ? (
                  <div className="paypal-mandatory">
                    <RiAlertFill
                      style={{ color: "#C72E2E", fontSize: "1.6em" }}
                    />
                    <span>Obligatorio</span>
                  </div>
                ) : null}
              </div>

              <button className="paypal-btn" type="submit">
                Iniciar sesión
              </button>
            </form>
          </div>
          <p>
            Aviso Importante: Esto es una simulación con fines de entrenamiento
            o trabajo y no está afiliado a PayPal u otra entidad financiera
            real. Los datos ingresados aquí no se almacenan ni se utilizan con
            fines comerciales. Por favor, no introduzca información real de
            inicio de sesión o datos sensibles. Con introducir un correo o
            teléfono y contraseña ficiticios funciona.
          </p>
        </div>
      </div>
    );
  }
}

export default PaypalLogin;
