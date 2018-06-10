import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <p className="load-content">Loading...</p>;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="dashboard-container">
            <p className="dashboard-title">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>
                <span className="dashboard-name dashboard-handle-link">
                  {user.name}
                </span>
              </Link>
            </p>
            <ProfileActions />
            <Education education={profile.education} />
            <div style={{ marginBottom: "40px" }} />
            <button onClick={this.onDeleteClick.bind(this)} className="button">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="dashboard-container">
            <p className="dashboard-title">
              Welcome <span className="dashboard-name">{user.name}</span>
            </p>
            <p className="dashboard-text">
              You have not set up a profile, please add some info
            </p>
            <Link to="/create-profile">
              {" "}
              <button className="button dashboard-button">
                Create profile
              </button>{" "}
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <p className="dashboard-header">DASHBOARD</p>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
