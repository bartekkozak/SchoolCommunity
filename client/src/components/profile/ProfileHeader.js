import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-details-header">
        <img src={profile.user.avatar} alt="" />
        <div className="profile-social-links">
          <p>
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a href={profile.social.facebook} target="_blank">
                <i className="fab fa-facebook" />
              </a>
            )}{" "}
          </p>
          <p>
            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a href={profile.social.youtube} target="_blank">
                <i className="fab fa-youtube" />
              </a>
            )}{" "}
          </p>
          <p>
            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a href={profile.social.instagram} target="_blank">
                <i className="fab fa-instagram" />
              </a>
            )}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
