import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginCredential: "Ekasestao",
      password: "123456789",
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
      .post(`http://ekasestao.pythonanywhere.com/login`, {
        login_credential: this.state.loginCredential,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          console.log("Logeado");
        }
        if (response.data.status == 400) {
          console.log("Contraseña incorrecta");
        }
        if (response.data.status == 404) {
          console.log("No existe el usuario");
        }
        if (response.data.status == 500) {
          console.log("Ha ocurrido un error");
        }
      })
      .catch(() => {
        this.setState({
          errorText: "Ha ocurrido un error",
        });
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
              placeholder="Su usuario o email"
              value={this.state.loginCredential}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Su contraseña"
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

export default Auth;
