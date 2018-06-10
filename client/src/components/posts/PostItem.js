import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="post-item">
        <div>
          <img src={post.avatar} alt="" />
          <p>Name: {post.name} </p>
          <p>Text: {post.text} </p>
          <br />
          {showActions ? (
            <span>
              <button
                onClick={this.onLikeClick.bind(this, post._id)}
                type="button"
                className="button"
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    liked: this.findUserLike(post.likes)
                  })}
                />
                <span>{post.likes.length}</span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(this, post._id)}
                type="button"
                className="button"
              >
                <i className="fas fa-thumbs-down" />
              </button>
              <br />
              <br />

              <Link to={`/post/${post._id}`}>
                <button className="button">Comments</button>
              </Link>

              {post.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="button"
                >
                  {" "}
                  <i className="fas fa-times" /> Delete
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
