import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

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
      .post("http://ekasestao.pythonanywhere.com/login", {
        login_credential: this.state.loginCredential,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          this.props.handleSuccessfulAuth();
        }
        if (response.data.status == 400) {
          this.setState({
            loginCredential: "",
            password: "",
            errorText: "La contraseña es incorrecta",
          });
          this.props.handleUnsuccessfulAuth();
        }
        if (response.data.status == 404) {
          this.setState({
            loginCredential: "",
            password: "",
            errorText: "El usuario no existe, por favor registrese",
          });
          this.props.handleUnsuccessfulAuth();
        }
        if (response.data.status == 500) {
          this.setState({
            loginCredential: "",
            password: "",
            errorText: "Ha ocurrido un error, por favor vuelva a intentarlo",
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(() => {
        this.setState({
          loginCredential: "",
          password: "",
          errorText: "Ha ocurrido un error",
        });
        this.props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>LOGIN</h1>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
          <div className="form-group">
            <input
              type="text"
              name="loginCredential"
              placeholder="Usuario o email"
              value={this.state.loginCredential}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <div className="go-register">
          <span>
            No tiene una cuenta?<NavLink to="/register">Regístrese</NavLink>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;