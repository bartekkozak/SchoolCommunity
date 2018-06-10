import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navigation-items right-margin">
        <li className="navigation-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="navigation-item">
          <a className="logout" href="" onClick={this.onLogoutClick.bind(this)}>
            <img src={user.avatar} alt={user.name} />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    );

    const questLinks = (
      <ul className="navigation-items right-margin">
        <li className="navigation-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="navigation-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <div className="navigation-wrapper">
        <div className="logo-wrapper">
          <div className="toggleNav">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="logo">
            <Link to="/">School Community</Link>
          </div>
        </div>
        <nav className="navigation">
          <ul className="navigation-items">
            <li className="navigation-item">
              <Link to="/profiles">Profiles</Link>
            </li>

            <li className="navigation-item">
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : questLinks}
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
