import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../fields/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
import classnames from "classnames";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="education">
        <p className="education-header">Add Education</p>
        <div className="education-container">
          <form onSubmit={this.onSubmit}>
            <p className="create-profile-text">
              To add education, fill in the required fields
            </p>
            <p className="create-profile-required">* = Required fields</p>
            <Link to="/dashboard">
              <button className="button previous-button">Previous</button>
            </Link>
            <TextFieldGroup
              labelText="* School"
              name="school"
              value={this.state.school}
              onChange={this.onChange}
              error={errors.school}
            />
            <TextFieldGroup
              labelText="* Degree"
              name="degree"
              value={this.state.degree}
              onChange={this.onChange}
              error={errors.degree}
            />
            <TextFieldGroup
              labelText="* Field of Study"
              name="fieldofstudy"
              value={this.state.fieldofstudy}
              onChange={this.onChange}
              error={errors.fieldofstudy}
            />

            <TextFieldGroup
              labelText="From Date"
              type="date"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
              error={errors.from}
            />
            <TextFieldGroup
              labelText="To Date"
              type="date"
              name="to"
              value={this.state.to}
              onChange={this.onChange}
              error={errors.to}
              disabled={this.state.disabled ? "disabled" : ""}
            />
            <div className="add-edu-checkbox">
              <label htmlFor="current" className="education-label">
                Current{" "}
              </label>
              <input
                type="checkbox"
                className="education-checkbox"
                name="current"
                value={this.state.current}
                onChange={this.onCheck}
                error={errors.current}
                checked={this.state.current}
                id="current"
              />
            </div>

            <div>
              <div className="form-field">
                <label>Describe your Educa</label>
                <textarea
                  className={classnames({
                    "invalid-field": errors.description
                  })}
                  value={this.state.description}
                  onChange={this.onChange}
                  name="description"
                  autoComplete="off"
                  maxLength="100"
                />
              </div>
            </div>
            <div className="create-profile-buttons">
              <input type="submit" value="Submit" className="button" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
