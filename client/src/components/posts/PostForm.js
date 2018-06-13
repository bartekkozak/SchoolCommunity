import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../fields/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
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

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <p className="create-profile-text">
          Say Hello to other Users and write a Post
        </p>

        <form onSubmit={this.onSubmit}>
          <TextAreaFieldGroup
            labelText="Create Post"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
          />
          <div className="create-profile-buttons">
            <input type="submit" value="Submit" className="button" />
          </div>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
