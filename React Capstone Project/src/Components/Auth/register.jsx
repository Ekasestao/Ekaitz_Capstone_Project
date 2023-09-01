import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      samePassword: "",
      samePasswords: "La contraseña no coincide",
      errorText: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  handleSubmit(event) {
    axios
      .post("http://ekasestao.pythonanywhere.com/users", {
        users_name: this.state.name,
        users_lastname: this.state.lastname,
        users_email: this.state.email,
        users_username: this.state.username,
        users_password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        this.props.handleSuccessfulAuth();
      })
      .catch(() => {
        this.setState({
          name: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          samePassword: "",
          samePasswords: "La contraseña no coincide",
          errorText: "Ha ocurrido un error",
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="register-wrapper">
          <h1>Register</h1>

          <div>{this.state.errorText}</div>

          <form onSubmit={this.handleSubmit} className="register-form-wrapper">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
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

            <div className="form-group">
              <input
                type="password"
                name="samePassword"
                placeholder="Repetir contraseña"
                value={this.state.samePassword}
                onChange={this.handleChange}
              />

              <div className="same-passwords">
                {this.state.password != this.state.samePassword
                  ? this.state.samePasswords
                  : null}
              </div>
            </div>

            <button className="btn" type="submit">
              Registrarse
            </button>
          </form>

          <div className="go-login">
            <span>
              Ya tiene una cuenta?<NavLink to="/login">Iniciar Sesión</NavLink>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
