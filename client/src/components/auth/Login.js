import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="school-board">
        <div className="board-wrapper">
          <div className="board-text">
            <p>Witamy w School Community</p>
            <p>Zaloguj się już dzis!</p>
          </div>

          <div className="sign-up">
            <h3>Login</h3>

            <form onSubmit={this.onSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  className={classnames({
                    "invalid-field": errors.email
                  })}
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  name="email"
                  id="email"
                  size="50"
                  autoComplete="off"
                />
              </div>
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  className={classnames({
                    "invalid-field": errors.password
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  id="password"
                  size="50"
                />
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}

              <div id="form-submit">
                <input type="submit" value="Login" />
              </div>
            </form>

            <div id="register-link">
              <span>
                Need an account?
                <Link to="/register"> Register</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
