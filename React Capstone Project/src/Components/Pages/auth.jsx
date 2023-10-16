import React, { Component } from "react";

import Login from "../Auth/login";
import Register from "../Auth/register";

import navigateHook from "../Hooks/navigate";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOrRegister: "login",
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    this.goLogin = this.goLogin.bind(this);
    this.goRegister = this.goRegister.bind(this);
  }

  goRegister() {
    localStorage.setItem("loginRegister", JSON.stringify("register"));
    this.setState({
      loginOrRegister: JSON.parse(localStorage.getItem("loginRegister")),
    });
  }

  goLogin() {
    localStorage.setItem("loginRegister", JSON.stringify("login"));
    this.setState({
      loginOrRegister: JSON.parse(localStorage.getItem("loginRegister")),
    });
  }

  handleSuccessfulAuth(user) {
    this.props.handleSuccessfulLogin(user);
    this.props.navigate("/");
    window.location.reload();
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }

  componentDidMount() {
    this.setState({
      loginOrRegister:
        JSON.parse(localStorage.getItem("loginRegister")) || "login",
    });
  }

  componentWillUnmount() {
    localStorage.setItem("loginRegister", JSON.stringify("login"));
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="auth-wrapper">
          {this.state.loginOrRegister === "login" ? (
            <Login
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
              goRegister={this.goRegister}
            />
          ) : this.state.loginOrRegister === "register" ? (
            <Register
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
              goLogin={this.goLogin}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default navigateHook(Auth);
