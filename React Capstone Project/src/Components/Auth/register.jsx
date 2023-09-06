import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      samePassword: "",
      samePasswords: "Las contraseñas no coinciden",
      name: "",
      lastname: "",
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
      .post(
        "https://ekasestao.pythonanywhere.com/register",
        {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          same_password: this.state.samePassword,
          name: this.state.name,
          lastname: this.state.lastname,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          this.props.handleSuccessfulAuth(response.data.user);
        }
        if (response.data.status === 400)
          this.setState({
            password: "",
            samePassword: "",
            errorText: "Las contraseñas no coinciden",
          });
      })
      .catch(() => {
        this.setState({
          name: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          samePassword: "",
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
                type="text"
                name="username"
                placeholder="Usuario"
                value={this.state.username}
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
              Ya tiene una cuenta?
              <a onClick={this.props.goLogin}>Iniciar Sesión</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
