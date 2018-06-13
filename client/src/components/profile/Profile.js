import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import Name from "./Name";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent, profileName;

    if (profile === null || loading) {
      profileContent = <p className="load-content">Loading...</p>;
    } else {
      profileContent = (
        <div className="profile-container">
          <p className="create-profile-text">{profile.status}</p>
          <div className="profile-details">
            <Link to="/profiles">
              {" "}
              <button className="button">Prev</button>{" "}
            </Link>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCreds education={profile.education} />
          </div>
        </div>
      );
      profileName = (
        <div>
          <Name profile={profile} />
        </div>
      );
    }

    return (
      <div className="profile">
        <p className="profile-header">{profileName}</p>
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
