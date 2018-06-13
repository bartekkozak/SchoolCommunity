import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../fields/TextFieldGroup";
import TextAreaFieldGroup from "../fields/TextAreaFieldGroup";
import InputGroup from "../fields/InputGroup";
import SelectListGroup from "../fields/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      favouritesubject: "",
      dislikedsubject: "",
      favouriteschool: "",
      status: "",
      hobbies: "",
      bio: "",
      facebook: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      favouritesubject: this.state.favouritesubject,
      dislikedsubject: this.state.dislikedsubject,
      favouriteschool: this.state.favouriteschool,
      status: this.state.status,
      hobbies: this.state.hobbies,
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
      { label: "Select Your Status", value: 0 },
      {
        label: "Teacher",
        value: "Teacher"
      },
      { label: "Student", value: "Student" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <p className="create-profile-header">Create Your Profile</p>
        <div className="create-profile-container">
          <form onSubmit={this.onSubmit}>
            <p className="create-profile-text">
              To create your profile, fill in the required fields
            </p>
            <p className="create-profile-required">* = Required fields</p>
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
              labelText="Favourite Subject"
              name="favouritesubject"
              value={this.state.favouritesubject}
              onChange={this.onChange}
              error={errors.favouritesubject}
            />
            <TextFieldGroup
              labelText="Least Favourite Subject"
              name="dislikedsubject"
              value={this.state.dislikedsubject}
              onChange={this.onChange}
              error={errors.dislikedsubject}
            />
            <TextFieldGroup
              labelText="Favourite School"
              name="favouriteschool"
              value={this.state.favouriteschool}
              onChange={this.onChange}
              error={errors.favouriteschool}
            />
            <TextFieldGroup
              labelText="* Hobbies"
              name="hobbies"
              value={this.state.hobbies}
              onChange={this.onChange}
              error={errors.hobbies}
              info="Please use comma separated values (eg. sport, music, fashion)"
            />
            <TextAreaFieldGroup
              labelText="Biography"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
            />
            <div className="create-profile-buttons">
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
