import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      facebook: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //   bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field does not exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      //  Set component field state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        facebook: profile.facebook,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            labelText="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            labelText="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            labelText="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: "Select Professional Status", value: 0 },
      {
        label: "Nauczyciel",
        value: "Nauczyciel"
      },
      { label: "Uczeń", value: "Uczeń" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <p className="create-profile-header">Edit Your Profile</p>
        <div className="create-profile-container">
          <form onSubmit={this.onSubmit}>
            <Link to="/dashboard">
              {" "}
              <button className="button education-button">Previous</button>
            </Link>
            <p className="create-profile-required">* = required fields</p>
            <TextFieldGroup
              labelText="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
            />
            <SelectListGroup
              labelText="* Status"
              name="status"
              value={this.state.status}
              options={options}
              onChange={this.onChange}
              error={errors.status}
            />
            <TextFieldGroup
              labelText="Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
            />
            <TextFieldGroup
              labelText="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
            />
            <TextFieldGroup
              labelText="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
            />
            <TextFieldGroup
              labelText="Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma separated values (eg. sport, music, fashion)"
            />
            <TextAreaFieldGroup
              labelText="Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
            />
            <button
              className="button create-profile-button"
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !displaySocialInputs
                }));
              }}
            >
              {" "}
              Add Social Media{" "}
            </button>
            {socialInputs}
            <input type="submit" value="Submit" className="button" />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
