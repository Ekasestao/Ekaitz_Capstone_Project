import React, { Component } from "react";

import Login from "../Auth/login";
import Register from "../Auth/register";

import navigateHook from "../Navigation/navigate";

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
    this.setState({
      loginOrRegister: "register",
    });
  }

  goLogin() {
    this.setState({
      loginOrRegister: "login",
    });
  }

  handleSuccessfulAuth(user) {
    this.props.handleSuccessfulLogin(user);
    this.props.navigate("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
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
