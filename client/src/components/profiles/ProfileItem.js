import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-item">
        <img src={profile.user.avatar} alt="" className="profile-item-image" />
        <h3>{profile.user.name} </h3>
        <p>
          {" "}
          {profile.status}{" "}
          {isEmpty(profile.company) ? null : (
            <span>company! {profile.company}</span>
          )}{" "}
        </p>
        <p>
          {" "}
          {isEmpty(profile.location) ? null : (
            <span>location! {profile.location}</span>
          )}{" "}
          }{" "}
        </p>
        <Link to={`/profile/${profile.handle}`}>
          {" "}
          <button className="button">View Profile</button>{" "}
        </Link>
        <div>
          <h4>Skill set</h4>
          <ul className="skill-list">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="skill-list-item">
                <i className="fa fa-check" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
