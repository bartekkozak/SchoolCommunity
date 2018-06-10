import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <p className="load-content">Loading...</p>;
    } else {
      if (profiles.length > 0) {
        profileItems = (
          <div className="profiles-container">
            {profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        );
      } else {
        profileItems = (
          <div className="profiles-container">
            <h1>No profiles found...</h1>
          </div>
        );
      }
    }

    return (
      <div className="profiles">
        <p className="profiles-header">School Community Profiles</p>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);