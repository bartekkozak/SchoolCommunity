import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="dashboard-buttons">
      <Link to="/edit-profile">
        <button className="button edit-profile-button">Edit Profile</button>
      </Link>
      <Link to="/add-education">
        <button className="button">Add Education</button>
      </Link>
    </div>
  );
};

export default ProfileActions;
