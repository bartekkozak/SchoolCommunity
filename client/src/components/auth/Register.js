import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
    //   .catch(err => console.log(err.response.data));
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="school-board">
        <div className="board-wrapper">
          <div className="board-text">
            <p>Witamy w School Community</p>
            <p>Zarejestruj sie już dziś</p>
          </div>
          <div className="sign-up">
            <h3>Register</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  className={classnames({
                    "invalid-field": errors.name
                  })}
                  value={this.state.name}
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  id="name"
                  size="50"
                  autoComplete="off"
                />
              </div>
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
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
              <div className="form-field">
                <label htmlFor="passwordConfirmation" className="labelka">
                  Confirm Password
                </label>
                <input
                  className={classnames({
                    "invalid-field": errors.passwordConfirmation
                  })}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  size="50"
                />
              </div>
              {errors.passwordConfirmation && (
                <div className="error-message">
                  {errors.passwordConfirmation}
                </div>
              )}
              <div id="form-submit">
                <input type="submit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
