import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../fields/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="school-board">
        <div className="board-wrapper">
          <div className="board-text">
            <p>Welcome to the School Community!</p>
            <p>Create Your Account</p>
          </div>
          <div className="sign-up">
            <h3>Register</h3>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                htmlFor="name"
                labelText="Name"
                value={this.state.name}
                onChange={this.onChange}
                type="text"
                name="name"
                error={errors.name}
              />

              <TextFieldGroup
                htmlFor="email"
                labelText="Email"
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                name="email"
                error={errors.email}
              />

              <TextFieldGroup
                htmlFor="password"
                labelText="Password"
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                error={errors.password}
              />

              <TextFieldGroup
                htmlFor="passwordConfirmation"
                labelText="Confirm Password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                type="password"
                name="passwordConfirmation"
                error={errors.passwordConfirmation}
              />

              <div id="form-submit">
                <input type="submit" formNoValidate value="Register" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
