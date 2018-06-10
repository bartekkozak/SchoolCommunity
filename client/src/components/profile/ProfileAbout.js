import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // get first name
    const firstName = profile.user.name.trim().split(" ")[0];
    const lastName = profile.user.name.trim().split(" ")[1];

    //
    const skills = profile.skills.map((skill, index) => (
      <div key={index}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ));

    return (
      <div>
        <h1>First name: {firstName} </h1>
        {isEmpty(lastName) ? null : <h2>Last name: {lastName}</h2>}
        <p className="lead">
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <span>{profile.bio}</span>
          )}
        </p>
        {skills}
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
