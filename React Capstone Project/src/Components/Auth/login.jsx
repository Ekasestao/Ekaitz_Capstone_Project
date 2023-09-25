import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginCredential: "",
      password: "",
      errorText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "http://ekasestao.pythonanywhere.com/login",
        {
          login_credential: this.state.loginCredential,
          password: this.state.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 200) {
          this.props.handleSuccessfulAuth(response.data.user);
        }
        if (response.data.status === 400) {
          this.setState({
            password: "",
            errorText: "La contraseña es incorrecta",
          });
          this.props.handleUnsuccessfulAuth();
        }
        if (response.data.status === 404) {
          this.setState({
            loginCredential: "",
            password: "",
            errorText: "El usuario no existe, por favor registrese",
          });
          this.props.handleUnsuccessfulAuth();
        }
        if (response.data.status === 500) {
          this.setState({
            loginCredential: "",
            password: "",
            errorText: "Ha ocurrido un error, por favor inténtelo de nuevo",
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(() => {
        this.setState({
          loginCredential: "",
          password: "",
          errorText: "Ha ocurrido un error, por favor inténtelo de nuevo",
        });
        this.props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="login-wrapper">
        <h3>Iniciar Sesión</h3>

        <div className="error-text">{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit} className="login-form-wrapper">
          <div className="form-group">
            <input
              type="text"
              name="loginCredential"
              placeholder="Usuario o email"
              value={this.state.loginCredential}
              onChange={this.handleChange}
              maxLength="60"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange}
              maxLength="100"
            />
          </div>

          <button className="btn" type="submit">
            Iniciar Sesión
          </button>
        </form>

        <div className="go-register">
          <span>
            No tiene una cuenta?
            <a onClick={this.props.goRegister}> Regístrese</a>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
