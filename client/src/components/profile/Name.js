import React, { Component } from "react";

class Name extends Component {
  render() {
    const { profile } = this.props;

    return <p className="profile-header">{profile.user.name}</p>;
  }
}

export default Name;
