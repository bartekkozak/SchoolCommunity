import React, { Component } from "react";

class Name extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div>
        <span>{profile.user.name}</span>
      </div>
    );
  }
}

export default Name;
