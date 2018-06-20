import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import { Link } from "react-router-dom";

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
        profiles.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        profileItems = (
          <div className="profiles-container">
            <p className="create-profile-text">
              become a member of our community
            </p>

            {!this.props.auth.isAuthenticated && (
              <Link to="/login">
                <p className="profiles-not-auth">Login to see user's details</p>
              </Link>
            )}

            <div className="sc-members">
              {profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))}
            </div>
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
