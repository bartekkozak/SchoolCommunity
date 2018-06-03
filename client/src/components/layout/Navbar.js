import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
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
            <Link to="/login">School Community</Link>
          </div>
        </div>
        <nav className="navigation">
          <ul className="navigation-items">
            <li className="navigation-item">
              <Link to="">Home</Link>
            </li>
            <li className="navigation-item">
              <Link to="">School</Link>
            </li>
            <li className="navigation-item">
              <Link to="">Posts</Link>
            </li>
            <li className="navigation-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="navigation-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
