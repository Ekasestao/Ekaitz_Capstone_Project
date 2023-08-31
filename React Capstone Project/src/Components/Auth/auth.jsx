import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Auth extends Component {
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
        "http://ekasestao.pythonanywhere.com/sessions",
        {
          user: {
            loginCredential: this.state.loginCredential,
            password: this.state.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {})
      .catch(() => {
        this.setState({
          errorText: "Ha ocurrido un error",
        });
      });

    event.preventDefault();
  }

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
