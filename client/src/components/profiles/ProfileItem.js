import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-item">
        <img src={profile.user.avatar} alt="" className="profile-item-image" />
        <h3>{profile.user.name} </h3>
        <p>{profile.status} </p>
        <Link to={`/profile/${profile.handle}`}>
          {" "}
          <button className="button">View Profile</button>{" "}
        </Link>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
